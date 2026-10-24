/// <reference types="vite/client" />
import {convexTest} from 'convex-test';
import {it,expect,vi,afterEach} from 'vitest';
import schema from '../convex/schema';
import {internal} from '../convex/_generated/api';
const modules=import.meta.glob('../convex/**/*.ts');
afterEach(()=>{vi.useRealTimers();vi.unstubAllEnvs();});
async function fixture(){vi.useFakeTimers();vi.stubEnv('CALL_MODE','simulated');vi.stubEnv('CALL_ALLOWLIST','+910000000001,+910000000002');const t=convexTest(schema,modules);const caseId=await t.run(async ctx=>{const letterId=await ctx.storage.store(new Blob(['fixture']));return ctx.db.insert('cases',{email:'fixture@example.invalid',confirmedCaseEmail:'fixture@example.invalid',emailConfirmedAt:1,code:'RG-SAMPLE',tokenHash:'fixture',stage:'READY',refundType:'flight',ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:1,updatedAt:1,facts:{airline:'Demo Air',pnr:'SAMPLE'},chase:{active:true,callsAuthorisedAt:1,name:'Sample',mobile:'+910000000002',email:'fixture@example.invalid',authorisedAt:1,letterId,encryptedCaseToken:'fixture'},demo:{kind:'flight',round:1,now:'2026-10-12',phase:'ready',expiresAt:Date.now()+86400000}});});return {t,caseId};}
it('persists failed call, schedules mail fallback and consumes the two-call cap',async()=>{const {t,caseId}=await fixture();for(let i=0;i<2;i++){const r=await t.mutation(internal.calls.reserve,{caseId,fixture:'reference'});expect(r!.mode).toBe('simulated');await t.mutation(internal.calls.finish,{id:r!.callId,status:'failed',transcript:'',reason:'connection-refused',costUsd:0,durationSeconds:2,patchIn:false});}await expect(t.mutation(internal.calls.reserve,{caseId,fixture:'reference'})).rejects.toThrow(/Two calls/);const rows=await t.run(ctx=>ctx.db.query('calls').withIndex('by_case',q=>q.eq('caseId',caseId)).take(3));expect(rows.every(r=>r.status==='failed'&&r.label==='Simulated demo call')).toBe(true);const events=await t.run(ctx=>ctx.db.query('caseEvents').withIndex('by_case',q=>q.eq('caseId',caseId)).take(10));expect(events.some(e=>e.summary.includes('follow up by mail'))).toBe(true);const jobs=await t.run(ctx=>ctx.db.system.query('_scheduled_functions').collect());expect(jobs.some(j=>j.name.includes('chaseActions:send'))).toBe(true);});
it('stores only safe transcript and never a sensitive recording link',async()=>{const {t,caseId}=await fixture();const r=await t.mutation(internal.calls.reserve,{caseId,fixture:'identity'});await t.mutation(internal.calls.finish,{id:r!.callId,status:'completed',transcript:'Care: OTP 123456\nPassenger: 654321\nGenie: I will connect the passenger.',recordingUrl:'https://example.invalid/unsafe.wav',costUsd:0,durationSeconds:60,patchIn:true});const row=await t.run(ctx=>ctx.db.get(r!.callId));expect(row?.transcript).not.toMatch(/123456|654321/);expect(row?.recordingUrl).toBeUndefined();expect(row?.patchIn).toBe(true);const input=await t.run(ctx=>ctx.db.query('inputs').withIndex('by_case',q=>q.eq('caseId',caseId)).first());expect(input?.text).not.toMatch(/123456|654321/);});

import {flightCare} from './flight-care';

it('real reservation uses checked IndiGo care only with owner-enabled live mode and permission',async()=>{
 const {t,caseId}=await fixture();vi.setSystemTime(new Date('2026-10-16T11:00:00+05:30'));
 vi.stubEnv('CALL_ALLOWLIST',flightCare('IndiGo')!.careNumber);vi.stubEnv('CALL_TRANSFER_ENABLED','false');vi.stubEnv('CALL_MODE','live');vi.stubEnv('VAPI_API_KEY','synthetic');vi.stubEnv('VAPI_PHONE_NUMBER_ID','synthetic');vi.stubEnv('VAPI_ASSISTANT_ID','synthetic');vi.stubEnv('CALL_MAX_COST_USD','0.3');vi.stubEnv('CALL_DAILY_CAP_USD','1');
 await t.run(async ctx=>{const item=await ctx.db.get(caseId);await ctx.db.patch(caseId,{demo:undefined,facts:{airline:'IndiGo',pnr:'SAMPLE'},chase:{...item!.chase!,mobile:'+910000000009'}});});
 const r=await t.mutation(internal.calls.reserve,{caseId,fixture:'reference',expectedMode:'live'});expect(r!.number).toBe(flightCare('IndiGo')!.careNumber);expect(r!.mode).toBe('live');
 vi.stubEnv('CALL_TRANSFER_ENABLED','true');await expect(t.mutation(internal.calls.reserve,{caseId,fixture:'reference'})).rejects.toThrow(/saved test numbers/);
 vi.stubEnv('CALL_TRANSFER_ENABLED','false');vi.stubEnv('CALL_MODE','simulated');await expect(t.mutation(internal.calls.reserve,{caseId,fixture:'reference'})).rejects.toThrow(/Live airline calling/);
});

it.each([undefined,'TRUE','1','true'])('only exact true enables real night reservation: %s',async value=>{
 const {t,caseId}=await fixture();vi.setSystemTime(new Date('2026-10-17T01:00:00+05:30'));
 vi.stubEnv('CALL_REAL_ANY_HOUR',value);vi.stubEnv('CALL_ALLOWLIST',flightCare('IndiGo')!.careNumber);vi.stubEnv('CALL_TRANSFER_ENABLED','false');vi.stubEnv('CALL_MODE','live');vi.stubEnv('VAPI_API_KEY','synthetic');vi.stubEnv('VAPI_PHONE_NUMBER_ID','synthetic');vi.stubEnv('VAPI_ASSISTANT_ID','synthetic');vi.stubEnv('CALL_MAX_COST_USD','0.3');vi.stubEnv('CALL_DAILY_CAP_USD','1');
 await t.run(async ctx=>{const item=await ctx.db.get(caseId);await ctx.db.patch(caseId,{demo:undefined,facts:{airline:'IndiGo',pnr:'SAMPLE'},chase:{...item!.chase!,mobile:'+910000000009'}});});
 if(value==='true')expect((await t.mutation(internal.calls.reserve,{caseId,fixture:'reference',expectedMode:'live'}))!.mode).toBe('live');
 else await expect(t.mutation(internal.calls.reserve,{caseId,fixture:'reference',expectedMode:'live'})).rejects.toThrow(/Monday to Saturday/);
});
