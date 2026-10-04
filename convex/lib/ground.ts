import type { CaseRead } from "./read";

// Payment status must be stated by the person or their message. A debit alone proves neither failure nor success.
export function groundRead(read: CaseRead, input: string): CaseRead {
  let result = read;
  const workRange = /\b(\d{1,2})\s*(?:-|–|to)\s*(\d{1,2})\s+working\s+days\b/i.exec(input);
  const dayRange = /\b(\d{1,2})\s*(?:-|–|to)\s*(\d{1,2})\s+days\b/i.exec(input);
  if (workRange) result = { ...result, promise: { ...result.promise, date: null, workingDaysMax: Number(workRange[2]), calendarDaysMax: null } };
  else if (dayRange) result = { ...result, promise: { ...result.promise, date: null, workingDaysMax: null, calendarDaysMax: Number(dayRange[2]) } };
  if (result.situation !== "failed_payment" && result.route !== "FAILED_PAYMENT") return result;
  const status = /\b(?:app|site|screen|payment|transaction|status)\s+(?:(?:said|showed|shows|was|is|marked|status)\s+)?(?:payment\s+)?(failed|pending|successful|success)\b/i.exec(input);
  if (!status) return { ...result, paymentStatusShown: "unknown" };
  const word = status[1].toLowerCase();
  return { ...result, paymentStatusShown: word === "successful" || word === "success" ? "success" : word as "failed" | "pending" };
}
