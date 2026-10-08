# Verification: online-stores.md (v2)

Verifier: independent pass, 9 Oct 2026. Checked against live official pages only. Nothing under `docs/research/sources/` and no `*-gemini-raw*` file was used.

How each source was read:
- E-Commerce Rules 2020 PDF (consumeraffairs.gov.in): loaded in the browser, full text layer extracted with pdf.js (11 pages). Each quote was matched after removing spaces and quote marks. It is the original Gazette notification, dated 23 July 2020 (CG-DL-E-23072020-220661, signed Amit Mehta, Jt. Secy). The PDF shows no amendment.
- RBI TAT circular: page read in the browser. The Annex table was read cell by cell with rowspan values. RBI/2019-20/67, DPSS.CO.PD No.629/02.01.014/2019-20, 20 Sep 2019, in force from 15 Oct 2019. The page shows no withdrawal or supersession note. Para 6 now names the Integrated Ombudsman Scheme, 2021.
- RBI PA Master Direction: page read in the browser. RBI/DPSS/2025-26/141, 15 Sep 2025. Page "Last Updated On: Sep 17, 2025". No amendment shown.
- NCH about page: read with WebFetch. Run by the Department of Consumer Affairs.

## C. Load-bearing lines (section I)

| # | line | verdict | note |
|---|---|---|---|
| 1 | O02, D2C brand is an inventory e-commerce entity | CONFIRMED | Rule 3(1)(f) text matches. Holds only if the brand owns the stock it sells. |
| 2 | O09, cannot refuse refund for defective, not-as-advertised or late goods | CONFIRMED | Rule 7(4) matches, with the force majeure proviso for late delivery. |
| 3 | O04, 48 hours to acknowledge, one month to resolve | CONFIRMED | Rule 4(5). Clock runs from receipt of the complaint, not from sending. |
| 4 | O03, grievance officer must be shown on the site | CONFIRMED | Rule 4(4). |
| 5 | O06, accepted refunds within a reasonable period | CONFIRMED | Rule 4(10). No day count in the rule. |
| 6 | O05, cancellation charge rule, right way round | CONFIRMED (row) | Row is the right way round. But section A, scenario a applies it to a store-cancelled order. See D. |
| 7 | O11, failed card payment, T+5 calendar days, Rs 100 a day | WEAKENED | Numbers and rowspan are right. The scenario "order never created" / "no order confirmation" is wider than the rule. See B. |
| 8 | O12, same for UPI | WEAKENED | Same scenario problem as O11. |
| 9 | O14, refunds to original payment method, binds aggregator | CONFIRMED | Para 10(f), 15 Sep 2025. |
| 10 | O15, NCH up to 30 days | CONFIRMED | Sentence is on the page. A description, not a duty. |

## A. Counts

- CONFIRMED: 13 (O01 to O10, O13, O14, O15)
- WEAKENED: 2 (O11, O12)
- NOT ON PAGE: 0
- PAGE UNAVAILABLE: 0
- SUPERSEDED: 0

Plus 6 problems in sections A, D, G and H (listed in D below).

## B. Row table

