# Setup Guide — New Projects & Retrofits

## New project setup (do once, in order)

1. **Kickoff interview** (in SKILL.md) — gather identity, stakeholders, constraints, scope
   edges, cadence, tooling. Do not generate generic templates; instantiate with real content.
2. **Confirm connectors** — check which drive MCP (Google Drive / Box / OneDrive) and which
   tracker MCP (Linear / Asana / monday) are connected. The fan-out writes through these. If
   none are connected, the system still works but writes become manual — flag this and name
   the connectors to add.
3. **Create the drive folder structure** — `/[project]/cold-archive/` and
   `/[project]/warm-knowledge/[topic-folders]/` (folder names adapted to domain)
4. **Place the live-state files by read/write profile:**
   - **charter** and **current-spec** → upload to a new **Claude Project** (auto-load each session)
   - **decision-log** and **changelog** → create in the **drive** (Claude appends via MCP)
5. **Set up the tracker** per `assets/tracker-schema.md` in the user's tool — prefer a
   tracker with a connected MCP so the fan-out can reconcile directly
6. **Seed the tracker** with every currently known open item
7. **Run the first fan-out** on the most recent session/material to seed warm knowledge
8. **Retire standalone handoffs** — all cross-chat continuity now flows through the stores

## Retrofit procedure (Mode D — existing project with handoff history)

The goal is an accurate picture of NOW, not a perfect reconstruction of the past.

1. Run the kickoff interview as normal; write the charter from what the project has become
   (note in the decision log if the goal evolved from the original brief)
2. **Spec audit**: have the user describe, or paste evidence of, what is actually built and
   working right now. Write current-spec from that — not from old handoffs, which carry the
   drift you're escaping
3. **Open-item excavation**: read the most recent 1–2 build chats (or handoff blocks) and
   extract every item that was open, planned, or "to do". Enter each in the tracker. Items of
   uncertain status: `open` + note "unconfirmed — verify next review"
4. **Drop audit**: ask the user to compare the original brief/goal against the current spec.
   Every gap becomes either a tracker item (still wanted) or an explicitly-cut entry (consciously
   dropped). This converts the vague "only 60% done" feeling into named items
5. **Archive what exists**: move any raw transcripts/notes the user still has into cold-archive
   with proper filenames; fan out the most valuable 1–2 (typically the original brief and the
   latest review) to seed warm knowledge
6. Do NOT try to fan out the entire history — diminishing returns. Seed from the brief + latest
   state; let the warm layer grow forward

## Tracker tool guidance
- If the user has Linear/Asana/monday connected via MCP, prefer it — Claude can read and
  reconcile directly
- If not, a structured sheet or a markdown file in the drive works — but warn that the
  ratchet check then depends entirely on the user pasting the open-item list into each fan-out
- The non-negotiable is the schema's two-exit rule: done or explicitly-cut-with-reason

## Storage guidance (web app, free tier)
- **Live state — read-hot (charter, current-spec)**: Claude Project knowledge files. Auto-load
  into every chat; the rare manual upload is worth it. current-spec is the one file re-uploaded
  per cycle.
- **Live state — write-hot (decision-log, changelog)**: cloud drive, so Claude can append via
  MCP every cycle with no manual upload; fetched only on the rare read. Do NOT put these in
  Project knowledge — you'd be re-uploading append-heavy files you almost never read in-session.
- **Warm + cold layers**: a cloud drive with structured markdown (e.g. Google Drive via MCP)
  is the zero-limit, maximally portable default. Notion works if the user prefers a UI but has
  block limits on free tier. Confluence works if the user has paid Atlassian.
- **Local PKM (Obsidian)**: only directly bridgeable via a local MCP server, which requires
  the Desktop app. On web, the workaround is vault-syncs-to-drive (Claude reads via Drive MCP;
  user holds write discipline). Verify current product specifics at support.claude.com rather
  than asserting from memory.

## The one irreducible manual step
No MCP manages Claude Project knowledge, so re-uploading **current-spec** after a version change
is manual. Everything else — cold archive, warm notes, decision-log, changelog, tracker — is an
MCP write Claude performs during the fan-out. Every fan-out should end by naming this single
remaining action.

## What success looks like after 2–3 cycles
- New chats start with a one-line task + queries, not pasted history
- No transcript is ever uploaded twice
- "Why did we decide X?" is answered from the decision log in seconds
- The gap to done is a list of named tracker items, not a percentage feeling
- Anything that disappeared from scope has a written cut-reason
