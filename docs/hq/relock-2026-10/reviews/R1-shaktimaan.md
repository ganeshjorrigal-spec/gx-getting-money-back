# R1 review: Shaktimaan role-play (idea lock gatekeeper)

Simulated by a review agent on 9 Oct 2026. I did not write any draft. Inputs read: `CONTEXT.md`, `drafts/R1-A.md` to `R1-D.md`, `market-facts.md`, `IDEA_SCOPE.md` (the 4 Oct lock), `DECISIONS.md`, both playbooks and their Gemini verification files, `x-complaints.md`, the five-conversations note, and the live landing page (fetched 9 Oct).

Everything below the line is in Shaktimaan's voice.

---

Ganesh, I read all four. Good work on the playbooks, honestly. The verifier catching the old DGCA text is the most useful thing you have built this week. But I lock one sheet, not four. Here is how I see them.

## 0. Before the drafts: two things I found on your live link

I opened the link before reading a single sheet, because that is what I will do on lock day.

1. **The landing page shows a price.** It says: checking is free, "Staying on it costs Rs 49 for refunds of Rs 300 or more", with the Rs 49 back after 30 days. Every one of your four drafts says the price test is set aside, and R1-A says "A Rs 49 offer is built and hidden." It is not hidden. Either the page is wrong or the sheet is. Fix one before you send me anything.
2. **"See a real case first" opens a sample case.** D-027 says the demo is never shown as a refund result. A button that calls a sample "a real case" is the same contradiction I caught on your privacy page. Rename it ("See how a case runs" or "Try a demo").

Also, the page says flights are "coming next" and does not mention online stores. That is fine today. It is not fine if your sheet says flights lead and I test on Monday.

## 1. Facts the drafts got wrong or under-labelled (all four)

From `market-facts.md`. These apply to every draft unless noted.

| Claim in the drafts | What the facts file says | Fix |
|---|---|---|
| "Voxya charges Rs 2,699 to prepare consumer-forum papers" (A, B, C, D) | NOT FOUND. Voxya's own pages: filing is free; Rs 899 for a legal notice and Rs 1,499 for forum case prep (Voxya blog, 2021, modified 2024); a full court case at Rs 19,999 or Rs 30,000 | Replace with the real numbers and their dates. Say "free to file, Rs 899 to Rs 1,499 for papers" |
| NCH numbers "REPORTED, not yet re-checked" (A, B, C, D) | CONFIRMED on PIB PRID 2209070 (27 Dec 2025, period 25 Apr to 26 Dec 2025). E-commerce 39,965 grievances, Rs 32.07 crore; travel and tourism 4,050, Rs 3.52 crore; airlines 668, Rs 95.57 lakh | Upgrade the label. Add the refund amounts |
| E-commerce amendment from 1 Jan 2027 "claimed", "NOT VERIFIED", "Gazette text not seen" (A, C, D) | CONFIRMED on PIB PRID 2308759 (10 Sep 2026): "every e-commerce entity" must join NCH convergence from 1 Jan 2027. Gazette number still NOT FOUND | Upgrade to VERIFIED (PIB). Use "every e-commerce entity", not "every platform" |
| "CAR M-II Rev 3 ... in force 26 Mar 2026" (A, B, C, D) | News sources disagree (Gulf News: 26 Mar; Moneylife: immediate). Your own verifier read "EFFECTIVE: 26 March 2026" on the DGCA PDF | Keep, but cite the DGCA PDF, not news |
| IndiGo Dec 2025 as a tailwind (A, B, D) | CONFIRMED that IndiGo had refunded Rs 827 crore by 8 Dec 2025 and claimed all refunds cleared by Jan 2026 | This cuts against you. A big airline paid a mass crisis out in about a week. That is UD's point: big players pay fast. The stuck money is the tail (SpiceJet via Goibibo, 90 to 120 days). Reframe or drop |
| Nobody used it | CONFIRMED, Jul 2026: a consumer commission ordered Paytm to pay Rs 6,437 after the airline had already sent the money to Paytm and the passenger got nothing | This is your only documented case of money stuck with the middle company. Any draft that sells the two-company loop must use it |

