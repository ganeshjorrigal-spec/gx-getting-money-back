# Verification: online-stores.md

Checked on 9 Oct 2026 by an independent verifier. Sources opened with WebFetch. Where a URL failed, the alternate URL actually read is named.

## C. Load-bearing lines (Output H) and verdicts

Only row 9 came out CONFIRMED. So only line 5 is supported.

| # | Line (short) | Verdict | Why |
| :- | :- | :- | :- |
| 1 | Refunds go back to original method unless user says otherwise | UNSUPPORTED | Row 1 quote is real, but row 1 is WEAKENED (label must be REPORTED; the page is a third-party copy, not rbi.org.in). Re-source to RBI and it becomes supported. |
| 2 | Failed e-commerce transactions reversed within 5 working days | UNSUPPORTED | Row 3 quote is from the ATM row. The e-commerce (card not present) row has no TAT or compensation in the circular. The circular says T is a calendar date, not working days. |
| 3 | Delay beyond 5 working days gives Rs 100 per day | UNSUPPORTED | Row 4 quote is from ATM and PoS rows, not e-commerce. Again calendar days, not working days. Applies to failed transactions only, not merchant refunds. |
| 4 | No cancellation fees when merchant cancels unilaterally | UNSUPPORTED | The official Rule 4(8) is about charges on consumers who cancel, allowed only if the entity bears similar charges when it cancels. The line reverses the meaning. |
| 5 | Storefront must show Grievance Officer name and contact | SUPPORTED by row 9 | Official text (Rule 6(5)(e) for marketplace sellers; Rule 4(4) for e-commerce entities generally). |
| 6 | Grievance Officers must acknowledge and resolve on prescribed timelines | UNSUPPORTED | No row quotes it. The file itself lists it as NOT FOUND. Note: the official gazette copy does carry Rule 4(5) (48 hours, one month), but no row cites it. |
| 7 | Forcing store credit is a prohibited dark pattern | UNSUPPORTED | Row 2 is NOT ON PAGE. The real "forced action" definition (read on legitquest) does not mention store credit or refunds. |
| 8 | Refusing a return of defective goods is an unfair trade practice | UNSUPPORTED | Row 6 is NOT ON PAGE. Even the real Section 2(47)(f) text is about false representation of need or usefulness, not refusing returns. |
| 9 | Failing a published reverse pickup is deficiency in service | UNSUPPORTED | No row covers it. File admits NOT FOUND. |
| 10 | Marketplaces need internal portals exhausted first | UNSUPPORTED | No row covers it. |

## A. Counts per verdict (14 rows: B rows 1 to 9, E rows 5)

- CONFIRMED: 1
- WEAKENED: 10
- NOT ON PAGE: 2
- PAGE UNAVAILABLE: 1
- SUPERSEDED: 0 (but see note on the 2026 amendment below)

## B. Row table

