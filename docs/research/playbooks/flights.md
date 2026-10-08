# **Tickback Flight Refund Playbook: Indian Aviation Sector**

## **A. One-Page Summary**

The regulatory environment governing airline refunds and passenger compensation in India is defined primarily by the Directorate General of Civil Aviation (DGCA). The foundational texts are the Civil Aviation Requirements (CAR) Section 3, Series M, Part II, which dictates the refund of airline tickets, and Part IV, which mandates facilities and compensation for denied boarding, cancellations, and delays1. The overarching regulatory principle across all scenarios is that the operating airline retains the ultimate legal obligation for the refund and compensation, regardless of whether the ticket was purchased directly or through a travel agent or portal1. Travel portals act merely as appointed representatives of the airline. The Tickback agent must compute deadlines, route communications, and escalate disputes based on the following eight distinct operational scenarios.  
**1\. Airline Cancelled the Flight** The operating airline holds the financial liability and the regulatory burden for refunds when it cancels a flight. For tickets booked through online travel agencies (OTAs) such as MakeMyTrip or Cleartrip, the funds are routed back through the OTA, but the airline is legally responsible for ensuring the process completes within 21 working days1. For direct bookings made with a credit card, the airline must execute the refund within seven calendar days of the cancellation1. Cash transactions require immediate refunds at the ticketing office1. The first step for the agent is to submit a formal refund request via the airline's customer support portal or the OTA's cancellation interface, anchoring the timeline to the date of cancellation.  
**2\. Flight Rescheduled or Delayed (Passenger Declines)** When an airline reschedules or delays a flight significantly, the passenger holds the right to decline the new timing. The airline owes the refund in full. Passengers are entitled to a complete refund without penalty if they are unwilling to travel on the alternate flight provided, or if the flight is delayed beyond reasonable thresholds leading the passenger to abort the journey3. The deadlines remain identical to direct cancellations, being seven calendar days for direct credit card bookings and 21 working days for OTA bookings1. The first step requires the passenger to formally decline the alternate flight via email or the airline's web form to trigger the refund workflow, rather than simply failing to show up.  
**3\. Passenger Cancelled the Flight** When a passenger initiates a cancellation, the airline owes the refund, routed via the OTA if applicable. The quantum of the refund is strictly governed by the airline's fare rules, but the DGCA enforces rigid consumer protections. Statutory taxes, the User Development Fee (UDF), the Airport Development Fee (ADF), and the Passenger Service Fee (PSF) are universally refundable, even for non-refundable promotional fares or no-show cases1. Furthermore, cancellation charges levied by the airline or its agent can never exceed the total of the basic fare plus the fuel surcharge1. The refund deadlines are seven calendar days for credit cards and 21 working days for OTA purchases1. The first step is to execute the cancellation on the booking platform prior to the airline's specific cutoff time, which is typically three hours before a domestic departure or four hours for an international departure4.  
**4\. Denied Boarding (Oversold Flight)** Airlines frequently overbook flights to mitigate the financial impact of no-shows. If a flight is oversold, the airline must first ask for volunteers to surrender their seats5. If a passenger is involuntarily denied boarding despite holding a confirmed reservation and reporting on time, the airline owes both a refund and punitive compensation. If the passenger declines an alternate flight, they are entitled to a full ticket refund plus compensation equal to 400 percent of the booked one-way basic fare plus airline fuel charge, capped at INR 20,0005. The deadlines require prompt payment in cash, bank transfer, or, exclusively with the passenger's signed consent, travel vouchers7. The first step is for the agent to instruct the user to obtain a written denial of boarding record from the airport counter and immediately file a claim with the airline's nodal officer.  
**5\. Refund Processed but Not Received** In scenarios where the airline or OTA claims the refund is complete but the funds have not materialized in the user's account, the liability shifts to the payment gateway or the passenger's issuing bank. The standard banking timeline for these settlements is typically five to seven working days after the merchant generates the Acquirer Reference Number (ARN). The first step for the agent is to demand the ARN or the UPI Unique Transaction Reference (UTR) from the merchant. Once obtained, the agent must guide the user to escalate the issue with their issuing bank using the provided reference codes.  
**6\. Airline Offers a Credit Shell Instead of Cash** Airlines routinely attempt to preserve capital during mass disruptions by issuing restrictive credit shells or travel vouchers. The DGCA explicitly states that the option of holding the refund amount in a credit shell is the absolute prerogative of the passenger and must never be a default practice imposed by the airline1. The airline owes the cash equivalent. The deadline for cash conversion aligns with the standard seven-day or 21-day window upon the passenger's demand1. The first step is for the agent to reply to the credit shell notification explicitly refusing the voucher and citing CAR Section 3, Series M, Part II to demand immediate liquid reversal.  
**7\. Free Cancellation or Change Window (Look-in Option)** The DGCA mandates a cooling-off period for flight bookings. The airline owes a full refund without any cancellation charges if the passenger exercises the "look-in option" within 48 hours of booking1. This rule applies strictly if the flight's departure is at least five days away for domestic routes and 15 days away for international routes, measured from the booking date1. The refund deadlines are seven calendar days for credit cards1. The first step is to execute the cancellation via the original booking channel strictly within the 48-hour timestamp window.  
**8\. Compensation and Facilities on Disruption** Beyond simple refunds, airlines owe compensation and facilities for flight disruptions. Financial compensation for short-notice cancellations ranges from INR 5,000 to INR 10,000 depending on the flight's block time, unless the airline provides adequate advance notice or acceptable alternate flights7. For delays, airlines must provide meals, refreshments, and hotel accommodations depending on the delay duration and flight length5. Airlines are exempt from financial compensation if the disruption is caused by force majeure events, defined as extraordinary circumstances beyond their control, such as natural disasters, political instability, or meteorological conditions2. The first step is to claim this compensation directly with the airline's nodal officer, providing the Passenger Name Record (PNR) and block time details.

