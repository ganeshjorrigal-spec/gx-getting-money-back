# AGENTS.md (project: gx-getting-money-back)

This file only ADDS project rules. Ganesh's global AGENTS.md (his preferences and guardrails) stays in force. If anything here conflicts with the global file, follow the global file and flag the conflict in today's log.

## What we are building
An AI agent that gets people their money back from the apps and subscriptions they pay every day (overcharges, refunds that never landed, charges after cancelling). Full scope: `IDEA_SCOPE.md`. v1 = what ships to real users in the two-week sprint.

## Who does what
- **Claude HQ** (Ganesh's Claude project) does the thinking: scope, product decisions, milestone definitions, reviews. It writes `IDEA_SCOPE.md`, `DECISIONS.md`, `MILESTONES.md`.
- **Codex (you)** builds. You write code, `STATE.md`, `SCRATCHPAD.md`, `docs/log/`, `docs/handoff/`.
- Never edit a file owned by the other side. Propose changes in today's log under "For HQ".
- You do not make product decisions. If a needed decision is not in `DECISIONS.md`, stop and ask Ganesh.

## Start of every session, read in this order, nothing else unless asked
1. `IDEA_SCOPE.md`  2. `STATE.md`  3. `MILESTONES.md` (current milestone only)  4. `DECISIONS.md`  5. the last two files in `docs/log/`  6. `SCRATCHPAD.md`
Run `git pull` first.

## How work runs (one milestone at a time)
1. Work only on the current milestone in `MILESTONES.md`. One user story at a time; do not abstract for future stories.
2. When you believe it is done, run its acceptance checks yourself and record the evidence in today's log.
3. Mark it `READY FOR REVIEW`, never `DONE`. Ganesh or Claude HQ ticks DONE after an independent review.
4. Then update `STATE.md` (overwrite), append to `docs/log/YYYY-MM-DD.md`, clear checked items in `SCRATCHPAD.md`, commit and push.

## Memory rules
- Save before you forget: when the chat passes about half its context, or before any compaction, append what matters to today's log and update `STATE.md` first.
- Logs are append-only. Never rewrite history; supersede with a new line.
- Ganesh's live instructions go into `SCRATCHPAD.md` as checkboxes, so they survive compaction.
- Full protocol: `$repo-build-system`.

## Safety
- Secrets only in `.env` (git-ignored). Never write keys, tokens or personal data into code comments, logs, STATE or any markdown file.
- Commit small and often, with clear messages, so any change can be reverted.
- No destructive git commands (force push, history rewrite) and no deleting user data without Ganesh saying so in the chat.

## Skills in this repo
Auto: `$repo-build-system`, `$context-handoff`, `$design-system-first`.
Explicit only (type the name): `$ultraprompting`, `$plan-to-workflow`, `$premium-dashboard-factory`, `$cognitive-innovation-os-v3`, `$thinking-partner`, `$llm-council`, `$iterative-build-system`.
When to use which: `docs/SKILL-ROUTING.md`.

## Writing style for anything Ganesh reads
Plain words, short sentences, no em dashes.
