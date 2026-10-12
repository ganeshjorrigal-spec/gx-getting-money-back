import { query } from "./_generated/server";
import { v } from "convex/values";
import { publicAppUrl } from "../lib/app-url";

export const urls = query({
  args: {},
  returns: v.object({ app: v.string(), oldApp: v.string() }),
  handler: () => ({ app: publicAppUrl(process.env), oldApp: process.env.CONVEX_SITE_URL ?? "" }),
});
