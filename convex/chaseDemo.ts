import {demoIntakeFacts,demoSamples,demoSampleFields} from '../lib/demo-intake';
import {saveDemoIntake} from './lib/demo_intake';
import {hashToken} from './lib/access';
import {mutation,internalMutation,internalQuery,query} from './_generated/server';
import {v} from 'convex/values';
import {internal} from './_generated/api';
import {assertAccess} from './lib/access';
import {takeRate} from './lib/rate';
import {sampleFlight} from '../lib/flight-sample';
import {publicDemoPlan} from '../lib/public-demo-plan';
import {planFlight} from '../lib/flight';
import {todayIST,addDays} from '../lib/dates';
import {nextOffice,officeHours} from '../lib/calls';
import {finishMail} from '../lib/mail-copy';
import {chaseRows} from '../lib/chase-view';
const access={code:v.string(),token:v.string()};
export const create=mutation({args:{tokenHash:v.string(),deviceId:v.string()},returns:v.object({code:v.string()}),handler:async(ctx,args)=>{
 if(!/^[a-f0-9]{64}$/.test(args.tokenHash)||!/^[A-Za-z0-9_-]{12,100}$/.test(args.deviceId))throw new Error('Invalid case key');
 const connection=await ctx.db.query('googleConnections').withIndex('by_kind',q=>q.eq('kind','inbox')).first();
 if(!connection?.chaseSendGranted||!process.env.TICKBACK_DEMO_ADDRESS||!await ctx.db.query('googleConnections').withIndex('by_kind',q=>q.eq('kind','demo')).first())throw new Error('The demo desk is not connected yet');
 await takeRate(ctx,`demo:${args.deviceId}`,5,3600000);await takeRate(ctx,'demo:global',200,86400000);
 let code='';for(let i=0;i<5;i++){code=`RG-${crypto.randomUUID().replaceAll('-','').slice(0,6).toUpperCase()}`;if(!await ctx.db.query('cases').withIndex('by_code',q=>q.eq('code',code)).first())break;if(i===4)throw new Error('Please try again');}
 const now=Date.now(),day=todayIST(),facts=demoIntakeFacts(day),plan=publicDemoPlan(planFlight(facts,day,{},process.env.TICKBACK_DEMO_ADDRESS));

 const caseId=await ctx.db.insert('cases',{code,deviceHash:await hashToken(args.deviceId),tokenHash:args.tokenHash,refundType:'flight',stage:'NEED_INFO',route:plan.route,questions:plan.questions,ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:now,updatedAt:now,facts,flightPlan:plan,owner:plan.owner,moneyWith:plan.moneyWith,demo:{kind:'flight',chaseStory:true,intakeRequired:true,emailRequired:true,chasePhase:'authority',round:0,phase:'ready',now:day,expiresAt:now+7*86400000}});
 await ctx.db.insert('inputs',{caseId,kind:'initial',text:`Made-up domestic flight, Demo Air via DemoTrips. Airline cancellation; date supplied in intake. Made-up booking details will be supplied in intake. Full refund not received.`,storageIds:[],createdAt:now});
 await ctx.db.insert('caseEvents',{caseId,type:'created',summary:'Demo started. No real booking, company or money.',actor:'user',createdAt:now});
 await ctx.scheduler.runAt(now+7*86400000,internal.demo.expire,{caseId});await ctx.scheduler.runAfter(0,internal.responsesActions.syncCase,{caseId});return {code};
}});
export const authorised=internalMutation({args:access,returns:v.null(),handler:async(ctx,args)=>{const item=await assertAccess(ctx,args.code,args.token);if(!item.demo?.chaseStory||!item.chase?.active)throw new Error('Use the public flight demo');
 let demoNow=item.demo.now;
 if(item.demo.intakeRequired&&item.flightPlan?.route==='WAIT'&&item.flightPlan.dueDate){
  demoNow=addDays(item.flightPlan.dueDate,1);const plan=publicDemoPlan(planFlight(item.facts,demoNow,{},process.env.TICKBACK_DEMO_ADDRESS));
  if(!plan.body||!plan.to)throw new Error('Demo mail could not be prepared');
  await ctx.db.patch(item._id,{flightPlan:plan,route:plan.route,stage:'READY'});
  await ctx.db.insert('drafts',{caseId:item._id,company:plan.nextPerson?.company,recipientRole:plan.nextPerson?.role,rung:plan.rung,step:plan.nextStep,channel:'email',to:plan.to,cc:plan.cc,subject:`Demo: Flight refund chase [${item.code}]`,body:finishMail(plan.body,item.code,[],item.name),attachChecklist:[],status:'ready',createdAt:Date.now()});
  await ctx.db.insert('caseEvents',{caseId:item._id,type:'demo_skip',summary:'Demo clock moved past the refund due date before the first mail',actor:'user',createdAt:Date.now()});
 }
 await ctx.db.patch(item._id,{chase:{...item.chase,callsAuthorisedAt:Date.now()},demo:{...item.demo,now:demoNow,chasePhase:'first_mail'}});await ctx.db.insert('caseEvents',{caseId:item._id,type:'call_authorised',summary:'Sample permission saved for simulated calls only. No visitor phone is used.',actor:'user',createdAt:Date.now()});await ctx.scheduler.runAfter(0,internal.chaseActions.send,{caseId:item._id});return null;}});
