# Test project settings

Project: refundgenie-test. Deployment: tangible-lemur-692. Test address: https://tangible-lemur-692.convex.site. No settings copied from the live project. Ganesh enters every secret himself.

Open https://dashboard.convex.dev/d/tangible-lemur-692, confirm refundgenie-test and Development, then Settings > Environment Variables > Add environment variable. Enter each name/value there and save. Never paste secrets into chat. Do not select the live project.

## Needed now: set in this test deployment

| Name | Purpose and action |
| --- | --- |
| GOOGLE_GENERATIVE_AI_API_KEY | Gemini credential; Ganesh supplies it, never committed. The Google SDK reads this setting. |
| GEMINI_MODEL | Reader/draft model; keep gemini-3.5-flash-lite as previously instructed. |
| GEMINI_PAID_TIER | Paid processing mode; true for the prepaid Gemini project. |
| TOKEN_ENC_KEY | New random 32-byte key encoded as base64; do not reuse the live value. Ganesh creates and enters it himself. |
| PUBLIC_APP_URL | Set to https://tangible-lemur-692.convex.site so test case links stay on the test site. |
| FREE_LANDED_REFUNDS | Free recovered-case allowance; 3 matches the existing example/default. |

## Provided by Convex, not copied or manually changed

| Name | Purpose and action |
| --- | --- |
| CONVEX_URL | Convex-managed backend URL. |
| CONVEX_SITE_URL | Convex-managed HTTP/site URL, used for OAuth callback and fallback case links. |
| CONVEX_DEPLOYMENT | CLI target in ignored .env.local, now dev:tangible-lemur-692. |
| NEXT_PUBLIC_CONVEX_URL | Browser backend URL in ignored .env.local, generated for this test deployment. |
| NEXT_PUBLIC_CONVEX_SITE_URL | CLI-generated test HTTP URL in ignored .env.local. |

## AI optional

| Name | Purpose and action |
| --- | --- |
| GEMINI_MODEL_FALLBACK | Optional event-reader fallback; leave unset unless Ganesh chooses it. No model switch by Codex. |

## Payments: test mode only, not needed for the free check

| Name | Purpose and action |
| --- | --- |
| RAZORPAY_KEY_ID | Server checkout ID; test-mode key only, later. |
| RAZORPAY_KEY_SECRET | Matching test-mode server secret only, later. |
| NEXT_PUBLIC_RAZORPAY_KEY_ID | Matching public test ID in local build env if checkout is tested later. |
| NEXT_PUBLIC_RAZORPAY_PAYMENT_LINK | Optional older payment-link path, read by backend; test link only, leave unset now. |
| NEXT_PUBLIC_UPI_VPA | Legacy manual-payment destination, read by backend; leave unset now. |
| NEXT_PUBLIC_UPI_NAME | Legacy manual-payment payee label; leave unset now. |

## Calls: leave unset now; review before N4

| Name | Purpose and action |
| --- | --- |
| VAPI_API_KEY | Provider credential, later. |
| VAPI_ASSISTANT_ID | Provider assistant, later. |
| VAPI_PHONE_NUMBER_ID | Provider outgoing number ID, later. |
| VAPI_MODEL_PROVIDER | Optional model provider override, later. |
| VAPI_MODEL | Optional call model override, later. |
| CALL_MODE | Live/simulated switch; leave unset now (simulated default). |
| CALL_ALLOWLIST | Approved receiving numbers, later; Ganesh owns this list. |
| CALL_MAX_COST_USD | Per-call budget reservation, later. |
| CALL_DAILY_CAP_USD | Daily budget, later. |
| CALL_DEMO_END_HOUR | Optional demo-hours limit, later. |
| CALL_REAL_ANY_HOUR | Owner-test hours override; leave unset. |
| CALL_TRANSFER_ENABLED | Passenger transfer gate; leave unset. |

## Gmail, tracking, response Sheet and chase: leave unset now

Do not connect the live case inbox here. Two deployments reading the same inbox could process one reply twice. HQ/Ganesh must decide on a separate test inbox before N6. Demo emails, case-link delivery and Calendar alerts are unavailable until separate test credentials/connections are approved.

| Name | Purpose and action |
| --- | --- |
| GOOGLE_OAUTH_CLIENT_ID | Test OAuth client, later. |
| GOOGLE_OAUTH_CLIENT_SECRET | Matching test OAuth secret, later. |
| TICKBACK_INBOX_ADDRESS | Separate test case inbox, decision needed before N6. |
| TICKBACK_DEMO_ADDRESS | Separate test demo desk, later. |
| GMAIL_TEST_ACCOUNTS | Accounts allowed to opt into Gmail tracking, later. |
| RESPONSES_SHEET_SHARE_EMAIL | Responses Sheet sharing recipient, later. |
| CHASE_ALLOWLIST | Approved test mail recipients, later. |
| CHASE_REAL_COMPANIES_ENABLED | Real-company sending switch; leave unset. |
| CHASE_DAILY_CAP | Global real-company mail limit; leave unset now, default 50 is inactive without real sending. |

## Public build text and old example entries

| Name | Purpose and action |
| --- | --- |
| NEXT_PUBLIC_SUPPORT_EMAIL | Optional public contact-page address, build-time setting; not needed for intake proof. |
| NEXT_PUBLIC_PRODUCT_NAME | Listed in .env.example, no current app/Convex/lib reader found; leave unset. |
| NEXT_PUBLIC_CONTACT | Listed in .env.example, no current app/Convex/lib reader found; leave unset. |
| APP_URL | Old example entry; current link code reads PUBLIC_APP_URL instead. Leave unset. |
| EMAIL_ENABLED | Old example entry; no current app/Convex/lib reader found. Leave unset. |
| RESEND_API_KEY | Old example entry; current mail uses Google, no reader found. Leave unset. |
| EMAIL_FROM | Old example entry; current Google mail uses configured case inbox. Leave unset. |

Inventory checked against convex/, lib/ and .env.example, excluding tests and generated code. Names only, no secrets or personal values. No payment, Google or calling settings added by Codex.
