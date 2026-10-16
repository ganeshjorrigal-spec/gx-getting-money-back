/// <reference types="vite/client" />
import {it,expect,vi,afterEach} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {internal} from '../convex/_generated/api';
const modules=import.meta.glob('../convex/**/*.ts');
afterEach(()=>vi.useRealTimers());
async function setup(count=1,reserved=count*0.3){
 vi.useFakeTimers();vi.setSystemTime(new Date('2026-10-16T18:00:00+05:30'));
 const t=convexTest(schema,modules);
 const ids=await t.run(async ctx=>{
  const caseId=await ctx.db.insert('cases',{code:'RG-BUDGET',tokenHash:'fixture',stage:'READY',refundType:'flight',ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:Date.now(),updatedAt:Date.now()});
  const budgetId=await ctx.db.insert('callBudgets',{day:'2026-10-16',reserved});
  const callIds=[];
  for(let i=0;i<count;i++)callIds.push(await ctx.db.insert('calls',{caseId,mode:'live',label:'Live call',status:'reserved',company:'Demo Air',day:'2026-10-16',startedAt:Date.now(),createdAt:Date.now(),durationSeconds:0,costUsd:0,reservedUsd:0.3,authorisedAt:1}));
  return {budgetId,callIds};
 });return {t,...ids};
}
it('a refused pre-start call releases its whole reservation exactly once',async()=>{
 const {t,budgetId,callIds:[id]}=await setup();
 const args={id,status:'failed' as const,reason:'API refused',transcript:'',costUsd:0,durationSeconds:0,patchIn:false};
 await t.mutation(internal.calls.finish,args);await t.mutation(internal.calls.finish,args);
 expect((await t.run(ctx=>ctx.db.get(budgetId)))!.reserved).toBe(0);
});
it.each([[0.03,0.03],[0.5,0.5]])('finishing at %s leaves only actual cost %s',async(cost,expected)=>{
 const {t,budgetId,callIds:[id]}=await setup();await t.run(ctx=>ctx.db.patch(id,{status:'queued',externalId:'synthetic'}));
 await t.mutation(internal.calls.finish,{id,status:'completed',transcript:'',costUsd:cost,durationSeconds:30,patchIn:false});
 expect((await t.run(ctx=>ctx.db.get(budgetId)))!.reserved).toBeCloseTo(expected);
});
it('two finished calls leave the sum of actual costs without consuming the other reservation',async()=>{
 const {t,budgetId,callIds}=await setup(2);
 for(const [index,id] of callIds.entries()){
  await t.run(ctx=>ctx.db.patch(id,{status:'queued',externalId:'synthetic'}));
  await t.mutation(internal.calls.finish,{id,status:'completed',transcript:'',costUsd:index?0.05:0.03,durationSeconds:30,patchIn:false});
  expect((await t.run(ctx=>ctx.db.get(budgetId)))!.reserved).toBeCloseTo(index?0.08:0.33);
 }
});
it('released daily reservation never becomes negative',async()=>{
 const {t,budgetId,callIds:[id]}=await setup(1,0.1);
 await t.mutation(internal.calls.finish,{id,status:'failed',transcript:'',costUsd:0,durationSeconds:0,patchIn:false});
 expect((await t.run(ctx=>ctx.db.get(budgetId)))!.reserved).toBe(0);
});
