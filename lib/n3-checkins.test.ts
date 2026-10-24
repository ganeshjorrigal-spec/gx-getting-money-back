/// <reference types="vite/client" />
import {afterEach,expect,it,vi} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {internal} from '../convex/_generated/api';
import {sampleFlight} from './flight-sample';
import {planFlight} from './flight';
import {api} from '../convex/_generated/api';
import {hashToken} from '../convex/lib/access';
import {dueCheckTime,dueCheckChoices} from './due-check';
const mail=vi.hoisted(()=>({accessToken:vi.fn().mockResolvedValue('synthetic'),googleJson:vi.fn().mockResolvedValue({id:'synthetic'})}));
vi.mock('../convex/googleActions',async original=>({...await original<Record<string,unknown>>(),...mail}));
vi.mock('../lib/token-crypto',()=>({decryptToken:vi.fn().mockResolvedValue('n'.repeat(43))}));
const modules=import.meta.glob('../convex/**/*.ts');
afterEach(()=>{vi.clearAllTimers();vi.useRealTimers();vi.unstubAllEnvs();vi.clearAllMocks();});
it.each([false,true])('WAIT due check cannot loop or advance the ladder, handed over=%s',async handedOver=>{
 vi.useFakeTimers();vi.setSystemTime(new Date('2026-10-25T04:30:00Z'));
 const t=convexTest(schema,modules),read=sampleFlight();
 read.reply={...read.reply,claim:'under_review',fromCompany:'MakeMyTrip',promisedDate:'2026-10-24',summary:'Sample refund under review.'};
 const plan=planFlight(read,'2026-10-25',{rung:2});expect(plan.route).toBe('WAIT');
 const ids=await t.run(async ctx=>{
  const letterId=await ctx.storage.store(new Blob(['synthetic authority']));
  const caseId=await ctx.db.insert('cases',{code:'RG-N30001',tokenHash:'synthetic',email:'passenger@example.invalid',confirmedCaseEmail:'passenger@example.invalid',emailConfirmedAt:1,confirmedEncryptedCaseToken:'synthetic',factsConfirmedAt:1,stage:'WAITING',route:'WAIT',refundType:'flight',facts:read,flightPlan:plan,dueDate:plan.dueDate??undefined,ladderLevel:2,draftsShown:0,tier:'free_check',paidState:'none',createdAt:1,updatedAt:1,...(handedOver?{chase:{active:true,name:'Sample Passenger',mobile:'',email:'passenger@example.invalid',authorisedAt:1,letterId,encryptedCaseToken:'synthetic'}}:{})});
  const checkinId=await ctx.db.insert('checkins',{caseId,date:'2026-10-24',reason:'flight_refund',status:'scheduled'});return {caseId,checkinId};
 });
 await t.mutation(internal.checkins.fire,{checkinId:ids.checkinId});
 const jobs=await t.run(ctx=>ctx.db.system.query('_scheduled_functions').collect());
 // Follow only the scheduled planner path; never execute external mail/calendar jobs.
 if(jobs.some(j=>j.name==='chase:advance')){
  await t.mutation(internal.chase.advance,{caseId:ids.caseId});
  const item=await t.run(ctx=>ctx.db.get(ids.caseId));
  await t.action(internal.flightAgent.triage,{caseId:ids.caseId,runId:item!.latestRunId!,reuseFacts:true});
 }
 const result=await t.run(async ctx=>({item:await ctx.db.get(ids.caseId),checks:await ctx.db.query('checkins').withIndex('by_case',q=>q.eq('caseId',ids.caseId)).take(20),jobs:await ctx.db.system.query('_scheduled_functions').collect()}));
 const immediate=result.checks.filter(c=>c.status==='scheduled').flatMap(c=>result.jobs.filter(j=>j._id===c.scheduledId&&j.scheduledTime<=Date.now()));
 expect.soft(result.item!.ladderLevel).toBe(2);
 expect.soft(immediate).toHaveLength(0);
});

