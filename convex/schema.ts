import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const route = v.union(v.literal("WAIT"), v.literal("OVERDUE"), v.literal("ACTION_NEEDED"), v.literal("TRACE"), v.literal("FAILED_PAYMENT"), v.literal("NO_ROUTE"), v.literal("NEED_INFO"), v.literal("OUT_OF_SCOPE"));
const stage = v.union(v.literal("TRIAGING"), v.literal("NEED_INFO"), v.literal("READY"), v.literal("ACTED"), v.literal("WAITING"), v.literal("DUE"), v.literal("CLOSED_LANDED"), v.literal("CLOSED_NO_ROUTE"), v.literal("CLOSED_OUT_OF_SCOPE"), v.literal("ERROR"));

export default defineSchema({
  cases: defineTable({
    code: v.string(), tokenHash: v.string(), stage, route: v.optional(route),
    firstFlightSentAt: v.optional(v.number()), deviceHash: v.optional(v.string()), handHelped: v.optional(v.boolean()), refundType: v.optional(v.union(v.literal("event"), v.literal("flight"))), owner: v.optional(v.string()), moneyWith: v.optional(v.string()), flightPlan: v.optional(v.any()),
    routeConfidence: v.optional(v.number()), facts: v.optional(v.any()), platform: v.optional(v.string()),
    eventName: v.optional(v.string()), amountPaise: v.optional(v.number()), dueDate: v.optional(v.string()),
    dueSource: v.optional(v.string()), dueSourceText: v.optional(v.string()), nextStep: v.optional(v.string()),
    questions: v.optional(v.any()), compensationRupees: v.optional(v.number()),
    progress: v.optional(v.object({ step: v.string(), at: v.number() })), latestRunId: v.optional(v.string()),
    ladderLevel: v.number(), draftsShown: v.number(),
    tier: v.union(v.literal("free_small"), v.literal("free_check"), v.literal("unknown_amount")),
    paidState: v.union(v.literal("none"), v.literal("claimed"), v.literal("confirmed"), v.literal("not_found")),
    recoveredPaise: v.optional(v.number()), actionDoneAt: v.optional(v.string()), source: v.optional(v.string()),
    factsConfirmedAt: v.optional(v.number()), paymentGraceUntil: v.optional(v.number()),
    createdAt: v.number(), updatedAt: v.number(), closedAt: v.optional(v.number()), purgeAfter: v.optional(v.number()),
    trackingDismissed: v.optional(v.boolean()), lastTrackedReplyAt: v.optional(v.number()),
    name: v.optional(v.string()), contact: v.optional(v.string()),
    demo: v.optional(v.object({ kind: v.optional(v.union(v.literal("flight"), v.literal("event"))), round: v.number(), now: v.string(), expiresAt: v.number(), phase: v.union(v.literal("ready"), v.literal("waiting_organiser"), v.literal("waiting_inbox"), v.literal("timed_out")), session: v.optional(v.string()), deadline: v.optional(v.number()), bankBy: v.optional(v.string()) })),
  }).index("by_demo_expiry", ["demo.expiresAt"]).index("by_device", ["deviceHash"]).index("by_code", ["code"]).index("by_stage", ["stage"]).index("by_stage_updated", ["stage", "updatedAt"]).index("by_purge_after", ["purgeAfter"]),
  demoReplies: defineTable({ caseId: v.id("cases"), messageId: v.string(), round: v.number(), status: v.union(v.literal("reserved"), v.literal("sent")), createdAt: v.number(), sentAt: v.optional(v.number()), receivedAt: v.optional(v.number()), sameThread: v.optional(v.boolean()) }).index("by_case", ["caseId"]).index("by_case_message", ["caseId", "messageId"]),
  inputs: defineTable({
    caseId: v.id("cases"), kind: v.union(v.literal("initial"), v.literal("reply"), v.literal("answer")),
    text: v.optional(v.string()), storageIds: v.array(v.id("_storage")), createdAt: v.number(),
    sender: v.optional(v.string()), receivedAt: v.optional(v.number()), summary: v.optional(v.string()),
    keySentence: v.optional(v.string()), seenAt: v.optional(v.number()), runId: v.optional(v.string()),
  }).index("by_case", ["caseId"]),
  caseEvents: defineTable({
    caseId: v.id("cases"), type: v.string(), summary: v.string(), actor: v.union(v.literal("user"), v.literal("agent"), v.literal("system")),
    createdAt: v.number(),
  }).index("by_case", ["caseId", "createdAt"]),
  drafts: defineTable({
    caseId: v.id("cases"), step: v.string(), channel: v.string(), to: v.optional(v.string()),
    subject: v.optional(v.string()), cc: v.optional(v.array(v.string())), body: v.string(), attachChecklist: v.array(v.string()),
    status: v.union(v.literal("ready"), v.literal("opened"), v.literal("sent")), createdAt: v.number(),
  }).index("by_case", ["caseId"]),
  checkins: defineTable({
    caseId: v.id("cases"), date: v.string(), reason: v.string(), scheduledId: v.optional(v.id("_scheduled_functions")),
    status: v.union(v.literal("scheduled"), v.literal("fired"), v.literal("answered"), v.literal("cancelled")),
  }).index("by_case", ["caseId"]),
  agentRuns: defineTable({
    caseId: v.id("cases"), runId: v.string(), step: v.string(), model: v.string(), attempt: v.number(), status: v.string(),
    latencyMs: v.number(), inputTokens: v.optional(v.number()), outputTokens: v.optional(v.number()), totalTokens: v.optional(v.number()),
    error: v.optional(v.string()), createdAt: v.number(),
  }).index("by_case", ["caseId"]),
  rateCounters: defineTable({ key: v.string(), windowStart: v.number(), count: v.number() }).index("by_key", ["key"]),
  waitlist: defineTable({ category: v.string(), contact: v.string(), createdAt: v.number() }),
  payments: defineTable({ code: v.string(), amountPaise: v.number(), status: v.union(v.literal("claimed"), v.literal("confirmed"), v.literal("not_found")), claimedAt: v.number() }).index("by_code", ["code"]),
  annualRecoveries: defineTable({sourceCode:v.string(),caseCode:v.string(),amountPaise:v.number(),landedAt:v.number()}).index("by_source",["sourceCode"]).index("by_case",["caseCode"]),
  annualPasses: defineTable({deviceHash:v.string(),sourceCode:v.string(),startedAt:v.number(),expiresAt:v.number(),state:v.union(v.literal("claimed"),v.literal("confirmed"),v.literal("not_found")),graceUntil:v.optional(v.number())}).index("by_device",["deviceHash"]).index("by_source",["sourceCode"]),
  feedback: defineTable({ caseId: v.id("cases"), worthIt: v.boolean(), comment: v.optional(v.string()), createdAt: v.number() }).index("by_case", ["caseId"]),
  googleOauthStates: defineTable({
    stateHash: v.string(), caseId: v.optional(v.id("cases")), kind: v.union(v.literal("calendar"), v.literal("gmail"), v.literal("inbox"), v.literal("responses"), v.literal("demo")),
    createdAt: v.number(), encryptedCaseToken: v.optional(v.string()),
  }).index("by_hash", ["stateHash"]).index("by_case", ["caseId"]),
  googleConnections: defineTable({
    caseId: v.optional(v.id("cases")), kind: v.union(v.literal("calendar"), v.literal("gmail"), v.literal("inbox"), v.literal("responses"), v.literal("demo")),
    email: v.optional(v.string()), encryptedRefreshToken: v.string(), encryptedCaseToken: v.optional(v.string()), connectedAt: v.number(),
  }).index("by_case", ["caseId"]).index("by_kind", ["kind"]),
  googleCalendarEvents: defineTable({
    caseId: v.id("cases"), connectionId: v.id("googleConnections"), eventId: v.string(), kind: v.union(v.literal("reply"), v.literal("checkin")),
    sourceId: v.string(), date: v.optional(v.string()), reason: v.optional(v.string()), createdAt: v.number(),
  }).index("by_case", ["caseId"]).index("by_source", ["caseId", "sourceId"]),
  gmailReplies: defineTable({
    caseId: v.id("cases"), messageId: v.string(), source: v.union(v.literal("inbox"), v.literal("gmail")), receivedAt: v.number(),
  }).index("by_case_message", ["caseId", "messageId"]).index("by_case", ["caseId"]),
  gmailWatches: defineTable({
    caseId: v.id("cases"), draftId: v.id("drafts"), sentAt: v.number(), threadId: v.optional(v.string()),
    noSentFound: v.optional(v.boolean()),
  }).index("by_case", ["caseId"]).index("by_sent_at", ["sentAt"]),
  responsesSheetConfig: defineTable({
    connectionId: v.id("googleConnections"), spreadsheetId: v.string(), sheetUrl: v.string(), nextRow: v.number(), createdAt: v.number(), updatedAt: v.number(),
  }),
  responseSheetRows: defineTable({
    caseId: v.id("cases"), row: v.number(), createdAt: v.number(), updatedAt: v.number(),
  }).index("by_case", ["caseId"]),
});