| row id | verdict | what you saw | change needed |
|---|---|---|---|
| O01 | CONFIRMED | Rule 2(1)(c), word for word: "all e-commerce retail, including multi-channel single brand retailers and single brand retailers in single or multiple formats". | None. |
| O02 | CONFIRMED | Rule 3(1)(f). Text matches. The PDF text layer has a broken glyph and spacing around "inventory e -commerce entity" (closing quote shows as a odd symbol). Wording is the same. | None. Optional: say "if the brand owns the stock". |
| O03 | CONFIRMED | Rule 4(4), word for word. Applies to every e-commerce entity. | None. |
| O04 | CONFIRMED | Rule 4(5), word for word. Clock is "from the date of receipt of the complaint". | None in the row. Fix section G wording (see D). |
| O05 | CONFIRMED | Rule 4(8), word for word, including "e- commerce" spacing. It is about consumers who cancel. | Row is fine. Fix section A, scenario a (see D). |
| O06 | CONFIRMED | Rule 4(10), word for word. No fixed day count. | None. |
| O07 | CONFIRMED | Rule 7(1)(a), word for word. It is a duty to display accurate information "in a clear and accessible manner, displayed prominently". | None in the row. Note: it is a display duty, not a duty to honour the terms. |
| O08 | CONFIRMED | Rule 7(1)(f), word for word. It sits in the list of information an inventory entity must provide. | None. |
| O09 | CONFIRMED | Rule 7(4), word for word ("deficient spurious" has no comma in the PDF, as quoted). Proviso: late delivery exception for force majeure. Plain sentence includes it. | None. |
| O10 | CONFIRMED | Rule 6(3), word for word up to "deficient or spurious". The full sub-rule also covers not-as-advertised and late delivery, so "same duty" is fair. | None. Optional: extend the quote to match the plain sentence. |
| O11 | WEAKENED | Annex row 2(c), "Card Not Present (CNP) (e-commerce) Account debited but confirmation not received at merchant's system." The timeline cell "Auto-reversal within T + 5 days." and compensation cell "₹ 100/- per day of delay beyond T + 5 days." have rowspan=2 on row 2(b), so they do cover 2(c). Note 4 of the Annex: "T is the day of transaction and refers to the calendar date." | Change "no order confirmation" to "the payment confirmation did not reach the merchant's system". Change scenario g so it does not equal "order never created": if the store did receive the money but did not create the order, this is not a failed transaction and O11 does not apply; it is a store refund (O06). |
| O12 | WEAKENED | Annex row 4(b), UPI: "Account debited but transaction confirmation not received at merchant location (payment to merchant)." Cells "Auto-reversal within T + 5 days." and "₹100/- per day if delay is beyond T + 5 days." match. | Same scenario fix as O11. Say "transaction confirmation not received at the merchant", not "order never created". |
| O13 | CONFIRMED | Para 5 quote word for word. Para 6: customers who do not get redress "as defined in the TAT, can register a complaint with the Reserve Bank - Integrated Ombudsman Scheme, 2021". | None. Optional: name the Integrated Ombudsman Scheme, 2021. Its use is limited to the same failed-transaction cases as O11 and O12. |
| O14 | CONFIRMED | Para 10(f), word for word. Master Direction dated 15 Sep 2025. Binds the payment aggregator. | None in the row. See D on scenario h. |
| O15 | CONFIRMED | consumerhelpline.gov.in/public/about: "It may take up to a maximum of 30 days to arrive at a logical conclusion." Run by the Department of Consumer Affairs. Helpline 1915 shown. | None. |

## D. Must fix before the playbook is used

Rows:
1. **O11, O12: relabel scope.** Keep VERIFIED, but rewrite the plain sentence and scenario. The rule covers a payment whose confirmation did not reach the merchant. It does not cover a store that got the money and failed to create the order. Scenario g in section A ("money debited, no order confirmation", "order never created") must be split: failed payment (O11, O12, O13) versus store holds money with no order (O06, store refund).

Sections:
2. **Section A, RBI bullet and section G, failed payment date.** T+5 applies only to card-not-present card payments (row 2(c)) and UPI payments to a merchant (row 4(b)). Net banking is not in the table. Wallet (PPI) on-us payments are T+1 (row 8(b)). Off-us PPI follows the underlying rail (row 8(a)). G must say "card or UPI only" and not compute T+5 for other methods.
3. **Section A, scenario a.** "Store cancelled: Rule 4(8) bars cancellation charges..." misreads where the rule bites. Rule 4(8) is about consumers who cancel. For a store-cancelled order it gives no direct right; it matters only if the store charges customers for cancelling. Rewrite: customer cancelled and charged a fee, cite O05; store cancelled, cite O06 only.
4. **Section A, scenario h.** O14 binds the aggregator on how a refund is routed. It does not stop a store from offering store credit instead of a refund. Say that O14 is a routing rule only, and that O09 is the lever for defective, not-as-advertised or late goods.
5. **Section G and D step 2.** Rule 4(5) counts from "receipt of the complaint", not from sending. Change "complaint sent" to "complaint received (use the send time of an email as a proxy, labelled as such)".
6. **Section H item 5.** The claim of an "E-Commerce (Amendment) Rules 2026" in force from 1 Jan 2027 is not on any of the four pages checked. The PDF checked is the original 23 July 2020 notification. Label this claim NOT VERIFIED until an official Gazette link is added. If the amendment exists, all O01 to O10 rows need a recheck against it.

Minor, not blocking:
- Sections A, scenarios b and c, and D step 1 lean on O07 to "chase the store's published terms". O07 only requires the terms to be accurate and displayed. Fine as a lever, but do not present it as a duty to honour the terms.