export const advance=mutation({args:access,returns:v.null(),handler:async(ctx,args)=>{
 const item=await assertAccess(ctx,args.code,args.token);if(!item.demo?.chaseStory||!item.chase?.active||item.stage.startsWith('CLOSED'))throw new Error('Use an active demo chase');
 if(item.demo.chasePhase==='ready_call'){
  const ahead=Date.parse(`${addDays(item.demo.now,10)}T11:00:00+05:30`),day=todayIST(new Date(officeHours(ahead)?ahead:nextOffice(ahead)));
  await ctx.db.patch(item._id,{demo:{...item.demo,now:day,chasePhase:'call'}});await ctx.db.insert('caseEvents',{caseId:item._id,type:'demo_skip',summary:'Demo clock moved ahead 10 days to the next office session. Simulated care call next.',actor:'user',createdAt:Date.now()});await ctx.scheduler.runAfter(0,internal.callActions.run,{caseId:item._id,fixture:'reference'});
 }else if(item.demo.chasePhase==='confirm_ready'){
  await ctx.db.patch(item._id,{demo:{...item.demo,chasePhase:'confirm_mail'}});await ctx.scheduler.runAfter(0,internal.chaseActions.send,{caseId:item._id});
 }else if(item.demo.chasePhase==='bank'&&item.route==='TRACE'&&item.dueDate){await ctx.db.patch(item._id,{demo:{...item.demo,now:item.dueDate},stage:'DUE'});await ctx.db.insert('caseEvents',{caseId:item._id,type:'demo_skip',summary:'Demo clock moved to the bank check date',actor:'user',createdAt:Date.now()});
 }else throw new Error('Wait for the current step to finish');return null;
}});
export const view=query({args:access,returns:v.any(),handler:async(ctx,args)=>{const item=await assertAccess(ctx,args.code,args.token);if(!item.demo?.chaseStory)return null;const events=await ctx.db.query('caseEvents').withIndex('by_case',q=>q.eq('caseId',item._id)).order('desc').take(60),calls=await ctx.db.query('calls').withIndex('by_case',q=>q.eq('caseId',item._id)).order('desc').take(3),mails=await ctx.db.query('chaseOutbox').withIndex('by_case',q=>q.eq('caseId',item._id)).take(10),replies=await ctx.db.query('inputs').withIndex('by_case',q=>q.eq('caseId',item._id)).order('desc').take(10);return {events:chaseRows(events.map(e=>e.type==='draft_written'&&/^Prepared FLIGHT_(?!bank)/.test(e.summary)?{...e,summary:'Mail draft ready'}:e),item.flightPlan?.nextPerson?.company??'DemoTrips'),calls,replies:replies.filter(r=>r.kind==='reply').map(r=>({text:r.text,summary:r.summary,at:r.receivedAt??r.createdAt})),mails:mails.filter(m=>m.state==='sent').length,simulatedCalls:calls.filter(c=>c.mode==='simulated'&&c.status==='completed').length,realCalls:calls.filter(c=>c.mode==='live').length};}});
// Admin-selected role-play recording only, never an arbitrary live recording.
export const recording=internalQuery({args:{},returns:v.any(),handler:async(ctx)=>{const rows=await ctx.db.query('calls').withIndex('by_recording_kind',q=>q.eq('recordingKind','roleplay')).order('desc').take(10);const call=rows.find(c=>c.mode==='simulated'&&c.status==='completed'&&!c.patchIn&&c.recordingUrl&&c.roleplayTranscript&&c.readerOutput?.reply?.reference);return call?{url:call.recordingUrl,transcript:call.roleplayTranscript}:null;}});

export const fillSamples=mutation({args:{...access,field:v.optional(v.union(v.literal('pnr'),v.literal('bookingId'),v.literal('cancellationDate'),v.literal('amountPaid'),v.literal('flightName'),v.literal('routeFrom'),v.literal('routeTo'),v.literal('nameOnTicket'),v.literal('bookingMobile'),v.literal('bookingEmail')))},returns:v.null(),handler:async(ctx,args)=>{
 const item=await assertAccess(ctx,args.code,args.token);if(!item.demo?.intakeRequired||!item.demo.emailConfirmedAt||item.factsConfirmedAt||item.chase)throw new Error('Use a new confirmed demo intake');
 const samples=demoSamples(item.demo.now),facts={...item.facts};for(const field of args.field?[args.field]:demoSampleFields)facts[field]=samples[field];await saveDemoIntake(ctx,item,facts);return null;
}});

export const changeEmail=mutation({args:access,returns:v.null(),handler:async(ctx,args)=>{const item=await assertAccess(ctx,args.code,args.token);if(!item.demo?.intakeRequired||item.chase||item.factsConfirmedAt)throw new Error('Use a new demo intake');await ctx.db.patch(item._id,{email:undefined,demo:{...item.demo,emailConfirmedAt:undefined}});return null;}});
