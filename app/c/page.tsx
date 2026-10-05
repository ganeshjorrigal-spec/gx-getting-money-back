"use client";

import { useEffect, useState } from "react";
import CaseProvider from "../convex-provider";
import CaseView from "./case-view";

export default function StaticCasePage() {
  const [code, setCode] = useState<string | null>(null);
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("code");
    setCode(value && /^TB-[A-Z0-9]{6}$/.test(value) ? value : "");
  }, []);
  if (code === null) return <main className="case-shell"><p>Opening your case…</p></main>;
  if (!code) return <main className="case-shell"><h1>This case link is missing its code.</h1></main>;
  return <CaseProvider><CaseView code={code} /></CaseProvider>;
}
