import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { assertAccess } from "./lib/access";
import { hashToken } from "./lib/access";
import { CALENDAR_SCOPE, GMAIL_SCOPE, caseInboxAllowed, gmailTestAllowed, gmailTestConfigured } from "../lib/google-tracking";

const accessArgs = { code: v.string(), token: v.string() };
const kind = v.union(v.literal("calendar"), v.literal("gmail"), v.literal("inbox"));
const callback = () => {
  const site = process.env.CONVEX_SITE_URL;
  if (!site) throw new Error("Convex site URL is missing");
  return `${site}/oauth/google/callback`;
};

function authUrl(state: string, scopes: string[]) {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  if (!clientId || !process.env.GOOGLE_OAUTH_CLIENT_SECRET || !process.env.TOKEN_ENC_KEY) throw new Error("Google connection is not configured yet");
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.search = new URLSearchParams({ client_id: clientId, redirect_uri: callback(), response_type: "code", scope: scopes.join(" "), access_type: "offline", prompt: "consent", state }).toString();
  return url.toString();
}

export const status = query({
  args: accessArgs,
  returns: v.any(),
  handler: async (ctx, args) => {
    const item = await assertAccess(ctx, args.code, args.token);
    const connections = await ctx.db.query("googleConnections").withIndex("by_case", (q) => q.eq("caseId", item._id)).collect();
    const watch = await ctx.db.query("gmailWatches").withIndex("by_case", (q) => q.eq("caseId", item._id)).first();
    const inbox = await ctx.db.query("googleConnections").withIndex("by_kind", (q) => q.eq("kind", "inbox")).first();
    return {
      firstSent: !!watch,
      calendar: connections.some((connection) => connection.kind === "calendar" || connection.kind === "gmail"),
      gmail: connections.some((connection) => connection.kind === "gmail" && gmailTestAllowed(connection.email, process.env.GMAIL_TEST_ACCOUNTS)),
      inboxAddress: inbox && process.env.TICKBACK_INBOX_ADDRESS && caseInboxAllowed(inbox.email, process.env.GEMINI_PAID_TIER === "true", process.env.GMAIL_TEST_ACCOUNTS) ? process.env.TICKBACK_INBOX_ADDRESS : null,
      dismissed: !!item.trackingDismissed,
      lastReplyAt: item.lastTrackedReplyAt ?? null,
      noSentFound: !!watch?.noSentFound,
      configured: !!process.env.GOOGLE_OAUTH_CLIENT_ID && !!process.env.GOOGLE_OAUTH_CLIENT_SECRET && !!process.env.TOKEN_ENC_KEY,
      gmailReady: gmailTestConfigured(process.env.GMAIL_TEST_ACCOUNTS),
    };
  },
});

export const authorize = internalQuery({
  args: accessArgs, returns: v.any(),
  handler: async (ctx, args) => {
    const item = await assertAccess(ctx, args.code, args.token);
    if (item.stage.startsWith("CLOSED")) throw new Error("This case is closed");
    const watch = await ctx.db.query("gmailWatches").withIndex("by_case", (q) => q.eq("caseId", item._id)).first();
    if (!watch) throw new Error("Send your first email before connecting");
    return { caseId: item._id };
  },
});

export const createState = internalMutation({
  args: { stateHash: v.string(), caseId: v.id("cases"), kind: v.union(v.literal("calendar"), v.literal("gmail")), encryptedCaseToken: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.insert("googleOauthStates", { ...args, createdAt: Date.now() });
    return null;
  },
});

export const startInbox = internalMutation({
  args: {}, returns: v.string(),
  handler: async (ctx) => {
    if (!process.env.TICKBACK_INBOX_ADDRESS) throw new Error("Set TICKBACK_INBOX_ADDRESS first");
    const state = Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) => byte.toString(16).padStart(2, "0")).join("");
    await ctx.db.insert("googleOauthStates", { stateHash: await hashToken(state), kind: "inbox", createdAt: Date.now() });
    return authUrl(state, [GMAIL_SCOPE]);
  },
});

