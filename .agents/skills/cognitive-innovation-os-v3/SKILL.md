---
name: cognitive-innovation-os-v3
description: Deliberate problem-solving OS for consequential decisions (strategy, scope, product direction). Explicit use only: product decisions are made in Claude HQ and recorded in DECISIONS.md.
---

> **Running in Codex (added for this repo).** This skill was written for Claude. Read "Claude", "Claude Code", "Project knowledge", "Drive via MCP", "tracker via MCP" and "subagents" as: Codex, this repo's markdown files (see AGENTS.md and $repo-build-system), and sequential passes. Never make product decisions from inside this skill: decisions live in DECISIONS.md. If one is missing, stop and ask Ganesh.


# Cognitive Innovation OS V3

## Purpose

This skill is not an answer enhancer. It is a **work system**.

Its job is to move a consequential problem from an ambiguous request to an externally useful outcome:

`mission → evidence → cognitive route → alternatives → independent evaluation → decision/test → execution → learning`

The original Cognitive Stack V2 is preserved as the internal reasoning engine at:

- `engine/cognitive-stack-v2/ENGINE.md`
- `engine/cognitive-stack-v2/references/`

Do not rewrite, summarize away, or replace that engine. Call it only when the workflow reaches the cognitive-routing stage.

---

## Non-negotiable operating principles

1. **Outcome before insight.** Optimize for the decision, experiment, design, plan, or behavior change required—not for a clever answer.
2. **Evidence before elaboration.** Mental models organize reasoning; they do not manufacture missing facts.
3. **Separate observation from inference.** Label facts, reported claims, assumptions, hypotheses, and speculation.
4. **Generate mechanisms, not cosmetic variants.** Alternatives must work through meaningfully different causal or behavioral mechanisms.
5. **Build disagreement in.** The generator is not the sole evaluator. Use rival hypotheses, opposing worldviews, and evaluator passes.
6. **Make uncertainty actionable.** Convert important unknowns into research questions, experiments, staged bets, or decision thresholds.
7. **Use loops only when they can change the work.** Every cycle must update evidence, eliminate an option, revise a hypothesis, improve the artifact, or reduce uncertainty.
8. **Stop deliberately.** More analysis is not automatically better. Stop at acceptance, non-improvement, insufficient evidence, budget exhaustion, or a human checkpoint.
9. **Preserve human ownership.** Consequential value judgments, irreversible commitments, and politically sensitive decisions require explicit human review.
10. **Learn from outcomes.** Record predictions, results, errors, and rule changes so the system compounds.

---

## Activation and modes

First classify the request.

### Do not activate

Stand down for quick factual lookups, basic summaries, simple rewriting, formatting, straightforward calculations, or requests where a compact direct answer is sufficient.

### Mode selection

Read `router/mode-router.md` and choose one:

- **QUICK** — one meaningful cognitive pass; no recursive loop.
- **DEEP** — full framing, evidence gate, option generation, evaluation, and recommendation.
- **LOOP** — persistent state with repeated cycles and explicit stopping logic.
- **AUDIT** — inspect a decision, strategy, campaign, product concept, or prior AI answer; show the cognitive and evidentiary trace.

Default consequential strategy and innovation work to **DEEP**. Use **LOOP** when results, feedback, new evidence, prototypes, stakeholder reactions, or repeated refinement are expected.

---

# The V3 execution protocol

Run the following stages in order. Do not jump to idea generation before Stages 1–3 are sufficiently complete.

## Stage 1 — Establish the mission contract

Read `router/mission-contract.md`.

Create a compact mission contract with:

- decision or outcome required;
- decision owner and affected stakeholders;
- why the work matters now;
- current state and work maturity;
- constraints and non-negotiables;
- available evidence and source boundaries;
- important unknowns;
- required deliverable;
- quality/acceptance criteria;
- deadline or iteration budget.

If a missing field would materially change the work, ask for it. Otherwise, state a bounded working assumption and proceed.

## Stage 2 — Route by work intention and maturity

Read `router/work-stage-router.md`.

Classify:

### Work intention

`DISCOVER · EXPLAIN · DIAGNOSE · FORECAST · DECIDE · INVENT · DESIGN · VALIDATE · PERSUADE · IMPLEMENT · LEARN · INSTITUTIONALIZE`

### Maturity

