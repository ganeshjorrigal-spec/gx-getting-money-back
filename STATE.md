# Current state, 17 October 2026

## Disclosure, booking facts and case-link mail built, unpublished
Parts 1 to 6: 70a1c31, 6d6bf0f, 3dad730, c6bb99d, 9b0c309, b1758ea. Repeat full AI/passenger/recording disclosure to each live person; intake and screenshot schema collect route, ticket name and optional booking contact with unticked separate sharing consent; calls receive only confirmed known facts and consented contact; stored transcripts mask allowed contact while private requests still cut; menu and answer waiting improved. Case-link button sends only to the case-confirmed user via existing inbox, with atomic three-per-day quota and copy fallback. Company mail gates unchanged. Optional schema additions only, no live case facts edited.

## Gates and local proof pass
465/465 tests across 61 files, full suite once, 8.24s. Type check and 16-page static export pass. Actual components walked in a local fixture with all saves/mail mocked, at 375px and 1280px. Consent off, sample buttons, optional skip, masked sent result, daily limit and copy fallback verified. UI detector finds none. Proof/screenshots docs/qa/disclosure-facts-2026-10-17/.

## Stop for deploy line
No calls, real company mail, deploy, env/key/allow-list/model/calling-setting changes. Nothing DONE. Live site still source b985822, Convex static d8f050e8-4ed3-4b4d-925f-d92a1c0543a7 and Cloudflare e3a9e117-1f63-4721-acb4-8457ba3a9591. No backend push for these new changes. Actual live disclosure/booking verification and case-link delivery remain untested. Wait for Ganesh to authorise deployment.
