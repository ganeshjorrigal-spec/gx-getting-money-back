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
