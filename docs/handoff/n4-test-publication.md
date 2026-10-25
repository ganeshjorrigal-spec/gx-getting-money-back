# N4 test publication and supervised setup, 25 October 2026

Published source ced3e6f to https://abundant-marten-136.convex.site using owner-approved npm run deploy:test. Backend and 16-page export pass. Static version 991a2b00-2bf7-4dee-b00b-94c2a503e56e, 135 files. /, /start/, /cases/ return 200; refreshed intake renders in browser. No call, company mail or frozen-live change.

## Current voice, freshly checked after owner sign-in
- Voice: Elliot, Version 2, provider Vapi, speed 1.10.
- Spoken language: Automatic, so it can follow the conversation language.
- Transcriber (turns incoming speech into text): Soniox STT RT v5, languages Automatic.
- Fallback: Deepgram Nova 2, English India (earlier same-day settings inventory in docs/calling.md).
- App instructions allow English or Hindi. No language setting changed.

Separate Vapi assistant Refund Genie Test N4 created through More actions > Duplicate, then Edit next to name > rename > Save. Its starting voice/settings are restored to Elliot V2 / Automatic / 1.10 after a temporary Azure model inspection. No Indian voice selected. Original shared Refund Genie Recovery Agent remains unchanged. This test assistant is not yet referenced by either test Convex deployment; owner must add its ID directly, not put any private key in chat or the repo. Do not reassign the existing outbound phone's default assistant.

## Voice choices and exact dashboard path
Audition choices, not claims from a real phone test:

| Voice | Provider in Vapi | Spoken locale / voice ID |
| --- | --- | --- |
| Neerja, female | Azure | English India, en-IN-NeerjaNeural |
| Prabhat, male | Azure | English India, en-IN-PrabhatNeural |
| Naina, female | Vapi | Indian American, Naina, Version 2 |

Neerja/Prabhat locale IDs verified in [Microsoft voice list](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts); Vapi supports [Azure through its default integration](https://docs.vapi.ai/providers/voice/azure). No separate Azure hosting/database/account is needed for that integration. Vapi dropdown directly lists Naina and Sagar as Indian American; [Vapi voice list](https://docs.vapi.ai/providers/voice/vapi-voices). Indian American is a distinct accent label, not a claim of native Indian English. No phone audition performed or voice quality ranking established.

For Neerja or Prabhat: Vapi > Assistants > Refund Genie Test N4 > Assistant tab > VOICE card > Voice model > Azure > Custom voice ID > paste the chosen voice ID from the table into the field. Azure's voice ID selects its language; there is no separate voice language selector. Then Publish and complete its confirmation. This publishes the isolated Vapi assistant configuration, not the app or the live assistant. The Custom voice ID control was observed under Azure in the test copy. Leave the transcriber unchanged for this choice.

For Naina: same test assistant > Assistant > VOICE > Voice model > Vapi Voices - Version 2 > Voice > Naina. Leave Primary language Automatic for English/Hindi. Then Publish and complete its confirmation. Stop if any control differs rather than changing another assistant. Do not choose a provider/model for the reasoning model here; Voice model is the speech provider field.

## Missing settings, owner adds directly to Convex
Checked both tangible-lemur-692 Development and abundant-marten-136 Production, in refundgenie-test only. All six call prerequisites absent; mode not live, transfers and real-company mail off. CHASE_ALLOWLIST already present. Do not edit it to add company addresses.

In Convex dashboard > refundgenie-test > Development > Settings > Environment Variables, add the following; repeat on refundgenie-test Production. Never put these in NEXT_PUBLIC variables or chat.

| Setting | Owner enters |
| --- | --- |
| VAPI_API_KEY | Vapi private API key from API Keys, copied directly |
| VAPI_PHONE_NUMBER_ID | ID of the existing Vapi/Vobiz outbound line, not its telephone number |
| VAPI_ASSISTANT_ID | Copy ID from Refund Genie Test N4, not the live Recovery Agent |
| CALL_ALLOWLIST | Only Ganesh's own receiving mobile, international +91 format |
| CALL_MAX_COST_USD | Owner-selected positive per-call dollar budget |
| CALL_DAILY_CAP_USD | Owner-selected positive daily dollar budget, at least the per-call reservation |
| CALL_MODE | simulated until explicit go-ahead and final precheck |

CALL_MAX_MINUTES can stay absent (default and ceiling 12) or owner sets 12. Leave CALL_TRANSFER_ENABLED absent/off and CHASE_REAL_COMPANIES_ENABLED absent/off. No new phone, second receiving phone or passenger transfer is needed. Do not widen the allow-list. Do not copy the live case inbox or its Google credentials. Existing test inbox remains isolated.

## Next step and STOP
Setup is blocked by the missing settings and pending voice selection, not ready to dial. No case seeded yet because existing callQa.seed requires the saved test phone. Once owner settings are saved: inspect presence only, verify exactly one receiving number, inspect test assistant configuration and any server callbacks for isolation, prepare one fictional demo case through the existing seed path without running proofFixture (that action also runs a simulation), finish normal owner email confirmation/permission gates, run read-only precheck for that code. Never bypass confirmation. Preview must not reserve budget or schedule a call. Report the code and WAIT for explicit go-ahead before any request/run/reserve action. Owner controls CALL_MODE. Call only his mobile inside existing demo hours, one attempt; stop on failure, score its safe transcript and ask owner to restore simulated. No company call without explicit yes in this chat. N4 not READY FOR REVIEW or DONE until the supervised proof passes.
