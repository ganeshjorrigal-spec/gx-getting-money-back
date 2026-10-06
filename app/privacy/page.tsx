import Link from "next/link";
import { productName } from "../copy";

export default function PrivacyPage() {
  const paidTier = process.env.GEMINI_PAID_TIER === "true";
  const contact = process.env.NEXT_PUBLIC_CONTACT;
  return <main className="case-shell">
    <header className="site-header"><Link className="wordmark" href="/">{productName}<span className="wordmark-dot">.</span></Link><Link className="text-link" href="/">Home</Link></header>
    <div className="case-wrap privacy-content">
      <p className="section-kicker">HOW IT WORKS</p>
      <h1>Privacy</h1>
      <section><h2>What we store</h2><p>What you paste or upload, the facts we read from it, your optional name, booking ID and follow-up phone or email, the drafts we write, your dates and your answers. If you join a waitlist, we store the email or phone you enter.</p></section>
      <section><h2>Why</h2><p>To work out your refund route and dates, put your name and booking ID into messages you choose to send, remind you, and let Ganesh follow up when you choose to give a phone number or email.</p></section>
      <section><h2>Who handles it</h2><p>Convex stores it. Google&apos;s Gemini reads your messages and saved case facts, including your name when it writes a signed draft. {paidTier ? "We use Gemini's paid tier, under which Google doesn't use your content to improve its products." : "During testing we use Gemini's free tier, under which Google may use content to improve its products."} Convex hosts the website.</p></section>
      <section><h2>Keep sensitive details out</h2><p>Do not include OTPs, passwords, card numbers or bank logins. We remove card numbers and codes from text automatically. Crop them out of screenshots before uploading; we cannot remove them from images.</p></section>
      <section><h2>Who can see a case</h2><p>Anyone with its private link. Keep it to yourself. In our first weeks, the founder may look at cases to fix mistakes in the product. We never contact you unless you ask us to.</p></section>
      <section><h2>How long we keep it</h2><p>Until you delete it. We remove screenshots from closed cases after 180 days, and delete cases with no activity for 12 months.</p></section>
      <section><h2>Calendar</h2><p>If you add a check-in to Google Calendar, your case link is saved in your calendar.</p></section>
      <section><h2>Gmail reply tracking (optional)</h2><p>After you mark an email sent, you can let Tickback watch for replies. If our case inbox is copied, we check that inbox for your case code. If you connect your Gmail, Google grants read-only access; Tickback searches for the sent refund thread and reads replies in that thread, or a matching message from a known sender when the thread cannot be found. We do not send email or read unrelated messages. A matched reply is redacted, saved in your case, and sent to Gemini to prepare your next step. It stays in your case until you delete the case. You can disconnect Google from the case page at any time; this revokes access and removes future Tickback calendar events. Disconnecting does not delete replies already saved in your case.</p><p>Calendar permission lets Tickback create, move and remove its own check-ins and reply alerts on calendars you own. We store the Google refresh token encrypted. The use of information received from Google Workspace scopes follows the Google User Data Policy, including its Limited Use requirements. We do not use it for advertising or to train a general AI model.</p></section>
      <section><h2>Delete</h2><p>Open your case and tap Delete this case. Your messages, screenshots and drafts are removed at once. We keep only the case code, amount and date of any payment, for our accounts. Google may keep request logs for abuse monitoring under the Gemini API terms.</p></section>
      {contact && <section><h2>Contact</h2><p><a className="text-link" href={`mailto:${contact}`}>{contact}</a></p></section>}
    </div>
  </main>;
}
