# Flight refund playbook, India (v2, HQ rebuilt from official sources)

Status: rebuilt by Claude HQ on 9 Oct 2026 after the verifier failed the Gemini draft (`flights-gemini-raw.md`, `flights-gemini-raw-verification.md`). Every rule row quotes official DGCA text read on 9 Oct 2026; full text in `../sources/dgca-car-refund-and-compensation.md`. Needs a fresh verifier pass and Ganesh's hand-check of section I before Codex uses it.

Labels: VERIFIED = official government text or the company's own page, read 9 Oct 2026. REPORTED = secondary source or public complaints. HQ DEFAULT = a product choice, not a rule; the agent must never cite it as law. NOT FOUND = looked for, not found.

## A. One-page summary

Two DGCA rules carry flights:
- **CAR M-II Rev 3** (refunds): dated 24 Feb 2026, effective 26 Mar 2026. Refund in 7 days to a credit card, immediately for cash, and within **14 working days** when booked through a travel site, with the airline responsible. Taxes and airport fees always come back. A credit shell is the passenger's choice, never the default. No charge to process a refund.
- **CAR M-IV Rev 4** (disruptions): effective 15 Feb 2023. Compensation for denied boarding and short-notice cancellations, on top of the refund. No compensation when the cause is beyond the airline's control (weather, ATC, security, strikes and similar).

Scenarios:
1. **Airline cancelled.** Passenger chooses alternate flight or refund. Refund per M-II. If told less than 24 hours before, or never told, compensation is also owed (M-IV 3.3.2), unless extraordinary circumstances apply.
2. **Big delay or reschedule, passenger declines.** A domestic delay of more than 6 hours gives a choice of alternate flight within 6 hours or full refund (M-IV 3.4.2). Other reschedules: NOT FOUND as a specific refund right; treat via the airline's own policy.
3. **Passenger cancelled.** Fare rules decide the refund, but taxes and airport fees always come back (M-II 3(d)). Cancellation charge can never exceed basic fare plus fuel surcharge, excluding a disclosed travel-agent fee (M-II 3(i)).
4. **Denied boarding.** No compensation if the alternate flight leaves within 1 hour. Otherwise 200% or 400% of basic fare plus fuel, capped at Rs 10,000 or Rs 20,000 (M-IV 3.2.2).
5. **Refund "processed" but not received.** Ask for the ARN or UTR. No regulator timeline found for the bank leg. For MakeMyTrip and Goibibo, their own terms say they try to pass refunds on within 24 hours of receiving them from the airline.
6. **Credit shell pushed.** The passenger can refuse; credit shell is their prerogative (M-II 3(f)). Exception: medical emergency cancellations, where the airline may give refund or credit shell (M-II 3(m)).
7. **48-hour look-in.** Cancel or change free within 48 hours of booking (fare difference still applies). Not available when departure is under 7 days (domestic) or 15 days (international) from booking, for tickets booked directly on the airline website (M-II 3(e)). See open question H2.
8. **Compensation owed on disruption.** Paid in cash or bank transfer; vouchers only with the passenger's signed agreement (M-IV 3.7.1).

## B. Rule table

