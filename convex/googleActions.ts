"use node";

import { action, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import { v } from "convex/values";
import { encryptToken, decryptToken } from "../lib/token-crypto";
import { CALENDAR_SCOPE, GMAIL_SCOPE, caseInboxAddress, caseInboxAllowed, checkinEvent, gmailTestAllowed, gmailTestConfigured, messageMatchesCase, replyAlertEvent } from "../lib/google-tracking";
import { todayIST } from "../lib/dates";

const siteUrl = () => {
  if (!process.env.CONVEX_SITE_URL) throw new Error("Convex site URL is missing");
  return process.env.CONVEX_SITE_URL;
};
const callbackUrl = () => `${siteUrl()}/oauth/google/callback`;
const client = () => {
  const id = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  if (!id || !secret || !process.env.TOKEN_ENC_KEY) throw new Error("Google connection is not configured yet");
  return { id, secret };
};
const DRIVE_FILE_SCOPE = "https://www.googleapis.com/auth/drive.file";
const scopesFor = (kind: "calendar" | "gmail" | "inbox" | "responses" | "demo") => kind === "demo" ? [GMAIL_SCOPE, "https://www.googleapis.com/auth/gmail.send"] : kind === "calendar" ? [CALENDAR_SCOPE] : kind === "gmail" ? [GMAIL_SCOPE, CALENDAR_SCOPE] : kind === "responses" ? [DRIVE_FILE_SCOPE] : [GMAIL_SCOPE];
function authUrl(state: string, scopes: string[]): string {
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.search = new URLSearchParams({ client_id: client().id, redirect_uri: callbackUrl(), response_type: "code", scope: scopes.join(" "), access_type: "offline", prompt: "consent", state }).toString();
  return url.toString();
}
function newState(): string { return Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString("hex"); }
async function sha(value: string): Promise<string> { return Buffer.from(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))).toString("hex"); }

export const begin = action({
  args: { code: v.string(), token: v.string(), kind: v.union(v.literal("calendar"), v.literal("gmail")) },
  returns: v.object({ url: v.string(), state: v.string() }),
  handler: async (ctx, args) => {
    if (args.kind === "gmail" && !gmailTestConfigured(process.env.GMAIL_TEST_ACCOUNTS)) throw new Error("Gmail tracking is not ready yet");
    const { caseId } = await ctx.runQuery(internal.googleConnect.authorize, { code: args.code, token: args.token });
    const state = newState();
    await ctx.runMutation(internal.googleConnect.createState, { stateHash: await sha(state), caseId, kind: args.kind, encryptedCaseToken: await encryptToken(args.token) });
    return { state, url: authUrl(state, scopesFor(args.kind)) };
  },
});

export const beginResponses = action({
  args: {},
  returns: v.object({ url: v.string() }),
  handler: async (ctx) => {
    if (!process.env.RESPONSES_SHEET_SHARE_EMAIL) throw new Error("Responses sheet sharing is not configured");
    const state = newState();
    await ctx.runMutation(internal.googleConnect.createState, { stateHash: await sha(state), kind: "responses" });
    return { url: authUrl(state, scopesFor("responses")) };
  },
});

type TokenResult = { access_token?: string; refresh_token?: string; scope?: string; error?: string };
async function exchangeCode(code: string): Promise<TokenResult> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code, client_id: client().id, client_secret: client().secret, redirect_uri: callbackUrl(), grant_type: "authorization_code" }),
  });
  if (!response.ok) throw new Error("Google authorization failed");
  return await response.json() as TokenResult;
}
export async function accessToken(encryptedRefreshToken: string): Promise<string> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ refresh_token: await decryptToken(encryptedRefreshToken), client_id: client().id, client_secret: client().secret, grant_type: "refresh_token" }),
  });
  if (!response.ok) throw new Error("Google connection needs to be renewed");
  const body = await response.json() as TokenResult;
  if (!body.access_token) throw new Error("Google connection needs to be renewed");
  return body.access_token;
}
export async function googleJson<T>(url: string, token: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, headers: { Authorization: `Bearer ${token}`, ...(init?.body ? { "Content-Type": "application/json" } : {}) } });
  if (!response.ok) throw new Error(`Google API request failed (${response.status})`);
  return await response.json() as T;
}

