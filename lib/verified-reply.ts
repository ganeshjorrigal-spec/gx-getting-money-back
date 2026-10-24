import {flightContacts} from './flight-kb';
import {routeKb} from './route-kb';
export function authenticatedReply(sender:string,results:string){
 const domain=sender.toLowerCase().split('@')[1];
 // Only Gmail's receiving authentication service, not an arbitrary supplied header.
 if(!domain||!/^\s*mx\.google\.com\s*;/i.test(results))return false;
 const clauses=results.split(';').map(s=>s.trim());
 const spf=clauses.some(s=>/^spf=pass(?:\s|$)/i.test(s));
 const dkim=clauses.some(s=>/^dkim=pass(?:\s|$)/i.test(s)&&[...s.matchAll(/header\.(?:i|d)=([^\s;]+)/gi)].some(m=>{
  const signing=m[1].replace(/^.*@/,'').toLowerCase();return signing===domain||signing.endsWith('.'+domain);
 }));return spf&&dkim;
}
export function checkedReplySender(item:{demo?:unknown;platform?:string;facts?:any},sender:string,desk?:string){
 const address=sender.toLowerCase(),domain=address.split('@')[1];if(!domain)return false;
 if(item.demo)return !!desk&&address===desk.toLowerCase();
 const companies=[item.facts?.airline,item.facts?.bookedVia].filter(Boolean).map(s=>String(s).toLowerCase());
 const flight=flightContacts.filter(c=>companies.includes(c.company.toLowerCase())&&c.label==='VERIFIED'&&c.email&&c.url).map(c=>c.email!);
 const route=routeKb[item.platform??item.facts?.platform??''];
 const contacts=[...flight,...(route?[route.supportEmail?.value,route.grievanceEmail?.value].filter((x):x is string=>!!x):[])];
 return contacts.some(c=>address===c.toLowerCase()||domain===c.toLowerCase().split('@')[1]);
}
