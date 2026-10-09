# R1-D. Re-lock candidate: "Outlasted, not refused: the persistence engine"

Draft by Claude HQ, 9 Oct 2026. Not committed. Mechanism: the value is memory and persistence, not the first message.

## Notes for Ganesh (do not paste)

- Everything between the two lines below is the sheet to paste to Shaktimaan. "Predicted grilling" at the end is for you.
- Three small things in this sheet are new proposals, not yet in DECISIONS.md. They need your yes before Codex builds them:
  1. A "Who did what" count on the case screen (your taps vs the agent's work). Cheap: it counts events the case already stores.
  2. Forward-to-case-address as a fallback when a company drops the CC. Paste stays the decided fallback.
  3. The flight demo puts the demo travel site and the demo airline on one email thread (user sends once, both in the To and CC lines).
- The ladder in this sheet stops at the National Consumer Helpline and AirSewa. Consumer commission (e-Daakhil) is left out of v1 because CONTEXT section 8 rules out legal action.
- The NCH numbers are labelled REPORTED because HQ has not re-opened PIB PRID 2209070. Five minutes on that page would let us upgrade the label before you paste.

---

# IDEA LOCK · Build Sprint (re-lock, 9 Oct 2026)

**The idea, in one line:**
An AI agent that stays on a stuck refund until the money lands, so the company can't outlast you. You paste what the company told you. It works out where your money is and the date it is owed, writes the message, and you tap send from your own email with a Tickback case address in CC. From then on it reads every reply itself, comes back on the right date, and climbs the ladder (support, then the grievance officer or the airline's Nodal Officer, then AirSewa or the National Consumer Helpline) until you tap "Money landed". v1 is India only, three refund types on one agent, each with a verified playbook stored as data: small D2C online stores first, flights alongside, event tickets already live. Out of v1: Swiggy, Zomato, Rapido, marketplaces as a build target (contrast only), chargebacks, legal notices, consumer court, voice calls, logging in for the user, passwords, OTPs, bank details, company-confidential data.

**Why me (at least 1 of 3: an audience that trusts me, years inside the workflow, data nobody else has):**
- Data nobody else has (partial, and I say how partial):
  - Five conversations about stuck money. No company said no. One person blocked her card after emails went nowhere, one quit after one draining call, one lets go of Rs 2,000 to 4,000 a year, one got money back only through a personal bank contact, one was billed after a free trial turned paid. (OBSERVATION, 5 interviews, mixed categories.) This is where the whole idea comes from: the money is outlasted, not refused.
  - One event refund interview: Rs 2,400, about 20 days, a Google form, tickets couriered at his own cost. He would hand the chase to an app (yes/no question, no price). (OBSERVATION, one interview.)
  - 29 public X complaints I coded on 9 Oct: 17 got "please DM us" and then the public thread goes quiet; 4 of 15 MakeMyTrip/Goibibo posts are the travel site saying it waits for the airline; 7 "refund processed" with no money; 3 waits of 90 to 120 days; all 29 still open. (REPORTED, small sample, signals not rates.)
  - Two playbooks built from primary government text (DGCA CAR M-II Rev 3 and M-IV; Consumer Protection (E-Commerce) Rules 2020; RBI failed-transaction circular), every rule quoted with source and date, re-checked by a separate verifier, contacts taken only from the companies' own pages. (VERIFIED.) Anyone can read these rules. Almost nobody has them as data an agent can act on.
  - The reading part already works on real email: on a live test case, a company-style reply-all reached the case inbox and moved the case from "overdue" to "trace with your bank" with nobody pasting anything. (OBSERVATION, my own build log, synthetic case.)
- Years inside the workflow: no. I have seen a D2C brand from inside (internship at The Souled Store) but not its refund desk, and I have never had a flight or store refund stuck myself. I will not claim either.
- Audience that trusts me: weak (ex-Performics friends, Isha meditator friends, my Crucible cohort).

## GOAL

