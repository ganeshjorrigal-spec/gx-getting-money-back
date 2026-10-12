# Phase A review proof, 13 Oct 2026

Local proof only. No publication or backend mutation. Screens render the actual components with synthetic, non-personal case inputs. The built Start page was also opened and its flight/event controls and Privacy link used. No mail, payment or demo was submitted.

## Checks

- Type check and production static export pass.
- 234 unit tests in 27 files pass; original 218 unchanged.
- Paid eval: F1-F16 16/16, FL01-FL14 14/14. See eval-events.md and eval-flights.md.
- checks.json: six required screens plus loading, Privacy, Refund policy, Contact and public chase demo at 375px and 1280px. No overflow, controls below 44px or green outside landed.
- early-status-checks.json: Waiting, due 21 Oct 2026 and Follow-up ready; zero overdue stamps at either width.
- landed-checks.json: It's in, four green elements inside landed components, none elsewhere; zero overdue stamps.
- Every visible due/check-in/checked-contact/history date has its source beside it or within its labelled saved-message context. Original mail/reply text stays intact.
- Design detector: no findings after removing two accent side borders.

## Screens

Use landing, start, flight, mail, demo and terms JPEGs with -375 or -1280 suffix. Additional chaseDemo, loading, privacy, refundPolicy, contact, waiting, followup and landed images cover the other states. export-start-375.jpg is the actual running static export. Saved HTML is alongside each fixture; its font paths need the local export's _next directory.

The screenshot asset public/sample-flight-receipt.jpg is a labelled synthetic receipt captured on 13 Oct. It is not an illustration or live personal case.

## Scope

Steps 1, 2, 5, 6 and 7 only. Steps 3 and 4 deferred for Phase B. No Cloudflare publish, npm run deploy, Convex push, live/company contact, calling-setting change or key change. M2.6 still ACTIVE; nothing DONE.
