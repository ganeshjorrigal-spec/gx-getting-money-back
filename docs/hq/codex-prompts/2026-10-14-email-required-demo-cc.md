# Codex prompt: email required at confirm, confirmed-email CC in the demo (D-048)

Written by HQ, Wed 14 Oct 2026, 19:00 IST. Read D-038, D-043, D-046 and D-048. One commit per part. No publish, no `npm run deploy`, no calling settings, no keys, no real-company mail. Mark nothing DONE.

## Part 1: email required at the real confirm step

- At the confirm step of a real case (flight and event), email becomes required, with the line "So you see every mail about your case in your own inbox." Phone stays optional except for calling permission (D-045 Part 2).
- Reuse an email the user already gave earlier in the same case (ask once, D-044). Basic format check only.
- Nothing is drafted to a company until the case has an email. The free check result (who has the money, due date, first step) still shows before this step.
- Keep CC behaviour: every Genie-sent mail includes the user (already in code); confirm with a test. CHASE_ALLOWLIST stays exactly as it is for real cases.

## Part 2: demo with the user in CC

- At the start of the demo, ask for an email: "We'll copy you on the demo mails so you can see the whole conversation in your inbox." Send a one-time confirmation link from the existing demo mailbox; the demo starts only after the link is opened. Link valid 30 minutes, single use, never shows the case key in the email body beyond what the link needs.
- Demo mails: To stays the demo desk role addresses; CC the confirmed address; subject starts with "Demo:"; the body's first line says "This is a Refund Genie demo. No real company is involved."
- Limits: one demo per confirmed address per day; at most 3 confirmation emails per device per day; refuse addresses on obvious disposable-mail domains only if a simple list is already in the repo (do not add a dependency).
- The CHASE_ALLOWLIST exception applies only to a CC that is a confirmed address on a demo case. Add a guard at the send point so a real case can never use it.
- The unlinked `/start/?demo=flight-self` (user sends from their own Gmail) stays as it is.
- Tests: unconfirmed address is never CC'd; confirmed address is CC'd on every demo mail; a real case cannot use the exception; limits hold; "Demo:" subject on every demo mail.

## Part 3: proof

Local demo walk end to end with a test inbox in the allow-list: confirmation mail arrives, link starts the demo, each demo mail and reply shows in that inbox with "Demo:" subjects. Screenshots at 375px. Do not use a real person's address.

## Not now

Google sign-in and accounts are planned for after 17 Oct (D-048 part 3). Do not start them.

## Short paste block

```
git pull. Do docs/hq/codex-prompts/2026-10-14-email-required-demo-cc.md parts 1 to 3, one commit each. D-048 is Ganesh's decision. No publish, no npm run deploy, no calling settings, no keys, no real-company mail. Mark nothing DONE. Update STATE.md, append the log, push, then wait for HQ review.
```
