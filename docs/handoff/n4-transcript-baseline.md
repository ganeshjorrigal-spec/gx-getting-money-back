# N4 transcript checker: baseline in progress

N2 and N3 marked DONE on Ganesh's explicit phone approval. N4 is not READY FOR REVIEW yet. No call instructions, live settings or simulated call fixtures changed. No deployment or call.

## First baseline, before call changes
| Input | Score | Failure |
| --- | --- | --- |
| Menu then person | 4/5 | Disclosure occurs only before the menu, not in the first Genie response to care |
| Second person | 4/5 | Repeating the same disclosure creates normalised repeated sentences |
| OTP request | 3/5 | Missing first-person disclosure and old simulated identity path proposes a transfer after OTP |
| Actual saved 17 October IndiGo call | Not scored | Transcript unavailable until Vapi sign-in |

The first and third inputs use today's existing simulated reference/identity fixtures. The second is a synthetic transfer conversation reflecting the current instruction to repeat the same disclosure to a new person. These are diagnostics, not three new calls or proof of real call quality. Baseline fixture results are in docs/qa/n4-2026-10-25/baseline-fixtures.json. HQ's review was located but is not a substitute for the original transcript. No personal call text copied into files.

## Checker
Five binary checks: first-Genie-response AI/permission/recording disclosure after each live person; no repeated normalised sentences; no requests for known PNR/name/route; no more than one re-ask of a question; callback rather than code sharing or transfer on OTP. Findings contain rule names and turn indexes only, never transcript or known-fact values. Menu/hold and person boundaries use text heuristics, so a human should compare the reported turn indexes with the original; this is not a perfect diarisation system. Empty/menu-only calls cannot pass.

Run synthetic fixtures:

    node --import tsx scripts/check-call-transcript.mts --fixtures

Run a private saved JSON outside the repository:

    node --import tsx scripts/check-call-transcript.mts --file C:\private\saved-call.json

Input supports transcript or artifact.transcript, text speaker labels or provider role/message rows, plus knownFacts containing pnr/name/route. The stdin option permits scoring in memory without creating a transcript file. Never save real call text, identities, phone numbers or recording/private links in the repo, test files or logs. Output contains only scores and finding indexes.

12 checker tests and full suite 575/575 across 77 files pass. Type check result recorded in today's log. No frontend/build/deploy needed for this offline script checkpoint.

## Required next step
Sign in at https://dashboard.vapi.ai/login with the account holding the saved 17 October call. Only read call history and saved assistant settings. Score the actual call before changing instructions or settings. Then inventory exact voice, language, transcriber and interruption values; if dashboard-only changes are needed, stop with exact observed clicks for Ganesh. No call permitted until Ganesh explicitly authorises one, only to his own mobile; no company call without direct yes in this chat. No permission expansion or setting changes are authorised by a sign-in alone.

## Superseding checkpoint after owner sign-in, 25 October

Actual original saved call was read from Vapi, 37 spoken turns. Score 2/5: first-live notice missing (turn 18), repeated sentences (25/27/31), third status question (29). Known supplied PNR/name requests and private-code safety pass; route was not known, so not evaluated as supplied. Original call text stayed in memory and was cleared; only safe score output saved. Baseline was shown in chat before changing instructions. Initial automated false positives from partial IVR and status-with-PNR were corrected with regression tests and manual boundary review. This supersedes the missing-transcript/sign-in blocker above.

N4 instructions and current fixtures now implemented. Menu/person, second person and OTP all score 5/5; baseline fixtures remain frozen and can be run with --fixtures --baseline. These are authored sample conversations, not proof a real model followed the instructions. N4-quality tests were red before implementation. Exact Vapi settings and current app override differences are documented in docs/calling.md. No provider setting, model or environment change; no dashboard-only required edit identified.

584/584 tests across 78 files and type check pass. Build result in today's log. No publish or call. N4 remains in progress, awaiting owner-approved test publication and then separately authorised supervised call only to his own mobile. No company call without direct chat yes. Do not mark READY FOR REVIEW until supervised acceptance proof is present. N2/N3 DONE remains owner-authorised.
