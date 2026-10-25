# Current state, 25 October 2026

## N2 and N3 DONE by owner; N4 implementation awaiting supervised proof
Ganesh explicitly marked N2/N3 DONE after phone checks (91414f2). N4 is not READY FOR REVIEW or DONE. Owner-approved N4 publication to the test link completed. No call. Frozen live/main/Cloudflare untouched.

## N4 baseline and implementation
Actual saved 17 October IndiGo call read in Vapi after owner sign-in: 37 turns, score 2/5. Failed first-human disclosure, repeated sentences and bounded re-asks; known PNR/name requests and private-code safety pass. Route was not supplied, so no claim for that fact. Reported baseline in chat BEFORE call instruction changes. Only score/rule/turn indexes saved in docs/qa/n4-2026-10-25/baseline-saved-call.json; private transcript remained in memory, then cleared. No recording or personal details stored.

Frozen fictional baseline scores: menu/person 4/5, second person 4/5, OTP 3/5. Current fictional scenarios all 5/5, scores in current-fixtures.json. These are authored simulations, not generated conversations or live voice proof. Checker false positives fixed with tests: fragmented IVR is not a human; asking status using known PNR is not requesting that PNR; menu questions excluded; question counts persist across a second person. Text heuristics still require review of original turns.

Call instructions now maintain speaker/fact/question state, notice before the first live response, varied re-disclosure for a new person, no known-fact questions, no repeated complete sentences, at most one re-ask, callback for private-code verification. Reference/identity simulated fixtures follow those instructions; old fixtures frozen for baseline. Models/tools/duration/budgets/remote settings unchanged.

## Settings and proof gates
Exact read-only Vapi settings inventory in docs/calling.md: Elliot V2, Automatic, speed 1.10; Soniox STT RT v5 Automatic, Intelligent Turn-Taking off, end wait 1.5s; fallback Nova2 English India; start wait .4s/smart endpointing off, punctuation .1s/no punctuation 1.5s/number .5s; stop words 0/voice .2s/backoff 1s. No dashboard-only required change identified, no tuning claimed. Saved assistant GPT-4.1 and 600s differ from existing app defaults gpt-4.1-mini and 720s; env overrides not inspected or changed. Check actual effective settings on an authorised test call later.

Final suite 584/584 across 78 files, 20.21s, start 18:00:05 IST; type check passes. Production build passes, 16 pages generated. N4 tests written red before prompt/fixture changes; only intentional prompt snapshot updated. No backend/schema/frontend layout changes. Public test source ced3e6f / static 991a2b00-2bf7-4dee-b00b-94c2a503e56e, 135 files. Backend/schema/type checks and 16-page export pass; /, /start/, /cases/ return 200; refreshed test intake visibly loads.

## Required STOP
Owner approved and deploy:test completed. Supervised test still needs separate explicit approval, only Ganesh's own mobile inside calling hours. Never a company call without direct chat yes. N4 cannot be marked ready until supervised proof passes. Handoff docs/handoff/n4-transcript-baseline.md. No keys/env/allow-list/CALL_MODE/calling-setting changes. N1 owner outreach, N5-N8 untouched, quota deferred and abuse-review parked items unchanged. Root HQ prompt remains untracked and uncommitted.

## Supervised setup blocked on owner settings
Read-only env-name/presence checks confirm both refundgenie-test Development and Production lack VAPI_API_KEY, VAPI_PHONE_NUMBER_ID, VAPI_ASSISTANT_ID, CALL_ALLOWLIST, CALL_MAX_COST_USD and CALL_DAILY_CAP_USD. Live mode, transfer and real-company mail are not enabled. No env values disclosed or modified. CHASE_ALLOWLIST is present. Existing seed needs the saved own-mobile allow-list, so no case created or call scheduled yet; never invoke proofFixture to prepare a live call because that function executes a simulated call too.

Signed-in Vapi recheck confirms original Elliot V2 / Vapi / Automatic / 1.10; Soniox STT RT v5 / Automatic. Created separate assistant named Refund Genie Test N4 using Duplicate, to avoid changes to frozen live assistant. Temporary Azure draft inspected, then discarded/restored; final visible test copy is published Vapi V2 Elliot Automatic 1.10. No selected Indian voice applied; owner choice pending. Exact settings and owner setup steps in docs/handoff/n4-test-publication.md. Screenshot safe crop excludes account details. No test phone stored in repo or chat.
