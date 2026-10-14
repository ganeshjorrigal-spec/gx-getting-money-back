# D-050 call model and confirmation limits, local proof

Client date: 14 October 2026. Parts 1 and 2 are unpublished, ready for HQ review. No actual call or mail was made.

- Part 1: 8cf4c6d. Default overrides use openai/gpt-4.1-mini for both assistants. Pre-change snapshot retains their exact instructions, first messages, tools, recording and time limits.
- default-simulated-override.json: built by scripts/qa/call-model-proof.mts from the actual override builder and simulated transport. Zero requests; destination number omitted. Contains only synthetic names/booking details and the instruction/configuration contract.
- Part 2: address confirmation-mail reservations limited to 3 per IST calendar day across cases/devices/Gmail aliases; global reservations limited to 100 per IST calendar day. Shared Gmail folding used for reservation and confirmed-demo consumption. Existing device/confirmed-demo limits retained. Rejection rolls back counters and record creation.
- 350 unit tests / 47 files pass; type check passes. Explicit static export checked separately; result recorded in the daily log.
- Backend tests use in-memory Convex. Mail-action tests use mocked Gmail; this is not real inbox-arrival or live-call proof. Ganesh's actual Gmail check remains after authorised publication. Calling settings/allow-lists/keys unchanged.

Vapi references: [Call API](https://docs.vapi.ai/api-reference/calls/create), [OpenAI model IDs](https://docs.vapi.ai/providers/model/openai).
