# R1-B · Re-lock candidate: "A sharp wedge: stuck flight refunds lead"

Draft by Claude HQ for Ganesh, 9 Oct 2026. Not committed. Everything above the "Predicted grilling" line is written to paste to Shaktimaan as is. Labels: VERIFIED (official text or the company's own page, read 9 Oct), REPORTED (secondary source or public posts, not checked by me), OBSERVATION (what I saw myself), MISSING (with the plan to get it).

---

# IDEA LOCK · Build Sprint (re-lock, 10 Oct 2026)

**The idea in one line:**
An AI agent that takes over a stuck flight refund in India and stays on it until the money lands, even when the travel site and the airline keep pointing at each other. You paste the cancellation email, the travel site's reply, or a screenshot. It works out who owes you (on a travel-site booking the DGCA rule puts the onus on the airline), the date the money is due by rule, and writes the next message, which you send from your own email with a Tickback case inbox in CC. Every reply from the travel site or the airline comes back to the agent; it reads it, decides who to write to next, and on the due date moves you up the ladder: support, grievance officer and the airline's Nodal Officer, Appellate Authority, AirSewa, National Consumer Helpline.

v1 is one case: stuck refunds on domestic flights on IndiGo, Air India, SpiceJet and Akasa, booked direct or through MakeMyTrip, Goibibo, Cleartrip or EaseMyTrip (the companies whose contacts I verified on their own pages). The landing page, the hero, my outreach and my user tests are flights only.

How the other refund types sit: the same agent runs on a playbook per refund type, stored as data. Event tickets (where I started) stay live for people who already use it. Online-store refunds (small D2C sites) are built in the same milestone as a second playbook with its own demo, as proof that a new refund type is new data, not new features. It is reachable inside the product, but I do not market it this week. It is also my pre-declared fallback (see Size and fit).

Out of v1: denied-boarding compensation claims, international flights, hotels, trains, EPF, Swiggy/Zomato/Rapido, chargebacks, legal notices, voice calls, logging in for the user, and any company-confidential data.

**Why me (at least 1 of 3: an audience that trusts me, years inside the workflow, data nobody else has):**
Honest answer first: I do not have a stuck flight refund of my own, and I have not interviewed anyone with one yet (FACT). My own cases (Rapido Rs 100, Swiggy Rs 210) cleared in a day, and that is why I left them (OBSERVATION).
- Data nobody else has (partial, and it is my strongest): a flight refund playbook built from the DGCA text itself, with every rule quoted, dated and linked, and checked twice by a separate verifier agent (VERIFIED). It matters because the obvious sources are wrong. When I asked Gemini Deep Research to build the same rules, it quoted the 2008 text: 21 working days for travel-site refunds and a 5-day look-in limit. The rule in force since 26 Mar 2026 (CAR M-II Rev 3) says 14 working days and 7 days. It also gave the wrong MakeMyTrip grievance officer (OBSERVATION, from my verifier's report). Anyone could rebuild this from public law, but I have not found anyone who has.
- Also: 29 public X complaints coded by scenario, company and what support said (REPORTED, small sample); one event-refund interview and five earlier stuck-money conversations that show money is "outlasted, not refused" (OBSERVATION).
- Years inside the workflow: no. I spent 9+ years in performance marketing (Performics, Hiveminds), not in refund operations.
- Audience that trusts me: weak (ex-Performics friends, Isha meditator friends, my Crucible cohort).
- What I can show instead: a live product I built in this sprint, with real reply tracking through a CC case inbox, calendar alerts and a 3-minute demo where a demo company replies in the same email thread (OBSERVATION, live today for events).

## GOAL

**The one goal they hire it for (money, time, status or life):**
Money. Get my flight money back, without being the messenger between the travel site and the airline.

**Delta 4 (the steps today vs the steps with my product):**
Today (about 12 steps, built from the public X posts, not from my own case):
1. Get the cancellation SMS or email
2. Open the travel site app; it says "refund initiated"
3. Wait and check the bank
4. Chat with the app's bot; it repeats the same template
5. Call the travel site; "we are waiting for the airline"
6. Call the airline; "refund already sent to your agent"
7. Go back to the travel site with that
8. Post on X; "please DM us"
9. DM the booking ID; silence
10. Search the rules; blogs give 7, 15 or 21 days
11. Find the grievance officer or Nodal Officer email and write a long mail
12. Forget the date, chase again, or give up

With my product (4 steps):
1. Paste the cancellation email, the travel site's reply, or a screenshot
2. See who owes me, my due date with the rule behind it, and the first message ready
3. Tap to send it from my own email (case inbox in CC)
4. When anyone replies, or the date comes, the next message is ready, to the right company. On the day, tap "It's in" or "Not yet"

Job solved better: ChatGPT writes one polite email and forgets. It does not see the airline's reply, does not know which of the two companies to write to next, and can quote an old rule (Gemini did, above). Tickback holds the verified rule and contacts as data, computes the date in code, reads both companies' replies through the case inbox, and breaks the blame loop by writing to whoever the rule says owns the refund.

**The sin it rides (optional):**
Wrath (they kept my money and passed me around, I made them pay it back), with Sloth as the reason to hand it over (I don't want to be the messenger). Share line: "Travel site said ask the airline, airline said ask the travel site. Tickback told me who actually owed me and wrote every mail."

## USER

**Who exactly:**
Someone in India, roughly 22 to 40, who flies domestic a few times a year, often books on MakeMyTrip, Goibibo, Cleartrip or EaseMyTrip for the deals, and pays by card or UPI. Their flight was cancelled by the airline, or they cancelled themselves, and the refund has not landed by the date they were told. (Age range and booking habits are my assumption: MISSING, I will record them for every real case.)

**The trigger (when the pain hits):**
The first "not yet". The app said "refund initiated" or "processed" and the bank shows nothing, or the travel site says it is waiting for the airline. Public posts show three versions of it: travel site waiting on the airline (4 of 15 MakeMyTrip/Goibibo posts), "refund processed" with no money (7 of 29), and a credit shell or voucher pushed instead of cash (REPORTED, X sample of 29, signals not rates).

**Today's path, step by step (including not solving it at all):**
As in Delta 4 above. The public pattern in more detail (REPORTED, 29 X posts, 9 Oct, all still open): 17 of 29 got "please DM us" as the first reply and the public thread then goes quiet; 3 describe app chatbots looping with no person; 3 report waits of 90 to 120 days, two of them SpiceJet via Goibibo; 4 say fees or taxes were kept. Many end at "not solving it at all": the money is outlasted, not refused (OBSERVATION, five earlier conversations, mixed categories).

**Who they trust on this decision:**
Partly MISSING. Signals: when the chat fails, people go public on X, so they trust public pressure more than the support channel (REPORTED, 29 posts). In my event interview the user trusted the platform's own messages and would hand the chase to an app (OBSERVATION, one person, yes/no question). Plan: in every real flight case I ask "who did you ask first, and who did you believe?"

**Would they pay? (what exists today that people pay for):**
- Voxya charges Rs 2,699 to prepare consumer-forum case papers (REPORTED, quote from Voxya's own page via Gemini, not checked by me).
- AirHelp works on a share of compensation but says it does not process claims under India's passenger rules (REPORTED, AirHelp's own page via Gemini).
- Travel sites sell refund add-ons at booking: EaseMyTrip publishes "free full refund" terms (VERIFIED, the terms page exists); that these are paid, and their price: REPORTED, not checked. People already pay up front to avoid this exact fight.
- My own price for Tickback: not tested. I set the price test aside this week to put every hour into real flight cases (my call, 9 Oct). Willingness to pay is UNKNOWN, and I say so.

## PRODUCT

**Onboarding (how a first-time user feels the value fastest):**
No sign-up. The first screen asks one thing: paste the cancellation email, the travel site's reply, or a screenshot. The agent shows "what we understood" (airline, booked on, payment method, cancellation date) to confirm, and asks the booking ID and PNR only at that step. In under a minute: who owes you, the due date with its rule, and the first message ready with the case inbox in CC.
For anyone without a live case: "Try a demo". A demo email account plays two labelled roles, "Refund desk · demo (travel site role)" and "Refund desk · demo (airline role)", so you live the blame loop and watch the agent break it, through the same real path (your Gmail sends, the case inbox reads). Three rounds: the travel site says it waits for the airline; the airline says it already paid the agent; the travel site sends "refund processed" with a reference. A "Skip ahead 10 days" button, then "Money landed" closes it. The demo shows how Tickback works; it is never shown as a refund result.

**The core loop (user stories):**

The job, in my words (written in the user's voice from the public posts, because I do not have my own flight case):
When my flight is cancelled by the airline and I had booked it on a travel site, and the app is showing "refund initiated" since many days, I want to know who is actually holding my money and by which date it has to come, so that I can stop running between two companies and just get my money back.
Push: the app bot gives the same template again and again, the travel site says they are waiting for the airline, the airline says it already sent the refund to the agent, and on X they only say please DM us.
Anxiety: if I don't keep following up I think the money just sits with them, and it is not a Swiggy-sized amount. I don't even know the rule, every blog is saying a different number of days. And what if I write something wrong and they use it to close my complaint?

The stories:
1. My flight got cancelled and the app says refund initiated. I paste the mail and I see it plainly: I booked on a travel site, so the airline holds the onus and the refund has to complete in 14 working days (CAR M-II 3(c)). The date is on my calendar and I have nothing to send yet, which honestly is a relief.
2. The date passed and the travel site says "waiting for the airline". I forward nothing and argue with no one. Tickback has read their reply from the case inbox and has my next mail ready, to the airline's Nodal Officer, quoting the 14 working days and the onus line, with the travel site in CC. I just tap send.
3. The airline replies that the refund was already processed to the travel site. Now I know who has my money. The next mail goes back to the travel site with the airline's date, asking for the ARN or UTR, and for MakeMyTrip or Goibibo it quotes their own terms: they try to pass refunds on within 24 hours of getting it from the airline.
4. They try to give me a credit shell instead of cash. The reply is ready: thank you, but I want the refund to my original payment, credit shell is the passenger's choice (CAR M-II 3(f)).
5. I cancelled myself on a non-refundable fare and they kept everything. The agent tells me what I can honestly ask back: taxes and airport fees always come back (3(d)); a travel-agent fee shown at booking does not, so it never promises me that.
6. Still nothing after the grievance officer and the Nodal Officer. The next rung is ready: Appellate Authority with the full thread, then AirSewa, then the National Consumer Helpline. When the money lands I tap "It's in", close the case, and see what came back.

How the dates work, so nothing is made up: credit card 7 days (rule); travel-site booking 14 working days (rule; the start date is not in the rule, so we count from the cancellation date and say so); debit card, UPI or net banking on a direct booking, a check date of 15 working days, labelled as Tickback's expectation, never as DGCA. The agent never promises the 48-hour free cancellation on a travel-site booking. Dates are computed in code, never by the model.

**Coming back (optional):**
Not habit; the case brings you back. A calendar alert when the travel site or the airline replies, check-ins on the computed dates, and the case link that holds the whole thread and proof.

**The AI-first part (onboarding, engagement or the core loop):**
The core loop. The AI reads messy cancellation mails, templated travel-site replies and airline replies, and decides what each one means: a stall, a blame shift, a credit-shell push, a request for details, or "processed" with a reference. Then it picks the scenario from the playbook, the next company to write to, and the rule to quote, and writes the message. Code computes the dates; the playbook holds the rules and contacts as data with quote, link and date. Without the AI it is a reminder app. Without the playbook it is ChatGPT guessing, and guessing wrong.
Same bracket, same features: intake, the date engine, reply reading, the ladder and the demo are built for flights. The online-store playbook reuses every one of them with its own rules (E-Commerce Rules 2020: a D2C brand must show a grievance officer who acknowledges in 48 hours and resolves in one month, and cannot refuse a refund for defective, not-as-advertised or late goods; VERIFIED) and its own demo store. That is the test of your point that the playbook, not the model, is the advantage: adding a refund type should cost data and a demo script, not a new product.

## MARKET

**Tailwinds (where funding is going, what Google Trends shows, timing):**
- The rule just got sharper. DGCA CAR M-II Rev 3, dated 24 Feb 2026, in force 26 Mar 2026: travel-site refunds in 14 working days with the onus on the airline (was 21 in the old text), no fee to process a refund, credit shell only by the passenger's choice (VERIFIED, official text, verifier-checked). Most passengers and most blogs have not caught up (OBSERVATION: even Gemini Deep Research quoted the old text).
- December 2025: IndiGo's mass cancellations disrupted air travel across India (REPORTED, The Hindu); AirHelp puts the number hit at 1.62 million passengers (REPORTED, AirHelp's own page title via Gemini; an interested party).
- Refunds are the top grievance type on the Civil Aviation Ministry's AirSewa snapshot (REPORTED by Gemini from the ministry homepage, not checked by me).
- National Consumer Helpline, 8 months to Dec 2025: travel and tourism 4,050 grievances, airlines 668, e-commerce 39,965 (REPORTED by Gemini from PIB release 2209070, not yet re-checked by me).
- Google Trends for "flight refund" in India: MISSING (plan: run it on Sat 10 Oct, 12 months, and add the chart).
- Funding into AI consumer-dispute agents: MISSING (plan: search on Sat 10 Oct). Asmi AI in the US runs a voice agent that phones companies on the user's behalf (REPORTED).

**Competitors (and flows I liked):**
- Doing nothing, or waiting it out (the biggest competitor).
- Doing it myself: the app chat, a call, an X post, and a ChatGPT draft (the one to beat).
- Official routes, free but you chase them yourself: the airline's Nodal Officer and Appellate Authority, AirSewa, the National Consumer Helpline (1915).
- Paid help: Voxya, Rs 2,699 for consumer-forum papers (REPORTED); AirHelp, not for Indian domestic claims (REPORTED); the travel sites' own refund add-ons (REPORTED).
- US agents: Rocket Money, Pine AI, Chargeback, and Asmi AI's voice agent (REPORTED). I cannot match voice calls with my resources; my difference is India's written rules, a dated written trail, and the user staying the sender.
- A flow I liked: Cleartrip's grievance page. One page, the clock stated up front (support first, grievance officer if not solved in 72 hours), and it asks for the Trip ID before anything else (VERIFIED, read on Cleartrip's page). I copy that: clock first, ID once. Screenshots and a full teardown: MISSING (plan: Sun 11 Oct).

**Size and fit (how many people in my extended network fit):**
MISSING. I do not know how many people in my network have a flight refund stuck right now.
Plan, with dates:
- By Mon 12 Oct: DM 30 people across ex-Performics friends, Isha friends and my cohort with one question: "Do you have a flight refund stuck now, or had one in the last 60 days?" I count the yes.
- From Tue 13 Oct (the day the flight flow goes live): reply by hand to people posting stuck MakeMyTrip, Goibibo or airline refunds on X with a free chase. These are live cases today; 17 of 29 sampled were only told "please DM us" (REPORTED).
- Switch rule, decided now: if I have fewer than 3 real flight cases started by Wed 14 Oct, online stores (already built) becomes the lead story for the final days, and I tell you that day.
Wider market signal only: 4,718 travel and airline grievances reached the National Consumer Helpline in 8 months (REPORTED, see above). That counts only people who got that far.

---

Shaktimaan, this is the re-lock with stuck flight refunds as the one v1 case. The online-store playbook and its demo ship in the same milestone because they prove the engine, not because they widen the pitch. Until the flight flow goes live on Tue 13 Oct, the live link still shows events; I will tell you when you can test flights. Lock it in?

---

## Not for pasting: what Codex builds, Sat 10 to Tue 13 Oct (one milestone, per Ganesh's call)

1. Flight playbook as data next to `lib/route-kb.ts`: rules F01 to F23, contacts table, 8 scenarios; labels kept; HQ DEFAULT lines marked so the agent never cites them as law.
2. Flight intake and confirm step: booked on (airline or which travel site), airline, payment method, cancellation date, PNR and booking ID.
3. Date rules in code: credit card +7 days; travel site +14 working days from cancellation (labelled anchor); debit/UPI/net banking +15 working days (labelled Tickback's expectation); MakeMyTrip/Goibibo pass-on +24 hours from the airline's refund date.
4. Two-party ladder: new reply classes (blame shift to airline, "paid to agent", credit-shell push, processed with or without ARN); the next draft goes to the party the rule names, the other in CC.
5. Flight demo: two labelled roles on the demo account, three rounds, Skip ahead, Money landed.
6. Online-store playbook as data (O01 to O15) plus a demo store with three rounds. Store contacts: read only from a store page the user links; if no grievance officer is found, the draft says Rule 4(4) requires one and uses the support email; if nothing is found, the user pastes the address from the order email. This lookup is the piece most likely to slip; paste-only is the fallback.
7. Eval fixtures for each flight scenario and two store scenarios; landing page and hero switched to flights; events stay reachable.

Day order: Sat, items 1 to 3. Sun, items 4 and 5. Mon, item 6. Tue, item 7, fixes, and the flight flow goes live for Shaktimaan to test. Wed 14 to Fri 16: real cases and selling.

---

## Predicted grilling (for Ganesh, not for pasting)

**1. "You have zero flight cases. Not yours, not one interview. Why should I believe flights is the pain and not something you read about?"**
The sheet says it first, under Why me, before he can. What it has instead: 29 public X complaints, all still open, with the blame loop in 4 of 15 travel-site posts (REPORTED); UD's own steer that money gets stuck with airlines (REPORTED, from UD). What it commits to: 30 DMs by Mon 12 Oct, hand replies to live X complaints from Tue 13 Oct, and a switch rule decided in advance (fewer than 3 real flight cases by Wed 14 Oct, online stores leads, and Ganesh tells Shaktimaan that day). Ganesh should not argue the evidence is strong. He should say it is thin and show the date by which it gets real or the plan changes.

**2. "The National Consumer Helpline shows e-commerce at about 60 times airlines. And you are building online stores anyway. So why do flights lead, and isn't that two cases?"**
Why flights lead: the product's core promise is a date and an owner, and flights have both in law: 14 working days with the onus named on the airline, 7 days to a credit card (VERIFIED). Store refunds only have "a reasonable period", so for stores the date would be Tickback's guess. The NCH count also only covers people who reached NCH; airline complaints go to AirSewa, where refunds are reported as the top type (REPORTED). Why it is not two cases: everything users see, the landing page, the outreach and the story are flights. The store playbook is data plus a demo on the same features, built to test his own point that the playbook is the advantage, and it is the pre-declared fallback if flight cases don't come. If he still says cut it, the honest answer is: this is Ganesh's call to ship both in one milestone; the store demo can be hidden from the landing page with no change to the flight build.

**3. "Would ChatGPT do this in one prompt? And if the user still sends every mail, isn't the agent only drafting?"**
Three answers, all in the sheet. One: the model alone gets the rule wrong. Gemini Deep Research quoted the 2008 text (21 working days, 5-day look-in) and the wrong MakeMyTrip grievance officer; the verifier caught it (OBSERVATION). Two: ChatGPT never sees the reply. The case inbox in CC reads the travel site's and the airline's replies, the agent classifies each one and decides which company to write to next, which is the whole blame-loop job. Three: dates are computed in code and the agent comes back on the date with the next rung. The user sends from their own email by design (Level 1), so the company sees the real passenger and the agent never touches passwords, OTPs or bank details. Showable live in the flight demo in about 3 minutes.

## Self-attack (one pass, as Shaktimaan) and the fix made

Attack: "Your sheet describes a flight product. I will open your live link and find events only. Last time I found your privacy page contradicting your promise. Which one is true?" This was the biggest hole: the judge tests the product, not the sheet, and the build lands on Tue 13 Oct. Fix made: the closing note now says plainly that the link shows events until Tue 13 Oct and that Ganesh will tell him when flights are testable; the build list is dated; the onboarding text describes only what the milestone builds (two labelled demo roles, the same real send-and-read path).

Second hole found and fixed: an earlier draft leaned on "high ticket values" with no number. There is no verified average fare in the repo, so the sheet now says "not a Swiggy-sized amount" in the user's voice and makes no fare claim.

Risk I could not remove: demand for flights rests on public posts and second-hand signals, not one real flight case. Only real cases by Wed 14 Oct fix that.
