# Current state, 15 October 2026

## Part A: external Google blocker, rollback published, owner action pending
Demo organiser's saved Google connection needs renewal, verified through the existing read-only demoActions:diagnose before and after rollback. The retry additionally hit the three-links/address/day limit. Earlier original send error no longer in CLI history; no counters reset. Real demo mail delivery is not working until the connection is renewed. No email demo/call/mail run by Codex.
Both required fixes are saved and pushed on main as 0e2dca6, unpublished: failed sends give back device/address/global reservation counts and delete unsent rows; safe retry message reaches the screen. 355 tests/47 files, type check, export, local 17-step mocked walkthrough pass. Proof docs/qa/demo-email-fix-2026-10-15. Nothing DONE.

## Current live baseline after authorised rollback
2156ce9 product code restored. Actual source 76c1eb6be319d0996cdad958a7b8df7761e7645a adds only existing optional email metadata validators, because exact baseline rejected stored demo.emailRequired. No case data deleted. Branch rollback-demo-2026-10-15 pushed; temporary checkout remains for review, with CLI-refreshed bindings. Main remains on the new reviewed code and unpublished fixes.
Convex static deployment 863d1c3a-c1b1-4a87-8fbc-35398216f191; Cloudflare worker e18d32c8-c1c9-4ec5-8ffa-002fcba57123. Both deploy commands succeeded. Six public paths200, live hero ends It's in. Configuration contents unchanged; no calling settings, allow-list, key or env changes.

## Next action
Ganesh renews the demo organiser's Google read/send connection. D-050 is absent on live backend after rollback: supervised call must wait for its authorised republish. Part B not started. No further publish until Ganesh authorises it. Old quota counts retained; new cleanup only applies after fix is published. Prior Goibibo contact/path, post-trial payment and video/calendar evidence gaps remain as logged. Nothing DONE.
