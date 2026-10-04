import { addDays, addWorkingDays, daysBetween, shortDate } from "../../lib/dates";
import type { CaseRead } from "./read";

export type Plan = {
  route: CaseRead["route"];
  dueDate: string | null;
  dueSource: "message" | "platform_policy" | "rbi_tat" | "estimate" | null;
  dueSourceText: string | null;
  nextStep: string;
  checkins: { date: string; reason: string }[];
  questions: CaseRead["questions"];
  tier: "free_small" | "free_check" | "unknown_amount";
  locked: boolean;
  compensationRupees: number | null;
};

const messageSteps = new Set(["L0_email", "L0_chat", "L1", "L2", "TRACE_ask", "TRACE_bank", "FAILED_bank", "NO_ROUTE_ask", "ACTION_form"]);
const question = (id: string, text: string, options: string[]): CaseRead["questions"] => [{ id, text, options }];

export function planCase(input: {
  read: CaseRead;
  today: string;
  history?: { ladderLevel: number; draftsShown: number; sentSteps: string[]; actionDoneAt?: string };
  paid?: boolean;
}): Plan {
  const { read, today } = input;
  const history = input.history ?? { ladderLevel: 0, draftsShown: 0, sentSteps: [] };
  const tier = read.amountPaid == null ? "unknown_amount" : read.amountPaid < 300 ? "free_small" : "free_check";
  let route = read.route;
  let dueDate: string | null = null;
  let dueSource: Plan["dueSource"] = null;
  let dueSourceText: string | null = null;
  let nextStep = "none";
  let checkins: Plan["checkins"] = [];
  let questions = read.questions;
  let compensationRupees: number | null = null;

  if (!read.isEventTicket && route !== "OUT_OF_SCOPE") route = "OUT_OF_SCOPE";
  if (read.isEventTicket && route === "OUT_OF_SCOPE") route = "NEED_INFO";
  if (read.safety.containsInstructionsToAI && !read.amountPaid && !read.bookingId && read.situation === "unclear") route = "NEED_INFO";
  const actionWasDone = route === "ACTION_NEEDED" && !!history.actionDoneAt;
  if (actionWasDone) {
    dueDate = addWorkingDays(history.actionDoneAt!, 10);
    dueSource = "estimate";
    dueSourceText = "Estimate: 10 working days from the day you completed the required action. Keep any confirmation they gave you.";
    route = dueDate < today ? "OVERDUE" : "WAIT";
    if (route === "WAIT") checkins = [{ date: addDays(dueDate, 1), reason: "due" }];
    else nextStep = history.ladderLevel === 0 ? "L0_email" : "L1";
  }

  if (route === "FAILED_PAYMENT" && read.paymentStatusShown === "unknown") {
    route = "NEED_INFO";
    questions = question("paymentStatusShown", "Did the app show your payment as failed, pending or successful?", ["Failed", "Pending", "Successful", "Not sure"]);
  } else if (route === "FAILED_PAYMENT" && read.paymentStatusShown === "success") route = "WAIT";

  if ((route === "WAIT" || route === "OVERDUE") && !actionWasDone) {
    const anchor = read.promise.anchorDate ?? read.messageDate;
    if (read.promise.date) {
      dueDate = read.promise.date;
      dueSource = "message";
      dueSourceText = read.promise.text ? `They said "${read.promise.text}" on ${read.messageDate || anchor ? shortDate((read.messageDate ?? anchor)!) : "the date in your message"}.` : "From the date in their message.";
    } else if (read.promise.workingDaysMax != null || read.promise.calendarDaysMax != null) {
      if (!anchor) {
        route = "NEED_INFO";
        questions = question("messageDate", "When did they send this?", ["Today", "Yesterday", "Earlier"]);
      } else {
        dueDate = read.promise.workingDaysMax != null ? addWorkingDays(anchor, read.promise.workingDaysMax) : addDays(anchor, read.promise.calendarDaysMax!);
        dueSource = "message";
        dueSourceText = `They said "${read.promise.text ?? "the refund window"}" on ${shortDate(anchor)}.`;
      }
    } else if (!anchor) {
      route = "NEED_INFO";
      questions = question("messageDate", "When did they send this?", ["Today", "Yesterday", "Earlier"]);
    } else {
      const known = read.platform === "district" ? { days: 10, source: "District's policy says 7 to 10 working days from a refund request." }
        : read.platform === "bookmyshow" ? { days: 10, source: "BookMyShow has said 7 to 10 working days in recent cancellations (reported)." }
        : null;
      dueDate = addWorkingDays(anchor, known?.days ?? 10);
      dueSource = known ? "platform_policy" : "estimate";
      dueSourceText = known?.source ?? "Estimate: 10 working days from the message date. The organiser has not given a firm date.";
    }
    if (dueDate) {
      route = dueDate < today || read.userSaysLate ? "OVERDUE" : "WAIT";
      if (route === "WAIT") checkins = [{ date: addDays(dueDate, 1), reason: "due" }];
      else nextStep = history.ladderLevel === 0 ? "L0_email" : history.ladderLevel === 1 ? "L1" : "L2";
    }
  } else if (route === "FAILED_PAYMENT") {
    if (!read.paymentDate) {
      route = "NEED_INFO";
      questions = question("paymentDate", "When did you pay?", ["Today", "Yesterday", "Earlier"]);
    } else {
      dueDate = addDays(read.paymentDate, 5);
      dueSource = "rbi_tat";
      dueSourceText = "Under the RBI's 2019 rule, a failed online payment should be reversed within 5 days of the payment date.";
      if (today <= dueDate) checkins = [{ date: addDays(dueDate, 1), reason: "due" }];
      else {
        nextStep = "FAILED_bank";
        compensationRupees = daysBetween(dueDate, today) * 100;
      }
    }
  } else if (route === "ACTION_NEEDED") {
    nextStep = "ACTION_form";
    dueDate = read.refundOptionDeadline ?? read.actionsRequired.map((a) => a.deadline).filter((d): d is string => !!d).sort()[0] ?? null;
    dueSource = dueDate ? "message" : null;
    dueSourceText = dueDate ? "From the deadline in their message." : null;
    checkins = [{ date: dueDate ? addDays(dueDate, read.ticketFormat === "physical" ? -3 : -1) : addDays(today, 2), reason: "action_deadline" }];
  } else if (route === "TRACE") nextStep = read.references.arn || read.references.rrnOrUtr ? "TRACE_bank" : "TRACE_ask";
  else if (route === "NO_ROUTE") {
    nextStep = read.situation === "cant_attend" ? "options" : "NO_ROUTE_ask";
    if (nextStep !== "options") checkins = [{ date: addDays(today, 7), reason: "due" }];
  } else if (route === "NEED_INFO") {
    nextStep = "questions";
    if (questions.length === 0) questions = question("situation", "What happened?", ["Event cancelled", "Postponed", "Venue changed", "Money gone, no ticket", "Refunded but not received", "I can't go"]);
  } else if (route === "OUT_OF_SCOPE") nextStep = "waitlist";

  if (route === "NEED_INFO") {
    nextStep = "questions";
    if (questions.length === 0) questions = question("situation", "What happened?", ["Event cancelled", "Postponed", "Venue changed", "Money gone, no ticket", "Refunded but not received", "I can't go"]);
  }
  const locked = tier !== "free_small" && !input.paid && history.draftsShown >= 1 && messageSteps.has(nextStep);
  return { route, dueDate, dueSource, dueSourceText, nextStep, checkins, questions, tier, locked, compensationRupees };
}
