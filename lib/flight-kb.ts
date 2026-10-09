// Imported from the HQ-verified playbook. Rule ids remain internal; UI shows source sentences.
export type FlightContact = {company:string; role:string; value:string; email:string|null; url:string|null; readAt:string; label:string};
export const flightRules = [
  {
    "id": "F01",
    "scenario": "1, 3, 6",
    "sentence": "Credit card refunds are due within 7 days of cancellation.",
    "deadline": "Cancellation date + 7 calendar days (CAR does not say working days).",
    "quote": "\"In case of credit card payments, refund shall be made by the airlines within seven days of the cancellation to the account of credit card holder.\"",
    "source": "CAR M-II Rev 3, para 3(a)",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F02",
    "scenario": "1, 3",
    "sentence": "Cash refunds are due immediately at the office where the ticket was bought.",
    "deadline": "Same day.",
    "quote": "\"In case of cash transactions, refund shall be made immediately by the airlines office from where the ticket was purchased.\"",
    "source": "CAR M-II Rev 3, para 3(b)",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F03",
    "scenario": "1, 3, 5",
    "sentence": "For travel-site bookings the airline is responsible and must finish the refund in 14 working days.",
    "deadline": "14 working days. The CAR gives no start date; HQ DEFAULT anchor is the cancellation date.",
    "quote": "\"In case of purchase of ticket through travel agent/portal, onus of refund shall lie with the airlines as agents are their appointed representatives. The airlines shall ensure that the refund process is completed within 14 working days.\"",
    "source": "CAR M-II Rev 3, para 3(c)",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F04",
    "scenario": "3",
    "sentence": "Taxes and airport fees are always refunded, even on non-refundable and promo fares and no-shows.",
    "deadline": "With the refund (F01 to F03).",
    "quote": "\"The airlines shall refund all statutory taxes and User Development Fee (UDF)/Airport Development Fee (ADF)/Passenger Service Fee (PSF) to the passengers in case of cancellation/non-utilisation of tickets/no show. This provision shall also be applicable for all types of fares offered including promos/special fares and where the basic fare is non-refundable.\"",
    "source": "CAR M-II Rev 3, para 3(d)",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F05",
    "scenario": "7",
    "sentence": "Free cancel or change within 48 hours of booking (any fare difference for a changed flight is still payable); not for direct bookings with departure under 7 days (domestic) or 15 days (international).",
    "deadline": "Booking time + 48 hours.",
    "quote": "\"The airline shall provide \"Look-in option\" for a period of 48 hours after booking ticket. During this period passenger can cancel or amend the ticket without any additional charges, except for the normal prevailing fare for the revised flight for which the ticket is sought to be amended. This facility shall not be available for a flight whose departure is less than 7 days for domestic flight and 15 days for international flight from booking date when ticket is booked directly through airline website.\"",
    "source": "CAR M-II Rev 3, para 3(e)",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F06",
    "scenario": "6",
    "sentence": "A credit shell is the passenger's choice, not the airline's default.",
    "deadline": "At refund.",
    "quote": "\"The option of holding the refund amount in credit shell by the airlines shall be the prerogative of the passenger and not a default practice of the airline.\"",
    "source": "CAR M-II Rev 3, para 3(f)",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F07",
    "scenario": "3",
    "sentence": "Cancellation charge cannot exceed basic fare plus fuel surcharge (a travel-agent fee disclosed at booking is outside this cap).",
    "deadline": "At cancellation.",
    "quote": "\"Under no circumstances, the airline or its agent shall levy cancellation charge more than the basic fare plus fuel surcharge. This will exclude any charges levied by the travel agent, which have been fully disclosed at the time of booking.\"",
    "source": "CAR M-II Rev 3, para 3(i)",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F08",
    "scenario": "all refunds",
    "sentence": "The airline cannot charge extra to process a refund (the rule names airlines only).",
    "deadline": "At refund.",
    "quote": "\"The airlines shall not levy any additional charge to process the refund.\"",
    "source": "CAR M-II Rev 3, para 3(j)",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F09",
    "scenario": "6",
    "sentence": "Medical emergency cancellations: airline may give refund or credit shell.",
    "deadline": "n/a",
    "quote": "\"In the event of ticket cancellations due to a medical emergency, where the passenger or a family member listed on the same PNR gets admitted/hospitalized during the travel period, airlines may provide either a refund or a credit shell.\"",
    "source": "CAR M-II Rev 3, para 3(m)",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F10",
    "scenario": "4",
    "sentence": "No denied-boarding compensation if the alternate flight leaves within 1 hour of the original.",
    "deadline": "At the airport.",
    "quote": "\"the airline shall not be liable for any compensation in case alternate flight is arranged that is scheduled to depart within one hour of the original schedule departure time of the initial reservation.\"",
    "source": "CAR M-IV Rev 4, para 3.2.2",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F11",
    "scenario": "4",
    "sentence": "Alternate flight within 24 hours: 200% of one-way basic fare plus fuel, max Rs 10,000.",
    "deadline": "At the airport.",
    "quote": "\"An amount equal to 200% of booked one-way basic fare plus airline fuel charge, subject to maximum of INR 10,000, in case airline arranges alternate flight that is scheduled to depart within the 24 hours of the booked scheduled departure.\"",
    "source": "CAR M-IV Rev 4, para 3.2.2(a)",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F12",
    "scenario": "4",
    "sentence": "Alternate flight after 24 hours: 400%, max Rs 20,000.",
    "deadline": "At the airport.",
    "quote": "\"An amount equal to 400% of booked one-way basic fare plus airline fuel charge, subject to maximum of INR 20,000, in case airline arranges alternate flight that is scheduled to depart more than 24 hours of the booked scheduled departure.\"",
    "source": "CAR M-IV Rev 4, para 3.2.2(b)",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F13",
    "scenario": "4",
    "sentence": "Passenger declines the alternate: full refund plus 400%, max Rs 20,000.",
    "deadline": "At the airport.",
    "quote": "\"In case passenger does not opt for alternate flight, refund of full value of ticket and compensation equal to 400% of booked one-way basic fare plus airline fuel charge, subject to maximum of INR 20,000.\"",
    "source": "CAR M-IV Rev 4, para 3.2.2(c)",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F14",
    "scenario": "1",
    "sentence": "Cancelled with under 2 weeks' notice: airline must offer alternate flight or refund, as the passenger accepts.",
    "deadline": "Notice date.",
    "quote": "\"In case the passengers are informed of the cancellation less than two weeks before and up to 24 hours of the scheduled time of departure, the airline shall offer an alternate flight or refund the ticket, as acceptable to the passenger.\"",
    "source": "CAR M-IV Rev 4, para 3.3.1",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F15",
    "scenario": "1, 8",
    "sentence": "Not told in time (under 24 hours) or missed a connection on the same ticket: acceptable alternate flight, or full refund plus compensation of Rs 5,000 / 7,500 / 10,000 by block time, or the one-way basic fare plus fuel if that is less.",
    "deadline": "Cancellation date.",
    "quote": "\"Passengers who have not been informed as per the provisions contained in Para 3.3.1, or missed the connecting flight booked on the same ticket number of an airline, the airlines shall either provide alternate flight as acceptable to the passenger or provide compensation in addition to the full refund of air ticket\"",
    "source": "CAR M-IV Rev 4, para 3.3.2 (amounts in 3.3.2 a to c)",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F16",
    "scenario": "1",
    "sentence": "No cancellation compensation if the passenger gave no email or phone at booking (para 3.3.3 sits under cancellations only).",
    "deadline": "n/a",
    "quote": "\"No financial compensation shall be payable to passengers who have not provided adequate contact information (email id or a phone number) at the time of making booking\"",
    "source": "CAR M-IV Rev 4, para 3.3.3",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F17",
    "scenario": "1, 8",
    "sentence": "No compensation for causes beyond the airline's control (weather, ATC, security, strikes and similar). The refund is still owed.",
    "deadline": "n/a",
    "quote": "\"airlines would also not be liable to pay any compensation in respect of cancellations and delays clearly attributable to Air Traffic Control (ATC), meteorological conditions, security risks, or any other causes that are beyond the control of the airline\"",
    "source": "CAR M-IV Rev 4, para 1.5 (see also 1.4, 3.3.4; refund still owed per 3.3.5)",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F18",
    "scenario": "2",
    "sentence": "Domestic flight expected to be delayed more than 6 hours (counted from the scheduled time, or from a revised time announced more than 24 hours ahead): alternate flight within 6 hours or full refund.",
    "deadline": "Scheduled departure.",
    "quote": "\"When domestic flight is expected to be delayed for more than 6 hrs from the published scheduled time of departure or previously revised departure time (communicated more than 24 hours prior to original scheduled departure time), airlines shall offer an option of either an alternate flight within a period of 6 hours or full refund of ticket to the passenger.\"",
    "source": "CAR M-IV Rev 4, para 3.4.2",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F19",
    "scenario": "8",
    "sentence": "Compensation is paid in cash or bank transfer; vouchers only with the passenger's signed agreement.",
    "deadline": "n/a",
    "quote": "\"The compensation referred to in Para 3.2.2 and 3.3.2 shall be paid in cash, by bank transfer or with the signed agreement of the passenger in the form of travel vouchers.\"",
    "source": "CAR M-IV Rev 4, para 3.7.1",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F20",
    "scenario": "all",
    "sentence": "Escalation path: airline, then AirSewa, then any statutory body or court.",
    "deadline": "n/a",
    "quote": "\"The passenger may file the grievance on Air Sewa App or Portal.\"",
    "source": "CAR M-IV Rev 4, para 3.9.2 (see 3.9.1, 3.9.3)",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F21",
    "scenario": "all",
    "sentence": "Every airline must have and publish a Nodal Officer and Appellate Authority; every complaint gets a reference number.",
    "deadline": "n/a",
    "quote": "\"Each Airline shall appoint a Nodal officer and Appellate Authority to settle passenger grievances in a stipulated time frame.\"",
    "source": "CAR M-IV Rev 4, para 3.10.4 (see 3.10.5)",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED"
  },
  {
    "id": "F22",
    "scenario": "5",
    "sentence": "MakeMyTrip and Goibibo try to pass on refunds within 24 hours of receiving them from the airline (96 hours for bookings over 6 months old). Company policy, not law.",
    "deadline": "Date the travel site received the airline's refund.",
    "quote": "\"MMT shall make all efforts to process refunds within 24 hours of receipt of refund from the service provider.\"",
    "source": "makemytrip.com/legal/in/eng/user_agreement.html (same text on goibibo.com/info/user-agreement/)",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED (company terms)"
  },
  {
    "id": "F23",
    "scenario": "escalation",
    "sentence": "Cleartrip's own process: support first; if not resolved in 72 hours, write to the grievance officer with the Trip ID. Company policy.",
    "deadline": "First support contact + 72 hours.",
    "quote": "\"If your query / complaint is not resolved within 72 hours\"",
    "source": "cleartrip.com/grievance",
    "readAt": "9 Oct 2026",
    "label": "VERIFIED (company page)"
  }
] as const;
export const flightContacts: FlightContact[] = [
  {
    "company": "IndiGo",
    "role": "Customer care email",
    "value": "customer.experience@goindigo.in",
    "email": "customer.experience@goindigo.in",
    "url": "https://goindigo.in/contact-us.html",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "IndiGo",
    "role": "Customer care phone",
    "value": "0124-4973838, 0124-6173838",
    "email": null,
    "url": "https://goindigo.in/contact-us.html",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "IndiGo",
    "role": "Nodal Officer",
    "value": "Isha Gandhi, nodalofficer@goindigo.in",
    "email": "nodalofficer@goindigo.in",
    "url": "https://goindigo.in/contact-us.html",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "IndiGo",
    "role": "Appellate Authority",
    "value": "Pratik Arjun Sen, appellateauthority@goindigo.in",
    "email": "appellateauthority@goindigo.in",
    "url": "https://goindigo.in/contact-us.html",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "Air India",
    "role": "Nodal Officer",
    "value": "Abdesh Kumar, nodalofficer@airindia.com",
    "email": "nodalofficer@airindia.com",
    "url": "https://airindia.com/in/en/passenger-rights.html",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "Air India",
    "role": "Appellate Authority",
    "value": "Bhavna Tiwari, appellateauthority@airindia.com",
    "email": "appellateauthority@airindia.com",
    "url": "https://airindia.com/in/en/passenger-rights.html",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "SpiceJet",
    "role": "Customer care email",
    "value": "custrelations@spicejet.com",
    "email": "custrelations@spicejet.com",
    "url": "https://corporate.spicejet.com/contactus.aspx",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "SpiceJet",
    "role": "Phone (reservations lines)",
    "value": "0124-4983410, 0124-7101600",
    "email": null,
    "url": "https://corporate.spicejet.com/contactus.aspx",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "SpiceJet",
    "role": "Nodal Officer",
    "value": "Sachin Suri, nodalofficer@spicejet.com",
    "email": "nodalofficer@spicejet.com",
    "url": "https://corporate.spicejet.com/contactus.aspx",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "SpiceJet",
    "role": "Appellate Authority",
    "value": "Kamal Hingorani, appellateauthority@spicejet.com",
    "email": "appellateauthority@spicejet.com",
    "url": "https://corporate.spicejet.com/contactus.aspx",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "Akasa Air",
    "role": "Email",
    "value": "info@akasaair.com (listed with the head office address)",
    "email": "info@akasaair.com",
    "url": "https://akasaair.com/customer-support/contact-us",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "Akasa Air",
    "role": "Phone",
    "value": "+91 9606 11 21 31",
    "email": null,
    "url": "https://akasaair.com/customer-support/contact-us",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "Akasa Air",
    "role": "Nodal Officer",
    "value": "Deepika Poojary, nodalofficer@akasaair.com",
    "email": "nodalofficer@akasaair.com",
    "url": "https://akasaair.com/customer-support",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "Akasa Air",
    "role": "Appellate Authority",
    "value": "Ramita Vyas, appellateauthority@akasaair.com",
    "email": "appellateauthority@akasaair.com",
    "url": "https://akasaair.com/customer-support",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "MakeMyTrip",
    "role": "Phone",
    "value": "0124-4628747, 0124-5045105",
    "email": null,
    "url": "https://makemytrip.com/support/contact-us.php",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "MakeMyTrip",
    "role": "Grievance Officer",
    "value": "Ms. Jasbir Kaur, grievanceofficer@makemytrip.com, +91 8065139029",
    "email": "grievanceofficer@makemytrip.com",
    "url": "https://makemytrip.com/legal/in/eng/user_agreement.html",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "Goibibo",
    "role": "Grievance Officer",
    "value": "Mr. Anshul Ahuja, grievanceofficer@goibibo.com",
    "email": "grievanceofficer@goibibo.com",
    "url": "https://goibibo.com/info/user-agreement/",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "Cleartrip",
    "role": "Phone",
    "value": "+91 9595333333 (24x7, quote Trip ID)",
    "email": null,
    "url": "https://cleartrip.com/grievance",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "Cleartrip",
    "role": "Grievance Officer",
    "value": "Mr. Shivek Kapoor, Manager Consumer Grievances, wecare@cleartrip.com",
    "email": "wecare@cleartrip.com",
    "url": "https://cleartrip.com/grievance",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "EaseMyTrip",
    "role": "Customer care email",
    "value": "care@easemytrip.com",
    "email": "care@easemytrip.com",
    "url": "https://easemytrip.com/contact-us.html",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "EaseMyTrip",
    "role": "Phone",
    "value": "011-43131313, 011-43030303",
    "email": null,
    "url": "https://easemytrip.com/contact-us.html",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "EaseMyTrip",
    "role": "Grievance Officer",
    "value": "Nikhil Kumar, care@easemytrip.com",
    "email": "care@easemytrip.com",
    "url": "https://easemytrip.com/pdf/free-full-refund-tnc.pdf",
    "readAt": "2026-10-09",
    "label": "VERIFIED"
  },
  {
    "company": "Yatra",
    "role": "Grievance Officer",
    "value": "NOT FOUND (the Gemini entries were investor-relations contacts)",
    "email": null,
    "url": null,
    "readAt": "2026-10-09",
    "label": "NOT FOUND"
  },
  {
    "company": "ixigo",
    "role": "Grievance Officer",
    "value": "NOT FOUND (email hidden on the page)",
    "email": null,
    "url": "https://ixigo.com/about/privacy/",
    "readAt": "2026-10-09",
    "label": "NOT FOUND"
  },
  {
    "company": "Government",
    "role": "AirSewa",
    "value": "airsewa.gov.in (app and portal; named in CAR M-IV 3.9.2)",
    "email": null,
    "url": "https://airsewa.gov.in, not opened",
    "readAt": "2026-10-09",
    "label": "NOT CHECKED"
  }
];
export const refundRuleUrl = "https://www.dgca.gov.in/digigov-portal/Upload?flag=iframeAttachView&attachId=cuYJ%2FdQQ6Gx93z%2Fwchd5xw%3D%3D";
export function flightContact(company:string, role:string):FlightContact|null {
  return flightContacts.find(c => c.company.toLowerCase() === company.toLowerCase() && c.role === role && c.email && c.label.startsWith("VERIFIED")) ?? null;
}
export function flightRule(id:string) { return flightRules.find(r => r.id === id)!; }
