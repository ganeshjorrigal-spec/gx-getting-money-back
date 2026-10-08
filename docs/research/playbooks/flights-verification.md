# Verification of flights.md (v2)

Verifier: independent pass, 9 Oct 2026. I read only live pages. I did not use docs/research/sources/ or any gemini-raw file.

How each source was read:
- DGCA CAR index (dgca.gov.in, Civil Aviation Requirements, Section 3, Series M): read in the browser.
- CAR M-II (scanned PDF): opened from the DGCA index in the browser PDF viewer and read from screenshots. I read page 1, all of page 2, and the top of page 3 (3(j) to the first lines of 3(m)). I did not see the rest of page 3.
- CAR M-IV (text PDF): opened from the DGCA index, text extracted with pdf.js, and each quote matched by machine after removing spaces.
- MakeMyTrip, Goibibo, Cleartrip, Akasa Air, MakeMyTrip contact page: read in the browser (full page text).
- IndiGo, Air India, SpiceJet, EaseMyTrip pages: read through WebFetch. WebFetch returns a model summary of the live page, with quoted values. That is weaker than reading the raw text. The values matched exactly, but a human spot check is wise before hard-coding.

Versions on the DGCA index (read 9 Oct 2026, page "Last Updated 09 Oct 2026"):
- Series M Part II: Issue I 22.05.2008, Rev. 3, 24.02.2026. The PDF says "DATED 24 February, 2026", "EFFECTIVE: 26 March 2026", footer "Rev. 3, dated 24 Feb 2026". Current. Not superseded.
- Series M Part IV: Issue I 06.08.2010, Rev. 4, 25.01.2023, "(Effective 15th February 2023)". The PDF header says "Rev. 4, dated 25th Jan, 2023" and "EFFECTIVE: 15th February 2023". Current. Not superseded.

## C. Load-bearing lines (section I) and verdicts

| # | line | verdict | note |
|---|---|---|---|
| 1 | F03, 14 working days, onus on airline for travel-site bookings | WEAKENED | Quote and onus confirmed word for word. But the CAR does not say when the 14 working days start. "Cancellation date + 14 working days" is an inference. Mark the anchor HQ DEFAULT. |
| 2 | F01, 7 days to a credit card | WEAKENED | Quote confirmed. The plain sentence says "Card refunds". The CAR says credit card only. Change to "Credit card refunds". |
| 3 | F06, credit shell is the passenger's prerogative | CONFIRMED | Word for word on M-II page 2, 3(f). |
| 4 | F04, taxes and airport fees always refunded | CONFIRMED | Word for word, 3(d). Covers cancellation, non-use, no show, promo and non-refundable fares. |
| 5 | F05, 48-hour look-in and 7/15 day condition | CONFIRMED (quote), plain sentence WEAKENED | Quote matches 3(e). The plain sentence says "Free cancel or change" but drops "except for the normal prevailing fare for the revised flight". Add "fare difference still applies" to the row. The page also adds a sentence after the quote: beyond 48 hours the option is not available and normal cancellation fees apply. |
| 6 | F07, cancellation charge cap and travel-agent fee exclusion | CONFIRMED | Word for word, 3(i). The page continues: "It shall be the responsibility of the airline to ensure this through their contracts with travel agents/portals." Not needed, but supports the row. |
| 7 | F13, declined alternate after denied boarding | CONFIRMED | Word for word, M-IV 3.2.2(c). Applies only to denied boarding "against their will" under 3.2.1 (overbooking). |
| 8 | F15, short-notice cancellation, refund plus compensation unless F17 | CONFIRMED | 3.3.2 and amounts a to c match. 3.3.4 confirms the extraordinary circumstances exclusion. |
| 9 | F17, no compensation for weather, ATC, security and similar | CONFIRMED | Word for word, 1.5. "Strikes" comes from 1.4, which the row cites. "Refund is still owed" is not in the quote; it is supported by 3.3.5 (refund per M-II). Add 3.3.5 to the cite. |
| 10 | F20 and F21, AirSewa, Nodal Officer, Appellate Authority | CONFIRMED | 3.9.1 to 3.9.3 and 3.10.4 to 3.10.5 match. Scope note: 3.9.1 is about denied boarding, cancellation or long delay. Using AirSewa for a passenger-cancelled refund (scenario 3, 7) is reasonable but is not stated in M-IV. |

## A. Counts

Rule table (23 rows):
- CONFIRMED: 17
- WEAKENED: 6 (F01, F03, F05, F08, F16, F18)
- NOT ON PAGE: 0
- PAGE UNAVAILABLE: 0
- SUPERSEDED: 0

Contacts table (25 rows):
- CONFIRMED: 22
- WEAKENED: 1 (AirSewa)
- Not re-checked: 2 (Yatra, ixigo NOT FOUND claims; an absence claim cannot be confirmed from one page and I did not open them)

## B. Rule table

