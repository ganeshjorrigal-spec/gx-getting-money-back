---
name: plan-to-workflow
description: Gate a multi-item plan before automating: decide per item what runs unattended, what stays supervised, what is blocked. Explicit use only.
---

> **Running in Codex (added for this repo).** This skill was written for Claude. Read "Claude", "Claude Code", "Project knowledge", "Drive via MCP", "tracker via MCP" and "subagents" as: Codex, this repo's markdown files (see AGENTS.md and $repo-build-system), and sequential passes. Never make product decisions from inside this skill: decisions live in DECISIONS.md. If one is missing, stop and ask Ganesh.


# Plan → Workflow

This skill converts a **plan of action** into a **gated Execution Map**. It is the operating
discipline for the article *"Claude Dynamic Workflows for PMs,"* corrected by a stress-test:
the article is right about the mechanism, optimistic about the safety, and quiet about the
discipline. This skill *is* the discipline.

**Prime directive:** gate first. Most plans are mostly *supervised engineering with a few
automatable pockets*, not one big workflow. Your value is finding the pockets and refusing to
automate the rest. Never fire `ultracode` on a plan that hasn't passed the gate, item by item.

Read `references/operating-playbook.md` for the full procedure (gate, build template,
supervised-trial discipline, containment). Read `references/article-context.md` only if you
need the source mechanism. **Read the playbook before producing an Execution Map.**

---

## The three guarantees (why a workflow ever earns its cost)

A dynamic workflow is only worth building when it delivers what a single long session cannot:
**(1) Completeness** — every item processed (a loop re-checks the condition); **(2) Independent
judgment** — the grader is a *different* agent from the producer; **(3) Goal stability** — the
objective lives in code, not a drifting context. If a plain prompt already gives all three, do
not build a workflow.

---

## Procedure

### Step 1 — Ingest the plan
Read the whole plan. Identify the atomic units (items, tickets, rounds, features) and any
capability/status labels the author already assigned (e.g. ✅ Full / ◐ Build-blind / ⚠ Needs
input / ⛔ Data-blocked). Note explicit human gates the author wrote ("needs sign-off", "one
round per response", "don't touch X without approval") — these are hard constraints, not
suggestions.

### Step 2 — Run the Gate on every unit
For each unit, answer the four gate questions (full detail in the playbook, Stage 0):

1. **Chained stages?** Does one stage's output decide the next (route/score/filter/loop/verify)?
2. **Nameable rubric?** Can you state what "good" or "pass" means?
3. **Runs more than once?** Recurring, or large enough that the harness pays for itself?
4. **Bounded & independent?** Decomposable into units that don't cross-talk?

### Step 3 — Classify each unit into one of four verdicts

| Verdict | When | What you do |
|---|---|---|
| **WORKFLOW** | All four gates pass | Build a harness (Step 4). Name the pattern. |
| **SUBAGENT** | One round of parallel judgment (single fan-out + merge), gates 2+4 pass but not 1 | One subagent fan-out, no harness. |
| **SUPERVISED** | Gate fails on human-gate/cross-talk/build-blind grounds | Keep human-in-the-loop. Say why. Do NOT automate. |
| **BLOCKED** | Missing input (⚠) or missing data (⛔) | List the exact unblocker and owner. Build nothing yet. |

**Hard rule:** any unit the plan marks "needs sign-off", "build-blind", or that edits a fragile
shared artifact (a large file, a load-bearing anchor) is **SUPERVISED**, regardless of how
automatable it looks. A human gate the author wrote always wins over the gate questions.

### Step 4 — For WORKFLOW units only: design the harness
Match the unit to one of the six patterns and sketch the harness using the build-prompt template
in the playbook (Stage 1). For each, specify: the per-unit agent + model tier (cheap for rote,
expensive only for judgment), the canonicalize step if labels are free-text, the scoring/rubric
(in code where it's math), the **separate judge** for any grading, the **stop condition**, and a
**token budget**. Then attach the **supervised-trial plan** (Step 5) — never hand back a harness
without it.

### Step 5 — Attach the supervised-trial gate (the step the article skips)
Every WORKFLOW unit ships with this before it's allowed to be skill-ified or scheduled:
- Run **once, attended**. Hand-check **3–5 items end to end** for *correctness*, not just
  "it ran". ("Verified" must mean right, not merely rendered.)
- Confirm **completeness** (counts match) and **judge independence**.
- Iterate the **prompt, not the code**; let Claude rewrite the harness.
- Exit only after **3–4 supervised runs** hold up. Only then → skill / schedule / `/goal` /
  budget.

### Step 6 — Containment (for anything that will run unattended)
The guardrail is the toolset, not a prompt. Give each agent an explicit minimal tool allowlist;
treat "read-only" as unverified (a read-only agent can still carry a shell that writes/deletes);
keep mutating actions in one narrow reviewable step; confirm data-governance before fanning
agents over real customer/company data. See playbook Stage 5.

---

## Output format — the Execution Map

Always return this structure:

```
## Execution Map: <plan name>

### Summary
- Automate now (WORKFLOW): <count> — <one line>
- Single fan-out (SUBAGENT): <count>
- Human-gated (SUPERVISED): <count> — and why
- Blocked (BLOCKED): <count> — and the unblockers

### Automate now (WORKFLOW)
For each: Unit ID · pattern · harness sketch (stages, model tiers, rubric, judge, stop, budget)
· supervised-trial plan · containment notes.

### Single fan-out (SUBAGENT)
For each: Unit ID · why a subagent suffices · the one prompt.

### Human-gated (SUPERVISED) — do not automate
For each: Unit ID · the specific gate it fails (human sign-off / cross-talk / build-blind).

### Blocked
For each: Unit ID · missing input or data · who unblocks it.

### Recommended order
The sequence to actually run, respecting the author's human gates and dependencies.
The one thing to do first.
```

Keep it scannable. Lead with the Summary so the reader sees the split before the detail.

---

## Worked example (abbreviated)

**Input:** a dashboard feedback inventory (~28 items, labels ✅/◐/⚠/⛔) + a round-sequenced plan
that says "one response = one round, no edits near the TABS anchor without sign-off."

**Correct output:**
- **WORKFLOW:** capability-rating red-team (adversarial verification, judge re-rates every item);
  "no-data" bug sweep (loop-until-done, one agent per bug checks field-mapping); feedback intake
  triage (classify-and-act, recurring); solution-option generation for the two largest items
  (generate-and-filter).
- **SUPERVISED:** all code edits to the large file, everything near the TABS anchor, and every
  ◐ Build-blind item — because the plan wrote explicit human gates and only a live-data pull
  validates them.
- **BLOCKED:** ⚠ Needs-input items (benchmark values) and the ⛔ Data-blocked redesign.
- **Do first:** run the red-team workflow on the inventory — it's the cheapest, highest-leverage
  automatable unit and it sharpens every downstream supervised round.

**Wrong output (what this skill exists to prevent):** "Here's an `ultracode` harness that builds
all 28 items." That fans an unattended fleet across a fragile shared file with human sign-off
gates — the canonical over-application.

---

## When NOT to produce a workflow at all
If *no* unit passes all four gates, say so plainly and hand back a clean SUPERVISED/BLOCKED map
with a recommended manual order. A plan with zero workflow-able pockets is a normal, common
result — coordination you didn't need is still tokens spent.
