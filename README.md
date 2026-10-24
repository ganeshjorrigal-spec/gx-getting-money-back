# gx-getting-money-back

An AI agent that gets people their money back from the apps and subscriptions they pay every day. Built solo for the GrowthX Build Sprint.

- What and why: `IDEA_SCOPE.md`
- Rules for the coding agent: `AGENTS.md`
- Where things stand: `STATE.md`, `MILESTONES.md`
- Decisions: `DECISIONS.md`
- Which skill to use when: `docs/SKILL-ROUTING.md`

## Test link

https://abundant-marten-136.convex.site is the public next-build test link (refundgenie-test Production); live deploys must never be run from this folder until HQ says reviews are over.

Build against refundgenie-test Development (tangible-lemur-692); publish its separate Production backend and site with `npm run deploy:test` only when authorised. Open Codex only in gx-getting-money-back-next during the freeze; the old folder is reference only.

<!-- deploy and deploy:web belong to the frozen live setup. Do not run either from this test folder. -->
