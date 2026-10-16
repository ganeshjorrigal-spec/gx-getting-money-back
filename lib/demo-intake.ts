import {sampleFlight} from './flight-sample';
import {addDays} from './dates';
import {answerDate,answerAmount} from './flight-answers';
export const demoSampleFields=['pnr','bookingId','cancellationDate','amountPaid','flightName','routeFrom','routeTo','nameOnTicket','bookingMobile','bookingEmail'] as const;
export function demoSamples(today:string){return {...sampleFlight(),airline:'Demo Air',bookedVia:'DemoTrips',flightName:'Delhi to Mumbai',routeFrom:'Delhi',routeTo:'Mumbai',nameOnTicket:'Demo Passenger',bookingMobile:'+910000000000',bookingEmail:'passenger@example.invalid',cancellationDate:addDays(today,-30),pnr:'SAMPLE',bookingId:'DEMO-2400'};}
export function demoIntakeFacts(today:string){return {...demoSamples(today),paymentMethod:'unknown' as const,pnr:null,bookingId:null,cancellationDate:null,amountPaid:null,flightName:null,routeFrom:null,routeTo:null,nameOnTicket:null,bookingMobile:null,bookingEmail:null,bookingContactReviewed:false,shareBookingContact:false};}
export function demoFactValue(field:typeof demoSampleFields[number],value:string,today:string){
 if(field==='cancellationDate'){const date=answerDate(value);if(date>=today)throw new Error('Choose a cancellation date in the past');return date;}
 if(field==='amountPaid'){const amount=answerAmount(value);if(amount<=0||amount>10_000_000)throw new Error('Enter a valid rupee amount');return amount;}
 if(field==='pnr'){if(!/^[A-Z0-9]{6}$/i.test(value.trim()))throw new Error('Use the six letters or numbers from your PNR');return value.trim().toUpperCase();}
 if(!value.trim()||value.length>100)throw new Error('Add this booking detail');return value.trim();
}
