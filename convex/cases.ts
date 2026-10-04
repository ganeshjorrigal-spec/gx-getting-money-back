import { mutation, query, type MutationCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import { v } from "convex/values";
import { redact } from "../lib/redact";
import { addDays, addWorkingDays, todayIST } from "../lib/dates";
import { assertAccess, findCase } from "./lib/access";
import { takeRate } from "./lib/rate";
import { deleteCaseData } from "./lib/delete";

const accessArgs = { code: v.string(), token: v.string() };
const makeCode = () => `TB-${Math.random().toString(36).slice(2, 8).toUpperCase().padEnd(6, "X")}`;

async function clearCheckins(ctx: MutationCtx, caseId: Id<"cases">) {
  const rows = await ctx.db.query("checkins").withIndex("by_case", (q) => q.eq("caseId", caseId)).collect();
  for (const row of rows) if (row.status === "scheduled") {
    if (row.scheduledId) await ctx.scheduler.cancel(row.scheduledId);
    await ctx.db.patch(row._id, { status: "cancelled" });
  }
}

async function scheduleCheckin(ctx: MutationCtx, caseId: Id<"cases">, date: string, reason: string) {
  const checkinId = await ctx.db.insert("checkins", { caseId, date, reason, status: "scheduled" });
  const at = Math.max(Date.now(), Date.parse(`${date}T04:30:00.000Z`));
  const scheduledId = await ctx.scheduler.runAt(at, internal.checkins.fire, { checkinId });
  await ctx.db.patch(checkinId, { scheduledId });
}

export const create = mutation({
  args: {
    text: v.optional(v.string()), storageIds: v.array(v.id("_storage")), chips: v.array(v.string()),
    tokenHash: v.string(), deviceId: v.string(), source: v.optional(v.string()),
  },
  returns: v.object({ code: v.string() }),
  handler: async (ctx, args) => {
    if (!/^[a-f0-9]{64}$/.test(args.tokenHash)) throw new Error("Invalid case key");
    if (!/^[A-Za-z0-9_-]{12,100}$/.test(args.deviceId)) throw new Error("Invalid device");
    if (args.storageIds.length > 4 || (args.text?.length ?? 0) > 8_000) throw new Error("Message is too long");
    if (!args.text?.trim() && args.storageIds.length === 0 && args.chips.length === 0) throw new Error("Add a message or screenshot");
    await takeRate(ctx, `create:${args.deviceId}`, 5, 3_600_000);
    await takeRate(ctx, "create:global", 2_000, 86_400_000);
    let code = makeCode();
    for (let i = 0; i < 4; i += 1) {
      const existing = await ctx.db.query("cases").withIndex("by_code", (q) => q.eq("code", code)).unique();
      if (!existing) break;
      code = makeCode();
      if (i === 3) throw new Error("Could not make a case link");
    }
    const now = Date.now();
    const runId = Math.random().toString(36).slice(2);
    const caseId = await ctx.db.insert("cases", {
      code, tokenHash: args.tokenHash, stage: "TRIAGING", ladderLevel: 0, draftsShown: 0,
      tier: "unknown_amount", paidState: "none", latestRunId: runId,
      progress: { step: "reading", at: now }, source: args.source?.slice(0, 80),
      createdAt: now, updatedAt: now,
    });
    await ctx.db.insert("inputs", { caseId, kind: "initial", text: args.text ? redact(args.text) : undefined, storageIds: args.storageIds, createdAt: now });
    await ctx.db.insert("caseEvents", { caseId, type: "created", summary: "Case started", actor: "user", createdAt: now });
    await ctx.scheduler.runAfter(0, internal.agent.triage, { caseId, runId });
    return { code };
  },
});

export const get = query({
  args: accessArgs,
  returns: v.any(),
  handler: async (ctx, { code, token }) => {
    const item = await findCase(ctx, code, token);
    if (!item) return null;
    const checkin = await ctx.db.query("checkins").withIndex("by_case", (q) => q.eq("caseId", item._id)).order("desc").first();
    const feedback = await ctx.db.query("feedback").withIndex("by_case", (q) => q.eq("caseId", item._id)).first();
    return {
      code: item.code, stage: item.stage, route: item.route ?? null, routeConfidence: item.routeConfidence ?? null,
      platform: item.platform ?? null, eventName: item.eventName ?? null, amountPaise: item.amountPaise ?? null,
      dueDate: item.dueDate ?? null, dueSource: item.dueSource ?? null, dueSourceText: item.dueSourceText ?? null,
      nextStep: item.nextStep ?? null, questions: item.questions ?? [],
      progress: item.progress ?? null, tier: item.tier, paidState: item.paidState,
      compensationRupees: item.compensationRupees ?? null, updatedAt: item.updatedAt, createdAt: item.createdAt,
      recoveredPaise: item.recoveredPaise ?? null, ladderLevel: item.ladderLevel, draftsShown: item.draftsShown,
      actionsRequired: (item.facts as { actionsRequired?: unknown[] } | undefined)?.actionsRequired ?? [],
      outOfScopeCategory: (item.facts as { outOfScopeCategory?: string } | undefined)?.outOfScopeCategory ?? null,
      situation: (item.facts as { situation?: string } | undefined)?.situation ?? null,
      checkin: checkin ? { date: checkin.date, reason: checkin.reason, status: checkin.status } : null,
      paymentsEnabled: !!process.env.NEXT_PUBLIC_UPI_VPA,
      upiVpa: process.env.NEXT_PUBLIC_UPI_VPA ?? null, upiName: process.env.NEXT_PUBLIC_UPI_NAME ?? "Tickback",
      feedbackGiven: !!feedback,
    };
  },
});

export const timeline = query({
  args: accessArgs,
  returns: v.any(),
  handler: async (ctx, { code, token }) => {
    const item = await assertAccess(ctx, code, token);
    return ctx.db.query("caseEvents").withIndex("by_case", (q) => q.eq("caseId", item._id)).order("desc").take(30);
  },
});

export const drafts = query({
  args: accessArgs,
  returns: v.any(),
  handler: async (ctx, { code, token }) => {
    const item = await assertAccess(ctx, code, token);
    const rows = await ctx.db.query("drafts").withIndex("by_case", (q) => q.eq("caseId", item._id)).order("desc").take(10);
    const locked = !!process.env.NEXT_PUBLIC_UPI_VPA && item.tier !== "free_small" && !["claimed", "confirmed"].includes(item.paidState) && item.draftsShown > 1;
    return rows.map((row, index) => ({ ...row, body: locked && index === 0 ? null : row.body }));
  },
});

export const addReply = mutation({
  args: { ...accessArgs, text: v.optional(v.string()), storageIds: v.array(v.id("_storage")) },
  returns: v.null(),
  handler: async (ctx, { code, token, text, storageIds }) => {
    const item = await assertAccess(ctx, code, token);
    if (!text?.trim() && !storageIds.length) throw new Error("Add their reply first");
    if ((text?.length ?? 0) > 8_000 || storageIds.length > 4) throw new Error("Reply is too long");
    const now = Date.now();
    const runId = Math.random().toString(36).slice(2);
    await ctx.db.insert("inputs", { caseId: item._id, kind: "reply", text: text ? redact(text) : undefined, storageIds, createdAt: now });
    await ctx.db.patch(item._id, { stage: "TRIAGING", latestRunId: runId, progress: { step: "reading", at: now }, updatedAt: now });
    await ctx.db.insert("caseEvents", { caseId: item._id, type: "reply_added", summary: "Their reply added", actor: "user", createdAt: now });
    await ctx.scheduler.runAfter(0, internal.agent.triage, { caseId: item._id, runId });
    return null;
  },
});

export const markSent = mutation({
  args: { ...accessArgs, draftId: v.id("drafts") },
  returns: v.null(),
  handler: async (ctx, { code, token, draftId }) => {
    const item = await assertAccess(ctx, code, token);
    const draft = await ctx.db.get(draftId);
    if (!draft || draft.caseId !== item._id) throw new Error("Draft not found");
    if (draft.status === "sent") return null;
    const now = Date.now();
    const today = todayIST();
    await clearCheckins(ctx, item._id);
    await ctx.db.patch(draftId, { status: "sent" });
    await ctx.db.patch(item._id, { stage: "WAITING", updatedAt: now });
    await ctx.db.insert("caseEvents", { caseId: item._id, type: "marked_sent", summary: `You sent the ${draft.step} message`, actor: "user", createdAt: now });
    if (draft.step === "L0_email" || draft.step === "L0_chat" || draft.step === "NO_ROUTE_ask") await scheduleCheckin(ctx, item._id, addWorkingDays(today, 2), "support_reply");
    else if (draft.step === "L1") {
      await scheduleCheckin(ctx, item._id, addWorkingDays(today, 2), "grievance_ack");
      await scheduleCheckin(ctx, item._id, addDays(today, 30), "grievance_resolve");
    } else if (draft.step === "TRACE_ask") await scheduleCheckin(ctx, item._id, addWorkingDays(today, 3), "support_reply");
    else if (draft.step === "FAILED_bank") await scheduleCheckin(ctx, item._id, addWorkingDays(today, 5), "bank_reply");
    return null;
  },
});

export const markActionDone = mutation({
  args: accessArgs, returns: v.null(),
  handler: async (ctx, { code, token }) => {
    const item = await assertAccess(ctx, code, token);
    if (item.route !== "ACTION_NEEDED") throw new Error("This action is not needed for this case");
    const now = Date.now();
    const runId = Math.random().toString(36).slice(2);
    await clearCheckins(ctx, item._id);
    await ctx.db.patch(item._id, { actionDoneAt: todayIST(), stage: "TRIAGING", latestRunId: runId, progress: { step: "date", at: now }, updatedAt: now });
    await ctx.db.insert("caseEvents", { caseId: item._id, type: "action_done", summary: "You completed the refund action", actor: "user", createdAt: now });
    await ctx.scheduler.runAfter(0, internal.agent.triage, { caseId: item._id, runId, reuseFacts: true });
    return null;
  },
});

export const answerCheckin = mutation({
  args: { ...accessArgs, answer: v.union(v.literal("landed"), v.literal("not_yet"), v.literal("replied")), amountPaise: v.optional(v.number()) },
  returns: v.null(),
  handler: async (ctx, { code, token, answer, amountPaise }) => {
    const item = await assertAccess(ctx, code, token);
    if (item.stage.startsWith("CLOSED")) throw new Error("This case is closed");
    const now = Date.now();
    if (answer === "landed") {
      const amount = amountPaise ?? item.amountPaise;
      if (amount == null || !Number.isFinite(amount) || amount < 0) throw new Error("Enter the amount received");
      await clearCheckins(ctx, item._id);
      await ctx.db.patch(item._id, { stage: "CLOSED_LANDED", recoveredPaise: amount, closedAt: now, purgeAfter: now + 180 * 86_400_000, updatedAt: now });
      await ctx.db.insert("caseEvents", { caseId: item._id, type: "landed", summary: `₹${(amount / 100).toLocaleString("en-IN")} landed`, actor: "user", createdAt: now });
    } else if (answer === "not_yet") {
      const runId = Math.random().toString(36).slice(2);
      const sent = await ctx.db.query("drafts").withIndex("by_case", (q) => q.eq("caseId", item._id)).collect();
      const l0Sent = sent.some((draft) => draft.status === "sent" && ["L0_email", "L0_chat"].includes(draft.step));
      await clearCheckins(ctx, item._id);
      await ctx.db.patch(item._id, { stage: "TRIAGING", ladderLevel: l0Sent ? Math.max(1, item.ladderLevel + 1) : 0, latestRunId: runId, progress: { step: "route", at: now }, updatedAt: now });
      await ctx.db.insert("caseEvents", { caseId: item._id, type: "checkin_answered", summary: "Refund has not landed; finding the next step", actor: "user", createdAt: now });
      await ctx.scheduler.runAfter(0, internal.agent.triage, { caseId: item._id, runId, reuseFacts: true });
    } else {
      await ctx.db.insert("caseEvents", { caseId: item._id, type: "checkin_answered", summary: "The company replied", actor: "user", createdAt: now });
    }
    return null;
  },
});

export const setAmount = mutation({
  args: { ...accessArgs, amountPaise: v.number() }, returns: v.null(),
  handler: async (ctx, { code, token, amountPaise }) => {
    const item = await assertAccess(ctx, code, token);
    if (!Number.isInteger(amountPaise) || amountPaise < 0 || amountPaise > 10_000_000_00) throw new Error("Invalid amount");
    const runId = Math.random().toString(36).slice(2);
    await ctx.db.patch(item._id, { amountPaise, tier: amountPaise < 30_000 ? "free_small" : "free_check", stage: amountPaise < 30_000 ? "TRIAGING" : item.stage, latestRunId: amountPaise < 30_000 ? runId : item.latestRunId, updatedAt: Date.now() });
    if (amountPaise < 30_000 && item.facts) await ctx.scheduler.runAfter(0, internal.agent.triage, { caseId: item._id, runId, reuseFacts: true });
    return null;
  },
});

export const remove = mutation({
  args: accessArgs, returns: v.null(),
  handler: async (ctx, { code, token }) => {
    const item = await assertAccess(ctx, code, token);
    await deleteCaseData(ctx, item);
    return null;
  },
});

export const answerQuestions = mutation({
  args: { ...accessArgs, answers: v.string() },
  returns: v.null(),
  handler: async (ctx, { code, token, answers }) => {
    const item = await assertAccess(ctx, code, token);
    if (answers.length > 800) throw new Error("Answer is too long");
    const now = Date.now();
    const runId = Math.random().toString(36).slice(2);
    await ctx.db.insert("inputs", { caseId: item._id, kind: "answer", text: redact(answers), storageIds: [], createdAt: now });
    await ctx.db.patch(item._id, { stage: "TRIAGING", latestRunId: runId, progress: { step: "reading", at: now }, updatedAt: now });
    await ctx.scheduler.runAfter(0, internal.agent.triage, { caseId: item._id, runId });
    return null;
  },
});

export const retry = mutation({
  args: accessArgs,
  returns: v.null(),
  handler: async (ctx, { code, token }) => {
    const item = await assertAccess(ctx, code, token);
    const now = Date.now();
    const runId = Math.random().toString(36).slice(2);
    await ctx.db.patch(item._id, { stage: "TRIAGING", latestRunId: runId, progress: { step: "reading", at: now }, updatedAt: now });
    await ctx.scheduler.runAfter(0, internal.agent.triage, { caseId: item._id, runId });
    return null;
  },
});
