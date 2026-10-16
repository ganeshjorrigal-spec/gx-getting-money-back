/// <reference types="vite/client" />
import {it,expect,vi,afterEach} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {internal} from '../convex/_generated/api';
import {careRequestsCallback,confirmingCallMail} from './calls';
afterEach(()=>{vi.useRealTimers();vi.unstubAllEnvs();});
it.each(['Care: Please verify the passenger.', 'Care: Can I speak to the passenger?', 'Care: Identity check requested. No sensitive details retained.'])('care verification asks generate a callback step: %s',text=>expect(careRequestsCallback(text)).toBe(true));
it('no callback or reference is invented from ordinary care or Genie speech',()=>{
 expect(careRequestsCallback('Care: Refund pending.\nGenie: I will speak to the passenger.')).toBe(false);
 const withRef=confirmingCallMail('Demo Air',0,'Refund pending','live','RG-SAMPLE',{requested:true,passengerName:'Demo Passenger',reference:'REF-SAMPLE'});
 expect(withRef).toContain('Your agent asked that Demo Passenger call back to verify identity. Demo Passenger will call and quote reference REF-SAMPLE.');
 const noRef=confirmingCallMail('Demo Air',0,'Refund pending','live','RG-SAMPLE',{requested:true,passengerName:'Demo Passenger'});expect(noRef).toContain('Your agent asked that Demo Passenger call back to verify identity.');expect(noRef).not.toContain('quote reference');
 expect(confirmingCallMail('Demo Air',0,'Refund pending','live','RG-SAMPLE',{requested:false,reference:'REF-SAMPLE'})).not.toContain('Your agent asked');
});
it('confirming mail uses care evidence even when reader summary omits verification, and only reader reference',async()=>{
 vi.useFakeTimers();vi.stubEnv('TICKBACK_DEMO_ADDRESS','desk@example.invalid');
 const t=convexTest(schema,import.meta.glob('../convex/**/*.ts'));
 const id=await t.run(async ctx=>{
 const letterId=await ctx.storage.store(new Blob(['synthetic']));
 const caseId=await ctx.db.insert('cases',{code:'RG-CALLBACK',tokenHash:'synthetic',stage:'READY',refundType:'flight',ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',createdAt:1,updatedAt:1,facts:{reply:{summary:'Refund pending',reference:'READ-REF'}},chase:{active:true,name:'Demo Passenger',mobile:'',email:'passenger@example.invalid',authorisedAt:1,letterId,encryptedCaseToken:'synthetic'},demo:{kind:'flight',round:0,phase:'ready',now:'2026-10-16',expiresAt:Date.now()+86400000}});
 return ctx.db.insert('calls',{caseId,mode:'live',label:'Live call',status:'completed',company:'Demo Air',day:'2026-10-16',startedAt:1,createdAt:1,durationSeconds:1,costUsd:0.03,reservedUsd:0.3,authorisedAt:1,transcript:'Care: Can I speak to the passenger?'});
 });
 const draftId=await t.mutation(internal.calls.prepareConfirmation,{id});const draft=await t.run(ctx=>ctx.db.get(draftId!));expect(draft!.body).toContain('Your agent asked that Demo Passenger call back to verify identity. Demo Passenger will call and quote reference READ-REF.');
});
