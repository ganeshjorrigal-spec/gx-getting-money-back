# Codex prompt: HOTFIX, flight case answers break (found in a live user test, 11 Oct)

Paste everything below the line. This goes BEFORE the restyle. If the restyle is mid-way, commit what is clean, then do this first.

---

git pull. Hotfix only. A real tester could not get past "Need a bit more" on a flight case. Three bugs, all in `app/c/flight-case-view.tsx` and `convex/flights.ts`:

1. **"Question no longer available" on Card / UPI / Net banking / Wallet.** The "How did you pay?" card (added this morning) calls `flights.answer` with id `paymentMethod`, but the server rejects any id not in `item.questions`, and the list filters `paymentMethod` out. Accept `paymentMethod` whenever `facts.paymentMethod` is "unknown", whether or not it is in `questions`. Also check the Card follow-up (credit or debit) path end to end.
2. **One shared input for every question.** `answerValue` is a single state used by all question inputs, so typing a date also fills "How much did you pay? (rupees)". Give each question its own value, keyed by question id. Clear only that question's value after it is answered.
3. **"Use a valid date: YYYY-MM-DD".** Date questions must use `<input type="date">` (which gives YYYY-MM-DD on every browser), and the server should also accept DD/MM/YYYY and DD-MM-YYYY and convert. Amount questions use `inputMode="numeric"` and accept "6,240" or "₹6240".

Also:
4. **Never show raw server errors.** No "[CONVEX M(...)] Request ID ... Uncaught Error" text reaches the user anywhere. Map known errors to plain lines ("Please pick a date from the calendar"), and anything unknown to "Something went wrong on our side. Your answers are saved; try again." Log the real error to the console only.
5. **Stale questions.** If a question disappears because the case re-ran, the screen refreshes the question list instead of throwing.

Proof (in today's log):
- Unit or integration tests: answering paymentMethod when unknown; date in three formats; amount with comma and ₹; two questions answered in a row without cross-filling.
- Deployed. On the live site, a fresh flight case where the mail lacks payment method, date and amount: answer all three in a row at 375px, reach the case card. Screenshot each step.
- grep of the built client shows no "Request ID" or "Uncaught Error" strings rendered to users.

Commit, push, append the log. Do not touch anything else.
