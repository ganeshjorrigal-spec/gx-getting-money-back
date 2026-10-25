"use node";
import {confirmedCallFacts} from "../lib/call-booking-facts";
import { internalAction } from "./_generated/server";
import { encryptToken } from "../lib/token-crypto";
import { hashToken } from "./lib/access";
import { makeAuthorityLetter } from "./lib/authority_letter";
import { randomBytes } from "node:crypto";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { callFixture, needsPassenger, callMode, testCallDeployment } from "../lib/calls";
import {controlledAssistant} from '../lib/call-finish';
import { startCall, assistantOverrides, safeCallResult, callMaxMinutes, callDurationSeconds } from "../lib/call-transport";
export const run=internalAction({args:{caseId:v.id("cases"),fixture:v.union(v.literal("reference"),v.literal("identity")),expectedMode:v.optional(v.union(v.literal("live"),v.literal("simulated")))},returns:v.null(),handler:async(ctx,args)=>{
 const r=await ctx.runMutation(internal.calls.reserve,args);if(!r?.item.chase)return null;
 if(!await ctx.runQuery(internal.chase.stillActive,{caseId:r.item._id,authorisedAt:r.item.chase.authorisedAt}))return null;
 const recording=r.item.demo?.chaseStory?await ctx.runQuery(internal.chaseDemo.recording,{}):null;
 const transcript=recording?.transcript??callFixture(args.fixture,{name:r.item.chase.name,pnr:r.item.facts.pnr,amount:(r.item.amountPaise??0)/100,date:r.item.demo?.now??r.now.toString(),code:r.item.code});
 const overrides=assistantOverrides({name:r.item.chase.name,pnr:r.item.facts.pnr,company:r.item.facts.airline,mobile:r.passengerNumber,bookingFacts:confirmedCallFacts(r.item)},process.env);
 let configuration:Record<string,unknown>={assistantId:process.env.VAPI_ASSISTANT_ID,assistantOverrides:overrides};
 if(r.mode==='live'&&r.item.demo&&!r.item.demo.chaseStory&&testCallDeployment(process.env)){
  try{
   if(process.env.CALL_TRANSFER_ENABLED==='true')throw new Error('Supervised finish control requires no transfer');
   const token=randomBytes(32).toString('base64url');
   const origin=new URL(process.env.CONVEX_SITE_URL!);if(origin.protocol!=='https:'||!['abundant-marten-136.convex.site','tangible-lemur-692.convex.site'].includes(origin.hostname))throw new Error('Use test hosting');
   const response=await fetch(`https://api.vapi.ai/assistant/${encodeURIComponent(process.env.VAPI_ASSISTANT_ID!)}`,{headers:{Authorization:`Bearer ${process.env.VAPI_API_KEY}`,'User-Agent':'RefundGenie-controlled-call/1.0'},signal:AbortSignal.timeout(10000)});
   if(!response.ok)throw new Error('Assistant unavailable');const saved=await response.json();if(!saved.voice||!saved.transcriber)throw new Error('Voice configuration missing');
   await ctx.runMutation(internal.callControl.prepare,{id:r.callId,tokenHash:await hashToken(token)});
   configuration={assistant:controlledAssistant(saved,overrides,new URL('/vapi/call-tool',origin).href,token)};
  }catch{
   await ctx.runMutation(internal.calls.finish,{id:r.callId,status:'failed',transcript:'',reason:'Controlled call configuration unavailable; no automatic retry',costUsd:0,durationSeconds:0,patchIn:false});return null;
  }
 }
 const result=await startCall({...process.env,CALL_MODE:r.mode},{metadata:{refundGenieCallId:String(r.callId)},phoneNumberId:process.env.VAPI_PHONE_NUMBER_ID,customer:{number:r.number},...configuration},transcript);
 if(result.status==="queued"){await ctx.runMutation(internal.calls.queued,{id:r.callId,externalId:result.externalId!});await ctx.scheduler.runAfter(15000,internal.callActions.poll,{id:r.callId,attempt:0});}
 else if(result.status==="start_uncertain"){await ctx.runMutation(internal.calls.startUncertain,{id:r.callId});await ctx.scheduler.runAfter(30000,internal.callActions.reconcileStart,{id:r.callId,attempt:0});}
 else await ctx.runMutation(internal.calls.finish,{id:r.callId,status:result.status,transcript:result.status==="failed"?"":result.transcript,reason:result.reason,privacyNote:result.privacyNote,recordingUrl:result.status==="failed"?undefined:recording?.url,recordingKind:result.status==="failed"?undefined:recording?"roleplay":undefined,costUsd:0,durationSeconds:result.status==="failed"?0:args.fixture==="identity"?65:75,patchIn:result.status!=="failed"&&needsPassenger(transcript)});
 return null;
}});
export const poll=internalAction({args:{id:v.id("calls"),attempt:v.number(),consecutiveErrors:v.optional(v.number())},returns:v.null(),handler:async(ctx,args)=>{const loaded=await ctx.runQuery(internal.calls.load,{id:args.id});if(!loaded||loaded.call.status!=="queued"||!loaded.call.externalId)return null;
 try{const r=await fetch(`https://api.vapi.ai/call/${encodeURIComponent(loaded.call.externalId)}`,{headers:{Authorization:`Bearer ${process.env.VAPI_API_KEY}`},signal:AbortSignal.timeout(10000)});if(!r.ok)throw new Error("Call status unavailable");const data=await r.json();if(data.status!=="ended"&&Date.now()-loaded.call.createdAt<callMaxMinutes(process.env)*60000&&loaded.item.chase?.active){await ctx.scheduler.runAfter(15000,internal.callActions.poll,{...args,attempt:args.attempt+1,consecutiveErrors:0});return null;}
 if(data.status!=="ended"){if(data.monitor?.controlUrl&&/^https:\/\/(?:[a-z0-9-]+\.)?vapi\.ai\//i.test(data.monitor.controlUrl))await fetch(data.monitor.controlUrl,{method:"POST",headers:{Authorization:`Bearer ${process.env.VAPI_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({type:"end-call"}),signal:AbortSignal.timeout(10000)});data.endedReason=loaded.item.chase?.active?"max-duration: hold too long":"stopped";}
 const result=safeCallResult(data,{shareBookingContact:loaded.call.shareBookingContact===true});await ctx.runMutation(internal.calls.finish,{id:args.id,status:result.status,reason:result.reason,transcript:result.transcript,recordingUrl:result.recordingUrl,costUsd:typeof data.cost==="number"?result.cost:loaded.call.reservedUsd,durationSeconds:callDurationSeconds(data,args.attempt*15),patchIn:result.patchIn,passengerAnswered:result.passengerAnswered,privacyNote:result.privacyNote});
 }catch{
 const consecutiveErrors=(args.consecutiveErrors??0)+1;
 if(consecutiveErrors<8)await ctx.scheduler.runAfter(15000,internal.callActions.poll,{id:args.id,attempt:args.attempt+1,consecutiveErrors});
 else await ctx.runMutation(internal.calls.finish,{id:args.id,status:"failed",transcript:"",reason:"Call status unavailable; no automatic retry",costUsd:loaded.call.reservedUsd,durationSeconds:Math.min(1500,args.attempt*15),patchIn:false});
 }return null;}});
export const confirm=internalAction({args:{id:v.id("calls"),attempt:v.number()},returns:v.null(),handler:async(ctx,args)=>{const loaded=await ctx.runQuery(internal.calls.load,{id:args.id});if(!loaded?.item.chase?.active||loaded.item.chase.authorisedAt!==loaded.call.authorisedAt)return null;if(loaded.item.stage==="TRIAGING"&&loaded.call.finishControl?.ledger?.branch!=="callback"&&args.attempt<20){await ctx.scheduler.runAfter(1500,internal.callActions.confirm,{...args,attempt:args.attempt+1});return null;}await ctx.runMutation(internal.calls.prepareConfirmation,{id:args.id});return null;}});

export const proofFixture=internalAction({args:{fixture:v.union(v.literal("reference"),v.literal("identity"))},returns:v.any(),handler:async(ctx,args):Promise<unknown>=>{if(callMode(process.env)!=="simulated")throw new Error("This proof is simulated only");const config=await ctx.runQuery(internal.callQa.config,{});const token=randomBytes(32).toString("base64url"),code=`RG-${randomBytes(3).toString("hex").toUpperCase()}`;const bytes=await makeAuthorityLetter({code,name:"Demo Passenger",mobile:config.mobile,email:config.email,company:"Demo Air and DemoTrips",pnr:"SAMPLE",authorisedAt:Date.now()});const letterId=await ctx.storage.store(new Blob([new Uint8Array(bytes)],{type:"application/pdf"}));const caseId=await ctx.runMutation(internal.callQa.seed,{code,tokenHash:await hashToken(token),encryptedCaseToken:await encryptToken(token),letterId});await ctx.runAction(internal.callActions.run,{caseId,fixture:args.fixture});return {code,token};}});


// Read-only reconciliation. Never starts another call, and never releases an absent result.
export const reconcileStart=internalAction({args:{id:v.id('calls'),attempt:v.number()},returns:v.null(),handler:async(ctx,a)=>{
 const loaded=await ctx.runQuery(internal.calls.load,{id:a.id});if(!loaded||loaded.call.status!=='start_uncertain')return null;
 try{
  const url=new URL('https://api.vapi.ai/call');url.search=new URLSearchParams({limit:'100',createdAtGe:new Date(loaded.call.createdAt-60000).toISOString(),createdAtLe:new Date(loaded.call.createdAt+60000).toISOString()}).toString();
  const response=await fetch(url,{headers:{Authorization:`Bearer ${process.env.VAPI_API_KEY}`},signal:AbortSignal.timeout(10000)});
  if(!response.ok)throw new Error('Status unavailable');const rows=await response.json();
  const matches=Array.isArray(rows)?rows.filter(r=>r?.metadata?.refundGenieCallId===String(a.id)&&typeof r.id==='string'):[];
  if(matches.length===1){await ctx.runMutation(internal.calls.queued,{id:a.id,externalId:matches[0].id});await ctx.scheduler.runAfter(0,internal.callActions.poll,{id:a.id,attempt:0});return null;}
 }catch{/* Keep the full budget reserved. No new call request. */}
 if(a.attempt<19)await ctx.scheduler.runAfter(30000,internal.callActions.reconcileStart,{...a,attempt:a.attempt+1});return null;
}});
