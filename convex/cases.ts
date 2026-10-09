import { demoSubject } from "../lib/demo";
import { mutation, query, type MutationCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import { v } from "convex/values";
import { redact } from "../lib/redact";
import { addDays, addWorkingDays, todayIST } from "../lib/dates";
import { assertAccess, findCase } from "./lib/access";
import { takeRate } from "./lib/rate";
import { deleteCaseData } from "./lib/delete";
import { draftForCase } from "./lib/draft";
import type { CaseRead } from "./lib/read";
import { codedSubject } from "../lib/google-tracking";

const accessArgs = { code: v.string(), token: v.string() };
const makeCode = () => `TB-${Math.random().toString(36).slice(2, 8).toUpperCase().padEnd(6, "X")}`;
const cleanLine = (value: string | undefined, max: number) => value?.trim().replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").slice(0, max) || undefined;

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
    tokenHash: v.string(), deviceId: v.string(), source: v.optional(v.string()), name: v.optional(v.string()), refundType: v.optional(v.union(v.literal("event"),v.literal("flight"))),
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
      name: cleanLine(args.name, 80),
      refundType: args.refundType,
      createdAt: now, updatedAt: now,
    });
    await ctx.db.insert("inputs", { caseId, kind: "initial", text: args.text ? redact(args.text) : undefined, storageIds: args.storageIds, createdAt: now });
    await ctx.db.insert("caseEvents", { caseId, type: "created", summary: "Case started", actor: "user", createdAt: now });
    await ctx.scheduler.runAfter(0, internal.agent.triage, { caseId, runId });
    await ctx.scheduler.runAfter(0, internal.responsesActions.syncCase, { caseId });
    return { code };
  },
});

export const get = query({
  args: accessArgs,
  returns: v.any(),
  handler: async (ctx, { code, token }) => {
    const item = await findCase(ctx, code, token);
    if (!item) return null;
    const checkins = await ctx.db.query("checkins").withIndex("by_case", (q) => q.eq("caseId", item._id)).collect();
    const checkin = checkins.filter((row) => row.status === "scheduled").sort((a, b) => a.date.localeCompare(b.date))[0];
    const oldCheckin = checkins.filter((row) => row.status === "cancelled" && row.date !== checkin?.date).sort((a, b) => b._creationTime - a._creationTime)[0];
    const feedback = await ctx.db.query("feedback").withIndex("by_case", (q) => q.eq("caseId", item._id)).first();
    const recentInputs = await ctx.db.query("inputs").withIndex("by_case", (q) => q.eq("caseId", item._id)).order("desc").take(20);
    const latestTrackedReply = recentInputs.find((input) => input.kind === "reply" && input.sender && input.receivedAt && input.summary && input.keySentence);
    return {
      code: item.code, refundType: item.refundType ?? "event", owner: item.owner ?? null, moneyWith: item.moneyWith ?? null, flightPlan: item.flightPlan ?? null, stage: item.stage, route: item.route ?? null, routeConfidence: item.routeConfidence ?? null,
      platform: item.platform ?? null, eventName: item.eventName ?? null, amountPaise: item.amountPaise ?? null,
      dueDate: item.dueDate ?? null, dueSource: item.dueSource ?? null, dueSourceText: item.dueSourceText ?? null,
      nextStep: item.nextStep ?? null, questions: item.questions ?? [],
      progress: item.progress ?? null, tier: item.tier, paidState: item.paidState,
      compensationRupees: item.compensationRupees ?? null, updatedAt: item.updatedAt, createdAt: item.createdAt,
      recoveredPaise: item.recoveredPaise ?? null, ladderLevel: item.ladderLevel, draftsShown: item.draftsShown,
      actionsRequired: (item.facts as { actionsRequired?: unknown[] } | undefined)?.actionsRequired ?? [],
      outOfScopeCategory: (item.facts as { outOfScopeCategory?: string } | undefined)?.outOfScopeCategory ?? null,
      situation: (item.facts as { situation?: string } | undefined)?.situation ?? null,
      facts: item.facts ?? null, factsConfirmedAt: item.factsConfirmedAt ?? null,
      oldCheckinDate: oldCheckin?.date ?? null, paymentGraceUntil: item.paymentGraceUntil ?? null,
      checkin: checkin ? { date: checkin.date, reason: checkin.reason, status: checkin.status } : null,
      paymentsEnabled: !!process.env.NEXT_PUBLIC_UPI_VPA,
      upiVpa: process.env.NEXT_PUBLIC_UPI_VPA ?? null, upiName: process.env.NEXT_PUBLIC_UPI_NAME ?? "Tickback",
      feedbackGiven: !!feedback,
      name: item.name ?? null, contact: item.contact ?? null,
      demo: item.demo ?? null,
      newReply: latestTrackedReply && !latestTrackedReply.seenAt ? {
        _id: latestTrackedReply._id,
        sender: latestTrackedReply.sender!, receivedAt: latestTrackedReply.receivedAt!,
        summary: latestTrackedReply.summary!, keySentence: latestTrackedReply.keySentence!,
      } : null,
    };
  },
});

