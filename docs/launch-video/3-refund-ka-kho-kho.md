# C1 ROUND 4: "Refund ka Kho-Kho" (shoot-ready package)

Length: 46.6 s main cut, 20 s cutdown. Format: live skit on one ground (phone), 4 screen-recorded app states from the unlinked sample case, 1 end card. An optional mostly-AI route is in section J.
Tagline: **Refund का खो-खो? अब आप मत भागो।** ("Refund kho-kho? Stop running.")

All app captions are PROVISIONAL until Codex's screenshots (`docs/qa/video-sample-01-...png` onward) arrive. Final captions get written from those screenshots, not from this file (lesson 24).

---

## Round 4 changes

| # | Must-fix from R3 review | How it is resolved in round 4 |
|---|---|---|
| 1 | Demo Air contact gap (blank To, no CC, "No mail needed yet") | Resolved by APP-BEATS.md: record ONLY the unlinked sample case `refundgenie.app/start/?demo=flight-self`, where the first mail goes To the DemoTrips grievance role and CC the Demo Air Nodal Officer role. The "create the case yourself on the normal flow" path is deleted. The caption "पहला mail: जहाँ booking की थी (Airline CC में)" stays, but is provisional until the screenshot shows the CC role. Fallback caption written in E if CC is missing. |
| 2 | "Due about [date]" is wrong | Now "Due [date]" everywhere. Beat A highlights the card line "You booked on a travel site, so the airline is responsible for your refund.", which proves the VO "rule से साफ़". |
| 3 | Permission UI ("Let Genie send and follow up") | "Record before it ships" is deleted. Codex hides it on the sample case; as a second guard, every next-mail frame is cropped so its bottom edge sits just below "Open in Gmail". "give Genie written permission" and "So Ganesh can follow up" are also cropped or hidden. |
| 4 | Beat C path (calendar OAuth, paste box, inbox gating) | Google Calendar connect and the paste-reply path are both deleted. The reply comes from the sample case's demo desk in the same thread ("New reply from DemoTrips"), then the next mail To the Demo Air Nodal Officer. Calendar is out of the main cut (4-state cap); "Your check-in" is a listed swap only. Any "Does that look right?" confirm step is recorded and jump-cut. |
| 5 | Row 6 line "Follow-up ये याद रखेगा" (unclear "ये") | Review's fix "अब पीछा याद जीनी रखेगा" conflicts with rule 30 and APP-BEATS, so APP-BEATS wins: **"Follow-up कब और किससे: Refund Genie याद रखता है।"** Row stretched to 3.6 s so pace is 2.5 words/s. |
| 6 | Scope cue for real flyers | End card block 2 is now **"Domestic flight refund · Free · No sign-up · OTP कभी नहीं"**. The app-frame tag is now **"Sample case · नाम बदले हुए"** ("names changed") on every app frame. |
| 7 | Beat A crop ("Your first step", "What we understood" above the card) | Any PNR confirm or first-step block is handled off camera; the take starts with "Who owes you" as the top block (E, step 4). |

Also fixed (found while rewriting, or cheap nice-to-haves taken):
- **Amount and route now match the sample case.** The sample case in code is "Delhi to Mumbai, Demo Air, booked through DemoTrips, Rs 5,400". The story amount is now **₹5,400** and the e-ticket prop reads **DEL → BOM**, so a muted viewer never sees ₹18,600 in the skit and ₹5,400 on the card. Bonus: ₹5,400 is exactly the size of refund people give up on, so "छोड़ो। जाने दो।" lands harder.
- **Walk-off moved after Send** (nice-to-have 3): he presses Send, then stands up and stops running.
- **Kho-kho rule fixed** (nice-to-have 2): in shot 3 the runner goes round the end pole, the only legal way to turn, instead of reversing mid-line.
- **The whistle has a source** (nice-to-have 4): a PT-sir hand blows the whistle in frame 0. In shot 6 the same whistle is a time-out, and only the runner hears it, because in this game nobody else ever gets up.
- **Row 3 caption** now carries only the airline's line; the runner's "फिर से बताता हूँ..." is VO only (nice-to-have 1), and it adds the re-explaining pain the review found thin.
- **Never record the second demo reply** (found in code, `lib/demo.ts:43`): the round-2 demo reply says the refund was processed with a UTR, which reads as money landed (rule 2). Do not press "Skip ahead".
- **Judge fixes (R4 final):** day counters now run 23, 25, 27, 29, 30 to match the sample case (cancelled 30 days ago, "Overdue by about 7 working days"); row 4 drops the second AIRLINE "खो!" so it is 8 words in 3.3 s (2.42/s).
- Posting copy no longer says "next mail ready on the date" as a reminder promise (rule 29).

---

## A. The idea in one paragraph

Kho-kho is the PT-period game every 25 to 40 year old in Hindi India played: you tap a crouched player's back, say "खो!", and by the rules that player must get up and take over. Our flyer plays it correctly. He hands his refund to the Airline ("खो!"), and the Airline, instead of getting up, slaps it straight back without lifting its head. Same at the Travel App. Caption: "इस खो-खो में कोई उठता नहीं।" The broken rule is the joke, and it is the exact shape of the pain in our ledger: the travel app says "Airline से पूछिए" (4 of 15 public flight complaints), the airline says "हमने refund भेज दिया" ("refund processed" with no money, 7 of 29), and the tester retold his story on 7 to 8 calls over 3 weeks. Nobody refuses; he simply gets tired and crouches into the line himself (5 interviews: money is outlasted, not refused; "मना किसी ने नहीं किया। बस आप थक गए।"). A time-out whistle lifts only his head. Refund Genie does not beat the companies: it shows who is responsible under the DGCA rule (verified: for travel-site bookings the airline is responsible, due in 14 working days), writes the mail that he sends from his own Gmail, reads the reply, and remembers when and whom to ask next. He presses Send, walks off the field and drinks a chai while the sitters keep slapping empty air. The promise is honest and small: you stop running. Not: the money is guaranteed.

---

## B. Final script

Text rule for every row: at most TWO text layers at once. Layer 1 = one caption block (Devanagari line, small English line under it). Layer 2 = the day counter (live shots) or the "Sample case · नाम बदले हुए" tag (app shots). Never both counter and tag. No pop-up words, no chips. The thin highlight box on the card is a shape, not text.

Voices: RUNNER = Ganesh, breathless VO, never lip-synced. AIRLINE and TRAVEL APP = two classmates, flat bored IVR delivery, faces never shown. NARRATOR = a different, warm voice (classmate or AI Hindi voice, see F).

