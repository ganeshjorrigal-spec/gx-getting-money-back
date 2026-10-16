import {it,expect,vi} from "vitest";
import {callMode,callGate,callFixture,safeTranscript,callLabel,confirmingCallMail,needsPassenger} from "./calls";
import {startCall,safeCallResult,assistantOverrides} from "./call-transport";
const now=Date.parse("2026-10-12T11:00:00+05:30");
const gate={active:true,authorised:true,demo:true,mode:"simulated" as const,number:"+910000000001",mobile:"+910000000002",allowlist:"+910000000001,+910000000002",now,dayCount:0,dailyReserved:0,budget:1,reserve:0.3,official:false};
it("defaults to simulated and makes no Vapi request even with partial credentials",async()=>{const fetcher=vi.fn();expect(callMode({})).toBe("simulated");expect(callMode({CALL_MODE:"live",VAPI_API_KEY:"fixture"})).toBe("simulated");const r=await startCall({}, {}, "Care: Demo reference.",fetcher);expect(r.mode).toBe("simulated");expect(fetcher).not.toHaveBeenCalled();});
it("blocks missing calling authority and unlisted destination or patch-in",()=>{expect(callGate({...gate,authorised:false})).toMatch(/permission/);expect(callGate({...gate,allowlist:undefined})).toMatch(/test numbers/);expect(callGate({...gate,mobile:"+910000000003"})).toMatch(/test numbers/);expect(callGate(gate)).toBeNull();});
it("blocks Sunday, before 10, after 18 and a third call including failures",()=>{for(const date of ['2026-10-11T11:00:00+05:30','2026-10-12T09:59:00+05:30','2026-10-12T18:00:00+05:30'])expect(callGate({...gate,demo:false,official:true,now:Date.parse(date)})).toMatch(/Monday/);expect(callGate({...gate,dayCount:2})).toMatch(/Two calls/);});
it("blocks unknown official numbers and insufficient live spend reservation",()=>{expect(callGate({...gate,demo:false})).toMatch(/checked/);expect(callGate({...gate,mode:"live",dailyReserved:0.9})).toMatch(/budget/);});
it("identity fixture triggers patch-in while codes never reach storage, reader or confirming mail",()=>{const raw=callFixture("identity",{name:"Demo",pnr:"SAMPLE",amount:5400,date:"2026-10-12",code:"RG-SAMPLE"})+'\nPassenger: OTP 123456\nPassenger: 654321';const r=safeCallResult({status:"ended",transcript:raw,recordingUrl:"https://example.invalid/private.wav"});expect(r.patchIn).toBe(true);expect(r.recordingUrl).toBeUndefined();expect(r.transcript).toContain("Passenger was connected. Nothing after this point is kept.");expect(r.transcript).not.toMatch(/123456|654321/);expect(confirmingCallMail('Demo Air',now,raw,'simulated','RG-SAMPLE')).not.toMatch(/123456|654321/);expect(safeTranscript(raw)).not.toMatch(/123456|654321/);});
it("API refusal is a failed outcome and keeps its technical reason",async()=>{const fetcher=vi.fn().mockResolvedValue({ok:false,status:400,json:async()=>({message:"outbound-authentication-required"})});const r=await startCall({CALL_MODE:"live",VAPI_API_KEY:"fixture",VAPI_PHONE_NUMBER_ID:"fixture"},{},"",fetcher);expect(r).toMatchObject({mode:"live",status:"failed",reason:"outbound-authentication-required"});expect(safeCallResult({endedReason:"outbound-authentication-required"}).status).toBe("failed");});
it("every mode has an honest label and a 25-minute maximum with short warm transfer",()=>{expect(callLabel('simulated')).toBe('Simulated demo call');expect(callLabel('live')).toBe('Live call');const a=assistantOverrides({name:'Demo',pnr:'SAMPLE',company:'Demo Air',mobile:gate.mobile},{CALL_TRANSFER_ENABLED:'true'});expect(a.maxDurationSeconds).toBe(1500);expect(a.model.tools.find(t=>t.type==='transferCall')).toMatchObject({type:'transferCall',destinations:[{transferPlan:{transferAssistant:{maxDurationSeconds:15}}}]});});

