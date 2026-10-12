# Round 4 final judge: C1 kho-kho, C7 potli, C10 toffee

Judged against BRIEF.md, LESSONS.md rules 1 to 31, APP-BEATS.md, and the code at cbbb814.

## Shared blocker (not a script defect, but it gates every film)
`/start/?demo=flight-self` does not exist in the code yet (no match in app/ or lib/; only the Codex prompt `2026-10-12-sample-case-for-video.md`). The live skit parts can be shot today. No app frame can be recorded until Codex ships it. Every app caption stays provisional until the screenshots arrive, as all three scripts already say.

Code facts: sample case = Demo Air via DemoTrips, DEL to BOM, Rs 5,400, cancelled 30 days back (convex/demo.ts:30). The card shows "Amount: Rs 5,400" and "Overdue by about N working days" (flight-case-view.tsx:124), so about 7 working days overdue. Round 1 reply: "pending with Demo Air" (lib/demo.ts:43); later rounds say "processed" with a UTR, so never go past round 1.

---

## C1 "Refund ka Kho-Kho": 45/50, PASS

| # | Criterion | Score | Evidence |
|---|---|---|---|
| 1 | Hook | 5 | Frame 0: real PT whistle, sprint at lens, "DEL → BOM · CANCELLED" e-ticket, big "₹5,400 का flight refund. 23 दिन से खो-खो।" |
| 2 | Pain truth | 5 | "Airline से पूछिए", "हमने refund भेज दिया", "Refund initiated", "पाँच-सात working days", "फिर से बताता हूँ", crouching into the line. |
| 3 | Emotion | 4 | Two real faces (shot 5, shot 13), but both are short and inside a comic skit; the laugh lands harder than the ache. |
| 4 | Product clarity | 4 | Four labelled states held 3 s+; the cut back to the ground (row 10) between Send and the reply splits the app story. |
| 5 | Honesty | 5 | Person taps Send (row 9); "Follow-up कब और किससे: Refund Genie याद रखता है"; no money-landed frame; "Skip ahead" banned. |
| 6 | Culture | 5 | Kho-kho with the legal pole turn, PT whistle, dhol, cutting chai. Original, unmistakably Indian. |
| 7 | Memorability | 5 | "इस खो-खो में कोई उठता नहीं।" and the sitter slapping empty air. |
| 8 | Producibility | 3 | Four classmates, campus permission, golden-hour window, 9 to 10 h over 2 to 3 days. Hardest of the three. |
| 9 | Hindi | 4 | Natural and short; row 4 runs over pace on a strict count (below). |
| 10 | CTA | 5 | URL spoken and held 4 s, "Free · No sign-up · OTP कभी नहीं". |

Consistency
- Amount and route match the sample (₹5,400, DEL → BOM). Good.
- Day counter: 23, 27, 31, 36, 41, then the card says "Overdue by about 7 working days". Day 41 would be about 15 working days overdue. A careful muted viewer can catch it, and it is free to fix.
- Pace recount: row 4 is "Refund initiated है। / खो! / पाँच-सात working days. / खो!" = 9 spoken words (पाँच-सात is said as two) in 3.3 s = 2.73/s. Every other row is at or under 2.5.
- Cutdown and posting copy match the app. "अब आप मत भागो" comes right after he presses Send himself, so it reads as "stop carrying it", not "Genie runs for you".

Must-fix (by impact)
1. Day counter, rows 3 and 4 and cutdown row 2: replace "दिन 27" with **"दिन 25"**; replace the row 4 flips "दिन 31", "दिन 36", "दिन 41" with **"दिन 27", "दिन 29", "दिन 30"**; cutdown row 2 flips to **"दिन 30"**. Self-check rule 8 line becomes "23, 25, 27, 29, 30".
2. Row 4 audio: delete the second AIRLINE "खो!". New line: **TRAVEL APP: "Refund initiated है।" AIRLINE: "खो!" TRAVEL APP: "पाँच-सात working days."** (8 words / 3.3 s = 2.42).

---

## C7 "Main Aapka Refund Hoon": 46/50, PASS

