# Codex prompt: disclosure, verification details, case-link mail (Sat 17 Oct, 02:50)

Written by HQ. Supersedes the earlier version of this file. Read `docs/hq/review-2026-10-17-first-real-indigo-call.md`, D-059 and D-060. One commit per part. No calls, no real company mail, no env, key, allow-list or calling-setting changes. Mark nothing DONE.

## Part 1: disclosure to the first live person (`lib/call-transport.ts` prompt)
Add near the top: "The first message may play to a recorded menu. When a live person first speaks (a greeting such as 'my name is' or 'how may I help'), your first reply must be: 'Hi, I'm Refund Genie, an AI assistant calling for the passenger {name}, with their permission. This call is recorded.' Then ask for the refund status for PNR {pnr}. Say it once per live person, again if you are moved to a new person."
Tests: line present with name and PNR; all earlier safety lines present.

## Part 2: intake collects verification details (flight intake, real and demo)
- New facts: `routeFrom`, `routeTo`, `nameOnTicket`, `bookingMobile`, `bookingEmail`, `shareBookingContact` (boolean, user consent).
- Read route, name on ticket, booking mobile and booking email from the uploaded screenshot first (extend the flight read schema). Only if not found, ask with a text field in the existing step flow. Route and name on ticket are asked; booking mobile and email are optional.
- Consent checkbox under the booking mobile and email: "Genie may tell the airline these to verify my booking. Genie never reads out an OTP." Unticked by default. Without it, these two are never passed to calls.
- Demo intake (D-051): add the same questions with "Fill sample" buttons using made-up values.
- Show the new facts in the collapsed summary and confirm screen.
- Privacy page: list the new fields and why.
- Tests: screenshot value wins and the field is not asked; missing value asks; consent off keeps contact out of call facts.

## Part 3: Genie gets the known facts (`lib/call-transport.ts`, `convex/callActions.ts`)
- Pass confirmed facts: name on ticket, route, travel date, flight number, booking site or "booked directly", booking ID, amount, cancellation date if any; booking mobile and email only when `shareBookingContact` is true.
- Prompt: "Known booking facts: {list}. Give them when care asks. Never invent or guess a fact that is not listed. If asked for something not listed, say you do not have it and the passenger can share it on a callback. Booking mobile and email: say them only when care asks to verify the booking. Never read out, accept or ask for an OTP; if care sends an OTP, say the passenger will call back."
- Omit empty fields. Tests for presence, omission and consent.

## Part 4: privacy rule for booking contact (`lib/calls.ts` safeTranscript and needsPassenger)
- When the case has `shareBookingContact` true, a care line asking for the registered or booking mobile or email no longer cuts the transcript. Mask them in the stored transcript (mobile: last 2 digits only; email: first letter and domain).
- OTP, one-time code, card, bank, password, PIN, CVV and date-of-birth requests keep cutting the transcript exactly as today.
- Without consent, behaviour is unchanged.
- Tests for each case.

## Part 5: call manners (prompt)
"Listen to the whole menu before pressing a key." "After you ask a question, wait for the answer. If the answer is only 'sure' or 'okay', wait a few seconds before asking again."

## Part 6: case-link mail (D-060, `app/c/email-case-link.tsx` and a new Convex mutation or action)
- One button "Email me this case link" styled as a real button. On tap, send from the case inbox to the case's confirmed email (D-048) only, subject "Your Refund Genie case {code}", body with the private link and "Keep this link private. Anyone with it can open the case."
- Show "Sent to {masked email}". At most 3 per case per day; then "Already sent 3 times today."
- No confirmed email: show "Copy my case link" instead.
- The confirmed address does not need CHASE_ALLOWLIST (same rule as D-057). No other recipient possible.
- Tests: sends to confirmed only, limit, no-email fallback, button role.

## Part 7: gates
Full suite once, type check, static export. Stop and tell Ganesh. He authorises deploy.

## Short paste block
```
git pull. On main, do docs/hq/codex-prompts/2026-10-17-call-disclosure-and-facts.md Parts 1 to 7, one commit each. No calls, no real company mail, no env, key, allow-list or calling-setting changes. Stop after gates for Ganesh's deploy line. Mark nothing DONE.
```
