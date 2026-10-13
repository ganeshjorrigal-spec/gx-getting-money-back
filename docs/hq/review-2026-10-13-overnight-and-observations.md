# HQ review: overnight queue and walkthrough fixes (to 4990087)

Reviewed Tue 13 Oct 2026, 20:00 IST, by Claude HQ.

## Verdict

**Accepted.** 278 tests pass (34 files), type check clean (run by HQ). Nothing deployed.

- Restyle polish: one Overdue stamp. Accepted.
- Privacy follow-ups: reference codes kept, private asks still cut; Vapi speaker mapping from official docs. Accepted for simulated use and the supervised live test.
- Contacts: Cleartrip, Yatra, ixigo added with own-page sources; Air India portal step with field list. MakeMyTrip `triphelp@` and Goibibo `travel@` were not found on their own pages, so they stay out. Correct.
- Video sample: built (unlinked `/start/?demo=flight-self`, due 1 Oct). Real Gmail proof was blocked by a browser permission; Ganesh tests it by hand.
- Phase B dry run: 12 drafts, about $0.08. Ganesh approved the run AFTER the landing job (D-044).
- SkillBox no-date answers, primary Continue buttons, "Optional. Only used about this case.", D-043 escalation guard at reserve and final send: accepted.

## Decision taken by HQ under D-043

The public automatic chase demo's first mail went to a demo Grievance Officer, which D-043 now blocks. Fix in the landing job: the demo's automatic mail goes to a demo customer-care (support-level) role, so Genie still visibly chases; any grievance or officer step in the demo is shown as user-sent.

## For Ganesh

- MakeMyTrip `triphelp@makemytrip.com` and Goibibo `travel@goibibo.com`: where did you see them? Send the page link and we add them with that source.
- Video sample: open `refundgenie.app/start/?demo=flight-self` after the next publish and send the mail from your own Gmail once, to prove the round trip.
