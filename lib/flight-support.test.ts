import {it,expect} from 'vitest';
import {planFlight} from './flight';
import {sampleFlight} from './flight-sample';
import {airIndiaPortalFields} from './flight-portal';
import {flightContact} from './flight-kb';
it('verified travel support contacts are distinct from grievance officers',()=>{
 for(const company of ['Cleartrip','Yatra','ixigo'])expect(flightContact(company,'Customer support email')).toMatchObject({readAt:'2026-10-13',label:'VERIFIED'});
});
it('unverified MMT and Goibibo support addresses remain absent',()=>{
 for(const company of ['MakeMyTrip','Goibibo'])expect(flightContact(company,'Customer support email')).toBeNull();
});
it('Air India pending status uses its portal, never nodal email',()=>{
 const r=sampleFlight();r.airline='Air India';r.bookedVia='direct';r.cancellationDate='2026-10-10';r.reply={...r.reply,claim:'waiting_airline',fromCompany:'Air India',pointsAt:'Air India'};
 const p=planFlight(r,'2026-10-13');expect(p.route).toBe('WAIT');expect(p.channel).toBe('portal');expect(p.to).toBeNull();expect(p.portal?.subcategory).toBe('Status Check on Pending Refund');expect(p.portal?.url).toContain('/refunds.html');
 const fields=airIndiaPortalFields(r,{name:'Sample Flyer',email:'fixture@example.invalid',phone:'+910000000001'},p.body??'');
 expect(fields.map(f=>f.label)).toEqual(['Title','Name','Email used to book','Phone','Booking channel','E-ticket number','Comment']);expect(fields[1].value).toBe('Sample Flyer');expect(fields[5].value).toBe('Enter from your ticket');expect(p.portal?.documents).toContain('Boarding pass');
});
it('Air India does not infer a refund request from support-contact facts',()=>{
 const r=sampleFlight();r.airline='Air India';r.bookedVia='direct';r.cancellationDate='2026-10-10';r.supportContacted=false;
 expect(planFlight(r,'2026-10-13').portal?.subcategory).toBeNull();delete r.supportContacted;
 expect(planFlight(r,'2026-10-13').portal?.subcategory).toBeNull();
});
it('Air India travel-site booking stays with the travel site and overdue escalation stays intact',()=>{
 const r=sampleFlight();r.airline='Air India';r.cancellationDate='2026-10-10';expect(planFlight(r,'2026-10-13').portal).toBeUndefined();
 r.bookedVia='direct';r.cancellationDate='2026-09-01';expect(planFlight(r,'2026-10-13').to).toBe('nodalofficer@airindia.com');
});
