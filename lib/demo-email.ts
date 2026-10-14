import {validEmail} from './case-email';
import {chaseAddressAllowed} from './chase';
import {sameDemoMailbox} from './demo';
export const confirmationSendError="We couldn't send the confirmation mail just now. Try again in a few minutes.";
export const demoMailNotice='This is a Refund Genie demo. No real company is involved.';
export function confirmedDemoCc(item:{demo?:any;email?:string;chase?:{email:string}|null}){return !!item.demo?.chaseStory&&!!item.demo.emailConfirmedAt&&validEmail(item.email)&&item.chase?.email===item.email?item.email:null;}
export function demoRecipientsAllowed(item:Parameters<typeof confirmedDemoCc>[0],to:string[],cc:string[],allowlist:string|undefined,desk:string|undefined){
 const confirmed=confirmedDemoCc(item);
 if(!item.demo?.chaseStory)return [...to,...cc].every(a=>chaseAddressAllowed(a,allowlist));
 if(!desk||!to.length||!to.every(a=>sameDemoMailbox(a,desk)&&chaseAddressAllowed(a,allowlist)))return false;
 if(!confirmed)return false;
 return cc.every(a=>a===confirmed||chaseAddressAllowed(a,allowlist));
}
export function demoEmailSubject(subject:string){return `Demo: ${subject.replace(/^(?:(?:Re|Demo):\s*)+/gi,'').replace(/^Demo\s+/i,'')}`;}
export function demoEmailBody(body:string){return `${demoMailNotice}\n\n${body.replace(demoMailNotice,'').trim()}`;}
export function confirmationLink(origin:string,nonce:string){return `${origin.replace(/\/$/,'')}/demo-confirm/?confirmation=${encodeURIComponent(nonce)}`;}
export function confirmationBody(link:string){return `${demoMailNotice}\n\nConfirm your email to start the demo. This link is valid for 30 minutes and works once.\n\n${link}\n\nIf you did not ask for this demo, ignore this mail.`;}

// Gmail and Googlemail aliases share one mailbox; other domains stay exact.
export function foldGmailAddress(value:string){
 const email=value.trim().toLowerCase();const [local,domain]=email.split('@');
 return domain==='gmail.com'||domain==='googlemail.com'?`${local.split('+')[0].replaceAll('.','')}@gmail.com`:email;
}
