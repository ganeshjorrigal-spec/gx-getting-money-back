"use node";
import { internalAction } from "./_generated/server";
import { encryptToken } from "../lib/token-crypto";
import { hashToken } from "./lib/access";
import { makeAuthorityLetter } from "./lib/authority_letter";
import { randomBytes } from "node:crypto";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { callFixture, needsPassenger, callMode } from "../lib/calls";
import { startCall, assistantOverrides, safeCallResult } from "../lib/call-transport";
export const run=internalAction({args:{caseId:v.id("cases"),fixture:v.union(v.literal("reference"),v.literal("identity")),expectedMode:v.optional(v.union(v.literal("live"),v.literal("simulated")))},returns:v.null(),handler:async(ctx,args)=>{
 const r=await ctx.runMutation(internal.calls.reserve,args);if(!r?.item.chase)return null;
 if(!await ctx.runQuery(internal.chase.stillActive,{caseId:r.item._id,authorisedAt:r.item.chase.authorisedAt}))return null;
 const recording=r.item.demo?.chaseStory?await ctx.runQuery(internal.chaseDemo.recording,{}):null;
 const transcript=recording?.transcript??callFixture(args.fixture,{name:r.item.chase.name,pnr:r.item.facts.pnr,amount:(r.item.amountPaise??0)/100,date:r.item.demo?.now??r.now.toString(),code:r.item.code});
 const result=await startCall({...process.env,CALL_MODE:r.mode},{phoneNumberId:process.env.VAPI_PHONE_NUMBER_ID,assistantId:process.env.VAPI_ASSISTANT_ID,customer:{number:r.number},assistantOverrides:assistantOverrides({name:r.item.chase.name,pnr:r.item.facts.pnr,company:r.item.facts.airline,mobile:r.passengerNumber},process.env)},transcript);
 if(result.status==="queued"){await ctx.runMutation(internal.calls.queued,{id:r.callId,externalId:result.externalId!});await ctx.scheduler.runAfter(15000,internal.callActions.poll,{id:r.callId,attempt:0});}
 else await ctx.runMutation(internal.calls.finish,{id:r.callId,status:result.status,transcript:result.status==="failed"?"":result.transcript,reason:result.reason,privacyNote:result.privacyNote,recordingUrl:result.status==="failed"?undefined:recording?.url,recordingKind:result.status==="failed"?undefined:recording?"roleplay":undefined,costUsd:0,durationSeconds:result.status==="failed"?0:args.fixture==="identity"?65:75,patchIn:result.status!=="failed"&&needsPassenger(transcript)});
 return null;
}});
export const poll=internalAction({args:{id:v.id("calls"),attempt:v.number(),consecutiveErrors:v.optional(v.number())},returns:v.null(),handler:async(ctx,args)=>{const loaded=await ctx.runQuery(internal.calls.load,{id:args.id});if(!loaded||loaded.call.status!=="queued"||!loaded.call.externalId)return null;
 try{const r=await fetch(`https://api.vapi.ai/call/${encodeURIComponent(loaded.call.externalId)}`,{headers:{Authorization:`Bearer ${process.env.VAPI_API_KEY}`},signal:AbortSignal.timeout(10000)});if(!r.ok)throw new Error("Call status unavailable");const data=await r.json();if(data.status!=="ended"&&args.attempt<100&&loaded.item.chase?.active){await ctx.scheduler.runAfter(15000,internal.callActions.poll,{...args,attempt:args.attempt+1,consecutiveErrors:0});return null;}
 if(data.status!=="ended"){if(data.monitor?.controlUrl&&/^https:\/\/(?:[a-z0-9-]+\.)?vapi\.ai\//i.test(data.monitor.controlUrl))await fetch(data.monitor.controlUrl,{method:"POST",headers:{Authorization:`Bearer ${process.env.VAPI_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({type:"end-call"}),signal:AbortSignal.timeout(10000)});data.endedReason=loaded.item.chase?.active?"max-duration: hold too long":"stopped";}
 const result=safeCallResult(data);await ctx.runMutation(internal.calls.finish,{id:args.id,status:result.status,reason:result.reason,transcript:result.transcript,recordingUrl:result.recordingUrl,costUsd:result.cost,durationSeconds:Math.min(1500,args.attempt*15),patchIn:result.patchIn,passengerAnswered:result.passengerAnswered,privacyNote:result.privacyNote});
 }catch{
 const consecutiveErrors=(args.consecutiveErrors??0)+1;
 if(consecutiveErrors<8)await ctx.scheduler.runAfter(15000,internal.callActions.poll,{id:args.id,attempt:args.attempt+1,consecutiveErrors});
 else await ctx.runMutation(internal.calls.finish,{id:args.id,status:"failed",transcript:"",reason:"Call status unavailable; no automatic retry",costUsd:loaded.call.reservedUsd,durationSeconds:Math.min(1500,args.attempt*15),patchIn:false});
 }return null;}});
export const confirm=internalAction({args:{id:v.id("calls"),attempt:v.number()},returns:v.null(),handler:async(ctx,args)=>{const loaded=await ctx.runQuery(internal.calls.load,{id:args.id});if(!loaded?.item.chase?.active||loaded.item.chase.authorisedAt!==loaded.call.authorisedAt)return null;if(loaded.item.stage==="TRIAGING"&&args.attempt<20){await ctx.scheduler.runAfter(1500,internal.callActions.confirm,{...args,attempt:args.attempt+1});return null;}await ctx.runMutation(internal.calls.prepareConfirmation,{id:args.id});return null;}});

export const proofFixture=internalAction({args:{fixture:v.union(v.literal("reference"),v.literal("identity"))},returns:v.any(),handler:async(ctx,args):Promise<unknown>=>{if(callMode(process.env)!=="simulated")throw new Error("This proof is simulated only");const config=await ctx.runQuery(internal.callQa.config,{});const token=randomBytes(32).toString("base64url"),code=`RG-${randomBytes(3).toString("hex").toUpperCase()}`;const bytes=await makeAuthorityLetter({code,name:"Demo Passenger",mobile:config.mobile,email:config.email,company:"Demo Air and DemoTrips",pnr:"SAMPLE",authorisedAt:Date.now()});const letterId=await ctx.storage.store(new Blob([new Uint8Array(bytes)],{type:"application/pdf"}));const caseId=await ctx.runMutation(internal.callQa.seed,{code,tokenHash:await hashToken(token),encryptedCaseToken:await encryptToken(token),letterId});await ctx.runAction(internal.callActions.run,{caseId,fixture:args.fixture});return {code,token};}});

