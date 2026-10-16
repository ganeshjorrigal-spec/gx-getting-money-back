# Codex prompt: URGENT, make the live demo call work tonight (Fri 16 Oct)

Written by HQ, Fri 16 Oct 2026, 17:40 IST. Supersedes the order in `2026-10-16-call-fixes-and-publish.md`: only what is below, now. Ganesh fixes the transcriber language in the Vapi dashboard and raises CALL_DAILY_CAP_USD himself. One commit per part. Mark nothing DONE.

1. `vitest.config.ts` with `test: { testTimeout: 20000 }`. Nothing else.
2. Caller role in `lib/call-transport.ts`:
   - First message ends with: "...about a refund for PNR {pnr}. Could you tell me the current status of this refund?"
   - Top of the system prompt: "You are the caller. The person who answers works at {company} customer care. You are not customer care: never offer help, never ask how you can assist, never ask them for the PNR or booking details; give those only when they ask." Keep every existing safety line.
   - Update the snapshot and add a test for both.
3. Demo call hours (Ganesh's decision, tonight): for demo cases only (allow-listed test numbers), allow live calls 09:00 to 21:00 IST every day. Real-company calls keep Monday to Saturday 10:00 to 18:00. Test both.
4. Gates once: full suite, type check, static export. If they pass, Ganesh authorises `npm run deploy` then `npm run deploy:web` (this also ships the reviewed D-051/D-052 merge). Check 5 public routes return 200.
5. Then prepare one call on the unused demo case RG-A64786 and wait for Ganesh: he sets CALL_MODE=live, plays airline and passenger, resets after. One call. Stop on any failure.

No env, key or allow-list changes by Codex. No real company numbers.

## Short paste block

```
git pull. URGENT: do docs/hq/codex-prompts/2026-10-16-urgent-call-fix-tonight.md now: test timeout, caller role, demo call hours 09:00 to 21:00 for demo cases only, gates once, then Ganesh authorises npm run deploy and npm run deploy:web. Then prepare one call on RG-A64786 and wait for me to set CALL_MODE=live. No env, key or allow-list changes. Stop if anything fails. Mark nothing DONE.
```
