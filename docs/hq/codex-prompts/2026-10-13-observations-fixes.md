# Codex prompt: Ganesh's walkthrough observations + D-043

Written by HQ, Tue 13 Oct 2026, 02:10 IST. Do this AFTER the overnight queue (`2026-10-13-overnight-queue.md`). One commit per item. Same rules: no Cloudflare publish, no `npm run deploy`, no calling settings, no keys, no live calls, no real-company mail. Mark nothing DONE.

## 1. SkillBox event case gets stuck at the deadline question

Ganesh picked an event refund, platform SkillBox, and the flow stopped at: "What timeframe or deadline did SkillBox give for receiving the refund?" Reproduce it with a made-up SkillBox case. Find why it does not move on (no answer option, answer not saved, or the question asked again). Fix so the user can always answer "They gave no date" or "I don't know" and the case continues with the event flow's existing default for an unknown date, labelled as Refund Genie's estimate. SkillBox is chat-first with no checked email (`lib/route-kb.ts`), so the next step should be the in-app chat route. Do not invent a SkillBox deadline or email. Test with the stuck input and with a real date.

## 2. "Continue" under the date fields looks like plain text

On the start flow, after choosing the cancellation date (and the date before it), the Continue control does not look like a button. Make it the primary button style from the tokens, at least 44px tall, visible at 375px. Screenshot before and after at 375px.

## 3. Remove "So Ganesh can follow up" from user-facing copy (D-043)

- The hint under the optional phone or email field, in both `app/c/case-view.tsx` and `app/c/flight-case-view.tsx`: "Optional. Only used about this case."
- `app/privacy/page.tsx`, responses sheet section: say Refund Genie may contact the user about their case if something looks wrong; do not name Ganesh.
- The payment fallback line "Ganesh checks Payment Link payments by hand." becomes "We check Payment Link payments by hand."
- Grep the app for any other user-facing "Ganesh" and list it in the log (do not change Terms or Contact legal names without asking).

## 4. Escalations go in the passenger's own name (D-043)

- Genie's own sending (the chase) must never send a mail whose To is a playbook contact with role Nodal Officer, Appellate Authority or Grievance Officer, or any flight draft at rung 3 or above. Check this at the send point in `convex/chase.ts`, not only in the screen, so a stale draft cannot slip through.
- On such a draft, hide the "give Genie permission" block and show: "Send this one yourself from your Gmail. Escalations go in your own name." The "Open in Gmail" path stays as it is.
- Support-level mails (customer care, refunds, the early status mail stays user-only under D-042) are unchanged.
- The "I am writing on behalf of ..." prefix (`chaseBody`) is never added to a user-sent escalation.
- Tests: chase dispatch refuses a Nodal Officer, an Appellate Authority and a Grievance Officer draft even with permission granted; a support-level follow-up to an allowed address still sends; the screen shows the new line on an escalation draft.
- Do not change `CHASE_ALLOWLIST`.

## Report

Commit per item, test count, the SkillBox cause in one line, and the "Ganesh" grep list. Update STATE.md, append the log, push, then wait for HQ review.

## Short paste block

```
git pull. After the overnight queue, read docs/hq/codex-prompts/2026-10-13-observations-fixes.md and do items 1 to 4, one commit each. D-043 is Ganesh's decision. No Cloudflare publish, no npm run deploy, no calling settings, no keys. Mark nothing DONE. Update STATE.md, append the log, push, then wait for HQ review.
```
