"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { landingCopy as c } from "./copy";
import { CASE_STORAGE_KEY, type SavedCase } from "../lib/case-link";


export function LandingEnhancements() {
  const [showSticky, setShowSticky] = useState(false);
  const [cases, setCases] = useState<SavedCase[]>([]);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CASE_STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setCases(saved.slice(0, 3));
    } catch { /* Older or malformed storage should not hide the landing page. */ }
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting), { threshold: 0 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return <>
    {cases.length > 0 && <section className="saved-cases section-wrap" aria-label="Your cases">
      <h2>Your cases</h2>
      <div>{cases.map((item) => <Link prefetch={false} key={item.code} className="saved-case" href={`/c/${item.code}#k=${item.token}`}>
        <span>{item.title || item.code}</span><span>Open →</span>
      </Link>)}</div>
    </section>}
    <div className={`sticky-cta ${showSticky ? "is-visible" : ""}`} aria-hidden={!showSticky}>
      <Link prefetch={false} className="button button-primary" href="/start" tabIndex={showSticky ? 0 : -1}>{c.primary} <span aria-hidden="true">→</span></Link>
    </div>
  </>;
}
