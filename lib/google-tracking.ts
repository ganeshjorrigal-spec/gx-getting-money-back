export const GMAIL_SCOPE = "https://www.googleapis.com/auth/gmail.readonly";
export const CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar.events.owned";

export function codedSubject(subject: string | undefined, code: string): string {
  const base = (subject || "Refund follow-up").replace(/\s*\[TB-[A-Z0-9]{6}\]\s*/g, " ").trim();
  return `${base} [${code}]`;
}

export function caseInboxAddress(inbox: string, code: string): string {
  const [local, domain] = inbox.trim().toLowerCase().split("@");
  if (!local || !domain || !/^[a-z0-9.-]+$/.test(local) || !/^[a-z0-9.-]+$/.test(domain)) throw new Error("Invalid case inbox");
  return `${local}+${code}@${domain}`;
}

export function messageMatchesCase(input: { to: string; subject: string; from: string; code: string; inbox?: string; ownEmail?: string; sentAt: number; receivedAt: number }): boolean {
  if (input.receivedAt <= input.sentAt || !/^TB-[A-Z0-9]{6}$/.test(input.code)) return false;
  if (input.ownEmail && input.from.toLowerCase().includes(input.ownEmail.toLowerCase())) return false;
  const codedSubject = input.subject.toUpperCase().includes(`[${input.code}]`);
  const codedInbox = input.inbox ? input.to.toLowerCase().includes(caseInboxAddress(input.inbox, input.code).toLowerCase()) : false;
  return codedSubject || codedInbox;
}

export function replyAlertEvent(input: { id: string; platform: string; amountPaise?: number; nextStep: string; link: string; now: number }) {
  const start = new Date(input.now + 5 * 60_000);
  const end = new Date(input.now + 20 * 60_000);
  const amount = input.amountPaise == null ? "" : `₹${(input.amountPaise / 100).toLocaleString("en-IN")} `;
  return {
    id: input.id,
    summary: `${input.platform} replied about your ${amount}refund`,
    description: `${input.nextStep}. Open your case: ${input.link}`,
    start: { dateTime: start.toISOString() }, end: { dateTime: end.toISOString() },
    reminders: { useDefault: false, overrides: [{ method: "popup", minutes: 0 }] },
  };
}

export function checkinEvent(input: { id: string; platform: string; date: string; link: string }) {
  return {
    id: input.id,
    summary: `Check your ${input.platform} refund`,
    description: `Has your refund landed? Open your case: ${input.link}`,
    start: { dateTime: `${input.date}T10:00:00+05:30` },
    end: { dateTime: `${input.date}T10:15:00+05:30` },
    reminders: { useDefault: false, overrides: [{ method: "popup", minutes: 0 }] },
  };
}
