# Codex prompt: re-disclose to the live agent, give Genie booking facts (Sat 17 Oct, 02:15)

Written by HQ. Read `docs/hq/review-2026-10-17-first-real-indigo-call.md`. One commit per part. No calls, no real mail, no env, key, allow-list or calling-setting changes. Mark nothing DONE.

## Part 1: disclosure to the first live person (`lib/call-transport.ts` system prompt)
Add near the top: "The first message may play to a recorded menu. When a live person first speaks to you (a greeting such as 'my name is' or 'how may I help'), your first reply must be: 'Hello, I'm an AI assistant from Refund Genie, calling on behalf of {name}, with their permission, about a refund for PNR {pnr}. This call is recorded.' Then ask for the refund status. Say this once per live person; say it again if you are transferred to a new person."
Tests: prompt contains the line with name and PNR; every earlier safety line present.

## Part 2: known booking facts (`lib/call-transport.ts` and its caller in `convex/callActions.ts`)
- Pass the case's confirmed facts into assistantOverrides: route (from and to), travel date, booking site or "booked directly", booking ID if any, amount, cancellation date if any. Only fields the case actually holds; leave out empty ones.
- Prompt line: "Known booking facts: {list}. Give them when care asks. Never invent or guess a fact that is not listed. If asked for something not listed, say you do not have it and the passenger can share it on a callback."
- Remove "confirmation that it's a refund-related query" style guessing by keeping that rule.
- Tests: facts appear when present; missing fields are omitted, not shown as empty or 'undefined'; no phone or email appears in the prompt.

## Part 3: small call manners (same prompt)
- "Listen to the whole menu before pressing a key."
- "After you ask a question, wait for the answer. If the answer is only 'sure' or 'okay', wait a few seconds before asking again."
Tests: lines present.

## Part 4: gates
Full suite once, type check, static export. Stop and tell Ganesh. He authorises deploy.

## Short paste block
```
git pull. On main, do docs/hq/codex-prompts/2026-10-17-call-disclosure-and-facts.md Parts 1 to 4, one commit each. No calls, no real mail, no env, key, allow-list or calling-setting changes. Stop after gates for Ganesh's deploy line. Mark nothing DONE.
```
