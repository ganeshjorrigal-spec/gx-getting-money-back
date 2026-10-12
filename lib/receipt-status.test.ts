import {it,expect} from 'vitest';
import {flightStatus,flightDateSource} from './flight-status';
import {planFlight} from './flight';
import {sampleFlight} from './flight-sample';
it('calendar-day rule shows calendar overdue count',()=>{const r=sampleFlight();r.bookedVia='direct';r.paymentMethod='credit_card';r.cancellationDate='2026-10-01';const view=flightStatus(planFlight(r,'2026-10-12'),'2026-10-12');expect(view.label).toBe('Overdue by 4 days');expect(view.delayUnit).toBe('days');});
it('working-day rule shows working overdue count',()=>{const r=sampleFlight();r.cancellationDate='2026-09-11';const view=flightStatus(planFlight(r,'2026-10-13'),'2026-10-13');expect(view.label).toBe('Overdue by 8 working days');expect(view.delayUnit).toBe('working days');});

it('working-day promise keeps its unit without changing the due date',()=>{const p=planFlight(sampleFlight(),'2026-10-13');const original=p.dueDate;const view=flightStatus({...p,dueSource:'message_promise',dueSourceText:'Promised within 10 working days'},'2026-10-13');expect(view.delayUnit).toBe('working days');expect(p.dueDate).toBe(original);});

it('estimates cite their expectation without linking to DGCA',()=>{const p=planFlight(sampleFlight(),'2026-10-13');const source=flightDateSource({...p,dueSource:'estimate'},'IndiGo','direct');expect(source.href).toBeNull();expect(source.text).toContain('not a DGCA rule');});
it('a chosen bank reminder never gains a regulator source',()=>{const p=planFlight(sampleFlight(),'2026-10-13');const source=flightDateSource({...p,dueSource:'user_choice'},'IndiGo','direct');expect(source.href).toBeNull();expect(source.text).toContain('Your chosen reminder');});
