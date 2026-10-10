import { PolicyFooter } from "../policy-footer";
import { SupportContact } from "../support-contact";
import Link from "next/link";
import { productName } from "../copy";

export const metadata = { title: "Privacy | Refund Genie" };

export default function PrivacyPage() {
  const paidTier = process.env.GEMINI_PAID_TIER === "true";
  return <main className="case-shell">
    <header className="site-header"><Link className="wordmark" href="/">{productName}<span className="wordmark-dot">.</span></Link><Link className="text-link" href="/">Home</Link></header>
    <div className="case-wrap privacy-content">
      <p className="section-kicker">HOW IT WORKS</p>
      <h1>Privacy</h1>
      <section><h2>What we store</h2><p>What you paste or upload, the facts we read from it, your optional name, PNR, booking ID and follow-up phone or email, the drafts we write, your dates and your answers. If you join a waitlist, we store the email or phone you enter.</p></section>
      <section><h2>Why</h2><p>To work out your refund route and dates, put your name and booking ID into messages you choose to send, remind you, and let Ganesh follow up when you choose to give a phone number or email.</p></section>
      <section><h2>Who handles it</h2><p>Convex stores it. Google&apos;s Gemini reads your messages and saved case facts, including your name when it writes a signed draft. {paidTier ? "We use Gemini's paid tier, under which Google doesn't use your content to improve its products." : "During testing we use Gemini's free tier, under which Google may use content to improve its products."} Convex hosts the website.</p></section>
      <section><h2>Refund Genie never logs in</h2><p>You send every real message from your own account. Refund Genie never logs in to an airline, travel site, bank or payment account for you. We never ask for OTPs, passwords, card numbers or bank details.</p></section><section><h2>Annual payment</h2><p>Razorpay handles payment through its payment link. We keep the case code, amount, claimed payment date and yearly coverage status so Ganesh can reconcile it. A hashed device key links your cases to that year without a new account. Opening an existing covered private case lets you restore coverage on another device. If no case reaches It’s in during that year, the Rs 49 comes back. Demo cases and cases helped by Ganesh this week are free.</p></section>
      <section><h2>Keep sensitive details out</h2><p>Do not include OTPs, passwords, card numbers or bank logins. We remove card numbers and codes from text automatically. Crop them out of screenshots before uploading; we cannot remove them from images.</p></section>
      <section><h2>Who can see a case</h2><p>Anyone with its private link. Keep it to yourself. In our first weeks, the founder may look at cases to fix mistakes in the product. We never contact you unless you ask us to.</p></section>
      <section><h2>How long we keep it</h2><p>Until you delete it. We remove screenshots from closed cases after 180 days, and delete cases with no activity for 12 months.</p></section>
      <section><h2>Demo cases</h2><p>Flight demos use DemoTrips and Demo Air, two labelled roles in the same demo account. Event demos keep their existing platform roles. Demo cases use made-up refund details and are deleted after seven days. Your own email sends the messages. Our separate demo desk reads messages carrying a demo case code and sends up to three replies to you and the copied case inbox. Those replies are saved and read in the same way as other tracked replies. Demo rows are labelled in the responses sheet. No money is moved.</p></section>
      <section><h2>Calendar</h2><p>If you add a check-in to Google Calendar, your case link is saved in your calendar.</p></section>
      <section><h2>Gmail reply tracking (optional)</h2><p>Gmail connect is open to test accounts only for now. Copying the case inbox works without connecting your Gmail.</p><p>After you mark an email sent, you can let Refund Genie watch for replies. If our case inbox is copied, we check that inbox for your case code. If you connect your Gmail, Google grants read-only access; Refund Genie searches for the sent refund thread and reads replies in that thread, or a matching message from a known sender when the thread cannot be found. For real cases, we do not send email or read unrelated messages. A matched reply is redacted, saved in your case, and sent to Gemini to prepare your next step. It stays in your case until you delete the case. You can disconnect Google from the case page at any time; this revokes access and removes future Refund Genie calendar events. Disconnecting does not delete replies already saved in your case.</p><p>Calendar permission lets Refund Genie create, move and remove its own check-ins and reply alerts on calendars you own. We store the Google refresh token encrypted. The use of information received from Google Workspace scopes follows the Google User Data Policy, including its Limited Use requirements. We do not use it for advertising or to train a general AI model.</p></section>
      <section><h2>Responses sheet</h2><p>Refund Genie creates one Google Sheet in our Google account and updates one row per case so Ganesh can follow up. The row contains the case code, created date, optional name and contact, platform, amount, route, due date, stage, channel, last reply date and feedback. Google grants access only to files Refund Genie creates or opens with its narrow <code>drive.file</code> permission. Deleting a case also clears its row.</p></section>
      <section><h2>Delete</h2><p>Open your case and tap Delete this case. Your messages, screenshots and drafts are removed at once. We keep only the case code, amount and date of any payment, for our accounts. For an annual plan we also keep the case code, amount and date of a reported recovery, without your messages or contact, to check the year’s guarantee. Google may keep request logs for abuse monitoring under the Gemini API terms.</p></section>
      <section><h2>Contact</h2><p><SupportContact /></p></section>
      <PolicyFooter />
    </div>
  </main>;
}
