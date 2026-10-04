import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { takeRate } from "./lib/rate";

export const generateUploadUrl = mutation({
  args: { deviceId: v.string() },
  returns: v.string(),
  handler: async (ctx, { deviceId }) => {
    if (!/^[A-Za-z0-9_-]{12,100}$/.test(deviceId)) throw new Error("Invalid device");
    await takeRate(ctx, `upload:${deviceId}`, 20, 3_600_000);
    return ctx.storage.generateUploadUrl();
  },
});
