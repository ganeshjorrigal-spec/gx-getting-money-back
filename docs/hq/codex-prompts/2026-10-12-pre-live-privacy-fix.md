# Pre-live fix: never keep what the passenger says to the care agent

Written by HQ, 11 Oct 2026. Follows the HQ review in `docs/hq/review-2026-10-11-chase-parts-3-5.md`. Small and safe: no live call, no real-company contact, no change to the allow-lists.

## The problem

D-038 says Genie never hears, asks for or stores an OTP. Today `safeTranscript` and `needsPassenger` in `lib/calls.ts` remove an identity check only when the care line contains certain words (OTP, one-time, verification code, prove identity, only speak to the passenger, password, card number, bank detail). Real care agents say other things. HQ ran these four made-up transcripts through `safeTranscript` and all of the passenger answers were stored unchanged:

1. `Care: Please read out the 6 digit code we just sent.` then `Passenger: 4 8 2 9 1 3`
2. `Care: Share the code on your phone.` then `Passenger: it is 482913`
3. `Care: Please confirm your date of birth and registered email.` then the passenger's answer
4. any transcript where the passenger is patched in but the care agent never uses the listed words

The recording link has the same gap, because it is dropped only when those same words appear.

## What to change

1. **Cut at the patch-in, not by keywords alone.** The moment a patch-in or transfer starts, keep nothing after it: no transcript lines, no recording link. Detect it from any of: the assistant saying "I'll connect the passenger now", a Vapi transfer event or tool call in the call data, or an ended reason that mentions a transfer. Replace what follows with one line: "Passenger was connected. Nothing after this point is kept." Keep everything before it.
2. **Widen the trigger words** for lines where care asks for something only the passenger has: code, digit, PIN, CVV, date of birth, DOB, registered mobile, registered email, last four, security question. Treat a care line with any of these like the existing triggers.
3. **After any trigger, omit the passenger's next answer** (existing behaviour) and also drop the recording link for that call.
4. **Safe default:** if the transcript or call data is missing or cannot be parsed, store no transcript text and no recording link, and say so on the call record.
5. **Two phones in the demo.** Today the demo's "airline" number and the passenger patch-in number both come from the first number in `CALL_ALLOWLIST`. When two numbers are saved, use the second as the demo airline and the first as the passenger. When only one is saved, keep today's behaviour but show a plain line on the call record: "Only one test number is saved, so the patch-in cannot be tested." Do not add numbers yourself.
6. **Docs.** Update the "First test" paragraph in `docs/calling.md` so Ganesh knows the live patch-in test needs two phones in `CALL_ALLOWLIST`: one answers as the airline, one is the passenger.

## Tests (keep the whole suite green, it is 157 now)

- The four strings above: no passenger answer survives in the stored transcript, and no recording link is kept.
- A transcript with a transfer event: nothing after it is kept, everything before it is.
- Missing or unparseable call data: no transcript, no recording link.
- A plain care line with no private ask (for example "Care: Please give the PNR."): kept exactly as before.
- The two existing simulated fixtures still produce the same visible result.

## Rules

- No live call, no real-company contact, no allow-list change, no key in the repo, logs or chat.
- Mark nothing DONE. Update STATE.md and SCRATCHPAD.md, append today's log with the test evidence, commit and push.
- Report: commit hash, test count, and one line on what the four probe strings now produce.
