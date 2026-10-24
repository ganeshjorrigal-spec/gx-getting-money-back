import { mutation, internalMutation, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { assertAccess } from "./lib/access";
import { takeRate } from "./lib/rate";
import { addDays, todayIST } from "../lib/dates";
import { demoExpiry, demoClockAfterSkip, demoPlatformName, caseRecipient, demoSubject } from "../lib/demo";
import { codedSubject } from "../lib/google-tracking";
import { draftForCase } from "./lib/draft";
import type { CaseRead } from "./lib/read";

const access = { code: v.string(), token: v.string() };
export const create = mutation({
  args: { platform: v.union(v.literal("bookmyshow"), v.literal("district")), tokenHash: v.string(), deviceId: v.string(), kind: v.optional(v.union(v.literal("flight"), v.literal("event"))) },
  returns: v.object({ code: v.string() }),
  handler: async (ctx, args) => {
    throw new Error('Use the confirmed-email demo from the start page');
  },
});

export const skipAhead = mutation({
  args: access, returns: v.null(),
  handler: async (ctx, args) => {
    const item = await assertAccess(ctx, args.code, args.token);
    if (item.demo?.kind === "flight") {
      if(item.demo.round !== 3 || item.route!=="TRACE" || item.demo.phase !== "ready" || !item.dueDate || item.stage.startsWith("CLOSED")) throw new Error("Skip to the bank check date after the third reply");
      await ctx.db.patch(item._id,{demo:{...item.demo,now:item.dueDate},stage:"DUE",updatedAt:Date.now()});
      await ctx.db.insert("caseEvents",{caseId:item._id,type:"demo_skip",summary:"Demo clock moved to the promised bank date",actor:"user",createdAt:Date.now()});
      return null;
    }
    if (!item.demo || item.demo.round !== 1 || item.demo.phase !== "ready" || !item.dueDate || item.stage.startsWith("CLOSED")) throw new Error("Skip ahead is available after the first demo reply");
    const now = demoClockAfterSkip(item.demo.now, item.dueDate);
    const read = item.facts as CaseRead;
    const draft = draftForCase(read, now, "L1", item.dueDate, item.name);
    await ctx.db.patch(item._id, { demo: { ...item.demo, now }, route: "OVERDUE", nextStep: "L1", ladderLevel: 1, stage: "READY", updatedAt: Date.now() });
    await ctx.db.insert("drafts", { caseId: item._id, step: "L1", channel: "email", to: caseRecipient(true, process.env.TICKBACK_DEMO_ADDRESS), subject: demoSubject(true, codedSubject(`Refund follow-up for ${item.eventName}`, item.code)), body: draft.body, attachChecklist: [], status: "ready", createdAt: Date.now() });
    await ctx.db.insert("caseEvents", { caseId: item._id, type: "demo_skip", summary: "Demo clock moved 10 days past the due date; escalation ready", actor: "user", createdAt: Date.now() });
    await ctx.scheduler.runAfter(0, internal.responsesActions.syncCase, { caseId: item._id });
    return null;
  },
});

export const booking = mutation({
  args: { ...access, bookingId: v.string() }, returns: v.null(),
  handler: async (ctx, args) => {
    const item = await assertAccess(ctx, args.code, args.token);
    const bookingId = args.bookingId.trim();
    if (!item.demo || item.demo.kind === "flight" || item.demo.round !== 2 || item.demo.phase !== "ready" || item.stage.startsWith("CLOSED")) throw new Error("Booking ID is not needed now");
    if (!/^[A-Za-z0-9_-]{1,50}$/.test(bookingId)) throw new Error("Use a made-up ID with letters, numbers or dashes");
    const facts = { ...(item.facts as CaseRead), bookingId, questions: [] };
    await ctx.db.patch(item._id, { facts, stage: "READY", route: "OVERDUE", nextStep: "DEMO_booking", questions: [], updatedAt: Date.now() });
    await ctx.db.insert("inputs", { caseId: item._id, kind: "answer", text: `Demo booking ID: ${bookingId}`, storageIds: [], createdAt: Date.now() });
    await ctx.db.insert("drafts", { caseId: item._id, step: "DEMO_booking", channel: "email", to: caseRecipient(true, process.env.TICKBACK_DEMO_ADDRESS), subject: demoSubject(true, codedSubject(`Booking ID for ${item.eventName}`, item.code)), body: `Hello ${item.platform} team,\n\nMy booking ID is ${bookingId} for ${item.eventName}. The payment was ₹${((item.amountPaise ?? 240000) / 100).toLocaleString("en-IN")}. Please check the refund and share the reference.\n\nThank you.`, attachChecklist: [], status: "ready", createdAt: Date.now() });
    await ctx.scheduler.runAfter(0, internal.responsesActions.syncCase, { caseId: item._id });
    return null;
  },
});

export const load = internalQuery({
  args: { caseId: v.id("cases") }, returns: v.any(),
  handler: async (ctx, { caseId }) => {
    const item = await ctx.db.get(caseId);
    if (!item?.demo || item.demo.expiresAt <= Date.now() || item.stage.startsWith("CLOSED")) return null;
    const replies = await ctx.db.query("demoReplies").withIndex("by_case", q => q.eq("caseId", caseId)).take(4);
    const watches = await ctx.db.query("gmailWatches").withIndex("by_case", q => q.eq("caseId", caseId)).order("desc").take(1);
    return { item, replies, watch: watches[0] ?? null };
  },
});

export const reserve = internalMutation({
  args: { caseId: v.id("cases"), session: v.string(), messageId: v.string() }, returns: v.union(v.id("demoReplies"), v.null()),
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.caseId);
    if (!item?.demo || item.demo.session !== args.session || item.demo.phase !== "waiting_organiser" || item.demo.expiresAt <= Date.now() || item.stage.startsWith("CLOSED")) return null;
    const replies = await ctx.db.query("demoReplies").withIndex("by_case", q => q.eq("caseId", args.caseId)).take(4);
    if (replies.length >= 3 || replies.some(r => r.messageId === args.messageId || r.round === item.demo!.round + 1)) return null;
    return ctx.db.insert("demoReplies", { caseId: args.caseId, messageId: args.messageId, round: item.demo.round + 1, status: "reserved", createdAt: Date.now() });
  },
});