it('demo calls allow 09:00 through 20:59 every day, still only to listed test phones',()=>{
 for(const date of ['2026-10-11T09:00:00+05:30','2026-10-11T20:59:59+05:30','2026-10-12T18:00:00+05:30'])expect(callGate({...gate,mode:'live',now:Date.parse(date)})).toBeNull();
 for(const date of ['2026-10-11T08:59:59+05:30','2026-10-11T21:00:00+05:30'])expect(callGate({...gate,mode:'live',now:Date.parse(date)})).toMatch(/09:00 to 21:00/);
 expect(callGate({...gate,now:Date.parse('2026-10-11T20:00:00+05:30'),number:'+910000000003'})).toMatch(/test numbers/);
});
it('real-company hours retain Monday to Saturday 10:00 through 17:59',()=>{
 for(const date of ['2026-10-12T10:00:00+05:30','2026-10-17T17:59:59+05:30'])expect(callGate({...gate,demo:false,official:true,now:Date.parse(date)})).toBeNull();
});

it.each([undefined,'25','abc','20','22.5'])('invalid or unset demo end hour defaults to 21: %s',value=>{
 expect(callGate({...gate,demoEndHour:value,now:Date.parse('2026-10-16T21:00:00+05:30')})).toMatch(/09:00 to 21:00/);
});
it('demo end hour 23 permits 22:30, but closes at 23:00; 24 permits 23:59',()=>{
 expect(callGate({...gate,demoEndHour:'23',now:Date.parse('2026-10-16T22:30:00+05:30')})).toBeNull();
 expect(callGate({...gate,demoEndHour:'23',now:Date.parse('2026-10-16T23:00:00+05:30')})).toMatch(/09:00 to 23:00/);
 expect(callGate({...gate,demoEndHour:'24',now:Date.parse('2026-10-16T23:59:59+05:30')})).toBeNull();
 expect(callGate({...gate,demoEndHour:'24',now:Date.parse('2026-10-17T08:59:59+05:30')})).toMatch(/09:00 to 24:00/);
});
it('a later demo setting does not extend real-company hours',()=>{
 expect(callGate({...gate,demo:false,official:true,demoEndHour:'23',now:Date.parse('2026-10-16T18:00:00+05:30')})).toMatch(/Monday to Saturday, 10:00 to 18:00/);
});

it('real no-transfer gate allows only the listed checked care number, not a listed passenger requirement',()=>{
 const real={...gate,demo:false,official:true,transfer:false,mobile:'+910000000009'};
 expect(callGate(real)).toBeNull();expect(callGate({...real,number:'+910000000009'})).toMatch(/saved test numbers/);
 expect(callGate({...real,official:false})).toMatch(/checked/);expect(callGate({...real,transfer:true})).toMatch(/saved test numbers/);
 expect(callGate({...real,demo:true})).toMatch(/saved test numbers/);
});

it('real hours override allows Saturday night and Sunday without bypassing other guards',()=>{
 const real={...gate,demo:false,official:true,realAnyHour:true};
 for(const date of ['2026-10-17T01:00:00+05:30','2026-10-18T11:00:00+05:30'])expect(callGate({...real,now:Date.parse(date)})).toBeNull();
 expect(callGate({...real,authorised:false})).toMatch(/permission/);
 expect(callGate({...real,allowlist:undefined})).toMatch(/test numbers/);
 expect(callGate({...real,official:false})).toMatch(/checked/);
 expect(callGate({...real,dayCount:2})).toMatch(/Two calls/);
 expect(callGate({...real,mode:'live',dailyReserved:1})).toMatch(/budget/);
});
it('real override never extends demo hours',()=>{
 expect(callGate({...gate,realAnyHour:true,now:Date.parse('2026-10-17T01:00:00+05:30')})).toMatch(/Demo calls run/);
});

it('consented registered/booking contact requests continue with contact masked',()=>{
 for(const request of ['registered mobile number','booking mobile','registered email address','booking email']){
 const raw=`Care: Please confirm your ${request} to verify the booking.\nGenie: +910000000012, alice@example.invalid\nCare: Refund reference REF-DEMO.`;
 expect(safeTranscript(raw)).not.toContain('REF-DEMO');
 const privacy={shareBookingContact:true},safe=safeTranscript(raw,privacy);
 expect(safe).toContain('REF-DEMO');expect(safe).toContain('[mobile ending 12]');expect(safe).toContain('a***@example.invalid');expect(safe).not.toContain('alice@');expect(safe).not.toContain('+910000000012');
 expect(needsPassenger(raw,privacy)).toBe(false);
 }
});
it.each(['OTP','one-time code','verification code','card number','bank details','password','PIN','CVV','date of birth'])('consent never allows a private request: %s',request=>{
 const raw=`Care: Please confirm your registered email and ${request}.\nGenie: secret\nCare: after`;
 expect(safeTranscript(raw,{shareBookingContact:true})).not.toContain('secret');expect(needsPassenger(raw,{shareBookingContact:true})).toBe(true);
});
