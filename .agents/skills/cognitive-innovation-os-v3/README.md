# Cognitive Innovation OS V3

A chat-compatible, agent-ready operating system for rigorous strategy, innovation, diagnosis, product, marketing, campaign, and consumer-behavior work.

It preserves the original **Cognitive Stack V2**—its 8 cognitive roles, 61 thinking recipes, 561-model curated library, rival-worldview mechanism, and cognitive-signature layer—as an internal engine. V3 adds the missing layers around it:

- mission and acceptance criteria;
- work-stage routing;
- evidence and epistemic controls;
- domain-native workflows;
- mechanism-distinct option generation;
- independent evaluator passes;
- experiments and staged decisions;
- loop state, stopping logic, and human checkpoints;
- outcome-based learning.

## Install

Upload the entire `cognitive-innovation-os-v3` folder as a Claude Skill, or place it in the skill/project directory used by your Claude environment. The entry point is `SKILL.md`.

## Use

Give Claude a real work mandate, such as:

- “Create a growth strategy for this product, but first identify whether we are solving the correct problem.”
- “Develop campaign platforms that can change behavior, not merely produce creative variations.”
- “Run this as a loop: form hypotheses, identify missing evidence, evaluate alternatives, and stop only when one testable direction survives.”
- “Audit this consulting recommendation for unsupported assumptions and rival explanations.”

You can request a mode explicitly:

- `QUICK:`
- `DEEP:`
- `LOOP:`
- `AUDIT:`

## Package map

| Folder | Purpose |
|---|---|
| `engine/` | Original Cognitive Stack preserved as the reasoning engine |
| `router/` | Mission, mode, work-stage, and evidence routing |
| `loops/` | Framing, diagnosis, innovation, decision, validation, execution, and learning loops |
| `domain-packs/` | Domain-specific logic and deliverables |
| `evaluators/` | Independent quality and completion checks |
| `templates/` | State, briefs, experiments, portfolios, and learning records |
| `evaluation/` | Benchmark, ablation, and regression protocol |
| `examples/` | Worked examples showing the intended pattern |

## Design boundary

This package is self-contained and does not require code execution. In a chat-only environment, loop state is maintained through the project-state artifact. In an agentic environment, the same files can orchestrate tool use, research, file edits, data analysis, and repeated runs.
