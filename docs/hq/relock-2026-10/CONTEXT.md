# Re-lock context pack (read this first, every agent)

Prepared by Claude HQ, 9 Oct 2026. Everything an agent needs to write or attack the re-lock of Tickback's IDEA_SCOPE and product doc. Repo root: /home/claude/gx-getting-money-back. Plain words, short sentences, no em dashes in anything Ganesh will read.

## 1. The sprint and its judges

- GrowthX Build Sprint S04. Solo founder (Ganesh). India only. Build AND sell an AI-native product in public in two weeks. Final submission **Sat 17 Oct 2026, 11:00 IST**. Today is Fri 9 Oct, evening. About 7 days left.
- Stack is fixed: Next.js export on Convex static hosting, `.convex.site` address. Codex (ChatGPT) builds; Claude HQ thinks.
- **Shaktimaan** = GrowthX's AI agent, trained on UD. Gatekeeper for the idea lock. It tests the live app and reviews the lock sheet. Known behaviour (from real exchanges):
  - Applies kill rules. Kill Rule 1: "would ChatGPT in one prompt do this?" (Delta 4, thin-wrapper test). Also: AI-native core, no licence needed, not a data-collection play, one job / one case: "all of your v1 features should only stack in that bracket".
  - Asks one pointed fork question and leans: e.g. "Your agent can't sit inside Swiggy's chat. So which job is it doing?" with a two-column table and "My lean is the left column".
  - Asked Ganesh directly whether he personally had a stuck flight/event/EPF refund. Ganesh answered honestly: no.
  - Re-locked on events (4 Oct) after one real interview. Then proposed "agent sends the first email after one tap, schedules a day-3 chase" and said "if the agent only drafts, it's ChatGPT".
  - Said the stack is fixed this season (moved Ganesh off Vercel).
  - On 8 Oct: "the playbook, not the model, is the advantage"; research each playbook once, verify, store as data; live lookups only fill gaps.
  - Tested the live build and found real bugs (due dates restarting, wrong event type in drafts, privacy promise contradicting privacy page). It reads the actual product, not just the sheet.
- **UD (Udayan)** = the human sprint lead. Product-thinking session: JTBD, user stories, user flow must be the founder's own thinking, one common story first. Said Swiggy/Rapido refunds are too small and already have a process. On 7 to 8 Oct: big platforms (BookMyShow, District) settle refunds in about 2 days because they can't afford angry customers; money gets stuck where the process is unclear: airlines, EPF, small D2C sites. Asked Ganesh to explore those.

## 2. The lock-sheet template (GrowthX). Keep these headings exactly

The idea in one line · Why me (at least 1 of 3: an audience that trusts me, years inside the workflow, data nobody else has) · GOAL: the one goal they hire it for (money, time, status or life) · Delta 4 (steps today vs steps with my product) · The sin it rides (optional) · USER: who exactly · the trigger · today's path step by step · who they trust · would they pay (what exists today that people pay for) · PRODUCT: onboarding · the core loop (user stories) · coming back (optional) · the AI-first part · MARKET: tailwinds · competitors (and flows I liked) · size and fit. Current version: `IDEA_SCOPE.md` (events only, locked 4 Oct).

## 3. What is decided (do not re-open; cite by ID if useful). Full text: DECISIONS.md

