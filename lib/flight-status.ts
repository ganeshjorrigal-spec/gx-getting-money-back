import {displayDate,daysBetween} from './dates';
import {flightWorkingDelay,type FlightPlan} from './flight';
export function flightStatus(plan:FlightPlan,today:string){
 const pastDue=plan.pastDue??(!!plan.dueDate&&plan.dueDate<today);
 const delayUnit=['F01','F02','F22','message_promise','user_choice'].includes(plan.dueSource)||(plan.dueSource==='estimate'&&plan.moneyWith!==plan.owner&&plan.ruleId==='F03')?'days':'working days';
 const delay=pastDue&&plan.dueDate?(delayUnit==='days'?Math.max(0,daysBetween(plan.dueDate,today)):flightWorkingDelay(plan.dueDate,today)):0;
 const label=plan.route==='OUT_OF_SCOPE'?'Outside this flow':plan.route==='TRACE'?'Left them, not with you yet':plan.route==='WAIT'?`Waiting, due ${plan.dueDate?displayDate(plan.dueDate):'date not set'}`:plan.route==='NO_ROUTE'?'The other side is right':!pastDue?'Follow-up ready':`Overdue by ${delay} ${delayUnit}`;
 return {pastDue,label,delay,delayUnit};
}
