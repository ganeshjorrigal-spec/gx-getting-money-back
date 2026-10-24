# N2 update mails: READY FOR REVIEW

Code b0ed54f. Not published. Part A alone is live. Wait for Ganesh yes before deploy:test or N3.

## Phone check after approved N2 publication
1. Finish test-mailbox-setup.md. Authorise only the new test inbox on test Production, not Development or the live inbox.
2. Open https://abundant-marten-136.convex.site/start/ and create a made-up flight case booked through MakeMyTrip. Use a different passenger mailbox from the new case inbox.
3. Confirm the facts and email. Tap Email me the confirmation link, open it in the passenger mailbox and finish confirmation. Do not hand over or send company mail for this check.
4. Paste a fictional airline reply saying it paid MakeMyTrip. Let the case finish reading it.
5. Check the passenger inbox: one update says MakeMyTrip holds the money now, includes the private case link and ends with what Genie does next and when. Keep the passenger off CHASE_ALLOWLIST for this proof.
6. Open the private link and check the same case appears. Keep private links and real mail contents out of repository screenshots/logs.

## Completed proof and limits
553/553 tests across 75 files, type check and 16-page static export pass. Development backend accepts schema/functions. Acceptance mocks reader output and external mail while using the real planner, saved case and notification path. Handed-over and not-handed-over confirmed cases get exactly one update outside the allow-list, including repeated delivery. Recipient changes during the Google-token request stop delivery. Closed, stopped and unconfirmed cases do not send. Fake-clock test proves one quiet update after five working days. Call-update and demo regressions pass with mocked transports.

Local screenshot docs/qa/n2-2026-10-25/local-confirmation.png proves the officer-route confirmation card is reachable without hand-over. Fictional Development RG-Y3PAXK only; no send clicked. Actual Google confirmation/update delivery and live demo are not claimed. No separate demo desk connected. New confirmations retain the encrypted private-link token; older cases lacking it are not migrated.
