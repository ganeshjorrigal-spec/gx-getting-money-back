import { z } from "zod";
import { addDays, addWorkingDays, dateValue, displayDate } from "./dates";
import { flightContact, flightRule, type FlightContact } from "./flight-kb";

const nullable = z.string().nullable();
export const flightReadSchema = z.object({
  airline: nullable, bookedVia: nullable, paymentMethod: z.enum(["credit_card","debit_card","upi","netbanking","cash","unknown"]),
  cancellationDate: nullable, cancelledBy: z.enum(["airline","passenger","unknown"]), domestic: z.boolean().nullable(),
  flightName: nullable, amountPaid: z.number().nonnegative().nullable(), pnr: nullable, bookingId: nullable, replyConfirmed: z.boolean().optional(), paymentConfirmed: z.boolean().optional(), cancellationTime: nullable.optional(),
  bookingTime: nullable, departureDate: nullable, nonRefundable: z.boolean(), medicalEmergency: z.boolean(),
  taxes: z.number().nonnegative().nullable(), baseFare: z.number().nonnegative().nullable(), fuel: z.number().nonnegative().nullable(),
  cancellationCharge: z.number().nonnegative().nullable(), taxesReturned: z.boolean().nullable(), supportContactDate: nullable,
  reply: z.object({ fromCompany: nullable, pointsAt: nullable, claim: z.enum(["none","stall","under_review","waiting_airline","paid_site","not_paid","processed_reference","credit_shell","asks_details","destination_wrong","other"]), paidDate: nullable, promisedDate: nullable, reference: nullable, summary: z.string(), confidence: z.number().min(0).max(1) }),
});
export type FlightRead = z.infer<typeof flightReadSchema>;
export type FlightQuestion = {id:string;text:string;options:string[]};
export type FlightPlan = {
  route:"WAIT"|"OVERDUE"|"TRACE"|"NEED_INFO"|"NO_ROUTE"|"OUT_OF_SCOPE";
  owner:string; moneyWith:string; dueDate:string|null; dueSource:string; dueSourceText:string;
  rung:number; nextStep:string; nextPerson:FlightContact|null; above:FlightContact|null; to:string|null; cc:string[];
  questions:FlightQuestion[]; note:string; ruleId:string; body:string|null; subject:string; channel:string; checkDate:string|null; amountOwed:number|null;
};
export function validFlightDate(value:string|null|undefined):string|null { try { if(value) {dateValue(value);return value;} } catch {} return null; }
export function isFlightText(text:string) {return /\b(flight|airline|pnr|indigo|spicejet|akasa|air india|makemytrip|goibibo|cleartrip|easemytrip)\b/i.test(text);}
export function flightDue(read:FlightRead) {
  const date=validFlightDate(read.cancellationDate); if(!date)return {date:null,source:"estimate",text:"Cancellation date needed",rule:""};
  if(read.bookedVia!=="direct")return {date:addWorkingDays(date,14),source:"F03",text:"DGCA refund rule. The rule gives no start day; Tickback counts from your cancellation date (Tickback's reading). About 14 working days, Monday to Friday; holidays ignored.",rule:"F03"};
  if(read.paymentMethod==="credit_card")return {date:addDays(date,7),source:"F01",text:"DGCA refund rule: credit card refunds within seven days of cancellation.",rule:"F01"};
  if(read.paymentMethod==="cash")return {date,source:"F02",text:"DGCA refund rule: cash refunds immediately at the airline office where bought.",rule:"F02"};
  return {date:addWorkingDays(date,15),source:"estimate",text:"Tickback's expectation, not a DGCA rule: about 15 working days. Monday to Friday; holidays ignored.",rule:""};
}
export function planFlight(read:FlightRead, today:string, prior?:{rung?:number;moneyWith?:string;dueDate?:string|null;checkDate?:string|null}, demoAddress?:string):FlightPlan {
  const due=flightDue(read), airline=read.airline??"Your airline", site=read.bookedVia??"Your travel site", direct=site==="direct";
  const plan:FlightPlan={route:"NEED_INFO",owner:airline,moneyWith:prior?.moneyWith??"unknown",dueDate:due.date,dueSource:due.source,dueSourceText:due.text,rung:Math.max(2,prior?.rung??2),nextStep:"questions",nextPerson:null,above:flightContact(airline,"Appellate Authority"),to:null,cc:[],questions:[],note:"",ruleId:due.rule,body:null,subject:"Flight refund follow-up",channel:"email",checkDate:null,amountOwed:read.amountPaid};
  const ask=(id:string,text:string,options:string[]=[])=>plan.questions.push({id,text,options});
  if(read.domestic===false){plan.route="OUT_OF_SCOPE";plan.nextStep="none";plan.note="Tickback handles domestic flight refunds. International flights and compensation claims are not in Tickback yet.";return plan;}
  if(!read.airline)ask("airline","Which airline?",["IndiGo","Air India","SpiceJet","Akasa Air","Other"]);
  if(!read.bookedVia)ask("bookedVia","Where did you book?",["MakeMyTrip","Goibibo","Cleartrip","EaseMyTrip","direct","Other"]);
  if(!validFlightDate(read.cancellationDate))ask("cancellationDate","When was it cancelled? (YYYY-MM-DD)");
  if(read.domestic===null)ask("domestic","Was this a domestic flight?",["Yes","No"]);
  if(read.cancelledBy==="unknown")ask("cancelledBy","Who cancelled?",["airline","passenger"]);
  if(direct&&read.paymentMethod==="unknown"&&!read.paymentConfirmed)ask("paymentMethod","How did you pay?",["credit_card","debit_card","upi","netbanking","cash","unknown"]);
  if(read.amountPaid===null)ask("amountPaid","How much did you pay? (rupees)");
  if(plan.questions.length){plan.questions=plan.questions.slice(0,3);return plan;}
  if(read.medicalEmergency){plan.note="The medical-emergency rule still needs a full source check. Ask the airline about its terms; Tickback does not insist on a cash refund for this branch.";plan.nextStep="none";plan.route="OUT_OF_SCOPE";return plan;}
  if(read.cancelledBy==="passenger"&&direct){
    if(!read.bookingTime)ask("bookingTime","When did you book? (YYYY-MM-DDTHH:mm, India time)");
    if(!read.cancellationTime)ask("cancellationTime","When did you cancel? (YYYY-MM-DDTHH:mm, India time)");
    if(!read.departureDate)ask("departureDate","When was the flight? (YYYY-MM-DD)");
    if(plan.questions.length){plan.questions=plan.questions.slice(0,3);return plan;}
  }
  if(read.cancelledBy==="passenger" && read.nonRefundable && read.taxes===null){ask("taxes","What are the taxes and airport fees in your fare breakdown? (rupees)");return plan;}
  if(read.cancelledBy==="passenger"&&read.nonRefundable&&read.taxesReturned){plan.route="NO_ROUTE";plan.nextStep="none";plan.note="The other side is right: the non-refundable base fare follows the fare rules. Your taxes and airport fees have already come back (DGCA para 3(d)).";return plan;}
  if(read.cancelledBy==="passenger"&&read.nonRefundable)plan.amountOwed=(read.taxes??0)+(read.baseFare!==null&&read.fuel!==null&&read.cancellationCharge!==null?Math.max(0,read.cancellationCharge-read.baseFare-read.fuel):0);
  if(site==="Cleartrip" && !read.supportContactDate){plan.route="OVERDUE";plan.rung=1;plan.nextStep="FLIGHT_call";plan.channel="phone";plan.note="Cleartrip asks you to contact support first. Call +91 9595333333, quote your Trip ID, and keep the complaint reference. Its own process allows 72 hours before grievance escalation.";plan.body=plan.note;plan.dueSourceText=flightRule("F23").sentence;return plan;}
  if(site==="Cleartrip" && read.supportContactDate && addDays(read.supportContactDate,3)>today){plan.route="WAIT";plan.nextStep="none";plan.checkDate=addDays(read.supportContactDate,3);plan.note="Cleartrip's support window is 72 hours from your call (company policy).";return plan;}
  plan.route=due.date&&due.date>=today?"WAIT":"OVERDUE";plan.nextStep=plan.route==="WAIT"?"none":"FLIGHT_mail";plan.checkDate=plan.route==="WAIT"?due.date:null;
  if(plan.route==="WAIT"&&read.reply.claim==="none")return plan;
  const nodal=flightContact(airline,"Nodal Officer"), grievance=flightContact(site,"Grievance Officer");
  plan.nextPerson=direct?nodal:grievance;plan.to=plan.nextPerson?.email??null;plan.cc=direct?[]:[nodal?.email].filter((s):s is string=>!!s);
  if(plan.rung===3){plan.nextPerson=plan.above;plan.to=plan.above?.email??null;plan.cc=direct?[]:[grievance?.email].filter((s):s is string=>!!s);}
  if(plan.rung>=4){plan.to=null;plan.cc=[];plan.channel="portal";plan.nextStep=plan.rung===4?"FLIGHT_airsewa":"FLIGHT_nch";plan.note=plan.rung===4?"File this dated complaint yourself on the AirSewa app or portal named in the DGCA rule. Tickback's expectation is a 30-day follow-up, not an official window. The portal address needs Ganesh's check before use.":"Call 1915 or use consumerhelpline.gov.in yourself. NCH says resolution may take up to 30 days. The consumer commission is a later option; Tickback does not file for you.";}
  const question=direct?"On which date was this refund sent, and with which reference?":"On which date did the airline pay this refund to you?";
  const identifier=[read.pnr?`PNR ${read.pnr}`:null,read.bookingId?`booking ID ${read.bookingId}`:null].filter(Boolean).join(", ");
  plan.body=`Hello ${plan.nextPerson?.value.split(",")[0]??(direct?airline:site)} team,\n\nPlease check my ${airline} flight refund${identifier?` (${identifier})`:""}. The cancellation date was ${displayDate(read.cancellationDate!)}${read.amountPaid!==null?`, and I paid Rs ${read.amountPaid}`:""}.\n\n${due.text}\n\n${question} Please share the complaint reference number.\n\nThank you.`;
  if(read.cancelledBy==="passenger"){
    plan.note="The base fare follows the fare rules. Taxes and airport fees always come back. Cancellation charges cannot exceed basic fare plus fuel surcharge. Disclosed travel-agent fees sit outside that cap; no extra airline refund-processing charge.";
    if(flightLookIn(read)){plan.amountOwed=read.amountPaid;plan.note="The direct-booking look-in applies: cancelled within 48 hours of booking, with departure at least seven days after booking. No cancellation charge (DGCA para 3(l)).";plan.ruleId="F05";}
    plan.body+=`\n\n${plan.note}${read.taxes!==null?` Taxes and fees: Rs ${read.taxes}.`:""}${plan.amountOwed!==null?` Refund sought: Rs ${plan.amountOwed}.`:""}`;
  }
  if(plan.channel==="portal")plan.body=plan.note+"\n\n"+plan.body;
  const r=read.reply;
  const q=(text:string)=>{plan.body=`Hello ${plan.nextPerson?.company??airline} team,\n\nPlease check ${identifier||"my flight refund"}${read.amountPaid!==null?` for Rs ${read.amountPaid}`:""}, cancelled ${displayDate(read.cancellationDate!)}.\n\n${text}\n\nPlease keep both companies on the reply and share the complaint reference.\n\nThank you.`;};
  if(r.claim!=="none"&&!read.replyConfirmed&&(r.confidence<0.8||![airline,site].includes(r.fromCompany??""))){plan.route="NEED_INFO";plan.questions=[{id:"confirmReply",text:`Tickback read: ${r.summary}. Does that look right?`,options:["Looks right","Not quite"]}];plan.nextStep="questions";plan.body=null;plan.moneyWith=prior?.moneyWith??"unknown";return plan;}
  if(r.claim==="waiting_airline"){
   plan.route="OVERDUE";plan.moneyWith=airline;plan.nextPerson=nodal;plan.to=nodal?.email??null;plan.cc=[grievance?.email].filter((s):s is string=>!!s);plan.nextStep="FLIGHT_mail";plan.note=`Who owes you: still ${airline}. The rule puts the refund on the airline.`;plan.checkDate=addDays(today,7);q(`You are responsible for the travel-site refund (DGCA para 3(c)). On which date did you pay this refund to ${site}?`);
  }else if(r.claim==="paid_site"&&validFlightDate(r.paidDate)){
   plan.route="OVERDUE";plan.moneyWith=site;plan.nextPerson=grievance;plan.to=grievance?.email??null;plan.cc=[nodal?.email].filter((s):s is string=>!!s);plan.nextStep="FLIGHT_mail";plan.note=`Changed: ${airline} says it paid ${site} on ${displayDate(r.paidDate!)}. The airline remains answerable under the rule.`;
   const passOn=["MakeMyTrip","Goibibo"].includes(site);plan.dueDate=passOn?addDays(r.paidDate!,1):addDays(today,7);plan.dueSource=passOn?"F22":"estimate";plan.ruleId=passOn?"F22":"F03";plan.dueSourceText=passOn?`${site}'s own terms say they try to pass refunds on within 24 hours of receiving them. About ${displayDate(plan.dueDate!)}: Tickback uses the airline's paid date as a stand-in for receipt (Tickback's reading). For bookings over six months old, the terms say 96 hours after bank details are supplied directly to the company, never to Tickback.`:"Tickback's expectation: seven days to follow up; no published pass-on time held.";plan.checkDate=plan.dueDate>today?plan.dueDate:addDays(today,7);q(`${airline} says it paid you on ${displayDate(r.paidDate!)}. Please share the bank reference (UTR or ARN) and the date you sent the refund to my original payment method.`);
  }else if(r.claim==="processed_reference"&&r.reference){
   plan.route="TRACE";plan.moneyWith="bank";plan.channel="bank";plan.to=null;plan.cc=[];plan.nextPerson=null;plan.above=null;plan.nextStep="FLIGHT_bank";plan.dueDate=validFlightDate(r.promisedDate);plan.dueSource=plan.dueDate?"message_promise":"estimate";plan.dueSourceText=plan.dueDate?"The company's own promised bank date.":"No automatic bank date: no regulator timeline is held. Remind me on a date I pick.";plan.checkDate=plan.dueDate;plan.note=`The money has left ${r.fromCompany??site}. The last leg is your bank.`;plan.body=`Please trace my refund of Rs ${read.amountPaid??"the booked amount"}, reference ${r.reference}${validFlightDate(r.paidDate)?`, sent on ${displayDate(r.paidDate!)}`:""}. It has not arrived. Please check the reference and tell me its status.\n\nUse your bank's own channel. Never share an OTP, password or bank login with Tickback.`;
  }else if(r.claim==="credit_shell"){
   plan.route="OVERDUE";plan.nextStep="FLIGHT_mail";plan.note="A credit shell is your choice, not their default (DGCA para 3(f)).";q(`I decline the credit shell and ask for my refund to the original payment method. ${direct?"The choice is the passenger's under DGCA para 3(f).":"Tickback's reading: the travel site acts for the airline (para 3(c)), and the airline's credit shell is the passenger's choice (para 3(f))."}`);
  }else if(r.claim==="not_paid"&&due.date&&due.date<today){
   plan.rung=Math.min(5,plan.rung+1);plan.nextPerson=plan.above;plan.to=plan.above?.email??null;plan.cc=[grievance?.email].filter((s):s is string=>!!s);plan.nextStep="FLIGHT_mail";plan.note="Tickback's reading: the owner confirmed it has not paid, so the next rung is ready now.";plan.checkDate=addDays(today,7);q("The refund is overdue and your reply confirms it is not processed. Please provide the refund date and bank reference, with the full dated thread.");
  }else if(["stall","under_review"].includes(r.claim)){
   plan.route="WAIT";plan.nextStep="none";plan.body=null;plan.checkDate=validFlightDate(r.promisedDate)??prior?.checkDate??addDays(today,7);plan.note="Tickback's expectation: wait for their promised date, or the current rung's seven-day follow-up.";
  }else if(r.claim==="destination_wrong"){
   plan.route="OVERDUE";plan.nextStep="FLIGHT_mail";plan.note="You said the destination is not yours. Tickback never asks for your account or card number.";q("The destination in your reply is not my account or card. Please confirm where the refund was sent through your own secure channel; I will not share bank details through Tickback.");
  }else if(r.claim==="asks_details"){
   plan.route="OVERDUE";plan.nextStep="FLIGHT_mail";q(`My PNR is ${read.pnr??"not yet given"}${read.bookingId?`, booking ID ${read.bookingId}`:""}. Please locate this refund and share the refund date and reference. If you need bank details I will give them directly through your official channel, never through Tickback.`);
  }
  if(plan.rung>=4&&r.claim==="not_paid") {plan.channel="portal";plan.nextStep=plan.rung===4?"FLIGHT_airsewa":"FLIGHT_nch";plan.nextPerson=null;plan.to=null;plan.cc=[];plan.checkDate=addDays(today,30);plan.note=plan.rung===4?"You can file on the AirSewa app or portal named in the DGCA rule. The portal address needs Ganesh's check. Tickback's expectation: check again in 30 days, not an official deadline.":"Call National Consumer Helpline on 1915 or use consumerhelpline.gov.in. NCH says resolution may take up to 30 days. The consumer commission is a later option; Tickback does not file for you.";plan.body=plan.note+"\n\n"+plan.body;}
  if(demoAddress&&plan.channel==="email"){const parts=demoAddress.split("@");const role=(name:string)=>`${parts[0]}+${name}@${parts[1]}`;const toAirline=direct||r.claim==="waiting_airline"||r.claim==="not_paid";plan.to=toAirline?role("airline"):role("travelsite");plan.cc=[toAirline?role("travelsite"):role("airline")];plan.nextPerson={company:toAirline?airline:site,role:toAirline?"Nodal Officer":"Grievance Officer",value:toAirline?"Nodal Officer, Demo Air (demo)":"Grievance Officer, DemoTrips (demo)",email:plan.to,url:null,readAt:today,label:"DEMO"};plan.above={...plan.nextPerson,company:airline,role:"Appellate Authority",value:"Appellate Authority, Demo Air (demo)"};}
  if(!plan.to&&plan.channel==="email")plan.note=`We don't hold a checked address for ${plan.nextPerson?.company??(direct?airline:site)}. Paste the address from the company's own page. No address is invented.`;
  return plan;
}

export function flightLookIn(read:FlightRead):boolean {
 if(read.bookedVia!=="direct"||read.cancelledBy!=="passenger"||!read.bookingTime||!read.cancellationTime||!validFlightDate(read.departureDate))return false;
 const booking=Date.parse(read.bookingTime),cancel=Date.parse(read.cancellationTime);
 return Number.isFinite(booking)&&Number.isFinite(cancel)&&cancel>=booking&&cancel-booking<=48*3_600_000&&read.departureDate!>=addDays(read.bookingTime.slice(0,10),7);
}
export function flightWorkCount(events:Array<{type:string;actor:string}>) {
 const taps=new Set(["confirmed","draft_opened","marked_sent","answered","checkin_answered","landed"]);
 return {taps:events.filter(e=>e.actor==="user"&&taps.has(e.type)).length,replies:events.filter(e=>e.type==="reply_read").length,dates:events.filter(e=>e.type==="date_set").length,drafts:events.filter(e=>e.type==="draft_written").length};
}
