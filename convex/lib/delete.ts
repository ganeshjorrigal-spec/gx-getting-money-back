import type { Doc } from "../_generated/dataModel";
import type { MutationCtx } from "../_generated/server";
import { internal } from "../_generated/api";

export async function deleteCaseData(ctx: MutationCtx, item: Doc<"cases">): Promise<void> {
  const caseId = item._id;
  await ctx.scheduler.runAfter(0, internal.responsesActions.clearCase, { caseId });
  const connections = await ctx.db.query("googleConnections").withIndex("by_case", (q) => q.eq("caseId", caseId)).collect();
  const calendarEvents = await ctx.db.query("googleCalendarEvents").withIndex("by_case", (q) => q.eq("caseId", caseId)).collect();
  if (connections.length) await ctx.scheduler.runAfter(0, internal.googleActions.cleanupDetached, {
    connections: connections.map((connection) => ({ encryptedRefreshToken: connection.encryptedRefreshToken, id: String(connection._id) })),
    events: calendarEvents.map((event) => ({ eventId: event.eventId, connectionId: String(event.connectionId) })),
  });
  for (const row of calendarEvents) await ctx.db.delete(row._id);
  for (const row of connections) await ctx.db.delete(row._id);
  for (const row of await ctx.db.query("gmailWatches").withIndex("by_case", (q) => q.eq("caseId", caseId)).collect()) await ctx.db.delete(row._id);
  for (const row of await ctx.db.query("gmailReplies").withIndex("by_case", (q) => q.eq("caseId", caseId)).collect()) await ctx.db.delete(row._id);
  for (const row of await ctx.db.query("googleOauthStates").withIndex("by_case", (q) => q.eq("caseId", caseId)).collect()) await ctx.db.delete(row._id);
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
