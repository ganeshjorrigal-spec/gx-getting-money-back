# Refund Genie eval — 2026-10-13

Model: gemini-3.5-flash-lite. Synthetic PRD fixtures F1–F16. No user data.

| Fixture | Expected route | Result | Observed | ms |
|---|---|---|---|---:|
| F1 | WAIT | PASS | route WAIT, due 2026-10-23, check-in 2026-10-24, next none | 2400 |
| F2 | OVERDUE | PASS | route OVERDUE, due 2026-09-23, check-in 2026-10-06, next L0_chat | 2292 |
| F3 | ACTION_NEEDED | PASS | route ACTION_NEEDED, due 2026-04-20, check-in 2026-04-17, next ACTION_form | 2343 |
| F4 | FAILED_PAYMENT | PASS | route FAILED_PAYMENT, due 2026-10-08, check-in 2026-10-13, next FAILED_platform | 2202 |
| F5 | TRACE | PASS | route TRACE, due —, check-in —, next TRACE_ask | 2572 |
| F6 | NO_ROUTE | PASS | route NO_ROUTE, due —, check-in —, next options | 2056 |
| F7 | NO_ROUTE | PASS | route NO_ROUTE, due —, check-in 2026-03-27, next NO_ROUTE_ask | 2000 |
| F8 | NEED_INFO | PASS | route NEED_INFO, due —, check-in —, next questions | 2129 |
| F9 | OUT_OF_SCOPE | PASS | route OUT_OF_SCOPE, due —, check-in —, next waitlist | 1806 |
| F10 | NEED_INFO | PASS | route NEED_INFO, due —, check-in —, next questions | 1799 |
| F11 | NEED_INFO | PASS | route NEED_INFO, due —, check-in —, next questions | 2296 |
| F12 | NEED_INFO | PASS | route NEED_INFO, due —, check-in —, next questions | 1979 |
| F13 | NEED_INFO | PASS | route NEED_INFO, due —, check-in —, next questions | 2384 |
| F14 | WAIT | PASS | route WAIT, due 2026-10-25, check-in 2026-10-26, next none | 2218 |
| F15 | OVERDUE | PASS | route OVERDUE, due 2026-09-23, check-in 2026-10-07, next L0_chat | 2212 |
| F16 | OVERDUE | PASS | route OVERDUE, due 2026-09-28, check-in 2026-10-07, next L0_chat | 2235 |

Route correct: 16/16. Every asserted date exact: true. Invented contacts: 0.
