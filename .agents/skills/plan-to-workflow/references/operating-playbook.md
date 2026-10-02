# The Dynamic Workflow Operating Playbook

> A foolproof, repeatable procedure for doing what the article describes — **with the
> safety discipline the article leaves out.** Built from a stress-test of Paweł Huryn's
> "Claude Dynamic Workflows for PMs." Companion to `dynamic-workflows-article-context.md`.
>
> **Governing principle:** "Foolproof" is not the `ultracode` keyword or the harness. It
> is a *fixed sequence with non-negotiable gates*. The author's flow is
> `build → skill → schedule`. The corrected flow inserts the step that makes it safe:
> **gate → build → SUPERVISED TRIAL → skill → schedule → monitor.**

---

## The three guarantees (the real point — memorize these)

Strip the jargon and a dynamic workflow is only worth building if it delivers three
things a single long model session cannot:

1. **Completeness** — *every* item is processed (the loop re-checks the condition; the
   model can't tire at 70%).
2. **Independent judgment** — the thing that *grades* is a different agent from the thing
   that *produces* (separate context, ideally a different model tier).
3. **Goal stability** — the objective lives in code, outside any context that compacts
   and drifts.

Evaluate any approach — including a much simpler one — against these three. If a plain
prompt or a single subagent already gives you all three, **you do not need a workflow.**

---

## Stage 0 — The Gate (decide if it's even a workflow)

Run a candidate task through all four. **All four must be YES** or you stop and use a
simpler tool.

| # | Gate question | If NO → |
|---|---|---|
| 1 | Does the job have **chained stages** where stage N's output decides stage N+1 (route / score / filter / loop / retry / generate / verify)? | Use a single subagent fan-out, or a plain prompt. |
| 2 | Can you **name the rubric**? (What does "good" mean? What's the scoring formula or pass/fail test?) | Define the rubric first. An undefined rubric just makes unverified output faster. |
| 3 | Will you run it **more than once** (recurring, or large enough that the harness pays for itself)? | One-off + small → just prompt it. The harness costs more than the task. |
| 4 | Is the task **bounded and decomposable** into independent units (per-interview, per-story, per-competitor)? | If units depend on each other sequentially in a way code can't express, rethink. |

**Anti-patterns that fail the gate (don't build a workflow for these):**
- A daily report that's mostly *extract → format* (one fan-out at most).
- A single competitor teardown (one agent per rival + one merge = subagent job).
- Anything where you can't articulate what a correct answer looks like.

---

## Stage 1 — Build (describe the pipeline; Claude writes the harness)

You describe stages in plain language; you **never hand-write the JavaScript.** Use the
reusable template below. Replace the bracketed parts.

### Reusable build prompt template

```
Build a dynamic workflow with these stages, and SHOW ME THE HARNESS BEFORE RUNNING IT.

1. [EXTRACT/CLASSIFY]: one [cheap-model: Haiku/Sonnet] agent per [unit, e.g. interview
   file]. Each returns [the structured fields you need] plus [any 1-5 scores], defined
   here in plain language so the agent knows the schema.

2. [CANONICALIZE — include this if units produce free-text labels]: one agent clusters
   the raw outputs into a canonical set. The same [thing] shows up under different labels;
   merge synonyms before counting. (This is judgment → a model, not code.)

3. [SCORE — in code, no model]: count/rank each canonical item by [your explicit formula,
   e.g. frequency × importance × (5 − satisfaction)].

4. [GENERATE + TRIAGE]: for the top [N], a [Sonnet] agent proposes [candidates]; a
   SEPARATE judge agent ranks by [rubric, e.g. ROI = impact vs effort] and keeps top [K].

5. [BUILD/PRODUCE]: a [Sonnet] agent [produces the deliverable] for each winner.

6. [INSPECT + LOOP]: a smoke check flags any [output that fails the pass/fail test] and
   reruns ONLY that stage. Set a token budget of [explicit cap].

Tier the models: expensive reasoning only on the bounded judgment stages, cheap models
where the work is rote, free code for the glue, one structured object returned per stage.
```

### The one review question (for everyone)
When Claude shows you the harness, ask: **"Where do the tokens go, and where is work
thrown away?"** You're checking that expensive reasoning sits only on judgment stages,
cheap models do rote work, and code does the glue.

### The verification reality (critical — the article's blind spot)
> **If you can't read the JavaScript, reading the harness is theater.** Your real
> verification is not the code — it's the **output**. See Stage 2.

---

## Stage 2 — SUPERVISED TRIAL (the step the article skips — never skip it)

Run the workflow **once, manually, attended.** Do NOT skill-ify or schedule yet.
Then validate — and "validate" means more than "it ran":

- [ ] **Hand-check 3–5 items end to end.** Pick a few raw inputs, trace them through every
      stage, and confirm the final output is *correct*, not just *present*. ("Verified"
      in the article only meant the HTML rendered — that bar is too low.)
- [ ] **Confirm completeness.** Did *every* unit get processed? (e.g. 100/100 extractions,
      not 92.) Check the counts.
- [ ] **Confirm judge independence.** Is the grading agent genuinely separate from the
      producing agent? Would you trust its grade from an outsider?
- [ ] **Read where the spend went.** Was the token cost proportionate? Note the per-run
      cost — you'll multiply it by cadence later.
- [ ] **Iterate the prompt, not the code.** If a stage is wrong (the author's own
      merge/dedupe fragmentation), add one line of plain-language instruction and let
      Claude rewrite the harness. Even the fix lives off the model.

**Exit criterion:** the workflow survives **3–4 supervised runs** with hand-checked
outputs holding up. Only then proceed to Stage 3.

---

## Stage 3 — Ship as a skill (template, not frozen script)

```
Make this a [name]-discovery skill inside this project, with the workflow saved inside
as a template, not a fixed script.
```

Claude writes the skill and wires the files — you don't move files by hand. It becomes a
`/[name]` your team can run.

### The frozen-vs-dynamic decision (the article waves this away — you shouldn't)

| If the job is… | Keep the harness… | Why |
|---|---|---|
| **Exploratory / one-off / shape changes per run** | **Dynamic** (template, re-derived per run) | The dynamism *is* the value; inputs vary. |
| **Recurring + scheduled + unattended** | **Frozen** (a reviewed, version-controlled `.js` you don't regenerate) | Repeatability needs a stable, tested procedure. A workflow that rewrites itself each run is a workflow you haven't reviewed each run. |

> Rule of thumb: dynamism for exploration, frozen for production. Don't run a self-
> rewriting harness on a schedule against live data.

---

## Stage 4 — Make it a standing job (only after Stage 2 passed)

Three pieces, plus two caps the article under-weights:

- **Schedule** — re-runs the saved skill on a cadence. Start with the *longest* cadence
  that's still useful (weekly before daily); you can always tighten.
- **`/goal`** — sets a completion bar the model can't argue out of ("review all 50" = 50).
- **Budget** — a hard token cap. *Required, not optional, for anything recurring.* This is
  the line between a habit and a surprise bill. Size it from your Stage-2 per-run cost ×
  cadence × a safety margin.
- **A real smoke check that tests CORRECTNESS, not just render-success.** Build this in
  Stage 1 and confirm it in Stage 2 — it's the last line of defense once you're not
  watching. (Pre-mortem failure #1: a workflow that silently degrades because the smoke
  check only checked "did it render.")
- **A spot-check cadence.** Schedule yourself to hand-check a sample of outputs every
  Nth run. Unattended ≠ unmonitored.

---

## Stage 5 — Contain it (the guardrail is the toolset, not a prompt)

A workflow runs unattended and **does not stop to ask** — no "are you sure?" fires.
The only real guardrail is the toolset you hand each agent.

- [ ] Give every investigator/extractor an **explicit minimal tool list** (allowlist).
- [ ] Treat **"read-only" as a lie** until verified: a read-only agent can still carry a
      working shell, and a shell writes and deletes. **Check the allowlist; don't trust
      the label.**
- [ ] Keep **every mutating action in one narrow step** you review.
- [ ] **Data governance:** before pointing a fleet at real customer/company data,
      confirm what each agent can see and where outputs land. Don't fan PII or
      confidential data across agents you haven't scoped.

---

## The six-pattern recognition cheat sheet

Recognize which pattern the task already is — this upgrades how you decompose *any* work,
even without code.

| Task smells like… | Pattern | Skeleton |
|---|---|---|
| "Sort these into types, then handle each type differently" | **Classify-and-act** | classify → route in code |
| "Read all of these, give me the themes" | **Fan-out-and-synthesize** | 1 agent/piece → merge in code |
| "Is this actually right / safe / true?" | **Adversarial verification** | output → separate judge vs rubric |
| "Give me lots of options, keep the best" | **Generate-and-filter** | many candidates → filter + dedup |
| "There's no single right approach here" | **Tournament** | N attempts → judges compare → winner |
| "I don't know how much work there is" | **Loop-until-done** | spawn until stop condition |

---

## When NOT to use any of this (the honest summary)

- The task is a single fan-out + merge → **subagent, not workflow.**
- You'll run it once → **just prompt it.**
- You can't name what "good" looks like → **define the rubric first; build nothing.**
- It's small, obvious, narrow → **one prompt.**
- You'd be running it unattended on live data before you've validated outputs by hand →
  **stop. Do the supervised trial first.**

> Coordination you didn't need is still tokens spent. The technique is powerful for a
> *narrow* class of chained, repeatable, rubric-defined jobs — and a liability everywhere
> else.

---

## The corrected sequence, on one line

**Gate (4 yeses) → Build (describe, see the harness) → Supervised Trial (hand-check 3–5,
3–4 runs) → Skill (template or frozen) → Schedule + /goal + Budget + Smoke check →
Contain (allowlist, not labels) → Monitor (spot-check).**
