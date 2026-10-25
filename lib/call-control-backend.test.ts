/// <reference types="vite/client" />
import {convexTest} from 'convex-test';
import {it,expect,vi,afterEach} from 'vitest';
import schema from '../convex/schema';
import {hashToken} from '../convex/lib/access';
import {internal} from '../convex/_generated/api';
const modules=import.meta.glob('../convex/**/*.ts');
afterEach(()=>{vi.unstubAllGlobals();vi.unstubAllEnvs();});
const args:{status:string|null;reference:string|null;date:string|null;money_holder:string|null;care_refused:boolean;callback_number:string|null;callback_hours:string|null}={status:null,reference:null,date:null,money_holder:null,care_refused:false,callback_number:null,callback_hours:null};
async function fixture(){
 vi.stubEnv('CONVEX_CLOUD_URL','https://abundant-marten-136.convex.cloud');vi.stubEnv('VAPI_API_KEY','synthetic');
 const t=convexTest(schema,modules),token='synthetic-call-token',tokenHash=await hashToken(token);
 const id=await t.run(async ctx=>{
  const letterId=await ctx.storage.store(new Blob(['fixture']));
  const caseId=await ctx.db.insert('cases',{code:'RG-SAMPLE',tokenHash:'synthetic',stage:'READY',refundType:'flight',ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:1,updatedAt:1,email:'sample@example.invalid',confirmedCaseEmail:'sample@example.invalid',emailConfirmedAt:1,facts:{airline:'Demo Air',pnr:'SAMPLE'},chase:{active:true,callsAuthorisedAt:1,name:'Sample Passenger',mobile:'+910000000001',email:'sample@example.invalid',authorisedAt:1,letterId,encryptedCaseToken:'synthetic'},demo:{kind:'flight',round:0,phase:'ready',now:'2026-10-26',expiresAt:Date.now()+86400000}});
  return ctx.db.insert('calls',{caseId,mode:'live',label:'Live call',status:'queued',company:'Demo Air',day:'2026-10-26',startedAt:1,createdAt:Date.now(),durationSeconds:0,costUsd:0,reservedUsd:0.3,authorisedAt:1,externalId:'synthetic-provider-call',finishControl:{tokenHash,closing:false,toolIds:[],missingDetails:[]}});
 });
 const payload=(messages:unknown[],facts=args)=>({message:{type:'tool-calls',call:{id:'synthetic-provider-call',metadata:{refundGenieCallId:id}},artifact:{messages},toolCallList:[{id:'synthetic-tool-1',function:{name:'finish_call',arguments:JSON.stringify(facts)}}]}});
 const post=(body:unknown,auth=token)=>t.fetch('/vapi/call-tool',{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${auth}`},body:JSON.stringify(body)});
 return {t,id,payload,post};
}
it('rejects missing/wrong authentication and mismatched provider call without outbound control',async()=>{
 const {post,payload}=await fixture(),fetcher=vi.fn();vi.stubGlobal('fetch',fetcher);
 expect((await post(payload([]),'wrong')).status).toBe(401);
 const wrong=payload([]);wrong.message.call.id='other-call';expect((await post(wrong)).status).toBe(401);
 expect(fetcher).not.toHaveBeenCalled();
});
it('missing facts never hang up and return exactly one next question',async()=>{
 const {t,id,post,payload}=await fixture(),fetcher=vi.fn();vi.stubGlobal('fetch',fetcher);
 const response=await post(payload([{role:'user',message:'Okay. I will check.'}]));expect(response.status).toBe(200);
 const body=await response.json();const result=JSON.parse(body.results[0].result);
 expect(result).toMatchObject({canFinish:false,nextQuestion:"What's the status?"});expect(fetcher).not.toHaveBeenCalled();
 const row=await t.run(ctx=>ctx.db.get(id));expect(row?.finishControl?.closing).toBe(false);
});
it('validated close speaks the complete recap then ends once; replay cannot end again',async()=>{
 const {t,id,post,payload}=await fixture();
 const fetcher=vi.fn().mockResolvedValueOnce(new Response(JSON.stringify({id:'synthetic-provider-call',status:'in-progress',monitor:{controlUrl:'https://control.vapi.ai/synthetic-provider-call/control'}}))).mockResolvedValueOnce(new Response('{}'));
 vi.stubGlobal('fetch',fetcher);
 const request=payload([{role:'user',message:'Refund processed. Reference REF-SAMPLE. DemoTrips has the money.'}],{...args,status:'Refund processed',reference:'REF-SAMPLE',money_holder:'DemoTrips'});
 expect((await post(request)).status).toBe(200);expect(fetcher).toHaveBeenCalledTimes(2);
 const control=JSON.parse(fetcher.mock.calls[1][1].body);expect(control).toMatchObject({type:'say',endCallAfterSpoken:true,interruptAssistantEnabled:false});expect(control.content).toMatch(/Thank you, I'll pass this to Sample Passenger\. Have a good day\.$/);
 await post(request);expect(fetcher).toHaveBeenCalledTimes(2);
 expect((await t.run(ctx=>ctx.db.get(id)))?.finishControl?.closing).toBe(true);
});
it('conversation events save running facts and actual spoken sentences without ending',async()=>{
 const {t,id,post,payload}=await fixture(),body=payload([]);const update={message:{type:'conversation-update',call:body.message.call,conversation:[{role:'bot',message:"What's the reference?"},{role:'user',message:'Reference REF-SAMPLE.'}]}};
 expect((await post(update)).status).toBe(200);
 const row=await t.run(ctx=>ctx.db.get(id));expect(row?.finishControl?.ledger.facts.reference).toBe('REF-SAMPLE');expect(row?.finishControl?.ledger.spoken).toContain("What's the reference?");
});
it('an ended or revoked call cannot use its old tool token',async()=>{
 const {t,id,post,payload}=await fixture();await t.run(ctx=>ctx.db.patch(id,{status:'completed'}));
 expect((await post(payload([]))).status).toBe(401);
});
it('untrusted control URL cannot receive credentials or a closing command',async()=>{
 const {post,payload}=await fixture();const fetcher=vi.fn().mockResolvedValue(new Response(JSON.stringify({id:'synthetic-provider-call',status:'in-progress',monitor:{controlUrl:'https://other.invalid/control'}})));vi.stubGlobal('fetch',fetcher);
 await post(payload([{role:'user',message:'Refund processed. Reference REF-SAMPLE. DemoTrips has the money.'}],{...args,status:'Refund processed',reference:'REF-SAMPLE',money_holder:'DemoTrips'}));
 expect(fetcher).toHaveBeenCalledTimes(1);
});
it('supervised call action uses a fresh assistant with only guarded tools and preserves the chosen voice',async()=>{
 const {t,id}=await fixture();const call=await t.run(ctx=>ctx.db.get(id));
 vi.stubEnv('CONVEX_SITE_URL','https://abundant-marten-136.convex.site');vi.stubEnv('CALL_MODE','live');vi.stubEnv('CALL_ALLOWLIST','+910000000001');vi.stubEnv('CALL_SUPERVISED_DEMO_CODE','RG-SAMPLE');vi.stubEnv('CALL_MAX_COST_USD','0.3');vi.stubEnv('CALL_DAILY_CAP_USD','1');vi.stubEnv('VAPI_ASSISTANT_ID','synthetic-assistant');vi.stubEnv('VAPI_PHONE_NUMBER_ID','synthetic-phone');vi.stubEnv('CALL_TRANSFER_ENABLED','false');
 const fetcher=vi.fn().mockResolvedValueOnce(new Response(JSON.stringify({voice:{provider:'azure',voiceId:'en-IN-PrabhatNeural',speed:1},transcriber:{provider:'soniox'},model:{toolIds:['free-end'],tools:[{type:'endCall'}]}}))).mockResolvedValueOnce(new Response(JSON.stringify({id:'synthetic-new-provider'})));
 vi.stubGlobal('fetch',fetcher);
 await t.action(internal.callActions.run,{caseId:call!.caseId,fixture:'reference',expectedMode:'live'});
 expect(fetcher).toHaveBeenCalledTimes(2);
 const body=JSON.parse(fetcher.mock.calls[1][1].body);expect(body.assistantId).toBeUndefined();expect(body.assistantOverrides).toBeUndefined();
 expect(body.assistant.voice.voiceId).toBe('en-IN-PrabhatNeural');expect(body.assistant.model.tools.map((x:{type:string})=>x.type)).toEqual(['dtmf','function']);expect(body.assistant.maxDurationSeconds).toBe(180);
 const calls=await t.run(ctx=>ctx.db.query('calls').withIndex('by_case',q=>q.eq('caseId',call!.caseId)).collect());
 const next=calls.find(c=>c.externalId==='synthetic-new-provider');expect(next?.finishControl?.tokenHash).toMatch(/^[a-f0-9]{64}$/);
});
