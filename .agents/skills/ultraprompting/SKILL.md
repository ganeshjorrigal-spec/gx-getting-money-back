---
name: ultraprompting
description: Turn a milestone into a bounded autonomous job: precise goal, external check, permission to iterate, stop rules.
---

> **Running in Codex (added for this repo).** This skill was written for Claude. Read "Claude", "Claude Code", "Project knowledge", "Drive via MCP", "tracker via MCP" and "subagents" as: Codex, this repo's markdown files (see AGENTS.md and $repo-build-system), and sequential passes. Never make product decisions from inside this skill: decisions live in DECISIONS.md. If one is missing, stop and ask Ganesh.


# Ultraprompting

Turn an ordinary request into a self-organizing AI job when the work can be responsibly delegated. The objective is not a clever prompt. It is a temporary organization that can plan, build, test, criticize, remember, learn, and stop. Prefer precise destinations and trustworthy feedback over step-by-step instructions.

## Core Principle

An ultraprompt has three irreducible parts:

1. **Goal** -- the observable destination.
2. **Check** -- an external scoreboard that distinguishes better from worse.
3. **Permission to continue** -- authority to iterate without waiting after every step.

Drop any one and the pattern collapses in a predictable way: no goal leaves the AI nowhere to go; no check leaves it unable to tell better from worse; no permission means it hands you one draft and waits. When an ultraprompt isn't working, diagnose which of the three is missing or weak before adding more instructions.

Three machinery patterns, used only when appropriate:

- **Workflow** -- a large job that naturally decomposes into stages or parallel work.
- **Goal** -- a finish line that Claude can evaluate repeatedly.
- **Loop** -- a bounded repeated action, especially monitoring or maintenance.

Do not add these words mechanically. The conditions they create matter more than the labels.

## Mindset

- Treat Claude like a capable collaborator, not a keystroke-level intern.
- Hand over outcomes, not merely intermediate artifacts.
- Drop the route while keeping the destination precise.
- Preserve freedom to choose tools, decomposition, and tactics.
- To give the AI real freedom, share less instruction, not more -- over-specifying the route is what quietly cancels the freedom you just granted.
- Replace adjectives with evidence.
- Design the critic, not only the generator.
- Spend early effort learning which approach deserves expensive execution.
- Revisit standing ultraprompts and routines periodically and cut instructions that no longer earn their place -- a prompt tuned for one model generation can hold back a newer one.

## Instructions

### Phase 1 -- Detect the opportunity

1. Read the user's request and available project context.
2. Identify the complete outcome behind the immediate ask -- look for the "overhang," the gap between what the model could do here and what the request as phrased actually asks for. Requests are often sized to old habits, not to current capability.
3. Decide whether the job benefits from autonomous iteration.
4. Determine whether a trustworthy evaluation signal exists or can be constructed.
5. If the task is too small, lacks a meaningful feedback signal, or autonomy adds little leverage, say so and produce a normal concise prompt instead.
6. Do not force an ultraprompt merely because the user requested one.

### Phase 2 -- Build the delegation (the Seven Moves)

Apply all seven moves:

1. **Whole job, not next step.** Hand over the complete responsibly delegable outcome.
2. **Destination, not route.** Specify destination + context + boundaries + exit criteria; do not prescribe the route unnecessarily.
3. **External scoreboard.** Establish evaluation that does not depend on the builder's own judgment of its work.
4. **Check changes the next action.** Make every evaluation result alter what happens next.
5. **Independent builder and critic.** Separate builder and critic roles when independent evaluation improves reliability.
6. **Durable learning memory.** Maintain a compact learning log across rounds.
7. **Cheap exploration before expensive commitment.** Explore genuinely different approaches cheaply before committing resources.

Read `references/templates.md` for ready-to-use language for each move. Adapt and weave the relevant fragments into one coherent ultraprompt -- never paste them in as seven disconnected instructions.

### Phase 3 -- Choose the machinery

| Pattern  | Use when                                                    | Avoid when                        |
|----------|-------------------------------------------------------------|-----------------------------------|
| Workflow | Large job with stages, fan-out, or parallel roles           | Tiny one-pass task                |
| Goal     | Work should continue toward a measurable finish line        | Finish line is purely subjective  |
| Loop     | Same bounded action repeats (monitoring, maintenance)       | One-time project                  |

Combine workflow + goal when a large staged job also needs iterative convergence. A loop is only for recurring work; do not turn a one-time project into an indefinite routine (see the Loop vs. Routine distinction below).

For a large job with no obvious stage breakdown, `references/playbook.md` has a default five-stage workflow template to start from.

### Phase 4 -- Engineer the scoreboard

Prefer, in order of trustworthiness:

1. Automated tests or measurable results.
2. Direct comparison with a reference artifact.
3. Real-world observable outcomes.
4. Structured rubrics with evidence.
5. Multiple imperfect signals plus independent review.

For subjective work, never pretend the rubric is objective merely because it has numbers. Require evidence and distinguish verified facts from judgment. If no credible scoreboard exists, either create a clearly labeled proxy evaluation or downgrade the autonomy.

A good scoreboard answers five questions:
- What is being measured?
- What evidence is produced?
- What distinguishes better from worse?
- What action changes when the result is weak?
- What threshold means "done"?

### Phase 5 -- Engineer the learning loop

Use: Build -> Test -> Identify largest gap -> Revise -> Retest.

After each failed evaluation:
- Identify the largest consequential gap.
- Diagnose the likely cause.
- Change the approach specifically because of the evidence.
- Preserve what is already working.
- Retest completely.

