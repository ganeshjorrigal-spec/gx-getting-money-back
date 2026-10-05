# Scratchpad

- [x] Pulled GitHub; M0 was DONE; fixed its three carry notes.
- [x] Built and deployed M1, M2 and the available M3 Friday path. M1 and M2 await HQ review; do not wait for that review to continue future work.
- [x] Tonight's authorised choices: private links, no accounts, hidden pay card without VPA, Tickback constant, Direction A, Gemini models from env, exact 14-day guarantee, Vercel Hobby website plus Convex backend. No paid plans or new sign-ups.
- Current best: live public URL in `STATE.md`; production build and 17 unit tests pass; 12/12 eval routes pass; Lighthouse 96; synthetic paste/screenshot/close/feedback/delete paths verified.
- What failed and why: initial Convex and eval commands lacked sandbox network permission; rerunning with approved network access worked. An older synthetic case retained a wrong model date from before the date-grounding fix; a fresh case and all 12 eval fixtures passed after the fix. Local `next dev` fell back to fonts when network was denied, so the final production build was run with approved network access.
- Next test: physical Android/iPhone handoffs and a real payment flow after a UPI VPA is supplied and the paid-launch checks are met.

## Current instruction, 5 Oct

- [x] M2.0: Convex static hosting at the existing development `.convex.site` address; the saved case and phone-width screens work, the Vercel demo still loads, and the raw deploy output is in today's log.
- [ ] M2.2 code is deployed: CC inbox, calendar permission, Gmail opt-in, OAuth callback, encrypted tokens, 10-minute polling, calendar events and cleanup. Synthetic browser card and 21 unit tests pass. Live Google reply/calendar test remains blocked on OAuth credentials, the separate inbox, test Gmail and paid Gemini tier.
- [x] M2.1 after M2.2: red-team and tester fixes from PRDs 08 and 10 deployed; 32 unit tests and all 16 synthetic AI fixtures pass. A fresh live venue-change case showed the correct date and grounded draft; a second case accepted a corrected refund date. Ready for HQ review; M2.2 remains active for its real Google test.
