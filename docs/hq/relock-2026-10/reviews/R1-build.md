# R1 build-feasibility review of the four re-lock drafts

Independent critic, 9 Oct 2026. I did not write any draft. Question: which sheet can Codex actually build and show by Sat 17 Oct 11:00 IST (about 4 build days, Sat 10 to Tue 13, solo founder), with a working demo per refund type, without breaking the live event flow.

Read: CONTEXT.md, drafts R1-A to R1-D, STATE.md, MILESTONES.md (M2.5), `lib/route-kb.ts`, `convex/lib/plan.ts` (planCase), `convex/lib/read.ts`, `convex/lib/draft.ts`, `convex/lib/ground.ts`, `convex/lib/prompts.ts`, `convex/agent.ts`, `convex/demo.ts`, `convex/demoActions.ts`, `lib/demo.ts`, `lib/dates.ts`, `lib/google-tracking.ts`, `convex/schema.ts`, `app/c/case-view.tsx`, `app/start/page.tsx`, `app/copy.ts`, `app/privacy/page.tsx`, the 9 Oct log, and playbooks flights.md and online-stores.md (sections C, D, E, G, H).

---

## 1. What the code is today (the facts every estimate rests on)

The engine is event-shaped all the way down. It is good code, but nothing in it is "a general agent plus a playbook" yet.

