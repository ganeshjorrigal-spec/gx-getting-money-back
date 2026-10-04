import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { addDays, addWorkingDays, todayIST } from "../lib/dates";
import { caseReadSchema, type CaseRead } from "./lib/read";
import { planCase } from "./lib/plan";
import { TRIAGE_SYSTEM } from "./lib/prompts";
import { groundRead } from "./lib/ground";

const draftSchema = z.object({ subject: z.string().nullable(), body: z.string(), attachChecklist: z.array(z.string()) });
const draftSystem = `Write one short email for an event-ticket refund user to send from their own email. You do not send it. Use only supplied facts. Keep unknown facts as {name}, {registered email or phone}, or similar placeholders. No invented email addresses, phone numbers, URLs, rules or legal threats. Polite, firm, specific, first person. Under 160 words. Ask for refund to original payment method and the reference number. Do not ask for OTP, PIN, password or CVV. Return the JSON schema only. Do not include a "to" field.`;

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

function safeDraft(read: CaseRead, today: string, step: string): z.infer<typeof draftSchema> {
  const platform = read.platformNameAsWritten ?? "the organiser";
  const booking = read.bookingId ?? "{booking ID}";
  const event = read.eventName ?? "{event name}";
  const amount = read.amountPaid == null ? "{amount}" : `₹${read.amountPaid.toLocaleString("en-IN")}`;
  const subject = step === "L1" ? `Grievance: ${amount} refund for ${booking}` : `Refund for booking ${booking} (${event}) not received`;
  let body = `Hello ${platform} team,\n\nMy booking ${booking} for ${event} was cancelled. You said my refund of ${amount} would reach my original payment method, but I have not received it as of ${today}. Please process the refund and share its reference number. Could you reply by ${addWorkingDays(today, 2)}?\n\nThank you,\n{name}\n{registered email or phone}`;
  if (step === "L1") body = `Dear Grievance Officer,\n\nI am escalating the unresolved refund for booking ${booking} (${event}, ${amount}). I contacted support but have not received the money. Please refund it to my original payment method and share the refund reference. Under the Consumer Protection (E-Commerce) Rules, 2020, grievances should be acknowledged within 48 hours and resolved within one month. Please acknowledge this complaint by ${addWorkingDays(today, 2)}.\n\nThank you,\n{name}\n{registered email or phone}`;
  if (step === "TRACE_ask") body = `Hello ${platform} team,\n\nYou said the ${amount} refund for booking ${booking} (${event}) was processed, but it has not reached my bank account. Please share the refund reference number (ARN or UTR), the date it was sent, and the payment method it went to.\n\nThank you,\n{name}`;
  if (step === "TRACE_bank") body = `Hello,\n\nThe ${amount} refund for booking ${booking} (${event}) was marked processed by ${platform}, but it has not appeared in my account. The reference they gave is ${read.references.arn ?? read.references.rrnOrUtr}. Please trace this refund and tell me when it will be credited.\n\nThank you,\n{name}`;
  if (step === "FAILED_bank") body = `Hello,\n\nI paid ${amount} on ${read.paymentDate ?? "{payment date}"} for ${event} on ${platform}. The payment was debited but no ticket was issued, and the app showed ${read.paymentStatusShown}. Please reverse the failed transaction to my original payment method and share the reference number. Under the RBI's failed transaction rule, a reversal is due within five days; compensation of ₹100 per day beyond that may be owed.\n\nThank you,\n{name}`;
  if (step === "NO_ROUTE_ask") body = `Hello ${platform} team,\n\nMy booking ${booking} for ${event} has been postponed. I cannot attend the new date. Please tell me whether I can request a refund, the deadline, and the steps to do so.\n\nThank you,\n{name}`;
  if (step === "ACTION_form") body = `I am requesting a refund for booking ${booking} (${event}, ${amount}). Please confirm the required steps, including any ticket return or form deadline, and refund it to my original payment method.\n\n{name}`;
  return { subject, body, attachChecklist: ["Your booking confirmation", "The refund message"] };
}

function validateDraft(result: z.infer<typeof draftSchema>, read: CaseRead): boolean {
  if (/\b(?:OTP|password|PIN|CVV)\b/i.test(result.body)) return false;
  if (/https?:\/\/|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(result.body)) return false;
  if (read.bookingId && !result.body.includes(read.bookingId)) return false;
  if (read.amountPaid != null && !result.body.includes(String(read.amountPaid))) return false;
  return result.body.trim().split(/\s+/).length <= 160;
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
          read = groundRead(caseReadSchema.parse(result.object), loaded.inputs.map((i: { text?: string }) => i.text ?? "").join("\n"));
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
    const plan = planCase({ read, today, history: { ladderLevel: loaded.item.ladderLevel, draftsShown: loaded.item.draftsShown, sentSteps: [], actionDoneAt: loaded.item.actionDoneAt }, paid: ["claimed", "confirmed"].includes(loaded.item.paidState) || !process.env.NEXT_PUBLIC_UPI_VPA });
    await ctx.runMutation(internal.agentWrites.progress, { caseId, runId, step: "date" });
    const applied = await ctx.runMutation(internal.agentWrites.applyTriage, { caseId, runId, read, plan, model: usedModel, latencyMs });
    if (!applied || plan.nextStep === "none" || plan.nextStep === "questions" || plan.nextStep === "options" || plan.nextStep === "waitlist" || plan.locked) return null;
    await ctx.runMutation(internal.agentWrites.progress, { caseId, runId, step: "writing" });
    let draft = safeDraft(read, today, plan.nextStep);
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
        if (validateDraft(output.object, read)) { draft = output.object; draftModel = draftModelId; }
      } catch { /* Use the checked template when draft generation fails. */ }
      draftLatency = Date.now() - started;
    }
    const channel = plan.nextStep === "ACTION_form" ? "form" : ["FAILED_bank", "TRACE_bank"].includes(plan.nextStep) ? "bank" : plan.nextStep === "L0_chat" ? "chat" : "email";
    const to = channel === "email" && plan.nextStep === "L0_email" && read.platform === "district" ? "support@district.in" : channel === "email" && plan.nextStep !== "L1" ? read.contactsInText.find((contact) => contact.kind === "email")?.value : undefined;
    await ctx.runMutation(internal.agentWrites.saveDraft, {
      caseId, runId, step: plan.nextStep, channel, to, subject: draft.subject ?? undefined, body: draft.body,
      attachChecklist: draft.attachChecklist, model: draftModel, latencyMs: draftLatency,
    });
    return null;
  },
});
