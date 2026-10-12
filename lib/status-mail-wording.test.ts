import {it,expect} from 'vitest';
import {planFlight,type FlightRead} from './flight';
import {sampleFlight} from './flight-sample';
import {greeting} from './mail-copy';
it.each([
 ['F01','direct','credit_card','waiting_airline',null,'2026-10-08','seven days'],
 ['F02','direct','cash','waiting_airline',null,'2026-10-01','immediately'],
 ['F03','MakeMyTrip','upi','waiting_airline',null,'2026-10-21','14 working days'],
 ['F22','MakeMyTrip','upi','paid_site','2026-10-12','2026-10-13','24 hours'],
 ['estimate','direct','upi','waiting_airline',null,'2026-10-22','about 15 working days'],
 ['estimate','EaseMyTrip','upi','paid_site','2026-10-12','2026-10-19','seven-day follow-up'],
] as const)('status wording matches %s / %s / %s / %s', (source,site,method,claim,paidDate,dueDate,wording)=>{
 const r=sampleFlight();r.bookedVia=site;r.paymentMethod=method;r.cancellationDate='2026-10-01';r.reply={...r.reply,claim,paidDate,fromCompany:'IndiGo',pointsAt:claim==='paid_site'?site:'IndiGo'};
 const today=source==='F02'?'2026-10-01':source==='F01'?'2026-10-01':'2026-10-12';
 const p=planFlight(r,today);expect(p.nextStep).toBe('FLIGHT_status');expect(p.dueDate).toBe(dueDate);expect(p.dueSource).toBe(source);expect(p.body).toContain(wording);
 if(source==='estimate'){expect(p.body).not.toContain('Under DGCA');expect(p.body).toContain('not a');if(site==='direct')expect(p.body).not.toContain('seven-day');}
});
it.each(['Customer care email','Refunds email','Customer support email','Email'])('address role %s greets company support',role=>expect(greeting({role,value:'care@example.invalid',company:'IndiGo'})).toBe('Dear IndiGo support,'));
it('officer greetings stay named or role-based',()=>{expect(greeting({role:'Nodal Officer',value:'Nodal Officer',company:'IndiGo'})).toBe('Dear Nodal Officer,');expect(greeting({role:'Nodal Officer',value:'Isha Gandhi, nodalofficer@example.invalid',company:'IndiGo'})).toBe('Dear Isha Gandhi,');});
