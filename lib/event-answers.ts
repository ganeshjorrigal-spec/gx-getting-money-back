import type { CaseRead } from "../convex/lib/read";
import { addDays } from "./dates";
import { dateFromText } from "../convex/lib/ground";
type Question = { id: string; text?: string; options?: string[] };
export function isRefundDeadlineQuestion(q?: Question) {
  return !!q && !["messageDate", "paymentDate", "completed_dates", "refundOptionDeadline"].includes(q.id) && /refund.*(?:timeframe|deadline|date|window)|(?:timeframe|deadline|date|window).*refund|promise|refundTimeline|refundTimeframe/i.test(q.id + " " + (q.text ?? ""));
}
export function eventQuestionOptions(q: Question) {
  return isRefundDeadlineQuestion(q) ? [...new Set([...(q.options ?? []), "They gave no date", "I don't know"])] : q.options ?? [];
}
export function knownEventAnswer(previous: CaseRead | undefined, answer: string | undefined, today: string, question?: Question): CaseRead | null {
  if (!previous || !answer || !question) return null;
  const value = answer.trim(), normalized = value.toLowerCase().replaceAll("’", "'");
  if (question.id === "messageDate") {
    const date = normalized === "today" ? today : normalized === "yesterday" ? addDays(today, -1) : /^\d{4}-\d{2}-\d{2}$/.test(value) ? dateFromText(value, today) : null;
    if (date) return { ...previous, route: "WAIT", messageDate: date, questions: [] };
  }
  if (question.id === "paymentStatusShown" && ["failed", "pending", "successful"].includes(normalized)) return { ...previous, route: "FAILED_PAYMENT", paymentStatusShown: normalized === "successful" ? "success" : normalized as "failed" | "pending", questions: [] };
  if (!isRefundDeadlineQuestion(question)) return null;
  const unknown = /^(?:they gave no date|i don't know|not sure|no date|unknown)[.!]?$/i.test(normalized);
  const date = unknown ? null : dateFromText(value, today);
  if (!unknown && !date) return null;
  const questions = previous.questions.filter(q => q.id !== question.id);
  const route = questions.length ? "NEED_INFO" : previous.route === "NEED_INFO" ? previous.actionsRequired.length ? "ACTION_NEEDED" : "WAIT" : previous.route;
  return { ...previous, route, questions, promise: { text: unknown ? null : value, date, workingDaysMax: null, calendarDaysMax: null, anchorDate: previous.messageDate } };
}
