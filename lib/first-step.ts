import { flightLookIn,type FlightRead,type FlightPlan } from "./flight";
import { flightContact,flightRule } from "./flight-kb";
export function firstStep(read:FlightRead,plan:FlightPlan,proofAdded=false) {
 const direct=read.bookedVia==="direct",company=direct?read.airline:read.bookedVia;
 const contact=plan.nextPerson??(company?flightContact(company,direct?"Nodal Officer":"Grievance Officer"):null);
 const checklist=[
  {id:"proof",label:"Cancellation proof",present:proofAdded,help:proofAdded?"Screenshot added. Check it shows the cancellation.":`Find the cancellation mail or SMS, or screenshot the Cancelled screen in the ${read.airline??"airline"} app.`},
  {id:"pnr",label:"PNR",present:!!read.pnr,help:"Find it on the booking confirmation or ticket."},
  {id:"bookingId",label:"Booking ID",present:!!read.bookingId,help:direct?"Your airline booking confirmation has it; PNR may be the same reference.":"Find it in the travel app's booking details."},
  {id:"payment",label:"Payment method",present:read.paymentMethod!=="unknown",help:"Check whether you paid by card, UPI, net banking or wallet. Never share the account or card number."},
  {id:"amount",label:"Amount",present:read.amountPaid!==null,help:"Find the amount on your booking receipt or payment confirmation."},
 ];
 let action=plan.channel==="phone"?plan.note:plan.channel==="bank"?"Ask your bank to trace the refund using the company's reference.":plan.channel==="portal"?plan.note:contact?.email?`Mail ${contact.role} at ${contact.company}: ${contact.email}. ${direct?"The airline owes the refund; ask for its status and reference.":"Ask when the airline paid the travel site, with the airline copied as the plan shows."}`:`Get the missing details below. We do not hold a checked contact for ${company??"this booking"}; use the company's own support page.`;
 if(plan.route==="WAIT")action=`Keep your proof and check on the due date. ${plan.dueSourceText}`;
 if(plan.route==="OUT_OF_SCOPE"||plan.route==="NO_ROUTE")action=plan.note;
 const rule=read.cancelledBy==="passenger"?(flightLookIn(read)?"You booked direct and cancelled within the look-in window: no cancellation charge under DGCA paragraph 3(e). ":!direct?"We do not promise the direct-airline look-in benefit for a travel-site booking. ":"The look-in benefit needs booking time, cancellation time and departure date checked. ")+flightRule("F04").sentence:plan.dueSourceText;
 return {action,checklist,rule,contactSource:contact?.url??null,readyForContact:!!read.pnr&&read.amountPaid!==null&&read.paymentMethod!=="unknown"};
}
