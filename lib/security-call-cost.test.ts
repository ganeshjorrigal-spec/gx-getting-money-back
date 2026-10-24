/// <reference types="vite/client" />
import {expect,it} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {internal} from '../convex/_generated/api';
import {assistantOverrides,startCall} from './call-transport';
const modules=import.meta.glob('../convex/**/*.ts');
const details={name:'Sample Passenger',company:'Demo Air',pnr:'SAMPLE',mobile:'synthetic'};
it('calls default to twelve minutes and support a shorter configured limit',()=>{
 expect(assistantOverrides(details).maxDurationSeconds).toBe(720);
 expect(assistantOverrides(details,{CALL_MAX_MINUTES:'8'}).maxDurationSeconds).toBe(480);
 expect(assistantOverrides(details).model.messages[0].content).toContain('12 minutes');
});
it.each(['timeout','server-error','malformed-success'])('an ambiguous %s start keeps an uncertain result rather than a zero-cost failure',async kind=>{
 const request=async()=>{if(kind==='timeout')throw new Error('Synthetic timeout');return new Response(kind==='server-error'?'{}':'not json',{status:kind==='server-error'?503:200});};
 expect(await startCall({CALL_MODE:'live',VAPI_API_KEY:'synthetic',VAPI_PHONE_NUMBER_ID:'synthetic'},{},'',request as typeof fetch)).toMatchObject({status:'start_uncertain'});
});
it('a definitive rejection remains a failed start',async()=>{expect(await startCall({CALL_MODE:'live',VAPI_API_KEY:'synthetic',VAPI_PHONE_NUMBER_ID:'synthetic'},{},'',async()=>new Response('{"message":"Synthetic invalid request"}',{status:400}))).toMatchObject({status:'failed'});});
it('an uncertain start preserves its budget until a provider record resolves it',async()=>{
 const t=convexTest(schema,modules),day='2026-10-25';const id=await t.run(async ctx=>{const caseId=await ctx.db.insert('cases',{code:'RG-COST01',tokenHash:'synthetic',stage:'READY',ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:Date.now(),updatedAt:Date.now()});await ctx.db.insert('callBudgets',{day,reserved:2});return ctx.db.insert('calls',{caseId,mode:'live',label:'Supervised sample',status:'reserved',company:'Demo Air',day,startedAt:Date.now(),createdAt:Date.now(),durationSeconds:0,costUsd:0,reservedUsd:2,authorisedAt:1});});
 await t.mutation((internal.calls as any).startUncertain,{id});
 expect(await t.run(ctx=>ctx.db.get(id))).toMatchObject({status:'start_uncertain',reservedUsd:2});expect(await t.run(ctx=>ctx.db.query('callBudgets').first())).toMatchObject({reserved:2});
 // No provider evidence: even a generic zero-cost finish cannot release the reservation.
 await t.mutation(internal.calls.finish,{id,status:'failed',transcript:'',costUsd:0,durationSeconds:0,patchIn:false});expect(await t.run(ctx=>ctx.db.query('callBudgets').first())).toMatchObject({reserved:2});
});
