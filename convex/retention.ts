import { internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { deleteCaseData } from "./lib/delete";

export const run = internalMutation({
  args: {}, returns: v.null(),
  handler: async (ctx) => {
    const now = Date.now();
    const oldClosed = await ctx.db.query("cases").withIndex("by_purge_after", (q) => q.gt("purgeAfter", 0).lt("purgeAfter", now)).take(20);
    for (const item of oldClosed) {
      if (!item.purgeAfter || item.purgeAfter > now) continue;
      for (const input of await ctx.db.query("inputs").withIndex("by_case", (q) => q.eq("caseId", item._id)).collect()) {
        for (const file of input.storageIds) await ctx.storage.delete(file);
        if (input.storageIds.length) await ctx.db.patch(input._id, { storageIds: [] });
      }
      await ctx.db.patch(item._id, { purgeAfter: undefined });
    }
    const cutoff = now - 365 * 86_400_000;
    for (const stage of ["TRIAGING", "NEED_INFO", "READY", "ACTED", "WAITING", "DUE", "ERROR"] as const) {
      const inactive = await ctx.db.query("cases").withIndex("by_stage_updated", (q) => q.eq("stage", stage).lt("updatedAt", cutoff)).take(10);
      for (const item of inactive) await deleteCaseData(ctx, item);
    }
    return null;
  },
});