## **B. Rule Table**

The following table standardizes the regulatory framework for automated parsing. The agent must rely on these exact quotes and sources when drafting communications to airlines and travel portals. Note that CAR Section 3 Series M Part IV (Revision 4\) is dated January 2023, making it older than two years and potentially subject to unnotified supersession, while CAR Section 3 Series M Part II (Revision 3\) is cited with an effective date of March 2026, marking it as current2.

| id | scenario | rule in one plain sentence | deadline and anchor | exact quote | source URL | page title | date read | label |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| R01 | Passenger or Airline Cancelled | Credit card refunds must be processed by the airline within seven calendar days of the cancellation. | 7 calendar days anchored to the cancellation date. | "In case of credit card payments, refund shall be made by the airlines within seven days of the cancellation to the account of credit card holder." | https\://www\.dgca.gov.in/digigov-portal/Upload?flag=iframeAttachView\&attachId=NEYrfyUarqXt9W7QigEe3Q%3D%3D\&baseLocale=en\_US | Refund of Airline Tickets to Passengers | October 9, 2026 | VERIFIED |
| R02 | Passenger or Airline Cancelled | Cash refunds must be given immediately at the ticketing office where the purchase occurred. | Immediate, anchored to the cancellation event. | "In case of cash transactions, refund shall be made immediately by the airlines office from where the ticket was purchased." | https\://www\.dgca.gov.in/digigov-portal/Upload?flag=iframeAttachView\&attachId=NEYrfyUarqXt9W7QigEe3Q%3D%3D\&baseLocale=en\_US | Refund of Airline Tickets to Passengers | October 9, 2026 | VERIFIED |
| R03 | Passenger or Airline Cancelled | The airline is legally responsible for OTA refunds, which must be completed within 21 working days. | 21 working days anchored to the cancellation date. | "In case of purchase of ticket through travel agent/portal, onus of refund shall lie with the airlines as agents are their appointed representatives. The airlines shall ensure that the refund process is completed within 21 working days." | https\://www\.dgca.gov.in/digigov-portal/Upload?flag=iframeAttachView\&attachId=NEYrfyUarqXt9W7QigEe3Q%3D%3D\&baseLocale=en\_US | Refund of Airline Tickets to Passengers | October 9, 2026 | VERIFIED |
| R04 | Passenger Cancelled | All statutory taxes and airport fees must be refunded to the passenger, even on non-refundable promotional tickets. | 7 calendar days (direct) or 21 working days (OTA) anchored to the cancellation date. | "The airlines shall refund all statutory taxes and User Development Fee (UDF)/Airport Development Fee (ADF)/Passenger Service Fee (PSF) to the passengers in case of cancellation/non-utilisation of tickets/no show. This provision shall also be applicable for all types of fares offered including promos/special fares and where the basic fare is non-refundable." | https\://www\.dgca.gov.in/digigov-portal/Upload?flag=iframeAttachView\&attachId=NEYrfyUarqXt9W7QigEe3Q%3D%3D\&baseLocale=en\_US | Refund of Airline Tickets to Passengers | October 9, 2026 | VERIFIED |
| R05 | Look-in Window | Passengers can cancel for free within 48 hours of booking if the domestic departure is at least five days away. | 48 hours anchored to the exact booking timestamp. | "The airline shall provide “Look-in option” for a period of 48 hours after booking ticket. During this period passenger can cancel or amend the ticket without any additional charges... This facility shall not be available for a flight whose departure is less than 5 days for domestic flight and 15 days for international flight from booking date." | https\://www\.dgca.gov.in/digigov-portal/Upload?flag=iframeAttachView\&attachId=NEYrfyUarqXt9W7QigEe3Q%3D%3D\&baseLocale=en\_US | Refund of Airline Tickets to Passengers | October 9, 2026 | VERIFIED |
| R06 | Credit Shell Offered | The airline cannot force a passenger to take a credit voucher instead of a cash refund without consent. | Immediate upon refund processing decision. | "The option of holding the refund amount in credit shell by the airlines shall be the prerogative of the passenger and not a default practice of the airline." | https\://www\.dgca.gov.in/digigov-portal/Upload?flag=iframeAttachView\&attachId=NEYrfyUarqXt9W7QigEe3Q%3D%3D\&baseLocale=en\_US | Refund of Airline Tickets to Passengers | October 9, 2026 | VERIFIED |
| R07 | Passenger Cancelled | Total cancellation fees can never exceed the combined cost of the basic fare and the fuel surcharge. | Assessed at the time of cancellation fee calculation. | "Under no circumstances, the airline or its agent shall levy cancellation charge more than the basic fare plus fuel surcharge." | https\://www\.dgca.gov.in/digigov-portal/Upload?flag=iframeAttachView\&attachId=NEYrfyUarqXt9W7QigEe3Q%3D%3D\&baseLocale=en\_US | Refund of Airline Tickets to Passengers | October 9, 2026 | VERIFIED |
| R08 | Denied Boarding | If an alternate flight departs within 24 hours of the original, compensation is 200 percent of basic fare plus fuel up to INR 10,000. | Promptly upon denial of boarding at the airport. (Note: Rule is \>2 years old). | "An amount equal to 200% of booked one-way basic fare plus airline fuel charge, subject to maximum of INR 10,000, in case airline arranges alternate flight that is scheduled to depart within the 24 hours of the booked scheduled departure." | https\://socialwelfare.vikaspedia.in/viewcontent/social-welfare/social-awareness/consumer-education/guidelines-for-air-passenger-compensation-due-to-cancellation-and-delay-in-flight?lgn=en | Guidelines for air passenger compensation | October 9, 2026 | REPORTED |
| R09 | Denied Boarding | If an alternate flight departs more than 24 hours later, compensation is 400 percent of basic fare plus fuel up to INR 20,000. | Promptly upon denial of boarding. (Note: Rule is \>2 years old). | "An amount equal to 400% of booked one-way basic fare plus airline fuel charge, subject to maximum of INR 20,000, in case airline arranges alternate flight that is scheduled to depart more than 24 hours of the booked scheduled departure." | https\://socialwelfare.vikaspedia.in/viewcontent/social-welfare/social-awareness/consumer-education/guidelines-for-air-passenger-compensation-due-to-cancellation-and-delay-in-flight?lgn=en | Guidelines for air passenger compensation | October 9, 2026 | REPORTED |
| R10 | Denied Boarding | If the passenger refuses the alternate flight, they receive a full refund plus 400 percent compensation up to INR 20,000. | Promptly upon denial of boarding and refusal of alternate flight. (Note: Rule is \>2 years old). | "In case passenger does not opt for alternate flight, refund of full value of ticket and compensation equal to 400% of booked one-way basic fare plus airline fuel charge, subject to maximum of INR 20,000." | https\://corporate.spicejet.com/PassengerRights.aspx | Passenger Rights | October 9, 2026 | VERIFIED |
| R11 | Airline Cancelled | Short notice cancellation requires up to INR 10,000 in compensation based on block time, plus a full refund. | Promptly upon short-notice cancellation. (Note: Rule is \>2 years old). | "Passengers who have not been informed as per the provisions... airlines shall provide compensation in addition to the refund of air ticket... INR 5,000... INR 7,500... INR 10,000" | https\://www\.scribd.com/doc/315428079/D3M-M4-Draft-June2016-DGCA-CAR-Passenger-Facilities | Draft DGCA CAR Passenger Facilities | October 9, 2026 | REPORTED |

