# Codex prompt: URGENT demo fix on live, then collapsed progress summary (D-046)

Written by HQ, Tue 13 Oct 2026, 21:35 IST. Do this FIRST: finish the commit you are on in the current job, then switch to this, then go back. Sprint submission is Sat 17 Oct 11:00 and the demo is the core of it.

## Part 1: the demo is broken on the live site (urgent)

Ganesh reports, on refundgenie.app and on the Convex site (both serve 4990087 since his 19:57 publish): clicking the demo jumps straight into a journey, the loading animation plays, and then only a static block of text explaining the demo appears. Nothing plays out.

1. Reproduce on the live site in a fresh browser profile, starting from the landing page's demo button and from `/start/?demo=flight`. Screenshot each step. Write the cause in one line in the log. HQ's guess: the D-043 guard blocks the old automatic demo mail to a demo Grievance Officer, which your `6ef05de` (customer-care demo role) fixes but which is not published. Confirm or correct this.
2. Fix on current `main` so the full demo plays end to end, every round, as before D-043: Genie's automatic mails go to demo customer-care roles; an escalation step shows "You send this one from your Gmail". Check every demo entry point: landing "Try a demo" / "See a 3-minute demo", "See a real case", `/start/?demo=flight`, the public chase demo, and `/start/?demo=flight-self`.
3. Add an automated end-to-end test that walks the main demo from the landing button to the final round and fails if it stops on a static text block.
4. Do NOT publish. Report the fix and the commit; HQ reviews, then Ganesh decides the publish. The landing performance fix (current job, Part 1) must pass before any publish that includes the new landing page. If a quicker safe path is to publish only the demo fix on top of 4990087, propose it in the log; do not do it.

## Part 2: collapsed progress summary while answering (D-046)

On every screen where the user answers questions, real or demo (start flow, missing-details questions, confirm, chase and call permission):
- Collapse the running "what you've shared / what we understood" summary under a subtle text link "See what you've shared" (not a button-styled control, but still at least 44px tap area and keyboard reachable). Closed by default; remembers open or closed for that screen only.
- Show a thin step bar with "Step N of M" above the question. Use real step counts for each flow; if M can change, show the bar without "of M" rather than a wrong number.
- After each saved answer, a brief "Saved" tick next to the field for about 1.5 seconds, announced politely to screen readers; respects reduced motion.
- At the confirm step only, show the full summary open, with an edit link per item, before anything is sent.
- No change to what is asked or stored. Screenshots at 375px and 1280px of a question screen (closed and open) and of the confirm step.

## Rules

No Cloudflare publish, no `npm run deploy`, no calling settings, no keys, no live calls, no real-company mail. Mark nothing DONE. Update STATE.md, append the log, push after each part, then go back to `2026-10-13-perf-mascot-portals.md`.

## Short paste block

```
git pull. URGENT: finish your current commit, then do docs/hq/codex-prompts/2026-10-13-urgent-demo-and-disclosure.md part 1 (live demo broken) and part 2 (D-046), pushing after each, then return to the perf/mascot/portals job. Do not publish. Mark nothing DONE.
```
