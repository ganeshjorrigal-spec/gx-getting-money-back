import { internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { redact } from "../lib/redact";

export const saveReply = internalMutation({
  args: { caseId: v.id("cases"), messageId: v.string(), source: v.union(v.literal("inbox"), v.literal("gmail")), text: v.string(), receivedAt: v.number() },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.caseId);
    if (!item || item.stage.startsWith("CLOSED") || Date.now() - args.receivedAt > 45 * 86_400_000) return false;
    const existing = await ctx.db.query("gmailReplies").withIndex("by_case_message", (q) => q.eq("caseId", args.caseId).eq("messageId", args.messageId)).unique();
    if (existing) return false;
    const now = Date.now();
    const runId = Math.random().toString(36).slice(2);
    await ctx.db.insert("gmailReplies", { caseId: args.caseId, messageId: args.messageId, source: args.source, receivedAt: args.receivedAt });
    await ctx.db.insert("inputs", { caseId: args.caseId, kind: "reply", text: redact(args.text.slice(0, 8_000)), storageIds: [], createdAt: now });
    await ctx.db.patch(args.caseId, { stage: "TRIAGING", latestRunId: runId, progress: { step: "reading", at: now }, lastTrackedReplyAt: now, updatedAt: now });
    await ctx.db.insert("caseEvents", { caseId: args.caseId, type: "reply_added", summary: "Their reply arrived; preparing your next step", actor: "system", createdAt: now });
    await ctx.scheduler.runAfter(0, internal.agent.triage, { caseId: args.caseId, runId });
    await ctx.scheduler.runAfter(30_000, internal.googleActions.replyAlert, { caseId: args.caseId, messageId: args.messageId, attempt: 0 });
    await ctx.scheduler.runAfter(0, internal.responsesActions.syncCase, { caseId: args.caseId });
    return true;
  },
});

export const markNoSent = internalMutation({
  args: { watchId: v.id("gmailWatches") }, returns: v.null(),
  handler: async (ctx, { watchId }) => {
    const watch = await ctx.db.get(watchId);
    if (watch && !watch.threadId && Date.now() - watch.sentAt > 24 * 3_600_000) await ctx.db.patch(watchId, { noSentFound: true });
    return null;
  },
});

export const setThread = internalMutation({
  args: { watchId: v.id("gmailWatches"), threadId: v.string() }, returns: v.null(),
  handler: async (ctx, { watchId, threadId }) => { if (await ctx.db.get(watchId)) await ctx.db.patch(watchId, { threadId, noSentFound: false }); return null; },
});

export const recordCalendarEvent = internalMutation({
  args: { caseId: v.id("cases"), connectionId: v.id("googleConnections"), eventId: v.string(), kind: v.union(v.literal("reply"), v.literal("checkin")), sourceId: v.string(), date: v.optional(v.string()), reason: v.optional(v.string()), existingId: v.optional(v.id("googleCalendarEvents")) },
  returns: v.null(),
  handler: async (ctx, args) => {
    const existing = args.existingId ? await ctx.db.get(args.existingId) : await ctx.db.query("googleCalendarEvents").withIndex("by_source", (q) => q.eq("caseId", args.caseId).eq("sourceId", args.sourceId)).unique();
    if (existing) await ctx.db.patch(existing._id, { eventId: args.eventId, connectionId: args.connectionId, sourceId: args.sourceId, date: args.date, reason: args.reason });
    else await ctx.db.insert("googleCalendarEvents", { caseId: args.caseId, connectionId: args.connectionId, eventId: args.eventId, kind: args.kind, sourceId: args.sourceId, date: args.date, reason: args.reason, createdAt: Date.now() });
    return null;
  },
});

export const retryAlert = internalMutation({
  args: { caseId: v.id("cases"), messageId: v.string(), attempt: v.number() }, returns: v.null(),
  handler: async (ctx, args) => { await ctx.scheduler.runAfter(15_000, internal.googleActions.replyAlert, args); return null; },
});

export const removeCalendarEvent = internalMutation({
  args: { id: v.id("googleCalendarEvents") }, returns: v.null(),
  handler: async (ctx, { id }) => { if (await ctx.db.get(id)) await ctx.db.delete(id); return null; },
});

export const removeConnections = internalMutation({
  args: { caseId: v.id("cases") }, returns: v.null(),
  handler: async (ctx, { caseId }) => {
    for (const row of await ctx.db.query("googleConnections").withIndex("by_case", (q) => q.eq("caseId", caseId)).collect()) await ctx.db.delete(row._id);
    for (const row of await ctx.db.query("googleCalendarEvents").withIndex("by_case", (q) => q.eq("caseId", caseId)).collect()) await ctx.db.delete(row._id);
    return null;
  },
});

export const expireConnections = internalMutation({
  args: {}, returns: v.null(),
  handler: async (ctx) => {
    const now = Date.now();
    const cutoff = now - 45 * 86_400_000;
    const stale = await ctx.db.query("gmailWatches").withIndex("by_sent_at", (q) => q.lt("sentAt", cutoff)).take(100);
    const cases = new Set(stale.map((watch) => String(watch.caseId)));
    for (const caseId of cases) {
      const recent = await ctx.db.query("gmailWatches").withIndex("by_case", (q) => q.eq("caseId", caseId as typeof stale[number]["caseId"])).collect();
      if (recent.some((watch) => watch.sentAt >= cutoff)) continue;
      await ctx.scheduler.runAfter(0, internal.googleActions.cleanupCase, { caseId: caseId as typeof stale[number]["caseId"] });
    }
    const states = await ctx.db.query("googleOauthStates").take(100);
    for (const state of states) if (now - state.createdAt > 10 * 60_000) await ctx.db.delete(state._id);
    return null;
  },
});