If progress stalls for two meaningful rounds, change strategy rather than repeating the same failed tactic. A check is not a feedback loop; the result must actually alter the next attempt.

### Phase 6 -- Engineer memory

Create a compact durable notebook when the task spans multiple rounds. Record:
- Current best result.
- Confirmed findings and evidence.
- Failed approaches and why they failed.
- Unresolved hypotheses and confidence.
- Next highest-value test.

Read the notebook before each cycle. Update it afterward. Compress obsolete detail instead of accumulating raw history.

### Phase 7 -- Engineer safe autonomy

Every autonomous job must define:
- Permitted environment.
- Prohibited actions.
- Time / iteration / compute budget.
- External side-effect limits.
- Escalation conditions.
- Finish condition.

Require human confirmation before consequential actions: production changes, destructive operations, financial commitments, publication under a person's identity, credential/security changes, legal commitments, or actions affecting third parties.

Never interpret "don't stop until done" as permission to exceed these boundaries. Translate such requests into an explicit quality threshold, a time/iteration/cost cap, an escalation condition, and a final verification.

## Output Format

Unless the user requests prompt-only output, return:

```
STATUS: ULTRAPROMPT READY | NORMAL PROMPT | BLOCKED

OPPORTUNITY:
Why this task does or does not benefit from autonomous execution.

ULTRAPROMPT:
[One self-contained prompt ready to paste into Claude.]

CONTROL DESIGN:
  Goal:
  Scoreboard:
  Workflow:
  Loop:
  Critic:
  Memory:
  Budget:
  Escalation:
  Exit condition:

RISKS:
[Only consequential risks and required confirmations.]
```

The actual ultraprompt must be one coherent delegation, not seven disconnected mini-prompts.

## Prompt Construction Rules

The generated prompt should contain, as applicable:
- Precise destination.
- Necessary context.
- Explicit boundaries.
- Observable success criteria.
- Evaluation method and evidence requirement.
- Freedom over route and implementation.
- Adaptive revision loop.
- Independent critic.
- Durable learning record.
- Cheap exploration.
- Resource and iteration limits.
- Escalation rules.
- Final verification.

Delete instructions that merely restate obvious capabilities. Do not prescribe architecture, file structure, tool choice, or implementation steps unless they are genuinely required constraints.

## Failure Handling

| Issue                  | Symptom                              | Fix                                                       |
|------------------------|--------------------------------------|------------------------------------------------------------|
| Vague goal             | "Make it great"                      | Define observable success                                  |
| Weak eval              | Agent says "looks good"              | Require external evidence                                  |
| Fake loop              | Same mistake repeats                 | Diagnose largest gap and change strategy                   |
| Self-review bias       | Builder approves its own work        | Fresh independent critic                                   |
| Endless polishing      | Critic always finds another issue    | Permit PASS and define threshold                           |
| Lost learning          | Repeated experiments, no progress    | Durable compact learning log                               |
| Premature commitment   | Large build before validation        | Cheap competing tests first                                |
| Over-specification     | Long rigid instructions              | Keep constraints; remove route                             |
| Scope creep            | Job expands indefinitely             | Re-anchor to destination and budget                        |
| Unsafe autonomy        | Agent approaches consequential action| Pause and escalate                                         |
| No trustworthy eval    | Only subjective preference exists    | Use multiple imperfect signals or reduce autonomy          |
| Progress stalls        | Two rounds produce no meaningful gain| Change approach, not wording                               |

## Complex Cases

Read `references/playbook.md` for detailed guidance on critic design, memory design, exploration design, safety boundaries, the default workflow-staging template, and complex-case handling (subjective deliverables, research tasks, coding tasks, long-running tasks).

Read `references/examples.md` for four worked examples (two successes, one failure, one blocked) that illustrate correct skill decisions.

Read `references/templates.md` for ready-to-use language fragments for each of the seven moves.

## Claude Code Semantics

When supported by the execution environment, each machinery pattern has a direct trigger. Describe the job in plain English, then invoke the pattern:

**Workflow** -- describe the whole job, then add "Use a workflow" at the end. Claude breaks it into stages and fans out sub-agents on its own:

> Use a workflow to turn the vendor contracts in this folder into a risk summary. Stage 1: one agent per contract, pulling out termination clauses and liability caps. Stage 2: one agent groups the contracts by risk level. Stage 3: one agent writes a one-page summary ranked by exposure.

**Goal** -- state the finish line after `/goal`. Claude drafts, checks itself against it, and redrafts until it's met or the round budget runs out:

> /goal the product one-pager in onepager.txt would make a stranger understand what we sell in one read, or stop after 4 rounds

**Loop** -- state the interval and the task after `/loop`. Claude repeats the action on that cadence:

> /loop 20m check the build folder for a finished export and ping me the moment it lands

If the environment does not support these exact keywords, preserve the underlying semantics in plain language rather than depending on the magic words themselves -- the words are shorthand for the conditions, not the conditions themselves.

### Loop vs. routine

These are not interchangeable, and picking the wrong one silently breaks the job:

- A **loop** runs inside the session that started it. Close the session or shut down the machine, and the loop stops.
- A **routine** runs on a schedule or in response to an event on Anthropic's servers, independent of whether the user's machine is on.

Use a loop for something to watch while actively working. Use a routine for something that must keep running after the user has logged off.

## Final Design Principle

Autonomy is never the objective. Autonomy + trustworthy feedback + memory + boundaries is.
