import {mutation,internalMutation,internalQuery} from "./_generated/server";
import {v} from "convex/values";
import {assertAccess,hashToken} from "./lib/access";
import {annualActive,annualExpiry,razorpayPaymentLink} from "../lib/annual-pass";
import {takeRate} from "./lib/rate";

export const claim=mutation({args:{code:v.string(),token:v.string(),deviceId:v.string()},returns:v.null(),handler:async(ctx,args)=>{
 const item=await assertAccess(ctx,args.code,args.token);
 if(item.demo||item.refundType!=="flight"||!razorpayPaymentLink(process.env.NEXT_PUBLIC_RAZORPAY_PAYMENT_LINK))throw new Error("Annual payment is not available yet");
 if(!/^[A-Za-z0-9_-]{43}$/.test(args.deviceId))throw new Error("Open the case on the device where you started it");
 const deviceHash=await hashToken(args.deviceId);
 await takeRate(ctx,`annual-claim:${deviceHash}`,3,86_400_000);
 const prior=await ctx.db.query("annualPasses").withIndex("by_device",q=>q.eq("deviceHash",deviceHash)).unique();const now=Date.now();
 if(annualActive(prior,now)){await ctx.db.patch(item._id,{deviceHash,paidState:prior!.state==="confirmed"?"confirmed":"claimed",updatedAt:now});return null;}
 const record={deviceHash,sourceCode:item.code,startedAt:now,expiresAt:annualExpiry(now),state:"claimed" as const,graceUntil:undefined};
 if(prior)await ctx.db.patch(prior._id,record);else await ctx.db.insert("annualPasses",record);
 if(item.deviceHash&&item.deviceHash!==deviceHash){const original=await ctx.db.query("annualPasses").withIndex("by_device",q=>q.eq("deviceHash",item.deviceHash!)).unique();if(!annualActive(original,now)){const alias={...record,deviceHash:item.deviceHash};if(original)await ctx.db.patch(original._id,alias);else await ctx.db.insert("annualPasses",alias);}}
 await ctx.db.patch(item._id,{deviceHash:item.deviceHash??deviceHash,paidState:"claimed",updatedAt:now});
 await ctx.db.insert("payments",{code:item.code,amountPaise:4900,status:"claimed",claimedAt:now});
 await ctx.db.insert("caseEvents",{caseId:item._id,type:"paid_claimed",summary:"You marked the Rs 49 annual payment complete; Ganesh checks it by hand",actor:"user",createdAt:now});return null;
}});
export const restore=mutation({args:{code:v.string(),token:v.string(),deviceId:v.string()},returns:v.null(),handler:async(ctx,args)=>{
 const item=await assertAccess(ctx,args.code,args.token);if(!item.deviceHash||item.demo||!/^[A-Za-z0-9_-]{43}$/.test(args.deviceId))throw new Error("No annual payment on this case");
 const pass=await ctx.db.query("annualPasses").withIndex("by_device",q=>q.eq("deviceHash",item.deviceHash!)).unique();if(!annualActive(pass,Date.now()))throw new Error("No current annual payment on this case");
 const deviceHash=await hashToken(args.deviceId);const existing=await ctx.db.query("annualPasses").withIndex("by_device",q=>q.eq("deviceHash",deviceHash)).unique();
 const record={deviceHash,sourceCode:pass!.sourceCode,startedAt:pass!.startedAt,expiresAt:pass!.expiresAt,state:pass!.state,graceUntil:pass!.graceUntil};
 if(existing&&annualActive(existing,Date.now())&&existing.expiresAt>=pass!.expiresAt)return null;
 if(existing)await ctx.db.patch(existing._id,record);else await ctx.db.insert("annualPasses",record);return null;
}});
// Ganesh reconciles in Razorpay. No login, checkout, or payment verification call from Tickback.
export const reconcile=internalMutation({args:{code:v.string(),found:v.boolean()},returns:v.null(),handler:async(ctx,args)=>{
 const passes=await ctx.db.query("annualPasses").withIndex("by_source",q=>q.eq("sourceCode",args.code)).collect();
 for(const pass of passes)await ctx.db.patch(pass._id,{state:args.found?"confirmed":"not_found",graceUntil:args.found?undefined:Date.now()+2*86_400_000});
 const payments=await ctx.db.query("payments").withIndex("by_code",q=>q.eq("code",args.code)).order("desc").first();if(payments)await ctx.db.patch(payments._id,{status:args.found?"confirmed":"not_found"});return null;
}});
export const recoveryCount=internalQuery({args:{code:v.string()},returns:v.any(),handler:async(ctx,{code})=>{
 const passes=await ctx.db.query("annualPasses").withIndex("by_source",q=>q.eq("sourceCode",code)).collect();
 const recoveries=await ctx.db.query("annualRecoveries").withIndex("by_source",q=>q.eq("sourceCode",code)).collect();const codes=new Set(recoveries.map(r=>r.caseCode));
 return {landedCases:codes.size,yearEnded:passes.length>0&&passes.every(p=>p.expiresAt<=Date.now()),refundDue:passes.length>0&&passes.every(p=>p.expiresAt<=Date.now())&&codes.size===0};
}});
