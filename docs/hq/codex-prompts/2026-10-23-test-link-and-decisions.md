# Codex prompt: tag the submission, set up the test link, log the next-build decisions

From Claude HQ, 23 Oct 2026. Read AGENTS.md first as usual, then this whole prompt before doing anything.

## Why this prompt

refundgenie.app was submitted to GrowthX and must stay exactly as it is until reviews end. Real visitors keep using it as it is. The next build happens on a separate public test link with its own Convex project. Nothing in this prompt may change the live site, the live Convex deployment, or main on GitHub.

Today's live setup, so you know what not to touch: the live site's backend is the Convex deployment in the current `.env.local` (it is the "development" deployment, deployed with `npx convex dev --once`), its front end is the Cloudflare Worker `refundgenie-web` on refundgenie.app, and there is also a static copy on that deployment's .convex.site address.

## Hard rules for this prompt

1. Never run `npm run deploy`, `npm run deploy:web`, `wrangler deploy`, `npx convex dev`, `npx convex deploy` or any static-hosting upload from the existing repo folder.
2. Never change Convex environment settings on the live deployment. Never change Cloudflare.
3. Never push to `main`. All new commits go to a new branch `next`.
4. Do not touch PRODUCT.md. Ganesh will add the new version himself.
5. Ganesh sets every key and secret himself. Never ask him to paste a key into the chat, and never write one into a file other than the git-ignored env files.
6. Stop and ask Ganesh at every "STOP" below.

## Part A: tag the submitted commit

1. In the existing repo folder, run `git pull` (it should fast-forward to 6153907 "Add DESIGN.md").
2. Show Ganesh `git log --oneline -3` and confirm that 6153907 is the latest commit on main.
3. STOP. Ask: "Shall I tag 6153907 as submitted-v1 and push the tag?" Only after he says yes:
   `git tag -a submitted-v1 6153907 -m "Submitted to GrowthX"` then `git push origin submitted-v1`.
4. Show him the tag on GitHub: https://github.com/ganeshjorrigal-spec/gx-getting-money-back/tags

## Part B: a separate folder and a separate Convex project for the test link

