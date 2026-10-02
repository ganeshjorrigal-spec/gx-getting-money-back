# Evaluator — Completion Judge

The completion judge is separate from the generator.

## Decision

Return one:

- `APPROVE`
- `APPROVE_WITH_EXPLICIT_RISK`
- `REVISE`
- `BLOCKED_BY_EVIDENCE`
- `HUMAN_DECISION_REQUIRED`

## Checklist

- mission and decision are explicit;
- required deliverable is present;
- acceptance criteria are individually checked;
- evidence and assumptions are distinguishable;
- rival explanations/options were considered;
- recommendation follows from criteria;
- risks and disconfirming conditions are visible;
- next action has owner/threshold where appropriate;
- no critical contradiction remains;
- another cycle is unlikely to add material value without new evidence.

Do not approve merely because the workflow was completed.
