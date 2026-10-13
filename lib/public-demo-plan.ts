import type {FlightPlan} from './flight';
// Only the public automatic story has this support desk. Legacy user-send demos
// and real cases keep their officer playbook and escalation guard unchanged.
export function publicDemoPlan(plan:FlightPlan):FlightPlan {
 if(plan.channel!=='email'||plan.rung>=3||plan.nextPerson?.label!=='DEMO')return plan;
 const company=plan.nextPerson.company;
 return {...plan,nextPerson:{...plan.nextPerson,role:'Customer care',value:`${company} customer care (demo)`},body:plan.body?.replace(/^Dear [^\n]+,/,`Dear ${company} customer care,`)??null};
}