Two more numbers you left on the table. They are my arithmetic on the PIB table, so label them that way:
- Average refund per NCH grievance: airlines about Rs 14,300; travel and tourism about Rs 8,700; e-commerce about Rs 8,000. That is a real answer to "is this Swiggy-sized money?"
- The same table shows NCH, which is free, got Rs 45 crore back across 67,265 grievances in 8 months. That is not only a tailwind. It is a competitor that already works. Your sheets have to say why someone needs you before they dial 1915.

One evidence problem nobody flagged. All four drafts lean on "4 of 15 MakeMyTrip/Goibibo posts: the travel site says it waits for the airline." I opened the table (`x-complaints.md`, batch B rows 6, 9, 11 and 15). The "what support said" column reads: "confirmed processing airline refund"; "case is under review"; "requested booking details via private message"; "requested 48 hours, later asked for airline cancellation notice." None of them says "we are waiting for the airline." The 4 come from the column "money stuck with: airline", which is the coder's reading. And the other half of the loop, the airline saying "we already paid your agent", appears zero times in your sample (R1-C admits this; R1-B does not). So the blame loop is a plausible hypothesis with one court case behind it, not an observed pattern.

Also on the ChatGPT evidence: R1-A and R1-B say Gemini "named the wrong MakeMyTrip grievance officer." Your verifier marked that row CONFIRMED: the name (Amit Kumar Sinha) is on a giholidays page that names MakeMyTrip (India) Pvt Ltd. The main user agreement names a different officer (Jasbir Kaur). That is "two pages, two names, we picked the main agreement", not "wrong". Don't overclaim the one thing you are proudest of.

---

## 2. R1-A: "One job, three playbooks"

**Verdict: REJECT** (keep its bracket table).

**My fork question first:**

"Three playbooks of equal standing. On Sunday a stranger lands on your page. Which demo do they see first?"

| One lead, the rest as data behind it | Three equal columns |
|---|---|
| One landing story, one demo on the hero, one set of outreach posts. Other types reachable, not sold | Three demos, three stories, three user pictures, one week |
| Real users concentrate on one type, so one refund can actually land by 17 Oct | Real users split three ways; likely zero real cases in two columns |

My lean is the left column. "Equal standing" is a build claim, and you said so yourself in your risk note.

**Kill-rule and one-bracket problems (quoted):**
- "v1 is one job with three playbooks of equal standing". This is the opposite of "all of your v1 features should only stack in that bracket." Same features is not the same bracket. The bracket is a user and a moment, not a code path.
- The bracket definition: "a company owes me money, the reply I get is a non-answer". Swiggy and Rapido also give non-answers. The only edge offered is "if the playbook says the refund is still on time, the agent says ... nothing to send". That is a feature, not a bracket.
- "it knows the rule, the date and the right person for that exact company, checked at the source". For stores that is false by your own design: "read from the store's own pages at case time". Live lookup of a store email is the part ChatGPT with browsing also does (your self-attack says this; the idea line still overclaims).
- Store ladder ends in "consumer commission (user files)". CONTEXT section 8 says no legal action. R1-D left it out for this reason. Take it out.
- "What it changes: which demo leads my public posts. It does not change the build". A test whose result cannot change the decision is not a test.

**Claims I don't believe or that contradict the facts:**
- "Voxya charges Rs 2,699" (wrong, see section 1).
- "named the wrong MakeMyTrip grievance officer (from a holidays subdomain)" (overclaim, see section 1).
- "REPORTED from PIB release 2209070 by our research model; not yet re-checked by HQ" and "A claimed amendment ... (REPORTED, official text not yet seen)" (both now confirmed; upgrade).
- "IndiGo's mass cancellations in Dec 2025 left passengers across the country seeking refunds" (IndiGo refunded Rs 827 crore within a week; this is not stuck money).
- "store and gateway (if blamed)" sits as a row in the table. You label it a hypothesis only in the grilling notes. It needs the label in the table.
- "A Rs 49 offer is built and hidden." The live page shows it.

