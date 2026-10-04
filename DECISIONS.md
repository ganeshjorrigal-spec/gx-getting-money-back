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

- D-011 | 2026-10-04 | Sending: the agent prepares every message; the user sends it from their own email (mailto opens pre-filled) or pastes it into the platform's chat. Nothing is sent from our domain. Supersedes D-003 (same principle, now explicit for events) and resolves Q-005. | Authentic and verifiable sender (the user), no sender-domain dependency, matches Ganesh's Round 2 design ("from the customer's own email"). Ganesh chose this on 4 Oct. | ACTIVE
- D-003 | 2026-10-04 | SUPERSEDED by D-011.
- D-012 | 2026-10-04 | Interface and reminders: mobile web is the real v1 interface, built and tested on phones (UD: test only where the interface lives). Check-in reminders by calendar now (Google Calendar link on Android, .ics on iPhone); email reminders after the domain is verified (v1.1, behind a flag). No WhatsApp interface in v1; the phone's share sheet is allowed. Supersedes the reminder part of D-008. | Ganesh chose "calendar now, email later" on 4 Oct. UD's tech map warns against building on web and moving to WhatsApp later. | ACTIVE
- D-008 | 2026-10-04 | SUPERSEDED in part by D-012 (reminders and WhatsApp); mobile-first web stands.
- D-013 | 2026-10-04 | AI provider: OpenAI API with Ganesh's own key, called through the Vercel AI SDK inside Convex actions. Model set by env var (proposed default gpt-6-luna, fallback gpt-5.4-mini, store false). | Ganesh has an OpenAI API key (ChatGPT Pro does not include API credits). | ACTIVE
- D-014 | 2026-10-04 | Process: Ganesh asked Claude HQ to write the JTBD, user stories and user flows in full for the PRD, replacing his earlier plan to write them by hand with HQ as reviewer. | Time; his call on 4 Oct. | ACTIVE
- D-015 | 2026-10-04 | PRD v1 written in docs/prd/ (DRAFT). It becomes the build spec once Ganesh accepts it; proposals P-1 to P-7 in docs/prd/README.md need his yes or change. | One spec for Codex across product, design and tech. | PROPOSED

- D-016 | 2026-10-04 | AI provider changed to the Gemini API (Ganesh's own key), via the Vercel AI SDK Google provider inside Convex actions. Model: current stable Gemini Flash chosen at build time, env-configured. Free tier for building; paid tier (billing on) before real users, because on the free tier Google may use content to improve its products. Supersedes D-013. | Ganesh chose Gemini on 4 Oct. | ACTIVE
- D-013 | 2026-10-04 | SUPERSEDED by D-016.

## Open (needs Ganesh)
- Q-001 | RESOLVED by D-006
- Q-002 | RESOLVED by D-008
- Q-003 | RESOLVED by D-009 (test result pending)
- Q-004 | RESOLVED by D-007
- Q-005 | 2026-10-04 | RESOLVED by D-011. Was: Should the agent send the first email itself after one tap from the user (Shaktimaan's proposal), replacing D-003 (the agent drafts, the user sends)? HQ recommendation: yes, narrowly. Send from a per-case address with the user copied, after explicit approval; no access to the user's inbox. Where the only route is a chat or a form, the agent still drafts and the user pastes. Build blockers to settle: a verified sending domain, and whether organisers accept an email from a case address instead of the registered one. D-003 stays ACTIVE until Ganesh decides.
- Q-006 | 2026-10-04 | OPEN. T1 wording changes to ask about live or recent ticket refunds (last 60 days), the route they tried (chat, email, form), and what they would pay as an open price, not an anchored Rs 49. D-009 amounts are a starting hypothesis only.
- Q-007 | 2026-10-04 | OPEN. PRD proposals P-1 to P-7 (docs/prd/README.md): no accounts, outcome guarantee, manual UPI, Vercel Pro before charging, name Tickback, design default A until the taste-lock, model choice.
