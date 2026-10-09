import { addDays, addWorkingDays, displayDate } from "./dates";

export const DEMO_MAX_REPLIES = 3;
export const DEMO_EXPIRY_MS = 7 * 86_400_000;
export type DemoPlatform = "bookmyshow" | "district";
export const demoPlatformName = (platform: DemoPlatform) => platform === "bookmyshow" ? "BookMyShow" : "District";
export const demoExpiry = (createdAt: number) => createdAt + DEMO_EXPIRY_MS;
export const demoClockAfterSkip = (now: string, dueDate: string) => addDays(now > dueDate ? now : dueDate, 10);
export const demoSubject = (isDemo: boolean, subject: string) => isDemo && !/^Demo\b/i.test(subject) ? `Demo: ${subject}` : subject;
export const demoSheetPlatform = (isDemo: boolean, platform: string) => isDemo ? `Demo · ${platform}` : platform;
export const demoPays = (isDemo: boolean, paid: boolean) => isDemo || paid;

export function caseRecipient(isDemo: boolean, demoAddress: string | undefined, verifiedAddress?: string): string | undefined {
  if (isDemo) return demoAddress;
  return verifiedAddress?.toLowerCase() === demoAddress?.toLowerCase() ? undefined : verifiedAddress;
}
export function emailAddresses(value: string): string[] {
  return [...new Set((value.match(/[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? []).map((address) => address.toLowerCase()))];
}
const mailbox = (value: string) => {
  const [local, domain] = value.toLowerCase().split("@");
  const google = domain === "gmail.com" || domain === "googlemail.com";
  const base = local.split("+")[0];
  return (google ? base.replace(/\./g, "") : base) + "@" + (google ? "gmail.com" : domain);
};
export const sameDemoMailbox = (first: string, second: string) => mailbox(first) === mailbox(second);
export function demoMayReply(input: { isDemo: boolean; code: string; subject: string; from: string; demoAddress: string; inboxAddress: string; autoSubmitted?: string; precedence?: string; suppress?: string; replies: number; expired?: boolean }): boolean {
  return input.isDemo && !input.expired && input.replies < DEMO_MAX_REPLIES
    && new RegExp(`\\[${input.code.replace(/[^A-Z0-9-]/g, "")}\\]`).test(input.subject)
    && emailAddresses(input.from).length === 1
    && mailbox(input.from) !== mailbox(input.demoAddress) && mailbox(input.from) !== mailbox(input.inboxAddress)
    && (!input.autoSubmitted || input.autoSubmitted.toLowerCase() === "no")
    && !/bulk|list|junk/i.test(input.precedence ?? "") && !input.suppress
    && !/mailer-daemon|postmaster|no-?reply|auto-?reply/i.test(input.from);
}
export function demoReplyBody(input: { round: number; platform: string; event: string; amount: number; bookingId?: string | null; now: string; code: string; opening?: string; kind?: "flight" | "event"; cancellationDate?: string }): { body: string; reference: string; footer: string } {
  const reference = `DEMO-${input.code.replace("TB-", "")}-REF`;
  const context = input.opening ?? `Thank you for contacting us about ${input.event}.`;
  if (input.kind === "flight") {
    const ladder = input.round === 1
      ? `DemoTrips: Your refund of Rs ${input.amount} is pending with Demo Air. We will pass it on once the airline pays us.`
      : input.round === 2
      ? `Demo Air: We paid your refund of Rs ${input.amount} to DemoTrips on ${addWorkingDays(input.cancellationDate ?? input.now, 5)}. Our airline reference is DEMO-AIR-${input.code.replace("TB-", "")}. Please ask DemoTrips when it sent your refund to you.`
      : `DemoTrips: We sent Rs ${input.amount} to your original payment method on ${input.now}. Your bank reference (UTR) is ${reference}. Please check your bank by ${addWorkingDays(input.now, 3)}. Use this reference if your bank needs to trace it.`;
    const footer = "Demo reply from Tickback's demo desk, not from a real travel site or airline.";
    return { body: `${context}\n\n${ladder}\n\n${input.round === 2 ? "Nodal desk, Demo Air" : "Refund desk, DemoTrips"}\n\n${footer}`, reference, footer };
  }
  const ladder = input.round === 1
    ? `Your refund of ₹${input.amount.toLocaleString("en-IN")} has been initiated. Please allow 7 to 10 working days from ${displayDate(input.now)} for it to reach your original payment method.`
    : input.round === 2 ? "Please share your booking ID so we can locate the booking and check the refund."
    : `The refund of ₹${input.amount.toLocaleString("en-IN")} for booking ${input.bookingId} has been processed. Your refund reference is ${reference}. Please check your bank by ${displayDate(addWorkingDays(input.now, 3))}. Use this reference if your bank needs to trace it.`;
  const footer = `Demo reply from Tickback's demo desk, not from ${input.platform}.`;
  return { body: `${context}\n\n${ladder}\n\nRefund desk\n\n${footer}`, reference, footer };
}
