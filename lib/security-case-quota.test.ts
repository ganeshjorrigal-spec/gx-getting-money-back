/// <reference types="vite/client" />
import {afterEach,beforeEach,expect,it,vi} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {internal} from '../convex/_generated/api';
const modules=import.meta.glob('../convex/**/*.ts');
beforeEach(()=>{vi.useFakeTimers();vi.setSystemTime(new Date('2026-10-25T18:29:59Z'));});
afterEach(()=>{vi.useRealTimers();vi.unstubAllEnvs();});
async function fixture(){const t=convexTest(schema,modules);const caseId=await t.run(ctx=>ctx.db.insert('cases',{code:'RG-QUOTA1',tokenHash:'synthetic',stage:'TRIAGING',ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:Date.now(),updatedAt:Date.now()}));return {t,caseId};}
it('allows twenty daily reads then refuses the twenty-first with the case-specific message',async()=>{const {t,caseId}=await fixture();for(let i=0;i<20;i++)expect(await t.mutation(internal.aiQuota.take,{caseId})).toBe(true);expect(await t.mutation(internal.aiQuota.take,{caseId})).toBe(false);expect(await t.run(ctx=>ctx.db.get(caseId))).toMatchObject({progress:{step:'case_daily_limit'}});expect(await t.run(ctx=>ctx.db.query('caseEvents').withIndex('by_case',q=>q.eq('caseId',caseId)).first())).toMatchObject({summary:'Genie has read this case a lot today. Try again tomorrow, or wait for the next update.'});});
it('resets the daily limit at midnight in India',async()=>{vi.stubEnv('AI_CALLS_PER_CASE_PER_DAY','1');const {t,caseId}=await fixture();expect(await t.mutation(internal.aiQuota.take,{caseId})).toBe(true);expect(await t.mutation(internal.aiQuota.take,{caseId})).toBe(false);vi.advanceTimersByTime(1000);expect(await t.mutation(internal.aiQuota.take,{caseId})).toBe(true);});
it('refusing the global cap does not spend a daily reservation',async()=>{vi.stubEnv('AI_CALLS_PER_HOUR','0');const {t,caseId}=await fixture();expect(await t.mutation(internal.aiQuota.take,{caseId})).toBe(false);vi.stubEnv('AI_CALLS_PER_HOUR','100');vi.stubEnv('AI_CALLS_PER_CASE_PER_DAY','1');expect(await t.mutation(internal.aiQuota.take,{caseId})).toBe(true);});
it('concurrent reads cannot exceed the case cap',async()=>{vi.stubEnv('AI_CALLS_PER_CASE_PER_DAY','2');const {t,caseId}=await fixture();const results=await Promise.all(Array.from({length:4},()=>t.mutation(internal.aiQuota.take,{caseId})));expect(results.filter(Boolean)).toHaveLength(2);});
