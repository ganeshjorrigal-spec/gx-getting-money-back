/// <reference types="vite/client" />
import {it,expect,vi,afterEach} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {internal} from '../convex/_generated/api';
import {callUpdateBody} from './call-update';
const transport=vi.hoisted(()=>({accessToken:vi.fn().mockResolvedValue('synthetic-token'),googleJson:vi.fn().mockResolvedValue({id:'synthetic'})}));
vi.mock('../lib/token-crypto',()=>({decryptToken:vi.fn().mockResolvedValue('n'.repeat(43))}));
vi.mock('../convex/googleActions',async original=>({...await original<Record<string,unknown>>(),...transport}));
afterEach(()=>{vi.useRealTimers();vi.unstubAllEnvs();vi.clearAllMocks();});
async function setup(options:{demo?:boolean;confirmed?:boolean;status?:'completed'|'failed';email?:string;mode?:'live'|'simulated'}={}){
 vi.useFakeTimers();vi.stubEnv('CHASE_ALLOWLIST','desk@example.invalid');vi.stubEnv('TICKBACK_DEMO_ADDRESS','desk@example.invalid');vi.stubEnv('TICKBACK_INBOX_ADDRESS','inbox@example.invalid');vi.stubEnv('CHASE_REAL_COMPANIES_ENABLED','false');
 const t=convexTest(schema,import.meta.glob('../convex/**/*.ts'));
 const ids=await t.run(async ctx=>{
 const letterId=await ctx.storage.store(new Blob(['synthetic']));
 const caseId=await ctx.db.insert('cases',{confirmedCaseEmail:options.email??'owner@example.invalid',emailConfirmedAt:options.confirmed===false?undefined:1,code:'RG-UPDATE',tokenHash:'synthetic',stage:'READY',refundType:'flight',ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:1,updatedAt:1,email:options.email??'owner@example.invalid',factsConfirmedAt:options.confirmed===false?undefined:1,facts:{reply:{summary:'Refund is pending.',reference:'REF-SAMPLE',paidDate:'2026-10-16'}},chase:{active:true,name:'Demo Passenger',mobile:'',email:'authority@example.invalid',authorisedAt:1,letterId,encryptedCaseToken:'synthetic'},...(options.demo?{demo:{kind:'flight' as const,round:0,phase:'ready' as const,now:'2026-10-16',expiresAt:Date.now()+86400000}}:{})});
 const id=await ctx.db.insert('calls',{caseId,mode:options.mode??'live',label:'Live call',status:options.status??'completed',company:'IndiGo',day:'2026-10-16',startedAt:1,createdAt:1,durationSeconds:30,costUsd:0.03,reservedUsd:0.3,authorisedAt:1,transcript:'Care: Please verify the passenger.'});
 await ctx.db.insert('googleConnections',{kind:'inbox',email:'inbox@example.invalid',chaseSendGranted:true,encryptedRefreshToken:'synthetic',connectedAt:1});return {id,caseId};
 });return {t,...ids};
}
it('real completed live call creates exactly one user-only update draft',async()=>{
 const {t,id}=await setup();const draftId=await t.mutation(internal.calls.prepareConfirmation,{id});expect(draftId).not.toBeNull();expect(await t.mutation(internal.calls.prepareConfirmation,{id})).toBeNull();
 const drafts=await t.run(ctx=>ctx.db.query('drafts').collect());expect(drafts).toHaveLength(1);expect(drafts[0]).toMatchObject({to:'owner@example.invalid',cc:[],step:'FLIGHT_call_update',subject:'Refund Genie call update: IndiGo · RG-UPDATE'});
 expect(drafts[0].body).toContain('Reference: REF-SAMPLE');expect(drafts[0].body).toContain('Processing date: 16 Oct 2026');expect(drafts[0].body).toContain('IndiGo asked you to call them back to verify your identity. Quote reference REF-SAMPLE.');expect(drafts[0].body).toMatch(/Genie keeps chasing by mail\. Reply to this mail with any question\.$/);
});
it.each([{status:'failed' as const},{confirmed:false},{email:'not-email'},{email:''},{mode:'simulated' as const}])('non-eligible call or unconfirmed email gives no summary: %j',async options=>{
 const {t,id}=await setup(options);expect(await t.mutation(internal.calls.prepareConfirmation,{id})).toBeNull();expect(await t.run(ctx=>ctx.db.query('drafts').collect())).toHaveLength(0);
});
it('demo confirming-mail path remains addressed to demo airline',async()=>{
 const {t,id}=await setup({demo:true,mode:'simulated'});const draftId=await t.mutation(internal.calls.prepareConfirmation,{id});const draft=await t.run(ctx=>ctx.db.get(draftId!));expect(draft).toMatchObject({to:'desk+airline@example.invalid',cc:[],step:'FLIGHT_call_confirmation',subject:'Demo: refund call confirmation [RG-UPDATE]'});
});
it('only exact confirmed user receives mocked summary despite list/real-company gates, once',async()=>{
 const {t,id,caseId}=await setup();const draftId=await t.mutation(internal.calls.prepareConfirmation,{id});expect(await t.mutation(internal.chase.reserve,{caseId,draftId:draftId!})).toBeNull();
 await t.action(internal.chaseActions.sendCallUpdate,{id});await t.action(internal.chaseActions.sendCallUpdate,{id});expect(transport.googleJson).toHaveBeenCalledTimes(1);
 const raw=Buffer.from(JSON.parse((transport.googleJson.mock.calls[0] as any)[2].body).raw,'base64url').toString();expect(raw).toContain('To: owner@example.invalid\r\nCc: \r\n');expect(raw).not.toContain('Bcc:');expect(raw).not.toContain('authority@example.invalid');const body=Buffer.from(raw.split('Content-Transfer-Encoding: base64\r\n\r\n')[1].split('\r\n')[0],'base64').toString();expect(body).toContain('/c/index.html?code=RG-UPDATE#k=');expect(body).toMatch(/Next: Genie .+\d{1,2} [A-Z][a-z]{2} 2026\.$/);expect((await t.run(ctx=>ctx.db.get(draftId!)))!.status).toBe('sent');
});
it.each(['to','cc','unconfirmed'])('summary exception cannot be widened by %s',async change=>{
 const {t,id,caseId}=await setup();const draftId=await t.mutation(internal.calls.prepareConfirmation,{id});
 await t.run(ctx=>change==='unconfirmed'?ctx.db.patch(caseId,{factsConfirmedAt:undefined}):ctx.db.patch(draftId!,change==='to'?{to:'company@example.invalid'}:{cc:['company@example.invalid']}));
 await t.action(internal.chaseActions.sendCallUpdate,{id});expect(transport.googleJson).not.toHaveBeenCalled();expect(transport.accessToken).not.toHaveBeenCalled();
});
it('body does not invent missing reference, processing date or callback',()=>{
 const body=callUpdateBody('IndiGo',{summary:'Refund pending.'},'Care: Refund pending.');expect(body).not.toContain('Reference:');expect(body).not.toContain('Processing date:');expect(body).not.toContain('call them back');
 expect(callUpdateBody('IndiGo',{},'Care: Please verify the passenger.')).toContain('IndiGo asked you to call them back to verify your identity.');
});

