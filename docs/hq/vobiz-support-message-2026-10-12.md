# Message to Vobiz support (send Mon 12 Oct)

Fill the three brackets first. No password goes in this message. The Vapi call ID is in Vapi, under Call Logs.

**Subject:** Outbound SIP calls from Vapi fail with 407 Proxy Authentication Required, number 8065354620

Hi Vobiz team,

My account is fully active and KYC is complete. I use number 8065354620, imported into Vapi (vapi.ai) as a BYO SIP trunk. Every outbound test call fails with the end reason `outbound-sip-407-proxy-authentication-required`.

What I have already tried:
1. SIP digest credentials, with the password reset and re-entered.
2. A fresh credential set, "Vobiz Outbound v2".
3. An IP access list with Vapi's IPs 44.229.228.186 and 44.238.177.138.

Still the same 407 each time.

Could you please tell me:
1. Does my account allow outbound calls on this number right now?
2. Should outbound use digest authentication or IP-based authentication? If digest, what exact username format and realm should I use? If IP-based, do you need to whitelist those two IPs on your side?
3. Which SIP domain or proxy address should the trunk point to?
4. Do you accept calls from SIP gateways hosted outside India, such as Vapi's US servers? Is there a media anchoring or location rule that blocks them?
5. Can you check your SIP logs for my last test call and tell me why it was rejected?

My last test call was on [date and time, IST]. Vapi call ID: [call ID]. Account email: [your Vobiz login email].

I have a product demo deadline on Saturday 17 October. Could you please reply by Tuesday, or arrange a call?

If you have a working setup example for Vapi, Retell or LiveKit, please share it.

Thank you,
Ganesh
