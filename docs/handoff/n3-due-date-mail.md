# N3 due-date check: READY FOR REVIEW

Runtime baea415. Not published. Stop for Ganesh review and approval before deploy:test or N4. Public test Production still runs N2.

## What to review now
Local screenshot docs/qa/n3-2026-10-25/local-due-card.png shows the two choices and the promise that the case stays at its current step. local-landed.png shows the made-up Rs 5400 closure after It came. These are local previews using test Development, not public N3 proof.

The test-first run reproduced the bug before the fix: the handed-over WAIT case rose from rung 2 to 3 and scheduled the next check at the same instant. The not-handed-over case did not loop. This result was reported in chat before app changes.

## Completed acceptance
563/563 tests across 76 files, type check and 16-page static export pass. Development backend accepts schema/functions. Ten N3 tests include handed-over and not-handed-over WAIT cases; no mail at 09:59:59, one at 10:00 IST the day after the deadline; duplicate jobs and rows yield one transport call; no automatic ladder change. Every passenger mail has the private case link and dated next action, outside the company allow-list. Stale deadline checks cannot mail/answer, repeated answers do nothing, and rereading waiting facts preserves an unanswered DUE card without rescheduling it. Transport is mocked; no real N3 mail has been sent.

## Phone check after separately approved N3 publication
1. Use only made-up test cases on abundant-marten-136, and your confirmed passenger email. Keep real-company sending off. Do not send officer drafts or place calls.
2. Prepare two WAIT cases, one without hand-over and one with hand-over, keeping both at their first rung. Ganesh/Codex can prepare these isolated fixtures after publication approval; no real-company recipient is needed.
3. For the test only, set each fixture's saved waiting deadline and scheduled check-in date to yesterday, consistently. The job checks the saved check-in date. Before 10:00 IST today it must wait; after 10:00 it may catch up immediately. Do not change the system clock or any real case.
4. Run each fixture's existing checkins.fire job. Repeat the same job to check idempotence. Expect one passenger email, no company mail, and no rung change before answering.
5. The email contains It came and Not yet, chase it, each opening the private case. Confirm the desired choice on the card. A link visit alone does not change the case, so automatic email link checks cannot close it.
6. On the first fixture choose It came. Expect Money landed, recovered amount and today's closure date. On the second choose Not yet, chase it. Only now should the next action be prepared. Repeated taps must not prepare it twice.
7. Report case codes and outcomes only, not private URLs, tokens, mailbox addresses or real mail contents.

No Gmail, calling or other settings changed. The frozen live project stays untouched. N4 has not started.
