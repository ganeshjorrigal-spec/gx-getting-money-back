# HQ review: privacy fix cbbb814

Reviewed Mon 12 Oct 2026 by Claude HQ. Against: `docs/hq/codex-prompts/2026-10-12-pre-live-privacy-fix.md`.

## Verdict

**Accepted.** The fix does what the brief asked. All four probe strings now keep no passenger answer and no recording link. Cleared for simulated use and for the first supervised live test on a demo case.

Three follow-ups below. None blocks the supervised test. Two must be done before any real-company calling gate is ever opened (that gate does not exist in code today).

## What I ran myself

| Check | Result |
|---|---|
| `npx vitest run` | 187 passed, 20 files (157 before, 30 new in `lib/call-privacy.test.ts`) |
| `npx tsc --noEmit` | clean |
| `npm run build` | could not verify here: the sandbox blocks Google Fonts, so the build stops on `next/font`. Codex's log says production build passed during its deploy. Treat as Codex-reported, not HQ-verified. |
| Four HQ probe strings through `safeTranscript` and `safeCallResult` | all clean, see below |

## The four probes, re-run by HQ

Each probe was run after `Care: Please give the PNR.` and `Genie: SAMPLE`, with a recording link attached.

| Probe | Saved transcript | Recording link |
|---|---|---|
| 1. "6 digit code" then passenger digits | PNR lines kept, then "Identity check requested. No sensitive details retained.", then the cut line | none |
| 2. "Share the code on your phone" then passenger answer | same | none |
| 3. "date of birth and registered email" then answer | same | none |
| 4. Genie says "I'll connect the passenger now", no trigger word | PNR lines kept, then the cut line | none |

A plain line, `Care: Please give the PNR.`, comes back unchanged.

## Brief, point by point

1. **Cut at the patch-in.** Pass. Cuts on the assistant sentence, on a transfer event or tool call, and on a transfer ended reason. If the boundary cannot be found, it keeps only the cut line and a notice. That is the safe choice.
2. **Wider trigger words.** Pass. All ten words are in the pattern. Six have their own tests.
3. **Drop the answer and the recording after a trigger.** Pass. The saved record is checked again at storage, and the admin attach path cannot put a recording back on a transferred call.
4. **Safe default.** Pass. Missing, null, bad JSON, wrong types and malformed event lists all give no transcript, no recording, and a plain note on the call record. Empty care text is not sent to the reader as a made-up reply.
5. **Two phones.** Pass. Second saved number is the demo airline, first is the passenger. One number keeps the old behaviour and saves the exact "cannot be tested" line. The allow-list is not changed.
6. **Docs.** Pass. The "First test" paragraph in `docs/calling.md` now says two phones, in order.

## Follow-ups for Codex

1. **The word "code" blocks too much.** Probe: `Care: Your refund reference code is ABC12345.` The reference is replaced by "Identity check requested", the call is marked as a patch-in, and the recording link is dropped. That hurts the main job, which is getting the airline's reference. The brief asked for "code", so Codex did what was asked. Fix: treat "code" and "digit" as a private ask only when the care line is asking for it (read out, share, confirm, tell, send, text) or mentions an SMS or phone. Let "reference code" and "refund reference" through. Add a test with that line. Do this before any real-company gate.
2. **Check how a live call labels the speakers.** Vapi transcripts usually label the two sides `AI` and `User`, where `User` is the person who answered, which here is the care agent. Nothing in the repo maps those to `Genie` and `Care`, and the code treats any `User:` line as the passenger. Probe: `AI: Hello...` then `User: Thank you for calling...` keeps only the first line, then the cut line, and the case falls back to a mailed chase. That fails safe, but a live call would never read the care reply. I have not seen a real Vapi payload, so this is unconfirmed. Ask Codex to check the Vapi docs and add a role mapping plus a test with a Vapi-shaped payload. The supervised test will confirm it. Do this before any real-company gate.
3. **Process: no deploy before HQ review.** The log says Codex ran `npm run deploy` and pushed this to the production Convex deployment. The brief did not ask for a deploy. Risk is low: calls are simulated by default and the schema change only adds optional fields. From now on, commit and push, then wait for HQ review before deploying.

## Not covered by this review

- No live call and no phone transfer was tested. The patch-in itself stays untested until the supervised test with two phones.
- Paid model evals were not rerun for this change. They stay on the Friday plan.
- I did not read `docs/launch-video/`.

## Next, in the handoff's order

1. Send Codex follow-ups 1 to 3.
2. Then: sample case for the video (short), Cloudflare move (by Thu, with the browser storage note), restyle, Friday paid evals.
3. Tue 13 Oct: Vobiz outcome, then the live or simulated decision.

Status for `STATE.md`: privacy fix reviewed and accepted by HQ, with follow-ups. HQ can tick it, Ganesh decides when.