export const markReplySeen = mutation({
  args: { ...accessArgs, inputId: v.id("inputs") },
  returns: v.null(),
  handler: async (ctx, { code, token, inputId }) => {
    const item = await assertAccess(ctx, code, token);
    const input = await ctx.db.get(inputId);
    if (!input || input.caseId !== item._id || input.kind !== "reply") throw new Error("Reply not found");
    if (!input.seenAt) await ctx.db.patch(inputId, { seenAt: Date.now() });
    return null;
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
    const locked = !!process.env.NEXT_PUBLIC_UPI_VPA && item.tier !== "free_small" && !["claimed", "confirmed"].includes(item.paidState) && !(item.paymentGraceUntil && item.paymentGraceUntil > Date.now()) && item.draftsShown > 1;
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
    await ctx.scheduler.runAfter(0, internal.responsesActions.syncCase, { caseId: item._id });
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
    if (item.demo) {
      if (item.demo.expiresAt <= Date.now() || item.demo.round >= 3 || item.demo.phase.startsWith("waiting")) throw new Error("This demo round is not ready to send");
      if (item.demo.round === 1 && item.route !== "OVERDUE") throw new Error("Skip ahead before sending the escalation");
      if (item.demo.round === 2 && !item.facts?.bookingId) throw new Error("Add a demo booking ID first");
      const session = crypto.randomUUID();
      await ctx.db.patch(item._id, { demo: { ...item.demo, session, phase: "waiting_organiser", deadline: Date.now() + 120_000 } });
      await ctx.scheduler.runAfter(0, internal.demoActions.checkOrganiser, { caseId: item._id, session });
    }
    const now = Date.now();
    const today = todayIST();
    await clearCheckins(ctx, item._id);
    await ctx.db.patch(draftId, { status: "sent" });
    await ctx.db.patch(item._id, { stage: "WAITING", updatedAt: now });
    await ctx.db.insert("caseEvents", { caseId: item._id, type: "marked_sent", summary: `You sent the ${draft.step} message`, actor: "user", createdAt: now });
    if (draft.channel === "email") await ctx.db.insert("gmailWatches", { caseId: item._id, draftId, sentAt: now });
    if (draft.step === "L0_email" || draft.step === "L0_chat" || draft.step === "NO_ROUTE_ask") await scheduleCheckin(ctx, item._id, addWorkingDays(today, 2), "support_reply");
    else if (draft.step === "L1") {
      await scheduleCheckin(ctx, item._id, addWorkingDays(today, 3), "grievance_ack");
      await scheduleCheckin(ctx, item._id, addDays(today, 30), "grievance_resolve");
    } else if (draft.step === "TRACE_ask") await scheduleCheckin(ctx, item._id, addWorkingDays(today, 3), "support_reply");
    else if (draft.step === "FAILED_platform") await scheduleCheckin(ctx, item._id, addWorkingDays(today, 2), "support_reply");
    await ctx.scheduler.runAfter(0, internal.googleActions.syncCheckins, { caseId: item._id });
    await ctx.scheduler.runAfter(0, internal.responsesActions.syncCase, { caseId: item._id });
    return null;
  },
});

export const recordSendChannel = mutation({
  args: { ...accessArgs, channel: v.union(v.literal("email"), v.literal("chat"), v.literal("form"), v.literal("phone")) }, returns: v.null(),
  handler: async (ctx, { code, token, channel }) => {
    const item = await assertAccess(ctx, code, token);
    await ctx.db.insert("caseEvents", { caseId: item._id, type: "send_channel", summary: `You used ${channel} to contact them`, actor: "user", createdAt: Date.now() });
    await ctx.scheduler.runAfter(0, internal.responsesActions.syncCase, { caseId: item._id });
    return null;
  },
});

