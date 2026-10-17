import {validEmail} from './case-email';
import { flightContacts } from "./flight-kb";
export const authorityLine = (company: string, pnr: string) =>
  `I authorise Refund Genie to contact ${company} about my refund for PNR ${pnr}, and to receive their replies for me. I can stop this any time.`;
export function chaseMailbox(address: string) {
  const [local, domain] = address.trim().toLowerCase().split("@");
  return `${domain === "gmail.com" ? local.split("+")[0] : local}@${domain}`;
}
export function chaseAddressAllowed(address: string, list: string | undefined) {
  return (
    /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(address.trim()) &&
    !!list
      ?.split(/[\s,;]+/)
      .filter(Boolean)
      .map(chaseMailbox)
      .includes(chaseMailbox(address))
  );
}
export function chaseRecipientsAllowed(
  recipients: string[],
  list: string | undefined,
) {
  return (
    recipients.length > 0 &&
    recipients.every((a) => chaseAddressAllowed(a, list))
  );
}
export function chaseCompanyAddress(
  address: string,
  companies: string[],
  replySenders: string[],
) {
  return (
    flightContacts.some(
      (c) =>
        companies.includes(c.company) &&
        c.email?.toLowerCase() === address.toLowerCase(),
    ) ||
    replySenders.some(
      (s) =>
        s.toLowerCase() === address.toLowerCase() &&
        flightContacts.some(
          (c) =>
            companies.includes(c.company) &&
            c.email?.split("@")[1] === s.split("@")[1],
        ),
    )
  );
}
export function canChaseSend({
  active,
  closed,
  allowed,
  sendGranted,
  usedToday,
  draftSent,
  uncertain,
}: {
  active: boolean;
  closed: boolean;
  allowed: boolean;
  sendGranted: boolean;
  usedToday: number;
  draftSent: boolean;
  uncertain: boolean;
}) {
  return (
    active &&
    !closed &&
    allowed &&
    sendGranted &&
    usedToday === 0 &&
    !draftSent &&
    !uncertain
  );
}
export function companyDayUsed(
  companies: string[],
  attempts: { companies: string[] }[],
) {
  return attempts.some((attempt) =>
    attempt.companies.some((company) => companies.includes(company)),
  );
}
export function chaseBody(body: string, name: string, first: boolean) {
  const prefix = `I am writing on behalf of ${name}, who has authorised Refund Genie to follow up this refund (letter ${first ? "attached" : "previously attached"}).`;
  return /^(Dear [^\n]+,)\n\n/.test(body)
    ? body.replace(/^(Dear [^\n]+,)\n\n/, `$1\n\n${prefix}\n\n`)
    : `${prefix}\n\n${body}`;
}

export function chaseDailyCap(value:string|undefined){const count=Number(value);return value&&/^\d+$/.test(value.trim())&&Number.isSafeInteger(count)&&count>=0?count:50;}
export function confirmedChaseCc(item:{email?:string|null;factsConfirmedAt?:number|null}){return item.factsConfirmedAt&&validEmail(item.email)?item.email.trim().toLowerCase():null;}
export function realChaseRecipients(item:{email?:string|null;factsConfirmedAt?:number|null;facts?:any},to:string[],cc:string[],replySenders:string[]){
 const user=confirmedChaseCc(item);if(!user||!to.length)return false;
 const companies=[item.facts?.airline,item.facts?.bookedVia].filter(Boolean);
 return to.every(a=>chaseCompanyAddress(a,companies,replySenders))&&cc.every(a=>a.trim().toLowerCase()===user||chaseCompanyAddress(a,companies,replySenders));
}
