# Current state (owned by Codex)

Last updated: 2026-10-07, after the M2.4 live reply banner proof. M0, M1, M2, M2.0, M2.1 and M2.3 are DONE per MILESTONES.md. M2.2 and M2.4 are READY FOR REVIEW. M3 Friday work is deployed but remains outside this review because payments and physical-phone checks are still open.

## M2.4 built and verified

- Tracked replies store sender, received date, one-line AI summary and redacted key sentence. The top case card uses the existing live query and appears with Calendar disconnected. Seen hides it until a new reply input arrives.
- Fixed quoted email history contaminating the banner summary and key sentence. Verified on the saved synthetic District reply without a refresh, then verified Seen hides the card.
- Saved record and screenshot: `docs/log/2026-10-07.md`. Type check and 41 unit tests pass; the Convex deployment is live.
- Follow-up date fix deployed: new tracked promises use the reply's received date, with explicit start dates preserved and quoted history excluded. Live District proof now waits until 14 Oct and checks in on 15 Oct. Type check, 46 unit tests and the paid-tier F1–F16 eval pass; proof in today's log.

## Live product

- Website: https://harmless-lyrebird-924.ap-southeast-2.convex.site/
- Convex static hosting serves the Next.js export from development deployment `harmless-lyrebird-924`, which also holds the backend and data.
- https://tickback.vercel.app/ remains a frozen demo. Its project and configuration were preserved.

## M2.3 built and verified

- Paid Gemini is active through `GEMINI_PAID_TIER=true`; the model remains `gemini-3.5-flash-lite`. Per-call input, output and total token counts are stored without message text.
- Every new case can use the separate case inbox. Gmail opt-in remains restricted to the test-account list.
- The case page shows reply-tracking state, exact CC instructions, Calendar permission guidance and the one-time `.ics` limitation.
- AI submissions show a disabled button, spinner and four live progress steps.
- Optional name and follow-up contact are stored with the case. Booking ID is confirmed before the first answer. Name and booking ID appear in drafts. Privacy explains the stored fields and their purpose.
- The private `Tickback Responses` Google Sheet was created with `drive.file`, shared, and checked: 12 headers present, 41 case rows present, and the M2.3 District proof case is present. Codex did not sign in to Google.
- BookMyShow synthetic case `TB-N73ZMT` completed two chat reply loops. Each loop produced another chat line and a new chase date; email remained the escalation.
- District synthetic case `TB-5QFF3L` was sent with the exact case inbox in CC. The inbox poll matched one later reply-all and changed the case from `OVERDUE/L0_email` to `TRACE/TRACE_bank`.
- BookMyShow, District, Paytm Insider, SkillBox and TicketGenie routes are present. Only addresses confirmed on the platforms' own pages are filled automatically.
- Gmail web compose replaced the broken `mailto:` path in the in-app browser. The existing email-app path remains available as a fallback.
- Type check passes. All 38 unit tests pass. The paid-tier F1-F16 eval passes with exact dates and zero invented contacts. Evidence: `docs/qa/eval-2026-10-06.md`, `docs/log/2026-10-06.md`, and `docs/log/2026-10-07.md`.

## Still open

- The pay card remains hidden because `NEXT_PUBLIC_UPI_VPA` is empty. A safe real-payment test still needs a supplied VPA.
- Physical Android Chrome and iPhone Safari checks remain unverified, including app handoffs, 200% text zoom and offline behaviour.
- Before real paid cases, complete the remaining launch checks: budget alert, public support contact, payment reconciliation and phone tests.
- M3 full milestone still contains later-week work. M4 email is untouched. T1 validation remains Ganesh's parallel task.

## Next review

Ask Claude HQ to review M2.4 using the saved reply record and live screenshot in today's log.
