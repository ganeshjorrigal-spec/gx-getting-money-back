# Codex prompt: public launch, Genie sends mail and calls (Sat 17 Oct, 10:40)

Written by HQ. Read D-061 and `docs/qa/real-mail-path-2026-10-16.md`. One commit per part. No calls, no real company mail, no env, key, allow-list or calling-setting changes. Mark nothing DONE.

## Part 1: real-case mail recipients (`convex/chase.ts`, `convex/chaseActions.ts`, `lib/chase.ts`)
- When `CHASE_REAL_COMPANIES_ENABLED==='true'` and the case is real (not demo): To and CC company addresses must pass the existing checked-contact rule (`chaseCompanyAddress`); the user CC must equal the case's confirmed email (`item.email` with `factsConfirmedAt`), and the sender uses that address, not a different `chase.email`. CHASE_ALLOWLIST is not checked for these.
- Demo cases and the switch-off path stay exactly as today.
- New `CHASE_DAILY_CAP` (whole number, default 50): real company mails sent per IST day across all cases. Reserve before send, release on failure. At the cap, the case shows "Genie will send this tomorrow" and nothing is sent.
- Tests: switch on, checked company plus confirmed CC sends; unchecked company refused; a CC that is not the confirmed email refused; cap reached refuses; switch off unchanged; demo unchanged.

## Part 2: words that match what is live (`app/copy.ts`)
- Landing: replace "Mail sending needs your written permission and is limited to approved test addresses." with "Genie mails and calls only after your written permission. Calls start with IndiGo, Monday to Saturday, 10:00 to 18:00."
- Check every other "test addresses", "approved test numbers" and "simulated for now" line on real-case screens, FAQ, terms and privacy; demo labels stay.
- Copy tests only.

## Part 3: small intake fixes seen on the live walk (RG-FBLJE4)
- Skip the "Booking contact permission" screen when both booking mobile and email are empty.
- Give the new summary rows (From, To, Name on ticket, Booking mobile, Booking email, Share booking contact) the same "Edit" links as the other rows.
- Read-only first: the test message said "flight 6E 5321 ... on 20 Sep 2026", but the confirm screen shows neither flight number nor travel date. Log whether they were read and stored; if stored, show them in the summary; if not read, fix the read for these two fields.
- Tests for each.

## Part 4: gates
Full suite once, type check, static export. Stop and tell Ganesh. He authorises deploy, then flips CHASE_REAL_COMPANIES_ENABLED and CALL_MODE himself.

## Short paste block
```
git pull. On main, do docs/hq/codex-prompts/2026-10-17-public-launch.md Parts 1 to 4, one commit each. No calls, no real company mail, no env, key, allow-list or calling-setting changes. Stop after gates for Ganesh's deploy line. Mark nothing DONE.
```