**What it does better than the others:**
- The bracket test table (feature by type, "Every row is the same feature. The columns differ only in data"). It is the clearest proof anyone wrote that a new refund type is data, not a new product.
- The most precise ChatGPT evidence: "6 of its 10 load-bearing lines quoted the superseded refund rule ... 3 could not be checked, and only 1 was confirmed" for flights, and "9 of 10 load-bearing lines were unsupported, one with the cancellation-charge rule read backwards" for stores. I checked both against the verification files. They hold.
- The cleanest out-of-scope list, including marketplaces as contrast only.

---

## 3. R1-B: "A sharp wedge: stuck flight refunds lead"

**Verdict: LOCK WITH CHANGES.** This is the one I would lock.

**My fork question first:**

"Your flight flow goes live Tue 13 because you are also building the store playbook and its demo. You get three and a half days of real users. Do you want more days or more demos?"

| Flights live Sun 11 night, flight demo only | Flights and stores both live Tue 13 |
|---|---|
| Five days to reply to live X complaints and start real chases. Cases that are already 10 to 120 days overdue can move in days (Nodal Officer, Appellate Authority) | Three days of selling. Store demo proves the engine but nobody is being sold stores this week |
| Store playbook loads as data; its demo is a day-4 stretch | Your switch rule fires on Wed 14 with almost nothing left to switch to |

My lean is the left column. You told me Ganesh decided one milestone for both types. Fine, keep one milestone. Just order it so flights ship first and the store demo is the first thing cut.

**Kill-rule and one-bracket problems (quoted):**
- "Online-store refunds (small D2C sites) are built in the same milestone as a second playbook with its own demo ... It is reachable inside the product, but I do not market it this week." Building something you will not sell this week is a hedge. I accept it only as data plus a hidden demo, never on the landing page.
- "Event tickets (where I started) stay live for people who already use it." Fine, but say how many people use it. If the answer is zero, say "stays live, not sold."
- "Until the flight flow goes live on Tue 13 Oct, the live link still shows events". Honest, and I thank you for it. But it means for four days the app I test and the sheet I lock describe different products.

**Claims I don't believe or that contradict the facts:**
- Delta 4 is labelled "built from the public X posts", but step 5 is "Call the travel site; 'we are waiting for the airline'" and step 6 is "Call the airline; 'refund already sent to your agent'". Step 6 is in zero of your 29 posts. Step 5 is a coder's reading, not a quote (see section 1). Relabel: "built from the playbook and the posts; step 6 not yet seen in our sample." Then add the Paytm commission case as the one real example.
- "EaseMyTrip publishes 'free full refund' terms (VERIFIED, the terms page exists) ... People already pay up front to avoid this exact fight." The page exists. That people pay, and how much, is unchecked. The sentence after it is a conclusion from an unchecked fact. Cut it or label it.
- "it quoted the 2008 text: 21 working days ... and a 5-day look-in limit. The rule in force ... says 14 working days and 7 days." Reads as if look-in became 7 days. Look-in is still 48 hours; what moved from 5 to 7 days is the cut-off for direct bookings. Write it precisely or a judge will think you misread your own rule.
- "It also gave the wrong MakeMyTrip grievance officer" (overclaim, section 1).
- "AirHelp puts the number hit at 1.62 million passengers (REPORTED ... an interested party)" and "Refunds are the top grievance type on the ... AirSewa snapshot (REPORTED by Gemini ... not checked by me)". Two unchecked numbers in the tailwinds. Either check them or drop them; you have better ones now.
- "Voxya, Rs 2,699" (wrong).
- NCH "REPORTED by Gemini ... not yet re-checked by me" (now confirmed; and use the Rs 14,300 average airline refund instead of "not a Swiggy-sized amount").
- "December 2025: IndiGo's mass cancellations" (cuts against you, section 1).

