# Codex prompt: fix the duplicate endCall tool, then one supervised retry (Fri 16 Oct)

Written by HQ, Thu 15 Oct 2026, 18:00 IST. Read the 15 Oct log entry for call n177azp5xf5vnxc22nppt64knd8gac58.

## Cause (HQ read)

Vapi refused the call: "Assistant 'Refund Genie Recovery Agent' has more than one tool of type 'endCall'". The assistant Ganesh made in the Vapi dashboard already has the End Call tool (Vapi adds it by default), and our `assistantOverrides` in `lib/call-transport.ts` adds another `{type:"endCall"}`. The same can happen with `dtmf`.

## Part 1, now: fix in code (no call)

1. Read-only check: `GET https://api.vapi.ai/assistant/{VAPI_ASSISTANT_ID}` with the existing key. Log only the list of tool types and whether `endCallFunctionEnabled` is set. No values, IDs or numbers in the log.
2. In `assistantOverrides`, do not send a tool type the saved assistant already has. Expected result: drop `endCall` (and `dtmf` if the assistant has it); keep `transferCall` with our destination and transfer plan, because that carries the passenger number and privacy rules. Keep every instruction line unchanged; the model still says "end politely" and can end the call with the assistant's own End Call tool.
3. Failed-call record: when Vapi refuses a call, save duration 0, no patch-in flag and no fixture text; the history line says "Call could not start" with the safe reason. Today it shows the fixture's 75 seconds and patch-in.
4. Tests: override has no duplicate tool types; it has exactly one `transferCall`; a refused call saves duration 0 and no patch-in. Update the snapshot.
5. Full suite, type check, export. Commit, push. Then Ganesh authorises `npm run deploy` and `npm run deploy:web` for this fix only (the call code runs on Convex). Live route checks.

## Part 2, Fri 16 Oct, 10:00 to 18:00 IST: one supervised retry

Same steps as `docs/hq/codex-prompts/2026-10-15-supervised-live-call.md`: Ganesh sets CALL_MODE=live, one call, he resets it after. Stop on any failure, no second retry.

No real company numbers, no env or allow-list changes by Codex, no keys in repo, logs or chat. Do not touch branch d051-d052 in this job. Mark nothing DONE.

## Short paste block (Part 1, now)

```
git pull. On main, do Part 1 of docs/hq/codex-prompts/2026-10-16-call-tool-fix-and-retry.md: read-only check of the Vapi assistant's tool types, remove duplicate tools from our overrides, fix the failed-call record, tests. If every gate passes, Ganesh authorises npm run deploy and npm run deploy:web for this fix only. No env, key, allow-list or calling-setting changes, no calls. Mark nothing DONE. Push and wait for HQ review.
```
