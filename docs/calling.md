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
- CALL_MAX_COST_USD: reserve the maximum full 25-minute call cost, including the second transfer leg, at your configured rate. Missing/zero budget blocks live calls. Failed attempts consume the daily count and reservation. No automatic retry.
- VAPI_MODEL_PROVIDER and VAPI_MODEL: optional call-only model settings. Leave both unset. Calls default to Vapi OpenAI GPT-4.1 Mini, including the transfer assistant.
- GEMINI_MODEL stays at the already approved model for reading, planning and drafting. It is not used for calls.

No webhook secret is needed: this module reads call status directly with the private API key. It uses only the number behind the Vapi ID; no phone carrier is named or hard-coded. The saved assistant should support English/Hindi. Code selects the call model using those two optional settings, without sending a Gemini key to Vapi. Per-call instructions, 25-minute stop, DTMF and a short assistant-based warm transfer are applied by code.

First test: save two phones in CALL_ALLOWLIST, in order: the first is the passenger, the second answers as the demo airline. Explicitly approve one supervised demo call during Monday to Saturday, 10:00 to 18:00 IST. Use sample data and verify the opening, safe transcript, next step and confirming mail, then test the patch-in between the two phones. Nothing after the transfer is kept, and a private verification or transfer call has no saved recording link. With only one saved number, the call record says the patch-in cannot be tested. Live transport and actual phone transfer are untested until that supervised test. Do not set live while expecting a simulated-only session. Missing either Vapi key or phone ID forces simulated even if CALL_MODE says live.

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
