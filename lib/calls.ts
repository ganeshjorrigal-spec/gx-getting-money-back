import { redact } from "./redact";
export type CallMode = "simulated" | "live";
export const callLabel = (mode: CallMode) => mode === "live" ? "Live call" : "Simulated demo call";
export const callMode = (env: Record<string,string|undefined>):CallMode => env.CALL_MODE === "live" && !!env.VAPI_API_KEY && !!env.VAPI_PHONE_NUMBER_ID ? "live" : "simulated";
export function phone(value:string) { const n=value.replace(/[ ()-]/g,""); return /^\+[1-9]\d{7,14}$/.test(n)?n:null; }
export function phoneAllowed(value:string,list:string|undefined) { const n=phone(value);return !!n&&!!list?.split(/[\s,;]+/).some(v=>phone(v)===n); }
export function demoEndHour(value:string|undefined) {const hour=Number(value);return Number.isInteger(hour)&&hour>=21&&hour<=24?hour:21;}
export function officeHours(now:number,demo=false,endHour?:string) { const d=new Date(now+330*60000);return demo?d.getUTCHours()>=9&&d.getUTCHours()<demoEndHour(endHour):d.getUTCDay()!==0&&d.getUTCHours()>=10&&d.getUTCHours()<18; }
export function nextOffice(now:number) { let d=new Date(now+330*60000);if(d.getUTCDay()!==0&&d.getUTCHours()<10)d.setUTCHours(10,0,0,0);else{d.setUTCDate(d.getUTCDate()+1);d.setUTCHours(10,0,0,0);}if(d.getUTCDay()===0)d.setUTCDate(d.getUTCDate()+1);return d.getTime()-330*60000; }
export const FAILED_TRANSFER_CUTOFF='We could not reach the passenger. Nothing private was shared.';
export const PRIVATE_CALL_CUTOFF='Passenger was connected. Nothing after this point is kept.';
export const MISSING_CALL_NOTE='Transcript unavailable or invalid. No transcript or recording link is kept.';
const privateAsk=/\botp\b|one[ -]?time|verification code|prove.*identity|only speak to.*passenger|password|card number|bank detail|\bpin\b|\bcvv\b|date of birth|\bdob\b|registered (?:mobile|email)|last four|security question/i;
const asksForPrivate=(line:string)=>{
 if(privateAsk.test(line))return true;
 if(/\b(?:code|digits?)\b/i.test(line)&&/\b(?:sms|phone)\b/i.test(line))return true;
 const remainder=line.replace(/\b(?:(?:refund|complaint) reference(?: code)?|reference code)\b/gi,'');
 return /\b(?:code|digits?)\b/i.test(remainder)&&/\bread out\b|\b(?:share|confirm|tell|send|text|give|sms|phone|otp)\b/i.test(remainder);
};
const transferLine=(line:string)=>line===PRIVATE_CALL_CUTOFF||line===FAILED_TRANSFER_CUTOFF||/^Transfer\s*:/i.test(line)||/\b(?:I'll|I will|I am going to) connect the passenger\b/i.test(line)||/^(?:Passenger|User|Customer)\s*:/i.test(line);
export const needsPassenger=(text:string)=>text.split(/\r?\n/).some(line=>transferLine(line)||asksForPrivate(line));
// Passenger speech is never retained, even if care used none of the private-ask words.
export function safeTranscript(text:string) {
 if(typeof text!=='string')return '';
 const kept:string[]=[];
 for(const line of text.slice(0,24000).split(/\r?\n/)) {
  if(transferLine(line)){kept.push(line===FAILED_TRANSFER_CUTOFF?FAILED_TRANSFER_CUTOFF:PRIVATE_CALL_CUTOFF);break;}
  if(/^Care\s*:/i.test(line)&&asksForPrivate(line)){kept.push('Care: Identity check requested. No sensitive details retained.',PRIVATE_CALL_CUTOFF);break;}
  kept.push(redact(line).replace(/\b(?:\d[ -]?){13,19}\b/g,'[number removed]'));
 }
 return kept.join('\n');
}
export function demoPhones(list:string|undefined) {
 const saved=[...new Set((list??'').split(/[\s,;]+/).map(phone).filter((n):n is string=>!!n))];
 return {passengerNumber:saved[0],number:saved[1]??saved[0],testPhoneNote:saved.length===1?'Only one test number is saved, so the patch-in cannot be tested.':undefined};
}
export function callGate(input:{active:boolean;authorised:boolean;demo:boolean;mode:CallMode;number:string;mobile:string;allowlist:string|undefined;now:number;dayCount:number;dailyReserved:number;budget:number;reserve:number;official:boolean;demoEndHour?:string;transfer?:boolean}) {
 if(!input.active||!input.authorised)return "Give separate calling permission first";
 if(!phoneAllowed(input.number,input.allowlist)||(input.demo||input.transfer===true)&&!phoneAllowed(input.mobile,input.allowlist))return "Calling is limited to the saved test numbers";
 if(!input.demo&&!input.official)return "No checked customer-care number is available";
 if(!officeHours(input.now,input.demo,input.demoEndHour))return input.demo?`Demo calls run every day, 09:00 to ${demoEndHour(input.demoEndHour)}:00 IST`:"Calls run Monday to Saturday, 10:00 to 18:00 IST";
 if(input.dayCount>=2)return "Two calls are already recorded for this case today";
 if(input.mode==="live"&&(!(input.budget>0)||!(input.reserve>0)||input.dailyReserved+input.reserve>input.budget))return "Today's calling budget is unavailable or used up";
 return null;
}
export function callFixture(kind:"reference"|"identity",details:{name:string;pnr:string;amount:number;date:string;code:string}) {
 const opening=`Genie: Hello, I'm an AI assistant from Refund Genie, calling on behalf of ${details.name}, with their permission, about a refund for PNR ${details.pnr}.`;
 const start=`${opening}\nMenu: For refunds, press 2.\nGenie: [Pressed 2]\nMenu: Please hold. [Hold music, 20 seconds]\nCare: Please give the PNR.\nGenie: ${details.pnr}. What is the refund status, processing date, who has the money, and reference?`;
 return kind==="reference" ? `${start}\nCare: Demo Air paid Rs ${details.amount} to DemoTrips on ${details.date}. Airline reference DEMO-AIR-${details.code}. DemoTrips now has the refund.\nGenie: Thank you. I will ask DemoTrips for the bank transfer reference. Goodbye.` : `${start}\nCare: We need an OTP to prove the passenger's identity.\nGenie: I'll connect the passenger now.\nTransfer: [Simulated patch-in requested, no phone dialled]\nGenie to passenger: I reached the demo airline refund desk about your PNR. They need to speak to you to verify identity. I have shared no private code.\nTransfer: [Simulated passenger did not answer]\nGenie: The passenger will call back. Thank you, goodbye.`;
}
export function careRequestsCallback(transcript:string) {return transcript.split(/\r?\n/).some(line=>/^Care:/i.test(line)&&/identity|verify.*passenger|verify.*customer|speak.*passenger|speak.*customer/i.test(line));}
export function confirmingCallMail(company:string,time:number,summary:string,mode:CallMode,code:string,callback?:{requested:boolean;reference?:string|null;passengerName?:string}) {return `Dear ${company} refund desk,\n\n${mode==="simulated"?"Demo only: the following was a simulated call, not a conversation with a real company.\n\n":""}As told on our ${mode==="simulated"?"simulated ":""}call today at ${new Date(time).toLocaleTimeString("en-IN",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit"})} IST by your agent, ${safeTranscript(summary)}. Please confirm in writing.${callback?.requested?`\n\nYour agent asked that ${safeTranscript(callback.passengerName||'the passenger')} call back to verify identity.${callback.reference?` ${safeTranscript(callback.passengerName||'The passenger')} will call and quote reference ${safeTranscript(callback.reference)}.`:''}`:''}\n\nPlease reply to all on this mail and keep ${code} in the subject, so my records stay in one thread.\n\nThank you.`;}
