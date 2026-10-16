/// <reference types="vite/client" />
import {it,expect,vi,afterEach} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {internal} from '../convex/_generated/api';
afterEach(()=>{vi.useRealTimers();vi.unstubAllGlobals();});
async function setup(){
 vi.useFakeTimers();vi.setSystemTime(new Date('2026-10-16T11:00:00+05:30'));
 const t=convexTest(schema,import.meta.glob('../convex/**/*.ts'));
 const ids=await t.run(async ctx=>{
 const caseId=await ctx.db.insert('cases',{code:'RG-POLL',tokenHash:'synthetic',stage:'READY',refundType:'flight',ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:Date.now(),updatedAt:Date.now()});
 const budgetId=await ctx.db.insert('callBudgets',{day:'2026-10-16',reserved:0.3});
 const id=await ctx.db.insert('calls',{caseId,mode:'live',label:'Live call',status:'queued',externalId:'synthetic',company:'Demo Air',day:'2026-10-16',startedAt:Date.now(),createdAt:Date.now(),durationSeconds:0,costUsd:0,reservedUsd:0.3,authorisedAt:1});return {id,budgetId};
 });return {t,...ids};
}
it('one status error keeps queued and reservation, then ended saves real evidence and cost without new call',async()=>{
 const {t,id,budgetId}=await setup();const fetcher=vi.fn().mockRejectedValueOnce(new Error('timeout')).mockResolvedValueOnce({ok:true,json:async()=>({status:'ended',endedReason:'assistant-ended-call',cost:0.03,transcript:'Care: Refund pending.'})});vi.stubGlobal('fetch',fetcher);
 await t.action(internal.callActions.poll,{id,attempt:0});
 expect((await t.run(ctx=>ctx.db.get(id)))!.status).toBe('queued');expect((await t.run(ctx=>ctx.db.get(budgetId)))!.reserved).toBe(0.3);
 const jobs=await t.run(ctx=>ctx.db.system.query('_scheduled_functions').collect());const next=jobs.find(j=>j.name==='callActions:poll')!;
 expect(next.args[0]).toMatchObject({id,attempt:1,consecutiveErrors:1});expect(next.scheduledTime).toBe(Date.now()+15000);
 await t.action(internal.callActions.poll,next.args[0] as {id:typeof id;attempt:number;consecutiveErrors:number});
 const record=await t.run(ctx=>ctx.db.get(id));expect(record!.status).toBe('completed');expect(record!.costUsd).toBe(0.03);expect(record!.transcript).toBe('Care: Refund pending.');expect((await t.run(ctx=>ctx.db.get(budgetId)))!.reserved).toBeCloseTo(0.03);
 expect(fetcher).toHaveBeenCalledTimes(2);expect(fetcher.mock.calls.every(([url,options])=>url==='https://api.vapi.ai/call/synthetic'&&options.method!== 'POST')).toBe(true);
});
it('eight consecutive non-OK status reads fail conservatively and keep the whole reservation',async()=>{
 const {t,id,budgetId}=await setup();const fetcher=vi.fn().mockResolvedValue({ok:false});vi.stubGlobal('fetch',fetcher);
 for(let i=0;i<8;i++){await t.action(internal.callActions.poll,{id,attempt:i,consecutiveErrors:i});if(i<7)expect((await t.run(ctx=>ctx.db.get(id)))!.status).toBe('queued');}
 const record=await t.run(ctx=>ctx.db.get(id));expect(record!.status).toBe('failed');expect(record!.reason).toBe('Call status unavailable; no automatic retry');expect(record!.costUsd).toBe(0.3);expect((await t.run(ctx=>ctx.db.get(budgetId)))!.reserved).toBe(0.3);
 expect(fetcher).toHaveBeenCalledTimes(8);expect(fetcher.mock.calls.every(([,options])=>options.method!=='POST')).toBe(true);
 expect((await t.run(ctx=>ctx.db.query('calls').collect()))).toHaveLength(1);
});

it('a successful ongoing status resets consecutive errors',async()=>{
 const {t,id}=await setup();await t.run(async ctx=>{const call=await ctx.db.get(id);await ctx.db.patch(call!.caseId,{chase:{active:true,name:'Demo Passenger',mobile:'',email:'passenger@example.invalid',authorisedAt:1,letterId:await ctx.storage.store(new Blob(['synthetic'])),encryptedCaseToken:'synthetic'}});});
 const fetcher=vi.fn().mockResolvedValue({ok:true,json:async()=>({status:'in-progress'})});vi.stubGlobal('fetch',fetcher);
 await t.action(internal.callActions.poll,{id,attempt:7,consecutiveErrors:7});
 const jobs=await t.run(ctx=>ctx.db.system.query('_scheduled_functions').collect());expect(jobs.find(j=>j.name==='callActions:poll')!.args[0]).toMatchObject({attempt:8,consecutiveErrors:0});expect((await t.run(ctx=>ctx.db.get(id)))!.status).toBe('queued');
});
