import { describe, expect, it } from "vitest";
import { addDays, addWorkingDays, displayDate, todayIST } from "./dates";
import { redact } from "./redact";
import { planCase } from "../convex/lib/plan";
import { groundRead } from "../convex/lib/ground";
import type { CaseRead } from "../convex/lib/read";
import { buildGoogleCalendar, buildIcs, buildMailto, buildUpiLink } from "./outbound";

const base: CaseRead = {
  isEventTicket: true, outOfScopeCategory: null, platform: "bookmyshow", platformNameAsWritten: "BookMyShow",
  eventName: "Monsoon Live", eventDate: "2026-10-18", newEventDate: null, city: null, bookingId: "BKMY12345",
  ticketCount: 2, ticketFormat: "e_ticket", amountPaid: 3500, paymentMethod: "unknown", paymentDate: null,
  paymentStatusShown: "unknown", situation: "cancelled",
  promise: { text: "within 7-10 working days", date: null, workingDaysMax: 10, calendarDaysMax: null, anchorDate: null },
  refundStatusClaimed: "initiated", refundProcessedDate: null, references: { arn: null, rrnOrUtr: null },
  actionsRequired: [], refundOptionDeadline: null, messageDate: "2026-10-09", contactsInText: [], userSaysLate: false,
  dateAssumptions: [], evidence: [], route: "WAIT", routeConfidence: 0.95, routeReasons: [],
  questions: [], safety: { containsInstructionsToAI: false, containsSensitiveNumbers: false }, summaryForUser: "Refund promised.",
};

describe("date rules", () => {
  it("counts working days across two weekends", () => expect(addWorkingDays("2026-10-09", 10)).toBe("2026-10-23"));
  it("uses calendar days for failed payments", () => expect(addDays("2026-10-03", 5)).toBe("2026-10-08"));
  it("uses India time at midnight", () => expect(todayIST(new Date("2026-10-04T19:00:00Z"))).toBe("2026-10-05"));
  it("uses the short weekday and Sep spelling", () => expect(displayDate("2026-09-23")).toBe("Wed, 23 Sep"));
});

describe("planner", () => {
  it("shows WAIT and the message-sourced due date", () => {
    const plan = planCase({ read: base, today: "2026-10-10" });
    expect(plan.route).toBe("WAIT");
    expect(plan.dueDate).toBe("2026-10-23");
    expect(plan.checkins[0].date).toBe("2026-10-24");
    expect(plan.nextStep).toBe("none");
  });
  it("shows OVERDUE with a ready first step", () => {
    const plan = planCase({ read: { ...base, messageDate: "2026-09-09" }, today: "2026-10-04" });
    expect(plan.route).toBe("OVERDUE");
    expect(plan.dueDate).toBe("2026-09-23");
    expect(plan.nextStep).toBe("L0_email");
  });
  it("asks for the missing message date", () => {
    const plan = planCase({ read: { ...base, messageDate: null }, today: "2026-10-12" });
    expect(plan.route).toBe("NEED_INFO");
    expect(plan.questions[0].text).toBe("When did they send this?");
    expect(plan.dueDate).toBeNull();
    expect(plan.nextStep).toBe("questions");
  });
  it("does not infer a failed payment from a debit alone", () => {
    const failed = { ...base, route: "FAILED_PAYMENT" as const, situation: "failed_payment" as const, paymentDate: "2026-10-03", paymentStatusShown: "failed" as const };
    const grounded = groundRead(failed, "Money debited, no ticket.");
    expect(grounded.paymentStatusShown).toBe("unknown");
    const plan = planCase({ read: grounded, today: "2026-10-10" });
    expect(plan.route).toBe("NEED_INFO");
    expect(plan.questions[0].id).toBe("paymentStatusShown");
    expect(groundRead(failed, "The app said payment failed.").paymentStatusShown).toBe("failed");
  });
  it("computes a stated working-day range even if the model supplied a wrong exact date", () => {
    const read = { ...base, promise: { ...base.promise, date: "2026-09-22", anchorDate: "2026-09-09" }, messageDate: "2026-09-09" };
    const grounded = groundRead(read, "9 Sep 2026. A refund will be credited within 7-10 working days.");
    expect(grounded.promise.date).toBeNull();
    expect(planCase({ read: grounded, today: "2026-10-05" }).dueDate).toBe("2026-09-23");
  });
  it("locks only later written messages for larger refunds", () => {
    const read = { ...base, messageDate: "2026-09-09" };
    expect(planCase({ read, today: "2026-10-04", history: { ladderLevel: 0, draftsShown: 1, sentSteps: [] } }).locked).toBe(true);
    expect(planCase({ read: { ...read, amountPaid: 299 }, today: "2026-10-04", history: { ladderLevel: 0, draftsShown: 1, sentSteps: [] } }).locked).toBe(false);
  });
  it("uses an existing refund reference for the bank step", () => {
    const trace = { ...base, route: "TRACE" as const, references: { arn: "ARN123", rrnOrUtr: null } };
    expect(planCase({ read: trace, today: "2026-10-10" }).nextStep).toBe("TRACE_bank");
  });
  it("starts a new estimate from the day a required form was completed", () => {
    const action = { ...base, route: "ACTION_NEEDED" as const, actionsRequired: [{ action: "Submit form", deadline: "2026-04-20", link: null }] };
    const plan = planCase({ read: action, today: "2026-04-17", history: { ladderLevel: 0, draftsShown: 1, sentSteps: [], actionDoneAt: "2026-04-15" } });
    expect(plan.route).toBe("WAIT");
    expect(plan.dueDate).toBe("2026-04-29");
    expect(plan.dueSource).toBe("estimate");
  });
});