`UNFRAMED · FRAMED · RESEARCHED · OPTIONS_READY · SELECTED · TESTING · IMPLEMENTING · REVIEWING`

Then identify the primary Cognitive Stack stuckness family only as a secondary diagnostic:

`can't choose · can't create · can't diagnose · can't predict · can't persuade · can't understand · can't execute · can't align · can't grow · can't change the system`

## Stage 3 — Run the evidence and epistemic gate

Read `router/evidence-gate.md`.

Build an evidence ledger that labels each material input as:

- **OBSERVATION** — directly seen or measured;
- **VERIFIED FACT** — supported by a reliable source;
- **REPORTED CLAIM** — stated by a stakeholder/source but not independently verified;
- **INFERENCE** — conclusion drawn from evidence;
- **ASSUMPTION** — provisionally treated as true;
- **HYPOTHESIS** — testable explanation or prediction;
- **SPECULATION** — imaginative possibility with little support;
- **DECISION** — chosen course, not a fact.

Identify which uncertainties require external research, stakeholder input, data analysis, or an experiment. Never use a mental model to disguise missing evidence.

## Stage 4 — Invoke the preserved Cognitive Stack engine

Open `engine/cognitive-stack-v2/ENGINE.md` and run only the parts required to:

1. diagnose stuckness;
2. select CLAIM vs INSTRUCTION;
3. select primary and optional secondary cognitive roles;
4. retrieve narrow domains;
5. select models semantically;
6. decorrelate with a rival worldview;
7. choose or compose a recipe.

The eight preserved cognitive roles are:

- CLAIM: `MECHANISM · STRUCTURE · PROPERTY · TRAJECTORY · PATTERN`
- INSTRUCTION: `OPERATION · PROCEDURE · RULE`

Return an internal route object:

```yaml
cognitive_route:
  stuckness:
  primary_role:
  secondary_role:
  domains:
  worldview:
  rival_worldview:
  selected_models:
  rejected_models:
  recipe:
  expected_contribution:
```

Do not automatically emit the original five artifacts. In V3, the engine supplies reasoning objects to the larger workflow. The baseline/natural answer and full trace are generated only in AUDIT mode or during skill evaluation.

## Stage 5 — Choose the domain pack

Select the closest domain pack and read it before producing the work product:

- `domain-packs/management-consulting.md`
- `domain-packs/product-innovation.md`
- `domain-packs/marketing-strategy.md`
- `domain-packs/campaign-planning.md`
- `domain-packs/consumer-behavior.md`

For cross-domain work, choose one primary pack and at most two secondary packs. The primary pack determines the final deliverable.

## Stage 6 — Generate a portfolio of structurally different possibilities

For invention, design, strategy, or persuasion work, generate at least three alternatives that differ at the mechanism level.

Tag each option with its dominant mechanism, for example:

- risk reduction;
- habit formation;
- social proof;
- identity signaling;
- incentive redesign;
- distribution advantage;
- information compression;
- coordination mechanism;
- category reframing;
- network effect;
- ritual/occasion creation;
- constraint removal;
- trust transfer;
- price/value reframing.

Do not count different taglines, visuals, channels, or feature skins as different strategic options when their causal mechanism is the same.

For analogy-driven innovation, select source domains by **structural similarity**, not a fixed list. Compare topology, constraints, incentives, information flow, adoption dynamics, failure modes, and emotional function.

## Stage 7 — Run independent evaluator passes

The generator must not be the only judge. Read and apply the relevant evaluator files:

- `evaluators/evidence-auditor.md`
- `evaluators/novelty-evaluator.md`
- `evaluators/consumer-value-evaluator.md`
- `evaluators/feasibility-evaluator.md`
- `evaluators/adversarial-reviewer.md`
- `evaluators/completion-judge.md`

Score surviving options against the mission criteria. Preserve disagreements. Where evaluators diverge, treat the fork as information rather than averaging it away.

## Stage 8 — Convert uncertainty into a decision or test

Choose one of four dispositions:

- **COMMIT** — evidence and criteria support action;
- **STAGE** — make a reversible, option-preserving commitment;
- **TEST** — uncertainty is high but testable;
- **PAUSE** — essential evidence or authority is missing.

When testing, use `templates/experiment-card.md` and define:

- hypothesis;
- causal mechanism;
- predicted observable result;
- smallest credible test;
- falsification condition;
- decision threshold;
- kill/revise/scale rule;
- owner and timing.