**The one goal they hire it for (money, time, status or life):**
Money. Get back money a company already owes me, without me having to keep chasing.

The job, in my words (written from the X complaints and my five conversations, not from my own case):
> When I returned the order and the store's pickup came 10 days back, and still my money is not come in my account, and every time I message they say "refund initiated, 5 to 7 working days", I want someone to keep after them on the right day without me remembering, so that I get my money back and I can stop opening my bank app every morning.
> Push: Same line every time. I don't know who is above the support person. I think there is somebody, but where to find?
> Anxiety: If I stop following up, I feel they will just close the ticket and the money is gone. If I keep following up, it eats my head for weeks.

**Delta 4 (the steps today, then the steps with my product):**
Today, for a stuck store refund (about 11 steps, and they repeat every week it drags):
1. Notice the money is not back
2. Open the store's chat or WhatsApp
3. Get "5 to 7 working days"
4. Try to remember the date
5. Check the bank again and again
6. Message again, get the same line
7. Look for an email, not just the chat
8. Find out a grievance officer even exists, then find them on the site
9. Write the complaint with order ID and proof
10. Wait, and lose track again
11. Find the next level (National Consumer Helpline), or give up

With my product (5 steps, and they do not grow with the wait):
1. Paste the store's message or a screenshot
2. Tap send on the first message, from my own Gmail, case address in CC
3. Nothing. The agent reads their replies and wakes up on the date
4. When a step up is due, tap send on the next message it wrote
5. Tap "Money landed"

The difference in one line: today, every extra week of stalling adds steps for me; with Tickback, it adds steps for the agent and one tap for me.

Job solved better, and the ChatGPT test: ChatGPT can write a good first message. That is the cheap part, and it is free in Tickback too. ChatGPT cannot see the store's reply four days later, cannot know that "refund initiated" without a reference means ask for the UTR, does not wake up on day 7, does not know the grievance officer has 48 hours to acknowledge, and does not carry the dated thread up to the next level. Companies win by waiting. A chat window that forgets you the moment you close it cannot outwait anybody.

**The sin it rides (optional):**
Sloth: I don't want to chase. With Wrath as the share moment: "They stalled for three weeks. Tickback never let go. Rs ___ back." (the amount is the user's own).

## USER

**Who exactly:**
Lead picture: someone in India, roughly 20 to 35, who paid upfront (UPI or card) on a small D2C brand's own website (clothes, skincare, accessories, the Shopify-type stores), whose order was cancelled or whose return was accepted or picked up, and whose money has not come back.
Alongside, same job: someone whose flight was cancelled (or who cancelled it) and whose refund is stuck, often booked on a travel site where the site and the airline point at each other.
Already live, same job: someone whose event was cancelled or moved and whose ticket refund is unclear.

**The trigger (when the pain hits):**
The date the store or the site promised passes and nothing is in the bank. Or the second "5 to 7 working days" reply. Or the app says "refund processed" and the bank shows nothing. Or the travel site says "waiting for the airline".

**Today's path, step by step (including not solving it at all):**
In my words, the store case:
1. Ordered, paid by UPI
2. Size was wrong, raised a return
3. Pickup happened, got "return received" mail
4. Waited the 5 to 7 days they said
5. Nothing in bank, messaged on chat
6. Bot gives same template, no person
7. Found an email, wrote it, got "refund initiated" with no reference
8. Another week, nothing, I am checking bank every morning
9. Posted on X, they said "please DM us" and the public thread is quiet
10. Did not know the grievance officer is there, so I stopped
11. Money is still somewhere, I have given up on it

Evidence behind this path: the five conversations (OBSERVATION) and the X complaints (REPORTED). For flights the same path has one more loop: the travel site says it waits for the airline (4 of 15 MakeMyTrip/Goibibo posts, REPORTED).

**Who they trust on this decision:**
MISSING. My guess: friends who went through the same refund, the company's own emails, and their bank. Plan: ask every live case user in the first conversation, from 10 Oct.