export const finishOauth = internalAction({
  args: { code: v.string(), state: v.string() }, returns: v.any(),
  handler: async (ctx, args): Promise<{ kind: "calendar" | "gmail" | "inbox" | "responses" | "demo"; code: string | null; sheetUrl?: string }> => {
    const state: { caseId: Id<"cases"> | null; kind: "calendar" | "gmail" | "inbox" | "responses" | "demo"; code: string | null; encryptedCaseToken: string | null } | null = await ctx.runMutation(internal.googleConnect.takeState, { stateHash: await sha(args.state) });
    if (!state) throw new Error("Google connection expired. Try again from your case.");
    const tokens = await exchangeCode(args.code);
    if (!tokens.refresh_token || !tokens.access_token) throw new Error("Google did not grant ongoing access. Try again.");
    const required = scopesFor(state.kind);
    const granted = new Set((tokens.scope || "").split(" "));
    if (required.some((scope) => !granted.has(scope))) throw new Error("Google did not grant the needed permission");
    let email: string | undefined;
    if (state.kind !== "calendar" && state.kind !== "responses") {
      const profile = await googleJson<{ emailAddress?: string }>("https://gmail.googleapis.com/gmail/v1/users/me/profile", tokens.access_token);
      email = profile.emailAddress?.toLowerCase();
      if (!email) throw new Error("Could not verify the Gmail account");
      if (state.kind === "inbox" && email !== process.env.TICKBACK_INBOX_ADDRESS?.toLowerCase()) throw new Error("This is not the configured case inbox");
      if (state.kind === "demo" && email !== process.env.TICKBACK_DEMO_ADDRESS?.toLowerCase()) throw new Error("Choose the configured demo organiser account");
      const allowed = state.kind === "demo" ? true : state.kind === "inbox"
        ? caseInboxAllowed(email, process.env.GEMINI_PAID_TIER === "true", process.env.GMAIL_TEST_ACCOUNTS)
        : gmailTestAllowed(email, process.env.GMAIL_TEST_ACCOUNTS);
      if (!allowed) throw new Error("This account is not on the test list");
    }
    const connectionId = await ctx.runMutation(internal.googleConnect.store, { caseId: state.caseId ?? undefined, kind: state.kind, encryptedRefreshToken: await encryptToken(tokens.refresh_token), encryptedCaseToken: state.encryptedCaseToken ?? undefined, email });
    if (state.kind === "responses") {
      const sheetUrl = await ctx.runAction(internal.responsesActions.finishSetup, { connectionId });
      return { kind: state.kind, code: null, sheetUrl };
    }
    if (state.caseId) { try { await ctx.runAction(internal.googleActions.syncCheckins, { caseId: state.caseId }); } catch { /* The next poll will retry calendar sync. */ } }
    return { kind: state.kind, code: state.code ?? null };
  },
});

type GmailList = { messages?: { id: string; threadId: string }[] };
export type GmailMessage = { id: string; threadId: string; internalDate?: string; snippet?: string; payload?: { mimeType?: string; body?: { data?: string }; headers?: { name: string; value: string }[]; parts?: GmailMessage["payload"][] } };
const gmailBase = "https://gmail.googleapis.com/gmail/v1/users/me";
export async function listMessages(token: string, q: string): Promise<GmailList["messages"]> {
  const url = new URL(`${gmailBase}/messages`);
  url.search = new URLSearchParams({ q, maxResults: "20" }).toString();
  return (await googleJson<GmailList>(url.toString(), token)).messages ?? [];
}
export async function getMessage(token: string, id: string): Promise<GmailMessage> {
  return googleJson<GmailMessage>(`${gmailBase}/messages/${encodeURIComponent(id)}?format=full`, token);
}
async function getThread(token: string, id: string): Promise<GmailMessage[]> {
  const result = await googleJson<{ messages?: GmailMessage[] }>(`${gmailBase}/threads/${encodeURIComponent(id)}?format=full`, token);
  return result.messages ?? [];
}
export function header(message: GmailMessage, name: string): string {
  return message.payload?.headers?.find((item) => item.name.toLowerCase() === name)?.value ?? "";
}
export function messageText(message: GmailMessage): string {
  function plain(part: GmailMessage["payload"]): string | null {
    if (!part) return null;
    if (part.mimeType === "text/plain" && part.body?.data) return Buffer.from(part.body.data, "base64url").toString("utf8");
    for (const child of part.parts ?? []) { const result = plain(child); if (result) return result; }
    return null;
  }
  return (plain(message.payload) ?? message.snippet ?? "").slice(0, 8_000);
}
export function fromAddress(value: string): string { return /<([^>]+)>/.exec(value)?.[1]?.toLowerCase() ?? value.trim().toLowerCase(); }

