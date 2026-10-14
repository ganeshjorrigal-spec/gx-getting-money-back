/// <reference types="vite/client" />
import {it,expect,vi,afterEach} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {api,internal} from '../convex/_generated/api';
import {hashToken} from '../convex/lib/access';
import {sampleFlight} from './flight-sample';
import {planFlight} from './flight';
import {publicDemoPlan} from './public-demo-plan';
import {isPassengerEscalation} from './chase-escalation';
const modules=import.meta.glob('../convex/**/*.ts');
afterEach(()=>{vi.clearAllTimers();vi.useRealTimers();vi.unstubAllEnvs();});
async function created(){vi.useFakeTimers();vi.stubEnv('TICKBACK_DEMO_ADDRESS','refundgenie.fixture.desk@gmail.com');vi.stubEnv('CHASE_ALLOWLIST','refundgenie.fixture.desk@gmail.com,passenger@example.invalid');const t=convexTest(schema,modules);await t.run(async ctx=>{await ctx.db.insert('googleConnections',{kind:'inbox',chaseSendGranted:true,encryptedRefreshToken:'synthetic',connectedAt:1});await ctx.db.insert('googleConnections',{kind:'demo',encryptedRefreshToken:'synthetic',connectedAt:1});});const token='x'.repeat(43);const r=await t.mutation(api.chaseDemo.create,{tokenHash:await hashToken(token),deviceId:'synthetic-device-id'});let item=await t.run(ctx=>ctx.db.query('cases').withIndex('by_code',q=>q.eq('code',r.code)).unique());
 expect(item!.factsConfirmedAt).toBeUndefined();expect(item!.questions.map((q:any)=>q.id)).toEqual(['cancellationDate','amountPaid']);
 await t.run(ctx=>ctx.db.patch(item!._id,{email:'passenger@example.invalid',demo:{...item!.demo!,emailConfirmedAt:1}}));
 await t.mutation(api.chaseDemo.fillSamples,{code:r.code,token});await t.mutation(api.flights.answer,{code:r.code,token,id:'paymentMethod',value:'upi'});
 await t.mutation(api.flights.confirm,{code:r.code,token,pnr:'SAMPLE',bookingId:'DEMO-2400',name:'Fixture Passenger',flightName:'Delhi to Mumbai'});
 item=await t.run(ctx=>ctx.db.get(item!._id));const draft=await t.run(ctx=>ctx.db.query('drafts').withIndex('by_case',q=>q.eq('caseId',item!._id)).first());return{t,item:item!,draft:draft!,token};}
it('confirmed public demo prepares a genuine support role and a customer-care greeting',async()=>{const {item,draft}=await created();expect(item.flightPlan.nextPerson.role).toBe('Customer care');expect(draft.recipientRole).toBe('Customer care');expect(draft.body).toMatch(/^Dear DemoTrips customer care,/);expect(draft.body).not.toContain('Grievance Officer');});
it('public support draft passes reserve and final dispatch with the same saved allow-list',async()=>{const {t,item,draft}=await created();await t.run(async ctx=>{const letterId=await ctx.storage.store(new Blob(['synthetic authority']));await ctx.db.patch(item._id,{chase:{active:true,name:'Demo Passenger',mobile:'0000000000',email:'passenger@example.invalid',authorisedAt:1,letterId,encryptedCaseToken:'synthetic'},demo:{...item.demo!,emailConfirmedAt:1,chasePhase:'first_mail'},email:'passenger@example.invalid'});});const out=await t.mutation(internal.chase.reserve,{caseId:item._id,draftId:draft._id});expect(out).not.toBeNull();expect(await t.query(internal.chase.stillActive,{caseId:item._id,draftId:draft._id,authorisedAt:1})).toBe(true);});
it('reply planning in public demo keeps the airline customer-care next step',async()=>{const {t,item}=await created();const read={...item.facts,reply:{...item.facts.reply,claim:'waiting_airline',fromCompany:'DemoTrips',pointsAt:'Demo Air',summary:'Demo refund pending with Demo Air.'}};const plan=planFlight(read,item.demo!.now,{rung:2},'refundgenie.fixture.desk@gmail.com');await t.run(ctx=>ctx.db.patch(item._id,{latestRunId:'synthetic-run'}));await t.mutation(internal.flights.apply,{caseId:item._id,runId:'synthetic-run',read,plan,model:'code',latencyMs:0,inputTokens:0,outputTokens:0,totalTokens:0});const held=await t.run(ctx=>ctx.db.get(item._id));expect(held!.flightPlan.nextPerson.role).toBe('Customer care');expect(held!.flightPlan.nextPerson.company).toBe('Demo Air');});
it('existing self-send demo officer route remains unchanged',()=>{const facts={...sampleFlight(),airline:'Demo Air',bookedVia:'DemoTrips'};expect(planFlight(facts,'2026-10-13',{},'refundgenie.fixture.desk@gmail.com').nextPerson?.role).toBe('Grievance Officer');});

