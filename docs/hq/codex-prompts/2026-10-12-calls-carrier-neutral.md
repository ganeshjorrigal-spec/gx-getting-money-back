# Addendum to Part 3: build calls so they work with no carrier

Written by HQ, 11 Oct 2026, late evening. Read with `2026-10-12-genie-chases.md`. Where this file conflicts with Part 3, this file wins. Everything in Part 3 that this file does not mention still applies exactly as written: office hours, 2 calls per case per day, official care number only, the opening line, the hard rules, warm transfer to my mobile, the 25 minute limit, the daily spend cap, transcript and reply reader, the confirming mail, CALL_ALLOWLIST, and the WAIT before any call to a real company.

## Why

The phone carrier is stuck. Vobiz returns `outbound-sip-407-proxy-authentication-required` on every outbound call. Twilio is dropped (cost) and Plivo is not possible (it needs a work email). I contact Vobiz support on Mon 12 Oct and may not hear back by Tue 13 Oct. So Part 3 must be built and tested today without any working phone line, and must go live later by changing env vars only, with no code change.

This message lifts the WAIT you were holding before Part 3. It lifts it for building and for simulated calls only. No live call of any kind happens until I set the env vars and tell you.

## What to build

1. **No carrier in the code.** One small call module that starts an outbound call through Vapi. The number is whatever sits behind `VAPI_PHONE_NUMBER_ID`. No code, comment, config key or screen text may name Vobiz, Twilio or any carrier. When the carrier is fixed, or replaced, I change env vars and nothing else.

2. **Two modes.** New env var `CALL_MODE` with values `live` or `simulated`. The default is `simulated`. Run simulated whenever `CALL_MODE` is not `live`, or `VAPI_PHONE_NUMBER_ID` or `VAPI_API_KEY` is missing.
   - Simulated makes no request to Vapi.
   - It writes the same call record a live call writes, from a saved fixture transcript.
   - It still runs the real downstream path: the reply reader on the transcript, the owner switch, the next step and the confirming mail. That way the whole chain is tested without a phone line.
   - Two fixtures, matching the two proofs in Part 3. Fixture A: care line menu, hold, asks for the PNR, gives refund status and a reference number, ends politely. Fixture B: the same, then asks for an OTP, so the patch-in step fires ("I'll connect the passenger now").
   - Simulated calls follow the same allow-list and authorisation checks as live ones.

3. **Honest labels.** Every call record stores its mode. Every screen that shows a call (the case timeline, Part 4, the public demo in Part 5) must show a plain label: "Simulated demo call" or "Live call". A simulated call is never shown as live, never counted as a real company contact, and never described as a result.

4. **Failure is a normal outcome.** If Vapi refuses the call, or it ends with an error reason (for example `outbound-sip-407-proxy-authentication-required`), store status `failed` and the raw reason on the call record. Tell the user in plain words: "The call could not connect. Genie will follow up by mail." Keep the mail chase going. A failed call counts toward the 2 per day cap and is never retried automatically. No crash, no stuck state.

5. **No second phone number.** Part 3 asks for a "Demo airline care" Vapi assistant on a second number. That is not possible now. Do this instead:
   - Write the demo airline care script (phone menu, hold music note, asks for PNR, once asks for an OTP) to `docs/demo/airline-care-roleplay-script.md`, in plain words, for me to play the airline agent myself in a Vapi browser call to the "Refund Genie Recovery Agent" assistant, screen recorded.
   - Add a small admin-only way for me to attach a recording link and transcript to a demo call record (a script is fine, run by me). Part 5 plays a real recording once I have one. Until then Part 5 plays the simulated fixture, with the "Simulated demo call" label showing.

6. **Tests.** Mock the Vapi layer. Cover: simulated is the default; allow-list block; missing authorisation block; outside office hours block; failed call stored and mail fallback continues; failed call counts toward the daily cap; fixture B triggers the patch-in step; no OTP is ever stored or sent to the reply reader or the confirming mail; the label is present on every call record. Keep the whole suite green. It was 139 tests.

7. **Docs.** Update STATE.md, SCRATCHPAD.md and today's log. Add "How to turn calling live" to the README or `docs/`: in plain words, the env vars to set (`CALL_MODE`, `VAPI_API_KEY`, `VAPI_PHONE_NUMBER_ID`, `CALL_ALLOWLIST`, and any webhook secret you add), where I set them, and the one test I run first (a call to my own mobile).

## Rules

- Never put keys, passwords or tokens in the repo, logs or chat. I set env vars myself and tell you when they are set.
- Make no real call. Do not touch the real-company gate. Do not widen the allow-list.
- Mark nothing DONE. Update STATE.md, append the log, commit and push after Part 3.

## Order

1. Part 3 as changed by this file. Stop and report: commit hash, test count, env var names.
2. Part 4 (show the chase), then Part 5 (public demo), using simulated call data wherever a call is needed. Label it as in point 3. Report after each part.

## Decision gate (HQ and Ganesh, not Codex)

Tue 13 Oct: if Vobiz is fixed, I set the env vars, make one call to my own mobile, and Part 3 proof is recorded live. If not, the demo uses the simulated call plus my role-played recording, and the mail chase stays the live product (D-038 cut order, D-040).