export const poll = internalAction({
  args: {}, returns: v.null(),
  handler: async (ctx) => {
    const paidTier = process.env.GEMINI_PAID_TIER === "true";
    if (!paidTier && !gmailTestConfigured(process.env.GMAIL_TEST_ACCOUNTS)) return null;
    const inbox = await ctx.runQuery(internal.googleConnect.inbox, {});
    const cases = await ctx.runQuery(internal.googleConnect.activeCases, {});
    for (const entry of cases) {
      try {
        const loaded = await ctx.runQuery(internal.googleConnect.loadForAction, { caseId: entry.caseId });
        if (!loaded) continue;
        const own = loaded.connections.find((connection: { kind: string; email?: string }) => connection.kind === "gmail" && gmailTestAllowed(connection.email, process.env.GMAIL_TEST_ACCOUNTS));
        const inboxAddress = process.env.TICKBACK_INBOX_ADDRESS;
        if (inbox && inboxAddress && caseInboxAllowed(inbox.email, paidTier, process.env.GMAIL_TEST_ACCOUNTS)) {
          const token = await accessToken(inbox.encryptedRefreshToken);
          for (const watch of loaded.watches) {
            const recipient = caseInboxAddress(inboxAddress, entry.code);
            const byAddress = await listMessages(token, `after:${Math.floor(watch.sentAt / 1000)} to:${recipient}`);
            const bySubject = await listMessages(token, `after:${Math.floor(watch.sentAt / 1000)} subject:"${entry.code}"`);
            const candidates = [...new Map([...(byAddress ?? []), ...(bySubject ?? [])].map((message) => [message.id, message])).values()];
            for (const candidate of candidates) {
              const message = await getMessage(token, candidate.id);
              const from = fromAddress(header(message, "from"));
              const receivedAt = Number(message.internalDate ?? 0);
              if (!messageMatchesCase({ to: header(message, "to"), subject: header(message, "subject"), from, code: entry.code, inbox: inboxAddress, ownEmail: inbox.email, sentAt: watch.sentAt, receivedAt })) continue;
              const text = messageText(message);
              if (text) await ctx.runMutation(internal.googleData.saveReply, { caseId: entry.caseId, messageId: header(message, "message-id") || message.id, source: "inbox", text, sender: from, receivedAt });
            }
          }
        }
        if (own) {
          const token = await accessToken(own.encryptedRefreshToken);
          for (const watch of loaded.watches) {
            let threadId = watch.threadId;
            if (!threadId) {
              const sent = await listMessages(token, `in:sent subject:"${entry.code}" after:${Math.floor((watch.sentAt - 3_600_000) / 1000)}`);
              threadId = sent?.[0]?.threadId;
              if (threadId) await ctx.runMutation(internal.googleData.setThread, { watchId: watch._id, threadId });
              else await ctx.runMutation(internal.googleData.markNoSent, { watchId: watch._id });
            }
            let messages = threadId ? await getThread(token, threadId) : [];
            if (!threadId && Date.now() - watch.sentAt > 24 * 3_600_000) {
              const bookingId = loaded.item.facts?.bookingId;
              if (loaded.item.facts?.platform === "district" && bookingId) {
                const candidates = await listMessages(token, `after:${Math.floor(watch.sentAt / 1000)} from:(@district.in) "${String(bookingId).replace(/[^A-Za-z0-9-]/g, "")}"`);
                messages = await Promise.all((candidates ?? []).map((candidate) => getMessage(token, candidate.id)));
              }
            }
            for (const message of messages) {
              if (threadId && message.threadId !== threadId) continue;
              const from = fromAddress(header(message, "from"));
              const receivedAt = Number(message.internalDate ?? 0);
              if (from === own.email || receivedAt <= watch.sentAt) continue;
              const sameThread = !!threadId && message.threadId === threadId;
              const districtFallback = !threadId && loaded.item.facts?.platform === "district" && from.endsWith("@district.in") && !!loaded.item.facts.bookingId && messageText(message).includes(loaded.item.facts.bookingId);
              if (!sameThread && !districtFallback) continue;
              const text = messageText(message);
              if (text) await ctx.runMutation(internal.googleData.saveReply, { caseId: entry.caseId, messageId: header(message, "message-id") || message.id, source: "gmail", text, sender: from, receivedAt });
            }
          }
        }
        await ctx.runAction(internal.googleActions.syncCheckins, { caseId: entry.caseId });
      } catch { /* One expired account must not stop the other cases. */ }
    }
    return null;
  },
});

