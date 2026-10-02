---
name: design-system-first
description: Lock design tokens and a taste reference before generating UI screens; check a reference library's stack before reusing it.
---

> **Running in Codex (added for this repo).** This skill was written for Claude. Read "Claude", "Claude Code", "Project knowledge", "Drive via MCP", "tracker via MCP" and "subagents" as: Codex, this repo's markdown files (see AGENTS.md and $repo-build-system), and sequential passes. Never make product decisions from inside this skill: decisions live in DECISIONS.md. If one is missing, stop and ask Ganesh.


# Design System First

The AI is not the design bottleneck. The missing step is almost always a human
taste-lock before generation starts, and a compatibility check before adopting
someone else's component library as build context. Run these gates in order,
and do not skip a gate to save time, each one is there because skipping it is
exactly how this kind of build quietly fails.

## Gate 0, reference-repo compatibility (do this first, it's an afternoon)

If the user names a reference design system (Synth, or any other open-source
library):
- Confirm the target app's actual stack (native Android/Compose, Flutter,
  React Native, SwiftUI, web).
- If the reference repo's stack matches: it can be submoduled as literal build
  context, Claude can reference real component implementation, not just
  screenshots.
- If it does not match: treat the reference repo as a visual and structural
  reference only. Extract tokens (color, type scale, spacing, motion timing)
  and component logic by inspection, do not submodule it as a dependency, and
  say so plainly to the user rather than proceeding as if it were compatible.

## Gate 1, the taste-lock (compressed, never skipped)

Someone with real judgment, a professional designer, a domain expert, or a
fast proxy, has to decide what's good before anything gets locked. If the user
has no design/content team:
- Generate 3 to 5 variants of the highest-stakes screens using any AI design
  tool.
- Get reactions from 5 to 10 people who actually match the target user, not
  the builder's own taste, as the stop signal.
- Do not let this step take zero time. If the user proposes skipping straight
  from "reference repo" to "generate all screens," flag that this is the step
  the whole method depends on.

## Gate 2, build the minimal system as ground truth

Once locked: create a small, versioned repo of tokens and true primitives
(button, card, input, chip, and whatever else the taste-lock actually
validated). This repo, not the original reference library, is what every
subsequent Claude Code session should build against.

## Gate 3, a regression net before any "rebuild on new commit"

Before wiring up a workflow where a design-system change triggers an app-wide
rebuild:
- Establish a short list of screens (5 to 6) to be checked after every
  design-system commit, or a basic visual-diff step.
- Do not enable "rebuild the whole app from the new commit" as a default
  action without this net in place.

## Gate 4, match the reference's design language to this product's actual needs

Name what the reference system's polish is actually in service of (for CRED,
financial trust: transaction clarity, security cues, dense data done
cleanly), and name what this product's polish needs to be in service of
instead (for a habit app: streak feedback, reward-reveal moments, progress
hierarchy). Borrow rigor and restraint. Do not assume literal interaction
patterns transfer between different product categories just because the
visual bar is the same.

## When advising on someone else's proposed method

If the user is evaluating someone else's design-system workflow (a colleague,
a forum post, a case study): check it against these same four gates before
adopting it wholesale. A single successful case study is not proof the method
transfers, especially across different product categories or team resourcing
levels than the one it was demonstrated in.
