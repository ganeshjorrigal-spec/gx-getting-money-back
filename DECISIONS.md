# Decisions (append-only, owned by Claude HQ)

Format: ID | date | decision | why | status (ACTIVE / SUPERSEDED by D-x)

## Made
- D-001 | 2026-10-02 | Idea locked as in IDEA_SCOPE.md: an agent that gets people money back from everyday apps and subscriptions. | Lived it twice (Rapido, Swiggy) plus five research conversations; passes the sprint kill rules when scoped to persistence. | ACTIVE
- D-002 | 2026-10-02 | v1 scope: platform refunds, overcharges and charges after cancelling. Out of v1: legal notices, bank chargebacks, insurance, voice calls, anything needing company-confidential data. | Two-week sprint, no licence, no legal exposure. | ACTIVE
- D-003 | 2026-10-02 | The agent drafts, the user sends. No inbox connection on day one; onboarding starts from two screenshots. | Trust: a new app sending email as the user is the biggest fear. | ACTIVE
- D-004 | 2026-10-03 | Build memory lives in this GitHub repo as markdown. Claude HQ thinks and decides; Codex builds. No Supabase or Notion for build memory. | One store both AIs read natively, with history; matches the sprint guidance. | ACTIVE
- D-005 | 2026-10-03 | Ganesh's global Codex AGENTS.md is not touched. The repo AGENTS.md only adds project rules and defers to the global file on conflict. | The global file holds his GrowthX-guided preferences and guardrails. | ACTIVE

- D-006 | 2026-10-03 | Stack: web (Next.js) + Convex. Convex is already connected to Ganesh's GitHub account. Keys only in .env. | Sprint guidance recommends it; logic and database in one; works well with coding agents. | ACTIVE
- D-007 | 2026-10-03 | Platforms: user story 1 is Swiggy and Zomato (food and quick commerce); user story 2 is subscriptions charged after cancelling (from Tuesday); rides only if time allows. Other apps use the generic flow without a custom playbook. | Food gives fast, filmable wins and acquisition; subscriptions carry the bigger, slower cases where persistence and payment matter. Swap the order if DMs show food refunds are not a struggle. | ACTIVE
- D-008 | 2026-10-03 | Interface: mobile-first web app for v1. Reminders by email or a pre-filled WhatsApp link (wa.me), no WhatsApp Business API. WhatsApp bot only if week-1 users ask for it. | Shippable this weekend, native to Convex, cheap to reverse because case logic stays in Convex. | ACTIVE
- D-009 | 2026-10-03 | Pricing to test: free under Rs 300; Rs 49 upfront with a 14-day money-back guarantee for cases of Rs 300 and above; collected by UPI for the sprint. Test via DMs: pass if at least 3 of 10 have a live case and at least 2 with Rs 300+ cases pay by Day 5. If they have cases but will not pay upfront, switch to pay-after-success (Rs 29 to 99). If almost nobody has a live case, that is a named pivot reason. | Small refunds cannot carry a fee; upfront plus guarantee moves money inside the sprint while removing risk. | ACTIVE

## Open (needs Ganesh)
- Q-001 | RESOLVED by D-006
- Q-002 | RESOLVED by D-008
- Q-003 | RESOLVED by D-009 (test result pending)
- Q-004 | RESOLVED by D-007
