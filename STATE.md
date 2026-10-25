# Refund Genie test build: N4 server finish and voice review, awaiting approval

## Scope
- Folder gx-getting-money-back-next, branch next only. Frozen main/refundgenie.app/original Convex/Cloudflare untouched.
- Development tangible-lemur-692; test Production abundant-marten-136, https://abundant-marten-136.convex.site.
- Last published source 388f50f, static version 4e9ca264-deb2-42f2-8425-4cfdbb06e56c. Current changes NOT published.
- N2/N3 DONE by Ganesh's phone checks. N4 in progress, not READY or DONE.
- Last owner reset verified: CALL_MODE=simulated, CALL_SUPERVISED_DEMO_CODE absent. No fresh call authorised. Owner controls settings, keys, limits and allow-lists.

## Current work
Owner approved callback completion with reference, number and hours, or after two refusals of one callback detail with missing details named in the update. Normal status/reference/date-or-holder rule unchanged.

Tests-first implementation: authenticated per-call finish_call handler, bounded care-facts and spoken-sentence ledger, distinct refusal validation, exactly one next question on denial, atomic close claim, provider-bound control URL, complete recap and polite close before hang-up. Per-call transient assistant removes inherited free end tools/hooks/phrases while preserving saved voice/transcriber/interruption settings. Restricted to non-story supervised demos on the two test deployments; real-call behavior unchanged. Supervised tests capped at three minutes under latest owner instruction; general call limits unchanged. Provider temperature was unset before source pin to 0.2.

Controlled callback owner updates use verified facts, list missing details, and omit an older reader's processing date. They can prepare during TRIAGING/ERROR without changing that case stage. Sending mocked only in tests. Short natural wording added locally.

Limit: validated completion does not guarantee every free-form spoken turn contains only one question or no repetition. Vapi Workflows retired. Fixed spoken steps require a separate server-driven turn integration and model-access/cost decision. Proposed, not built.

## Evidence and gates
- Final full suite 651/651 tests across 81 files, type check pass, static export all 16 pages pass, diff whitespace check pass.
- New policy/backend/owner-update tests fail before fixes and pass after. No actual provider request, call or mail in these tests.
- Original RG-T53DCT baseline remains 6/9: repetition, premature completion, bundled questions. Three authored fixtures 9/9 each, not live proof. docs/qa/n4-2026-10-26/enforcement-baseline/.
- Latest actual call unchanged: 165.096s, USD 0.1979, gpt-4.1, assistant-ended-call, no transfer. Exactly one call under earlier approval, no retry.
- Voice metrics: 19 Azure requests with short/punctuation chunks; owner-observed one-second gaps support chunk/prosody hypothesis, exact acoustic cause unproven. Average reported response latency 1.389s. The 4.476s and 9.516s gaps wait for care, not model processing. Counts/timings only: docs/qa/n4-2026-10-26/voice-timing/metrics.json.

## Voice choice and next step
Saved Vapi v4 uses Azure Prabhat speed 1.00; Soniox stt-rt-v5 automatic with Deepgram nova-2 en-IN fallback. Older unsaved browser Neerja draft must never be published. Voice, chunking and transcriber settings unchanged. Devansh and Janvi verified in Vapi catalogue; direct-provider cost estimates/sample links in docs/handoff/n4-voice-review-2026-10-26.md, not verified Vapi account quotes. GPT-Live/Realtime trade-offs documented; no switch.

WAIT for owner review/voice choice and explicit test-publication approval, then separate go before any own-mobile audition: target 30s, maximum 180s. Full adversarial test separate. Provider webhook delivery, audible closing and voice quality untested on new code.

Full enforcement scope/limits: docs/handoff/n4-server-finish-proposal.md, superseding update. Root HQ prompt untracked/uncommitted. Deferred Google quota and parked trial/manual-plan work unchanged. No env/key/allow-list/provider setting changes. Nothing newly marked DONE.
