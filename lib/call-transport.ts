import { callMode, safeTranscript, needsPassenger, PRIVATE_CALL_CUTOFF, FAILED_TRANSFER_CUTOFF, MISSING_CALL_NOTE, type CallMode } from "./calls";
type Env=Record<string,string|undefined>;
export async function startCall(env:Env,body:unknown,fixture:string,request:typeof fetch=fetch):Promise<{mode:CallMode;status:"completed"|"queued"|"failed";transcript:string;externalId?:string;reason?:string;privacyNote?:string}> {
 const mode=callMode(env);
 if(mode==="simulated")return {mode,...safeCallResult({transcript:fixture})};
 try {const r=await request("https://api.vapi.ai/call",{method:"POST",headers:{Authorization:`Bearer ${env.VAPI_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify(body),signal:AbortSignal.timeout(15000)});const data=await r.json();if(!r.ok||!data.id)return {mode,status:"failed",transcript:"",reason:typeof data.message==="string"?safeTranscript(data.message).slice(0,500):`Call API refused (${r.status})`};return {mode,status:"queued",transcript:"",externalId:data.id};}catch{return {mode,status:"failed",transcript:"",reason:"Call connection unavailable"};}
}
export function assistantOverrides(details:{name:string;pnr:string;company:string;mobile:string},env:Env={}) {
 // The saved assistant supplies endCall. Its read-only tool check found no DTMF tool.
 const provider=env.VAPI_MODEL_PROVIDER?.trim()||"openai",model=env.VAPI_MODEL?.trim()||"gpt-4.1-mini";
 const summary=`I reached ${details.company} about your refund for PNR ${details.pnr}. They need to speak to you to verify identity. I have shared no private code.`;
 const transferAssistant={firstMessage:summary,maxDurationSeconds:15,model:{provider,model,messages:[{role:"system",content:"Give only the short refund summary. Connect only if the passenger accepts. Call transferCancel for no answer, voicemail, refusal or any private verification details. Never read codes."}]}};
 const transfer={type:"transferCall",destinations:[{type:"number",number:details.mobile,description:"The authorised passenger, only for identity verification",message:"I'll connect the passenger now.",transferPlan:{mode:"warm-transfer-experimental",transferAssistant,fallbackPlan:{endCallEnabled:true,message:"The passenger will call back. Thank you."}}}]};
 return {firstMessage:`Hello, I'm an AI assistant from Refund Genie, calling on behalf of ${details.name}, with their permission, about a refund for PNR ${details.pnr}. Could you tell me the current status of this refund?`,maxDurationSeconds:1500,artifactPlan:{recordingEnabled:true},model:{provider,model,messages:[{role:"system",content:`You are the caller. The person who answers works at ${details.company} customer care. You are not customer care: never offer help, never ask how you can assist, never ask them for the PNR or booking details; give those only when they ask. Known facts: the booking reference (PNR) is ${details.pnr}. You already have it. Never ask for it. If care asks for it, say it. You are Refund Genie Recovery Agent. Speak English or Hindi as needed. Learn four things, asking one at a time: current refund status, reference number, processing date, who holds the money. Once you have all four, thank them and end the call. If care cannot answer one after two tries, move on. Use only PNR and confirmed booking facts. Never request, repeat, accept or send OTP, password, card or bank details. Never accept vouchers/credit shells, cancel or change bookings, or pretend to be the passenger. Do not guess menu keys: listen then use dtmf. Call transferCall only if care says they need to verify the passenger's identity or speak to the passenger. Never for silence, hesitation, a slow answer or a pause. When identity verification is required, say I'll connect the passenger now and use transferCall. If the passenger does not answer, end politely and say they will call back. Stop after 25 minutes including hold. Company: ${details.company}.`}],tools:[{type:"dtmf"},transfer]}};
}
const object=(value:unknown):Record<string,unknown>|undefined=>value!==null&&typeof value==='object'&&!Array.isArray(value)?value as Record<string,unknown>:undefined;
const transferEvent=(value:unknown):boolean=>{
 const entry=object(value);if(!entry)return false;
 // Inspect event/tool names, never infer a transfer from arbitrary conversation text.
 if(['type','name'].some(key=>typeof entry[key]==='string'&&/transfer|forwarded.call/i.test(entry[key] as string)))return true;
 return ['function','tool','toolCall','toolCalls','tool_calls','call','message'].some(key=>Array.isArray(entry[key])?(entry[key] as unknown[]).some(transferEvent):transferEvent(entry[key]));
};
// Only explicit transfer-answer events count. A tool request or patchIn flag does not.
const passengerAnswerEvent=(value:unknown):boolean=>{
 const event=object(value);if(!event)return false;
 return event.type==='transfer-destination-answered'||
  event.type==='transfer-update'&&['answered','connected'].includes(String(event.status));
};
export function safeCallResult(value:unknown) {
 let data=object(value);
 if(typeof value==='string'){try{data=object(JSON.parse(value));}catch{/* Safe default below. */}}
 if(object(data?.message)?.type==='end-of-call-report')data=object(data?.message);
 const artifact=object(data?.artifact),source=artifact?.transcript??data?.transcript;
 // Vapi user is the original phone-answerer, not the transferred passenger.
 // Retain the existing fail-closed rules for missing transfer boundaries.
 const roleName=(role:unknown)=>role==='assistant'||role==='bot'?'Genie':role==='user'?'Care':role==='passenger'?'Passenger':undefined;
 const structured=Array.isArray(source)?source.map(entry=>{const row=object(entry),label=roleName(row?.role);return label&&typeof row?.message==='string'?`${label}: ${row.message}`:null;}):undefined;
 const normalized=structured?.every(line=>line!==null)?structured.join('\n'):source;
 const vapiLabels=!!artifact&&typeof normalized==='string';
 const raw=vapiLabels?(normalized as string).replace(/^(AI|Assistant|User|Customer)\s*:/gim,(_,role:string)=>/AI|Assistant/i.test(role)?'Genie:':'Care:'):normalized;
 const reason=typeof data?.endedReason==='string'?data.endedReason:'';
 const failed=!!reason&&/error|failed|authentication|unavailable|not.answer|busy|rejected|max.duration|stopped/i.test(reason);
 const base={status:failed?'failed' as const:'completed' as const,reason:safeTranscript(reason).slice(0,500),cost:typeof data?.cost==='number'&&Number.isFinite(data.cost)?Math.max(0,data.cost):0};
 const missing=()=>({...base,transcript:'',recordingUrl:undefined,patchIn:false,passengerAnswered:false,privacyNote:MISSING_CALL_NOTE});
 if(!data||typeof raw!=='string'||!raw.trim()||raw.length>24000||data.artifact!==undefined&&!artifact||!(/^(?:Care|Genie|Assistant|AI|User|Customer|Passenger|Menu|Transfer)\s*:/im.test(raw)||raw.includes(PRIVATE_CALL_CUTOFF)||raw.includes(FAILED_TRANSFER_CUTOFF)))return missing();
 const streams=[artifact?.messages,data.messages,data.events,artifact?.events].filter(v=>v!==undefined);
 if(streams.some(stream=>!Array.isArray(stream)||(stream as unknown[]).some(v=>!object(v))))return missing();
 const passengerAnswered=data.passengerAnswered===true||(streams as unknown[][]).some(stream=>stream.some(passengerAnswerEvent));
 const failedForward=reason.startsWith('call.forwarding.')&&!passengerAnswered;
 let boundary=raw.length,transfer=false,unknownBoundary=false;
 for(const stream of streams as Record<string,unknown>[][]) {
  const index=stream.findIndex(transferEvent);if(index<0)continue;transfer=true;
  // Locate the last preceding turn in the original transcript. If it cannot be
  // located, do not guess which part belongs to the private conversation.
  let cursor=0,anchored=false;
  for(const entry of stream.slice(0,index)) {
   if(entry.role==='system')continue;
   const text=entry.message??entry.content;
   if(typeof text!=='string'||!text.trim())continue;
   const at=raw.indexOf(text,cursor);if(at<0){anchored=false;break;}
   cursor=at+text.length;anchored=true;
  }
  if(index===0)boundary=0;
  else if(anchored)boundary=Math.min(boundary,cursor);
  else unknownBoundary=true;
 }
 if(transferEvent(data)){transfer=true;unknownBoundary=true;}
 const explicit=/^(?:Passenger was connected\. Nothing after this point is kept\.|We could not reach the passenger\. Nothing private was shared\.|Transfer\s*:|.*\b(?:I'll|I will|I am going to) connect the passenger\b)/im.exec(raw);
 if(explicit){transfer=true;boundary=Math.min(boundary,explicit.index);}
 if(/transfer|forwarded.call|call\.forwarding\./i.test(reason)){transfer=true;if(!explicit&&boundary===raw.length)unknownBoundary=true;}
 if(data.patchIn===true&&!raw.includes(PRIVATE_CALL_CUTOFF)&&!explicit&&boundary===raw.length){transfer=true;unknownBoundary=true;}
 if(unknownBoundary)boundary=0;
 const cut=failedForward?FAILED_TRANSFER_CUTOFF:PRIVATE_CALL_CUTOFF;
 const transcript=(transfer?`${safeTranscript(raw.slice(0,boundary).trimEnd())}${boundary?'\n':''}${cut}`:safeTranscript(raw)).replaceAll(PRIVATE_CALL_CUTOFF,cut);
 const privateCall=transfer||needsPassenger(raw)||data.patchIn===true;
 const url=artifact?.recordingUrl??data.recordingUrl;
 return {...base,transcript,recordingUrl:!privateCall&&typeof url==='string'&&/^https:\/\//.test(url)?url:undefined,patchIn:privateCall,passengerAnswered,privacyNote:unknownBoundary?'Transfer boundary unavailable. No conversation or recording link is kept.':privateCall?'Private verification or passenger connection detected. No recording link is kept.':undefined};
}
