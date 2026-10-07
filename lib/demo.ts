import { addDays, addWorkingDays, displayDate } from "./dates";

export const DEMO_MAX_REPLIES = 3;
export const DEMO_EXPIRY_MS = 7 * 86_400_000;
export type DemoPlatform = "bookmyshow" | "district";
export const demoPlatformName = (platform: DemoPlatform) => platform === "bookmyshow" ? "BookMyShow" : "District";
export const demoExpiry = (createdAt: number) => createdAt + DEMO_EXPIRY_MS;
export const demoClockAfterSkip = (now: string, dueDate: string) => addDays(now > dueDate ? now : dueDate, 10);
export const demoSheetPlatform = (isDemo: boolean, platform: string) => isDemo ? `Demo · ${platform}` : platform;
export const demoPays = (isDemo: boolean, paid: boolean) => isDemo || paid;

export function caseRecipient(isDemo: boolean, demoAddress: string | undefined, verifiedAddress?: string): string | undefined {
  if (isDemo) return demoAddress;
  return verifiedAddress?.toLowerCase() === demoAddress?.toLowerCase() ? undefined : verifiedAddress;
}
export function emailAddresses(value: string): string[] {
  return [...new Set((value.match(/[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? []).map((address) => address.toLowerCase()))];
}
const mailbox = (value: string) => value.toLowerCase().split("@")[0].split("+")[0] + "@" + value.toLowerCase().split("@")[1];
export function demoMayReply(input: { isDemo: boolean; code: string; subject: string; from: string; demoAddress: string; inboxAddress: string; autoSubmitted?: string; precedence?: string; suppress?: string; replies: number; expired?: boolean }): boolean {
  return input.isDemo && !input.expired && input.replies < DEMO_MAX_REPLIES
    && new RegExp(`\\[${input.code.replace(/[^A-Z0-9-]/g, "")}\\]`).test(input.subject)
    && emailAddresses(input.from).length === 1
    && mailbox(input.from) !== mailbox(input.demoAddress) && mailbox(input.from) !== mailbox(input.inboxAddress)
    && (!input.autoSubmitted || input.autoSubmitted.toLowerCase() === "no")
    && !/bulk|list|junk/i.test(input.precedence ?? "") && !input.suppress
    && !/mailer-daemon|postmaster|no-?reply|auto-?reply/i.test(input.from);
}
export function demoReplyBody(input: { round: number; platform: string; event: string; amount: number; bookingId?: string | null; now: string; code: string; opening?: string }): { body: string; reference: string; footer: string } {
  const reference = `DEMO-${input.code.replace("TB-", "")}-REF`;
  const context = input.opening ?? `Thank you for contacting us about ${input.event}.`;
  const ladder = input.round === 1
    ? `Your refund of ₹${input.amount.toLocaleString("en-IN")} has been initiated. Please allow 7 to 10 working days from ${displayDate(input.now)} for it to reach your original payment method.`
    : input.round === 2 ? "Please share your booking ID so we can locate the booking and check the refund."
    : `The refund of ₹${input.amount.toLocaleString("en-IN")} for booking ${input.bookingId} has been processed. Your refund reference is ${reference}. Please check your bank by ${displayDate(addWorkingDays(input.now, 3))}. Use this reference if your bank needs to trace it.`;
  const footer = `Demo reply from Tickback's demo desk, not from ${input.platform}.`;
  return { body: `${context}\n\n${ladder}\n\nRefund desk\n\n${footer}`, reference, footer };
}
