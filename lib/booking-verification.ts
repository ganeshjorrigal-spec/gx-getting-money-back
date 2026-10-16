import type {FlightRead} from './flight';
export const bookingContactConsent="Genie may tell the airline these to verify my booking. Genie never reads out an OTP.";
export const verificationFields=['routeFrom','routeTo','nameOnTicket','bookingMobile','bookingEmail'] as const;
export type VerificationField=typeof verificationFields[number];
export const verificationLabels={routeFrom:'Where did the flight start?',routeTo:'Where was it going?',nameOnTicket:'Name as on the ticket',bookingMobile:'Booking mobile (optional)',bookingEmail:'Booking email (optional)'};
export const verificationSamples={routeFrom:'Delhi',routeTo:'Mumbai',nameOnTicket:'Demo Passenger',bookingMobile:'+910000000000',bookingEmail:'passenger@example.invalid'};
export function missingVerification(read:FlightRead){return verificationFields.filter(field=>!read[field]?.trim()&&(['routeFrom','routeTo','nameOnTicket'].includes(field)||!read.bookingContactReviewed));}
export function verificationReady(read:FlightRead){return !!read.routeFrom?.trim()&&!!read.routeTo?.trim()&&!!read.nameOnTicket?.trim()&&read.bookingContactReviewed===true;}
export function bookingCallFacts(read:Partial<FlightRead>){return {routeFrom:read.routeFrom,routeTo:read.routeTo,nameOnTicket:read.nameOnTicket,...(read.shareBookingContact===true?{bookingMobile:read.bookingMobile,bookingEmail:read.bookingEmail}:{})};}
