# R1 review, as UD (Udayan)

Simulated review by an HQ agent playing UD, the sprint lead. 9 Oct 2026. I did not write any of the drafts. Read: CONTEXT.md, R1-A to R1-D, market-facts.md, the four user-evidence files, the flights playbook, DECISIONS D-025, D-028, D-029.

## How I read these

Ganesh, I am going to ask you the same five things I always ask. Who is the person? What exact moment? What do they do today? Why would they trust a new app with money that is already stuck? How do you get your first 10 real people this week? A draft that answers those with one real person wins, even if its architecture is thinner. A draft that answers with a table of three columns loses, even if the table is correct.

One thing up front that applies to all four. None of you has met the flight or store user yet. You all say so, which is good. But three of the four drafts then write the plan as if the meeting will happen later. It has to happen this weekend, before the build lands, or the sheet is research again.

---

## R1-A: "One job, three playbooks"

**1. Does the JTBD and loop read like a real person's moment?**
No. It reads like a category. "When a company owes me money" is everyone. The user flow switches to a flight halfway, which shows you know the flight story is the real one, and then the sheet goes back to three types.
- Best line: "the travel site is saying it is with the airline while the airline is saying you booked from the agent, so ask them." That is a real moment.
- Worst line: "Every row is the same feature. The columns differ only in data." That is you talking to Codex, not to a user. I asked for one story first; this is the abstraction for stories not yet built.

**2. Can Ganesh find 10 of them by Wednesday?**
Not from this picture. "Someone in India who paid online, is owed a refund" has no place to look. The plan is one post to three networks on 11 Oct and a count by 13 Oct, and the count only decides "which demo leads my public posts". Counting is not users.

**3. Hard process, or drift back to easy cases?**
Drifts. Events get "equal standing". I told you BookMyShow and District settle in about 2 days. Putting events level with flights undoes that. Also the IndiGo December line is used as a tailwind, but market-facts shows IndiGo refunded Rs 827 crore within a week and later said refunds were cleared. Big direct airline refunds under regulator pressure clear. That supports my point, not the sheet's.

**4. What is hand-waved?**
- "Equal standing" for three types with one interview, on events.
- Store contacts "read from the store's own pages at case time". Thousands of stores, no verification, so this is the weak column.
- "Store and payment gateway" blame is a hypothesis with zero posts behind it.
- Who they trust: MISSING, plan is to ask after the case closes. Too late; trust decides whether the case starts.

**5. What it does better than the others.**
The best Kill Rule 1 answer in the set: a frontier research model got 6 of 10 load-bearing flight lines from the superseded rule, named the wrong MakeMyTrip grievance officer, and 9 of 10 store lines were unsupported. Numbers, files, labelled OBSERVATION. Also story 2, "nothing to send now, it is on time", is an honest edge most products skip.

---

## R1-B: "Stuck flight refunds lead"

**1. Real moment?**
Mostly yes. One person, one booking path, one non-answer.
- Best line: "if I don't keep following up I think the money just sits with them, and it is not a Swiggy-sized amount. I don't even know the rule, every blog is saying a different number of days." That is the anxiety I wanted to hear.
- Worst line: online stores are "built in the same milestone as a second playbook with its own demo, as proof that a new refund type is new data, not new features." You are building a story you will not market, to prove an architecture point to a judge. That is exactly building for a story not yet earned.

**2. Can Ganesh find 10 by Wednesday?**
Closest of the four. "Booked on MakeMyTrip, Goibibo, Cleartrip or EaseMyTrip, flight cancelled, refund not landed" tells you where to look: the public reply threads of those care handles on X. The draft sees this ("reply by hand to people posting stuck MakeMyTrip, Goibibo or airline refunds"). Its mistake is timing: it starts on Tue 13, the day the flight flow goes live. That leaves one day before Wednesday.

**3. Hard process?**
Yes. Travel site and airline pointing at each other, SpiceJet via Goibibo at 90 to 120 days, credit shell pushed instead of cash, fees kept on a non-refundable fare. This is where the process is genuinely unclear. Story 5 is brave: it tells the user what they cannot get back (the travel-agent fee) instead of promising it.