1. Make a second copy of the repo in a new folder next to the current one, for example `gx-getting-money-back-next`, with `git clone`. Work only in this new folder from now on. In it, create and switch to branch `next` from main.
2. Copy `.env.local` and `.env` from the old folder only if Ganesh says so, and then remove every line that points at the live Convex deployment (`CONVEX_DEPLOYMENT`, `NEXT_PUBLIC_CONVEX_URL`, `CONVEX_SITE_URL` and the like). Show him the list of setting names you kept, never their values.
3. STOP. Walk Ganesh through creating a new Convex project, click by click: open https://dashboard.convex.dev, top left team menu, "Create project", name it `refundgenie-test`. Then, in the new folder, run `npx convex dev --once --configure new` (or the current equivalent) and pick that project when asked, so the new folder's `.env.local` points only at it. Confirm by showing the deployment name it wrote (not secrets).
4. Make a list for Ganesh of every Convex environment setting the app reads, grouped, with one line each on what it is for and whether the test project needs it now. Use the names from `convex/`, `lib/` and `.env.example`. Mark these clearly:
   - Needed now: GOOGLE_GENERATIVE_AI_API_KEY, GEMINI_MODEL, GEMINI_PAID_TIER, TOKEN_ENC_KEY (a new random value, not the live one), PUBLIC_APP_URL (the new project's .convex.site address), FREE_LANDED_REFUNDS.
   - Razorpay: test-mode keys only on this project.
   - Calls (VAPI_API_KEY, VAPI_ASSISTANT_ID, VAPI_PHONE_NUMBER_ID, caps): set later, before milestone N4.
   - Gmail case inbox and demo desk (GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, TICKBACK_INBOX_ADDRESS, TICKBACK_DEMO_ADDRESS, GMAIL_TEST_ACCOUNTS, CHASE_*): leave unset for now. Do not connect the live case inbox to the test project, because two deployments reading one inbox could act twice on the same reply. HQ and Ganesh will decide on a test inbox before milestone N6.
   Ganesh sets these in the Convex dashboard himself (new project, Settings, Environment Variables). Give him the exact clicks.
5. Deploy the test link from the new folder only: `npx convex dev --once`, then the static-hosting upload to the new project (same command the `deploy` script uses). Do not run anything that touches Cloudflare.
6. Check the test link: open the new project's .convex.site address and confirm /, /start/, /cases/ load, and that a pasted sample cancellation mail reaches the free check card. Mail-sending parts (demo mails, case link mails) are expected to be off until the Gmail settings exist; say so, don't work around it. Also confirm refundgenie.app still serves the same Cloudflare version as before (STATE.md records version 69504117) and that you deployed nothing to it.
7. Add one line to the new folder's README under "Test link": the test address, that it is the next-build environment, and that live deploys must never be run from this folder until HQ says reviews are over.

## Part C: log the next-build decisions (HQ-authored text, written by you on HQ's instruction)

AGENTS.md says these files belong to HQ. For this prompt only, HQ asks you to write them, on branch `next`, exactly as given.

1. Append these entries to DECISIONS.md, unchanged:

- D-062 | 2026-10-23 | Freeze and test link. refundgenie.app, its Convex deployment and the Cloudflare Worker stay exactly as submitted (tag submitted-v1 on 6153907) until GrowthX reviews end. All next-build work happens on branch `next`, in a separate folder, deployed only to the Convex project `refundgenie-test` and its .convex.site address. main is not pushed during the freeze. | Ganesh, 23 Oct, after Shaktimaan's advice. | ACTIVE
- D-063 | 2026-10-23 | Officer mails stay in the passenger's name (D-043 kept). Genie sends care-level mails itself with the passenger's OK, with the passenger in CC and a signed one-line note that the passenger allowed Genie to write. Mails to a Nodal Officer, Grievance Officer or Appellate Authority are drafted by Genie and sent by the passenger in one tap. | Ganesh, 23 Oct. | ACTIVE
- D-064 | 2026-10-23 | One intake card. Supersedes D-046 and D-051. The first card asks for a screenshot of the airline mail (or its text) and one email. After reading, the same card shows what Genie read as pre-selected choices (airline, where booked, who cancelled) and at most three questions for what it could not read, under one Continue. The demo follows the same card. | Ganesh, 23 Oct, from Sumit's test (confused twice by one question per screen and two Continue buttons). | ACTIVE
- D-065 | 2026-10-23 | Name and booking facts. Supersedes D-024 (amended) and the "asked at intake" part of D-059. No name on the first screen. Route and name on ticket are still read from the screenshot at intake; the name is confirmed on the hand-over card ("We read: S. Singh. Right?"), and asked there only if it was not read. The booking mobile stays optional, on the hand-over card, only when calling is switched on, with its tick. | Ganesh, 23 Oct, from Sumit: "why should I give my name now?" | ACTIVE
- D-066 | 2026-10-23 | One email field: "Your email, so Genie can mail you (best: the one the ticket mail came to)". It is the case email for CC and updates. A first Genie mail goes to it within a minute of the first card, with the case link, the next date and a one-tap confirm. Genie CCs only a confirmed email on company mails. | Ganesh, 23 Oct. | ACTIVE
- D-067 | 2026-10-23 | Not-due cases. Amends D-042. On the day after the due date, at 10:00 IST, Genie sends exactly one mail to the confirmed case email with "It came" and "Not yet, chase it". Genie never moves a not-due case up the ladder on its own; it waits for "Not yet, chase it" or an active hand-over. A case may be handed over before its due date, but Genie sends nothing to the company before the date. | Ganesh, 23 Oct. | ACTIVE
- D-068 | 2026-10-23 | Calling on the hand-over card. Amends D-056. Calling is an optional switch on the hand-over card; when on, Genie calls IndiGo in the next slot (Monday to Saturday, 10:00 to 18:00 IST), queued if tapped outside hours. Caps, per-day limits and the disclosure rule stay. The "Ask Genie to call" button stays for later calls. | Ganesh, 23 Oct. | ACTIVE
- D-069 | 2026-10-23 | Never quiet. While a case is open, the passenger gets a Genie mail at least every 5 working days, after every reply Genie reads, after every follow-up Genie sends, and after every call. Update mails go to the confirmed case email without CHASE_ALLOWLIST (like D-057). A company mail that bounces, or gets no reply in 5 working days, shows on the case. | Ganesh, 23 Oct. | ACTIVE
- D-070 | 2026-10-23 | Next-build order and success measure. Milestones N1 to N8 in MILESTONES.md, from PRODUCT.md section 7. N1 (5 overdue cases started by 6 Nov) is Ganesh's outreach, not code; N2 to N4 are built first because real cases hit them. Success measure and the 6 Nov stop line as in PRODUCT.md section 5. | Ganesh and Shaktimaan, 23 Oct. | ACTIVE

2. Replace the current-milestone part of MILESTONES.md with the block below. Keep older milestones as history underneath, unchanged.

```
## Current: next build (N1 to N8), on branch next and the test link only (D-062)

N1. I can show 5 overdue cases started on Genie by 6 Nov, each with its due date already passed on the day it started. Owner: Ganesh (outreach). No code.

N2. I can paste a "we paid MakeMyTrip" reply into a case on the test link and see Genie's update mail land in my inbox, saying who holds the money now.
Acceptance: a mocked-transport test with a confirmed case email that is NOT on CHASE_ALLOWLIST gets exactly one update mail; the demo still works; every update mail ends with what Genie does next and when (D-069).

N3. I can set a test case's due date to yesterday and get exactly one Genie mail asking if it came, with my case still at its first step.
Acceptance: convex-test with a fake clock, for a handed-over and a not-handed-over WAIT case: one check fires per day at most, the ladder does not move, exactly one mail with "It came" and "Not yet, chase it" (D-067). Covers the suspected repeat-fire bug where checkins.fire calls chase.advance on a WAIT case and reschedules itself for "now".

N4. I can play back a test call where Genie tells the first live person it is an AI calling for me, doesn't say any line twice, and doesn't ask for anything it already gave.
Acceptance: a transcript checker script runs on saved call results and on 3 fixtures (menu then person; transfer to a second person; care asks for an OTP): disclosure is the first Genie line after the first care line; no Genie sentence repeated (normalised); no re-ask of PNR, route or name already in known facts; at most one re-ask per question. Voice, language, transcriber and interruption settings are written down in docs/calling.md with their exact values (or moved into assistantOverrides), so they can be reviewed. One supervised call on the test project passes the checker.

N5. I can get a mail within five minutes of a call that says what care told Genie, and if care wants me, the number, the menu choices and the reference to quote.

N6. I can hand over an overdue case and see Genie's first mail go to the company's care team with me in CC, and the officer's mail ready for me to send in one tap (D-063). Needs a test case inbox decision first.

N7. I can add only a screenshot and my email on one card and see who has my money, what Genie does next, and Genie's first mail in my inbox (D-064, D-065, D-066).

N8. I can close it, reopen my case from the link in Genie's mail on another phone, and everything, including the calls, is still there.
```

3. Commit on `next` with a clear message, then push the branch: `git push -u origin next`. Do not push main.

## Stop after Part C

Do not start N2 yet. Update STATE.md and today's log on `next` with: the tag, the test project name and address, the list of settings Ganesh still has to set, and anything that did not go as written. Then tell Ganesh, in plain words, what is done and what he has to do next.
