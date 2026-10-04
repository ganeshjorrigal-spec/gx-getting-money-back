# Research: event-ticket refund routes in India (raw, 4 Oct 2026)

Source: research run by a Claude HQ sub-agent on 4 Oct 2026 with web search and page fetches. Raw material, write once. The curated version the product uses is `docs/prd/06-routes-kb.md`.

Labels: VERIFIED = primary source seen. REPORTED = secondary source. NOT FOUND = not found; never invent.

Fetch limits on the day: bookmyshow.com pages could not be opened ("site blocked"). zomato.com policy pages refused by robots.txt. consumeraffairs.nic.in timed out. So every BookMyShow claim is REPORTED and needs a manual check in a browser.

## 1. Ticketing platforms

### 1A. District (Zomato / Eternal; Paytm Insider moved into it)

| Item | Finding | Label | Source |
|---|---|---|---|
| Insider moved into District | Zomato bought Paytm's ticketing business (Insider) and launched District; deal closed Aug 2024 | REPORTED | https://www.business-standard.com/companies/news/zomato-completes-acquisition-of-paytm-s-entertainment-ticketing-biz-124082800685_1.html |
| Cancelled event | "If an Event is cancelled and the Merchant of such Event agrees on issuing a refund for the tickets, it shall be the Merchant's responsibility to instruct District to communicate and contact you and process the refund." Refund depends on the organiser. | VERIFIED | https://www.district.in/policies/events/booking-terms |
| Postponed event | Organiser "at its sole discretion may give you an option to attend the Event on a rescheduled date or... avail a refund within a specific duration communicated to you by District." | VERIFIED | same |
| Venue, artist or time change | Not covered in the terms | NOT FOUND | same |
| Buyer cannot attend | "Tickets once sold cannot be exchanged, cancelled, modified, transferred, or refunded" | VERIFIED | same |
| Refund timeline | "your refunds may reflect in your account within seven (7) to ten (10) working days from the date of receiving the refund request" | VERIFIED | same |
| Failed payment timeline | District processes it "within 3 to 5 days, it may take up to 7 to 10 working days (and sometimes more)" for the bank to credit | VERIFIED | same |
| Claim window after an event that happened | Within seventy-two (72) hours from the date of the event | VERIFIED | same |
| Convenience fee | "non-refundable except for the Event(s) which are cancelled by the Merchant(s)" | VERIFIED | same |
| Support channels | In-app chat, email support@district.in, phone 0124-4268565, web form with an "Events" category | VERIFIED | https://www.district.in/contact |
| Legal entity | Wasteland Entertainment Private Limited, Mumbai | VERIFIED | same |
| Grievance Officer | Not on contact page, booking terms, privacy policy or /policies/grievance-redressal. Privacy policy lists only a Data Protection Officer (privacy@zomato.com). Terms of Service page did not render. | NOT FOUND | https://www.district.in/policies/terms-of-service |
| Zomaland terms | Exist at zomato.com/policies/zomaland/ but could not be fetched | NOT FOUND | https://www.zomato.com/policies/zomaland/ |

### 1B. BookMyShow (Bigtree Entertainment Pvt Ltd)

| Item | Finding | Label | Source |
|---|---|---|---|
| Buyer cannot attend (live events) | "There is no ticket cancellation applicable for Live Entertainment"; resale on its marketplace is the only option | REPORTED | https://swadeshiapps.com/entertainment/bookmyshow |
| Cancelled event | Ticket price refunded. Convenience fee refund unclear; sources conflict | REPORTED | same |
| Timeline (announcements) | Shubh tour cancellation: refund "within 7-10 working days in the customer's source" account | REPORTED | https://x.com/bookmyshow/status/1704404315568214167 |
| Timeline (Bandland 2026) | "full refunds processed within 8-10 working days to their original payment method" | REPORTED | https://rollingstoneindia.com/bandland-festival-2026-canceled/ |
| Grievance Officer | A third-party aggregator lists a name, allears@bookmyshow.com, escalations@bookmyshow.com, a phone and a Juhu address. Do not ship until checked on bookmyshow.com | REPORTED (aggregator only) | https://citizen.complainthub.org/t/bookmyshow-official-grievance-redressal-escalation-protocol/30651 |
| URL where BMS publishes the officer | Could not be opened | NOT FOUND | https://in.bookmyshow.com/terms-and-conditions |

### 1C. Other platforms

| Platform | Finding | Label | Source |
|---|---|---|---|
| Ticketmaster India | Entity registered; no evidence of an active consumer site in 2026 | NOT FOUND | https://tracxn.com |
| SkillBox | Active. Refund policy, support email, Grievance Officer not extracted | Active VERIFIED, rest NOT FOUND | https://www.skillboxes.com/ |
| Ticketgenie (RCB home matches, IPL 2025) | Refund-claim email refund@ticketgenie.in | REPORTED | https://www.crictracker.com/cricket-news/ipl-2025-will-fans-get-refund-for-washed-out-game-between-rcb-and-kkr-at-m-chinnaswamy-stadium-explained/ |

### 1D. Forms and physical ticket returns (IPL)

- RCB vs KKR, 17 May 2025, washed out with no toss: face value refunded; taxes and convenience fee not refunded. Online tickets refunded by 31 May 2025; if not received, email refund@ticketgenie.in. Physical tickets: collect the refund where the ticket was bought. REPORTED (CricTracker, The Hawk).
- RCB vs SRH, 23 May 2025, moved from Bengaluru to Lucknow: digital ticket holders refunded within 10 working days; physical ticket holders got separate instructions. REPORTED (Sportskeeda).
- RCB 13 and 17 May 2025 matches after IPL suspension: digital holders told by email or SMS; physical holders told to keep tickets; "subject to terms and conditions". REPORTED (Sportskeeda).
- Pattern: for cricket, each franchise and its ticketing partner set the route per match. Physical tickets often need an offline step. Rules depend on how much of the match was played.

