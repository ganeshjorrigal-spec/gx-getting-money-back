# Flight eval — 2026-10-11

Fixed paid model: gemini-3.5-flash-lite. Synthetic cases based on FS1–FS5 and public complaint patterns (pending airline, paid site, processed/not received, vague stalls, credit shell, retained taxes). No user data. Exact due/check dates, expected money holder and recipients asserted in code.

| Fixture | Result | Observed | ms |
|---|---|---|---:|
| FL03 | PASS | claim none; from null; points at null; destination unknown; route OVERDUE; due 2026-09-28; check none; money with unknown; To nodalofficer@goindigo.in; invented contacts 0 | 1641 |

Passed 1/1. Counts only: input 570, output 313 tokens.
