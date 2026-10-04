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

- D-010 | 2026-10-04 | v1 case re-locked: event-ticket refunds only. Flights are next, EPF and other government forms are v2. Swiggy, Zomato and Rapido leave v1 scope, the landing page and the hero example; they stay as the origin story only. The product's core line: when a refund is straightforward the agent says so and sets a check date; when it is not, the agent works out which route it is on (automatic, form, proof needed, credit only) and takes the next step. | UD said the Swiggy and Rapido cases are too small and those apps already have a process. Shaktimaan re-locked on events after Ganesh gave the Shiva evidence (Rs 2,400, 20 days). Evidence is one interview and was gathered with a leading question; test it in T1 before payment work. Reversible: the case engine is the same for flights. | ACTIVE
- D-001 | 2026-10-04 | SUPERSEDED by D-010 (idea scope narrowed to event-ticket refunds).
- D-002 | 2026-10-04 | SUPERSEDED in part by D-010 (platform refunds and post-cancellation charges are out of v1; the exclusions for legal notices, chargebacks, insurance, voice and confidential data still apply).
- D-007 | 2026-10-04 | SUPERSEDED by D-010 (platform order replaced by event-ticket refunds first).

## Open (needs Ganesh)
- Q-001 | RESOLVED by D-006
- Q-002 | RESOLVED by D-008
- Q-003 | RESOLVED by D-009 (test result pending)
- Q-004 | RESOLVED by D-007
- Q-005 | 2026-10-04 | OPEN. Should the agent send the first email itself after one tap from the user (Shaktimaan's proposal), replacing D-003 (the agent drafts, the user sends)? HQ recommendation: yes, narrowly. Send from a per-case address with the user copied, after explicit approval; no access to the user's inbox. Where the only route is a chat or a form, the agent still drafts and the user pastes. Build blockers to settle: a verified sending domain, and whether organisers accept an email from a case address instead of the registered one. D-003 stays ACTIVE until Ganesh decides.
- Q-006 | 2026-10-04 | OPEN. T1 wording changes to ask about live or recent ticket refunds (last 60 days), the route they tried (chat, email, form), and what they would pay as an open price, not an anchored Rs 49. D-009 amounts are a starting hypothesis only.