| # | Criterion | Score | Evidence |
|---|---|---|---|
| 1 | Hook | 4 | Airport chime, a potli turning to camera, "हैलो? मैं आपका रिफ़ंड हूँ।" with the "✈ DEL → BOM · CANCELLED" chip. Odd enough to stop a thumb, but the "cute toy" risk is real until the three-friend gate passes. |
| 2 | Pain truth | 5 | Ping-pong between doors, "Refund Processed ✓" sticker on money that never moved, "आप शुरू से बताइए। सातवीं बार।" |
| 3 | Emotion | 5 | Phone turned face down, "किसी ने मना नहीं किया। बस आप थक गए।", the lamp going out; relief face in the same frame as the low point. |
| 4 | Product clarity | 4 | Four app states plus Gmail Send, each 3 to 4 s, captions off the UI. Same ceiling as C1. |
| 5 | Honesty | 5 | Owner turns the phone over himself, presses Send on screen; ends on a face and the URL; demo later rounds banned. |
| 6 | Culture | 4 | Shagun potli, sarkari corridor, call-centre line, chai. Indian and original, but less instantly shared than kho-kho or toffee. |
| 7 | Memorability | 5 | "मैं आपका रिफ़ंड हूँ" bookended by "अब मुझे जाने मत देना।" |
| 8 | Producibility | 4 | Real potli, two locations, Ganesh plus one voice friend, about 5 h shoot plus 6 to 8 h edit. Needs a corridor with a bench and two doors. |
| 9 | Hindi | 5 | Every row recounted at or under 2.4/s; lean, speakable lines. |
| 10 | CTA | 5 | URL spoken and held 4 s, "फ़्री है", "No sign-up · No login · No OTP". |

Consistency
- ₹5,400, DEL → BOM and "Day 30" all match the 30 day sample and the "Overdue by about 7 working days" line. The best-aligned of the three.
- Day chips run 30 (row 2), then 22, 27 (row 5), then 30 (row 6b). On mute the counter visibly goes backwards.
- Row 12 SFX is "Mail ping as the card appears". Over a screen recording that reads as a push alert (rule 29).
- Cutdown row 4 puts "पहला mail: जहाँ booking की थी (Airline CC में)" on the Gmail compose, where To and CC are blurred, so the claim has no visible proof. With no card in the cutdown there is no "who owes" gap to explain, so the line is not needed.

Must-fix (by impact)
1. Row 12 SFX: replace "Mail ping as the card appears." with **"Soft paper rustle as the card appears (no ping, no chime)."**
2. Row 2 caption: delete the chip **"Day 30"** from row 2 (keep it on 6b). The counter then reads 22, 27, 30 in order.
3. Cutdown row 4 caption: delete **"+ small 'पहला mail: जहाँ booking की थी (Airline CC में)' (P)"**; keep "Mail जीनी लिखता है। Send आप दबाते हो।" and the "Sample case" chip.

---

## C10 "इस बार, टॉफ़ी नहीं": 45/50, PASS (with the most fixes)

| # | Criterion | Score | Evidence |
|---|---|---|---|
| 1 | Hook | 4 | Toffee dropped into a palm on a "✈ FLIGHT E-TICKET · CANCELLED" ticket, "छुट्टा नहीं है, टॉफ़ी ले लो।"; the big flight caption only lands at 1.0 s. |
| 2 | Pain truth | 5 | Each excuse is a toffee: "Refund initiated", "5-7 working days", "आप शुरू से बताइए", both sides of the blame loop. "बस message आते रहे" is the ledger exactly. |
| 3 | Emotion | 4 | Warm and wry; faces are only 2.2 s and 1.4 s. |
| 4 | Product clarity | 3 | Five app states in 17.4 s. Beat C holds the reply 2.4 s and the next mail 2.0 s. The key product caption shows for 1.4 s. Breaks rule 28 (max 4 states, each 3 s), though the self-check says PASS. |
| 5 | Honesty | 5 | Person presses Send; toffees keep arriving after Genie; khata writes the debt down, nothing is paid. |
| 6 | Culture | 5 | Toffee-for-change and the khata: every Hindi-speaking viewer has lived both. |
| 7 | Memorability | 5 | "इस बार, टॉफ़ी नहीं।" plus "बाकी ₹1". |
| 8 | Producibility | 5 | One table at home, one friend's hand, zero AI, no permission, daylight any time. |
| 9 | Hindi | 4 | Row 16 is 5 words in 1.8 s (2.78/s; script counts 4). Row 10's romanised line still says "Baarah hazaar" (old ₹12,400 amount). |
| 10 | CTA | 5 | URL spoken and held 4 s, "Domestic flights · Free · No login · OTP कभी नहीं". |

