export type CheckoutReply = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type Options = { key:string; order_id:string; amount:number; currency:string; name:string; description:string; handler:(reply:CheckoutReply)=>void; modal:{ondismiss:()=>void} };
export type CheckoutInstance = { open:()=>void; on:(event:"payment.failed",handler:()=>void)=>void };
declare global { interface Window { Razorpay?: new (options:Options)=>CheckoutInstance } }
let loading: Promise<void> | undefined;
export function loadCheckout(): Promise<void> {
  if(window.Razorpay)return Promise.resolve();
  if(loading)return loading;
  loading=new Promise<void>((resolve,reject)=>{
    const script=document.createElement("script");script.src="https://checkout.razorpay.com/v1/checkout.js";script.async=true;
    script.onload=()=>window.Razorpay?resolve():reject(new Error("Payment could not load. Please try again."));
    script.onerror=()=>{script.remove();reject(new Error("Payment could not load. Check your connection and try again."));};
    document.head.appendChild(script);
  }).catch(error=>{loading=undefined;throw error;});
  return loading;
}
