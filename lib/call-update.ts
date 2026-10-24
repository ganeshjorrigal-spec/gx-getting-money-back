import {hasConfirmedCaseEmail} from './confirmed-case-email';
import {validEmail} from './case-email';
import {careRequestsCallback,safeTranscript} from './calls';
import {displayDate,dateValue} from './dates';
export function callUpdateRecipient(item:{demo?:unknown;email?:string|null;factsConfirmedAt?:number|null;confirmedCaseEmail?:string;emailConfirmedAt?:number}) {
 return !item.demo&&hasConfirmedCaseEmail({email:item.email,emailConfirmedAt:item.emailConfirmedAt,confirmedCaseEmail:item.confirmedCaseEmail})&&!!item.factsConfirmedAt&&validEmail(item.email)?item.email.trim().toLowerCase():null;
}
export function callUpdateBody(company:string,reply:{summary?:string;reference?:string|null;paidDate?:string|null}|undefined,transcript:string) {
 let processingDate='';if(reply?.paidDate){try{dateValue(reply.paidDate);processingDate=displayDate(reply.paidDate);}catch{}}
 const reference=reply?.reference?safeTranscript(reply.reference):null;
 return [
  `What ${company} care said: ${safeTranscript(reply?.summary||'No refund status was confirmed on this call.')}`,
  reference?`Reference: ${reference}`:'',
  processingDate?`Processing date: ${processingDate}`:'',
  careRequestsCallback(transcript)?`${company} asked you to call them back to verify your identity.${reference?` Quote reference ${reference}.`:''}`:'',
  'Genie keeps chasing by mail. Reply to this mail with any question.'
 ].filter(Boolean).join('\n\n');
}
