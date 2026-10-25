import {httpAction} from './_generated/server';
import {internal} from './_generated/api';
import type {Id} from './_generated/dataModel';
import {hashToken} from './lib/access';
import {decideCallFinish} from '../lib/call-finish';

const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
const object=(v:unknown):Record<string,any>=>v!==null&&typeof v==='object'&&!Array.isArray(v)?v as Record<string,any>:{};
export const handle=httpAction(async(ctx,request):Promise<Response>=>{
 try{
  const token=/^Bearer ([A-Za-z0-9_-]{16,100})$/.exec(request.headers.get('authorization')??'')?.[1];
  if(!token)return json({error:'Unauthorised'},401);
  const raw=await request.text();if(raw.length>256000)return json({error:'Request too large'},413);
  const message=object(object(JSON.parse(raw)).message),call=object(message.call);
  if(typeof call.id!=='string'||typeof call.metadata?.refundGenieCallId!=='string')return json({error:'Unauthorised'},401);
  const auth={id:call.metadata.refundGenieCallId as Id<'calls'>,externalId:call.id,tokenHash:await hashToken(token)};
  const access=await ctx.runQuery(internal.callControl.load,auth);if(!access)return json({error:'Unauthorised'},401);
  const messages=message.artifact?.messages??message.conversation??message.messages;
  if(!Array.isArray(messages))return json({error:'Conversation required'},400);
  if(message.type==='conversation-update'){
   if(messages.length)await ctx.runMutation(internal.callControl.progress,{...auth,ledger:decideCallFinish({},messages).ledger});
   return json({ok:true});
  }
  const tools=message.toolCallList??message.toolCalls;if(message.type!=='tool-calls'||!Array.isArray(tools)||!tools.length||tools.length>4)return json({error:'Unsupported event'},400);
  const results=[];
  for(const tool of tools){
   const fn=object(tool.function),toolId=String(tool.id??'');
   let args=object(fn.arguments);if(typeof fn.arguments==='string'){try{args=object(JSON.parse(fn.arguments));}catch{args={};}}
   if(fn.name!=='finish_call'||!toolId){results.push({toolCallId:toolId,result:'Unsupported tool. Keep listening.'});continue;}
   const decision=decideCallFinish(args,messages);
   const required=['status','reference','date','money_holder','care_refused','callback_number','callback_hours'];
   const schemaValid=required.every(k=>k==='care_refused'?typeof args[k]==='boolean':args[k]===null||typeof args[k]==='string');
   if(!schemaValid||!decision.canFinish){
    await ctx.runMutation(internal.callControl.progress,{...auth,ledger:decision.ledger});
    results.push({toolCallId:toolId,result:JSON.stringify({canFinish:false,nextQuestion:decision.nextQuestion??"What's the reference?",facts:decision.ledger.facts,spoken:decision.ledger.spoken})});continue;
   }
   const accepted=await ctx.runMutation(internal.callControl.claimClose,{...auth,toolId,ledger:decision.ledger,missingDetails:decision.missingDetails});
   if(!accepted){results.push({toolCallId:toolId,result:'Closing is already handled. Say nothing further.'});continue;}
   try{
    const response:Response=await fetch(`https://api.vapi.ai/call/${encodeURIComponent(call.id)}`,{headers:{Authorization:`Bearer ${process.env.VAPI_API_KEY}`},signal:AbortSignal.timeout(10000)});
    if(!response.ok)throw new Error('Provider read failed');const current=await response.json();
    const target=new URL(current.monitor?.controlUrl??'');
    if(current.id!==call.id||current.status!=='in-progress'||target.protocol!=='https:'||target.username||target.password||target.port||!/(^|\.)vapi\.ai$/i.test(target.hostname)||!target.pathname.includes(`/${call.id}/`))throw new Error('Control unavailable');
    const closing=`${decision.recap} Thank you, I'll pass this to ${access.name}. Have a good day.`;
    const ended=await fetch(target,{method:'POST',redirect:'error',headers:{'Content-Type':'application/json',Authorization:`Bearer ${process.env.VAPI_API_KEY}`},body:JSON.stringify({type:'say',content:closing,endCallAfterSpoken:true,interruptAssistantEnabled:false}),signal:AbortSignal.timeout(10000)});
    if(!ended.ok)throw new Error('Control refused');
    results.push({toolCallId:toolId,result:'The recap and full closing are queued. Say nothing further.'});
   }catch{results.push({toolCallId:toolId,result:'Closing could not be confirmed. Do not retry the tool. Keep listening.'});}
  }
  return json({results});
 }catch{return json({error:'Request could not be processed'},400);}
});
