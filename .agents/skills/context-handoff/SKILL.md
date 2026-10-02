---
name: context-handoff
description: Write a handoff file into docs/handoff/ when a Codex chat nears 50% context or the work moves to a new chat.
---

> **Running in Codex (added for this repo).** Do not produce a pasteable block or an upload manifest. Instead: (1) update STATE.md and append to today's docs/log/ file, (2) write the handoff to docs/handoff/YYYY-MM-DD-HHMM.md using the structure below, listing repo file paths in place of uploads, (3) commit and push, (4) give Ganesh a one-line resume prompt that names the handoff file. Every artifact is already in the repo, so "pass-through" means "path to read first".


# Context Handoff Skill

You are generating a **Context Handoff Package** — a portable, high-signal document the user can paste at the start of a new chat to resume their project seamlessly, with no loss in response quality and minimal token cost.

This skill handles two conversation types differently:

- **Text-only chats** (strategy, analysis, writing): Standard handoff with prose summaries.
- **Artifact-producing chats** (dashboards, code builds, design systems, documents): Extended handoff with an explicit artifact manifest. The manifest tells the user exactly what to download and re-upload, and tells the new chat exactly how to treat each file.

---

## When to trigger proactively

Every response in a long conversation re-processes the entire conversation history as input tokens. A new chat with a compact handoff processes only the handoff tokens — so the crossover where "new chat is cheaper" happens earlier than it feels.

Claude cannot read its own token count directly. Use these observable proxies instead:

**Tier 1 — Suggest once, at the end of a response:**
- 20+ turns AND no large artifacts produced
- 12+ turns AND 2+ large artifacts produced (code files >200 lines, detailed documents >4 pages)
- 3+ distinct work phases completed (e.g. research → wireframe → build, or plan → execute → revise)

**Tier 2 — Recommend directly:**
- 30+ turns regardless of artifact count
- 15+ turns AND 3+ large artifacts produced
- Any turn where iteration language appears ("v3", "rebuild", "redo", "updated version") AND 2+ artifacts already exist — the conversation is accumulating version history that will never be needed again

**Dead weight rule — recommend immediately regardless of turn count:**
- If the conversation contains superseded versions of the same artifact (v1 + v2 + v3 of the same file), the context is re-processing discarded work on every response. Recommend a handoff as soon as this is observed.

Suggest only at the END of a response, after the deliverable is complete. Never interrupt mid-request. Do this once — if the user declines or ignores it, do not raise it again.

> "This conversation has accumulated significant context. A handoff now would reduce token overhead on every future response. Want me to generate one?"



---

## Step 1 — Identify active workstreams

Before writing anything, scan the conversation and identify all distinct workstreams. List them briefly:

> "I can see we've been working on: **[A]**, **[B]**, and **[C]**. Which should be included in the handoff — all of them, or just some?"

Wait for their answer before proceeding.

---

## Step 1.5 — Classify artifacts (skip if no artifacts were produced)

If the conversation produced any files — JSX components, React apps, markdown wireframes, protocol documents, Excel models, Word documents, PDFs, CSVs — run this classification before writing anything:

For each artifact, assign it to exactly one of three buckets:

### Bucket A: Pass-Through (upload as-is, do not summarise)
Criteria: The file IS the continued work. The new chat will build on it, iterate it, or reference it directly. Summarising it would lose precision and create a disconnect.

Examples:
- The most recent version of a JSX/React build (v3, not v1/v2)
- A living schema document that is actively being modified
- A data model or Excel file that feeds the build
- A protocol document that encodes decisions the new chat must not re-litigate

Rule: Only the current/final version is pass-through. Earlier versions (v1, v2 of the same artifact) are superseded.

### Bucket B: Reference (summarise key decisions into handoff prose, do not upload)
Criteria: The file was an intermediate output. Its decisions are captured in the handoff prose. Uploading it would add tokens without adding information the handoff doesn't already contain.

Examples:
- Earlier wireframe drafts whose decisions are already extracted
- Research notes whose findings are already embedded in the build
- Conversation summaries or planning documents that preceded the current artifact

### Bucket C: Superseded (discard entirely)
Criteria: The file has been replaced by a later version. Uploading it risks confusing the new chat.

Examples:
- v1 and v2 of a dashboard when v3 is the pass-through artifact
- Draft wireframes replaced by a final wireframe spec
- Interim data extracts replaced by a cleaner final extract

**State the classification explicitly before writing the handoff.** Format:

```
Artifact manifest (draft):
- TSS_Retention_Dashboard_v3.jsx → PASS-THROUGH (current build, must upload)
- TSS_HealthScorecard_Wireframe_Final.md → PASS-THROUGH (active spec, decisions not fully captured in prose)
- TSS_AllTabs_PreBuild_Protocol.md → REFERENCE (key corrections extracted into handoff prose)
- TSS_Retention_Dashboard_v1.jsx → SUPERSEDED
- TSS_Retention_Dashboard_v2.jsx → SUPERSEDED
```

Ask the user to confirm before proceeding: "Does this classification look right? Anything you want to change?"

---

## Step 2 — Generate the Handoff Package

Once workstreams and artifact classification are confirmed, produce the full package in two parts:

---

### PART 1: Context Block (pasteable into new chat)

