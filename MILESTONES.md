# Milestones (owned by Claude HQ; Codex may only set READY FOR REVIEW)

Status values: PROPOSED, ACTIVE, READY FOR REVIEW, DONE (after independent review), CUT (with reason).
Order follows the sprint guidance: landing page, then onboarding, then value, then communication.
All milestones below are PROPOSED until Ganesh confirms them and answers Q-001 to Q-004 in DECISIONS.md.

## M0. Project skeleton | PROPOSED
Goal: the chosen stack runs locally and deploys a blank page to a public URL.
Acceptance checks:
- [ ] `npm run dev` (or equivalent) starts with no errors
- [ ] A preview URL loads on a phone
- [ ] `.env.example` lists every key needed; `.env` is git-ignored
Reviewed by: —

## M1. Landing page (the product spec) | PROPOSED
Goal: a stranger understands in 10 seconds what it does and starts a case.
Acceptance checks:
- [ ] Headline and sub-copy match IDEA_SCOPE.md (money back from everyday apps)
- [ ] Shows the 4 steps (share two screenshots, approve, send, money lands)
- [ ] One call to action that opens onboarding, no sign-up wall before value
- [ ] Readable on a 360 px phone screen
Reviewed by: —

## M2. Onboarding: two screenshots to a case | PROPOSED
Goal: first value in under a minute.
Acceptance checks:
- [ ] User uploads the booked value and the payment screenshots
- [ ] AI extracts platform, amount, date and what is owed; user can correct any field
- [ ] Works on 3 real samples: one ride overcharge, one food order, one subscription charge
- [ ] Shows the first message to send in the app's support chat
Reviewed by: —

## M3. Core loop: coach the chat, then escalate | PROPOSED
Goal: the case stays alive until money lands or is formally rejected.
Acceptance checks:
- [ ] User pastes the support bot's reply; agent classifies it (refund, stall, rejection) and gives the next line
- [ ] If stalled, agent drafts the grievance-officer email with the evidence attached; user sends it themselves
- [ ] Case has visible states: open, waiting, stalled, escalated, resolved, rejected
- [ ] Case and evidence are saved and survive a page reload
Reviewed by: —

## M4. Communication (bonus) | PROPOSED
Goal: the agent remembers to chase so the user does not have to.
Acceptance checks:
- [ ] Day-3 and day-7 nudges for open cases (email or WhatsApp, per Q-002)
- [ ] "Money landed" confirmation closes the case and shows the amount recovered
Reviewed by: —
