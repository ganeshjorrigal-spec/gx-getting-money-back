# Codex prompt: fixes from HQ's cold walkthrough and Shaktimaan's review (11 Oct)

Source: HQ ran one flight case as a stranger on the live site at phone width (375px), plus Shaktimaan's design feedback. Paste everything below the line. The restyle (look and feel) is NOT in this prompt; it waits for the taste test.

---

git pull, then the AGENTS.md start-of-session order. This is fix work inside M2.6. Do them in this order, one clean commit per group. Do not change flight or event logic, dates, playbook data, demos or payment rules.

## Group 1: blockers (Razorpay review depends on these)

1. `/terms/`, `/refund-policy/` and `/contact/` all show the landing page. Make each a real static page with its own content (from the morning addendum prompt). Check that the static export writes `terms/index.html` etc. and that Convex static hosting serves them, not the SPA fallback. Footer links and the pay card must point to them.
2. Old name still visible: the case inbox shows `tickback.cases+TB-...@gmail.com` and case codes start `TB-`. New cases get `RG-` codes. Old codes keep working (reply matching must accept both). If the case inbox address itself can't change today, list it for Ganesh; do not change Gmail settings yourself.

## Group 2: the mail we hand the user (this is what the company reads)

3. Greeting reads "Hello Ms. Jasbir Kaur team,". Use "Dear <name>," when a named officer is known, else "Dear <role>,". Unit test both.
4. Internal notes leak into the mail ("The rule gives no start day; Refund Genie counts... holidays ignored"). The mail cites the rule plainly: rule name, what it requires, the due date. Our counting method stays on the case screen only, labelled "Refund Genie's reading" (D-029). Test: no mail body contains "Refund Genie counts", "our reading" or "holidays".
5. Attachment labels sit orphaned in the text. Put them in one closing line: "Attached: cancellation mail, payment receipt." Only list what the user actually has.
6. Add to every draft, events and flights, just above the sign-off: "Please reply to all on this mail and keep <case reference> in the subject, so my records stay in one thread." (Shaktimaan point 2.)
7. CC confusion: the CC field shows the nodal officer plus the case inbox, but the instruction says "Add this address in CC" for one. Show CC as a list with one line under it: "Keep both in CC. The second one lets Refund Genie read their reply."

## Group 3: the case screen

8. "Email me this case link" button on the case screen (Shaktimaan point 1). Opens a Gmail compose to the user's own address with the case link and code. No server send. 
9. Hero card leads with two rows: "Who owes you" and "Who to contact next". Amount and due date come after.
10. Overdue gets an amber badge with an icon and the word "Overdue". Green is used only once money is marked received.
11. Payment method shows a bare "unknown". Ask instead: "How did you pay? Card / UPI / Net banking / Wallet". Store the answer; it changes the rule shown (card = 7 days).
12. Timeline: remove duplicate entries (same event type and same minute = one row) and replace internal codes like "Prepared FLIGHT_mail" with plain text ("Mail to MakeMyTrip ready").
13. Replace "Reply tracking is off until you mark your first email sent." with "Once you send the mail, tap 'I sent it' and we'll watch for their reply."

## Group 4: start page and trust

14. Start page: the message box comes first, right under the heading. Demo card and name field move below the submit button. Flight / Event chips get a label: "What was cancelled?"
15. Above "Check my refund": "Gemini reads what you paste to fill the case. Don't paste OTPs or card numbers." with a Privacy link.
16. Loading state shows three steps: Read message, Confirm facts, Choose next action.
17. "See a real case" opens the flight demo, not the IPL events story.
18. All tap targets at least 44px tall.

## Proof (in today's log)

- Type check and unit tests pass (count them). New tests for 3, 4, 6 and 12.
- Eval: all flight fixtures and F1 to F16 still pass.
- Deployed. Saved HTML or screenshots at 375px of: Terms, Refund policy, Contact, Start, a flight case card, the mail draft.
- Paste one full draft mail body into the log (fixture case, no personal data).
- "For Ganesh" list: anything skipped and why.

Mark nothing DONE. Update STATE.md, append the log, commit and push.
