import { displayDate } from "../../lib/dates";
import type { CaseRead } from "./read";

export type RefundDraft = { subject: string; body: string; attachChecklist: string[] };

const amountText = (amount: number | null) => amount == null ? "my payment" : `₹${amount.toLocaleString("en-IN")}`;

export function draftForCase(read: CaseRead, today: string, step: string, dueDate: string | null): RefundDraft {
  const platform = read.platformNameAsWritten ?? "the organiser";
  const booking = read.bookingId ? `booking ${read.bookingId}` : "booking";
  const event = read.eventName ? ` for ${read.eventName}` : "";
  const amount = amountText(read.amountPaid);
  const eventChange = read.situation === "venue_changed" ? "The event was moved to a different venue." : read.situation === "postponed" ? "The event was postponed." : read.situation === "cancelled" ? "The event was cancelled." : "";
  const completed = (read.completedActions ?? []).filter((action) => action.date).map((action) => `${action.action} on ${displayDate(action.date!)}`);
  const completedLine = completed.length ? `I completed these steps: ${completed.join("; ")}.` : "";
  const promiseLine = dueDate && read.promise.text ? `You said the refund would arrive by ${displayDate(dueDate)}. I have not received it as of ${displayDate(today)}.` : `As of ${displayDate(dueDate ?? today)}, I have not received the refund.`;
  const subject = read.bookingId ? `Refund for ${booking}${event}` : `Refund for ${read.eventName ?? "my event"}`;
  const context = `My ${booking}${event} was ${amount}. ${eventChange} ${completedLine}`.replace(/\s+/g, " ").trim();
  let body = `Hello ${platform} team,\n\n${context}\n\n${promiseLine} Please tell me the refund status, return it to my original payment method, and share the refund reference number.\n\nThank you.`;
  if (step === "L1") body = `Dear Grievance Officer,\n\n${context}\n\n${promiseLine} I contacted support and need your help resolving this. Under the Consumer Protection (E-Commerce) Rules, 2020, grievances should be acknowledged within 48 hours. Please acknowledge this complaint and tell me when the refund will arrive.\n\nThank you.`;
  if (step === "TRACE_ask") body = `Hello ${platform} team,\n\n${context}\n\nYou said my refund was processed, but it has not reached my account. Please share the ARN or UTR, the date it was sent, and the payment method it went to.\n\nThank you.`;
  if (step === "TRACE_bank") body = `Hello,\n\n${context}\n\n${platform} marked the refund processed, but it has not reached my account. The reference is ${read.references.arn ?? read.references.rrnOrUtr}. Please trace it and tell me when it will be credited.\n\nThank you.`;
  if (step === "FAILED_platform") body = `Hello ${platform} team,\n\nI paid ${amount}${read.paymentDate ? ` on ${displayDate(read.paymentDate)}` : ""}${event}, but no ticket was issued and the payment showed ${read.paymentStatusShown}. Please confirm the payment status and share the payment reference. I will use that reference to ask my bank to trace it.\n\nThank you.`;
  if (step === "NO_ROUTE_ask") body = `Hello ${platform} team,\n\n${context}\n\nPlease tell me whether I can request a refund, the deadline, and the steps to do so.\n\nThank you.`;
  if (step === "ACTION_form") body = `Hello ${platform} team,\n\n${context}\n\nPlease confirm the steps to claim the refund, including any form or ticket delivery deadline, and where I should send proof.\n\nThank you.`;
  return { subject, body, attachChecklist: ["Booking confirmation", "Organiser's refund message", ...(completed.length ? ["Form submission and courier proof"] : [])] };
}

export function draftMatchesFacts(draft: RefundDraft, read: CaseRead, dueDate: string | null): boolean {
  const body = draft.body;
  if (/\{[^}]+\}|\b(?:OTP|password|PIN|CVV)\b|https?:\/\/|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(body)) return false;
  if (read.bookingId && !body.includes(read.bookingId)) return false;
  if (read.amountPaid != null && !body.includes(read.amountPaid.toLocaleString("en-IN"))) return false;
  if (read.situation === "venue_changed" && (!/mov(?:ed|e)/i.test(body) || /cancelled/i.test(body))) return false;
  if (read.situation === "postponed" && /cancelled/i.test(body)) return false;
  for (const action of read.completedActions ?? []) if (action.date && (!body.includes(displayDate(action.date)) || !body.toLowerCase().includes(action.action.toLowerCase()))) return false;
  if (dueDate && read.promise.text && !body.includes(displayDate(dueDate))) return false;
  return body.trim().split(/\s+/).length <= 180;
}
