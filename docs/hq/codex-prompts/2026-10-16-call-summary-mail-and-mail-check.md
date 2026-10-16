# Codex prompt: real-call summary mail to the user, and a read-only mail check (Fri 16 Oct, 22:00)

Written by HQ. Read D-048, D-056, D-057 and the "real confirming-mail gap" entry in today's log. One commit per part. No calls, no real mail, no env, key, allow-list or calling-setting changes. Mark nothing DONE.

## Part 1: read-only check of the real email chase (log only, no code)
For a REAL (non-demo) case today, answer in plain lines, with file and function names:
1. When the user gives written permission, who sends the first chase mail: the user from their own Gmail, Genie from the case inbox, or both options?
2. If Genie sends, which recipients does it pick (company address source), and does CHASE_ALLOWLIST block real company addresses today?
3. Does the user stay in CC on every Genie mail (D-048)?
4. In one line: can a real user today get a real mail delivered to IndiGo or MakeMyTrip without Ganesh changing a setting? Yes or no, and which setting would change it.
Save as `docs/qa/real-mail-path-2026-10-16.md`. No guesses: mark anything unknown as UNKNOWN.

## Part 2: summary mail to the user after a real call (`convex/calls.ts` prepareConfirmation and the mail sender)
- For a real case with a completed live call, prepare a mail to the user only, at the case's confirmed email. Subject: "Refund Genie call update: {company} · {case code}".
- Body, plain: what care said (reader summary), the reference if found, the processing date if found, and the callback line if care asked ("{company} asked you to call them back to verify your identity. Quote reference {ref}." or without the reference). End with "Genie keeps chasing by mail. Reply to this mail with any question."
- The user's own confirmed address is allowed without CHASE_ALLOWLIST. Do not widen the list for anyone else. No airline recipient on this path.
- Demo behaviour unchanged.
- Tests: real completed call gives one user-only draft; failed call gives none; no company address in To or CC; demo path unchanged; an unconfirmed email gives no mail.

## Part 3: gates
Full suite once, type check, static export. Stop and tell Ganesh. He authorises one deploy covering this and the earlier real-calls commits.

## Short paste block
```
git pull. On main, do docs/hq/codex-prompts/2026-10-16-call-summary-mail-and-mail-check.md Parts 1 to 3, one commit each. Part 1 is read-only. No calls, no real mail, no env, key, allow-list or calling-setting changes. Stop after gates for Ganesh's deploy line. Mark nothing DONE.
```
