# Codex prompt: landing performance, audit answers, mascot and logo drafts, portal steps

Written by HQ, Tue 13 Oct 2026, 21:15 IST. Read `docs/hq/review-2026-10-13-landing-and-drafts.md`, D-043, D-044 and D-045. One commit per part. No Cloudflare publish, no `npm run deploy`, no calling settings, no keys, no live calls, no real-company mail. Mark nothing DONE.

## Part 1: landing performance (required before the next publish)

Lighthouse mobile at 375px went from 79 to 74, LCP 3.9 s to 5.3 s, first paint 1.3 s to 2.2 s. Get back to at least the old numbers.
- The hero text, headline and buttons must paint immediately at full opacity. Only the sample-case card animates, and it must render its first row visible from the first paint (no opacity 0 start on anything that could be the LCP element).
- Start the hero animation after first paint (for example after the load event or requestIdleCallback), not as a CSS animation that delays the first frame.
- Check font loading: preload only the weights used above the fold, `font-display: swap`.
- Lazy-load anything below the fold, including the brand logos and any images.
- Run Lighthouse three times before and after on the same machine and report the median. If it is still below 79, say what is left.

## Part 2: audit answers from HQ

- Calling permission asks for the mobile; mail-only permission asks for name and email only.
- Replace the landing promise with: "We ask your PNR and booking ID once for each case. Every mail and call Genie makes already carries them, so you are not asked to repeat yourself to us." Keep "What we never ask".

## Part 3: mascot, logo and scene drafts (D-045, approved, low quality only)

Use the existing image script, ledger and the 40-image cap (12 used). Low-quality drafts only; stop for Ganesh's picks.
- **Logo, 4 drafts:** Mark 5 (folded receipt cradled by a return arrow) where the return arrow is a genie's curling smoke wisp. Navy on warm paper, no text, must read at 32px. Put each beside the Fraunces wordmark at 32, 48 and 64px on the review page, next to the original Mark 5.
- **Mascot, 6 drafts:** an original friendly genie, cute but capable: round face, small calm smile, confident posture, holding a small paper receipt, a curling smoke wisp instead of legs. Navy outline, warm paper background, a soft amber glow; no other colours. It must NOT have blue skin, a black topknot or ponytail, a gold earring or pointed elf ears, and must not copy any existing character. Show each at full size and as a 64px head.
- **Scenes, 2 redrafts:** "on hold" and "refund coming" in the same style as the accepted set, with no airport departures board in either home. "Refund coming": the small mascot (use the style of the mascot drafts) floats beside the person, handing them a receipt.
- Add all of this to the review page and to a PDF export of it (Ganesh cannot open localhost from his chat). Stop. No finals, SVG, favicon or placement until Ganesh picks.

## Part 4: portal steps for Air India, MakeMyTrip, Goibibo

- **Air India direct bookings:** ask the e-ticket number once (13 digits, printed on the ticket; not the PNR), only for Air India direct bookings, with the line "Air India's refund form asks for it." Ask once: "Have you already asked Air India for this refund?" Yes gives subcategory "Status Check on Pending Refund", No gives "New Refund Request". Fill both into the portal card. Never ask again for the same case.
- **MakeMyTrip early status step:** MakeMyTrip's own contact page sends existing-booking queries to My Trips. Make the early status step a portal step: "Open MakeMyTrip, My Trips, this booking, Support", with the status text ready to paste (PNR, booking ID, amount, cancellation date, the ask). Source: the MakeMyTrip contact page you already checked.
- **Goibibo:** do the same only if Goibibo's own help pages describe the in-app path; record the page. Otherwise keep "Use the company's own support page".
- Never add an address from a third-party site such as pissedconsumer.com.
- Tests for each.

## Report

Commit per part, test count, Lighthouse medians before and after, review page and PDF paths. Update STATE.md, append the log, push, then wait for HQ review.

## Short paste block

```
git pull. Read docs/hq/review-2026-10-13-landing-and-drafts.md, then do docs/hq/codex-prompts/2026-10-13-perf-mascot-portals.md parts 1 to 4 in order, one commit each. D-045 is Ganesh's decision; the low-quality drafts in part 3 are approved. No Cloudflare publish, no npm run deploy, no calling settings, no keys. Mark nothing DONE. Update STATE.md, append the log, push, then wait for HQ review.
```
