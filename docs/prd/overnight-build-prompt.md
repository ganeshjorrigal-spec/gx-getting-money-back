# Overnight build: Tickback v1

Ganesh pastes one line into Codex: "Read docs/prd/overnight-build-prompt.md and do it. I authorise the decisions listed there for tonight. I'm going to sleep; in the morning I want to see a working product."

---

## Goal

By 08:00 IST, a live preview URL where a stranger on a phone can:
1. Read the landing page.
2. Try the sample case.
3. Paste a refund message and, within 15 seconds, see the route, the due date with its source, and the next step.
4. Open the next message in their own email app, add the check-in to their calendar, and come back to the case through its link.

Then build as much of the Friday "must" list as time allows (`docs/prd/07-build-plan.md` section 3b), in that order.

## Read first

1. `AGENTS.md`, then run `$repo-build-system` Mode 1.
2. The spec: `docs/prd/README.md`. Then only the files mapped to each milestone in `docs/prd/07-build-plan.md` section 1.
3. The acceptance checks per milestone: `MILESTONES.md`.

Work M0, then M1, then M2, then M3 (the Friday "must" items). One user story at a time: US-1 first.

## Decisions for tonight (Ganesh authorises these; record them in SCRATCHPAD.md and today's log)

- **P-1:** no accounts. Cases live at a private link.
- **P-3:** manual UPI. Read the UPI ID from env. If it is empty, hide the pay card entirely: no dead buttons.
- **P-5:** the name is "Tickback", kept in one constant.
- **P-6:** Direction A tokens.
- **P-7:** models come from env vars.
- **Guarantee wording:** follow D-009 through the `guaranteeLine` constant.

If you hit anything not covered by `DECISIONS.md` or the PRD:
1. Pick the most reversible option.
2. Note it in the log under "For HQ".
3. Keep going. Don't stop to ask.

## How you know it works (don't grade by eye)

- `npm run build` and the type check pass. Unit tests pass for `planCase()`, the date helpers, redaction, the mailto builder, the .ics builder and the UPI link builder.
- `npm run eval` on the 12 fixtures writes `docs/qa/eval-<date>.md`. The bar:
  - Correct route on at least 11 of 12.
  - Every date exact.
  - Zero invented contacts.
- Playwright at 360 px and 390 px width:
  - Screenshot the six regression-net screens (`docs/prd/02-design.md` section 11) into `docs/qa/screens/<date>/`.
  - Open each screenshot and look at it. Fix anything broken, overlapping, unreadable or off-token. Then screenshot again.
- Run US-1 end to end against the deployed preview, not only localhost.

After each milestone:
1. Run its acceptance checks.
2. Write the evidence in the log.
3. Mark it READY FOR REVIEW, never DONE.
4. Commit and push.

## How to work

Build, test, find the biggest gap, fix it, retest.
- If the same thing fails twice, change approach instead of retrying.
- Keep a short notebook in `SCRATCHPAD.md`: the current best state, what failed and why, the next test.
- Flush to the log and `STATE.md` before your context gets heavy.

## Boundaries

- Secrets stay in `.env` and Convex env only. Never commit, log or print them.
- No purchases: no domain, no Vercel Pro, no paid plans.
- Send nothing to anyone: no emails, messages or posts. No new sign-ups beyond the GitHub, Convex, Vercel and OpenAI accounts already logged in.
- Do not log into or use the email account ganesh.jorrigal@gmail.com, or any bank, UPI or payment app or site.
- Do not edit `IDEA_SCOPE.md`, `DECISIONS.md` or `docs/prd/`. In `MILESTONES.md`, only set READY FOR REVIEW. Propose other changes under "For HQ".
- No force push and no history rewrite.
- Keep real OpenAI calls to about 300 tonight, eval runs included.

## When to stop

Stop at the first of these:
- The Friday "must" list passes its checks.
- It is 07:30 IST.
- Everything left is blocked by something only Ganesh can do. Write exactly what you need at the top of `STATE.md`, and keep working on anything that isn't blocked.

Before stopping:
1. Update `STATE.md`: the live URL; what's done and verified, with links to evidence; what's not done; and what Ganesh must do first in the morning.
2. Append to today's log.
3. Push.
