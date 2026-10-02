# Blueprint Template — the deliverable

Fill this in to produce the documented plan for the agentic system. The test of a good
blueprint: a stranger who did not build the factory can operate it from this document alone.
Replace every `‹bracketed prompt›` with project specifics. Keep it portable — no reliance on
knowledge that lives only in someone's head.

---

## 1. System goal and scope

- **What this factory produces:** ‹e.g. premium dashboard modules for the post-launch
  performance portal›
- **Modules in scope:** ‹list them, or "one module: X"›
- **Shared design language target:** ‹all modules import one token layer; name it›
- **Execution environment:** ‹Claude Code (full factory) | claude.ai-only (bar + tokens +
  manual build)›
- **Data reality:** ‹live source available | prototype to be wired — name the source and the
  gap›

## 2. The quality bar (instantiated)

Restate each of the six rubric dimensions as a concrete, checkable assertion for *these*
dashboards. ‹For each dimension, write 2–4 project-specific pass bars the critic will grade.›

| Dimension | Concrete pass bars for this project |
|---|---|
| Visual craft | ‹…› |
| Typography | ‹…› |
| Motion | ‹…› |
| Information architecture | ‹…› |
| Functionality | ‹…› |
| Robustness + handoff | ‹…› |

## 3. Agent roster

| Role | Primitive | Owns | Justification (the guarantee it provides) |
|---|---|---|---|
| ‹design-system› | Skill | ‹token layer + patterns› | ‹reusable knowledge, default layer› |
| ‹quality-rubric› | Skill | ‹the bar› | ‹shared target + checklist› |
| ‹module-builder› | Subagent | ‹builds one module› | ‹bounded specialization› |
| ‹design-critic› | Subagent | ‹grades vs rubric› | ‹independent judgment ≠ builder› |
| ‹orchestrator› | Orchestrator | ‹sequences pipeline› | ‹holds goal-in-code, no drift› |
| ‹build→fix loop› | Loop | ‹iterate to pass› | ‹completeness + goal stability› |
| ‹data connect / sign-off / go-live› | Human gate | ‹irreversible steps› | ‹Tier-2: human stays in loop› |

Include the data-flow diagram (see `agent-architecture.md`) adapted to this roster.

## 4. Information architecture (derived)

Built backward from decisions (see `information-architecture.md`). The part leadership responds to.

- **Audience → decision map:** ‹each audience, its 2–3 active decisions›
- **Section map:** ‹each section + the decision it answers — sections come from decisions, not data›

| Section | Decision it answers | Primary metric | Secondary | Tertiary | Disclosure layer |
|---|---|---|---|---|---|
| ‹…› | ‹…› | ‹one› | ‹…› | ‹…› | ‹0 / 1 / 2› |

- **Above the fold (Layer 0):** ‹exactly what is visible with no interaction; the top decision's
  answer must be here›
- **Scan path:** ‹the order the eye travels on the default view›
- **Navigation = disclosure path:** ‹confirm the nav is the Layer 0→1→2 path, not a separate menu›

## 5. Data contract

The thing that makes it *useful*, not a mockup.

- **Source(s) of truth:** ‹where each number originates›
- **Fetch path:** ‹how data reaches the UI — API, query, export; through which layer›
- **Freshness:** ‹how stale a number may be; refresh cadence›
- **Schema → props mapping:** ‹source field → UI element, per module›
- **Reconciliation check:** ‹the test that the dashboard figure equals the source figure›
- **States:** ‹what loading, empty, and error look like for each data-bound surface›
- **Credential ownership:** ‹who at the org holds each credential — never a personal account›

## 6. Build-run procedure (one module, end to end)

1. ‹Write/confirm the module spec.›
2. ‹Builder builds against design-system + data-contract.›
3. ‹Critic grades against the instantiated bar; returns pass/fail + evidence.›
4. ‹Loop: fix → re-critique until all six pass or max-iterations N = ‹value›.›
5. ‹Human gate: visual sign-off.›
6. ‹Human gate: data connection (creds).›
7. ‹Human gate: go-live.›
8. ‹Produce handoff package (section 8).›

For a portal: ‹fan out steps 1–7 per module against the same bar and token layer.›

## 7. Gating record (from plan-to-workflow)

‹Paste the per-item gate decisions: what is automated, what is a single supervised subagent,
what stays human-supervised, what is blocked. Do not run the loop on ungated items.›

## 8. Handoff package

Per the project's handoff standard, one package per shipped module:

- **What document** — what it shows, what feeds it, when it refreshes, and the **named human
  owner** who notices if output looks wrong.
- **How-to-fix document** — the three most likely failure modes (data source down, numbers do
  not reconcile, loop produced a regression), each with symptom → cause → numbered fix.
- **Dependencies checklist** — every tool, credential, account, schedule, each with a named org
  owner. No personal accounts anywhere.
- **Update guide** — what is most likely to change (a new metric, a schema change, a new
  module), how to change it without breaking the token layer, and what to re-check after.

## 9. Risk and containment

- **What runs unattended vs gated:** ‹restate the boundary; the data/go-live steps are always
  human›
- **Loop containment:** ‹max-iterations; escalation on still-failing; no silent ship›
- **Token-layer protection:** ‹semantic tokens locked; critic checks no semantic recolor›
- **Portability check date:** ‹run the portability check weekly from ‹week›; record results›
