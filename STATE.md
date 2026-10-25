# Current state, 25 October 2026

## N2 and N3 DONE by owner; N4 baseline in progress
Ganesh explicitly marked N2/N3 DONE after phone checks. Updated those statuses in 91414f2. N4 is not READY FOR REVIEW. No call instructions/settings or call fixtures changed. No calls or publication.

## N4 offline checker
lib/transcript-checker.ts and scripts/check-call-transcript.mts score five checks: first-human disclosure, repeated normalised sentences, questions for known PNR/name/route, more than one re-ask, and OTP callback safety. Output contains rules/turn indexes only. Raw private transcript stays outside repo or in memory via stdin. Speaker/menu detection is heuristic and requires review against original turn indexes.

Baseline BEFORE any call changes: menu/person 4/5 (missing first-live response disclosure), second person 4/5 (same disclosure sentence repeats), OTP 3/5 (missing disclosure, old simulated transfer response). First/third use today's unchanged simulated fixtures; second is synthetic. Safe scores in docs/qa/n4-2026-10-25/baseline-fixtures.json. Actual 17 October IndiGo call NOT SCORED yet: local search found HQ review and older private call IDs, no original transcript. No substitution with review snippets and no live Convex command.

## Gates
12 checker tests pass. Final full suite 575/575 across 77 files, 12.76s, start 17:37:24 IST; type check passes. Initial type check found empty-array concat inference; changed question splitting and rechecked full suite/type. No frontend/app runtime change; no build/deploy for this offline checkpoint. Existing public test N3 source 08096f8 / static 31870f80-1905-4e75-8bfe-c21f136caefd unchanged.

## Required input / STOP
Vapi IAB opens signed-out account page. Asked Ganesh to sign in for read-only saved-call and assistant-setting review; question pending. No active Vapi tab found in either connected Chrome profile. Actual call baseline must be reported before any instruction/settings change. Then inspect exact voice/language/transcriber/interruption values and stop with exact observed clicks if dashboard-only changes needed. docs/calling.md still historical, not claimed freshly verified. Handoff docs/handoff/n4-transcript-baseline.md.

## Boundaries
No calls until Ganesh explicitly authorises, only his own mobile; no company call without direct chat yes. No keys/env/allow-list/calling-setting changes. Frozen live/main/Cloudflare untouched. N1 outreach owner; N5-N8 untouched. Provider quota deferred; free-refund resets and manual annual-pass fallback parked. Root HQ prompt stays untracked/uncommitted.
