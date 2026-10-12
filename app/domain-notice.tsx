"use client";

import { useEffect, useState } from "react";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import { savedCasesNotice } from "../lib/app-url";

export function DomainNotice() {
  const [moved, setMoved] = useState(false);
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!url) return;
    let active = true;
    void new ConvexHttpClient(url).query(api.site.urls, {}).then(({ app, oldApp }) => {
      if (active && app && oldApp && new URL(app).origin !== new URL(oldApp).origin && location.origin === new URL(oldApp).origin) setMoved(true);
    }).catch(() => {});
    return () => { active = false; };
  }, []);
  return moved ? <aside className="section-wrap" aria-label="New address"><p>We've moved to <a href="https://refundgenie.app">refundgenie.app</a>.</p><p>{savedCasesNotice}</p></aside> : null;
}
