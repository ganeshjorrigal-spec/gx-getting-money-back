# Decisions (append-only, owned by Claude HQ)

Format: ID | date | decision | why | status (ACTIVE / SUPERSEDED by D-x)

## Made
- D-001 | 2026-10-02 | Idea locked as in IDEA_SCOPE.md: an agent that gets people money back from everyday apps and subscriptions. | Lived it twice (Rapido, Swiggy) plus five research conversations; passes the sprint kill rules when scoped to persistence. | ACTIVE
- D-002 | 2026-10-02 | v1 scope: platform refunds, overcharges and charges after cancelling. Out of v1: legal notices, bank chargebacks, insurance, voice calls, anything needing company-confidential data. | Two-week sprint, no licence, no legal exposure. | ACTIVE
- D-003 | 2026-10-02 | The agent drafts, the user sends. No inbox connection on day one; onboarding starts from two screenshots. | Trust: a new app sending email as the user is the biggest fear. | ACTIVE
- D-004 | 2026-10-03 | Build memory lives in this GitHub repo as markdown. Claude HQ thinks and decides; Codex builds. No Supabase or Notion for build memory. | One store both AIs read natively, with history; matches the sprint guidance. | ACTIVE
- D-005 | 2026-10-03 | Ganesh's global Codex AGENTS.md is not touched. The repo AGENTS.md only adds project rules and defers to the global file on conflict. | The global file holds his GrowthX-guided preferences and guardrails. | ACTIVE

- D-006 | 2026-10-03 | Stack: web (Next.js) + Convex. Convex is already connected to Ganesh's GitHub account. Keys only in .env. | Sprint guidance recommends it; logic and database in one; works well with coding agents. | ACTIVE

## Open (needs Ganesh)
- Q-001 | RESOLVED by D-006
- Q-002 | Interface for v1: web app only, or WhatsApp as the main channel?
- Q-003 | Pricing to test: flat fee per case (Rs 29 to 99) vs monthly plan vs success fee. Waiting on DM test results.
- Q-004 | Which platforms first: Swiggy, Zomato, Rapido, Uber, Blinkit, subscriptions? Pick 2 to 3 for v1 playbooks.
