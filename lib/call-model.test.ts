import {expect,it,vi} from 'vitest';
import {assistantOverrides,startCall} from './call-transport';
const details={name:'Demo Passenger',pnr:'SAMPLE',company:'Demo Air',mobile:'synthetic-passenger'};
const transfer=(a:ReturnType<typeof assistantOverrides>)=>{const tool=a.model.tools.find(t=>t.type==='transferCall');if(!tool||!('destinations' in tool))throw new Error('Transfer missing');return tool.destinations[0].transferPlan.transferAssistant;};
it('does not duplicate the saved assistant End Call tool and keeps exactly one passenger transfer',()=>{
 const a=assistantOverrides(details,{CALL_TRANSFER_ENABLED:'true'}),types=['endCall',...a.model.tools.map(t=>t.type)];
 expect(new Set(types).size).toBe(types.length);
 expect(a.model.tools.filter(t=>t.type==='transferCall')).toHaveLength(1);
 expect(a.model.tools.map(t=>t.type)).toEqual(['dtmf','transferCall']);
});
it('call assistants default to Vapi OpenAI GPT-4.1 Mini, ignoring Gemini settings',()=>{
 const a=assistantOverrides(details,{CALL_TRANSFER_ENABLED:'true',GEMINI_MODEL:'gemini-fixture'});
 expect(a.model).toMatchObject({provider:'openai',model:'gpt-4.1-mini'});
 expect(transfer(a).model).toMatchObject({provider:'openai',model:'gpt-4.1-mini'});
});
it('both call assistants use the optional Vapi model settings',()=>{
 const a=assistantOverrides(details,{CALL_TRANSFER_ENABLED:'true',VAPI_MODEL_PROVIDER:'anthropic',VAPI_MODEL:'fixture-model'});
 expect(a.model).toMatchObject({provider:'anthropic',model:'fixture-model'});
 expect(transfer(a).model).toMatchObject({provider:'anthropic',model:'fixture-model'});
});
it('Google is used only when explicitly selected for calls',()=>{
 const a=assistantOverrides(details,{CALL_TRANSFER_ENABLED:'true',VAPI_MODEL_PROVIDER:'google',VAPI_MODEL:'fixture-model'});
 expect(a.model.provider).toBe('google');expect(transfer(a).model.provider).toBe('google');
});
it('instructions, first messages, tools, recording and time limits match the pre-change contract',()=>{
 const a=assistantOverrides(details,{CALL_TRANSFER_ENABLED:'true'});
 const {provider:mainProvider,model:mainModel,...main}=a.model;
 const {provider:transferProvider,model:transferModel,...handoff}=transfer(a).model;
 const stable={...a,model:{...main,tools:main.tools.map(tool=>'destinations' in tool?{...tool,destinations:tool.destinations.map(d=>({...d,transferPlan:{...d.transferPlan,transferAssistant:{...d.transferPlan.transferAssistant,model:handoff}}}))}:tool)}};
 expect(stable).toMatchSnapshot();
});
it('building default overrides still makes no request in simulated mode',async()=>{
 const request=vi.fn();const a=assistantOverrides(details,{CALL_TRANSFER_ENABLED:'true'});
 const result=await startCall({}, {assistantOverrides:a},'Care: Demo refund reference.',request);
 expect(result.mode).toBe('simulated');expect(request).not.toHaveBeenCalled();
});

it('opens with a refund-status question and explicitly stays the caller',()=>{
 const a=assistantOverrides(details,{CALL_TRANSFER_ENABLED:'true'});
 expect(a.firstMessage).toBe("Hello, I'm an AI assistant from Refund Genie, calling on behalf of Demo Passenger, with their permission, about a refund for PNR SAMPLE. This call is recorded. Could you tell me the current status of this refund?");
 expect(a.model.messages[0].content).toMatch(/^You are the caller\. The person who answers works at Demo Air customer care\. You are not customer care: never offer help, never ask how you can assist, never ask them for the PNR or booking details; give those only when they ask\./);
});

it('keeps known PNR, four bounded questions, identity-only transfer and all existing safety lines',()=>{
 const a=assistantOverrides(details,{CALL_TRANSFER_ENABLED:'true'}),prompt=a.model.messages[0].content;
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
  'Stop after 12 minutes including hold.'
 ])expect(prompt).toContain(phrase);
 expect(a.firstMessage).toMatch(/Could you tell me the current status of this refund\?$/);
});

it.each([undefined,'false','TRUE','1',' true '])('transfer is off unless the setting is exactly true: %s',value=>{
 const a=assistantOverrides(details,{CALL_TRANSFER_ENABLED:value});expect(a.model.tools.map(t=>t.type)).toEqual(['dtmf']);
 const prompt=a.model.messages[0].content;
 expect(prompt).toContain('The passenger will call you back to verify. Ask for the reference number, the number or channel to call back on, and the hours.');
 expect(prompt).not.toContain("I'll connect the passenger now");expect(prompt).not.toContain('If the passenger does not answer');expect(JSON.stringify(a)).not.toContain('transferPlan');
});
it.each([{}, {CALL_TRANSFER_ENABLED:'true'}])('both modes retain safety, known facts and four questions',env=>{
 const a=assistantOverrides(details,env),prompt=a.model.messages[0].content;
 for(const text of ['Known facts: the booking reference (PNR) is SAMPLE.','current refund status, reference number, processing date, who holds the money.','Never request, repeat, accept or send OTP, password, card or bank details.','Never accept vouchers/credit shells, cancel or change bookings, or pretend to be the passenger.','Stop after 12 minutes including hold.'])expect(prompt).toContain(text);
 expect(a.firstMessage).toMatch(/Could you tell me the current status of this refund\?$/);
});

it('both openings disclose AI, passenger permission and recording before the status question',()=>{
 for(const env of [{},{CALL_TRANSFER_ENABLED:'true'}]){
 const message=assistantOverrides(details,env).firstMessage;
 expect(message).toContain("I'm an AI assistant from Refund Genie");expect(message).toContain('Demo Passenger, with their permission');expect(message).toContain('This call is recorded.');expect(message).toMatch(/Could you tell me the current status of this refund\?$/);
 }
});

it('discloses AI and recording to each live person after a recorded menu',()=>{
 for(const env of [{},{CALL_TRANSFER_ENABLED:'true'}]){
 const prompt=assistantOverrides(details,env).model.messages[0].content;
 expect(prompt).toContain('The first message may play to a recorded menu.');
 expect(prompt).toContain("Hi, I'm Refund Genie, an AI assistant calling for the passenger Demo Passenger, with their permission. This call is recorded.");
 expect(prompt).toContain('Then ask for the refund status for PNR SAMPLE.');
 expect(prompt).toContain('Say it once per live person, again if you are moved to a new person.');
 }
});

it('listens to the full menu and waits for an answer beyond sure or okay',()=>{
 const prompt=assistantOverrides(details).model.messages[0].content;
 expect(prompt).toContain('Listen to the whole menu before pressing a key.');
 expect(prompt).toContain('After you ask a question, wait for the answer.');
 expect(prompt).toContain('If the answer is only sure or okay, wait a few seconds before asking again.');
});
