# Quality Rubric — what "premium" actually means

This is the gate. It is **dual-purpose**: the design target the builders aim at, and the
checklist the critic subagent grades against. Each dimension has a *principle* (why it
matters), *pass bars* (checkable), and *common failures* (what the critic looks for).

Instantiate it per project: rewrite each generic pass-bar into a concrete assertion for the
specific dashboards being built. A vague bar ("looks clean") cannot be graded; a concrete one
("every numeric cell uses `font-variant-numeric: tabular-nums`") can.

A module ships only when **all six** pass. The first three are why a dashboard *looks*
premium. The last three are why it *is* credible, useful, and survivable — the gap a
good-looking prototype almost always leaves open.

---

## 1. Visual craft

**Principle.** Premium is not one effect; it is a coherent token system applied with
restraint. The amateur tells — flat pure-white canvas, harsh drop shadows, a flooded brand
color — are all *inversions* of craft.

**Pass bars.**
- Every color, shadow, radius, and spacing step is a **named token**. Zero hardcoded hex in
  components.
- Canvas is warm / brand-derived, not flat `#ffffff`, and carries subtle ambient depth (e.g.
  a fixed low-opacity gradient wash) rather than a single flat fill.
- Surfaces are **tiered** — nav/chrome, base panels, and elevated pop (modals/dropdowns) have
  distinguishable elevation, not one uniform card style.
- Shadows are **soft and diffuse** (low opacity, wide blur), never `0 2px 4px rgba(0,0,0,.3)`.
- The accent color is used **sparingly** as emphasis, not as a background flood.

**Common failures.** Inline styles with raw hex; flat white; one shadow value reused
everywhere at high opacity; brand color on large fills.

---

## 2. Typographic discipline

**Principle.** Numbers are the content of a dashboard. How they are set is most of whether the
thing reads as credible.

**Pass bars.**
- **Tabular numbers** (`font-variant-numeric: tabular-nums`) on every figure that can change
  or sits in a column. Non-negotiable — it stops digits jittering and misaligning.
- A documented **type scale** with intentional steps (dense small steps where data labels
  live), not ad-hoc font sizes.
- Tracking (letter-spacing) and font smoothing set deliberately; body text slightly tightened.
- Weight used to encode hierarchy, consistently (the same weight means the same level).

**Common failures.** Proportional numerals in tables; random font sizes; default tracking;
weight used decoratively.

---

## 3. Motion

**Principle.** Motion is where "designed" and "templated" diverge most visibly. Linear,
duration-based tweens read as default; physics or curated easing reads as intentional.

**Pass bars.**
- Interactions use **spring physics** (snappy, well-damped, no childish overshoot) or a
  **curated cubic-bezier**, not raw `transition: all 0.Xs` with default linear easing.
- Durations are **short** (≈0.1–0.45s); entrances may stagger.
- `prefers-reduced-motion` is respected — motion reduces or disables.
- Hover micro-interactions are subtle (a few px lift, slight scale), not large jumps.

**Common failures.** `all 0.3s ease` everywhere; long durations; no reduced-motion path;
bouncy under-damped springs.

---

## 4. Information architecture

**Principle.** A dashboard's job is to let a specific person make a specific decision fast.
Density, hierarchy, and color-as-meaning are decisions about *cognition*, not decoration. IA
is **derived**, not styled in afterward — see `information-architecture.md` for the full
process. The pass bars below assume that derivation has been done.

**Pass bars.**
- An **audience → decision map** exists, and every section traces to a named decision. Sections
  come from decisions, not from the data that happens to be available.
- Each section has **exactly one primary metric**, visually dominant; secondary explains it;
  tertiary is recessive. (primary/secondary/tertiary hierarchy.)
- The **top decision's answer is in Layer 0** — above the fold, correct without interaction.
- **Visual hierarchy mirrors metric hierarchy** — no tertiary metric rendered as large as a
  primary.
- **Density matched to the audience.** An analyst surface earns dense small type; an exec
  surface earns breathing room. State which audience and match it; do not default to one.
- **Semantic color is locked.** A color that means a channel or a state (good/bad/watch) is
  data — documented, and never recolored for aesthetics or to match the brand.
- **Deltas show direction + magnitude** — arrow glyph + signed tabular value + tinted pill.
  **Never tick/cross**, which reads as pass/fail (binary correctness), not movement.
- Sticky chrome/headers have an opaque or backdrop-blurred background so scrolling content
  reads *under* them, never *through* them as a hard overlap.

**Common failures.** Metrics-first assembly (sections mirror data sources, not decisions);
flat emphasis (no primary, no scan path); the headline buried below the fold or behind a
filter; tick/cross for deltas; semantic colors bent to the brand; navigation invented
separately from the disclosure path; one IA forced on every audience.

---

## 5. Functionality (the bar a prototype fails)

**Principle.** "Useful" means it works on real data. A beautiful dashboard on dummy data is a
mockup, however convincing. This is the dimension most likely to be silently skipped.

**Pass bars.**
- A **defined data contract**: where each number comes from, how it is fetched, how stale it
  may be, and how the UI shape maps to the source schema.
- Wired to a **real source** (or an explicit, documented path to wire it, with the dummy layer
  clearly flagged as temporary).
- **Loading, empty, and error states** exist for every data-bound surface — not just the happy
  path with data present.
- **Numbers reconcile** to the source of truth; a defined check confirms the dashboard's figure
  equals the source's figure.

**Common failures.** Hardcoded sample data presented as live; no empty/error/loading states;
numbers that look right but do not reconcile; no contract for where data comes from.

---

## 6. Robustness + handoff (credible + survivable)

**Principle.** Credible means it does not break in a real user's hands. Survivable means it
outlives its builder. Both are design constraints from day one, not retrofits.

**Pass bars.**
- **Accessibility**: text contrast meets a stated bar; `prefers-reduced-transparency` falls
  back to solid surfaces; interactive targets are reachable.
- **Responsive** at the breakpoints the audience actually uses.
- **Portable**: passes the project's portability check — a named human owner, the four handoff
  documents, and **no personal credentials or accounts** anywhere in the data or auth path.
- Degrades gracefully when a data source is slow or down (the error state from dimension 5,
  surfaced usefully, not a blank screen).

**Common failures.** Glass with no reduced-transparency fallback; contrast failures on muted
text; desktop-only; built on the builder's personal Google/API account; white screen on
source failure.

---

## How the critic uses this

When grading a built module, the critic subagent walks all six dimensions, marks each pass
bar pass/fail with evidence (the specific line, value, or missing state), and returns a
structured verdict. Any failed bar sends the module back into the build→fix loop with the
specific failures named. The loop exits when all six pass or max-iterations is reached; if it
hits max-iterations still failing, it escalates to a human with the outstanding failures —
it does not ship a failing module silently.