**What it does better than the others:**
- The reason flights lead is the sharpest argument in all four drafts: "the product's core promise is a date and an owner, and flights have both in law: 14 working days with the onus named on the airline, 7 days to a credit card (VERIFIED). Store refunds only have 'a reasonable period', so for stores the date would be Tickback's guess." That is true to your playbooks (F01, F03 vs O06).
- The only real-user plan that goes where live cases already are: "reply by hand to people posting stuck MakeMyTrip, Goibibo or airline refunds on X with a free chase." Those people are already overdue. That is your best shot at a real refund landing before 17 Oct.
- A switch rule decided before the data: "if I have fewer than 3 real flight cases started by Wed 14 Oct, online stores ... becomes the lead story".
- The sharpest user picture and stories. Each story cites the exact para (3(c), 3(f), 3(d)) and story 5 tells the user what they cannot get back ("a travel-agent fee shown at booking does not, so it never promises me that"). That honesty sells.
- The self-attack caught the thing I would have caught: the live link not matching the sheet.

**Changes I need before I lock it:**
1. Fix the live page: hide the Rs 49 block (or say in the sheet it is live), rename "See a real case first".
2. Ship flights first (target Sun 11 night), store demo is the first cut.
3. Relabel Delta 4 steps 5 and 6; add the Paytm commission case.
4. Replace Voxya, upgrade NCH, drop or check AirHelp 1.62 million and the AirSewa claim, reframe IndiGo.
5. Fix the look-in sentence and the "wrong officer" line.
6. Add C's "who owes you" card and pinning question as the first screen (see section 4).

---

## 4. R1-C: "The blame-loop breaker"

**Verdict: REJECT** as the lock. Its best idea goes into B.

**My fork question first:**

"Which job is it doing? Breaking a loop between two companies, or climbing a ladder against one company that stalls?"

| One company stalls: the ladder, with "who owes you" as the first screen | Two companies point at each other: the loop breaker |
|---|---|
| Fits 17 of 29 posts ("please DM us") and 7 of 29 ("processed, no money") | Fits 4 of 15 by your own count, and none of those 4 quotes the travel site actually blaming the airline |
| The loop is one scenario inside it, and your best demo | The bracket is defined by a pattern you have not observed yet |

My lean is the left column. Your own pre-commit says the same: "if none of the live cases has two companies in it, I keep the same agent but lead with the plain ladder."

**Kill-rule and one-bracket problems (quoted):**
- "The bracket in one line: refunds where the money passed through two or more companies". Every online payment passes through a bank or a gateway. By this test every refund is in the bracket, so it is not a bracket.
- Your own card breaks it: "Flight booked direct: the airline" and "Online store, accepted refund: the store". Both are one company. The structural test leaks on its first two rows.
- "Inside the same bracket: ... event ticket bought on a platform for an organiser's show". Then you say "Events are the weakest fit". Pick: inside or parked.

**Claims I don't believe or that contradict the facts:**
- "every travel-site grievance officer, read on the company's own page (VERIFIED; Yatra and ixigo NOT FOUND)". "Every" and "not found" in the same line. Say "four of six".
- "Tickback tells me the store still owes it until they give a reference number" and the demo line "the store cannot pass it on without a reference". No rule says that. It is a Tickback tactic. CONTEXT section 8: never present a Tickback default as law. Label it "our rule of thumb".
- "Round 2: 'our payment partner is processing it'" in the store demo, when weak spot 3 says "The store-blames-gateway loop is a hypothesis ... not yet seen in evidence." You are dramatising a hypothesis as the demo's turning point.
- "4 of the 15 MakeMyTrip and Goibibo posts say the travel site is waiting for the airline" (they do not say it; the coder inferred it, section 1).
- "A claimed e-commerce amendment from 1 Jan 2027 (REPORTED, NOT VERIFIED...)" (confirmed now).
- "Voxya (Rs 2,699 ...)" (wrong).

