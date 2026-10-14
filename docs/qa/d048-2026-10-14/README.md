# D-048 local proof, 14 October 2026

Parts1-2 implemented and ready for code review. Part3 has local browser proof only; **actual Gmail arrival remains unverified**. Nothing published or marked DONE.

## Evidence

-339tests across46files pass; type check and explicit static build pass. Export contains `demo-confirm/index.html` with the existing Convex provider wrapper.
- `saved-walk.json`:17saved steps from landing button through email request, local confirmation link, sample permission, both copied conversations, simulated call, bank-date skip and Money landed. Actual page components, transport replaced. No Google sign-in, external mail, real company or phone call.
- `checks.json`:375px, no horizontal overflow; local inbox has1confirmation and2mail/reply pairs. All5subjects start Demo:, all4conversation mails copy the confirmed fixture address, all5bodies begin with the required notice.
- `demo-email.png`, `confirmation-local-inbox.png`, `round1.png`, `round2.png`, `round3.png`, `money-landed.png`:375px viewport screenshots. Full-page Chrome captures timed out; viewport captures succeeded.
- `local-inbox.txt`, `final-case.txt`:synthetic local mail and case text. Addresses use example.invalid and are only on the local fixture allow-list, never added to Convex settings. Confirmation nonce is synthetic, not a real case key.
- `flight-confirm.png`, `event-confirm.png`, free-check screenshots and `confirm-checks.json`: required email, exact purpose line, optional phone, Looks right disabled without email, free owner/date/first-step result visible before confirmation. Backend tests verify drafts are not persisted/exposed without required email.
- `self-send.png`: the unlinked flight-self flow still confirms without the new email step or automatic permission block. No self-send mail was sent during proof.

## Backend tests

Actual Convex mutations/actions run against the in-memory test database. Confirmation actions are checked with mocked Gmail/encryption: demo sender, intended recipient, nonce-only link, single use. Tests cover30minute expiry, superseded links,3requests/device/day,1confirmed demo/address/calendar day including another case/device, unconfirmed dispatch rejection and real-case exception rejection. Both actual automatic send phases are checked for confirmed CC outside the real allow-list, explicit subject and first body line.

## Limits of this proof

The browser inbox is a clearly labelled transport fixture. Its link opens a fixture confirmation; the production nonce consumption is separately tested through actual backend actions. This is not evidence that a confirmation or copied reply arrived in Gmail. New functions remain unpublished, and local demo mailbox encryption credentials are absent. No keys were fetched or changed to bypass that constraint. Actual allow-listed test-inbox delivery needs a later authorised integration environment. The part3Gmail acceptance check is therefore outstanding for HQ.

Repeat locally after static build: `node --import tsx scripts/email-demo-proof.mts`, serve `out` on localhost, then run `scripts/qa/can-finish-public-demo.mjs` with `scripts/qa/can-finish-email-demo.steps.json` through the approved browser tool. Proof files are not included in the build/deploy scripts.
