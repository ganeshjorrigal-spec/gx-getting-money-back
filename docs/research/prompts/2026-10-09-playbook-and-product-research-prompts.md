# Research prompts: flight and online-store playbooks, product thinking doc, verifier

Written by Claude HQ on 9 Oct 2026 after UD's steer (8 Oct): go where refunds get stuck (airlines, online stores), not big event platforms.

How to run them:
- Run prompts 1, 2 and 3 as separate research jobs (they can run in parallel).
- Run prompt 4 (the verifier) as a separate agent on each output from prompts 1 and 2. The verifier must not see the researcher's reasoning, only its output file.
- Save outputs to `docs/research/playbooks/` and `docs/prd/11-product-thinking.md`. Ganesh spot-checks the lines the verifier flags as load-bearing.

Shared context block (paste at the top of prompts 1 to 3):

```text
CONTEXT
Tickback is an AI agent, India only, that takes over a stuck consumer refund and stays on it until the money lands. The user pastes what the company told them (or a screenshot). Code, not the model, computes the refund route, the date the money is due and the next step, using a verified playbook stored as data. The agent writes every message; the user sends it from their own email or the company's chat (we never log in for the user, never handle passwords, OTPs or bank details). Replies are read through a case inbox copied on every email. The agent escalates in order: support, then the company's Grievance Officer, then the regulator or government channel, then the National Consumer Helpline.

A playbook is the agent's knowledge for one refund type: who owes the money, the rules and deadlines, what the user must have, the escalation ladder with contacts, and the common ways a refund gets stuck. Every rule must carry its source. A wrong deadline or a wrong address is worse than a blank one.

RULES FOR THIS RESEARCH
- Prefer primary sources: the regulator's own pages and circulars, gazette notifications, the company's own terms, refund policy, contact and grievance pages.
- For every factual claim give: the exact sentence quoted from the source, the URL, the page title, the date you read it, and a label:
  VERIFIED = quoted from an official or the company's own page;
  REPORTED = from news, blogs, aggregators or a secondary source;
  NOT FOUND = you looked and could not find it (say where you looked).
- Never fill a gap from memory. If a page will not open, say so and mark the item NOT FOUND.
- Keep "the rule" (what must happen) separate from "the practice" (what actually happens, from complaints and forums). Practice is always REPORTED.
- Note the date a rule took effect and whether it has been amended. Flag anything older than 2 years that may be superseded.
- Plain English. No em dashes.
```

---

## Prompt 1: Flight refund playbook (India)

```text
[paste CONTEXT block]

TASK
Build the flight refund playbook for Tickback, for tickets on Indian carriers and on travel sites selling to Indian users.

COVER
1. Who owes the refund
   - Booked directly with the airline vs through a travel site (MakeMyTrip, Goibibo, Cleartrip, EaseMyTrip, Yatra, ixigo). Which party holds the money and who the user should chase first; what the rules say about travel agents' refund timelines.
2. The scenarios, each with its rules and deadlines
   a. Airline cancelled the flight (with and without advance notice).
   b. Flight rescheduled or significantly delayed; passenger declines the new timing.
   c. Passenger cancelled (fare rules, cancellation charges, what is always refundable such as taxes, fees and statutory levies, and no-show cases).
   d. Denied boarding.
   e. Refund processed but not received in the bank (refund reference, card or UPI or net banking timelines).
   f. Airline offers a credit shell or voucher instead of cash: when the passenger can insist on cash, and what the rule says about consent.
   g. Free cancellation or change window after booking (any "look-in" option).
   h. Compensation and facilities on cancellation, delay and denied boarding (amounts, conditions, exceptions such as extraordinary circumstances).
3. The rule sources to find and quote
   - DGCA Civil Aviation Requirements on refund of airline tickets and on facilities and compensation to passengers (latest revision and date), and any DGCA or Ministry of Civil Aviation passenger charter.
   - Each airline's own refund and conditions of carriage pages: IndiGo, Air India (including the merged Vistara and Air India Express), SpiceJet, Akasa Air, and any other active Indian carrier.
4. Escalation ladder and contacts, per airline and per travel site
   - Customer support channels (web form, email, chat path, phone) from the company's own contact page.
   - Nodal or Grievance Officer: name if published, email, page URL.
   - AirSewa: what it accepts, how to file, expected response time, and how it routes to the airline.
   - National Consumer Helpline and the consumer commission (e-Daakhil) as later steps.
5. What the user must have: PNR, booking ID, payment method, dates, screenshots, emails. What the agent should ask for in each scenario.
6. How refunds get stuck (practice, REPORTED): common patterns from public complaints, for example airline and travel site blaming each other, voucher pushed instead of cash, refund "initiated" with no reference, partial refund with fees not explained. Give 3 to 5 example sources per pattern (news, forums, consumer complaint sites). Do not quote personal details; describe the pattern.
7. Dates the agent can compute: for each scenario, the date the money should arrive, what it is anchored to (cancellation date, refund request date, refund processed date) and whether days are calendar or working days.

OUTPUT (Markdown, saved as docs/research/playbooks/flights.md)
A. One-page summary: the 8 scenarios, who owes, the deadline, and the first step.
B. Rule table, one row per rule: id | scenario | rule in one plain sentence | deadline and anchor | exact quote | source URL | page title | date read | label.
C. Contacts table, one row per company and channel: company | channel | value | page URL | date read | label.
D. Escalation ladder per scenario, with the wait between steps and its source.
E. Stuck patterns (REPORTED), each with sources.
F. Open questions and NOT FOUND items, with where you looked.
G. Load-bearing lines: the 10 lines that would most hurt a user if wrong, for Ganesh to check by hand.
```

