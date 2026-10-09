# Flight eval — 2026-10-10

Fixed paid model: gemini-3.5-flash-lite. Synthetic cases based on FS1–FS5 and public complaint patterns (pending airline, paid site, processed/not received, vague stalls, credit shell, retained taxes). No user data. Exact due/check dates, expected money holder and recipients asserted in code.

| Fixture | Result | Observed | ms |
|---|---|---|---:|
| FL06 | FAIL | claim processed_reference; from MakeMyTrip; points at null; route NEED_INFO; due 2026-09-25; check none; money with unknown; To none; invented contacts 0 | 1806 |

Passed 0/1. Counts only: input 658, output 271 tokens.
