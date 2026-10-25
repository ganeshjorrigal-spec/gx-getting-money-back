# N4 voice findings and next comparison, 26 Oct

## Current saved setup, read only

Azure Prabhat (en-IN-PrabhatNeural), speed 1.00. Soniox stt-rt-v5 with automatic language recognition; fallback Deepgram nova-2, en-IN. No explicit chunk plan, formatting plan, start-speaking or stop-speaking plan. Published SDK defaults: chunking enabled, minimum 30 characters, punctuation boundaries selected by provider. Exact effective punctuation list is not exposed. Formatting is enabled by default, including currency/date/number pronunciation. These are documented defaults, not explicit saved values.

Saved model temperature was absent before the source change; no numeric provider default established. Source now specifies 0.2; it is not published. The Vapi browser contains an older unsaved Neerja draft. It was only read, never published. The saved v4 assistant and the actual call used Prabhat. Dashboard draft cost estimates must not be treated as the actual Prabhat bill.

## What the timing evidence supports

Owner reports approximately fifteen 0.9 to 1.0 second pauses. The provider log contains 19 Azure synthesis requests, with chunks from 7 to 118 characters. Four chunks ended at commas, one at a colon, one at a closing parenthesis. This supports a chunk/prosody/buffering explanation, but does not prove every observed gap is caused by serial synthesis. Some synthesis requests overlap playback. Azure lacks reliable per-word timing here, so message span minus reported duration is not an acoustic silence measurement.

Average reported turn delay 1.389 seconds: model 0.551, speech generation 0.416, transcription 0.381, plus transport. Positive care-to-Genie transcript gaps range 0.804 to 2.124 seconds. The 4.476 and 9.516 second gaps are Genie-to-care, waiting for the next care response. Do not label them model thinking delays. Two interruptions are logged, without proving that their audio experience was good. Safe counts/timings only: docs/qa/n4-2026-10-26/voice-timing/metrics.json. No raw transcript or recording saved.

## Proposed comparison, not applied

1. Keep Prabhat speed 1.00, current transcriber and interruption settings; test explicit sentence-ending boundaries instead of comma/colon breaks, minimum around 100 characters (compare 80 to 120 if needed). This trades initial wait for longer speech context. Short answers must still flush at the end of a model turn. Keep formatting on so phone numbers and dates remain readable. Do not disable chunking wholesale as the first experiment.
2. Compare the same short script with Cartesia Sonic using Devansh or Janvi. Both appeared in this account's Vapi voice catalogue on 26 Oct. They are labelled Indian English on Cartesia's official pages. No claim of phone quality until owner listens.
3. Short wording is implemented locally: direct status/reference questions and optional "Okay, thank you", without repeated ceremonial acknowledgements. The server queues one factual recap and the complete polite close after validated completion.

Samples:
- Devansh, male, Warm Support Agent: https://www.cartesia.ai/voices/library/devansh-warm-support-agent-1259b7e3-cb8a-43df-9446-30971a46b8b0
- Janvi, female, Steady Agent: https://www.cartesia.ai/voices/library/janvi-steady-agent-7ea5e9c2-b719-4dc3-b870-5ba5f14d31d8

Dashboard route after owner chooses: Assistants > Refund Genie Test N4 > current version v4, avoiding the stale draft > Voice / Edit VOICE > Provider Cartesia > chosen voice (paste the public voice ID from Voice Library if search needs it) > supported Sonic model > speed 1.00 where supported > review > Publish. Do not click Publish yet. Current UI labels verified through the Voice entry; the provider-specific final controls are documented and have not been changed or fully walked. A transient test-only override is preferable for an audition so the shared saved assistant is preserved.

## Costs, USD, with different denominators kept separate

The actual 165.096-second call cost $0.1979, about $0.0719 per call minute. Azure voice alone was $0.017325 for 1,155 characters, about $0.00630 per call minute. Carrier costs can be billed separately. This is an observed bill, not a fixed rate for all future calls.

Vapi catalogue shows no per-voice price. I did not change the draft provider to produce a speculative estimate. Cartesia's public direct-provider plans are $5 for 100,000 character credits and $49 for 1.25 million. At this call's approximately 420 spoken characters per call minute, the voice component for either Devansh or Janvi would be about $0.0210/min on Pro or $0.0165/min on Startup, assuming all included credits are used. Approximate total with the earlier non-voice workload: $0.0866 or $0.0821/min. These are plan-equivalent comparisons, NOT verified Vapi account rates; unused credits, overages and plan charges change the effective price. Cartesia quotes 750 to 800 credits per generated speech minute; that differs from elapsed call minutes because care speaks too. Do not buy a plan or add a provider key for this comparison.

## Speech to speech: no switch

Vapi GPT-Live is a currently documented option: OpenAI speech listens and talks directly, with a separate reasoning model doing tools. It replaces the separate Soniox/Azure speech stages, uses its own voices and cannot retain Prabhat. It can listen while speaking, but exact scripted speech is not guaranteed; the server completion rules remain necessary. Published cost: $0.05/min voice plus $0.05/min Vapi hosting, plus reasoning tokens and phone charges. Therefore a 30-second audition has a $0.05 base and a three-minute call a $0.30 base, before those extras. Indian English delivery needs auditioning, not assumption.

Separately, raw OpenAI gpt-realtime-1.5 uses audio tokens ($32/million input, $64/million output), not GPT-Live's duration pricing. An illustrative evenly split 30-second exchange has about $0.024 new audio usage, or $0.049 including Vapi's $0.025 hosting; three minutes about $0.144 new audio or $0.294 including hosting. Text, replayed conversation context/cache and carrier charges are extra, so these are examples, not full-call quotes. Do not conflate the two products or their prices. No model/provider switch made.

## Fixed-step decision and next owner action

Vapi Workflows are retired. Squads reduce prompt size but do not guarantee one question per turn. Guaranteed steps need our server to choose each spoken turn, likely through Vapi's custom model endpoint, keeping state for status, reference, date/holder and the callback branch. This is a separate integration with added Convex requests, direct model access/cost and latency, not built under the finish-tool change. Existing Vapi credentials are not direct OpenAI credentials. No new credential or paid service is added without the owner's decision.

Next: owner chooses a voice/experiment and approves test publication; then separately approves an own-mobile audition. Target 30 seconds, hard maximum 180 seconds. No call is authorised by sign-in, voice selection, or publishing alone. The longer six-part adversarial script needs its own supervised test, not a rushed 30-second voice sample.

Sources checked 26 Oct:
- https://raw.githubusercontent.com/VapiAI/server-sdk-typescript/main/src/api/types/ChunkPlan.ts
- https://docs.vapi.ai/assistants/voice-formatting-plan
- https://docs.vapi.ai/providers/voice/cartesia
- https://www.cartesia.ai/voices/indian-accent
- https://www.cartesia.ai/pricing
- https://docs.vapi.ai/gpt-live/overview
- https://docs.vapi.ai/gpt-live/testing
- https://developers.openai.com/api/docs/models/gpt-realtime-1.5
- https://developers.openai.com/api/docs/guides/voice-latency-cost
- https://vapi.ai/pricing
