# N4 settings inventory, read only, 25 October 2026

The saved Vapi assistant was inspected after Ganesh signed in. Nothing was edited or published in Vapi. These are observed settings, not evidence that refundgenie-test has made a call. The older setup notes follow below; this inventory supersedes conflicting historical values.

| Setting | Observed saved assistant value |
| --- | --- |
| Published version | v4, 100% traffic |
| Voice | Vapi Elliot, Version 2 |
| Voice primary language | Automatic |
| Voice speed | 1.10 |
| Transcriber | Soniox STT RT v5 |
| Transcriber languages | Automatic |
| Transcriber Intelligent Turn-Taking | Off |
| Transcriber End-of-Turn Wait | 1.5 seconds |
| Background Denoising | Off |
| Fallback transcriber | Deepgram Nova 2, English (India) |
| Start Speaking / Wait seconds | 0.4 |
| Start Speaking / Smart Endpointing | Off |
| Endpointing on punctuation | 0.1 seconds |
| Endpointing with no punctuation | 1.5 seconds |
| Endpointing on number | 0.5 seconds |
| Stop Speaking / Number of words | 0 |
| Stop Speaking / Voice seconds | 0.2 |
| Stop Speaking / Backoff seconds | 1 |
| Saved assistant model | OpenAI GPT-4.1 |
| Saved assistant maximum duration | 600 seconds |

The app overrides the model with OpenAI gpt-4.1-mini by default (existing optional VAPI_MODEL_PROVIDER/VAPI_MODEL settings take precedence), and maximum duration with CALL_MAX_MINUTES (default and ceiling 12 minutes). Those are existing rules, unchanged in N4. No environment values were inspected for this inventory, so the effective model of a future test call must be checked on its actual Vapi call record. Voice, transcriber and turn-taking values are inherited from the selected assistant; the app does not currently override them. Do not copy this shared assistant into the test project or connect any live mailbox as a side effect of N4.

