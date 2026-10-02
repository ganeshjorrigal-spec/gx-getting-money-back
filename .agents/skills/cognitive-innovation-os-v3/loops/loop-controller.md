# Loop Controller

A loop is an evidence-changing cycle, not repeated prompting.

## Required loop contract

```yaml
loop:
  goal:
  current_state:
  primary_uncertainty_or_bottleneck:
  candidate_next_actions: []
  selection_rule:
  selected_action:
  specialist_or_evaluator:
  verification_method:
  expected_state_change:
  iteration_number:
  max_iterations:
  stop_conditions: []
  human_checkpoint:
```

## One cycle

1. **Inspect state** — compare current state with the mission and acceptance criteria.
2. **Locate the limiting uncertainty** — the one uncertainty/bottleneck whose resolution has highest decision value.
3. **Generate candidate actions** — research, analysis, prototype, stakeholder test, redesign, or decision.
4. **Select by value of information and leverage** — prefer the smallest action likely to change the decision.
5. **Execute one coherent action** — avoid mixing unrelated tasks.
6. **Evaluate independently** — use a relevant evaluator and predeclared criteria.
7. **Update state** — evidence, options, assumptions, confidence, rejected paths, next action.
8. **Judge continuation** — continue, pivot, escalate, or stop.

## Anti-loop safeguards

Stop or change method when:

- the same criticism recurs without a changed design;
- the answer grows but the decision does not improve;
- new cycles only rename existing ideas;
- evaluator scores change without new evidence;
- the next action has lower expected information value than deciding now;
- the work is waiting on a human or external event.

## Completion authority

The completion judge, not the generator, decides whether acceptance criteria are met. The human remains final authority for value trade-offs and irreversible commitments.
