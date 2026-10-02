# Open Items Tracker — Schema
**Core rule (the ratchet):** items exit only as **done** or **explicitly-cut with a reason**.
An item unmentioned in a session is flagged for confirmation, never silently closed.

## Field schema (set up in Linear / Asana / monday / sheet)
| Field | Type | Values / notes |
|---|---|---|
| ID | auto | referenced in decision-log & changelog |
| Title | text | one line, actionable. Bad: "Fix metrics". Good: "Connect [X] column to [source] data" |
| Type | select | build-item · design-question · data-question · stakeholder-input · blocked |
| Status | select | open · in-progress · done · explicitly-cut |
| Cut-reason | text | **required** when explicitly-cut |
| Priority | select | high (blocks current version) · medium (next version) · low |
| Source | link | call/review that surfaced it → cold-archive file |
| Version-opened | text | v[N] |
| Version-closed | text | v[N] |
| Owner | select | [project people] |
| Notes | text | constraints, dependencies, partial progress |

## Views
- **Active sprint**: status open/in-progress, sort priority desc
- **Ratchet check**: status open, sort version-opened asc (oldest unresolved first)
- **Cut log**: status explicitly-cut — answers "why did we drop X?"
- **Full history**: everything

## Seeding (first-time)
1. Read the most recent build session(s)
2. Extract every open / planned / "to do" item
3. Enter with best-recall status; uncertain → open + "unconfirmed — verify next review"
4. Known deliberate drops → explicitly-cut with reason
Aim for an accurate picture of NOW, not full historical coverage.
