# Refund Genie test build: N4 HQ review fixes

## Scope and freeze
- Folder gx-getting-money-back-next; branch next only.
- Frozen refundgenie.app/main/original Convex/Cloudflare untouched (submitted-v1, 6153907).
- Test Development tangible-lemur-692; test Production abundant-marten-136, https://abundant-marten-136.convex.site.
- Last test release remains N4 source ced3e6f, static version 991a2b00-2bf7-4dee-b00b-94c2a503e56e. These new fixes have NOT been deployed.
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
- Two Azure Indian English auditions: current Neerja and Prabhat; sample URLs/exact switch clicks in docs/calling.md. Voice question pending. Speed already 1.00, left unchanged.
- Soniox stt-rt-v5 Automatic, Deepgram nova-2 en-IN fallback. No transcriber/provider setting changed; recommend retaining for next comparison.
- Ganesh restored agent access to refundgenie-test only. Earlier owner-only Convex restriction is superseded.
- Last verified mode simulated; demo cutoff restored to 21:00 by owner. Owner controls modes/env/keys/allow-list/budgets, agent changed none.
- Wait for explicit test publication approval and separate yes before one supervised own-mobile call. No company contact. No call in this fix session.
- RG-L07KB7 has two calls today; do not reset limits. Later-day reuse or new genuinely confirmed fictional demo needed.
- Retest: ask PNR, interrupt, hold 20 seconds, passenger-only verification, reference only on request, credit-shell offer. Audio/owner feedback required before N4 acceptance.
- Provider daily Gemini quota remains owner-deferred. Root HQ prompt untracked/uncommitted. Parked trial reset/manual annual pass not built.
