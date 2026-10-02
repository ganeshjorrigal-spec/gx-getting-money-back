# Warm Knowledge Layer — Note Schema & Filing Principles

The warm layer preserves the *richness* of calls and reviews — reasoning, constraints,
stakeholder mental models — decoupled from the expensive transcript. The transcript is
archived once (cold); the richness lives here as small, queryable notes.

## Why richness gets lost without this layer
Summaries optimize for the coherent narrative; reasoning and loose context are pruned first.
And long-lived knowledge (a stakeholder's mental model, true for years) compacted on the same
schedule as short-lived state (this week's spec) gets destroyed on the short-lived clock.
Separating by lifecycle is the cure.

## Folder design
Adapt subfolder names to the project's domain. The invariant is: **folders are topics, never
dates or call names.** Common patterns:

```
/warm-knowledge/
├── constraints/           ← hard limits the build cannot violate
├── stakeholder-models/    ← how each person thinks; what they care about
├── domain-insights/       ← rename per domain (e.g. channel-insights, market-insights)
├── definitions/           ← what terms/metrics mean to whom (often differs by person)
├── design-rationale/      ← why decisions were made — the reasoning, not just the verdict
└── open-questions/        ← unresolved questions captured for future sessions
```

## Note schema (one file = one insight)

Filename: `YYYY-MM-DD_[concept-slug].md` — the slug names the CONCEPT, and must work as a
future search term. Good: `push-frequency-threshold-gurleen`. Bad: `call-notes-may-14`.

```markdown
---
topic: [what this is about — concept, not call]
claim: [the insight in one sentence]
type: [constraint | insight | mental-model | definition | design-rationale | open-question]
stakeholder: [who surfaced it, if relevant]
source: /cold-archive/[filename].md
date: YYYY-MM-DD
status: active
superseded-by: —
---

[2–4 sentences: what it means, why it matters, nuance/conditions on the claim.]

**Implication for build:** [one sentence — what this changes about a design or data decision]
```

## Filing principles
- **One insight per file.** Never bundle claims; a note must be retrievable by its one claim.
- **File by topic, not by call.** The call is the `source` field.
- **Accumulate, don't overwrite.** New info superseding an old note: mark the old note
  `status: superseded` + `superseded-by:`, write a new note. Never delete.
- **Always include the implication.** A note without a build implication forces future chats
  to re-reason from scratch — the exact failure this layer exists to prevent.

## Querying the layer
Chats fetch slices, never the corpus:
- "Pull warm-knowledge on [concept]"
- "What constraint did [stakeholder] surface about [topic]?"
- "Why did we decide [X]? Check design-rationale and the decision log."
If a note is insufficient, fetch its cold-archive source — that is the only time a transcript
is re-read, and only the one transcript.

## Worked example — good vs bad

GOOD — `2026-05-18_push-frequency-threshold-gurleen.md` in `constraints/`:
claim: "Gurleen treats 3 Push/week as the fatigue threshold for the general subscriber base."
Body adds the nuance (loyalty members tolerate more) and the implication (alert logic should
flag scheduled weeks exceeding 3).

BAD — `2026-05-18_gurleen-call-notes.md` in `call-notes/`:
bundles the threshold + unsubscribe behaviour + loyalty tiers + an alert idea + a data question
in one file, filed by date, with no implication. Unfindable by concept; unusable without
re-reading and re-reasoning.