it('changed confirmed address during authentication cannot receive the prepared summary',async()=>{
 const {t,id,caseId}=await setup();await t.mutation(internal.calls.prepareConfirmation,{id});
 transport.accessToken.mockImplementationOnce(async()=>{await t.run(ctx=>ctx.db.patch(caseId,{email:'changed@example.invalid'}));return 'synthetic-token';});
 await t.action(internal.chaseActions.sendCallUpdate,{id});expect(transport.googleJson).not.toHaveBeenCalled();
});
it('uncertain delivery is recorded and never resent automatically',async()=>{
 const {t,id}=await setup();await t.mutation(internal.calls.prepareConfirmation,{id});transport.googleJson.mockRejectedValueOnce(new Error('ambiguous delivery'));
 await t.action(internal.chaseActions.sendCallUpdate,{id});await t.action(internal.chaseActions.sendCallUpdate,{id});expect(transport.googleJson).toHaveBeenCalledTimes(1);
 const notices=await t.run(ctx=>ctx.db.query('chaseNotices').collect());expect(notices).toHaveLength(1);expect(notices[0].state).toBe('uncertain');
});

it('user-only summary does not replace the company draft in ordinary mail chase selection',async()=>{
 const {t,id,caseId}=await setup();const normal=await t.run(ctx=>ctx.db.insert('drafts',{caseId,step:'FLIGHT_mail',channel:'email',to:'company@example.invalid',cc:[],subject:'Normal company chase',attachChecklist:[],body:'Please give a refund update.',status:'ready',createdAt:1}));
 await t.mutation(internal.calls.prepareConfirmation,{id});const loaded=await t.query(internal.chase.load,{caseId});expect(loaded!.draft!._id).toBe(normal);
 expect(await t.mutation(internal.chase.reserve,{caseId,draftId:normal})).toBeNull();
});
