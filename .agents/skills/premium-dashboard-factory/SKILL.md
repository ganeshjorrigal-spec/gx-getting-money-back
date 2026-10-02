---
name: premium-dashboard-factory
description: Quality bar for data-heavy UI: real data, loading, empty and error states, accessibility, production readiness. Explicit use only.
---

> **Running in Codex (added for this repo).** This skill was written for Claude. Read "Claude", "Claude Code", "Project knowledge", "Drive via MCP", "tracker via MCP" and "subagents" as: Codex, this repo's markdown files (see AGENTS.md and $repo-build-system), and sequential passes. Never make product decisions from inside this skill: decisions live in DECISIONS.md. If one is missing, stop and ask Ganesh.


# Premium Dashboard Factory

This skill turns "make dashboards as good as the reference one" into a **documented,
repeatable agentic system**. Its job is not to hand-build a single screen — it is to
**architect the production line** (which knowledge becomes skills, which work becomes
subagents, what the orchestrator sequences, where loops run, where humans stay in the loop)
and to **encode the quality bar** that line must clear every time.

**Prime directive — encode knowledge as skills; reserve agents and loops for bounded
judgment and completeness.** Most "agentic" dashboard systems over-build: they spawn agents
for work a single skilled pass handles. Default to skills (reusable knowledge). Add a
subagent only when a task needs *independent judgment* (a critic that is not the builder) or
a *bounded specialized step*. Add a loop only when you need *completeness* (every module
built to spec) or *goal stability* (the bar lives in code, not a drifting context). This
mirrors the "build skills, not agents" position: it is right for this context.

---

## What this skill produces, in order

1. **A quality bar** — the rubric the system must clear, instantiated for this project.
2. **An agent roster** — the skills, subagents, orchestrator, loops, and human gates, each
   mapped to the concern it owns.
3. **A design-system token layer** — the concrete premium tokens (semantic vs cosmetic),
   reusable across every module so the portal reads as one product.
4. **A derived information architecture** — sections, metric hierarchy, and disclosure layers
   built backward from each audience's decisions (not from available metrics).
5. **A blueprint document** — the full-fledged, portable plan (the primary deliverable).
6. **A build-run procedure** — how to actually produce one new dashboard module end to end.

Do them in this order. Do not skip to building modules before the bar and the roster exist —
that is how prototypes that never reach production get made.

---

## Where this runs (read before designing)

The agentic system has parts that live in different environments. Be explicit about this in
the blueprint, because it determines what is even possible.

| Capability | Environment | Notes |
|---|---|---|
| Orchestrator + subagents + loops (the factory) | **Claude Code / Agent SDK** | The only place multi-agent orchestration and unattended loops actually run |
| Single-module design iteration | **Claude.ai chat** | Where one screen gets built/refined by hand (how the reference dashboards were made). Portable, but cannot orchestrate |
| Cross-session context / state of record | **iterative-build-system** | Delegate here; do not reinvent context management |
| Gating the plan before firing a loop | **plan-to-workflow** | Delegate here; never fan an unattended fleet at ungated work |
| One-off aesthetic risk / distinctive direction | **frontend-design** | Borrow for the visual-thesis step of a new module |

If the user only has claude.ai (no Claude Code), say so plainly: the full factory (loops,
orchestrated subagents) is not available there; what *is* available is the quality bar + the
design-system token layer + a manual, single-module build run. That is still most of the value.

---

## The operating procedure

### Step 0 — Frame the system
Confirm: (a) execution environment (Claude Code vs claude.ai-only), (b) how many modules /
how repeatable (one dashboard, or a portal of N modules to a shared language), (c) the data
reality (is there a live source, or is this a prototype that must be wired before it counts
as "useful"). Write these three down. They size everything else.

### Step 1 — Set the quality bar
Read `references/quality-rubric.md`. It defines "premium" across six dimensions: visual
craft, typographic discipline, motion, information architecture, functionality, and
robustness+handoff. Instantiate it for this project — turn each generic pass-bar into a
concrete, checkable assertion for *these* dashboards. This rubric is dual-purpose: it is the
**design target** the builders aim at and the **checklist the critic subagent grades against**.

### Step 2 — Design the agent roster
Read `references/agent-architecture.md`. Map every production concern to the right Claude
primitive (skill / subagent / orchestrator / loop / human gate). Produce the roster as a
table plus a one-paragraph data-flow description. Enforce the prime directive: justify every
subagent and every loop, or demote it to a skill or a single pass.

### Step 3 — Encode the design system
Read `references/design-system-spec.md`. Produce or extend a **token layer** (start from
`assets/design-tokens.css`) with the semantic/cosmetic split made explicit. Semantic tokens
(a color that *means* a channel or a state) are locked and documented; cosmetic tokens
(canvas, shadow, radius) are free to change globally. This token layer is itself a reusable
skill/asset — every module imports it, which is what makes a portal feel like one product.
The design system decides *how it looks*; the next step decides *how it is organized* — both
feed the module spec.