| id | verdict | what you saw | change needed |
|---|---|---|---|
| F01 | WEAKENED | M-II p2, 3(a): quote word for word. Text says "credit card payments" and "credit card holder". | Plain sentence: "Credit card refunds are due within 7 days of cancellation." "Calendar days" is an inference; keep it but mark as HQ reading. |
| F02 | CONFIRMED | 3(b) word for word. | None. |
| F03 | WEAKENED | 3(c) word for word. No start point for the 14 working days is stated. | Mark the anchor "cancellation date + 14 working days" as HQ DEFAULT, not as the rule. |
| F04 | CONFIRMED | 3(d) word for word. | None. |
| F05 | WEAKENED | 3(e) quote word for word. Next sentence on page: "Beyond 48 hours of initial booking time, this option is not available and the passenger has to pay the relevant cancellation fees for amendment." | Plain sentence must say the fare difference for a changed flight still applies. |
| F06 | CONFIRMED | 3(f) word for word. | None. |
| F07 | CONFIRMED | 3(i) word for word. | None. |
| F08 | WEAKENED | M-II p3, 3(j): "The airlines shall not levy any additional charge to process the refund." The duty is on airlines. | Plain sentence: "The airline may not charge extra to process a refund." Do not use it against a travel site's own disclosed fee. |
| F09 | CONFIRMED | 3(m) opening matches word for word. The paragraph continues ("For all other situations, refunds will be issued once an opinion on the passenger's fitness to travel certificate is received...") and I could not read the rest of page 3. | Ganesh to read the full 3(m) before the agent uses it; the tail may add conditions. |
| F10 | CONFIRMED | M-IV 3.2.2 word for word. Applies when boarding is denied "against their will" under 3.2.1. | Optional: add "involuntary" to the sentence. |
| F11 | CONFIRMED | 3.2.2(a) word for word. | None. |
| F12 | CONFIRMED | 3.2.2(b) word for word. | None. |
| F13 | CONFIRMED | 3.2.2(c) word for word. | None. |
| F14 | CONFIRMED | 3.3.1 second sentence word for word. | None. |
| F15 | CONFIRMED | 3.3.2 word for word; a) Rs 5,000 up to 1 hr block, b) Rs 7,500 over 1 to 2 hrs, c) Rs 10,000 over 2 hrs, each "or booked one-way basic fare plus airline fuel charge, whichever is less". | None. |
| F16 | WEAKENED | 3.3.3 word for word. It sits in the cancellation section (3.3). | Plain sentence: "No cancellation compensation if...". Do not apply it to denied boarding (3.2) without a source. Drop scenario 8 or narrow it. |
| F17 | CONFIRMED | 1.5 word for word. 1.4 lists strikes and labour disputes. 3.3.4 and 3.3.5 confirm no compensation but refund still per M-II. | Add 3.3.5 to the cite for "refund is still owed". |
| F18 | WEAKENED | 3.4.2 word for word. The bracket "(communicated more than 24 hours prior to original scheduled departure time)" describes the "previously revised departure time" from which the delay is measured. It is not a condition "if not announced 24 hours ahead". | Plain sentence: "Domestic flight expected to be delayed more than 6 hours from the published time, or from a revised time told more than 24 hours before the original departure: alternate flight within 6 hours or full refund." |
| F19 | CONFIRMED | 3.7.1 word for word. | None. |
| F20 | CONFIRMED | 3.9.1, 3.9.2, 3.9.3 match the path. | Note scope: 3.9.1 is for denied boarding, cancellation or long delay. |
| F21 | CONFIRMED | 3.10.4 word for word; it also says details must be "conspicuously" displayed on the website. 3.10.5: "All complaints registered shall be issued a unique reference number." | None. |
| F22 | CONFIRMED | MakeMyTrip user agreement: quote word for word, plus "For refunds relating to transactions more than 6 months old, MMT shall make all efforts to process refunds within 96 hours post receipt of refund from service provider and receipt of banking details from customer." Same text on Goibibo user agreement. | Optional: add "and receipt of bank details" to the 96-hour part. Label VERIFIED (company terms) is right. |
| F23 | CONFIRMED | cleartrip.com/grievance: "If your query / complaint is not resolved within 72 hours (or as advised by cleartrip representative)..." then write to the Grievance Officer with Trip ID. | None. |

Sections A, D, G checked against the rows:
- A, scenario 2: fine, but inherits the F18 misreading if reworded from the row. Uses "A domestic delay of more than 6 hours", which is fine.
- A, M-II line: "Refund in 7 days to a credit card" is correct here. "No charge to process a refund" should say "by the airline" (F08).
- A, scenario 8 and G: fine.
- D, refund step 2: "48-hour acknowledgement and one-month redressal" under the e-commerce rules is not backed by any row in this file (it points to online-stores.md O04, not checked here). Cleartrip's page does say acknowledgement within 48 hours; MakeMyTrip's agreement says the grievance officer will "endeavour to redress the concern within 30 days". Either cite those or keep the O04 cross-reference and check O04.
- D, step 4 and refund scenarios: AirSewa for passenger-cancelled refunds is not in M-IV (see F20 note).
- D, step 5: "NCH page says resolution may take up to 30 days" has no row and no URL. Unverified.
- D, scenario 5: RBI Integrated Ombudsman has no row. Unverified.
- D, compensation: 3.4.5 is confirmed, but it is about proof of when the passenger was told of a delay, not proof of the cause. The sentence sits right after "ask it to state the cause", which can read as a burden on cause. Separate the two.
- G: "7 calendar days" and "Monday to Friday" are HQ readings, already marked in H3. The 14-day anchor needs the HQ DEFAULT mark (F03).

