# Codex prompt: call model setting (D-050) and confirmation mail limits

Written by HQ, Wed 14 Oct 2026, 23:20 IST. Must be done before the supervised live call on Thu 15 Oct (10:00 to 18:00 IST). Read D-048, D-049, D-050 and `docs/hq/review-2026-10-14-d048-email-demo-cc.md`. One commit per part. No publish, no `npm run deploy`, no env values, no calling settings, no keys, no real calls or real-company mail. Mark nothing DONE.

## Part 1: call model from settings, not forced Gemini (D-050)

Today `lib/call-transport.ts` sets `model:{provider:"google",model:details.model,...}` in both the main and the transfer assistant overrides, and `convex/callActions.ts` passes `GEMINI_MODEL`. Change it so:

- The call model comes from `VAPI_MODEL_PROVIDER` (default `openai`) and `VAPI_MODEL` (default `gpt-4.1-mini`). `GEMINI_MODEL` is no longer used for calls. Gemini stays for everything else.
- Check Vapi's current API docs for `assistantOverrides.model`: whether provider and model are required when you override the system messages and tools, and the exact model name Vapi uses for GPT-4.1 Mini. Use what the docs say. Write the doc link and the answer in the log in two lines.
- Keep Genie's system instructions, first message, tools (dtmf, endCall, transfer), recording and time limits exactly as they are. Keep the transfer assistant's instructions as they are.
- Simulated mode is unchanged.
- Tests: with no settings the override uses openai and gpt-4.1-mini; with both settings the override uses them; neither override ever contains provider google unless the setting says so; the instructions text is unchanged (snapshot or exact match).
- Update `docs/calling.md` and `.env.example` (names only, no values) with the two optional settings.

## Part 2: confirmation mail limits (review fix)

In `convex/demoEmail.ts` `reserve`, before a confirmation mail is sent:
- At most 3 confirmation mails per address per calendar day (IST), using the same Gmail folding as `consume` (dots and plus part removed). Message: "We've sent this address three links today. Try tomorrow."
- At most 100 confirmation mails per day overall. Message: "The demo is busy today. Try again tomorrow."
- Move the Gmail folding into one shared helper used by both `reserve` and `consume`.
- Tests: fourth request for the same address in a day is refused (including a dotted or plus Gmail form); the 101st overall is refused; the existing per-device and per-address-confirm limits still hold.

## Proof (in today's log)

`npx vitest run`, `npx tsc --noEmit` and the static export pass. Show the built override object for one simulated call with no settings (names and instructions only, no phone numbers).

## For Ganesh (list, do not do)

- Nothing to add in Convex for the call model: the defaults work. Leave `VAPI_MODEL_PROVIDER` and `VAPI_MODEL` unset.
- The publish of D-048 plus these two parts waits for his line in chat.

## Short paste block

```
git pull. Do docs/hq/codex-prompts/2026-10-15-call-model-and-confirm-limits.md Parts 1 and 2, one commit each, before the supervised live call. D-050 is Ganesh's decision. No publish, no npm run deploy, no env values, no calling settings, no keys, no real calls or real-company mail. Mark nothing DONE. Update STATE.md, append the log, push, then wait for HQ review.
```