| row id | verdict | what you saw | change needed |
| :- | :- | :- | :- |
| B1 | WEAKENED | Quote found word for word, para 10(f), RBI (Regulation of Payment Aggregators) Directions, 2025, dated 15 Sep 2025. But the URL is fidcindia.org.in, a trade body copy, not RBI. | Relabel REPORTED, or replace URL with the rbi.org.in copy and re-read. Rule binds payment aggregators; say so. |
| B2 | NOT ON PAGE | Vikaspedia page (both URLs tried) has "forced action" only in meta keywords, no definition. Definition found on legitquest.com (third party). It says nothing about store credit. | Re-source to the gazette or CCPA notification. Rewrite rule: drop "store credit"; the definition covers forcing extra purchases, unrelated sign-ups, or sharing personal data. Label REPORTED until official. |
| B3 | WEAKENED | RBI circular DPSS.CO.PD No.629/02.01.014/2019-20, 20 Sep 2019. Quote is from row 1a (ATM). Row 2c, card not present (e-commerce), has blank TAT and compensation cells. Annex says T is the calendar date. Scope is failed transactions only. | Rule as written is not supported. Either restrict to ATM and card-present PoS, or remove. Change "working days" to days counted from T (calendar date). Remove from scenarios a, b, f (cancellations, returns, processed refunds are not failed transactions). |
| B4 | WEAKENED | Quote found in ATM and PoS rows. Not in e-commerce row. Penalty is paid by the bank to the customer for failed transactions only. | Same as B3. Do not apply to merchant refunds or e-commerce failures. |
| B5 | WEAKENED | Quote found on snrlaw.in (law firm blog). Official gazette (Rule 4(8), G.S.R. 462(E), 23 Jul 2020, read on consumeraffairs.gov.in) says no cancellation charges on consumers cancelling after purchase, unless the entity bears similar charges when it cancels unilaterally. | Relabel REPORTED or switch to gazette. Rewrite rule: "A store cannot charge you for cancelling after purchase unless it also bears similar charges when it cancels." Current rule reverses the meaning. |
| B6 | NOT ON PAGE | draftbotpro page has only metadata. Quote found on indiankanoon.org (also not official). | Re-source to the official Act (indiacode.nic.in). Label REPORTED meanwhile. Rule must not be stretched to "refusing returns". |
| B7 | WEAKENED | Quote found on consumerhelpline.gov.in (official). Page says the process "may take up to a maximum of 30 days". It does not say partner companies are obliged to resolve in 30 days, and gives no anchor. | Rewrite: "NCH says a grievance may take up to 30 days to reach a conclusion." Drop the "registration" anchor claim and "expects partnered entities". |
| B8 | WEAKENED | thc.nic.in PDF would not load (proxy 504, no text). Read official gazette copy on consumeraffairs.gov.in. Quote found in Rule 7(1)(a), which applies to inventory e-commerce entities only. | Rule should say "inventory e-commerce entities", not all entities. Replace URL with the readable official copy. |
| B9 | CONFIRMED | Same alternate official copy. Quote found in Rule 6(5)(e) (marketplace sellers). Rule 4(4) puts a similar duty on all e-commerce entities. | Replace URL with the readable copy. Cite Rule 4(4) for D2C stores. |
| E Amazon | WEAKENED | ship.amazon.in/privacy shows "Iniyan R" and "grievance-officer@amazon.in". The quote is stitched together, not verbatim. "Aditi Urdhwareshe" not seen. No refund timeline on page. | Use exact page text. Remove second name unless sourced. Remove "T+5 working days" (no source). |
| E Flipkart | WEAKENED | Page shows "Mr Karthik R", Associate Director, "privacy.grievance@flipkart.com". "Shreemanth M" not seen. No refund timeline. | Same fixes as Amazon. Note this is the privacy grievance officer, not necessarily the consumer grievance officer. |
| E Myntra | PAGE UNAVAILABLE | Page returned "Oops! Something went wrong". | Re-check later. Do not use the name until read. |
| E Meesho | WEAKENED | Page shows "Murthy S.N" and "legalsupport@meesho.com". Quote formatting not verbatim. No refund timeline. | Use exact text. Remove "T+5 working days". |
| E Nykaa | WEAKENED | Quote found on investor contact page. It is a routing note, not a grievance officer listing. Grievance officer on page is the Company Secretary for shareholders. | Do not present as Grievance Officer page. Find the consumer grievance officer page. Remove "T+5 working days". |

Note on supersession: the Consumer Protection (E-Commerce) (Amendment) Rules, 2026 were announced in Sep 2026 and take effect 1 Jan 2027 (per news coverage; the PIB page did not render its body). Rows 8 and 9 are current today but must be rechecked before 1 Jan 2027.

## D. Rows to remove or relabel before use

Remove or rewrite (rule does not follow from the source):
- B3 and B4: not e-commerce, not working days, not merchant refunds. Remove from scenarios a, b, f, g, or remove entirely.
- B5: meaning reversed. Rewrite from gazette Rule 4(8).
- B2: not on page, and the real definition does not cover store credit.
- B6: not on page, and rule stretched.
- All "T+5 working days" marketplace timelines in Output E: no source.

Relabel REPORTED (or re-source to official site):
- B1 (fidcindia copy), B5 (snrlaw), B2 and B6 if kept on third-party pages.

Fix wording or URL:
- B7 (no obligation, no anchor), B8 (inventory entities only), B9 (URL).
- E: Amazon, Flipkart, Meesho quotes to exact text; drop unseen second names; Nykaa is not a grievance officer page; Myntra unverified.
