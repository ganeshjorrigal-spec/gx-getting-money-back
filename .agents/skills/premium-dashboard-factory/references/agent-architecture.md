# Agent Architecture — mapping production concerns to Claude primitives

The hard part of an "agentic system" is not spawning agents. It is deciding **what should not
be an agent.** This reference maps every concern in dashboard production to the right
primitive, and gives the roster pattern to instantiate.

---

## The five primitives, and when each earns its place

| Primitive | Use it for | Do NOT use it for |
|---|---|---|
| **Skill** | Reusable knowledge: the design system, IA patterns, data-contract conventions, the quality rubric, domain context | Anything dynamic. A skill is read, not run |
| **Subagent** | A bounded task needing *independent judgment* (a critic ≠ the builder) or a specialized isolated step (build one module, map one schema) | Knowledge that could be a skill; trivial steps a single pass handles |
| **Orchestrator** | Sequencing the pipeline and holding the goal-in-code (the rubric) so it does not drift | Doing the work itself; it conducts, it does not build |
| **Loop** | *Completeness* (every module built to spec) or *goal stability* (re-checking the bar each pass) | A task a single prompt already completes with all guarantees |
| **Human gate** | Irreversible or trust-critical steps: credentials, visual sign-off, go-live | Steps that are safe, reversible, and low-consequence |

**The default is a skill.** Reach for a subagent only when you can name the *independent
judgment* or *bounded specialization* it provides. Reach for a loop only when you can name the
*completeness* or *goal-stability* guarantee a single pass cannot give. If a plain prompt
already delivers the guarantee, do not build the machinery.

---

## The three guarantees a loop must earn (borrowed from plan-to-workflow)

A build loop is only worth its cost when it delivers what one long session cannot:

1. **Completeness** — every module is processed and re-checked against the rubric (the loop
   re-evaluates the exit condition each pass).
2. **Independent judgment** — the grader/critic is a *different* agent from the builder.
3. **Goal stability** — the quality bar lives in the rubric (in code/skill), not in a chat
   context that compacts and drifts.

If a single prompt already gives all three, do not build the loop. This is the test.

---

## The roster pattern

A complete premium-dashboard factory has roughly this shape. Adapt names and counts to the
project; keep the *roles*.

### Skills (knowledge — the default layer)
- **design-system** — the token layer + premium patterns (see `design-system-spec.md`). Every
  builder imports it. This is what makes N modules feel like one product.
- **quality-rubric** — the six-dimension bar. The builder reads it as a target; the critic
  reads it as a checklist.
- **data-contract conventions** — how a module declares its source, fetch, freshness, and the
  schema→props mapping.
- **domain skills** — project-specific context (org, metrics, what each number means). For a
  TSS portal these are the existing `tss-business-context` and `tss-dashboard-schema`.

### Subagents (bounded judgment / specialization)
- **module-builder** — takes a module spec + the design-system + data-contract and builds the
  component. One per module when fanning out.
- **design-critic** — grades a built module against the rubric, returns structured pass/fail
  with evidence. **Must be a different agent from module-builder** (guarantee 2).
- **data-contract mapper** — given a source schema, produces the schema→props mapping and the
  reconciliation check. Specialized, isolated, reusable.

### Orchestrator (the conductor)
- Sequences **spec → build → critique → fix**; holds the rubric as the goal; routes failures
  back into the loop; pauses at human gates; fans out per module against the shared token
  layer. Lives in Claude Code. It does not build — it conducts.

### Loops
- **Build→fix loop** (per module): build, critique, fix, re-critique, until all six rubric
  dimensions pass or max-iterations. On max-iterations-still-failing → escalate to a human
  with named failures; never ship silently.
- **Portal fan-out** (across modules): run the per-module loop for each of N modules against
  the *same* rubric and *same* token layer, so the language is identical everywhere.

### Human gates (Tier-2 discipline — never auto-execute)
- **Data-source connection** — credentials, OAuth, API keys. A human connects; the system
  never holds personal creds.
- **Visual sign-off** — a human approves the look before a module is considered done.
- **Go-live** — promoting a module to production is a human action with a human owner.

---

## Data flow (one module, end to end)

```
   module spec ──▶ orchestrator
                     │
                     ▼
        ┌──── module-builder (subagent) ──── imports: design-system + data-contract skills
        │            │
        │            ▼  built module
        │     design-critic (subagent) ──── checklist: quality-rubric skill
        │            │
        │     pass? ─┴─ no ──▶ fix (back to builder with named failures)  ──┐
        │            │                                                       │
        │           yes                                                      │
        │            ▼                                            (loop, max-iterations)
        │     [human gate: visual sign-off]                                  │
        │            │                                                       │
        └────────────┼───────────────────────────────────────────────◀──────┘
                     ▼
        [human gate: data connection] ──▶ [human gate: go-live] ──▶ handoff package
```

The two data/go-live gates sit at the boundary because they are the irreversible, trust-
critical steps — exactly the ones a Tier-2 system keeps a human on.

---

## How this plugs into the existing skill ecosystem

- **iterative-build-system** — owns cross-session context: the charter, the spec, the decision
  log, the open-items tracker, the warm-knowledge store. The factory's *state of record* lives
  there, not in chat. Do not reinvent it; reference it.
- **plan-to-workflow** — gates the blueprint's plan before any loop fires. Run it at Step 5.
  It decides per-item what is safe to automate vs. what stays human-supervised.
- **frontend-design** — borrow for the *visual-thesis* step when a new module needs a
  distinctive direction rather than just the shared tokens. Note its warning about AI-default
  looks (cream/terracotta etc.): derive ambient tones from the *actual brand*, not a default.
