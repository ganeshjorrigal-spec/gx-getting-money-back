# Current state, 25 October 2026

## N3: READY FOR REVIEW, not published
Branch next, runtime baea415. Owner authorised N3 after confirming N2 passenger mail delivery. Required STOP before deploy:test or N4. Nothing DONE.

## Repeat-fire diagnosis and fix
Test was added and run before app changes. The handed-over WAIT case raised rung 2 to 3 and scheduled a new check at the same instant; the not-handed-over case did not loop. Reported this in chat before implementation. Real WAIT check-ins now ask the passenger without replanning or advancing, whether handed over or not. A stale chase.advance job also refuses WAIT. D-067 check is at 10:00 IST the following calendar day. Duplicate job/daily checks are suppressed, and rereading identical waiting facts preserves an unanswered check without recreating it.

## Due-date email and answers
Only the confirmed passenger receives the due check through the N2 gated/deduplicated transport, outside the company allow-list. Private dated links say It came and Not yet, chase it. Links open the case answer card; a page visit alone cannot mutate a case. It came records recovered amount and today's closedAt; Not yet explicitly starts planning. Answer replay and stale deadlines are rejected/idempotent. Newer deadline suppresses an old queued email. Demo/event paths unchanged.

## Proof
Final suite 563/563 across 76 files, type check and 16-page static export pass. Development tangible-lemur-692 accepted schema/functions at 02:14:47 IST. N3 tests: 10; focused prior N3/N2/pre-deadline pass. Local fictional RG-R07HSA showed both choices; It came closed at Rs 5400 today. Safe screenshots docs/qa/n3-2026-10-25/. No mail/call/hand-over in that walkthrough. Actual N3 mail delivery not live-tested; transport acceptance mocked. Local preview/server closed. Phone/review checklist docs/handoff/n3-due-date-mail.md.

## Public test and freeze
Test Production https://abundant-marten-136.convex.site still runs N2 source eea7942, static 4467f7c4-cf5e-4885-b73d-c4f344d792b1. Production mailbox is connected; Development mailbox disconnected. Last read-only verification showed real-company sending off in both. No N3 deploy:test, old deploy, Cloudflare, main, key/env/allow-list/calling-setting changes or company mail/calls.

## Remaining and parked
Wait for Ganesh review/yes before N3 publish or N4. N5 to N8 untouched; N1 outreach Ganesh. Provider quota deferred. Free-refund resets and manual annual-pass fallback parked. Root HQ prompt remains untracked/uncommitted. Older cases without encrypted private-link tokens not migrated.
