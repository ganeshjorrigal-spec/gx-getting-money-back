# Verification of flights.md

Checked on 9 October 2026. Tool: WebFetch and WebSearch. curl through the proxy was blocked (403), so all DGCA PDFs were read through WebFetch. WebFetch limits quote length, so long quotes were checked in parts. Where only part of a quote could be seen, this is said.

## Key finding first

The refund CAR (Section 3, Series M, Part II) cited in R01 to R07 is the old version. The PDF at the cited URL is dated 22 May 2008, with "Feb, 2019" in its footers, a blank effective date and no revision number. It does not say "Revision 3" or "March 2026", although section B of flights.md says it does.

News reports say DGCA issued a revised Part II on 24 February 2026, effective immediately. The reported changes:
- Agent or portal refunds: 14 working days, not 21.
- Look-in option: not available if departure is less than 7 days away for domestic flights, not 5. The international limit stays at 15 days. The exclusion applies to tickets booked directly on the airline website.
- New: free name correction within 24 hours of booking a ticket directly on the airline website.
- Credit card refunds in 7 days, cash refunds at once and credit shell at the passenger's choice: reported as unchanged.

Sources (news, REPORTED): https://www.dtnext.in/news/national/dgca-revises-air-ticket-refund-norms-no-addl-charges-for-changes-within-48-hrs-of-booking and https://www.flapone.com/news/dgca-makes-air-ticket-refund-rules-passenger-friendly . I could not find the official DGCA URL for the 2026 text. Someone must find it and re-quote R01 to R07 from it.

The delay and cancellation CAR (Part IV) at citation 2 is Rev. 4. It is dated 25 January 2023 and took effect on 15 February 2023. It is official, and it contains the denied boarding and cancellation compensation text. Its URL is https://www.dgca.gov.in/digigov-portal/Upload?flag=iframeAttachView&attachId=we1PSlOuQhYdHcwKKrm7ew%3D%3D . I saw no newer version, but I did not prove that none exists.

## C. Load-bearing lines (section I)

| # | verdict | what I saw | change needed |
|---|---|---|---|
| 1 | SUPERSEDED | Text found in the 2008/2019 PDF, para 3(a). A 2026 revision exists. News reports say the 7 days did not change. | Re-quote from the official 2026 CAR. |
| 2 | SUPERSEDED | Text found in the old PDF, para 3(c). The 2026 revision reportedly says "within 14 working days". | 21 must become 14 (once checked in the official text). This affects sections A, D and G as well. |
| 3 | SUPERSEDED | Text found in the old PDF, para 3(d). The 2026 text was not seen. | Re-quote from the 2026 CAR. |
| 4 | SUPERSEDED | Text found in the old PDF, para 3(e). The full para also says "except for normal prevailing fare" for an amended flight. The 5/15 day exclusion applies to tickets "booked directly through the airline website". The 2026 revision reportedly changes domestic from 5 to 7 days. | Use 7 days for domestic. Add the fare difference caveat and the direct-booking condition. |
| 5 | SUPERSEDED | Text found in the old PDF, para 3(f). Reportedly unchanged in 2026. | Re-quote from the 2026 CAR. |
| 6 | SUPERSEDED | Text found in the old PDF, para 3(i). The full para leaves out agent charges that were fully disclosed at booking. The playbook does not mention this. | Re-quote from the 2026 CAR. Add the agent fee carve-out. |
| 7 | PAGE UNAVAILABLE | Cited source 5 (Vikaspedia): the body text did not load. The 400% / INR 20,000 text does appear in the official Part IV, para 3.2.2. The exact words "more than 24 hours of the booked scheduled departure" were not confirmed word for word. | Cite the official Part IV para 3.2.2 and re-quote from it. |
| 8 | PAGE UNAVAILABLE | Cited source 5 did not load. The official Part IV para 3.2.2 has "In case passenger does not opt for alternate flight," followed by a full refund plus 400% capped at INR 20,000. | Cite the official Part IV. |
| 9 | PAGE UNAVAILABLE | Cited source 7 (Scribd, a 2016 draft) showed only a "JavaScript disabled" page. The official Part IV para 3.3.2 begins "Passengers who have not been informed as per the provisions contained in Para 3.3.1,". It then lets the airline offer an alternate flight OR pay compensation in addition to a refund. Para 3.3.4 removes compensation for extraordinary circumstances. | Cite the official Part IV. The note "refund does not erase liability" overstates the rule: it only holds when no acceptable alternate flight was offered and the cause was not extraordinary. |
| 10 | CONFIRMED | Official Part IV para 3.9.1: "When affected by denied boarding, a cancellation or a long delay" and "the passenger may complain directly to the airline in the event the airline has not provided the compensation". Para 3.9.2: "The passenger may file the grievance on Air Sewa App or Portal." | Small point: the clause about complaining to the airline is limited to cases where the airline has not paid the compensation. |

