# Current state, 15 October 2026

## Supervised live call stopped on Vapi configuration failure
One authorised attempt on made-up case RG-06B69F at approximately17:48IST. Convex call ID n177azp5xf5vnxc22nppt64knd8gac58. Vapi refused creation: Invalid Configuration. Assistant 'Refund Genie Recovery Agent' has more than one tool of type 'endCall'. No external Vapi call ID, transcript, recording link, confirming draft or mail row; stored cost USD0. No successful connection or transfer verified. No retry. Owner restored CALL_MODE=simulated, confirmed by read-only check. No environment, key, allow-list or calling-setting change by Codex. Nothing DONE.
Safe evidence docs/qa/live-call-2026-10-15/call-failure.json. Stored duration65 and patchIntrue are fixture fallback fields on immediate failure, not live duration/transfer evidence; flagged for HQ. Browser call history seen; screenshot crop timed out and follow-up returned wrong region with a test mailbox, discarded. No screenshot proof committed. No source changes, tests or deployment in this failure-report task.

## Published baseline and separate branch
Main was pulled to ff64b2c before this task; published source remains 1a181a956b7193bf644cd0971fe81ec3f88ef997 with PartA fixes and D-050. Prior release gates:355tests twice, type check, export and local17-step demo walk. Ganesh closed PartA. D-051/D-052 is separately pushed on d051-d052 at e092e5e for HQ review; its latest HQ follow-ups were not applied during the call task. Existing unrelated evidence gaps remain in the log.

## Next gate: HQ review
Review duplicate endCall tools in saved assistant versus request override, plus misleading fixture-derived live-failure fields. No fix, retry, publish or settings change without scope/authority. A retry requires explicit Ganesh instruction, at most one, within approved window. No real-company contact.
