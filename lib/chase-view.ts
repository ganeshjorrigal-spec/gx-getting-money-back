import {callingCopy} from '../app/copy';
import {displayDate,todayIST,addDays} from './dates';
import {visibleTimeline} from './timeline';
import {callLabel} from './calls';
export function chaseRows<T extends { _id:string;type:string;summary:string;createdAt:number }>(events:T[],company:string){const individual=new Set(['genie_mail_sent','call_completed','call_failed']);return [...visibleTimeline(events.filter(e=>!individual.has(e.type)),company),...events.filter(e=>individual.has(e.type))].sort((a,b)=>b.createdAt-a.createdAt);}
export function chaseNext(item:{stage:string;route?:string;chase?:{active:boolean};demo?:{now:string;phase:string};flightPlan?:any},draft:{status:string;company?:string}|null,call:{status:string;mode:'live'|'simulated';company:string}|null,company:string,usedToday:boolean){
 if(item.stage.startsWith('CLOSED'))return 'The chase is closed.';
 if(item.flightPlan?.nextStep==='FLIGHT_status')return 'Waiting until the due date. You can send the optional status mail yourself below; Genie will not send it.';
 if(!item.chase?.active)return 'Genie is stopped. You can keep sending from your own Gmail.';
 if(call?.status==='queued'||call?.status==='reserved')return callingCopy.nextCall(callLabel(call.mode),call.company);
 if(item.stage==='TRIAGING')return 'Genie is on it. Next: read their reply and choose the next step.';
 if(item.route==='TRACE')return `Genie is on it. Next: check your bank${item.flightPlan?.checkDate?` on ${displayDate(item.flightPlan.checkDate)}`:''}.`;
 if(item.demo?.phase.startsWith('waiting')||['ACTED','WAITING'].includes(item.stage))return `Genie is on it. Next: watch for ${company}'s reply.`;
 if(item.route==='NEED_INFO')return 'Genie is on it. Next: confirm the missing case detail below.';
 if(draft&&draft.status!=='sent')return `Genie is on it. Next: mail ${draft.company??company}${usedToday?` on ${displayDate(addDays(todayIST(),1))}`:' today'}.`;
 return `Genie is on it. Next: check in${item.flightPlan?.checkDate?` on ${displayDate(item.flightPlan.checkDate)}`:''}.`;
}
