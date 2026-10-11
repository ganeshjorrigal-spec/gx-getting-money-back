# HQ review: chase Parts 3, 4 and 5 (commits d14742f, 2804b7b, f532c25)

Reviewed Sun 11 Oct 2026, late evening. Against: `2026-10-12-genie-chases.md`, `2026-10-12-calls-carrier-neutral.md`, D-038, D-040.

## Verdict

- **Parts 3, 4 and 5: ACCEPTED for simulated use.** Safe to show, demo and keep building on.
- **Live calling: NOT cleared.** One privacy gap must be fixed first (finding 1). Then Vobiz must work, then a supervised test call to Ganesh's own phone.
- Nothing marked DONE. M2.6 stays ACTIVE.

## What I checked myself

- Pulled the three commits and read the call code (`lib/calls.ts`, `lib/call-transport.ts`, `convex/calls.ts`, `convex/callActions.ts`, `convex/callQa.ts`), `docs/calling.md` and the public demo screen.
- Ran the type check and the whole unit suite: clean, 157 tests in 19 files. This matches Codex's count.
- Searched app, convex, lib and scripts for Vobiz, Twilio and Plivo: no carrier is named in the code.
- Looked at the saved Round 2 screenshot at 375px.
- Probed the transcript privacy code with four made-up care lines (finding 1).

## Passed

- Carrier-neutral: the number is only whatever sits behind `VAPI_PHONE_NUMBER_ID`.
- Default is simulated. Live needs `CALL_MODE=live` plus the key and phone ID.
- The public demo is always simulated, even when calling is live, so no visitor can spend credits.
- Real-company calls are blocked in code (`Real-company calling is not enabled`). Only IndiGo has a care number on file, with its source page. The other seven companies are listed as missing in the log and are never called.
- Gates cover: separate calling permission, allow-list for both numbers, office hours, 2 calls per case per day, daily cost cap, one attempt with no auto-retry. A failed call keeps the mail chase going and counts toward the day cap.
- Every call record carries a label. The screen says "Simulated demo call" and says no phone rang.
- Rohan's story is not on the site yet (his okay is still outstanding).
- Part 5 demo timed 2:15, inside the 3 minute target, with zero real-company calls and screenshots for each round.

## Findings

1. **BLOCKS LIVE CALLS: OTP removal depends on exact words.** The code only removes an identity check when the care line contains words like "OTP", "one-time", "verification code", "prove identity", "password". My probe results:
   - "Please read out the 6 digit code we just sent." followed by "Passenger: 4 8 2 9 1 3": stored as is.
   - "Share the code on your phone." followed by "Passenger: it is 482913": stored as is.
   - "Please confirm your date of birth and registered email." followed by the answer: stored as is.
   - When the care agent says "OTP" or "prove identity", it works correctly.
   This breaks D-038: Genie must never hear or store an OTP. It also affects the recording, which is only dropped when those same words appear. Simulated fixtures hide the problem because they use the magic words. Fix prompt: `2026-10-12-pre-live-privacy-fix.md`.
2. **The live patch-in test needs two phones.** In the demo, the "airline" number and the passenger patch-in number both come from the first number in `CALL_ALLOWLIST`, so one phone would be called and then transferred to itself. With two saved numbers, the second should play the airline. Included in the fix prompt.
3. **Minor, no action:** simulated calls show a made-up duration (65 or 75 seconds). It sits under the "Simulated" label, so it is fine.

## Not verified by HQ

- The live site and the Gmail threads (the review sandbox cannot reach the live site; I relied on Codex's saved screenshots and JSON).
- The live Vapi request. It has never been sent. `docs/calling.md` says so. The first supervised call to Ganesh's own phone is the test.
- Paid-model flight and event evals were not rerun for this work. They must be rerun before Saturday (handoff).

## HQ suggestion for Codex's order from here

1. The privacy fix (small).
2. Cloudflare move: must run by Thursday so Razorpay can review the new URL.
3. Restyle (needs `OPENAI_API_KEY`).
4. Friday: rerun paid flight and event evals, final walkthrough.
Ganesh can reorder.

## Still open for Ganesh (from the handoff, unchanged)

Tell Shaktimaan about D-038. Rohan's okay on the exact landing quote. Phone test of Rohan's flow. Rs 49 live payment test and refund. Case inbox address decision before real-company mail. Care numbers for the seven missing companies, only if he wants calls to them later. Vobiz support message on Monday.
