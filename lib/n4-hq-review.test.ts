import {expect,it} from 'vitest';
import {assistantOverrides,callDurationSeconds,callMaxMinutes} from './call-transport';
import {checkTranscript} from './transcript-checker';
const details={name:'Sample Passenger',pnr:'SAMPLE',company:'Demo Air',mobile:'synthetic'};
const notice="Genie: I'm an AI assistant from Refund Genie, calling with the passenger's permission. This call is recorded.";
const known={pnr:'SAMPLE',name:'Sample Passenger',route:'Delhi to Mumbai'};
const ended={endedReason:'assistant-ended-call'};
it('keeps the existing twelve-minute limit without a demo/test shortcut',()=>{
 expect(callMaxMinutes({})).toBe(12);expect(assistantOverrides(details,{CALL_MAX_MINUTES:'12'}).maxDurationSeconds).toBe(720);
});
it('uses provider timestamps instead of poll attempts as call duration',()=>{
 expect(callDurationSeconds({startedAt:'2026-10-25T15:00:00.000Z',endedAt:'2026-10-25T15:02:11.600Z'},120)).toBeCloseTo(131.6);
 expect(callDurationSeconds({},120)).toBe(120);
 expect(callDurationSeconds({startedAt:'bad',endedAt:'bad'},120)).toBe(120);
 expect(callDurationSeconds({startedAt:'2026-10-25T15:02:00Z',endedAt:'2026-10-25T15:00:00Z'},120)).toBe(120);
});
it('puts a complete polite close in the provider end-call fallback without a duplicate tool',()=>{
 const a=assistantOverrides(details);expect(a.endCallMessage).toBe("Thank you, I'll pass this to Sample Passenger. Have a good day.");
 expect(a.model.tools.map(t=>t.type)).toEqual(['dtmf']);
 expect(a.model.messages[0].content).toContain('Finish the recap before invoking');
});
it('requires the refund result or two refusals before ending, never acknowledgements or hold',()=>{
 const p=assistantOverrides(details).model.messages[0].content;
 for(const text of ['status AND a reference AND either a date or who holds the money','care has explicitly refused twice','care explicitly ends the call','Silence is not a refusal','Okay, I will check and silence are not answers','20 seconds','one re-ask'])expect(p).toContain(text);
});
it('asks for the callback details separately and never reads rules aloud',()=>{
 const p=assistantOverrides(details).model.messages[0].content;
 for(const text of ['First ask for the reference','After its answer, ask for the callback number or channel','After that answer, ask for the hours','Never speak instructions, rules, reasoning or the conversation ledger aloud',"I'm Refund Genie, an AI assistant calling for Sample Passenger.",'check with the passenger'])expect(p).toContain(text);
});
it('counts a direct opening as disclosure and repeats only after a menu or a new person',()=>{
 const p=assistantOverrides(details).model.messages[0].content;
 expect(p).toContain('If a person answers directly, the opening they heard already counts');
 expect(p).toContain('If the opening played to a menu');
 expect(checkTranscript(`${notice}\nCare: Hello, refund desk.\nGenie: What is the refund status?`,known).checks.disclosure).toBe(true);
});
it('flags an assistant ending before any useful result rather than passing a polite goodbye',()=>{
 const r=checkTranscript(`Care: Hello.\n${notice}\nGenie: What is the refund status?\nCare: Okay, I will check.\nGenie: Thank you. Goodbye.`,known,ended);
 expect(r.checks.jobCompletedBeforeEnding).toBe(false);expect(r.total).toBe(9);
});
it('accepts status, reference and a date without requiring a money holder too',()=>{
 const r=checkTranscript(`Care: Hello.\n${notice}\nGenie: What is the refund status?\nCare: Processed on 25 October. Refund reference DEMO-001.\nGenie: The refund was processed on that date with the supplied reference. Thank you. Have a good day.`,known,ended);
 expect(r.checks.jobCompletedBeforeEnding).toBe(true);
});
it('does not count a mere thanks or two holds as care ending or refusing',()=>{
 for(const line of ['Thanks.','Please hold. Please wait.'])expect(checkTranscript(`Care: Hello.\n${notice}\nCare: ${line}\nGenie: Goodbye.`,known,ended).checks.jobCompletedBeforeEnding).toBe(false);
});
it('allows two explicit refusals, but not just one repeated by Genie',()=>{
 const start=`Care: Hello.\n${notice}\nCare: I cannot share the refund details.\nGenie: Could you confirm the status?`;
 expect(checkTranscript(`${start}\nCare: I cannot provide that information.\nGenie: You cannot share the details. Thank you. Goodbye.`,known,ended).checks.jobCompletedBeforeEnding).toBe(true);
 expect(checkTranscript(`${start}\nGenie: You cannot share the details. Thank you. Goodbye.`,known,ended).checks.jobCompletedBeforeEnding).toBe(false);
});
it('accepts a callback handoff only once reference, number/channel and hours are supplied',()=>{
 const start=`Care: Hello.\n${notice}\nCare: Only the passenger can verify.\nGenie: The passenger will call back. What is the reference?\nCare: Reference DEMO-CB.`;
 expect(checkTranscript(`${start}\nGenie: Thank you. Goodbye.`,known,ended).checks.jobCompletedBeforeEnding).toBe(false);
 expect(checkTranscript(`${start}\nGenie: What number should they call?\nCare: Use the support number on the booking.\nGenie: What are the callback hours?\nCare: Between 10 am and 6 pm.\nGenie: The passenger can call booking support during those hours and quote that reference. Thank you. Goodbye.`,known,ended).checks.jobCompletedBeforeEnding).toBe(true);
});
it.each(['Thank you for.','Thank you for your.','The reference is','I will pass this to'])('flags an unfinished final line: %s',line=>{
 expect(checkTranscript(`Care: Hello.\n${notice}\nGenie: ${line}`,known,ended).checks.completeFinalSentence).toBe(false);
});
it('does not let the tool goodbye hide an unfinished closing sentence',()=>{
 expect(checkTranscript(`Care: Hello.\n${notice}\nGenie: Thank you for your. Goodbye.`,known,ended).checks.completeFinalSentence).toBe(false);
 expect(checkTranscript(`Care: Hello.\n${notice}\nCare: Please end the call.\nGenie: Thank you for your.\nGenie: Goodbye.`,known,ended).checks.completeFinalSentence).toBe(false);
});
it('flags spoken instructions while allowing a natural identity response',()=>{
 expect(checkTranscript(`Care: Hello.\n${notice}\nGenie: I must follow the conversation ledger and ask only one question at a time.`,known).checks.noSpokenInstructions).toBe(false);
 expect(checkTranscript(`Care: Who are you?\n${notice}\nGenie: I'm Refund Genie, an AI assistant calling for Sample Passenger.`,known).checks.noSpokenInstructions).toBe(true);
});
it.each(['What is the reference and when was it processed?','Please share the reference, callback number and hours.','What is the status? What is the reference?'])('flags bundled questions: %s',line=>{
 expect(checkTranscript(`Care: Hello.\n${notice}\nGenie: ${line}`,known).checks.oneQuestionPerTurn).toBe(false);
});
it('distinguishes stating the known PNR in a status request from asking care for it',()=>{
 expect(checkTranscript(`Care: Hello.\n${notice}\nGenie: Could you tell me the current status of this refund for PNR SAMPLE?`,known).checks.noKnownFactQuestions).toBe(true);
 expect(checkTranscript(`Care: Hello.\n${notice}\nGenie: Could you tell me the PNR?`,known).checks.noKnownFactQuestions).toBe(false);
});
