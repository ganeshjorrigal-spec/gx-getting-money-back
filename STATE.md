# Current state (owned by Codex)

Last updated: 2026-10-05, M2.1 deployment. M0, M1, and M2 are DONE. M2.0 and M2.1 are READY FOR REVIEW. M2.2 remains ACTIVE pending its Google test. M3 Friday work is deployed but is not marked ready for review because payments and physical-phone checks cannot be completed tonight.
M2.2 code is deployed on the Convex development site. The Gmail and Calendar connection flow cannot be tested with a real test account until Ganesh supplies the Google OAuth client, separate case inbox and test Gmail and enables the paid Gemini tier. M2.2 remains ACTIVE; M2.1 work is proceeding without waiting.

## Live product

- Website: https://harmless-lyrebird-924.ap-southeast-2.convex.site/
- Convex static hosting now serves the Next.js export from the existing development deployment `harmless-lyrebird-924`, which also holds the backend and data. GitHub is the code source.
- https://tickback.vercel.app/ remains a frozen demo. Its Git link is disabled, and it loaded after the Convex deployment. Its project and config were preserved.

## Built and verified

- Fixed all three M0 carry notes: exact 14-day guarantee wording, Tailwind colours, and missing type/shadow/motion tokens.
- M1 landing, sample, taste, privacy: checked at 360 and 390 px. Lighthouse mobile score 96; the last audit transferred about 114 KB of JavaScript. Evidence: `docs/qa/lighthouse-2026-10-05.json` and today's log.
- M2 paste and screenshot intake, redaction, private fragment link, date question, route/date/source/next-step card, save and calendar links. The deployed site completed a synthetic paste case and screenshot-only case. Wrong-token and saved-case reopen checks passed. Ten logged triages had p50 2.37 seconds.
- M3 Friday path: verified email draft/send sheet, mark sent, scheduled check-in, Not yet to Grievance Officer draft, reply re-triage, action checklist and completion, no-route options, out-of-scope waitlist, close and feedback. A disposable synthetic case was deleted and was no longer readable. No real email or payment was sent.
- M2.1: completed the red-team and tester changes, including fact confirmation, completed form and courier dates, grounded drafts, plain dates, softer failed-payment text, payment grace, future reminders, and the new guarantee. A fresh live made-up venue-change case returned 28 Sep 2026 and a draft that named the move, 10 Sep form, 17 Sep delivery and missed promise. The 390 px Privacy footer was tappable. The frozen Vercel demo loaded after the deployment.
- `npm run build`, `npx tsc --noEmit`, and 32 unit tests pass. `npm run eval` passed all 16 synthetic fixtures, with exact asserted dates and zero invented contacts. Evidence: `docs/qa/eval-2026-10-05.md`.

## Still open

- The pay card is intentionally hidden because `NEXT_PUBLIC_UPI_VPA` is empty. The UPI link and QR code builder have unit coverage, but a real pay sheet and claim cannot be checked until Ganesh supplies a VPA and a safe payment test is arranged. No purchases or bank/UPI apps were used.
- Android Chrome and iPhone Safari tests in `docs/prd/07-build-plan.md` section 4 were not run on physical phones. Calendar app handoff, mail app handoff, UPI chooser, 200% text zoom, offline mode, and saved regression screenshots remain unverified. The in-app browser covered the main web flow at phone widths.
- Before accepting real paid cases, complete the PRD launch checks: Gemini billing and budget alert, working support contact, BookMyShow manual check, payment reconciliation, and phone tests. Nothing was purchased tonight.
- M3 full milestone also has later-week work: L2, payment verification, analytics funnel, and remaining phone tests. M4 email is untouched. T1 validation is Ganesh's parallel task.

## First morning action

Finish the Google Cloud OAuth client, separate case inbox and test Gmail, then run the M2.2 reply and Calendar test on the live site.
