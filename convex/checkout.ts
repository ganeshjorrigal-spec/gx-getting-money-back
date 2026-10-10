import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { checkoutKeyMatches, validPaymentSignature } from "../lib/razorpay";
const access={code:v.string(),token:v.string()};
export const enabled=action({args:{},returns:v.boolean(),handler:async()=>!!process.env.RAZORPAY_KEY_ID&&!!process.env.RAZORPAY_KEY_SECRET});
export const configuration=action({args:{publicKeyId:v.string()},returns:v.object({configured:v.boolean(),keyMatches:v.boolean(),testMode:v.boolean()}),handler:async(_ctx,{publicKeyId})=>({configured:!!process.env.RAZORPAY_KEY_ID&&!!process.env.RAZORPAY_KEY_SECRET,keyMatches:checkoutKeyMatches(process.env.RAZORPAY_KEY_ID,publicKeyId),testMode:process.env.RAZORPAY_KEY_ID?.startsWith("rzp_test_")??false})});
export const createOrder=action({
 args:{...access,deviceId:v.string(),publicKeyId:v.string()},returns:v.object({orderId:v.string(),amount:v.number(),currency:v.string()}),
 handler:async(ctx,args):Promise<{orderId:string;amount:number;currency:string}>=>{
  const key=process.env.RAZORPAY_KEY_ID,secret=process.env.RAZORPAY_KEY_SECRET;
  if(!key||!secret)throw new Error("Checkout is being set up. Please try later.");
  if(!checkoutKeyMatches(key,args.publicKeyId))throw new Error("Checkout setup needs attention. Please contact support.");
  const deviceHash=await ctx.runMutation(internal.checkoutData.prepare,{code:args.code,token:args.token,deviceId:args.deviceId});
  const response=await fetch("https://api.razorpay.com/v1/orders",{method:"POST",headers:{Authorization:`Basic ${btoa(`${key}:${secret}`)}`,"Content-Type":"application/json"},body:JSON.stringify({amount:4900,currency:"INR",receipt:`${args.code}-${crypto.randomUUID().slice(0,8)}`,notes:{case_code:args.code}})});
  if(!response.ok)throw new Error("Could not start payment. Please try again.");
  const order=await response.json() as {id?:string;amount?:number;currency?:string};
  if(!order.id||!/^order_[A-Za-z0-9]+$/.test(order.id)||order.amount!==4900||order.currency!=="INR")throw new Error("Could not start payment. Please try again.");
  await ctx.runMutation(internal.checkoutData.saveOrder,{code:args.code,token:args.token,deviceHash,orderId:order.id});
  return {orderId:order.id,amount:4900,currency:"INR"};
 }
});
export const verify=action({
 args:{...access,orderId:v.string(),paymentId:v.string(),signature:v.string()},returns:v.null(),
 handler:async(ctx,args)=>{
  const secret=process.env.RAZORPAY_KEY_SECRET;
  if(!secret)throw new Error("Payment verification unavailable. Please contact support.");
  const payment=await ctx.runQuery(internal.checkoutData.payment,{code:args.code,token:args.token,orderId:args.orderId});
  if(!await validPaymentSignature(secret,payment.orderId??"",args.orderId,args.paymentId,args.signature))throw new Error("Payment could not be verified. No changes were made. Please contact support.");
  await ctx.runMutation(internal.checkoutData.confirm,{code:args.code,token:args.token,orderId:args.orderId,paymentId:args.paymentId});return null;
 }
});
