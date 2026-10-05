# Scratchpad

- [x] Pulled GitHub; M0 was DONE; fixed its three carry notes.
- [x] Built and deployed M1, M2 and the available M3 Friday path. M1 and M2 await HQ review; do not wait for that review to continue future work.
- [x] Tonight's authorised choices: private links, no accounts, hidden pay card without VPA, Tickback constant, Direction A, Gemini models from env, exact 14-day guarantee, Vercel Hobby website plus Convex backend. No paid plans or new sign-ups.
- Current best: live public URL in `STATE.md`; production build and 17 unit tests pass; 12/12 eval routes pass; Lighthouse 96; synthetic paste/screenshot/close/feedback/delete paths verified.
- What failed and why: initial Convex and eval commands lacked sandbox network permission; rerunning with approved network access worked. An older synthetic case retained a wrong model date from before the date-grounding fix; a fresh case and all 12 eval fixtures passed after the fix. Local `next dev` fell back to fonts when network was denied, so the final production build was run with approved network access.
- Next test: physical Android/iPhone handoffs and a real payment flow after a UPI VPA is supplied and the paid-launch checks are met.

## Current instruction, 5 Oct

- [x] M2.0: Convex static hosting at the existing development `.convex.site` address; the saved case and phone-width screens work, the Vercel demo still loads, and the raw deploy output is in today's log.
- [ ] M2.2 next: CC inbox route, calendar permission, then Gmail opt-in. Google OAuth credentials and test Gmail are Ganesh's setup steps; build independently while those are pending.
- [ ] M2.1 after M2.2: red-team and tester fixes from PRDs 08 and 10. Do not wait for HQ review between milestones.
