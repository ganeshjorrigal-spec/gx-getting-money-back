# Sample case for the launch video (small, unlinked)

Written by HQ, 12 Oct 2026. Do this before the Cloudflare move if it is quick (aim under 1 hour). No live calls, no real-company mail, no allow-list changes, no key in the repo.

## Why

The launch video shows three app moments: the "Who owes you" card, the next mail opened in Gmail and sent by the user, and a reply read with the next mail ready. On the normal flow a made-up company (Demo Air / DemoTrips) has no checked contacts (`lib/flight-kb.ts:463`), so the recording would show an empty To field, no airline in CC and "No mail needed yet". The public flight demo cannot be used either: it shows Genie sending mails itself and a simulated call, which the video must not show.

The older flight demo still exists in the backend (`api.demo.create` with `kind: "flight"`, the M2.5 / M2.6 demo organiser: the user taps "Open in Gmail", sends from their own Gmail to the demo desk role addresses, the demo desk replies in the same thread, "Skip ahead" moves the clock). The start page no longer links to it. That flow is the honest recording source.

## Build

1. Add an unlinked entry point, `/start/?demo=flight-self`, that creates that older flight demo (`createDemo` with `kind: "flight"`, not `createChaseDemo`) and opens its case page. Nothing on the site links to it. Keep the existing "See a real case" button and the public chase demo unchanged.
2. On this demo, hide every chase-permission element: the "Let Genie send and follow up" block, the line "Use Gmail to send it yourself, or give Genie written permission above.", the second copy near the top of the page, and any call section. The user path is only: card, "Open in Gmail", Send in Gmail, "Yes, I've sent it", reply read, next mail ready, check-in.
3. Keep the app's own demo labels visible ("Demo · <code>", "The companies are pretend. Everything Refund Genie does is real."). Hide the "So Ganesh can follow up" contact field on this demo.
4. Make sure the first mail goes To the DemoTrips grievance role address with the Demo Air Nodal Officer role address in CC (as `planFlight` does for demo cases), so the caption "First mail: where you booked (airline in CC)" is true. Make sure the CC list shows a readable role, for example "Nodal Officer, Demo Air (demo)", not only a raw address. If it only shows addresses, show the role name next to each.
5. After a demo-desk reply (round 1: "pending with the airline"), the case should show "New reply from DemoTrips", "Who owes you: Demo Air", and the next mail To the Demo Air Nodal Officer role address. Then "Your check-in: <date>" with the calendar download.
6. No paywall card on this demo (demos never count toward the trial and never see the offer, per D-033 / D-036).

## Proof (in today's log, plus screenshots in docs/qa/)

Run it once end to end on a phone-size viewport (375 px), fresh browser profile, and save a screenshot of EVERY state, named `video-sample-01-...png` onward:
- start page with the sample loading
- the case card (Who owes you, Overdue, Due date, the "airline is responsible" line)
- Your next mail with To and CC visible, and the "Open in Gmail" button, with nothing below it in the same card
- the Gmail compose it opens (prefilled To, CC, subject)
- after "Yes, I've sent it"
- the reply read state ("New reply from DemoTrips" or whatever it really says, plus any "Does that look right?" step)
- the next mail ready to the Demo Air Nodal Officer
- Your check-in card and the downloaded calendar event title

Write down the exact on-screen wording of each state in the log. Report the time from Send to the reply appearing. Tests stay green. Mark nothing DONE. Update STATE.md, append the log, commit and push.
