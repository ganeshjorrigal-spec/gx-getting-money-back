# Codex prompt: speed fix, then logo, mascot and scene finals (D-047)

Written by HQ, Tue 13 Oct 2026, 22:30 IST. Do this AFTER `2026-10-13-urgent-demo-and-disclosure.md` (the live demo fix comes first). Read `docs/hq/review-2026-10-13-perf-drafts-portals.md`, D-045 and D-047. One commit per part. No Cloudflare publish, no `npm run deploy`, no calling settings, no keys. Mark nothing DONE.

## Part 1: landing speed (blocks publishing the new landing page)

- `DomainNotice` must not load or query Convex on refundgenie.app. Check `location.hostname` first; only on the old Convex address dynamically import the Convex client and show the notice. Keep the old-site notice working (test it).
- Make sure the landing page bundle does not include the Convex React provider or any case-page code.
- Fonts: preload only the weights used above the fold; drop unused weights; keep `font-display: swap`.
- Measure: Lighthouse mobile 375px, three runs, median, before and after, same machine. Target at least 79. Report the main remaining cost if not met.

## Part 2: finals (approved, D-047)

Use the image script, ledger and the 40-image cap (31 used; finals need about 6). If the cap would be exceeded, stop and report.
- **Logo:** rebuild Smoke logo 2 as a clean SVG by hand (trace, simplify, even stroke weights, navy on transparent). Make a simplified loop-only icon (no receipt lines) for 16, 32, 180 and 512px: favicon, apple-touch icon, web manifest icons. Header uses the full mark with the Fraunces wordmark. Show both on the review page at every size.
- **Mascot:** Mascot 6 final at high quality, transparent background, plus a 64px head crop; webp under 60 KB, lazy-loaded.
- **Scenes:** finals for airport, revised on hold, revised refund coming and family; webp under 120 KB each, with alt text, lazy-loaded below the fold.
- **Placement (D-045):** the header logo; the mascot on the landing hero (beside the sample case on desktop, small above it on a phone, never covering text), on empty and loading states, and on the "It's in" moment. Never on the receipt slip or in any mail. Scenes: airport in the hero area or "Sound familiar?", on hold in "Sound familiar?", refund coming near "How it works" or the "It's in" moment, family near the FAQ or price. The brand logo strip uses the official files you collected, with the not-affiliated line.
- Re-run Lighthouse after placement; the images must not drop performance below the Part 1 result.

## Report

Commit per part, Lighthouse medians, image count used, screenshots at 375px and 1280px of the landing page and the "It's in" state. Update STATE.md, append the log, push, then wait for HQ review.

## Short paste block

```
git pull. After the urgent demo job, do docs/hq/codex-prompts/2026-10-13-finals-and-speed.md part 1 (speed) then part 2 (finals, approved under D-047), one commit each. No Cloudflare publish, no npm run deploy, no calling settings, no keys. Mark nothing DONE. Update STATE.md, append the log, push, then wait for HQ review.
```
