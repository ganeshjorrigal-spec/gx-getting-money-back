# Current state, 24 October 2026

## Foundations: STOP at Part 3 step 4, provider daily quota
Part 1 complete: public test link https://abundant-marten-136.convex.site is refundgenie-test Production, separate from Development tangible-lemur-692. Owner set six required Production settings with a separate encryption key. Ran deploy:test once from next folder, source f8851d7; backend and 16-page static export/upload pass, static version dd232786-43a5-43cf-a3d7-cde145ab8bfc. Browser /, /start/, /cases/ and made-up RG-Y06F3W free check pass. Proof docs/qa/foundations-2026-10-24/. README now points to Production. Build only in gx-getting-money-back-next; old folder reference only.

## Part 2 committed
AGENTS.md replaced only the requested section with HQ's three exact sections, 68 lines total; other sections preserved except adding PRODUCT.md in start order. Commit bfc097b. PRODUCT.md untouched. Frozen-live commands unchanged.

## Part 3 prepared, not published
One internal aiQuota.take mutation uses the existing rate helper/table for 100 attempts per UTC clock hour by default; AI_CALLS_PER_HOUR config, zero supported, invalid values default 100. All four deployed Gemini paths guarded: flight reader, event reader/fallback, event drafter, demo acknowledgement. Blocked reads keep text/files, display exact busy message and offer manual retry; demo refusal leaves no mail reserved. 40 targeted tests across five files pass, all transport mocked. Generated API bindings locally; no cap deploy to Production. See docs/handoff/foundations-ai-cap.md for call-site inventory, offline eval-script boundary and exact proof.

## Required owner action and remaining work
At Part 3 step 4 STOP: Ganesh chooses/sets Gemini provider daily request quota in the Google project behind the key; suggest 1000/day for test period. Ordinary alerts-only billing budgets do not stop usage. Then run full suite/type check, ask explicit yes before deploy:test for cap. Parts 4 (fresh separate read-only abuse-review chat) and 5 (read-only personal-data scan, findings only in chat) not started; not falsely marked handed over. N2 not started. Nothing DONE.

## Freeze
submitted-v1 remains 6153907, main not pushed. No commands against live Convex, no Cloudflare mutation, no calls/mail, no key/env/allow-list/calling-setting changes. New setup and all code on next only. Last verified live Cloudflare version 69504117-ebf7-44b4-a939-a06294d4a6c9 from earlier setup proof, not rechecked in this part.
