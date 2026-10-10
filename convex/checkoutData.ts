import { caseTrial } from "./lib/trial";
import { internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { assertAccess, hashToken } from "./lib/access";
import { takeRate } from "./lib/rate";
import { checkoutEligible } from "../lib/razorpay";
import { annualActive, annualExpiry } from "../lib/annual-pass";

const access = { code: v.string(), token: v.string() };
export const prepare = internalMutation({
 args: {...access, deviceId:v.string()}, returns:v.string(),
 handler:async(ctx,args)=>{
  const item=await assertAccess(ctx,args.code,args.token);
  if(!checkoutEligible(item))throw new Error("Annual checkout is not available for this case");
  if(!/^[A-Za-z0-9_-]{43}$/.test(args.deviceId))throw new Error("Open your case on this device again");
  const deviceHash=await hashToken(args.deviceId);
  const prior=await ctx.db.query("annualPasses").withIndex("by_device",q=>q.eq("deviceHash",item.deviceHash??deviceHash)).unique();
  if(annualActive(prior,Date.now()))throw new Error("Your year is already covered");
  if(!(await caseTrial(ctx,item)).locked)throw new Error("Your free trial is still available");
  await takeRate(ctx,`annual-order:${deviceHash}`,3,60_000);
  return deviceHash;
 }
});
export const saveOrder=internalMutation({
 args:{...access,deviceHash:v.string(),orderId:v.string()},returns:v.null(),
 handler:async(ctx,args)=>{
  const item=await assertAccess(ctx,args.code,args.token);
  if(!checkoutEligible(item))throw new Error("Checkout unavailable");
  await ctx.db.insert("payments",{code:item.code,amountPaise:4900,status:"pending",claimedAt:Date.now(),orderId:args.orderId,deviceHash:args.deviceHash});return null;
 }
});
export const payment=internalQuery({
 args:{...access,orderId:v.string()},returns:v.any(),handler:async(ctx,args)=>{
  const item=await assertAccess(ctx,args.code,args.token);
  if(!checkoutEligible(item))throw new Error("Checkout unavailable");
  const record=await ctx.db.query("payments").withIndex("by_order",q=>q.eq("orderId",args.orderId)).unique();
  if(!record||record.code!==item.code)throw new Error("Payment does not match this case");return record;
 }
});
export const confirm=internalMutation({
 args:{...access,orderId:v.string(),paymentId:v.string()},returns:v.null(),handler:async(ctx,args)=>{
  const item=await assertAccess(ctx,args.code,args.token);
  if(!checkoutEligible(item))throw new Error("Checkout unavailable");
  const payment=await ctx.db.query("payments").withIndex("by_order",q=>q.eq("orderId",args.orderId)).unique();
  if(!payment||payment.code!==item.code||!payment.deviceHash||payment.amountPaise!==4900)throw new Error("Payment does not match this case");
  if(payment.status==="confirmed") {if(payment.paymentId!==args.paymentId)throw new Error("Payment already recorded");return null;}
  if(payment.status!=="pending")throw new Error("Payment is not pending");
  const now=Date.now();
  for(const deviceHash of new Set([payment.deviceHash,item.deviceHash??payment.deviceHash])){
   const prior=await ctx.db.query("annualPasses").withIndex("by_device",q=>q.eq("deviceHash",deviceHash)).unique();
   // A repeated callback never restarts an existing confirmed year.
   if(prior?.state==="confirmed"&&annualActive(prior,now))continue;
   const record={deviceHash,sourceCode:item.code,startedAt:now,expiresAt:annualExpiry(now),state:"confirmed" as const,graceUntil:undefined};
   if(prior)await ctx.db.patch(prior._id,record);else await ctx.db.insert("annualPasses",record);
  }
  await ctx.db.patch(payment._id,{status:"confirmed",paymentId:args.paymentId});
  await ctx.db.patch(item._id,{deviceHash:item.deviceHash??payment.deviceHash,paidState:"confirmed",updatedAt:now});
  await ctx.db.insert("caseEvents",{caseId:item._id,type:"paid_confirmed",summary:"Razorpay payment verified: your Rs 49 annual plan is confirmed",actor:"agent",createdAt:now});return null;
 }
});
