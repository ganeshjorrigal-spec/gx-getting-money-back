---
name: iterative-build-system
description: Claude-side version of the build memory system (Claude Projects, Drive, tracker). In this repo use $repo-build-system instead. Explicit use only.
---

> **Running in Codex (added for this repo).** This skill was written for Claude. Read "Claude", "Claude Code", "Project knowledge", "Drive via MCP", "tracker via MCP" and "subagents" as: Codex, this repo's markdown files (see AGENTS.md and $repo-build-system), and sequential passes. Never make product decisions from inside this skill: decisions live in DECISIONS.md. If one is missing, stop and ask Ganesh.


# Iterative Build System

A repeatable system of work for building complex artifacts with Claude across many sessions,
stakeholder feedback rounds, and build iterations — without goal drift, silently dropped scope,
lost reasoning, or token bleed from re-feeding context.

**Core principle: nothing valuable lives only in a context that compacts.** The chat is a
terminal — a read/write client against durable stores — never the system of record.

---

## The Problem This Solves

Long iterative projects run through chat fail in four predictable ways:

1. **Goal drift** — the spec lives inside chat context; every handoff/compaction is lossy
2. **Silent scope drops** — open items vanish in summarization; deliberate cuts and accidental
   losses become indistinguishable
3. **Lost richness** — stakeholder reasoning, constraints, and rationale from calls get
   re-derived from scratch each session
4. **Token bleed** — transcripts and files re-fed every chat to rebuild state that should have
   been extracted once

The cure is to decompose context **by information lifecycle** — different kinds of information
have different half-lives and therefore different homes — and to hold one discipline: every
session is reconciled back into the stores before it is considered done.

---

## The Five-Layer Architecture

| Layer | Contains | Lifecycle | Home |
|---|---|---|---|
| 1. Invariants | What is always true (domain context, org, process, schemas) | Stable; rarely changes | Claude Skills |
| 2a. Read-hot state | Charter, current spec | Read every session; written rarely | Claude Project knowledge files (auto-loaded) |
| 2b. Write-hot state | Decision log, changelog | Written every cycle; read rarely | Cloud drive (Claude writes via MCP) |
| 3. Open items | Every open loop, with explicit status | Ratchets: open → done or explicitly-cut | Tracker (Linear/Asana/monday) — Claude writes via MCP |
| 4. Warm knowledge | Distilled atomic insights from calls/reviews | Accumulates forever; queried by topic | Cloud drive, structured markdown — Claude writes via MCP |
| 5. Cold archive | Raw transcripts, verbatim feedback | Write-once, read-rarely | Cloud drive folder — Claude writes via MCP |

The chat is the **reasoning layer** — disposable, never authoritative.

