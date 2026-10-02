---
name: repo-build-system
description: Memory and context protocol for this repo. Use at the start and end of every build session, at each milestone, before compaction, when processing user feedback or interviews, and for the weekly clean-up.
---

# Repo Build System

The repo is the memory. The chat is a disposable terminal. Nothing that matters may live only in a chat that compacts.

This is the repo-native version of Ganesh's iterative-build-system skill, adapted for a two-AI setup: Claude HQ thinks, Codex builds, and both read and write the same GitHub repo.

## The layers, all as markdown in git

| Layer | File(s) | Lifecycle | Owner |
|---|---|---|---|
| Standing rules | `AGENTS.md`, `.agents/skills/` | Rarely changes | Ganesh / HQ |
| Charter | `IDEA_SCOPE.md` | Locked. Changing it is a decision, not an edit | HQ |
| Decisions | `DECISIONS.md` | Append-only | HQ |
| Milestones (the ratchet) | `MILESTONES.md` | Items leave only as DONE (after review) or CUT (with a reason) | HQ defines, Codex marks READY FOR REVIEW |
| Current state | `STATE.md` | Overwritten at every milestone | Codex |
| Live instructions | `SCRATCHPAD.md` | Checked off and purged each milestone | Codex |
| Daily log | `docs/log/YYYY-MM-DD.md` | Append-only, one file per day | Codex |
| Warm knowledge | `docs/research/<topic>/YYYY-MM-DD_<concept>.md` | One insight per file, accumulates, superseded not deleted | Whoever processed the source |
| Cold archive | `docs/archive/` | Raw transcripts, old logs. Write once, read rarely | Whoever processed the source |
| Handoffs | `docs/handoff/` | Only when a chat must be abandoned mid-milestone | Codex |

Rule of ownership: never edit a file the other side owns. Put proposals in today's log under a heading "For HQ".

## Mode 1: Start a session
1. `git pull`.
2. Read in this order and nothing else unless asked: `IDEA_SCOPE.md`, `STATE.md`, the current milestone in `MILESTONES.md`, `DECISIONS.md`, the last two daily logs, `SCRATCHPAD.md`.
3. State in one line what the current milestone is and the next single action. If `STATE.md` and the code disagree, say so before building.

## Mode 2: During work
- One user story at a time. Do not abstract for stories that are not in the current milestone.
- Each new instruction from Ganesh goes into `SCRATCHPAD.md` as a checkbox immediately.
- Pre-compaction flush: when the chat passes about 50% of its context, or right before any compaction, append the important facts, choices and open questions to today's log and refresh `STATE.md`. If there is nothing new, write nothing.
- Prune: do not paste large tool outputs into logs. Summarise them in one line and point to the file.

## Mode 3: Close a milestone (the verification gate)
1. Run every acceptance check listed for the milestone. Record pass or fail with evidence (command output summary, screenshot path, URL) in today's log.
2. Mark the milestone `READY FOR REVIEW` in `MILESTONES.md`. Never mark DONE yourself. The builder does not grade its own work.
3. Overwrite `STATE.md`: built, in flight, not started, known bugs, assumptions in force, next single action. Keep prototype state separate from the production target.
4. Ratchet check: list every open item in `MILESTONES.md` and `SCRATCHPAD.md` that this session did not touch. Flag each one in the log. Nothing disappears silently.
5. Purge checked items from `SCRATCHPAD.md`.
6. Commit with a message naming the milestone, then push.

## Mode 4: Process feedback, interviews or user tests (the fan-out)
1. Save the raw material once to `docs/archive/YYYY-MM-DD_<source>.md`. Never re-read it again unless a note is insufficient.
2. Extract warm notes, one insight per file, filed by topic (never by date or call name):
   ```
   ---
   topic: <concept>
   claim: <the insight in one sentence>
   type: constraint | insight | user-quote | definition | design-rationale | open-question
   source: docs/archive/<file>.md
   date: YYYY-MM-DD
   status: active | superseded
   superseded-by: <file or —>
   ---
   2 to 4 sentences of nuance.
   **Implication for build:** one sentence.
   ```
3. Anything that needs a decision goes to "For HQ" in today's log. Codex does not decide it.
4. Reconcile `MILESTONES.md` and `SCRATCHPAD.md` (ratchet check as in Mode 3).

## Mode 5: Weekly clean-up (forgetting on purpose)
- Compress daily logs older than 7 days into one dated summary in `docs/log/summary-<week>.md` (outcomes and decisions only, one line each). Move the raw logs to `docs/archive/logs/`.
- Mark superseded warm notes; do not delete them.
- Prune `SCRATCHPAD.md` to zero.

## Mode 6: Handoff (only if a chat must end mid-milestone)
Use `$context-handoff`. It writes to `docs/handoff/`, never a pasteable summary as the system of record.

## Finding things
Files are named by concept so a plain search finds them. Use exact-text search for IDs, order numbers and names. No vector database is needed at this scale.

## Hard rules
- Secrets live only in `.env`. Never in markdown, logs or comments.
- Logs and decisions are append-only.
- A session is complete only when `STATE.md` is current, today's log is written, the ratchet check is done and the commit is pushed.
