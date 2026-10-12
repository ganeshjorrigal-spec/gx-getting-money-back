import {refundRuleUrl} from './flight-kb';
import {displayDate,daysBetween} from './dates';

import {flightWorkingDelay,type FlightPlan} from './flight';

export function flightStatus(plan:FlightPlan,today:string){

 const pastDue=plan.pastDue??(!!plan.dueDate&&plan.dueDate<today);

 const delayUnit=(['F01','F02','F22','user_choice'].includes(plan.dueSource)||(plan.dueSource==='message_promise'&&!/working/i.test(plan.dueSourceText)))||(plan.dueSource==='estimate'&&plan.moneyWith!==plan.owner&&plan.ruleId==='F03')?'days':'working days';

 const delay=pastDue&&plan.dueDate?(delayUnit==='days'?Math.max(0,daysBetween(plan.dueDate,today)):flightWorkingDelay(plan.dueDate,today)):0;

 const label=plan.route==='OUT_OF_SCOPE'?'Outside this flow':plan.route==='TRACE'?'Left them, not with you yet':plan.route==='WAIT'?`Waiting, due ${plan.dueDate?displayDate(plan.dueDate):'date not set'}`:plan.route==='NO_ROUTE'?'The other side is right':!pastDue?'Follow-up ready':`Overdue by ${delay} ${delayUnit}`;

 return {pastDue,label,delay,delayUnit};

}


export function flightDateSource(plan:FlightPlan,company:string,site:string,replyDate?:string){
 if(plan.dueSource==='user_choice')return {text:'Your chosen reminder; not an official refund deadline',href:null};
 if(plan.dueSource==='message_promise')return {text:`From ${company}'s reply${replyDate?` of ${displayDate(replyDate)}`:''}`,href:null};
 if(plan.dueSource==='estimate')return {text:"Refund Genie's expectation; not a DGCA rule or published company deadline",href:null};
 if(!plan.ruleId)return {text:plan.dueSourceText||"Refund Genie's reading; no official deadline held",href:null};
 if(plan.dueSource==='F22')return {text:`${site}'s refund terms, Refund Genie's reading`,href:site==='Goibibo'?'https://www.goibibo.com/info/user-agreement/':'https://www.makemytrip.com/legal/in/eng/user_agreement.html'};
 return {text:`DGCA refund rule${plan.dueSource==='F01'?', paragraph 3(a)':plan.dueSource==='F02'?', paragraph 3(b)':', paragraph 3(c)'}`,href:refundRuleUrl};
}
