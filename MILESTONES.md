# Milestones (owned by Claude HQ; Codex may only set READY FOR REVIEW)

Status values: PROPOSED, ACTIVE, READY FOR REVIEW, DONE (after independent review), CUT (with reason).
Order follows the sprint guidance: landing page, then onboarding, then value, then communication.
Confirmed by Ganesh on 2026-10-03 (D-006 to D-009). Build in order; one milestone ACTIVE at a time.

## M0. Project skeleton | ACTIVE
Goal: Next.js + Convex (D-006) runs locally and deploys a blank page to a public URL.
Acceptance checks:
- [ ] `npm run dev` (or equivalent) starts with no errors
- [ ] A preview URL loads on a phone
- [ ] `.env.example` lists every key needed; `.env` is git-ignored
Reviewed by: —

## M1. Landing page (the product spec) | CONFIRMED
Goal: a stranger understands in 10 seconds what it does and starts a case.
Acceptance checks:
- [ ] Headline and sub-copy match IDEA_SCOPE.md (money back from everyday apps); hero example is a Swiggy or Zomato refund (D-007)
- [ ] Pricing line matches D-009: free under Rs 300, Rs 49 with a 14-day money-back guarantee above
- [ ] Shows the 4 steps (share two screenshots, approve, send, money lands)
- [ ] One call to action that opens onboarding, no sign-up wall before value
- [ ] Readable on a 360 px phone screen
Reviewed by: —

## M2. Onboarding: two screenshots to a case | CONFIRMED
Goal: first value in under a minute.
Acceptance checks:
- [ ] User uploads the booked value and the payment screenshots
- [ ] AI extracts platform, amount, date and what is owed; user can correct any field
- [ ] Works on real samples: two Swiggy or Zomato orders (missing/late/wrong item) and one subscription charge after cancelling; any other app falls back to the generic flow
- [ ] Mobile web, no sign-up before the case summary is shown (D-008)
- [ ] Case amount decides the price shown (D-009): free under Rs 300, Rs 49 with guarantee at Rs 300+
- [ ] Shows the first message to send in the app's support chat
Reviewed by: —

## M3. Core loop: coach the chat, then escalate | CONFIRMED
Goal: the case stays alive until money lands or is formally rejected.
Acceptance checks:
- [ ] User pastes the support bot's reply; agent classifies it (refund, stall, rejection) and gives the next line
- [ ] If stalled, agent drafts the grievance-officer email with the evidence attached; user sends it themselves
- [ ] Case has visible states: open, waiting, stalled, escalated, resolved, rejected
- [ ] Case and evidence are saved and survive a page reload
Reviewed by: —

## M4. Communication (bonus) | CONFIRMED
Goal: the agent remembers to chase so the user does not have to.
Acceptance checks:
- [ ] Day-3 and day-7 nudges for open cases by email or a pre-filled wa.me link (D-008)
- [ ] "Money landed" confirmation closes the case and shows the amount recovered
Reviewed by: —

## T1. Validation test: live cases and willingness to pay | ACTIVE (Ganesh, runs in parallel to M0 to M2)
Goal: settle D-009 with real behaviour before payment features are built.
Steps:
- [ ] DM 10 people: "Are you waiting on any refund or a charge you didn't expect right now? How much?"
- [ ] Offer the Rs 49 guarantee price to everyone with a live case of Rs 300+
- [ ] Record each reply as one line in docs/research/validation/ (who type, platform, amount, paid yes/no)
Decision rules (from D-009):
- Pass: at least 3 of 10 have a live case AND at least 2 with Rs 300+ cases pay by Day 5
- Cases but no upfront payment: switch to pay-after-success (Rs 29 to 99)
- Almost no live cases: named pivot reason; take it to Claude HQ
- If food refunds turn out not to be a struggle: swap D-007 story order
Reviewed by: —
