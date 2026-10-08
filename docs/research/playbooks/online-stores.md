# Online store refund playbook, India (v2, HQ rebuilt from official sources)

Status: rebuilt by Claude HQ on 9 Oct 2026 after the verifier failed the Gemini draft (`online-stores-gemini-raw.md`, `online-stores-gemini-raw-verification.md`). Every rule row quotes official text read on 9 Oct 2026; full text in `../sources/ecommerce-and-rbi-refund-rules.md`. Needs a fresh verifier pass and Ganesh's hand-check of section I before Codex uses it.

Labels: VERIFIED = official government or regulator text, read 9 Oct 2026. REPORTED = secondary source or public complaints. HQ DEFAULT = a product choice, not a rule; never cited as law. NOT FOUND = looked for, not found.

## A. One-page summary

The main lever is the **Consumer Protection (E-Commerce) Rules, 2020**. A D2C brand selling its own goods on its own website is an **inventory e-commerce entity**; the rules name single brand retailers explicitly (O01, O02). That brand must:
- show a grievance officer, who acknowledges a complaint in 48 hours and resolves it in one month (O03, O04);
- not refuse to take back goods or refund money when goods are defective, deficient, spurious, not as advertised, or delivered late (O09);
- pay accepted refunds within a reasonable period, or as RBI prescribes (O06);
- show accurate return and refund terms, and give a ticket number for each complaint (O07, O08).

RBI rules cover the money leg, with two limits the Gemini draft missed:
- The **T+5 days and Rs 100 a day** rule covers only **failed payments**: money debited, no order confirmation. It does not cover a store refunding a completed order (O11, O12).
- The **payment aggregator** (Razorpay, Cashfree, PayU and the like) must send refunds to the original payment method unless the payer asks otherwise (O14). This binds the aggregator, not the store.

Scenarios:
- **a. Order cancelled, prepaid money not back.** Customer cancelled: the store can charge a cancellation fee only if it also bears similar charges when it cancels orders itself (O05). Store cancelled: no specific rule found. Either way the refund falls under O06 (reasonable period; no fixed day count). Chase with the store's own refund promise.
- **b. Return accepted or picked up, refund not issued.** O06 plus the store's published refund terms (O07). If the goods were defective or not as advertised, O09 too.
- **c. Pickup never happened.** No rule found that requires reverse pickup. Chase with the store's published return terms (O07), and O09 if the goods were defective.
- **d. Wrong, damaged or fake product, return refused.** O09 directly. Strongest case.
- **e. Cash on delivery.** No specific rule found. O09 and O06 still apply. The agent never collects bank details (Level 1); the user gives them to the store directly.
- **f. Refund "processed" but not received.** Ask for the ARN or UTR. No regulator timeline found for this leg. Then the user's bank, then the RBI Integrated Ombudsman.
- **g1. Payment debited, confirmation never reached the store.** A failed transaction. Card on a website or UPI to a merchant: auto-reversal within T+5 calendar days, Rs 100 a day after that, paid without a claim (O11 to O13). Net banking is not in the RBI table. Wallet payments inside the same wallet: T+1 (row 8(b)).
- **g2. Store received the money but no order was created.** Not a failed transaction. Treat as an ordinary store refund under O06.
- **h. Store credit forced instead of a refund.** For defective, not-as-advertised or late goods, O09 bars refusing a refund. O14 only governs where a payment aggregator sends a refund once one is made; it does not stop a store offering store credit. No rule found that bans store credit for a simple change of mind.
- **i. Store unresponsive or site shut.** Grievance officer (O03, O04). If none is shown, that is itself a breach of O03. Then the National Consumer Helpline (O15), then consumer commission. Card chargeback through the user's bank is the payment-side route.

## B. Rule table

