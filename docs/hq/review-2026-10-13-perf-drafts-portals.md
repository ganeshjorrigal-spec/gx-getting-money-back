# HQ review: performance attempt, permission copy, D-045 drafts, portal steps (to 8911e42)

Reviewed Tue 13 Oct 2026, 22:30 IST, by Claude HQ. Codex reports 303 tests, type check and build pass. Nothing published.

## Verdict

- Permission and copy fixes (d8ee319): accepted.
- Portal steps (8911e42): accepted. Air India asks the e-ticket and "already asked?" once; MakeMyTrip uses My Trips; Goibibo stays on "use the company's own support page" because its path was not confirmed on its own pages. Correct.
- Drafts (60ef2a5): Ganesh picked Smoke logo 2 with a simplified tab icon, Mascot 6 as is, and all four scenes (D-047).
- Performance (770d6b9): **not fixed**, median 72 against the old 79. Blocks publishing the new landing page.

## Performance lead for Codex

`app/layout.tsx` renders `DomainNotice` on every page, and `app/domain-notice.tsx` imports `ConvexHttpClient` and queries Convex on every load, including refundgenie.app, only to decide whether to show the "We've moved" line. That line is only needed on the old Convex address. On refundgenie.app it should cost nothing: decide by `location.hostname` first and only then dynamically import the Convex client (or render the notice only in the old-site build). Also load only the font weights used above the fold (three families today) and check that the landing page does not pull in the Convex React provider.
