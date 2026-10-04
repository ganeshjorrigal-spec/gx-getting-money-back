import { internalQuery } from "./_generated/server";
import { v } from "convex/values";

export const load = internalQuery({
  args: { caseId: v.id("cases") },
  returns: v.any(),
  handler: async (ctx, { caseId }) => {
    const item = await ctx.db.get(caseId);
    if (!item) return null;
    const inputs = await ctx.db.query("inputs").withIndex("by_case", (q) => q.eq("caseId", caseId)).order("desc").take(10);
    const events = await ctx.db.query("caseEvents").withIndex("by_case", (q) => q.eq("caseId", caseId)).order("desc").take(10);
    return { item, inputs: inputs.reverse(), events: events.reverse() };
  },
});
