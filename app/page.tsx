import Link from "next/link";
import { guaranteeLine, landingCopy as c, productName } from "./copy";
import { LandingEnhancements } from "./landing-enhancements";

export default function Home() {
  const paidTier = process.env.GEMINI_PAID_TIER === "true";
  const contact = process.env.NEXT_PUBLIC_CONTACT;
  const faqs = [...c.questions, [c.privacyQuestion, paidTier ? c.privacyPaid : c.privacyFree]];

  return (
    <main className="home-shell">
      <header className="site-header">
        <Link className="wordmark" href="/">{productName}<span className="wordmark-dot">.</span></Link>
        <Link prefetch={false} className="text-link" href="/sample">{c.headerLink} <span aria-hidden="true">↗</span></Link>
      </header>

      <LandingEnhancements />

      <section className="hero section-wrap" id="hero">
        <div className="hero-copy">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1>{c.headline}</h1>
          <p className="hero-sub">{c.sub}</p>
          <div className="hero-actions">
            <Link prefetch={false} className="button button-primary" href="/start">{c.primary} <span aria-hidden="true">→</span></Link>
            <Link prefetch={false} className="button button-secondary" href="/sample">{c.secondary}</Link>
          </div>
          <p className="trust-line">{c.trust}</p>
        </div>
        <div className="hero-visual">
          <div className="receipt-caption">A clearer answer, at a glance</div>
          <article className="example-card" aria-label={c.example.label}>
            <div className="example-top"><span className="example-label">{c.example.label}</span><span className="route-chip">{c.example.route}</span></div>
            <p className="example-event">{c.example.event}</p>
            <p className="example-amount">{c.example.amount}</p>
            <div className="example-rule" />
            <p className="example-due">{c.example.due}</p>
            <p className="example-source">{c.example.source}</p>
            <div className="example-next">{c.example.next}</div>
          </article>
          <p className="receipt-foot">The date comes with its source.</p>
        </div>
      </section>

      <section className="story-band">
        <div className="section-wrap story-grid">
          <div><p className="section-kicker">01 / THE PROBLEM</p><h2>{c.familiarTitle}</h2></div>
          <div>
            {c.familiar.map((line) => <p className="story-line" key={line}>{line}</p>)}
            <p className="source-note">{c.familiarNote}</p>
          </div>
        </div>
      </section>

      <section className="section-wrap section-block">
        <p className="section-kicker">02 / THE WAY THROUGH</p>
        <h2>{c.howTitle}</h2>
        <div className="steps-grid">
          {c.how.map(([title, body], i) => <article className="step" key={title}>
            <span className="step-number">0{i + 1}</span>
            <h3>{title}</h3><p>{body}</p>
          </article>)}
        </div>
      </section>

      <section className="section-wrap section-block">
        <p className="section-kicker">03 / WHY IT HELPS</p>
        <h2>{c.whyTitle}</h2>
        <div className="three-grid">
          {c.why.map(([title, body]) => <article className="value-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className="assurance-band">
        <div className="section-wrap assurance-grid">
          <div><p className="section-kicker">IN YOUR CONTROL</p><h2>{c.neverTitle}</h2></div>
          <ul>{c.never.map((line) => <li key={line}><span aria-hidden="true">✓</span>{line}</li>)}</ul>
        </div>
      </section>

      <section className="section-wrap section-block">
        <p className="section-kicker">BUILT FOR TICKET REFUNDS</p>
        <h2>{c.handleTitle}</h2>
        <div className="situation-list">{c.handles.map((s) => <span className="situation-chip" key={s}>{s}</span>)}</div>
        <p className="section-note">{c.handleLine}</p>
      </section>

      <section className="section-wrap section-block" id="pricing">
        <p className="section-kicker">STRAIGHTFORWARD PRICING</p>
        <h2>{c.pricingTitle}</h2>
        <div className="pricing-grid">
          <article className="price-card"><span className="price-mark">₹0</span><h3>{c.freeTitle}</h3><p>{c.freeBody}</p></article>
          <article className="price-card price-card-paid"><span className="price-mark">₹49</span><h3>{c.paidTitle}</h3><p>{c.paidBody}</p><p>{guaranteeLine}</p></article>
        </div>
        <p className="section-note">{c.under300}</p>
      </section>

      <section className="section-wrap section-block faq-section">
        <p className="section-kicker">GOOD TO KNOW</p>
        <h2>{c.questionsTitle}</h2>
        <div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </section>

      <footer className="site-footer">
        <div className="section-wrap footer-inner">
          <Link className="wordmark" href="/">{productName}<span className="wordmark-dot">.</span></Link>
          <p>{c.footer}</p>
          <div><Link prefetch={false} href="/privacy">{c.privacyLink}</Link>{contact && <a href={`mailto:${contact}`}>{c.contactLink}</a>}</div>
        </div>
      </footer>
    </main>
  );
}