export const sent = internalMutation({
  args: { id: v.id("demoReplies"), session: v.string(), sameThread: v.boolean() }, returns: v.null(),
  handler: async (ctx, args) => {
    const reply = await ctx.db.get(args.id); if (!reply) return null;
    const item = await ctx.db.get(reply.caseId); if (!item?.demo || item.demo.session !== args.session) return null;
    await ctx.db.patch(reply._id, { status: "sent", sentAt: Date.now(), sameThread: args.sameThread });
    if (item.demo.round >= reply.round) return null;
    await ctx.db.patch(item._id, { demo: { ...item.demo, phase: "waiting_inbox", deadline: Date.now() + 60_000 }, updatedAt: Date.now() });
    await ctx.scheduler.runAfter(0, internal.demoActions.checkCaseInbox, { caseId: item._id, session: args.session });
    return null;
  },
});

export const connectionStatus = internalQuery({
  args: {}, returns: v.object({ connected: v.boolean() }),
  handler: async ctx => ({ connected: !!await ctx.db.query("googleConnections").withIndex("by_kind", q => q.eq("kind", "demo")).first() }),
});
export const recordAi = internalMutation({
  args: { caseId: v.id("cases"), runId: v.string(), model: v.string(), latencyMs: v.number(), inputTokens: v.number(), outputTokens: v.number(), totalTokens: v.number() }, returns: v.null(),
  handler: async (ctx, args) => {
    if (!await ctx.db.get(args.caseId)) return null;
    await ctx.db.insert("agentRuns", { ...args, step: "demo_opening", attempt: 1, status: "done", createdAt: Date.now() });
    return null;
  },
});

export const timeout = internalMutation({
  args: { caseId: v.id("cases"), session: v.string() }, returns: v.null(),
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.caseId);
    if (item?.demo?.session === args.session && item.demo.phase.startsWith("waiting")) await ctx.db.patch(item._id, { demo: { ...item.demo, phase: "timed_out" }, updatedAt: Date.now() });
    return null;
  },
});

export const expire = internalMutation({
  args: { caseId: v.id("cases") }, returns: v.null(),
  handler: async (ctx, { caseId }) => {
    const item = await ctx.db.get(caseId); if (!item?.demo) return null;
    if (item.demo.expiresAt > Date.now()) { await ctx.scheduler.runAt(item.demo.expiresAt, internal.demo.expire, { caseId }); return null; }
    const { deleteCaseData } = await import("./lib/delete");
    await deleteCaseData(ctx, item); return null;
  },
});

export const retry = mutation({
  args: access, returns: v.null(),
  handler: async (ctx, args) => {
    const item = await assertAccess(ctx, args.code, args.token);
    if (!item.demo || item.demo.phase !== "timed_out" || item.demo.round >= 3 || item.demo.expiresAt <= Date.now() || item.stage.startsWith("CLOSED")) throw new Error("This demo is not waiting for a retry");
    await takeRate(ctx, `demo-retry:${item._id}`, 6, 3_600_000);
    const replies = await ctx.db.query("demoReplies").withIndex("by_case", q => q.eq("caseId", item._id)).take(4);
    const pending = replies.find(reply => reply.round === item.demo!.round + 1);
    if (pending?.status === "reserved") throw new Error("The demo desk could not confirm delivery. Start a new demo to avoid a duplicate reply.");
    const session = crypto.randomUUID(); const phase = pending?.status === "sent" ? "waiting_inbox" as const : "waiting_organiser" as const;
      await ctx.db.patch(item._id, { demo: { ...item.demo, session, phase, deadline: Date.now() + (phase === "waiting_inbox" ? 60_000 : 120_000) }, ...(item.progress?.step === 'busy' ? {stage: 'READY' as const, progress: {step: 'reading', at: Date.now()}} : {}), updatedAt: Date.now() });
    await ctx.scheduler.runAfter(0, phase === "waiting_inbox" ? internal.demoActions.checkCaseInbox : internal.demoActions.checkOrganiser, { caseId: item._id, session });
    return null;
  },
});
