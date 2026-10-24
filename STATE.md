# Current state, 25 October 2026

## Security Part A: READY FOR REVIEW, not published
Working only in gx-getting-money-back-next, branch next. S1 to S7 committed individually, followed by regression checkpoint 6d5c96e and closed-case upload correction 83d8342. N2, N3 and N4 not started. Required STOP before deploy:test or moving on.

S1: Responses setup requires RESPONSES_SETUP_SECRET and RESPONSES_OWNER_EMAIL in server settings. OAuth rejects a different connected account before saving it; finishSetup checks owner again. No settings changed. Unconfigured setup refuses access.
S2: Real cases reuse the single-use email confirmation flow. Verified address is bound to the case; hand-over, mail dispatch, calling permission and request/reservation refuse unconfirmed or mismatched email. Case screen explains why and offers a confirmation link. Demo continues its confirmed flow.
S3: Incoming Gmail replies require an app-sent thread, a checked company sender/domain, and Gmail SPF/DKIM passes with aligned signing domain. Otherwise save as unverified with no planner/AI job or automatic case change. Case-holder approval button authorises one read. Unverified text excluded from AI inputs and draft history.
S4: Old demo.create refuses creation, start page uses confirmed-email demo only. Organiser ignores legacy/unconfirmed jobs and answers only registered app mail. No incoming recipients copied.
S5: Call duration defaults to 12 minutes, supports shorter CALL_MAX_MINUTES. Ambiguous starts retain budget as start_uncertain, with read-only provider reconciliation by exact app-call metadata. No automatic new call.
S6: Default 20 Gemini calls per case per India calendar day via AI_CALLS_PER_CASE_PER_DAY, checked atomically with hourly quota. Either refusal consumes neither quota; input/uploads remain saved and daily notice is distinct.
S7: One-use upload tickets record device/case ownership at the server upload endpoint. Case creation/replies claim only owned or same-device pending files; readers check ownership; deletion only removes registered case files. Legacy unregistered attachments fail closed: not read by Gemini or deleted through input IDs. No backfill or data deletion run.

## Verification
Final full suite 546/546 across 74 files and full type check pass. Test Development push to tangible-lemur-692 accepted schema/functions. Static export/build passes, 16 generated pages. Proof docs/qa/security-part-a-2026-10-25/gates.json and docs/handoff/security-part-a.md. Gmail/Vapi transports mocked in tests, no actual mail or calls. Public test Production not updated.

## Test link and freeze
https://abundant-marten-136.convex.site remains on foundations source 2c35c365aa82ebfb74ae59fa33068307a6916d09, static version 4533f171-bdc1-452e-973a-806832855c80. deploy:test alone publishes that test link after owner yes. Old deploy/deploy:web unchanged. Frozen live project, Cloudflare, main, settings, keys and allow-lists untouched.

## Remaining and parked
STOP for Ganesh after Part A. Test Gmail send permission/connections are deferred, so real confirmation mail is not live-proven on the isolated test project. Responses owner settings are required before using setup; none added by Codex. Provider daily request quota remains deferred by owner from foundations. Free-refund count resets and manual annual-pass fallback remain parked. N2/N3/N4 require separate staged work and STOPs. Root HQ prompt stays untracked and untouched.
