# 10 Tester fixes (Shaktimaan review, 5 Oct 2026)

Owner: Claude HQ. Source: Shaktimaan (GrowthX's agent) tested the Vercel build at 1440 px and 390 px with a made-up ₹2,400 IPL venue-change case. Codex builds these in M2.1, after hosting (M2.0) and reply tracking (M2.2). Where this file and 01 to 09 disagree, this file wins.

| # | Problem found | Fix | Check |
|---|---|---|---|
| T-1 | Home says "we never share your data"; Privacy says Gemini reads messages and the founder may look at cases | Remove the "we never share your data" promise so no page says more than Privacy. No separate heads-up during testing (D-023); it returns before outside users | No page promises more than Privacy says |
| T-2 | A case with a completed form and couriered tickets still says "You need to act" with no steps and no deadline | Keep completion facts the user gives ("form submitted", "tickets sent"). Ask for the submission date, the delivery date and any promised refund window. Then move to `WAIT` or `OVERDUE` and give a status-check draft. Never invent a due date | The venue-change test case below |
| T-3 | First draft asks for steps the user already did, leaves `{booking ID}` and `{name}` in the text, two copy buttons, no destination | Ask for missing details before drafting, or show them as highlighted fields to fill. The draft states completed steps. One copy button. Show the verified destination with its source; if unknown, ask for the organiser's message that names the channel | Draft has no raw `{...}` text; one copy button |
| T-4 | "I have done this" starts a new 10-working-day countdown from today and labels it "On its way" with a "Due date" | Ask when it was done. Separate **Our check-in date** (estimate) from **Their promised date** (only from the organiser). Don't say "On its way" without evidence. Same rule as C1 in `08` | Done-step without a promise shows "Check-in", not "Due date" |
| T-5 | Phone: the fixed "Start my case" bar covers the footer | Bottom padding equal to the bar height plus `env(safe-area-inset-bottom)` | At 390 px, scroll to the bottom; Privacy link tappable |
| T-6 | Calendar file for an overdue case is dated in the past (old due date plus one day) | For overdue cases, the check-in is a future date: ask "When should we check again?" with 2, 3 or 5 working days, default 2. Show the date beside the calendar button. Never export a past date | Download the .ics on 5 Oct for an overdue case; start date is in the future |
| T-7 | The follow-up after the organiser's reply says the booking "was cancelled" when it was a venue change, and leaves out the form, the courier and the missed promise | Build drafts from saved case facts (event type, completed steps with dates, promises). Before showing a draft, check it in code against those facts: event type word, amount, booking ID, dates. If the check fails, regenerate once, then show a fill-in template | Venue-change test case below |

## Regression test case (add to `npm run eval` as F16)

Input: "Two IPL tickets, ₹2,400, BookMyShow. Match moved from Ahmedabad to Chennai. I filled the refund form on 10 Sep and couriered the physical tickets; they were delivered on 17 Sep. They said refund in 7 working days. Nothing yet." Today: 2026-10-05.
Expected: route `OVERDUE` (promise from the message: 7 working days from 17 Sep is Mon 28 Sep); the draft says the match was moved (not cancelled), names the form date and the delivery date, and the missed 28 Sep date; the next check-in is a future date; no `{...}` left.
