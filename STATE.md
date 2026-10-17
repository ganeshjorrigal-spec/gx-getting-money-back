# Current state, 17 October 2026

## Public launch code ready for review, unpublished
Parts 1 to 3 committed: 0b01172, e0e4816, 94782c9. Exact real-company switch enables checked company To/CC and confirmed case-user CC outside the allow-list; sender revalidates before dispatch. Global IST-day cap defaults to 50, reserves atomically, releases failed sends once, retains accepted sends and defers capped cases until tomorrow. Demo recipient gates, switch-off and call limits remain. Public wording updated; stored flight/date now shown, booking rows editable, empty optional contact skips consent screen with sharing off.

## Gates pass
488/488 tests across 64 files, full suite once, 20.20s. Type check and 16-page static export pass. Local mocked intake walk at 375px verifies skip, sharing off and Edit callbacks. All transport mocked. Read-only RG-FBLJE4 check confirms flight/date were stored and matched source; summary omission fixed without editing that case or extraction logic. Proof docs/qa/public-launch-2026-10-17/.

## Stop for deployment line
No calls, real company mail, deploy, live case edits, env/key/allow-list/model/calling-setting changes. Nothing DONE. Main code is not yet live. Published source stays 8d739af879ac807a4a67ac8e5b6d951db05f6a31; Convex static a560dd72-7077-4c09-a7ef-8f775883a8a7 and Cloudflare d519ae5f-a59e-4a21-942c-b52bc03963dc. Owner authorises deploy, then flips launch switches himself. Actual public call/company-mail proof remains untested.
