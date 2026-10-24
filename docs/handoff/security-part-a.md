# Part A security handoff, 25 October 2026

READY FOR REVIEW on next. Required STOP before deploy:test or N2. Verified code 83d8342. Tests 546/546 across 74 files; type check and static export pass. Development schema/functions accepted. No public test publication yet.

## What changed
- Owner-secret and account checks on responses setup.
- One-time confirmation of real-case email before hand-over or calls. Exact case-screen explanation from HQ.
- Only app-sent-thread replies from checked company contacts with Gmail SPF/DKIM passes can trigger automatic reads. Other mail stays visible but inactive until the private case holder approves it.
- Old public demo refuses creation; no incoming recipient copying. Confirmed-email demo only.
- Calls default to 12 minutes. An uncertain start retains budget; read-only lookup matches exact app-call metadata and never starts another call.
- At most 20 Gemini calls per case per India day by default, in the same transaction as the hourly cap. Dedicated daily notice; input/uploads retained.
- Upload tickets record ownership during server upload, not through a client-supplied storage ID. Attachment reads, claims and deletion check case ownership.

## Phone check after Ganesh authorises test publication
The public test address remains https://abundant-marten-136.convex.site. It will not show Part A until the owner approves deploy:test.
1. Open /start/ on the phone, paste a made-up domestic cancellation, and continue. Answer any missing facts with sample details, not real booking/contact data.
2. On the case page, at Let Genie send and follow up, expect Confirm your email first and the confirmation-link button. Written or calling permission must not be offered before confirmation.
3. If the separate test inbox has been connected with sending permission, request the link to an address Ganesh owns. Open it once; a second use must be refused. The confirmed case can then offer hand-over. Do not authorise real-company mail or calls as part of this check.
4. If a mail is marked unverified, expect A mail we couldn't verify came in for your case and This is real, use it. Until that button is pressed, the owner, dates and next action stay unchanged. No Gemini call occurs for that mail automatically.
5. On a new case, add a made-up screenshot. It should upload and remain with that case. The automated tests prove another case cannot attach/read/delete its file; there is no need to attempt these attacks manually on the phone.

## Limits of the proof and owner follow-up
The isolated test project still needs its separately chosen Gmail inbox/demo connections and send permission before real confirmation delivery or a live email demo can be checked. No Google permission or settings changes were made. Real mail/calls were not used in tests; transports were mocked. Owner responses setup needs RESPONSES_SETUP_SECRET and RESPONSES_OWNER_EMAIL in Convex settings before it can be used; neither value is present in code or requested in chat. No extra Google scope added.

Legacy attachments without an ownership record fail closed: readers skip them and input IDs cannot cause deletion. No data backfill or deletion was run. HQ should decide any legacy-file migration separately. Uncertain call starts keep their full reserved budget when no exact provider record is found, including after bounded read-only lookups finish. See Vapi's official List Calls reference for the lookup fields: https://docs.vapi.ai/api-reference/calls/list .

Free-refund count resets and manual annual-pass fallback remain parked. N2, N3 and N4 have not started. Frozen live site/backend, Cloudflare, main, keys and calling settings unchanged.
