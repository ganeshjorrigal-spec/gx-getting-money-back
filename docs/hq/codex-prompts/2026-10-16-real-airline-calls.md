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
- Privacy page: name the existing support contact (`app/support-contact.tsx`) as the place for privacy and deletion requests. Do not promise an automatic deletion period; none is built yet.
- Logo strip (`app/components/brand.tsx`): add one line under it: "Refund Genie is independent and not affiliated with these companies. Names and logos only show which companies Genie can chase."
- Update snapshots and copy tests only.

## Part 3b: recording line in the call opening (`lib/call-transport.ts`)
- First message becomes: "Hello, I'm an AI assistant from Refund Genie, calling on behalf of {name}, with their permission, about a refund for PNR {pnr}. This call is recorded. Could you tell me the current status of this refund?"
- Tests: opening contains the AI disclosure, "This call is recorded." and ends with the status question. See `docs/hq/legal-pass-2026-10-16.md` section 2.

## Part 4: gates
Full suite once, type check, static export. Stop and tell Ganesh. He authorises deploy. Do not create a real case and do not call.

## Short paste block
```
git pull. After the no-transfer prompt is deployed, do docs/hq/codex-prompts/2026-10-16-real-airline-calls.md Parts 1, 2, 3, 3b and 4, one commit each. No calls, no env, key, allow-list or calling-setting changes. Stop after gates for Ganesh's deploy line. Mark nothing DONE.
```
