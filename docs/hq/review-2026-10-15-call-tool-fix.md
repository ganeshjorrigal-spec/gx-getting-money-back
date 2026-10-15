# HQ review: duplicate endCall fix (17d7076, evidence 92e864a)

Reviewed Thu 15 Oct 2026, 18:15 IST by Claude HQ. **Accepted.** 359 tests, 48 files, type check clean (HQ ran both).

- Read-only check found the saved assistant has one tool, `endCall`, and no DTMF tool. Our override now sends only `dtmf` and our `transferCall` (passenger number, warm transfer, privacy instructions). Vapi merged the assistant's tools with ours, which is why there were two `endCall`; now there is one. Instructions unchanged.
- A call Vapi refuses before it starts now saves duration 0, no transcript, no recording, no patch-in, and the history says "Call could not start" with the safe reason. The 15 Oct record was corrected through an admin-only mutation that cannot send or retry a call.
- Published to Convex and Cloudflare; 14 of 14 routes return 200.

Residual risk for the retry: none known on the tool list. Unknowns that only a live call can show: the warm transfer to the passenger phone, the speaker labels in the real transcript, and the cost.

Next: Part 2 of `docs/hq/codex-prompts/2026-10-16-call-tool-fix-and-retry.md`, Fri 16 Oct 10:00 to 18:00 IST.
