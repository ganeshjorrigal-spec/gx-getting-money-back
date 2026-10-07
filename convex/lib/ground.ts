import type { CaseRead } from "./read";
import { dateValue, todayIST } from "../../lib/dates";
import { latestReplyText } from "../../lib/reply-banner";

const months: Record<string, string> = { jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06", jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12" };
function dateFromText(text: string, today: string): string | null {
  const iso = /\b\d{4}-\d{2}-\d{2}\b/.exec(text)?.[0];
  if (iso) { try { dateValue(iso); return iso; } catch { return null; } }
  const found = /\b(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s*(\d{4})?\b/i.exec(text);
  if (!found) return null;
  const value = `${found[3] ?? today.slice(0, 4)}-${months[found[2].slice(0, 3).toLowerCase()]}-${found[1].padStart(2, "0")}`;
  try { dateValue(value); return value; } catch { return null; }
}

// Received dates are evidence from Gmail, not a guess based on today's date.
export function groundTrackedReply(read: CaseRead, input: string, receivedAt: number, today = todayIST(), previous?: CaseRead): CaseRead {
  const text = latestReplyText(input);
  const receivedDate = todayIST(new Date(receivedAt));
  let result = groundRead(read, text, today);
  const duration = /\b(\d{1,2})(?:\s*(?:-|–|to)\s*(\d{1,2}))?\s+(working\s+)?days\b/i.exec(text);
  const refundWindow = duration && /\b(refund|bank|credit|credited|reach)\b/i.test(text);
  const explicitDeadline = /\brefund\s+(?:is\s+)?(?:due|by|on|credited\s+by)\s*:/i.test(text) || /\brefund\s+(?:is\s+)?(?:due|by|on|credited\s+by)\s+\d/i.test(text);
  if (refundWindow && !explicitDeadline) {
    const statedStart = /\b(?:from|starting(?:\s+on)?|after|processed\s+on|initiated\s+on|delivered\s+on|submitted\s+on)\s+(\d{4}-\d{2}-\d{2}|\d{1,2}\s+[A-Za-z]+(?:\s+\d{4})?)/i.exec(text);
    const unknownStart = /\b(?:after|from|following)\s+(?:the\s+)?(?:approval|delivery|submission|processing|receipt|request)\b/i.test(text) && !statedStart;
    const anchor = statedStart ? dateFromText(statedStart[1], receivedDate) : unknownStart ? null : receivedDate;
    const days = Number(duration[2] ?? duration[1]);
    result = {
      ...result, messageDate: unknownStart ? null : receivedDate,
      promise: { text: duration[0], date: null, workingDaysMax: duration[3] ? days : null, calendarDaysMax: duration[3] ? null : days, anchorDate: anchor },
      userSaysLate: /\b(?:still|not yet)\b.{0,30}\b(?:received|arrived|credited)\b|\boverdue\b/i.test(text),
    };
    // A fresh initiated-refund window supersedes an earlier processed-refund claim.
    if (/\brefund\b.{0,25}\binitiated\b|\binitiated\b.{0,25}\brefund\b/i.test(text)) {
      result = { ...result, refundStatusClaimed: "initiated", refundProcessedDate: null, route: result.isEventTicket ? "WAIT" : result.route, questions: [] };
    } else if (["WAIT", "OVERDUE", "NEED_INFO"].includes(result.route)) result = { ...result, route: "WAIT", questions: [] };
  } else if (explicitDeadline) {
    result = { ...result, messageDate: receivedDate, userSaysLate: false };
  } else if (previous) {
    // An acknowledgement must not restart an earlier promise's clock.
    result = { ...result, promise: previous.promise, messageDate: previous.messageDate };
  }
  return result;
}

// Payment status must be stated by the person or their message. A debit alone proves neither failure nor success.
export function groundRead(read: CaseRead, input: string, today = todayIST()): CaseRead {
  let result = read;
  const workRange = /\b(\d{1,2})\s*(?:-|–|to)\s*(\d{1,2})\s+working\s+days\b/i.exec(input);
  const dayRange = /\b(\d{1,2})\s*(?:-|–|to)\s*(\d{1,2})\s+days\b/i.exec(input);
  if (workRange) result = { ...result, promise: { ...result.promise, date: null, workingDaysMax: Number(workRange[2]), calendarDaysMax: null, anchorDate: dateFromText(input, today) ?? result.promise.anchorDate } };
  else if (dayRange) result = { ...result, promise: { ...result.promise, date: null, workingDaysMax: null, calendarDaysMax: Number(dayRange[2]), anchorDate: dateFromText(input, today) ?? result.promise.anchorDate } };
  const oneWork = /\brefund.{0,35}\bin\s+(\d{1,2})\s+working\s+days\b/i.exec(input);
  if (oneWork && !workRange) result = { ...result, promise: { ...result.promise, date: null, workingDaysMax: Number(oneWork[1]), calendarDaysMax: null } };
  const explicitRefundDate = /\brefund\s+(?:is\s+)?(?:due|by|on|credited\s+by)\s*:?\s*(\d{1,2}\s+[A-Za-z]+(?:\s+\d{4})?)/i.exec(input);
  const refundDate = explicitRefundDate ? dateFromText(explicitRefundDate[1], today) : null;
  if (refundDate) result = { ...result, route: result.isEventTicket && result.route === "NEED_INFO" ? "WAIT" : result.route, promise: { ...result.promise, date: refundDate, workingDaysMax: null, calendarDaysMax: null } };
  if (!/\b\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*(?:\s+\d{4})?\b|\b\d{4}-\d{2}-\d{2}\b|\b(?:today|yesterday)\b/i.test(input)) result = { ...result, messageDate: null, promise: { ...result.promise, anchorDate: null } };
  const hinglishRange = /\brefund\s+(\d{1,2})\s*(?:-|–|to)\s*(\d{1,2})\s+din\b/i.exec(input);
  if (hinglishRange) {
    const eventDate = /\b\d{1,2}\s+[A-Za-z]+\s+ko\s+event\s+tha\b/i.exec(input);
    result = { ...result, promise: { ...result.promise, date: null, workingDaysMax: null, calendarDaysMax: Number(hinglishRange[2]), anchorDate: eventDate ? null : result.promise.anchorDate }, messageDate: eventDate && result.messageDate === result.eventDate ? null : result.messageDate };
  }
  const form = /\b(?:filled|submitted)\b.{0,30}\bform\b.{0,12}\bon\s+(\d{1,2}\s+[A-Za-z]+(?:\s+\d{4})?)/i.exec(input);
  const delivered = /\b(?:tickets?\s+(?:were\s+)?)?delivered\s+on\s+(\d{1,2}\s+[A-Za-z]+(?:\s+\d{4})?)/i.exec(input);
  const completed = [...(result.completedActions ?? [])];
  const formDate = form ? dateFromText(form[1], today) : null;
  const deliveryDate = delivered ? dateFromText(delivered[1], today) : null;
  if (formDate) {
    const index = completed.findIndex((action) => /form/i.test(action.action));
    if (index >= 0) completed[index] = { action: "Form submitted", date: formDate };
    else completed.push({ action: "Form submitted", date: formDate });
  }
  if (deliveryDate) {
    const index = completed.findIndex((action) => /ticket|courier|deliver/i.test(action.action));
    if (index >= 0) completed[index] = { action: "Tickets delivered", date: deliveryDate };
    else completed.push({ action: "Tickets delivered", date: deliveryDate });
  }
  if (/\b(?:I\s+)?(?:filled|submitted)\b.{0,30}\bform\b/i.test(input) && !completed.some((action) => /form/i.test(action.action))) completed.push({ action: "Form submitted", date: null });
  if (/\b(?:I\s+)?(?:couriered|sent|delivered)\b.{0,25}\b(?:physical\s+)?tickets?\b/i.test(input) && !completed.some((action) => /ticket|courier|deliver/i.test(action.action))) completed.push({ action: "Tickets sent", date: null });
  if (completed.length) result = { ...result, completedActions: completed, promise: deliveryDate && (result.promise.workingDaysMax != null || result.promise.calendarDaysMax != null) ? { ...result.promise, anchorDate: deliveryDate } : result.promise };
  if (/\b(?:match|event)\s+moved\s+from\b/i.test(input)) result = { ...result, situation: "venue_changed" };
  if (/\b(?:AI|ChatGPT|model)\s*[,;:\-]?\s*(?:tell|ignore|write|pretend|say)\b|ignore all previous instructions/i.test(input)) result = { ...result, safety: { ...result.safety, containsInstructionsToAI: true } };
  if (/\b(?:money|amount|payment)\s+debited\b/i.test(input) && /\bno ticket\b/i.test(input) && result.route === "NEED_INFO") result = { ...result, route: "FAILED_PAYMENT", situation: "failed_payment", paymentStatusShown: "unknown", questions: [] };
  if (result.situation !== "failed_payment" && result.route !== "FAILED_PAYMENT") return result;
  const status = /\b(?:app|site|screen|payment|transaction|status)\s+(?:(?:said|showed|shows|was|is|marked|status)\s+)?(?:payment\s+)?(failed|pending|successful|success)\b/i.exec(input);
  if (!status) return { ...result, paymentStatusShown: "unknown" };
  const word = status[1].toLowerCase();
  return { ...result, paymentStatusShown: word === "successful" || word === "success" ? "success" : word as "failed" | "pending" };
}
