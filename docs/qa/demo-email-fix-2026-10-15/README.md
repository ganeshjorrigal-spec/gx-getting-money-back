# Demo email Part A, 15 October 2026

## Result

Two required fixes saved on main as 0e2dca6, unpublished. Google access is the blocking cause, so Ganesh's authorised rollback was used. Read-only demoActions:diagnose returned "Google connection needs to be renewed" before and after rollback. The old flow is restored; real demo mail delivery is not working until the owner renews this connection. No Codex email demo run or mail/call sent.

## New fix proof

355 unit tests / 47 files, type check and explicit static export pass. 17-step local walk to Money landed passes with replaced transport and a .invalid fixture inbox. Action tests reproduce Google-send/missing-connection failures and verify all three counts returned, earlier counts preserved, unsent row deleted, sent rows protected, double cleanup harmless, midnight refunds only the original day, and safe screen message. These fixes are not active on the rolled-back live backend.

## Rollback proof

Baseline 2156ce9; actual source 76c1eb6 on rollback-demo-2026-10-15 adds only optional validators for stored email metadata. First exact-baseline Convex attempt failed because existing cases contain demo.emailRequired. Compatibility patch preserves those fields without deleting cases. Tool-generated bindings refreshed normally during deployment.

Convex static version 863d1c3a-c1b1-4a87-8fbc-35398216f191; Cloudflare version e18d32c8-c1c9-4ec5-8ffa-002fcba57123. Both authorised deployment commands exited 0, in that order. All six public routes return 200; hero ends It's in, with screenshot and checks. versions/diagnostic in rollback.json; compatibility patch in rollback-schema.patch. Original .env/.env.local byte contents equal the ignored runtime copies used for the isolated checkout. No values printed or changed.

## Limits

Original failed-send event no longer in available CLI history. Ganesh's new retry logged the folded-address three-links/day refusal; no counters reset. Read-only mailbox diagnostic establishes renewal is required without sending mail. Configuration changes or Google consent were not performed. D-050 call-model code is absent on the rolled-back live backend; supervised call must wait for its authorised republish. Part B not started, nothing DONE.