## A. Counts per verdict (36 rows: R01 to R11 plus 25 contacts)

| verdict | rules | contacts | total |
|---|---|---|---|
| CONFIRMED | 0 | 17 | 17 |
| WEAKENED | 0 | 2 | 2 |
| NOT ON PAGE | 1 | 0 | 1 |
| PAGE UNAVAILABLE | 3 | 6 | 9 |
| SUPERSEDED | 7 | 0 | 7 |

Load-bearing lines: CONFIRMED 1, SUPERSEDED 6, PAGE UNAVAILABLE 3.

## B. Row table

### Rules

| id | verdict | what you saw | change needed |
|---|---|---|---|
| R01 | SUPERSEDED | Quote is in para 3(a) of the 2008/2019 PDF. A 2026 revision exists. | Re-quote from the 2026 CAR. Remove the "Revision 3, March 2026" claim, because the cited PDF does not show it. |
| R02 | SUPERSEDED | Quote is in para 3(b) of the old PDF. | Re-quote from the 2026 CAR. |
| R03 | SUPERSEDED | Quote is in para 3(c) of the old PDF. The 2026 revision reportedly says 14 working days. | Change 21 to 14 after checking the official text. |
| R04 | SUPERSEDED | Quote is in para 3(d) of the old PDF. | Re-quote from the 2026 CAR. |
| R05 | SUPERSEDED | Quote is in para 3(e) of the old PDF. The 5/15 day exclusion applies to direct website bookings. The 2026 revision reportedly makes domestic 7 days. | Use 7 days. Add the direct-booking condition and the fare difference caveat. |
| R06 | SUPERSEDED | Quote is in para 3(f) of the old PDF. | Re-quote from the 2026 CAR. The plain sentence says "without consent". This is a fair reading, but the source says "prerogative of the passenger". |
| R07 | SUPERSEDED | Quote is in para 3(i) of the old PDF. Disclosed agent charges are excluded. | Re-quote from the 2026 CAR. Add the carve-out. |
| R08 | PAGE UNAVAILABLE | The Vikaspedia body did not load. The same text is in the official Part IV para 3.2.2. Part IV also says no compensation is due if the alternate flight leaves within 1 hour of the original departure. | Re-source to the official Part IV and relabel VERIFIED only after re-quoting from it. Add the 1-hour exception. |
| R09 | PAGE UNAVAILABLE | Vikaspedia did not load. The official Part IV has the 400% / INR 20,000 rule for an alternate flight more than 24 hours later. The exact words were not confirmed. | Re-source to the official Part IV. |
| R10 | NOT ON PAGE | The SpiceJet page wording is different: "In case the passenger does not opt for an alternate flight, they will receive a refund of the full value of the ticket and compensation equal to 400%...". The quoted words are close to the official Part IV ("In case passenger does not opt for alternate flight,"). | Re-source to the official Part IV, or use SpiceJet's real wording. |
| R11 | PAGE UNAVAILABLE | Scribd did not render. It is also a 2016 draft, not the rule in force. The official Part IV para 3.3.2 has INR 5,000 / 7,500 / 10,000 "or booked one-way basic fare plus airline fuel charge, whichever is less", by block time band. | Re-source to the official Part IV. Add "whichever is less". The current plain sentence implies a flat amount. |

### Contacts

