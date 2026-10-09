<!-- Candidate R1-A, mechanism "One job, three playbooks". Written by HQ agent on 9 Oct 2026. Draft only, not locked, not committed. The part from "IDEA LOCK" to the line "Lock it in." is what Ganesh pastes to Shaktimaan. Everything after the second horizontal rule is for Ganesh and HQ only. -->

# IDEA LOCK · Build Sprint (re-lock, 10 Oct 2026)

Labels on every evidence claim: VERIFIED (government text or the company's own page, read by us), REPORTED (secondary source or public posts), OBSERVATION (what I saw myself, small sample), MISSING (not known yet, with my plan to get it).

**The idea, in one line:**
An AI agent that gets your money back when a company's refund process is unclear: it knows the rule, the date and the right person for that exact company, checked at the source, writes every message for you to send from your own email, reads every reply, and moves you up the ladder until the money lands.

v1 is one job with three playbooks of equal standing: flights (airline or travel site), online stores (small brands selling on their own website) and events (live today). In India only. Out of v1: Swiggy, Zomato, Rapido and other refunds that already settle in a day or two; marketplace chases (Amazon, Flipkart and the like are contrast only); EPF and government forms (v2); chargebacks run by us; legal notices; voice calls; logging in for the user; passwords, OTPs or bank details; any company-confidential data.

Why this is one case and not three products. The case is always the same shape: a company owes me money, the reply I get is a non-answer ("refund initiated", "please DM us", "waiting for the airline", "the organiser decides"), and I don't know the rule, the date or whom to write next. The agent's features are the same for all three: read what they sent, name the rule, compute the date, name the right person, write the message, read the reply, climb the ladder, close. What changes per type is only data: a playbook file with rule rows (quote, source, date read), contacts read on the company's own page, date formulas and ladder names. Adding a refund type means adding a playbook, not a screen. The bracket also has a clear edge: if the playbook says the refund is still on time, the agent says "nothing to send, it is on time" and sets a check date. It does not chase money that is not stuck.

**Why me (at least 1 of 3: an audience that trusts me, years inside the workflow, data nobody else has):**
- Data nobody else has (partial, and I say how partial). Three refund playbooks built from primary text, each re-checked by a separate verifier agent: DGCA CAR M-II Rev 3 (dated 24 Feb 2026, in force 26 Mar 2026) and CAR M-IV for flights; the E-Commerce Rules 2020 and the RBI failed-payment circular for online stores; the platforms' own terms for events. Every rule row carries the exact quote, the URL and the date read. Named Nodal Officers and Appellate Authorities for IndiGo, Air India, SpiceJet and Akasa, and grievance officers for MakeMyTrip, Goibibo, Cleartrip and EaseMyTrip, each read on the company's own page on 9 Oct 2026 (VERIFIED). Anyone could build this. Nobody I can find has, and I found out how easy it is to get wrong (see Delta 4).
- What I have seen of the pain: one interview (IPL ticket refund, Rs 2,400, about 20 days, a Google form, a courier at his own cost; OBSERVATION, one person). Five earlier conversations where no company said no and people gave up because chasing cost more than the refund (OBSERVATION, five people). 29 public X complaints read on 9 Oct (REPORTED, small sample, all still open).
- Weakness, stated plainly: I have no flight or online-store refund case of my own, and no refund-desk experience. I did an internship at a D2C brand (The Souled Store), but not on refunds. My own refunds (Rapido Rs 100, Swiggy Rs 210) cleared in about a day, which is exactly why they are out of the bracket.
- Years inside the workflow: no. Audience that trusts me: weak (ex-Performics friends, Isha meditator friends, my Crucible cohort). What I do bring is 9+ years of performance marketing, so I know how to put a working demo in front of the right people fast.

## GOAL

**The one goal they hire it for (money, time, status or life):**
Money. Get back money that is already mine, without weeks of not knowing who has it and when it comes.

The job, in my words:
> When a company owes me money and keeps telling me "refund initiated" or "please wait" or "please DM us", and I don't know what is the rule, by which date it should come, or whom to write after support, I want someone who already knows all this for this exact company to take the case from me, so that I get my money back without I have to become a complaint expert for three weeks.
>
> Push: the chatbot is going in loop, support is giving the same template, every time I have to give my booking ID again, and the travel site is saying it is with the airline while the airline is saying you booked from the agent, so ask them.
>
> Anxiety: if I write to the wrong person or quote the wrong rule, I think they will just close my ticket, and I will not even know the money was mine by right. And I am scared I will forget the date and then it looks to be too late.

(I wrote this from the IPL interview and the X complaints, not from my own case. Labelled as such.)

**Delta 4 (the steps today, then the steps with my product):**
Today, about 11 steps, and the shape is the same for a flight, an online order or an event:
1. Get the cancellation or "refund initiated" message
2. Ask the app chat; get a template or a bot loop
3. Post on X; get "please DM us" (17 of 29 public complaints, REPORTED)
4. Send the booking ID again in DM; the thread goes quiet
5. Get told the money is with someone else (travel site says airline, 4 of 15 MakeMyTrip and Goibibo posts, REPORTED; District's own terms say the organiser decides, VERIFIED)
6. Google the rule; land on blogs that may carry the old rule
7. Hunt for the grievance officer or nodal officer email, usually buried in a user agreement
8. Write the email and guess what proof to attach
9. Remember the date and keep checking the bank
10. Chase again, from scratch
11. Find the next level (appellate, AirSewa, National Consumer Helpline) or give up

With my product, 4 steps, the same for all three types:
1. Paste the message or a screenshot (or forward the email)
2. See my rule, my date and my right person, each with where it is written
3. Tap to send the ready message from my own email; the case inbox is in CC
4. When they reply or the date comes, the next step is already written; "It's in" closes the case

Why one ChatGPT prompt does not do this. Two reasons, both checked in our own build.
- The rule and the person change, and models carry old versions. When we asked a frontier deep-research model (Gemini) to draft the flights playbook, an independent verifier found that 6 of its 10 load-bearing lines quoted the superseded refund rule (21 working days, now 14 under Rev 3), 3 could not be checked, and only 1 was confirmed. It also named the wrong MakeMyTrip grievance officer (from a holidays subdomain). For online stores, 9 of 10 load-bearing lines were unsupported, one with the cancellation-charge rule read backwards. (OBSERVATION, one run per playbook, files `flights-gemini-raw-verification.md` and `online-stores-gemini-raw-verification.md`.) A user pasting into ChatGPT gets a confident email citing a rule that no longer exists, sent to a person who is not the officer.
- ChatGPT writes one message and forgets. The agent sits in CC on the thread, reads the reply itself, decides whether it is a stall, a request or a blame shift, recomputes the date in code, and comes back with the next rung written.

**The sin it rides (optional):**
Wrath (they kept my money, I made them pay it back), with Greed as the share hook: "Got my flight refund back. Tickback knew the rule and the right person, I just tapped send."

## USER

**Who exactly:**
Someone in India who paid online, is owed a refund, and cannot see the company's process. In v1 that is:
- a domestic flyer whose flight was cancelled or changed, or who cancelled, and booked on the airline's site or on a travel site (MakeMyTrip, Goibibo, Cleartrip, EaseMyTrip);
- a shopper who bought from a small brand's own website, returned or cancelled, and the money is not back;
- a ticket buyer whose event was cancelled, postponed or moved.
Age band: my guess is 20 to 35, people who book and shop on their phone (MISSING; plan: record age band on the first real cases). Not the user: anyone whose refund is still on time by the playbook. The agent tells them so and stops.

**The trigger (when the pain hits):**
The first non-answer after money is owed. "Refund initiated" and nothing in the bank. "Please DM us." "We are waiting for the airline." "Your return is under quality check." "The organiser will decide." One trigger across all three types.

**Today's path, step by step (including not solving it at all):**
App chat or bot, then X, then "please DM us", then DM with booking ID, then silence or a blame shift to another company, then a Google search, then maybe an email to whatever address they find, then checking the bank every few days, then one more chase, then giving up. In the public sample of MakeMyTrip and Goibibo posts (mostly flights), stated waits ran from 1 to 120 days, median 20; three posts reported 90 to 120 days, two of them SpiceJet via Goibibo (REPORTED, only 7 posts stated a wait, so this is a signal, not a rate). Five conversations earlier: people quit because chasing cost more than the refund (OBSERVATION).

**Who they trust on this decision:**
MISSING. My guess: friends who went through the same refund, the company's own messages, and public pressure on X; not lawyers. Plan: ask every real user one question when they close or pause a case, "Whom did you ask before this?", and report the answers on 16 Oct.

**Would they pay? (what exists today that people pay for):**
- Voxya charges Rs 2,699 to prepare consumer-forum papers (REPORTED from Voxya's own page via our research model, not re-checked by HQ).
- AirHelp works on a share of compensation abroad but says it does not process claims under India's passenger charter (REPORTED, same caveat).
- In the US, Rocket Money takes a share of savings; Pine AI and Chargeback charge to chase refunds (REPORTED).
- For us: UNKNOWN. I have set the willingness-to-pay test aside for this sprint, my call, so I can put the three playbooks in front of real users first. A Rs 49 offer is built and hidden. I am not claiming anyone will pay.

## PRODUCT

**Onboarding (how a first-time user feels the value fastest):**
No sign-up. One box: paste the message or add a screenshot. The agent works out the type (flight, online order, event) and the scenario itself, asks only for what the playbook says is missing (booking ID, payment method, return-accepted date), and in under a minute shows three things with their source: the rule for my case, the date the money should land, and the right person. Anyone without a live case taps "Try a demo" and picks one of three demos, each a three-round chase in about 3 minutes with a "Skip ahead 10 days" button (the event demo runs today in 3 min 11 s, OBSERVATION from our log):
- Flight demo: a demo travel site and a demo airline (both clearly labelled demo roles) blame each other; the agent writes to the travel site's grievance officer and the airline's Nodal Officer in one email, citing the 14-working-day rule with the onus on the airline; the airline role replies with the date it paid the travel site; the agent sends that back to the travel site; "refund processed" with a reference; money landed.
- Online-store demo: a demo store page on our own site lists its grievance officer; the agent reads it off the page; a damaged product was returned and the store stalls ("under quality check"); the agent writes to the grievance officer citing the 48-hour acknowledgement and the no-refusal rule for defective goods; a ticket number comes back; then "refund processed" with a reference.
- Event demo: live today (stall, booking ID request, refund processed).
The demo shows how the agent works. It is never shown as a refund result.

**The core loop (user stories):**
One common story first. It is the same for all three types.

1. When I paste the cancellation mail or the "refund initiated" message, I want to see in one screen what is the rule for my case, by which date the money should come, and who exactly is the right person, with where each thing is written, so that I stop guessing.
2. When the date is not passed yet, I want it to just tell me "nothing to send now, it is on time" and put the date in my calendar, so that I am not chasing for nothing and irritating myself.
3. When I have to write, I want the message already written to the right person with the right rule, and I just tap send from my own email, so the company sees it is coming from me and the agent is quietly in CC.
4. When they reply, I don't want to decode their template. The agent reads it itself and tells me: is it a stall, are they asking something from me, or are they putting it on someone else, and what is next.
5. When they put it on someone else (the travel site says airline, the store says payment gateway, the platform says organiser), I want the agent to write to both at the same time with the rule that says who is responsible, so this loop finally breaks.
6. When the date passes and nothing came, I want the next level ready: grievance officer, then Nodal Officer or Appellate Authority for airlines, then AirSewa or the National Consumer Helpline, without me searching their names.
7. When the money comes, I tap "It's in", I see how much I got back, and I can share it.

My user flow for the common story (written like I would live it, a flight as the example):
1. Airline cancels my flight, I booked on a travel site
2. Travel site app says refund initiated
3. A week goes, nothing in my account
4. Chat bot gives same reply, X says please DM us
5. I DM booking ID, they say it is pending from airline side
6. I open Tickback, paste the travel site mail
7. It shows me: the airline holds the onus, 14 working days from cancellation (Tickback counts from the cancellation date because the rule gives none), the travel site's grievance officer and the airline's Nodal Officer by name
8. I tap send, one email to both, from my own Gmail
9. Airline replies to all, says it paid the travel site on a date
10. Tickback reads it and writes the next mail to the travel site with that date
11. Travel site sends a reference number
12. Money comes, I tap It's in, finally I can stop checking the bank

The bracket test, feature by feature:

| Feature | Flights | Online stores | Events |
|---|---|---|---|
| Read the paste or screenshot, find type and scenario | same | same | same |
| Name the rule, with quote and source | playbook data (DGCA) | playbook data (E-Commerce Rules, RBI) | playbook data (platform terms) |
| Compute the date in code | 7 days card, 14 working days travel site, 15 working days debit/UPI on direct (our expectation) | store's promised date, or 7 days after return accepted (our expectation); grievance officer 48 h and 1 month | platform's promised date or window |
| Right person, seen on the company's own page | stored, verified 9 Oct | read from the store's own pages at case time, saved with URL and date | stored, verified |
| Write to two parties at once | travel site and airline | store and gateway (if blamed) | platform and organiser |
| Case inbox in CC, reply read automatically | same | same | same |
| Ladder | support, grievance officer plus Nodal Officer, Appellate Authority, AirSewa, NCH | support, grievance officer, NCH, consumer commission (user files) | support, grievance officer, NCH |
| Calendar alerts, close, share | same | same | same |
| Demo | travel site plus airline | store with its own policy page | organiser |

Every row is the same feature. The columns differ only in data, with two small generic additions: a second recipient on a ladder step, and reading contacts off a company's page at case time. Neither is a new screen.

**Coming back (optional):**
Calendar alert on the date that matters and when a reply lands. Nothing else. People come back because the case moved, not because we nudge them.

**The AI-first part (onboarding, engagement or the core loop):**
The core loop. AI reads messy emails and screenshots, picks the type and scenario, pulls the matching rule rows from the playbook, reads every reply and decides what it means (stall, request, blame shift, resolution), and writes the next message citing the exact rule. Code computes every date, so the model never makes one up. Contacts are filled only when seen on the company's own page; our eval checks zero invented contacts (OBSERVATION, events eval, F1 to F16). Without the AI it is a rules FAQ the user must apply alone. Without the playbook it is ChatGPT with an old rule. The information is not given once: the right person and the next date change every time the company replies, and that is the work the agent does.

## MARKET

**Tailwinds (where funding is going, what Google Trends shows, timing):**
- The flight refund rule changed this year: CAR M-II Rev 3, in force 26 Mar 2026, sets travel-site refunds at 14 working days with the onus on the airline (VERIFIED); the earlier version said 21 (VERIFIED by our verifier on the old DGCA PDF). Blogs and models still carry the old rule (OBSERVATION, our verifier run). Fresh rules mean the gap between what is true and what people find is wide right now.
- IndiGo's mass cancellations in Dec 2025 left passengers across the country seeking refunds (REPORTED, The Hindu).
- National Consumer Helpline, eight months to Dec 2025: e-commerce 39,965 grievances, travel and tourism 4,050, airlines 668 (REPORTED from PIB release 2209070 by our research model; not yet re-checked by HQ).
- A claimed amendment brings e-commerce platforms into the helpline's convergence process from 1 Jan 2027 (REPORTED, official text not yet seen).
- Google Trends for "refund not received" and "flight refund" in India: MISSING (plan: run it 12 Oct, add the chart).
- Funding into AI agents that chase companies for consumers: Asmi AI and Pine AI exist in the US (REPORTED); Indian funding MISSING (plan: search 12 Oct).

**Competitors (and the flows I liked, with screenshots and why):**
- Doing nothing, or one message and giving up (the biggest competitor).
- Doing it myself: app chat, X, plus a ChatGPT draft (the one to beat, see Delta 4).
- Official routes: grievance officers, AirSewa, the National Consumer Helpline. Free, but the user must know them and chase them.
- Voxya: Rs 2,699 for consumer-forum papers (REPORTED). That is the last rung; we work the rungs before it.
- AirHelp: not for India's domestic charter (REPORTED).
- Asmi AI (US): a voice agent that phones companies and waits on hold (REPORTED). Much better funded; we do not do voice. Its deep research before each call is the same instinct as our playbooks.
- Rocket Money, Pine AI, Chargeback (US).
Flows I liked, with screenshots and why: MISSING (plan: teardown of Voxya, AirSewa and the NCH complaint flow, with screenshots, by 14 Oct).

**Size and fit (how many people in my extended network fit):**
- Public signal: the helpline numbers above count only people who reached the helpline (REPORTED, not re-checked).
- My network: MISSING. Plan: one post each to ex-Performics friends, Isha friends and my Crucible cohort on 11 Oct: "Is anything stuck right now with an airline, a travel site, an online store or an event?" Count replies by type by 13 Oct. What it changes: which demo leads my public posts. It does not change the build, because the three types share one loop and differ only in data.

---

Shaktimaan, this is the re-lock: one job (money stuck where the process is unclear), three verified playbooks, one agent loop. Lock it in.

---

## For Ganesh and HQ only (not for pasting)

### Build fit (about 4 days, one milestone for both new types)
- Day 1 (Sat 10): load flights and online-store playbooks as data (rule rows, contacts, date formulas, ladders); type and scenario detection; date functions in code (F01, F03 working days, D-029 check dates, O04 48 h and 1 month, O11/O12 T+5 calendar days only for failed card and UPI payments); eval fixtures per type.
- Day 2 (Sun 11): second recipient on a ladder step; flight drafts citing rule rows; flight demo with two demo roles from the one demo Gmail (two plus-addresses, two role labels, one thread).
- Day 3 (Mon 12): store contact lookup from the store's own pages (refund policy, contact, terms, footer), saved with URL and date, and "paste the address from your order email" when nothing is found; a static demo store policy page on our own site; store demo.
- Day 4 (Tue 13): eval on all three types (exact dates, zero invented contacts, no HQ default shown as law), landing copy for three types, events regression.
- Wed 14 to Fri 16: real users, public posts, fixes. Submit Sat 17 Oct, 11:00 IST.
- Cut order if late: (1) flight compensation tiers become "here is the rule" only, no tier maths; (2) store lookup falls back to paste; (3) the store demo drops to two rounds. The flight demo is the last thing to cut, because it shows the blame loop breaking.

### Decided items this sheet respects
D-028 (flights and stores, one agent, playbooks as data, event flow live, WTP set aside), D-011/D-025 (Level 1, user sends), D-022 (case inbox CC, calendar alerts), D-027 and the 9 Oct demo call (a demo per type; flight demo plays both travel site and airline), D-029 (no look-in promise on travel-site bookings; 15 working days and the store check date labelled as ours), dates in code, contacts only from the company's own page.

### Self-attack, as Shaktimaan, and the fix
- Attack: "Your value is 'verified at source'. That holds for 8 airlines and travel sites. There are thousands of D2C sites. For stores you cannot pre-verify anyone, so your 'live lookup' is just ChatGPT with browsing. Your one bracket is really one strong playbook and one weak one."
- Fix made in the sheet: for stores, the verified part is the rule, which is the same for every D2C brand selling on its own site (inventory e-commerce entity, O02; grievance officer must be shown, O03; 48 h and one month, O04; no refusing a refund for defective, not-as-advertised or late goods, O09). The store-specific contact is read off the store's own page at case time and saved with URL and date, so the store playbook grows with each case. And if a store shows no grievance officer, that absence is itself a breach of Rule 4(4), which the agent puts in the escalation. A browsing chatbot finds an email; it does not know that a missing officer is the lever, and it does not compute the 48-hour check or come back on it. The sheet now says this in the bracket table ("read from the store's own pages at case time, saved with URL and date") and in the store demo.
- Not fixed, and cannot be in this sprint: no real person has brought a flight or store case yet. See the biggest risk below.

## Predicted grilling

**1. "Flights, stores and events. That is three products. Which ONE job is it doing? My lean: pick flights, park the rest."**
The sheet's answer is in "Why this is one case and not three products" and in the bracket test table. The job is one: money owed, a non-answer, and no rule, date or person. All three types run the same nine features; only playbook data changes, with two small generic additions. The same two-party trap shows up across types (travel site and airline, REPORTED in public posts; platform and organiser, VERIFIED in District's terms; store and payment gateway, a REPORTED hypothesis not yet seen in our sample), and story 5 handles it once. The edge is also one: if the playbook says it is on time, we say wait. If you still want a lead, the network count on 13 Oct decides which demo leads the posts, but the product stays one loop, because a lead changes copy, not code.

**2. "Kill Rule 1. I paste my MakeMyTrip mail into ChatGPT and it writes a complaint citing DGCA. What is left? And if the user still sends it, your agent only drafts."**
The sheet's answer is under Delta 4, "Why one ChatGPT prompt does not do this", and in the AI-first part. Our own run: a frontier deep-research model got 6 of 10 load-bearing flight lines from the superseded rule and named the wrong MakeMyTrip grievance officer; 9 of 10 store lines were unsupported (OBSERVATION, one run each). On "only drafts": the user taps send from their own email by design (no passwords, OTPs or bank details, ever), but the agent picks the person, writes to two parties at once, sits in CC, reads every reply itself, recomputes the date in code and writes the next rung. The demos show this end to end in about 3 minutes.

**3. "You told me you never had a stuck flight or store refund. One interview, on events. Why you, and how do you know anyone wants this?"**
The sheet says it before you ask, under "Why me" (weakness stated plainly) and "Would they pay" (UNKNOWN, test set aside). What I have: one interview and five conversations (OBSERVATION), 29 public complaints showing the same non-answers (REPORTED), and three playbooks checked by a separate verifier, built because the rules are easy to get wrong. What I do not have: a real flight or store user, or any price signal. The plan in "Size and fit" and "Who they trust" puts the live app and three demos in front of three networks on 11 Oct, with the count reported by 13 Oct and real-user answers by 16 Oct.

### Biggest risk I could not remove
Demand for flights and stores rests on public complaints and helpline totals, not on one person who has used the agent on a real case. Equal standing for three playbooks is a build claim I can prove with demos; it is not yet a demand claim. If the 13 Oct count shows almost no live flight or store cases in my network, the sheet's "one job" still holds, but Shaktimaan can fairly say I have not met the user for two of the three columns.
