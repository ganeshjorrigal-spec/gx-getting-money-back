import {useSyncExternalStore} from 'react';
import {getFunctionName} from 'convex/server';
import {sampleFlight} from '../../lib/flight-sample';
import {planFlight} from '../../lib/flight';
import {publicDemoPlan} from '../../lib/public-demo-plan';
let revision=0;const listeners=new Set<()=>void>();
export let route=new URLSearchParams(location.search).has('demo')?'start':'landing';
const facts={...sampleFlight(),airline:'Demo Air',bookedVia:'DemoTrips'};
const plan=publicDemoPlan(planFlight(facts,'2026-10-13',{},'desk@example.invalid'));
export let item:any={refundType:'flight',stage:'READY',facts,flightPlan:plan,name:'Demo Passenger',dueDate:'2026-10-16',chase:null,demo:{kind:'flight',chaseStory:true,chasePhase:'authority',phase:'ready',now:'2026-10-13',round:0}};
let call:any=null;
export let draft:any={_id:'fixture',createdAt:Date.now(),status:'ready',channel:'email',recipientRole:plan.nextPerson?.role,rung:plan.rung,to:plan.to,body:plan.body,subject:'Demo [RG-QATEST]'};
function emit(){revision++;listeners.forEach(fn=>fn());}
export function subscribe(fn:()=>void){listeners.add(fn);return ()=>listeners.delete(fn);}
export function snapshot(){return revision;}
export function navigate(url:string){route=url.includes('/c/')?'case':url.includes('/start')?'start':'landing';if(url.includes('?'))history.replaceState(null,'','?'+url.split('?')[1].split('#')[0]);else history.replaceState(null,'',location.pathname);emit();}
export const openCase=navigate;
export const makeToken=()=> 'x'.repeat(43),tokenHash=async()=> '0'.repeat(64),getDeviceId=()=> 'fixture-device-id',saveCase=()=>{},forgetCase=()=>{};
export const CASE_STORAGE_KEY='fixture-unused';
export function useQuery(ref:any){useSyncExternalStore(subscribe,snapshot,snapshot);const name=getFunctionName(ref);if(name==='cases:get')return item;if(name==='cases:drafts')return [draft];if(name==='chaseDemo:view')return {calls:call?[call]:[],events:[],mails:item.demo.round,replies:[],simulatedCalls:call?1:0,realCalls:0};return undefined;}
export function useMutation(ref:any){return async()=>{const name=getFunctionName(ref);if(name==='chaseDemo:create'||name==='demo:create'){if(name==='demo:create'){const selfPlan=planFlight(facts,'2026-10-13',{},'desk@example.invalid');item={...item,questions:[],factsConfirmedAt:null,flightPlan:selfPlan,demo:{...item.demo,chaseStory:false}};draft={...draft,to:selfPlan.to,cc:selfPlan.cc,body:selfPlan.body};}return {code:'RG-QATEST'};} if(name==='flights:confirm'){item={...item,factsConfirmedAt:1};emit();return;}
if(name==='chaseActions:authoriseDemo'){item={...item,chase:{active:true},demo:{...item.demo,chasePhase:'first_mail'}};emit();setTimeout(()=>{item={...item,facts:{...facts,reply:{...facts.reply,summary:'DemoTrips says the refund is pending with Demo Air.'}},demo:{...item.demo,chasePhase:'ready_call',round:1}};emit();},250);return;}
if(name==='chaseDemo:advance'){
if(item.demo.chasePhase==='ready_call'){item={...item,demo:{...item.demo,chasePhase:'call'}};emit();setTimeout(()=>{call={label:'Simulated demo call',durationSeconds:30,transcript:'Demo Air paid DemoTrips. Reference DEMO-REF.',readerOutput:{reply:{summary:'Airline gave the payment reference.',reference:'DEMO-REF'}}};item={...item,demo:{...item.demo,chasePhase:'confirm_ready'}};emit();},250);}
else if(item.demo.chasePhase==='confirm_ready'){item={...item,demo:{...item.demo,chasePhase:'confirm_mail'}};emit();setTimeout(()=>{item={...item,facts:{...facts,reply:{...facts.reply,summary:'Refund processed to the original payment method.',reference:'DEMO-REF'}},demo:{...item.demo,chasePhase:'bank',round:2}};emit();},250);}
else if(item.demo.chasePhase==='bank'){item={...item,demo:{...item.demo,now:item.dueDate}};emit();}else throw new Error('Invalid demo transition');return;}
if(name==='cases:answerCheckin'){if(item.demo.chasePhase!=='bank'||item.demo.now<item.dueDate)throw new Error('Finish rounds first');item={...item,stage:'CLOSED_LANDED'};emit();return;}throw new Error('No external action allowed in browser test: '+name);};}
export const useAction=useMutation;
export function escalationFixture(){item={...item,stage:'READY',flightPlan:{...plan,rung:3},demo:{...item.demo,chasePhase:'authority'}};draft={...draft,rung:3,recipientRole:'Grievance Officer'};route='case';emit();}


