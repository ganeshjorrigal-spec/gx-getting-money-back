# HQ review: urgent demo fix, D-046, speed, finals (to ec86aa2)

Reviewed Tue 13 Oct 2026, 23:55 IST, by Claude HQ. 319 tests (42 files) and type check pass, run by HQ.

## Verdict

- Demo fix (33fcc76 + 6ef05de): accepted. Cause confirmed: live 4990087 still mails a demo Grievance Officer, which D-043 blocks.
- D-046 collapsed summary (f457201): accepted.
- Speed (71a4bc1, 1d06b31): accepted. Median 73 to 97, LCP 4.6 s to 2.0 s.
- Finals (ec86aa2): accepted with polish (below) before the landing page is published.

## Release decision (Ganesh, 23:55)

Demo-only release now: the two demo commits on top of the live 4990087, published tonight. Everything else is published tomorrow after the polish is reviewed.

## Landing polish (before the full publish)

1. "Your cases" sits above the hero even with no saved cases and pushes the headline down. Show it only when the browser has saved cases, and place it below the hero.
2. On desktop the mascot is a tiny figure floating to the right of the sample card. Place it deliberately: overlapping the card's top-right corner at about 96 to 120px on desktop, about 64px on a phone, never covering text.
3. The hero animation's resting state leaves "Next mail ready" floating loose under the card with a gap. In the final state the card should end on the green "It's in" stamp with the reply line inside the card; no orphan labels.