async function calendarRequest(token: string, eventId: string | null, method: "POST" | "PATCH" | "DELETE", body?: unknown): Promise<void> {
  const url = `${"https://www.googleapis.com/calendar/v3/calendars/primary/events"}${eventId ? `/${encodeURIComponent(eventId)}` : ""}`;
  const response = await fetch(url, { method, headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) }, body: body ? JSON.stringify(body) : undefined });
  if (response.ok || (method === "POST" && response.status === 409) || (method === "DELETE" && response.status === 404)) return;
  throw new Error(`Calendar request failed (${response.status})`);
}
const eventId = async (source: string) => `tb${(await sha(source)).slice(0, 36)}`;
const caseLink = async (connection: { encryptedCaseToken?: string }, code: string) => connection.encryptedCaseToken ? `${siteUrl()}/c/index.html?code=${encodeURIComponent(code)}#k=${await decryptToken(connection.encryptedCaseToken)}` : siteUrl();

export const syncCheckins = internalAction({
  args: { caseId: v.id("cases") }, returns: v.null(),
  handler: async (ctx, { caseId }) => {
    const loaded = await ctx.runQuery(internal.googleConnect.loadForAction, { caseId });
    if (!loaded || loaded.item.stage.startsWith("CLOSED")) return null;
    const connection = loaded.connections.find((row: { kind: string }) => row.kind === "calendar") ?? loaded.connections.find((row: { kind: string }) => row.kind === "gmail");
    if (!connection) return null;
    const token = await accessToken(connection.encryptedRefreshToken);
    const active = loaded.checkins.filter((row: { status: string; date: string }) => row.status === "scheduled" && row.date >= todayIST());
    const sources = new Set(active.map((row: { _id: string }) => row._id));
    for (const row of loaded.calendarEvents.filter((event: { kind: string }) => event.kind === "checkin")) {
      if (sources.has(row.sourceId) || active.some((checkin: { reason: string }) => checkin.reason === row.reason)) continue;
      await calendarRequest(token, row.eventId, "DELETE");
      await ctx.runMutation(internal.googleData.removeCalendarEvent, { id: row._id });
    }
    for (const row of active) {
      const sourceId = String(row._id);
      const existing = loaded.calendarEvents.find((event: { sourceId: string }) => event.sourceId === sourceId)
        ?? loaded.calendarEvents.find((event: { kind: string; reason?: string; sourceId: string }) => event.kind === "checkin" && event.reason === row.reason && !sources.has(event.sourceId));
      if (existing?.date === row.date) continue;
      const id = existing?.eventId ?? await eventId(`${caseId}:${sourceId}`);
      const payload = checkinEvent({ id, platform: loaded.item.platform ?? "ticket", date: row.date, link: await caseLink(connection, loaded.item.code) });
      await calendarRequest(token, existing ? id : null, existing ? "PATCH" : "POST", payload);
      await ctx.runMutation(internal.googleData.recordCalendarEvent, { caseId, connectionId: connection._id, eventId: id, kind: "checkin", sourceId, date: row.date, reason: row.reason, existingId: existing?._id });
    }
    return null;
  },
});

