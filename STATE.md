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

## Owner selected Neerja
Owner chose Neerja in chat. Applied Azure en-IN-NeerjaNeural to isolated Refund Genie Test N4 only, published v3 named N4 Neerja test, 100% traffic for that test assistant. Publish dialog diff limited to voice provider/ID and removal of Vapi-only language/version fields. Azure voice ID determines English India. Soniox STT RT v5 Automatic unchanged. Original shared assistant untouched. Safe cropped proof test-assistant-neerja.png. No app publication or call in this step.

Rechecked both test deployments: all six Vapi/call settings still absent, mode not live, transfers and real-company mail off. Owner must save those settings directly, own mobile only, mode simulated until explicit go-ahead. No case seeded, no budget reserved or call scheduled. N4 remains in progress. This supersedes the pending voice choice above.

Owner replied saved; repeated read-only checks still find all six call prerequisites absent in both test environments, verified by parsing setting names. Asked which project was used; do not inspect frozen live settings. No case seed or call request made. Wait for corrected test settings before preparation.

## Test settings now partly visible
After owner confirmed refundgenie-test, read-only recheck now sees five prerequisites in Development, plus CALL_MODE simulated and an owner-set VAPI_MODEL. Budgets are positive and daily covers per-call reservation. CALL_ALLOWLIST still missing. VAPI_ASSISTANT_ID matches the original shared assistant, not isolated Refund Genie Test N4. Owner must correct that setting, then add only own mobile allow-list. Production still has none of the six prerequisites. No values disclosed or changed, no case seed/call/schedule/reservation. This supersedes the preceding all-six-absent Development observation; owner setup is in progress.

## Current checkpoint: configuration passes, case confirmation pending
Both test environments now have all six prerequisites, correct isolated Neerja assistant, same single allowed mobile, valid budgets, simulated mode, transfers/company mail off. Vapi assistant/phone read checks pass after explicit request headers; linked tool lookup confirms one endCall, Soniox automatic, callback absent/test-only. No provider setting changed.

New fictional case RG-L07KB7 created via normal test intake and facts confirmed. Normal confirmation email sent to configured test passenger mailbox; waiting for owner to tap link. No active chase, zero calls or reservations. Do not mark fully prepared or dial-ready. Finish owner-only demo targeting/permission preparation after genuine confirmation; normal intake currently has no demo flag. Existing legacy callQa.seed cannot do current email confirmation unchanged. Never bypass S2 or call a real airline. User has NOT said go to dial. See current handoff/log for details. No app code/deploy/env/allow-list/mode changes in this step.

## Current STOP: owner dashboard sign-in required
RG-L07KB7 email genuinely confirmed; facts confirmed. Still no demo flag or active chase/calls. Scoped CLI system-patch failed resolution and follow-up proves no data change; no app code/deploy or security gate bypass. Test owner dashboard and GitHub are signed out; saved browser permission blocked Google sign-in. Stopped immediately and asked owner to finish Convex sign-in in kept tab. Do not work around the blocked Google page. After sign-in, tag only this fictional record as demo using owner controls, prepare case authority without scheduling a call, run read-only precheck, then WAIT for explicit dial go-ahead. No call has been placed/reserved or scheduled; both modes remain simulated.

## Owner access boundary: manual Convex steps only
Ganesh says he cannot grant Codex Convex access and will perform the actions himself. Stop all agent Convex CLI/API and dashboard access, including read-only queries and use of existing credentials. No attempt to work around sign-in or reuse CLI authority. Local repo reads/documentation are permitted; owner runs future Convex operations. Last verified state remains email-confirmed fictional RG-L07KB7 with no demo tag, active chase or calls.

Give owner the first exact manual step: refundgenie-test Production abundant-marten-136 > Data > cases, filter code RG-L07KB7, edit ONLY demo cell to {kind:'flight',round:0,phase:'ready',now:'2026-10-25',expiresAt:1793547000000}. Expiry 1 November 2026 21:00 IST. Preserve every other field and mode simulated. This tag selects the existing own-mobile demo destination instead of a real company. Wait for owner report demo saved before further setup instructions. No call requested or placed; owner must later save ordinary hand-over/calling permissions and run read-only checks himself, and explicitly authorise dialling. N4 not READY/DONE. Official Convex Data docs checked for filter and double-click cell editor only, no account data accessed.
