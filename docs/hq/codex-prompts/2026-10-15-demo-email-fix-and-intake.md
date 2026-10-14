# Codex prompt: fix the live demo email step tonight, then the demo intake (D-051)

Written by HQ, Thu 15 Oct 2026, 00:40 IST. Read D-046, D-048 and D-051.

## Part A, tonight: the live demo fails at the email step

Ganesh entered his own Gmail on refundgenie.app (deployed dd47738) and saw "Something went wrong on our side. Your answers are saved; try again." No confirmation mail arrived. The public demo cannot start for anyone.

1. Read the Convex logs for `demoEmailActions:request` on harmless-lyrebird-924 (`npx convex logs`, or the dashboard). Find the real error. Write it in the log without any address, key or token.
2. Likely places, from HQ's read of the code: `connectionByKind('demo')` missing or its `email` not matching `TICKBACK_DEMO_ADDRESS` in case or format; `encryptToken` key missing on this deployment; the Gmail send refused (scope). Do not change env values or keys. If the cause is an env value or a Google permission, stop and tell Ganesh exactly which one, in plain words.
3. Two bugs to fix in the same commit, whatever the cause:
   - **A failed send still uses up the limits.** `reserve` commits the device, address and overall counters before the Gmail send. If the send fails, give the three counts back and delete the unsent confirmation row (a small internal mutation called from the action's catch). Test it.
   - **The user sees a generic error.** If the demo mailbox can't send, show: "We couldn't send the confirmation mail just now. Try again in a few minutes." Add it to `lib/user-error.ts`.
4. Ganesh's attempt used 1 of his 3 address sends and 1 of 3 device sends today. Do not reset counters by hand; the fix above covers new failures only.
5. If the cause is clear and the fix is small: full suite, type check, export and the demo walk, then `npm run deploy` and `npm run deploy:web` (Ganesh authorises this publish for this fix only), and tell Ganesh to retry.
6. If it is not fixed by 01:45 IST, or the cause is an env value or Google permission: republish 2156ce9 (Convex, then Cloudflare) so the old demo works by morning, and log both versions. Ganesh authorises this rollback. After a rollback, live calling for today's supervised test must wait for a re-publish of the D-050 code, so say that clearly.

No calling settings, CALL_MODE, allow-lists, keys or env values. No real calls or real-company mail. Mark nothing DONE.

## Part B, Thursday after the supervised call: demo intake (D-051)

Do not start until Part A is closed and the supervised call is done. No publish until HQ review and Ganesh's line.

- The public flight demo runs the real flight intake: same questions, same order, same screens, step bar and collapsed summary (D-046), ask-once rule (D-044), then the same free check result and confirm screen.
- Typed by the user, no sample button: name, email (prefilled with their confirmed demo address, editable only by requesting a new confirmation), optional phone.
- "Fill sample" button on each of: PNR, booking ID, cancellation date, amount paid, flight. One "Fill all samples" link at the top of the facts step. Typing works on every field.
- Under the first facts field: "Use made-up details. This is a demo."
- Airline and booking site are fixed as Demo Air and DemoTrips, shown as read-only with "Demo roles, so no real company is involved."
- The free check, due date and the rest of the demo use what the user entered (cancellation date drives the due date, amount drives the amount shown). Validation as in the real flow (date in the past, amount in rupees, PNR format). A real PNR typed into the demo goes only to the demo desk, as today.
- Then sample permission, mails and the rest of the demo as today.
- Keep the whole demo under 4 minutes with "Fill all samples". Time it in the walk.
- Tests: typed facts reach the demo case and plan; sample buttons fill valid values; personal fields have no sample button; demo mails never name a real airline or site. Screenshots at 375px and 1280px of each intake step.

## Short paste block (Part A, tonight)

```
git pull. Do Part A of docs/hq/codex-prompts/2026-10-15-demo-email-fix-and-intake.md now: the live demo fails at the email step. Read the Convex logs, find the cause, fix the two listed bugs. If the fix is small and every gate passes, Ganesh authorises npm run deploy and npm run deploy:web for this fix only. If the cause is an env value or Google permission, or it is not fixed by 01:45 IST, republish 2156ce9 instead (authorised) and tell me. No env, key or calling changes. Do not start Part B. Mark nothing DONE.
```

## Part C, with Part B: landing and case screen polish (D-052)

Same timing as Part B: after the supervised call, one commit per item, no publish until HQ review and Ganesh's line.

1. **Header.** Logo left. Right: "Check my refund" button, then a hamburger menu with "How it works", "Try a demo", "Your cases". Same on phone and desktop. Menu opens as a small panel, closes on tap outside or Escape, keyboard and screen-reader friendly, tap targets 44px. Keep the gap between the header and the hero small.
2. **"Your cases" page.** Move the saved cases list and the old-address note from the landing to a new page `/cases/` (static export route; add it to the route checks). Empty state: "No saved cases on this browser yet." plus "Check my refund". Remove the section from the landing.
3. **Sample case loop.** The hero animation plays, rests on the final "It's in" frame for 3 seconds, then restarts. Pause it when the hero is off screen (IntersectionObserver). With reduced motion, show the final frame only. Check the speed score does not drop (one mobile Lighthouse run, local).
4. **The chase, collapsed.** On the case card, "The chase" shows only the newest entry. Under it a subtle link "See all N messages" opens the full list in place; "Hide" closes it. Same style as the D-046 summary link.
5. **Simulated call button.** Make the demo's play-call button a primary button: "Play the simulated call". Keep the "Simulated" label next to it, so it is never shown as a live call.

Tests and screenshots at 375px and 1280px for each item. The 17-step demo walk still passes.

## Short paste block (Parts B and C, after the supervised call)

```
git pull. Part A is closed. After the supervised call, do Parts B and C of docs/hq/codex-prompts/2026-10-15-demo-email-fix-and-intake.md: D-051 demo intake, then the D-052 polish, one commit per item. No publish, no npm run deploy, no env, key or calling changes. Mark nothing DONE. Update STATE.md, append the log with screenshots, push, then wait for HQ review.
```