---

## Prompt 2: Online store refund playbook (India)

```text
[paste CONTEXT block]

TASK
Build the online store refund playbook for Tickback. Focus on small and mid-size D2C websites (often built on Shopify, WooCommerce and similar), where the process is unclear. Cover large marketplaces (Amazon, Flipkart, Myntra, Meesho, Nykaa) only as a contrast: how their process works and when a user needs help anyway.

COVER
1. The scenarios, each with its rules and deadlines
   a. Order cancelled (by seller or by user) and prepaid money not returned.
   b. Return accepted or picked up, refund not issued.
   c. Return pickup never happened or keeps failing.
   d. Wrong, damaged or fake product; seller refuses return.
   e. Cash on delivery orders: how refunds are paid (bank details, UPI, store credit) and the risks.
   f. Refund "processed" but not received (reference numbers such as ARN or UTR, card, UPI and wallet timelines).
   g. Payment debited, order never created (failed transaction).
   h. Store credit or coupon forced instead of a refund.
   i. Store unresponsive or website shut down.
2. The rule sources to find and quote
   - Consumer Protection (E-Commerce) Rules, 2020 and later amendments: Grievance Officer duties, acknowledgement and resolution timelines, what sellers must display (return, refund, exchange, warranty, grievance details), duties of marketplaces vs inventory sellers.
   - Consumer Protection Act, 2019 sections that matter here (unfair trade practice, deficiency in service).
   - Any CCPA guidance or advisories on refunds, dark patterns or forced store credit.
   - RBI rules on failed transaction turnaround times and customer compensation (we already hold these for failed payments; confirm and update), and any RBI rule on refunds to the original payment method.
   - National Consumer Helpline: how to file, the convergence programme with companies, expected timelines; e-Daakhil for consumer commission filing.
3. Finding the right contact on any store website (this drives the agent's live lookup)
   - Where Indian D2C sites usually publish support email, phone, Grievance Officer and policies (footer, "Contact us", "Refund policy", "Terms"). Common URL patterns, for example /policies/refund-policy, /pages/contact, /pages/terms.
   - How reliable each placement is, and what to do when no Grievance Officer is published (the rule says it must be).
   - How to identify the legal entity behind a store (company name in terms, invoice, GSTIN) and why that matters for escalation.
4. Payment-side routes the user can take themselves (document only; Tickback does not run chargebacks): bank or card dispute, UPI complaint routes, payment gateway support. Mark these clearly as user-led.
5. What the user must have: order ID, website, order and payment dates, amount, payment method, return or pickup proof, screenshots, emails. What the agent asks for in each scenario.
6. How refunds get stuck (practice, REPORTED): patterns from public complaints, with 3 to 5 example sources each. Do not quote personal details.
7. Dates the agent can compute: for each scenario, when the money should arrive, what it is anchored to, calendar or working days, and which come from law vs the store's own policy.

OUTPUT (Markdown, saved as docs/research/playbooks/online-stores.md)
A. One-page summary: the scenarios, who owes, the deadline, the first step.
B. Rule table: id | scenario | rule in one plain sentence | deadline and anchor | exact quote | source URL | page title | date read | label.
C. Live-lookup guide for store contacts: where to look, in what order, how to label what is found.
D. Escalation ladder per scenario with waits and sources.
E. Marketplace contrast table (Amazon, Flipkart, Myntra, Meesho, Nykaa): refund timeline, escalation path, Grievance Officer page, each with source.
F. Stuck patterns (REPORTED) with sources.
G. Open questions and NOT FOUND items.
H. Load-bearing lines: the 10 lines that would most hurt a user if wrong.
```