### Step 4 — Derive the information architecture
Read `references/information-architecture.md`. IA is **derived, not copied** — built backward
from the decisions each audience makes, never forward from the metrics that happen to exist.
Run the derivation procedure per dashboard/module and produce its five deliverables: the
audience→decision map, sections-from-decisions, a primary/secondary/tertiary metric hierarchy
per section, the Layer 0/1/2 disclosure assignment, and the scan path + above-the-fold spec.
This is the part leadership actually responds to: the top decision's answer sits in Layer 0,
above the fold, correct without a click, with nothing else competing for primacy. Visual
hierarchy (Step 3) must mirror this metric hierarchy, or a well-tokened view still reads as
cluttered.

### Step 5 — Write the blueprint
Read `references/blueprint-template.md` and fill it in. This is the deliverable: system goal,
instantiated quality bar, agent roster + diagram, the derived IA (audience→decision map,
section map, disclosure layers), the data contract (how a module gets real data), the
build-run procedure, the handoff package, and the risk/containment section. It must be
portable — a stranger should be able to operate the factory from this document alone.

### Step 6 — Gate before you automate
Hand the blueprint's plan to **plan-to-workflow** before firing any loop or spawning any
fleet. Per-item, decide what is safe to automate, what is a single supervised subagent, what
stays human-supervised (data-source credentials, visual sign-off, go-live), and what is
blocked. Never run the build loop unattended on ungated work.

### Step 7 — Run one build (the loop)
For a single module, run: **spec → build → critique → fix**, looping until the rubric passes
or max-iterations is hit. The module spec carries both the design tokens (Step 3) and the
derived IA (Step 4); the critic grades against both — visual craft *and* whether the structure
matches the audience→decision map. The critic is a *different* agent from the builder
(independent judgment). The loop re-checks the rubric each pass (completeness). Human gates from
Step 6 interrupt the loop where required. To build N modules to one language, fan this loop out
per module against the *same* token layer and rubric.

### Step 8 — Hand it off
Produce the handoff package per the project's handoff standard: a What document, a How-to-fix
document, a Dependencies checklist (every credential with a named owner — no personal
accounts), and an Update guide. The factory is not done when it produces a pretty screen; it
is done when someone who did not build it can operate and extend it.

---

## The quality gate (summary — full version in the rubric reference)

A module ships only when all six hold. The first three are what made the reference dashboard
*look* premium; the last three are what make it *be* credible, useful, and survivable —
exactly the gap a good-looking prototype leaves open.

1. **Visual craft** — every color/shadow/radius is a named token; warm/brand-derived canvas;
   tiered surfaces; soft diffuse shadows; restrained accent. No hardcoded hex in components.
2. **Typographic discipline** — tabular numbers on every figure; intentional type scale;
   tracking and smoothing set deliberately.
3. **Motion** — physics/spring or curated easing, short; `prefers-reduced-motion` respected.
   No linear `all 0.Xs` tweens.
4. **Information architecture** — density matched to the audience; semantic color carries
   meaning and is locked; deltas shown as direction + magnitude (arrow + signed value), never
   tick/cross (which reads as pass/fail).
5. **Functionality** — wired to a real data source with a defined contract; loading, empty,
   and error states exist; numbers reconcile to source. *A prototype on dummy data fails here.*
6. **Robustness + handoff** — contrast and reduced-transparency handled; responsive; portable
   (named owner, docs, no personal credentials).

---

## Anti-patterns this skill exists to prevent

| Anti-pattern | Why it fails |
|---|---|
| Spawn an agent for everything | Agents are for independent judgment, not knowledge. Encode knowledge as skills |
| Fire a build loop before gating | An unattended fleet at human-gated work (creds, go-live) is how trust breaks |
| Builder grades its own work | No independent judgment; the critic must be a different agent |
| Skip the token layer, style per module | Five modules become five products; the portal stops feeling like one thing |
| Recolor a semantic token to match the brand | Corrupts meaning — a channel/state color *is* data, not decoration |
| Ship on dummy data and call it premium | Premium without functional fails the "useful" bar; wire the data contract |
| Document at the end | Portability is a design constraint, not a retrofit |

---

## Reference files

- `references/quality-rubric.md` — the six-dimension premium bar; the design target and the
  critic's checklist. Read in Step 1.
- `references/agent-architecture.md` — concern → primitive mapping (skill/subagent/
  orchestrator/loop/human gate); the full roster pattern. Read in Step 2.
- `references/design-system-spec.md` — the concrete premium design tokens reverse-engineered
  into a system: semantic vs cosmetic split, surfaces, motion springs, type, IA patterns.
  Read in Step 3.
- `references/information-architecture.md` — the process for *deriving* effective IA from
  audience decisions: decisions-first, metric hierarchy, progressive disclosure, and how the
  critic checks structure. Read in Step 4. This is the part leadership responds to.
- `references/blueprint-template.md` — the fill-in template for the deliverable. Read in Step 5.
- `assets/design-tokens.css` — a starter token layer with the semantic/cosmetic split, ready
  to drop into a build and extend.
