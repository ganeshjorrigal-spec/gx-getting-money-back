# Current state (owned by Codex)

Last updated: 12 October 2026.

## Milestones
- M2.5 READY FOR REVIEW, using Ganesh's accepted 3:10.731 demo run. Not DONE.
- M2.6 ACTIVE. Flight build and addenda deployed; morning Gmail/demo proofs still pending.

## Working release
- Live: https://harmless-lyrebird-924.ap-southeast-2.convex.site/
- Refund Genie name, four linked policy pages and configured public support email deployed. Existing responses Sheet renamed in place.
- Fixed paid gemini-3.5-flash-lite; token counts only. Same-day F1-F16 16/16 and FL01-FL14 14/14 paid-model reports remain in docs/qa. Not rerun for this pricing change.
- Real inbox matching, ten-minute job, calendar alerts and demo ladder unchanged. D-038 adds explicitly granted sending for the founder case inbox; passenger Gmail/calendar permissions are unchanged. Frozen Vercel config/deployment untouched.

## D-035 verified checkout
- Convex order creation, HMAC signature verification and confirmed annual pass deployed. Previous Rs 49 test payment on TB-1FQG0T is confirmed in Convex; coverage through 10 Oct 2027 survives reload. Ganesh confirmed checking its test-dashboard transaction. Safe proof and screenshots in docs/qa/razorpay-*.
- Ganesh switched both Convex and .env.local to live Razorpay keys and explicitly requested redeployment. Safe configuration check confirms configured=true, keyMatches=true, testMode=false, publicIdIsLive=true. No keys printed or changed by Codex; previous mismatch is resolved. Rebuilt/deployed 91 files (24a40637-5774-4ca6-848f-7c777372121a); live post-trial Pay button enabled and setup error gone. Screenshot in docs/qa/razorpay-live-card-2026-10-10.jpg. No live order/payment created.

## D-036 free trial
- Three landed refunds per device across flights and events are free. Every draft is prepared; after the allowance, unsent drafts require the existing annual checkout. An active annual pass skips payment. Demos and hand-helped cases never count or see the card. FREE_LANDED_REFUNDS defaults to 3; counter caps at the allowance.
- Shared trial counter/payment card, landing, Terms and Refund policy copy deployed. Event annual recovery records join the unchanged paid-year guarantee.
- 103 tests pass; type check and production build pass. npm run deploy pushed Convex functions/index and 91 static files. Live 0/3 and 3/3 screens checked. Safe query proof and screenshots in docs/qa/free-trial-*.
- Synthetic fixture TB-37ECCC is past the trial and retained as a QA fixture. Checkout now uses live keys; the fixture is not a test-mode payment link. It has no recipient and must not be emailed. Fixtures have no AI/mail/Sheet side effects; private fixture links remain only in ignored files/browser.

## Morning proof list
1. Gmail flight reply proof PASSED on TB-795645: scheduled job matched one test-account reply, live banner without reload, unknown sender confirmation, bank next step and 14 Oct check-in. Safe saved record and three screenshots in docs/qa/flight-gmail-*. No synthetic complaints to real companies.
2. Three fresh complete timed flight demos: actual three replies, each round time and total, screenshots, bank Skip, It's in, work count and Demo Sheet row.
3. Post-trial Rs 49 TEST payment proof remains outstanding. Ganesh has switched the current deployment to live keys; do not treat its checkout as test mode or switch keys back without his instruction. Previous pre-trial payment does not replace this test.

## Other open checks
Q10 AirSewa address, Q11 officer spot-check, Q17 full medical paragraph before enabling, Q19 hand-helped workflow, physical Android/iPhone, manual reconciliation and budget alert. Stores, M3/M4/T1 not advanced. Details and skipped checks remain in today's append-only log.

## 11 Oct cold-walkthrough fixes
- All four requested groups implemented and deployed. Own static policy pages, RG references with TB compatibility, clean mail closing/greetings/CC, reordered case and intake screens, payment-method prompt, deduplicated timeline and 44px targets.
- Final type check and 114 unit tests pass. Same-day paid eval F1-F16 16/16 and FL01-FL14 14/14 pass. Counting-note fixture assertion moved from mail to case-screen explanation; underlying rules unchanged.
- Final deploy: 6fd2c71e-fe5b-470b-945c-0f42533184e0, 91 static files. Policy HTTP responses match exported bytes. Six 375px live-page captures, safe case record and full synthetic draft are in docs/qa and docs/log/2026-10-11.md.
- Inbox/support mailbox still tickback.cases@gmail.com; no Gmail settings changed. Gmail compose opening remains blocked by saved browser permission. Physical phone testing remains outstanding.
- Nothing DONE. M2.6 remains ACTIVE; original proof list above is still pending.

