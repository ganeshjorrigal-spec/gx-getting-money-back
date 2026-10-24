import {addWorkingDays,displayDate,todayIST} from './dates';
type UpdateCase={route?:string;dueDate?:string;flightPlan?:any;chase?:{active:boolean}};
export function nextCaseUpdate(item:UpdateCase,now=Date.now()){
 const today=todayIST(new Date(now)),latest=addWorkingDays(today,5);
 const planned=[item.flightPlan?.checkDate,item.dueDate].filter((d):d is string=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)&&d>=today&&d<=latest).sort()[0];
 const action=item.route==='TRACE'?'Genie will review this case and remind you to check your bank':item.chase?.active?'Genie will check for a reply and keep the next follow-up ready':'Genie will review this case and remind you of the next step';
 return {action,when:planned??latest};
}
export function updateMailBody(details:{what:string;reply?:string;next?:string;url:string;item:UpdateCase;now?:number}){
 const next=nextCaseUpdate(details.item,details.now);
 return [details.what,details.reply?`Their reply: ${details.reply}`:'',details.next?`Your next step: ${details.next}`:'',`Your case: ${details.url}`,details.item.chase?'You can stop Genie from your case screen.':'Open your case to review the next step.',`Next: ${next.action} by ${displayDate(next.when)}.`].filter(Boolean).join('\n\n');
}
