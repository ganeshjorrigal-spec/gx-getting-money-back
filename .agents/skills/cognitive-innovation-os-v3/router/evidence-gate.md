# Evidence and Epistemic Gate

## Evidence labels

| Label | Meaning | Allowed use |
|---|---|---|
| OBSERVATION | Directly measured or seen | Can support a claim within its measurement limits |
| VERIFIED FACT | Reliable, relevant source support | Can anchor reasoning; note freshness and scope |
| REPORTED CLAIM | Stakeholder/source assertion | Treat as input, not truth |
| INFERENCE | Reasoned conclusion | Show supporting facts and uncertainty |
| ASSUMPTION | Provisional premise | Must be visible and tested when critical |
| HYPOTHESIS | Testable explanation/prediction | Must have a discriminating test |
| SPECULATION | Low-support possibility | Use for exploration, not recommendation |
| DECISION | Chosen course | Judge by criteria, not as factual truth |

## Gate questions

1. What do we actually know?
2. What is merely being reported?
3. Which conclusion depends on an unverified assumption?
4. Which missing fact could reverse the recommendation?
5. Can the uncertainty be resolved through research, data, stakeholder input, or experiment?
6. Is the information current enough for the decision?
7. Are we confusing absence of evidence with evidence of absence?

## Evidence ledger

```yaml
evidence_ledger:
  - statement:
    label:
    source:
    confidence:
    relevance:
    freshness:
    decision_impact:
```

## Gate disposition

- `PASS`: sufficient for current stage.
- `PASS_WITH_ASSUMPTIONS`: proceed while making assumptions visible.
- `RESEARCH`: obtain external evidence first.
- `TEST`: resolve through experiment.
- `BLOCKED`: essential evidence or authority is unavailable.
