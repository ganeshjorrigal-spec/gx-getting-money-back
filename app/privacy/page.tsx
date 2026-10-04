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
      <section><h2>What we store</h2><p>What you paste or upload, the facts we read from it, the drafts we write, your dates and your answers. If you choose, an email or phone for check-ins or the founder.</p></section>
      <section><h2>Why</h2><p>To work out your refund route and dates, write your messages and remind you.</p></section>
      <section><h2>Who handles it</h2><p>Convex stores it. Google&apos;s Gemini reads your messages and writes drafts. {paidTier ? "We use Gemini's paid tier, under which Google doesn't use your content to improve its products." : "During testing we use Gemini's free tier, under which Google may use content to improve its products."} Vercel hosts the website.</p></section>
      <section><h2>What we never collect</h2><p>OTPs, passwords, card numbers, bank logins. We remove card numbers and codes from text automatically.</p></section>
      <section><h2>Who can see a case</h2><p>Anyone with its private link. Keep it to yourself. In our first weeks, the founder may look at cases to fix mistakes in the product. We never contact you unless you ask us to.</p></section>
      <section><h2>How long we keep it</h2><p>Until you delete it. We remove screenshots from closed cases after 180 days, and delete cases with no activity for 12 months.</p></section>
      <section><h2>Calendar</h2><p>If you add a check-in to Google Calendar, your case link is saved in your calendar.</p></section>
      <section><h2>Delete</h2><p>Open your case and tap Delete this case. Your messages, screenshots and drafts are removed at once. We keep only the case code, amount and date of any payment, for our accounts. Google may keep request logs for abuse monitoring under the Gemini API terms.</p></section>
      {contact && <section><h2>Contact</h2><p><a className="text-link" href={`mailto:${contact}`}>{contact}</a></p></section>}
    </div>
  </main>;
}