export const dismiss = mutation({
  args: accessArgs, returns: v.null(),
  handler: async (ctx, args) => { const item = await assertAccess(ctx, args.code, args.token); await ctx.db.patch(item._id, { trackingDismissed: true }); return null; },
});

export const takeState = internalMutation({
  args: { stateHash: v.string() }, returns: v.any(),
  handler: async (ctx, { stateHash }) => {
    const state = await ctx.db.query("googleOauthStates").withIndex("by_hash", (q) => q.eq("stateHash", stateHash)).unique();
    if (!state || Date.now() - state.createdAt > 10 * 60_000) return null;
    await ctx.db.delete(state._id);
    const item = state.caseId ? await ctx.db.get(state.caseId) : null;
    if (state.caseId && (!item || item.stage.startsWith("CLOSED"))) return null;
    return { caseId: state.caseId ?? null, kind: state.kind, code: item?.code ?? null, encryptedCaseToken: state.encryptedCaseToken ?? null };
  },
});

export const store = internalMutation({
  args: { caseId: v.optional(v.id("cases")), kind, encryptedRefreshToken: v.string(), encryptedCaseToken: v.optional(v.string()), email: v.optional(v.string()) }, returns: v.null(),
  handler: async (ctx, args) => {
    const item = args.caseId ? await ctx.db.get(args.caseId) : null;
    if (args.caseId && (!item || item.stage.startsWith("CLOSED"))) throw new Error("Case is closed");
    const matches = args.kind === "inbox"
      ? await ctx.db.query("googleConnections").withIndex("by_kind", (q) => q.eq("kind", "inbox")).collect()
      : await ctx.db.query("googleConnections").withIndex("by_case", (q) => q.eq("caseId", args.caseId)).collect();
    for (const row of matches) if (row.kind === args.kind) await ctx.db.delete(row._id);
    await ctx.db.insert("googleConnections", { caseId: args.caseId, kind: args.kind, encryptedRefreshToken: args.encryptedRefreshToken, encryptedCaseToken: args.encryptedCaseToken, email: args.email, connectedAt: Date.now() });
    if (args.caseId) await ctx.db.patch(args.caseId, { trackingDismissed: false });
    return null;
  },
});

export const loadForAction = internalQuery({
  args: { caseId: v.id("cases") }, returns: v.any(),
  handler: async (ctx, { caseId }) => {
    const item = await ctx.db.get(caseId);
    if (!item) return null;
    const connections = await ctx.db.query("googleConnections").withIndex("by_case", (q) => q.eq("caseId", caseId)).collect();
    const watches = await ctx.db.query("gmailWatches").withIndex("by_case", (q) => q.eq("caseId", caseId)).collect();
    const checkins = await ctx.db.query("checkins").withIndex("by_case", (q) => q.eq("caseId", caseId)).collect();
    const calendarEvents = await ctx.db.query("googleCalendarEvents").withIndex("by_case", (q) => q.eq("caseId", caseId)).collect();
    return { item, connections, watches, checkins, calendarEvents };
  },
});
export const inbox = internalQuery({
  args: {}, returns: v.any(),
  handler: async (ctx) => ctx.db.query("googleConnections").withIndex("by_kind", (q) => q.eq("kind", "inbox")).first(),
});
export const activeCases = internalQuery({
  args: {}, returns: v.any(),
  handler: async (ctx) => {
    const cutoff = Date.now() - 45 * 86_400_000;
    const watches = await ctx.db.query("gmailWatches").withIndex("by_sent_at", (q) => q.gte("sentAt", cutoff)).order("desc").take(100);
    const cases = [];
    const seen = new Set<string>();
    for (const watch of watches) {
      if (seen.has(String(watch.caseId))) continue;
      const item = await ctx.db.get(watch.caseId);
      if (item && !item.stage.startsWith("CLOSED")) { cases.push({ caseId: item._id, code: item.code }); seen.add(String(item._id)); }
    }
    return cases;
  },
});
