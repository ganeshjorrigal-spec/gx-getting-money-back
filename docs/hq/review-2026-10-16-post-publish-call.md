# HQ review: post-publish call, Fri 16 Oct 19:08 IST (f9c03e2, d092285)

Reviewed Fri 16 Oct 2026, 19:40 IST by Claude HQ. Sources: Codex proof in docs/qa/post-publish-call-2026-10-16, Ganesh's Vapi transcript and Vobiz recording export.

## Passed on a live call
- Opening: AI disclosure, passenger, permission, PNR, status question.
- Caller role (gpt-4.1, D-053): no help offered, no PNR asked. Refused to give customer details. Asked status, then reference. Captured "not processed yet" and reference DAR-45781.
- Transfer trigger: transferCall fired only after care asked "Can I speak to the passenger?". Correct.
- Honest failure wording saved: "We could not reach the passenger. Nothing private was shared." No passenger speech, no recording link.

## Still failing
- Passenger leg. Vapi shows "Transfer failed due to operator call status: completed" in under a second, before Genie even finished "I'll connect the passenger now". The Vobiz export again holds only the care call (64 s recording). The second leg never reaches the passenger phone. Cause unknown. Same on both calls, with two different care phones, so it is not the care side. Next: Vapi support with both call IDs; ask Vobiz whether the number allows two calls at the same time.
- Not asked: processing date and who holds the money, because care asked for the passenger first. Fine for this run.

## New bug (fix after submission)
- Convex poll timed out once (10 s fetch) and the catch path closed the call as failed, cost 0, empty transcript. With 9f0139c, that also released the whole reservation while the real call went on and cost $0.0728. A transient status error must not finalise a call: retry the poll a few times, keep the reservation, and finalise only on a provider "ended" status or after the 25 minute cap.

## Calling before the submission
RG-A64786 has used its two calls today. HQ recommends no more live calls tonight. Say in the submission: the live call proves disclosure, caller role, status and reference capture and the correct transfer trigger; the passenger handover is shown simulated while the transfer leg is fixed with the telephony provider.
