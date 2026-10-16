# Current state, 16 October 2026

## One post-publish supervised call failed; reset requested
Read-only precheck passed at 19:08:02 IST for RG-A64786, one of two daily attempts used. Exactly one call n176r64sx1nm8q7gq2gmpxymvh8gc60c invoked. No retry. Provider ended call.forwarding.operator-busy, elapsed 55.217s, cost USD 0.0728, Vapi call override shows gpt-4.1. Caller holds role and gives known PNR; care explicitly requests passenger before transfer. Forwarding still failed, full successful transfer unproven. Safe provider transcript ends honest could-not-reach wording, no passenger speech/recording retained. Proof docs/qa/post-publish-call-2026-10-16. Nothing DONE.

## Poll-failure inconsistency
Convex poll timed out first and saved failed / Call status unavailable; no automatic retry, empty transcript and cost 0. Separate read-only provider evidence has safe transcript and actual cost 0.0728. No stored data/budget repair or code change attempted. Provider confirmed ended; no stop-control POST sent. Asked owner reset CALL_MODE to simulated, confirmed simulated by read-only check. Two-call daily cap now used for RG-A64786. No further calls.

## Current published release
Published source 8bd0d3364821bd619a134393396885eadfebe3d2; Convex static 32257ffa-602a-4d06-ada3-cc30e1bec7c9, Cloudflare 1a21e558-f5ba-4665-b132-875a4cd5981f. 388/388 tests across 53 files, type/export passed. Six requested public routes 200. No new deploy, env/key/allow-list/model/calling-setting changes by Codex. Next: HQ review of forwarding/poll inconsistency. Earlier unrelated gaps remain logged.
