import {it,expect} from 'vitest';
import {confirmedCallFacts} from './call-booking-facts';
import {assistantOverrides} from './call-transport';
import {sampleFlight} from './flight-sample';
it('only confirmed nonempty booking facts reach the prompt; contact requires separate consent',()=>{
 const facts={...sampleFlight(),flightNumber:'6E123',departureDate:'2026-09-08',bookingMobile:'+910000000000',bookingEmail:'booking@example.invalid'};
 expect(confirmedCallFacts({facts})).toEqual({});
 const bookingFacts=confirmedCallFacts({facts,factsConfirmedAt:1});
 expect(bookingFacts).toMatchObject({'Name on ticket':'Fixture Passenger',From:'Delhi',To:'Mumbai','Flight number':'6E123','Travel date':'2026-09-08','Booked on':'MakeMyTrip','Booking ID':'TEST-ID','Amount paid, rupees':'5400','Cancellation date':'2026-09-07'});
 expect(bookingFacts).not.toHaveProperty('Booking mobile');expect(bookingFacts).not.toHaveProperty('Booking email');
 const prompt=assistantOverrides({name:'Fixture',pnr:'SAMPLE',company:'IndiGo',mobile:'synthetic',bookingFacts}).model.messages[0].content;
 expect(prompt).toContain('Known booking facts:');expect(prompt).toContain('6E123');expect(prompt).not.toContain('booking@example.invalid');expect(prompt).toContain('Never invent or guess a fact that is not listed.');expect(prompt).toContain('if care sends an OTP, say the passenger will call back.');
});
it('consented contacts are known facts only; missing dates and IDs stay absent and direct is plain',()=>{
 const facts={...sampleFlight(),bookedVia:'direct',bookingId:null,cancellationDate:null,departureDate:null,shareBookingContact:true,bookingMobile:'+910000000000',bookingEmail:'booking@example.invalid'};
 const known=confirmedCallFacts({facts,factsConfirmedAt:1});
 expect(known).toMatchObject({'Booking mobile':facts.bookingMobile,'Booking email':facts.bookingEmail,'Booked on':'booked directly'});
 for(const label of ['Booking ID','Cancellation date','Travel date','Flight number'])expect(known).not.toHaveProperty(label);
 const prompt=assistantOverrides({name:'Fixture',pnr:'SAMPLE',company:'IndiGo',mobile:'synthetic',bookingFacts:known}).model.messages[0].content;
 expect(prompt).toContain('Booking mobile and email: say them only when care asks to verify the booking.');
});
