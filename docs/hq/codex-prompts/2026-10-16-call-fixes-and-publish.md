# Codex prompt: three call fixes, test timeout, one publish (Fri 16 Oct evening)

Written by HQ, Fri 16 Oct 2026, 16:00 IST. Read `docs/hq/review-2026-10-16-live-calls.md`. On main (merged D-051/D-052 at 07adc10 or later). One commit per part. No calls tonight. No env, key, allow-list or calling-setting changes. Mark nothing DONE.

## Part 1: test timeout (from the 19:15 update)

Add `vitest.config.ts` with `test: { testTimeout: 20000 }`. Nothing else. Run the suite twice.

## Part 2: caller role in the prompt (`lib/call-transport.ts`)

- First message: keep the disclosure, then end with a question: "...about a refund for PNR {pnr}. Could you tell me the current status of this refund?"
- System prompt, add at the top: "You are the caller. The person who answers works at {company} customer care. You are not customer care: never offer help, never ask how you can assist, never ask them for the PNR or booking details; you give those when asked." Keep every existing safety line.
- Test: first message ends with a question; prompt contains the caller-role lines; existing safety lines unchanged.

## Part 3: transcriber language

- Read-only `GET` of the saved assistant: log only the transcriber provider, model and language.
- Per Vapi's current docs, set the transcriber in `assistantOverrides` to a model that handles English and Hindi (Indian English accents), with the language set explicitly, not auto-detect. Write the doc link and choice in the log in two lines. Same transcriber for the transfer assistant if Vapi allows it there.
- Test: overrides include the transcriber with an explicit language.

## Part 4: release unused call budget (`convex/calls.ts`)

- In `finish`, for live calls always adjust the day's reservation by `costUsd - reservedUsd` (never below 0), so unused reservation returns to the day's budget. A call refused before it starts releases its whole reservation.
- Tests: refused call releases all; completed call at $0.03 releases the rest; a call over its reservation still adds the extra.
- Do not edit today's stored budget rows by hand.

## Part 5: gates and publish

Full suite twice, type check, static export, the 21-step demo walk. If all pass, Ganesh authorises `npm run deploy` then `npm run deploy:web`. Live checks: all public routes including `/cases/` and `/demo-confirm/` return 200, header menu, hero loop. Log both version IDs and the deployed commit. Do not run the email demo yourself.

## Short paste block

```
git pull. On main, do docs/hq/codex-prompts/2026-10-16-call-fixes-and-publish.md Parts 1 to 5, one commit each: test timeout, caller role, transcriber language, budget release, then gates. If every gate passes, Ganesh authorises npm run deploy and npm run deploy:web. No calls, no env, key, allow-list or calling-setting changes. Stop if anything fails. Mark nothing DONE.
```
