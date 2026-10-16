# Codex prompt: real airline calls for real users (D-056)

Written by HQ, Fri 16 Oct 2026, 20:15 IST. Do this AFTER `2026-10-16-no-transfer-and-poll-fix.md` is deployed. Read D-054, D-055, D-056. One commit per part. No calls, no env, key, allow-list or calling-setting changes. Mark nothing DONE.

## Part 1: read-only check
Confirm and log in one line each: (a) public demo cases with a chase story stay simulated whatever CALL_MODE is; (b) a real case can only reach a care number from `lib/flight-care.ts`; (c) calls start only from the user's call button after calling permission; (d) nothing schedules a real call on its own.

## Part 2: gate (`lib/calls.ts` callGate)
- When transfer is off (D-054 default), a real case no longer needs the passenger mobile on CALL_ALLOWLIST. The care number still must be on it. Demo cases keep both checks. Transfer on keeps today's checks.
- Pass a `transfer` flag into the gate from env at the caller; do not read env inside `lib`.
- Tests: real case, transfer off, care number listed, mobile not listed: allowed. Care number not listed: refused. Demo unchanged. Transfer on: today's behaviour.

## Part 3: words the user sees (`app/copy.ts` only)
- Permission: "and to call {company}'s customer care for me. Genie says it is an AI assistant calling with my permission. The call is recorded. If they need to verify me, I will call them back."
- FAQ answer: "Yes, for IndiGo to start. Genie calls Monday to Saturday, 10:00 to 18:00 IST, only after you give calling permission and press call. It says it is an AI, gets the status and reference, and mails you what it learned. Calls are recorded. If the airline needs to verify you, Genie tells you how to call back."
- Real-case button: "Ask Genie to call {company}". Replace "approved test numbers" lines for real cases. Keep all demo and simulated labels as they are.
- Privacy page: add that call recordings and transcripts are kept for the case, and the call stops at any request for OTP, card or bank details.
- Update snapshots and copy tests only.

## Part 4: gates
Full suite once, type check, static export. Stop and tell Ganesh. He authorises deploy. Do not create a real case and do not call.

## Short paste block
```
git pull. After the no-transfer prompt is deployed, do docs/hq/codex-prompts/2026-10-16-real-airline-calls.md Parts 1 to 4, one commit each. No calls, no env, key, allow-list or calling-setting changes. Stop after gates for Ganesh's deploy line. Mark nothing DONE.
```
