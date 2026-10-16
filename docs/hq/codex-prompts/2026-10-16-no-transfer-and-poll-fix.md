# Codex prompt: no transfer, poll fix, demo end hour (Fri 16 Oct, 20:00)

Written by HQ. Read D-054 and D-055 in DECISIONS.md, and `docs/hq/review-2026-10-16-post-publish-call.md`. On main. One commit per part. No calls, no env, key, allow-list or calling-setting changes. Mark nothing DONE.

## Part 1: no transfer by default (`lib/call-transport.ts`)
- Read `CALL_TRANSFER_ENABLED` from env. Only the exact string `true` turns the transfer on. Otherwise the call's tools are only `dtmf` (the saved assistant still supplies endCall), and no transfer config is sent.
- When off, replace the three transfer lines in the system prompt with: "If care says they need to verify the passenger or speak to the passenger, do not transfer. Say: The passenger will call you back to verify. Ask for the reference number, the number or channel to call back on, and the hours. Then thank them and end the call." Also drop "If the passenger does not answer..." in this mode.
- When on, keep today's prompt and transfer config exactly.
- Keep every safety line, the known-facts PNR line and the four questions.
- Tests: default has no transferCall tool and has the callback line; `true` restores today's config; safety lines present in both.

## Part 2: callback step reaches the passenger
- Read-only first: when a completed call has a Care line asking to verify or speak to the passenger, does the reader output and the confirming mail tell the passenger to call care back, with the reference? Log the answer in one line.
- Only if missing: add one plain line to the confirming mail, "Customer care asked you to call them back to verify your identity. Quote reference {ref}." Use the reference only if the reader found one. Test it.

## Part 3: a status error must not close a call (`convex/callActions.ts` poll)
- On a fetch error or non-OK status, schedule the poll again in 15 s and keep the call queued. Count consecutive errors on the call row or in args. After 8 errors in a row, finish as failed with reason "Call status unavailable; no automatic retry" but keep the full reservation (pass costUsd equal to reservedUsd), because the real cost is unknown.
- Never finish as failed with cost 0 while the provider may still be charging.
- Tests: one error then ended gives the real cost and transcript; 8 errors keep the reservation; no new call request is ever made by polling.

## Part 4: demo end hour (`lib/calls.ts`)
- `CALL_DEMO_END_HOUR`: whole number 21 to 24, default 21, anything else 21. Demo calls allowed from 09:00 to that hour IST. Message: "Demo calls run every day, 09:00 to {HH}:00 IST". Pass the value from env through the gate, do not read env inside `lib`.
- Real-company hours unchanged.
- Tests: unset is 21; 23 allows 22:30; 25 and "abc" fall back to 21; real hours unchanged.

## Part 5: gates
Full suite once, type check, static export. If all pass, stop and tell Ganesh. He authorises `npm run deploy` then `npm run deploy:web`. After deploy, prepare one NEW made-up demo case by the existing seed path for a supervised call, and report its code. Do not call.

## Short paste block
```
git pull. On main, do docs/hq/codex-prompts/2026-10-16-no-transfer-and-poll-fix.md Parts 1 to 5, one commit each. No calls, no env, key, allow-list or calling-setting changes. After gates pass, stop and wait for Ganesh to authorise deploy. Mark nothing DONE.
```