**Would they pay? (what exists today that people pay for):**
What people pay for today: Voxya charges Rs 2,699 to prepare consumer-forum papers (REPORTED, from its own page per Gemini, not HQ-checked); AirHelp takes a cut on claims but does not handle Indian domestic claims (REPORTED, same); Rocket Money, Pine AI and Chargeback in the US charge to chase refunds and cancellations (REPORTED). My offer on paper: first message free, Rs 49 to stay on it for cases of Rs 300 and more, Rs 49 back if the money hasn't landed 30 days after the due date. The shape fits this idea: the free part is what ChatGPT also does; the paid part is the persistence. But I have set price testing aside this sprint, my own call, to put the days into the two new playbooks and demos. So willingness to pay is UNKNOWN, and I am saying it before you ask.

## PRODUCT

**Onboarding (how a first-time user feels the value fastest):**
No sign-up. Two doors.
- Live case: paste the message or a screenshot. In under a minute: where my money is, the date it is owed and why (the rule, or the company's own promise, or Tickback's own check date, each labelled), and the first message ready with the case address in CC. One tap opens it in my Gmail. Then the screen says: "You can close this. I'll be back on <date>, or sooner if they reply." The date goes on my calendar.
- No live case: "Try a demo" for a store, a flight or an event. A separate demo account plays the company and replies in the same email thread, so I live the chase in about 3 minutes, with a "Skip ahead 10 days" button. Same real path as a live case: my Gmail sends, the case inbox reads. The demo is never shown as a refund result.
  - Store demo: the demo store replies "refund initiated, 5 to 7 working days" (stall). Skip ahead, nothing landed. The agent has the grievance officer message ready, with the officer's name from the store's policy page and the 48-hour rule. The demo officer acknowledges with a ticket number and asks for the order ID. Then "refund processed" with a UTR. Money landed.
  - Flight demo: booked on a demo travel site, flight cancelled. The demo travel site replies "we are waiting for the airline" (the blame loop). The agent writes one message to the demo airline's Nodal Officer with the travel site in CC, quoting the DGCA line that the airline carries the refund for travel-site bookings. The demo airline replies "refunded to your travel agent on <date>". The agent reads that and turns to the travel site with that date and its own 24-hour pass-on promise. The travel site sends "refund processed" with an ARN. Money landed.
  - Event demo: already built (three rounds, full run 3 min 11 s; target under 3).
  - Every demo ends on the "Who did what" count: "You: 4 taps. Tickback: read 3 replies, set 3 dates, found 2 officers on the company's own pages, wrote 4 messages." That screen is the pitch.

**The core loop (user stories):**
1. My return got picked up and the money is not come. I paste the store's last email and I see where my money is and the date it is owed. I tap send from my Gmail, and then I can forget it, honestly that is the main thing.
2. The store replies "refund initiated, 5 to 7 working days". I don't even open it. Tickback already read it, moved my check date, and tells me there is nothing to send right now.
3. The date passes and my bank shows nothing. Tickback has the next message ready, this time to the grievance officer it found on the store's own policy page, with my order ID and the dated thread. If the store shows no grievance officer, it says so in the message, because the store is supposed to show one. I tap send.
4. My flight got cancelled and the travel site says it is waiting for the airline. Tickback writes to the airline's Nodal Officer with the travel site in CC, so both of them are on one thread. When the airline says "already refunded to agent on this date", Tickback goes back to the travel site with that date. I am not the one stuck in the middle anymore.
5. They say "refund processed" but nothing is there. Tickback asks them for the UTR or ARN and the date it left. When that comes, it tells me what to give my bank.
6. Nothing works at the officer level. Tickback prepares my National Consumer Helpline (or AirSewa) complaint with the full dated thread and tells me exactly where to file it. It cannot file for me, and it says so.
7. The money lands. I tap "Money landed" and I see the whole chase: how many days, how many replies it read, how many times I tapped. Then I can share it.

