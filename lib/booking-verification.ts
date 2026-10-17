import type {FlightRead} from './flight';
export const bookingContactConsent="Genie may tell the airline these to verify my booking. Genie never reads out an OTP.";
export const verificationFields=['routeFrom','routeTo','nameOnTicket','bookingMobile','bookingEmail'] as const;
export type VerificationField=typeof verificationFields[number];
export const verificationLabels={routeFrom:'Where did the flight start?',routeTo:'Where was it going?',nameOnTicket:'Name as on the ticket',bookingMobile:'Booking mobile (optional)',bookingEmail:'Booking email (optional)'};
export const verificationSamples={routeFrom:'Delhi',routeTo:'Mumbai',nameOnTicket:'Demo Passenger',bookingMobile:'+910000000000',bookingEmail:'passenger@example.invalid'};
export function missingVerification(read:FlightRead){return verificationFields.filter(field=>!read[field]?.trim()&&(['routeFrom','routeTo','nameOnTicket'].includes(field)||!read.bookingContactReviewed));}
export const bookingContactPresent=(read:Partial<FlightRead>)=>!!read.bookingMobile?.trim()||!!read.bookingEmail?.trim();
export function verificationReady(read:FlightRead){return !!read.routeFrom?.trim()&&!!read.routeTo?.trim()&&!!read.nameOnTicket?.trim()&&read.bookingContactReviewed===true;}
export function bookingCallFacts(read:Partial<FlightRead>){return {routeFrom:read.routeFrom,routeTo:read.routeTo,nameOnTicket:read.nameOnTicket,...(read.shareBookingContact===true?{bookingMobile:read.bookingMobile,bookingEmail:read.bookingEmail}:{})};}

export function bookingSummaryRows(read:Partial<FlightRead>,edit:(field:string,label:string)=>void){
 const rows=[['routeFrom','From'],['routeTo','To'],['nameOnTicket','Name on ticket'],['bookingMobile','Booking mobile'],['bookingEmail','Booking email'],['shareBookingContact','Share booking contact']] as const;
 return [...rows,...(read.flightNumber?[['flightNumber','Flight number'] as const]:[]),...(read.departureDate?[['departureDate','Travel date'] as const]:[])].map(([field,label])=>({label,value:field==='shareBookingContact'?(read.shareBookingContact?'Yes':'No'):read[field]??'Not shared',edit:()=>edit(field,label)}));
}
