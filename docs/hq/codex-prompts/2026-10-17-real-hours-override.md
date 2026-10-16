# Codex prompt: real-call hours override (Sat 17 Oct, 00:10)

Written by HQ. Read D-058. Do this on main after 27394ea is deployed (deploy it first if Ganesh has authorised and it is not yet done). One commit for code, one for gates. No calls, no env, key, allow-list or calling-setting changes. Mark nothing DONE.

## Part 1: override (`lib/calls.ts` officeHours and callGate, caller in `convex/calls.ts`)
- New gate input `realAnyHour`, passed from env `CALL_REAL_ANY_HOUR==='true'` at the caller. Do not read env inside `lib`.
- When true, real-company calls skip the hours check. Demo hours (D-055) unchanged. Every other guard unchanged.
- Tests: unset keeps Monday to Saturday 10:00 to 18:00; true allows Saturday 01:00 and Sunday; "TRUE" or "1" does not; demo unaffected.

## Part 2: gates and deploy
Full suite once, type check, static export. If all pass, Ganesh authorises deploy here: run `npm run deploy` then `npm run deploy:web`, live route checks, log both IDs. Then stop.

## Part 3: precheck for Ganesh's real case (read-only, after he creates it)
When Ganesh gives his case code, report pass or fail for: real (non-demo), airline IndiGo, active chase, calling permission saved, care number on CALL_ALLOWLIST, CALL_MODE live, CALL_REAL_ANY_HOUR true, per-case limit, budget. Also report whether the case page shows the real call button, and if not, the exact reason (for example a flown booking with no refund route). The booking was flown normally and bought on a travel site; the facts must stay true, so do not edit case facts to unlock the button. Never print numbers or addresses. Do not call.

## Short paste block
```
git pull. Do docs/hq/codex-prompts/2026-10-17-real-hours-override.md Parts 1 and 2. Ganesh authorises the deploy in Part 2 if all gates pass (and the 27394ea deploy first if not done). No calls, no env, key, allow-list or calling-setting changes. Stop after deploy and report. Mark nothing DONE.
```
