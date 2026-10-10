"use client";
import {useEffect,useState} from "react";
import {useAction,useMutation} from "convex/react";
import {api} from "../../convex/_generated/api";
import {getDeviceId} from "../../lib/case-link";
import {loadCheckout} from "../../lib/razorpay-client";
import {productName} from "../../lib/product";
import {annualGuarantee} from "../../lib/annual-pass";
import {displayDate} from "../../lib/dates";
export type TrialData={demo:unknown;handHelped:boolean;stage:string;trialLocked:boolean;trialLanded:number;trialLimit:number;annualPaid:boolean;annualUntil:number|null;checkoutEnabled:boolean;razorpayLink:string|null};
export function TrialCard({data,code,token}:{data:TrialData;code:string;token:string}) {
 const args={code,token};const [busy,setBusy]=useState(false),[error,setError]=useState("");
 const date=(s:string)=>displayDate(s);
 const run=async(fn:()=>Promise<unknown>)=>{setBusy(true);setError("");try{await fn();}catch{setError("Please try again.");}finally{setBusy(false);}};
 const checkoutEnabled=useAction(api.checkout.configuration);
 const [checkoutConfigured,setCheckoutConfigured]=useState(false);
 const createOrder=useAction(api.checkout.createOrder),verifyPayment=useAction(api.checkout.verify);
 const [paying,setPaying]=useState(false),[checkoutReady,setCheckoutReady]=useState(false);
 const claimAnnual=useMutation(api.annualPayments.claim),restoreAnnual=useMutation(api.annualPayments.restore);

 const checkoutCandidate=!!(data.checkoutEnabled&&data.trialLocked&&!data.stage.startsWith("CLOSED")&&process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
 useEffect(()=>{
  if(!checkoutCandidate)return;
  let active=true;
  void checkoutEnabled({publicKeyId:process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!}).then(async setup=>{const ready=setup.configured&&setup.keyMatches;if(active)setCheckoutConfigured(ready);if(!setup.keyMatches&&active)setError("Checkout setup needs attention. Please contact support.");if(ready){await loadCheckout();if(active)setCheckoutReady(true);}}).catch(()=>{if(active)setError("Payment could not load. Try the Pay button again.");});
  return ()=>{active=false;};
 },[checkoutCandidate,checkoutEnabled]);
 const showCheckout=checkoutCandidate&&checkoutConfigured;
 const payAnnual=async()=>{
  if(paying)return;setPaying(true);setError("");
  try{
   await loadCheckout();setCheckoutReady(true);
   const order=await createOrder({...args,deviceId:getDeviceId(),publicKeyId:process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!});
   const checkout=new window.Razorpay!({key:process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,order_id:order.orderId,amount:order.amount,currency:order.currency,name:productName,description:"1 year",modal:{ondismiss:()=>setPaying(false)},handler:reply=>{
    void verifyPayment({...args,orderId:reply.razorpay_order_id,paymentId:reply.razorpay_payment_id,signature:reply.razorpay_signature}).catch(()=>setError("Payment could not be verified. Your case is unchanged. Contact support if you paid.")).finally(()=>setPaying(false));
   }});
   checkout.on("payment.failed",()=>{setPaying(false);setError("Payment did not go through. Please try again.");});
   checkout.open();
  }catch{setPaying(false);setError("Could not start payment. Please try again.");}
 };

 if(data.demo||data.handHelped)return null;
 return <>
 <section className="case-card" aria-label="Free refund trial"><p>Free until {data.trialLimit} refunds land. Then Rs 49 a year.</p><p>{data.trialLanded} of {data.trialLimit} free refunds used</p></section>
 {!data.demo&&!data.handHelped&&!data.stage.startsWith("CLOSED")&&(data.annualPaid||data.trialLocked)&&<section className="case-card price-card" aria-label="Annual payment"><h2>{data.annualPaid?"Your year is covered":"Rs 49 a year"}</h2>{data.annualPaid?<><p>Every case through {date(new Date(data.annualUntil!).toISOString().slice(0,10))}.</p><button className="text-button" disabled={busy} onClick={()=>run(()=>restoreAnnual({...args,deviceId:getDeviceId()}))}>Use my year on this device</button></>:<><p>{annualGuarantee}</p><p>Your free refunds are used. Stay on every case for the year: replies, follow-ups and escalation steps. {data.checkoutEnabled ? "Your year unlocks after Razorpay payment is verified." : "Ganesh checks Payment Link payments by hand."}</p>{showCheckout?<button className="button button-primary" disabled={busy||paying} onClick={()=>void payAnnual()}>{paying?"Opening payment…":checkoutReady?"Pay Rs 49 for a year":"Load payment and pay Rs 49"}</button>:data.razorpayLink?<><a className="button button-primary" href={data.razorpayLink} target="_blank" rel="noreferrer">Pay Rs 49 for a year</a><p>Add {code} in the payment note.</p><button className="text-button" disabled={busy} onClick={()=>run(()=>claimAnnual({...args,deviceId:getDeviceId()}))}>I've paid</button></>:<><button className="button button-primary" disabled>Pay Rs 49 for a year</button><p>Payment is being set up. Please contact support.</p></>}</>}</section>}
 {error&&<p className="error-banner" role="alert">{error}</p>}
 </>;
}
