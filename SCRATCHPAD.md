# Scratchpad

## Current instruction, 6 Oct: M2.3

- [x] Step 1 code and environment: paid Gemini key active, paid tier true, model fixed to `gemini-3.5-flash-lite`, named-case gate removed, Gmail opt-in account list retained, per-call token counts saved. Fresh unlisted case has inbox tracking; reply-all proof remains for final live test.
- [x] Step 2: visible tracking state, copy-message CC instruction and Calendar permission explanation. Verified on the live Convex site.
- [x] Step 3: compact waiting state and live progress steps after every AI submit. Verified on the live first-screen flow.
- [x] Step 4: optional name and contact, booking ID confirmation, drafts and Privacy. Verified on a fresh live case.
- [ ] Step 5: Responses sheet code is deployed with `drive.file`, sharing, row updates and deletion cleanup. One-time Google Allow and live row check remain.
- [x] Step 6: BookMyShow-first chat loop, reply paste/screenshots and chase dates. Verified twice on live synthetic case `TB-N73ZMT`.
- [ ] Step 7: verified support contacts for named platforms; unconfirmed items logged for Ganesh.
- [ ] Final proof: live BookMyShow chat loop twice, live new District reply-all, paid-tier type check, unit tests and F1-F16 eval; mark M2.3 READY FOR REVIEW.

- [x] Pulled GitHub; M0 was DONE; fixed its three carry notes.
- [x] Built and deployed M1, M2 and the available M3 Friday path. M1 and M2 await HQ review; do not wait for that review to continue future work.
- [x] Tonight's authorised choices: private links, no accounts, hidden pay card without VPA, Tickback constant, Direction A, Gemini models from env, exact 14-day guarantee, Vercel Hobby website plus Convex backend. No paid plans or new sign-ups.
- Current best: live public URL in `STATE.md`; production build and 17 unit tests pass; 12/12 eval routes pass; Lighthouse 96; synthetic paste/screenshot/close/feedback/delete paths verified.
- What failed and why: initial Convex and eval commands lacked sandbox network permission; rerunning with approved network access worked. An older synthetic case retained a wrong model date from before the date-grounding fix; a fresh case and all 12 eval fixtures passed after the fix. Local `next dev` fell back to fonts when network was denied, so the final production build was run with approved network access.
- Next test: physical Android/iPhone handoffs and a real payment flow after a UPI VPA is supplied and the paid-launch checks are met.

## Current instruction, 5 Oct

- [x] M2.0: Convex static hosting at the existing development `.convex.site` address; the saved case and phone-width screens work, the Vercel demo still loads, and the raw deploy output is in today's log.
- [ ] M2.2 code is deployed: CC inbox, calendar permission, Gmail opt-in, OAuth callback, encrypted tokens, 10-minute polling, calendar events and cleanup. Live Google reply/calendar test remains blocked on OAuth credentials, the separate inbox and test Gmail. Before the paid tier, only email addresses in `GMAIL_TEST_ACCOUNTS` and case codes in `GMAIL_TEST_CASE_CODES` can use Gmail tracking.
- [x] M2.1 after M2.2: red-team and tester fixes from PRDs 08 and 10 deployed; 33 unit tests and all 16 synthetic AI fixtures pass. A fresh live venue-change case showed the correct date and grounded draft; a second case accepted a corrected refund date. Ready for HQ review; M2.2 remains active for its real Google test.
