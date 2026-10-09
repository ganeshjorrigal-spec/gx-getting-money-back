# Final judge: re-lock sheet (IDEA_SCOPE.md, 10 Oct 2026)

Judged fresh on 9 Oct 2026. I did not open drafts/ or other reviews. Sources read: IDEA_SCOPE.md, CONTEXT.md, LESSONS.md, DECISIONS.md (D-020, D-022, D-025, D-027 to D-030), STATE.md, flights.md, flights-verification.md (v2), flights-gemini-raw-verification.md, x-complaints.md, 2026-09-10_outlasted-not-refused.md, market-facts.md, app/privacy/page.tsx, app/copy.ts. Bilaspur order taken as HQ-confirmed (REPORTED, Outlook Business, 22 Jul 2026).

Note before pasting: line 1 of IDEA_SCOPE.md is an HTML comment for the repo. Do not paste it to Shaktimaan.

---

## Role 1: Shaktimaan

**Verdict: LOCK WITH CHANGES.**

One bracket, one person, one day: a domestic flight refund past its date. The sheet says what it is not (stores after a live run, events not sold). It names its weak spots before I can. The ChatGPT answer is shown, not claimed: one thread, a pinning question, the owner moved by code, dates in code, verified officers. Good.

But I click the live product, and two lines in your trust and pricing paragraphs do not match it. Fix those before Sat 10, because your first real users will click too.

**Fork question.** Your agent only hears a reply if the travel site or airline replies to all, or the user brings it back. Grievance desks often answer from a ticket system to the sender only. So for your first 3 real cases, what is the reply path?

| A. User forwards or pastes every reply (works today, for everyone) | B. Count on the CC inbox and Gmail connect |
|---|---|
| Proven path, one extra step for the user | Gmail connect is test accounts only today; CC depends on the company |

My lean is the left column. Make "forward it to your case inbox, or paste it" the default ask in every first mail, and keep the CC-caught versus pasted count you already plan for Fri 16.

**Remaining problems, ranked**

FATAL: none.

MAJOR
1. Trust line does not match the live product. Sheet: "If you choose to connect Gmail, Google gives read-only access and Tickback reads only your refund thread." STATE.md: "Gmail opt-in remains restricted to the test-account list." Privacy page: it reads the thread "or a matching message from a known sender when the thread cannot be found." I caught a privacy contradiction on 6 Oct; I will catch this one.
2. Pricing says paying is possible. Sheet: "I report who saw the offer and who paid on Fri 16." STATE.md: "The pay card remains hidden because NEXT_PUBLIC_UPI_VPA is empty." Today nobody can pay. Either switch it on or say it is off.
3. Length. About 2,450 words. Lesson 12 says about 1,200 wins. Every section earns its place, so this is a readability cost, not a kill.