**Coming back (optional):**
I don't have to come back on my own. Calendar events on every check date and an alert when a reply lands; the case screen always shows "Tickback's next move, and when". Email reminders once the domain is verified.

**The AI-first part (onboarding, engagement or the core loop):**
The core loop, and specifically the reading and deciding between my taps. Every reply that comes into the case inbox is read by the model and sorted into what it actually means, then matched against the verified playbook for that refund type:
- a stall with a new date: accept the date only if it is not later than the rule or promise, then wait;
- asks for info (order ID, PNR, photos): tell me exactly what to send;
- blames the other company (travel site vs airline): bring both onto one thread and quote who carries the refund;
- "processed" with no reference: ask for UTR or ARN and the date it left;
- acknowledgement with a ticket number: note it, the officer's clock starts;
- pushes store credit or a credit shell: say it is my choice where the rules say so (flights: DGCA; stores: only for defective, wrong or late goods);
- silence past the date: climb one rung.
Code, not the model, computes every date and holds every rule and contact; the model never invents a date or an address, and Tickback's own check dates are labelled as ours, never as law. Without the AI it is a reminder app that cannot read the reply. Without the playbook it is ChatGPT guessing rules.

The hard question, answered up front: Tickback writes every message and the user sends it. You said "if the agent only drafts, it's ChatGPT". I agree, which is why drafting is not the product here. The agent does the reading, the deciding, the remembering, the finding of officers and the climbing. Sending stays with the user on purpose: the complaint comes from the customer's own address, which is what the company and its grievance officer answer to, and Tickback never needs permission to send from anyone's inbox. You made the same Level 1 pick on 6 Oct. The switch to one-tap sending is decided by evidence: if the share of drafts never sent is high in live cases, Level 2 is the next build.

## MARKET

**Tailwinds (where funding is going, what Google Trends shows, timing):**
- DGCA's refund rule was revised this year (CAR M-II Rev 3, dated 24 Feb 2026, in force 26 Mar 2026): 7 days to a credit card, 14 working days for travel-site bookings with the onus on the airline, credit shell only by the passenger's choice. (VERIFIED.) Fresh rules that most passengers have not read.
- National Consumer Helpline, 8 months to Dec 2025: e-commerce 39,965 grievances; travel and tourism 4,050; airlines 668. (REPORTED from PIB PRID 2209070 via Gemini; HQ has not re-opened the page.) Online shopping is where the volume is.
- Large flight disruptions keep happening (IndiGo mass cancellations, Dec 2025, REPORTED by The Hindu).
- E-commerce rules amendment pulling platforms into the NCH convergence process from 1 Jan 2027 (REPORTED, official Gazette text not seen).
- Persistence agents are being built abroad: Asmi AI (US) phones companies, waits on hold and keeps multi-day memory (REPORTED). Funding amounts: MISSING.
- Google Trends for "refund not received" in India: MISSING. Plan: run it on 10 Oct and paste the chart.

