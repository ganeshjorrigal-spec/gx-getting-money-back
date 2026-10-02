# The right mental model for the problem you're stuck on, not a pile of frameworks

**Cognitive Stack: Chat edition.**

The everyone edition. Works anywhere you can talk to Claude — **claude.ai or Claude
Code** — with **zero setup**. Takes a problem you're stuck on, works out what *kind*
of thinking it needs, picks the right models from a curated 561-model library, runs
them as a recipe, and produces a five-part answer — ending with the next move
delivered **right there in the conversation**.

In **claude.ai**, the five parts arrive as **five separate artifacts** (their own
canvases), in order — Natural Answer, Cognitive Signature, Recipe Trace, Recipe
Answer, and the optional Your Next Move — rather than one combined document. Each run
uses a fresh turn number so earlier artifacts are never overwritten.

## Running it

Point Claude at this folder and ask a real question about something you're stuck on
— a decision, a diagnosis, a plateau. Claude reads `SKILL.md` and runs the router.

- **No setup, no Python, no data files to connect.** Everything is bundled.
- **Self-contained.** Copy this folder anywhere and it works — nothing lives
  outside it.

## What's inside

| Path | What it is |
|---|---|
| `SKILL.md` | The router and the five-artifact answer spec (each artifact its own canvas). Start here. |
| `references/library-index.md` | The scannable table of contents — select models here first, then open just the slice you need. |
| `references/catalogues/` | The 561 curated models, full records, split so you only ever read one small slice. |
| `references/decorrelation-subset.md` | The baked rival-worldview check (the Chat stand-in for the Code edition's live engine). |
| `references/` (rest) | Recipes, lenses, operations, cognitive-signature spec. Read lazily. |

## How this relates to the Claude Code edition

This edition is **derived** from the Claude Code edition's library — same models,
same recipes, same signature. The differences: no live retrieval (it reads a curated
index instead), no code execution, and a baked rival-worldview check instead of a
live one. For live retrieval over the full 2,375-model corpus and next-moves that act
on your real files, use the Claude Code edition in the sibling `…-build/` folder.