| id | scenario | rule in one plain sentence | deadline and anchor | exact quote | source | date read | label |
|---|---|---|---|---|---|---|---|
| F01 | 1, 3, 6 | Card refunds are due within 7 days of cancellation. | Cancellation date + 7 calendar days (CAR does not say working days). | "In case of credit card payments, refund shall be made by the airlines within seven days of the cancellation to the account of credit card holder." | CAR M-II Rev 3, para 3(a) | 9 Oct 2026 | VERIFIED |
| F02 | 1, 3 | Cash refunds are due immediately at the office where the ticket was bought. | Same day. | "In case of cash transactions, refund shall be made immediately by the airlines office from where the ticket was purchased." | CAR M-II Rev 3, para 3(b) | 9 Oct 2026 | VERIFIED |
| F03 | 1, 3, 5 | For travel-site bookings the airline is responsible and must finish the refund in 14 working days. | Cancellation date + 14 working days. | "In case of purchase of ticket through travel agent/portal, onus of refund shall lie with the airlines as agents are their appointed representatives. The airlines shall ensure that the refund process is completed within 14 working days." | CAR M-II Rev 3, para 3(c) | 9 Oct 2026 | VERIFIED |
| F04 | 3 | Taxes and airport fees are always refunded, even on non-refundable and promo fares and no-shows. | With the refund (F01 to F03). | "The airlines shall refund all statutory taxes and User Development Fee (UDF)/Airport Development Fee (ADF)/Passenger Service Fee (PSF) to the passengers in case of cancellation/non-utilisation of tickets/no show. This provision shall also be applicable for all types of fares offered including promos/special fares and where the basic fare is non-refundable." | CAR M-II Rev 3, para 3(d) | 9 Oct 2026 | VERIFIED |
| F05 | 7 | Free cancel or change within 48 hours of booking; not for direct bookings with departure under 7 days (domestic) or 15 days (international). | Booking time + 48 hours. | "The airline shall provide "Look-in option" for a period of 48 hours after booking ticket. During this period passenger can cancel or amend the ticket without any additional charges, except for the normal prevailing fare for the revised flight for which the ticket is sought to be amended. This facility shall not be available for a flight whose departure is less than 7 days for domestic flight and 15 days for international flight from booking date when ticket is booked directly through airline website." | CAR M-II Rev 3, para 3(e) | 9 Oct 2026 | VERIFIED |
| F06 | 6 | A credit shell is the passenger's choice, not the airline's default. | At refund. | "The option of holding the refund amount in credit shell by the airlines shall be the prerogative of the passenger and not a default practice of the airline." | CAR M-II Rev 3, para 3(f) | 9 Oct 2026 | VERIFIED |
| F07 | 3 | Cancellation charge cannot exceed basic fare plus fuel surcharge (a travel-agent fee disclosed at booking is outside this cap). | At cancellation. | "Under no circumstances, the airline or its agent shall levy cancellation charge more than the basic fare plus fuel surcharge. This will exclude any charges levied by the travel agent, which have been fully disclosed at the time of booking." | CAR M-II Rev 3, para 3(i) | 9 Oct 2026 | VERIFIED |
| F08 | all refunds | No extra charge to process a refund. | At refund. | "The airlines shall not levy any additional charge to process the refund." | CAR M-II Rev 3, para 3(j) | 9 Oct 2026 | VERIFIED |
| F09 | 6 | Medical emergency cancellations: airline may give refund or credit shell. | n/a | "In the event of ticket cancellations due to a medical emergency, where the passenger or a family member listed on the same PNR gets admitted/hospitalized during the travel period, airlines may provide either a refund or a credit shell." | CAR M-II Rev 3, para 3(m) | 9 Oct 2026 | VERIFIED |
| F10 | 4 | No denied-boarding compensation if the alternate flight leaves within 1 hour of the original. | At the airport. | "the airline shall not be liable for any compensation in case alternate flight is arranged that is scheduled to depart within one hour of the original schedule departure time of the initial reservation." | CAR M-IV Rev 4, para 3.2.2 | 9 Oct 2026 | VERIFIED |
| F11 | 4 | Alternate flight within 24 hours: 200% of one-way basic fare plus fuel, max Rs 10,000. | At the airport. | "An amount equal to 200% of booked one-way basic fare plus airline fuel charge, subject to maximum of INR 10,000, in case airline arranges alternate flight that is scheduled to depart within the 24 hours of the booked scheduled departure." | CAR M-IV Rev 4, para 3.2.2(a) | 9 Oct 2026 | VERIFIED |
| F12 | 4 | Alternate flight after 24 hours: 400%, max Rs 20,000. | At the airport. | "An amount equal to 400% of booked one-way basic fare plus airline fuel charge, subject to maximum of INR 20,000, in case airline arranges alternate flight that is scheduled to depart more than 24 hours of the booked scheduled departure." | CAR M-IV Rev 4, para 3.2.2(b) | 9 Oct 2026 | VERIFIED |
| F13 | 4 | Passenger declines the alternate: full refund plus 400%, max Rs 20,000. | At the airport. | "In case passenger does not opt for alternate flight, refund of full value of ticket and compensation equal to 400% of booked one-way basic fare plus airline fuel charge, subject to maximum of INR 20,000." | CAR M-IV Rev 4, para 3.2.2(c) | 9 Oct 2026 | VERIFIED |
| F14 | 1 | Cancelled with under 2 weeks' notice: airline must offer alternate flight or refund, as the passenger accepts. | Notice date. | "In case the passengers are informed of the cancellation less than two weeks before and up to 24 hours of the scheduled time of departure, the airline shall offer an alternate flight or refund the ticket, as acceptable to the passenger." | CAR M-IV Rev 4, para 3.3.1 | 9 Oct 2026 | VERIFIED |
| F15 | 1, 8 | Not told in time (under 24 hours) or missed a connection on the same ticket: acceptable alternate flight, or full refund plus compensation of Rs 5,000 / 7,500 / 10,000 by block time, or the one-way basic fare plus fuel if that is less. | Cancellation date. | "Passengers who have not been informed as per the provisions contained in Para 3.3.1, or missed the connecting flight booked on the same ticket number of an airline, the airlines shall either provide alternate flight as acceptable to the passenger or provide compensation in addition to the full refund of air ticket" | CAR M-IV Rev 4, para 3.3.2 (amounts in 3.3.2 a to c) | 9 Oct 2026 | VERIFIED |
| F16 | 1, 8 | No compensation if the passenger gave no email or phone at booking. | n/a | "No financial compensation shall be payable to passengers who have not provided adequate contact information (email id or a phone number) at the time of making booking" | CAR M-IV Rev 4, para 3.3.3 | 9 Oct 2026 | VERIFIED |
| F17 | 1, 8 | No compensation for causes beyond the airline's control (weather, ATC, security, strikes and similar). The refund is still owed. | n/a | "airlines would also not be liable to pay any compensation in respect of cancellations and delays clearly attributable to Air Traffic Control (ATC), meteorological conditions, security risks, or any other causes that are beyond the control of the airline" | CAR M-IV Rev 4, para 1.5 (see also 1.4, 3.3.4) | 9 Oct 2026 | VERIFIED |
| F18 | 2 | Domestic delay over 6 hours (if not announced 24 hours ahead): alternate flight within 6 hours or full refund. | Scheduled departure. | "When domestic flight is expected to be delayed for more than 6 hrs from the published scheduled time of departure or previously revised departure time (communicated more than 24 hours prior to original scheduled departure time), airlines shall offer an option of either an alternate flight within a period of 6 hours or full refund of ticket to the passenger." | CAR M-IV Rev 4, para 3.4.2 | 9 Oct 2026 | VERIFIED |
| F19 | 8 | Compensation is paid in cash or bank transfer; vouchers only with the passenger's signed agreement. | n/a | "The compensation referred to in Para 3.2.2 and 3.3.2 shall be paid in cash, by bank transfer or with the signed agreement of the passenger in the form of travel vouchers." | CAR M-IV Rev 4, para 3.7.1 | 9 Oct 2026 | VERIFIED |
| F20 | all | Escalation path: airline, then AirSewa, then any statutory body or court. | n/a | "The passenger may file the grievance on Air Sewa App or Portal." | CAR M-IV Rev 4, para 3.9.2 (see 3.9.1, 3.9.3) | 9 Oct 2026 | VERIFIED |
| F21 | all | Every airline must have and publish a Nodal Officer and Appellate Authority; every complaint gets a reference number. | n/a | "Each Airline shall appoint a Nodal officer and Appellate Authority to settle passenger grievances in a stipulated time frame." | CAR M-IV Rev 4, para 3.10.4 (see 3.10.5) | 9 Oct 2026 | VERIFIED |
| F22 | 5 | MakeMyTrip and Goibibo try to pass on refunds within 24 hours of receiving them from the airline (96 hours for bookings over 6 months old). Company policy, not law. | Date the travel site received the airline's refund. | "MMT shall make all efforts to process refunds within 24 hours of receipt of refund from the service provider." | makemytrip.com/legal/in/eng/user_agreement.html (same text on goibibo.com/info/user-agreement/) | 9 Oct 2026 | VERIFIED (company terms) |
| F23 | escalation | Cleartrip's own process: support first; if not resolved in 72 hours, write to the grievance officer with the Trip ID. Company policy. | First support contact + 72 hours. | "If your query / complaint is not resolved within 72 hours" | cleartrip.com/grievance | 9 Oct 2026 | VERIFIED (company page) |

