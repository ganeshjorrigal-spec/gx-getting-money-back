import {it,expect} from 'vitest';
import {flightStatus} from './flight-status';
import {planFlight} from './flight';
import {sampleFlight} from './flight-sample';
it('calendar-day rule shows calendar overdue count',()=>{const r=sampleFlight();r.bookedVia='direct';r.paymentMethod='credit_card';r.cancellationDate='2026-10-01';const view=flightStatus(planFlight(r,'2026-10-12'),'2026-10-12');expect(view.label).toBe('Overdue by 4 days');expect(view.delayUnit).toBe('days');});
it('working-day rule shows working overdue count',()=>{const r=sampleFlight();r.cancellationDate='2026-09-11';const view=flightStatus(planFlight(r,'2026-10-13'),'2026-10-13');expect(view.label).toBe('Overdue by 8 working days');expect(view.delayUnit).toBe('working days');});