**4. What is hand-waved?**
- "People already pay up front to avoid this exact fight" (travel-site refund add-ons). The price and that they are paid are REPORTED and unchecked. Cut the sentence or check it.
- AirHelp's 1.62 million passengers (interested party) and "refunds top grievance on AirSewa" (Gemini, unchecked). Overclaim risk.
- Voxya Rs 2,699: market-facts could not confirm it. Voxya's own pages show free filing, Rs 899 legal notice and Rs 1,499 forum prep (2021 blog), and Rs 19,999 to Rs 30,000 for a full court case.
- The switch rule says stores lead if flights do not show up. But the X sample has zero small D2C store refund posts either. Switching to stores is switching to something with even less proof.

**5. What it does better than the others.**
Focus. Landing, hero, outreach and user tests are flights only. A dated switch rule decided in advance. It is the only draft with a real "flow I liked" (Cleartrip grievance page: clock first, ID once, read on Cleartrip's page). And it tells Shaktimaan plainly that the live link shows events until Tue 13.

---

## R1-C: "The blame-loop breaker"

**1. Real moment?**
Yes, and the voice is the best in the set.
- Best line: "I am calling MakeMyTrip, they say airline. I am calling the airline, they say MakeMyTrip." I can hear the person. And the product line that goes with it: one email to both, with one question, "on which date did the airline pay you this refund?" That is real product thinking. One question that ends the loop.
- Worst line: "The bracket in one line: refunds where the money passed through two or more companies." Every UPI payment passes through a gateway and two banks. This bracket is every refund in India. A structural definition dressed as focus.

**2. Can Ganesh find 10 by Wednesday?**
The lead picture is findable (same as B). The plan is not: 20 DMs to friends by Mon 12, then a count. No X, no live cases, no plan to actually start a chase before the build.

**3. Hard process?**
Yes for flights. "Sometimes the honest answer is that the other side is right" (failed payment, RBI auto-reversal) is the most honest product line in all four drafts. Events are named the weakest fit and kept out of the lead, which shows you listened. But the kurta story ("refund initiated, please check with your bank") is a store-blames-bank loop the sheet itself calls a hypothesis. It should not be a user story yet.

**4. What is hand-waved?**
- The two-company thread with a real airline. Will a Nodal Officer reply-all with a travel site in CC? Unknown; paste is the fallback, which the draft admits.
- "Call the airline: contact your travel agent" is labelled as from secondary sources, not the X sample. Fine as a label, but it is step 5 of the Delta 4.
- Who they trust: MISSING, guessed.
- It misses the best proof it could have used: the Bilaspur consumer commission case (July 2026) where the airline had already sent Rs 6,437 to Paytm, the customer got nothing, and Paytm was ordered to pay Rs 21,000. That is the exact "who has my money" question, decided in public.

**5. What it does better than the others.**
The mechanism is sharp and buildable: the "who owes you" card, the reply reader returning one extra field ("which company is this pointing at"), code flipping the owner by rule. It also lists five weak spots before the judge asks.

---

## R1-D: "Outlasted, not refused"

**1. Real moment?**
The feeling is real. The case is not.
- Best line: "so that I get my money back and I can stop opening my bank app every morning." Also "If I keep following up, it eats my head for weeks." These are the truest feelings in any draft.
- Worst line: "Every demo ends on the 'Who did what' count... That screen is the pitch." The pitch should be a real person whose case moved, not a scoreboard of a demo.

**2. Can Ganesh find 10 by Wednesday?**
Hard. "20 to 35, paid on a small D2C brand's own website, return picked up, money not back." Where are they? Not in the X sample: Batch A has Flipkart, Amazon, Meesho, AJIO (marketplaces, which you set as contrast only) and boAt. Not one small D2C store. The plan ends with "if I get fewer than 3 live cases, the demos carry the submission". That is planning to fail politely.

**3. Hard process?**
It goes where I pointed (small D2C sites), but on my word, not on evidence. And the store playbook has no legal date ("a reasonable period"), so the date the product promises is Tickback's own guess. The hard part (thousands of stores, no verified officer) is pushed to a live lookup.

**4. What is hand-waved?**
- The store JTBD is labelled "written from the X complaints and my five conversations". None of those five was a D2C return. It is a composite.
- "Forward to case address" and the "Who did what" count are new proposals not in DECISIONS. The draft flags them, which is correct, but they are scope.
- "I will chase it for free this week" re-opens something Ganesh set aside in D-028. Free help to get real cases is not a price test, but Ganesh should say yes to it in words.

**5. What it does better than the others.**
Two things no other draft has. First, the idea is rooted in the only first-hand pattern Ganesh owns: five people, no company said no, everyone gave up. Second, the most important honesty line in the set: the legal clocks (14 working days, one month for a grievance officer) are longer than the sprint, so by 17 Oct you can show real replies moving the case, not money landed. Every other draft quietly implies "Money landed" will appear in real cases. It probably will not.

---

## Ranking

1. **R1-B**. One person, one path, one face to the market, a dated switch rule, and the only draft that goes to live public cases. Fix the overclaims and start the outreach four days earlier.
2. **R1-C**. Best voice and the sharpest product move (the one pinning question). Loses to B because its bracket quietly becomes everything and its first-users plan is a count of friends.
3. **R1-D**. Truest feelings and the most important honesty line. Loses because it leads with the user nobody has found, with no legal date to stand on.
4. **R1-A**. Correct, complete, and a framework. Three columns of equal standing is the opposite of one common story first. Its ChatGPT evidence must survive; the rest should go.

## Scores (1 to 10)

| Draft | User-moment truth | Founder voice | Hard-problem focus | First-users plan | Honesty | Total |
|---|---|---|---|---|---|---|
| R1-A | 4 | 5 | 3 | 3 | 7 | 22 |
| R1-B | 7 | 7 | 8 | 7 | 6 | 35 |
| R1-C | 7 | 8 | 7 | 4 | 8 | 34 |
| R1-D | 6 | 7 | 5 | 4 | 8 | 30 |

Honesty for B is 6, not higher, because of the add-on sentence, the AirHelp and AirSewa figures, and Voxya. All four lose a point on Voxya Rs 2,699 and on still calling the NCH numbers "not re-checked" (see fix 3).

## The one element from each that must survive

- **From A:** the Kill Rule 1 proof with numbers: 6 of 10 load-bearing flight lines from the superseded rule, the wrong MakeMyTrip grievance officer, 9 of 10 store lines unsupported. Plus story 2: "nothing to send now, it is on time."
- **From B:** flights only on every surface people see (landing, hero, outreach, tests), with a switch rule decided in advance and dated.
- **From C:** the pinning question on one thread: "On which date did the airline pay you this refund?" and the owner flip by rule. Keep "Sometimes the honest answer is that the other side is right."
- **From D:** "outlasted, not refused" as the root, the "stop opening my bank app every morning" feeling, and the admission that money will mostly not land before 17 Oct, so success this week is replies read and the case moved.

## What a combined version must fix

1. **One person, one moment, from a real case.** Lead user: booked a domestic flight on MakeMyTrip or Goibibo (or Cleartrip, EaseMyTrip), the airline cancelled, "refund initiated" weeks ago, the travel site says it waits for the airline. Rewrite the JTBD from the first real person's own words by Sunday night, and say which case it came from. Until then, mark it "written from public posts".
2. **Stores and events off the pitch.** Build is Ganesh's call (D-028, one milestone). But the sheet's USER and core loop are flights only. No store or event user stories in the lock sheet. The store demo, if built, is not on the landing page.
3. **Update labels from market-facts.md.**
   - NCH figures are now CONFIRMED on PIB 2209070 (posted 27 Dec 2025; period 25 Apr to 26 Dec 2025): e-commerce 39,965; travel and tourism 4,050; airlines 668 (Rs 95.57 lakh).
   - The e-commerce amendment is CONFIRMED (PIB, 10 Sep 2026, in force 1 Jan 2027; the release says "every e-commerce entity").
   - Voxya Rs 2,699 is not on Voxya's pages. Use: free filing; Rs 899 legal notice and Rs 1,499 forum prep (Voxya blog, 2021); Rs 19,999 to Rs 30,000 for a full court case.
   - DGCA Rev 3: say "issued 24 Feb 2026". Sources disagree on the in-force date, so state it only if the CAR text itself says it.
   - IndiGo December 2025 is not a tailwind for "stuck". It is evidence that big direct airline refunds clear under pressure. Use it that way.
4. **Add the Bilaspur case** (Business Today, 22 Jul 2026): airline paid Paytm, customer got nothing, commission ordered Rs 21,000. Label REPORTED. It is the public proof of the blame loop.
5. **Kill C's bracket line** ("two or more companies"). The bracket is: a flight booked through a travel site, refund not landed by the date.
6. **Cut B's overclaims:** the refund add-on sentence, AirHelp 1.62 million, AirSewa "top grievance", unless checked on the source page.
7. **Answer the trust question in the sheet**, not as MISSING. Why would someone hand a stuck Rs 8,000 refund to an app they met today? Because nothing leaves their hands: no login, no OTP, no bank details, every mail goes from their own Gmail, they read every word before sending, and a real person (Ganesh, with his name and LinkedIn) is behind it this week. Then report what real users said.
8. **Start real cases before the build.** The flight flow lands Tue 13. Do the first cases by hand from Sat 10 with the verified flight playbook: Ganesh writes the mail, the user sends from their own Gmail, the existing case inbox sits in CC. Move each case into the product on Tue 13.
9. **Define a user.** A person with a live stuck refund who sent at least one message Tickback (or Ganesh, by hand) wrote. Demo runs do not count.
10. **Say what 17 Oct will show:** live cases where a real reply was read and the next step moved, an owner named, an ARN or UTR obtained. Money landed only if it truly lands.
11. **Fix the switch rule.** If fewer than 3 flight cases by Wed 14, do not switch the lead to stores (no evidence there either). Say it plainly to Shaktimaan and keep chasing the flight cases you have.
12. **Get Ganesh's explicit yes** that free help on real cases is fine, since D-028 set aside the "free chase this week" test.

## First 10 users by Wed 14 Oct: the plan

B has the right idea (live X cases plus a dated switch rule) but starts too late. Here is the version I would push.

**Who counts.** A real person, flight booked through a travel site (or direct, if stuck past the date), refund not landed, who sends at least one message we wrote. Target: 10 by Wed 14, 18:00.

**Source 1: X, the people already shouting (target 5 to 6).**
- The 29 posts in `x-complaints.md` are dated 3 Sep to 8 Oct 2026 (decoded from the post IDs) and all were still open. About 12 are flights (Batch B rows 1, 2, 3, 4, 6, 9, 11, 12, 15; Batch A rows 1, 13, 14). Start with the SpiceJet via Goibibo ones (90 and 120 days). They are the hardest and the best story.
- Sat 10: reply to each from Ganesh's own account, by hand, not copy-paste. Something like: "Saw this is still open. For a travel-site booking, DGCA puts the refund on the airline, 14 working days. I am building a free tool that writes the mail to the airline's nodal officer and the travel site together, you send it from your own email, no login or OTP. Want me to do yours this week?"
- Every day to Wed: search X for fresh MakeMyTrip, Goibibo, Cleartrip, EaseMyTrip and SpiceJet refund posts. Each care-handle "please DM us" reply is a new live lead. Aim for 40 replies in total. My guess is 1 in 7 says yes (an assumption; record the real rate).

**Source 2: Isha friends (target 2).**
Many fly to Coimbatore for programs and book on travel sites. WhatsApp groups, one personal message: "Anyone with a flight refund stuck right now, or a friend who has one? I will sort the mail for free this week." The "or a friend" part doubles the reach.

**Source 3: Crucible (target 1 to 2).**
Ganesh leads the AI and Tech Committee, so he can message the whole institute, not only his cohort. Students fly home on the cheapest travel-site fares: exactly the lead user. Ask for a 5-minute slot in a committee meeting to show the demo and ask the same question.

**Source 4: ex-Performics and LinkedIn (target 1).**
One post in his own voice about chasing what happens after "refund initiated". Note: agency people often fly on a company travel desk, where the refund goes to the employer. Only personal bookings count.

**Source 5: the GrowthX sprint community.**
Build-in-public post with the flight demo and one ask: "Know anyone whose flight refund is stuck?" These members are 22 to 40, urban, fly domestic.

**How the cases run.** By hand from Sat 10 with the flight playbook and the existing case inbox in CC. Ganesh writes, user sends. On Tue 13 every case moves into the product. Each first conversation asks two questions: "Whom did you ask before this, and whom did you believe?" and "Why did you say yes to me?" That answers trust with evidence, not a guess.

**Daily count, in the log:** contacted, replied, live case, first message sent, reply received. Wed 14 checkpoint: 10 first messages sent, or say plainly how many and why.

**Optional, for stores only if they stay in the build:** one 20-minute process conversation with the CRM or retention side of his former D2C internship brand about where refunds get stuck. Process only, no customer or company data. That gives the store column one real voice before anyone writes a store story.