- D-010 (4 Oct) events v1. **Amended by D-028 (9 Oct): next refund types are flights and online stores (small D2C sites first, marketplaces as contrast). One general agent plus a verified playbook per refund type, stored as data. Event flow stays live.** Ganesh (9 Oct): one milestone for both new types.
- D-011/D-025: **Level 1 autonomy.** The agent writes every message, reads every reply (case inbox in CC, pasted chat replies), decides the next step; **the user sends from their own email.** Never touches passwords, OTPs, bank details, never logs in for the user.
- D-022: default reply tracking: every draft CCs a Tickback case inbox (plus-address with the case code); replies that reply-all reach Tickback; paste stays as fallback. Calendar alerts for replies and check-ins.
- Dates are computed in code, never by the model. Contacts auto-filled only when seen on the company's own page.
- D-027 + amendment: **a demo**: "Try a demo" makes a synthetic case; a separate demo Gmail plays the organiser and replies in the same email thread in 3 rounds (stall, asks booking ID, "refund processed" + reference); a "Skip ahead 10 days" button; Money landed closes it. Runs through the same real path (user's own Gmail sends, case inbox reads). Built (M2.5), full run 3 min 11 s.
- **Ganesh, 9 Oct: the same kind of demo must exist for flights and online stores.** Flight demo plays BOTH a demo travel site and a demo airline, so the user lives the "travel site blames the airline" loop and sees the agent break it.
- D-029: agent never promises 48-hour look-in on travel-site bookings; debit/UPI/net-banking check date 15 working days labelled as Tickback's expectation, not DGCA; store refunds: store's promised date or 7 days after return accepted, labelled as ours.
- D-020 pricing (Rs 49 to stay on it, Rs 300+ cases, money back guarantee) exists but **willingness-to-pay testing is set aside for now (D-028, Ganesh's call)**. M3 payment paused.
- Ganesh wants Claude to write JTBD, user stories and user flows fully, in Ganesh's voice (see section 7).

## 4. Evidence ledger (labels matter; Shaktimaan punishes overclaiming)

| Evidence | Label |
|---|---|
| IPL event refund: Rs 2,400, venue moved, support "didn't know" 3 to 4 days, Google form, couriered physical tickets at own cost, about 20 days total. Would hand it to an app (yes/no question, no price). `docs/research/user-evidence/2026-10-04_ipl-venue-change-refund.md` | OBSERVATION, one interview, weak on demand |
| Five earlier conversations: no company said no; people gave up because chasing cost more than the refund ("outlasted, not refused") | OBSERVATION, 5 interviews, mixed categories |
| Ganesh's own cases: Rapido Rs 100, Swiggy Rs 210, both cleared in about a day | OBSERVATION; shows small platform refunds are not the pain |
| **No first-hand flight or online-store case yet** (Ganesh, 9 Oct). No D2C refund operations experience (worked at The Souled Store but not on refunds) | FACT, a weakness to state plainly |
| 29 public X complaints (9 Oct, NotebookLM): 17 got "please DM us"; 4 of 15 MakeMyTrip/Goibibo posts: travel site says it waits for the airline; 7 "refund processed", no money; 3 waits of 90 to 120 days (two SpiceJet via Goibibo); 4 fees kept on cancellation; 3 chatbot loops; all still open. `docs/research/user-evidence/x-complaints.md` | REPORTED, small sample, signals not rates |
| NCH (PIB release, 8 months to Dec 2025): e-commerce 39,965 grievances; travel and tourism 4,050; airlines 668 | REPORTED by Gemini from PIB PRID 2209070; NOT YET re-checked by HQ |
| Flights playbook: DGCA CAR M-II Rev 3 (24 Feb 2026, in force 26 Mar 2026): credit card refund 7 days; travel-site booking 14 working days with onus on the airline; taxes always refunded; credit shell is the passenger's choice; no refund processing fee. CAR M-IV: denied boarding and short-notice cancellation compensation; Nodal Officer, Appellate Authority, AirSewa. Contacts for IndiGo, Air India, SpiceJet, Akasa, MakeMyTrip, Goibibo, Cleartrip, EaseMyTrip verified on their own pages. `docs/research/playbooks/flights.md` | VERIFIED, verifier-checked twice |
| Online-store playbook: E-Commerce Rules 2020: a D2C brand is an "inventory e-commerce entity"; must show a grievance officer who acknowledges in 48 h and resolves in 1 month; cannot refuse refund for defective / not-as-advertised / late goods (Rule 7(4)); accepted refunds within "a reasonable period" (no fixed days). RBI T+5 + Rs 100/day only for failed payments. `docs/research/playbooks/online-stores.md` | VERIFIED, verifier-checked |
| Willingness to pay | UNKNOWN; test set aside |
| How many people in Ganesh's network have a stuck flight or store refund now | UNKNOWN |
| Competitors: Voxya charges Rs 2,699 to prepare consumer-forum papers; AirHelp does not handle Indian domestic claims; Rocket Money / Pine AI / Chargeback (US) | REPORTED from Gemini doc; Voxya and AirHelp quotes on own pages per Gemini, not HQ-verified |
| Asmi AI (US, ex-Meta/DeepMind founders): voice agent that phones companies, waits on hold, relays OTPs via WhatsApp, multi-day memory, deep pre-call research. Tickback cannot match voice/telephony; Ganesh notes resources are far smaller | REPORTED (Gemini chat) |

## 5. Distribution and "why me" raw material

- 9+ years performance marketing (Performics, Hiveminds): ran large media budgets for P&G EMEA, Mia by Tanishq; CPA and CVR work. PGPM student, D2C Business Management, Crucible Institute, Mumbai. Leads the institute's AI and Tech Committee. B.E. Electronics.
- Networks: ex-Performics friends, Isha meditator friends, Crucible cohort (budget sensitive).
- Built and shipped in the sprint so far: live product with real reply tracking via a CC case inbox, calendar alerts, a working three-round demo, verified event playbook, and now two verified playbooks (flights, online stores) built from primary government sources with an independent verifier.

## 6. The live product today (what Shaktimaan can click)

Live: https://harmless-lyrebird-924.ap-southeast-2.convex.site/ . Events only. Paste a message or screenshot; code picks route (WAIT, OVERDUE, ACTION_NEEDED, TRACE, FAILED_PAYMENT, NO_ROUTE, NEED_INFO, OUT_OF_SCOPE), computes the date, drafts the next message with the case inbox in CC; replies are read automatically and change the next step; reply banner; ladder: support, grievance officer, National Consumer Helpline. Demo organiser for BookMyShow/District. Model: Gemini 3.5 flash-lite, paid tier, about Rs 0.20 per case.

## 7. Ganesh's voice (for JTBD, stories, flows)

His own Swiggy JTBD, verbatim, as the style reference:

> When the food ordered is getting delivered very late, and I have to leave the place from where I placed order, I want have my money back by cancelling the order, so that I can peacefully proceed to my next commitment.
> Push: I am trying to cancel my order, the delivery partner is not moving, the customer support agent is negotiating without understanding my situation
> Anxiety: If the cancellation delays, or not happens my money goes wastes, since I need to go the food may also get waste...
> User flow story: I am very hungry, the food ordered got delayed by 40 minutes, the delivery partner is not moving towards my location, finally I decided to cancel the order... the CS agent is arguing me with me, after nearly 10 minutes of arguing an me genuinely expressing my frustration the agent agrees to cancel the order.
> User flow: 1. Placed the order 2. order status 3. order delay, partner not moving 4. find cancel option, wait for agent to connect to ... 8. Bursting on agent 9. Agent cancels the order 10. Agent says refund will come in 24 hours 11. Anxious, I have to remind myself to check refund status.

Voice rules (my-humanizer): first person, concrete moments and feelings, some hedging ("I think", "looks to be"), occasional rhetorical question, longer natural phrasing, light non-native phrasing, no em dashes, no arrows, no bold mini-headings inside prose. Substance must stay precise.

## 8. Hard constraints for any proposal

- One job, one bracket. The three refund types must read as one job, or one must lead and the others sit inside the same bracket.
- No legal action, no chargebacks run by us, no logging in, no voice calls, no confidential company data. Never present a Tickback default as a law.
- Must be buildable by Codex in about 4 days alongside a demo per refund type, and sellable/showable by 17 Oct.
- No claim without its label. No invented numbers. Missing data stays "MISSING (plan to get it)".
