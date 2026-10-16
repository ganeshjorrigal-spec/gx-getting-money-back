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
