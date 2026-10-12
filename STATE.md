# Current state, 13 October 2026

## Priority and review gate
M2.6 remains ACTIVE. D-042 mail fixes and restyle Phase A are READY FOR REVIEW, not DONE. Wait for HQ review. Ganesh must explicitly authorise any further Cloudflare publish. No deployment in this run.

## D-042
HQ accepted the pre-deadline route with two mail fixes. Implemented both with tests first and pushed 8cc942d: source-specific timing for F01/F02/F03/F22 and both estimates; company-support greetings for address contacts. The direct estimate says about 15 working days and explicitly is not DGCA/company deadline; only the travel-site pass-on estimate uses seven-day expectation. Officer greetings retained. Original route, due-date and manual-only sending guards retained.

## Restyle Phase A
Implemented Steps 1, 2, 5, 6 and 7, one commit each. Shared token palette, Fraunces/Public Sans/JetBrains Mono, receipt/source/next-move/status components, ordered flight landing, one annual price/guarantee config, remaining screens and policies. Main hero retains calls and mails them for you; editorial calling wording is in app/copy.ts and simulated/test-only notices remain visible.

D-042 labels preserved: Waiting, due <date>; Follow-up ready; Overdue only after due date. Overdue display uses source units. Estimates and chosen reminders are not labelled as official deadlines. Old unreachable per-case UPI sheet removed; backend payment/trial rules and annual checkout handlers unchanged.

## Verification
- 234 unit tests across 27 files pass; original 218 unchanged.
- Type check and production static export pass.
- Paid event eval 16/16 and flight eval 14/14 pass after every Phase A step.
- Six required screens at 375px and 1280px, plus loading, all policies, public chase demo, pre-deadline states and landed state. No horizontal scroll, targets below 44px or green outside landed.
- Built Start page flight/event controls and Privacy link checked. No form submit or real-company contact.
- Proof index: docs/qa/restyle-step7-2026-10-13/README.md. Checkpoint folders for Steps 1, 2, 5 and 6. Full append-only evidence: docs/log/2026-10-13.md.

## Hosting and restrictions
First Cloudflare publish was reviewed earlier; refundgenie.app uses the existing Convex backend. PUBLIC_APP_URL supplies user-facing links. Ganesh accepted fresh domain trials/manual paid-year restore from an old active private case. Restore button is hidden on closed cases and carry-over rules remain undefined. No storage copying or limit change.

This run made no Cloudflare publish, npm run deploy, backend push, calling-setting/allow-list/key change, live call or company mail. Existing Vercel demo stays frozen.

## Outstanding work
- HQ review of Phase A; Phase B Steps 3/4 require dry run/go and logo/illustration approval. No asset generation/spend yet.
- Sample-case job and privacy follow-ups deferred behind review.
- Original M2.6 three timed flight demos and post-trial Rs 49 TEST payment proof remain outstanding; current payment setup uses Ganesh's live keys, so do not switch or pretend a fixture payment is test mode.
- Gmail reply proof was recorded previously for TB-795645; not repeated for this restyle.
- Missing checked lower support addresses for six companies, medical-rule source checks, physical Android/iPhone and other launch checks remain as recorded in earlier logs.
- D-038 Parts 1–5 and pre-live privacy fix were previously READY FOR REVIEW with test-only mail/simulated-call evidence. No new live calling authority is inferred from this UI work.

Next: HQ review. Nothing marked DONE.