export const markActionDone = mutation({
  args: { ...accessArgs, completedDate: v.string() }, returns: v.null(),
  handler: async (ctx, { code, token, completedDate }) => {
    const item = await assertAccess(ctx, code, token);
    if (item.route !== "ACTION_NEEDED") throw new Error("This action is not needed for this case");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(completedDate) || completedDate > todayIST()) throw new Error("Choose when you finished the step");
    const now = Date.now();
    const runId = Math.random().toString(36).slice(2);
    await clearCheckins(ctx, item._id);
    await ctx.db.patch(item._id, { actionDoneAt: completedDate, stage: "TRIAGING", latestRunId: runId, progress: { step: "date", at: now }, updatedAt: now });
    await ctx.db.insert("caseEvents", { caseId: item._id, type: "action_done", summary: "You completed the refund action", actor: "user", createdAt: now });
    await ctx.scheduler.runAfter(0, internal.agent.triage, { caseId: item._id, runId, reuseFacts: true });
    return null;
  },
});

export const confirmFacts = mutation({
  args: { ...accessArgs, looksRight: v.boolean(), correction: v.optional(v.string()), bookingId: v.optional(v.string()), contact: v.optional(v.string()) }, returns: v.null(),
  handler: async (ctx, { code, token, looksRight, correction, bookingId, contact }) => {
    const item = await assertAccess(ctx, code, token);
    const savedContact = contact === undefined ? item.contact : cleanLine(contact, 150);
    if (savedContact && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(savedContact) && savedContact.replace(/\D/g, "").length < 7) throw new Error("Enter a phone number or email");
    const previousFacts = item.facts as CaseRead | undefined;
    const savedBookingId = bookingId === undefined ? previousFacts?.bookingId : cleanLine(bookingId, 100) ?? null;
    const facts = previousFacts ? { ...previousFacts, bookingId: savedBookingId ?? null } : previousFacts;
    if (looksRight) {
      await ctx.db.patch(item._id, { facts, contact: savedContact, factsConfirmedAt: Date.now(), updatedAt: Date.now() });
      if (facts && item.nextStep) {
        const latestDraft = await ctx.db.query("drafts").withIndex("by_case", (q) => q.eq("caseId", item._id)).order("desc").first();
        if (latestDraft && latestDraft.status !== "sent") {
          const updated = draftForCase(facts, todayIST(), item.nextStep, item.dueDate ?? null, item.name);
          await ctx.db.patch(latestDraft._id, {
            subject: latestDraft.channel === "email" ? demoSubject(!!item.demo, codedSubject(updated.subject, item.code)) : updated.subject,
            body: updated.body,
            attachChecklist: item.demo ? [] : updated.attachChecklist,
          });
        }
      }
      await ctx.scheduler.runAfter(0, internal.responsesActions.syncCase, { caseId: item._id });
      return null;
    }
    if (!correction?.trim()) throw new Error("Tell us what needs fixing");
    const now = Date.now();
    const runId = Math.random().toString(36).slice(2);
    const answer = `${correction.trim()}${savedBookingId ? `\nBooking ID: ${savedBookingId}` : ""}`;
    await ctx.db.insert("inputs", { caseId: item._id, kind: "answer", text: redact(answer), storageIds: [], createdAt: now });
    await ctx.db.patch(item._id, { facts, contact: savedContact, factsConfirmedAt: undefined, stage: "TRIAGING", latestRunId: runId, progress: { step: "reading", at: now }, updatedAt: now });
    await ctx.scheduler.runAfter(0, internal.agent.triage, { caseId: item._id, runId });
    await ctx.scheduler.runAfter(0, internal.responsesActions.syncCase, { caseId: item._id });
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
      if (item.demo && item.demo.round !== 3) throw new Error("Finish the three demo rounds before Money landed");
      const amount = amountPaise ?? item.amountPaise;
      if (amount == null || !Number.isFinite(amount) || amount < 0) throw new Error("Enter the amount received");
      await clearCheckins(ctx, item._id);
      await ctx.db.patch(item._id, { stage: "CLOSED_LANDED", recoveredPaise: amount, closedAt: now, purgeAfter: item.demo ? item.demo.expiresAt : now + 180 * 86_400_000, updatedAt: now });
      await ctx.db.insert("caseEvents", { caseId: item._id, type: "landed", summary: `₹${(amount / 100).toLocaleString("en-IN")} landed`, actor: "user", createdAt: now });
      await ctx.scheduler.runAfter(0, internal.googleActions.cleanupCase, { caseId: item._id });
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
    await ctx.scheduler.runAfter(0, internal.responsesActions.syncCase, { caseId: item._id });
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
    await ctx.scheduler.runAfter(0, internal.responsesActions.syncCase, { caseId: item._id });
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
