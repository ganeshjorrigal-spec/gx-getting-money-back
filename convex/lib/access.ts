import type { QueryCtx, MutationCtx } from "../_generated/server";
import type { Doc } from "../_generated/dataModel";

export async function hashToken(token: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function equalHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let i = 0; i < a.length; i += 1) difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return difference === 0;
}

export async function findCase(ctx: QueryCtx | MutationCtx, code: string, token: string): Promise<Doc<"cases"> | null> {
  if (!/^TB-[A-Z0-9]{6}$/.test(code) || !/^[A-Za-z0-9_-]{43}$/.test(token)) return null;
  const item = await ctx.db.query("cases").withIndex("by_code", (q) => q.eq("code", code)).unique();
  if (!item) return null;
  return equalHex(item.tokenHash, await hashToken(token)) ? item : null;
}

export async function assertAccess(ctx: QueryCtx | MutationCtx, code: string, token: string): Promise<Doc<"cases">> {
  const item = await findCase(ctx, code, token);
  if (!item) throw new Error("Case not found");
  return item;
}