## 2. Consumer Protection (E-Commerce) Rules, 2020

| Item | Finding | Label | Source |
|---|---|---|---|
| Notification | G.S.R. 462(E), 23 July 2020 | REPORTED | https://www.icsi.edu/media/webmodules/Consumer_Protection_E-Commerce_Rules_2020.pdf |
| Scope (Rule 2) | All goods and services bought or sold over digital or electronic network; marketplace and inventory models | REPORTED | https://www.legitquest.com/act/consumer-protection-e-commerce-rules-2020/91c8 |
| Rule 4(4) | Grievance redressal mechanism and a grievance officer whose name, contact and designation are shown on the platform | REPORTED | same |
| Rule 4(5) | Officer "acknowledges the receipt of any consumer complaint within forty-eight hours and redresses the complaint within one month from the date of receipt" | REPORTED (same wording in three copies) | same |
| Rule 4(10) | Accepted refunds paid "within a reasonable period of time, or as prescribed under applicable laws" | REPORTED | same |
| 2026 amendment | G.S.R. 789(E), 9 Sep 2026, in force from 1 Jan 2027: copy of complaint as recorded; every e-commerce entity must join NCH convergence | REPORTED | https://taxguru.in/corporate-law/consumer-protection-commerce-amendment-rules-2026.html |
| Primary text | consumeraffairs.nic.in not reachable | NOT FOUND | |

## 3. RBI TAT harmonisation circular (20 Sep 2019)

Circular RBI/2019-20/67, DPSS.CO.PD No.629/02.01.014/2019-20. VERIFIED: https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11693

- T = day of transaction (calendar date). R = day the reversal reaches the issuer or originator.
- Online card payment, account debited but no confirmation at merchant: auto-reversal within T+5; Rs 100 per day after T+5.
- UPI merchant payment, account debited but no confirmation at merchant: auto-reversal within T+5; Rs 100 per day after T+5.
- UPI person-to-person, debited but beneficiary not credited: T+1; Rs 100 per day after. IMPS same.
- Compensation is paid suo moto, without a claim.
- Scope warning: failed transactions only (money left, no ticket issued). Not refunds for cancelled events. Not checked whether the 2019 circular was replaced.

## 4. National Consumer Helpline (NCH)

| Item | Finding | Label | Source |
|---|---|---|---|
| Toll-free | 1915 and 1800-11-4000 | VERIFIED | https://consumerhelpline.gov.in/public/contact |
| WhatsApp and SMS | +91 8800001915 | VERIFIED | same |
| Email | nch-ca@gov.in | VERIFIED | same |
| Hours | 8 AM to 8 PM daily, except national holidays | VERIFIED | same |
| Portal | https://consumerhelpline.gov.in/user/ (also NCH app, UMANG). INGRAM is the platform behind it | VERIFIED | https://consumerhelpline.gov.in/public/about |
| What to file | One-time registration, grievance details, optional documents | VERIFIED | same |
| What happens | Docket number; forwarded to company/regulator; real-time status; up to 30 days; if unresolved, Consumer Commission | VERIFIED | same |
| Convergence | Voluntary, free; complaints forwarded in real time; partners "expected" to respond within 30 days; 2,000+ companies | VERIFIED | https://consumerhelpline.gov.in/public/convergenceprogram |
| Are BMS or District partners? | Not checked | NOT FOUND | |

## 5. Refund tracing: ARN, RRN, UTR

- ARN (Acquirer Reference Number): 23 digits, traces Visa and Mastercard refunds. Usually in the merchant or gateway email. The card issuer uses it to find the credit. REPORTED: https://business.phonepe.com/articles/arn-number-what-it-is-how-it-helps-track-card-refunds
- Razorpay emails the customer the refund id and a bank reference (ARN, RRN or UTR) if the merchant passed the email; typical 5 to 10 working days, can stretch to 10 to 12. REPORTED (Razorpay docs): https://razorpay.com/docs/payments/refunds/communication/
- UPI refunds use RRN or UTR, visible in the UPI app and bank statement. REPORTED.
- UPI escalation order: UPI app, PSP bank, customer's bank, NPCI, Banking Ombudsman. VERIFIED: https://www.npci.org.in/what-we-do/upi/dispute-redressal-mechanism
- Practice: if the platform says "refunded" but nothing arrived, ask the platform for the ARN or RRN and give it to your bank. No RBI rule found that states this.

## 6. News: how common the problem is

1. Bandland 2026 (Bengaluru, 14 to 15 Feb) cancelled; refunds promised in 8 to 10 working days. Rolling Stone India, 14 Jan 2026. REPORTED.
2. Shakira India tour (Apr 2026) postponed indefinitely; tickets on District; refund in 5 to 7 business days. Outlook India, 22 Mar 2026. REPORTED.
3. Kanye West Delhi concert moved from 29 Mar to 23 May 2026; tickets stayed valid; no refund route announced. Gulf News, 16 Mar 2026. REPORTED.
4. IPL 2025: washout, venue move and suspension each led to a different refund process. REPORTED.
5. Hyderabad District Consumer Commission-I fined BookMyShow Rs 12,000 for not telling a customer a show was cancelled. NewsMeter, Jun 2026. REPORTED.

Postponements, where the refund depends on the organiser and the window is set case by case, are harder for buyers than outright cancellations. No hard data found on how often refunds are delayed.
