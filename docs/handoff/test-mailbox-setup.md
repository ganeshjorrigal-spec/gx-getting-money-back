# Separate test mailbox setup

For refundgenie-test only. Never connect the live case inbox or reuse its Google connection. The public test address is https://abundant-marten-136.convex.site. Convex Production below belongs to the isolated test project, not the frozen live product.

## 1. Create the Gmail account
1. Create a new Gmail account for the test case inbox. Choose its address yourself.
2. Use it for the sign-in steps below. Keep its password and credentials out of chat and the repository.
3. The Gmail account and this sign-in project are separate from Gemini; leave Gemini credentials/model unchanged.

## 2. Create the Google project and enable Gmail
1. Open https://console.cloud.google.com/ signed in as the NEW Gmail account.
2. Project picker at top > New project > name Refund Genie Test Mail > Create, then select that project.
3. APIs & Services > Library > search Gmail API > Enable.
4. Google Auth platform > Branding > Get started.
5. App name: Refund Genie Test. Support and developer contact: the new Gmail account.
6. Audience: External. Keep publishing status Testing.
7. Audience > Test users > Add users > add the new test inbox > Save.
8. Data Access > Add or remove scopes > add these two scopes > Update/Save:
   - https://www.googleapis.com/auth/gmail.readonly
   - https://www.googleapis.com/auth/gmail.send
9. Calendar, Drive and Sheets permissions are not needed for N2. Passengers who only receive update emails do not need to be Google OAuth test users; this consent is for the case inbox.

Google's current guide: https://developers.google.com/workspace/gmail/api/quickstart/js .

## 3. Create the Google sign-in credentials
1. Google Auth platform > Clients > Create client.
2. Application type Web application. Name Refund Genie Test Backend.
3. Leave Authorized JavaScript origins blank; the backend handles this sign-in.
4. Authorized redirect URIs > Add URI > paste the Production callback:
   https://abundant-marten-136.convex.site/oauth/google/callback
5. Add URI again > paste the Development callback:
   https://tangible-lemur-692.convex.site/oauth/google/callback
6. Create. Keep the client ID and client secret private. Do not paste them in chat or save them in repository files.

## 4. Add settings in the two test deployments
Open https://dashboard.convex.dev/d/tangible-lemur-692 and verify refundgenie-test / Development. Then Settings > Environment Variables > Add. Repeat in https://dashboard.convex.dev/d/abundant-marten-136 after checking refundgenie-test / Production.

Set these names separately in BOTH deployments:

| Name | Value |
| --- | --- |
| GOOGLE_OAUTH_CLIENT_ID | The new test OAuth client ID |
| GOOGLE_OAUTH_CLIENT_SECRET | Its matching test secret |
| TICKBACK_INBOX_ADDRESS | The new test Gmail address |
| GMAIL_TEST_ACCOUNTS | The new test Gmail address |
| CHASE_ALLOWLIST | Only the new test Gmail address for now |
| CHASE_REAL_COMPANIES_ENABLED | false |

Keep existing TOKEN_ENC_KEY separately in each deployment, keep PUBLIC_APP_URL pointing to that deployment's site, and do not edit CONVEX_SITE_URL. Do not change Gemini or calling settings. Leave demo desk and responses-sheet settings unset now. N2 confirmed-passenger updates do not require the passenger's address on CHASE_ALLOWLIST; that list still restricts test company mail.

## 5. Authorise Production only
Adding settings does not connect the mailbox.
1. Select refundgenie-test > Production > abundant-marten-136 in the Convex dashboard.
2. Functions > googleActions > beginChaseInbox.
3. Run with arguments {}.
4. Open the returned Google URL immediately; it expires after ten minutes.
5. Choose the NEW test inbox, allow reading and sending, and finish Google's consent screen.
6. Do not use the older read-only googleConnect.startInbox function.
7. Do not authorise Development yet. It can have the settings, while only Production holds an active inbox connection. This avoids two deployments reading one inbox. Development tests use mocked mail.
8. Reply connected after the callback finishes. Do not paste credentials or the callback URL containing a temporary Google code.

If Google reports access_denied, check that this exact new mailbox is in Audience > Test users in this new project. If redirect_uri_mismatch appears, check the exact two callback URLs above on this client.

Google Testing consent expires after seven days; reconnecting later is expected. Source: https://support.google.com/cloud/answer/15549945?hl=en . There is no need to connect the frozen live inbox, change Gemini's project or grant Calendar/Drive access.
