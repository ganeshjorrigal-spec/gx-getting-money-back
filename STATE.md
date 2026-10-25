# Refund Genie test build: N4 supervised call ended, review needed

## Scope and freeze
- Folder gx-getting-money-back-next; branch next only.
- Frozen refundgenie.app/main/original Convex/Cloudflare untouched (submitted-v1, 6153907).
- Test Development tangible-lemur-692; test Production abundant-marten-136, https://abundant-marten-136.convex.site.
- Latest test release: source 388f50f, static version 4e9ca264-deb2-42f2-8425-4cfdbb06e56c; owner-approved npm run deploy:test succeeded on abundant-marten-136 only. Six checked pages return 200.
- N2/N3 DONE by Ganesh's phone checks. N4 in progress, not READY FOR REVIEW or DONE.

## Latest work
HQ reviewed two supervised RG-L07KB7 calls. Before edits, traced effective 12-minute limit (CALL_MAX_MINUTES unset; actual call override 720s); calls ended via endCall, not a duration/budget cap. Provider elapsed 131.60 and 118.78s; old saved 120/120 were poll estimates. Future duration reporting corrected without rewriting old records.

Red-first fixes: guarded completion/ending rules, recap and complete provider goodbye, sequential callback questions, direct-human opening credited, no spoken rules/reasoning, hold/interruption instructions and credit-shell refusal. EndCall tool not duplicated or edited; safeguards and caps unchanged.

Expanded checker has nine checks. Safe original-call re-scores 6/9 and 5/9, neither passes. Old known-PNR flags were false positives. Final-audio cutoff and interruption/hold behaviour remain unverified: quoted fragments precede later transcript turns. Actual call text stayed in memory only. Evidence docs/qa/n4-2026-10-25/hq-expanded-scores.json and today's log.

## Verification
- Final full suite 606/606 across 79 files.
- Type check passes; static export all 16 pages passes; diff whitespace check passes.
- Initial focused red run 19 failures out of 20 before code changes; subsequent regressions also red before fix.
- docs/qa/n4-2026-10-25/hq-fix-gates.json; docs/handoff/n4-hq-review-fixes.md; superseding docs/calling.md section.

## Owner choices and next step
- Owner chose Prabhat. Isolated test assistant now Azure en-IN-PrabhatNeural, speed 1.00, verified via Vapi GET; current v4, 100% traffic. Model/transcriber unchanged. Do not publish an older local Neerja draft over the saved current version. Sample URLs/clicks in docs/calling.md.
- Soniox stt-rt-v5 Automatic, Deepgram nova-2 en-IN fallback. No transcriber/provider setting changed; recommend retaining for next comparison.
- Ganesh restored agent access to refundgenie-test only. Earlier owner-only Convex restriction is superseded.
- Last verified mode simulated; demo cutoff restored to 21:00 by owner. Owner controls modes/env/keys/allow-list/budgets, agent changed none.
- Test publication approved and completed. WAIT for separate go before one supervised own-mobile call. No company contact or call in this publication session.
- RG-T53DCT genuine email confirmation verified. Demo marker saved and verified after reload/server query. Normal mail permission and separate call permission saved for the configured test passenger/mobile; zero calls, mode simulated. No call queued. WAIT for separate go. Old case limits unchanged. Private bundle remains only in orchestration memory.
- Read-only recheck 26 Oct 00:02 IST resolves local Vapi 403 with a descriptive User-Agent header: assistant and phone GET both succeed. Prabhat speed 1.00, gpt-4.1, required settings present, own-mobile-only targeting, default 12-minute limit, daily budget available, zero case calls, transfers and real-company sending off. Mode remains simulated; current time outside demo hours 09:00 to 21:00 IST. No key/settings change needed. WAIT for separate go, then recheck mode/hours/budget before any dial. Safe proof docs/qa/n4-2026-10-25/retest-readonly-check.json.
- Retest: ask PNR, interrupt, hold 20 seconds, passenger-only verification, reference only on request, credit-shell offer. Audio/owner feedback required before N4 acceptance.
- Provider daily Gemini quota remains owner-deferred. Root HQ prompt untracked/uncommitted. Parked trial reset/manual annual pass not built.

## Overnight patch published; no call
Ganesh approved npm run deploy:test for 388f50f. Backend type/schema push, static 16-page export and 135-file upload succeeded. Proof docs/qa/n4-2026-10-26/overnight-release-check.json. Frozen project untouched. Previous source gates 625/625 tests across 79 files and type check pass; deployment also type-checks.

Read-only check at 00:24 IST: RG-T53DCT unexpired non-story demo, email confirmed, both permissions saved, zero calls total/today, only approved own mobile selected, budget available, max 12 minutes. Vapi assistant and phone accessible; Prabhat speed 1.00, gpt-4.1. Transfers and real-company sending off. Owner settings verified at 00:28 IST: CALL_MODE exactly live, CALL_SUPERVISED_DEMO_CODE exactly RG-T53DCT. All read-only case/consent/own-mobile/budget/Vapi checks still pass; zero calls total/today. No agent setting changes or calls. Next: WAIT for separate go before one call. Proof docs/qa/n4-2026-10-26/owner-settings-verified.json. Remove the selected-code setting and restore simulated after the supervised session. Nothing marked DONE.

## Latest supervised call: completed, checker does not pass
Ganesh explicitly approved exactly one own-mobile call on RG-T53DCT, no retry. Fresh checks passed; invoked callActions.run once on refundgenie-test Production. One case call saved, completed with assistant-ended-call. Provider and saved duration 165.096 seconds, cost USD 0.1979, actual provider call model gpt-4.1, no transfer. Safe evidence docs/qa/n4-2026-10-26/supervised-retest-result.json.

Expanded checker: 6/9, not passing. Flags repetition (turns 13/21 related to 11), incomplete job before ending (21), bundled questions (3/7). Complete final sentence, disclosure, known-fact questions, limited reasks, private-code safety and no spoken instructions pass textual heuristics. Audio interruption/hold/ending quality still requires owner feedback; textual pass is not audio proof. No transcript, contact data, provider IDs or private URL in repo. No retry, no code/deploy/settings change in call session.

Owner reset verified by read-only env listing: CALL_MODE=simulated and CALL_SUPERVISED_DEMO_CODE absent. No further calls authorised. N4 remains in progress, not READY/DONE. Next: HQ review of remaining checker flags and owner audio feedback before any further change/call.

## HQ server-enforcement review, partial preparation
Current provider temperature read as unset before changes. New regression failed first, then pinned 0.2 in main/optional transfer overrides locally; 626/626 tests in 79 files, type check pass. Not deployed. Re-scored original RG-T53DCT: 6/9; three made-up fixtures 9/9 each. Workflows retired; fixed-step alternatives, costs and authenticated finish/ledger design documented in docs/handoff/n4-server-finish-proposal.md. Finish handler/persistent ledger/fixed steps not built yet: asked owner whether complete verification callback details can close without refund date/holder, since latest finish rule and callback branch differ. WAIT for that product decision before wiring policy. No provider/env/key changes or new calls.
