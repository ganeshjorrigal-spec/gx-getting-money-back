export const annualGuarantee = "If Tickback recovers nothing in that year, your Rs 49 comes back.";
export function razorpayPaymentLink(value:string|undefined):string|null {
 try {if(!value)return null;const url=new URL(value);return url.protocol==="https:"&&!url.username&&!url.password&&(url.hostname==="rzp.io"||url.hostname==="razorpay.com"||url.hostname.endsWith(".razorpay.com"))?url.href:null;}catch{return null;}
}
export function annualExpiry(now:number):number {
 const d=new Date(now),year=d.getUTCFullYear()+1,month=d.getUTCMonth();
 return Date.UTC(year,month,Math.min(d.getUTCDate(),new Date(Date.UTC(year,month+1,0)).getUTCDate()),d.getUTCHours(),d.getUTCMinutes(),d.getUTCSeconds(),d.getUTCMilliseconds());
}
export function annualActive(pass:{expiresAt:number;state:string;graceUntil?:number}|null|undefined,now:number):boolean {
 return !!pass&&pass.expiresAt>now&&(["claimed","confirmed"].includes(pass.state)||(pass.state==="not_found"&&(pass.graceUntil??0)>now));
}
