# HQ review: pre-deadline route 98dd975 (D-042)

Reviewed Mon 12 Oct 2026, late evening, by Claude HQ. Against: `docs/hq/codex-prompts/2026-10-12-pre-deadline-route.md`.

## Verdict

**Accepted, with two small fixes to make first.** The route logic, the auto-send guard and the labels do what D-042 says. The status mail itself has two wording bugs that must not reach a company. Codex may fix them and go straight on to restyle Phase A; HQ will check the fixes in the Phase A review.

## What I ran myself

| Check | Result |
|---|---|
| `npx vitest run` | 218 passed, 25 files (all 201 old tests unchanged) |
| `npx tsc --noEmit` | clean |
| Probe: direct booking, UPI, pending-airline reply, today 12 Oct | found the two bugs below |

## What is right

- Pending-airline and airline-paid-the-site replies before the due date give WAIT, `FLIGHT_status`, check date on the due date. After the due date they give OVERDUE and the old escalation, unchanged. Due date itself is still WAIT, the day after is OVERDUE.
- No Nodal Officer or Appellate Authority in the early mail. No escalation words (tested).
- Genie cannot send it: the chase code skips `FLIGHT_status`, the permission block is hidden on that mail, and a test shows dispatch refuses it even on a stale route. The screen says "You send it yourself; Genie will not send it."
- Reply-driven follow-ups (credit shell, destination not yours, asks for details) keep their route and mail, and show "Follow-up ready" before the date, not Overdue.
- Demo cases are excluded (`!demoAddress`), so the demo rounds are unchanged.
- The check-in on the due date re-runs the planner, sees it is still the last day, and checks again the next day, which is when the escalation starts. Correct for a "by" date.
- The case inbox is added to CC on the screen when the user has it on, so `cc=[]` in the plan is fine.

## Fix before the mail reaches a company

1. **Wrong number in the mail.** Direct booking paid by UPI or debit card: the due date is 15 working days (22 Oct in my probe), but the mail says "Refund Genie's seven-day follow-up expectation". Seven days is right only for the travel-site pass-on estimate. Fix: the rule line must match the source. For the 15-working-day estimate say: "Refund Genie's expectation of about 15 working days (not a DGCA rule or a published company deadline)". Keep the seven-day wording only for the pass-on estimate. Never cite DGCA for an estimate (D-029). Add a test that the number of days in the mail matches the due date for each source: F01, F02, F03, F22, both estimates.
2. **Greeting.** The mail opens "Dear Customer care email," because the greeting uses the contact's role. Fix: when the contact is an address-type contact (roles "Customer care email", "Refunds email", "Customer support email", "Email"), greet with "Dear <company> support,". Keep "Dear Nodal Officer," and the others as they are. Add a test.

## For Ganesh

- **Not live.** Codex did not deploy, so production still has the old behaviour (Overdue before the due date) until a publish. The planner runs in Convex, so going live needs `npm run deploy`. Decide when, after the two fixes.
- **Six companies have no checked support email**, so the early mail has a blank To for them and says "Use the company's own support page": Air India, MakeMyTrip, Goibibo, Cleartrip, Yatra, ixigo. If you can find each one's official customer-care or refunds email from its own site, send them to HQ and we add them with a source. Do not guess.
- For the launch video, a case where the money is with the airline (IndiGo) has a real To address; a case pending with MakeMyTrip does not.

## Next

Codex fixes 1 and 2, then restyle Phase A (the prompt is unchanged). The sample-case job for the video still needs a case with a due date in the past to show a real Overdue stamp.
