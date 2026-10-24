/// <reference types="vite/client" />
import {afterEach,expect,it,vi} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {api,internal} from '../convex/_generated/api';
import {hashToken} from '../convex/lib/access';
const modules=import.meta.glob('../convex/**/*.ts'),code='RG-SEC003',token='r'.repeat(43);
async function fixture(){const t=convexTest(schema,modules);const ids=await t.run(async ctx=>{
 const caseId=await ctx.db.insert('cases',{code,tokenHash:await hashToken(token),stage:'READY',refundType:'flight',facts:{airline:'IndiGo',bookedVia:'direct'},ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:Date.now(),updatedAt:Date.now()});
 const draftId=await ctx.db.insert('drafts',{caseId,company:'IndiGo',step:'care',channel:'email',body:'Sample',attachChecklist:[],status:'sent',createdAt:Date.now()});
 await ctx.db.insert('chaseOutbox',{caseId,draftId,company:'IndiGo',companies:['IndiGo'],day:'2026-10-25',state:'sent',messageId:'outgoing',threadId:'owned-thread',createdAt:Date.now()});return {caseId};});return {t,...ids};}
afterEach(()=>vi.unstubAllEnvs());
const valid={threadId:'owned-thread',authenticationResults:'mx.google.com; spf=pass smtp.mailfrom=goindigo.in; dkim=pass header.i=@goindigo.in; dmarc=pass',sender:'support@goindigo.in'};
it.each([
 {threadId:'wrong-thread'},
 {sender:'attacker@example.invalid'},
 {authenticationResults:'mx.google.com; spf=fail; dkim=pass header.i=@goindigo.in'},
 {authenticationResults:'mx.google.com; spf=pass; dkim=fail'},
 {authenticationResults:'attacker.invalid; spf=pass; dkim=pass header.i=@goindigo.in'},
 {authenticationResults:'mx.google.com; spf=pass; dkim=pass header.i=@attacker.invalid'},
])('unverified reply %j is saved without any automatic case change or AI job',async overrides=>{
 const {t,caseId}=await fixture();await t.mutation(internal.googleData.saveReply,{caseId,messageId:'incoming',source:'inbox',text:'Made-up refund processed yesterday',receivedAt:Date.now(),...valid,...overrides} as any);
 expect(await t.run(ctx=>ctx.db.get(caseId))).toMatchObject({stage:'READY'});
 const inputs=await t.run(ctx=>ctx.db.query('inputs').withIndex('by_case',q=>q.eq('caseId',caseId)).collect());expect(inputs).toHaveLength(1);expect(inputs[0]).toMatchObject({verification:'unverified'});
 expect((await t.query(internal.agentData.load,{caseId})).inputs).toEqual([]);
 expect(await t.run(ctx=>ctx.db.system.query('_scheduled_functions').collect())).toEqual([]);
});
it('verified company reply in an app-sent thread schedules a read',async()=>{
 const {t,caseId}=await fixture();expect(await t.mutation(internal.googleData.saveReply,{caseId,messageId:'incoming',source:'inbox',text:'Made-up refund update',receivedAt:Date.now(),...valid} as any)).toBe(true);
 expect(await t.run(ctx=>ctx.db.get(caseId))).toMatchObject({stage:'TRIAGING'});
});
it('only the private case holder can approve an unverified reply, once',async()=>{
 const {t,caseId}=await fixture();await t.mutation(internal.googleData.saveReply,{caseId,messageId:'incoming',source:'inbox',text:'Sample unverified update',receivedAt:Date.now(),sender:'unverified@example.invalid'});
 const inputId=(await t.run(ctx=>ctx.db.query('inputs').withIndex('by_case',q=>q.eq('caseId',caseId)).first()))!._id;
 await expect(t.mutation((api.cases as any).useUnverifiedReply,{code,token:'wrong',inputId})).rejects.toThrow();
 await t.mutation((api.cases as any).useUnverifiedReply,{code,token,inputId});
 const jobs=await t.run(ctx=>ctx.db.system.query('_scheduled_functions').collect());
 await t.mutation((api.cases as any).useUnverifiedReply,{code,token,inputId});expect(await t.run(ctx=>ctx.db.system.query('_scheduled_functions').collect())).toHaveLength(jobs.length);
 expect(await t.run(ctx=>ctx.db.get(inputId))).toMatchObject({verification:'approved'});
});
