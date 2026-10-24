/// <reference types="vite/client" />
import {afterEach,beforeEach,expect,it,vi} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {api,internal} from '../convex/_generated/api';
import {hashToken} from '../convex/lib/access';
import {sampleFlight} from './flight-sample';
import {planFlight} from './flight';
const modules=import.meta.glob('../convex/**/*.ts'),token='n'.repeat(43),code='RG-N20001';
const mail=vi.hoisted(()=>({accessToken:vi.fn().mockResolvedValue('synthetic'),googleJson:vi.fn().mockResolvedValue({id:'synthetic-mail'})}));
vi.mock('../convex/googleActions',async original=>({...await original<Record<string,unknown>>(),...mail}));
vi.mock('../lib/token-crypto',()=>({decryptToken:vi.fn().mockResolvedValue('n'.repeat(43))}));
beforeEach(()=>{vi.useFakeTimers();vi.setSystemTime(new Date('2026-10-26T10:00:00+05:30'));vi.stubEnv('PUBLIC_APP_URL','https://test.example.invalid');vi.stubEnv('TICKBACK_INBOX_ADDRESS','inbox@example.invalid');vi.stubEnv('CHASE_ALLOWLIST','desk@example.invalid');vi.stubEnv('CHASE_REAL_COMPANIES_ENABLED','false');});
afterEach(()=>{vi.useRealTimers();vi.unstubAllEnvs();vi.clearAllMocks();});
async function fixture(handedOver=true){const t=convexTest(schema,modules);const caseId=await t.run(async ctx=>{
 const letterId=await ctx.storage.store(new Blob(['synthetic authority']));await ctx.db.insert('googleConnections',{kind:'inbox',email:'inbox@example.invalid',chaseSendGranted:true,encryptedRefreshToken:'synthetic',connectedAt:1});
 return ctx.db.insert('cases',{code,tokenHash:await hashToken(token),stage:'READY',refundType:'flight',email:'passenger@example.invalid',confirmedCaseEmail:'passenger@example.invalid',emailConfirmedAt:1,confirmedEncryptedCaseToken:'synthetic',factsConfirmedAt:1,facts:sampleFlight(),ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:Date.now(),updatedAt:Date.now(),...(handedOver?{chase:{active:true,email:'passenger@example.invalid',name:'Sample Passenger',mobile:'',authorisedAt:1,letterId,encryptedCaseToken:'synthetic'}}:{})} as any);
 });return {t,caseId};}
function delivered(){const raw=Buffer.from(JSON.parse((mail.googleJson.mock.calls[0] as any)[2].body).raw,'base64url').toString();const start=raw.indexOf('Content-Transfer-Encoding: base64\r\n\r\n')+'Content-Transfer-Encoding: base64\r\n\r\n'.length;return {raw,body:Buffer.from(raw.slice(start).split('\r\n')[0],'base64').toString()};}
it.each([true,false])('a pasted airline-paid-site reply sends exactly one update outside the list, handed over=%s',async handedOver=>{
 const {t,caseId}=await fixture(handedOver);await t.mutation(api.cases.addReply,{code,token,text:'Sample airline reply: we paid MakeMyTrip on 23 Oct 2026.',storageIds:[]});
 const item=await t.run(ctx=>ctx.db.get(caseId));const read=sampleFlight();read.reply={...read.reply,fromCompany:'IndiGo',pointsAt:'MakeMyTrip',claim:'paid_site',paidDate:'2026-10-23',summary:'IndiGo says it paid MakeMyTrip. MakeMyTrip now holds the money.',confidence:1};
 // Mocked reader output, real planner and persistence. No model or company mail.
 await t.mutation(internal.flights.apply,{caseId,runId:item!.latestRunId!,read,plan:planFlight(read,'2026-10-26'),model:'synthetic',latencyMs:0,inputTokens:0,outputTokens:0,totalTokens:0});
 const jobs=await t.run(ctx=>ctx.db.system.query('_scheduled_functions').collect());const job=jobs.find(j=>j.name==='chaseActions:notify');expect(job).toBeDefined();
 await t.action(internal.chaseActions.notify,job!.args[0] as any);await t.action(internal.chaseActions.notify,job!.args[0] as any);
 expect(mail.googleJson).toHaveBeenCalledTimes(1);const {raw,body}=delivered();expect(raw).toContain('To: passenger@example.invalid');expect(raw).not.toContain('To: desk@example.invalid');expect(body).toContain('MakeMyTrip now holds the money');expect(body).toContain('/c/index.html?code=RG-N20001#k=');expect(body).toMatch(/Next: Genie .+\d{1,2} [A-Z][a-z]{2} 2026\.$/);
});
it('an email change while obtaining Google access cancels delivery',async()=>{const {t,caseId}=await fixture();mail.accessToken.mockImplementationOnce(async()=>{await t.run(ctx=>ctx.db.patch(caseId,{email:'changed@example.invalid'}));return 'synthetic';});await t.action(internal.chaseActions.notify,{caseId,key:'reply:one',what:'Sample update',reply:'Pending.',next:'Watch for a reply.'});expect(mail.googleJson).not.toHaveBeenCalled();});
it.each(['unconfirmed','stopped','closed'])('%s cases cannot send passenger updates',async state=>{
 const {t,caseId}=await fixture();await t.run(async ctx=>{const item=await ctx.db.get(caseId);await ctx.db.patch(caseId,state==='unconfirmed'?{emailConfirmedAt:undefined}:state==='closed'?{stage:'CLOSED_LANDED'}:{chase:{...item!.chase!,active:false}});});
 await t.action(internal.chaseActions.notify,{caseId,key:'reply:blocked',what:'Sample update',reply:'Pending.',next:'Watch.'});expect(mail.accessToken).not.toHaveBeenCalled();expect(mail.googleJson).not.toHaveBeenCalled();
});
it('quiet open cases get at most one update after five working days',async()=>{
 const {t}=await fixture(false);vi.setSystemTime(new Date('2026-11-02T10:00:00+05:30'));
 for(let pass=0;pass<2;pass++){
  await t.mutation((internal.chase as any).quietUpdates,{});
  const jobs=await t.run(ctx=>ctx.db.system.query('_scheduled_functions').collect());for(const job of jobs.filter(j=>j.name==='chaseActions:notify'))await t.action(internal.chaseActions.notify,job.args[0] as any);
 }
 expect(mail.googleJson).toHaveBeenCalledTimes(1);expect(delivered().body).toContain('Next: Genie');
});
