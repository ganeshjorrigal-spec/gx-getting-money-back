import { demoSheetPlatform } from "../lib/demo";
import { internalMutation, internalQuery, query } from "./_generated/server";
import { v } from "convex/values";

export const status = query({
  args: {},
  returns: v.object({ connected: v.boolean(), sheetUrl: v.union(v.string(), v.null()) }),
  handler: async (ctx) => {
    const config = await ctx.db.query("responsesSheetConfig").first();
    return { connected: !!config, sheetUrl: config?.sheetUrl ?? null };
  },
});

export const saveConfig = internalMutation({
  args: { connectionId: v.id("googleConnections"), spreadsheetId: v.string(), sheetUrl: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    for (const row of await ctx.db.query("responsesSheetConfig").collect()) await ctx.db.delete(row._id);
    for (const row of await ctx.db.query("responseSheetRows").collect()) await ctx.db.delete(row._id);
    const now = Date.now();
    await ctx.db.insert("responsesSheetConfig", { ...args, nextRow: 2, createdAt: now, updatedAt: now });
    return null;
  },
});

export const sheetContext = internalQuery({
  args: {}, returns: v.any(),
  handler: async (ctx) => {
    const config = await ctx.db.query("responsesSheetConfig").first();
    if (!config) return null;
    const connection = await ctx.db.get(config.connectionId);
    if (!connection || connection.kind !== "responses") return null;
    return { config, connection };
  },
});

export const reserveRow = internalMutation({
  args: { caseId: v.id("cases") }, returns: v.union(v.number(), v.null()),
  handler: async (ctx, { caseId }) => {
    const existing = await ctx.db.query("responseSheetRows").withIndex("by_case", (q) => q.eq("caseId", caseId)).unique();
    if (existing) { await ctx.db.patch(existing._id, { updatedAt: Date.now() }); return existing.row; }
    const config = await ctx.db.query("responsesSheetConfig").first();
    if (!config) return null;
    const row = config.nextRow;
    const now = Date.now();
    await ctx.db.patch(config._id, { nextRow: row + 1, updatedAt: now });
    await ctx.db.insert("responseSheetRows", { caseId, row, createdAt: now, updatedAt: now });
    return row;
  },
});

export const rowForCase = internalQuery({
  args: { caseId: v.id("cases") }, returns: v.any(),
  handler: async (ctx, { caseId }) => ctx.db.query("responseSheetRows").withIndex("by_case", (q) => q.eq("caseId", caseId)).unique(),
});

export const removeRow = internalMutation({
  args: { id: v.id("responseSheetRows") }, returns: v.null(),
  handler: async (ctx, { id }) => { if (await ctx.db.get(id)) await ctx.db.delete(id); return null; },
});

export const caseRow = internalQuery({
  args: { caseId: v.id("cases") }, returns: v.any(),
  handler: async (ctx, { caseId }) => {
    const item = await ctx.db.get(caseId);
    if (!item) return null;
    const drafts = await ctx.db.query("drafts").withIndex("by_case", (q) => q.eq("caseId", caseId)).order("desc").take(20);
    const events = await ctx.db.query("caseEvents").withIndex("by_case", (q) => q.eq("caseId", caseId)).order("desc").take(30);
    const inputs = await ctx.db.query("inputs").withIndex("by_case", (q) => q.eq("caseId", caseId)).order("desc").take(30);
    const feedback = await ctx.db.query("feedback").withIndex("by_case", (q) => q.eq("caseId", caseId)).first();
    const sentDraft = drafts.find((draft) => draft.status === "sent");
    const sentEvent = events.find((event) => event.type === "send_channel");
    const channel = sentEvent?.summary.match(/^You used (\w+)/)?.[1] ?? sentDraft?.channel ?? "";
    const lastReplyAt = item.lastTrackedReplyAt ?? inputs.find((input) => input.kind === "reply")?.createdAt ?? null;
    const feedbackText = feedback ? `${feedback.worthIt ? "Yes" : "No"}${feedback.comment ? ` — ${feedback.comment}` : ""}` : "";
    return {
      code: item.code, createdAt: item.createdAt, name: item.name ?? "", contact: item.contact ?? "",
      platform: `${item.demo ? "Demo · " : ""}${item.platform ?? ""}`, amount: item.amountPaise == null ? "" : item.amountPaise / 100,
      route: item.route ?? "", dueDate: item.dueDate ?? "", stage: item.stage, channel, lastReplyAt, feedback: feedbackText,
    };
  },
});

export const caseIds = internalQuery({
  args: {}, returns: v.any(),
  handler: async (ctx) => (await ctx.db.query("cases").order("desc").take(500)).map((item) => item._id),
});