| id | scenario | rule in one plain sentence | deadline and anchor | exact quote | source | date read | label |
|---|---|---|---|---|---|---|---|
| O01 | all | The rules cover all online sales, including single brand retailers. | n/a | "all e-commerce retail, including multi-channel single brand retailers and single brand retailers in single or multiple formats" | E-Commerce Rules 2020, Rule 2(1)(c) | 9 Oct 2026 | VERIFIED |
| O02 | all | A brand selling its own stock directly is an inventory e-commerce entity. | n/a | "\"inventory e-commerce entity\" means an e-commerce entity which owns the inventory of goods or services and sells such goods or services directly to the consumers and shall include single brand retailers and multi-channel single brand retailers" | E-Commerce Rules 2020, Rule 3(1)(f) | 9 Oct 2026 | VERIFIED |
| O03 | i, all | Every online store must name a grievance officer and show their contact details on its site. | n/a | "shall appoint a grievance officer for consumer grievance redressal, and shall display the name, contact details, and designation of such officer on its platform." | E-Commerce Rules 2020, Rule 4(4) | 9 Oct 2026 | VERIFIED |
| O04 | all | The grievance officer must acknowledge a complaint within 48 hours and resolve it within one month. | Complaint received + 48 hours; + 1 month. | "acknowledges the receipt of any consumer complaint within forty-eight hours and redresses the complaint within one month from the date of receipt of the complaint." | E-Commerce Rules 2020, Rule 4(5) | 9 Oct 2026 | VERIFIED |
| O05 | a (customer cancelled) | A store cannot charge a customer who cancels after confirming, unless the store also bears similar charges when it cancels orders itself. It gives no right when the store cancels. | At cancellation. | "No e-commerce entity shall impose cancellation charges on consumers cancelling after confirming purchase unless similar charges are also borne by the e- commerce entity, if they cancel the purchase order unilaterally for any reason." | E-Commerce Rules 2020, Rule 4(8) | 9 Oct 2026 | VERIFIED |
| O06 | a, b, e, f | Accepted refunds must be paid within a reasonable period, or as RBI or another law prescribes. No fixed day count. | Refund accepted date; no fixed deadline. | "Every e-commerce entity shall effect all payments towards accepted refund requests of the consumers as prescribed by the Reserve Bank of India or any other competent authority under any law for the time being in force, within a reasonable period of time, or as prescribed under applicable laws." | E-Commerce Rules 2020, Rule 4(10) | 9 Oct 2026 | VERIFIED |
| O07 | b, c | A store selling its own stock must show accurate return, refund and grievance information. | n/a | "accurate information related to return, refund, exchange, warranty and guarantee, delivery and shipment, cost of return shipping, mode of payments, grievance redressal mechanism" | E-Commerce Rules 2020, Rule 7(1)(a) | 9 Oct 2026 | VERIFIED |
| O08 | all | It must give a ticket number for each complaint. | n/a | "a ticket number for each complaint lodged, through which the consumer can track the status of their complaint." | E-Commerce Rules 2020, Rule 7(1)(f) | 9 Oct 2026 | VERIFIED |
| O09 | b, d, h | A store selling its own stock cannot refuse a return or refund when goods are defective, deficient, spurious, not as advertised, or late (unless late due to force majeure). | n/a | "No inventory e-commerce entity shall refuse to take back goods, or withdraw or discontinue services purchased or agreed to be purchased, or refuse to refund consideration, if paid, if such goods or services are defective, deficient spurious, or if the goods or services are not of the characteristics or features as advertised or as agreed to, or if such goods or services are delivered late from the stated delivery schedule" | E-Commerce Rules 2020, Rule 7(4) | 9 Oct 2026 | VERIFIED |
| O10 | marketplace contrast | The same duty applies to sellers on marketplaces. | n/a | "No seller offering goods or services through a marketplace e-commerce entity shall refuse to take back goods, or withdraw or discontinue services purchased or agreed to be purchased, or refuse to refund consideration, if paid, if such goods or services are defective, deficient or spurious" | E-Commerce Rules 2020, Rule 6(3) | 9 Oct 2026 | VERIFIED |
| O11 | g1 | Card payment on a website debited but confirmation never reached the store's system: auto-reversal within T+5 days, Rs 100 a day after that. T is the calendar date. | Payment date + 5 calendar days. | "Auto-reversal within T + 5 days." / "₹ 100/- per day of delay beyond T + 5 days." | RBI DPSS.CO.PD No.629/02.01.014/2019-20, Annex table row 2(c), cells shared with 2(b) | 9 Oct 2026 | VERIFIED |
| O12 | g1 | UPI payment to a merchant debited but confirmation never reached the merchant: same T+5 days and Rs 100 a day. | Payment date + 5 calendar days. | "Auto-reversal within T + 5 days." / "₹100/- per day if delay is beyond T + 5 days." | Same circular, row 4(b) | 9 Oct 2026 | VERIFIED |
| O13 | g1 | That compensation is paid without a claim; if not, the customer can complain to the RBI Ombudsman. | After T+5. | "Wherever financial compensation is involved, the same shall be effected to the customer's account suo moto, without waiting for a complaint or claim from the customer." | Same circular, paras 5 and 6 | 9 Oct 2026 | VERIFIED |
| O14 | h, f | When a payment aggregator sends a refund, it must go to the original payment method unless the payer asks otherwise. Binds the aggregator, not the store; does not ban store credit. | n/a | "All refunds shall be made to the original method of payment, unless specifically instructed by the payer to credit the refund to an alternate mode belonging to the same payer." | RBI Master Direction on Payment Aggregators, 15 Sep 2025, para 10(f) | 9 Oct 2026 | VERIFIED |
| O15 | i | The National Consumer Helpline says a grievance may take up to 30 days. A description, not a duty on the company. | NCH registration + up to 30 days. | "It may take up to a maximum of 30 days to arrive at a logical conclusion." | consumerhelpline.gov.in/public/about | 9 Oct 2026 | VERIFIED |

