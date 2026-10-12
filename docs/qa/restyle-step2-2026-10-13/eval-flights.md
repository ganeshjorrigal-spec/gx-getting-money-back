# Flight eval — 2026-10-13

Fixed paid model: gemini-3.5-flash-lite. Synthetic cases based on FS1–FS5 and public complaint patterns (pending airline, paid site, processed/not received, vague stalls, credit shell, retained taxes). No user data. Exact due/check dates, expected money holder and recipients asserted in code.

| Fixture | Result | Observed | ms |
|---|---|---|---:|
| FL01 | PASS | claim none; from null; points at null; destination unknown; route OVERDUE; due 2026-09-25; check none; money with unknown; To grievanceofficer@makemytrip.com; invented contacts 0 | 2176 |
| FL02 | PASS | claim none; from null; points at null; destination unknown; route OVERDUE; due 2026-09-14; check none; money with unknown; To nodalofficer@goindigo.in; invented contacts 0 | 1467 |
| FL03 | PASS | claim none; from null; points at null; destination unknown; route OVERDUE; due 2026-09-28; check none; money with unknown; To nodalofficer@goindigo.in; invented contacts 0 | 1620 |
| FL04 | PASS | claim waiting_airline; from MakeMyTrip; points at IndiGo; destination unknown; route OVERDUE; due 2026-09-25; check 2026-10-16; money with IndiGo; To nodalofficer@goindigo.in; invented contacts 0 | 1499 |
| FL05 | PASS | claim paid_site; from IndiGo; points at MakeMyTrip; destination travel_site; route OVERDUE; due 2026-10-03; check 2026-10-16; money with MakeMyTrip; To grievanceofficer@makemytrip.com; invented contacts 0 | 1378 |
| FL06 | PASS | claim processed_reference; from MakeMyTrip; points at null; destination passenger; route TRACE; due 2026-10-14; check 2026-10-14; money with bank; To none; invented contacts 0 | 1604 |
| FL07 | PASS | claim processed_reference; from MakeMyTrip; points at null; destination passenger; route TRACE; due none; check none; money with bank; To none; invented contacts 0 | 1354 |
| FL08 | PASS | claim under_review; from MakeMyTrip; points at null; destination unknown; route WAIT; due 2026-09-25; check 2026-10-15; money with unknown; To grievanceofficer@makemytrip.com; invented contacts 0 | 1323 |
| FL09 | PASS | claim credit_shell; from IndiGo; points at null; destination unknown; route OVERDUE; due 2026-09-25; check none; money with unknown; To grievanceofficer@makemytrip.com; invented contacts 0 | 1264 |
| FL10 | PASS | claim none; from null; points at null; destination unknown; route NO_ROUTE; due 2026-09-25; check none; money with unknown; To none; invented contacts 0 | 1360 |
| FL11 | PASS | claim none; from null; points at null; destination unknown; route WAIT; due 2026-09-25; check 2026-10-11; money with unknown; To none; invented contacts 0 | 1450 |
| FL13 | PASS | claim none; from null; points at null; destination unknown; route OUT_OF_SCOPE; due none; check none; money with unknown; To none; invented contacts 0 | 1207 |
| FL14 | PASS | claim none; from null; points at null; destination unknown; route OUT_OF_SCOPE; due none; check none; money with unknown; To none; invented contacts 0 | 1519 |
| FL12 | PASS | claim none; from null; points at null; destination unknown; route OVERDUE; due 2026-09-25; check none; money with unknown; To grievanceofficer@makemytrip.com; invented contacts 0 | 1522 |

Passed 14/14. Counts only: input 8849, output 3915 tokens.
