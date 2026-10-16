# HQ review: night call fixes (0997bd6 to 0dfb64d)

Reviewed Fri 16 Oct 2026, evening, by Claude HQ. Read-only review of the diff. No deploy yet.

## Checked and accepted
- Prompt (0997bd6): known-facts PNR line, four things to learn one at a time, transfer only if care asks for identity or the passenger, never for silence. All old safety lines kept.
- Failed transfer wording (49d7122): end reason starting `call.forwarding.` with no passenger-answer event now saves "We could not reach the passenger. Nothing private was shared." The privacy cut and the no-recording-link rule are unchanged. The new `passengerAnswered` field is optional in the schema, so deploy is safe.
- Budget (9f0139c): `finish` now settles the day's reservation to actual cost, never below 0. Refused and cheap calls give the rest back. Good.
- Diagnosis (86dfbf8): honest. It says it does not know whether a second leg existed.

## Open
- Full suite: first run 385 of 387, two test-setup failures corrected, no clean run on the final tree. HQ lifts the "once" rule for ONE more full run before deploy.
- `passengerAnswered` depends on two guessed Vapi event names (`transfer-destination-answered`, `transfer-update` with answered or connected). A real connected transfer is unproven. Safe by design: the failed wording only shows when the end reason is `call.forwarding.*`.
- Passenger leg: Vapi's saved call shows no second leg, and the Vobiz export shows only the care call. Destination numbers are validated E.164 in code, so format is ruled out. Cause unknown. Next step is a Vapi support request with the call ID.
