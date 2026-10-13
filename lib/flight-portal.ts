import type {FlightRead} from './flight';
export function airIndiaPortalFields(read:FlightRead,known:{name?:string;email?:string;phone?:string},comment:string){
 return [
  {label:'Title',value:'Choose your title on Air India'},
  {label:'Name',value:known.name||'Enter your first and last name'},
  {label:'Email used to book',value:known.email||'Enter the email used for this booking'},
  {label:'Phone',value:known.phone||'Enter your phone with country code'},
  {label:'Booking channel',value:read.bookedVia==='direct'?'Choose Website, Mobile App, Call Centre or Booking Office':read.bookedVia||'Choose your booking channel'},
  // PNR and booking ID are not e-ticket numbers.
  {label:'E-ticket number',value:read.eTicketNumber||'Answer the e-ticket question on your case'},
  {label:'Comment',value:comment||`Please check my Air India refund${read.pnr?` for PNR ${read.pnr}`:''}.`},
 ];
}

export const mmtEarlyPortal={kind:'support' as const,company:'MakeMyTrip',url:'https://www.makemytrip.com/',path:'Open MakeMyTrip, My Trips, this booking, Support',sourceUrl:'https://www.makemytrip.com/support/contact-us.php',checkedAt:'2026-10-13'};
