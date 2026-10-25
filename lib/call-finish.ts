import {safeTranscript} from './calls';

const fields=['status','reference','date','money_holder','callback_number','callback_hours'] as const;
type Field=typeof fields[number];
type Message={role?:unknown;message?:unknown;content?:unknown;time?:unknown};
export type CallLedger={branch:'normal'|'callback';facts:Partial<Record<Field,string>>;refusals:Partial<Record<Field,number>>;normalRefusals:number;spoken:string[]};
const normalize=(s:string)=>s.toLowerCase().replace(/\s+/g,' ').trim();
const refusal=/\b(?:cannot|can't|won't|will not|unable to|not allowed to|refuse to)\s+(?:give|share|provide|tell|disclose|confirm)|^no[.!]?$/i;
const passengerOnly=/only.{0,35}(?:passenger|customer)|(?:passenger|customer).{0,25}(?:must|has to).{0,20}verify/i;
const unhelpful=/^(?:okay|ok|sure|yes|please hold|hold on|one moment|i(?:'ll| will) check)[.! ]*$/i;
const privateValue=/\botp\b|password|card number|bank (?:account|details)|\bcvv\b|date of birth/i;
const labels:Record<Field,string>={status:'refund status',reference:'reference',date:'processing date',money_holder:'money holder',callback_number:'callback number',callback_hours:'callback hours'};
const questions:Record<Field,string>={status:"What's the status?",reference:"What's the reference?",date:'When was it processed?',money_holder:'Who has the money now?',callback_number:"What's the callback number?",callback_hours:'What are the hours?'};
function askedField(text:string,branch:CallLedger['branch']):Field|undefined{
 if(!/\?|please (?:share|give|provide)/i.test(text))return;
 if(/hours|what time/i.test(text))return 'callback_hours';
 if(/callback|what number|what.*(?:number|channel).*call/i.test(text))return 'callback_number';
 if(/reference|complaint number/i.test(text))return 'reference';
 if(branch==='callback')return;
 if(/status/i.test(text))return 'status';
 if(/when|what date/i.test(text))return 'date';
 if(/who|which company/i.test(text))return 'money_holder';
}
function supported(field:Field,value:unknown,care:string[]):value is string{
 if(typeof value!=='string'||value.trim().length<2||value.length>180||privateValue.test(value)||/^(?:unknown|none|n\/a|not available|pending details)$/i.test(value.trim()))return false;
 return care.some(text=>{
  if(unhelpful.test(text)||refusal.test(text)||privateValue.test(text)||!normalize(text).includes(normalize(value)))return false;
  if(field==='status')return /refund|status/i.test(text)&&/^(?:(?:the )?(?:refund|status)(?: is| was| has been)?:? )?(?:not processed|processed|paid|pending|initiated|approved|rejected|under review)[.!]?$/i.test(value)&&(!/\bnot\b/i.test(text)||/\bnot\b/i.test(value));
  if(field==='reference')return /^[a-z0-9][a-z0-9-]{2,50}$/i.test(value)&&/reference|complaint|case number/i.test(text);
  if(field==='date')return /^(?:\d{4}-\d{2}-\d{2}|\d{1,2} (?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)(?: \d{4})?)$/i.test(value)&&/refund|paid|process|transfer/i.test(text);
  if(field==='money_holder')return /^[A-Za-z][A-Za-z &'-]{1,60}$/.test(value)&&/money|refund|paid|holds/i.test(text)&&!text.includes('?');
  if(field==='callback_number')return /^\+?[\d ()-]{8,20}$/.test(value)&&text.split(/[.!?]/).some(part=>normalize(part).includes(normalize(value))&&/call|callback|contact|support/i.test(part));
  return /^\d{1,2}(?::\d{2})?\s*(?:am|pm)\s*(?:to|-|and)\s*\d{1,2}(?::\d{2})?\s*(?:am|pm)$/i.test(value)&&/hour|\bam\b|\bpm\b|\d:\d/i.test(text);
 });
}
function extracted(care:string[]):Partial<Record<Field,string>>{
 const out:Partial<Record<Field,string>>={};
 for(const text of care){
  const patterns:Partial<Record<Field,RegExp>>={
   status:/((?:refund|status)[^.!?]{0,70}(?:processed|initiated|pending|approved|paid|rejected|under review)[^.!?]{0,30})/i,
   reference:/(?:reference|complaint)(?: number)?\s*(?:is|:)?\s+([a-z0-9][a-z0-9-]{2,50})/i,
   date:/(\b\d{4}-\d{2}-\d{2}\b|\b\d{1,2} [A-Za-z]+(?: \d{4})?)/,
   money_holder:/([A-Z][A-Za-z ]{2,40}) (?:has|holds) (?:the )?(?:money|refund)/,
   callback_number:/(\+?\d[\d ()-]{6,18}\d)/,
   callback_hours:/(\d{1,2}(?::\d{2})?\s*(?:am|pm)\s*(?:to|-|and)\s*\d{1,2}(?::\d{2})?\s*(?:am|pm))/i,
  };
  for(const field of fields){const value=patterns[field]?.exec(text)?.[1]?.trim();if(supported(field,value,[text]))out[field]=value;}
 }
 return out;
}
export function decideCallFinish(args:Record<string,unknown>,source:unknown){
 const messages=(Array.isArray(source)?source:[]).slice(-80) as Message[];
 const ledger:CallLedger={branch:'normal',facts:{},refusals:{},normalRefusals:0,spoken:[]};
 const care:string[]=[],seenRefusals=new Set<string>();let asked:Field|undefined,botIndex=0;
 for(const m of messages){
  const text=typeof m.message==='string'?m.message:typeof m.content==='string'?m.content:'';
  if(!text||text.length>3000)continue;
  if(m.role==='bot'||m.role==='assistant'){
   botIndex++;asked=askedField(text,ledger.branch);
   const safe=safeTranscript(`Genie: ${text}`).replace(/^Genie:\s*/,'');
   ledger.spoken.push(...safe.split(/(?<=[.!?])\s+/).map(s=>s.trim()).filter(Boolean));continue;
  }
  if(m.role!=='user'&&m.role!=='care')continue;
  care.push(text);
  if(passengerOnly.test(text)&&ledger.branch==='normal'){ledger.branch='callback';asked=undefined;continue;}
  const key=`${botIndex}:${normalize(text)}`;
  if(asked&&refusal.test(text)&&!seenRefusals.has(key)){
   seenRefusals.add(key);ledger.refusals[asked]=Math.min(2,(ledger.refusals[asked]??0)+1);
   if(ledger.branch==='normal')ledger.normalRefusals=Math.min(2,ledger.normalRefusals+1);
  }
 }
 ledger.spoken=ledger.spoken.slice(-24);
 ledger.facts=extracted(care);
 const invalidClaim=fields.find(field=>args[field]!==undefined&&args[field]!==null&&!supported(field,args[field],care));
 for(const field of fields)if(supported(field,args[field],care))ledger.facts[field]=(args[field] as string).trim();
 const required:Field[]=ledger.branch==='callback'?['reference','callback_number','callback_hours']:['status','reference',...(ledger.facts.date||ledger.facts.money_holder?[]:['date' as const])];
 const missing=required.filter(field=>!ledger.facts[field]);
 const verifiedRefusal=args.care_refused===true&&(ledger.branch==='normal'?ledger.normalRefusals>=2:['reference','callback_number','callback_hours'].some(field=>(ledger.refusals[field as Field]??0)>=2));
 const canFinish=!invalidClaim&&(missing.length===0||verifiedRefusal);
 const missingDetails=missing.map(field=>labels[field]);
 const f=ledger.facts;
 const recap=ledger.branch==='callback'
  ?`The passenger will call back${f.reference?` with reference ${f.reference}`:''}${f.callback_number?` using ${f.callback_number}`:''}${f.callback_hours?` during ${f.callback_hours}`:''}.${missingDetails.length?` Care did not provide: ${missingDetails.join(', ')}.`:''}`
  :missing.length?`Care could not provide all the refund details. Missing: ${missingDetails.join(', ')}.`:`Care reported ${f.status}, reference ${f.reference}${f.date?`, dated ${f.date}`:`; ${f.money_holder} holds the money`}.`;
 return {canFinish,nextQuestion:canFinish?null:questions[invalidClaim??missing[0]],missingDetails,recap,ledger};
}
export function finishTool(url:string,token:string){
 const properties:Record<string,unknown>={};
 for(const field of ['status','reference','date','money_holder'])properties[field]={type:['string','null'],description:'Exact information supplied by care; null when missing.'};
 properties.care_refused={type:'boolean',description:'True only after two explicit refusals. The server verifies the evidence.'};
 for(const field of ['callback_number','callback_hours'])properties[field]={type:['string','null'],description:'Callback information supplied by care; null when missing.'};
 return {type:'function' as const,async:false,function:{name:'finish_call',description:'Ask the server whether this call may finish. Missing information returns one next question; it does not end the call.',strict:true,parameters:{type:'object',properties,required:Object.keys(properties),additionalProperties:false}},server:{url,headers:{Authorization:`Bearer ${token}`}}};
}
type Overrides={firstMessage:string;maxDurationSeconds:number;model:{provider:string;model:string;temperature?:number;messages:{role:string;content:string}[];tools:unknown[]}};
export function controlledAssistant(saved:Record<string,unknown>,overrides:Overrides,url:string,token:string){
 const keep:Record<string,unknown>&{voice?:unknown;transcriber?:unknown}={};
 for(const key of ['voice','transcriber','startSpeakingPlan','stopSpeakingPlan','backgroundSound','backgroundSpeechDenoisingPlan','firstMessageInterruptionsEnabled'])if(saved[key]!==undefined)keep[key]=saved[key];
 const instructions='Use finish_call to finish. Never claim missing facts or refusals. The server returns exactly one next question when more information is needed. Ask it once and wait. In the passenger-only branch collect reference, callback number, then hours. Do not press for refund facts. Two explicit refusals of one missing callback detail may close; the update names what is missing. The server speaks the recap and polite close. After approval say nothing else.';
 return {...keep,name:'Refund Genie supervised',firstMessage:overrides.firstMessage,maxDurationSeconds:Math.min(180,overrides.maxDurationSeconds),artifactPlan:{recordingEnabled:true},hooks:[],endCallPhrases:[],server:{url,headers:{Authorization:`Bearer ${token}`}},serverMessages:['conversation-update','tool-calls'],model:{provider:overrides.model.provider,model:overrides.model.model,temperature:0.2,messages:overrides.model.messages.map(m=>({...m,content:m.content.split('END-CALL RULE:')[0]+instructions})),toolIds:[],tools:[{type:'dtmf'},finishTool(url,token)]}};
}
