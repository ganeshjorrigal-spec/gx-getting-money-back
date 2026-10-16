# HQ review: live call attempts, Fri 16 Oct (73ee953, 88eb729)

Reviewed Fri 16 Oct 2026, 16:00 IST by Claude HQ.

## What happened

- One call completed (30 s, $0.028, `assistant-ended-call`). Opening was correct: AI disclosure, named passenger, permission, PNR.
- Then it went wrong for two reasons visible in the safe transcript:
  1. **Transcriber picked the wrong language.** The care side said "Hello" and "Okay, thank you", but the transcript shows them in Malayalam script. Genie could not understand the answers.
  2. **Genie switched roles.** Its second line was "Hello, how can I assist you with your demo air refund today? Could you please provide the PNR...". It behaved like customer care instead of the caller. Our prompt never says plainly "you are the caller; the person who answers is care", and our first message ends without a question, so the model filled the gap with a support-agent script.
- The new-case attempt was stopped before dialling by the daily budget. **Bug:** a call reserves `CALL_MAX_COST_USD` from the daily budget, but `finish` only adjusts when the real cost is higher, never lower. Cancelled and cheap calls keep their full reservation, so a few attempts use up the day.
- Codex followed every limit correctly, including refusing to bypass the per-case cap.

## Fixes (prompt: `docs/hq/codex-prompts/2026-10-16-call-fixes-and-publish.md`)

1. Prompt: explicit caller role, never offer help, and the first message ends with a status question.
2. Transcriber language set explicitly (English with Hindi), checked against the saved assistant and Vapi docs.
3. Budget: release the unused part of each reservation when a call finishes or fails.

## Calling before the submission

The submission does not depend on it (D-049). Say: "The call opening was verified on a live call; the full call is shown as simulated." A retry can run after the submission.
