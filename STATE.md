# Current state, 17 October 2026

## Superseding update, 24 October: next test setup in progress
This is the separate gx-getting-money-back-next folder, branch next. Submitted-v1 tag points at 6153907; live site/main frozen. HQ prompt saved in next commit 84d6bcb. Owner created refundgenie-test and chose fresh settings, no env copies. CLI configured existing test project and successfully pushed backend to tangible-lemur-692. Test address https://tangible-lemur-692.convex.site, not yet statically published. Waiting for Ganesh to set the six required test settings; names and full grouped inventory in docs/handoff/refundgenie-test-settings.md. Next: test-only static upload, browser sample proof, read-only live-version check, README, Part C exact decisions/milestones and next push. Stop before N2. No changes to live project, main or Cloudflare; no secrets/calls/mail. Nothing DONE. Publication below is historical, not a new release.

## Public launch source published by owner authorisation
Parts 1 to 3 committed: 0b01172, e0e4816, 94782c9. Exact real-company switch enables checked company To/CC and confirmed case-user CC outside the allow-list; sender revalidates before dispatch. Global IST-day cap defaults to 50, reserves atomically, releases failed sends once, retains accepted sends and defers capped cases until tomorrow. Demo recipient gates, switch-off and call limits remain. Public wording updated; stored flight/date now shown, booking rows editable, empty optional contact skips consent screen with sharing off.

## Gates pass
488/488 tests across 64 files, full suite once, 20.20s. Type check and 16-page static export pass. Local mocked intake walk at 375px verifies skip, sharing off and Edit callbacks. All transport mocked. Read-only RG-FBLJE4 check confirms flight/date were stored and matched source; summary omission fixed without editing that case or extraction logic. Proof docs/qa/public-launch-2026-10-17/.

## Publication and live proof
Deployed main 8496aebe2d45720cb4f45f9e4329b1140ef5e210 once, Convex then Cloudflare. Convex static version 231606b8-2445-4544-94fa-8c3c76d6adf7; Cloudflare version 69504117-ebf7-44b4-a939-a06294d4a6c9. Both backend/build/export/upload commands passed. At 10:59:31 IST, /, /start/, /cases/, /privacy/, /terms/ on https://refundgenie.app returned 200. Old approved-test-addresses wording absent in HTML; new written-permission wording also verified in the live browser. Proof docs/qa/public-launch-publish-2026-10-17/release-proof.json.

## Stop after requested checks
No calls, company mail, seeds, live case edits, env/key/allow-list/model/calling-setting changes by Codex. Nothing marked DONE. Owner controls launch switches. Actual public call/company-mail delivery remains untested. Await HQ review or Ganesh's next instruction.