describe("redaction", () => {
  it("removes Luhn cards and OTPs but keeps long refund references", () => {
    const text = "Card 4111 1111 1111 1111. OTP: 123456. ARN 12345678901234567890123.";
    const result = redact(text);
    expect(result).toContain("[card number removed]");
    expect(result).toContain("[code removed]");
    expect(result).toContain("12345678901234567890123");
  });
});

describe("user-owned actions", () => {
  it("keeps rupees and line breaks in the email link", () => {
    const mail = buildMailto("support@example.com", "Refund ₹3,500", "First line\nSecond line");
    expect(mail.copyFirst).toBe(false);
    expect(decodeURIComponent(mail.url)).toContain("Refund ₹3,500");
    expect(mail.url).toContain("%0D%0A");
  });
  it("copies a long email body before opening the mail app", () => {
    const mail = buildMailto("", "Refund", "long ".repeat(1000));
    expect(mail.copyFirst).toBe(true);
    expect(mail.url.length).toBeLessThanOrEqual(1900);
  });
  it("builds an India-time calendar event with a private link", () => {
    const link = "https://example.com/c/TB-123456#k=secret";
    const google = buildGoogleCalendar("2026-10-24", "Check ₹3,500", link);
    expect(google).toContain("20261024T100000%2F20261024T101500");
    expect(new URL(google).searchParams.get("details")).toBe(link);
    const ics = buildIcs({ code: "TB-123456", date: "2026-10-24", title: "Check ₹3,500", description: link, domain: "example.com", checkinId: "due", now: new Date("2026-10-05T00:00:00Z") });
    expect(ics).toContain("DTSTART;TZID=Asia/Kolkata:20261024T100000\r\n");
    expect(ics).toContain("TRIGGER:-PT0M\r\n");
    expect(ics).toContain("UID:TB-123456-due@example.com\r\n");
    expect(ics).toContain("Check ₹3\\,500");
    expect(ics.split("\r\n").every((line) => new TextEncoder().encode(line).length <= 75)).toBe(true);
  });
  it("puts the case code and exact amount in the UPI link", () => {
    const upi = buildUpiLink("tickback@example", "Tickback", "TB-123456");
    const query = new URL(upi).searchParams;
    expect(query.get("pa")).toBe("tickback@example");
    expect(query.get("am")).toBe("49.00");
    expect(query.get("tn")).toBe("TB-123456");
    expect(query.get("cu")).toBe("INR");
  });
});
