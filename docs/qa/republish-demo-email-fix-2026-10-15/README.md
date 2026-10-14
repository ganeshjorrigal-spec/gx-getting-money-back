# Authorised main republish, 15 October 2026

Source 1a181a956b7193bf644cd0971fe81ec3f88ef997 includes Part A fixes0e2dca6 and reviewed D-050. Ganesh authorised publication in chat after the owner renewed the demo organiser Google connection.

355/355 tests across47files pass twice; type check, explicit static export and17-step saved local public-demo walk pass. Local transport replaced; no actual email or call. No new source changes during deployment.

npm run deploy then npm run deploy:web both exit0. Convex static deployment a0bde24d-8f05-403c-aa35-7c4167d1ed95 (132 assets). Cloudflare version1ac577f6-6bab-4ed0-b8fe-b08521d72e44 (31 new,101reused assets). D-050 and the two fixes now live; rollback is no longer the active release.

Seven public routes, including demo-confirm, return200. Confirmation-page heading loads without using a valid email link. The initial browser wait timed out before the final animation frame; a subsequent read of the current frame showed sample-finished, It's in and opacity1. Saved final-frame check and screenshot. No code fix or deployment retry needed for this observation. The Google mailbox read-only diagnostic still succeeds, count0 for an intentionally invalid case code, without sending mail.

Live confirmation-mail and copied conversation delivery remain for Ganesh to check. Old address/device daily counters were not reset; new cleanup only handles new failed sends. The previously capped address cannot receive another link today. Use a different owned Gmail account and a fresh browser profile for the live proof, or wait until the next IST calendar day. No actual call, calling settings, allow-list, key/env changes. PartB not started; nothing DONE.
