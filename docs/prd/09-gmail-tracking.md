# 09 Gmail reply tracking and calendar alerts (5 Oct 2026)

Owner: Claude HQ. Decisions: D-021, amended by D-022. Codex builds this as M2.2, after M2.0 (hosting) and before M2.1. Where this file and files 01 to 08 disagree, this file wins.

## Route 1 (default, build first): CC a Tickback inbox

- Create one Gmail inbox for Tickback (Ganesh creates it, e.g. `tickback.cases@gmail.com`; Codex must not sign up). Every draft's mailto adds `cc=tickback.cases+TB-XXXXXX@gmail.com` (plus-addressing keeps the case code). Tell the user in the send sheet: "We've added our case inbox in CC so we see their reply. You can remove it."
- Tickback reads **its own** inbox through the Gmail API (Ganesh's consent, once, for that account only), every 10 minutes from a Convex cron, and matches mail by the `+TB-XXXXXX` address or the `[TB-XXXXXX]` subject code.
- On a match: same steps as below (store redacted reply, re-triage, next step ready, reply alert).
- To reach the user, ask for **Google Calendar permission only** (`calendar.events`) after the first Mark sent: "Want an alert on your calendar when they reply?" This also lets Tickback create and move check-ins. Without it, the case page banner and the calendar links still work.
- Limit: an organiser who replies only to the sender (not reply-all) won't reach us. The case page says: "If they replied to you only, paste it here or connect Gmail."

## Route 2 (opt-in): connect the user's Gmail

The rest of this file describes Route 2. Offer it as a secondary option on the same card: "Catch every reply: connect Gmail."


## The job

The user sends the drafted email from their own Gmail. Then they have to keep checking Gmail for the organiser's reply, and they miss it: notifications are off, or the reply is buried. With the user's permission, Tickback watches for that reply. When it arrives, Tickback reads it, prepares the next step and puts an alert on the user's Google Calendar so they see it.

Two kinds of calendar event, kept separate:
1. **Reply alert.** Made the moment a reply is found. Its only job is to reach the user: "BookMyShow replied about your ₹3,500 refund. Your next step is ready." It starts 5 minutes after detection, lasts 15 minutes, with a pop-up reminder at the start.
2. **Follow-up check-in.** The dated reminders we already plan (due date, +2 or +3 working days after sending). For connected users Tickback now creates, moves and deletes these itself through the API, instead of the add-to-calendar link. This also fixes red-team B4 (stale reminders) for connected users.

Users who don't connect keep today's flow: calendar links, and "They replied? Paste it."

## When we ask

Only after value. Show the connect card right after the user taps **Mark sent** on their first email (the first moment there is a reply to wait for). Never before the first answer and never as a gate.

Card copy:
- Title: **Want us to watch for their reply?**
- Body: When BookMyShow replies to this email, we'll read that reply, get your next step ready, and put an alert on your Google Calendar so you don't miss it.
- What we read: Only replies to this refund email. Nothing else in your inbox.
- Button: **Connect Gmail** · Secondary: **No thanks, I'll check myself**
- Before the Google screen: Google will show "Google hasn't verified this app" because we're new. Tap **Advanced**, then **Go to Tickback**. You can disconnect any time.

On the case page after connecting: "Watching for BookMyShow's reply" with **Disconnect Gmail**.

## How it works

- **Google OAuth (web server flow).** The redirect goes to a Convex HTTP action at `https://<deployment>.convex.site/oauth/google/callback`. Request offline access (refresh token). Use `state` to bind the flow to the case (a random value stored in Convex with the case ID; never the case secret).
- **Scopes, the minimum:** `https://www.googleapis.com/auth/gmail.readonly` (restricted) and `https://www.googleapis.com/auth/calendar.events` (sensitive). Before building, Codex checks Google's scope list for a narrower calendar scope that still alerts on the user's main calendar; if one exists, use it and note it in the log. Do not request gmail.modify, gmail.compose or full calendar.
- **Matching the reply.** Put the case code in every draft subject: `Refund for booking BKMY12345 (Monsoon Live) not received [TB-TB7RDQ]`. After the user marks sent, find their sent message with `in:sent subject:"TB-TB7RDQ"` and remember its `threadId`. A reply is any later message in that thread not sent by the user. Fallback if the thread is not found within 24 hours: messages after the send date `from:` the platform's sender domains in `routeKb` that mention the booking ID. Read nothing else.
- **Polling.** A Convex cron every 10 minutes checks connected, open cases only, using `messages.list` with the query above and the thread. Stop watching when the case closes, is deleted, the user disconnects, or 45 days pass.
- **On a reply:** store the reply text (redacted on the server, like pasted input) as a case input, run the existing reply re-triage, prepare the next draft, create the reply-alert event, and show a banner on the case page. One alert per reply; never repeat an alert for the same message ID.
- **Calendar events.** Event title: `<Platform> replied about your ₹<amount> refund` (reply alert) or the existing check-in titles. Description: one line on the next step and the case link. Set `reminders.useDefault=false` with a pop-up at 0 minutes. Store each event ID so Tickback can move or delete its own events. Never touch other events.
- **Tokens.** Encrypt the refresh token with AES-GCM via `crypto.subtle`, key in Convex env `TOKEN_ENC_KEY`. Never log tokens. On disconnect, case close or delete: revoke at Google, delete the token, delete our future events.
- **Gmail only.** If the user didn't send from Gmail, the thread isn't found; after 24 hours show "We couldn't find your sent email in Gmail. Did you send it from another address?" and fall back to paste.

## Limits we accept for the sprint (D-021)

- The app stays **unverified** with Google. Users see Google's warning screen, and Google caps unverified apps at **100 new users in total**. Verification for a restricted Gmail scope needs Google's review and a security assessment; that is after the sprint and only if this works.
- Publishing status must be **In production**, not Testing. In Testing, only listed test users can sign in and refresh tokens expire after 7 days, which would stop tracking mid-case.
- Gmail content goes to Gemini for re-triage, so **Gemini paid tier is required before any real user connects** (paid tier keeps content out of Google's product improvement). `GEMINI_PAID_TIER=true` before launch.
- Privacy page gets a Gmail section: what we read, why, how long we keep it, how to disconnect, and Google's "Limited Use" wording.

## Ganesh does once (about 15 minutes, in Google Cloud Console)

1. Open console.cloud.google.com with the Google account that owns the Gemini key. Use the same project or create one named Tickback.
2. Enable **Gmail API** and **Google Calendar API**.
3. OAuth consent screen: External; app name Tickback; support email; app home page and privacy page URLs (the live site); add the two scopes above; then **Publish app** so status is In production.
4. Credentials: create **OAuth client ID**, type Web application. Authorised redirect URI: the Convex callback URL Codex gives you.
5. Put the client ID and secret into Convex env (`GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`) yourself, or paste them into `.env` for Codex to set. Never into chat, logs or markdown.
6. Create a **separate test Gmail account** for testing (Codex must not use ganesh.jorrigal@gmail.com, and may not sign up for accounts). Give Codex only its address; you sign in to it yourself during the test.

If Google refuses `convex.site` as an authorised domain, stop and tell HQ: the fallback is a custom domain (needs buying; Ganesh's decision).

## Tests

- Unit: subject code builder, matching rule, event payload builder, token encrypt and decrypt, the "never repeat an alert" rule.
- End to end with the test Gmail: make a case, send the draft from the test Gmail to a second address you control, reply from that address, and confirm within 10 minutes: reply stored, next step updated, one reply-alert event on the test account's calendar with a pop-up, and check-in events moved. Then Disconnect and confirm the token is revoked and future events deleted.
- Never send email from Tickback. Never send to a real organiser in tests.
