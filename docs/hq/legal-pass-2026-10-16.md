# AI legal pass: real airline calls and user data (Fri 16 Oct 2026)

Written by Claude HQ for Ganesh. This is a checklist from public sources, **not legal advice**. It lists what to do now and the few points worth one hour with a lawyer. Scope: D-056 (Genie calls IndiGo care for real users), the mail chase, and the site.

## Summary

| Area | Status | Action |
|---|---|---|
| AI disclosure on calls | OK | Already in the first sentence of every call |
| Call recording | Do now | Add "This call is recorded" to the opening line |
| Acting for the user | OK, tighten words | Calling permission text in D-056 Part 3 |
| User data (DPDP, IT Act) | Do now, cheap | Retention limit, grievance contact, delete on request |
| TRAI automated calls | Open | Ask Vobiz whether our number is declared for software-placed calls |
| Airline names and logos | Do now | Add a "not affiliated" line under the logo strip |
| Refund rules Genie quotes | OK | Already on CAR Section 3 Series M Part II Rev 3 |

## 1. AI disclosure on calls
- Every call opens: "Hello, I'm an AI assistant from Refund Genie, calling on behalf of {name}, with their permission..." Live calls on 16 Oct confirm this.
- The prompt forbids pretending to be the passenger, asking for OTP, card or bank details, accepting vouchers, or changing bookings.
- Status: OK. Keep it as is.

## 2. Call recording
- Calls are recorded (`artifactPlan.recordingEnabled`). The airline agent's voice and name are personal data.
- Indian courts treat recording by a third party without consent as a privacy breach. The Delhi High Court said so in 2022 (Sanjay Pandey), in a case about a vendor recording other people's calls. Genie is a party to its own calls, which is a different situation, but there is no clear rule that settles it.
- **Do now:** make the opening say it. Suggested: "Hello, I'm an AI assistant from Refund Genie, calling on behalf of {name}, with their permission, about a refund for PNR {pnr}. This call is recorded. Could you tell me the current status of this refund?" Then nobody on the call can say they did not know.
- **Do now:** the user's calling permission says the call is recorded (in D-056 Part 3).
- **Do now:** never publish or share recordings outside the case. Keep them only for the case (see 4).
- **Lawyer:** is an announced recording by a party to the call enough, or does the agent need to say yes?

## 3. Acting for the user
- The user gives written permission, and the first mail carries a letter of authority. Calls start only after a separate calling permission and the user pressing the call button.
- The airline may refuse to share details with a third party. That is its right. Genie does not push: with no transfer (D-054), it asks how the passenger can call back and mails the user.
- The DGCA refund rule (CAR Section 3 Series M Part II, Rev 3, 24 Feb 2026) puts the refund duty on the airline even for agent or portal bookings. It does not give third parties a right to be served. Genie's position is "assistant with the passenger's permission", not "legal representative".
- Status: OK once the permission words in D-056 Part 3 ship.

## 4. User data
- **Law in force today.** The DPDP Rules 2025 were notified on 14 Nov 2025. Most duties (notice, consent, breach reporting, erasure) start 18 months later, around **13 to 14 May 2027**; check the exact date in the Gazette. Until then, the IT Act 2000 section 43A and the 2011 SPDI Rules apply: a published privacy policy and reasonable security.
- **What we hold:** name, email, mobile, PNR and booking facts, mail threads, letter of authority, call transcripts and recordings (which include the agent's voice).
- **Do now, cheap, and already DPDP-shaped:**
  1. The privacy page lists what is stored and why. It already does for mail; add calls (D-056 Part 3).
  2. Retention: delete call recordings 90 days after a case closes, and the whole case on request. Say so on the privacy page.
  3. A grievance contact: one named email address for privacy requests, on the privacy page.
  4. Stop any call at a request for OTP, card or bank details. Already in the prompt and the transcript cut.
- **Lawyer:** confirm the transition dates and whether the airline agent counts as a data principal whose notice we owe.

## 5. TRAI rules on automated calls
- TRAI's Third Amendment to the TCCCPR (press release No. 119 of 2026, 18 Sep 2026) defines "A2P calls" as voice calls started by software without a person dialling. An entity using them must declare this to its telecom provider in advance, with the caller numbers. Undeclared A2P calls are treated as unsolicited commercial communication. The release gives no start date.
- Genie's calls are placed by software, so they likely fit "A2P". They are not marketing, and they go to a business care line, not to consumers. Whether the rule targets this case is unclear.
- **Do now:** ask Vobiz in writing: "Is my number declared for A2P (software-placed) calls under the TCCCPR Third Amendment? If not, what do you need from me?" Keep the reply.
- **Lawyer:** does the A2P rule cover calls to a company's customer care line on a customer's behalf?

## 6. Airline names and logos
- The site shows eight brand logos (IndiGo, Air India, Akasa Air, SpiceJet, MakeMyTrip, Cleartrip, EaseMyTrip, Goibibo) with no disclaimer.
- Using a name to say "we help with refunds from X" is normally fine. A logo strip without a disclaimer can look like a partnership.
- **Do now:** add under the strip: "Refund Genie is independent and not affiliated with these companies. Names and logos only show which companies Genie can chase."
- **Lawyer:** keep the logos, or switch to plain names?

## 7. Refund rules Genie quotes
- `lib/flight-kb.ts` already cites CAR M-II Rev 3 (credit card 7 days, cash at once, agent or portal 14 working days, airline responsible). Rev 3 is dated 24 Feb 2026 and reported in force from 26 Mar 2026.
- Status: OK. Genie already says past results are not promised dates.

## Questions for a one-hour lawyer call
1. Announced recording by a party to the call: enough, or is the agent's yes needed?
2. Do we owe the airline agent a notice under DPDP, and when?
3. Does the TCCCPR A2P rule apply to software-placed calls to a business care line for a customer?
4. Logos: keep with a disclaimer, or plain names?
5. Is our letter of authority and calling permission wording enough to act for the user?

## Sources
- [Digital Personal Data Protection Rules 2025: key highlights (SCC Online)](https://www.scconline.com/blog/post/2025/12/26/digital-personal-data-protection-rules-2025-key-highlights/)
- [TRAI press release No. 119 of 2026 (TCCCPR Third Amendment)](https://www.trai.gov.in/sites/default/files/2026-09/PR_No119of2026.pdf)
- [TRAI's crackdown on spam calls and AI-driven telemarketing (Bar and Bench)](https://www.barandbench.com/view-point/trais-crackdown-on-spam-calls-and-ai-driven-telemarketing)
- [Delhi High Court: recording calls without consent breaches privacy (LiveLaw)](https://www.livelaw.in/amp/news-updates/tapping-phone-lines-recording-calls-without-consent-breach-right-to-privacy-delhi-high-court-216173)
- [DGCA revises air ticket refund rules, CAR Rev 3 (Trayaan)](https://www.trayaan.com/2026/02/dgca-revises-air-ticket-refund-rules-no-additional-charges-for-cancelling-or-making-changes-within-48-hours-of-booking.html)
