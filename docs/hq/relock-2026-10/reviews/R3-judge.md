# R3 completion judge

Judge: separate from the writer. 9 Oct 2026. Repo files only, no web.
Sheet judged: `drafts/R3.md`. Criteria: `LESSONS.md` (mission contract, lessons 1 to 20).

## Decision: REVISE

Four must-fix problems, and five open calls that Ganesh must make before this goes to Shaktimaan:
1. The trust line does not match the privacy page (lesson 15).
2. "Rs 49 ... is off the page this week" is false today. `app/page.tsx` and `app/copy.ts` still show the Rs 49 card and "See a real case first" (lessons 9 and 18).
3. The "who owes you" card and the "who did what" count are written as things that already exist, but Ganesh has not decided on either (lesson 18).
4. The sheet is about 2,380 words by `wc -w`. Lesson 12 asks for about 1,200, and LESSONS says R3 was about 1,900.

The rest is close. The evidence is mostly clean, the R2 must-fixes were applied, and the kill rules pass.

## 1. Evidence audit

Verdicts: OK = matches the source. STRETCH = says more than the source. WRONG = the source says otherwise. PENDING = depends on a call Ganesh has not made.

| # | Claim in R3 | Verdict | Source | Fix |
|---|---|---|---|---|
| 1 | DGCA refund rule revised 24 Feb 2026, in force 26 Mar 2026 | OK | `flights-verification.md` header (CAR cover); `sources/dgca-car-refund-and-compensation.md` | none |
| 2 | Named Nodal Officer and Appellate Authority for IndiGo, Air India, SpiceJet, Akasa; grievance officers for MakeMyTrip, Goibibo, Cleartrip, EaseMyTrip; read on each company's own page; checked by a separate verifier (VERIFIED) | OK | `flights.md` C; `flights-verification.md` (22 of 25 contacts CONFIRMED) | Not a sheet issue: four of these pages were read through WebFetch summaries. Ganesh should spot-check them before Codex hard-codes them. |
| 3 | Gemini quoted the old rule in 6 of its 10 load-bearing lines (21 working days, now 14) | OK | `flights-gemini-raw-verification.md`: CONFIRMED 1, SUPERSEDED 6, PAGE UNAVAILABLE 3 | none |
| 4 | Gemini listed Yatra's investor-relations officer as the passenger contact | OK (loose) | Same file: company secretary and IEPF nodal officer | Optional: "investor (IEPF) contact" |
| 5 | Rapido Rs 100, Swiggy Rs 210 "were promised within a day" | OK | `2026-10-02_own-cases-rapido-swiggy.md` | none |
| 6 | 3-minute events demo, live; replies read through the CC case inbox | OK | STATE.md: TB-JNEC29, 3:10.731; M2.5 is READY FOR REVIEW | none |
| 7 | Delta step 4 and trigger: "please DM us" in 17 of 29 posts | OK | `x-complaints.md` HQ read item 1 | none |
| 8 | Delta step 6: "blogs give old day counts" | STRETCH | D-029 names one blog, and its number is unsourced rather than old. Gemini is the source that gave the old number. | Edit E9 |
| 9 | "Why one ChatGPT prompt doesn't do this", including the "who did what" count | Count is PENDING | Not in DECISIONS.md. R1-build gives it +0.25 day. UD pushed back on it as the pitch (R2-evidence R2-2 row 21). | Edit E3 |
| 10 | IndiGo Dec 2025, big direct refunds clear under pressure (REPORTED) | OK | `market-facts.md` section 4 (airline's own claim, through news) | none |
| 11 | Two SpiceJet-via-Goibibo posts at 90 and 120 days | OK | x-complaints batch B rows 9 and 12 | none |
| 12 | For flights the law fixes owner and date; for stores only "a reasonable period" (VERIFIED) | OK | F03; `online-stores.md` O06 | none |
| 13 | Trigger: "processed", no money, in 7 of 29 posts | OK | x-complaints HQ read item 3 | none |
| 14 | Five conversations: nobody refused; "four gave up, one got it back only through a personal bank contact" | STRETCH | `2026-09-10_outlasted-not-refused.md`: one blocked her card, one quit after a call, one abandons Rs 2,000 to 4,000 a year, one recovered through a bank contact, one was billed after a free trial. The file gives no outcome for the free-trial case. | Edit E8 |
| 15 | Bilaspur order 18 Jul 2026; Go Airlines refunded Rs 6,437 to Paytm; 2020 cancellation; Paytm held liable (REPORTED, Outlook Business, 22 Jul 2026) | OK | HQ-confirmed fact; `market-facts.md` section 4 | none |
| 16 | Trust: "Tickback sees only replies on your refund thread ... or, if you choose, a read-only link to that one Gmail thread" | WRONG | `app/privacy/page.tsx`: Tickback also stores and reads what you paste. Connecting Gmail grants read-only Gmail access, not a link; it reads replies in that thread "or a matching message from a known sender when the thread cannot be found". STATE.md: Gmail opt-in is limited to the test-account list. | Edit E1 |
| 17 | "Voxya charges Rs 899 ... Rs 1,499 ... (Voxya's blog, 2021, VERIFIED)" | OK | `market-facts.md` section 5 | none |
| 18 | "My price, Rs 49 ..., is off the page this week; I chase real flight cases free" | WRONG and PENDING | `app/page.tsx` line 93 and `app/copy.ts` lines 2, 15, 59: Rs 49 card and "See a real case first" are live. D-028 set the free-chase test aside. LESSONS lists both as human checkpoints. | Edit E2 |
| 19 | 1915 is free and a rung on the ladder | OK | `flights.md` D step 5; `market-facts.md` section 2 | none |
| 20 | Onboarding: "in under a minute shows the 'who owes you' card" | PENDING and STRETCH | The card is not in DECISIONS.md (R1-build: +0.5 to 0.75 day). There is no timing for a flight case because the flow is not built. | Edit E4 |
| 21 | "Try a demo" with a demo travel site and a demo airline over 3 rounds | OK as a plan | CONTEXT section 3 (Ganesh, 9 Oct). Not built; table row Tue 13 says "target" | none |
| 22 | Story 1: "the airline has to finish my refund in 14 working days, and the date is in my calendar" | STRETCH | F03: the CAR gives no start date. The cancellation-date anchor is an HQ DEFAULT. | Edit E7 |
| 23 | Story 2: grievance officer plus Nodal Officer in one thread; pinning question | OK | `flights.md` D step 2; lesson 3 | none |
| 24 | Story 3: "now the travel site owes me" | STRETCH (small) | F03 keeps the onus on the airline. F22 and Bilaspur show the money sitting with the site. It also clashes with "the law fixes the owner". | Edit E13 (optional) |
| 25 | Stories 4 and 5: bank leg; AirSewa with the dated thread | OK | `flights.md` A5, D | none |
| 26 | AI-first: "If real cases show drafts going unsent, one-tap send is the next build" | STRETCH (presumes a decision) | D-025: Level 2 is decided after the tester round, using the unsent share | Edit E10 |
| 27 | Tailwinds: "DGCA tightened the refund rule on 24 Feb 2026: 14 working days (was 21), no fee to process a refund, credit shell only if the passenger chooses" | STRETCH | The credit-shell clause 3(f) was already in the old PDF (`flights-gemini-raw-verification.md` lines 27 and 57), so it is not part of the Feb 2026 change. The no-fee clause 3(j) binds airlines only (F08). | Edit E6 |
| 28 | NCH Apr to Dec 2025: airlines 668, Rs 95.57 lakh; travel and tourism 4,050, Rs 3.52 crore (VERIFIED, PIB) | OK | `market-facts.md` section 1 | none |
| 29 | "Old numbers still circulate" | STRETCH (no label) | Only Gemini, plus one blog with an unsourced number | Covered by E6 (the sentence is dropped) |
| 30 | Google Trends MISSING, run by hand Sat 10 | OK | `market-facts.md` section 6 | none |
| 31 | Cleartrip grievance page, clock first, Trip ID once (VERIFIED) | OK | F23 | none |
| 32 | Sat 10: "the 11 open domestic flight posts" | OK | 13 flight posts minus 2 international (B1, B3) = 11. Four of them do not name the airline, so "domestic" is assumed. | none |
| 33 | Wed 14 rule: "widen to direct bookings" | WRONG (contradicts itself) | v1 already includes "(or direct with the airline)" | Edit E11 |
| 34 | Fri 16: a fresh 14-working-day clock is longer than the sprint | OK | Arithmetic: Sat 10 plus 14 working days is about 29 Oct | none |
| 35 | One-liner: "by which date under the DGCA rule" | WRONG against D-029 for direct bookings | D-029 (2): debit, UPI and net banking on direct bookings have no DGCA day count. The 15-working-day date is Tickback's expectation. v1 includes direct bookings. | Edit E5 |
| 36 | "Online-store refunds are built after flights in the same milestone ... not on the landing page" | PENDING | LESSONS "Human checkpoints", item 3 | Ganesh's call; the text stays if he says yes |
| 37 | Out of v1: "logging in for you, OTPs, bank details" | OK, passwords not named | D-011/D-025 | Edit E12 (small) |

### Decision checks

- **Level 1 (D-011, D-025): PASS.** "Tap to send from my own Gmail", "I read it and send it from my Gmail", and "You send every mail yourself on purpose".
- **No OTP, password or bank details: PASS, with a gap.** OTPs and bank details are named and "never logs in" is there, but passwords are not named (E12). The trust line is wrong on what Tickback reads (E1).
- **Dates in code: PASS.** "a date computed in code" and "Code takes that ... decides the owner, the date".
- **D-029: PARTIAL.** There is no look-in promise, and the label legend says "Tickback's expectation, never a law". But the one-liner ties every date to "the DGCA rule" while v1 includes direct UPI and debit bookings (E5). Story 1 does not mark its start-date anchor as Tickback's own reading (E7).
- **Undecided items written as done: FAIL.** "is off the page this week" (Rs 49), "I chase real flight cases free", "shows the 'who owes you' card" and "Every case ends with a count of who did what" are all written as facts. The Sat 10 "By hand" row is a plan, which is acceptable once Ganesh says yes to free help.

## 2. Criteria check

### Mission acceptance

| # | Criterion | Result | Reason |
|---|---|---|---|
| A1 | No fatal objection from a fresh Shaktimaan and UD read | FAIL (predicted) | Shaktimaan reads the live product. It would find Rs 49 on the page when the sheet says it is gone, and a trust line that does not match the privacy page. It found exactly this kind of contradiction before. |
| A2 | Every claim labelled and traceable | FAIL (small) | Mostly clean. Five stretches remain (rows 8, 14, 22, 27, 29) and four pending items are stated as fact. |
| A3 | Passes the kill rules | PASS | The ChatGPT check is shown (reply reading, owner switch, code dates, ladder). One bracket (domestic flight, travel site). AI-native core. No licence or data play. |
| A4 | Buildable by Codex in about 4 days with demos | PASS WITH RISK | Flights first, live Tue 13 as a target, stores after and off the page all fit the 5.75-day reality. The cut order is not in the sheet; it belongs in the product doc v2, which this judge did not see. |
| A5 | JTBD, stories and flows in Ganesh's voice | PASS | First person, hedged, light non-native phrasing, no rule numbers. Flows live in the product doc. |
| A6 | Honest about weaknesses first | PASS | No case of his own, the blame loop rests on one order, WTP unknown, CC catches replies only when the company replies to all. Optional: add that Gmail connect is limited to a test list (E1 covers it). |

### Lessons

| # | Result | Reason |
|---|---|---|
| 1 | PASS | One person, one day: a domestic flight, travel site, refund not landed. Stores are off the page. |
| 2 | PASS | "for flights the law fixes both the owner and the date ... for stores ... 'a reasonable period'". |
| 3 | PASS | Pinning question, owner switch in code, a who-did-what count, 6 of 10 and Yatra proof. The count itself is pending (E3). |
| 4 | PASS | "Outlasted, not refused" kept. Fri 16 measures replies read and cases moved, not money landed. |
| 5 | PASS | The blame loop is REPORTED from one order and named as a weak spot. |
| 6 | PASS | NCH VERIFIED from PIB, Voxya corrected to Rs 899 and Rs 1,499, DGCA dates right. |
| 7 | PASS | IndiGo used as "big direct refunds clear; money sticks in the tail and the travel-site leg". |
| 8 | PASS (long) | Trust and 1915 are both answered, but in about 5 and 3 sentences, not one line each. Trim when cutting for length. |
| 9 | FAIL | The sheet says Rs 49 is off the page; the live page still shows it and "See a real case first". |
| 10 | PASS | Hand cases from Sat 10, user defined, switch rule kept. Depends on the free-help call. |
| 11 | PASS WITH RISK | The sequencing respects 5.75 days. The cut order is not stated (product doc). |
| 12 | FAIL | About 2,380 words, about twice the target. |
| 13 | PASS | The trigger and stories 1 and 2 are the common story; the owner switch is story 3, a branch. |
| 14 | PASS | "The playbook is the fuel; the agent working the thread is the product." |
| 15 | FAIL | The trust line does not match `app/privacy/page.tsx` (see row 16). |
| 16 | PASS | "Users helped by hand and users served by the product are counted separately; demo runs don't count." |
| 17 | PASS | Own account, real name, no DMs, links or phone, "I will never ask for an OTP". |
| 18 | FAIL | Rs 49 removal, free help, the who-owes-you card and the who-did-what count are stated as done. |
| 19 | PASS | No rule numbers in the JTBD or the stories. |
| 20 | PASS | "11 open domestic flight posts". |

## 3. Edit list (old text, then new text)

**E1 (must, lesson 15).**
Old: `Why trust me: Tickback never logs in and never asks for an OTP or bank details. Every mail goes from your own Gmail after you read it. Tickback sees only replies on your refund thread: the ones that reach its case inbox in CC, or, if you choose, a read-only link to that one Gmail thread.`
New: `Why trust me: Tickback never logs in and never asks for a password, OTP or bank details. Every mail goes from your own Gmail after you read it. Tickback reads what you paste and the replies that reach its case inbox in CC; if you choose to connect Gmail (a test list this sprint), Google gives it read-only access and it reads only the replies on that refund thread.`

**E2 (must, lessons 9 and 18; wording depends on Ganesh's call).**
Old: `My price, Rs 49 to stay on a case, is off the page this week; I chase real flight cases free and do not test price till a real case moves.`
New if he says yes to both: `My price on paper is Rs 49 to stay on a case of Rs 300 or more. It is still on the live page today; I take it off on Sat 10, chase real flight cases free this week, and do not test price till a real case moves.`
New if he keeps Rs 49 live: `Rs 49 to stay on a case of Rs 300 or more is live on the page, but I am not testing price this week; I test it once a real case moves.`

**E3 (must, lesson 18).**
Old: `Every case ends with a count of who did what: "You: 4 taps. Tickback: read 3 replies, set 3 dates, wrote 4 mails."`
New if he says yes: `I plan to end every case with a count of who did what, like "You: 4 taps. Tickback: read 3 replies, set 3 dates, wrote 4 mails."`
If he says no: delete the sentence.

**E4 (must, lesson 18 and the timing claim).**
Old: `and in under a minute shows the "who owes you" card: who, by when, under which rule, who sits above them, and the first mail ready,`
New: `and in under a minute (my target) shows who owes it, by when, under which rule or our own expected date, who sits above them, and the first mail ready,`
If Ganesh says yes to the card, keep the word "card" and keep "(my target)".

**E5 (should, D-029).**
Old: `It tells you who owes the refund and by which date under the DGCA rule,`
New: `It tells you who owes the refund and when it is due,`

**E6 (should, row 27).**
Old: `- DGCA tightened the refund rule on 24 Feb 2026: 14 working days for travel-site bookings with the airline responsible (was 21), no fee to process a refund, credit shell only if the passenger chooses (VERIFIED). Old numbers still circulate.`
New: `- DGCA revised the refund rule on 24 Feb 2026, in force 26 Mar 2026: travel-site bookings now get 14 working days, with the airline responsible (was 21). The same rule says the airline may not charge to process a refund and a credit shell is the passenger's choice (VERIFIED). A strong research model still gave me the old 21.`

**E7 (should, D-029 and F03).**
Old: `so the airline has to finish my refund in 14 working days, and the date is in my calendar.`
New: `so the airline has to finish my refund in 14 working days. Tickback counts them from my cancellation date (its own reading, the rule gives no start day), and the date is in my calendar.`

**E8 (should, row 14).**
Old: `four gave up, one got it back only through a personal bank contact`
New: `most gave up because chasing cost more than it was worth, and one got it back only through a personal bank contact`

**E9 (nice, row 8).**
Old: `6. Google the rule; blogs give old day counts`
New: `6. Google the rule; a blog and even a research model give wrong day counts`

**E10 (should, D-025).**
Old: `If real cases show drafts going unsent, one-tap send is the next build.`
New: `How many drafts go unsent in real cases decides whether one-tap send comes next.`

**E11 (should, row 33).**
Old: `Under 3: I do not switch to stores; I keep chasing flights and widen to direct bookings.`
New: `Under 3: I do not switch to stores; I keep chasing flights and look wider (fresh posts on airline handles, more groups).`

**E12 (nice).**
Old: `logging in for you, OTPs, bank details.`
New: `logging in for you, passwords, OTPs, bank details.`

**E13 (optional, row 24).**
Old: `Tickback switches: now the travel site owes me, and the next mail asks for the bank reference.`
New: `Tickback switches: now the travel site has my money, and the next mail asks it for the bank reference.`

**E14 (must, lesson 12; cut about 800 to 1,000 words).** Suggested cuts:
- Delta 4 today list: merge steps 2 and 3, 5 and 6, and 8 and 9, which gives 7 steps.
- Why me: drop the "Why it matters" bullet. The Gemini proof already appears in the AI-first part ("I saw a strong model guess wrong"). Add "6 of 10 lines" there.
- Who they trust: E1 plus one line for the MISSING question.
- AI-first: cut the list of reply kinds down to "stall, waiting on the other company, paid on a date, processed with a reference".
- Size table: shorten the Sat 10 and Fri 16 cells to one line each.

**E15 (nice, template).** Add the missing heading after Delta 4: `**The sin it rides (optional):**` then `None claimed.` This keeps the GrowthX headings exact.

## 4. Human decisions Ganesh must make before sending

1. **Rs 49 on the live page:** hide it on Sat 10, or keep it and say it is live (picks the E2 wording).
2. **Free hands-on help** for real flight cases from Sat 10. The Sat 10 row and "I chase real flight cases free" depend on this.
3. **The "who owes you" card** in the flight flow (about +0.5 to 0.75 Codex day).
4. **The "who did what" count** on screen (about +0.25 day; UD pushed back on it as the pitch).
5. **Pitch flights only, with stores built after flights in the same milestone and kept off the landing page.**

Once he answers, HQ records each one in DECISIONS.md, then applies E2 to E4 to match.

Not blocking the send: Ganesh should spot-check the four WebFetch-read contacts (IndiGo, Air India, SpiceJet, EaseMyTrip) before Codex hard-codes them.
