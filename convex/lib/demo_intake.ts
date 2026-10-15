import type {MutationCtx} from '../_generated/server';
import type {Doc} from '../_generated/dataModel';
import {planFlight,type FlightRead} from '../../lib/flight';
import {publicDemoPlan} from '../../lib/public-demo-plan';
import {finishMail} from '../../lib/mail-copy';
// Intake computes the same planner without sending or starting background work.
export async function saveDemoIntake(ctx:MutationCtx,item:Doc<'cases'>,facts:FlightRead){
 if(!item.demo?.chaseStory||!item.demo.intakeRequired||item.chase)throw new Error('Use a new demo intake');
 const plan=publicDemoPlan(planFlight(facts,item.demo.now,{},process.env.TICKBACK_DEMO_ADDRESS));
 await ctx.db.patch(item._id,{facts,flightPlan:plan,owner:plan.owner,moneyWith:plan.moneyWith,route:plan.route,questions:plan.questions,nextStep:plan.nextStep,dueDate:plan.dueDate??undefined,dueSource:plan.dueSource,dueSourceText:plan.dueSourceText,amountPaise:facts.amountPaid===null?undefined:Math.round(facts.amountPaid*100),eventName:facts.flightName??undefined,stage:plan.route==='NEED_INFO'?'NEED_INFO':plan.route==='WAIT'?'WAITING':'READY',updatedAt:Date.now()});
 const current=await ctx.db.get(item._id);
 if(current?.factsConfirmedAt&&plan.body&&plan.to){
  await ctx.db.insert('drafts',{caseId:item._id,company:plan.nextPerson?.company,recipientRole:plan.nextPerson?.role,rung:plan.rung,step:plan.nextStep,channel:'email',to:plan.to,cc:plan.cc,subject:`Demo: Flight refund chase [${item.code}]`,body:finishMail(plan.body,item.code,[],current.name),attachChecklist:[],status:'ready',createdAt:Date.now()});
 }
 return plan;
}