export const replyAlert = internalAction({
  args: { caseId: v.id("cases"), messageId: v.string(), attempt: v.number() }, returns: v.null(),
  handler: async (ctx, args) => {
    const loaded = await ctx.runQuery(internal.googleConnect.loadForAction, { caseId: args.caseId });
    if (!loaded || loaded.item.stage.startsWith("CLOSED")) return null;
    if (loaded.calendarEvents.some((row: { sourceId: string }) => row.sourceId === args.messageId)) return null;
    if (loaded.item.stage === "TRIAGING" && args.attempt < 4) {
      await ctx.runMutation(internal.googleData.retryAlert, { caseId: args.caseId, messageId: args.messageId, attempt: args.attempt + 1 });
      return null;
    }
    const connection = loaded.connections.find((row: { kind: string }) => row.kind === "calendar") ?? loaded.connections.find((row: { kind: string }) => row.kind === "gmail");
    if (!connection) return null;
    const token = await accessToken(connection.encryptedRefreshToken);
    const id = await eventId(`${args.caseId}:reply:${args.messageId}`);
    const payload = replyAlertEvent({ id, platform: loaded.item.platform ?? "The organiser", amountPaise: loaded.item.amountPaise, nextStep: loaded.item.stage === "TRIAGING" ? "Your next step is being prepared" : "Your next step is ready", link: await caseLink(connection, loaded.item.code), now: Date.now() });
    await calendarRequest(token, null, "POST", payload);
    await ctx.runMutation(internal.googleData.recordCalendarEvent, { caseId: args.caseId, connectionId: connection._id, eventId: id, kind: "reply", sourceId: args.messageId });
    return null;
  },
});

export const disconnect = action({
  args: { code: v.string(), token: v.string() }, returns: v.null(),
  handler: async (ctx, args) => {
    const { caseId } = await ctx.runQuery(internal.googleConnect.authorize, args);
    const loaded = await ctx.runQuery(internal.googleConnect.loadForAction, { caseId });
    if (!loaded) return null;
    for (const connection of loaded.connections) {
      const refreshToken = await decryptToken(connection.encryptedRefreshToken);
      const token = await accessToken(connection.encryptedRefreshToken);
      for (const event of loaded.calendarEvents.filter((row: { connectionId: string }) => row.connectionId === connection._id)) await calendarRequest(token, event.eventId, "DELETE");
      await fetch("https://oauth2.googleapis.com/revoke", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ token: refreshToken }) });
    }
    await ctx.runMutation(internal.googleData.removeConnections, { caseId });
    return null;
  },
});

export const cleanupDetached = internalAction({
  args: { connections: v.array(v.object({ encryptedRefreshToken: v.string(), id: v.string() })), events: v.array(v.object({ eventId: v.string(), connectionId: v.string() })) },
  returns: v.null(),
  handler: async (_ctx, args) => {
    for (const connection of args.connections) {
      try {
        const token = await accessToken(connection.encryptedRefreshToken);
        for (const event of args.events.filter((row) => row.connectionId === connection.id)) await calendarRequest(token, event.eventId, "DELETE");
        const refreshToken = await decryptToken(connection.encryptedRefreshToken);
        await fetch("https://oauth2.googleapis.com/revoke", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ token: refreshToken }) });
      } catch { /* Case data is deleted even if Google is unavailable. */ }
    }
    return null;
  },
});

export const cleanupCase = internalAction({
  args: { caseId: v.id("cases") }, returns: v.null(),
  handler: async (ctx, { caseId }) => {
    const loaded = await ctx.runQuery(internal.googleConnect.loadForAction, { caseId });
    if (!loaded) return null;
    await ctx.runAction(internal.googleActions.cleanupDetached, {
      connections: loaded.connections.map((connection: { _id: string; encryptedRefreshToken: string }) => ({ id: String(connection._id), encryptedRefreshToken: connection.encryptedRefreshToken })),
      events: loaded.calendarEvents.map((event: { eventId: string; connectionId: string }) => ({ eventId: event.eventId, connectionId: String(event.connectionId) })),
    });
    await ctx.runMutation(internal.googleData.removeConnections, { caseId });
    return null;
  },
});

export const beginDemo = internalAction({
  args: {}, returns: v.object({ url: v.string() }),
  handler: async (ctx) => {
    if (!process.env.TICKBACK_DEMO_ADDRESS) throw new Error("Demo address is not configured");
    const state = newState();
    await ctx.runMutation(internal.googleConnect.createState, { stateHash: await sha(state), kind: "demo" });
    const url = new URL(authUrl(state, scopesFor("demo")));
    url.searchParams.set("login_hint", process.env.TICKBACK_DEMO_ADDRESS);
    return { url: url.toString() };
  },
});