## D-038 Genie chases
- Part 1 READY FOR REVIEW: Your first step, case-derived checklist and direct look-in/tax explanation deployed. Three fixture outputs saved in docs/qa/chase-part1-fixtures-2026-10-11.json; live first-step card checked. 123 tests and type check pass.
- Payment-answer hotfix also deployed and pushed (1ef4991), with 120 tests and live missing-facts proof logged.
- Part 2 READY FOR REVIEW: written authority/PDF, allow-list-only mail chase, daily company caps, passenger updates and Stop deployed. Ganesh configured the allow-list and granted case-inbox read/send permission. One requested To-only permission check passed, then RG-8VX0ZA sent three mails and read three actual demo replies over ten skipped days in one thread. Money holder/next contact switched airline, travel site, bank; formal airline responsibility remains unchanged. Stop blocked another dispatch. Safe proof in docs/qa/chase-part2-mail-proof-2026-10-11.json.
- 139 tests across 15 files, root type check and production build pass. Final deployment 619d2809-23fc-4e0c-bdac-c2d5604ac32a, 91 files. Live case checked at 375px. No real-company mail or call. The saved allow-list was never widened; Gmail plus roles match its exact base mailbox only.
- Part 3 READY FOR REVIEW as simulated work only under D-040. Default/fallback simulated transport, separate call permission, exact phone allow-list, office hours, two/day cap, cost reservation, safe transcripts, passenger patch-in fixture, normal reply reader and actual test-only confirming mails verified. 149 tests pass; root type check and build pass. No Vapi request or live call. Proof: docs/qa/chase-part3-simulated-2026-10-11.json and 375px call screenshot.
- Part 4 READY FOR REVIEW: live chase line, timed mail/reply/date timeline and labelled call details. 151 tests pass across 18 files; root type check and production build pass. Rohan story withheld pending exact-text approval. Part 5 READY FOR REVIEW: public flight demo, sample authority, two actual desk mails/replies and one labelled simulated care call. RG-BC9710 reached Money landed in 2:15.340 at 375px; saved/Gmail proof and all round screenshots in docs/qa. 157 tests, root type check and build pass. No visitor phone/Gmail login, no live or real-company contact. No milestone DONE.

Next single action: HQ review of Parts 3–5 and the timed public demo. Live calling awaits Ganesh's explicit supervised go. Rohan story withheld until exact-text approval. Real-company sending and all live calling remain off.

## 12 Oct pre-live privacy fix
- READY FOR REVIEW. Stop retained transcripts at passenger connection, transfer events/tools or transfer-ended reasons. Keep known pre-transfer lines; if the boundary cannot be located, retain only the prescribed notice. Private asks cover all HQ trigger words. Passenger answers and recording links are removed before storage, reader input and confirming mail.
- Missing/unparseable call evidence stores no conversation or recording link, with a visible call-record notice. An admin attachment cannot restore a recording to a private/transfer call.
- Demo phone order uses only the saved list: first passenger, second airline. One-number fallback shows the explicit patch-in limitation. First-test instructions now require two phones.
- Root type check and 187 tests across 20 files pass, including 30 new privacy/storage/phone checks. Four HQ probes retain no passenger answer or recording link. Both simulated fixture outcomes remain unchanged; plain PNR text is preserved.
- No live call, real-company contact, environment/allow-list change or key file change. M2.6 remains ACTIVE; nothing marked DONE.
- Deployed with npm run deploy: 0a0158f6-4556-4d47-af47-13ac66414415, 91 files. Live case HTML matches the export and served bundle includes both notices. Actual phone transfer remains untested.

## Cloudflare first publish: waiting for Ganesh (12 Oct)
- Pulled facee70 and read the updated domain prompt. Section 2b stops this job before publishing: a new device ID resets new-case trial/rate counts and does not automatically restore an old paid year. Old linked cases still reopen; the paid-year restore button is hidden on closed cases.
- Asked Ganesh to choose whether to accept this behavior for first publish or wait for HQ's carry-over instructions. Cloudflare setup/login, web publish and PUBLIC_APP_URL changes remain pending. No application/deployment, calling, allow-list or key changes. Nothing marked DONE.
