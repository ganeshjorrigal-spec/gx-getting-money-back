import { internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { latestReplyText } from "../lib/reply-banner";

export const pendingCheckin = internalQuery({
  args: { code: v.string() }, returns: v.any(),
  handler: async (ctx, { code }) => {
    const item = await ctx.db.query("cases").withIndex("by_code", (q) => q.eq("code", code)).unique();
    if (!item) return null;
    const rows = await ctx.db.query("checkins").withIndex("by_case", (q) => q.eq("caseId", item._id)).collect();
    return rows.find((row) => row.status === "scheduled")?._id ?? null;
  },
});

export const routeLatencies = internalQuery({
  args: {}, returns: v.any(),
  handler: async (ctx) => {
    const rows = await ctx.db.query("agentRuns").order("desc").take(100);
    const recent = rows.filter((row) => row.step === "triage" && row.status === "done" && row.model !== "code").slice(0, 10);
    const values = recent.map((row) => row.latencyMs).sort((a, b) => a - b);
    return { count: values.length, p50Ms: values.length ? values[Math.floor((values.length - 1) / 2)] : null, values };
  },
});

export const dateFacts = internalQuery({
  args: { code: v.string() }, returns: v.any(),
  handler: async (ctx, { code }) => {
    const item = await ctx.db.query("cases").withIndex("by_code", (q) => q.eq("code", code)).unique();
    if (!item) return null;
    const read = item.facts as { messageDate?: string; promise?: unknown } | undefined;
    return { messageDate: read?.messageDate, promise: read?.promise, dueDate: item.dueDate };
  },
});

export const aiUsage = internalQuery({
  args: { code: v.string() }, returns: v.any(),
  handler: async (ctx, { code }) => {
    const item = await ctx.db.query("cases").withIndex("by_code", (q) => q.eq("code", code)).unique();
    if (!item) return null;
    const rows = await ctx.db.query("agentRuns").withIndex("by_case", (q) => q.eq("caseId", item._id)).collect();
    const calls = rows.filter((row) => row.model !== "code" && row.model !== "safe_template").map((row) => ({
      step: row.step, model: row.model, inputTokens: row.inputTokens ?? 0, outputTokens: row.outputTokens ?? 0, totalTokens: row.totalTokens ?? 0, createdAt: row.createdAt,
    }));
    return {
      code,
      calls,
      totals: calls.reduce((sum, call) => ({ inputTokens: sum.inputTokens + call.inputTokens, outputTokens: sum.outputTokens + call.outputTokens, totalTokens: sum.totalTokens + call.totalTokens }), { inputTokens: 0, outputTokens: 0, totalTokens: 0 }),
    };
  },
});

export const caseStatus = internalQuery({
  args: { code: v.string() }, returns: v.any(),
  handler: async (ctx, { code }) => {
    const item = await ctx.db.query("cases").withIndex("by_code", (q) => q.eq("code", code)).unique();
    if (!item) return null;
    const replies = await ctx.db.query("gmailReplies").withIndex("by_case", (q) => q.eq("caseId", item._id)).collect();
    const watches = await ctx.db.query("gmailWatches").withIndex("by_case", (q) => q.eq("caseId", item._id)).collect();
    return {
      code: item.code,
      stage: item.stage,
      route: item.route ?? null,
      nextStep: item.nextStep ?? null,
      lastTrackedReplyAt: item.lastTrackedReplyAt ?? null,
      trackedReplyCount: replies.length,
      inboxReplyCount: replies.filter((reply) => reply.source === "inbox").length,
      watchCount: watches.length,
    };
  },
});

export const latestReplyInput = internalQuery({
  args: { code: v.string() },
  returns: v.any(),
  handler: async (ctx, { code }) => {
    const item = await ctx.db.query("cases").withIndex("by_code", (q) => q.eq("code", code)).unique();
    if (!item) return null;
    const inputs = await ctx.db.query("inputs").withIndex("by_case", (q) => q.eq("caseId", item._id)).order("desc").take(20);
    const input = inputs.find((row) => row.kind === "reply" && row.sender && row.receivedAt);
    if (!input) return null;
    return {
      _id: input._id, caseId: input.caseId, kind: input.kind, text: input.text ?? null,
      storageIds: input.storageIds, createdAt: input.createdAt, sender: input.sender ?? null,
      receivedAt: input.receivedAt ?? null, summary: input.summary ?? null,
      keySentence: input.keySentence ?? null, seenAt: input.seenAt ?? null, runId: input.runId ?? null,
    };
  },
});

export const demoProof = internalQuery({
  args: { code: v.string() }, returns: v.any(),
  handler: async (ctx, { code }) => {
    const item = await ctx.db.query("cases").withIndex("by_code", q => q.eq("code", code)).unique();
    if (!item?.demo) return null;
    const sent = await ctx.db.query("demoReplies").withIndex("by_case", q => q.eq("caseId", item._id)).take(4);
    const inputs = await ctx.db.query("inputs").withIndex("by_case", q => q.eq("caseId", item._id)).take(20);
    const watches = await ctx.db.query("gmailWatches").withIndex("by_case", q => q.eq("caseId", item._id)).take(4);
    return { code, stage: item.stage, route: item.route, dueDate: item.dueDate ?? null, createdAt: item.createdAt, closedAt: item.closedAt ?? null, recoveredPaise: item.recoveredPaise ?? null, demo: { round: item.demo.round, phase: item.demo.phase, now: item.demo.now, expiresAt: item.demo.expiresAt }, rounds: sent.map(reply => ({ round: reply.round, sameThread: reply.sameThread ?? null, foundAt: reply.createdAt, sentAt: reply.sentAt ?? null, receivedAt: reply.receivedAt ?? null, markedSentAt: watches[reply.round - 1]?.sentAt ?? null })), replies: inputs.filter(input => input.kind === "reply" && input.sender && input.receivedAt).map(input => ({ text: latestReplyText(input.text ?? ""), receivedAt: input.receivedAt, savedAt: input.createdAt })) };
  },
});
