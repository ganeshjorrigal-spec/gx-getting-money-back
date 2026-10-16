# Read-only call-path check

1. PASS: public demo chaseStory cases force simulated mode in calls.mode and calls.reserve, regardless of CALL_MODE.
2. PASS with blocker: real destinations come only from flightCare(company), whose sole entry is IndiGo with company-page source; an additional release-wide real-case refusal currently blocks the path.
3. PARTIAL: calls.request requires separate calling permission and active chase; the user call button currently exists only for demos, so real cases cannot press it yet.
4. PASS: only calls.request schedules the real call action; chaseDemo's automatic schedule applies only to public simulated demos; proofFixture is simulated-only and seeds demos. No real-call cron or mail-reply auto-call path found.

D-056 enables the missing real path behind checked care number, allow-list, separate permission, user press, actual live mode, hours, per-case limit and budget. No call or settings change during this inspection.