## **C. Contacts Table**

The escalation methodology relies on addressing complaints to the legally mandated officers. The Ministry of Civil Aviation mandates that each airline appoint a Nodal Officer and an Appellate Authority to settle passenger grievances in a stipulated timeframe2. Online travel agencies are similarly bound by the Consumer Protection (E-Commerce) Rules to appoint Grievance Officers.

| company | channel | value | page URL | date read | label |
| :---- | :---- | :---- | :---- | :---- | :---- |
| IndiGo | Customer Care Email | customer.experience@goindigo.in | https\://www\.goindigo.in/contact-us.html | October 9, 2026 | VERIFIED |
| IndiGo | Customer Care Phone | 0124-4973838, 0124-6173838 | https\://www\.goindigo.in/contact-us.html | October 9, 2026 | VERIFIED |
| IndiGo | Nodal Officer | Isha Gandhi, NodalOfficer@goindigo.in | https\://www\.goindigo.in/contact-us.html | October 9, 2026 | VERIFIED |
| IndiGo | Appellate Authority | Pratik Arjun Sen, AppellateAuthority@goindigo.in | https\://www\.goindigo.in/indigo-norse-airlines-notice-to-passengers.html | October 9, 2026 | VERIFIED |
| Air India | Nodal Officer | Abdesh Kumar, nodalofficer@airindia.com | https\://www\.airindia.com/in/en/passenger-rights.html | October 9, 2026 | VERIFIED |
| Air India | Appellate Authority | Bhavna Tiwari, appellateauthority@airindia.com | https\://www\.airindia.com/in/en/passenger-rights.html | October 9, 2026 | VERIFIED |
| SpiceJet | Customer Care Email | custrelations@spicejet.com | https\://corporate.spicejet.com/contactus.aspx | October 9, 2026 | VERIFIED |
| SpiceJet | Customer Care Phone | 0124-4983410, 0124-7101600 | https\://corporate.spicejet.com/contactus.aspx | October 9, 2026 | VERIFIED |
| SpiceJet | Nodal Officer | Sachin Suri, nodalofficer@spicejet.com | https\://corporate.spicejet.com/contactus.aspx | October 9, 2026 | VERIFIED |
| SpiceJet | Appellate Authority | Kamal Hingorani, appellateauthority@spicejet.com | https\://corporate.spicejet.com/contactus.aspx | October 9, 2026 | VERIFIED |
| Akasa Air | Customer Care Email | info@akasaair.com | https\://www\.akasaair.com/customer-support/contact-us | October 9, 2026 | VERIFIED |
| Akasa Air | Customer Care Phone | \+91 9606 11 21 31 | https\://www\.akasaair.com/customer-support | October 9, 2026 | VERIFIED |
| Akasa Air | Nodal Officer | Deepika Poojary, nodalofficer@akasaair.com | https\://www\.akasaair.com/customer-support | October 9, 2026 | VERIFIED |
| Akasa Air | Appellate Authority | Ramita Vyas, appellateauthority@akasaair.com | https\://www\.akasaair.com/customer-support | October 9, 2026 | VERIFIED |
| MakeMyTrip | Customer Care Phone | 0124-4628747, 0124-5045105 | https\://www\.makemytrip.com/support/contact-us.php | October 9, 2026 | VERIFIED |
| MakeMyTrip | Grievance Officer | Amit Kumar Sinha, grievanceofficer@makemytrip.com | https\://giholidays.makemytrip.com/legal/gi/user\_agreement.html | October 9, 2026 | VERIFIED |
| Goibibo | Grievance Officer | Anshul Ahuja, grievanceofficer@goibibo.com | https\://www\.goibibo.com/info/user-agreement/ | October 9, 2026 | VERIFIED |
| Cleartrip | Customer Care Phone | \+91 9595333333 | https\://www\.cleartrip.com/grievance | October 9, 2026 | VERIFIED |
| Cleartrip | Grievance Officer | Shivek Kapoor / David Lima, wecare@cleartrip.com | https\://www\.cleartrip.com/grievance | October 9, 2026 | VERIFIED |
| Yatra | Customer Care Phone | 0124-4591700 | https\://investors.yatra.com/Investor-Relations-India/Investor-Contact/default.aspx | October 9, 2026 | VERIFIED |
| Yatra | Nodal Officer | Darpan Batra, legal@yatra.com | https\://investors.yatra.com/Investor-Relations-India/Investor-Contact/default.aspx | October 9, 2026 | VERIFIED |
| ixigo | Grievance Officer | Redacted by source, try info@ixigo.com or ir@ixigo.com | https\://www\.ixigo.com/about/privacy/ | October 9, 2026 | NOT FOUND |
| EaseMyTrip | Customer Care Email | care@easemytrip.com | https\://www\.easemytrip.com/contact-us.html | October 9, 2026 | VERIFIED |
| EaseMyTrip | Customer Care Phone | 011-43131313, 011-43030303 | https\://www\.easemytrip.com/contact-us.html | October 9, 2026 | VERIFIED |
| EaseMyTrip | Grievance Officer | Nikhil Kumar, care@easemytrip.com | https\://www\.easemytrip.com/pdf/free-full-refund-tnc.pdf | October 9, 2026 | VERIFIED |

