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

## Owner choice applied
Ganesh chose Neerja. The isolated test assistant now has Azure voice en-IN-NeerjaNeural, published v3 named N4 Neerja test at 100% traffic. Voice locale is English India. Soniox STT RT v5 Automatic unchanged. The saved original Recovery Agent was not edited. Publish dialog reviewed: voice provider/ID only, Vapi-specific auto language/version removed. No fallback added. UI reports Published v3; cropped proof test-assistant-neerja.png. No call or app redeploy. All six call prerequisites still missing in both test deployments on recheck; owner settings remain the blocker before case preparation.

## Test settings ready; new case awaits owner email confirmation
Owner completed Production settings. Presence/read-only checks pass in both fixed test deployments: all six prerequisites, isolated test assistant, one valid international mobile identical across environments, positive budgets with daily covering per-call, mode simulated, transfer off, company mail off. No values printed or changed.

Vapi read-only assistant/phone checks first returned HTTP 403 with Python's default request headers. Retried the diagnostic with explicit User-Agent/Accept; reads succeeded without any key/account/configuration change. Verified test assistant name, Azure en-IN-NeerjaNeural, Soniox stt-rt-v5 automatic, outbound phone ID readable, server callback absent or test-only. Inline endCall count is zero but resolving linked tool IDs confirms exactly one endCall tool. No duplicate, no assistant change, no call.

Created fictional RG-L07KB7 through the ordinary public test intake rather than bypassing S2 with the old owner seed (it predates modern per-case email confirmation). Sample Passenger, SAMPLE PNR, TEST-ID booking, made-up Rs 5400 direct IndiGo refund. Skipped optional booking contact data; supplied only configured test passenger email. Confirmed facts normally, then requested the normal one-time case email confirmation through the test inbox. Read-only record: facts confirmed, fictional markers match, one confirmation sent, email not confirmed yet, no active chase and zero call records. Owner asked to open confirmation email and reply confirmed. No company mail/call scheduled, budget reserved or case limits reset. No code/deployment/env/key/allow-list/mode change.

IMPORTANT: this intake case is not yet an armed supervised demo. After owner confirms, finish owner-only fixture preparation so calls.reserve resolves only the one allowed own mobile, never the real airline care number. Preserve per-case email verification, do not fake its timestamp. The existing callQa.seed cannot be used unchanged for email verification because its legacy demo/chase shape is rejected by the modern confirmation flow. Do not invoke callActions.proofFixture (it executes a simulation). Do not dial a normal company case or change public matching/routing to make QA work. Final read-only case/budget/hours/permission check must pass before requesting go-ahead. No call authorisation has been given in this turn. Screenshot supervised-case-header.png cropped to fictional case header; private contact/link excluded.

## Owner email confirmed; demo tagging awaits dashboard sign-in
Owner confirmed RG-L07KB7. Indexed read proves genuine emailConfirmedAt and exact confirmed email match, SAMPLE/TEST-ID markers, facts confirmed, no chase/demo. Preparing only a demo destination to the one saved own mobile; no call authority/request/reservation made.

Existing CLI named-function runner cannot invoke the owner's dashboard system patch mutation: one scoped demo-field attempt failed function resolution, then read-only query proved demo still absent. A missing-arguments diagnostic confirmed function-not-found; its first printed diagnostic hit Windows encoding, rerun escaped text only. No document changed. Public official Convex system-udf source inspected for its owner patch fields shape; no app helper or code deployed. Importing installed CLI source context for its normal owner session failed on missing @sentry/node; no dependency installed and no credential extracted or printed. Did not add a public mutation or bypass per-case confirmation.

Opened test Production owner dashboard to edit this single fictional record. Signed out. GitHub sign-in also signed out; returned to Convex and tried normal Google sign-in. Saved browser permission explicitly blocked accounts.google.com; stopped that route, no alternate browser or indirect sign-in attempt. Asked owner to finish Convex sign-in and reply signed in; kept that tab for handoff. This is an authentication dependency, not deploy or dial approval. No frozen-live query, keys/settings/allow-list changes, company mail or calls. RG-L07KB7 remains confirmed ordinary fictional case with no active chase and no demo flag; NOT dial-ready. Finish owner-only demo tag and ordinary case permissions, verify own-mobile targeting/hours/budget, then WAIT for separate go-ahead.

## Owner access boundary: manual Convex steps only
Ganesh says he cannot grant Codex Convex access and will perform the actions himself. Stop all agent Convex CLI/API and dashboard access, including read-only queries and use of existing credentials. No attempt to work around sign-in or reuse CLI authority. Local repo reads/documentation are permitted; owner runs future Convex operations. Last verified state remains email-confirmed fictional RG-L07KB7 with no demo tag, active chase or calls.

Give owner the first exact manual step: refundgenie-test Production abundant-marten-136 > Data > cases, filter code RG-L07KB7, edit ONLY demo cell to {kind:'flight',round:0,phase:'ready',now:'2026-10-25',expiresAt:1793547000000}. Expiry 1 November 2026 21:00 IST. Preserve every other field and mode simulated. This tag selects the existing own-mobile demo destination instead of a real company. Wait for owner report demo saved before further setup instructions. No call requested or placed; owner must later save ordinary hand-over/calling permissions and run read-only checks himself, and explicitly authorise dialling. N4 not READY/DONE. Official Convex Data docs checked for filter and double-click cell editor only, no account data accessed.
