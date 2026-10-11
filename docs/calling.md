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
- GEMINI_MODEL stays at the already approved model. Do not change it to enable calls.

No webhook secret is needed: this module reads call status directly with the private API key. It uses only the number behind the Vapi ID; no phone carrier is named or hard-coded. The saved assistant should use the already approved model and support English/Hindi. Per-call instructions, 25-minute stop, DTMF and a short assistant-based warm transfer are applied by code.

First test: explicitly approve one demo call to your own allow-listed mobile during Monday to Saturday, 10:00 to 18:00 IST. Use sample data and verify the opening, recording, safe transcript, next step and confirming mail. Live transport and actual phone transfer are untested until that supervised test. Do not set live while expecting a simulated-only session. Missing either Vapi key or phone ID forces simulated even if CALL_MODE says live.

Stop Genie prevents future call starts and stops polling calls at their next status check. An active call receives an end request. No company number is substituted for your test number. Only IndiGo's own complaints page has been checked for a care number in this change; other company numbers stay unavailable until checked. No menu-key sequence has been verified: listen instead of guessing.

## Add a demo recording (admin only)

Save a local JSON file outside tracked paths with callId, url and transcript. It must contain only sample details and no private verification data. Run:

```powershell
node --import tsx scripts/attach-demo-call.mts C:\path\outside-repo\sample-recording.json
```

The script uses your existing authenticated Convex CLI. There is no public upload endpoint. A recording with sensitive verification requests is rejected. The saved transcript is redacted. The original call mode stays simulated; the recording is labelled role-play. Delete the local input afterward if it contains a private link.

Sources checked 11 Oct 2026: [Vapi warm transfer](https://docs.vapi.ai/calls/assistant-based-warm-transfer), [call API](https://docs.vapi.ai/api-reference/calls/create), [server authentication](https://docs.vapi.ai/server-url/server-authentication), [IndiGo complaints](https://www.goindigo.in/contact-us/complaints.html). No live API request was made for this build.
