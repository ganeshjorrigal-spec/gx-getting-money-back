# Project State Packet

Use this as the persistent state for LOOP mode.

```yaml
project:
  name:
  mission:
  mode: LOOP
  work_intention:
  maturity:
  domain_pack:

state:
  iteration: 0
  acceptance_criteria: []
  evidence:
    verified: []
    reported: []
    assumptions: []
    hypotheses: []
  options:
    active: []
    rejected: []
    selected: null
  primary_uncertainty:
  primary_bottleneck:
  current_recommendation:
  confidence:
  evaluator_findings: []
  decisions_made: []
  open_questions: []
  next_action:
  owner:
  stop_conditions: []
  human_checkpoint:
  last_updated:
```

## Update rule

Never overwrite history silently. Record why an option, assumption, or recommendation changed.
