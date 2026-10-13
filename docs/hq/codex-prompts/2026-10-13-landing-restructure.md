# Codex prompt: landing restructure, ask-once audit, demo fix, then image drafts (D-044)

Written by HQ, Tue 13 Oct 2026, 20:00 IST. Read D-037, D-042, D-043 and D-044 first. One commit per part. No Cloudflare publish, no `npm run deploy`, no calling settings, no keys, no live calls, no real-company mail. Mark nothing DONE.

## Part 1: ask-once audit (do first, it shapes the copy)

Ganesh's rule: case details (PNR, booking ID, company, amount, dates) are asked once per case, so the user never repeats them to anyone at any later step.

1. Make a table in `docs/qa/intake-audit-2026-10-13.md` of every question the user can see in the flight flow and the event flow: the field, the screen and step, required or optional, why we need it, and every other place the same thing is asked again (confirm step, chase permission, call permission, contact field, demo, reply answers).
2. Fix only clear duplicates: the same fact asked twice when we already hold it. Prefill it instead of asking, or show it for confirmation. List anything else (a field you think we do not need) under "For HQ"; do not remove it yourself.
3. Under every input, one short "why we ask" line, from `app/copy.ts`. Examples: PNR "So every company can find your booking without asking you again." Booking ID "Travel sites look up refunds by this." Never longer than one line.
4. Wherever we ask for something personal, keep the line already used: no OTP, card, bank details or login, ever.

## Part 2: landing page, key sections (D-044)

Keep the light warm look and tokens. Motion with CSS keyframes and one small IntersectionObserver at most; no new animation library, no new fonts. Every animation respects `prefers-reduced-motion` by showing its final state, and every animated thing has the same words as real text for screen readers. Copy stays in `app/copy.ts`; calling sentences stay in `callingCopy`; prices from `lib/pricing.ts`.

1. **Hero: an animated sample case** beside the headline (below it on a phone), labelled "Sample case". In about 8 seconds, once: the receipt slip rows fill in one by one (who has it, due date, write to next, amount, Overdue stamp), a "Next mail ready" card slides in, it ticks to "Sent", a reply bubble arrives ("Refund processed. Reference UTR 4021..."), and the stamp changes to the green "It's in" (green is allowed here: it is the money-received moment). Then it rests on the final state. Reuse the receipt components. Keep the current H1, sub line and two buttons.
2. **"Sound familiar?" as chat bubbles**, appearing one by one when scrolled into view: You: "Where is my refund?" MakeMyTrip: "Please contact the airline." Airline: "We already paid MakeMyTrip." Customer care: "Please hold..." Then a Genie card: "Genie checks who actually has it, and puts it in writing with the rule and the date." Replaces the current paragraph. Use made-up names only where the real logos are not shown; real company names in plain text are fine as today.
3. **"What Genie does" and "How it works" as cards**, one line each with an icon: swipeable with scroll-snap on a phone (show a hint of the next card), a grid on desktop. No paragraph longer than one line.
4. **"Tell us once" card**, candid brand voice, after "What Genie does":
   - Heading: "Tell us once."
   - Line: "We ask your PNR and booking ID once for each case. After that nobody asks you again, not us and not the next customer-care person. Genie carries your case."
   - Three mini-cards: "What we ask" (PNR, booking ID, the company, your name), "Why" (so every mail and call already has it), "What we never ask" (OTP, card, bank details, login).
5. **FAQ** with `details`/`summary`, no script. Six to eight questions, answers only from what is already decided and already on the site: Why do you need my PNR? Will you ever ask for an OTP or bank details? Who sends the mails? (Genie sends support-level follow-ups with your written permission; escalations to officers go from your own Gmail, D-043.) Does Genie call the airline? (from `callingCopy` only.) What does it cost, and what if nothing is recovered? (from `lib/pricing.ts`.) Is Refund Genie linked to these airlines? Can I stop Genie? No new claims.
6. **Logo strip**: a slow marquee once the logo files are placed; static under reduced motion. Until then keep the clean slot.
7. Rules: no made-up stats, counters, ratings or testimonials. Every section except the FAQ stays under about 30 words of body text. No horizontal page scroll, tap targets at least 44px.

Proof: screenshots at 375px and 1280px of each new section, one short screen recording or frame strip of the hero animation, and the reduced-motion version. Lighthouse or similar for the landing page at 375px before and after (performance and accessibility scores); say if anything got worse.

## Part 3: public chase demo after D-043

The public automatic chase demo's first mail went to a demo Grievance Officer, which D-043 now blocks. Change the demo story so Genie's automatic mail goes to a demo customer-care (support-level) address and the demo still shows Genie chasing on its own; if the story reaches a grievance or officer step, show it as "You send this one from your Gmail". Keep every demo label honest ("demo", no real company replies). Tests for the new demo path.

## Part 4: Phase B image drafts (approved by Ganesh under D-044)

After Parts 1 to 3 are pushed: run the 12 low-quality drafts from the dry run (about $0.08). Respect the spend ledger and the 40-image cap. Put the logo candidates and illustration drafts on the review page and stop. Do not make finals, SVG, favicon or place anything until Ganesh picks.

## Report

Commit per part, test count, the audit table summary (duplicates fixed, fields questioned), Lighthouse before and after, and the image review page path. Update STATE.md, append the log, push, then wait for HQ review.

## Short paste block

```
git pull. Read docs/hq/review-2026-10-13-overnight-and-observations.md, then do docs/hq/codex-prompts/2026-10-13-landing-restructure.md parts 1 to 4 in order, one commit each. D-044 is Ganesh's decision; the image drafts in part 4 are approved. No Cloudflare publish, no npm run deploy, no calling settings, no keys. Mark nothing DONE. Update STATE.md, append the log, push, then wait for HQ review.
```
