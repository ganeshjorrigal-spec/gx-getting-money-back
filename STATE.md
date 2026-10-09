# Current state (owned by Codex)

Last updated: 2026-10-09, after the M2.5 shorter-flow demo proof. M0, M1, M2, M2.0, M2.1 and M2.3 are DONE per MILESTONES.md. M2.2 and M2.4 are READY FOR REVIEW. M3 Friday work is deployed but remains outside this review because payments and physical-phone checks are still open.

## M2.5 READY FOR REVIEW

- Amended D-027 demo is deployed: platform choice, three-round organiser ladder, skip clock, booking ID, bank reference, simulated closure, Demo-labelled Sheet rows, no paywall and seven-day deletion.
- Ganesh connected the separate demo account through Allow. Only that connection requests read/send; real Google scopes, 10-minute polling and Calendar alerts are unchanged. Users still send their own messages.
- Build/type check, 58 unit tests and paid-tier F1-F16 passed on 7 Oct. The model remains gemini-3.5-flash-lite. No code changed during the 9 Oct proof continuation.
- Full District journey, all three received replies and screenshots after each round are in the 7 Oct log. The final shorter-flow District run TB-JNEC29 closed for simulated Rs 2,400 in 3:10.731 on 9 Oct. All three replies stayed in their original threads, each sent within 2.202 seconds of finding the email. Closed stage and Demo Sheet row verified. Saved records and timings are in the 9 Oct log; screenshots are explicitly from the earlier run.
- Ganesh accepted the 10.731-second overrun on 9 Oct and said distractions may have contributed. That cause is not independently established. Ganesh subsequently confirmed the run meets the speed check because three minutes was a target, not a hard limit. M2.5 is READY FOR REVIEW, not DONE.
- Automatic Demo subjects preserve tracking codes. Confirm opens the draft directly; Skip ahead and booking ID use the same draft-opening flow. Fast demo checks remain bounded and retain the specified 10-second interval.

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

HQ reviews M2.5 using the 7 Oct screenshots and 9 Oct timing records, including Ganesh's accepted timing exception. M3 remains paused behind the product pivot; no new milestone started.
