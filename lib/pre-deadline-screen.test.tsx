import {it,expect} from 'vitest';
import {sampleFlight} from './flight-sample';
import {planFlight} from './flight';
import {flightStatus} from './flight-status';
it.each(['waiting_airline','credit_shell','destination_wrong'] as const)('shows %s without an overdue stamp before deadline',claim=>{const facts=sampleFlight();facts.cancellationDate='2026-10-01';facts.reply={...facts.reply,claim,fromCompany:'MakeMyTrip',pointsAt:'IndiGo'};const plan=planFlight(facts,'2026-10-12');const view=flightStatus(plan,'2026-10-12');expect(view.pastDue).toBe(false);expect(view.label).toBe(claim==='waiting_airline'?'Waiting, due 21 Oct 2026':'Follow-up ready');expect(view.label).not.toContain('Overdue');expect(flightStatus(planFlight(facts,'2026-10-22'),'2026-10-22').pastDue).toBe(true);delete plan.pastDue;expect(flightStatus(plan,'2026-10-12').pastDue).toBe(false);});
