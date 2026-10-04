import { mutation, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { assertAccess } from "./lib/access";
import { internal } from "./_generated/api";

export const claim = mutation({
  args: { code: v.string(), token: v.string() }, returns: v.null(),
  handler: async (ctx, { code, token }) => {
    if (!process.env.NEXT_PUBLIC_UPI_VPA) throw new Error("Payment is not available yet");
    const item = await assertAccess(ctx, code, token);
    if (item.paidState === "claimed" || item.paidState === "confirmed") return null;
    const now = Date.now();
    const runId = Math.random().toString(36).slice(2);
    await ctx.db.patch(item._id, { paidState: "claimed", stage: "TRIAGING", latestRunId: runId, progress: { step: "writing", at: now }, updatedAt: now });
    await ctx.db.insert("payments", { code, amountPaise: 4_900, status: "claimed", claimedAt: now });
    await ctx.db.insert("caseEvents", { caseId: item._id, type: "paid_claimed", summary: "You marked the ₹49 payment complete. We will check it by hand.", actor: "user", createdAt: now });
    if (item.facts) await ctx.scheduler.runAfter(0, internal.agent.triage, { caseId: item._id, runId, reuseFacts: true });
    return null;
  },
});

export const markNotFound = internalMutation({
  args: { code: v.string() }, returns: v.null(),
  handler: async (ctx, { code }) => {
    const item = await ctx.db.query("cases").withIndex("by_code", (q) => q.eq("code", code)).unique();
    if (!item) return null;
    await ctx.db.patch(item._id, { paidState: "not_found", updatedAt: Date.now() });
    const payment = await ctx.db.query("payments").withIndex("by_code", (q) => q.eq("code", code)).order("desc").first();
    if (payment) await ctx.db.patch(payment._id, { status: "not_found" });
    return null;
  },
});
