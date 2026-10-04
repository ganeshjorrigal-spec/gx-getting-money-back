import type { MutationCtx } from "../_generated/server";

export async function takeRate(ctx: MutationCtx, key: string, limit: number, durationMs: number): Promise<void> {
  const now = Date.now();
  const row = await ctx.db.query("rateCounters").withIndex("by_key", (q) => q.eq("key", key)).unique();
  if (!row) { await ctx.db.insert("rateCounters", { key, windowStart: now, count: 1 }); return; }
  if (row.windowStart + durationMs <= now) { await ctx.db.patch(row._id, { windowStart: now, count: 1 }); return; }
  if (row.count >= limit) throw new Error("Lots of cases right now. Please try again in a few minutes.");
  await ctx.db.patch(row._id, { count: row.count + 1 });
}
