# Codex prompt: one supervised live demo call (D-049)

Written by HQ, Wed 14 Oct 2026. Run on Thu 15 Oct between 10:00 and 18:00 IST, only when Ganesh says in chat that the Vapi-only test call rang his phone and the Convex variables are set. Read docs/calling.md, D-038, D-043, D-049 and the privacy reviews (12 and 13 Oct).

1. Pre-check without calling: confirm Convex has VAPI_API_KEY, VAPI_PHONE_NUMBER_ID, VAPI_ASSISTANT_ID, CALL_ALLOWLIST with two numbers, CALL_DAILY_CAP_USD and CALL_MAX_COST_USD set (check presence only; never print values). Confirm CALL_MODE is not yet live.
2. Ask Ganesh in chat to set CALL_MODE=live. He sets it; you never change env values.
3. Start one demo case's call using the demo airline number (second phone) with Ganesh watching. Expected: the opening says Refund Genie is an AI calling for the named passenger with permission; Genie asks status and reference; at the identity step it says "I'll connect the passenger now" and patches the first phone; nothing after the transfer is kept; no recording link on a transfer call; the confirming mail follows.
4. Record: the call record, safe transcript, privacy notes, cost, and screenshots in docs/qa/live-call-2026-10-15/. No passenger speech, OTP or private detail in any file.
5. Ask Ganesh to set CALL_MODE back to unset or simulated straight after the test, and confirm.
6. If anything fails (no ring, 407, wrong opening, private detail kept), stop, keep calls simulated, and report the call ID and the exact failure. No retry loop; at most one retry if Ganesh asks.

No real company numbers, no allow-list changes by you, no keys in repo, logs or chat. Mark nothing DONE. Update STATE.md, append the log, push, wait for HQ review.

## Short paste block

```
git pull. When I confirm the Vapi test call rang and Convex is set, do docs/hq/codex-prompts/2026-10-15-supervised-live-call.md: one supervised demo call between 10:00 and 18:00 IST, I set CALL_MODE myself, stop on any failure. No real company numbers, no env changes by you, no keys. Mark nothing DONE.
```