it('public story still sends officer/rung-three escalations only through the passenger',()=>{const facts={...sampleFlight(),airline:'Demo Air',bookedVia:'DemoTrips'};const officer=planFlight(facts,'2026-10-13',{rung:3},'refundgenie.fixture.desk@gmail.com');const same=publicDemoPlan(officer);expect(same).toBe(officer);expect(isPassengerEscalation({refundType:'flight',flightPlan:same},{channel:'email',to:same.to,recipientRole:same.nextPerson?.role,rung:same.rung})).toBe(true);});
it('public confirming mail keeps a support snapshot and passes the same dispatch guards',async()=>{const {t,item}=await created();await t.run(async ctx=>{const letterId=await ctx.storage.store(new Blob(['synthetic authority']));await ctx.db.patch(item._id,{chase:{active:true,name:'Demo Passenger',mobile:'0000000000',email:'passenger@example.invalid',authorisedAt:1,letterId,encryptedCaseToken:'synthetic'},demo:{...item.demo!,round:1,emailConfirmedAt:1,chasePhase:'call'},email:'passenger@example.invalid'});});const id=await t.run(ctx=>ctx.db.insert('calls',{caseId:item._id,mode:'simulated',label:'Simulated demo call',status:'completed',company:'Demo Air',day:item.demo!.now,startedAt:1,createdAt:1,durationSeconds:1,costUsd:0,reservedUsd:0,authorisedAt:1}));const draftId=await t.mutation(internal.calls.prepareConfirmation,{id});expect(draftId).not.toBeNull();const draft=await t.run(ctx=>ctx.db.get(draftId!));expect(draft!.recipientRole).toBe('Customer care');await t.run(ctx=>ctx.db.patch(item._id,{demo:{...item.demo!,round:1,emailConfirmedAt:1,chasePhase:'confirm_mail'},email:'passenger@example.invalid'}));expect(await t.mutation(internal.chase.reserve,{caseId:item._id,draftId:draftId!})).not.toBeNull();});

it('full public story crosses every backend gate to Money landed with transport held',async()=>{
 const {t,item,draft,token}=await created();vi.stubEnv('CALL_ALLOWLIST','+910000000001');vi.stubEnv('CALL_MODE','simulated');
 await t.run(async ctx=>{const letterId=await ctx.storage.store(new Blob(['synthetic permission']));await ctx.db.patch(item._id,{chase:{active:true,name:'Demo Passenger',mobile:'0000000000',email:'passenger@example.invalid',authorisedAt:1,letterId,encryptedCaseToken:'synthetic'},email:'passenger@example.invalid',demo:{...item.demo!,emailConfirmedAt:1}});});
 await t.mutation(internal.chaseDemo.authorised,{code:item.code,token});
 expect(await t.mutation(internal.chase.reserve,{caseId:item._id,draftId:draft._id})).not.toBeNull();
 const applyReply=async(round:number,read:any)=>{const runId='synthetic-round-'+round;await t.run(async ctx=>{const held=await ctx.db.get(item._id);await ctx.db.patch(item._id,{latestRunId:runId,demo:{...held!.demo!,round,phase:'ready'}});await ctx.db.insert('inputs',{caseId:item._id,kind:'reply',text:'Made-up demo desk reply',storageIds:[],runId,createdAt:Date.now()});});await t.mutation(internal.flights.apply,{caseId:item._id,runId,read,plan:planFlight(read,item.demo!.now,{},'refundgenie.fixture.desk@gmail.com'),model:'fixture',latencyMs:0,inputTokens:0,outputTokens:0,totalTokens:0});};
 await applyReply(1,{...item.facts,reply:{...item.facts.reply,claim:'waiting_airline',fromCompany:'DemoTrips',pointsAt:'Demo Air',summary:'Pending with Demo Air.'}});
 expect((await t.run(ctx=>ctx.db.get(item._id)))!.demo!.chasePhase).toBe('ready_call');
 await t.mutation(api.chaseDemo.advance,{code:item.code,token});
 const reserved=await t.mutation(internal.calls.reserve,{caseId:item._id,fixture:'reference'});expect(reserved!.mode).toBe('simulated');
 await t.run(ctx=>ctx.db.patch(reserved!.callId,{status:'completed'}));
 const confirmation=await t.mutation(internal.calls.prepareConfirmation,{id:reserved!.callId});
 await t.mutation(api.chaseDemo.advance,{code:item.code,token});
 expect(await t.mutation(internal.chase.reserve,{caseId:item._id,draftId:confirmation!})).not.toBeNull();
 await applyReply(2,{...item.facts,reply:{...item.facts.reply,claim:'processed_reference',fromCompany:'Demo Air',pointsAt:'passenger',reference:'DEMO-REF',paidDate:'2026-10-13',promisedDate:'2026-10-16',summary:'Processed to original payment method.'}});
 expect((await t.run(ctx=>ctx.db.get(item._id)))!.demo!.chasePhase).toBe('bank');
 await t.mutation(api.chaseDemo.advance,{code:item.code,token});
 await t.mutation(api.cases.answerCheckin,{code:item.code,token,answer:'landed',amountPaise:540000});
 expect((await t.run(ctx=>ctx.db.get(item._id)))!.stage).toBe('CLOSED_LANDED');
});
