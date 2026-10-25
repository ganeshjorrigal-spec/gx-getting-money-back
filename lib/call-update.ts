import {hasConfirmedCaseEmail} from './confirmed-case-email';
import {validEmail} from './case-email';
import {careRequestsCallback,safeTranscript} from './calls';
import {displayDate,dateValue} from './dates';
import type {CallLedger} from './call-finish';
export function callUpdateRecipient(item:{demo?:unknown;email?:string|null;factsConfirmedAt?:number|null;confirmedCaseEmail?:string;emailConfirmedAt?:number},controlledDemo=false) {
 return (!item.demo||controlledDemo)&&hasConfirmedCaseEmail({email:item.email,emailConfirmedAt:item.emailConfirmedAt,confirmedCaseEmail:item.confirmedCaseEmail})&&!!item.factsConfirmedAt&&validEmail(item.email)?item.email.trim().toLowerCase():null;
}
export function callUpdateBody(company:string,reply:{summary?:string;reference?:string|null;paidDate?:string|null}|undefined,transcript:string,control?:{ledger?:CallLedger;missingDetails:string[]}) {
 let processingDate='';if(reply?.paidDate){try{dateValue(reply.paidDate);processingDate=displayDate(reply.paidDate);}catch{}}
 const suppliedReference=control?control.ledger?.facts.reference:reply?.reference;
 const reference=suppliedReference?safeTranscript(suppliedReference):null;
 const callback=control?.ledger?.branch==='callback'?control.ledger.facts:null;
 return [
  `What ${company} care said: ${callback?'Care will only discuss the refund with the passenger.':safeTranscript(reply?.summary||'No refund status was confirmed on this call.')}`,
  reference?`Reference: ${reference}`:'',
  processingDate&&control?.ledger?.branch!=='callback'?`Processing date: ${processingDate}`:'',
  careRequestsCallback(transcript)?`${company} asked you to call them back to verify your identity.${reference?` Quote reference ${reference}.`:''}`:'',
  callback?.callback_number?`Callback number: ${safeTranscript(callback.callback_number)}`:'',
  callback?.callback_hours?`Callback hours: ${safeTranscript(callback.callback_hours)}`:'',
  control?.missingDetails.length?`Care did not provide: ${control.missingDetails.join(', ')}.`:'',
  'Genie keeps chasing by mail. Reply to this mail with any question.'
 ].filter(Boolean).join('\n\n');
}
