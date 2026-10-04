# Current state (overwritten each milestone, owned by Codex)

Last updated: 2026-10-04 by Codex (M0 setup)

## Built
- Repo memory system: AGENTS.md, IDEA_SCOPE.md, DECISIONS.md, MILESTONES.md, STATE.md, SCRATCHPAD.md, docs/
- Codex skills in .agents/skills/
- M0 local files: Next.js, Tailwind, Convex function stub, environment template, Direction A tokens, fonts and copy constants.

## In flight
- M0 ACTIVE; blocked until Ganesh signs in to Convex so its generated files can be created and the Convex query check can run.
- T1 validation test running (Ganesh).

## Not started
- M0 to M4

## Known bugs
- `npm run build` cannot finish before Convex initialization because `convex/_generated/server` does not exist yet. This is expected until `npx convex dev` completes its one-time login and setup.

## Assumptions in force
- Web first, phone-first layout
- Prototype quality is fine for M0 to M2; production polish only after real users try it

## Next single action
Ganesh completes the Convex login when Codex runs `npx convex dev`; Codex then reruns the M0 checks. Ganesh runs T1 (DM test) in parallel.