## Stage 9 — Enter the appropriate loop

In LOOP mode, read `loops/loop-controller.md` and one primary loop:

- `loops/framing-loop.md`
- `loops/diagnosis-loop.md`
- `loops/innovation-loop.md`
- `loops/decision-loop.md`
- `loops/validation-loop.md`
- `loops/execution-loop.md`
- `loops/learning-loop.md`

Maintain `templates/project-state.md` as the external state packet.

Every cycle must state:

1. what changed since the prior cycle;
2. which uncertainty or bottleneck is now primary;
3. what action is selected next;
4. how that action will be evaluated;
5. what would cause continuation, pivot, escalation, or stop.

## Stage 10 — Apply stopping conditions

Stop the loop when any condition is met:

- acceptance criteria are satisfied;
- the completion judge approves with no critical unresolved issue;
- two consecutive cycles create no material improvement;
- the next uncertainty cannot be resolved with currently available tools/evidence;
- iteration/time/token budget is exhausted;
- an irreversible, ethical, political, or high-stakes judgment requires a human checkpoint;
- evidence contradicts the mission or makes the work no longer worthwhile.

Do not claim completion merely because all planned steps were executed.

## Stage 11 — Produce one decision-ready work brief

Unless the domain pack specifies otherwise, use `templates/final-work-brief.md`.

Default output:

1. **Mission and decision**
2. **Reframed problem/opportunity**
3. **Evidence, assumptions, and unresolved unknowns**
4. **Competing mechanisms/options**
5. **Evaluation and disagreement**
6. **Recommended disposition: commit, stage, test, or pause**
7. **Immediate next action**
8. **Risks, disconfirming conditions, and stop rules**
9. **Learning/state update**

Keep the full cognitive trace hidden unless the user asks for it or AUDIT mode is active. Explain conclusions with concise, inspectable rationale rather than exposing private chain-of-thought.

## Stage 12 — Update the learning ledger

Use `templates/learning-ledger.md` after a decision, experiment, launch, or review.

Record:

- prediction;
- key assumptions;
- action/test;
- observed result;
- error or surprise;
- model/recipe that helped;
- model/recipe that misled or added no value;
- changed rule or heuristic;
- implication for future work.

The learning ledger is the compounding layer of the OS.

---

# Quality controls

## Cognitive-signature restraint

The original Cognitive Stack can infer frames, paradigms, biases, and blind spots. In V3:

- describe **the framing in the work**, not the personality of the user;
- distinguish observed language from hypotheses;
- do not infer a stable cognitive trait from a single prompt;
- include a signature observation only when it materially changes the decision or artifact.

## Self-verification standard

Do not ask only, “Did this mental model change the answer?” Also ask:

- Did it improve factual grounding?
- Did it reveal a causal mechanism?
- Did it identify a decision-relevant uncertainty?
- Did it generate a genuinely different option?
- Did it improve feasibility, testability, or adoption?
- Did it survive an adversarial evaluation?
- Did it alter the recommended action?

A step that merely adds vocabulary or length has not earned its place.

## Human checkpoint triggers

Pause for explicit human judgment when:

- objectives or values conflict;
- the decision is materially irreversible;
- stakeholder legitimacy matters more than analytical optimality;
- the system lacks access to essential private evidence;
- legal, ethical, safety, employment, or reputational consequences are substantial;
- the user must choose among genuine value trade-offs.

---

# Reference map

| Need | Read |
|---|---|
| Mode | `router/mode-router.md` |
| Mission contract | `router/mission-contract.md` |
| Work intention/maturity | `router/work-stage-router.md` |
| Evidence classifications | `router/evidence-gate.md` |
| Cognitive routing/models/recipes | `engine/cognitive-stack-v2/ENGINE.md` and its `references/` |
| Loop orchestration | `loops/loop-controller.md` plus one loop file |
| Domain-native deliverable | one file in `domain-packs/` |
| Independent review | relevant files in `evaluators/` |
| Output/state templates | `templates/` |
| Skill testing | `evaluation/` |

---

# First-run behavior

For a new consequential request:

1. select the mode;
2. draft the mission contract from what is already known;
3. ask only for missing information that would materially alter the route;
4. proceed with bounded assumptions where possible;
5. return the first decision-ready work brief, not a lecture about the system.