Removed from the Gemini draft: T+5 working days for ordinary store refunds (the RBI rule covers failed payments only, and counts calendar days); the reversed cancellation-charge rule; the dark patterns "forced action" row (its definition does not cover store credit); the Consumer Protection Act 2(47) row (not needed, O09 is direct); all marketplace "T+5 working days" timelines (no source).

## C. Finding a store's contacts (live lookup)

D2C stores are too many to list. The agent looks them up per case:
1. Check the store's pages in this order: refund or return policy, contact page, terms of service, footer. On Shopify stores these are usually `/policies/refund-policy`, `/policies/terms-of-service`, `/pages/contact`.
2. Look for "Grievance Officer", "Nodal Officer", a support email, and the legal entity name.
3. Label each found contact with the page URL and date read. Only contacts seen on the store's own pages are filled in automatically (same rule as events, D-024 era).
4. If no grievance officer is shown, say so in the escalation: Rule 4(4) requires one (O03). Use the support email.
5. If nothing is found, ask the user to paste the address from their order email.

Marketplace grievance officers (Amazon, Flipkart, Myntra, Meesho, Nykaa): the Gemini rows failed verification. NOT FOUND until rechecked; marketplaces are contrast, not the first build.

## D. Escalation ladder

1. Store support, by email, with order ID and evidence. Cite O09 if goods were defective or not as advertised, otherwise the store's own refund terms (O07) and O06. Ask for a ticket number (O08). Wait: HQ DEFAULT 3 days, or the store's own promised date if later.
2. Grievance officer (O03). Must acknowledge within 48 hours and resolve within one month of receiving the complaint (O04). Check about 48 hours after sending for the acknowledgement.
3. National Consumer Helpline, 1915 or consumerhelpline.gov.in (O15). Up to 30 days.
4. Consumer commission through e-Daakhil. The agent prepares, the user files.

Payment side, in parallel or after: for scenario g1, the user's bank and then the RBI Ombudsman (O11 to O13). For f and i, the user's bank (chargeback or dispute). Chargeback windows: NOT FOUND, they vary by bank and card network.

## E. What the user must have

- Store name and website.
- Order ID and order date.
- Payment method and amount; for scenario g, the bank debit with date and UTR or reference.
- What happened: cancellation email, return request, pickup proof or failed pickup messages, delivery date versus promised date.
- Photos of a wrong, damaged or fake product, and the unboxing if they have it.
- The store's reply, if any, and any ticket number.

## F. How refunds get stuck (REPORTED, to fill from evidence)

Hypotheses only, kept from the Gemini draft, until real complaints are collected:
1. Store credit or wallet pushed instead of money.
2. "Refund initiated" with no money, then the ticket is closed.
3. Pickup marked "customer unavailable" and the return cancelled.
4. Return rejected at quality check.
5. Store says the gateway has the money; gateway says ask the store.

## G. Dates the agent can compute

- Grievance officer acknowledgement: complaint received + 48 hours (O04). The agent uses the send time as a stand-in and says "about".
- Grievance officer resolution: complaint received + 1 month (O04).
- Failed payment reversal (scenario g1 only, card on a website or UPI to a merchant only): payment date + 5 calendar days; Rs 100 a day after that (O11, O12). Do not compute this for net banking or other methods.
- NCH: registration + up to 30 days (O15), described as "may take", not a deadline.
- Everything else: the store's own promised date, read from its policy or emails, labelled as the store's promise.

## H. Open questions and NOT FOUND

1. **No fixed refund deadline** for ordinary store refunds: O06 says "reasonable period". The agent anchors on the store's own promise. Ganesh to decide the HQ DEFAULT for "unreasonable" (suggest: store's promise, or 7 days after return accepted if none).
2. **Reverse pickup duty:** NOT FOUND in law.
3. **Store credit on change of mind:** no rule found against it.
4. **Chargeback windows:** NOT FOUND, vary by bank.
5. **Claimed 2026 amendment:** the Gemini draft says E-Commerce (Amendment) Rules 2026 take effect 1 Jan 2027, citing a PIB release. NOT VERIFIED; no official Gazette text seen. Find it before relying on O03 to O09 after 1 Jan 2027.
6. **Marketplace grievance officers:** NOT FOUND until rechecked.

## I. Load-bearing lines (for Ganesh's hand-check)

1. O02, a D2C brand is an inventory e-commerce entity.
2. O09, cannot refuse a refund for defective, not-as-advertised or late goods.
3. O04, grievance officer: 48 hours to acknowledge, one month to resolve.
4. O03, grievance officer must be shown on the site.
5. O06, accepted refunds within a reasonable period (no fixed days).
6. O05, cancellation charge rule, read the right way round.
7. O11, failed card payment on a website: T+5 calendar days and Rs 100 a day, only when confirmation never reached the store.
8. O12, the same for UPI.
9. O14, refunds to the original payment method (binds the aggregator).
10. O15, NCH up to 30 days.
