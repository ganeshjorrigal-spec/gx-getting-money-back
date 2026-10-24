import {hasConfirmedCaseEmail} from '../lib/confirmed-case-email';
import {verificationFields,verificationReady,type VerificationField} from '../lib/booking-verification';
import {demoFactValue} from '../lib/demo-intake';
import {saveDemoIntake} from './lib/demo_intake';
import {confirmedEmail,canDraftCompany,savedEmail} from '../lib/case-email';
import {publicDemoPlan} from '../lib/public-demo-plan';
import { answerAvailable, answerDate, answerAmount } from "../lib/flight-answers";
import { finishMail } from "../lib/mail-copy";
import { internalMutation, mutation, query, type MutationCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { assertAccess } from "./lib/access";
import { flightReadSchema, planFlight, type FlightRead, type FlightPlan, validFlightDate, flightWorkCount } from "../lib/flight";
import { addDays, todayIST } from "../lib/dates";
import { codedSubject } from "../lib/google-tracking";
import { demoSubject } from "../lib/demo";
import { redact } from "../lib/redact";
import { replyKeySentence } from "../lib/reply-banner";
import type { Doc } from "./_generated/dataModel";
import {dueCheckTime} from '../lib/due-check';

async function rerun(ctx:MutationCtx,item:Doc<"cases">,read:FlightRead) {
 if(item.demo?.intakeRequired){await saveDemoIntake(ctx,item,read);return;}
 const runId=crypto.randomUUID();const now=Date.now();
 await ctx.db.patch(item._id,{facts:read,refundType:"flight",stage:"TRIAGING",latestRunId:runId,progress:{step:"route",at:now},updatedAt:now});
 await ctx.scheduler.runAfter(0,internal.flightAgent.triage,{caseId:item._id,runId,reuseFacts:true});
}
export const handHelped=internalMutation({args:{code:v.string()},returns:v.null(),handler:async(ctx,{code})=>{const item=await ctx.db.query("cases").withIndex("by_code",q=>q.eq("code",code)).unique();if(item?.refundType==="flight")await ctx.db.patch(item._id,{handHelped:true});return null;}});
export const workCount=query({args:{code:v.string(),token:v.string()},returns:v.any(),handler:async(ctx,args)=>{
 const item=await assertAccess(ctx,args.code,args.token);
 const events=await ctx.db.query("caseEvents").withIndex("by_case",q=>q.eq("caseId",item._id)).collect();
 return flightWorkCount(events);
}});
export const fare=mutation({args:{code:v.string(),token:v.string(),taxes:v.number(),baseFare:v.optional(v.number()),fuel:v.optional(v.number()),cancellationCharge:v.optional(v.number()),taxesReturned:v.boolean()},returns:v.null(),handler:async(ctx,args)=>{
 const item=await assertAccess(ctx,args.code,args.token);if(item.refundType!=="flight"||item.facts?.cancelledBy!=="passenger")throw new Error("Fare breakdown is not needed here");
 for(const amount of [args.taxes,args.baseFare,args.fuel,args.cancellationCharge])if(amount!==undefined&&(!Number.isFinite(amount)||amount<0||amount>10_000_000))throw new Error("Enter a valid rupee amount");
 const read=flightReadSchema.parse({...item.facts,taxes:args.taxes,baseFare:args.baseFare??null,fuel:args.fuel??null,cancellationCharge:args.cancellationCharge??null,taxesReturned:args.taxesReturned});
 await ctx.db.insert("caseEvents",{caseId:item._id,type:"answered",summary:"You supplied the fare breakdown",actor:"user",createdAt:Date.now()});await rerun(ctx,item,read);return null;
}});
export const opened=mutation({args:{code:v.string(),token:v.string(),draftId:v.id("drafts")},returns:v.null(),handler:async(ctx,args)=>{
 const item=await assertAccess(ctx,args.code,args.token);const draft=await ctx.db.get(args.draftId);
 if(item.refundType!=="flight"||!draft||draft.caseId!==item._id)throw new Error("Draft not available");
 if(draft.status==="ready"){await ctx.db.patch(draft._id,{status:"opened"});await ctx.db.insert("caseEvents",{caseId:item._id,type:"draft_opened",summary:"You opened or copied the message",actor:"user",createdAt:Date.now()});}
 return null;
}});
export const reminder=mutation({args:{code:v.string(),token:v.string(),date:v.string()},returns:v.null(),handler:async(ctx,args)=>{
 const item=await assertAccess(ctx,args.code,args.token);const today=item.demo?.now??todayIST();
 if(item.refundType!=="flight"||item.route!=="TRACE"||!validFlightDate(args.date)||args.date<=today)throw new Error("Choose a future bank reminder date");
 const read=flightReadSchema.parse(item.facts);
 // This is the user's reminder, never attributed to a bank or company's promise.
 const plan=planFlight({...read,reply:{...read.reply,promisedDate:args.date}},today,{rung:item.ladderLevel,moneyWith:item.moneyWith});
 plan.dueSource="user_choice";plan.dueSourceText="Your chosen reminder date; not the company's promise.";
 const runId=crypto.randomUUID();await ctx.db.patch(item._id,{latestRunId:runId});
 await ctx.scheduler.runAfter(0,internal.flights.apply,{caseId:item._id,runId,read,plan,model:"code",latencyMs:0,inputTokens:0,outputTokens:0,totalTokens:0});return null;
}});
export const confirm=mutation({args:{code:v.string(),token:v.string(),pnr:v.string(),bookingId:v.optional(v.string()),contact:v.optional(v.string()),email:v.optional(v.string()),correction:v.optional(v.string()),name:v.optional(v.string()),flightName:v.optional(v.string())},returns:v.null(),handler:async(ctx,args)=>{
 const item=await assertAccess(ctx,args.code,args.token);if(item.refundType!=="flight")throw new Error("Not a flight case");
 if(item.demo?.intakeRequired&&args.correction?.trim())throw new Error('Edit the saved demo facts below');
 if(args.correction?.trim()){
 const runId=crypto.randomUUID();const now=Date.now();await ctx.db.insert("inputs",{caseId:item._id,kind:"answer",text:redact(args.correction.slice(0,8000)),storageIds:[],createdAt:now});await ctx.db.patch(item._id,{stage:"TRIAGING",factsConfirmedAt:undefined,latestRunId:runId,updatedAt:now});await ctx.scheduler.runAfter(0,internal.flightAgent.triage,{caseId:item._id,runId});return null;}
 const email=item.demo?item.email:confirmedEmail({...item,contact:args.contact??item.contact},args.email);
 const pnr=redact(args.pnr.trim()).slice(0,30);if(!pnr||pnr.includes("["))throw new Error("Add a PNR, never an OTP or bank detail");
 if(item.demo?.intakeRequired){if(item.questions?.length||item.facts?.paymentMethod==='unknown')throw new Error('Complete the booking details first');if(!item.demo.emailConfirmedAt||!args.name?.trim())throw new Error('Add your name and confirm your demo email');demoFactValue('pnr',pnr,item.demo.now);demoFactValue('flightName',args.flightName??'',item.demo.now);}
 const read=flightReadSchema.parse({...item.facts,...(item.demo?.intakeRequired?{flightName:args.flightName?.trim()}:{}),pnr,bookingId:args.bookingId?.trim().slice(0,100)||item.facts?.bookingId||null});
 if(!verificationReady(read))throw new Error('Review the route, ticket name and optional booking contact first');
 await ctx.db.patch(item._id,{...(item.demo?.intakeRequired?{name:redact(args.name!.trim()).slice(0,80)}:{}),email,factsConfirmedAt:Date.now(),contact:args.contact?redact(args.contact.slice(0,150)):item.contact});await ctx.db.insert("caseEvents",{caseId:item._id,type:"confirmed",summary:"You confirmed the flight details",actor:"user",createdAt:Date.now()});await rerun(ctx,item,read);return null;
}});
export const answer=mutation({args:{code:v.string(),token:v.string(),id:v.string(),value:v.string()},returns:v.null(),handler:async(ctx,args)=>{
 const item=await assertAccess(ctx,args.code,args.token);if(item.refundType!=="flight")throw new Error("Not a flight case");
 // Live queries refresh stale questions. A delayed tap must not overwrite newer facts.
 if(!answerAvailable(item,args.id))return null;
 const value=args.id==="eTicketNumber"?args.value.trim():redact(args.value.trim()).slice(0,100); const read=flightReadSchema.parse(item.facts);
 if(args.id==="confirmReply"){if(value!=="Looks right")throw new Error("Paste a correction to their reply below");read.replyConfirmed=true;}
 if(args.id==="transferDestination"){if(value==="Not clear")throw new Error("Paste their exact reply or a correction below");if(value!=="passenger"&&value!==read.bookedVia)throw new Error("Choose the transfer destination");read.reply.pointsAt=value;read.reply.paymentDestination=value==="passenger"?"passenger":"travel_site";read.replyConfirmed=true;}
 if(["cancellationDate","supportContactDate","departureDate"].includes(args.id)) {Object.assign(read,{[args.id]:item.demo?.intakeRequired&&args.id==='cancellationDate'?demoFactValue('cancellationDate',value,item.demo.now):answerDate(value)});}
 else if(["bookingTime","cancellationTime"].includes(args.id)){if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)||!Number.isFinite(Date.parse(value+"+05:30")))throw new Error("Use YYYY-MM-DDTHH:mm");Object.assign(read,{[args.id]:value+"+05:30"});}
 else if(["airline","bookedVia"].includes(args.id)){if(value==="Other")throw new Error("Type the company name below");Object.assign(read,{[args.id]:value});}
 else if(args.id==="paymentMethod"){if(!["credit_card","debit_card","upi","netbanking","cash","wallet","unknown"].includes(value))throw new Error("Choose a payment method");read.paymentMethod=value as FlightRead["paymentMethod"];read.paymentConfirmed=true;}
 else if(args.id==='eTicketNumber'){if(read.airline!=='Air India'||read.bookedVia!=='direct'||!/^\d{13}$/.test(value))throw new Error('Use the 13 digits from your Air India ticket, not a PNR or card number');read.eTicketNumber=value;}
 else if(args.id==='airIndiaRefundRequested'){if(read.airline!=='Air India'||read.bookedVia!=='direct'||!['Yes','No'].includes(value))throw new Error('Choose Yes or No for your Air India refund request');read.airIndiaRefundRequested=value==='Yes';}
 else if(args.id==="supportContacted")read.supportContacted=value==="Yes";
 else if(args.id==="domestic")read.domestic=value==="Yes";
 else if(args.id==="cancelledBy" && ["airline","passenger"].includes(value))read.cancelledBy=value as "airline"|"passenger";
 else if(["taxes","amountPaid"].includes(args.id)){Object.assign(read,{[args.id]:item.demo?.intakeRequired&&args.id==='amountPaid'?demoFactValue('amountPaid',value,item.demo.now):answerAmount(value)});}
 await ctx.db.insert("caseEvents",{caseId:item._id,type:"answered",summary:`You answered ${args.id}`,actor:"user",createdAt:Date.now()});await rerun(ctx,item,read);return null;
}});
export const apply=internalMutation({args:{caseId:v.id("cases"),runId:v.string(),read:v.any(),plan:v.any(),model:v.string(),latencyMs:v.number(),inputTokens:v.number(),outputTokens:v.number(),totalTokens:v.number()},returns:v.null(),handler:async(ctx,args)=>{
 const item=await ctx.db.get(args.caseId);if(!item||item.latestRunId!==args.runId)return null;
 const read=args.read as FlightRead,plan=item.demo?.chaseStory?publicDemoPlan(args.plan as FlightPlan):args.plan as FlightPlan,now=Date.now();
 const old=await ctx.db.query("checkins").withIndex("by_case",q=>q.eq("caseId",item._id)).order('desc').take(50);
 for(const c of old)if(c.status==="scheduled"){if(c.scheduledId)await ctx.scheduler.cancel(c.scheduledId);await ctx.db.patch(c._id,{status:"cancelled"});}
 await ctx.db.patch(item._id,{refundType:"flight",owner:plan.owner,moneyWith:plan.moneyWith,flightPlan:plan,facts:read,platform:read.bookedVia==="direct"?read.airline??undefined:read.bookedVia??undefined,eventName:read.flightName??`${read.airline??"Your"} flight`,amountPaise:read.amountPaid===null?undefined:Math.round(read.amountPaid*100),route:plan.route,routeConfidence:read.reply.confidence,ladderLevel:plan.rung,dueDate:plan.dueDate??undefined,dueSource:plan.dueSource,dueSourceText:plan.dueSourceText,nextStep:plan.nextStep,questions:plan.questions,stage:plan.route==="NEED_INFO"?"NEED_INFO":plan.route==="OUT_OF_SCOPE"?"CLOSED_OUT_OF_SCOPE":plan.route==="NO_ROUTE"?"CLOSED_NO_ROUTE":plan.route==="WAIT"?(!item.demo&&old.some(c=>c.date===plan.checkDate&&c.status==="fired")?"DUE":"WAITING"):"READY",progress:{step:"done",at:now},updatedAt:now});
 const inputs=await ctx.db.query("inputs").withIndex("by_case",q=>q.eq("caseId",item._id)).order("desc").take(10);
 const reply=inputs.find(i=>i.kind==="reply"&&i.runId===args.runId);if(reply)await ctx.db.patch(reply._id,{summary:redact(read.reply.summary).slice(0,240),keySentence:replyKeySentence(reply.text??"")});
 await ctx.db.insert("caseEvents",{caseId:item._id,type:reply?"reply_read":"triaged",summary:reply?redact(read.reply.summary).slice(0,180):`${plan.owner} owes the refund. ${plan.dueSourceText}`.slice(0,180),actor:"agent",createdAt:now});
 if(plan.checkDate&&!(!item.demo&&plan.route==='WAIT'&&old.some(c=>c.date===plan.checkDate&&['fired','answered'].includes(c.status)))){const checkinId=await ctx.db.insert("checkins",{caseId:item._id,date:plan.checkDate,reason:"flight_refund",status:"scheduled"});const at=!item.demo&&plan.route==='WAIT'?dueCheckTime(plan.checkDate):Date.parse(`${(plan.nextStep==="FLIGHT_status"&&plan.checkDate<=todayIST()?addDays(todayIST(),1):plan.checkDate)}T04:30:00.000Z`);const scheduledId=await ctx.scheduler.runAt(Math.max(now,at),internal.checkins.fire,{checkinId});await ctx.db.patch(checkinId,{scheduledId});if(plan.checkDate!==item.flightPlan?.checkDate)await ctx.db.insert("caseEvents",{caseId:item._id,type:"date_set",summary:`Check-in set for ${plan.checkDate}`,actor:"agent",createdAt:now});}
 if(!canDraftCompany(item)){plan.body=null;plan.subject="";await ctx.db.patch(item._id,{flightPlan:plan});}
 if(plan.body && item.factsConfirmedAt&&canDraftCompany(item)){
 if(plan.rung>=3&&plan.channel!=="bank"&&plan.nextStep!=="FLIGHT_status"){
   const all=await ctx.db.query("inputs").withIndex("by_case",q=>q.eq("caseId",item._id)).collect();
   plan.body += "\n\nDated record (attach the original messages and screenshots):\n"+all.filter(i=>i.verification!=="unverified").map(i=>`${todayIST(new Date(i.receivedAt??i.createdAt))} · ${i.kind}: ${redact(i.text??"Screenshot attached")}`).join("\n\n");
 }await ctx.db.insert("drafts",{caseId:item._id,step:plan.nextStep,channel:plan.channel,recipientRole:plan.nextPerson?.role,rung:plan.rung,to:plan.to??undefined,cc:plan.cc,subject:demoSubject(!!item.demo,codedSubject(plan.subject,item.code)),body:plan.channel==="email"?finishMail(redact(plan.body),item.code,[],item.name):redact(plan.body),attachChecklist:item.demo?[]:["Cancellation confirmation","Booking receipt","Dated replies so far"],status:"ready",createdAt:now});await ctx.db.patch(item._id,{draftsShown:item.draftsShown+1});await ctx.db.insert("caseEvents",{caseId:item._id,type:"draft_written",summary:`Prepared ${plan.nextStep}`,actor:"agent",createdAt:now});}
 await ctx.db.insert("agentRuns",{caseId:item._id,runId:args.runId,step:"triage",model:args.model,attempt:1,status:"done",latencyMs:args.latencyMs,inputTokens:args.inputTokens,outputTokens:args.outputTokens,totalTokens:args.totalTokens,createdAt:now});
 if(!item.demo&&hasConfirmedCaseEmail(item)&&reply)await ctx.scheduler.runAfter(0,internal.chaseActions.notify,{caseId:item._id,key:`reply:${reply._id}`,what:"Genie read a new reply.",reply:redact(read.reply.summary).slice(0,240),next:`${plan.channel==="bank"?"Check your bank":plan.nextPerson?`Contact ${plan.nextPerson.company}`:"Watch for their reply"}${plan.checkDate?` · check-in ${plan.checkDate}`:""}`});
 const pendingCall=await ctx.db.query("calls").withIndex("by_case",q=>q.eq("caseId",item._id)).order("desc").first();
 if(item.demo?.chaseStory&&reply&&item.demo.phase==='ready'){
  if(item.demo.round===1&&item.demo.chasePhase==='first_mail')await ctx.db.patch(item._id,{demo:{...item.demo,chasePhase:'ready_call'}});
  if(item.demo.round===2&&plan.route==='TRACE')await ctx.db.patch(item._id,{demo:{...item.demo,chasePhase:'bank'}});
 }
 if(item.chase?.active&&!item.demo?.chaseStory&&!(pendingCall?.status==="completed"&&!pendingCall.confirmingDraftId))await ctx.scheduler.runAfter(0,internal.chaseActions.send,{caseId:item._id});
 await ctx.scheduler.runAfter(0,internal.googleActions.syncCheckins,{caseId:item._id});await ctx.scheduler.runAfter(0,internal.responsesActions.syncCase,{caseId:item._id});return null;
}});


