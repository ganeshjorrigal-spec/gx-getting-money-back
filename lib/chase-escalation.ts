import { flightContacts } from "./flight-kb";
import { emailAddresses } from "./demo";
export const escalationSendLine = "Send this one yourself from your Gmail. Escalations go in your own name.";
type Draft = { channel?: string; to?: string | null; recipientRole?: string; rung?: number };
type Item = { refundType?: string; flightPlan?: { rung?: number; to?: string | null; nextPerson?: { role?: string; email?: string | null } | null } | null };
const officer = (role?: string) => !!role && /^(Nodal Officer|Appellate Authority|Grievance Officer)$/i.test(role.trim());
export function isPassengerEscalation(item: Item, draft?: Draft | null) {
  if (!draft || (draft.channel && draft.channel !== "email")) return false;
  if (item.refundType === "flight" && ((draft.rung ?? 0) >= 3 || (item.flightPlan?.rung ?? 0) >= 3)) return true;
  if (officer(draft.recipientRole)) return true;
  const to = emailAddresses(draft.to ?? "").map(a => a.toLowerCase());
  if (flightContacts.some(c => officer(c.role) && !!c.email && to.includes(c.email.toLowerCase()))) return true;
  const contact = item.flightPlan?.nextPerson;
  const currentTo = contact?.email ?? item.flightPlan?.to;
  return officer(contact?.role) && !!currentTo && to.includes(currentTo.toLowerCase());
}
