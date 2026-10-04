import { internalQuery } from "./_generated/server";
import { v } from "convex/values";

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
