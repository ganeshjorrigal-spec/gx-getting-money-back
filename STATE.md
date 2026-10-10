# Current state (owned by Codex)

Last updated: 10 October 2026.

## Milestones
- M2.5 READY FOR REVIEW. Ganesh accepts the measured 3:10.731 run as meeting the speed target. Housekeeping committed/pushed before M2.6; not marked DONE.
- M2.6 ACTIVE. All seven overnight flight build steps committed/pushed. Not READY until morning live proofs pass.

## Morning addendum complete
- Refund Genie name deployed with Terms, Refund and cancellation policy, Contact and Privacy linked together. All four checked live. Public support email present in .env.local. Existing responses Sheet renamed in place.
- Type check and 89 tests pass; refreshed F1-F16 16/16 and FL01-FL14 14/14 paid-model evals pass. 91 files deployed, ID 8f5377d7-ddc5-4fa7-ac1b-68f4f424ca2f. Proof in today's For Ganesh log and docs/qa/refund-genie-* files.
- Remaining M2.6 morning proof and payment link still pending.

## D-035 verified checkout
- Convex order creation, signature verification and annual confirmation implemented and deployed. 95 tests and type check pass. Final static deployment 1f672b30-f96e-4f8b-a14f-418e908482df; bundle secret scan clean.
- Test credentials configured but public key ID in repo .env.local still differs from Convex key ID after the first saved reply. Exact file/deployment clarification pending. Guard hides checkout; fixture stays unpaid. No payment submitted or successful unlock claimed.
- Next: align public key, rebuild/deploy, check modal/dismiss, then Ganesh completes test payment and checks dashboard/unlock. M2.6 remains ACTIVE.

## Working release
- Live: https://harmless-lyrebird-924.ap-southeast-2.convex.site/
- Final product commit: 991dd1e. npm run deploy succeeded; 82 static files published. Home, Privacy, flight case, flight demo start and an existing event case checked live after deployment.
- Type check and production build pass. 89 unit tests pass. FL01–FL12 plus scope fixtures FL13/FL14 pass; unchanged F1–F16 pass. Exact asserted dates, zero invented contacts; reports in docs/qa.
- Synthetic TB-1FQG0T proves pending airline → paid travel site → bank reference with no promised date, then a user-chosen 20 Oct reminder. Saved reply opens without replacing the private key; reload works. Screenshots in docs/qa, evidence in docs/log/2026-10-10.md.
- Flight demo TB-YVE5UI start/PNR/recipient roles and pay exclusion checked. Three Gmail rounds and timing remain untested; create fresh cases for timed proof.
- Fixed paid gemini-3.5-flash-lite; usage counts only. Event routes/demo retained, real inbox matching/job/calendar/scopes unchanged. No Vercel deployment or config change.

## For Ganesh in the morning
1. Align the public Razorpay test key ID in the repo .env.local with Convex. Rebuild/deploy; verify checkout and actual test payment / annual coverage / reconciliation. Payment Link is fallback only when no checkout key ID is configured.
2. One real Gmail flight test send/reply-all through demo/test accounts, then three complete fresh timed flight demos with received replies and screenshots. Do not send synthetic complaints to real companies.
3. Q10 AirSewa address check, Q11 officer spot-check, Q17 full medical paragraph (branch disabled), Q19 hand-helped intake/flag workflow. Stores not built.
4. Physical Android/iPhone checks, real payment reconciliation, budget alert remain open. In-app viewport override did not change the observed width, so no phone-width proof is claimed.

No emails sent, account login, OAuth changes or user-data deletion tonight. M3/M4/T1 not advanced. Full morning checklist and skipped checks: docs/log/2026-10-10.md.