No required dashboard-only change was identified. The provider documents API configuration for [Vapi voices](https://docs.vapi.ai/providers/voice/vapi-voices), [Soniox](https://docs.vapi.ai/providers/transcriber/soniox), and [voice pipeline settings](https://docs.vapi.ai/customization/voice-pipeline-configuration). The observed voice/language/timing values remain unchanged pending audible supervised proof. Transcript text alone cannot prove pronunciation, interruption timing or voice quality. No tuning is claimed.

For read-only owner review: Assistants > Refund Genie Recovery Agent > published version > Assistant > Voice or Transcriber. Advanced > Start Speaking Plan and Stop Speaking Plan shows the timing values. Do not click Edit, Save or Publish as part of reviewing this inventory. If a later agreed change can only be made in the dashboard, stop and give Ganesh the exact control and value before changing anything.

## N4 conversation rules and proof

The app now instructs Genie to keep a speaker/fact/question ledger: a menu is not a person; disclose AI, passenger permission and recording before responding to the first live person; use varied disclosure with a new person; never ask for confirmed PNR, name or route; never restart questions after hold or a transfer; at most one re-ask per missing answer; do not repeat complete sentences. OTP and other private-code verification always require a callback, even when the legacy transfer option exists. No tool, model, duration, budget or calling setting changed.

Three fictional transcripts cover menu then human, a second human, and an OTP request. They test the checker and intended script only, not a model-generated call. Baseline scores are frozen separately from current scores in docs/qa/n4-2026-10-25/. The original saved 17 October call is scored in memory; only counts and rule/turn indexes are stored. No private transcript, recording, contact details or booking values enter the repository.

Run current examples with `node --import tsx scripts/check-call-transcript.mts --fixtures`; add `--baseline` for frozen pre-change examples. For a private saved call, pass JSON through `--stdin` or `--file` outside the repository. The checker uses text heuristics, requires human review of boundaries and cannot establish consent, audio quality or production correctness by itself. The required supervised call is still pending and must not start without Ganesh's separate go-ahead.

---

# Calling setup

Calling defaults to simulated. A simulated call never requests Vapi. It uses a saved transcript and the normal reply reader and confirming-mail path. Every record and screen says Simulated demo call. No real-company calling is enabled.

## How to turn calling live

Ganesh sets these in the existing Convex deployment's Environment Variables screen, never in code or chat:

- CALL_MODE: live only after you approve a live test. Missing or any other value means simulated.
- VAPI_API_KEY: your private Vapi key.
- VAPI_PHONE_NUMBER_ID: the outbound number's ID in Vapi.
- VAPI_ASSISTANT_ID: your saved Refund Genie Recovery Agent assistant ID.
- CALL_ALLOWLIST: exact approved test phone numbers, in international form beginning with +. Include the destination and passenger patch-in number. Neither the app nor Codex adds numbers.
- CALL_DAILY_CAP_USD: your maximum daily call budget in US dollars.
- CALL_MAX_COST_USD: reserve the maximum permitted call cost at your configured rate; calls stop at 12 minutes by default, including hold. Missing/zero budget blocks live calls. Failed attempts consume the daily count and reservation. No automatic retry.
- VAPI_MODEL_PROVIDER and VAPI_MODEL: optional call-only model settings. Leave both unset. Calls default to Vapi OpenAI GPT-4.1 Mini, including the transfer assistant.
- GEMINI_MODEL stays at the already approved model for reading, planning and drafting. It is not used for calls.

No webhook secret is needed: this module reads call status directly with the private API key. It uses only the number behind the Vapi ID; no phone carrier is named or hard-coded. The saved assistant should support English/Hindi. Code selects the call model using those two optional settings, without sending a Gemini key to Vapi. Per-call instructions, a maximum 12-minute stop and DTMF are applied by code. Passenger transfer defaults off; do not enable it for N4. An optional legacy transfer path remains in code, but private-code verification always requires a passenger callback.

N4 supervised test: only after Ganesh explicitly approves, inside calling hours, on refundgenie-test and to his own mobile. Never call IndiGo or another company without his direct yes in chat. He controls CALL_MODE and the approved numbers; Codex changes neither. No passenger patch-in test is part of N4. Reuse the existing server permission, confirmation, hours, budget and per-case guards. A simulation never proves real voice quality. Missing either Vapi key or phone ID forces simulated even if CALL_MODE says live.

Stop Genie prevents future call starts and stops polling calls at their next status check. An active call receives an end request. No company number is substituted for your test number. Only IndiGo's own complaints page has been checked for a care number in this change; other company numbers stay unavailable until checked. No menu-key sequence has been verified: listen instead of guessing.

## Add a demo recording (admin only)

Save a local JSON file outside tracked paths with callId, url and transcript. It must contain only sample details and no private verification data. Run:

```powershell
node --import tsx scripts/attach-demo-call.mts C:\path\outside-repo\sample-recording.json
```

The script uses your existing authenticated Convex CLI. There is no public upload endpoint. A recording with sensitive verification requests is rejected. The saved transcript is redacted. The original call mode stays simulated; the recording is labelled role-play. Delete the local input afterward if it contains a private link.

Sources checked 11 Oct 2026: [Vapi warm transfer](https://docs.vapi.ai/calls/assistant-based-warm-transfer), [call API](https://docs.vapi.ai/api-reference/calls/create), [server authentication](https://docs.vapi.ai/server-url/server-authentication), [IndiGo complaints](https://www.goindigo.in/contact-us/complaints.html). No live API request was made for this build.

## Public flight demo
The public demo always runs a simulated call, even when CALL_MODE is live. It checks the saved CALL_ALLOWLIST and sample calling permission. No visitor phone is requested or dialled. Test mail recipients are selected only from the existing CHASE_ALLOWLIST; the public sample PDF uses made-up contact details, never an operator's real details. Two actual demo-desk mails/replies share the existing Gmail thread; the normal reader handles both and the safe simulated care transcript.

Until a role-play recording is attached, the Play button reads the saved fixture aloud using the browser's speech playback, with a visible simulated label. The complete transcript remains readable if playback is unavailable. Attaching an admin-approved, reference-ending demo role-play recording makes its link available to later public demos; use sample details only and a link intended for public playback. It is labelled role-play and never changes the call's simulated mode. Identity-check recordings are not reused.


## Superseding HQ review fixes, 25 October 2026

This section supersedes the earlier N4 prompt and the shared-assistant inventory for the isolated test assistant. No shared/live assistant, env, key, phone allow-list, budget, model or transfer setting was changed. No new call or publication in this fix session.

### Two-minute ending investigation (reported before code changes)

refundgenie-test Production has CALL_MAX_MINUTES unset; callMaxMinutes defaults to 12 and caps at 12. Both actual Vapi call records carry assistantOverrides.maxDurationSeconds=720. The selected isolated assistant has no saved maxDurationSeconds override. Both endedReason values are assistant-ended-call, with the linked end_refund_support_call/endCall tool invoked, not exceeded-max-duration, silence-timed-out or a budget failure. Provider startedAt/endedAt measure 131.60 and 118.78 seconds. The saved 120/120 figures were poll-attempt estimates. Future completed records use valid provider timestamps, with the existing conservative estimate only when timestamps are missing/invalid. Historical database records are not rewritten; the corrected evidence is in the log.

No duration setting needs changing for a supervised test: the effective hard limit is already 12 minutes including hold. Budgets and the two-per-case-per-day limit remain unchanged.

### Small conversation fix

The per-call prompt now requires status plus reference plus date or money holder, two explicit refusals, care ending, or a completed verification callback handoff before an end tool call. Holds and acknowledgements are not refusals/results. Callback reference, number/channel and hours are asked separately. A one-sentence factual recap finishes before the tool is invoked. The complete polite close is supplied as the per-call endCallMessage fallback, because the isolated assistant's existing linked endCall tool has no messages. No second endCall tool is added and no shared tool is edited. Vapi documents this fallback at https://docs.vapi.ai/tools/hang-up . Actual audible completion still needs the supervised retest; unit tests cannot prove speech delivery.

A direct human who hears the opening has already heard AI/permission/recording disclosure. Repeat it after an IVR/menu or when a new person joins, not on every question. All instructions/ledger/reasoning stay private; identity replies use the supplied passenger name naturally. Credit shells are declined pending passenger agreement. Confirmed facts, private-code protections and transfer-off default remain intact.

### Voice auditions (owner picks)

Current isolated Refund Genie Test N4 is Azure en-IN-NeerjaNeural. Its Voice Settings panel shows Speed 1.00. It was already 1.00, so no edit was needed or made.

| Option | Provider / exact ID | Playable sample |
| --- | --- | --- |
| Neerja (female, current) | Azure / en-IN-NeerjaNeural | https://ai.azure.com/speechassetscache/ttsvoice/Masterpieces/en-IN-Neerja-General-Audio.wav |
| Prabhat (male) | Azure / en-IN-PrabhatNeural | https://ai.azure.com/speechassetscache/ttsvoice/Masterpieces/en-IN-Prabhat-General-Audio.wav |

Both samples were located and playback controls exercised in Microsoft's public https://speech.microsoft.com/portal/voicegallery with Language English (India), searching Neerja or Prabhat and using the ordinary voice, not the separate Indic or Dragon HD variants. Vapi's Azure voice catalog and Microsoft's language support identify these IDs. Azure's language is determined by the voice ID: https://docs.vapi.ai/providers/voice/azure and https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support . Samples are previews, not a phone-quality promise. No sample/audio was downloaded into the repository. Cartesia's Aarav preview was also explored, but two consistent Azure en-IN options suffice; no provider switch was made.

Exact dashboard path: Assistants > Refund Genie Test N4 (not Recovery Agent) > Assistant tab > pencil/Edit VOICE > Voice model Azure > Voice dropdown, choose En IN NeerjaNeural or En IN PrabhatNeural (or Custom voice ID with the exact ID above) > Speed 1.00 > Close panel > Publish. If a version dialog appears, publish only the isolated test assistant. Changing a voice waits for Ganesh's choice. Do not touch the model, phone or shared assistant.

Transcriber: Soniox stt-rt-v5, Automatic; fallback Deepgram nova-2, en-IN. Soniox exposes English en rather than en-IN; it supports automatic language detection/code switching. Recommendation: keep this configuration for the next comparison, since these two calls do not establish an accent-transcription failure. Do not assume a voice accent requires a matching locale on Soniox. If actual speech-to-text errors justify a later comparison, Deepgram English (India) is already the saved fallback. No transcriber or interruption setting changed. Source: https://docs.vapi.ai/providers/transcriber/soniox .

### Expanded checker and safe scores

Nine checks now include ending before a useful result, final closing fragments (including a tool goodbye following a fragment), spoken instructions and bundled questions. Completion is based on care-supplied facts, explicit refusals/end, or all three callback details, not Genie's assertions. It treats a direct opening as disclosure and distinguishes asking for PNR from asking refund status for a known PNR. An ended call supplies endedReason/status through the CLI. Partial snippets without an ending are not mistaken for prematurely ended calls.

Saved calls re-scored from original Vapi transcripts in memory: supervised-1 6/9; supervised-2 5/9. Counts/rule indexes only: docs/qa/n4-2026-10-25/hq-expanded-scores.json. Neither passes. Both flag repetition, early ending and bundled questions; second also flags excess re-asking. Known-PNR warnings from the former checker were false positives. Both pass textual final-sentence and spoken-instructions heuristics: the quoted incomplete phrases occur at turn 15 before further care/Genie turns (final turns 21 and 17). Thus this check does not corroborate a final audible cut; review audio for that question. Never turn a heuristic pass into proof of untested audio behaviour. Interruption timing and hold length require audio/owner observations.

N4 remains in progress. After owner-approved test publication and voice choice, wait for Ganesh's separate yes before one own-mobile supervised call. RG-L07KB7 has used both daily slots; do not reset counts or widen limits. A subsequent-day reuse or a fresh normally confirmed demo fixture is required. Retest: care asks PNR; interrupts; holds 20 seconds; says only passenger; supplies reference only when asked; offers a credit shell. No company call without separate direct chat yes.


### Voice choice saved after auditions
Ganesh chose Prabhat. Isolated Refund Genie Test N4 now uses Azure en-IN-PrabhatNeural, speed 1.00, verified by fresh Vapi GET; current v4, 100% traffic. Model and transcriber unchanged. No app release or call. An older browser draft showing Neerja was not published; use the current saved version and do not overwrite it with that stale draft.

## Prepared 26 Oct: supervised overnight option on refundgenie-test only

Ganesh approved preparing and testing this change in chat, with a STOP before publishing or calling. It is not deployed or enabled yet. The frozen submitted project is untouched.

Owner-only setting: CALL_SUPERVISED_DEMO_CODE. When its exact value is the selected RG case code, the server skips only the hours check for that unexpired, non-story demo on refundgenie-test. Scope is checked against Convex's system-provided CONVEX_CLOUD_URL: only abundant-marten-136.convex.cloud (test Production) and tangible-lemur-692.convex.cloud (test Development). Unset, wrong case, wrong project or non-demo means no exception. Public story demos remain simulated. No new public argument or UI switch.

After Ganesh approves publishing, and before he approves one call: publish only with npm run deploy:test; Ganesh sets CALL_SUPERVISED_DEMO_CODE to RG-T53DCT on refundgenie-test Production and sets CALL_MODE=live himself. Do not change CALL_REAL_ANY_HOUR or real-company hours. Fresh read-only checks must verify the selected demo, confirmed email, separate permissions, approved own mobile, unexpired case, current budget and remaining daily slots. Dial only after the separate go. Afterwards Ganesh removes CALL_SUPERVISED_DEMO_CODE and resets CALL_MODE=simulated. Leaving the code saved is not consent to another call.

Default demo hours remain 09:00 to the saved demo cutoff. Real-company hours and the existing separate real-hours override are unchanged. Email confirmation, both permissions, approved destinations, live mode, 12-minute duration cap, per-call/daily budgets, two calls per case per IST day, closed/expired case guards and transfer settings remain in force. Midnight still starts the next normal daily bucket, with no counter reset. No env/key/allow-list/provider change was made while building this patch.

Proof: test-first run 3 failed / 23 passed before source changes; final focused 55/55, full suite 625/625 across 79 files, type check and 16-page local export pass. Added 19 backend tests in the in-memory Convex test harness; no deployment, real reservation, queued job or provider call. Test suite includes both exact test deployments, wrong/unset code/project, real-company night/morning/evening/Sunday blocks, consent/confirmed email/phone checks, budget reservations and the third-call block, mode mismatch, closed/expired demos.
