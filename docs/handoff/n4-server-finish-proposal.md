# N4 server-enforced finish and fixed-step proposal, 26 Oct

## Verified before changes
Saved isolated Vapi assistant model gpt-4.1 has no explicit temperature field. Current value is unset, not a verified numeric default. Current voice is Azure Prabhat 1.00. Only saved tool is built-in endCall named end_refund_support_call; no existing server endpoint. Mode remains simulated and overnight code absent.

Before source change, new regression requiring temperature 0.2 failed (undefined). Pinned both main and optional transfer model to 0.2 in local code. No model/provider/voice switch or provider setting edit. Snapshot diff contains only those two temperature additions. Full suite 626/626 in 79 files and type check pass. Not deployed.

## Baseline checker, original data unchanged
Re-read saved RG-T53DCT call from Vapi and scored original provider messages in memory only: 6/9, same repetition, incomplete-job ending and bundled-question flags. Three current made-up fixtures each 9/9: menu-then-person, second-person, otp-request. These fixtures are authored scenarios, not proof of new instructions or enforcement on a live call. Transcript checker unit tests 15/15. Scores only under docs/qa/n4-2026-10-26/enforcement-baseline/. No raw real transcript or contact details stored. No new call requested.

## What fixed steps take
Vapi Workflows were retired 18 August 2026; official recommended replacement is Assistants or Squads. Squads split a call between smaller assistants but still use model-selected handoffs; they do not by themselves guarantee one question per turn. Stronger fixed steps need a Convex controller to choose the next single question from stored facts and actual answered turns, plus the finish validator. Vapi supports a custom OpenAI-compatible model endpoint, including streaming responses; this is an option for making the server choose the spoken turn rather than asking the model to obey the choice. This is a larger integration than replacing a tool. Retaining gpt-4.1 behind that endpoint would require an authorised way to call it directly; the existing Vapi API key is not an OpenAI API key. Do not switch to Gemini or add credentials without Ganesh's decision. No new external backend/host proposed.

Near-term finish gate design: a synchronous finish_call Function tool with required status, reference, date, money_holder and care_refused fields (nullable missing facts); require status plus reference plus date/holder, or two independently evidenced explicit care refusals. Do not trust care_refused=true by itself. Authenticated, per-call server endpoint validates active saved call, evidence and idempotent tool delivery; denied result returns exactly one missing-fact question. A complete callback branch is pending owner decision below. Server speaks factual recap and full closing, then ends only after speech finishes; care can still hang up and duration safety limit remains. Inherited free endCall, end phrases and timeout hooks must be audited so they cannot bypass validation. Do not delete or edit a shared tool. A transient per-call assistant is one way to remove inherited free-ending tools without changing the shared assistant; it needs tested preservation of voice/transcriber/interruption configuration.

State design: bounded collected facts, distinct refusal evidence, current step, answered fields, actual spoken-sentence ledger, hold state and per-field reask count. Update from authenticated provider turns, not only model claims; keep transcript/private fields out of source/logs. Pending tests before implementation: missing fields produce one question/no hang-up; acknowledgements/hold do not complete a field or count refusal; second distinct refusal may close; invented/replayed evidence rejected; cross-case/unauthenticated/replayed requests blocked; no free end tool in effective call config; one close after full recap; real customer hang-up still terminates; normal call caps/permissions/destination unchanged.

## Costs before building fixed steps
Vapi published usage price: USD 0.05/min hosting, model costs passed through; speech and carrier costs also apply. Last observed test total USD 0.1979 / 2.7516 min is about USD 0.072/min. At the same observed rate, 3 minutes is about USD 0.216; this is a historical comparison, not a quote for new architecture. New state updates/webhooks add Convex usage; a custom model endpoint adds direct inference usage and latency. No separate workflow/squad surcharge established from the published price page; not a guarantee of zero extra cost. Need measurement on the first approved new test. No paid plan/credits/keys changed.

Sources read 26 Oct 2026:
- https://docs.vapi.ai/workflows/legacy-migration
- https://docs.vapi.ai/squads
- https://docs.vapi.ai/customization/custom-llm/using-your-server
- https://docs.vapi.ai/tools/custom-tools-troubleshooting
- https://docs.vapi.ai/calls/call-features
- https://vapi.ai/pricing

## Required owner decision, asked in chat
Verification branch ends after reference, callback number/channel and hours in prior policy; latest normal finish rule instead requires status, reference and date/holder (or two refusals). May a fully collected verification callback hand-over end without date/holder? Until answered, do not wire a policy exception or publish/place a call. This is a product completion rule, not a technical default.

Finish handler, persistent call ledger and fixed-step integration are NOT built yet. Only tested temperature pin and baseline research are completed. No publishing or calls. Continue tests-first after the verification branch is resolved.

## Superseding update: owner decision and local implementation

Ganesh approved the callback exception in chat: collect reference, callback number and hours without pressing for refund date/holder; after two explicit refusals of one callback detail, finish with what is known and name missing details in the owner update. Normal branch unchanged.

Implemented tests first: synchronous finish_call with required nullable facts, care-evidence validation, distinct refusal counting and exactly one missing-field question on denial. Actual facts and recently spoken sentences are stored in a bounded per-call ledger. An authenticated per-call endpoint binds the hashed bearer credential to the reserved internal call and provider call ID, rejects stale/cross-call messages, and atomically claims one close. It reads the actual provider control URL, validates its host and call binding, then queues the recap and full polite close with endCallAfterSpoken. It does not execute a bare hang-up. Care can still physically end the call and the duration safety cap remains.

Only non-story supervised demos on the two exact refundgenie-test deployments use the new transient assistant. It preserves the saved voice/transcriber/interruption configuration while removing inherited endCall tools, tool IDs, hooks and end phrases. Shared Vapi assistant/tools and real-call path are not edited. Supervised tests are capped at 180 seconds under the owner's latest voice-test limit, below the general CALL_MAX_MINUTES limit. Unknown configuration fails closed without dialling. No settings, keys or allow-lists added/changed.

Controlled callback owner mail uses verified reference/number/hours, names every missing detail, and suppresses an older reader's processing date. It can prepare while the reader is TRIAGING/ERROR without changing that case stage; confirmation/send idempotency and exact confirmed recipient checks remain. Mail transport mocked in tests only.

Limit: this enforces completion and returns one next question, but does not prevent every free-form spoken turn from bundling questions or repeating a sentence. Guaranteed one-question spoken steps remain the separate proposed integration above. No claim that synthetic passing tests fix a recorded call retroactively. Provider webhook delivery, final audible close and new voice quality still need an approved test release and a separately approved own-mobile call. No publication or call made.