Removed from the Gemini draft: the 21-working-day rule and the 5-day look-in limit (superseded by Rev 3), the 3-hour and 4-hour cancellation cutoffs (IndiGo page not checked), the 30-day AirSewa window and 45-day NCH window (secondary sources only), the 5 to 7 working day bank window (no source).

## C. Contacts table

All read on the company's own page. Recheck any contact live before Codex hard-codes it.

| company | channel | value | page | date read | label |
|---|---|---|---|---|---|
| IndiGo | Customer care email | customer.experience@goindigo.in | goindigo.in/contact-us.html | 9 Oct 2026 | VERIFIED |
| IndiGo | Customer care phone | 0124-4973838, 0124-6173838 | goindigo.in/contact-us.html | 9 Oct 2026 | VERIFIED |
| IndiGo | Nodal Officer | Isha Gandhi, nodalofficer@goindigo.in | goindigo.in/contact-us.html | 9 Oct 2026 | VERIFIED |
| IndiGo | Appellate Authority | Pratik Arjun Sen, appellateauthority@goindigo.in | goindigo.in/contact-us.html | 9 Oct 2026 | VERIFIED |
| Air India | Nodal Officer | Abdesh Kumar, nodalofficer@airindia.com | airindia.com/in/en/passenger-rights.html | 9 Oct 2026 | VERIFIED |
| Air India | Appellate Authority | Bhavna Tiwari, appellateauthority@airindia.com | airindia.com/in/en/passenger-rights.html | 9 Oct 2026 | VERIFIED |
| SpiceJet | Customer care email | custrelations@spicejet.com | corporate.spicejet.com/contactus.aspx | 9 Oct 2026 | VERIFIED |
| SpiceJet | Phone (reservations lines) | 0124-4983410, 0124-7101600 | corporate.spicejet.com/contactus.aspx | 9 Oct 2026 | VERIFIED |
| SpiceJet | Nodal Officer | Sachin Suri, nodalofficer@spicejet.com | corporate.spicejet.com/contactus.aspx | 9 Oct 2026 | VERIFIED |
| SpiceJet | Appellate Authority | Kamal Hingorani, appellateauthority@spicejet.com | corporate.spicejet.com/contactus.aspx | 9 Oct 2026 | VERIFIED |
| Akasa Air | Email | info@akasaair.com (listed with the head office address) | akasaair.com/customer-support/contact-us | 9 Oct 2026 | VERIFIED |
| Akasa Air | Phone | +91 9606 11 21 31 | akasaair.com/customer-support/contact-us | 9 Oct 2026 | VERIFIED |
| Akasa Air | Nodal Officer | Deepika Poojary, nodalofficer@akasaair.com | akasaair.com/customer-support | 9 Oct 2026 | VERIFIED |
| Akasa Air | Appellate Authority | Ramita Vyas, appellateauthority@akasaair.com | akasaair.com/customer-support | 9 Oct 2026 | VERIFIED |
| MakeMyTrip | Phone | 0124-4628747, 0124-5045105 | makemytrip.com/support/contact-us.php | 9 Oct 2026 | VERIFIED |
| MakeMyTrip | Grievance Officer | Ms. Jasbir Kaur, grievanceofficer@makemytrip.com, +91 8065139029 | makemytrip.com/legal/in/eng/user_agreement.html | 9 Oct 2026 | VERIFIED |
| Goibibo | Grievance Officer | Mr. Anshul Ahuja, grievanceofficer@goibibo.com | goibibo.com/info/user-agreement/ | 9 Oct 2026 | VERIFIED |
| Cleartrip | Phone | +91 9595333333 (24x7, quote Trip ID) | cleartrip.com/grievance | 9 Oct 2026 | VERIFIED |
| Cleartrip | Grievance Officer | Mr. Shivek Kapoor, Manager Consumer Grievances, wecare@cleartrip.com | cleartrip.com/grievance | 9 Oct 2026 | VERIFIED |
| EaseMyTrip | Customer care email | care@easemytrip.com | easemytrip.com/contact-us.html | 9 Oct 2026 | VERIFIED |
| EaseMyTrip | Phone | 011-43131313, 011-43030303 | easemytrip.com/contact-us.html | 9 Oct 2026 | VERIFIED |
| EaseMyTrip | Grievance Officer | Nikhil Kumar, care@easemytrip.com | easemytrip.com/pdf/free-full-refund-tnc.pdf | 9 Oct 2026 | VERIFIED |
| Yatra | Grievance Officer | NOT FOUND (the Gemini entries were investor-relations contacts) | n/a | 9 Oct 2026 | NOT FOUND |
| ixigo | Grievance Officer | NOT FOUND (email hidden on the page) | ixigo.com/about/privacy/ | 9 Oct 2026 | NOT FOUND |
| Government | AirSewa | airsewa.gov.in (app and portal) | CAR M-IV 3.9.2 | 9 Oct 2026 | VERIFIED |

