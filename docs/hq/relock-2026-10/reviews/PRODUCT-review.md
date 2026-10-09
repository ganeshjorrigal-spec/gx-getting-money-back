# Review of docs/prd/01-product.md (v2)

Reviewer: independent, 9 Oct 2026. I did not write the doc. Checked against `IDEA_SCOPE.md` (final re-lock sheet), `DECISIONS.md` (D-021 to D-030), `flights.md` (F01 to F23), `online-stores.md` (O01 to O15), `flights-verification.md`, `LESSONS.md` 1 to 20, `STATE.md`, `app/privacy/page.tsx`, `app/copy.ts` and the demo code (`convex/demo.ts`, `convex/demoActions.ts`, `lib/demo.ts`, `convex/agent.ts`, `convex/schema.ts`). No web tools. Not committed.

Overall: the doc is sound. The bracket holds (flights lead, stores gated, events live not sold). Every rule row cited matches its playbook row, and the worked dates are right (Mon 7 Sep 2026: travel site Fri 25 Sep, credit card Mon 14 Sep, UPI Mon 28 Sep). Code facts in section 6.1 match the code (3 replies, 10-second checks, 2 minutes and 1 minute windows, 7-day deletion, `sameDemoMailbox`, `demo.retry`, `googleData.saveReply`, up to 4 screenshots, stage names). The problems were overclaims, a few lines that drifted from the final sheet, and gaps a builder would trip on, mostly in the flight demo.

## Critic 1: Shaktimaan (one bracket, overclaims, sheet and live product)

1. **Law fixes owner and date "for flights" (1.1).** Overclaim. The sheet and lesson 2 say the date is fixed only for travel-site and credit-card bookings (and cash). Direct UPI, debit and net banking have no DGCA count (D-029). FIXED.
2. **Gemini "gave the old 21 working days in 6 of 10 lines" (1.6).** Wrong. The verification file shows 6 lines quoted the superseded CAR; only one of them is the 21 days (another is the 5-day look-in). FIXED in 1.6 and E4. Note for HQ: the sheet's line "quoted the old rule in 6 of its 10 load-bearing lines (21 working days ...)" can be read the same wrong way. I did not edit the sheet.
3. **Pinning question "both companies must answer" (1.6).** Overclaim; nobody must answer. FIXED: "puts one plain question to both companies on the same mail".
4. **Delta 4 step 3 "Tap to send"** while the heading says "same as the sheet". The sheet says "Open it in my own Gmail, read it, press send". FIXED.
5. **Weak spots line** said replies are caught when the user "connects Gmail" and dropped the sheet's "Gmail connect is not open to everyone yet". FIXED to match the sheet and `STATE.md` (test accounts only).
6. **Card "every value from code, never from the model" (2.3).** "Who has your money now" comes from the model's read of a reply. FIXED: owner, rule, date and contact never from the model; the model supplies only the read.
7. **Mismatch list (8.4) was stale.** The final sheet already says the pay button is off until the UPI ID is added, and already states the Gmail test-account limit and the known-sender fallback. FIXED: both marked resolved. Added the real remaining gap: the live privacy page does not say "never logs in" or "test accounts only", so check 11 fails until two copy lines are added.
8. **Price line (8.2)** dropped "and you followed the steps" from the guarantee (sheet, D-020, live `guaranteeLine`) and did not say the pay button is off. FIXED.
9. **F22 timing (2.2).** MakeMyTrip's 24 hours runs from when they receive the money, not the airline's paid date; the 96-hour line also needs the customer's bank details. FIXED: paid date is a stand-in, says "about"; bank details go to them directly, never through Tickback.
10. **F09 used without the verifier's warning.** The rest of para 3(m) was not read and may add conditions. FIXED: FS-4 medical branch gated on Ganesh reading it (Q17).
11. **AirSewa scope.** The verifier notes the DGCA text names AirSewa for denied boarding, cancellation and delay, not passenger-cancelled refunds. FIXED: rung 4 note says "you can also file on AirSewa" for those, not that the rule covers it. Q10 updated with what the verifier saw.
12. **FS-5 look-in "only any fare difference".** F05's fare difference applies to changes, not cancellations. FIXED.

Checked and fine: Tickback defaults are all labelled (15 working days, the cancellation-date anchor, 7-day rung waits, 30-day AirSewa wait, early jump, Mon to Fri working days); no look-in promise on travel-site bookings; no compensation chased; 11 domestic of 13 flight posts, 7 DM, 3 processed, 4 pending with airline match FINAL-judge's spot list; 3 min 11 s matches 3:10.731; Voxya and NCH figures match the sheet.

## Critic 2: Codex build lead (ambiguity, buildability by Tue 13, acceptance checks)

