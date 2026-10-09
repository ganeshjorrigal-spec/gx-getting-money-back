import { z } from "zod";
import { addDays, addWorkingDays, dateValue, displayDate } from "./dates";
import { flightContact, flightRule, type FlightContact } from "./flight-kb";

const nullable = z.string().nullable();
export const flightReadSchema = z.object({
  airline: nullable, bookedVia: nullable, paymentMethod: z.enum(["credit_card","debit_card","upi","netbanking","cash","unknown"]),
  cancellationDate: nullable, cancelledBy: z.enum(["airline","passenger","unknown"]), domestic: z.boolean().nullable(),
  flightName: nullable, amountPaid: z.number().nonnegative().nullable(), pnr: nullable, bookingId: nullable,
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
  questions:FlightQuestion[]; note:string; ruleId:string; body:string|null; subject:string; channel:string; checkDate:string|null;
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
  const plan:FlightPlan={route:"NEED_INFO",owner:airline,moneyWith:prior?.moneyWith??"unknown",dueDate:due.date,dueSource:due.source,dueSourceText:due.text,rung:Math.max(2,prior?.rung??2),nextStep:"questions",nextPerson:null,above:flightContact(airline,"Appellate Authority"),to:null,cc:[],questions:[],note:"",ruleId:due.rule,body:null,subject:"Flight refund follow-up",channel:"email",checkDate:null};
  const ask=(id:string,text:string,options:string[]=[])=>plan.questions.push({id,text,options});
  if(read.domestic===false){plan.route="OUT_OF_SCOPE";plan.nextStep="none";plan.note="Tickback handles domestic flight refunds. International flights and compensation claims are not in Tickback yet.";return plan;}
  if(!read.airline)ask("airline","Which airline?",["IndiGo","Air India","SpiceJet","Akasa Air","Other"]);
  if(!read.bookedVia)ask("bookedVia","Where did you book?",["MakeMyTrip","Goibibo","Cleartrip","EaseMyTrip","direct","Other"]);
  if(!validFlightDate(read.cancellationDate))ask("cancellationDate","When was it cancelled? (YYYY-MM-DD)");
  if(read.domestic===null)ask("domestic","Was this a domestic flight?",["Yes","No"]);
  if(read.cancelledBy==="unknown")ask("cancelledBy","Who cancelled?",["airline","passenger"]);
  if(plan.questions.length){plan.questions=plan.questions.slice(0,3);return plan;}
  if(read.medicalEmergency){plan.note="The medical-emergency rule still needs a full source check. Ask the airline about its terms; Tickback does not insist on a cash refund for this branch.";plan.nextStep="none";plan.route="NO_ROUTE";return plan;}
  if(read.cancelledBy==="passenger" && read.nonRefundable && read.taxes===null){ask("taxes","What are the taxes and airport fees in your fare breakdown? (rupees)");return plan;}
  if(read.cancelledBy==="passenger"&&read.nonRefundable&&read.taxesReturned){plan.route="NO_ROUTE";plan.nextStep="none";plan.note="The other side is right: the non-refundable base fare follows the fare rules. Your taxes and airport fees have already come back (DGCA para 3(d)).";return plan;}
  if(site==="Cleartrip" && !read.supportContactDate){plan.route="OVERDUE";plan.rung=1;plan.nextStep="FLIGHT_call";plan.channel="phone";plan.note="Cleartrip asks you to contact support first. Call +91 9595333333, quote your Trip ID, and keep the complaint reference. Its own process allows 72 hours before grievance escalation.";plan.body=plan.note;plan.dueSourceText=flightRule("F23").sentence;return plan;}
  if(site==="Cleartrip" && read.supportContactDate && addDays(read.supportContactDate,3)>today){plan.route="WAIT";plan.nextStep="none";plan.checkDate=addDays(read.supportContactDate,3);plan.note="Cleartrip's support window is 72 hours from your call (company policy).";return plan;}
  plan.route=due.date&&due.date>=today?"WAIT":"OVERDUE";plan.nextStep=plan.route==="WAIT"?"none":"FLIGHT_mail";plan.checkDate=plan.route==="WAIT"?due.date:null;
  if(plan.route==="WAIT")return plan;
  const nodal=flightContact(airline,"Nodal Officer"), grievance=flightContact(site,"Grievance Officer");
  plan.nextPerson=direct?nodal:grievance;plan.to=plan.nextPerson?.email??null;plan.cc=direct?[]:[nodal?.email].filter((s):s is string=>!!s);
  if(plan.rung===3){plan.nextPerson=plan.above;plan.to=plan.above?.email??null;plan.cc=direct?[]:[grievance?.email].filter((s):s is string=>!!s);}
  if(plan.rung>=4){plan.to=null;plan.cc=[];plan.channel="portal";plan.nextStep=plan.rung===4?"FLIGHT_airsewa":"FLIGHT_nch";plan.note=plan.rung===4?"File this dated complaint yourself on the AirSewa app or portal named in the DGCA rule. Tickback's expectation is a 30-day follow-up, not an official window. The portal address needs Ganesh's check before use.":"Call 1915 or use consumerhelpline.gov.in yourself. NCH says resolution may take up to 30 days. The consumer commission is a later option; Tickback does not file for you.";}
  const question=direct?"On which date was this refund sent, and with which reference?":"On which date did the airline pay this refund to you?";
  const identifier=[read.pnr?`PNR ${read.pnr}`:null,read.bookingId?`booking ID ${read.bookingId}`:null].filter(Boolean).join(", ");
  plan.body=`Hello ${plan.nextPerson?.value.split(",")[0]??(direct?airline:site)} team,\n\nPlease check my ${airline} flight refund${identifier?` (${identifier})`:""}. The cancellation date was ${displayDate(read.cancellationDate!)}${read.amountPaid!==null?`, and I paid Rs ${read.amountPaid}`:""}.\n\n${due.text}\n\n${question} Please share the complaint reference number.\n\nThank you.`;
  if(read.cancelledBy==="passenger")plan.body+=`\n\nTaxes and airport fees always come back even on non-refundable fares (DGCA para 3(d)). Cancellation charges cannot exceed basic fare plus fuel surcharge; disclosed travel-agent fees are outside this cap (para 3(i)). No extra airline refund processing charge (para 3(j)).${read.taxes!==null?` Taxes and fees: Rs ${read.taxes}.`:""}`;
  if(plan.channel==="portal")plan.body=plan.note+"\n\n"+plan.body;
  if(demoAddress){const parts=demoAddress.split("@");const role=(name:string)=>`${parts[0]}+${name}@${parts[1]}`;plan.to=direct?role("airline"):role("travelsite");plan.cc=[direct?role("travelsite"):role("airline")];plan.nextPerson={company:direct?airline:site,role:direct?"Nodal Officer":"Grievance Officer",value:direct?"Nodal Officer, Demo Air (demo)":"Grievance Officer, DemoTrips (demo)",email:plan.to,url:null,readAt:today,label:"DEMO"};plan.above={...plan.nextPerson,company:airline,role:"Appellate Authority",value:"Appellate Authority, Demo Air (demo)"};}
  if(!plan.to&&plan.channel==="email")plan.note=`We don't hold a checked address for ${plan.nextPerson?.company??(direct?airline:site)}. Paste the address from the company's own page. No address is invented.`;
  return plan;
}
