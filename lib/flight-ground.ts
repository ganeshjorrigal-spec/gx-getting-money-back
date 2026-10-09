import { displayDate } from "./dates";
import { flightReadSchema,validFlightDate,type FlightRead } from "./flight";
import { flightContacts } from "./flight-kb";

// Reject extracted dates unsupported by text. Images are read by the model and
// shown for user confirmation; no day-count calculation is delegated to it.
export function groundFlightRead(value:FlightRead,text:string,prior?:FlightRead|null,hasImage=false,sender?:string,isDemo=false):FlightRead {
 const read=flightReadSchema.parse(value);
 read.replyConfirmed=false;
 const supported=(date:string|null|undefined,previous?:string|null)=>{
   if(!date||!validFlightDate(date))return null;
   if(date===previous||hasImage)return date;
   const normal=text.toLowerCase().replace(/[,/]/g," ").replace(/\s+/g," ");
   const long=displayDate(date).toLowerCase();
   const day=Number(date.slice(8)),month=Number(date.slice(5,7)),year=date.slice(0,4);
   return normal.includes(date)||normal.includes(long)||normal.includes(long.replace(/\b(\w{3})\b/,m=>({jan:"january",feb:"february",mar:"march",apr:"april",jun:"june",jul:"july",aug:"august",sep:"september",oct:"october",nov:"november",dec:"december"}[m]??m)))||normal.includes(`${day} ${month} ${year}`)?date:null;
 };
 read.cancellationDate=supported(read.cancellationDate,prior?.cancellationDate);
 read.departureDate=supported(read.departureDate,prior?.departureDate);
 read.supportContactDate=supported(read.supportContactDate,prior?.supportContactDate);
 // New reply dates must come from that reply, not from the model's prior promise.
 read.reply.paidDate=supported(read.reply.paidDate);
 read.reply.promisedDate=supported(read.reply.promisedDate);
 if(read.reply.reference&&!text.includes(read.reply.reference)&&!hasImage)read.reply.reference=null;
 if(sender&&!isDemo&&read.reply.claim!=="none"){
   const domain=sender.toLowerCase().split("@")[1];
   const known=flightContacts.some(c=>c.company===read.reply.fromCompany&&c.email?.split("@")[1]===domain&&c.label.startsWith("VERIFIED"));
   if(!known)read.reply.confidence=Math.min(read.reply.confidence,0.5);
 }
 return read;
}