### Why Layer 2 is split (storage placement rule)
A file can be **auto-loaded into every chat** (Project knowledge — but uploading is manual and
does not sync from a drive) OR the **authoritative store Claude writes to directly** (a drive
file via MCP — but it must be fetched, it doesn't auto-load). Not cleanly both. So place each
file by its read/write profile:
- **Read every session, written rarely → Project knowledge.** Charter (≈never changes) and
  current-spec (once per cycle). Worth the rare manual upload to get automatic loading.
- **Written every cycle, read rarely → cloud drive via MCP.** Decision log and changelog are
  append-heavy but consulted only on demand ("why did we decide X?"). Keep them where Claude
  can append directly with zero manual upload; fetch on the rare read.

This makes the only recurring manual step a single re-upload of current-spec after a version
change. Everything else Claude writes directly via MCP.
(Project-knowledge sync behavior can change — verify specifics at support.claude.com.)

Key lifecycle rules:
- **Raw → distilled is a one-time extraction.** A transcript is processed once into warm notes,
  archived, and never re-fed.
- **Warm knowledge is consulted by query, not by carrying.** Chats fetch the relevant slice
  ("what do we know about X?"), never the corpus.
- **Read-hot state is loaded fresh each session** from Project files — never carried as a summary.
- **The tracker is a ratchet.** Items leave only as done or explicitly-cut-with-reason. An item
  unmentioned in a session is flagged, not forgotten.
- **The fan-out executes real writes.** Claude does not hand back content to transcribe; it
  writes to the drive and the tracker via MCP. See the Tooling & Execution section.

---

## When This Skill Triggers, Determine the Mode

**Mode A — Kickoff:** The user is starting a new project. Run the Kickoff Protocol below.
**Mode B — Fan-out:** The user has a transcript/feedback session to process. Read
`references/fan-out-protocol.md` and run it.
**Mode C — Query/build session:** The user is mid-build and needs context loaded. Pull live
state from Project files, query warm knowledge by topic, pull relevant open tracker items.
**Mode D — Retrofit:** The user has an existing messy project (handoff chains, lost context).
Run Kickoff, then add the seeding steps in `references/setup-guide.md` § Retrofit.
**Mode E — Health check:** The user suspects drift or drops. Audit: does live state match
reality? Are there stale open items? Run the ratchet check from the fan-out protocol Step 3.

---

## Kickoff Protocol (Mode A)

Interview the user briefly — do not skip this; the system only works if instantiated
specifically. Gather:

1. **Project identity** — name, goal in one sentence, what "done" looks like
2. **Commissioner & stakeholders** — who asked for this, who reviews it, what each needs
3. **Constraints** — non-negotiables, security/data walls, deadlines, ownership boundaries
4. **Scope edges** — explicitly out-of-scope items (these prevent future drift)
5. **Feedback cadence** — how often reviews happen, who attends
6. **Tooling** — which tracker they use; where their cloud drive lives; whether a domain
   Skill already exists for Layer 1

Then generate the full instantiation:

1. **Charter** — from `assets/charter-template.md`. The fixed anchor: goal, stakeholders,
   constraints, definition of done, what-this-is-not. Rule: rewriting the charter is a
   decision, not an edit.
2. **Current spec** — from `assets/current-spec-template.md`. Overwritten each cycle. Includes
   built / in-flight / not-started / data-gaps / assumptions-in-force / next-single-action.
3. **Decision log** — from `assets/decision-log-template.md`. Append-only. Seed with any
   decisions already made.
4. **Changelog** — from `assets/changelog-template.md`. Append-only, one entry per version.
5. **Tracker schema + seed items** — from `assets/tracker-schema.md`. Generate seed items
   specific to this project from the kickoff interview.
6. **Drive folder structure** — cold-archive/ + warm-knowledge/ with project-appropriate
   topic subfolders (adapt the folder names to the domain; see `references/warm-knowledge.md`)
7. **Setup checklist** — the ordered to-do list from `references/setup-guide.md`

Deliver as files, then walk the user through one-time setup:
- Upload **charter** and **current-spec** to a new Claude Project (these auto-load each session)
- Create the **decision-log** and **changelog** in the cloud drive (Claude appends here via MCP)
- Set up the **tracker** in their connected tool and seed it
- Create the **Drive folder structure** (cold-archive/ + warm-knowledge/)
- Confirm which MCPs are connected (drive + tracker) so fan-outs can write directly

If the project's domain knowledge (org context, schemas, processes) doesn't yet exist as a
Skill and is stable enough to deserve one, recommend creating a Layer-1 domain skill —
that is a separate task (use skill-creator).

---

## Tooling & Execution (how the fan-out actually writes)

The fan-out does not hand the user content to transcribe. It **executes writes** through
connected MCP tools. Before running a fan-out, confirm the relevant tools are available
(search/load them if deferred); if a tool isn't connected, say so and fall back to producing
content for manual entry — but name the connector the user should add.

Per layer, at fan-out time:
- **Cold archive** → write the raw transcript as a file to the drive (Google Drive / Box /
  OneDrive MCP) at `/cold-archive/[name].md`.
- **Warm notes** → write each note as its own file to the correct `/warm-knowledge/[topic]/`
  folder via the drive MCP. Draft for the user's review first, then write the approved set.
- **Decision log + changelog** → fetch the current file from the drive, append the new
  entry/entries, write it back. (These live in the drive, not Project knowledge.)
- **Tracker** → create new items, set statuses (done / explicitly-cut with reason), and post
  the ⚠️ flagged items via the tracker MCP (Linear / Asana / monday).
- **Current spec** → produce the overwritten file for the user to **re-upload to the Project**.
  This is the one step Claude cannot do directly (no MCP manages Project knowledge); call it
  out explicitly at the end of every fan-out.

Always end a fan-out by listing what was written where, and the single manual action remaining
(re-upload current-spec). Never leave writes implied — confirm each executed tool call.

---

## The Fan-Out (Mode B) — the heart of the system

The fan-out **replaces the context handoff entirely**. It runs at the end of every call, demo,
review, or feedback session, in a fresh chat, and distributes the session's output across the
tiers. Full procedure with prompts and output formats: `references/fan-out-protocol.md`.

Summary of the four steps (each is an executed MCP write, not content to transcribe — see
Tooling & Execution above):
1. **Archive** — write the raw transcript to cold-archive in the drive (write once)
2. **Extract warm notes** — write each one-claim note as a file to its topic folder, linked
   back to source (schema in `references/warm-knowledge.md`)
3. **Update state** — produce the overwritten current-spec for the user to re-upload to the
   Project; append to decision-log and changelog directly in the drive
4. **Reconcile the tracker** — via MCP, close done items, cut dropped items with reasons, add
   new loops, and **flag every open item not mentioned this session** (the ratchet check)

A session is fully processed only when all flags are resolved, all MCP writes are confirmed,
and the user has re-uploaded current-spec.

---

## Operating Rules (hold these in every mode)

- Never produce a free-standing "context handoff" summary as the cross-chat mechanism.
  If asked for one, redirect to the fan-out: structured writes beat summaries.
- Never re-ingest a transcript that has already been fanned out; query its warm notes instead,
  and fetch the cold archive only if a note is insufficient.
- When starting any build session, load: charter + current spec (from Project), open tracker
  items in the relevant area, and warm notes on the relevant topics. Nothing else.
- Distinguish prototype state from production target in the spec — conflating them causes
  the "60% done forever" feeling.
- The discipline is the system. Any store works with the reconcile-every-cycle rule;
  none works without it. Remind the user of this when they skip fan-outs.
- Execute writes, don't dictate them. During a fan-out, write to the drive and tracker via MCP
  rather than handing back content to copy. Confirm each write. The sole exception is
  current-spec, which the user must re-upload to the Project — always name this step.

---

## Reference Files

- `references/fan-out-protocol.md` — full fan-out procedure, prompts, output formats. Read for
  Mode B and Mode E.
- `references/warm-knowledge.md` — note schema, filing principles, folder design, good/bad
  examples. Read whenever writing or querying warm notes.
- `references/setup-guide.md` — ordered setup checklist, retrofit procedure for existing
  projects, tracker setup detail. Read for Mode A and Mode D.

## Asset Templates (instantiate, don't copy verbatim)

- `assets/charter-template.md`
- `assets/current-spec-template.md`
- `assets/decision-log-template.md`
- `assets/changelog-template.md`
- `assets/tracker-schema.md`

Always fill templates with project-specific content gathered in the kickoff interview.
Generic placeholder-filled files defeat the purpose — the instantiation IS the value.
