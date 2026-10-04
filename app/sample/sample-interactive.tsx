"use client";

import { useState } from "react";
import Link from "next/link";
import { sampleCopy } from "../copy";

type SampleCopy = typeof sampleCopy;

export default function SampleInteractive({ copy: c, productName }: { copy: SampleCopy; productName: string }) {
  const [messageOpen, setMessageOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const timeline = [
    "Refund landed, about 20 days after the venue change.",
    "The tickets reached the stadium and were scanned.",
    "Physical tickets were couriered, with receipt and tracking kept.",
    "The refund form was filled in.",
    "A refund option was offered after days of uncertainty.",
    "The match moved from Ahmedabad to Chennai.",
  ];
  return <main className="case-shell">
    <header className="site-header"><Link className="wordmark" href="/">{productName}<span className="wordmark-dot">.</span></Link><span className="case-code">SAMPLE</span></header>
    <div className="sample-banner"><div className="case-wrap"><p>{c.banner}</p><Link href="/start">{c.start} →</Link></div></div>
    <div className="case-wrap">
      <div className="case-heading"><p className="section-kicker">A real refund journey</p><h1>{c.event}</h1><p>{c.platform}</p></div>
      <article className="case-card">
        <div className="case-card-top"><span className="route-chip caution-chip">{c.status}</span><span className="case-code">EXAMPLE</span></div>
        <p className="case-amount">{c.amount}</p>
        <h2>{c.statusTitle}</h2>
        <p className="example-source">{c.source}</p>
      </article>
      <article className="case-card">
        <p className="section-kicker">THE NEXT STEP</p>
        <h2>{c.stepTitle}</h2>
        <ol className="checklist">{c.steps.map((s) => <li key={s}>{s}</li>)}</ol>
        <button className="button button-primary" onClick={() => setMessageOpen(true)}>{c.message}</button>
        <p className="example-source">{c.sendNote}</p>
      </article>
      <article className="case-card">
        <p className="section-kicker">THE OUTCOME</p>
        <p className="case-outcome">{c.checkin}</p>
      </article>
      <article className="case-card">
        <h2>{c.saveTitle}</h2><p>{c.saveBody}</p>
      </article>
      <section className="case-timeline">
        <h2>{c.timeline}</h2>
        <ol>{timeline.slice(0, showAll ? timeline.length : 3).map((line) => <li key={line}>{line}</li>)}</ol>
        <button className="text-button" onClick={() => setShowAll(!showAll)}>{showAll ? c.showLess : c.showAll}</button>
      </section>
      <Link className="button button-primary case-bottom-cta" href="/start">{c.start} →</Link>
    </div>
    {messageOpen && <div className="sheet-backdrop" role="presentation" onClick={() => setMessageOpen(false)}>
      <div className="sample-sheet" role="dialog" aria-modal="true" aria-label={c.messageTitle} onClick={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-heading"><h2>{c.messageTitle}</h2><button className="text-button" onClick={() => setMessageOpen(false)}>{c.close}</button></div>
        <p className="example-source">{c.sendNote}</p>
        <pre>{c.messageBody}</pre>
        <button className="button button-primary" onClick={() => setMessageOpen(false)}>{c.close}</button>
      </div>
    </div>}
  </main>;
}