async function dueFixture(handedOver:boolean){
 vi.useFakeTimers();vi.setSystemTime(new Date('2026-10-25T04:29:59Z'));
 vi.stubEnv('PUBLIC_APP_URL','https://test.example.invalid');vi.stubEnv('TICKBACK_INBOX_ADDRESS','inbox@example.invalid');vi.stubEnv('CHASE_ALLOWLIST','desk@example.invalid');vi.stubEnv('CHASE_REAL_COMPANIES_ENABLED','false');
 const t=convexTest(schema,modules),token='n'.repeat(43);
 const ids=await t.run(async ctx=>{
  const letterId=await ctx.storage.store(new Blob(['synthetic authority']));
  await ctx.db.insert('googleConnections',{kind:'inbox',email:'inbox@example.invalid',chaseSendGranted:true,encryptedRefreshToken:'synthetic',connectedAt:1});
  const caseId=await ctx.db.insert('cases',{code:'RG-N30002',tokenHash:await hashToken(token),email:'passenger@example.invalid',confirmedCaseEmail:'passenger@example.invalid',emailConfirmedAt:1,confirmedEncryptedCaseToken:'synthetic',factsConfirmedAt:1,stage:'WAITING',route:'WAIT',refundType:'flight',facts:sampleFlight(),flightPlan:{nextStep:'FLIGHT_status',checkDate:'2026-10-24',dueDate:'2026-10-24'},dueDate:'2026-10-24',amountPaise:540000,ladderLevel:2,draftsShown:0,tier:'free_check',paidState:'none',createdAt:1,updatedAt:1,...(handedOver?{chase:{active:true,name:'Sample Passenger',mobile:'',email:'passenger@example.invalid',authorisedAt:1,letterId,encryptedCaseToken:'synthetic'}}:{})});
  const checkinId=await ctx.db.insert('checkins',{caseId,date:'2026-10-24',reason:'flight_refund',status:'scheduled'});return {caseId,checkinId};
 });return {t,...ids,args:{code:'RG-N30002',token}};
}
it.each([false,true])('10am next-day check sends one passenger mail without raising a rung, handed over=%s',async handedOver=>{
 const f=await dueFixture(handedOver);
 await f.t.mutation(internal.checkins.fire,{checkinId:f.checkinId});
 let jobs=await f.t.run(ctx=>ctx.db.system.query('_scheduled_functions').collect());
 expect(jobs.some(j=>j.name==='chaseActions:notify')).toBe(false);
 expect(jobs.some(j=>j.name==='checkins:fire'&&j.scheduledTime===Date.parse('2026-10-25T04:30:00Z'))).toBe(true);
 vi.setSystemTime(new Date('2026-10-25T04:30:00Z'));
 await f.t.mutation(internal.checkins.fire,{checkinId:f.checkinId});await f.t.mutation(internal.checkins.fire,{checkinId:f.checkinId});
 const duplicate=await f.t.run(ctx=>ctx.db.insert('checkins',{caseId:f.caseId,date:'2026-10-24',reason:'flight_refund',status:'scheduled'}));await f.t.mutation(internal.checkins.fire,{checkinId:duplicate});
 jobs=await f.t.run(ctx=>ctx.db.system.query('_scheduled_functions').collect());
 const notices=jobs.filter(j=>j.name==='chaseActions:notify');expect(notices).toHaveLength(1);
 expect(jobs.some(j=>['chase:advance','flightAgent:triage','chaseActions:send'].includes(j.name))).toBe(false);
 for(let i=0;i<2;i++)await f.t.action(internal.chaseActions.notify,notices[0].args[0] as any);
 expect(mail.googleJson).toHaveBeenCalledTimes(1);
 const raw=Buffer.from(JSON.parse((mail.googleJson.mock.calls[0] as any)[2].body).raw,'base64url').toString();
 expect(raw).toContain('To: passenger@example.invalid');expect(raw).toMatch(/Cc: *\r\n/);
 const body=Buffer.from(raw.split('Content-Transfer-Encoding: base64\r\n\r\n')[1].split('\r\n')[0],'base64').toString();
 expect(body).toContain('It came: https://');expect(body).toContain('Not yet, chase it: https://');expect(body).toContain('checkin=landed');expect(body).toContain('checkin=not_yet');expect(body).toContain('due=2026-10-24');expect(body).toContain('#k=');expect(body).toMatch(/Next: Genie .+2026\.$/);
 const item=await f.t.run(ctx=>ctx.db.get(f.caseId));expect(item!.stage).toBe('DUE');expect(item!.ladderLevel).toBe(2);
});
it('It came closes the case with today and the recovered amount; duplicate clicks do nothing',async()=>{
 const f=await dueFixture(false);vi.setSystemTime(new Date('2026-10-25T04:30:00Z'));await f.t.mutation(internal.checkins.fire,{checkinId:f.checkinId});
 await f.t.mutation(api.cases.answerCheckin,{...f.args,answer:'landed',checkinDate:'2026-10-24'});await f.t.mutation(api.cases.answerCheckin,{...f.args,answer:'landed',checkinDate:'2026-10-24'});
 const item=await f.t.run(ctx=>ctx.db.get(f.caseId));expect(item!.stage).toBe('CLOSED_LANDED');expect(item!.recoveredPaise).toBe(540000);expect(item!.closedAt).toBe(Date.now());
});
it('Not yet only starts planning after the explicit answer and is idempotent',async()=>{
 const f=await dueFixture(true);vi.setSystemTime(new Date('2026-10-25T04:30:00Z'));await f.t.mutation(internal.checkins.fire,{checkinId:f.checkinId});
 await f.t.mutation(api.cases.answerCheckin,{...f.args,answer:'not_yet',checkinDate:'2026-10-24'});await f.t.mutation(api.cases.answerCheckin,{...f.args,answer:'not_yet',checkinDate:'2026-10-24'});
 const jobs=await f.t.run(ctx=>ctx.db.system.query('_scheduled_functions').collect());expect(jobs.filter(j=>j.name==='flightAgent:triage')).toHaveLength(1);
 const item=await f.t.run(ctx=>ctx.db.get(f.caseId));expect(item!.ladderLevel).toBe(2);expect(item!.stage).toBe('TRIAGING');
});
it('early or stale check-in answers cannot change a case',async()=>{
 const f=await dueFixture(false);await expect(f.t.mutation(api.cases.answerCheckin,{...f.args,answer:'landed',checkinDate:'2026-10-24'})).rejects.toThrow('no longer waiting');
 expect((await f.t.run(ctx=>ctx.db.get(f.caseId)))!.stage).toBe('WAITING');
});
it('links keep the private token and date; the deadline is exactly next day at 10 IST',()=>{
 expect(dueCheckTime('2026-10-24')).toBe(Date.parse('2026-10-25T10:00:00+05:30'));
 expect(dueCheckChoices('https://test.example.invalid/c/index.html?code=RG-N30002#k=synthetic','2026-10-24')).toContain('due=2026-10-24#k=synthetic');
});
it('re-reading the same WAIT facts preserves the unanswered check without scheduling it again',async()=>{
 const f=await dueFixture(false);vi.setSystemTime(new Date('2026-10-25T04:30:00Z'));await f.t.mutation(internal.checkins.fire,{checkinId:f.checkinId});
 const read=sampleFlight();read.reply={...read.reply,claim:'under_review',fromCompany:'MakeMyTrip',promisedDate:'2026-10-24'};
 const plan=planFlight(read,'2026-10-25',{rung:2});await f.t.run(ctx=>ctx.db.patch(f.caseId,{latestRunId:'synthetic-rerun'}));
 await f.t.mutation(internal.flights.apply,{caseId:f.caseId,runId:'synthetic-rerun',read,plan,model:'code',latencyMs:0,inputTokens:0,outputTokens:0,totalTokens:0});
 const result=await f.t.run(async ctx=>({item:await ctx.db.get(f.caseId),checks:await ctx.db.query('checkins').withIndex('by_case',q=>q.eq('caseId',f.caseId)).take(20)}));
 expect(result.item!.stage).toBe('DUE');expect(result.checks.filter(c=>c.status==='scheduled')).toHaveLength(0);expect(result.item!.ladderLevel).toBe(2);
});
it('a newer waiting deadline prevents the old mail and old answer from changing the case',async()=>{
 const f=await dueFixture(false);vi.setSystemTime(new Date('2026-10-25T04:30:00Z'));await f.t.mutation(internal.checkins.fire,{checkinId:f.checkinId});
 const jobs=await f.t.run(ctx=>ctx.db.system.query('_scheduled_functions').collect());const notice=jobs.find(j=>j.name==='chaseActions:notify')!;
 await f.t.run(ctx=>ctx.db.patch(f.caseId,{flightPlan:{checkDate:'2026-10-30'}}));
 await f.t.action(internal.chaseActions.notify,notice.args[0] as any);expect(mail.googleJson).not.toHaveBeenCalled();
 await expect(f.t.mutation(api.cases.answerCheckin,{...f.args,answer:'landed',checkinDate:'2026-10-24'})).rejects.toThrow('no longer waiting');
});
