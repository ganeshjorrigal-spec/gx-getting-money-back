# HQ review: ask-once audit, landing restructure, demo fix, image drafts (to 3bcc856)

Reviewed Tue 13 Oct 2026, 21:15 IST, by Claude HQ. 286 tests pass (36 files), type check clean (run by HQ). Not yet published; the live site is still 4990087 (Ganesh's authorised publish at 19:57).

## Verdict

**Accepted with one fix required before publishing: landing performance.** Lighthouse at 375px: performance 79 to 74. LCP got worse (3.9 s to 5.3 s) and first paint got worse (1.3 s to 2.2 s); blocking time improved. Most likely the hero starts hidden for the animation, so the browser cannot paint the main content early. Fix in the next job.

## Ask-once audit: HQ answers to "For HQ"

- Name optional at Start, prefilled at permission: keep.
- Mobile at permission: ask for mobile only when the user gives calling permission (the patch-in needs it). Mail-only permission needs name and email only.
- The landing promise "nobody asks you again, not us and not the next customer-care person" cannot be guaranteed, as Codex says. Change to: "We ask your PNR and booking ID once for each case. Every mail and call Genie makes already carries them, so you are not asked to repeat yourself to us." Keep "What we never ask".
- Date precision, waitlist contact, received amount and reply dates: leave as they are.

## Demo fix

Public chase demo now mails a demo customer-care role; escalation shown as user-sent. Accepted.

## Image drafts

Mark 5 picked by Ganesh, with a change (D-045). Illustrations accepted with fixes (D-045).