Consistency
- Counter reaches दिन 44 (row 7), then the card shows about 7 working days overdue. Same muted mismatch as C1, and worse.
- Section E keeps a "paste this full-facts mail" step with "Cancelled on [date about 44 days before recording]". The sample case is created with its own text and has no paste step. Anyone who follows this step ends up on the normal flow with made-up companies, which shows an empty To field (rule 23), and gets a different date. It must go.
- Romanised row 10 says "Baarah hazaar"; Ganesh records his own VO, so the audio could say twelve thousand under a ₹5,400 caption.
- "इस बार, टॉफ़ी नहीं" could read as "this time you get the money", but the khata ending and the toffee after Genie keep it honest. No fix needed. Cutdown and posting copy are clean.

Must-fix (by impact)
1. Rule 28: cut beat D (row 14) from the main cut. Make beat C two cuts: **13a, 3.2 s: "New reply from DemoTrips" card; 13b, 3.2 s: "Your next mail" To the Demo Air Nodal Officer, cropped just below "Open in Gmail"**, one caption across both: "जवाब पढ़ लिया। अगला mail: अब Airline को, तैयार।". Delete "One continuous slow scroll if it fits". Shift rows 15 to 18 earlier by 1.6 s (new length 46.6 s). Keep "Check-in की तारीख़ आपके calendar में" in the posting copy only.
2. Section E, "Before recording": delete the bullet that starts **"If the sample case asks for a cancellation mail, paste this full-facts text..."**, and delete the row 11 sub-beat **"22.8 to 23.4 SCREEN (only if the sample case has this step)..."** (give its 0.6 s to the card).
3. Day counter: row 6 **"दिन 27 / Day 27"**, row 7 **"दिन 30 / Day 30"**; section A and self-check "Pain spans 30 days".
4. Row 10 romanised: replace "Ek rupaye pe toffee chalti hai. Baarah hazaar pe nahin." with **"Ek rupaye pe toffee chalti hai. Paanch hazaar pe nahin."**
5. Row 16 pace: shot 16 becomes **2.0 s** and shot 17 **1.2 s** (5 words / 2.0 s = 2.5). Row 11 caption: hold **"Follow-up कब और किससे: Refund Genie याद रखता है।"** for the whole shot and drop the small "Mail paste करो, या screenshot डालो · No sign-up" line (the end card carries it). With fix 1, product clarity rises to 4 (total 46).

---

## Cross-check: claims and leaks (all three)
- No sending, calling or chasing on its own, no automatic reminder (after C7's ping fix), no guarantee, no real brand in any script. C1's line "cannot guarantee when a company pays" is worth copying into C7 and C10 posting copy.
- "Let Genie send" leak: all crop below "Open in Gmail"; C10's continuous scroll was the only leak path, and its fix 1 removes it.
- Shared watch item for the screenshots: the sample text says "PNR not supplied yet". If the case opens on a question instead of the card, do that step off camera, as C1's E step 3 says.

---

## Portfolio ranking and first video
Scores: C7 46, C1 45, C10 45 (46 after fixes). All three pass.

Make C10 first. It is one table, one friend's hand and daylight at home, with no classmates to schedule, no campus permission and no golden hour, so the live part can be shot today while Codex ships the sample case. Its toffee tags ("Refund initiated", "5-7 working days") read on mute in a second, and they are the most shared micro-details in the ledger. The five fixes above take under an hour of script and edit time. Make C7 next, the strongest piece of craft. Keep C1 for when classmates are free.

- Best for a GrowthX reviewer: **C1**. The kho-kho blame loop is the product insight (who to chase switches when they blame each other), and it shows ambitious live execution.
- Best for a stuck flyer scrolling on mute: **C10**. Universal kirana ritual plus burned-in excuse tags; frame 0 says flight.
- Fastest to produce: **C10** (about 10 h including edit, one helper, one location).
