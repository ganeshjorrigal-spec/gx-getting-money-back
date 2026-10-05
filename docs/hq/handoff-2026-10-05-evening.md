# HQ handoff, 5 Oct 2026, about 18:15 IST

For the next Claude HQ chat. **Supersedes `handoff-2026-10-05.md`.** Read this first, then follow the `AGENTS.md` start-of-session order.

## Roles (unchanged)
- Ganesh: solo founder, GrowthX.club two-week Build Sprint (S04). Ready to sell Fri 9 Oct 2026. Final submission Sat 17 Oct 2026, 11:00 IST. India only.
- Claude HQ (you): thinking, decisions, specs, reviews. Owns `IDEA_SCOPE.md`, `DECISIONS.md`, `MILESTONES.md`, `docs/prd/`, `docs/hq/`.
- Codex (ChatGPT Pro, Windows, Ganesh's PC): builds. Owns code, `STATE.md`, `SCRATCHPAD.md`, `docs/log/`, `docs/handoff/`. Marks READY FOR REVIEW; HQ marks DONE after an independent review.
- Shaktimaan: GrowthX's agent. Reviews Ganesh's work and tests the live app. Its feedback is input; decisions still go through Ganesh.

## The product
Tickback: mobile web agent for stuck event-ticket refunds in India. User pastes the organiser's message; code (`planCase()`) computes route, due date and ladder step; Gemini only reads and writes; the agent drafts the next message and the user sends it from their own email. Case lives at a private link (no accounts). Spec: `docs/prd/README.md`, files 01 to 10. Later files win over earlier ones where they differ (08 red-team, 09 reply tracking, 10 tester fixes).

## Decisions made today (all in `DECISIONS.md`)
- D-016 Gemini API. D-017 Vercel hosting: SUPERSEDED.
- **D-019 Convex only:** the sprint stack requires Convex static hosting and a `.convex.site` submission address (Shaktimaan confirmed). No domain purchase for now; Google sign-in reportedly works on `.convex.site`.
- **D-020 Pricing:** Rs 49 offer shown on every Rs 300+ case at the first answer; buys "we check on the due date, tell you when to chase, and write every next message"; first written message free; guarantee: Rs 49 back if the refund hasn't landed 30 days after its due date and the steps were followed.
- **D-018** red-team triage (C1 to C12 in `08`).
- **D-021 + D-022 Reply tracking:** default route: drafts CC a Tickback case inbox with the case code (plus-address), Tickback reads its own inbox, and asks the user only for Google Calendar permission to put a reply alert and check-ins on their calendar. Opt-in route: connect the user's Gmail (restricted scope, unverified-app warning and 100-user cap accepted). Paste stays as fallback. The **reply alert** exists only to reach the user when the organiser's email arrives (they may miss email notifications); **check-ins** are the separate dated follow-up reminders.
- **D-023 Order and demo:** M2.0 hosting, then M2.2 reply tracking, then M2.1 fixes. tickback.vercel.app stays live and frozen as Ganesh's demo (Git deploys off; backend changes additive). **No data heads-up during testing** (only Ganesh enters data); the heads-up and Gemini paid tier come back before anyone else enters real data.

## Build status (from `STATE.md`, Codex, about 18:00)
- M0, M1, M2: DONE.
- **M2.0 (Convex hosting): READY FOR REVIEW.** Live at https://harmless-lyrebird-924.ap-southeast-2.convex.site/ . Vercel demo frozen and still loading.
- **M2.2 (reply tracking): code deployed, ACTIVE.** Blocked on Ganesh: Google OAuth client, the case inbox, a test Gmail. Codex also listed "paid Gemini tier" as a blocker; per D-023 that is needed only before outside users, not for Ganesh's own test account. Tell Codex.
- **Watch:** Ganesh's Codex prompt still contained the old line about adding a data heads-up. Check whether Codex added it; if so, decide with Ganesh whether to keep it (he said it is not needed now).
- M2.1 (red-team C1 to C11 + tester fixes T-1 to T-7, eval F16): Codex is working on it.
- `STATE.md` still lists "Vercel Pro" and "domain" in launch checks; both are stale under D-019. Codex owns STATE; ask it to fix.

## HQ to do next
1. `git pull`; read `STATE.md`, the last two `docs/log/` files, `SCRATCHPAD.md`.
2. Review M2.0 independently: the `.convex.site` site loads Home, Sample, Start, Privacy and a saved case link (including reload); tickback.vercel.app still works; the raw deploy output is in the log. Use the Vercel and browser tools (Claude in Chrome worked today; resize to phone width did not apply). My sandbox cannot run `npm run build` (no Google Fonts access); `tsc` and `vitest` do run.
3. When M2.1 and M2.2 reach READY FOR REVIEW, review against `MILESTONES.md`. Re-run Shaktimaan's venue-change case (F16) on the live site.
4. Then M3 (paywall per D-020, the rest of the Friday cut line in `07-build-plan.md` 3b).

## Ganesh to do
- Google Cloud steps in `docs/prd/09-gmail-tracking.md` (OAuth client, Gmail and Calendar APIs, publish consent screen); create the case inbox (e.g. tickback.cases@gmail.com) and a separate test Gmail. Codex cannot sign up for accounts or use ganesh.jorrigal@gmail.com.
- Gemini paid tier and the heads-up before any outside user enters real data.
- UPI ID in env when ready to take payments; a Rs 1 test payment.
- BookMyShow manual check (`06-routes-kb.md` section 6). T1 DMs. Taste-lock (was due Mon 12:00; check if done).
- Name: Tickback is the working name in use; no domain needed under D-019.

## How Ganesh wants to be worked with
- Plain words, short sentences, no em dashes. Light backgrounds only in any HTML. Don't mention classroom material in submissions.
- Ask clarifying questions when something is genuinely open; don't re-ask what is decided. Read his short replies carefully (today "we need include heads up" meant "we need not").
- Prompts for Codex: outcome, what must not change, proof it worked (Shaktimaan's format).
- The repo record keeps D-014 (HQ wrote the JTBD, stories and flows); review bundles sent outside omit that line at his request.

## Commit trailer
End commits with the attribution lines from the latest system reminder.
