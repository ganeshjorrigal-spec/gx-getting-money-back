---
name: cognitive-stack-chat
description: The right mental model for the problem you're stuck on, not a pile of frameworks. Routes a stuck problem to the right *kind* of thinking tool from a curated library of mental models, runs a recipe, and returns a five-part answer: a plain answer, a mirror of your own thinking (the models, biases, and worldview in play), the reasoning trace, the recipe-driven answer, and an optional next move. Self-contained: no external files or code execution. Use when a decision, diagnosis, strategy call, or stuck problem needs the *right kind* of mental model, not a stack of frameworks.
---

# Cognitive Stack (Chat edition): The right mental model for the problem, not a pile of frameworks

> **Artifact 5 (the optional "next move") is the newest piece** — a convergence-gated handoff that turns Artifact 4's single most useful move into something you can do (in this Chat edition, delivered right in the conversation). It's a reasoning step (no scripts), so it mirrors the Code edition's logic; only the surface differs.

> **This is the self-contained Chat version.** Same 6-step Cognitive Stack Router, same 61 recipes,
> same Cognitive Signature 2.0 — but **curated and self-contained**: no live CSV retrieval and no code
> execution. The library is the 8 role catalogues (561 curated models), reached through a scannable
> **`references/library-index.md`** (the four large roles are split per domain so no file ever loads
> whole). The paradigm rival-check runs off a baked **`references/decorrelation-subset.md`** (the
> self-contained analogue of the Code engine's live tensions fetch). Derived from the Claude Code build
> by a reproducible transform — a documented subset, no version drift (see `version-diff.md`). Runs
> anywhere a skill loads.

## What this skill does

Most "mental model" help throws a pile of frameworks at a problem. This skill instead matches the
problem to the **right kind of cognitive object** first, then retrieves only models of that kind,
then runs a **recipe** (an ordered sequence of moves) and shows its work.

The library is the **8 curated role catalogues** in `references/catalogues/` — **561 models**, the
confidence-gated, editorially-passed distillation of a 2,375-model tagged encyclopedia. You don't read
them whole: **`references/library-index.md`** is the scannable table of contents (one line per model),
and the four large roles are split per domain so any single read is one role × domain slice. Models
carry the axes the router steers by:

- **Tier1** — `CLAIM` (asserts what is *true*) vs `INSTRUCTION` (prescribes what to *do*). This almost
  perfectly partitions the 8 roles (see Step 2).
- **Primary Role** — one of **8 Tier-2 roles**: `MECHANISM` (how something works causally),
  `STRUCTURE` (how parts relate), `PROPERTY` (a quality something has), `TRAJECTORY` (how something
  changes over time), `PATTERN` (a recurring shape) — these five are CLAIM roles; and `OPERATION` (a
  single move you perform), `PROCEDURE` (an existing named, ordered routine — e.g. SCAMPER, OODA),
  `RULE` (a constraint/heuristic/named-law) — these three are INSTRUCTION roles. *The word "recipe" is
  reserved for this skill's own composed sequences of moves, never the role.*
- **Domain Tag** — the catalogues group records under `#### domain:` headings (largest: `cognitive`,
  `mathematical`, `strategy`, `cross-cultural`, `health`, `economics`, …). Domain is the index's and
  the giants' split axis.
- **Confidence** — each record carries its tag (`high`, `llm-high`, or a flagged Tier-2 `medium`/
  `llm-medium`). The catalogues are **already viability-gated**: Tier 1 is strict; the small roles add a
  flagged Tier-2 top-up. (The weak `low`/`llm-low` tail was cut in curation.)
- **Collection Tags** — secondary labels (`cognitive-bias`, `decision-heuristic`, `named-law`, …) shown
  on each record's last line.

---

## The 6-Step Cognitive Stack Router

Run these in order. They narrow from "a stuck human" to "the specific cognitive object(s) this problem
needs." Steps 2–6 decide *which kind of object* gets retrieved (the role spine); Steps 1 and the recipe
layer below decide *which recipe (sequence)* runs. They converge at execution.

### Step 1 — Intent / stuckness

Name what the person is actually stuck on. Diagnosis here drives everything downstream. Classify into
one of the **10 stuckness families** (these are also the recipe-map categories below):

| Stuckness family | The felt experience |
|---|---|
| Can't choose | A decision they can't make; options that won't resolve. |
| Can't create | Out of ideas; the obvious approaches are exhausted. |
| Can't diagnose | Something's wrong but they can't see *why*. |
| Can't predict | Facing uncertainty/risk; can't tell how it will go. |
| Can't persuade | They understand it but it won't land for others. |
| Can't understand | They want to grasp how/why something works. |
| Can't execute | They know what to do but throughput is stuck. |
| Can't align | People/parties out of sync; conflict or non-agreement. |
| Can't grow | Personal/identity plateau; values–behavior conflict. |
| Can't change the system | Smart people, bad outcomes; the structure resists change. |

A query can carry more than one. Pick the **primary** stuckness; note secondaries (they justify a
secondary role in Step 3).

### Step 2 — CLAIM vs INSTRUCTION (Tier1)

Does the problem primarily need an object that **asserts what is true** (`CLAIM`) or one that
**prescribes what to do** (`INSTRUCTION`)? This is a coarse cut that pre-partitions the 8 roles:

- **CLAIM →** `MECHANISM` · `STRUCTURE` · `PROPERTY` · `TRAJECTORY` · `PATTERN` (the descriptive/causal
  objects — they tell you how reality *is*).
- **INSTRUCTION →** `OPERATION` · `PROCEDURE` · `RULE` (the prescriptive objects — they tell you what
  to *do* or what constraint to honor).

> **Grammar misleads — judge by the *useful object*, not the question's verb.** A "how do I…?" question
> reads like an INSTRUCTION but often needs CLAIM objects (you must first understand *why* something
> happens). Conversely, a "why does this keep happening?" diagnosis is best served by INSTRUCTION-role
> OPERATIONS — diagnostic *moves you run* — with a CLAIM-role MECHANISM as backup. Many problems need a
> **primary from one side and a secondary from the other** (e.g. a recurring-failure diagnosis: primary
> OPERATION to run, secondary MECHANISM to understand). Decide which side the *answer's load* sits on.

### Step 3 — Role mix (the core move)

Pick the **primary** Tier-2 role (the kind of object that carries the answer) plus an optional
**secondary** role. This is the decision that determines *which kind of object gets retrieved* — the
skill's whole north star. Use the stuckness family from Step 1:

| Stuckness | Tier1 lean | Primary role | Secondary role | Why |
|---|---|---|---|---|
| Can't choose | INSTRUCTION | `OPERATION` (decision moves) | `RULE` / `PROPERTY` | Decision tools + heuristics (Kelly, opportunity cost) + optionality/reversibility. |
| Can't create | INSTRUCTION | `OPERATION` / `PROCEDURE` | `PATTERN` | Generative moves + named routines (SCAMPER); patterns reveal the unworked angle. |
| Can't diagnose | INSTRUCTION | `OPERATION` (diagnostic moves) | `MECHANISM` / `PATTERN` | Moves to run, plus the causal mechanism / recurring shape behind the failure. |
| Can't predict | CLAIM | `TRAJECTORY` | `MECHANISM` / `PROPERTY` | How it evolves + the drivers + antifragility/optionality properties. |
| Can't persuade | mixed | `OPERATION` / `STRUCTURE` | `PROCEDURE` | Perspective/reframe moves + argument/narrative structure + protocols (NVC). |
| Can't understand | CLAIM | `MECHANISM` | `STRUCTURE` / `OPERATION` | How it works + how parts relate + extraction moves. |
| Can't execute | INSTRUCTION | `OPERATION` / `PROCEDURE` | `MECHANISM` | Bottleneck-finding + named routines; the system constraint underneath. |
| Can't align | mixed | `STRUCTURE` / `PROCEDURE` | `OPERATION` | Relational structures (drama triangle, stakeholder map) + negotiation protocols. |
| Can't grow | mixed | `STRUCTURE` / `TRAJECTORY` | `PROCEDURE` / `OPERATION` | Identity structures + developmental stages + reflective protocols. |
| Can't change the system | CLAIM | `MECHANISM` / `STRUCTURE` | `OPERATION` | Feedback loops + incentives + org structure; leverage-point-finding moves. |

This table is a **starting hypothesis, not a lookup**. Override it when the specific query points
elsewhere, and record the override in the recipe trace. **Retrieve the primary and secondary roles as
separate slices, never as a union** (unioning roles balloons the set and reintroduces noise).

### Step 4 — Domain retrieval (the highest-leverage decision)

Choosing the domain set is the single most consequential retrieval decision — over-broad domains drag
in noise; too-narrow misses the best tools.

1. **Default-include `cognitive`** for any decision / diagnosis / prediction / reasoning problem. It is
   the largest, most transferable domain; under-selecting it loses the best general thinking tools.
2. **Add the problem's *subject* domains** — pick from the real 29, grouped here as a selection aid:
   - *decision / strategy:* `strategy` · `economics` · `business` · `risk`
   - *diagnosis / systems:* `systems` · `organizational` · `behavioral`
   - *people / communication:* `communication` · `negotiation` · `social` · `identity`
   - *growth / meaning:* `contemplative` · `philosophical` · `identity` · `health` · `career`
   - *making / creating:* `design` · `creativity` · `technology`
   - *culture / ethics / society:* `cross-cultural` · `ethics` · `sociopolitical` · `legal` · `environment`
   - *formal / natural:* `mathematical` · `physics` · `biology`
   - *teaching:* `pedagogy` · *throughput:* `productivity`
3. **Start narrow** (`cognitive` + 1–2 subject domains). Widen only if the slice is too thin. In the
   index, your candidate set is the chosen role's lines under those domain headings; open only the
   matching `catalogues/<ROLE>/<domain>.md` slice (or the whole small-role file) for full records.

### Step 5 — Tier preference + collection filter

The catalogues are **already viability-gated** — you don't re-filter by confidence, you read what's
curated:

- **Tier preference:** prefer **Tier 1** (strict `{high, llm-high}`) records. The four small roles
  (OPERATION, RULE, TRAJECTORY, PATTERN) also carry a **flagged Tier-2 top-up** (`medium`/`llm-medium`,
  marked `· T2` in the index and in a "Tier 2" section of the file) — reach into it only when Tier 1 is
  too thin for the role × domain, and scrutinize those medium-confidence claims. The four giants
  (MECHANISM, STRUCTURE, PROPERTY, PROCEDURE) are pure Tier 1. The weak `low`/`llm-low` tail was already
  cut in curation, so it can never surface.
- **Collection filter (optional refinement):** when the query clearly wants a *kind* of object, narrow
  by collection tag (shown on each record's last line) — e.g. "what bias is this?" → `cognitive-bias`;
  "is there a law for this?" → `named-law`; "give me a rule of thumb" → `decision-heuristic`. A
  narrowing aid, not required.

### Step 6 — Semantic selection + decorrelation check

1. **Claude reads the survivors and selects by understanding** — *never* by keyword frequency or count
   score (hard rule: keyword ranking pulls domain-adjacent noise — finance models into a marketing
   question). Record what was **selected and what was rejected, with reasons** → this becomes Artifact 3.
2. For each selected model, note its **use** (lens / operation / content — see `references/lenses.md`):
   selecting a model includes deciding *how* to apply it, not just which one.
3. **Decorrelation check:** before committing, ask "are my selected models all from one
   worldview/paradigm?" If they're correlated, deliberately reach for a rival lens. The light check
   here (do the models cluster in one worldview?) is backed by the **paradigm rival-check** — the baked
   **decorrelation subset** (`references/decorrelation-subset.md`): resolve the operative worldview to a
   subset entry (its alias table bridges everyday labels like "Lean Startup" → Experimentalist), and
   read its 2–3 baked rival worldviews, oriented to surface *what each rival sees that this worldview
   misses*. When the worldview isn't in the subset, the subset's honest floor has you name the rival by
   reasoning and say so. It runs at output time beneath the signature's **Layer 3** (Artifact 2),
   consuming the `[Rival-check pending]` hook that layer prints, and must change Artifact 4 (no decoration).

### Step 6.5 — Depth-of-use check (gated: `Can't grow` / `Can't change the system` only)

**Fires ONLY when the *primary* stuckness (Step 1) is `Can't grow` or `Can't change the system`.** For
every other family, skip this step — it does not apply, and running it elsewhere is sprawl.

A model can be applied at three **depths** (Michael's *Three Levels of Framework Use* — the depth-of-use
axis; orthogonal to *which* model and *which* recipe):

- **On the task** — the immediate problem. *(Pareto on today's to-do list.)*
- **On your own thinking** — how you use your own models and habits. *(Pareto on which of your habitual
  tools you actually invoke.)*
- **On the domain itself** — the structure/substrate of your whole field. *(Pareto on which 20% of your
  clients / articles / modules drive 80% of the value.)*

These two stuck-states are usually a **depth mismatch, not a missing tool** — the person already holds the
right model but is running it one level too shallow:

- **`Can't grow`** plateaus when thinking tools stay *on the task* while the growth edge is *on your own
  thinking* (one depth up — the stuck move is meta-cognitive: examine the pattern, not the instance).
- **`Can't change the system`** resists when effort lands *on the task / on individuals* while the
  leverage is *on the domain's structure itself* (one depth up — the substrate, not the symptom).

**The gated move:** read the depth at which the user is currently applying their thinking. If it is too
shallow for the stuck-state, **lift the *same* model up one depth** in the recipe/answer — do not add a
new model. Lead with **one** lift; never lay out all three depths as a menu. Like every other check, it
**must change Artifact 4** (the lift shows up in the answer) or it is theater — drop it.

**Optional signature line (Artifact 2):** when the lift fires, you may add **one** plain line naming the
depth shift (e.g. "You're applying this to the task; your growth edge is applying it to how you work").
At most one line; omit if it adds nothing.

**Anti-sprawl invariant:** gated to two families · one model lifted one level · leads with a single move ·
must change the answer. It is a *depth adjustment to the existing selection*, never a new artifact or a
new direction.

---

## Recipe selection — v1's problem-type map, wired beneath the role spine

The role spine (Steps 2–6) decides *which models* are retrieved. The **recipe** is the ordered sequence
of moves the answer runs. Selecting the recipe uses the stuckness family from Step 1 against v1's
problem-type→recipe map (retained per Approach L1):

> **All 61 recipe bodies are bundled.** To run one, open its part-file (R1–R6 → part1, R7–R11 → part2,
> R12–R16 → part3, R17–R24 → part4, R25–R32 → part5, R33–R40 → part6, **R41–R50 → part7, R51–R61 →
> part8**) and execute its steps. Each step reads `[Operation] via [Move], through the lens of [Lens]`
> against `operations-moves.md` + `lenses.md` (all 249 move citations machine-verified against the
> operations layer). When the query matches no named recipe, **compose ad hoc** (see
> `## When no recipe fits`).

| Stuckness family | Signal in the query | Recipe |
|---|---|---|
| **Can't choose** | Stuck for weeks, analysis sophisticated, no breakthrough | R1: Wrong-Problem Detector |
| | High-stakes choice, incomplete info, must decide | R2: Decision Clarifier |
| | Knows *what* to do, unsure *how much* to commit | R3: Bet Sizer |
| | Torn between doubling down and pivoting | R4: Pivot Evaluator |
| | Right move identified, timing uncertain | R5: Timing Optimizer |
| | Considering quitting; wisdom or weakness? | R6: Exit Strategist |
| | Stuck in a felt binary; choice set too narrow | R41: Option Widener |
| | When to stop sampling serial options and commit | R42: Search Stopper |
| | Flip-flopping between two genuine goods that won't resolve | R43: Polarity Manager *(also serves Can't change the system)* |
| **Can't create** | Exhausted obvious approaches, needs genuine novelty | R7: Innovation Engine |
| | Wants new understanding, not retrieval of the known | R8: Knowledge Creation Engine |
| | Crowded space, needs to redefine the game | R9: Category Creator |
| | A "fixed" limitation that might be an advantage | R10: Constraint Alchemist |
| | Conventional wisdom feels wrong, can't say why | R11: Paradigm Breaker |
| | Blank page, acute block, need to generate now | R44: Creative Unblocker |
| | Wants to import a solution from a distant field | R45: Analogy Engine |
| **Can't diagnose** | Metrics fine but gut says something's missing | R12: Blind Spot Finder |
| | Same problem keeps returning despite fixes | R13: Root Cause Excavator |
| | Progress plateaued; working harder, results flat | R14: Stagnation Breaker |
| | Too tangled to see; paralysis by analysis | R15: Complexity Reducer |
| | Keeps falling into a known bad pattern | R16: Pattern Interrupt |
| | Competing theories of why; which is it? | R46: Differential Diagnoser |
| **Can't predict** | Must prepare for unpredictable catastrophic events | R17: Black Swan Preparedness |
| | Must decide now; key info won't arrive in time | R18: Uncertainty Navigator |
| | Upside attractive, downside could be fatal | R19: Downside Limiter |
| | Wants to benefit from volatility | R20: Antifragility Designer |
| | Can't predict which future; needs a robust strategy | R47: Scenario Planner |
| | Needs a calibrated estimate, not an inside-view guess | R48: Outside-View Estimator |
| **Can't persuade** | Has a position, it keeps failing to persuade | R21: Argument Strengthener |
| | Understands deeply, can't make it land | R22: Audience Translator |
| | About to face a critical/skeptical audience | R23: Objection Anticipator |
| | Has data/evidence but no compelling narrative | R24: Narrative Constructor |
| | Clear case keeps getting resisted; *why* is it refused? | R61: Resistance Diagnoser |
| **Can't understand** | Expert does it brilliantly, can't explain how | R25: Mental Model Extractor |
| | Needs functional competence in a new domain fast | R26: Expertise Accelerator |
| | Suspects deep unexamined assumptions constrain them | R27: Assumption Archaeologist |
| | Has expertise in A, wants to apply to B | R28: Transfer Engine |
| | Can't grasp why a smart person believes the opposite | R49: Steelman Decoder |
| | Drowning in conflicting info; what's actually true? | R50: Claim Verifier |
| **Can't execute** | High effort, low throughput; something constrains it | R29: Bottleneck Finder |
| | Overwhelmed; needs the simplest viable version | R30: Minimum Viable Path |
| | Major change ahead; needs to see cascading effects | R31: Unintended Consequences Scanner |
| | Plan looks good, nagging sense something will break | R32: Implementation Stress Test |
| | Re-doing the same manual task; can't delegate it | R51: Systemizer |
| | Know what to do, can't do it consistently (self-execution) | R52: Behavior Change Designer |
| **Can't align** | Entering a high-stakes negotiation | R33: Negotiation Mapper |
| | Two parties locked in opposition, compromise rejected | R34: Conflict Resolver |
| | Multiple parties, different priorities, need agreement | R35: Stakeholder Aligner |
| | Need genuine group buy-in, not a resentful vote | R53: Consensus Builder |
| | Trust broken after a rupture; rebuild it (fight is over) | R54: Relationship Repairer |
| | Meetings produce talk not decisions; who decides, how? | R55: Decision Forum Designer *(also serves Can't change the system)* |
| **Can't grow** | Outdated identity constraining growth | R36: Identity Audit |
| | Competent but not growing; mastered current level | R37: Growth Edge Finder |
| | Stated values and actual behavior in conflict | R38: Values Clarifier |
| | Just failed; turn the setback into durable learning | R56: Setback Metabolizer |
| | Mid-transition, feel *between selves* | R57: Transition Navigator |
| | Keep getting emotionally hijacked and reacting badly | R58: Reactivity Interrupter |
| **Can't change the system** | Smart people consistently doing counterproductive things | R39: Incentive Auditor |
| | Good ideas keep dying inside the organization | R40: Org Immune System Detector |
| | Pushing on the system, nothing moves; where to push? | R59: Leverage Point Finder |
| | A behavior keeps amplifying/self-correcting; render the structure | R60: Feedback Loop Mapper |

If several recipes fit, choose the one matching the **primary** stuckness; note alternatives in the
recipe trace.

### When no recipe fits

Some queries don't map cleanly to any of the named R1–R61 recipes but still benefit from the framework.
For those, this is the **execution path** (also how every recipe was originally composed):

1. Take the role-router survivors selected in Step 6.
2. Identify the 2–3 operations/moves that fit (from `references/operations-moves.md`), plus any standing
   lens (`references/lenses.md`).
3. Compose them into an ad-hoc ordered sequence, and document the reasoning in the recipe trace.

This is valid: recipes are *named* sequences, but the operations compose independently — the named
recipes were themselves originally composed this way.

---

## Retrieval — read the index, then the slice

This is the self-contained version: there is no CSV and no code execution. Retrieval is **navigation**,
in three moves, and the key discipline is the same as the Code version's — *never load a whole giant
catalogue; read one role × domain slice.*

1. **Read `references/library-index.md`** — the scannable table of contents (one line per model: name ·
   `#num` · confidence · the one-line *what*). Find the **role** (from Step 3) and the **domain(s)**
   (from Step 4). The candidate set is that role's lines under those domain headings — already small.
2. **Open only the slice you need.** The index names the file per domain group:
   - **Small roles** (OPERATION, RULE, TRAJECTORY, PATTERN) live in one file —
     `catalogues/<ROLE>.md` — small enough to read whole.
   - **Giants** (MECHANISM, STRUCTURE, PROPERTY, PROCEDURE) are split per domain —
     `catalogues/<ROLE>/<domain>.md`. Open just that one. (The undivided MECHANISM would be ~70k
     tokens; a single domain slice is a small fraction of that.)
3. **Read the survivors and select by semantic judgment** — *never* by keyword frequency or count score
   (keyword ranking pulls domain-adjacent noise — finance models into a marketing question). Record what
   was **selected and what was rejected, with reasons** → Artifact 3.

Retrieve the primary and secondary roles as **separate slices, never a union** (unioning roles balloons
the set and reintroduces noise). If a slice is still too long, **tighten the domain first** (Step 4).

---

## Execution → the 5 artifacts (the 5th optional)

### Artifact voice contract (ported verbatim from v1 — governs ALL FIVE artifacts)

Every artifact a user reads obeys these. They are v1's own rules; v1's artifacts were plain by construction, and this is how we keep v5's richer artifacts plain too.

- **Specific and actionable, not generic.** "You tend toward First Principles thinking" is weak. "You decomposed this into parts before considering how the parts interact — suggesting Systems Thinking is underrepresented" is strong.
- **Anchor every flag in evidence.** Point to the specific thing the user said or implied. A bias named in the abstract is a horoscope. If you cannot point to where it shows up, do not raise it.
- **Be selective.** At most the 2 to 3 most consequential items. If the framing is clean this turn, say "nothing notable stands out" rather than manufacturing flaws. A clean run is a valid run.
- **Keep the three kinds distinct.** A bias is a distortion in judgment (sunk cost, availability). A fallacy is an error in inference (false cause, false dilemma). An assumption is an unstated premise the conclusion rests on and that could be tested.
- **Be charitable.** These are normal features of cognition, not failings. Name them as places the thinking may be costing accuracy, not as proof the user is irrational.
- **Honest about thin data.** Don't overstate confidence when you have limited conversation history.
- **Artifact 4 must be qualitatively different from Artifact 1** — not a more polished version but a fundamentally reframed answer that reveals dimensions the natural answer could not access. Lead with a one-line headline reframe carried by a plain metaphor; name the recipe and moves by their plain handles (R-numbers stay in Artifact 3); end on what's genuinely going well.
- **Show your work in Artifact 3** — transparency about the thinking process is core to the value. The user learns the framework by watching it operate.
- **Artifact 5 is a specific, do-able proposal** — concrete enough that someone could poke holes in it, warm and plain, never a menu.

**Audience + the one v5-only rule (v1 had no machinery to leak).** Write for a smart layman who knows what a mental model *is* but not which ones — they get the genre; they don't know the inventory. So every time you name a model / bias / fallacy / worldview, **explain how it works** in plain terms and tie it to *their* situation (name → explain → apply, never name-and-move-on). But the skill's internal bookkeeping — `#record` IDs, role-caps, "Tier / viability gate / decorrelation," "Layer N," tension IDs, the route fingerprint — **never reaches the reader**, not even in Artifact 3 (which stays on named recipes/operations/lenses + R-numbers). Plain ≠ dumbed-down: those plain how-it-works explanations ARE the teaching payload.

**Create the artifacts as SEPARATE markdown artifacts, in order — never combine them into one artifact.** Each is its own markdown artifact (its own canvas), presented to the user. A query produces four artifacts (Artifact 1–4), plus a fifth (Artifact 5) only when it earns its place — see its gate. So create **four, or five when Artifact 5 fires.**

**CRITICAL — give each artifact its own filename, with a turn number.** The filename is what makes each one a *separate* artifact: same filename updates the same canvas, a new filename creates a new one. Every set must use a unique turn number so previous artifacts are preserved (not overwritten). Track which turn you are on; the first time the skill fires this conversation use `01`, the second time `02`, and so on. Filenames follow this pattern:

- `natural-answer-01.md`, `cognitive-signature-01.md`, `recipe-trace-01.md`, `recipe-answer-01.md`, `next-move-01.md`
- `natural-answer-02.md`, `cognitive-signature-02.md`, `recipe-trace-02.md`, `recipe-answer-02.md`, `next-move-02.md`
- ...and so on for each subsequent exchange.

NEVER reuse a turn number. NEVER use bare filenames without a turn number. NEVER pour multiple artifacts into one canvas. If you are unsure what turn you are on, count the sets already created in this conversation and increment by one.

**Deliver the artifacts progressively, and keep the conversation body light.** Create each artifact as its own canvas in order (1 → 5), presenting each the moment it's created so the user can open and read it while the remaining artifacts are still being generated — canvases already surface one at a time, so lean into that; never hold them all to the end. **Keep the conversation body to brief references only — do not paste the full text of any artifact (including Artifact 1, the natural answer, or Artifact 4, the recipe answer) into the body.** Every artifact, the natural answer included, is delivered as its own canvas the reader opens as it appears. When you reference the natural-answer canvas, **label it as the baseline** (e.g. "Natural answer (baseline, for comparison)") so the reader doesn't mistake the control for the real answer — the deeper answer is **Artifact 4 (the recipe answer)**. Close with a one-line confirmation once the final artifact is created.

The five artifacts, each its own canvas, in order (Artifact 5 only when it earns its place — see its gate):

1. **Natural answer** (`natural-answer-{NN}.md`) — what you'd say *without* the router. The baseline / control. (Makes router value
   visible.)
2. **Cognitive Signature** (`cognitive-signature-{NN}.md`) — the **cognitive mirror** (Signature 2.0): a short, plain-language read of the
   user's *own* thinking, written so a non-technical reader absorbs it without decoding anything. Reader-facing
   sections: (1) **The thinking tools you're using** — ≤3 models the framing reveals they're reasoning with;
   (2) **Where your own thinking might be steering you wrong** — the biases + logical fallacies in play;
   (3) **The belief underneath your question** — the operative worldview + its core assumption (and, beneath it,
   the rival worldview the decorrelation step surfaces); (4) **What would cover the blind spot** — ≤2
   counter-models; then a closing **Pattern worth noting**. **Obeys the Artifact voice contract above** (name →
   explain how it works → tie to their situation; evidence-anchored; charitable; show NO record IDs / role labels /
   "decorrelation" / "Tier" / "Layer N" / route fingerprint to the reader). The route fingerprint (operation / role / domain / collection,
   recording the *use* per `lenses.md`) is computed and recorded **internally**, not printed in Artifact 2.
   **Lean + evidence-bound:** every flag cites where in the conversation it appears, resolves internally to a real
   library `#record`, and must change Artifact 4 (no theater); counts are ceilings, not quotas. Full spec,
   anchor sets, and the plain worked example + output template in `references/cognitive-signature.md`. *(The
   worldview section names the worldview; the **decorrelation subset** then supplies its rival worldviews and
   lands them beneath it — resolve the operative worldview to a subset entry, read its baked oriented rivals
   (lean), or, off-subset, name a reasoned rival and say so; surfaced to the reader in plain terms only. Spec:
   `references/decorrelation-subset.md`.)* *(When the primary stuckness is `Can't grow` / `Can't change the
   system`, Step 6.5's gated depth-of-use check may add **one** optional plain line — see Step 6.5. Omit
   otherwise.)*
3. **Recipe trace** (`recipe-trace-{NN}.md`) — the 6-step router run with the filter counts and the semantic selection (including
   what was rejected and why), then the recipe (named or ad-hoc) and each step. It also surfaces the
   **debiasing counterfactuals** generated from the signature's bias scan — the questions the user would have
   asked *without* their biases — split into "changed the answer" vs "didn't." The observability layer, and the
   **most technical artifact** — that's allowed (it's "show your work"). But it still stays **above the plumbing
   floor:** name recipes (R#), operations, and lenses as readable handles and run their steps; **no raw
   `#record` IDs, no role-caps (`INSTRUCTION → OPERATION`…), no "Tier / viability gate / decorrelation /
   tension #" jargon** — those are internal-only, never reader-facing even here. Give it a plain top-line so a
   curious reader can skim it.
4. **Recipe answer** (`recipe-answer-{NN}.md`) — the answer produced by *running the recipe*. The **warmest** artifact, and it
   **obeys the voice contract:** lead with a one-line **headline reframe carried by a plain metaphor**, name
   the recipe and its moves by their **plain handles (R-numbers stay in Artifact 3)**, and end on **what's
   genuinely going well**. **Must be qualitatively different from Artifact 1** (no router theater — the router
   must change *which* models drive the answer). Where a debiasing counterfactual changed the answer, this is
   where its nuance is **absorbed** — folded into the single focused recipe, never split into separate directions.
5. **Your next move** (`next-move-{NN}.md`) *(optional)* — turns Artifact 4's single most useful move into something the user can *do
   right now*, **delivered here in the conversation** (the finished deliverable produced inline, or a **reusable
   paste-back prompt** they can re-run anytime). Reader-facing, it **obeys the voice contract: a specific, do-able
   proposal — concrete enough that someone could poke holes in it, warm and plain, never a menu.** A
   **handoff/translation layer, not new thinking**: it only re-expresses a move already in Artifact 4, under the
   same convergence discipline. *(If the user happens to be in Claude Code, it can offer to make this a saved file
   or reusable skill instead — one optional line; see the spec.)*

### Artifact 5 — your next move (spec)

*The gate logic below is **internal reasoning**. What the **reader sees** obeys the voice contract: a specific, do-able proposal in plain, warm language (like v1's "by June 30 a concrete revenue map exists — specific enough that someone could poke holes in it"). Deliver the move itself; never show the gate's internal vocabulary.*

This is the Chat edition, so Artifact 5 resolves to a **do-it-here-now** action — the user may be in
claude.ai, where there's no file system to write to and no Claude Code to paste into. The move is rendered
*in the conversation*, not handed off to another surface.

**The gate (fires only when all hold — else omit Artifact 5 honestly; do NOT manufacture one):**
1. **Doable in this conversation.** Claude can produce the deliverable inline, or hand back a reusable
   paste-back prompt. Moves that need a surface the user may not be on — go talk to your users, run this on a
   file, build a persistent skill — are **dropped, not dressed up** (name in one line if useful).
2. **Grounded in Artifact 4.** Every suggestion traces to a *specific* move already in Artifact 4 (ideally
   an absorbed counterfactual nuance). No new directions — the anti-sprawl guarantee applied to the handoff.
3. **Ceiling, not quota.** Lead with the **single** highest-leverage action; at most **2**; surface 1 if
   only the recipe-level move fits. Convergent, never a menu.

**Flavor (smart-pick by the shape of the move):**
- **Produce it now** — Claude generates the deliverable *in the chat* (the drafted survey, the filled
   template, the worked checklist), so the user leaves with the thing itself, not instructions to make it.
- **Save-this-prompt-to-reuse** — a self-contained paste-back prompt the user keeps and re-runs whenever the
   situation recurs ("paste this back whenever you want me to run this on your real list").

**Optional one-line upgrade hook (only if it doesn't break the convergent lead):** if the user is in Claude
Code rather than claude.ai, add a single line offering the persistent version — "if you're in Claude Code, I
can save this as a file or turn it into a reusable skill." Default stays the in-chat action (everyone can do
that); the hook never replaces the lead.

**Form:** the deliverable itself, or a fenced paste-back prompt, plus one line naming the move it came from
(and optionally one naming any move the gate dropped). Keep it self-contained and convergent so what it
produces inherits this skill's anti-sprawl north star.

A full worked example of Artifact 2 — and a worked Artifact 5 — is in `references/cognitive-signature.md`.

---

## Reference-usage map

Read these **lazily** — only the slice you need, only when you need it. Never load a catalogue (or a
giant's whole role) all at once; select off the index, then open one slice.

| File | Contains | Read when |
|---|---|---|
| `references/library-index.md` | The scannable selection surface: one line per model (name · `#num` · confidence · one-line *what* · twin cross-refs), grouped by role → domain, each group naming its full-records file | **Step 4–6 retrieval** — scan here first to pick the role × domain candidates |
| `references/catalogues/{OPERATION,RULE,TRAJECTORY,PATTERN}.md` | The four **small** roles, whole (Tier 1 + a flagged Tier-2 top-up). OPERATION 41 · RULE 55 · TRAJECTORY 39 · PATTERN 33 | Role mix includes that role — read the file for full records |
| `references/catalogues/{MECHANISM,STRUCTURE,PROPERTY,PROCEDURE}/<domain>.md` | The four **giants**, split per domain (pure Tier 1). MECHANISM 144 · STRUCTURE 81 · PROPERTY 100 · PROCEDURE 68 | Role mix includes a giant — open **only** the chosen domain slice (the index names it) |
| `references/operations-moves.md` | 9 operations × 84 moves (the recipe building blocks) | Running a recipe step, or composing ad hoc |
| `references/lenses.md` | Lens-as-use pattern + 10 standing cross-cutting lenses | Deciding *how* to use a selected model (Step 6), or running a habitual angle |
| `references/cognitive-signature.md` | Signature 2.0 spec: the 5 layers, detection method, bias + fallacy anchor sets (with `#records`), the worked example | Producing **Artifact 2** |
| `references/decorrelation-subset.md` | The baked paradigm rival-check (Chat analogue of the Code engine): 23 high-likelihood worldviews → 64 curated oriented rivals, an everyday-label resolver, and an honest reasoned-rival floor | Producing **Artifact 2 / Layer 3** (the rival-check), or a Step 6 decorrelation check |
| `references/recipes-part1..8.md` | The R1–R61 recipe bodies (step-by-step procedures). part1: R1–6 · part2: R7–11 · part3: R12–16 · part4: R17–24 · part5: R25–32 · part6: R33–40 · **part7: R41–50 · part8: R51–61** | Running a named recipe selected from the map above — load only the matching part-file |

---

## Scope notes (what this version intentionally does and doesn't do)

This Chat mirror is the **decorrelation floor**, not the ceiling. By design it:

- **Names paradigm rivals** (the decorrelation subset) but does **not** run a whole turn *through* a
  rival worldview — that first-class **paradigm lens** is a Code-only capability.
- **Selects from a curated 561-model library**, not the full 2,375-model encyclopedia. The role × domain
  × semantic funnel narrows any query to a readable set; the weak-confidence tail was cut in curation.
- **Carries a baked rival subset** for the ~23 most likely worldviews; for anything off-subset it names
  a rival **by reasoning and says so** (`decorrelation-subset.md`'s honest floor) rather than fetching.
- **Is a documented derived subset** of the Claude Code build — same router, same recipes, same
  signature; the differences (no live retrieval, no execution, baked decorrelation) are listed in
  `version-diff.md`. If you have the Code build and its CSVs, that version adds live retrieval over the
  full encyclopedia and the live decorrelation engine.
