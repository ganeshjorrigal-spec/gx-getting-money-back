# Codex prompt: no "Overdue" before the due date, plus an optional early status mail (D-042)

Written by HQ, 12 Oct 2026. Do this BEFORE restyle Phase A. It is a small logic job: tests first, no look changes. Paste everything below the line.

---

git pull, then the AGENTS.md start-of-session order. Read D-030, D-038 and D-042. Your finding in `docs/qa/restyle-overdue-cause-2026-10-12.json` is right and Ganesh has decided (D-042). No Cloudflare publish, no `npm run deploy`, no calling settings, no keys.

## The rule

A flight case is Overdue only after its due date has passed. Before that, a pending reply must not look late and must not start an escalation.

## What to change

1. **Audit first.** List every place `lib/flight.ts` sets `plan.route="OVERDUE"` (lines near 60, 62, 89, 91, 96, 98, 102, 104) and say for each whether it can happen with a due date that is today or later. Put the list in today's log. Do not change the Cleartrip support-first branch (line 60) or the branch at line 62, which already check the date.

2. **Date-gated branches: `waiting_airline` and `paid_site`.** If the due date is today or later (the existing rule is `due >= today` means not yet overdue):
   - `route = "WAIT"`, `checkDate = dueDate`.
   - `nextStep = "FLIGHT_status"`, a new step: an optional early status mail the user can send now.
   - Keep `moneyWith`, `note`, `dueDate`, `dueSource`, `ruleId` and `dueSourceText` exactly as they are today, so the card still says who has the money and which rule gives the date.
   - If the due date has passed, behave exactly as today (OVERDUE, `FLIGHT_mail`, same recipients, same check-in).
   - For `paid_site` with an estimated due date (`today + 7`, source "estimate"): the date is always in the future, so this branch now becomes WAIT with the status mail. Keep the bank reference question in the mail. Say so plainly in the log.

3. **The status mail (new wording, plain English, no em dashes).** Polite and short:
   - Opens with who it is from and the case (PNR or booking ID, amount, cancellation date).
   - States the due date and the rule behind it: "Under <rule>, this refund is due by <date>."
   - Asks only for: the refund date and the payment reference (UTR or ARN). For `paid_site`, also the date the travel site received it.
   - No complaint wording, no mention of DGCA escalation, no deadline threats, no "I will escalate".
   - Recipient: the lowest checked contact in the playbook for that company (customer support or refunds contact). Do NOT use the Nodal Officer or the Appellate Authority before the due date. CC the case inbox as other mails do. If the playbook has no checked contact below the Nodal Officer for a company, do not invent one: leave the mail without a To address, say "Use the company's own support page" the way the case card already does for missing contacts, and list the company in the log for Ganesh.
   - Subject line includes the case code like other mails.

4. **Never auto-send.** The chase automation (Genie sending mails itself after the user's authorisation, D-038) must not send `FLIGHT_status` by itself. It is the user's to send before the due date. Find every place that reads `nextStep` or route `WAIT` in the chase code and check that WAIT with a mail is not treated as "send now" and not treated as "nothing to show". Add a test for this.

5. **On the due date, check again.** The check-in on `dueDate` must re-run the planner so the case moves to OVERDUE and `FLIGHT_mail` (escalation to the Nodal Officer, as today) once the date has passed. Add a test with today equal to the due date (still WAIT, due date is the last day) and the day after (OVERDUE).

6. **Reply-driven branches (credit shell, "destination is not mine", the rung-up branch and the generic follow-up at lines near 96, 98, 102, 104).** Do not change the route or the mail. Add a plain field that tells the screen whether the due date has passed, for example `pastDue: boolean` on the saved plan, so the screen can show "Follow-up ready" instead of "Overdue" when the date has not passed. If adding a field needs a schema change, keep it optional.

7. **Display (small, only what this rule needs).** The Overdue stamp, the word "Overdue" and the working-day count appear only when `pastDue` is true. Otherwise: WAIT cases show "Waiting, due <date>"; a reply-driven follow-up shows "Follow-up ready". Do not restyle anything; the restyle comes next and will use these labels. Update `app/copy.ts` status labels only as far as needed.

## Do not touch

Event flow (`lib/plan.ts`), demos (`convex/demo.ts` sets its own routes), `convex/qaTrial.ts`, payment and trial rules, reply reading, the playbook data, calling, allow-lists.

## Tests (keep the whole suite green, 201 now)

- The saved facts from your JSON: pending-airline reply, due 21 Oct, today 12 Oct: WAIT, `FLIGHT_status`, check date 21 Oct, the mail has no escalation wording and no Nodal Officer address.
- Same facts with today after the due date: OVERDUE, `FLIGHT_mail`, as before.
- Today equal to the due date: WAIT. Day after: OVERDUE.
- `paid_site` for MakeMyTrip or Goibibo with the paid date today (pass-on date tomorrow): WAIT. Paid ten days ago: OVERDUE as before.
- Credit-shell and destination-not-mine replies: route and mail unchanged, `pastDue` false before the due date and true after.
- Chase automation does not auto-send `FLIGHT_status`.
- Every existing test passes without being edited. If one has to change, stop and say which and why.

Paid evals are NOT needed for this job (the planner is code). The Friday evals will cover it.

## Report

Commit hash, test count, the audit list from step 1, any company with no checked lower contact, and one line on what the sample case now shows. Mark nothing DONE. Update STATE.md, append the log, commit and push, then wait for HQ review. After HQ accepts, go back to restyle Phase A.

## Short paste block

```
git pull. Read docs/hq/codex-prompts/2026-10-12-pre-deadline-route.md and do it now, before restyle Phase A. D-042 is Ganesh's decision. Tests first. No Cloudflare publish, no npm run deploy, no calling settings, no keys. Mark nothing DONE. Update STATE.md, append the log, commit and push, then wait for HQ review.
```
