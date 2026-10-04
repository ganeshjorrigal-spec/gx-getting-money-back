import Link from "next/link";
import { landingCopy as l, productName } from "../copy";
import "./taste.css";

const directions = [
  { code: "A", name: "Calm Ledger", className: "taste-a" },
  { code: "B", name: "Friendly Helper", className: "taste-b" },
  { code: "C", name: "Case File", className: "taste-c" },
];

export default function TastePage() {
  return <main className="taste-page">
    <header className="site-header"><Link className="wordmark" href="/">{productName}<span className="wordmark-dot">.</span></Link><span>Design directions</span></header>
    <div className="taste-intro section-wrap"><h1>Three ways to see the same case.</h1><p>The words and layout stay the same. Only the visual style changes.</p></div>
    {directions.map((direction) => <section className={`taste-direction ${direction.className}`} key={direction.code}>
      <div className="section-wrap">
        <p className="taste-label">Direction {direction.code} / {direction.name}</p>
        <div className="taste-pair">
          <div className="taste-phone">
            <p className="taste-screen-label">Landing hero</p>
            <div className="taste-phone-content">
              <span className="wordmark">{productName}<span className="wordmark-dot">.</span></span>
              <p className="eyebrow">{l.eyebrow}</p>
              <h2>{l.headline}</h2>
              <p>{l.sub}</p>
              <span className="button button-primary">{l.primary}</span>
              <span className="button button-secondary">{l.secondary}</span>
              <small>{l.trust}</small>
            </div>
          </div>
          <div className="taste-phone">
            <p className="taste-screen-label">US-1 case card</p>
            <div className="taste-phone-content">
              <span className="wordmark">{productName}<span className="wordmark-dot">.</span></span>
              <p className="eyebrow">{l.example.platform}</p>
              <h2>{l.example.event}</h2>
              <div className="taste-case-card">
                <span className="route-chip">{l.example.route}</span>
                <p className="case-amount">{l.example.amount}</p>
                <h3>{l.example.due}</h3>
                <p>{l.example.source}</p>
                <div className="example-next">{l.example.next}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>)}
  </main>;
}
