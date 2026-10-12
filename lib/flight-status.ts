import {displayDate} from './dates';
import {flightWorkingDelay,type FlightPlan} from './flight';
export function flightStatus(plan:FlightPlan,today:string){
 const pastDue=plan.pastDue??(!!plan.dueDate&&plan.dueDate<today);
 const label=plan.route==='OUT_OF_SCOPE'?'Outside this flow':plan.route==='TRACE'?'Left them, not with you yet':plan.route==='WAIT'?`Waiting, due ${plan.dueDate?displayDate(plan.dueDate):'date not set'}`:plan.route==='NO_ROUTE'?'The other side is right':!pastDue?'Follow-up ready':plan.dueSource==='estimate'?'Time to check':`Overdue by about ${flightWorkingDelay(plan.dueDate,today)} working days`;
 return {pastDue,label};
}
