# D-045 current job, 13 October 2026

Part 1 implemented for review, performance gate remains OPEN: median performance72/accessibility100 before and final72/100 after three runs each. FCP2.167s to2.658s, LCP5.320s to4.862s; old79/1.3s/3.9s not fully restored. Immediate visible hero/rows, post-paint motion, swap/limited preloads and deferred lower image implemented. Static export/type check/288 tests pass. Parts2-4 pending. No publication; nothing DONE.

# Current state, 13 October 2026

## D-044 landing restructure
Parts 1-4 READY FOR REVIEW. Nothing DONE. No deployment in this job.

1. Intake audit: 46 field/control families documented, permission identity and flight contact prefilled from saved details, shared reasons/personal safety copy. Commit 653e2f0.
2. Landing: animated receipt, chat story, phone swipe cards, Tell us once, native FAQ, reduced-motion final state and 375/1280 proof. Commit d2ad78c. Lighthouse performance 79 to 74, accessibility 100 to 100; first after run 52 retained. Performance worsened five points; laptop benchmark also changed.
3. Public automatic demo: customer-care first/confirming mails, officer steps passenger-only with Gmail draft. Six new in-memory tests, local 375px support/officer presentation proof. Commit 6ef05de.
4. Twelve low-quality image drafts approved by Ganesh/D-044. Generated 12 images in 12 attempts, no retries, within the durable 40-attempt cap. Review page: docs/design/logo-candidates/index.html; 375/1280 screenshots in docs/qa/image-review-2026-10-13. Logo pick/illustration approval remain unset; no finals, SVG, favicon or product placement.

## Verification and proof
Type check passes. 286 tests across 36 files pass. Landing production static export passes. No new eval needed for presentation-only work; flight/event rule/date planners unchanged. Public demo planning wrapper is isolated to that story and tested. Local proof only: docs/qa/landing-2026-10-13 and docs/qa/restyle-landingdemo-2026-10-13. No newly deployed/live demo proof claimed.
Audit: docs/qa/intake-audit-2026-10-13.md. Full evidence and retained Lighthouse reports in today's append-only log, docs/log/2026-10-13.md.

## Hosting and authority
The earlier authorised 13 Oct publish remains live on refundgenie.app and the existing Convex backend (source 4990087); publish proof is in docs/qa/publish-2026-10-13. D-044 changes are not published. Another publish requires Ganesh's explicit chat instruction. Vercel demo stays frozen. No calling settings, allow-lists or keys changed; no live call or real-company mail.
Ganesh accepted fresh domain trials/manual paid-year restore from old active private case; restore hidden on closed cases and carry-over rules remain undefined. Limits unchanged.

## Remaining for HQ / Ganesh
- Review D-044 four-part job, including the prescribed ask-once promise that cannot govern a company's identity checks. Audit questions retained: mobile for mail-only authority, waitlist contact reuse and timestamp precision.
- Logo pick and illustration approval before any finals or placement.
- Prior overnight queue: own-company sources for MMT triphelp and Goibibo travel still missing; not auto-filled. Launch-video sample actual Gmail/fresh-profile/calendar proof still needs the user; existing sent/reply presentation screenshots are fixtures.
- Original M2.6 three timed flight demos/post-trial Rs 49 test-payment proof still outstanding. Current keys live; no switch authorised. Previous Gmail TB-795645 proof remains in the log.
- D-038 Parts 1-5/pre-live privacy fix previously READY FOR REVIEW with test mail/simulated proof; no live calling authority. Other launch checks unchanged.

Next: HQ review. Mark nothing DONE.
