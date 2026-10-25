# Refund Genie test build: N4 supervised overnight patch prepared

## Scope and freeze
- Folder gx-getting-money-back-next; branch next only.
- Frozen refundgenie.app/main/original Convex/Cloudflare untouched (submitted-v1, 6153907).
- Test Development tangible-lemur-692; test Production abundant-marten-136, https://abundant-marten-136.convex.site.
- Latest test release: source 71ea7b4 (call fixes 4e55c7f), static version 9adbfd07-9736-4ed8-a02f-e4b4fb7a54e0; backend and static test upload succeeded after owner approval. Six checked pages return 200.
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

## Prepared overnight patch, not published
Ganesh explicitly approved building a test-only supervised overnight option and waiting before publish/call. CALL_SUPERVISED_DEMO_CODE must exactly match one RG demo case; Convex system deployment URL must be one of the two refundgenie-test deployments. Only non-story demo hours can be skipped; real-company hours and all other guards remain. Owner will set/remove this code and live mode after publishing is approved. Nothing enabled or changed remotely.

Red first: 3 failed / 23 passed. Final focused 55/55; full suite 625/625 in 79 files; type check and 16-page local static export pass. In-memory backend tests only, no deployed reservation/call. Proof docs/qa/n4-2026-10-26/overnight-gates.json. Backend deploy deliberately not run because Ganesh requires approval first. N4 still in progress, nothing DONE. Next: wait for approval to publish this patch to the test project; calling needs separate go and fresh read-only checks.