Changed from the Gemini draft: MakeMyTrip grievance officer is Jasbir Kaur on MakeMyTrip's own agreement (Gemini's "Amit Kumar Sinha" came from the holidays subdomain). Cleartrip lists only Shivek Kapoor ("David Lima" not on the page). Yatra entries removed.

## D. Escalation ladder

Rule-backed steps first, then HQ DEFAULT waits. The agent may cite the rule rows; it must not present an HQ DEFAULT wait as a legal deadline.

**Refund scenarios (1, 2, 3, 6, 7):**
1. Where the ticket was bought (airline or travel site). Cite F01 to F08 as they fit. Ask for the complaint reference number (F21). Wait: until the F01 or F03 due date. Cleartrip: 72 hours (F23).
2. If booked on a travel site: its grievance officer. A travel site is an e-commerce entity, so the e-commerce rules' 48-hour acknowledgement and one-month redressal apply (see online-stores.md, rule O04). At the same time, write to the airline's Nodal Officer, because F03 puts the onus on the airline. Wait: HQ DEFAULT 7 days.
3. Airline Appellate Authority, with the full thread. Wait: HQ DEFAULT 7 days.
4. AirSewa (F20). Wait: HQ DEFAULT 30 days (no official window found).
5. National Consumer Helpline (1915 or consumerhelpline.gov.in), then consumer commission. The NCH page says resolution may take up to 30 days.

