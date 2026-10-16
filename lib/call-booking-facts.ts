import type {FlightRead} from './flight';
import {bookingCallFacts} from './booking-verification';
export function confirmedCallFacts(item:{facts?:Partial<FlightRead>|null;factsConfirmedAt?:number|null}){
 if(!item.factsConfirmedAt||!item.facts)return {};
 const read=item.facts,booking=bookingCallFacts(read);
 const entries={
  'Name on ticket':booking.nameOnTicket,'From':booking.routeFrom,'To':booking.routeTo,
  'Travel date':read.departureDate,'Flight number':read.flightNumber,
  'Booked on':read.bookedVia==='direct'?'booked directly':read.bookedVia,'Booking ID':read.bookingId,
  'Amount paid, rupees':read.amountPaid===null||read.amountPaid===undefined?undefined:String(read.amountPaid),
  'Cancellation date':read.cancellationDate,'Booking mobile':booking.bookingMobile,'Booking email':booking.bookingEmail,
 };
 return Object.fromEntries(Object.entries(entries).filter((entry):entry is [string,string]=>typeof entry[1]==='string'&&!!entry[1].trim()).map(([key,value])=>[key,value.trim().slice(0,150)]));
}
