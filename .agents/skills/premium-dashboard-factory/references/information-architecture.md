# Information Architecture — deriving it, not decorating it

Effective dashboard IA is not a style you copy from a good example. It is **derived**, through
a repeatable process, from who reads the dashboard and what they decide with it. This reference
encodes that process so the skill *produces* the right structure for a new dashboard rather than
checking surface patterns after the fact.

The load-bearing inversion: **build the IA backward from decisions, not forward from available
metrics.** Most weak dashboards are organized around what data exists ("we have spend, so here's
a spend chart"). Strong dashboards — the kind leadership finds effective — are organized around
what the reader must decide, with every element earning its place by serving a decision.

---

## The three inputs, in order

### Input 1 — Decisions first (never metrics first)
For each audience the dashboard serves, name the **2–3 decisions** they make using it. Be
specific and active. Not "monitor performance" but "decide whether to reallocate budget across
channels this week." The decision dictates the dominant surface:

- Leadership deciding budget reallocation → dominant surface is **channel efficiency ranked
  against spend**, summarized, comparable at a glance.
- Analyst diagnosing a drop → dominant surface is a **drill-down from aggregate to segment**,
  built to isolate where the drop lives.
- Ops confirming a launch is on track → dominant surface is **status and exceptions**, not
  totals.

If you cannot name the decision, you cannot lay out the section. Stop and get it before
designing anything.

### Input 2 — Metric hierarchy per section
Every section answers one question, so every section has exactly three tiers:

- **Primary** — the single metric that *is* the answer to the decision. One per section. It is
  visually dominant.
- **Secondary** — the 2–4 metrics that *explain* the primary (its drivers or its breakdown).
- **Tertiary** — diagnostic detail: available, but recessive. Present for the analyst, ignorable
  by the executive.

This three-tier discipline is most of why an organized dashboard *feels* organized: nothing is
equally emphasized, so the eye is told where to go. A view where everything is bold says nothing
is important.

### Input 3 — Progressive disclosure path
Sort every piece of information into one of three layers, by how much intent it requires to see:

- **Layer 0 — always visible**, no interaction. The answer to the top decision lives here. This
  is the leadership layer; it must stand alone and be correct without a single click.
- **Layer 1 — one action away**: a tab, a filter, a toggle. The explanation layer.
- **Layer 2 — a drill-down**: click a row, expand a segment. The diagnosis layer; analysts live
  here.

Leadership reads Layer 0. Analysts traverse all three. The **navigation structure is simply this
disclosure path made explicit** — it is not designed separately.

---

## The derivation procedure

Run this for each dashboard (and each distinct module). Produce the five deliverables below.

1. **Audience → decision map.** List each audience; under each, its 2–3 active decisions. This
   is the source document everything else is derived from.
2. **Section list from decisions.** Turn each decision into a section whose job is to answer it.
   Sections come from decisions, not from data categories. Name each section by the question it
   answers.
3. **Metric hierarchy per section.** For each section, assign primary / secondary / tertiary.
   Force exactly one primary. If two metrics compete for primary, the section is actually two
   sections, or the decision is not yet sharp enough.
4. **Disclosure assignment.** Place every metric in Layer 0 / 1 / 2. The primary of the
   top-decision section must be Layer 0. Push tertiary detail to Layer 2.
5. **Scan path + above-the-fold.** State the order the eye should travel on the default view (the
   Z or F path), and list exactly what sits above the fold. If the top decision's answer is not
   above the fold, the layout is wrong — fix it before styling.

---

## How visual hierarchy mirrors metric hierarchy (the bridge to the design system)

IA decides *what matters*; the design system decides *how to show rank*. They must agree:

- **Primary** — largest type from the scale, highest contrast (`--ink`), top/left position, often
  a single big tabular number with a small label and its delta pill.
- **Secondary** — mid type, normal weight, beneath or beside the primary, supporting it visually.
- **Tertiary** — smallest type, muted color (`--muted`/`--faint`), in tables or behind disclosure.

If a tertiary metric is rendered as large as the primary, the IA and the styling disagree and
the view reads as cluttered regardless of how good the tokens are. The critic checks this
agreement explicitly.

---

## Layout patterns by decision type

| Decision type | Dominant Layer-0 pattern |
|---|---|
| Allocate / compare options | Ranked list or bar comparison of the options against the deciding metric |
| Diagnose a change | One headline figure + its trend + the single biggest contributor to the change |
| Confirm on-track / exceptions | Status summary + an exceptions-only list (hide the things that are fine) |
| Track toward a target | Target vs actual with the gap as the primary, pace/projection secondary |

Pick the pattern from the decision, then fill it with the section's metric hierarchy.

---

## How the critic checks IA

The design-critic grades IA against the *derived spec for this dashboard*, not generic taste:

- Does an **audience → decision map** exist, and does every section trace to a named decision?
- Does each section have **exactly one primary** metric, visually dominant?
- Is the **top decision's answer in Layer 0**, above the fold, correct without interaction?
- Does **visual hierarchy mirror metric hierarchy** (no tertiary rendered as primary)?
- Is the **navigation** just the disclosure path, or an arbitrary menu bolted on?
- Are deltas shown as direction + magnitude, and is semantic color carrying meaning (cross-check
  with rubric dimension 4)?

A "no" sends the module back into the build→fix loop with the specific structural failure named.

---

## Common failures

- **Metrics-first assembly** — sections mirror the data sources, not the decisions. The tell:
  you can't say what decision a section serves.
- **Flat emphasis** — every tile the same size; no primary; the eye has no path.
- **Buried headline** — the answer to the top decision is behind a filter or below the fold.
- **Navigation invented separately** from the disclosure path, so the menu doesn't match how
  information actually deepens.
- **One IA for all audiences** — leadership and analysts forced through the same density instead
  of leadership getting Layer 0 clean and analysts getting the drill-downs.
