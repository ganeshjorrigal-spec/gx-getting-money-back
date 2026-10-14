# Live calling setup: step by step (Vobiz number + Vapi + Refund Genie)

For Ganesh. Written 14 Oct 2026. Never paste a password, SIP password or API key into chat, Codex or this repo.
Menu names in Vobiz may differ slightly; look for the closest match.

## What you need before starting
- The Vobiz number you bought (shows as active, not trial).
- Some balance in Vobiz.
- Your Vapi login.
- Two phones you can answer: Phone 1 acts as the passenger, Phone 2 acts as the airline.

## Part 1: Vobiz, create the SIP trunk (about 10 minutes)
1. Log in to the Vobiz dashboard.
2. Open Numbers (or Phone Numbers). Click the number you bought. Check its status says active or purchased, not trial.
3. Open SIP Trunks (sometimes under Voice or Elastic SIP Trunking). Click Create Trunk (or Add Trunk).
4. Name it: Refund Genie Vapi.
5. Choose outbound calling (termination) if asked.
6. Open the trunk's Authentication & Linking section:
   a. Create a credential: choose a username (for example refundgenie) and a strong password.
   b. Link (attach) the number you bought to this trunk, so it is used as the caller ID.
7. Save the trunk.
8. On the trunk's page, find its SIP domain. It looks like xxxxxxxx.sip.vobiz.ai (letters and numbers before .sip.vobiz.ai).
9. Write these three things in a private note on your own device (not in chat):
   - SIP domain (from step 8)
   - Username (from step 6a)
   - Password (from step 6a)

## Part 2: Vapi, connect the trunk (about 10 minutes)
1. Log in to dashboard.vapi.ai.
2. Left menu: Integrations. Find SIP Trunk Credentials. Click Add New Credential.
3. Fill in:
   - Name: Vobiz Refund Genie
   - Gateway (or SIP server / gateway URL): your exact SIP domain from Part 1 step 8. Do NOT use the general sip.vobiz.ai.
   - Username: from Part 1 step 6a
   - Password: from Part 1 step 6a
   - Turn ON "enable outbound calling".
4. Click Save.
5. Left menu: Phone Numbers. Click Add Number (or Create Phone Number). Choose BYO SIP Trunk Number.
6. Fill in:
   - Number: the Vobiz number you bought, with country code, for example +91XXXXXXXXXX.
   - Credential: Vobiz Refund Genie (the one you just made).
   - Label: Refund Genie Line
7. Click Import SIP Trunk Number.
8. Click the new number in the list. Copy its ID (a long code, near the top or in the URL). Keep it in your private note as VAPI_PHONE_NUMBER_ID.

## Part 3: Vapi-only test call (proves the line works before Refund Genie uses it)
1. In Vapi, click Make a Call (or Phone Calls, then New Call).
2. Outbound settings:
   - Destination: Phone 1, your own mobile, in +91 form.
   - Assistant: Test Caller (the throwaway assistant).
   - Caller ID / phone number: Refund Genie Line.
3. Click Make Outbound Call.
4. Result:
   - Phone 1 rings and the assistant speaks: the line works. Go to Part 4.
   - It does not ring: open Vapi, Call Logs, click the call, copy the Call ID and the "ended reason". Send both to Vobiz support with your number. If the ended reason contains 407, say: "Outbound from Vapi with my purchased number fails with 407. Please check my trunk credentials and that the number is linked to the trunk." Stop here; calls stay simulated.

## Part 4: Convex settings (only after Part 3 rang)
Important: the live site uses the Convex DEVELOPMENT deployment, named harmless-lyrebird-924 (our deploy command is `npx convex dev --once`). The dashboard may open on Production, which is empty for us.
1. Open dashboard.convex.dev and open the Refund Genie project.
2. At the top of the page, use the deployment switcher and choose Development (harmless-lyrebird-924). Not Production.
3. Left menu: Settings, then Environment Variables.
4. Check GEMINI_MODEL is listed (it should be, because the live site uses it). If it is not listed even here, stop and tell HQ before changing anything.
5. Add or update these (use Add for any that are missing):
   - VAPI_API_KEY = your Vapi PRIVATE key. In Vapi: click your organisation name (top left or bottom left), then API Keys (or Organization Settings, API Keys). Copy the Private key, not the Public key.
   - VAPI_ASSISTANT_ID = in Vapi, left menu Assistants, click "Refund Genie Recovery Agent", copy its ID (shown near the name or in the page address).
   - VAPI_PHONE_NUMBER_ID = the number ID from Part 2 step 8.
   - CALL_ALLOWLIST = Phone 1 and Phone 2 in +91 form, comma separated, Phone 1 first. Example format: +91AAAAAAAAAA,+91BBBBBBBBBB
   - CALL_MAX_COST_USD = 25 minutes x (Vapi per-minute rate + Vobiz per-minute rate) x 2 legs. Read both rates in each dashboard's billing or pricing page.
   - CALL_DAILY_CAP_USD = about two times CALL_MAX_COST_USD.
6. Do NOT set CALL_MODE to live yet. Leave it missing or simulated.
7. Save.
8. In Vapi, leave the "Refund Genie Recovery Agent" assistant on Vapi's own GPT-4.1 Mini. Do not add a Gemini key to Vapi. Vapi bills the model inside its per-minute charge (D-050). Codex changes the app so calls use this model instead of Gemini before the Thursday test.

## Part 5: Supervised in-app test (Thursday 15 Oct, between 10:00 and 18:00 IST)
The app only allows live calls Monday to Saturday, 10:00 to 18:00 IST.
1. Have Phone 1 and Phone 2 next to you, charged, with sound on.
2. Paste this to Codex:
   git pull. When I confirm the Vapi test call rang and Convex is set, do docs/hq/codex-prompts/2026-10-15-supervised-live-call.md: one supervised demo call between 10:00 and 18:00 IST, I set CALL_MODE myself, stop on any failure. No real company numbers, no env changes by you, no keys. Mark nothing DONE.
3. Tell Codex: "Vapi test call rang and Convex is set."
4. When Codex asks, set CALL_MODE = live in Convex Environment Variables and save.
5. What should happen:
   - Phone 2 (airline) rings. Genie says it is an AI calling for the named passenger, with permission, about a refund. Answer as the airline and ask for an identity check.
   - Genie says "I'll connect the passenger now" and Phone 1 rings. Answer and talk briefly.
   - Hang up. A confirming mail follows to the demo desk.
6. Straight after: set CALL_MODE back to empty or simulated in Convex and save. Tell Codex it is done.
7. If anything fails, Codex stops and reports. Calls stay simulated; Saturday's submission does not depend on this.

## Safety rules that stay on
- Only the two numbers in CALL_ALLOWLIST can be called.
- No real airline or travel-site number is called in this test.
- Genie never asks for or keeps an OTP; nothing said after the passenger is connected is saved.
