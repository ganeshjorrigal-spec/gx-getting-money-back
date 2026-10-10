// Internal, CLI-only synthetic fixtures. No AI, mail, Sheet or payment side effects.
import { internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { hashToken } from "./lib/access";
import { caseTrial } from "./lib/trial";
import { sampleFlight } from "../lib/flight-sample";
import { planFlight } from "../lib/flight";
export const seed=internalMutation({
 args:{code:v.string(),tokenHash:v.string(),deviceId:v.string(),landed:v.number(),refundType:v.union(v.literal("flight"),v.literal("event"))},returns:v.null(),
 handler:async(ctx,args)=>{
  if(!/^TB-[A-Z0-9]{6}$/.test(args.code)||!/^([a-f0-9]{64})$/.test(args.tokenHash)||!/^([A-Za-z0-9_-]{43})$/.test(args.deviceId)||!Number.isInteger(args.landed)||args.landed<0||args.landed>4)throw new Error("Invalid fixture");
  if(await ctx.db.query("cases").withIndex("by_code",q=>q.eq("code",args.code)).unique())throw new Error("Fixture already exists");
  const now=Date.now(),deviceHash=await hashToken(args.deviceId);
  const base={deviceHash,tokenHash:args.tokenHash,ladderLevel:0,draftsShown:1,tier:"free_check" as const,paidState:"none" as const,createdAt:now,updatedAt:now,source:"qa-free-trial"};
  for(let i=0;i<args.landed;i++)await ctx.db.insert("cases",{...base,code:`${args.code}-landed-${i}`,refundType:i%2?"event":"flight",stage:"CLOSED_LANDED",recoveredPaise:240000,closedAt:now});
  // Excluded landed cases prove neither class consumes the trial.
  await ctx.db.insert("cases",{...base,code:`${args.code}-helped`,stage:"CLOSED_LANDED",handHelped:true});
  await ctx.db.insert("cases",{...base,code:`${args.code}-demo`,stage:"CLOSED_LANDED",demo:{round:3,now:"2026-10-10",expiresAt:now+7*86400000,phase:"ready"}});
  const read=sampleFlight(); const plan=planFlight(read,"2026-10-10");
  const body="Made-up free-trial fixture. No real booking or money. Do not send this message.";
  const caseId=await ctx.db.insert("cases",{...base,code:args.code,refundType:args.refundType,stage:"READY",route:"OVERDUE",platform:args.refundType==="event"?"District":read.bookedVia!,eventName:"Free trial fixture",amountPaise:240000,nextStep:args.refundType==="flight"?plan.nextStep:"L0_email",factsConfirmedAt:now,...(args.refundType==="flight"?{facts:read,flightPlan:{...plan,to:null,cc:[],body},owner:plan.owner,moneyWith:plan.moneyWith}:{} )});
  await ctx.db.insert("drafts",{caseId,step:args.refundType==="flight"?plan.nextStep:"L0_email",channel:"email",subject:`Fixture ${args.code}`,body,attachChecklist:[],status:"ready",createdAt:now});
  return null;
 }
});
export const status=internalQuery({args:{code:v.string()},returns:v.any(),handler:async(ctx,{code})=>{
 const item=await ctx.db.query("cases").withIndex("by_code",q=>q.eq("code",code)).unique();if(!item||item.source!=="qa-free-trial")throw new Error("Not a fixture");
 const trial=await caseTrial(ctx,item);return {code,landed:trial.landed,limit:trial.limit,locked:trial.locked};
}});
