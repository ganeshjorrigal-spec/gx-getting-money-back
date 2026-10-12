import {it,expect} from 'vitest';
import {isVideoDemoEntry,isSelfSendFlightDemo,demoCcRoles} from './video-demo';
import {sampleFlight} from './flight-sample';
import {planFlight} from './flight';
it('unlinked entry selects self-send only for the explicit query',()=>{expect(isVideoDemoEntry('?demo=flight-self')).toBe(true);for(const query of ['','?demo=flight','?demo=event'])expect(isVideoDemoEntry(query)).toBe(false);});
it('self-send screens never apply to the public chase or real cases',()=>{expect(isSelfSendFlightDemo({kind:'flight'})).toBe(true);expect(isSelfSendFlightDemo({kind:'flight',chaseStory:true})).toBe(false);expect(isSelfSendFlightDemo(null)).toBe(false);});
it('video case is truly overdue and starts at travel site with airline CC, then switches owner',()=>{
 const facts={...sampleFlight(),airline:'Demo Air',bookedVia:'DemoTrips'};const initial=planFlight(facts,'2026-10-13',undefined,'demo@example.invalid');
 expect(initial.pastDue).toBe(true);expect(initial.dueDate!<'2026-10-13').toBe(true);expect(initial.to).toBe('demo+travelsite@example.invalid');expect(initial.cc).toEqual(['demo+airline@example.invalid']);expect(demoCcRoles(initial.cc)[initial.cc[0]]).toBe('Nodal Officer, Demo Air (demo)');
 facts.reply={...facts.reply,claim:'waiting_airline',fromCompany:'DemoTrips',pointsAt:'Demo Air'};const next=planFlight(facts,'2026-10-13',undefined,'demo@example.invalid');expect(next.owner).toBe('Demo Air');expect(next.to).toBe('demo+airline@example.invalid');expect(next.checkDate).toBe('2026-10-20');
});
