# Which skill, where, when

Rule of thumb: think in Claude, build in Codex, and keep the memory in this repo.

## The split

| Where | Job | Writes |
|---|---|---|
| Claude HQ (Ganesh's Claude project) | Decide, scope, define milestones, review finished milestones, write prompts for Codex | `IDEA_SCOPE.md`, `DECISIONS.md`, `MILESTONES.md` |
| Codex CLI (this repo) | Build one milestone at a time, test, record progress | code, `STATE.md`, `SCRATCHPAD.md`, `docs/log/`, `docs/handoff/` |

## Situation to skill

| Situation | Use | Where |
|---|---|---|
| Starting or ending any build session | `$repo-build-system` (Modes 1 and 3) | Codex |
| Chat context passes about half | `$repo-build-system` (flush), then keep going or `$context-handoff` | Codex |
| Have to stop mid-milestone and resume in a new chat | `$context-handoff` | Codex |
| Got user feedback, a DM test result or an interview | `$repo-build-system` (Mode 4) | Codex or Claude HQ |
| End of each week | `$repo-build-system` (Mode 5) | Codex |
| A product or scope decision (pricing, interface, what to cut) | cognitive-innovation-os-v3, llm-council for big forks | Claude HQ |
| Ganesh wants to sharpen his own reasoning on a decision | thinking-partner | Claude HQ |
| Turning a milestone into a big autonomous Codex job | ultraprompting (write the prompt in HQ, run it in Codex) | HQ writes, Codex runs |
| A plan with many items, deciding what Codex can run unattended | plan-to-workflow | Claude HQ |
| Before generating the first UI screens | `$design-system-first` | Codex, taste lock with Ganesh |
| Making a data-heavy screen (case tracker, dashboard) production-grade | `$premium-dashboard-factory` (quality rubric only) | Codex |
| A long Claude HQ chat getting heavy | context-handoff (Claude version) | Claude HQ |
| Setting up memory for a non-code project (Cosmix etc.) | iterative-build-system (Claude version) | Claude |

## The loop for each milestone
1. HQ defines the milestone and its acceptance checks in `MILESTONES.md`.
2. Codex builds it, runs the checks, marks READY FOR REVIEW.
3. HQ (or a fresh Codex review) checks it independently, then ticks DONE.
4. Decisions that came up go to `DECISIONS.md` (HQ only).
