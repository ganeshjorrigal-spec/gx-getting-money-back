# PRD: Tickback v1 (working name)

Owner: Claude HQ. Status: **DRAFT v1, 4 Oct 2026.** Ganesh reviews; ChatGPT Pro red-teams; HQ fixes; then Ganesh marks it ACCEPTED in `DECISIONS.md`.
Codex reads this folder and never edits it. Proposals go in the daily log under "For HQ".

---

## In one paragraph

Tickback is a mobile web agent for people in India whose event-ticket refund is stuck or unclear. You paste what the organiser told you, or a screenshot. In under a minute it tells you which refund route you are on, the date your money should land and why, and the one thing to do next. When you need to write to someone, it drafts the message and opens your own email, ready to send. It keeps the case, the proof and the dates at one private link, puts the check-in on your calendar, and when the date comes it moves you to the next step until the money lands.

## The bet

The pain is not sending one message. It is the days of not knowing what to do, what to keep and when to chase. ChatGPT can write a message. It cannot remember the case, know the route, compute the date, or come back on day 7. The agent decides; the user's thumbs send.

## Scope

**In v1:** event tickets bought online in India (concerts, comedy, cricket, festivals) on BookMyShow, District, or an organiser's own site. Cases: cancelled, postponed, venue changed, payment failed but money debited, "refunded" but not received, and "I can't attend" (an honest answer).

**Not in v1:**
- Flights (next), EPF and government forms (v2).
- Swiggy, Zomato and Rapido.
- Chargebacks, legal notices, consumer court and voice calls.
- Logging in on the user's behalf, or sending email from our own domain.
- WhatsApp as an interface (the share sheet only).

---

## Decisions this PRD stands on (in `DECISIONS.md`)

| ID | Decision |
|---|---|
| D-006 | Stack: Next.js + Convex |
| D-009 | Pricing to test: free under ₹300; ₹49 with a guarantee for ₹300 and above |
| D-010 | v1 = event-ticket refunds only; flights next; EPF v2 |
| D-011 | The agent prepares; the user's own email or chat sends. Nothing is sent from our domain |
| D-012 | Web is the real v1 interface. Reminders by calendar now, email after the domain is verified. No WhatsApp interface in v1 |
| D-016 | AI provider: Gemini API (replaces D-013); model set by env var |
| D-014 | Ganesh asked Claude HQ to write the JTBD, user stories and user flows (4 Oct) |

## Defaults this PRD proposes (Ganesh confirms or changes each)

| ID | Proposal | Why |
|---|---|---|
| P-1 | No accounts in v1. A case lives at a private link (secret in the URL fragment), remembered on the device | No sign-up before value; email login needs a domain anyway |
| P-2 | Guarantee becomes "if your refund doesn't land, ₹49 back" instead of 14 days | Refunds often take 10+ working days; a 14-day window would trigger before most land |
| P-3 | Payment in the sprint by UPI link to Ganesh's UPI ID; "I've paid" unlocks at once; Ganesh reconciles daily | No payment gateway setup in time; ₹49 abuse risk is small |
| P-4 | Build on Vercel Hobby; move to Vercel Pro (USD 20 a month) before the first paid case | Hobby forbids commercial use |
| P-5 | Name: Tickback. As of 4 Oct, `gettickback.com` and `tickback.co` were available (`tickback.app` was not). Check `.in` at an Indian registrar | Tickets now (events) and next (flights); short; says the outcome |
| P-6 | Design Direction A (Calm Ledger) is the build default until the taste-lock picks one by Mon 5 Oct, 12:00 | Building can't wait; tokens make switching a one-file change |
| P-7 | Current stable Gemini Flash model, chosen at build time, with a Flash fallback; lowest thinking setting; paid tier before real users | Fast, takes images, structured output; well under ₹1 per case; the paid tier keeps user content out of Google's product improvement |

Other names checked and available on 4 Oct: `chasekar.app`, `haqdaar.app`, `paisaphir.com`, `lautao.app`. Not available: `dueback.app`, `getdueback.com`.

---

## Files

| File | What's in it |
|---|---|
| `01-product.md` | Problem, evidence, user, JTBD, forces, Delta 4, agent vs workflow, routes, ladder, user stories, flows, onboarding, value, communication, pricing, metrics, guardrails, risks |
| `02-design.md` | What the design serves, UD's taste rules, principles, three directions, taste-lock protocol, tokens, components, states, accessibility, regression net |
| `03-frontend.md` | Site map, case link format, screen-by-screen specs, UX rules, exact device behaviours (mailto, calendar, UPI, share, redaction, screenshots), performance budgets |
| `04-copy.md` | Every string on screen, in calendar events and in drafts; voice rules; draft skeletons |
| `05-backend.md` | Architecture, harness, schema, functions, agent pipeline, prompts, validators, `planCase()`, scheduler, reliability, memory, security, cost, testing, env vars, daily ops |
| `06-routes-kb.md` | Platforms, rules, contacts with confidence labels; seed JSON; Ganesh's manual BookMyShow check |
| `07-build-plan.md` | Build order, day plan, eval fixtures, phone tests, launch checklist, build risks |
| `08-red-team-changes.md` | Accepted changes from the independent review (5 Oct). Wins over 01 to 07 where they differ |
| `09-gmail-tracking.md` | Gmail reply tracking and calendar alerts (D-021). Wins over 01 to 08 where they differ |

## How Codex should read this

1. Read this README, then only the files the current milestone needs. The map is in `07-build-plan.md` section 1.
2. When the PRD and the code disagree, the PRD wins. Raise it in the daily log under "For HQ".
3. When the PRD is silent on a product question, stop and ask Ganesh. Don't decide it.

## What changed from the earlier plan

Swiggy, Zomato and Rapido are out (D-010). The agent no longer sends from our domain (D-011). WhatsApp reminders became calendar check-ins now and email later (D-012). M1 to M4 are rewritten in `MILESTONES.md` to match this PRD.
