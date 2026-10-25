# N4 HQ review fixes, 25 October 2026

See the superseding section in docs/calling.md for the investigation, changed rules, voice samples, exact owner clicks and retest constraints.

Red first: 20 focused tests, 19 failed before implementation. Added the provider-duration action regression and closing-fragment/tool-goodbye regression before their fixes. Full tree gates and source commit are in today's log.

Original saved calls: 6/9 and 5/9 under expanded checker, neither passes. These scores describe the old deployed calls. New prompt, endCallMessage and duration reporting are not deployed or tested on a real call. No environment or saved provider setting changed. Speed already 1.00 in the isolated assistant. Voice choice and separate test publication/call approval remain pending. N4 not READY FOR REVIEW or DONE.

## Superseding result: 26 Oct supervised test
Call fixes deployed in test release 71ea7b4, overnight option in 388f50f. Owner chose Prabhat speed 1.00 and approved exactly one RG-T53DCT call to own approved mobile. Fresh checks passed; one call ended assistant-ended-call, saved completed, 165.096 seconds, USD 0.1979, gpt-4.1 on actual provider call, no transfer. No retry. Expanded checker 6/9: repetition, ended-before-job-done, multiple-questions-one-turn fail. Complete-final-sentence textual check passes, audible ending/hold/interruption still owner review. No claim N4 passes. Safe proof docs/qa/n4-2026-10-26/supervised-retest-result.json; raw transcript remains in provider/Convex only. Owner asked to reset mode to simulated and remove selected demo code; confirmation pending. No more calls authorised.
