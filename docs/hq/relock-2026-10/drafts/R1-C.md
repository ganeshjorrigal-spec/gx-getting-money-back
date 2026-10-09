<!-- Candidate R1-C, Claude HQ re-lock loop, 9 Oct 2026. Mechanism: the blame-loop breaker (accountability assignment). Not committed. Self-attack applied once: the bracket is now defined by structure (the money passed through two or more companies, which intake can check), not by behaviour (they blamed each other, seen in only 4 of 15 travel posts). The blame is the trigger for the loop-breaking move, not the entry ticket. -->

# IDEA LOCK · Build Sprint (re-lock, 9 Oct 2026)

Labels used below: VERIFIED (official text or the company's own page, read 9 Oct 2026, verifier-checked), REPORTED (secondary source or public posts), OBSERVATION (my own interviews or research runs), MISSING (with the plan to get it). "Tickback's expectation" marks a date we chose; it is never a law.

**The idea in one line:**
An AI agent for refunds stuck between two companies. When the travel site says the airline has your money, or the store says your bank has it, Tickback works out who actually owes you, by when and under which rule, puts that in front of the person above them from your own email, and stays on the thread until the money lands. Flights booked through a travel site lead. Online stores (small D2C sites first) and event tickets use the same agent and the same question. India only. Out of v1: chargebacks run by us, legal notices, consumer court, voice calls, logging in for the user, passwords, OTPs, bank details, company-confidential data.

**Why me (at least 1 of 3: an audience that trusts me, years inside the workflow, data nobody else has):**
- Data nobody else has (built this week, partial). Two refund playbooks from primary text: DGCA CAR M-II Rev 3 and CAR M-IV for flights; the E-Commerce Rules 2020 and RBI circulars for online stores. Every rule has its exact quote, link and date, and an independent verifier checked each playbook twice (VERIFIED). Every airline Nodal Officer and Appellate Authority, and every travel-site grievance officer, read on the company's own page (VERIFIED; Yatra and ixigo NOT FOUND).
- Why that data matters for this exact job: the rule that decides who owes is the line a model gets wrong. Gemini Deep Research gave me "21 working days" for travel-site refunds, inside a quote it labelled verified. The current rule (Rev 3, in force 26 Mar 2026) says 14 working days and puts the onus on the airline. My verifier caught it (OBSERVATION, my own research run, files in the repo).
- 29 public X complaints coded on 9 Oct, handles removed (REPORTED, small sample, signals not rates). One event-refund interview and five earlier conversations on stuck money (OBSERVATION).
- Years inside the workflow: no. I have never had a stuck flight or online-store refund myself, and at The Souled Store I did not work on refunds (FACT, a weakness).
- Audience that trusts me: weak. Ex-Performics friends, Isha meditator friends, my Crucible cohort.

## GOAL

**The one goal they hire it for (money, time, status or life):**
Money. Get my money back from whoever actually has it, without being passed between two companies for weeks.

**Delta 4 (steps today vs steps with my product):**
Today, a flight booked on a travel site and cancelled (a path I built from the X posts and the flights playbook, not from my own case), about 12 steps:
1. Cancellation mail comes; the app says "refund initiated"
2. Wait, check the bank, nothing
3. App chatbot repeats a template (3 of 15 travel posts, REPORTED)
4. Call the travel site: "we are waiting for the airline" (4 of 15, REPORTED)
5. Call the airline: "contact your travel agent" (REPORTED in secondary sources, not in my X sample)
6. Back to the travel site
7. Post on X: "please DM us" (17 of 29, REPORTED)
8. DM the booking ID; the thread goes quiet
9. Google who is responsible; blogs give different day counts
10. Hunt for a grievance officer or nodal officer email
11. Write it, remember the date, chase again
12. AirSewa or the consumer helpline, or give up

With Tickback, 5 steps:
1. Paste the cancellation mail or the "waiting for the airline" reply (or a screenshot)
2. See the "who owes you" card: who, by when, which rule, who sits above them
3. Tap to send from my own email; both companies on one thread, the case inbox in CC
4. Replies are read for me; when one company points at the other, the next message is ready with one question that pins it
5. On the date, tap "It's in" or "Not yet"; if not yet, the next step up is ready

Job solved better than ChatGPT in one prompt: ChatGPT can write a firm email. In one prompt it does not know the current rule (the 21-day mistake above), does not have the verified name and email of the person above, does not count working days from the right date, does not see the second company's reply on the same thread and flip who owes, and does not come back on the date. The playbook holds the first three; the live case engine already does the last two for events.

**The sin it rides (optional):**
Wrath. Both of them kept saying it is with the other one; now one of them has to answer in writing. Share hook: "Tickback found who had my flight money."

## USER

**Who exactly:**
Lead: someone in India, roughly 22 to 40, who booked a domestic flight through a travel site (MakeMyTrip, Goibibo, Cleartrip, EaseMyTrip), whose flight was cancelled or who cancelled it, and whose refund has not landed.
Inside the same bracket: someone who paid a small D2C website through a payment gateway and is waiting on a refund for a cancelled order or a returned product; someone with an event ticket bought on a platform for an organiser's show (this flow is live today).
The bracket in one line: refunds where the money passed through two or more companies, so each one can point at the other. Intake checks this in one question: where did you book or pay?

**The trigger:**
The first time a company names someone else. "We are waiting for the airline." "Refund initiated from our end, please check with your bank." "The organiser will decide." A second trigger in the same bracket: "refund processed" but nothing in the bank, where the gap is between the company and the bank (7 of 29 X posts, REPORTED).

**Today's path step by step:**
As in Delta 4: app status, wait, chatbot, call one side, call the other side, X post, DM, silence, Google, give up. Signals from the X posts (REPORTED, all 29 still open in public): 4 of the 15 MakeMyTrip and Goibibo posts say the travel site is waiting for the airline. Of those 4, 3 also say the refund was "processed" or raised with no money arriving. 2 of the 3 longest waits in that batch (120 and 90 days) are in those 4 posts. Small sample, public posts only, signals not rates.

**Who they trust:**
MISSING. My guess: the company's own app and messages first, then X as a megaphone (29 posts show people go public, REPORTED), then a friend who travelled. Not lawyers. Plan: ask every person with a live case this weekend (see Size and fit).

**Would they pay (what exists today that people pay for):**
- Voxya charges Rs 2,699 to prepare consumer-forum papers (REPORTED from Voxya's own page via Gemini, not HQ-checked).
- AirHelp works on a share of the claim but says it does not handle India's passenger charter (REPORTED, same).
- US: Rocket Money, Pine AI, Chargeback; Asmi AI phones companies and waits on hold (REPORTED).
- Willingness to pay for Tickback: UNKNOWN. I set the price test aside this week (my call, D-028). The Rs 49 offer (D-020) exists on paper and is paused. I will not claim demand I have not tested.

## PRODUCT

**Onboarding:**
No sign-up. Two doors: "Try a demo" (flight, online store or event) or paste a real message or screenshot. In under a minute the user sees the "who owes you" card:
- Who owes you: the company the rule holds responsible, named.
- By when: the date, with its source. Rule dates are labelled with the rule. Our own check dates are labelled "Tickback's expectation".
- Under which rule: one line, with the quote one tap away.
- Who sits above them: the next person, read from the company's own page.
- The one question that pins it (see the core loop).

How the card decides, per refund type (all from the playbooks, stored as data):
- Flight booked on a travel site: the airline is responsible and must finish in 14 working days (CAR M-II 3(c), VERIFIED). The rule gives no start date, so we count from the cancellation and say "about" (Tickback's expectation). MakeMyTrip and Goibibo's own terms say they pass a refund on within 24 hours of receiving it from the airline (company terms, VERIFIED). So the airline's Nodal Officer stays on the thread in every case, and the travel site owns the 24 hours after the airline pays.
- Flight booked direct: the airline. Credit card 7 days (3(a), VERIFIED). Debit, UPI, net banking: check date 15 working days, Tickback's expectation, never cited as DGCA (D-029).
- Online store, accepted refund: the store, "within a reasonable period" (E-Commerce Rules 4(10), VERIFIED, no fixed days). Check date: the store's own promised date, or 7 days after the return is accepted (Tickback's expectation, D-029). If goods were defective, not as advertised or late, the store cannot refuse (Rule 7(4), VERIFIED). The store owns it until it shows a reference number.
- Online store, money debited but the order never confirmed: here the store's "ask your bank" is right. Card on a website or UPI to a merchant: auto-reversal in 5 calendar days, then Rs 100 a day without a claim (RBI, VERIFIED). The agent says so plainly. Sometimes the honest answer is that the other side is right.
- Event ticket: the existing event routes (live).

**The core loop (user stories):**

The job, in my words:
When my flight got cancelled and the travel site keeps telling me they are waiting for the airline, and the airline is saying they already paid the agent, I want somebody to tell me who actually is having my money and make that person answer in writing, so that I am not stuck calling both of them every week and I can get on with my plans.

Push: I am calling MakeMyTrip, they say airline. I am calling the airline, they say MakeMyTrip. The chatbot is giving the same template every time, and on X they say please DM us and then nothing.

Anxiety: If I just keep waiting, maybe it becomes three months, like those SpiceJet posts. Maybe they push a credit shell I don't want. And honestly I don't know which rule is true, every blog is saying a different number of days.

User stories:
1. My flight got cancelled and the app is showing "refund initiated". I paste the cancellation mail, and Tickback shows me who owes me: the airline, because I booked through a travel site and DGCA puts the onus on the airline. It shows the date, about 14 working days from the cancellation, and says there is nothing to send yet. It's in my calendar.
2. The travel site replied, "we are waiting for the airline". It already came to the case inbox, or I paste it. Tickback tells me this is the travel site pointing at the airline, and gives me one email to the travel site's grievance officer and the airline's Nodal Officer together, with one question: on which date did the airline pay you this refund? I send it from my own Gmail.
3. The airline replies on the same thread that it already paid the agent last week. Now it looks to be clear who has my money. Tickback shows me the travel site's own terms say 24 hours after they receive it, and the next mail to them is ready, quoting the airline's own reply.
4. I returned a kurta to a small D2C website, pickup was done, and they said "refund initiated, please check with your bank". My bank says nothing came. Tickback tells me the store still owes it until they give a reference number, and asks them for the ARN or UTR and the date it left. If they don't answer by their own promised date, their grievance officer is next, who has to acknowledge in 48 hours.
5. The date passed and nothing landed. I tap "Not yet" and the next step up is written and ready. For flights: the airline's Appellate Authority, then AirSewa, then the National Consumer Helpline. For the store: the grievance officer, then the National Consumer Helpline.
6. Money came. I tap "Money landed", see who finally paid and how long it took, and share it.

The flow as I see it (built from the X posts, I have not lived this one myself):
1. Flight cancelled, mail came 2. App says refund initiated 3. Ten days, nothing in my account 4. Paste the mail in Tickback, see who owes me and the date 5. Date comes near, travel site says waiting for airline 6. Tickback sends me one mail for both of them, I send it 7. Airline says paid to agent 8. Next mail to the travel site is ready, I send it 9. Travel site gives a reference 10. Check date on my calendar 11. Money landed, case closed.

A demo for each refund type (same real path as the event demo: the user's own Gmail sends, the case inbox reads, "Skip ahead 10 days", "Money landed" closes):
- Flight (new): the demo plays two clearly labelled roles, a demo travel site and a demo airline. Round 1: the travel site says it is waiting for the airline. The agent writes one email to both with the date question. Round 2: the demo airline replies on the same thread that it paid the travel site. The card flips: the travel site now owns it. Skip ahead. Round 3: the travel site sends a refund reference. The user lives the loop and sees it broken.
- Online store (new): a demo store. Round 1: "refund initiated, check with your bank". The agent asks for the reference and the date it left. Round 2: "our payment partner is processing it". The agent says the store still owns it and writes to the grievance officer. Skip ahead. Round 3: the store sends the reference. The bank never speaks, and that is the point: the store cannot pass it on without a reference.
- Event (live, unchanged): the three-round demo organiser, full run 3 min 11 s.

Build in about 4 days (Codex; the case engine, case inbox, calendar alerts, ladder and demo account already exist):
- Sat 10: flights and online-store playbooks as data next to the event playbook (rules, contacts, ladders, date rules, the pinning question per type); intake asks where you booked or paid; eval cases from the X posts.
- Sun 11: the "who owes you" card; the reply reader returns one more field, which company this reply points at; code flips the owner by rule; two-party drafts on one thread.
- Mon 12: flight demo with two roles from the same demo account (to confirm with Codex).
- Tue 13: online-store demo; fix round.
- Wed 14 to Fri 16: real cases, Shaktimaan's test, selling.
- Cut first if late: live lookup of a store's grievance officer (the user pastes the contact from the order mail instead), marketplaces, compensation chases (the card only says compensation may also be owed and why).

**Coming back (optional):**
Replies from either company land in the case inbox, so the user hears from Tickback only when something changed. Calendar alerts on the dates that matter. Paste stays as the fallback when a company replies only in its app.

**The AI-first part:**
The core loop. The model reads every messy reply and screenshot and answers three things: which company is this pointing at, what is it claiming (waiting on the other side, processed, not our job, need details), and is there a date or reference in it. Code takes those answers and the verified playbook and decides who owes, the date, and who sits above them. The model then writes the message that cites the rule and asks the one question that pins it. Dates are computed in code, never by the model. Without AI it is a rules page. Without the playbook it is ChatGPT guessing the rule, and I have seen it guess wrong.

## MARKET

**Tailwinds:**
- DGCA CAR M-II Rev 3 came into force on 26 Mar 2026: 14 working days for travel-site bookings, with the onus on the airline (VERIFIED). The rule is new, so models and blogs still quote the old one (OBSERVATION, our own research run).
- National Consumer Helpline, 8 months to Dec 2025: e-commerce 39,965 grievances, travel and tourism 4,050, airlines 668 (REPORTED by Gemini from a PIB release; not yet re-checked by me). E-commerce is the bigger pool. I still lead with flights because the "who owes" rule is clearest there and the loop shows up in the posts.
- A claimed e-commerce amendment from 1 Jan 2027 (REPORTED, NOT VERIFIED; no Gazette text seen).
- Google Trends for "refund not received" in India: MISSING (to run by Sun 11 Oct).
- Funding for AI consumer-dispute agents: Asmi AI in the US (REPORTED). India: MISSING.

**Competitors (and flows I liked):**
- Doing nothing, or one message and giving up (the biggest competitor; "outlasted, not refused", OBSERVATION from five conversations).
- Doing it myself: the app chat, X, ChatGPT drafts (the one to beat).
- Official routes: grievance officers, Nodal Officers, AirSewa, the National Consumer Helpline. Free, but people don't know who sits where.
- Voxya (Rs 2,699 for forum papers) and AirHelp (no Indian domestic claims), REPORTED.
- Asmi AI (US): phones companies, waits on hold, relays OTPs. I cannot match voice, and I won't touch OTPs. My edge is narrower: Indian rules, verified contacts, and a written, dated trail on one thread.
- Flows I liked, with screenshots and why: MISSING (teardown of AirSewa's complaint flow and Asmi's case view by Sun 11 Oct).

**Size and fit:**
MISSING. Plan by Mon 12 Oct: DM 20 people across ex-Performics, Isha and Crucible: "Any flight or online-order refund stuck right now? Did anyone tell you it is with someone else?" I count live cases, and how many had two companies pointing at each other. Pre-commit: if none of the live cases has two companies in it, I keep the same agent but lead with the plain ladder (one company stalling) and tell you that.

---

Shaktimaan, the weak spots, said first:
1. The blame loop shows up in 4 of 15 travel posts, not most. Most stuck posts are "please DM us" and "processed, no money". The same card handles those; the loop is the hardest case and the demo, not the whole market.
2. I have no first-hand flight or store case and no paying user. Willingness to pay is untested by my choice this week.
3. The store-blames-gateway loop is a hypothesis from my research, not yet seen in evidence.
4. Events are the weakest fit; UD says big platforms pay in about 2 days. They stay live, they don't lead.
5. The two-company thread is untested with a real airline or store. If a Nodal Officer replies outside the thread, paste is the fallback and the card still flips.

This is the re-lock: one agent, one question (who actually owes me, by when, and who is above them), flights first. Lock it in.

---

## Predicted grilling

**1. "4 of 15 is not a bracket. Most of your posts are 'please DM us' or 'processed, no money'. Why is the loop the job?"**
Already in the sheet (Who exactly, The trigger, weak spot 1): the bracket is structural, refunds where the money passed through two or more companies, which intake checks with one question. The loop is the trigger for the loop-breaking move, not the entry ticket. "Processed, no money" (7 of 29) is the same question between the company and the bank, and the reference-number question answers it. A plain stall gets the same card with an obvious owner and goes straight up the ladder. The loop rows are where the longest waits sit (2 of the 3 longest in that batch), small sample, labelled REPORTED.

**2. "You never had a stuck flight or store refund, and your one interview is an event. Why you, and how do you know this is real?"**
Already in the sheet (Why me, weak spot 2, Size and fit): no, I have not, and I say so. What I bring is the verified playbook and the proof that a frontier model got the deciding rule wrong. The demo lets anyone feel the loop in about 3 minutes. Real cases: 20 DMs by Mon 12 Oct, with a pre-committed switch if none has two companies in it.

**3. "ChatGPT knows DGCA says the airline is responsible. And your agent still only drafts. Isn't this ChatGPT?"**
Already in the sheet (Why me, Delta 4, The AI-first part): Gemini Deep Research gave me the superseded 21 days, inside a quote it labelled verified. The agent does more than draft: it reads every reply from both companies in the case inbox, decides which side the reply points at, flips the owner by rule, and comes back on a date computed in code (Level 1, D-025). The user sends from their own email so no passwords or OTPs are ever touched. The playbook, not the model, is the advantage, and it is built, quoted and verified.
