# Fan-Out Protocol

The fan-out is the write-back discipline that replaces the context handoff. It runs at the end
of every call, demo, review, or feedback session — in a fresh chat — and distributes the
session's output across all five layers. After a fan-out, the session's raw material is never
re-fed to Claude.

## When to run
- After every stakeholder discovery call
- After every review / demo where feedback was given
- After any personal review that changed direction or scope
- After any session where open items were added, resolved, or dropped

## Execution principle
Every step below is an **executed write via a connected MCP tool**, not content for the user to
copy. At the start of a fan-out, confirm the drive MCP (Google Drive / Box / OneDrive) and the
tracker MCP (Linear / Asana / monday) are available — load them if deferred. If one is missing,
produce that step's content for manual entry and name the connector to add. The only step that
is always manual is re-uploading current-spec to the Project (no MCP manages Project knowledge).

## Step 0 — Archive
**Write** the raw transcript/notes via the drive MCP to:
`/cold-archive/YYYY-MM-DD_[type]_[participants].md`
Types: discovery-call, review, demo, personal-review, brief-session (adapt to project).
Note the path — every warm note from this session links back to it.

## Step 1 — Extract warm notes
Read the transcript. Extract **every atomic insight**: constraints, mental models, metric or
term definitions, design rationale, unresolved questions. One claim per note, filed by topic
(not by call), using the schema in `warm-knowledge.md`. **Draft all notes for user review,
then on approval write each as its own file** via the drive MCP to its
`/warm-knowledge/[topic]/` folder.

Quality gate per note: Is this one claim? Is the filename slug retrievable as a concept?
Does it carry an explicit implication for the build?

## Step 2 — Update state
- **current-spec.md** — produce the fully overwritten file (built / in-flight / not-started /
  data-gaps / assumptions / next-single-action / sign-off table). This is the user's one
  manual step: **flag clearly that they must re-upload it to the Claude Project.**
- **decision-log.md** — fetch the file from the drive, **append** one entry per decision
  (decision, rationale, source, tracker items affected, supersedes), write it back via MCP.
- **changelog.md** — if a new version was produced, fetch from the drive, **append** the
  version entry, write it back via MCP.
  (decision-log and changelog live in the drive, not Project knowledge — append-heavy,
  read-rarely.)

## Step 3 — Reconcile the tracker (the ratchet check)
Via the tracker MCP, for every currently open item (read them from the tracker first):
- Resolved this session → set **done**, record version-closed
- Consciously dropped → set **explicitly-cut**, cut-reason mandatory
- New loop opened this session → **create** the item with source link
- **Open but not mentioned this session → FLAG IT** (do not change its status yet)

Output format (after performing the writes):

```
Tracker reconciliation (written to [tool]):
✅ [N] closed: [titles]
✂️ [N] cut: [titles + reasons]
➕ [N] added: [titles]
⚠️ [N] open items NOT mentioned this session — confirm still active or cut:
   - [ID]: [title]
```

The ⚠️ list makes drops visible instead of silent. The user must resolve every flag before the
session counts as processed; apply their decisions back to the tracker via MCP.

## Step 4 — Fan-out summary
```
Fan-out complete — [session] [date]
Cold archive: written → [path]
Warm notes: [N] written → [folders]
decision-log: [N] appended (drive)   changelog: [yes/no — version] (drive)
Tracker ([tool]): [N] closed, [N] added, [N] cut
⚠️ Flags pending your decision: [N]
👉 Manual step remaining: re-upload current-spec.md to the Project
```

## Ready-to-paste user prompt
```
Run fan-out for [type] with [participants] on [date] (iterative-build-system skill).
Transcript: [paste]
Write directly to Drive and update the tracker. Tell me what to re-upload.
```

## Health-check variant (Mode E)
When auditing for drift without a new session: load charter + current spec, list all open
tracker items sorted oldest-first, and ask for each stale item (open > 2 cycles): is this
still real? Compare spec against the user's description of actual current state; log any
divergence as either a spec correction or an unlogged decision.