MINOR
4. "reads every reply from the travel site and the airline" (idea line) contradicts your own weak spot: "replies are caught only when the company replies to all, or the user pastes".
5. "for flights the law fixes both who owes it and by when". Not for UPI, debit card or net banking on direct bookings (D-029: that date is Tickback's expectation), and the 14 days has no start day.
6. "and no fee to process a refund (VERIFIED)". The rule binds airlines only (F08). Travel sites keep disclosed convenience fees, and 4 of your X posts are about fees kept.
7. "Tap to send it from my own Gmail". The live product opens Gmail and you press send. "Tap to send" reads like one-tap send, which D-025 has not decided.
8. "now the travel site owes me". DGCA puts the onus on the airline even for travel-site bookings. Say the travel site has the money.
9. "It never sees the airline's or the travel site's reply". A user can paste it into ChatGPT. Say what is true: only if you go back and paste it.
10. "a link to that thread" in the X outreach plan. Unknown accounts replying with links to people who just posted a booking ID look like refund scams. Point to the pinned thread on your profile instead.
11. "the clock first and the Trip ID asked once (VERIFIED)". The page shows a 72-hour clock and the Trip ID; "asked once" is your reading.
12. Tue 13 flight flow plus a two-company demo in about 3 build days is tight. It is marked "target", which is honest. Hand cases from Sat 10 carry the week either way.

**Scores (1 to 10)**

| Bracket | ChatGPT check | Honesty | Sellability | User picture | Readability |
|---|---|---|---|---|---|
| 9 | 7 | 7 | 5 | 7 | 6 |

Honesty goes to 9 after edits E1 to E3. Sellability stays low until a real person sends a mail and someone sees a working pay button. User picture is built from 13 public posts, not one person, and the sheet says so.

---

## Role 2: Completion judge

### Claims checked against sources

Supported (spot list): 13 flight posts in the X sample (A1, A13, A14 plus 10 in batch B); "please DM us" 7 of 13; "refund processed, no money" 3 of 13 (B6, B9, B15); "pending with the airline" 4 of 13 (B6, B9, B11, B15); SpiceJet via Goibibo at 90 and 120 days (B9, B12); 11 open domestic flight posts (13 minus Cathay Pacific and Etihad; four have no airline stated, assumed domestic); DGCA Rev 3 dated 24 Feb 2026, effective 26 Mar 2026 (v2 verifier read the CAR); 14 working days, was 21; contacts read on own pages and re-checked (22 of 25 confirmed, v2 verifier); Gemini 6 of 10 load-bearing lines superseded and the Yatra IEPF/company-secretary contact (gemini-raw verification); NCH figures (PIB 2209070); Voxya Rs 899 and Rs 1,499 (Voxya blog, 2021); IndiGo Dec 2025 (REPORTED); five conversations, nobody refused; CC case inbox reading replies live (STATE.md); demo about 3 minutes (3:10.7); "No sign-up" (copy.ts).

UNSUPPORTED or MISLABELLED:

| # | Quote | Problem | Source |
|---|---|---|---|
| U1 | "If you choose to connect Gmail, Google gives read-only access and Tickback reads only your refund thread." | Gmail connect is test accounts only; privacy page also allows a known-sender match | STATE.md line 30; privacy page |
| U2 | "I report who saw the offer and who paid on Fri 16" | No pay path is live | STATE.md line 43 |
| U3 | "back if the money has not landed 30 days after its due date" | Live guarantee adds "and you followed the steps" | copy.ts guaranteeLine; D-020 |
| U4 | "and no fee to process a refund (VERIFIED)" | Rule names airlines only; verifier must-fix 4 | flights.md F08; flights-verification.md |
| U5 | "for flights the law fixes both who owes it and by when (VERIFIED)" | No DGCA date for UPI/debit/net banking on direct bookings; no start day for 14 days | D-029; F01, F03 |
| U6 | "the clock first and the Trip ID asked once (VERIFIED)" | "asked once" not on the page | F23 |
| U7 | "reads every reply from the travel site and the airline" | Only reply-all or pasted replies | sheet's own weak spots; D-022 |
| U8 | "It never sees the airline's or the travel site's reply" | Overclaim; paste works in ChatGPT | none needed |

Minor tension, not mislabelled: "now the travel site owes me" versus F03 (onus on the airline). Bilaspur source is cited as Outlook Business; market-facts.md has Business Today for the same story. Both fine as REPORTED.

### Lessons 1 to 20

| # | Result | Note |
|---|---|---|
| 1 | PASS | Flights only on page, demo, outreach, tests |
| 2 | PASS | Owner-and-date reason given (tighten wording, E6) |
| 3 | PASS | Pinning question, owner moved in code, count, 6 of 10 proof |
| 4 | PASS | "outlasted, not refused"; "Money landed only if it truly lands" |
| 5 | PASS | Blame loop hedged: "my reading", "rests on one commission order and 4 public posts" |
| 6 | PASS | NCH, Voxya, DGCA dates labelled right |
| 7 | PASS | IndiGo used as "big direct refunds clear" |
| 8 | PASS | Trust and 1915 each answered |
| 9 | PASS | Closing line says the live link shows events; Rs 49 said live |
| 10 | PASS | Hand cases Sat 10, user defined, no switch to stores |
| 11 | PASS | Tue 13 marked target |
| 12 | FAIL | About 2,450 words against about 1,200 |
| 13 | PASS | Common story leads; owner flip is story 2 |
| 14 | PASS | "The playbook is the fuel; the agent working the thread is the product." |
| 15 | FAIL | Trust line versus privacy page and live Gmail access (U1) |
| 16 | PASS | Counted separately |
| 17 | FAIL | "a link to that thread" |
| 18 | FAIL | "who paid" with no pay path (U2); Gmail connect presented as open (U1) |
| 19 | PASS | No rule numbers in stories |
| 20 | PASS | 11 |

### Decisions

- D-025 (Level 1, user sends): respected in substance. "Tap to send" wording drifts toward Level 2; fix with E9.
- D-029: respected. No 48-hour look-in promise; 14-day start labelled "Tickback's reading"; no 15-day DGCA claim.
- D-030: respected. (1) flights-only pitch; (2) stores after a live flight run, off the landing page; (3) Rs 49 said live; (4) free hand help, counted separately; (5) "who owes you" card and "who did what" count present. Risk: D-030 lets the count be cut first; if it is cut, the ChatGPT-check line "Every case ends with a count" goes false. Keep the count in the demo at least.

### Decision: REVISE

Smallest edit set. E1 to E3, E5, E6 and E10 are must-fix. The rest are one-line honesty fixes worth taking in the same pass. After all twelve: APPROVE_WITH_EXPLICIT_RISK. The remaining risks cannot be fixed by editing text: no real flight user yet, willingness to pay unknown, length.

| # | Old text | New text |
|---|---|---|
| E1 | If you choose to connect Gmail, Google gives read-only access and Tickback reads only your refund thread. | Connecting Gmail is optional and open only to test accounts for now; there Google gives read-only access, and Tickback reads your refund thread (or a reply from a known sender if the thread can't be found), never unrelated mail. |
| E2 | replies are caught only when the company replies to all, or the user pastes or connects Gmail. | replies are caught only when the company replies to all or the user pastes them; Gmail connect is not open to everyone yet. |
| E3 | Willingness to pay: MISSING; I report who saw the offer and who paid on Fri 16. | Willingness to pay: MISSING. The price shows on the page, but the pay button stays off until I add my UPI ID; on Fri 16 I report who saw the offer, and who paid if the button is on by then. |
| E4 | back if the money has not landed 30 days after its due date. | back if the money has not landed 30 days after its due date and you followed the steps. |
| E5 | and no fee to process a refund (VERIFIED) | and the airline may not charge to process a refund (VERIFIED) |
| E6 | for flights the law fixes both who owes it and by when (VERIFIED) | for flights the law names who owes it and, for travel-site and credit-card bookings, by when (VERIFIED) |
| E7 | the clock first and the Trip ID asked once (VERIFIED) | a 72-hour clock first, then the Trip ID to the grievance officer (VERIFIED, page read 9 Oct) |
| E8 | reads every reply from the travel site and the airline | reads the replies from the travel site and the airline |
| E9 | 3. Tap to send it from my own Gmail, with Tickback's case inbox in CC | 3. Open it in my own Gmail, read it, press send, with Tickback's case inbox in CC |
| E10 | my real name, a link to that thread, no DMs, no phone number | my real name, pointing to the pinned thread on my profile, no links, no DMs, no phone number |
| E11 | Tickback switches: now the travel site owes me | Tickback switches: now the travel site has my money |
| E12 | It never sees the airline's or the travel site's reply | It sees the airline's or the travel site's reply only if I go back and paste it |

Human checkpoint for Ganesh (not a text edit): if he adds his UPI ID before sending, keep the old E3 line instead. That choice is his.

### Length: cuts that keep every lock condition (optional, about 80 words)

Every section carries a lock condition, so the sheet cannot reach 1,200 words without dropping one. These cuts offset the edits above.

| # | Old text | New text |
|---|---|---|
| K1 | a flight refund playbook built from the DGCA text itself (refund rules revised 24 Feb 2026, in force 26 Mar 2026), every rule quoted with link and date, plus the named Nodal Officer and Appellate Authority of IndiGo, Air India, SpiceJet and Akasa and the grievance officers of MakeMyTrip, Goibibo, Cleartrip and EaseMyTrip, each read on the company's own page and checked by a separate verifier agent (VERIFIED). | a flight refund playbook from the DGCA text (rules revised 24 Feb 2026, in force 26 Mar 2026), every rule quoted with link and date, and the named escalation officers of IndiGo, Air India, SpiceJet, Akasa, MakeMyTrip, Goibibo, Cleartrip and EaseMyTrip, each read on the company's own page and re-checked by a separate verifier agent (VERIFIED). |
| K2 | As in Delta 4, or not solving it at all. In five earlier stuck-money conversations nobody was refused; most gave up, and one got it back only through a personal bank contact (OBSERVATION). | Delta 4 above, or giving up. In five earlier stuck-money conversations nobody was refused; most gave up (OBSERVATION). |
| K3 | Why open Tickback before dialling 1915: 1915 is free and it is a rung on my ladder. Tickback is what you do first: it tells you which company owns the refund, writes to that company's named officer today, and if you still reach 1915 you go with a dated thread in hand. | Why not dial 1915 (free)? It is a rung on my ladder. Tickback goes first: it names the company that has the refund and writes to its named officer today, so if you reach 1915 you carry a dated thread. |
| K4 | Sometimes the honest answer is the other side is right. | (delete) |
| K5 | - Voxya: free complaint filing, paid papers at the court end (VERIFIED). US agents | - Voxya (above). US agents |