````
```context-handoff
## 🧠 Context Handoff — [Project Name or Topic]

---

### How We Work Together
- **Your role:** [Claude's role — e.g. "technical co-builder and strategic thought partner"]
- **Tone & depth:** [e.g. "direct, no filler, show reasoning, call out wrong numbers explicitly"]
- **Working style:** [e.g. "wireframe first, protocol review, then build; three-technique pre-build protocol always runs before complex analytical tabs"]
- **Hard constraints:** [e.g. "no em dashes; no dark backgrounds unless asked; no ROAS as simple average of ratios"]

---

### Project Context

[Repeat this block for each included workstream]

#### Workstream: [Name]
**Goal:** [What we're trying to achieve]
**Status:** [Specific — what is complete, what is mid-flight, what is next]
**Key decisions made:**
- [Decision + rationale — concrete, not vague]
**Protocol corrections baked in (do not revert):**
- [Specific data integrity fixes, calculation corrections, callout removals]
**Constraints & ground rules:**
- [Technical, scope, preference constraints]
**Open threads:**
- [Unresolved questions, next steps, decisions still needed]

---

### Critical context that must not be lost
[Strategic insights, rejected approaches and why, non-obvious findings, things that took effort to discover]

---

### Uploaded artifacts — how to treat them
[Only present if pass-through artifacts exist]

The following files are being uploaded alongside this handoff. Instructions per file:

- **[filename.jsx]**: This is the current production build. Treat as ground truth. Do NOT regenerate from scratch. All iterations build on this file. Read it fully before suggesting any changes.
- **[filename.md]**: This is the active specification. Decisions in it supersede anything in the prose above where there is a conflict. Read it before making any design decisions.

Do not ask the user to re-explain what is in these files. They are self-contained. Confirm you have read them before responding.

---

### Resume prompt (send this as your first message in the new chat, AFTER uploading the artifacts listed below)
> [Specific, actionable first message. References the actual next step. Tells Claude which skills to load. Does NOT say "let's continue" generically.]
```
````

---

### PART 2: Artifact Upload Manifest (shown separately, below the context block)

After the context block, output this section as plain prose (not inside the fenced block):

---

**Before starting the new chat, download these files from this conversation:**

| File | Bucket | Upload instruction |
|---|---|---|
| [filename.jsx] | PASS-THROUGH | Upload alongside the context block. New Claude reads it before responding. |
| [filename.md] | PASS-THROUGH | Upload alongside the context block. |
| [filename.md] | REFERENCE | Do not upload. Its decisions are captured in the handoff prose. |
| [filename.jsx] | SUPERSEDED | Do not upload. Earlier version, replaced. |

**Upload order in new chat:**
1. Paste the context block as your first message
2. Upload pass-through files in the same message or immediately after
3. Then paste the resume prompt

---

## Quality rules

**Signal density over completeness.** The handoff is the distilled conversation, not a transcript. Every line earns its place.

**Concrete over vague.**
- Bad: "We discussed the architecture."
- Good: "We settled on weighted ROAS (sum revenue / sum spend = 3.53x). Simple average of individual ROAS values (7.86x) was identified as arithmetically incorrect and must not be used."

**Status must be specific.**
- Bad: "In progress."
- Good: "R1–R6 all complete. Open threads: journey card cap (5 vs 13 journeys), anomaly flag count default (2 vs 4), App Push dual-state production logic."

**Protocol corrections must be named, not implied.** If the chat corrected a wrong calculation, removed a misleading callout, or overrode a naive approach — name it explicitly in the handoff so the new chat does not reintroduce it.

**Pass-through artifacts replace prose, they do not duplicate it.** If a file is pass-through, the handoff should describe what it IS and how to use it — not reproduce its contents. "This is the v3 JSX build — read it before suggesting any changes" is correct. Pasting 691 lines of JSX into the handoff block is incorrect.

**Resume prompt must reference uploads.** If pass-through artifacts exist, the resume prompt must tell Claude "these files are uploaded" and what they are. A resume prompt that ignores uploads leaves the new chat confused about whether the files are ground truth or supplementary.

**Superseded versions must be explicitly named.** Don't just say "upload the latest version." Name the superseded files so the user knows not to upload them.

---

## Tone

Deliver the package in two clearly labelled parts: the context block, then the artifact manifest. After presenting both, say:

> "Copy the context block and paste it as your first message in the new chat. Upload the PASS-THROUGH files alongside it. Then send the resume prompt. The new chat will read the uploaded files before responding — it will not ask you to re-explain them."

If the conversation had no artifacts, deliver only the context block and note: "No files to upload for this handoff — the context block is self-contained."

---

## Chat type reference

| Chat type | Artifact treatment | Handoff size |
|---|---|---|
| Strategy / analysis / writing | No artifacts. Context block only. | Compact |
| Iterative document build (Word, PDF, slides) | Latest version pass-through. Earlier drafts superseded. | Context block + 1 upload |
| Dashboard / UI build (JSX, React) | Latest build pass-through. Active spec pass-through. Protocol docs reference (if decisions extracted). Earlier versions superseded. | Context block + 2-3 uploads |
| Multi-source research synthesis | Source documents reference (summarised). Output document pass-through if iteration continues. | Context block + 0-1 uploads |
| Data model / Excel build | Final Excel pass-through if further iteration needed. Reference data extracts superseded. | Context block + 1 upload |