## **D. Escalation Ladder per Scenario**

The escalation mechanism is the core utility of the Tickback agent. Regulatory frameworks in India dictate a progressive approach. The agent must automatically compute dates and advance the claim through the following tiers if the prior tier fails to resolve the issue. Bypassing tiers often results in administrative rejection by higher authorities.

### **Escalation Path for Scenarios 1, 2, 3, and 7 (Standard Refunds and Cancellations)**

These scenarios cover standard refunds where the airline or passenger cancelled the flight, the flight was rescheduled, or the passenger exercised the 48-hour look-in option.

* **Step 1: Primary Customer Support**  
  * **Target:** The entity where the ticket was purchased (OTA customer care or airline customer care).  
  * **Action:** Submit the initial refund request. The agent states the facts, attaches the ticket copy, specifies the rule from CAR Series M Part II, and requests the Acquirer Reference Number (ARN) if the refund is claimed to be processed.  
  * **Wait Time:** 72 hours. Corporate terms of use (such as Cleartrip's policies) specifically note a 72-hour internal SLA for Level 1 resolution10.  
* **Step 2: Nodal Officer or Grievance Officer**  
  * **Target:** The published Nodal Officer for the airline (for direct bookings) or the Grievance Officer for the OTA.  
  * **Action:** If Step 1 yields a generic rejection, an automated loop, or a voucher push, the agent escalates. This email must quote the unique Case ID generated in Step 1\. Airlines such as Air India and SpiceJet explicitly mandate quoting the initial Case ID to the Nodal Officer11.  
  * **Wait Time:** 7 to 15 calendar days.  
* **Step 3: Appellate Authority**  
  * **Target:** The airline's designated Appellate Authority (e.g., Ramita Vyas at Akasa Air, Kamal Hingorani at SpiceJet).  
  * **Action:** Used strictly if the Nodal Officer rejects the claim or fails to respond within the mandated window. The entire email chain demonstrating exhaustion of lower-tier remedies must be attached.  
  * **Wait Time:** 7 to 15 calendar days.  
* **Step 4: AirSewa Portal**  
  * **Target:** Ministry of Civil Aviation grievance portal (airsewa.gov.in).  
  * **Action:** AirSewa acts as a regulatory router, pushing the complaint directly to a designated senior compliance official at the airline. The platform mandates that airlines resolve issues within a fixed timeframe8.  
  * **Wait Time:** 30 days. This is the standard AirSewa resolution window8.  
* **Step 5: National Consumer Helpline (NCH) and e-Daakhil**  
  * **Target:** Department of Consumer Affairs.  
  * **Action:** If the airline defies AirSewa, the agent drafts the complaint for the user to file on the NCH portal or e-Daakhil.  
  * **Wait Time:** NCH typically requires up to 45 days. Consumer courts operate on legal timelines based on the docket.

### **Escalation Path for Scenarios 4 and 8 (Compensation for Denied Boarding, Delays, and Cancellations)**

Compensation claims involve punitive damages rather than simple reversals of funds, requiring a slightly modified approach.

* **Step 1: On-Site Documentation and Immediate Claim**  
  * **Target:** Airline customer service (digital or physical).  
  * **Action:** The passenger must secure written proof of the disruption (e.g., denied boarding confirmation) at the airport. The agent files a formal claim under CAR Section 3, Series M, Part IV2.  
  * **Wait Time:** 30 days for compensation processing8.  
* **Step 2: Nodal Officer**  
  * **Target:** Airline Nodal Officer.  
  * **Action:** If the airline denies compensation citing "force majeure" (extraordinary circumstances), the agent demands technical proof of the meteorological or Air Traffic Control condition, challenging blanket denials3.  
  * **Wait Time:** 15 calendar days.  
* **Step 3: AirSewa Portal**  
  * **Target:** Ministry of Civil Aviation grievance portal.  
  * **Action:** AirSewa is particularly effective for compensation disputes, as the Ministry tracks delay and cancellation statistics independently and can verify force majeure claims.  
  * **Wait Time:** 30 days8.

### **Escalation Path for Scenario 5 (Refund Processed but Not Received)**

This scenario moves out of aviation regulation and into banking regulation.

* **Step 1: Merchant Verification**  
  * **Target:** Airline or OTA customer support.  
  * **Action:** Demand the Acquirer Reference Number (ARN) or the UPI UTR.  
  * **Wait Time:** 72 hours.  
* **Step 2: Bank Dispute**  
  * **Target:** The passenger's issuing bank or credit card provider.  
  * **Action:** The agent halts airline escalation and generates a chargeback or dispute template for the user, attaching the ARN as proof that the merchant released the funds but the acquiring network failed to settle them.  
  * **Wait Time:** Dictated by Reserve Bank of India (RBI) or credit card network rules (typically 30 to 90 days).

## **E. What the User Must Have**

To execute this playbook effectively, the AI agent must extract specific data points from the user's evidence. The agent should be programmed to prompt the user for missing items before initiating the escalation ladder.

* **Booking Confirmation:** Must prominently display the Passenger Name Record (PNR), Booking ID (crucial for OTA purchases), full passenger names, exact date of booking, and flight dates.  
* **Payment Receipt:** Must clearly show the exact monetary amount paid, the method of payment (Credit Card, UPI, Net Banking), and the date of transaction.  
* **Cancellation or Disruption Notice:** The email or SMS from the airline proving they cancelled the flight, or the user's timestamped cancellation confirmation. This establishes the chronological anchor for all deadlines.  
* **Boarding Pass (If applicable):** Required exclusively for denied boarding or severe delay claims, proving the passenger actually checked in and reported to the boarding gate on time5.  
* **Tax Breakdown:** Often found in the original invoice, this is necessary for the agent to calculate the exact refund floor. Because statutory taxes, UDF, ADF, and PSF must always be refunded, the agent needs these specific figures to challenge zero-refund policies1.

## **F. How Refunds Get Stuck (REPORTED Patterns)**

Refunds in the Indian aviation sector frequently stall due to system disconnects, complex financial intermediaries, and intentional friction designed to preserve corporate cash flow. The agent must recognize these patterns and apply specific playbook countermeasures.

### **Pattern 1: The Airline-OTA Blame Loop**

When a user cancels a flight booked via an OTA, the OTA frequently claims they are waiting for the airline to process the refund. Conversely, the airline claims the money has already been returned to the travel agent. The passenger is trapped in the middle of this operational void. This occurs because OTAs use virtual credit cards or rolling deposit accounts (Billing and Settlement Plan or BSP) to book tickets on behalf of users. When an airline refunds a ticket, the money hits the OTA's corporate account, not the user's personal card. The OTA's automated system may subsequently fail to reconcile the airline's bulk refund settlement with the user's specific PNR.

* **Reported Sources:** Consumer complaints outlined in legal clinic case studies8. Additional specific forum URLs (e.g., MouthShut, Twitter threads) were NOT FOUND in the provided material, but the pattern is widely recognized in government portals.  
* **Agent Countermeasure:** The agent must firmly quote CAR Section 3, Series M, Part II, which places the legal "onus of refund" entirely on the airline to ensure the agent completes it within 21 working days1. The agent should simultaneously demand the ARN from the OTA to trace the financial flow.

### **Pattern 2: The Forced Credit Shell**

Following a flight cancellation (either passenger or airline initiated), airlines often automatically issue a travel voucher valid for a limited period, typically one year. When the user requests cash, customer service falsely asserts that the ticket was non-refundable and a voucher is the only available recourse. Airlines utilize this tactic to preserve cash flow during periods of disruption.

* **Reported Sources:** Widespread media reporting during mass disruptions, documented in advisory blogs and consumer guidelines9. Specific consumer forum URLs were NOT FOUND in the provided context.  
* **Agent Countermeasure:** The agent must quote the exact regulatory line: "The option of holding the refund amount in credit shell by the airlines shall be the prerogative of the passenger and not a default practice"1. The agent must state explicit non-consent to the voucher and demand immediate liquidation.

### **Pattern 3: Retaining Taxes on "Non-Refundable" Fares**

A passenger cancels a heavily discounted promotional fare. The airline or OTA retains the entire amount paid, claiming the fare rules dictate a zero refund. While basic fares can be zeroed out by cancellation penalties, statutory taxes (UDF, PSF, ADF) remain the property of the passenger and the government, not the airline.

* **Reported Sources:** Legal examples provided by GetNyay9, and regulatory summaries on AirSewa. Specific forum URLs were NOT FOUND in the provided context.  
* **Agent Countermeasure:** The agent must demand the itemized tax breakdown from the invoice and invoke the DGCA rule stating all statutory taxes must be refunded regardless of the fare class or non-refundable status of the basic fare1.

### **Pattern 4: The Phantom "Initiated" Refund**

The airline or OTA dashboard displays a status of "Refund Initiated" or "Success," but the money never arrives in the user's bank account, even after several weeks. This happens because the airline's payment gateway (e.g., Razorpay, BillDesk) batched the refund, but it failed at the acquiring bank level. Because the airline's internal system sent the API trigger successfully, they consider the case closed, completely ignoring the subsequent banking failure.

* **Reported Sources:** Financial dispute patterns noted in travel advisory articles8. Specific forum URLs were NOT FOUND in the provided context.  
* **Agent Countermeasure:** The agent must demand the Acquirer Reference Number (ARN) or the UPI UTR. Without an ARN, the airline has not actually moved the funds into the banking network. Once the ARN is provided, the agent instructs the user to open a chargeback or dispute with their issuing bank, absolving the airline of further direct action.

## **G. Dates the Agent Can Compute**

The agent relies on deterministic mathematics to trigger the escalation ladder. These computations ensure that Tickback only escalates when a legal or procedural deadline has been verifiably breached.

* **Scenario 1 & 2 (Airline Cancellation or Delay Refund):**  
  * *Anchor:* The date the airline issued the formal cancellation or schedule change notice.  
  * *Computation (Direct Booking):* Anchor \+ 7 calendar days. If the current date exceeds the computation date, the agent escalates to the Nodal Officer.  
  * *Computation (OTA Booking):* Anchor \+ 21 working days (excluding weekends and public holidays). If the current date exceeds the computation date, the agent escalates to the OTA Grievance Officer.  
* **Scenario 3 (Passenger Cancellation):**  
  * *Anchor:* The exact timestamp the user initiated the cancellation on the platform.  
  * *Computation:* The timelines match Scenarios 1 and 2\. However, the agent must ensure the anchor timestamp is compared against the flight departure time to determine if it falls within the airline's penalty cutoff, such as IndiGo's rigid three-hour limit for domestic flights4.  
* **Scenario 4 & 8 (Compensation for Denied Boarding or Short Notice Cancellation):**  
  * *Anchor:* The date the incident occurred at the airport, or the date the short-notice email was dispatched by the airline.  
  * *Computation:* Anchor \+ 30 calendar days. This aligns with the standard AirSewa and general grievance resolution window8. If the compensation remains unpaid, the agent drafts an AirSewa escalation.  
* **Scenario 5 (Refund Processed but Missing):**  
  * *Anchor:* The date the airline or OTA provided the Acquirer Reference Number (ARN) in the dashboard or via email communication.  
  * *Computation:* Anchor \+ 7 working days. If funds are missing after this banking window, the agent halts airline escalation and generates a bank dispute template for the user.  
* **Scenario 7 (Look-in Option):**  
  * *Anchor:* The original booking timestamp.  
  * *Computation:* Anchor \+ 48 hours. The agent must perform a secondary verification: the flight departure date minus the Anchor date must be greater than or equal to five days for domestic flights, or 15 days for international flights1. If this condition is met, the agent computes the refund as 100 percent of the total ticket value.

## **H. Open Questions and NOT FOUND Items**

During the rigorous compilation of this playbook, certain data points were obscured or require ongoing manual verification by the legal and engineering teams to ensure compliance and functionality.

* **ixigo Grievance Officer Email:** The primary privacy policy page for ixigo redacts the email addresses for the grievance officer using an aggressive anti-scraping obfuscation protocol (rendering as \[email protected\])14. The agent must default to the generic info@ixigo.com or institutional ir@ixigo.com and request internal forwarding, or alternatively, prompt the user to manually copy the address from the rendered webpage in their browser. Labelled NOT FOUND.  
* **UPI and Wallet Refund Timelines:** The DGCA CAR Section 3, Series M, Part II explicitly defines deadlines for "credit card payments" (seven days) and "cash transactions" (immediately)1. It does not explicitly define regulatory timelines for modern digital payment methods like UPI, Net Banking, or digital wallets (e.g., Paytm, MobiKwik). Standard banking practice aligns UPI with credit cards (seven days), but a formal regulatory text defining this specific technical gap remains NOT FOUND.  
* **Foreign Carrier Application of the 48-Hour Look-in Rule:** The CAR broadly applies to foreign carriers operating to and from India2. However, the practical enforcement of the 48-hour free cancellation window on foreign carriers booked via foreign portals (e.g., booking a Lufthansa flight via Expedia US while residing in India) remains legally murky and specific enforcement examples are NOT FOUND in the provided material.  
* **Calculation of "Block Time":** Flight cancellation compensation is tiered strictly based on flight block time (e.g., less than 1 hour, 1 to 2 hours, more than 2 hours)7. Airlines rarely state the block time in the cancellation email. The agent must be programmed to pull block time from historical flight data APIs (e.g., FlightAware or standard scheduling databases) to accurately compute the compensation tier.

## **I. Load-Bearing Lines**

The following 10 regulatory lines form the foundation of Tickback's legal leverage. These specific sentences dismantle common airline defenses. If the interpretation of these lines is flawed, the agent will fail the user. These must be verified by human oversight (Ganesh) before deployment into the production codebase.

> 1. "In case of credit card payments, refund shall be made by the airlines within seven days of the cancellation to the account of credit card holder." (This line dictates the core Service Level Agreement for direct bookings)1.  
> 2. "In case of purchase of ticket through travel agent/portal, onus of refund shall lie with the airlines as agents are their appointed representatives... process is completed within 21 working days." (This line legally pierces the OTA-Airline blame loop, holding the airline ultimately responsible)1.  
> 3. "The airlines shall refund all statutory taxes and User Development Fee (UDF)/Airport Development Fee (ADF)/Passenger Service Fee (PSF)... applicable for all types of fares offered including promos/special fares and where the basic fare is non-refundable." (This line ensures users always recover a portion of their funds, regardless of strict fare rules)1.  
> 4. "The airline shall provide “Look-in option” for a period of 48 hours after booking ticket. During this period passenger can cancel or amend the ticket without any additional charges." (This line provides the golden window for immediate booking regrets)1.  
> 5. "The option of holding the refund amount in credit shell by the airlines shall be the prerogative of the passenger and not a default practice of the airline." (This line destroys the forced voucher tactic used during mass cancellations)1.  
> 6. "Under no circumstances, the airline or its agent shall levy cancellation charge more than the basic fare plus fuel surcharge." (This line prevents users from developing negative balances and protects the statutory taxes from being absorbed by fees)1.  
> 7. "An amount equal to 400% of booked one-way basic fare plus airline fuel charge, subject to maximum of INR 20,000, in case airline arranges alternate flight that is scheduled to depart more than 24 hours of the booked scheduled departure." (This line sets the maximum punitive penalty for involuntarily bumping a passenger)5.  
> 8. "In case passenger does not opt for alternate flight, refund of full value of ticket and compensation equal to 400% of booked one-way basic fare plus airline fuel charge, subject to maximum of INR 20,000." (This line proves that a passenger can claim both a full refund and maximum compensation simultaneously for denied boarding)5.  
> 9. "Passengers who have not been informed as per the provisions... airlines shall provide compensation in addition to the refund of air ticket." (This line proves that refunding a cancelled flight does not erase the airline's liability for disruption compensation)7.  
> 10. "When affected by denied boarding, a cancellation or a long delay, the passenger may complain directly to the airline... The passenger may file the grievance on Air Sewa App or Portal." (This line validates the legal escalation path from internal channels to the government portal)2.

#### **Works cited**

> 1. government of india office of the director general of civil aviation, [https\://www\.dgca.gov.in/digigov-portal/Upload?flag=iframeAttachView\&attachId=NEYrfyUarqXt9W7QigEe3Q%3D%3D\&baseLocale=en\_US](https://www.dgca.gov.in/digigov-portal/Upload?flag=iframeAttachView&attachId=NEYrfyUarqXt9W7QigEe3Q%3D%3D&baseLocale=en_US)  
> 2. government of india \- DGCA, [https\://www\.dgca.gov.in/digigov-portal/Upload?flag=iframeAttachView\&attachId=we1PSlOuQhYdHcwKKrm7ew%3D%3D](https://www.dgca.gov.in/digigov-portal/Upload?flag=iframeAttachView&attachId=we1PSlOuQhYdHcwKKrm7ew%3D%3D)  
> 3. Home | Directorate General of Civil Aviation | Government of India, [https\://www\.dgca.gov.in/digigov-portal/?page=jsp/dgca/InventoryList/headerblock/knowYour/index\_files/KYR\_portal.html](https://www.dgca.gov.in/digigov-portal/?page=jsp/dgca/InventoryList/headerblock/knowYour/index_files/KYR_portal.html)  
> 4. Refunds FAQs & Support \- IndiGo, [https\://www\.goindigo.in/travel-information/en/refunds.html](https://www.goindigo.in/travel-information/en/refunds.html)  
> 5. Guidelines for air passenger compensation due to cancellation and, [https\://socialwelfare.vikaspedia.in/viewcontent/social-welfare/social-awareness/consumer-education/guidelines-for-air-passenger-compensation-due-to-cancellation-and-delay-in-flight?lgn=en](https://socialwelfare.vikaspedia.in/viewcontent/social-welfare/social-awareness/consumer-education/guidelines-for-air-passenger-compensation-due-to-cancellation-and-delay-in-flight?lgn=en)  
> 6. Passenger Rights \- SpiceJet, [https\://corporate.spicejet.com/PassengerRights.aspx](https://corporate.spicejet.com/PassengerRights.aspx)  
> 7. Passenger Rights for Flight Disruptions | PDF | Airlines \- Scribd, [https\://www\.scribd.com/doc/315428079/D3M-M4-Draft-June2016-DGCA-CAR-Passenger-Facilities](https://www.scribd.com/doc/315428079/D3M-M4-Draft-June2016-DGCA-CAR-Passenger-Facilities)  
> 8. Flight Delay & Cancellation Compensation 2026: DGCA Rules, [https\://www\.happyfares.in/blog/flight-delay-compensation-india-2026/](https://www.happyfares.in/blog/flight-delay-compensation-india-2026/)  
> 9. Airline Refund Complaint India: DGCA Rules | GetNyay, [https\://getnyay.in/airline-refund-complaint-india](https://getnyay.in/airline-refund-complaint-india)  
> 10. Terms of Use \- Login \- Cleartrip, [https\://corporate.cleartrip.com/termsofuse.xhtml](https://corporate.cleartrip.com/termsofuse.xhtml)  
> 11. Grievance Resolution \- Customer Support & Feedback \- Air India, [https\://www\.airindia.com/in/en/contact-us/grievance-resolution.html](https://www.airindia.com/in/en/contact-us/grievance-resolution.html)  
> 12. Contact Us | SpiceJet Airlines, [https\://corporate.spicejet.com/contactus.aspx](https://corporate.spicejet.com/contactus.aspx)  
> 13. AirSewa, [https\://airsewa.gov.in/](https://airsewa.gov.in/)  
> 14. Privacy – About ixigo, [https\://www\.ixigo.com/about/privacy/](https://www.ixigo.com/about/privacy/)