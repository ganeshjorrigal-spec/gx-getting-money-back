# Current state, 17 October 2026

## Public launch source published by owner authorisation
Parts 1 to 3 committed: 0b01172, e0e4816, 94782c9. Exact real-company switch enables checked company To/CC and confirmed case-user CC outside the allow-list; sender revalidates before dispatch. Global IST-day cap defaults to 50, reserves atomically, releases failed sends once, retains accepted sends and defers capped cases until tomorrow. Demo recipient gates, switch-off and call limits remain. Public wording updated; stored flight/date now shown, booking rows editable, empty optional contact skips consent screen with sharing off.

## Gates pass
488/488 tests across 64 files, full suite once, 20.20s. Type check and 16-page static export pass. Local mocked intake walk at 375px verifies skip, sharing off and Edit callbacks. All transport mocked. Read-only RG-FBLJE4 check confirms flight/date were stored and matched source; summary omission fixed without editing that case or extraction logic. Proof docs/qa/public-launch-2026-10-17/.

## Publication and live proof
Deployed main 8496aebe2d45720cb4f45f9e4329b1140ef5e210 once, Convex then Cloudflare. Convex static version 231606b8-2445-4544-94fa-8c3c76d6adf7; Cloudflare version 69504117-ebf7-44b4-a939-a06294d4a6c9. Both backend/build/export/upload commands passed. At 10:59:31 IST, /, /start/, /cases/, /privacy/, /terms/ on https://refundgenie.app returned 200. Old approved-test-addresses wording absent in HTML; new written-permission wording also verified in the live browser. Proof docs/qa/public-launch-publish-2026-10-17/release-proof.json.

## Stop after requested checks
No calls, company mail, seeds, live case edits, env/key/allow-list/model/calling-setting changes by Codex. Nothing marked DONE. Owner controls launch switches. Actual public call/company-mail delivery remains untested. Await HQ review or Ganesh's next instruction.
