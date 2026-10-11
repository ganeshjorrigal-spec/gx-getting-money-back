import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { assertAccess } from "./lib/access";
import { callGate, callMode, callLabel, safeTranscript, needsPassenger, phone, confirmingCallMail } from "../lib/calls";
import { todayIST } from "../lib/dates";
import { chaseRows,chaseNext } from "../lib/chase-view";
import {companyDayUsed} from "../lib/chase";
import { flightCare } from "../lib/flight-care";
const access={code:v.string(),token:v.string()};
export const allow=mutation({args:{...access,accepted:v.boolean()},returns:v.null(),handler:async(ctx,args)=>{const item=await assertAccess(ctx,args.code,args.token);if(!item.chase?.active||!args.accepted)throw new Error("Give separate calling permission first");await ctx.db.patch(item._id,{chase:{...item.chase,callsAuthorisedAt:Date.now()}});await ctx.db.insert("caseEvents",{caseId:item._id,type:"call_authorised",summary:"You gave separate permission for calling and passenger patch-in",actor:"user",createdAt:Date.now()});return null;}});
export const request=mutation({args:{...access,fixture:v.optional(v.union(v.literal("reference"),v.literal("identity")))},returns:v.null(),handler:async(ctx,args)=>{const item=await assertAccess(ctx,args.code,args.token);if(!item.chase?.active||!item.chase.callsAuthorisedAt)throw new Error("Give separate calling permission first");if(args.fixture&&!item.demo)throw new Error("Fixtures are only for demo cases");await ctx.scheduler.runAfter(0,internal.callActions.run,{caseId:item._id,fixture:args.fixture??"reference"});return null;}});
export const reserve=internalMutation({args:{caseId:v.id("cases"),fixture:v.union(v.literal("reference"),v.literal("identity"))},returns:v.any(),handler:async(ctx,args)=>{
 const item=await ctx.db.get(args.caseId);if(!item?.chase||item.refundType!=="flight"||item.stage.startsWith("CLOSED")||item.demo&&item.demo.expiresAt<=Date.now())return null;
 const mode=callMode(process.env),company=item.facts?.airline??"",care=flightCare(company),number=item.demo?process.env.CALL_ALLOWLIST?.split(/[\s,;]+/).map(phone).find(Boolean):care?.careNumber;
 // Demo clock is explicitly virtual. Real calls always use the actual clock.
 const now=mode==="simulated"&&item.demo?Date.parse(`${item.demo.now}T11:00:00+05:30`):Date.now(),day=todayIST(new Date(now));
 const calls=await ctx.db.query("calls").withIndex("by_case_day",q=>q.eq("caseId",item._id).eq("day",day)).take(3);
 const budget=await ctx.db.query("callBudgets").withIndex("by_day",q=>q.eq("day",todayIST())).unique();
 const reserve=Number(process.env.CALL_MAX_COST_USD??0),limit=Number(process.env.CALL_DAILY_CAP_USD??0);
 const gate=callGate({active:item.chase.active,authorised:!!item.chase.callsAuthorisedAt,demo:!!item.demo,mode,number:number??"",mobile:item.chase.mobile,allowlist:process.env.CALL_ALLOWLIST,now,dayCount:calls.length,dailyReserved:budget?.reserved??0,budget:limit,reserve,official:!!care});
 if(gate)throw new Error(gate);
 // This release never opens a real-company gate. Live testing can target demo cases only.
 if(!item.demo)throw new Error("Real-company calling is not enabled");
 if(mode==="live"&&!process.env.VAPI_ASSISTANT_ID)throw new Error("The recovery assistant is not configured");
 if(mode==="live"){if(budget)await ctx.db.patch(budget._id,{reserved:budget.reserved+reserve});else await ctx.db.insert("callBudgets",{day:todayIST(),reserved:reserve});}
 const callId=await ctx.db.insert("calls",{caseId:item._id,mode,label:callLabel(mode),status:"reserved",company,day,startedAt:now,createdAt:Date.now(),durationSeconds:0,costUsd:0,reservedUsd:mode==="live"?reserve:0,authorisedAt:item.chase.authorisedAt});
 return {callId,item,number,mode,now};
}});
export const load=internalQuery({args:{id:v.id("calls")},returns:v.any(),handler:async(ctx,{id})=>{const call=await ctx.db.get(id);if(!call)return null;const item=await ctx.db.get(call.caseId);return item?{call,item}:null;}});
export const queued=internalMutation({args:{id:v.id("calls"),externalId:v.string()},returns:v.null(),handler:async(ctx,args)=>{const call=await ctx.db.get(args.id);if(call?.status==="reserved")await ctx.db.patch(args.id,{status:"queued",externalId:args.externalId});return null;}});
export const finish=internalMutation({args:{id:v.id("calls"),status:v.union(v.literal("completed"),v.literal("failed")),transcript:v.string(),reason:v.optional(v.string()),recordingUrl:v.optional(v.string()),costUsd:v.number(),durationSeconds:v.number(),patchIn:v.boolean()},returns:v.null(),handler:async(ctx,args)=>{
 const call=await ctx.db.get(args.id);if(!call||!['reserved','queued'].includes(call.status))return null;const item=await ctx.db.get(call.caseId);if(!item)return null;
 if(call.mode==="live"&&args.costUsd>call.reservedUsd){const budget=await ctx.db.query("callBudgets").withIndex("by_day",q=>q.eq("day",todayIST(new Date(call.createdAt)))).unique();if(budget)await ctx.db.patch(budget._id,{reserved:budget.reserved+args.costUsd-call.reservedUsd});}
 const text=safeTranscript(args.transcript),recordingUrl=needsPassenger(args.transcript)?undefined:args.recordingUrl;
 await ctx.db.patch(call._id,{status:args.status,transcript:text,reason:args.reason?safeTranscript(args.reason):undefined,recordingUrl:recordingUrl&&/^https:\/\//.test(recordingUrl)?recordingUrl:undefined,costUsd:args.costUsd,durationSeconds:Math.min(1500,args.durationSeconds),patchIn:args.patchIn,endedAt:Date.now()});
 await ctx.db.insert("caseEvents",{caseId:item._id,type:args.status==="failed"?"call_failed":"call_completed",summary:`${call.label} · ${call.company} · ${Math.min(1500,args.durationSeconds)} seconds${args.patchIn?" · passenger patch-in simulated/requested":""}${args.status==="failed"?". The call could not connect. Genie will follow up by mail.":""}`,actor:"agent",createdAt:Date.now()});
 if(!item.chase?.active||item.chase.authorisedAt!==call.authorisedAt||item.stage.startsWith("CLOSED"))return null;
 if(args.status==="failed"){await ctx.scheduler.runAfter(0,internal.chaseActions.send,{caseId:item._id});return null;}
 const runId=crypto.randomUUID();await ctx.db.insert("inputs",{caseId:item._id,kind:"reply",text:`${call.label}. Reply from ${call.company} care:\n${text.split("\n").filter(line=>line.startsWith("Care:")).map(line=>line.replace(/^Care:/,call.company+":")).join("\n")}`,sender:item.demo?process.env.TICKBACK_DEMO_ADDRESS:undefined,storageIds:[],createdAt:Date.now(),receivedAt:Date.now(),runId});await ctx.db.patch(item._id,{stage:"TRIAGING",latestRunId:runId,progress:{step:"reading",at:Date.now()}});
 await ctx.scheduler.runAfter(0,internal.flightAgent.triage,{caseId:item._id,runId});await ctx.scheduler.runAfter(0,internal.callActions.confirm,{id:call._id,attempt:0});return null;
}});
export const prepareConfirmation=internalMutation({args:{id:v.id("calls")},returns:v.any(),handler:async(ctx,{id})=>{const call=await ctx.db.get(id);if(!call||call.status!=="completed"||call.confirmingDraftId)return null;const item=await ctx.db.get(call.caseId);if(!item?.chase?.active||item.chase.authorisedAt!==call.authorisedAt||item.stage==="TRIAGING"||item.stage==="ERROR"||item.stage.startsWith("CLOSED"))return null;
 const to=item.demo?process.env.TICKBACK_DEMO_ADDRESS:undefined;if(!to)return null;
 const body=confirmingCallMail(call.company,call.startedAt,item.facts?.reply?.summary??call.transcript??"",call.mode,item.code);
 const draftId=await ctx.db.insert("drafts",{caseId:item._id,company:call.company,step:"FLIGHT_call_confirmation",channel:"email",to,cc:[],subject:`Demo: refund call confirmation [${item.code}]`,body,attachChecklist:[],status:"ready",createdAt:Date.now()});await ctx.db.patch(call._id,{confirmingDraftId:draftId,readerOutput:{reply:item.facts?.reply??null,owner:item.owner??null,moneyWith:item.moneyWith??null,nextContact:item.flightPlan?.nextPerson?.company??null,nextStep:item.nextStep??null}});await ctx.db.patch(item._id,{stage:"READY"});await ctx.scheduler.runAfter(0,internal.chaseActions.send,{caseId:item._id});return draftId;
}});
export const list=query({args:access,returns:v.any(),handler:async(ctx,args)=>{const item=await assertAccess(ctx,args.code,args.token);return ctx.db.query("calls").withIndex("by_case",q=>q.eq("caseId",item._id)).order("desc").take(30);}});
// Admin CLI only; never callable from the public browser.
export const attachRecording=internalMutation({args:{id:v.id("calls"),url:v.string(),transcript:v.string()},returns:v.null(),handler:async(ctx,args)=>{const call=await ctx.db.get(args.id);const item=call?await ctx.db.get(call.caseId):null;if(!call||!item?.demo||!/^https:\/\//.test(args.url)||needsPassenger(args.transcript))throw new Error("Use a demo recording with no private verification details");await ctx.db.patch(call._id,{recordingUrl:args.url,roleplayTranscript:safeTranscript(args.transcript),recordingKind:"roleplay"});return null;}});

export const chaseView=query({args:access,returns:v.any(),handler:async(ctx,args)=>{const item=await assertAccess(ctx,args.code,args.token);const events=await ctx.db.query("caseEvents").withIndex("by_case",q=>q.eq("caseId",item._id)).order("desc").take(60);const calls=await ctx.db.query("calls").withIndex("by_case",q=>q.eq("caseId",item._id)).order("desc").take(30);const draft=await ctx.db.query("drafts").withIndex("by_case",q=>q.eq("caseId",item._id)).order("desc").first();const company=draft?.company??item.flightPlan?.nextPerson?.company??item.owner??"support";const day=item.demo?.now??todayIST();const attempts=await ctx.db.query("chaseOutbox").withIndex("by_case_day",q=>q.eq("caseId",item._id).eq("day",day)).take(10);return {next:chaseNext(item,draft,calls[0]??null,company,companyDayUsed([company],attempts)),events:chaseRows(events,company),calls};}});
