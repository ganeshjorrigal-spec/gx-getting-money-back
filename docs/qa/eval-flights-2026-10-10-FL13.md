# Flight eval — 2026-10-10

Fixed paid model: gemini-3.5-flash-lite. Synthetic cases based on FS1–FS5 and public complaint patterns (pending airline, paid site, processed/not received, vague stalls, credit shell, retained taxes). No user data. Exact due/check dates, expected money holder and recipients asserted in code.

| Fixture | Result | Observed | ms |
|---|---|---|---:|
| FL13 | PASS | claim none; from null; points at null; destination unknown; route OUT_OF_SCOPE; due none; check none; money with unknown; To none; invented contacts 0 | 1825 |

Passed 1/1. Counts only: input 555, output 317 tokens.
