# Current state, 15 October 2026

## Part A: Google reconnect verified, rollback still live
Ganesh completed the authorised demo-organiser Google reconnect. Read-only demoActions:diagnose now succeeds, count0/no error on an intentionally invalid case code; token refresh and mailbox reading work. Actual mail delivery remains untested; no email demo/call/mail run by Codex. Earlier retry hit the three-links/address/day limit; no old counters reset. Original failed-send event was outside available CLI history.
Both required fixes are saved and pushed on main as 0e2dca6, unpublished: failed sends give back device/address/global reservation counts and delete unsent rows; safe retry message reaches the screen. 355 tests/47 files, type check, export, local 17-step mocked walkthrough pass. Proof docs/qa/demo-email-fix-2026-10-15. Nothing DONE.

## Current live baseline after authorised rollback
2156ce9 product code restored. Actual source 76c1eb6be319d0996cdad958a7b8df7761e7645a adds only existing optional email metadata validators, because exact baseline rejected stored demo.emailRequired. No case data deleted. Branch rollback-demo-2026-10-15 pushed; temporary checkout remains for review, with CLI-refreshed bindings. Main remains on the new reviewed code and unpublished fixes.
Convex static deployment 863d1c3a-c1b1-4a87-8fbc-35398216f191; Cloudflare worker e18d32c8-c1c9-4ec5-8ffa-002fcba57123. Both deploy commands succeeded. Six public paths200, live hero ends It's in. Configuration contents unchanged; no calling settings, allow-list, key or env changes.

## Next action
Ganesh authorises the next main publication when ready. Google reconnect is verified; D-050 is absent on the live backend after rollback, so the supervised call must wait for its authorised republish. Part B not started. No further publish until Ganesh authorises it. Old quota counts retained; new cleanup only applies after fix is published. Prior Goibibo contact/path, post-trial payment and video/calendar evidence gaps remain as logged. Nothing DONE.