## Contacts table

| company / channel | verdict | what you saw | change needed |
|---|---|---|---|
| IndiGo email | CONFIRMED | "Customer.experience@goindigo.in" (case differs only) | None. |
| IndiGo phone | CONFIRMED | "0124-4973838 / 0124-6173838" (call centre) | None. |
| IndiGo Nodal Officer | CONFIRMED | Isha Gandhi, nodalofficer@goindigo.in | None. |
| IndiGo Appellate Authority | CONFIRMED | Pratik Arjun Sen, appellateauthority@goindigo.in | None. |
| Air India Nodal Officer | CONFIRMED | Mr. Abdesh Kumar, nodalofficer@airindia.com | None. |
| Air India Appellate Authority | CONFIRMED | Ms. Bhavna Tiwari, appellateauthority@airindia.com | None. |
| SpiceJet email | CONFIRMED | custrelations@spicejet.com, "For any Feedback / Suggestions / Complaints" | None. |
| SpiceJet phone | CONFIRMED | +91 (0)124 4983410, +91 (0)124 7101600, "Customer Care - Reservations (24 Hours)" | None. |
| SpiceJet Nodal Officer | CONFIRMED | Mr. Sachin Suri, nodalofficer@spicejet.com (phone +91 124-3913939 also listed) | None. |
| SpiceJet Appellate Authority | CONFIRMED | Mr. Kamal Hingorani, appellateauthority@spicejet.com | None. |
| Akasa email | CONFIRMED | "Corporate Office ... Email us at info@akasaair.com" | None (row already says head office). |
| Akasa phone | CONFIRMED | "Speak to Akasa Care Officers 9606 11 21 31", 24x7 | None. |
| Akasa Nodal Officer | CONFIRMED | akasaair.com/customer-support: Ms. Deepika Poojary, nodalofficer@akasaair.com | None. |
| Akasa Appellate Authority | CONFIRMED | Ms. Ramita Vyas, appellateauthority@akasaair.com | None. |
| MakeMyTrip phone | CONFIRMED | "Gurgaon (Head Office) ... Fixed Line: (0124) 4628747 (0124) 5045105" | Optional: label as head office fixed line, not a customer care line. |
| MakeMyTrip Grievance Officer | CONFIRMED | "Ms. Jasbir Kaur", grievanceofficer@makemytrip.com, +91 8065139029 | None. |
| Goibibo Grievance Officer | CONFIRMED | "Anshul Ahuja" and grievanceofficer@goibibo.com both on the page | None. |
| Cleartrip phone | CONFIRMED | +91 9595333333, 24x7, with Trip ID | None. |
| Cleartrip Grievance Officer | CONFIRMED | Mr. Shivek Kapoor, Manager - Consumer Grievances, wecare@cleartrip.com | None. |
| EaseMyTrip email | CONFIRMED | "Care@easemytrip.com" | None. |
| EaseMyTrip phone | CONFIRMED | "011 - 43131313, 43030303" | None. |
| EaseMyTrip Grievance Officer | CONFIRMED | Nikhil Kumar, care@easemytrip.com, in the PDF (a general terms and conditions document) | None. |
| Yatra | Not re-checked | Absence claim. | Keep NOT FOUND; do not use. |
| ixigo | Not re-checked | Absence claim. | Keep NOT FOUND; do not use. |
| AirSewa | WEAKENED | CAR M-IV 3.9.2 names "Air Sewa App or Portal" but gives no URL. airsewa.gov.in loads with title "AirSewa" and offers "Report Grievance", but ownership text needs JavaScript. Akasa's page calls AirSewa an initiative of the Ministry of Civil Aviation. | Cite airsewa.gov.in itself (a .gov.in site) as the source of the URL, not CAR 3.9.2. |

## D. Rows to fix or relabel before use

Must fix (wording would overstate the rule):
1. F01: "Card refunds" to "Credit card refunds".
2. F18: rewrite the bracket meaning (it sets the base time for measuring the delay, not a notice condition).
3. F16: limit to cancellation compensation; remove scenario 8 or narrow it.
4. F08: limit to the airline.

Must relabel:
5. F03 anchor and G "travel-site refund due": start date is HQ DEFAULT, not in the CAR.
6. AirSewa contact: cite airsewa.gov.in, not CAR 3.9.2.

Should fix:
7. F05: add "fare difference still applies" to the plain sentence.
8. F09: Ganesh to read all of 3(m) on page 3 before use.
9. F17: add 3.3.5 as the cite for "refund still owed".
10. Section D: NCH 30 days, RBI Ombudsman, and the e-commerce 48-hour and one-month claims have no row here. Either source them or mark them unverified. Separate the 3.4.5 burden of proof from the "state the cause" sentence.
