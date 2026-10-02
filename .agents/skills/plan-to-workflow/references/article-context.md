# Context: "Claude Dynamic Workflows for PMs" — Distilled Reference

> Source: Paweł Huryn, *The Product Compass*, 7 Jun 2026.
> This is a faithful distillation of the article's content, created to serve as
> in-chat context so the original PDF is no longer needed. Skipped per instruction:
> the five "what you might have missed" newsletter links and any media-player links
> (`#media…`). Kept: the experiment repo and the source blog reference, which are
> substantive non-media links.

---

## 0. One-line thesis

A **dynamic workflow** is a short JavaScript program Claude writes on the fly (in
Claude Code) to coordinate a fleet of subagents. The agents do the judgment and cost
tokens; the coordinating code does the routing and costs **zero model tokens**. Moving
the orchestration out of the model's context is what makes large-scale judgment work
reliable enough for one operator to run.

---

## 1. What a dynamic workflow is

- **Mechanism:** Triggered by the `ultracode` keyword (or by asking Claude to "use a
  workflow"). Claude reads the job, writes a script, spawns agents, merges results.
- **The key distinction:** the model does the *judgment*; ordinary code (loops, filters,
  sorting) does the *coordination*. None of the coordination calls a model, so routing
  the fleet is free. Agents still cost tokens; the glue between them does not.
- **vs n8n:** n8n glues your *tools* in a standing visual graph you build once, upfront.
  A dynamic workflow glues your *agents* in a `.js` file Claude writes per task, on the
  fly, then saves or tosses. Not a replacement — different question. n8n: "how do I
  connect tools I know?" Dynamic workflow: "how do I let the agent build the procedure
  for this run?"
- **vs Agent SDK:** SDK = *embedded* agents you ship inside your own product. Dynamic
  workflows = *workspace* agents doing your actual work inside Claude Code.
- **vs a single subagent:** A single fan-out + merge is already a subagent job (Opus
  delegating to a fleet, one round). Reach for a workflow only when **stage N's output
  determines stage N+1** (route, score, filter, loop, retry, generate, verify, build).

---

## 2. Why move the orchestrator off the model

The structure that holds orchestration outside the model is called a **harness**
(the author's older framing: "orchestration over autonomy"). The model gets the
judgment; the structure gets everything else. Four consequences:

1. **Determinism** — code owns order, routing, and the stop condition; they run the
   same way every time instead of depending on whether the model "feels done."
2. **Context isolation** — each agent gets a fresh, bounded job; the goal lives in the
   script, not in a window that compacts and drifts.
3. **No orchestration-token tax** — the coordination layer isn't another model
   conversation, so routing is free.
4. **Model tiering** — bounded, repetitive stages run on a cheaper model (a pro tip,
   not the core differentiator).

The first two are the point; the last two are why it's cheap. They fix three real
failure modes:

- **§2.1 Agentic laziness** — asked to review 50 items, the model reviews ~35, writes a
  confident summary, declares done. A loop holds all 50 and runs until the array is
  empty.
- **§2.2 Self-preferential bias** — the model grades its own work generously. A workflow
  makes the judge a *separate* agent (separate context, sometimes a different model);
  spawn several skeptics and require a majority.
- **§2.3 Goal drift** — over a long session the objective loses resolution; every
  compaction is lossy ("don't touch auth" can evaporate by turn 80). The workflow holds
  the goal in the script, outside the model's drifting memory.

---

## 3. The six patterns worth knowing

You don't invent these per task — you recognize which one a task already is.

| Pattern | What it does | Reach for it when |
|---|---|---|
| **Classify-and-act** | One agent decides task type; script routes accordingly | Triaging inbound (bug vs feature vs noise), routing tickets |
| **Fan-out-and-synthesize** | One agent per piece in parallel, then merge in code | Competitor teardown, customer-call synthesis, market map |
| **Adversarial verification** | Separate agents check output against a rubric | Fact-checking a PRD vs sources, a second reviewer on a risky call |
| **Generate-and-filter** | Many candidates, filtered + deduped, survivors kept | Naming, positioning lines, experiment ideas |
| **Tournament** | N agents attempt the task differently; judges compare until one wins | Strategy memo or hard design with no single right approach |
| **Loop-until-done** | Keep spawning until a stop condition (no findings/errors, empty queue) | Backlog triage or audit where you don't know how much work there is |

PM examples on real work: synthesize interviews (one agent per transcript → themes+JTBD
table); check 80 user stories against INVEST (loop until every story checked); pressure-
test a PRD (a separate agent red-teams it against your goal).

---

## 4. Worked example — discovery loop on 100 interviews

Six stages, each feeding the next:

1. **Extract** — fan out one *cheap-model* agent per interview (Haiku/Sonnet, not Opus);
   each returns structured opportunities, personas, verbatims, and three 1–5 scores per
   opportunity (frequency, importance, satisfaction).
2. **Canonicalize** — one agent clusters raw opportunities into a canonical set
   (the same need arrives under a dozen labels; merging synonyms is *judgment*, so it's a
   model, not code). *This stage was not in the author's first prompt — he assumed code
   could dedupe, counts came back fragmented, so he added one line and Claude rewrote the
   harness with a clustering agent in front of the scorer.*
3. **Score** — *in code, no model*: rank each canonical opportunity by
   `frequency × importance × (5 − satisfaction)`.
4. **Generate and triage** — for top opportunities, an agent proposes several solutions;
   a *separate judge* ranks each by ROI (impact vs build effort) and keeps the top 3.
   ROI re-orders the list, so a cheap high-impact need can take a build slot from a
   higher-scored one.
5. **Build** — for the top 3 by ROI, an agent uses the `frontend-design` skill to write a
   distinctive, clickable static HTML prototype.
6. **Inspect and rerun** — a smoke check flags any prototype that fails to render or any
   low-confidence extraction, and reruns *just that stage*. This is the real loop: the
   output of one stage decides whether an earlier stage runs again.

**Measured run:** 113 agents, **1.95M tokens, 12.5 min, 3/3 prototypes built and
verified.** 622 raw opportunities clustered to 11 needs. The JavaScript that routed,
scored, gated, and looped spent **zero model tokens.** *(Note: run was on synthetic
interviews with a blind ground-truth answer key; "verified" = rendered as valid HTML.)*

---

## 5. How to build, ship, and run one

### 5.1 The build prompt (you describe the pipeline; Claude writes the harness)
You don't write the harness. You describe stages in plain language and **ask to see the
harness before it runs.** The 1–5 scores you'd otherwise hardcode are defined in plain
language in the prompt, so the extraction agents know what to return and Claude writes
the schema + scoring code from it. *The prompt is the whole interface.*

The one question to ask of the harness Claude writes: **"Where do the tokens go, and
where is work thrown away?"** — i.e. expensive reasoning only on bounded judgment stages,
cheap models where work is rote, free code for the glue, one object returned per stage.

### 5.2 Ship it as a skill
Save the workflow (`s`), then in plain chat: *"Make this a product-discovery skill inside
this project, with the workflow saved inside as a template, not a fixed script."* Claude
writes the skill and wires it up. The loop becomes a `/product-discovery` the whole team
runs. **Keep it a template, not a script to replay verbatim** — a frozen workflow stops
being dynamic.

### 5.3 Make it a standing job
Three pieces turn a one-off into a standing process:
- **A schedule (routine)** re-runs the saved skill on a cadence without retyping.
  (`/loop` iterates *inside* one run until a stop condition; a *schedule* makes the job
  *recur* on its own.)
- **`/goal`** sets a completion bar the model can't talk itself out of (the laziness fix,
  as a command) — "review all 50" means 50.
- **A budget** caps spend ("use 10k tokens", or a few million for a big run). For anything
  recurring, this is the line between a habit and a surprise bill.

### 5.4 Contain it — the guardrail is the toolset, not a prompt
A workflow **runs unattended and does not stop to ask.** In the author's probe, agents
wrote files and ran shell commands with **no approval prompt firing.** The only real
guardrail is the toolset you hand each agent — spawn investigators read-only.
**Warning:** "read-only" ≠ "can't touch the disk." A built-in read-only agent can still
carry a working shell, and a shell writes and deletes. Give investigators an explicit
*minimal tool list*, keep every mutating action in one narrow reviewable step, and
**check the allowlist instead of trusting the label.**

---

## 6. When a dynamic workflow is overkill

Workflows use far more tokens than a single agent. The most common over-use is reaching
for one when a subagent would do. **The test: does the job have stages where one output
decides the next?** If not, you don't need an operating procedure. Specifically, do NOT
use a workflow when:
- It's **one round of parallel judgment** (a single fan-out + merge — a subagent already
  does this; e.g. competitor teardown).
- It's a **one-off** (the harness costs more than the task).
- **The judgment isn't defined yet** (no nameable rubric → a fleet just makes more
  unverified output, faster).
- **A single prompt is enough** (small, obvious, narrow).

---

## 7. The lesson

A subagent is a fresh-context worker returning one clean result. A dynamic workflow is
Claude writing the harness to run a *fleet* of them, with routing moved somewhere it
costs nothing. That's why a workflow finishes the job a lone agent abandons at 70%,
judges work it didn't produce, and holds a constraint a long session would lose. *"The
next time you want Claude to review 100 things, don't just ask it to try harder. Give it
the goal. Let it write the harness. Let the agents do the judgment. Let the loop decide
when the job is done."*

---

## 8. Resources (kept; non-media)

- **Experiment repo** (synthetic interviews, harness, prompts):
  `https://github.com/phuryn/dynamic-workflows-experiment`
- **Source for the failure-mode framing and pattern names:** Thariq Shihipar &
  Sid Bidasaria, "A harness for every task: dynamic workflows in Claude Code"
  (`claude.com/blog`). The firsthand tests and PM translation are the author's.
- **Try it:** type `ultracode` in a Claude Code prompt, or ask Claude to use a workflow.
