/// <reference types="vite/client" />
import {it,expect,vi,afterEach} from 'vitest';
import {convexTest} from 'convex-test';
import schema from '../convex/schema';
import {api} from '../convex/_generated/api';
import {hashToken} from '../convex/lib/access';
import {demoSamples,demoFactValue,demoSampleFields,demoIntakeFacts} from './demo-intake';
import {planFlight,flightDue} from './flight';
afterEach(()=>vi.unstubAllEnvs());
async function fixture(){
 vi.stubEnv('TICKBACK_DEMO_ADDRESS','desk@example.invalid');
 const t=convexTest(schema,import.meta.glob('../convex/**/*.ts')),token='x'.repeat(43),facts=demoIntakeFacts('2026-10-15');
 const id=await t.run(async ctx=>ctx.db.insert('cases',{code:'RG-QATEST',tokenHash:await hashToken(token),stage:'NEED_INFO',refundType:'flight',route:'NEED_INFO',facts,questions:planFlight(facts,'2026-10-15').questions,ladderLevel:0,draftsShown:0,tier:'free_check',paidState:'none',email:'passenger@example.invalid',createdAt:1,updatedAt:1,demo:{kind:'flight',chaseStory:true,intakeRequired:true,emailRequired:true,emailConfirmedAt:1,chasePhase:'authority',round:0,phase:'ready',now:'2026-10-15',expiresAt:Date.now()+86400000}}));
 return {t,id,args:{code:'RG-QATEST',token}};
}
it('each sample is valid and the sample list contains no personal fields',()=>{
 const values=demoSamples('2026-10-15');for(const field of demoSampleFields)expect(demoFactValue(field,String(values[field]),'2026-10-15')).toBe(values[field]);
 expect(demoSampleFields).not.toContain('name');expect(demoSampleFields).not.toContain('email');expect(demoSampleFields).not.toContain('phone');
 expect(()=>demoFactValue('pnr','12345678','2026-10-15')).toThrow();expect(()=>demoFactValue('cancellationDate','2026-10-16','2026-10-15')).toThrow();expect(()=>demoFactValue('amountPaid','-1','2026-10-15')).toThrow();
});
it('typed date and amount reach the saved case, same planner, and demo-only mail',async()=>{
 const {t,id,args}=await fixture();
 await t.mutation(api.flights.answer,{...args,id:'cancellationDate',value:'2026-09-01'});
 await t.mutation(api.flights.answer,{...args,id:'amountPaid',value:'6240'});
 await t.mutation(api.flights.answer,{...args,id:'paymentMethod',value:'credit_card'});
 await t.mutation(api.flights.confirm,{...args,pnr:'ABC123',bookingId:'MADE-UP',name:'Fixture Passenger',flightName:'Pune to Delhi',contact:''});
 const item=(await t.run(ctx=>ctx.db.get(id)))!;expect(item.facts).toMatchObject({cancellationDate:'2026-09-01',amountPaid:6240,pnr:'ABC123',bookingId:'MADE-UP',flightName:'Pune to Delhi'});
 expect(item.amountPaise).toBe(624000);expect(item.dueDate).toBe(flightDue(item.facts).date);expect(item.email).toBe('passenger@example.invalid');expect(item.name).toBe('Fixture Passenger');
 const drafts=await t.run(ctx=>ctx.db.query('drafts').withIndex('by_case',q=>q.eq('caseId',id)).take(5));expect(drafts).toHaveLength(1);expect(drafts[0].body).toContain('6240');expect(drafts[0].body).toContain('ABC123');expect(drafts[0].to).toContain('desk');expect(drafts[0].body).not.toMatch(/IndiGo|MakeMyTrip|SpiceJet|Goibibo/);
});
it('all samples leave personal fields and email unchanged; roles cannot be edited',async()=>{
 const {t,id,args}=await fixture();await t.mutation(api.chaseDemo.fillSamples,args);const item=(await t.run(ctx=>ctx.db.get(id)))!;
 expect(item.facts).toMatchObject({airline:'Demo Air',bookedVia:'DemoTrips',pnr:'SAMPLE',paymentMethod:'unknown'});expect(item.name).toBeUndefined();expect(item.contact).toBeUndefined();expect(item.email).toBe('passenger@example.invalid');
 await expect(t.mutation(api.flights.editFact,{...args,field:'airline',value:'IndiGo'})).rejects.toThrow('Demo roles are fixed');
 await expect(t.mutation(api.flights.confirm,{...args,pnr:'SAMPLE',name:'Fixture',flightName:'Pune'})).rejects.toThrow('Complete the booking');
});
it('changing email requires a new confirmation and preserves entered facts',async()=>{
 const {t,id,args}=await fixture();await t.mutation(api.chaseDemo.fillSamples,args);await t.mutation(api.chaseDemo.changeEmail,args);
 const item=(await t.run(ctx=>ctx.db.get(id)))!;expect(item.email).toBeUndefined();expect(item.demo!.emailConfirmedAt).toBeUndefined();expect(item.facts.pnr).toBe('SAMPLE');
 await expect(t.mutation(api.chaseDemo.fillSamples,args)).rejects.toThrow();
});