| # | Time | Shot description | Hindi line (Devanagari) | Romanised | English meaning | On-screen caption (Devanagari + small English) | SFX / music |
|---|---|---|---|---|---|---|---|
| 1 | 0:00.0-0:02.5 | HOOK. Low wide, phone at knee height. Frame 0: a PT-sir hand at the left edge, steel whistle at the lips' level, blowing (no face). Runner already mid-sprint toward lens in white formal shirt, loose tie, blank lanyard, phone at ear; in his other hand a printed A4 e-ticket facing camera, big "DEL → BOM" and red "CANCELLED" stamp. Ahead of him the kho-kho line, AIRLINE sitter crouched, back to camera. 0:01.0 he taps the AIRLINE sitter's back. 0:01.8 the sitter does not rise; without lifting his head his hand whips back and taps the runner. | RUNNER: "खो!" AIRLINE: "खो!" | "Kho!" / "Kho!" | "Kho!" (your turn) / "Kho!" (no, yours) | 0:00.0-0:02.2 (on frame 0): **₹5,400 का flight refund. 23 दिन से खो-खो।** / "₹5,400 flight refund. 23 days of kho-kho." Layer 2: counter "दिन 23" top-left. | Real steel PT whistle on frame 0. Two dry tap thuds (foley). |
| 2 | 0:02.5-0:06.5 | Locked-off wide. Runner stares at the unmoved sitter for half a second (the joke lands), jogs on through frame to the TRAVEL APP sitter, taps his back. The sitter, head down, slaps it back. | RUNNER: "खो!" TRAVEL APP: "Airline से पूछिए। खो!" | "Kho!" / "Airline se poochhiye. Kho!" | "Kho!" / "Ask the airline. Kho!" | 0:02.2-0:04.6: **इस खो-खो में कोई उठता नहीं।** / "In this kho-kho, nobody gets up." 0:04.6-0:06.5: **Airline से पूछिए।** / "Ask the airline." Counter "दिन 23". | Dhol/taal loop starts at 0:02.5, school sports-day feel. Tap thuds. |
| 3 | 0:06.5-0:10.2 | Wide from the end of the line: runner runs round the wooden end pole (the legal turn), phone at ear, back up the line to AIRLINE, taps. AIRLINE slaps back, head down. | RUNNER (VO, panting): "फिर से बताता हूँ..." AIRLINE: "हमने refund भेज दिया। खो!" | "Phir se bataata hoon..." / "Humne refund bhej diya. Kho!" | "Let me explain again..." / "We have sent the refund. Kho!" | **हमने refund भेज दिया।** / "We've sent the refund." (runner's VO is not captioned). Counter "दिन 25". | Tap thuds. Dhol continues. |
| 4 | 0:10.2-0:13.5 | Snap-cut montage, 4 cuts of about 0.8 s: tap, slap-back, pole turn, tie pulled off. Shirt untucks. Grade warms (edit). | TRAVEL APP: "Refund initiated है।" AIRLINE: "खो!" TRAVEL APP: "पाँच-सात working days." | "Refund initiated hai." "Kho!" "Paanch-saat working days." | "Refund initiated." "Kho!" "Five to seven working days." | **Refund initiated है।** / "Refund initiated." then **पाँच-सात working days।** / "5-7 working days." Counter flips "दिन 27", "दिन 29", "दिन 30". | Dhol speeds up a notch on the "खो!" and on each cut. |
| 5 | 0:13.5-0:18.0 | LOW POINT, FACE 1. Close-up: hands on knees, sweat, tired half-laugh, eyes drop. Cut to wide: he crouches into the line between the two sitters, head down, exactly like them. | RUNNER (VO, quiet): "चौवन सौ... छोड़ो। जाने दो।" | "Chauvan sau... chhodo. Jaane do." | "Fifty-four hundred... forget it. Let it be." | 0:13.5-0:15.5: **छोड़ो। जाने दो।** / "Forget it. Leave it." 0:15.5-0:18.0: **मना किसी ने नहीं किया। बस आप थक गए।** / "Nobody said no. You just got tired." Counter removed. | Dhol cuts dead at 0:13.5. Wind only. |
| 6 | 0:18.0-0:21.6 | Locked wide: three identical crouched backs. Off-screen, the PT whistle: a short time-out "phweet". Only HIS head lifts; he looks at the phone in his hand. Sitters do not move. | NARRATOR: "Follow-up कब और किससे: Refund Genie याद रखता है।" | "Follow-up kab aur kisse: Refund Genie yaad rakhta hai." | "When to follow up, and with whom: Refund Genie remembers." | **Follow-up कब और किससे: Refund Genie याद रखता है।** / "When and whom to follow up: Refund Genie remembers." | One short real whistle "phweet" (sound logo). |
| 7 | 0:21.6-0:25.1 | APP STATE 1, THE CARD (screen recording, full frame). "Who owes you: Demo Air", "⚠ Overdue", "Due [date]", and the line "You booked on a travel site, so the airline is responsible for your refund." Thin highlight box (shape only) around Who owes you + Overdue, then a second box on the "airline is responsible" line. Held 3.5 s. | NARRATOR: "किसकी ज़िम्मेदारी, कब तक: rule से साफ़।" | "Kiski zimmedaari, kab tak: rule se saaf." | "Whose responsibility, and by when: clear from the rule." | **किसकी ज़िम्मेदारी, कब तक: rule से साफ़।** / "Who is responsible, and by when: the rule says." Layer 2: tag "Sample case · नाम बदले हुए" top-right. | Soft UI tap. Dhol out, light room tone. |
| 8 | 0:25.1-0:28.1 | APP STATE 2, YOUR NEXT MAIL (screen recording). "Your next mail" with To (DemoTrips grievance role readable, domain blurred) and CC (Demo Air Nodal Officer role readable, domain blurred). Frame cropped just below "Open in Gmail". Touch dot taps "Open in Gmail" at 0:27.4. | NARRATOR: "पहला mail वहीं, जहाँ booking की थी।" | "Pehla mail wahin, jahaan booking ki thi." | "The first mail goes where you booked." | **पहला mail: जहाँ booking की थी (Airline CC में)** / "First mail: where you booked (Airline in CC)" (PROVISIONAL, see E). Tag. | Tap. |
| 9 | 0:28.1-0:30.6 | GMAIL SEND (screen recording). Gmail compose, prefilled To, CC, subject; domains and test account blurred. Touch dot presses Send; "Sent" toast. | NARRATOR: "आप बस send दबाओ।" | "Aap bas send dabao." | "You just press send." | **Mail जीनी लिखता है। Send आप दबाते हो।** / "Genie writes the mail. You press send." Tag. | Generic soft send whoosh. |
| 10 | 0:30.6-0:33.4 | Back on the ground, wide, 60 fps slowed slightly. He pockets the phone, stands up out of the line and walks toward camera. Behind him the AIRLINE sitter, head still down, slaps empty air where he was. | NARRATOR: "तो भाग आप क्यों रहे हो?" AIRLINE: "खो!" | "Toh bhaag aap kyun rahe ho?" / "Kho!" | "So why are you the one running?" / "Kho!" | **तो भाग आप क्यों रहे हो?** / "So why are you the one running?" | Comic whoosh on the empty slap. |
| 11 | 0:33.4-0:36.6 | APP STATE 3, REPLY READ (screen recording). "New reply from DemoTrips" with its one-line summary (refund pending with Demo Air). Held 3.2 s. Any "Does that look right?" confirm is jump-cut out. | NARRATOR: "जवाब आया? जीनी ने पढ़ लिया।" | "Jawaab aaya? Genie ne padh liya." | "A reply came? Genie read it." | **जवाब पढ़ लिया: "Airline के पास pending है।"** / "Reply read: 'pending with the airline.'" (PROVISIONAL). Tag. | Soft paper rustle. |
| 12 | 0:36.6-0:39.6 | APP STATE 4, NEXT MAIL READY (screen recording). "Your next mail", now To the Demo Air Nodal Officer role (domain blurred), cropped just below "Open in Gmail". Held 3 s. | NARRATOR: "अगला mail: अब airline को। तैयार।" | "Agla mail: ab airline ko. Taiyaar." | "Next mail: to the airline now. Ready." | **अगला mail: अब Airline को, तैयार।** / "Next mail: to the airline now, ready." (PROVISIONAL). Tag. | Single soft tick. |
| 13 | 0:39.6-0:42.6 | RELIEF, FACE 2. Edge of the ground, golden light, mid close-up: he sits on a plastic chair, sips a cutting chai, exhales, small smile; phone face-down on his knee. Deep background, soft focus: both sitters still slapping empty air. | NARRATOR: "Refund का खो-खो? अब आप मत भागो।" SITTERS (faint): "खो!... खो!" | "Refund ka kho-kho? Ab aap mat bhaago." | "Refund kho-kho? Stop running." | Large: **Refund का खो-खो? अब आप मत भागो।** / "Refund kho-kho? Stop running." | Dhol returns, slow and relaxed. Faint background "खो!" |
| 14 | 0:42.6-0:46.6 | END CARD. Warm off-white paper texture, serif type like the app. URL held the full 4 s. | NARRATOR: "Cancellation mail paste करो। Free है। refundgenie.app" | "Cancellation mail paste karo. Free hai. Refund genie dot app" | "Paste your cancellation mail. It's free. refundgenie.app" | Block 1 (largest): **refundgenie.app**. Block 2: **Domestic flight refund · Free · No sign-up · OTP कभी नहीं**. Block 3 (small): **Cancellation mail paste करो, या screenshot डालो।** | Single whistle "phweet" at 0:42.6, dhol tail out. |

**Pace (max 2.5 spoken words/s, every row recounted):** row 1 = 2/2.5 (0.8); row 2 = 5/4.0 (1.25); row 3 = 4+5 = 9/3.7 (2.43); row 4 = 8/3.3 (2.42, पाँच-सात counted as two words); row 5 = 5/4.5 (1.1); row 6 = 9/3.6 (2.5); row 7 = 7/3.5 (2.0); row 8 = 7/3.0 (2.33); row 9 = 4/2.5 (1.6); row 10 = 7/2.8 (2.5); row 11 = 5/3.2 (1.56); row 12 = 6/3.0 (2.0); row 13 = 7/3.0 (2.33); row 14 = 10/4.0 (2.5, URL counted as 4 words "refund genie dot app"). All at or under 2.5. "Refund Genie" is spoken in row 6 and again in the URL in row 14.

**App section:** 4 app states (rows 7, 8, 11, 12), one state per cut, each held 3 s or more; the Gmail compose (row 9) is Gmail, not an app state. Total app time 15.2 s.

---

## C. Storyboard

Main live route: no shot is AI-generated. Every shot is LIVE (phone, vertical 4K), SCREEN (phone screen recording of the sample case) or EDIT (CapCut card). The mostly-AI route for the live shots is in J. App states are never AI-generated in either route.

**Shot 1. Hook sprint and tap (2.5 s).** Framing: low wide. Camera: on a small tripod or bag at knee height, 1.5 m in front of the AIRLINE sitter, locked off; runner sprints from 10 m behind straight at lens, tap happens 2 m from lens. In frame: PT-sir hand with a steel whistle on a red cord at the left edge for the first 0.6 s (classmate C, no face; hand drops out of frame after the blow); runner (shirt, tie, lanyard, phone at ear, A4 e-ticket held flat toward camera so "DEL → BOM · CANCELLED" reads in frame 0); AIRLINE sitter crouched with "AIRLINE" A4 on his back; two unlabelled sitters further down the line in soft focus. Performance: runner urgent but polite, open-palm tap, "खो!"; sitter keeps head down, bored, flicks his hand back and taps the runner's forearm without looking. Source: LIVE. 60 fps. 8 to 10 takes; start recording with the runner already moving so frame 0 has motion.

**Shot 2. "Nobody gets up" beat and jog to TRAVEL APP (4 s).** Framing: wide. Camera: locked off at chest height, side-on, both sitters in frame 4 m apart. In frame: runner freezes, looks down at the AIRLINE sitter (half a second, slight head tilt of disbelief), jogs on in the same direction to the TRAVEL APP sitter, taps. Performance: the stare is the comic beat; do not overplay. TRAVEL APP sitter slaps back with a lazy flick. Source: LIVE.

**Shot 3. Round the pole, back to AIRLINE (3.7 s).** Framing: wide. Camera: locked off near the end pole, looking back up the line. In frame: runner reaches the wooden end pole, swings round it with one hand on it (the legal kho-kho turn), runs back up the line, phone at ear, free hand gesturing as if explaining the booking again; AIRLINE sitter ahead. Performance: no lip-sync (VO is added). Source: LIVE. Speed up 1.15x in edit.

**Shot 4. Montage pieces (3.3 s total, 4 cuts).** Framing: inserts and close. Camera: handheld, 0.5 m from action. Pieces: (a) runner's palm tapping a back, (b) sitter's hand flicking back, (c) hand on the pole, swinging round, (d) tie pulled off and dropped. Performance: each cut slightly more tired; untuck the shirt between takes. Source: LIVE. Shoot 6 to 8 one-second pieces.

**Shot 5. Low point face, then crouch (4.5 s).** Framing: close-up (2 s), then wide (2.5 s). Camera: close-up from 1 m, eye level, focus locked on eyes; wide locked off from shot 2's position. In frame: sweat, tired half-laugh, eyes drop; then he lowers himself into the gap between the two sitters, facing the alternate direction like a real kho-kho line, head down, phone in hand. Performance: no words on camera. Think of a real call where you gave up; breathe out before the laugh. Source: LIVE. 5 takes of the face. 60 fps for the crouch.

**Shot 6. Time-out whistle, head lift (3.6 s).** Framing: wide, locked. Camera: same as shot 5 wide. In frame: three crouched backs; on the off-screen whistle only his head lifts, he looks at the phone in his hand. Sitters must not move at all. Performance: small, curious lift; not a heroic jump. Hold the end of the take so the 3.6 s fits the narrator line. Source: LIVE.

**Shot 7. App state 1, the card (3.5 s).** Full-screen phone recording. In frame: "Who owes you: Demo Air", "⚠ Overdue", "Due [date]", "You booked on a travel site, so the airline is responsible for your refund." Nothing above "Who owes you" (see E step 4). Source: SCREEN.

**Shot 8. App state 2, your next mail (3 s).** Full-screen recording, cropped in CapCut so the bottom edge sits just below "Open in Gmail". In frame: "Your next mail", To and CC with roles readable, the tap. Source: SCREEN.

**Shot 9. Gmail send (2.5 s).** Full-screen recording. In frame: Gmail compose, prefilled; Send tap; "Sent" toast. Source: SCREEN.

**Shot 10. Walk-off and empty slap (2.8 s).** Framing: wide to mid as he approaches. Camera: locked off at chest height, 5 m in front of the line; he walks toward lens. In frame: runner pockets the phone, rises out of the line, rolls his shoulders; behind him the AIRLINE sitter's hand whips out and taps empty air. Performance: runner does not look back. Sitter slaps 0.5 s after the runner's body leaves the spot. Source: LIVE, 60 fps.

**Shot 11. App state 3, reply read (3.2 s).** Full-screen recording. In frame: "New reply from DemoTrips" and its summary line. Source: SCREEN.

**Shot 12. App state 4, next mail ready (3 s).** Full-screen recording, cropped just below "Open in Gmail". In frame: "Your next mail" To the Demo Air Nodal Officer role. Source: SCREEN.

**Shot 13. Relief face, chai (3 s).** Framing: mid close-up, chest up, slightly off-centre so the line shows over his shoulder. Camera: locked, eye level, 1.5 m away, 2x lens for background blur; sitters 15 to 20 m behind. In frame: plastic chair, cutting chai glass, phone face-down on knee, golden backlight. Performance: first sip, exhale through the nose, small private smile, eyes go to the horizon. Background sitters keep tapping air on a slow rhythm. Source: LIVE. Golden window, 5 takes.

**Shot 14. End card (4 s).** Source: EDIT (CapCut text on a paper texture; optional AI paper texture prompt in J).

---

## D. Shoot-day plan

**Cast (4 people, plus Ganesh):**
- Runner: Ganesh (nameless flyer, never introduced as founder). A classmate stand-in locks each frame first, then Ganesh steps in and checks takes between setups.
- AIRLINE sitter: classmate A. TRAVEL APP sitter: classmate B. Faces never shown, heads down throughout.
- Camera, PT-sir hand and whistle: classmate C (only the hand is ever in frame).
- Optional: classmate D as two extra unlabelled sitters further down the line, and as the NARRATOR voice if his Hindi voice is warm.

**Props (rough cost):**
| Item | Cost |
|---|---|
| White formal shirt, tie, trousers, formal shoes (own) | Rs 0 |
| Blank lanyard and blank white ID card | Rs 50 |
| Two plain T-shirts, khaki and grey (avoid indigo, blue, red-and-white, orange-and-black: they read as airline colours) | Rs 0 to 300 |
| A4 prints: "AIRLINE", "TRAVEL APP" in bold black sans-serif; e-ticket sheet "E-TICKET · DEL → BOM" with no airline name or logo | Rs 20 |
| Red "CANCELLED" stamp effect (red marker or a Rs 60 self-ink stamp) | Rs 0 to 60 |
| End pole: a 1.2 m bamboo or PVC pipe standing in a bucket of sand (or the ground's real kho-kho pole if it has one) | Rs 0 to 120 |
| Safety pins | Rs 10 |
| Steel PT whistle on a red cord | Rs 60 |
| Plastic chair (borrowed from canteen) | Rs 0 |
| Cutting chai x 3 (takes) | Rs 45 |
| Small phone tripod or a stack of books | Rs 0 to 300 |
| **Total** | **about Rs 200 to 970** |

**Location:** one, the campus ground. Ask campus admin in writing first. Frame out every institute name, logo, signboard and bystander.

**Order of shots (sun-driven):**
| Time | Shots | Why |
|---|---|---|
| 3:30-3:45 pm | Setup, stand-in locks shots 1, 2, 3 frames, chalk marks, plant the pole | |
| 3:45-4:30 pm | 1, 2, 3, 4 (sprints, taps, pole turn, montage) | Pain section can take harder light; grade warms it in edit |
| 4:30-5:20 pm (golden window) | 13 (relief face) first, then 5 (low point face and crouch), 6 (head lift), 10 (walk-off and empty slap) | Faces get the best light |
| 5:20-5:40 pm | Pickups, 60 s ground ambience, real whistle recorded 5 times close to the phone | |
| Next day, 1 hour, quiet room or wardrobe | All VO and sitter lines (5 takes each), runner lines after jogging on the spot | |
| Only after Codex's screenshots arrive, 60 to 90 min | Screen recording (E) | Captions are rewritten from the screenshots first |

**Time estimate:** shoot 2 h plus 1 h buffer; audio 1 h; screen recording 1 to 1.5 h (depends on how long the demo reply takes); edit 4 h. About 9 to 10 hours over two to three days, of which 2 to 3 hours need classmates.

**Camera settings:** vertical 9:16, 4K 30 fps (60 fps for shots 1, 5 crouch, 10). Long-press to lock exposure and focus. Clean the lens. No live dialogue used, so wind only affects ambience.

**Consent note:** get a short written OK (WhatsApp is fine) from each classmate: they agree to appear (faces hidden) and to their voices being used in Refund Genie posts on Instagram, YouTube and X, and can ask for removal later. Keep the campus permission message and the music licence pages. Use only Ganesh's own test Gmail account on screen. Do not film strangers; reshoot or crop any identifiable bystander.

**Safety:** taps are a light open palm on the upper back; the thud is foley. Water on set; no sprinting on wet ground; the pole must be stable before anyone swings round it.

---

## E. Screen recording checklist (source and beats from APP-BEATS.md)

**Blocker:** do not record anything until Codex ships `/start/?demo=flight-self` (prompt `docs/hq/codex-prompts/2026-10-12-sample-case-for-video.md`) and its screenshots `docs/qa/video-sample-01-...png` onward are in the repo. Then rewrite every PROVISIONAL caption in B and G from those screenshots, word for word against what is on screen.

**Recording source (the only one allowed)**
- Record ONLY the unlinked sample case at `refundgenie.app/start/?demo=flight-self`. It is the older flight demo: you tap "Open in Gmail" and press Send in your own Gmail; a demo desk replies in the same thread. The app shows its own honest label "Demo · <code>" and "The companies are pretend. Everything Refund Genie does is real." Keep those if they are in frame; the CapCut tag "Sample case · नाम बदले हुए" goes on every app frame on top.
- NEVER record: the public chase demo (`/start/?demo=flight`), the homepage (names real airlines), a normal case with made-up companies (shows an empty To field), or `/sample`.
- There is no "create the case yourself" path and no "paste the reply" path in this film. Both are deleted.

**Never on screen (crop or stop and re-take)**
- "Let Genie send and follow up", "give Genie written permission", "So Ganesh can follow up", any call or "Genie is on it" chase line, "Who has your money now", "It's in" / "Money landed", the paywall card, the browser address bar, full email addresses (blur the domain part only, keep role names readable), a phone lighting up by itself.
- Codex hides the permission elements on this demo. Even so, crop every "Your next mail" frame in CapCut so the bottom edge sits just below "Open in Gmail".
- Never build or retouch an app or calendar screen in CapCut. Crops, blurs, the highlight boxes and the tag are the only overlays.

**Phone setup**
- Fresh browser profile (or a fresh incognito-free profile) on Phone B, not your personal phone if possible. Do Not Disturb on, battery above 50%, clean status bar, plain wallpaper.
- Android: Developer options > Show taps on. iPhone: no native touch dots; move fingers slowly, or record from a desktop browser in a 375 px phone-size view with a cursor highlight.
- Browser zoom so card text is large; portrait. Hide the address bar (scroll so it collapses, or crop it).
- Gmail test account A signed in (the sender). Not Ganesh's personal account.

**What to record, state by state**
1. Open `refundgenie.app/start/?demo=flight-self` OFF camera (the start page and loading are not in the film).
2. Write down what the sample case really says: amount (code says Rs 5,400), route (code says Delhi to Mumbai), the "Due [date]", and the exact "Overdue by about N working days". If the amount or route differs from ₹5,400 / DEL → BOM, change the hook caption, the e-ticket prop and the row 5 VO to match before the shoot.
3. If the page shows "Your first step", "What we understood" or a PNR confirm above the card, complete it OFF camera.
4. **State 1, the card.** Start recording with "Who owes you" as the top block on screen. Hold 5 s on: "Who owes you: Demo Air", "⚠ Overdue", "Due [date]", and "You booked on a travel site, so the airline is responsible for your refund." Do not scroll to anything else.
5. **State 2, your next mail.** Scroll to "Your next mail". Hold 4 s so To (DemoTrips grievance role) and CC (Demo Air Nodal Officer role) are readable. Tap "Open in Gmail" slowly.
6. **Gmail.** Record the prefilled compose for 3 s (To, CC, subject visible). Do NOT edit To or CC: on this demo the role addresses are meant to be sent to. Tap Send; hold on the "Sent" toast 2 s.
7. Back in the app, tap "Yes, I've sent it" OFF camera or jump-cut it.
8. Wait for the demo desk reply (Codex reports the real time from Send to reply). Do not refresh in a way that shows the address bar.
9. **State 3, reply read.** Record "New reply from DemoTrips" and its summary line for 5 s. If a "Does that look right?" confirm appears first, record it, confirm, and jump-cut it out in edit.
10. **State 4, next mail ready.** Scroll to "Your next mail", now To the Demo Air Nodal Officer role. Hold 5 s. Do not tap.
11. STOP. Do NOT press "Skip ahead". The second demo reply says the refund was processed with a bank reference, which reads as money landed (rule 2) and must never be recorded.
12. Optional swap only (state D, not in the main cut): "Your check-in: [date]" card, or the downloaded calendar event titled "Refund Genie refund check-in" opened by hand in the phone calendar. Use it only if states 3 and 4 turn out to share one frame, so the total stays at 4 states. Caption: **Check-in की तारीख़ आपके calendar में।** / "The check-in date goes in your calendar."

**What to blur (CapCut mosaic, tracked)**
- Domain part of every email address in the card, Gmail To/CC and the reply header (role names stay readable).
- Ganesh's test account address and avatar in Gmail.
- The browser address bar if it ever appears (the case link gives access to the case).
- Any notification from a real app.

**"Sample case · नाम बदले हुए" tag:** small cream pill (#FDF1DC fill, dark ink #2B2118, 30 px), top-right, x about 760 to 1000 px, y about 250 to 310 px in a 1080x1920 frame, on EVERY app frame in rows 7, 8, 9, 11, 12 and in the cutdown.

**Caption check against the screenshots (fill in before editing)**
- [ ] State 1 shows "Who owes you: Demo Air", "⚠ Overdue", "Due [date]" (not "Due about") and the "airline is responsible" line. If any differ, caption what is there.
- [ ] State 2 shows To = DemoTrips grievance role and CC = Demo Air Nodal Officer role. If CC is missing, change row 8 caption to **पहला mail: जहाँ booking की थी** / "First mail: where you booked" and drop "(Airline CC में)".
- [ ] Nothing below "Open in Gmail" in the same card after the crop.
- [ ] State 3 header wording: is it exactly "New reply from DemoTrips"? Copy the summary line; row 11 caption must match its meaning (code reply: "Your refund of Rs 5400 is pending with Demo Air").
- [ ] State 4: next mail To the Demo Air Nodal Officer role. If it says something else, caption that.
- [ ] No green "received" state, no money-landed wording, nothing showing Genie sending on its own, no real brand, in any recorded frame.
- [ ] Text readable at phone size in a 9:16 frame.

If any box fails, do not mock the screen. Caption what the app really shows, or ask Claude HQ.

---

## F. Edit plan in CapCut

**Project:** 1080x1920, 30 fps. Export 1080p, 30 fps, high bitrate. Make the 46.6 s cut first, then duplicate for the 20 s cutdown.

**Order:** 1. Lay the VO track and whistle first. 2. Cut live shots to the VO and on the tap/slap motion (tap thud lands on the cut). 3. Drop in screen recordings, jump-cut so each app state holds 3 s or more; crop every "Your next mail" frame just below "Open in Gmail". 4. Blurs (tracked mosaic). 5. Captions. 6. Counter, highlight boxes and the tag. 7. Grade: neutral for shots 1 to 3, warm progressively through shot 4, golden for 5 to 13. Do not grade the screen recordings. 8. Music and SFX mix. 9. Watch muted once on a phone, then with sound.

**Caption style**
- Font: Noto Sans Devanagari Bold or Mukta Bold; English line in the same family, Regular.
- Sizes (1080x1920): hook caption at 88 to 96 px Devanagari; normal captions 64 to 72 px Devanagari, 34 to 38 px English; tagline in row 13 at 80 px; end card URL at 110 px.
- Colour: white with a soft dark shadow (40%) on live shots; dark ink #2B2118 on a cream #FDF1DC rounded box over screen recordings.
- Placement: caption block centred, bottom edge at about y 1400 px. Reels safe zone: nothing above y 250 px, nothing below y 1500 px, nothing in the right 140 px below y 1000 px. The hook caption may sit higher, centred at y 700 to 900 px.
- On app frames, place the caption box so it never covers the line it describes (move it to the upper or lower third as needed).
- Highlight boxes (row 7): 4 px amber #B26A00 rounded rectangle, no fill, no text.
- Day counter: top-left, x 80 px, y 260 px, amber #8A5300 on a #FDF1DC pill, 40 px. Live rows 1 to 4 only.
- Two-layer check on every frame: one caption block plus counter OR tag. Never three.
- Each caption on screen at least 1.8 s; captions match the spoken words or the screen.

**Music and SFX (royalty-free with a commercial licence; save the licence pages)**
- Dhol/taal loop, mid tempo, plus a slower relaxed variation for row 13 (CapCut commercial-use library, Pixabay Music, Uppbeat, YouTube Audio Library). Search "Indian percussion dhol loop", "taal groove".
- Whistle: the real steel whistle recorded on set (owned sound logo), used at 0:00, 0:18 and 0:42.6.
- Tap thuds: foley, slap a thigh or a cushion close to the phone.
- Whoosh (empty slap, send): generic CapCut library whoosh.
- No phone notification sound anywhere (rule 29).
- Ground ambience: wind and distant birds from the set.
- Mix: VO on top, music ducked 8 to 10 dB under VO, whistle loud and clean. About -14 LUFS.

**Voice**
- RUNNER: Ganesh, recorded right after jogging on the spot.
- NARRATOR: a different voice. First choice: a classmate with a warm, calm Hindi voice. Fallback: an AI Hindi voice (Higgsfield audio or ElevenLabs Multilingual), warm, 30s, slow. Check it says "जीनी" as "Jee-nee", "Refund Genie" clearly, and "refundgenie.app" as "refund genie dot app".
- Phone voice memo 15 cm from the mouth in a wardrobe or small room full of clothes. CapCut noise reduction on.

---

## G. 20 s cutdown

Keeps: the correct kho-kho joke, both faces, the memory claim, the Send tap, "Refund Genie" spoken, URL held 4 s.

| # | Time | Shot | Hindi line | Caption (Devanagari + small English) | SFX |
|---|---|---|---|---|---|
| 1 | 0:00.0-0:02.5 | Shot 1 hook: whistle hand, sprint with e-ticket, tap, slap-back | RUNNER "खो!" AIRLINE "खो!" | Frame 0: **₹5,400 का flight refund. 23 दिन से खो-खो।** / "₹5,400 flight refund. 23 days of kho-kho." Counter "दिन 23" | Whistle, thuds |
| 2 | 0:02.5-0:05.0 | Montage: 2 cuts (TRAVEL APP slap-back, pole turn) | TRAVEL APP: "Refund initiated है। खो!" | **इस खो-खो में कोई उठता नहीं।** / "In this kho-kho, nobody gets up." Counter flips to "दिन 30" | Dhol |
| 3 | 0:05.0-0:07.5 | Shot 5: low point face, crouch | RUNNER: "छोड़ो। जाने दो।" | **छोड़ो। जाने दो।** / "Forget it. Leave it." | Dhol stops, wind |
| 4 | 0:07.5-0:11.1 | Shot 6: time-out whistle, head lifts | NARRATOR: "Follow-up कब और किससे: Refund Genie याद रखता है।" | **Follow-up कब और किससे: Refund Genie याद रखता है।** / "When and whom to follow up: Refund Genie remembers." | Whistle |
| 5 | 0:11.1-0:14.1 | App state 2: Your next mail, To and CC, tap "Open in Gmail" (cropped below the button) | NARRATOR: "पहला mail वहीं, जहाँ booking की थी।" | **पहला mail: जहाँ booking की थी (Airline CC में)** / "First mail: where you booked (Airline in CC)" (PROVISIONAL). Tag "Sample case · नाम बदले हुए" | Tap |
| 6 | 0:14.1-0:16.0 | Gmail compose, Send tap, "Sent" toast | NARRATOR: "आप बस send दबाओ।" | **Mail जीनी लिखता है। Send आप दबाते हो।** / "Genie writes the mail. You press send." Tag | Send whoosh |
| 7 | 0:16.0-0:20.0 | Shot 13 relief face with chai in the top half; URL card in the lower half | NARRATOR: "अब आप मत भागो। refundgenie.app" | Block 1 (largest): **refundgenie.app**. Block 2: **Domestic flight refund · Free · No sign-up · OTP कभी नहीं** | Whistle, dhol tail |

Pace: row 1 = 2/2.5; row 2 = 4/2.5 (1.6); row 3 = 3/2.5 (1.2); row 4 = 9/3.6 (2.5); row 5 = 7/3.0 (2.33); row 6 = 4/1.9 (2.1); row 7 = 8/4.0 (2.0). All at or under 2.5. The cutdown has one app state (Your next mail) plus the Gmail send, so the "Who owes you" card and the reply are left for the full cut.

---

## H. Posting copy

**Cover hook text (one line, large, on the frame-0 still):**
23 दिन से refund का खो-खो?

**Instagram caption (Hindi + English):**
23 दिन। हर call पर पूरी कहानी शुरू से। App कहता है airline से पूछो, airline कहती है हमने भेज दिया। इस खो-खो में कोई उठता नहीं।
Refund Genie बताता है rule के हिसाब से ज़िम्मेदारी किसकी है और refund कब तक देना था। Mail जीनी लिखता है, आप अपने Gmail से send करते हो। जवाब आए तो पढ़कर बताता है अब किसे लिखना है, और check-in की तारीख़ आपके calendar में।
Cancellation mail paste करो, या screenshot डालो। Free है। कोई sign-up नहीं, OTP कभी नहीं।

23 days. The whole story, every call. The app says ask the airline, the airline says it already sent it. In this kho-kho, nobody gets up.
Refund Genie tells you who is responsible under the DGCA rule and when the refund was due, writes the mail you send from your own Gmail, reads the reply, tells you whom to write next, and gives you a check-in date for your calendar.
For domestic flight refunds. Paste your cancellation mail or a screenshot at refundgenie.app. Free until 3 of your refunds land, then ₹49 a year. No sign-up, no airline login, never asks for OTP, card or bank details.
Sample case shown; the companies in the video are made up. Refund Genie helps you ask the right people at the right time; it cannot guarantee when a company pays.

**Hashtags (5):** #FlightRefund #RefundStuck #KhoKho #TravelIndia #RefundGenie

**First comment (pin it):**
कैसे काम करता है: 1) Cancellation mail paste करो या screenshot डालो 2) देखो ज़िम्मेदारी किसकी है और refund कब तक देना था 3) Mail जीनी लिखता है, आप अपने Gmail से send करो 4) जवाब आए तो जीनी पढ़कर बताता है अब किसे लिखना है, अगला mail तैयार। Check-in की तारीख़ आपके calendar में। आपका refund कितने दिन से अटका है? refundgenie.app

