import {expect,it} from 'vitest';
import {assistantOverrides} from './call-transport';
import {callFixture} from './calls';
import {checkTranscript} from './transcript-checker';
import {n4CurrentFixtures,n4KnownFacts} from './fixtures/n4-transcripts';
const details={name:'Sample Passenger',pnr:'SAMPLE',company:'Demo Air',mobile:'synthetic'};
it.each(n4CurrentFixtures())('current $id scenario passes all five checks',fixture=>{
 expect(checkTranscript(fixture.transcript,n4KnownFacts).passed).toBe(true);
});
it('carries the human-transition and bounded-question ledger into the call payload',()=>{
 const prompt=assistantOverrides({...details,bookingFacts:{From:'Delhi',To:'Mumbai','Name on ticket':'Sample Passenger'}}).model.messages[0].content;
 for(const rule of ['Conversation ledger','MENU is not a person','FIRST LIVE RESPONSE','one re-ask','Never restart the question list','Do not repeat a complete sentence','PRIVATE-CODE RULE WINS'])expect(prompt).toContain(rule);
 expect(prompt).toContain('"From":"Delhi"');expect(prompt).toContain('"To":"Mumbai"');
});
it.each(['reference','identity'] as const)('current %s simulation passes all transcript checks',kind=>{
 const transcript=callFixture(kind,{name:'Sample Passenger',pnr:'SAMPLE',amount:5400,date:'2026-10-25',code:'RG-N40001'});
 expect(checkTranscript(transcript,{pnr:'SAMPLE',name:'Sample Passenger',route:'Delhi to Mumbai'}).checks).toEqual({disclosure:true,noRepeatedSentences:true,noKnownFactQuestions:true,atMostOneReask:true,privateCodeSafety:true});
 if(kind==='identity'){expect(transcript).toContain('passenger will call');expect(transcript).not.toContain('connect the passenger');expect(transcript).not.toContain('Transfer:');}
});
