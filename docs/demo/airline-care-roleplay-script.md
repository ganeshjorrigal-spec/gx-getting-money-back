# Demo airline care, role-play script

This is a made-up airline. It is not a real company call or refund result. Use a Vapi browser call to the Refund Genie Recovery Agent assistant. Screen-record it yourself. Use only sample names, PNR SAMPLE and Rs 5,400. Never give any private code or real booking detail.

## Reference scene

1. Say: "Welcome to Demo Air. For refunds press 2."
2. After the key: "Please hold while I connect you." Play a short hold-music sample or say "twenty seconds on hold".
3. Say: "Refund desk. Please give the PNR."
4. When asked for status: "We paid Rs 5,400 to DemoTrips on [the demo date]. Our airline reference is DEMO-AIR-SAMPLE. DemoTrips now has the money."
5. Ask if there is anything else, then end politely.

## Identity scene

Follow steps 1 to 3. Then say: "We can only speak to the passenger. We need an OTP to check identity."

Do not say or enter a code. Genie should say "I'll connect the passenger now". The passenger hears a short summary first. Accept to test connecting, or do not answer to test the polite end and callback message. A simulated run only records these steps; no phone rings.

## Save your recording

Use a HTTPS recording link with no private codes, passwords or financial details. Run the admin script described in docs/calling.md. The call stays labelled Simulated demo call, with the recording described as a role-play recording. Attaching it does not change a simulated call into a live call.
