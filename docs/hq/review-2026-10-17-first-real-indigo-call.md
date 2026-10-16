# HQ review: first real IndiGo call, Sat 17 Oct 2026, 01:36 IST

Case RG-FJOBTS (Ganesh's own IndiGo booking, bought on a travel site). Real care line, night. Duration 4 min 29 s, cost $0.37, ended by Genie ("End Refund Support Call", completed). Source: Vapi transcript and case page screenshots shared by Ganesh.

## Passed
- IVR: chose English (2), got through three menu levels and reached a live agent in about 2 min 20 s. Some presses landed before the prompt finished ("did not receive any input"), but it recovered.
- Hold: waited quietly ("I will wait for the customer care representative").
- Caller role: asked status, never offered help, read the PNR back correctly with the phonetic spelling.
- Verification: when the agent said she needed more details, Genie used the D-054 callback path, asked for a callback channel and hours (agent: 24x7) and ended politely. No OTP or private detail requested or shared.
- After the call: case shows "Live call · IndiGo · Finished · 255 seconds", a reader summary, a call recording, and the D-057 user summary mail "Refund Genie call update: IndiGo · RG-FJOBTS" marked sent. No mail to any company.

## Must fix before anyone else uses calling
1. **AI disclosure went only to the recorded menu.** The opening ("I'm an AI assistant... This call is recorded") played at second 1, over IndiGo's IVR. When the agent Vithika answered, Genie said "Good morning, Vithika. I'm calling regarding a refund..." with no AI disclosure, no "on behalf of", no recording notice. Fix: when the first live person speaks after a menu or hold, Genie repeats the full disclosure line before anything else.
2. **Genie had no booking facts.** Asked "from where to where", Genie said it only had the PNR and called it "a refund-related query". Fix: give Genie the case's confirmed facts (route, travel date, booking site, booking ID if any, amount) as known facts, and tell it to state them plainly when asked. Never claim more than the case says.
3. Minor: Genie asked for a reference, got "Sure", then moved on without one. Wait for the answer once before the next question.
4. Minor: menu presses sometimes before the prompt ends. Listen to the full list of options before pressing.

## Open question for Ganesh
The case page says IndiGo owes Rs 3,874 by 3 Nov 2026, with a follow-up draft to EaseMyTrip ready. Ganesh described the booking as "flown normally". Check what was entered at intake.

## Proof status
First real-company call by Genie: menu, hold, live agent, verification handoff and user summary mail all observed. Not yet seen: a live agent giving a refund status or reference.
