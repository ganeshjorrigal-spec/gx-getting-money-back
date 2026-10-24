# Shared Gemini cap

Prepared on next; not yet published to the Production test link. No live-project changes.

## App call sites

| File | Call | Gate |
| --- | --- | --- |
| convex/flightAgent.ts | Flight message/screenshot/reply reader | internal.aiQuota.take before generateObject |
| convex/agent.ts | Event reader, including each configured fallback attempt | Same shared mutation before each attempt |
| convex/agent.ts | Event email/chat drafter | Same shared mutation before generation |
| convex/demoActions.ts | Demo organiser's optional acknowledgement | Same mutation before AI/mail reservation; blocked attempt leaves no mail reserved |

Two developer-only scripts also call Gemini directly: scripts/eval.mts and scripts/eval-flights.mts. They are not app endpoints and do not run through the app counter. They were not run for this task; the provider's project quota is their backstop too. No additional app Gemini endpoints found in convex/ or lib/.

## Counter and behaviour

AI_CALLS_PER_HOUR is read only in the internal Convex mutation; default 100, zero blocks new attempts, invalid values use 100. A single rateCounters row, gemini:app-hour, is reused through convex/lib/rate.ts. Its window starts at the UTC clock-hour boundary. Transactional reservations serialize concurrent callers, across cases/devices/demo/real reads. Attempts consume budget before provider access, including attempts that subsequently fail; no automatic refund or provider retry introduced. The optional demo acknowledgement reserves conservatively before mail reservation, so it cannot strand an unsent reservation when blocked.

On refusal, input records and uploaded files stay unchanged. The case enters ERROR with progress busy, no auto retry scheduled from this rejection. The screen says exactly: Busy right now. Try again in a few minutes. Manual retry remains. A blocked demo organiser phase becomes timed_out before any mail reservation, so its existing manual demo retry can resume. Stale runs cannot spend quota or overwrite a newer run.

## Current proof and remaining gate

40 targeted tests across five files pass: 12 quota checks, one rendered busy-message check, plus existing demo-confirmation/demo-email/static-route checks. Quota tests cover 100/101, next hour, mixed cases, actual demo/real reader actions, event/flight blocked calls preserving text and storage, no scheduled retry, stale runs, zero/invalid settings, demo retry state, and concurrent reservations. All provider/Google paths mocked. Generated local API bindings include the new internal mutation.

Full suite and type check wait until after Part 3 step 4's provider-quota STOP, as HQ ordered. Production deploy of the cap needs Ganesh's separate yes. Parts 4/5 and N2 not started.