**What it does better than the others:**
- The "who owes you" card: who, by when, under which rule, who sits above them, and "the one question that pins it". That is the most AI-native design in all four drafts. The model answers three things about each reply ("which company is this pointing at, what is it claiming, is there a date or reference"), code flips the owner by rule, and the agent asks one pinning question: "on which date did the airline pay you this refund?" ChatGPT in one prompt does not flip an owner across two companies' replies on one thread.
- The most honest close: five weak spots stated before I find them, including "The blame loop shows up in 4 of 15 travel posts, not most."
- The only draft that tells the user when the other side is right: "Sometimes the honest answer is that the other side is right" (RBI T+5 on a failed payment). That earns trust.

---

## 5. R1-D: "Outlasted, not refused: the persistence engine"

**Verdict: REJECT** as the lock. Keep its "Who did what" count.

**My fork question first:**

"Stores lead or flights lead?"

| Flights lead, persistence is how it works | Stores lead |
|---|---|
| Rule gives a date (7 days card, 14 working days travel site) and names the owner. Contacts pre-verified for 8 companies | Rule says "a reasonable period". Your date is Tickback's guess (D-029). Every store's officer must be looked up live |
| 29 public posts, 3 at 90 to 120 days, one court case of money stuck in the middle | Zero store cases in your evidence. Your five conversations are mixed: a card blocked, a free trial billed (a subscription), a bank contact |

My lean is the left column. Your best idea, outlasting the company, works better where the clock is in law.

**Kill-rule and one-bracket problems (quoted):**
- "If the agent only drafts, it's ChatGPT" is answered with "You made the same Level 1 pick on 6 Oct." D-025 does record that, fair. But quoting my pick back to me is not an answer. Your real answer is the next line, "The switch to one-tap sending is decided by evidence: if the share of drafts never sent is high". Lead with that, and give me the number from live cases.
- "Persistence" is the risk on Kill Rule 1: a reminder plus a draft. You saw it ("'persistence' read like a calendar reminder stapled to a ChatGPT draft") and fixed it with the seven reply kinds. Good fix. But three of the seven ("acknowledgement with a ticket number", "silence past the date", "asks for info") are what any reminder app with a form does. The AI part is the reading. Say that in one line.
- Three refund types again: "three refund types on one agent ... small D2C online stores first, flights alongside, event tickets already live". Better than A because there is a lead, but "alongside" is doing a lot of work.
- Three new proposals not in DECISIONS ("Who did what" count, forward-to-case fallback, one-thread demo). You flagged them for Ganesh. Good. They cannot go into a lock sheet until he says yes.

**Claims I don't believe or that contradict the facts:**
- "I cannot show a real refund that landed because of the follow-ups before 17 Oct, since the legal clocks (14 working days, one month for a grievance officer) are longer than the sprint." Half true. The grievance officer must acknowledge in 48 hours. A card flight refund is 7 days. And the X cases are already 10 to 120 days overdue, so the clock has already run. You are giving up the one proof I asked for. Go find cases that are already late.
- "Online shopping is where the volume is" (NCH e-commerce 39,965). That number is mostly marketplaces, which your own out-of-scope list excludes ("marketplaces as a build target (contrast only)"). You cannot use Amazon and Flipkart volume to justify a small-D2C lead.
- The JTBD "When I returned the order and the store's pickup came 10 days back..." is "written from the X complaints and my five conversations". Neither source has a D2C return case. The X sample's non-travel rows are Flipkart, boAt and Goibibo "other". This JTBD is invented. Label it as a guess.
- "The reading part already works on real email ... (OBSERVATION, my own build log, synthetic case.)" listed under "Data nobody else has". It is a build fact, not data. Move it.
- "NCH numbers ... HQ has not re-opened the page" (now confirmed). "E-commerce rules amendment ... (REPORTED, official Gazette text not seen)" (confirmed on PIB). "Voxya (Rs 2,699 ...)" (wrong). "Large flight disruptions keep happening (IndiGo ...)" (cuts against you).

