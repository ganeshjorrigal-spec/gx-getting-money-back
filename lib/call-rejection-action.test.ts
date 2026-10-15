/// <reference types="vite/client" />
import {afterEach,expect,it,vi} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {internal} from '../convex/_generated/api';
vi.mock('./call-transport',async original=>({...await original<Record<string,unknown>>(),startCall:vi.fn().mockResolvedValue({mode:'live',status:'failed',transcript:'',reason:"Invalid Configuration. Assistant 'Demo' has more than one tool of type 'endCall'."})}));
afterEach(()=>{vi.useRealTimers();vi.unstubAllEnvs();});
async function setup(){
 vi.useFakeTimers();vi.setSystemTime(new Date('2026-10-15T11:00:00+05:30'));
 vi.stubEnv('CALL_MODE','live');vi.stubEnv('VAPI_API_KEY','fixture');vi.stubEnv('VAPI_PHONE_NUMBER_ID','fixture');vi.stubEnv('VAPI_ASSISTANT_ID','fixture');
 vi.stubEnv('CALL_DAILY_CAP_USD','10');vi.stubEnv('CALL_MAX_COST_USD','1');vi.stubEnv('CALL_ALLOWLIST','+910000000001,+910000000002');
 const t=convexTest(schema,import.meta.glob('../convex/**/*.ts'));
 const caseId=await t.run(async ctx=>ctx.db.insert('cases',{code:'RG-REJECT',tokenHash:'fixture',stage:'READY',refundType:'flight',ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:1,updatedAt:1,facts:{airline:'Demo Air',pnr:'SAMPLE'},chase:{active:true,callsAuthorisedAt:1,name:'Demo Passenger',mobile:'+910000000001',email:'passenger@example.invalid',authorisedAt:1,letterId:await ctx.storage.store(new Blob(['fixture'])),encryptedCaseToken:'fixture'},demo:{kind:'flight',round:1,now:'2026-10-12',phase:'ready',expiresAt:Date.now()+86400000}}));
 return {t,caseId};
}
it.each(['reference','identity'] as const)('a refused %s call stores zero duration, no patch-in and no fixture conversation',async fixture=>{
 const {t,caseId}=await setup();
 await t.action(internal.callActions.run,{caseId,fixture});
 const call=await t.run(ctx=>ctx.db.query('calls').withIndex('by_case',q=>q.eq('caseId',caseId)).unique());
 expect(call).toMatchObject({mode:'live',status:'failed',durationSeconds:0,patchIn:false,transcript:'',costUsd:0});
 expect(call?.recordingUrl).toBeUndefined();expect(call?.externalId).toBeUndefined();
 const event=await t.run(ctx=>ctx.db.query('caseEvents').withIndex('by_case',q=>q.eq('caseId',caseId)).first());
 expect(event?.summary).toContain('Call could not start');expect(event?.summary).toContain("more than one tool of type 'endCall'");
 expect(event?.summary).not.toMatch(/65|75|patch-in/);
},20000);
it('corrects a historical rejected call and its history without sending or scheduling anything',async()=>{
 const {t,caseId}=await setup();
 const reserved=await t.mutation(internal.calls.reserve,{caseId,fixture:'identity'});
 if(!reserved)throw new Error('Expected a reserved fixture call');
 await t.mutation(internal.calls.finish,{id:reserved.callId,status:'failed',transcript:'',reason:'duplicate endCall',costUsd:0,durationSeconds:65,patchIn:true});
 await t.run(async ctx=>{await ctx.db.patch(reserved.callId,{mode:'live',durationSeconds:65,patchIn:true});});
 const jobsBefore=await t.run(ctx=>ctx.db.system.query('_scheduled_functions').collect());
 await t.mutation(internal.calls.correctRejectedCall,{id:reserved.callId});
 const call=await t.run(ctx=>ctx.db.get(reserved.callId));
 expect(call).toMatchObject({status:'failed',durationSeconds:0,patchIn:false,transcript:''});
 const event=await t.run(ctx=>ctx.db.query('caseEvents').withIndex('by_case',q=>q.eq('caseId',caseId)).first());
 expect(event?.summary).toContain('Call could not start');expect(event?.summary).not.toMatch(/65|patch-in/);
 expect(await t.run(ctx=>ctx.db.system.query('_scheduled_functions').collect())).toEqual(jobsBefore);
 await t.mutation(internal.calls.correctRejectedCall,{id:reserved.callId});
 await t.run(ctx=>ctx.db.patch(reserved.callId,{externalId:'synthetic-started-call'}));
 await expect(t.mutation(internal.calls.correctRejectedCall,{id:reserved.callId})).rejects.toThrow(/rejected before/);
});
