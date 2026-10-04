import type { Doc } from "../_generated/dataModel";
import type { MutationCtx } from "../_generated/server";

export async function deleteCaseData(ctx: MutationCtx, item: Doc<"cases">): Promise<void> {
  const caseId = item._id;
  for (const checkin of await ctx.db.query("checkins").withIndex("by_case", (q) => q.eq("caseId", caseId)).collect()) {
    if (checkin.status === "scheduled" && checkin.scheduledId) await ctx.scheduler.cancel(checkin.scheduledId);
    await ctx.db.delete(checkin._id);
  }
  for (const input of await ctx.db.query("inputs").withIndex("by_case", (q) => q.eq("caseId", caseId)).collect()) {
    for (const file of input.storageIds) await ctx.storage.delete(file);
    await ctx.db.delete(input._id);
  }
  for (const draft of await ctx.db.query("drafts").withIndex("by_case", (q) => q.eq("caseId", caseId)).collect()) await ctx.db.delete(draft._id);
  for (const event of await ctx.db.query("caseEvents").withIndex("by_case", (q) => q.eq("caseId", caseId)).collect()) await ctx.db.delete(event._id);
  for (const feedback of await ctx.db.query("feedback").withIndex("by_case", (q) => q.eq("caseId", caseId)).collect()) await ctx.db.delete(feedback._id);
  await ctx.db.delete(caseId);
}
