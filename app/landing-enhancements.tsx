"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { flightLandingCopy as c } from "./copy";
import { CASE_STORAGE_KEY, type SavedCase } from "../lib/case-link";
import { savedCasesNotice } from "../lib/app-url";


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
    const observer = new IntersectionObserver(entries => { for(const entry of entries){if(entry.target===hero)setShowSticky(!entry.isIntersecting);else if(entry.isIntersecting){entry.target.classList.add("is-revealed");observer.unobserve(entry.target);}} }, { threshold: 0 });
    document.querySelectorAll("[data-reveal]").forEach(node=>{node.classList.add("reveal-ready");observer.observe(node);});
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return <>
    <section className="saved-cases section-wrap" aria-label="Your cases">
      <h2>Your cases</h2>
      <p>{savedCasesNotice}</p>
      <div>{cases.map((item) => <Link prefetch={false} key={item.code} className="saved-case" href={`/c/${item.code}#k=${item.token}`}>
        <span>{item.title || item.code}</span><span>Open →</span>
      </Link>)}</div>
    </section>
    <div className={`sticky-cta ${showSticky ? "is-visible" : ""}`} aria-hidden={!showSticky}>
      <Link prefetch={false} className="button button-primary" href="/start" tabIndex={showSticky ? 0 : -1}>{c.primary} <span aria-hidden="true">→</span></Link>
    </div>
  </>;
}