**What it does better than the others:**
- The "Who did what" count at the end of every demo and case: "You: 4 taps. Tickback: read 3 replies, set 3 dates, found 2 officers on the company's own pages, wrote 4 messages." It answers "it only drafts" with a number, on screen, from events the case already stores. Cheap to build. Keep it.
- The best one-line Delta: "today, every extra week of stalling adds steps for me; with Tickback, it adds steps for the agent and one tap for me."
- The clearest list of reply kinds and the move each triggers, including "accept the date only if it is not later than the rule or promise". That is the playbook acting, not the model guessing.
- The best explanation of why the price shape fits, even though the test is paused: "the free part is what ChatGPT also does; the paid part is the persistence."
- The ladder correctly stops at NCH and AirSewa, with the reason stated (no legal action).

---

## 6. Ranking and scores

| Rank | Draft | One-bracket clarity | ChatGPT-check answer | Honesty of evidence | Sellability by 17 Oct | User picture sharpness | Total /50 |
|---|---|---|---|---|---|---|---|
| 1 | R1-B (flights lead) | 8 | 8 | 6 | 8 | 8 | 38 |
| 2 | R1-C (blame-loop breaker) | 5 | 9 | 8 | 6 | 7 | 35 |
| 3 | R1-D (persistence engine) | 6 | 7 | 6 | 4 | 6 | 29 |
| 4 | R1-A (three equal playbooks) | 4 | 8 | 7 | 4 | 4 | 27 |

Why B wins: it is the only draft where the lead, the landing page, the outreach and the user stories all point at the same person on the same day. Its honesty score is lowest of the top two because Delta 4 claims X-post backing for a step that is not in the posts, and it builds a market claim on an unchecked EaseMyTrip price.

## 7. The single element from each draft the final version must keep

- **From R1-A:** the bracket test table (features down, refund types across, "every row is the same feature, the columns differ only in data"), with the store-gateway row labelled as a hypothesis.
- **From R1-B:** the lead rationale: flights lead because the date and the owner are both written in law (F01, F03), while stores only have "a reasonable period" (O06). Plus its plan to reply by hand to live X complaints, because those cases are already overdue.
- **From R1-C:** the "who owes you" card with the one pinning question, and code flipping the owner by rule when a reply points at the other company.
- **From R1-D:** the "Who did what" count on every demo and closed case.

## 8. Three objections that survive even in R1-B

1. **No real flight user yet, and the loop you demo has not been observed.** Zero first-hand cases, zero flight interviews. The "4 of 15" blame loop is a coder's reading of where the money sits; none of those posts quotes the travel site blaming the airline, and the airline saying "paid to your agent" appears zero times. One consumer-commission case (Paytm, Jul 2026) is the only documented example. Until a real user's case moves on a real reply, this is a hypothesis with a good demo.
2. **Kill Rule 1 rests on one model run, and the user still sends every mail.** The 21-versus-14 day error is one Gemini deep-research run on a playbook prompt, against a rule changed in Feb 2026. A ChatGPT with search today will likely find 14 working days in the first news result. The durable answer is reading both companies' replies and flipping the owner in code, but the CC inbox only catches replies that reply-all, and the share caught is unmeasured. Bring me that number from live cases.
3. **No selling evidence, and the free official route already works.** Willingness to pay is set aside, there is no paying user, and the live page shows a Rs 49 price the sheet calls hidden. Meanwhile NCH (free, 1915) got Rs 45 crore back across 67,265 grievances in 8 months, Rs 95.57 lakh of it from airlines. The sheet still has to say, in one line, why a person with a stuck flight refund opens Tickback before dialling 1915.

Ganesh, fix the live page tonight, ship flights first, and bring me one real overdue flight case that moved because of a reply the agent read. Then I lock it.
