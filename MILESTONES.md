# Milestones (owned by Claude HQ; Codex may only set READY FOR REVIEW)

Status values: PROPOSED, ACTIVE, READY FOR REVIEW, DONE (after independent review), CUT (with reason).
Order follows the sprint guidance: landing page, then onboarding, then value, then communication.
Rewritten on 2026-10-04 to match the PRD in `docs/prd/` (D-010 to D-015). Build in order; one milestone ACTIVE at a time. Which PRD files each milestone needs: `docs/prd/07-build-plan.md` section 1.

## M0. Project skeleton | ACTIVE
Goal: Next.js + Convex (D-006) runs locally and deploys a blank page to a public URL.
Acceptance checks:
- [ ] `npm run dev` (or equivalent) starts with no errors
- [ ] A preview URL loads on a phone
- [ ] `.env.example` lists every key in `docs/prd/05-backend.md` section 17; `.env` is git-ignored
- [ ] `app/styles/tokens.css` holds Direction A tokens (`docs/prd/02-design.md` section 6) and Tailwind reads them
- [ ] Fonts load with `latin` and `latin-ext` subsets; a test line shows the ₹ sign in both fonts
- [ ] `app/copy.ts` exists with the product name constant
Reviewed by: pending

## M1. Landing page and sample case (the product spec) | PROPOSED
Goal: a stranger understands in 10 seconds what it does, why to trust it, and can try a sample case.
Acceptance checks:
- [ ] Landing sections in the order of `docs/prd/03-frontend.md` S1; every string comes from `copy.ts` and matches `docs/prd/04-copy.md` section 3
- [ ] Example card is labelled "Example"; the date examples show correct weekdays
- [ ] `/sample` renders the IPL sample case with the banner; send buttons show the note and open nothing
- [ ] `/taste` renders the landing hero and the US-1 case page in Directions A, B and C for the taste-lock
- [ ] Lighthouse mobile performance score of 90 or more; landing JavaScript 120 KB gzipped or less
- [ ] Readable at 360 px; AA contrast; light theme even when the phone is in dark mode
- [ ] Nothing public links to an unbuilt screen (`/start` stays unlinked from public posts until M2 is DONE)
Reviewed by: pending

## M2. Onboarding to first value (US-1) | PROPOSED
Goal: paste a message, and in under 15 seconds see the route, the due date with its source, and the next step, on a phone.
Acceptance checks:
- [ ] Intake per `docs/prd/03-frontend.md` S3: paste, up to 4 compressed screenshots, chips, redaction on device and server
- [ ] Case link uses the secret in the URL fragment; only its hash is stored; a wrong token shows the bad-link message
- [ ] Live progress steps from Convex; inputs survive an AI failure; Try again works
- [ ] `planCase()` unit tests pass for WAIT and OVERDUE dates, working days, and the paywall tiers
- [ ] Eval fixtures F1, F2, F8, F9 and F10 give the expected route and dates (`docs/prd/07-build-plan.md` section 3)
- [ ] Status card and save card per S5: calendar via Google link on Android and .ics on iPhone; copy link; share
- [ ] Route on screen at p50 of 8 s or less over 10 logged runs
- [ ] No sign-up; nothing locked at this stage
Reviewed by: pending

## M3. Value loop (US-2 to US-9) | PROPOSED
Goal: the case stays alive until the money lands, with every step ready to send from the user's own email or chat.
Acceptance checks:
- [ ] Drafts per `docs/prd/05-backend.md` section 7; `to` is filled by code from VERIFIED contacts or the user's own text, never by the model
- [ ] Send sheet: mailto with the ₹ sign and line breaks intact; long-body copy-first fallback; chat and helpline variants
- [ ] Mark sent schedules check-ins; the check-in banner works; "Not yet" moves L0 to L1 to L2; replies re-triage
- [ ] ACTION_NEEDED checklist (US-2), TRACE (US-5), FAILED_PAYMENT with compensation (US-6), NO_ROUTE options (US-7), OUT_OF_SCOPE waitlist (US-9)
- [ ] Paywall per `docs/prd/05-backend.md` section 8.4; pay sheet with UPI on Android and QR on iPhone; claim unlocks; not_found re-locks
- [ ] Money landed closes the case with share and feedback (US-8); delete removes everything
- [ ] Full eval set F1 to F10 meets the pass bar; phone tests in `docs/prd/07-build-plan.md` section 4 pass on Android and iPhone
- [ ] Analytics events fire; the funnel query runs
Reviewed by: pending

## M4. Communication (bonus) | PROPOSED
Goal: the agent reminds people even if they never open their calendar.
Acceptance checks:
- [ ] Domain verified in Resend; `EMAIL_ENABLED` turns email on
- [ ] Optional "Email me on my check-in dates" after value; check-in, overdue and money-landed emails; unsubscribe link in each
- [ ] Founder contact opt-in stored; OG image and share card polished
Reviewed by: pending

## T1. Validation test: live cases and willingness to pay | ACTIVE (Ganesh, runs in parallel to M0 to M3)
Goal: settle D-009 and test A1 (enough live event-refund cases) with real behaviour.
Steps:
- [ ] DM 10 people: "Have you waited on a refund for an event or ticket in the last 60 days, or are you waiting on one now? What happened, how much, and what did you try (chat, email, form)?"
- [ ] For anyone with a live case of ₹300 or more: "If I chase it to the end for you, what would that be worth to you?" (open price first), then offer ₹49 with the guarantee
- [ ] Record each reply as one line in `docs/research/validation/` (who type, platform, amount, route tried, price said, paid yes or no)
Decision rules (from D-009 and D-010):
- Pass: at least 3 of 10 have a live or recent case AND at least 2 with ₹300+ cases pay by Day 5
- Cases but no upfront payment: switch to pay-after-success (₹29 to ₹99)
- Fewer than 3 of 10 with a live case: switch v1 to flights; take it to Claude HQ
Reviewed by: pending

## Cut
- Old M1 to M4 (Swiggy, Zomato, two-screenshot onboarding, agent coaching the in-app chat) | CUT 2026-10-04 | Superseded by the PRD: v1 is event tickets (D-010), the user's own email sends (D-011), calendar then email reminders (D-012).
