import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { addDays, todayIST } from "../lib/dates";
import { caseReadSchema, type CaseRead } from "./lib/read";
import { planCase } from "./lib/plan";
import { TRIAGE_SYSTEM } from "./lib/prompts";
import { groundRead } from "./lib/ground";
import { draftForCase, draftMatchesFacts } from "./lib/draft";

const draftSchema = z.object({ subject: z.string().nullable(), body: z.string(), attachChecklist: z.array(z.string()) });
const draftSystem = `Write one short refund email from the saved facts. You do not send it. Never call a moved or postponed event cancelled. Include every completed step and its date, the amount, booking ID, and a promised refund date when supplied. Dates must look like 5 Oct 2026. Omit unknown details entirely; never use placeholders such as {name}. No invented contacts, links, rules or legal threats. Polite, firm, first person, under 160 words. Return the JSON schema only. No "to" field.`;

function knownAnswer(previous: CaseRead | undefined, answer: string | undefined, today: string, question: string | undefined): CaseRead | null {
  if (!previous || !answer) return null;
  const value = answer.trim();
  if (question === "messageDate") {
    const date = value.toLowerCase() === "today" ? today : value.toLowerCase() === "yesterday" ? addDays(today, -1) : /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;
    if (date) return { ...previous, route: "WAIT", messageDate: date, questions: [] };
  }
  if (question === "paymentStatusShown") {
    const status = value.toLowerCase();
    if (["failed", "pending", "successful"].includes(status)) return { ...previous, route: "FAILED_PAYMENT", paymentStatusShown: status === "successful" ? "success" : status as "failed" | "pending", questions: [] };
  }
  return null;
}

export const triage = internalAction({
  args: { caseId: v.id("cases"), runId: v.string(), autoRetry: v.optional(v.boolean()), reuseFacts: v.optional(v.boolean()) },
  returns: v.null(),
  handler: async (ctx, { caseId, runId, autoRetry, reuseFacts }) => {
    const loaded = await ctx.runQuery(internal.agentData.load, { caseId });
    if (!loaded || loaded.item.latestRunId !== runId) return null;
    const today = todayIST();
    const latest = loaded.inputs.at(-1);
    const previous = loaded.item.facts as CaseRead | undefined;
    let read = reuseFacts && previous ? previous : latest?.kind === "answer" ? knownAnswer(previous, latest.text, today, loaded.item.questions?.[0]?.id) : null;
    let usedModel = "code";
    let latencyMs = 0;
    if (!read) {
      const modelIds = [process.env.GEMINI_MODEL, process.env.GEMINI_MODEL_FALLBACK].filter((model): model is string => !!model);
      if (!modelIds.length) { await ctx.runMutation(internal.agentWrites.fail, { caseId, runId, autoRetry: !!autoRetry }); return null; }
      const content: Array<{ type: "text"; text: string } | { type: "image"; image: Uint8Array; mediaType: string }> = [
        { type: "text", text: `Today in India: ${today}.\nPrior facts: ${previous ? JSON.stringify(previous) : "none"}\nCase history: ${loaded.events.map((e: { summary: string }) => e.summary).join("; ")}\nUser input: ${loaded.inputs.map((i: { text?: string }) => i.text ?? "").join("\n")}` },
      ];
      for (const storageId of latest?.storageIds ?? []) {
        const blob = await ctx.storage.get(storageId);
        if (blob) content.push({ type: "image", image: new Uint8Array(await blob.arrayBuffer()), mediaType: blob.type || "image/jpeg" });
      }
      await ctx.runMutation(internal.agentWrites.progress, { caseId, runId, step: "reading" });
      for (const modelId of modelIds.slice(0, 2)) {
        const started = Date.now();
        try {
          const result = await generateObject({
            model: google(modelId), schema: caseReadSchema, system: TRIAGE_SYSTEM,
            messages: [{ role: "user", content }], maxOutputTokens: 1800, abortSignal: AbortSignal.timeout(20_000), maxRetries: 0,
            providerOptions: { google: { thinkingConfig: { thinkingLevel: "low" } } },
          });
          read = groundRead(caseReadSchema.parse(result.object), latest?.text ?? "", today);
          usedModel = modelId;
          latencyMs = Date.now() - started;
          break;
        } catch {
          latencyMs += Date.now() - started;
        }
      }
      if (!read) { await ctx.runMutation(internal.agentWrites.fail, { caseId, runId, autoRetry: !!autoRetry }); return null; }
    }
    await ctx.runMutation(internal.agentWrites.progress, { caseId, runId, step: "route" });
    const plan = planCase({ read, today, history: { ladderLevel: loaded.item.ladderLevel, draftsShown: loaded.item.draftsShown, sentSteps: [], actionDoneAt: loaded.item.actionDoneAt }, paid: ["claimed", "confirmed"].includes(loaded.item.paidState) || !!(loaded.item.paymentGraceUntil && loaded.item.paymentGraceUntil > Date.now()) || !process.env.NEXT_PUBLIC_UPI_VPA });
    await ctx.runMutation(internal.agentWrites.progress, { caseId, runId, step: "date" });
    const applied = await ctx.runMutation(internal.agentWrites.applyTriage, { caseId, runId, read, plan, model: usedModel, latencyMs });
    if (!applied || plan.nextStep === "none" || plan.nextStep === "questions" || plan.nextStep === "options" || plan.nextStep === "waitlist" || plan.locked) return null;
    await ctx.runMutation(internal.agentWrites.progress, { caseId, runId, step: "writing" });
    let draft = draftForCase(read, today, plan.nextStep, plan.dueDate);
    let draftModel = "safe_template";
    let draftLatency = 0;
    const draftModelId = process.env.GEMINI_MODEL;
    if (draftModelId && ["L0_email", "L0_chat"].includes(plan.nextStep)) {
      const started = Date.now();
      try {
        const output = await generateObject({
          model: google(draftModelId), schema: draftSchema, system: draftSystem,
          prompt: `Today: ${today}. Step: ${plan.nextStep}. Facts: ${JSON.stringify(read)}. A safe skeleton: ${draft.body}`,
          maxOutputTokens: 700, abortSignal: AbortSignal.timeout(20_000), maxRetries: 0,
          providerOptions: { google: { thinkingConfig: { thinkingLevel: "low" } } },
        });
        if (draftMatchesFacts({ ...output.object, subject: output.object.subject ?? draft.subject }, read, plan.dueDate)) { draft = { ...output.object, subject: output.object.subject ?? draft.subject }; draftModel = draftModelId; }
      } catch { /* Use the checked template when draft generation fails. */ }
      draftLatency = Date.now() - started;
    }
    const channel = plan.nextStep === "ACTION_form" ? "form" : plan.nextStep === "TRACE_bank" ? "bank" : plan.nextStep === "L0_chat" ? "chat" : "email";
    const to = channel === "email" && plan.nextStep === "L0_email" && read.platform === "district" ? "support@district.in" : channel === "email" && plan.nextStep !== "L1" ? read.contactsInText.find((contact) => contact.kind === "email")?.value : undefined;
    await ctx.runMutation(internal.agentWrites.saveDraft, {
      caseId, runId, step: plan.nextStep, channel, to, subject: draft.subject ?? undefined, body: draft.body,
      attachChecklist: draft.attachChecklist, model: draftModel, latencyMs: draftLatency,
    });
    return null;
  },
});