13. **Flight demo had no acceptance checks**, only a table and unit tests. FIXED: added a Given/When/Then block in 6.2 (card at start, one reply per round from the right role with sender name and footer, caught by the case inbox, state after each round, count at close, no playbook contacts, no offer, "Demo ·" row, time logged on 3 runs with no invented pass threshold).
14. **"Two labelled roles on one thread" was undefined.** The live demo desk replies in the thread of the mail it answers, but mails 2 and 3 open as new messages through Gmail web compose, so one Gmail conversation across rounds is not what the build does. FIXED: 6.2 defines "one thread" as built (both roles on every mail, same case code, each reply in its mail's thread, one case timeline); 8.4 check 10 reworded. Whether Ganesh wants one Gmail conversation is Q20.
15. **Code-change list missed three real spots.** Sender name is set in `convex/demoActions.ts`, not `demoReplyBody`; the opening-line check requires the event name; `convex/agent.ts` forces `TRACE` and a made-up date at events round 3, which would fake the flight demo's decision. FIXED: all three named in 6.2.
16. **New fields duplicated live ones (7.1).** `rung` duplicates `ladderLevel`; `dueSource` already exists with `message_promise`, `platform_policy`, `estimate`. FIXED: reuse both; flights add rule row ids; Tickback defaults stay `estimate` so the C1 "Time to check" label still works.
17. **Rung 1 had no buildable mail.** Overdue cases start at rung 2, and Cleartrip has no support email in the playbook (phone only). FIXED: ladder rule says rung 1 is never drafted as a mail in v1; the Cleartrip step is a call confirmed through the existing done step; FS-1 Cleartrip check rewritten.
18. **Rung 2 wait cell** mixed in MakeMyTrip's 24 hours as if it always applied. FIXED: only once a reply says the airline paid them.
19. **FS-3 "went to a different account"** was not testable without bank details, which Tickback never holds. FIXED: the reply names the destination and the user says "Not quite" on the read.
20. **Gaps left open (human decisions, below):** what the "live proof run" is (it gates all store work); how hand cases enter the product and get marked; what must be live on Tue 13.

Buildability note, not fixed: build steps 1 to 6 plus a live proof run by Tue 13 is tight (FINAL-judge row 12 says about 3 build days). The doc's cut order is sound. The sheet calls Tue 13 a target, which is honest.

## Changes made to 01-product.md (19)

1. Header: link to this review.
2. 1.1: date fixed only for travel-site, credit-card and cash bookings.
3. E4: 6 superseded lines, including 21 days and the 5-day look-in.
4. 1.2 weak spots: matched to the sheet.
5. 1.5 Delta 4 step 3: matched to the sheet.
6. 1.6: pinning question wording; Gemini line corrected.
7. 2.2: F22 receipt stand-in and 96-hour bank-details condition.
8. 2.3: model supplies only the read.
9. 2.4: Q22 pointer for cancelled orders with no promise.
10. 3.1 Cleartrip rung 1 is a call.
11. 3.1 rung 2 wait cell clarified.
12. 3.1 rung 4 AirSewa scope note.
13. 3.1 ladder rule: rung 1 never drafted as a mail.
14. FS-1 Cleartrip acceptance; FS-3 destination check; FS-4 F09 gate; FS-5 look-in wording.
15. 6.2: "one thread" defined; acceptance checks added; timing note corrected.
16. 6.2 code changes: sender name, opening check, agent.ts round-3 shortcut.
17. 7.1: reuse `ladderLevel`, `dueSource`, `dueSourceText`.
18. 8.2 price: guarantee condition and pay button state.
19. 8.3 Q10 updated, Q17 to Q22 added; 8.4 check 10 reworded; mismatch list updated (two resolved, privacy gap added).

No strategy, scope, voice or feature changes.

## Open human decisions (not decided here)

- **Q3** Bank-leg check date when a reference reply gives no date (proposal in the doc: 7-day rung wait as Tickback's expectation).
- **Q18** What counts as the live proof run that unlocks stores.
- **Q19** How hand-helped cases move into the product and how they are marked for the separate count.
- **Q20** Flight demo: one case thread (as built) or one Gmail conversation (needs a different send path).
- **Q21** Minimum slice that must be live on Tue 13.
- **Q22** Store "7 days" start date for a cancelled order with no return and no promise.
- Privacy page: approve adding "never logs in for you" and "Gmail connect is open only to test accounts" (copy only), plus the flight-roles demo line.
- Sheet (HQ owns it): the Gemini "6 of 10 (21 working days)" parenthetical can be misread; consider "6 of 10 lines from the old rule, including 21 working days".
- Ganesh's checks already in the doc: read full CAR M-II 3(m) (Q17); spot-check IndiGo, Air India, SpiceJet, EaseMyTrip contacts (Q11); open airsewa.gov.in (Q10).
