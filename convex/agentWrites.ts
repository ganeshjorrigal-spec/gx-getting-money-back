import { internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import type { CaseRead } from "./lib/read";
import type { Plan } from "./lib/plan";
import { codedSubject } from "../lib/google-tracking";

export const progress = internalMutation({
  args: { caseId: v.id("cases"), runId: v.string(), step: v.string() },
  returns: v.null(),
  handler: async (ctx, { caseId, runId, step }) => {
    const item = await ctx.db.get(caseId);
    if (item?.latestRunId === runId) await ctx.db.patch(caseId, { progress: { step, at: Date.now() } });
    return null;
  },
});

export const applyTriage = internalMutation({
  args: { caseId: v.id("cases"), runId: v.string(), read: v.any(), plan: v.any(), model: v.string(), latencyMs: v.number(), inputTokens: v.number(), outputTokens: v.number(), totalTokens: v.number() },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.caseId);
    if (!item || item.latestRunId !== args.runId) return false;
    const read = args.read as CaseRead;
    const plan = args.plan as Plan;
    const now = Date.now();
    const previous = await ctx.db.query("checkins").withIndex("by_case", (q) => q.eq("caseId", args.caseId)).take(30);
    for (const row of previous) if (row.status === "scheduled") {
      if (row.scheduledId) await ctx.scheduler.cancel(row.scheduledId);
      await ctx.db.patch(row._id, { status: "cancelled" });
    }
    await ctx.db.patch(args.caseId, {
      stage: plan.route === "NEED_INFO" ? "NEED_INFO" : plan.route === "OUT_OF_SCOPE" ? "CLOSED_OUT_OF_SCOPE" : plan.route === "NO_ROUTE" && plan.nextStep === "options" ? "CLOSED_NO_ROUTE" : "READY",
      route: plan.route, routeConfidence: read.routeConfidence, facts: read,
      platform: read.platformNameAsWritten ?? read.platform, eventName: read.eventName ?? undefined,
      amountPaise: read.amountPaid == null ? undefined : Math.round(read.amountPaid * 100),
      dueDate: plan.dueDate ?? undefined, dueSource: plan.dueSource ?? undefined, dueSourceText: plan.dueSourceText ?? undefined,
      nextStep: plan.nextStep, questions: plan.questions, tier: plan.tier,
      compensationRupees: plan.compensationRupees ?? undefined,
      progress: { step: plan.nextStep === "none" || plan.route === "NEED_INFO" ? "done" : "writing", at: now },
      updatedAt: now,
    });
    for (const checkin of plan.checkins) {
      const checkinId = await ctx.db.insert("checkins", { caseId: args.caseId, date: checkin.date, reason: checkin.reason, status: "scheduled" });
      const time = Math.max(now, Date.parse(`${checkin.date}T04:30:00.000Z`));
      const scheduledId = await ctx.scheduler.runAt(time, internal.checkins.fire, { checkinId });
      await ctx.db.patch(checkinId, { scheduledId });
    }
    await ctx.scheduler.runAfter(0, internal.googleActions.syncCheckins, { caseId: args.caseId });
    await ctx.scheduler.runAfter(0, internal.responsesActions.syncCase, { caseId: args.caseId });
    await ctx.db.insert("caseEvents", { caseId: args.caseId, type: "triaged", summary: read.summaryForUser.slice(0, 180), actor: "agent", createdAt: now });
    await ctx.db.insert("agentRuns", { caseId: args.caseId, runId: args.runId, step: "triage", model: args.model, attempt: 1, status: "done", latencyMs: args.latencyMs, inputTokens: args.inputTokens, outputTokens: args.outputTokens, totalTokens: args.totalTokens, createdAt: now });
    return true;
  },
});

export const saveDraft = internalMutation({
  args: {
    caseId: v.id("cases"), runId: v.string(), step: v.string(), channel: v.string(),
    to: v.optional(v.string()), subject: v.optional(v.string()), body: v.string(), attachChecklist: v.array(v.string()),
    model: v.string(), latencyMs: v.number(), inputTokens: v.number(), outputTokens: v.number(), totalTokens: v.number(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.caseId);
    if (!item || item.latestRunId !== args.runId) return null;
    const now = Date.now();
    await ctx.db.insert("drafts", {
      caseId: args.caseId, step: args.step, channel: args.channel, to: args.to,
      subject: args.channel === "email" ? codedSubject(args.subject, item.code) : args.subject,
      body: args.body, attachChecklist: args.attachChecklist, status: "ready", createdAt: now,
    });
    await ctx.db.patch(args.caseId, { draftsShown: item.draftsShown + 1, progress: { step: "done", at: now }, updatedAt: now });
    await ctx.db.insert("agentRuns", { caseId: args.caseId, runId: args.runId, step: "draft", model: args.model, attempt: 1, status: "done", latencyMs: args.latencyMs, inputTokens: args.inputTokens, outputTokens: args.outputTokens, totalTokens: args.totalTokens, createdAt: now });
    await ctx.scheduler.runAfter(0, internal.responsesActions.syncCase, { caseId: args.caseId });
    return null;
  },
});

export const fail = internalMutation({
  args: { caseId: v.id("cases"), runId: v.string(), autoRetry: v.boolean() },
  returns: v.null(),
  handler: async (ctx, { caseId, runId, autoRetry }) => {
    const item = await ctx.db.get(caseId);
    if (!item || item.latestRunId !== runId) return null;
    const now = Date.now();
    await ctx.db.patch(caseId, { stage: "ERROR", progress: { step: "failed", at: now }, updatedAt: now });
    await ctx.db.insert("caseEvents", { caseId, type: "error", summary: "We could not read this yet. Your message is saved.", actor: "system", createdAt: now });
    if (!autoRetry) await ctx.scheduler.runAfter(60_000, internal.agent.triage, { caseId, runId, autoRetry: true });
    return null;
  },
});
