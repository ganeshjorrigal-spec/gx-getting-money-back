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
