<!-- Charter, owned by Claude HQ. Re-locked with Shaktimaan on 2026-10-04 (D-010). If the text you send to Shaktimaan differs, replace this file with that exact text. Full detail: docs/prd/. -->
# IDEA LOCK · Build Sprint (re-locked 4 Oct 2026)

**The idea, in one line:**
An AI agent that takes over a stuck event-ticket refund and stays on it until the money lands. You paste what the organiser told you (or a screenshot). It works out which refund route you are on (automatic, form, proof needed, credit only, or no route), tells you the date your money should land and why, and gives you the next message ready to send from your own email. When the refund is straightforward, it says so and sets a check date. When it isn't, it comes back on that date and moves you up the ladder: support, then the platform's grievance officer, then the National Consumer Helpline. v1 means the version I build and sell in the two-week sprint: event tickets in India only. Flights are next; EPF and other government forms are v2. Out of v1: Swiggy, Zomato, Rapido, chargebacks, legal notices, voice calls, logging in for the user, and any company-confidential data.

**Why me (at least 1 of 3: an audience that trusts me, years inside the workflow, data nobody else has):**
- Data nobody else has (partial): an interview with a buyer whose IPL refund took about 20 days on Rs 2,400. The venue moved, support "didn't know" for 4 days, then a Google form, then he couriered physical tickets at his own cost, then two weeks of silence. He would hand the whole chase to an app. My evidence rests on him, not on my own refund: my own cases (Rapido, Swiggy) were small and cleared in a day.
- Five earlier customer conversations on stuck money: no company said no; people gave up because chasing cost more than the refund.
- Years inside the workflow: no. Audience that trusts me: weak (ex-Performics friends, Isha meditator friends, my cohort).

## GOAL

**The one goal they hire it for (money, time, status or life):**
Money. Get my ticket money back, without weeks of not knowing.

**Delta 4 (the steps today → the steps with my product):**
Today (about 10 steps):
1. Find out what's going on (ask support, wait days)
2. Find the refund policy
3. Work out what I'm owed and how
4. Find the right channel
5. Write the message
6. Attach the right proof
7. Remember the date
8. Check the bank
9. Chase again
10. Find the next level (grievance officer, helpline), or give up

With my product (4 steps):
1. Paste the message or a screenshot
2. See my route, my date and my next step
3. Tap to send it from my own email
4. On the date, tap "It's in" or "Not yet"; if not yet, the next step is ready

Job solved better: ChatGPT writes one message and forgets. The agent knows the route for this platform and case, computes the date from the promise or the rule, keeps the case and proof at one link, and comes back on the right day with the next step.

**The sin it rides (optional):**
Wrath (they kept my money, I made them pay it back), with Greed as the share hook: "Got my Rs 2,400 ticket refund back. Tickback told me the date and wrote every message."

## USER

**Who exactly:**
Someone in India, roughly 20 to 35, who bought tickets online for a live event (concert, comedy, cricket, festival) on BookMyShow, District or an organiser's site, often for friends too, and whose refund is unclear, late, or tied to steps they don't understand.

**The trigger (when the pain hits):**
The event is cancelled, postponed or moved; money was debited but no ticket came; or the platform says "refunded" and the bank shows nothing.

**Today's path, step by step (including not solving it at all):**
Ask support chat and wait; get "we don't know yet" or "7 to 10 working days"; sometimes fill a form or courier tickets back; keep checking the bank; ask again; complain on X; or give up.

**Who they trust on this decision:**
MISSING (my guess, to check in T1: friends who went through the same refund, and the platform's own messages; not lawyers).

**Would they pay? (what exists today that people pay for):**
Paid today (to verify): Rocket Money takes a share of what it saves users; US apps such as Pine AI and Chargeback chase refunds and cancellations for fees. India paid equivalent: MISSING (not yet checked). My offer to test: free to check (route, date, first step); Rs 49 to stay on it for refunds of Rs 300 and more, with the Rs 49 back if the refund doesn't land. Testing it in DMs this week (T1) and in the product.

## PRODUCT

**Onboarding (how a first-time user feels the value fastest):**
No sign-up. Paste the message or a screenshot, or tap what happened. In under a minute: the route, the date the money should land with its source, and the next step ready to send. A sample case to try first for anyone without a live case.

**The core loop (user stories):**
1. My event was cancelled and they said a refund is coming: I paste the message and see the date it's due and that there's nothing to send yet; it's on my calendar.
2. They want me to do something (a form, return physical tickets, choose refund before a deadline): I get the exact checklist, deadline and proof to keep.
3. They replied: I paste the reply and it tells me what it means and what's next.
4. The date passed and nothing landed: it gives me the next step up the ladder (grievance officer, then the National Consumer Helpline), written and ready to send from my own email.
5. The money landed: I close the case, see what I recovered, and share it.

**Coming back (optional):**
Calendar check-ins on the dates that matter, then email once the domain is verified.

**The AI-first part (onboarding, engagement or the core loop):**
The core loop. AI reads messy messages and screenshots, picks the refund route, reads every reply and decides the next step. Code computes dates and rules so nothing is made up. Without AI it is a reminder app.

## MARKET

**Tailwinds (where funding is going, what Google Trends shows, timing):**
- 2026 had a run of big cancellations and postponements in India (Bandland 2026 cancelled; Shakira's India tour postponed; a Delhi concert moved by two months with no refund route), and IPL 2025 needed a different refund process for each disrupted match.
- A Hyderabad consumer commission fined BookMyShow in 2026 for not telling a buyer a (movie) show was cancelled (reported).
- From 1 Jan 2027, every e-commerce platform must join the National Consumer Helpline's convergence process (amendment notified Sep 2026, reported).
- Google Trends for "refund not received" in India: MISSING (not yet run).
- Funding news for AI consumer-dispute agents: MISSING (not yet searched).

**Competitors (and the flows I liked, with screenshots and why):**
- Doing nothing, or one message and giving up (the biggest competitor)
- Doing it myself: the platform's chat plus ChatGPT drafts (the one to beat)
- A person: a friend who knows the system
- Official routes: grievance officers, the National Consumer Helpline (free, but people don't know them)
- Products: Rocket Money, Pine AI, Chargeback (US); Indian equivalents for event tickets not yet searched
Flows I liked, with screenshots and why: MISSING (teardown not yet done).

**Size and fit (how many people in my extended network fit):**
MISSING (not yet counted). Counting people with an event or ticket refund in the last 60 days. Test (T1): DM 10 people; if fewer than 3 have a live or recent case, I switch v1 to flights and say so.

---

Shaktimaan, this is the re-locked version with events as the one v1 case. Lock it in.
