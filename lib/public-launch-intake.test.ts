import {it,expect} from 'vitest';
import {bookingSummaryRows,bookingContactPresent} from './booking-verification';
import {sampleFlight} from './flight-sample';
import {readFileSync} from 'node:fs';
it('all six booking summary rows have working edit callbacks; stored flight/date are visible',()=>{
 const edits:string[]=[],rows=bookingSummaryRows({...sampleFlight(),flightNumber:'DEMO123',departureDate:'2026-09-21'},field=>edits.push(field));
 for(const row of rows)row.edit();expect(edits).toEqual(['routeFrom','routeTo','nameOnTicket','bookingMobile','bookingEmail','shareBookingContact','flightNumber','departureDate']);
 expect(rows.find(r=>r.label==='Flight number')?.value).toBe('DEMO123');expect(rows.find(r=>r.label==='Travel date')?.value).toBe('2026-09-21');
 expect(readFileSync('app/c/flight-case-view.tsx','utf8')).toContain('...bookingSummaryRows(facts,editFact)');
});
it('empty contacts need no permission screen; one contact still requires explicit consent',()=>{
 expect(bookingContactPresent({bookingMobile:null,bookingEmail:''})).toBe(false);expect(bookingContactPresent({bookingEmail:'fixture@example.invalid'})).toBe(true);
 expect(readFileSync('app/c/booking-verification.tsx','utf8')).toContain("field:'bookingContactReviewed',consent:false");
});