(Do not tag Ganesh as the founder in the post or comment. If the mostly-AI route in J is used, switch on the platform's AI-content label.)

---

## I. Final self-check against hard rules 1 to 31

1. Agency honesty: Genie shows, writes, reads, remembers; the person taps Send on screen (row 9); the whistle moves only the runner and stops no company. PASS.
2. No money-landed ending: ends on chai and the next mail ready; "Skip ahead" and the round-2 "processed" reply are banned in E. PASS.
3. Effect not intent: "मना किसी ने नहीं किया। बस आप थक गए।"; sitters show behaviour, never motive. PASS.
4. Blame loop staged correctly: card "Who owes you: Demo Air"; reply "pending with Demo Air" leads to the next mail to the Demo Air Nodal Officer; no "money is with" line. PASS (provisional on screenshots).
5. App section labelled, readable, held 3 s+: card, Send in Gmail, reply read and next mail; English UI with Hindi captions; tag on every app frame. PASS.
6. Screen recording source: superseded by rule 23 and APP-BEATS; only `/start/?demo=flight-self`. PASS.
7. Muted-first hook: frame 0 caption "₹5,400 का flight refund. 23 दिन से खो-खो।"; "Refund initiated" and "पाँच-सात working days" in the montage. PASS.
8. Day counters: 23, 25, 27, 29, 30, all past the about-20-calendar-day due point and consistent with the sample case (cancelled 30 days ago, card shows "Overdue by about 7 working days"). PASS.
9. Names and amounts: no UdanTrip, no real brand, ₹5,400 (not 15,000), DEL → BOM matches the sample case. PASS.
10. Producibility: live, one location, no AI character in the main route, no lip-sync, real props; about 9 to 10 hours. PASS.
11. Hindi pace and spelling: every row at or under 2.5 words/s (recounted); जीनी throughout; "Leave it", not "Let it go". PASS.
12. Founder: Ganesh plays a nameless flyer; second-person narration; not tagged. PASS.
13. Demo label and CTA: "Sample case · नाम बदले हुए" on every app frame; "Free है"; URL held 4 s and spoken. PASS.
14. Culture: kho-kho (with the legal pole turn), PT whistle, dhol, cutting chai; no TV-serial look, no sacred object. PASS.
15. Who-owes vs first-mail gap: row 8 caption "पहला mail: जहाँ booking की थी (Airline CC में)", with a written fallback if CC is not shown. PASS.
16. Record, don't mock: all app states recorded from the sample case; tag on payoff frames; domains blurred. PASS.
17. Face twice: low point (shot 5) and relief (shot 13), also in the cutdown. PASS.
18. Frame 0 says flight: "flight refund" caption plus the "DEL → BOM · CANCELLED" e-ticket. PASS.
19. Value = memory of the follow-up: the first product line is "Follow-up कब और किससे: Refund Genie याद रखता है।" PASS.
20. Cultural mechanics right: the runner gives the kho, turns only at the pole; sitters break the rule by not rising, and that is the captioned joke. PASS.
21. Time span: the after-Genie span is one evening; no season change. PASS.
22. "Refund Genie" said aloud: row 6 (and row 4 of the cutdown). PASS.
23. Made-up company on the normal flow: not used; sample case only. PASS.
24. Script the app from the code, then from screenshots: captions marked PROVISIONAL, rewrite step written into E. PASS (pending screenshots).
25. Exact labels: "Who owes you", "⚠ Overdue", "Due [date]", the "airline is responsible" line, "Your next mail", "Open in Gmail", "Yes, I've sent it", "New reply from", "Your check-in", "Refund Genie refund check-in". PASS.
26. "New reply from" only through the case thread: the reply comes from the demo desk in the same thread; no paste path; "Does that look right?" jump-cut. PASS.
27. Crop just below "Open in Gmail" on every next-mail frame; permission lines and "So Ganesh can follow up" never shown. PASS.
28. One state per cut, max 4: card, next mail, reply read, next mail ready; check-in is a swap only. PASS.
29. Calendar is a one-time file: no reminder promise, no phone lighting up, no notification sound; posting copy says "check-in की तारीख़ आपके calendar में". PASS.
30. No "पीछा याद रखता है": the safe line "Follow-up कब और किससे: Refund Genie याद रखता है।" is used; "screenshot डालो", "mail paste करो". PASS.
31. Recording hygiene: fresh browser profile, sample case only, no homepage, no answer chips with real brands (the sample case states every fact). PASS.

---

## J. Production in Higgsfield / Google Flow (optional mostly-AI route)

**Short answer:** the live route above is still the safest way to a good film. A mostly-AI route is possible because the script has no lip-sync (all speech is VO or off-screen), the sitters never show faces, and there is one main character. But the two things that make this film work, a hand tapping a back and a hand flicking back without the head moving, are exactly what AI video does worst. The recommended AI version is a hybrid: AI for the wide, atmospheric and face shots, real phone inserts for hands and the e-ticket, and the screen recordings always real.

**What stays real in every route**
- All app frames (rows 7, 8, 9, 11, 12): screen recordings of the sample case only. Never AI (rule 16).
- All voices: Ganesh plus the narrator (a classmate or an AI Hindi voice).
- The whistle, tap thuds and captions; the end card text.
- The e-ticket and the "AIRLINE" / "TRAVEL APP" labels: AI cannot write readable text. Either shoot a real 1 s insert of the printed e-ticket, or add the text in CapCut as tags.

**Route map**
| Row | Shot | Live route | Mostly-AI route | AI risk |
|---|---|---|---|---|
| 1 | Hook sprint and tap | Live | AI wide sprint (prompt J2) + a live 0.8 s hand-tap insert, or fully live | High: contact, motion toward lens |
| 2 | Stare, jog, tap | Live | AI (J3) | High: sitter may stand up |
| 3 | Round the pole | Live | AI (J4) | Medium |
| 4 | Montage inserts | Live | Keep live (hands, tie): 20 minutes with one classmate | AI hands fail |
| 5 | Low point face, crouch | Live | AI (J5a face, J5b crouch) | Low for the face, medium for the crouch |
| 6 | Head lift | Live | AI (J6) | Low to medium |
| 10 | Walk-off, empty slap | Live | AI (J7) | Medium: slap timing |
| 13 | Relief chai | Live | AI (J8) | Low to medium: chai glass physics |
| 14 | End card paper | Edit | AI texture (J9) | Low |

**Keeping one consistent character**
1. Make one reference image first (J1) and reuse it as the start frame or character reference for every clip. If Ganesh wants to be the character, use a clear, well-lit photo of himself as the reference instead; never a celebrity or anyone who has not agreed.
2. Make one set reference (J1b): the ground, the line, the pole, the two sitters from behind. Use it for every wide.
3. Same words for the outfit in every prompt: "white formal shirt, loose maroon tie, blank white lanyard card, dark grey trousers".
4. Generate 4 to 8 variations per shot and pick one. Expect 1 usable clip in 4.
5. Mute all AI audio (Veo can add speech or music); the sound is built in CapCut.
6. Plan 8 to 12 hours of generation and selection for the AI shots (rule 10), not 2.

**Ready-to-paste prompts**

J1. Character reference image (Higgsfield image, or Nano Banana / Imagen in Flow), 9:16:
> Full-body photo of an Indian man, about 30, slim build, short black hair, light stubble, tired but kind face, wearing a white formal shirt with sleeves rolled once, loose maroon tie, blank white lanyard ID card, dark grey trousers, black formal shoes, holding a smartphone in one hand. Standing on a dusty Indian college sports ground at 4 pm, plain background, natural daylight, realistic photo, shot on a 35mm lens, eye level, sharp focus on the face. Vertical 9:16.
> Negative: text, logos, brand names, airline uniforms, celebrity likeness, cartoon, extra fingers, sunglasses.

J1b. Set reference image, 9:16:
> A dusty Indian school or college sports ground in late afternoon. A straight line of three young men crouched on their heels in a row, facing alternate directions, heads bowed, seen from behind and the side, faces not visible; the nearest wears a plain khaki T-shirt, the next a plain grey T-shirt. A plain wooden pole stands upright at the far end of the line. Neem trees and a low boundary wall in the background, soft dust in the air, warm natural light. Realistic photo, 28mm lens, low camera at knee height. Vertical 9:16.
> Negative: text, logos, signboards, faces, spectators, school name, flags, uniforms.

J2. Hook sprint (image-to-video, start frame from J1 placed on J1b set), 5 to 6 s:
> The man in the white formal shirt and maroon tie sprints toward the camera along the line of crouched players, phone pressed to his ear, a sheet of white paper in his other hand held flat toward the camera. He slows near the first crouched player in the khaki T-shirt and taps him once on the upper back with an open palm. The crouched player does NOT stand up and does NOT lift his head; only his right hand flicks backward and taps the running man's forearm. Low locked-off camera at knee height, 28mm lens, natural late-afternoon light, realistic, slight motion blur. Vertical 9:16. No dialogue, no speaking, no mouth movement, ambient wind only.
> Negative: the crouched player standing up, faces of the crouched players, text on the paper, logos, extra arms, merging hands, slow motion, camera shake.

J3. The stare and the second sitter, 6 s:
> Locked-off side view of a dusty sports ground. The man in the white shirt and maroon tie stands over a crouched player in a khaki T-shirt and stares down at him for one second with mild disbelief, head tilted. Then he jogs a few metres to the next crouched player in a grey T-shirt and taps his back once. The grey-shirt player keeps his head down and lazily flicks one hand back to tap the man. Neither crouched player stands or shows his face. Realistic, natural light, 35mm lens, chest-height camera. Vertical 9:16. No dialogue, no mouth movement.
> Negative: players standing up, faces of crouched players, text, logos, extra limbs, comedic cartoon style.

J4. Round the pole, 5 s:
> The man in the white shirt and maroon tie runs to a wooden pole at the end of a line of crouched players, grabs it with one hand and swings round it, then runs back up the line, phone at his ear, free hand gesturing as if explaining something. Crouched players stay perfectly still, heads down. Camera locked off near the pole, low angle, realistic, warm afternoon light, light dust. Vertical 9:16. No dialogue, no mouth movement.
> Negative: pole bending, players moving, faces of crouched players, text, logos.

J5a. Low point face close-up, 4 s (the strongest AI shot):
> Close-up of the same man, hands on his knees, sweating, shirt untucked, tie loosened. He breathes out, gives a small tired half-laugh with his mouth closed, and his eyes drop to the ground. Golden late-afternoon backlight, shallow depth of field, 85mm lens, eye-level camera, realistic skin texture. Vertical 9:16. No speaking, lips stay closed.
> Negative: talking, open mouth speech, crying, exaggerated expression, text, logos, face change.

J5b. Crouch into the line, 4 s:
> Wide locked-off shot. The man in the white shirt lowers himself into the gap between two crouched players and crouches exactly like them, facing the opposite direction, head bowed, holding a phone loosely. Everyone stays still. Golden light, dusty ground, realistic, 28mm lens, chest height. Vertical 9:16. No dialogue.
> Negative: anyone standing, faces of the other players, text, logos.

J6. Head lift, 4 s:
> Wide locked-off shot of three men crouched in a line on a dusty ground, heads bowed. The middle man in a white formal shirt slowly lifts only his head, as if he heard a sound, and looks down at the phone in his hand. The other two do not move at all. Golden late-afternoon light, realistic, 28mm lens. Vertical 9:16. No dialogue.
> Negative: other players moving, glowing phone, phone screen visible, text, logos, standing up.

J7. Walk-off and empty slap, 5 s:
> The man in the white shirt puts his phone in his pocket, stands up out of a line of crouched players and walks calmly toward the camera, rolling his shoulders, not looking back. Half a second after he leaves, the crouched player behind him, head still down, flicks his hand back and taps empty air where the man was. Locked-off camera at chest height, golden light, realistic, slight slow motion. Vertical 9:16. No dialogue.
> Negative: crouched player looking up or standing, faces of crouched players, text, logos.

J8. Relief with chai, 4 s:
> Mid close-up of the same man sitting on a white plastic chair at the edge of a dusty ground in golden evening light, tie gone, holding a small glass of milky cutting chai. He takes one sip, exhales through his nose and gives a small private smile, looking at the horizon. A phone lies face-down on his knee. Far behind him, out of focus, two crouched figures keep flicking their hands at empty air. 85mm lens, shallow depth of field, warm and calm. Vertical 9:16. No speaking.
> Negative: talking, text, logos, steam overload, extra fingers, glowing phone, face change.

J9. End card paper texture (text-to-video), 4 s:
> Extreme close-up of warm off-white handmade paper texture, subtle fibres and soft grain, very slow drift of soft late-afternoon window light across the surface, gentle shadow gradient from top left. Calm, minimal, receipt-ledger mood. 100mm macro lens, shallow depth of field, natural warm colour around 4300K. Vertical 9:16, locked camera, seamless loop feel.
> Negative: text, letters, numbers, logos, watermark, hands, people, objects, folds, stains, dark background, black, blue tint, vignette, camera shake, flicker.

**What AI will do badly (be honest with yourself before choosing it)**
- **The joke itself.** "Sitter does not rise, only the hand flicks back" breaks most models' sense of the game: they will make him stand, turn his head, or both. Many takes will be unusable. If J2 and J3 fail after 8 tries each, shoot those two live with two classmates for 30 minutes.
- **Hands at the moment of contact:** fingers merge, palms pass through backs. Cut on the contact with a thud, or use a live hand insert.
- **The word "kho-kho" means nothing to the model.** Describe the physical action every time, as the prompts do.
- **Text:** the e-ticket, the back labels and any phone screen come out as gibberish. All text goes in CapCut; prompts ask for no text.
- **Face drift:** the man's face, tie colour and shirt can change between clips. Always start from the J1 reference, keep outfit words identical, and reject drifted takes.
- **Indian setting:** models drift to generic parks or Western school fields. Keep "dusty Indian college ground, neem trees, low boundary wall" in every prompt.
- **Audio:** Veo may add speech, music or crowd noise. Mute every clip.
- **Look mismatch:** AI shots next to real screen recordings and real hand inserts can feel plastic. Grade everything warm, add the same light grain to live and AI shots, never to the screen recordings.
- **Time:** expect 8 to 12 hours of generation and picking for 8 shots, against about 2 hours of live shooting with classmates. The AI route saves coordination, not time.
- **Disclosure:** AI-generated people should carry the platform's AI label; this does not hurt the film and protects trust.
