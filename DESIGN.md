# DESIGN.md

Read this before building or changing any screen of Refund Genie. If a choice is not covered here, ask me first instead of guessing.

Refund Genie deals with money that is stuck and people who are already tired of chasing it. So in my perspective the screens have one job above everything else: make the person feel someone calm and serious has taken over, without making it feel like a bank form.

## 1. How it should feel, in labels

- **The "who owes you" slip:** a receipt style card with four rows, WHO HAS IT, DUE BY, WRITE TO NEXT, AMOUNT. Every answer on it sits next to its proof (the DGCA rule, the date, the company's own page), so nobody has to just trust the AI.
- **The page:** warm off-white paper, navy ink, serif headings. It should read like a calm ledger and not like a loud fintech app.
- **Colour that means something:** amber only when a refund is overdue, green only when the money has actually landed. Nothing else on the screen gets to use them.
- **The genie mascot:** cute but capable, holding a receipt. It shows up only where emotion belongs (the landing hero, empty and loading states, the "It's in" moment) and never on the slip or in anything sent to a company.
- **Less text, more shapes:** the first version of the landing was a heading plus paragraphs in every section, and except for the buttons it looked very monotonous. So now each section uses a different form: an animated sample case, chat bubbles, swipeable one line cards, an FAQ that opens and closes.

## 2. References, one per component

Shaktimaan helped me with finding the references and guided me on the taste board. The picks and what to take from each are mine.

**Overall look:** the taste board. I combined board A "Receipts" with board C "Calm ledger".
Take: the slip with proof beside every answer from A, and the warm light background with serif headings from C.
Ignore: the rest of both boards.

**Landing hero:** Oktivo's first fold, where you see the product working (a live call card and a follow-up notice) before you read any paragraph.
Take: show the product doing the job in the first fold. For us it is the sample case slip filling row by row, a mail going out, a reply coming in, and the stamp turning from Overdue to a green "It's in". It loops, rests 3 seconds on "It's in", and pauses when it is off screen.
Ignore: their score badges and their numbers. We don't show any number that is not real.

**Landing sections:** Netcore and Oktivo, how each section changes its format instead of repeating heading plus text.
Take: card grids with one line each, a logo strip, an FAQ.
Ignore: count-up stats and testimonials. We don't have them and i don't want to make them up.

**"Tell us once" card and the FAQ words:** The Whole Truth, the candid way Shashank Mehta talks about what is inside the product.
Take: say straight what we ask and what we never ask, and why. "We ask your PNR and booking ID once for each case." "What we never ask: OTP, card, bank details, login."
Ignore: their look. Only the tone.

**Mascot:** a few genie images I liked, used only for mood.
Take: a friendly round face, small smile, confident, holding something to give you.
Ignore: everything that would make it look like a famous genie someone already owns. It has to be our own character, navy line on warm paper with an amber glow, no new colours.

**Logo:** from the first logo drafts I picked Mark 5, a folded receipt inside a return arrow, and asked for the arrow to become the genie's curling smoke. The final is "Smoke logo 2" with the wordmark set in Fraunces, plus a simpler loop only icon for the browser tab and app icon, because the full mark does not read at 16 to 32px.

**People scenes:** four flat illustrations of Indian flyers (at the airport, on hold with care, the refund coming, a family). I sent two back: remove the airport boards from the two home scenes, and put the small genie in "refund coming", handing over a receipt.

**Airline and travel site logos:** each company's own official file, full colour, never redrawn, with the line "Refund Genie is not linked to or endorsed by these companies. Names and logos belong to their owners."

## 3. Type and colour

Fonts:
- Fraunces for headings, the wordmark, amounts and dates on the slip.
- Public Sans for everything else.
- JetBrains Mono for codes, PNRs, references and times.

Sizes: hero 34px, amount 40px, title 22px, heading 18px, body 16px, small 14px. No other sizes without asking me.

Colours:
- Navy ink #14213d on warm paper #f7f6f1, white #ffffff for cards.
- Body text #3b4252, muted #6a7067, lines #d9d8ce.
- The main button is navy with white text.
- Overdue: amber, text #8a4b00 on #fde7c4, with an icon and the word "Overdue", never colour alone.
- Money received: green #1f6b4a, only after the person taps "It's in".
- Errors: red #a8231a.

## 4. Screens

The flow, in order: the landing, then paste what happened, then a few questions, then the "who owes you" card and confirm, then the case page where the chase happens, and last, "It's in".

**Header (on every page)**
Logo on the left. On the right, a "Check my refund" button and a menu with "How it works", "Try a demo" and "Your cases". It is the same on phone and desktop, with only a small gap between the header and the hero. "Your cases" used to sit on the landing; I moved it to its own page so the landing stays about one thing.

**Landing**
For: telling a stranger in a few seconds what Genie does, and starting a case.
Top to bottom: the header, the eyebrow "For cancelled domestic flights", the headline, the line under it, two buttons, the looping sample case, the logo strip, "Sound familiar?", "What Genie does" and "How it works" as swipe cards ("Swipe to see the next step."), the "Tell us once." card, the price, and the FAQ.
"Sound familiar?" is a chat between four people instead of a paragraph:
- You: "Where is my refund?"
- MakeMyTrip: "Please contact the airline."
- Airline: "We already paid MakeMyTrip."
- Customer care: "Please hold…"
Main action: "Check my refund" opens the paste screen.

**Paste what happened**
For: starting from the thing they already have, so they don't tell the story again.
Top to bottom: a box for the cancellation mail or a screenshot, the "pick what happened" options, and the safety line "Don't include OTPs or card numbers. We remove them if you do. Crop them out of screenshots."
Main action: "Check my refund".
Empty: the button stays off, with "Add a message, a screenshot or pick what happened."
Loading: "Reading your message…". If it takes long: "Still working. Your message is saved."
Error: "Something went wrong on our side. Your case is safe." with "Try again".

**A few questions**
For: asking only what was not there in what they shared, one question at a time.
Top to bottom: a thin step bar ("Step 2 of 4"), the question with one line on why we ask it, "No OTP, card or bank details, or login. Ever." under it, and a small "Saved" tick after each answer.
What they already shared stays folded under a subtle "See what you've shared" link. I didn't want people re-reading a growing summary while they are still answering.
Main action: "Continue".

**"Who owes you" card and confirm**
For: the first value, and the one moment where checking is the actual task.
Top to bottom: who has the money and who to contact next come first. Then the due date with the DGCA rule behind it, and the amount. Then the full summary of everything they told us, shown once, then their email (required before any mail goes out), then the written permission.
If Genie read something wrong: they fix it here, before Genie writes to anyone.

**Case page**
For: watching the chase without doing the chasing.
Top to bottom: "Who owes you", the next move, then "The chase". Only the newest entry shows, with a subtle "See all N messages" link for the rest. Then "Ask Genie to call IndiGo" (on a weekday, after calling permission), "Email me this case link", and at the end "It's in, close this case".
"Email me this case link" has to look like a button. The first version opened a Gmail draft and on phones it looked broken. If there is no confirmed email, it becomes "Copy my case link".
Call did not connect: "The call could not connect. Genie will follow up by mail."
A reply that says "processed" is shown as "the money has left them", never as "It's in". Only the person decides it landed.
Done: "It's in" turns green and shows the whole chase in one count.

**Your cases**
For: getting back to a case on the same browser.
Empty: "No saved cases on this browser yet." with "Check my refund".

**Demo**
For: someone with no live case who wants to see the chase.
It asks the same questions, in the same screens and the same order, as a real case. Earlier the demo skipped the questions and it felt like Genie already knew your flight in advance, like some magic, which is not how the real thing works. Now the facts that take effort (PNR, cancellation date, amount, booking ID, flight) each have a "Fill sample" button, there is a line "Use made-up details. This is a demo.", and the companies are always Demo Air and DemoTrips.
The call is played with a primary button, "Play the simulated call", with the "Simulated" label right next to it.
Loading: "Reading the simulated care call…"
Notice: "Demo, nothing is sent to a real company. Mails go to our test desk. The call is simulated; no phone rings or call credits are used."

**What Rohan's try changed in the error states**
When Rohan first tried a case, three things broke in front of him: the "How did you pay?" buttons came back with "Question no longer available", typing a date also filled the amount box, and a raw technical error message showed up on screen. Can a person trust an app with their money after seeing that? I think nope. Since then no error shows a code; it says what happened and what to do next, and that their case is safe.

## 5. The first screen's words

Eyebrow: For cancelled domestic flights
Headline: Flight cancelled. Refund still not in your account?
Under it: Refund Genie is an AI agent for stuck flight refunds in India. Tell it once what happened. Genie finds who has your money and the date they had to pay by under DGCA rules, then calls and mails them for you, and keeps at it till the money lands. You only step in if they need you.
Button: Check my refund
Second button: See a 3-minute demo

## 6. Principles I keep for every screen

- Phone first. Every screen gets checked at 375px and 1280px before anyone calls it done.
- Ask each thing once per case, with one line on why we need it.
- Anything long (a summary, a list of mails) folds behind a small "See all" link. The full version is one tap away, never in the way.
- Every claim on screen shows where it came from: the rule, the date, the company's page.
- No made-up numbers, count-ups or testimonials. If it is not real, it is not on the page.
- Simulated is always labelled as simulated. A demo call or demo mail is never shown as live.
- The person sees every mail Genie sends. Their email is in CC.
- Amber means overdue, green means money received, and no new colours come in without asking me.
- The mascot never goes on the slip or into anything a company will read.
- If something can be tapped, it looks like a button.
