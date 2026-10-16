# Codex prompt: call retry fixes (Fri 16 Oct night)

Written by HQ, Fri 16 Oct 2026, evening. Supersedes Parts 3 and 4 of `2026-10-16-call-fixes-and-publish.md` (Parts 1 and 2 already shipped in 78e9876 and 7177754). Read `docs/qa/supervised-tonight-2026-10-16/` and the 18:03 entry of `docs/log/2026-10-16.md`.

Rules stay: one commit per part, no env, key, allow-list or calling-setting changes, no calls by you, no deploy without Ganesh's line, mark nothing DONE. Ganesh sets VAPI_MODEL=gpt-4.1 himself (D-053) and CALL_MODE himself.

## What the 18:04 call showed
- Care gave status, reference and a processing date. Good.
- Genie asked care for the PNR twice, though it knew it, and asked a fourth question twice.
- The model started a passenger transfer when care had not asked for identity checks. The passenger phone never rang. Vapi ended with `call.forwarding.operator-busy`.
- Our saved transcript says "Passenger was connected." That is false here.

## Part 1: prompt hardening (`lib/call-transport.ts`)
- Add a line near the top of the system prompt: "Known facts: the booking reference (PNR) is {pnr}. You already have it. Never ask for it. If care asks for it, say it."
- State the goal as four things to learn, asked one at a time: current refund status, reference number, processing date, who holds the money. Once you have all four, thank them and end the call. If care cannot answer one after two tries, move on.
- Transfer rule, plain: "Call transferCall only if care says they need to verify the passenger's identity or speak to the passenger. Never for silence, hesitation, a slow answer or a pause." Keep the existing "I'll connect the passenger now" line for that case.
- Keep every existing safety line (no OTP, no card or bank details, no vouchers, no cancelling, no pretending to be the passenger, 25 minute stop).
- Tests: known-facts line present with the PNR; transfer rule text present; every old safety phrase still present; first message still ends with the status question. Update the snapshot only for these lines.

## Part 2: honest transfer wording
- If the end reason starts with `call.forwarding.` (for example operator-busy, no-answer, rejected) and there is no event showing the passenger answered, the saved transcript marker and the call history text must say: "We could not reach the passenger. Nothing private was shared." Not "Passenger was connected."
- Keep the privacy cut as it is: fail closed, nothing after the transfer point is stored.
- Do not infer a connection from `patchIn` alone when the end reason is a forwarding failure.
- Tests: forwarding failure reason gives the new wording; a real connected transfer keeps its existing wording; privacy cut unchanged.

## Part 3: release unused call budget (`convex/calls.ts`, `finish`)
- Today `finish` only adds when `costUsd > reservedUsd`. For live calls always adjust the day's reservation by `costUsd - reservedUsd`, never letting `reserved` go below 0. A call refused before it starts releases its whole reservation.
- Tests: refused call releases all; completed call at $0.03 releases the rest; a call over its reservation still adds the extra; two calls in one day leave the right total.
- Do not edit stored budget rows by hand.

## Part 4: read-only forwarding diagnosis (no code, no calls)
- Read the saved Vapi call for the 18:04 IST call (find it by time and end reason; the Vapi call ID is `externalId` on the Convex call row).
- Log names and times only, no phone numbers: was `transferCall` invoked, at what second, what Genie said just before it, what the forwarding leg's status or end reason was, and whether a second leg was created.
- Say plainly in the log what is known and what is not. Do not guess the cause.

## Part 5: gates
Full suite once, type check, static export. If all pass, stop and tell Ganesh. He authorises `npm run deploy` and then `npm run deploy:web`. Log both IDs and the deployed commit.

## Short paste block
```
git pull. On main, do docs/hq/codex-prompts/2026-10-16-night-call-retry-fixes.md Parts 1 to 5, one commit each. Part 4 is read-only. No calls, no env, key, allow-list or calling-setting changes. After the gates pass, stop and wait for Ganesh to authorise deploy. Mark nothing DONE.
```
