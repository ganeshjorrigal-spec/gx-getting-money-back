# Ultraprompting Playbook

## Quick Reference

### The Seven Moves

1. Whole job, not next step.
2. Destination, not route.
3. External scoreboard.
4. Check changes the next action.
5. Independent builder and critic.
6. Durable learning memory.
7. Cheap exploration before expensive commitment.

### Prompt Skeleton

Destination + Context + Boundaries + Exit Criteria + Freedom

Then: Evaluate -> Diagnose -> Revise -> Retest

---

## Default Workflow Staging Template

When a large job has no obvious stage breakdown, this five-stage split is a reasonable default to adapt rather than invent from scratch:

1. **Diverge** -- generate several genuinely different ways the job could be approached.
2. **Converge** -- shortlist the strongest candidates from that spread.
3. **Stress-test** -- try to break the shortlist and pick the one path that survives.
4. **Implement** -- split the chosen path into parallel work and build it.
5. **Verify** -- confirm the finished work actually meets the exit criteria.

Not every job needs all five stages -- a well-defined data-processing job might only need a fan-out stage plus a verify stage. Use this as a starting shape, not a mandatory sequence.

---

## Critic Design

The critic should receive:
- The actual artifact.
- Success criteria.
- Reference material.
- Relevant evidence.

The critic should NOT receive the builder's internal justification when that would bias judgment. Create a fresh context for the critic.

The critic must be allowed to say PASS. A critic whose only instruction is "find problems" creates endless polishing. Define a threshold that constitutes acceptable quality.

---

## Memory Design

Use a compact notebook, not a transcript dump.

```
CURRENT BEST: [description of best result so far]
CONFIRMED: [findings backed by evidence]
FAILED: [approaches tried and why they failed]
OPEN HYPOTHESES: [untested ideas, with confidence levels]
NEXT TEST: [highest-value experiment to run next]
```

Update after every meaningful experiment. Compress obsolete detail; do not accumulate raw history. If memory grows without improving decisions, consolidate it.

---

## Exploration Design

Generate alternatives that differ in assumptions or mechanisms, not just surface variation.

For each alternative:
1. State the hypothesis.
2. Identify what must be true for it to work.
3. Find the cheapest invalidating test.
4. Run the most informative tests first.
5. Eliminate weak approaches.
6. Scale only promising survivors.

Fan-out is valuable when it creates different bets, not duplicated assumptions.

---

## Safety Boundaries

Default to bounded autonomy.

Require human confirmation before:
- Destructive changes.
- Production changes.
- Financial commitments.
- Publication or communication as the user.
- Credential or security changes.
- Legal commitments.
- Actions materially affecting third parties.

A job may continue autonomously inside a safe sandbox while consequential execution remains gated behind human approval.

---

## Complex Cases

### Subjective deliverable

Use several imperfect evaluation signals and an independent critic. Do not claim perfect objectivity. Combine signals such as source accuracy, reference comparisons, counterarguments, reader/user feedback, and independent review.

Never turn an arbitrary numerical score into fake objectivity.

### Research task

Separate discovery from synthesis. Require source traceability. Use cheap hypothesis tests before expensive deep dives.

### Coding task

Prefer executable tests, fixtures, screenshots, builds, and runtime behavior over prose judgments. Let the agent choose implementation details unless constrained.

### Long-running task

Use durable memory, explicit budget, progress checkpoints, and escalation conditions. Do not equate longer runtime with better quality.

### User insists on "don't stop until perfect"

Translate into:
- Explicit quality threshold.
- Time / iteration / cost cap.
- Escalation condition.
- Final verification.

Never use perfection as an unlimited resource authorization.
