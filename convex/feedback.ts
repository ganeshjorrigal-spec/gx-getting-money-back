import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { assertAccess } from "./lib/access";

export const send = mutation({
  args: { code: v.string(), token: v.string(), worthIt: v.boolean(), comment: v.optional(v.string()) }, returns: v.null(),
  handler: async (ctx, { code, token, worthIt, comment }) => {
    const item = await assertAccess(ctx, code, token);
    if (item.stage !== "CLOSED_LANDED") throw new Error("Feedback opens after a refund lands");
    if ((comment?.length ?? 0) > 500) throw new Error("Comment is too long");
    const existing = await ctx.db.query("feedback").withIndex("by_case", (q) => q.eq("caseId", item._id)).first();
    if (existing) await ctx.db.patch(existing._id, { worthIt, comment: comment?.trim(), createdAt: Date.now() });
    else await ctx.db.insert("feedback", { caseId: item._id, worthIt, comment: comment?.trim(), createdAt: Date.now() });
    return null;
  },
});
