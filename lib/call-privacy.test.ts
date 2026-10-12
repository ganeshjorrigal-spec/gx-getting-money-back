/// <reference types="vite/client" />
import {it,expect,vi,afterEach} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {internal} from '../convex/_generated/api';
import {safeCallResult} from './call-transport';
import {safeTranscript,callFixture} from './calls';
const modules=import.meta.glob('../convex/**/*.ts');
const marker='Passenger was connected. Nothing after this point is kept.';
const probes=[
 ['Care: Please read out the 6 digit code we just sent.','Passenger: 4 8 2 9 1 3'],
 ['Care: Share the code on your phone.','Passenger: it is 482913'],
 ['Care: Please confirm your date of birth and registered email.','Passenger: 1 January 1990, private@example.invalid'],
 ["Genie: I'll connect the passenger now.",'Care: Welcome.\nPassenger: private answer without a keyword'],
];
afterEach(()=>{vi.useRealTimers();vi.unstubAllEnvs();});
async function fixture(list='+910000000001,+910000000002') {
 vi.useFakeTimers();vi.stubEnv('CALL_MODE','simulated');vi.stubEnv('CALL_ALLOWLIST',list);
 const t=convexTest(schema,modules);
 const caseId=await t.run(async ctx=>ctx.db.insert('cases',{code:'RG-PRIVATE',tokenHash:'fixture',stage:'READY',refundType:'flight',ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:1,updatedAt:1,facts:{airline:'Demo Air',pnr:'SAMPLE'},chase:{active:true,callsAuthorisedAt:1,name:'Sample',mobile:'+910000000001',email:'fixture@example.invalid',authorisedAt:1,letterId:await ctx.storage.store(new Blob(['fixture'])),encryptedCaseToken:'fixture'},demo:{kind:'flight',round:1,now:'2026-10-12',phase:'ready',expiresAt:Date.now()+86400000}}));
 return {t,caseId};
}
it.each(probes)('HQ probe removes passenger answer and recording in saved record: %s',async(care,answer)=>{
 const raw=`Care: Please give the PNR.\n${care}\n${answer}`;
 expect(safeTranscript(raw)).not.toContain(answer.split('\n').at(-1)!);
 const result=safeCallResult({transcript:raw,recordingUrl:'https://example.invalid/private.wav'});
 expect(result.recordingUrl).toBeUndefined();
 const {t,caseId}=await fixture();const r=await t.mutation(internal.calls.reserve,{caseId,fixture:'identity'});
 await t.mutation(internal.calls.finish,{id:r!.callId,status:'completed',transcript:raw,recordingUrl:'https://example.invalid/private.wav',costUsd:0,durationSeconds:60,patchIn:false});
 const record=await t.run(ctx=>ctx.db.get(r!.callId));
 expect(record!.transcript).not.toContain(answer.split('\n').at(-1)!);expect(record!.recordingUrl).toBeUndefined();
 const inputs=await t.run(ctx=>ctx.db.query('inputs').collect());expect(JSON.stringify(inputs)).not.toContain(answer.split('\n').at(-1)!);
});
it('cuts at assistant transfer and preserves every preceding ordinary line',()=>{
 const before='Care: Please give the PNR.\nGenie: SAMPLE';
 const r=safeCallResult({transcript:`${before}\nGenie: I'll connect the passenger now.\nCare: secret follow-up\nPassenger: secret`,recordingUrl:'https://example.invalid/private.wav'});
 expect(r.transcript).toBe(`${before}\n${marker}`);expect(r.patchIn).toBe(true);expect(r.recordingUrl).toBeUndefined();
});
it.each([{role:'tool_calls',toolCalls:[{function:{name:'transferCall'}}]},{type:'transfer'}])('cuts at structured transfer event/tool and keeps preceding text: %j',event=>{
 const r=safeCallResult({transcript:'Care: Please give the PNR.\nGenie: SAMPLE\nCare: secret follow-up\nPassenger: secret',messages:[{role:'user',message:'Care: Please give the PNR.'},{role:'assistant',message:'Genie: SAMPLE'},event,{role:'user',message:'Care: secret follow-up'}],recordingUrl:'https://example.invalid/private.wav'});
 expect(r.transcript).toBe(`Care: Please give the PNR.\nGenie: SAMPLE\n${marker}`);expect(r.recordingUrl).toBeUndefined();
});
it('transfer ended reason without a known boundary retains no conversation or recording',()=>{
 const r=safeCallResult({endedReason:'assistant-forwarded-call-transfer',transcript:'Care: Welcome.\nCustomer: private answer',recordingUrl:'https://example.invalid/private.wav'});
 expect(r.transcript).toBe(marker);expect(r.recordingUrl).toBeUndefined();expect(r.privacyNote).toBeTruthy();
});
it('sanitized transfer evidence keeps its safe prefix on the second storage pass',async()=>{
 const safe=safeCallResult({endedReason:'call-transfer',transcript:"Care: Please give the PNR.\nGenie: I'll connect the passenger now.\nPassenger: secret",recordingUrl:'https://example.invalid/private.wav'});
 const {t,caseId}=await fixture();const r=await t.mutation(internal.calls.reserve,{caseId,fixture:'identity'});
 await t.mutation(internal.calls.finish,{id:r!.callId,status:'completed',transcript:safe.transcript,reason:safe.reason,privacyNote:safe.privacyNote,costUsd:0,durationSeconds:60,patchIn:safe.patchIn});
 const record=await t.run(ctx=>ctx.db.get(r!.callId));expect(record!.transcript).toBe(`Care: Please give the PNR.\n${marker}`);expect(record!.recordingUrl).toBeUndefined();
});
it('a standalone transfer tool without a known text boundary keeps no conversation',()=>{
 const r=safeCallResult({transcript:'Care: Welcome.\nCare: Private follow-up',toolCalls:[{function:{name:'transferCall'}}],recordingUrl:'https://example.invalid/private.wav'});
 expect(r.transcript).toBe(marker);expect(r.recordingUrl).toBeUndefined();
});
it('an invalid structured event list discards otherwise valid transcript and recording',()=>{
 const r=safeCallResult({transcript:'Care: Please give the PNR.',events:'unparseable',recordingUrl:'https://example.invalid/private.wav'});
 expect(r.transcript).toBe('');expect(r.recordingUrl).toBeUndefined();expect(r.privacyNote).toBeTruthy();
});
it('admin attachment cannot restore a recording on a transferred call',async()=>{
 const {t,caseId}=await fixture();const r=await t.mutation(internal.calls.reserve,{caseId,fixture:'identity'});
 await t.mutation(internal.calls.finish,{id:r!.callId,status:'completed',transcript:"Care: Please give the PNR.\nGenie: I'll connect the passenger now.\nPassenger: secret",costUsd:0,durationSeconds:60,patchIn:true});
 await expect(t.mutation(internal.calls.attachRecording,{id:r!.callId,url:'https://example.invalid/recording.wav',transcript:'Care: Please give the PNR.'})).rejects.toThrow(/no private/);
});
it.each([undefined,null,'not JSON',{}, {transcript:12}, {transcript:'unparseable transcript'}, {artifact:{transcript:[]}}, {recordingUrl:'https://example.invalid/private.wav'}])('fails closed for absent/unparseable call evidence: %j',data=>{
 const r=safeCallResult(data);expect(r.transcript).toBe('');expect(r.recordingUrl).toBeUndefined();expect(r.privacyNote).toBeTruthy();
});
it('records missing transcript notice and refuses its recording at the storage boundary',async()=>{
 const {t,caseId}=await fixture();const r=await t.mutation(internal.calls.reserve,{caseId,fixture:'reference'});
 await t.mutation(internal.calls.finish,{id:r!.callId,status:'completed',transcript:'',recordingUrl:'https://example.invalid/private.wav',costUsd:0,durationSeconds:60,patchIn:false});
 const record=await t.run(ctx=>ctx.db.get(r!.callId));expect(record!.transcript).toBe('');expect(record!.recordingUrl).toBeUndefined();expect(record!.privacyNote).toBeTruthy();expect(await t.run(ctx=>ctx.db.query('inputs').collect())).toHaveLength(0);
});
it.each(['PIN','CVV','DOB','registered mobile','last four','security question'])('removes private ask and passenger answer for %s',ask=>{
 const r=safeCallResult({transcript:`Care: Please confirm your ${ask}.\nPassenger: private answer`,recordingUrl:'https://example.invalid/private.wav'});expect(r.transcript).not.toContain('private answer');expect(r.recordingUrl).toBeUndefined();
});
it('keeps ordinary PNR and reference fixture result, identity still requests patch-in',()=>{
 expect(safeTranscript('Care: Please give the PNR.')).toBe('Care: Please give the PNR.');
 const details={name:'Sample',pnr:'SAMPLE',amount:5400,date:'2026-10-12',code:'RG-SAMPLE'};
 const reference=safeCallResult({transcript:callFixture('reference',details)});expect(reference.patchIn).toBe(false);expect(reference.transcript).toContain('Airline reference DEMO-AIR-RG-SAMPLE');
 const identity=safeCallResult({transcript:callFixture('identity',details)});expect(identity.patchIn).toBe(true);expect(identity.transcript).toContain(marker);expect(identity.transcript).not.toContain('Genie to passenger');
});
it('uses second saved test phone as airline and first as passenger without altering list',async()=>{
 const {t,caseId}=await fixture();const r=await t.mutation(internal.calls.reserve,{caseId,fixture:'identity'});expect(r!.number).toBe('+910000000002');expect(r!.passengerNumber).toBe('+910000000001');expect(process.env.CALL_ALLOWLIST).toBe('+910000000001,+910000000002');
});
it('keeps one-number fallback and saves the explicit patch-in test limitation',async()=>{
 const {t,caseId}=await fixture('+910000000001');const r=await t.mutation(internal.calls.reserve,{caseId,fixture:'identity'});expect(r!.number).toBe('+910000000001');expect(r!.passengerNumber).toBe('+910000000001');const record=await t.run(ctx=>ctx.db.get(r!.callId));expect(record!.testPhoneNote).toBe('Only one test number is saved, so the patch-in cannot be tested.');
});
