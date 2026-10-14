# HQ review: D-048 email required and demo CC (08ab48f, 2e9bd9c, 0f0f38a)

Reviewed Wed 14 Oct 2026, 23:15 IST by Claude HQ. Against: `docs/hq/codex-prompts/2026-10-14-email-required-demo-cc.md`.

## Verdict

**Accepted for code, with one fix before publish.** Parts 1 and 2 do what the brief asked. Part 3 is proved locally only: real Gmail arrival is not verified, and Codex said so plainly. That check needs the published backend, so it becomes the first step after publish, done by Ganesh with his own inbox.

## What I ran myself

| Check | Result |
|---|---|
| `npx vitest run` | 339 passed, 46 files |
| `npx tsc --noEmit` | clean |
| Read `lib/demo-email.ts`, `convex/demoEmail.ts`, `convex/demoEmailActions.ts`, the chase and demo send changes | see below |

## Brief, point by point

1. **Email required at the real confirm step.** Pass. Free check result still shows first. Same-case email reused. Nothing drafted to a company without an email. CC to the user is tested.
2. **Demo confirmation link.** Pass. 64-character one-time link, 30 minutes, single use, older links superseded, case key never in the mail body (only an encrypted copy is stored, and the link carries the nonce only).
3. **Demo mails.** Pass. To stays the demo desk. CC is the confirmed address. Every subject starts "Demo:". First body line is the required notice. Extra update mails are skipped on demo cases.
4. **The allow-list exception cannot reach a real case.** Pass. `demoRecipientsAllowed` checks every address against CHASE_ALLOWLIST for any case without the demo story, and is run at reservation and again right before sending. Good.
5. **Limits.** Pass as written: 3 confirmation mails per device per day, 1 confirmed demo per address per day (Gmail dots and plus aliases folded).
6. **`/start/?demo=flight-self` unchanged.** Pass.

## Fix before publish (small)

**The confirmation mail can still be sent to strangers in volume.** The per-device limit counts a device ID the browser makes up, so a script can make new devices. Demo creation is capped at 200 a day overall, so the worst case is about 600 confirmation mails a day to any addresses from the demo Gmail. That is enough to get the demo mailbox flagged as spam, which would break the public demo before the submission. Fix:
- At most 3 confirmation mails per address per day (same folding as the confirmed-demo limit), checked before sending.
- At most 100 confirmation mails a day overall.
- Clear messages for both. Tests for both.

## After publish (Ganesh, with HQ)

- Run the public demo once with your own Gmail: confirmation mail arrives, link starts the demo, each demo mail and reply lands in your inbox with "Demo:" subjects and the notice line.
- If the confirmation mail does not arrive within 2 minutes, tell HQ. Rollback is a republish of 2156ce9.

## Not covered

- No real Gmail delivery tested (needs the published backend).
- Event flow screens checked from Codex's screenshots only.

Status for `STATE.md`: D-048 code reviewed and accepted by HQ, pending the confirmation-limit fix and the live Gmail check. Nothing DONE yet.

## Follow-up review: 8cf4c6d and 5c1e8be (Wed 14 Oct, 23:59 IST)

**Accepted.** 350 tests, 47 files, type check clean (HQ ran both).

- **D-050 call model (8cf4c6d).** Both overrides now use `VAPI_MODEL_PROVIDER` / `VAPI_MODEL`, default `openai` / `gpt-4.1-mini`. Instructions, tools, recording and time limits unchanged. Codex checked the Vapi docs: the model override needs provider and model when messages are given, and Vapi names the model `gpt-4.1-mini`. `GEMINI_MODEL` no longer reaches calls.
- **Confirmation limits (5c1e8be).** 3 mails per folded address per IST day and 100 a day overall, checked before the mail is sent, inside the same atomic step. Gmail folding is one shared helper. Tests cover aliases across devices, the 101st refusal, the IST midnight reset and the old device limit.

**Important for Thursday:** the call code runs on the Convex backend. The supervised call uses the new model only after `npm run deploy`. So the publish (`docs/hq/codex-prompts/2026-10-15-publish-before-live-call.md`) must run before the supervised call.
