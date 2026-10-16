import {expect,it,vi} from 'vitest';
import {assistantOverrides,startCall} from './call-transport';
const details={name:'Demo Passenger',pnr:'SAMPLE',company:'Demo Air',mobile:'synthetic-passenger'};
const transfer=(a:ReturnType<typeof assistantOverrides>)=>{const tool=a.model.tools.find(t=>t.type==='transferCall');if(!tool||!('destinations' in tool))throw new Error('Transfer missing');return tool.destinations[0].transferPlan.transferAssistant;};
it('does not duplicate the saved assistant End Call tool and keeps exactly one passenger transfer',()=>{
 const a=assistantOverrides(details),types=['endCall',...a.model.tools.map(t=>t.type)];
 expect(new Set(types).size).toBe(types.length);
 expect(a.model.tools.filter(t=>t.type==='transferCall')).toHaveLength(1);
 expect(a.model.tools.map(t=>t.type)).toEqual(['dtmf','transferCall']);
});
it('call assistants default to Vapi OpenAI GPT-4.1 Mini, ignoring Gemini settings',()=>{
 const a=assistantOverrides(details,{GEMINI_MODEL:'gemini-fixture'});
 expect(a.model).toMatchObject({provider:'openai',model:'gpt-4.1-mini'});
 expect(transfer(a).model).toMatchObject({provider:'openai',model:'gpt-4.1-mini'});
});
it('both call assistants use the optional Vapi model settings',()=>{
 const a=assistantOverrides(details,{VAPI_MODEL_PROVIDER:'anthropic',VAPI_MODEL:'fixture-model'});
 expect(a.model).toMatchObject({provider:'anthropic',model:'fixture-model'});
 expect(transfer(a).model).toMatchObject({provider:'anthropic',model:'fixture-model'});
});
it('Google is used only when explicitly selected for calls',()=>{
 const a=assistantOverrides(details,{VAPI_MODEL_PROVIDER:'google',VAPI_MODEL:'fixture-model'});
 expect(a.model.provider).toBe('google');expect(transfer(a).model.provider).toBe('google');
});
it('instructions, first messages, tools, recording and time limits match the pre-change contract',()=>{
 const a=assistantOverrides(details);
 const {provider:mainProvider,model:mainModel,...main}=a.model;
 const {provider:transferProvider,model:transferModel,...handoff}=transfer(a).model;
 const stable={...a,model:{...main,tools:main.tools.map(tool=>'destinations' in tool?{...tool,destinations:tool.destinations.map(d=>({...d,transferPlan:{...d.transferPlan,transferAssistant:{...d.transferPlan.transferAssistant,model:handoff}}}))}:tool)}};
 expect(stable).toMatchSnapshot();
});
it('building default overrides still makes no request in simulated mode',async()=>{
 const request=vi.fn();const a=assistantOverrides(details);
 const result=await startCall({}, {assistantOverrides:a},'Care: Demo refund reference.',request);
 expect(result.mode).toBe('simulated');expect(request).not.toHaveBeenCalled();
});

it('opens with a refund-status question and explicitly stays the caller',()=>{
 const a=assistantOverrides(details);
 expect(a.firstMessage).toBe("Hello, I'm an AI assistant from Refund Genie, calling on behalf of Demo Passenger, with their permission, about a refund for PNR SAMPLE. Could you tell me the current status of this refund?");
 expect(a.model.messages[0].content).toMatch(/^You are the caller\. The person who answers works at Demo Air customer care\. You are not customer care: never offer help, never ask how you can assist, never ask them for the PNR or booking details; give those only when they ask\./);
});

it('keeps known PNR, four bounded questions, identity-only transfer and all existing safety lines',()=>{
 const a=assistantOverrides(details),prompt=a.model.messages[0].content;
 for(const phrase of [
  'Known facts: the booking reference (PNR) is SAMPLE. You already have it. Never ask for it. If care asks for it, say it.',
  'Learn four things, asking one at a time: current refund status, reference number, processing date, who holds the money.',
  'Once you have all four, thank them and end the call. If care cannot answer one after two tries, move on.',
  "Call transferCall only if care says they need to verify the passenger's identity or speak to the passenger. Never for silence, hesitation, a slow answer or a pause.",
  'Use only PNR and confirmed booking facts.',
  'Never request, repeat, accept or send OTP, password, card or bank details.',
  'Never accept vouchers/credit shells, cancel or change bookings, or pretend to be the passenger.',
  'Do not guess menu keys: listen then use dtmf.',
  "When identity verification is required, say I'll connect the passenger now and use transferCall.",
  'If the passenger does not answer, end politely and say they will call back.',
  'Stop after 25 minutes including hold.'
 ])expect(prompt).toContain(phrase);
 expect(a.firstMessage).toMatch(/Could you tell me the current status of this refund\?$/);
});
