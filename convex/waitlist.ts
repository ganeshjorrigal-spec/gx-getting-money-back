import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { takeRate } from "./lib/rate";

export const join = mutation({
  args: { category: v.string(), contact: v.string(), deviceId: v.string() },
  returns: v.null(),
  handler: async (ctx, { category, contact, deviceId }) => {
    const value = contact.trim();
    if (!/^[A-Za-z0-9_-]{12,100}$/.test(deviceId)) throw new Error("Invalid device");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/^\+?[0-9\s-]{10,17}$/.test(value)) throw new Error("Enter an email or phone number");
    await takeRate(ctx, `waitlist:${deviceId}`, 10, 3_600_000);
    await ctx.db.insert("waitlist", { category: category.slice(0, 50), contact: value.slice(0, 150), createdAt: Date.now() });
    return null;
  },
});