| Piece | What it does today | What that means for flights and stores |
|---|---|---|
| Triage prompt (`prompts.ts`) | "You are the reading step of Tickback, a helper for event-ticket refunds". Anything else is OUT_OF_SCOPE. | Must be rewritten or branched. Today a pasted IndiGo or MakeMyTrip mail lands on the waitlist card. |
| Read schema (`read.ts`) | `isEventTicket`, `platform` enum of event platforms only, `eventName`, `ticketFormat`. `outOfScopeCategory` already has "flight" and "shopping". | Needs a refund type plus type fields: airline, booked via, PNR, cancellation date, order ID, return accepted date. `paymentMethod`, `refundProcessedDate`, `references` (ARN/UTR) already exist and carry over. |
| planCase (`plan.ts`) | First line forces OUT_OF_SCOPE when `!isEventTicket`. Due dates come from the message promise, District/BookMyShow policy, or a 10-working-day estimate. FAILED_PAYMENT uses RBI T+5. Ladder steps L0, L1, L2. | Needs a per-type date branch. The working-day function already counts Mon to Fri and ignores holidays, which is exactly the HQ DEFAULT in flights.md H3. So no new calendar is needed. `dueSource` has no label for "DGCA rule" or "Tickback's expectation" (D-029); add two values. |
| Route KB (`route-kb.ts`) | 5 event platforms, one email per step (support or grievance), value plus source URL. No names, no roles, no date read, no rule rows. | This is the seed of "playbook as data", but it holds only contacts. Rule rows, ladders and date formulas do not exist as data anywhere in code. |
| Drafts (`draft.ts`, `agent.ts`) | Event templates ("Hello District team, My booking X for Sample Concert..."). L1 template hard-codes the E-Commerce Rules 48-hour line. The model draft prompt says "No invented contacts, links, rules or legal threats". `draftMatchesFacts` rejects any body with an email or URL. One `to` field; CC is only the case inbox. | Rule citations must come from templates fed by rule rows, not from the model. A two-party email needs a second recipient field on the draft, in the Gmail compose link and in the case view. L2 has no template of its own today. |
| Reply reading (`ground.ts`) | A new "refund initiated, N days" reply restarts the window. "Processed" goes to TRACE. No idea of "this reply points at another company". | The blame-shift class, "paid to the agent on date X", credit-shell push and "ticket number received" are all new. |
| Demo (`demo.ts`, `demoActions.ts`, `agent.ts`) | `demo.create` accepts only `bookmyshow` or `district`. Sample text, amount Rs 2,400 and "Sample Concert" are hard-coded. In `agent.ts` each round's read and plan are forced (round 1 WAIT 7 to 10 days, round 2 ask booking ID, round 3 TRACE). Reply bodies are a fixed 3-step ladder. Max 3 replies per case. Sender name "Refund desk · demo (<platform> role)". The organiser only replies to mail whose To line exactly contains the demo address, and strips every demo-mailbox address from the reply-all. UI says "Round x of 3". | The mechanism is reusable (same real path: user's Gmail sends, case inbox reads, skip clock, close). The content is not: it has to become a per-type script stored as data. Two roles from one Gmail is possible with two plus-addresses and a per-round display name, plus two small fixes (match To by mailbox, keep the other role's alias in the reply-all). |
| Copy (`copy.ts`, `case-view.tsx`) | "For event tickets bought in India", FAQ "Flights are next", OUT_OF_SCOPE card "We're starting with event tickets", share text "Got my ₹X ticket refund back", District-specific "can't attend" text. | One copy pass, but it must ship on the same day the engine does, or Shaktimaan finds the contradiction. |

Demo timing baseline (9 Oct log, run TB-JNEC29, 3:10.7 total): about 32 s from start to the first send, then about 52 to 68 s per round, and about 28 s of that is polling plus triage after "Mark sent". So one round costs roughly 60 s. A 3-round demo lands near 3:10. A 4th round puts it near 4:10. Cutting the two 10-second poll intervals to 5 seconds would save about 10 s per round, which is the cheapest way under 3:00.

Already built and reusable for every draft: paste or screenshot intake, booking-ID confirm step, case inbox in CC and automatic reply reading, reply banner, calendar alerts, check-ins, "Not yet", Money landed close with share, the paste-the-address fallback when no verified contact exists (`emailHelp` copy), the RBI T+5 failed-payment path, Demo-labelled Sheet rows, 7-day demo deletion, paid Gemini.

---

## 2. Draft by draft

Legend: (a) already built, (b) data or config change, (c) new code, (d) not buildable by 17 Oct, or only with a cut.

### R1-A "One job, three playbooks of equal standing"

(a) Already built: no sign-up paste box; case inbox CC and reply reading; calendar alerts; "It's in" close and share; event playbook and event demo (3:11); dates in code; zero-invented-contacts eval for events only; Rs 49 hidden.

(b) Data or config: flight contacts with names and roles; rule rows with quote, source, date read; ladder names per type; date formula parameters; demo script text; landing copy for three types.

(c) New code: type and scenario detection; "asks only for what the playbook says is missing" (per-type intake); flight and store date functions with D-029 labels; drafts that cite rule rows; second recipient on a draft; reply classes including blame shift; ladder rungs Appellate Authority, AirSewa, NCH per type; flight demo with two roles; store demo; a static demo store policy page; store contact lookup at case time, saved with URL and date.

(d) Not buildable as written, or only with a cut:
- Bracket table row "Write to two parties at once" for stores (store and gateway) and events (platform and organiser). There are no payment-gateway contacts and no organiser contacts in any playbook or in route-kb. Only the flights row has data behind it. As written this is a promise for all three types; it is real for one.
- "Paste the message or a screenshot (or forward the email)" in Delta 4 step 1. Forwarding as intake does not exist. The inbox only polls for cases that already have a sent draft. Remove the words or build an intake-by-forward path (about 0.5 day, not in the plan).
- "Read from the store's own pages at case time, saved with URL and date, so the store playbook grows with each case". The lookup is about 1 day and the riskiest piece (Shopify bot checks, JS-rendered pages, proving the email really appears on the page). A shared store-contacts table across cases is extra on top.
- Store demo: "a ticket number comes back; then refund processed". After the user writes to the grievance officer, the ticket-number reply and the processed reply need either a 4th user send (about 4:10 total) or an unprompted second reply (new code). It also makes the demo depend on the lookup working on our demo page, so the riskiest piece sits inside the demo.
- "Equal standing" plus three-type eval on Day 4 leaves no slack for live demo proof runs, which need Ganesh at his Gmail.

Live product will contradict:
- Until the engine ships, a flight or store paste hits "We're starting with event tickets". The sheet is written as if all three are live today and does not say when flights become testable.
- The event demo will not show "write to platform and organiser at once", although the bracket table says events do it.
- Share text says "ticket refund" while the sheet's share line says "Got my flight refund back".

Demos: flight 3 rounds (travel site blames, airline gives paid date, travel site sends reference) fits the organiser with the two-role fix, about 3:10. Store demo as written needs 4 rounds or new code; rewrite to 3.

### R1-B "Flights lead, stores built as data plus a demo"

(a) Already built: same base as A; booking ID confirm step (extend to PNR and booking ID); "Not yet" and "It's in"; reply reading through the case inbox.

(b) Data or config: flight playbook F01 to F23 with HQ DEFAULT lines marked; 8 contacts with names; store playbook O01 to O15; landing and hero copy switched to flights with events reachable; switch rule (stores lead if fewer than 3 flight cases by Wed 14) is a copy toggle if the copy is data.

(c) New code: flight intake fields (booked on, airline, payment method, cancellation date, PNR); date rules (card +7 calendar days, travel site +14 working days from cancellation, debit/UPI/net banking +15 working days labelled ours, MakeMyTrip/Goibibo +24 hours from the airline's refund date, which can reuse `refundProcessedDate`); two-party ladder with new reply classes (blame shift, paid to agent, credit-shell push, processed with or without ARN); flight demo with two roles; store demo; store contact read only from a page the user links, paste as fallback; eval fixtures.

(d) Not buildable as written, or only with a cut:
- Story 5 (self-cancel on a non-refundable fare, taxes and airport fees back) needs a fare breakdown the user rarely has. Ship it as a templated "what you can honestly ask" message, no maths.
- Story 4 (credit shell) and story 5 are two more templates; fine if templated, risky if left to the model, because the draft prompt forbids rules.
- Store page reading from a user-supplied link is the piece most likely to slip; B already names paste as the fallback. Good.

Live product will contradict: B is the only draft that says it out loud ("Until the flight flow goes live on Tue 13 Oct, the live link still shows events"). The remaining risk is the date itself: Tue 13 is the last build day, so any slip makes that sentence false. Ganesh should tell Shaktimaan the day it actually goes live, not the planned day.

Demos: flight 3 rounds, one reply per round, roles alternate site, airline, site. Fits the organiser with the two-role fix, about 3:10. Store demo "three rounds" is unspecified; use the event ladder shape (see D) and it is near-free.

### R1-C "Blame-loop breaker, the who-owes-you card"

(a) Already built: same base; FAILED_PAYMENT T+5 path covers C's "money debited, order never confirmed, the store's ask-your-bank is right" case almost as is.

(b) Data or config: both playbooks; "the one question that pins it" per type as data; intake question "where did you book or pay?".

(c) New code: the "who owes you" card (new UI card in a 518-line case view, about 0.5 day); a reply-reader field "which company this reply points at"; code that flips the owner by rule; two-party drafts on one thread; flight demo with a visible card flip; store demo.

(d) Not buildable as written, or only with a cut:
- "Who sits above them: the next person, read from the company's own page" for every store case. That is the live lookup. C does list it as the first cut, which is right, but the onboarding text still promises it.
- "Event tickets use the same agent and the same question". The live event flow and event demo have no owner card and no two-party move. Either the card is also built for events (more work) or this line is false when Shaktimaan runs the event demo.

Live product will contradict: the event-only triage and copy until ship day (C does not say when flights go live; add B's sentence). The event demo will not show the card.

Demos: flight 3 rounds with the card flip after round 2 (site blames, airline says paid, site sends reference). Store 3 rounds (initiated check with bank, payment partner processing, reference) with no gateway contact needed. Both fit, about 3:10 each. C's card flip is the clearest on-screen proof of the agent's work of any draft, but it costs the extra card.

### R1-D "Outlasted, not refused: the persistence engine, stores lead"

(a) Already built: reading replies, coming back on a date, climbing L0 to L1 for events; TRACE ask for UTR; Money landed close.

(b) Data or config: both playbooks; store demo script; copy.

(c) New code: store path with grievance-officer lookup from the store's own pages (this is the lead type's core promise); "Who did what" count (cheap, about 0.25 day, counts stored case events); seven reply kinds each with its own move; "accept a new date only if not later than the rule or promise"; missed-date climb across three types; NCH or AirSewa complaint text with the full dated thread; "You can close this, I'll be back on <date>" screen; forward-to-case-address fallback (D's own proposal, not decided).

(d) Not buildable as written, or only with a cut:
- Stores lead on the riskiest piece. If the lookup slips, the lead story falls back to "paste the address from your order email", which reads exactly like ChatGPT plus a reminder, the thing D's sheet argues against.
- "Email reminders once the domain is verified". That is M4, untouched, no Resend domain. Remove.
- The "Who did what" screen on every demo, including the event demo. Cheap, but it touches the live event demo.
- Seven reply kinds and the date-acceptance rule are about a day on their own, beyond the shared minimum.

Live product will contradict:
- "A stall with a new date: accept the date only if it is not later than the rule or promise". Live code does the opposite today: `groundTrackedReply` lets a fresh "refund initiated, N days" reply supersede the earlier window. Shaktimaan already found "due dates restarting" once. This line invites him to find it again on the event demo.
- Event-only triage and copy until ship day; D does not say when stores become testable.

Demos: D's store script (stall, Skip ahead, grievance officer acknowledges and asks for the order ID, order ID sent, processed with UTR) is the same shape as the live event ladder (stall, ask booking ID, processed). It is the most reusable demo script of all four drafts. The officer's name "from the store's policy page" makes it depend on the lookup; use a fixed demo contact instead. Flight demo 3 rounds, same as the others.

---

## 3. Can the two-party flight demo be built on the existing organiser?

Yes, with about 0.75 day of changes, if each round has one reply from one role.

- One demo Gmail, two plus-addresses (travel-site role and airline role) and two display names ("Refund desk · demo (travel site role)", "Refund desk · demo (airline role)"). Gmail delivers one copy to the one inbox, so the organiser still sees one message per send.
- Fix 1: `checkOrganiser` must match the To or CC line by mailbox, not the exact demo address.
- Fix 2: the reply-all filter strips every demo-mailbox address. Keep the other role's alias so both companies visibly sit on the thread.
- Fix 3: the round script (role, reply body, forced read and plan, which step Skip ahead writes, what the round-2 input asks for) moves out of `agent.ts`, `demo.ts` and `demoReplyBody` into one script object per type. `demo.create` takes a type, the start page picker shows Event, Flight, Online store.
- Fix 4: drafts need the second recipient so round 2's "one email to both" is real.
- Honest note: in the demo the agent's reading is overridden per round, as it is for events today. The demo shows the path, not the classifier. If Shaktimaan asks, say so.

Rounds to stay near 3 minutes: exactly 3 user sends and 3 replies per demo, one role per reply. Do not let both roles reply in one round (a second reply per round breaks the 3-reply cap and adds about 30 s). With 5-second polling all three demos should land near 2:45 to 3:00.

Online store demo: also 3 rounds. Cheapest script is D's (event ladder shape with the grievance officer as the Skip ahead step). C's script is also fine. A's needs a 4th round or new code.

---

## 4. Ranking on buildability

1. **R1-B.** One deep type, one data-only type, single landing story, the only sheet that tells Shaktimaan when flights become testable. Everything it promises is in the minimum engine below, except two extra templates.
2. **R1-C.** Same engine as B plus the owner card and owner flip (about 0.75 to 1 day more). Strong demo. Weak line: "events use the same question" is false on the live event flow unless the card is built there too.
3. **R1-A.** Same engine plus store lookup in the demo path and the forward intake. Its "two parties at once" claim for stores and events has no contact data behind it; it is true for flights only.
4. **R1-D.** Leads on the riskiest piece (store lookup), adds the most new code (seven reply kinds, date acceptance, complaint prep, who-did-what), promises M4 email, and one line contradicts live date behaviour. Its store demo script is the best one to borrow.

---

## 5. Minimum new engine pieces any version needs

Estimates are Codex build days, including tests, assuming Ganesh is available for live demo proof runs. Rule: keep the event path frozen behind a type branch, so the 58 unit tests, the F1 to F16 eval and the event demo keep passing untouched.

| # | Piece | Days |
|---|---|---|
| E1 | Refund-type router and per-type intake: type field, flight fields (airline, booked via, PNR, cancellation date), store fields (order ID, store URL, return accepted date); triage prompt sections per type; event path untouched | 1.0 |
| E2 | Generic playbook schema as data: contacts with name, role, email, source URL, date read; rule rows with quote, source, label RULE or TICKBACK DEFAULT; ladder per type; date formulas. Events move into the same shape | 0.5 |
| E3 | Per-type date rules and two new due-source labels (DGCA rule, Tickback's expectation). Working-day calendar already exists (Mon to Fri, holidays ignored per H3) | 0.5 |
| E4 | Per-type draft templates that cite rule rows from data, per-type fact checks (PNR, order ID), per-type ladder rungs (grievance officer plus Nodal Officer, Appellate Authority, AirSewa or NCH) | 0.75 |
| E5 | Multi-party step: second recipient on a draft, Gmail compose CC, case view line | 0.5 |
| E6 | Reply reader minimum: "points at another company", "paid to the other company on date X", "processed without reference"; code maps each to the next recipient | 0.5 |
| E7 | Demo as script data, two roles from one Gmail, two new scripts | 1.0 |
| E8 | Copy pass (landing, OUT_OF_SCOPE card, FAQ, share text, privacy line if pages are fetched), eval fixtures per type, event regression, two live demo proof runs | 1.0 |
| | **Total** | **about 5.75** |

That is more than the 4 days every draft assumes. It fits only by using Wed 14 as a build day or by cutting. Not in the minimum: store contact lookup (+1.0), owner card (+0.5 to 0.75), "who did what" (+0.25), forward intake (+0.5), seven reply kinds with date acceptance (+1.0), compensation tier maths (+0.5).

---

## 6. Proposed cut line if time runs short (cut in this order)

1. Store contact lookup. Use the existing paste fallback; the store draft says Rule 4(4) requires a grievance officer when the user cannot find one. Saves 1 day.
2. Every "extra" from a single draft: owner card, who-did-what, forward intake, complaint prep, compensation maths, credit-shell and self-cancel flows as special routes (keep them as plain templates).
3. Store demo becomes D's event-ladder script with a fixed demo officer contact. Saves about 0.25 day.
4. Reply reader stays at the E6 minimum. In the demo, rounds are scripted anyway.
5. If the flight demo does not pass a live proof run by Mon 12 night: ship the flight type for real cases, show the event demo, and tell Shaktimaan the flight demo is coming. Do not ship a two-role demo that times out.
6. Last resort: stores ship as data and real cases on Wed 14, demo after. This crosses Ganesh's one-milestone call, so it is his decision, not Codex's.

Never cut: the event path regression checks, and the copy pass on the day the engine ships. A flight sheet with an event-only live link is the exact contradiction Shaktimaan has caught before.

## 7. One line every draft should carry

Whichever sheet wins, add B's sentence in its own words: the live link shows events until the flight flow goes live, and Ganesh will say the day it does. Then send that message on the real day, not the planned one.