export const replies=query({args:{code:v.string(),token:v.string()},returns:v.any(),handler:async(ctx,args)=>{const item=await assertAccess(ctx,args.code,args.token);if(item.refundType!=="flight")return [];const inputs=await ctx.db.query("inputs").withIndex("by_case",q=>q.eq("caseId",item._id)).order("desc").take(50);return inputs.filter(i=>i.kind==="reply"&&i.verification!=="unverified").map(i=>({_id:i._id,text:redact(i.text??"Screenshot attached"),summary:i.summary??"",date:todayIST(new Date(i.receivedAt??i.createdAt))}));}});

// Explicit edits at review use the same saved fields. They are distinct from a
// delayed question tap, which must still ignore an already answered question.
export const editFact=mutation({args:{code:v.string(),token:v.string(),field:v.union(v.literal('name'),v.literal('contact'),v.literal('airline'),v.literal('bookedVia'),v.literal('paymentMethod'),v.literal('cancellationDate'),v.literal('amountPaid'),v.literal('eTicketNumber'),v.literal('airIndiaRefundRequested'),v.literal('routeFrom'),v.literal('routeTo'),v.literal('nameOnTicket'),v.literal('bookingMobile'),v.literal('bookingEmail'),v.literal('shareBookingContact'),v.literal('flightNumber'),v.literal('departureDate')),value:v.string()},returns:v.null(),handler:async(ctx,args)=>{
 const item=await assertAccess(ctx,args.code,args.token);if(item.refundType!=='flight'||item.stage.startsWith('CLOSED')||item.chase?.active)throw new Error('Stop Genie before editing an active chase');
 if(item.demo?.intakeRequired&&['airline','bookedVia'].includes(args.field))throw new Error('Demo roles are fixed');
 const read=flightReadSchema.parse(item.facts);let value:any=redact(args.value.trim()).slice(0,150);
 if(['routeFrom','routeTo','nameOnTicket'].includes(args.field)&&!value)throw new Error('Add this booking detail');
 if(args.field==='bookingEmail'&&value&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))throw new Error('Enter a booking email or leave it empty');
 if(args.field==='bookingMobile'&&value&&!/^\+?[0-9 ()-]{7,20}$/.test(value))throw new Error('Enter a booking mobile or leave it empty');
 if(args.field==='shareBookingContact'){if(!['Yes','No'].includes(value))throw new Error('Choose Yes or No');if(value==='Yes'&&!read.bookingMobile&&!read.bookingEmail)throw new Error('Add a booking contact before sharing it');value=value==='Yes';read.bookingContactReviewed=true;}
 if(args.field==='departureDate')value=value?answerDate(value):null;
 if(args.field==='eTicketNumber'){if(read.airline!=='Air India'||read.bookedVia!=='direct'||!/^\d{13}$/.test(args.value.trim()))throw new Error('Use the 13 digits from your Air India ticket, not a PNR or card number');value=args.value.trim();}
 if(args.field==='airIndiaRefundRequested'){if(read.airline!=='Air India'||read.bookedVia!=='direct'||!['Yes','No'].includes(value))throw new Error('Choose Yes or No');value=value==='Yes';}
 if(args.field==='cancellationDate')value=item.demo?.intakeRequired?demoFactValue('cancellationDate',value,item.demo.now):answerDate(value);
 if(args.field==='amountPaid')value=item.demo?.intakeRequired?demoFactValue('amountPaid',value,item.demo.now):answerAmount(value);
 if(args.field==='name')value=value.replace(/\s+/g,' ').slice(0,80);
 if(args.field==='name'||args.field==='contact')await ctx.db.patch(item._id,{[args.field]:value||undefined});
 else {Object.assign(read,{[args.field]:value});if(['bookingMobile','bookingEmail'].includes(args.field)){read.shareBookingContact=false;read.bookingContactReviewed=false;}flightReadSchema.parse(read);}
 await ctx.db.patch(item._id,{factsConfirmedAt:undefined});
 await ctx.db.insert('caseEvents',{caseId:item._id,type:'answered',summary:'You edited a case detail',actor:'user',createdAt:Date.now()});
 await rerun(ctx,item,read);return null;
}});