---

## Prompt 3: Product thinking doc (hypothesis doc)

```text
[paste CONTEXT block]

TASK
Write the research base for Tickback's product thinking doc, for two refund types: flight tickets and online store orders in India. This is a hypothesis doc. Research informs it; real user cases will confirm or overturn it. Label every claim with its evidence level.

COVER
1. Size and frequency of the pain
   - Published complaint data: DGCA monthly passenger complaint data (share about refunds), National Consumer Helpline reports by sector (airlines, e-commerce), CCPA or Ministry of Consumer Affairs releases. Quote numbers with source and period.
   - Notable recent episodes (mass cancellations, airline or travel-site refund disputes, regulator actions) in the last 24 months.
2. The user's journey today, step by step, for each refund type: trigger, first contact, where it stalls, how long, what people try (chat, email, X posts, NCH, consumer court), when they give up. Separate observed patterns (with sources) from inference.
3. Where an agent adds the most value, step by step: knowing the rule and deadline, finding the right contact, writing the message, remembering to chase, escalating in the right order, proving the claim. For each, say what evidence supports it.
4. Alternatives users have today: doing nothing, doing it themselves with ChatGPT, consumer complaint sites and services in India (for example Voxya, consumer forums, Jago Grahak Jago and NCH), travel-site or bank escalation, lawyers or consumer court, and any global refund or claims agents (for example AirHelp in Europe) and why they do or do not work in India. What each charges, with source.
5. Risks and limits: legal (acting on someone's behalf, advice vs information), data (what we must not collect), platform terms, where an agent could make things worse.
6. Hypotheses to test with the first real cases: list 8 to 12, each with what we would see if it is true, what would prove it wrong, and the smallest test. Include: which refund type users bring first, whether the escalation step is where value lands, whether users will send messages the agent writes, how often travel site vs airline is the right party.

OUTPUT (Markdown, saved as docs/prd/11-product-thinking.md)
1. Summary in 10 lines.
2. Evidence base, sections 1 to 5 above, every claim labelled VERIFIED, REPORTED or INFERENCE, with sources.
3. Hypotheses table: hypothesis | evidence so far | what would confirm | what would disprove | smallest test.
4. Sources list.
Keep it under 2,500 words.
```

---

## Prompt 4: Verifier (separate agent, run on each playbook file)

```text
ROLE
You are an independent verifier. You did not write the file below and you do not know how it was produced. Your only job is to check its sources. Do not add new facts, do not improve the wording, do not fill gaps.

INPUT
The file: <path to docs/research/playbooks/flights.md or online-stores.md>

FOR EVERY ROW in the rule table and the contacts table:
1. Open the source URL yourself.
2. Check the quote appears on that page word for word (minor spacing differences are fine).
3. Check the plain-sentence rule actually follows from the quote (no stretched meaning, no added numbers, correct scenario).
4. Check the label: VERIFIED only if the page is official or the company's own; otherwise it must be REPORTED.
5. Check the date or version of the rule on the page; flag if the page shows it was amended or superseded.

VERDICT per row:
CONFIRMED = quote found, rule follows, label right.
WEAKENED = quote found but the rule overstates it, or the label should be REPORTED. Say exactly what to change.
NOT ON PAGE = quote not found on the page.
PAGE UNAVAILABLE = could not open; say what you saw.
SUPERSEDED = a newer version exists; give its URL.

OUTPUT (Markdown, saved next to the file as <name>-verification.md)
A. Counts per verdict.
B. Table: row id | verdict | what you saw | change needed.
C. Load-bearing lines (from the file's own list) and their verdicts, at the top.
D. Rows that must be removed or relabelled before the playbook is used.
Be strict. When unsure, do not confirm.
```

---

## Note on X posts (complaints on airline and travel-site handles)

- X blocks automated reading for Claude's fetch tools, and scraping X at scale breaks X's terms. NotebookLM is also unlikely to ingest X post links reliably (they need a signed-in page).
- What works: open the posts in a signed-in browser (Claude in Chrome with Ganesh's X session, when connected), read each one, and record only the pattern, not the person: company, refund type, scenario, days waiting, what support said, channel tried, whether a travel site was involved, link. Store in `docs/research/user-evidence/x-complaints.md`.
- These rows are REPORTED practice evidence for section 6 of prompts 1 and 2, and for the hypotheses in prompt 3. They do not replace the rule sources.