**Competitors (and the flows I liked, with screenshots and why):**
- Giving up. The biggest competitor, and the company's best tool (five conversations, OBSERVATION).
- Doing it myself with the company chat plus ChatGPT drafts. The one to beat. Good first message, no memory, no reading of replies, no clock.
- The company's own "please DM us" (17 of 29 X complaints, REPORTED). It moves the chase off any written, dated record. Tickback moves it back to email.
- Official routes: grievance officers, Nodal Officers, AirSewa, the National Consumer Helpline. Free and strong, but the user has to find them and keep chasing. Tickback is the way to actually use them.
- Voxya (Rs 2,699 for consumer-forum papers, REPORTED): starts at the court end; Tickback works the cheap rungs before that.
- AirHelp (not for Indian domestic claims, REPORTED); Rocket Money, Pine AI, Chargeback (US, REPORTED); Asmi AI (US, voice, much bigger team; I cannot match phone calls and I don't try).
Flows I liked, with screenshots and why: MISSING. Plan: teardown of Asmi AI and Pine AI case screens by 12 Oct, looking at how they show "what the agent did while you were away".

**Size and fit (how many people in my extended network fit):**
MISSING. I don't know yet how many people near me have a stuck store or flight refund right now. Plan: on 10 Oct I post in my ex-Performics, Isha and Crucible groups: "Is any store or flight refund stuck with you right now? I will chase it for free this week." I count replies by 13 Oct. If I get fewer than 3 live store or flight cases, the demos carry the submission and I say that plainly in it.

---

Shaktimaan, this re-lock keeps one job: outlast the company that owes you money. Online stores lead, flights sit in the same bracket, events stay live, and all v1 features are the same engine with a different verified playbook. What I know is weak, said before you find it: I have no first-hand flight or store case; willingness to pay is untested by my choice; the NCH numbers are not yet re-checked by me; and I cannot show a real refund that landed because of the follow-ups before 17 Oct, since the legal clocks (14 working days, one month for a grievance officer) are longer than the sprint. What I will show by 17 Oct: three demos, and real cases where the agent read a real reply and moved the next step without the user pasting anything. Build plan (4 days): day 1, both playbooks as data plus date code per payment method; day 2, store path with grievance officer lookup from the store's own pages, plus store demo; day 3, flight path with travel site and airline on one thread, plus flight demo; day 4, "Who did what" count, missed-date climb across all three types, evals. Lock it in.

---

## Predicted grilling (for Ganesh, not for pasting)

Self-attack done once before finishing. The biggest hole in the first pass: "persistence" read like a calendar reminder stapled to a ChatGPT draft. Fix made: the AI-first part now lists the seven reply kinds the agent reads and the move each one triggers, and every demo ends on the "Who did what" count, so the agent's work is visible and countable, not just claimed.

**1. "The user still sends every message. You told me the agent would send. If it only drafts, it's ChatGPT."**
Answer already in the sheet (AI-first part, last paragraph): drafting is not the product; reading, deciding, remembering, finding officers and climbing are, and none of them happen in a chat window. Sending from the user's own address is deliberate (the complaint comes from the customer; no send permission on anyone's inbox), it was Shaktimaan's own Level 1 pick on 6 Oct (D-025), and the move to one-tap send is gated on measured unsent drafts. If pushed further: the user's work is counted on screen ("You: 4 taps"). Weak spot to admit if asked: the CC route only catches replies that reply-all; paste (and forward, if you approve it) is the fallback, and we will report the real share of replies caught by CC from live cases.

**2. "Show me one case where following up and climbing got the money faster than giving up."**
Answer already in the sheet (closing note and Why me): I can't yet, and I say so. The idea rests on five conversations where nobody was refused but everybody gave up (OBSERVATION), 29 public complaints all still open with 17 pushed into DMs (REPORTED), and verified rules that give the officer rung a hard clock (48 hours to acknowledge, one month to resolve for store grievance officers; 14 working days on the airline for travel-site bookings). The legal clocks are longer than the sprint, so by 17 Oct I show the engine working on real replies, not landed money. If pushed: the "Money landed" closure and recovered amount are already built and will be reported honestly, including cases that didn't land.

**3. "Three refund types is not one job. And why lead with D2C stores when you have never had a store refund stuck and haven't checked the NCH number?"**
Answer already in the sheet (idea line, Who exactly, closing note): one job, outlast a company that owes you money; one engine; each type is a playbook stored as data, so every v1 feature sits in that one bracket. Stores lead for three reasons stated in the sheet: UD's steer that money gets stuck at small D2C sites, the reported NCH volume (labelled REPORTED, not leaned on as fact), and the strongest officer rung in the law (a store must show a grievance officer, and if it doesn't, that itself goes in the complaint). The gap is stated plainly: no first-hand store case, so the network post on 10 Oct and the "fewer than 3 live cases" rule decide whether the submission leans on demos.
