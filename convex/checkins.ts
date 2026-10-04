import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const fire = internalMutation({
  args: { checkinId: v.id("checkins") },
  returns: v.null(),
  handler: async (ctx, { checkinId }) => {
    const checkin = await ctx.db.get(checkinId);
    if (!checkin || checkin.status !== "scheduled") return null;
    const item = await ctx.db.get(checkin.caseId);
    if (!item || item.stage.startsWith("CLOSED")) return null;
    await ctx.db.patch(checkinId, { status: "fired" });
    if (["READY", "ACTED", "WAITING"].includes(item.stage)) await ctx.db.patch(item._id, { stage: "DUE", updatedAt: Date.now() });
    await ctx.db.insert("caseEvents", { caseId: item._id, type: "checkin_due", summary: "Time to check if the refund landed", actor: "system", createdAt: Date.now() });
    return null;
  },
});