**Compensation scenarios (4, 8):** airline (with written proof of denied boarding or the cancellation notice), then Nodal Officer, then Appellate Authority, then AirSewa (F20, F21). If the airline cites weather or ATC (F17), ask it to state the cause in writing; the burden of proof on informing the passenger of a delay rests with the airline (M-IV 3.4.5).

**Scenario 5 (processed, not received):** ask the seller for the ARN or UTR and the date the refund left. For MakeMyTrip or Goibibo, cite F22. Then the user's bank with that reference. Then the RBI Integrated Ombudsman if the bank does not resolve it.

## E. What the user must have

- PNR, and the travel site's booking ID if booked through one.
- Airline, travel site (if any), flight date, booking date and time.
- Payment method (card, UPI, net banking, cash) and amount paid.
- The cancellation or change notice, or the user's own cancellation confirmation, with its date. This anchors every deadline.
- Fare breakdown (taxes, UDF, ADF, PSF) for F04 and F07.
- For denied boarding: boarding pass or check-in proof and anything written from the counter.
- Whether the user gave an email or phone at booking (F16).

## F. How refunds get stuck (REPORTED, to be filled from X complaints)

Kept from the Gemini draft as hypotheses only, until `docs/research/user-evidence/x-complaints.md` lands:
1. Travel site and airline blame each other. Counter: F03.
2. Credit shell pushed as the only option. Counter: F06.
3. Taxes kept on "non-refundable" fares. Counter: F04.
4. "Refund initiated" with no money. Counter: ask for ARN or UTR, F22 where it applies.

## G. Dates the agent can compute

- Card refund due: cancellation date + 7 calendar days (F01). Applies to credit card only.
- Travel-site refund due: cancellation date + 14 working days, Monday to Friday (F03). Holidays: see H3.
- Look-in eligibility: now within booking time + 48 hours; for direct bookings, departure date minus booking date at least 7 days (domestic) or 15 days (international) (F05).
- Denied boarding compensation tier: compare alternate departure with original, under 1 hour, up to 24 hours, over 24 hours (F10 to F12).
- Cancellation compensation tier: by block time, 1 hour or less, 1 to 2 hours, over 2 hours (F15).
- Travel-site pass-on (MakeMyTrip, Goibibo): airline refund date + 24 hours (F22).

## H. Open questions and NOT FOUND

1. **UPI, debit card, net banking refunds:** M-II 3(a) names credit cards only. No rule found for other modes on direct bookings. Decision for HQ: apply 7 days as an HQ DEFAULT expectation, and say so plainly in messages.
2. **Look-in for travel-site bookings:** 3(e) limits the 7 and 15 day condition to direct bookings. It is not clear whether travel-site bookings get look-in at all. Ganesh to read 3(e) and decide how the agent words it.
3. **Working days:** CAR does not define them. HQ DEFAULT: Monday to Friday, ignore holidays, and say "about".
4. **Reschedules by the airline** other than the M-IV 3.4.2 delay case: no specific refund rule found.
5. **Yatra and ixigo grievance officers:** NOT FOUND.
6. **Block time:** rarely in the cancellation email. The agent should ask the user for scheduled flight duration, not guess.

## I. Load-bearing lines (for Ganesh's hand-check)

1. F03, 14 working days and onus on the airline for travel-site bookings.
2. F01, 7 days to a credit card.
3. F06, credit shell is the passenger's prerogative.
4. F04, taxes and airport fees always refunded.
5. F05, 48-hour look-in and its 7/15 day condition.
6. F07, cancellation charge cap, and the travel-agent fee exclusion.
7. F13, declined alternate after denied boarding: full refund plus up to Rs 20,000.
8. F15, short-notice cancellation: refund plus compensation, unless F17 applies.
9. F17, no compensation for weather, ATC, security and similar.
10. F20 and F21, AirSewa and the Nodal Officer and Appellate Authority path.
