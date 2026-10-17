/// <reference types="vite/client" />
import {it,expect,vi,afterEach} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {api,internal} from '../convex/_generated/api';
import {hashToken} from '../convex/lib/access';
import {chaseDailyCap} from './chase';
const transport=vi.hoisted(()=>({accessToken:vi.fn().mockResolvedValue('fixture-token'),googleJson:vi.fn(async(url:string)=>url.includes('format=metadata')?{payload:{headers:[{name:'Message-ID',value:'<fixture@example.invalid>'}]}}:{id:'fixture',threadId:'fixture'})}));
vi.mock('../convex/googleActions',async original=>({...await original<Record<string,unknown>>(),...transport}));
afterEach(()=>{vi.unstubAllEnvs();vi.clearAllMocks();vi.useRealTimers();});
async function setup(options:{cc?:string[];to?:string;confirmed?:boolean;cap?:string;enabled?:string}={}){
 vi.useFakeTimers();vi.setSystemTime(new Date('2026-10-17T12:00:00+05:30'));vi.stubEnv('CHASE_REAL_COMPANIES_ENABLED',options.enabled??'true');vi.stubEnv('CHASE_DAILY_CAP',options.cap??'50');vi.stubEnv('CHASE_ALLOWLIST','');vi.stubEnv('TICKBACK_INBOX_ADDRESS','desk@example.invalid');
 const t=convexTest(schema,import.meta.glob('../convex/**/*.ts')),token='x'.repeat(43),code='RG-PUBQA1';
 const ids=await t.run(async ctx=>{const letterId=await ctx.storage.store(new Blob(['fixture']));const caseId=await ctx.db.insert('cases',{code,tokenHash:await hashToken(token),stage:'READY',route:'OVERDUE',refundType:'flight',email:'confirmed@example.invalid',factsConfirmedAt:options.confirmed===false?undefined:1,facts:{airline:'IndiGo',bookedVia:'direct',pnr:'SAMPLE'},flightPlan:{rung:2,nextPerson:{company:'IndiGo',role:'Customer care email'}},chase:{active:true,email:'other@example.invalid',name:'Fixture Passenger',mobile:'',authorisedAt:1,letterId,encryptedCaseToken:'fixture'},ladderLevel:2,draftsShown:1,tier:'free_check',paidState:'none',createdAt:1,updatedAt:1});const draftId=await ctx.db.insert('drafts',{caseId,step:'FLIGHT_mail',channel:'email',to:options.to??'customer.experience@goindigo.in',cc:options.cc??[],subject:'Fixture refund',body:'Dear support,\n\nFixture refund.',attachChecklist:[],status:'ready',createdAt:1});await ctx.db.insert('googleConnections',{kind:'inbox',chaseSendGranted:true,encryptedRefreshToken:'fixture',connectedAt:1});return {caseId,draftId};});return {t,...ids,access:{code,token}};
}
it('public sender uses checked companies and exact confirmed CC outside allow-list',async()=>{
 const {t,caseId}=await setup({cc:['confirmed@example.invalid']});await t.action(internal.chaseActions.send,{caseId});
 const mail=transport.googleJson.mock.calls.find(([url])=>url.endsWith('messages/send'));expect(mail).toBeTruthy();const raw=Buffer.from(JSON.parse((mail as any)[2].body).raw,'base64url').toString();expect(raw).toContain('To: customer.experience@goindigo.in');expect(raw).toContain('Cc: confirmed@example.invalid');expect(raw).not.toContain('other@example.invalid');
});
it.each([{to:'unchecked@example.invalid'},{cc:['wrong@example.invalid']},{confirmed:false},{enabled:'false'},{enabled:'TRUE'}])('refuses unverified or switch-off public send: %j',async options=>{
 const {t,caseId}=await setup(options);await t.action(internal.chaseActions.send,{caseId});expect(transport.googleJson).not.toHaveBeenCalled();
});
it('global cap reserves atomically and deferred case says tomorrow',async()=>{
 const {t,caseId,draftId,access}=await setup({cap:'1'});
 await t.run(ctx=>ctx.db.insert('chaseDaily',{day:'2026-10-17',count:1}));
 expect(await t.mutation(internal.chase.reserve,{caseId,draftId})).toBeNull();expect(await t.query(api.chase.status,access)).toBe('Genie will send this tomorrow');expect(transport.googleJson).not.toHaveBeenCalled();
});
it('known failed send releases daily slot once; accepted mail keeps it if metadata fails',async()=>{
 const {t,caseId}=await setup();transport.googleJson.mockRejectedValueOnce(new Error('fixture failure'));await t.action(internal.chaseActions.send,{caseId});expect((await t.run(ctx=>ctx.db.query('chaseDaily').withIndex('by_day',q=>q.eq('day','2026-10-17')).unique()))?.count).toBe(0);
 const attempt=await t.run(ctx=>ctx.db.query('chaseOutbox').withIndex('by_case',q=>q.eq('caseId',caseId)).first());await t.mutation(internal.chase.uncertain,{id:attempt!._id});expect((await t.run(ctx=>ctx.db.query('chaseDaily').withIndex('by_day',q=>q.eq('day','2026-10-17')).unique()))?.count).toBe(0);
});
it('changed confirmed CC at OAuth boundary blocks sending and releases slot',async()=>{
 const {t,caseId}=await setup();transport.accessToken.mockImplementationOnce(async()=>{await t.run(ctx=>ctx.db.patch(caseId,{email:'changed@example.invalid'}));return 'fixture';});await t.action(internal.chaseActions.send,{caseId});expect(transport.googleJson).not.toHaveBeenCalled();expect((await t.run(ctx=>ctx.db.query('chaseDaily').withIndex('by_day',q=>q.eq('day','2026-10-17')).unique()))?.count).toBe(0);
});
it.each([undefined,'','abc','1.5','-1','Infinity'])('invalid daily cap defaults to 50: %s',value=>expect(chaseDailyCap(value)).toBe(50));
it('whole daily caps accepted, including zero to stop sending',()=>{expect(chaseDailyCap('12')).toBe(12);expect(chaseDailyCap('0')).toBe(0);});

it('provider acceptance holds quota even if recording delivery metadata fails',async()=>{
 const {t,caseId}=await setup();transport.googleJson.mockImplementationOnce(async()=>({id:'fixture',threadId:'fixture'})).mockRejectedValueOnce(new Error('metadata unavailable'));await t.action(internal.chaseActions.send,{caseId});expect((await t.run(ctx=>ctx.db.query('chaseDaily').withIndex('by_day',q=>q.eq('day','2026-10-17')).unique()))?.count).toBe(1);
});
it('two different cases compete for one daily slot; tomorrow has a new allowance',async()=>{
 const {t,caseId,draftId}=await setup({cap:'1'});
 const other=await t.run(async ctx=>{const original=(await ctx.db.get(caseId))!,draft=(await ctx.db.get(draftId))!;const {_id,_creationTime,...facts}=original;const id=await ctx.db.insert('cases',{...facts,code:'RG-PUBQA2'});const {_id:unused,_creationTime:unusedTime,...mail}=draft;const d=await ctx.db.insert('drafts',{...mail,caseId:id});return {caseId:id,draftId:d};});
 const results=await Promise.all([t.mutation(internal.chase.reserve,{caseId,draftId}),t.mutation(internal.chase.reserve,other)]);expect(results.filter(Boolean)).toHaveLength(1);
 const blocked=results[0]?other:{caseId,draftId};vi.setSystemTime(new Date('2026-10-18T12:00:00+05:30'));expect(await t.mutation(internal.chase.reserve,blocked)).not.toBeNull();
});
