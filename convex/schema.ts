import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const route = v.union(v.literal("WAIT"), v.literal("OVERDUE"), v.literal("ACTION_NEEDED"), v.literal("TRACE"), v.literal("FAILED_PAYMENT"), v.literal("NO_ROUTE"), v.literal("NEED_INFO"), v.literal("OUT_OF_SCOPE"));
const stage = v.union(v.literal("TRIAGING"), v.literal("NEED_INFO"), v.literal("READY"), v.literal("ACTED"), v.literal("WAITING"), v.literal("DUE"), v.literal("CLOSED_LANDED"), v.literal("CLOSED_NO_ROUTE"), v.literal("CLOSED_OUT_OF_SCOPE"), v.literal("ERROR"));

export default defineSchema({
  cases: defineTable({
    code: v.string(), tokenHash: v.string(), stage, route: v.optional(route),
    routeConfidence: v.optional(v.number()), facts: v.optional(v.any()), platform: v.optional(v.string()),
    eventName: v.optional(v.string()), amountPaise: v.optional(v.number()), dueDate: v.optional(v.string()),
    dueSource: v.optional(v.string()), dueSourceText: v.optional(v.string()), nextStep: v.optional(v.string()),
    questions: v.optional(v.any()), compensationRupees: v.optional(v.number()),
    progress: v.optional(v.object({ step: v.string(), at: v.number() })), latestRunId: v.optional(v.string()),
    ladderLevel: v.number(), draftsShown: v.number(),
    tier: v.union(v.literal("free_small"), v.literal("free_check"), v.literal("unknown_amount")),
    paidState: v.union(v.literal("none"), v.literal("claimed"), v.literal("confirmed"), v.literal("not_found")),
    recoveredPaise: v.optional(v.number()), actionDoneAt: v.optional(v.string()), source: v.optional(v.string()),
    createdAt: v.number(), updatedAt: v.number(), closedAt: v.optional(v.number()), purgeAfter: v.optional(v.number()),
  }).index("by_code", ["code"]).index("by_stage", ["stage"]).index("by_stage_updated", ["stage", "updatedAt"]).index("by_purge_after", ["purgeAfter"]),
  inputs: defineTable({
    caseId: v.id("cases"), kind: v.union(v.literal("initial"), v.literal("reply"), v.literal("answer")),
    text: v.optional(v.string()), storageIds: v.array(v.id("_storage")), createdAt: v.number(),
  }).index("by_case", ["caseId"]),
  caseEvents: defineTable({
    caseId: v.id("cases"), type: v.string(), summary: v.string(), actor: v.union(v.literal("user"), v.literal("agent"), v.literal("system")),
    createdAt: v.number(),
  }).index("by_case", ["caseId", "createdAt"]),
  drafts: defineTable({
    caseId: v.id("cases"), step: v.string(), channel: v.string(), to: v.optional(v.string()),
    subject: v.optional(v.string()), body: v.string(), attachChecklist: v.array(v.string()),
    status: v.union(v.literal("ready"), v.literal("opened"), v.literal("sent")), createdAt: v.number(),
  }).index("by_case", ["caseId"]),
  checkins: defineTable({
    caseId: v.id("cases"), date: v.string(), reason: v.string(), scheduledId: v.optional(v.id("_scheduled_functions")),
    status: v.union(v.literal("scheduled"), v.literal("fired"), v.literal("answered"), v.literal("cancelled")),
  }).index("by_case", ["caseId"]),
  agentRuns: defineTable({
    caseId: v.id("cases"), runId: v.string(), step: v.string(), model: v.string(), attempt: v.number(), status: v.string(),
    latencyMs: v.number(), error: v.optional(v.string()), createdAt: v.number(),
  }).index("by_case", ["caseId"]),
  rateCounters: defineTable({ key: v.string(), windowStart: v.number(), count: v.number() }).index("by_key", ["key"]),
  waitlist: defineTable({ category: v.string(), contact: v.string(), createdAt: v.number() }),
  payments: defineTable({ code: v.string(), amountPaise: v.number(), status: v.union(v.literal("claimed"), v.literal("confirmed"), v.literal("not_found")), claimedAt: v.number() }).index("by_code", ["code"]),
  feedback: defineTable({ caseId: v.id("cases"), worthIt: v.boolean(), comment: v.optional(v.string()), createdAt: v.number() }).index("by_case", ["caseId"]),
});