| row | verdict | what you saw | change needed |
|---|---|---|---|
| IndiGo customer email | CONFIRMED | Shown as Customer.experience@goindigo.in | None |
| IndiGo phone | CONFIRMED | 0124-4973838 / 0124-6173838 | None |
| IndiGo nodal | CONFIRMED | Isha Gandhi, nodalofficer@goindigo.in | None |
| IndiGo appellate | CONFIRMED | Found on the cited EU261 notice page, and also on contact-us.html | Better to cite contact-us.html, since the EU261 page is for EU departures. |
| Air India nodal | CONFIRMED | Mr. Abdesh Kumar, nodalofficer@airindia.com | None |
| Air India appellate | CONFIRMED | Ms. Bhavna Tiwari, appellateauthority@airindia.com | None |
| SpiceJet email | CONFIRMED | custrelations@spicejet.com | None |
| SpiceJet phone | CONFIRMED | +91 (0)124 4983410, +91 (0)124 7101600 (Reservations) | Note that these are reservations lines. |
| SpiceJet nodal | CONFIRMED | Mr. Sachin Suri, nodalofficer@spicejet.com | None |
| SpiceJet appellate | CONFIRMED | Mr. Kamal Hingorani, appellateauthority@spicejet.com | None |
| Akasa email | PAGE UNAVAILABLE | The contact-us page gave a fetch error. info@akasaair.com is not on the customer-support page. | Mark unverified until it is seen on a page. |
| Akasa phone | CONFIRMED | +91 9606 11 21 31 | None |
| Akasa nodal | CONFIRMED | Deepika Poojary, nodalofficer@akasaair.com | None |
| Akasa appellate | CONFIRMED | Ramita Vyas, appellateauthority@akasaair.com | None |
| MakeMyTrip phone | PAGE UNAVAILABLE | The page blocks fetching (robots). | Mark unverified. |
| MakeMyTrip grievance | CONFIRMED | Mr. Amit Kumar Sinha, grievanceofficer@makemytrip.com. The page is on the giholidays subdomain but names MakeMyTrip (India) Pvt Ltd. | Better to cite MakeMyTrip's main user agreement. |
| Goibibo grievance | PAGE UNAVAILABLE | The page blocks fetching (robots). | Mark unverified. |
| Cleartrip phone | PAGE UNAVAILABLE | The page came back as an empty shell (JavaScript only). | Mark unverified. |
| Cleartrip grievance | PAGE UNAVAILABLE | Same. Also, two names against one shared email is unclear. | Mark unverified. |
| Yatra phone | WEAKENED | "0124 - 4591700" is the line for the "Nodal Officer for IEPF" on the investor page. It is not customer care. | Remove it as customer care. |
| Yatra nodal | WEAKENED | Darpan Batra is "Company Secretary and Compliance Officer" and the IEPF nodal officer (investor matters). He is not a passenger grievance officer. | Remove. Find Yatra's real grievance officer in its user agreement. |
| ixigo grievance | PAGE UNAVAILABLE | Server error. Already labelled NOT FOUND. | Keep it as NOT FOUND. Do not use the guessed emails. |
| EaseMyTrip email | CONFIRMED | Care@easemytrip.com / care@easemytrip.com | None |
| EaseMyTrip phone | CONFIRMED | "011 - 43131313, 43030303" | None |
| EaseMyTrip grievance | CONFIRMED | Section 38 of the PDF: Nikhil Kumar, care@easemytrip.com | None |

## D. Must remove or relabel before use

1. R01 to R07 and load-bearing lines 1 to 6: superseded. Re-quote all of them from the official February 2026 Part II CAR. Change 21 working days to 14 (R03, line 2, and sections A, D, F and G). Change the domestic look-in limit from 5 to 7 days (R05, line 4, and sections A and G). Delete the "Revision 3, March 2026" claim in section B unless the official 2026 PDF shows it.
2. R08, R09 and R11, and lines 7, 8 and 9: replace the Vikaspedia and Scribd sources with the official Part IV Rev. 4 URL (citation 2). Do not use the Scribd 2016 draft. Add "whichever is less" to R11 and the 1-hour exception to R08.
3. R10: the quote is not on the SpiceJet page. Re-source to the official Part IV.
4. Yatra phone and Yatra nodal: remove. They are investor (IEPF) contacts.
5. Unverified contacts, to relabel from VERIFIED to unverified: Akasa email, MakeMyTrip phone, Goibibo grievance, Cleartrip phone, Cleartrip grievance.
6. Line 9 note: soften "refund does not erase liability". Compensation applies only when no acceptable alternate flight was offered and there were no extraordinary circumstances.
