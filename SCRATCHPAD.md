# Scratchpad

## Current instruction, 6 Oct: M2.3

- [x] Step 1 code and environment: paid Gemini key active, paid tier true, model fixed to `gemini-3.5-flash-lite`, named-case gate removed, Gmail opt-in account list retained, per-call token counts saved. Fresh unlisted cases have inbox tracking; live reply-all proof passed on `TB-5QFF3L`.
- [x] Step 2: visible tracking state, copy-message CC instruction and Calendar permission explanation. Verified on the live Convex site.
- [x] Step 3: compact waiting state and live progress steps after every AI submit. Verified on the live first-screen flow.
- [x] Step 4: optional name and contact, booking ID confirmation, drafts and Privacy. Verified on a fresh live case.
- [x] Step 5: Responses Sheet created through `drive.file`, shared, and verified with all 12 headers and the live District case row.
- [x] Step 6: BookMyShow-first chat loop, reply paste/screenshots and chase dates. Verified twice on live synthetic case `TB-N73ZMT`.
- [x] Step 7: verified support contacts for named platforms; unconfirmed items logged for Ganesh.
- [x] Final proof: live BookMyShow chat loop twice, live new District reply-all, paid-tier type check, 38 unit tests and F1-F16 eval; M2.3 marked READY FOR REVIEW.
- [x] Fixed the in-app browser email handoff: Gmail now opens through a normal web compose link with recipient, subject, body and case inbox CC; another email app remains available as a fallback.

- [x] Pulled GitHub; M0 was DONE; fixed its three carry notes.
- [x] Built and deployed M1, M2 and the available M3 Friday path. M1 and M2 await HQ review; do not wait for that review to continue future work.
- [x] Tonight's authorised choices: private links, no accounts, hidden pay card without VPA, Tickback constant, Direction A, Gemini models from env, exact 14-day guarantee, Vercel Hobby website plus Convex backend. No paid plans or new sign-ups.
- Current best: live public URL in `STATE.md`; production build and 17 unit tests pass; 12/12 eval routes pass; Lighthouse 96; synthetic paste/screenshot/close/feedback/delete paths verified.
- What failed and why: initial Convex and eval commands lacked sandbox network permission; rerunning with approved network access worked. An older synthetic case retained a wrong model date from before the date-grounding fix; a fresh case and all 12 eval fixtures passed after the fix. Local `next dev` fell back to fonts when network was denied, so the final production build was run with approved network access.
- Next test: physical Android/iPhone handoffs and a real payment flow after a UPI VPA is supplied and the paid-launch checks are met.

## M2.4, 7 Oct

- [x] Follow-up reply date fix: newest tracked promise anchored to actual received date; explicit starts preserved; stale quoted dates/lateness excluded. Saved District case now WAIT, due 14 Oct, check-in 15 Oct. Live screenshot, 46 tests and full paid-tier eval saved.

- [x] Deployed reply metadata, newest-reply AI summary and redacted key sentence.
- [x] Verified the live District banner updates without refresh with Calendar disconnected; Seen hides it.
- [x] Saved sanitized Convex record and screenshot in today's log; 41 tests and type check pass; M2.4 READY FOR REVIEW.

## Current instruction, 5 Oct

- [x] M2.0: Convex static hosting at the existing development `.convex.site` address; the saved case and phone-width screens work, the Vercel demo still loads, and the raw deploy output is in today's log.
- [ ] M2.2 code is deployed: CC inbox, calendar permission, Gmail opt-in, OAuth callback, encrypted tokens, 10-minute polling, calendar events and cleanup. Live Google reply/calendar test remains blocked on OAuth credentials, the separate inbox and test Gmail. Before the paid tier, only email addresses in `GMAIL_TEST_ACCOUNTS` and case codes in `GMAIL_TEST_CASE_CODES` can use Gmail tracking.
- [x] M2.1 after M2.2: red-team and tester fixes from PRDs 08 and 10 deployed; 33 unit tests and all 16 synthetic AI fixtures pass. A fresh live venue-change case showed the correct date and grounded draft; a second case accepted a corrected refund date. Ready for HQ review; M2.2 remains active for its real Google test.