// Saved booking contact is never also the notification recipient.
export const verification=mutation({args:{code:v.string(),token:v.string(),field:v.string(),value:v.optional(v.string()),consent:v.optional(v.boolean())},returns:v.null(),handler:async(ctx,args)=>{
 const item=await assertAccess(ctx,args.code,args.token);if(item.refundType!=='flight'||item.stage.startsWith('CLOSED')||item.chase?.active)throw new Error('Stop Genie before editing booking details');
 const read=flightReadSchema.parse(item.facts);
 if(args.field==='bookingContactReviewed'){read.bookingContactReviewed=true;read.shareBookingContact=args.consent===true;}
 else {
 if(!verificationFields.includes(args.field as VerificationField))throw new Error('Choose a booking detail');
 const field=args.field as VerificationField,value=redact((args.value??'').trim()).slice(0,150);
 if(['routeFrom','routeTo','nameOnTicket'].includes(field)&&!value)throw new Error('Add this booking detail');
 if(field==='bookingEmail'&&value&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))throw new Error('Enter a booking email or skip');
 if(field==='bookingMobile'&&value&&!/^\+?[0-9 ()-]{7,20}$/.test(value))throw new Error('Enter a booking mobile or skip');
 read[field]=value||null;
 }
 await ctx.db.patch(item._id,{facts:read,factsConfirmedAt:undefined,updatedAt:Date.now()});return null;
}});
