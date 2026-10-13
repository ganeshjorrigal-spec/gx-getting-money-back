"use client";
import {Mascot} from "../components/brand";

import { useEffect, useState } from "react";
import CaseProvider from "../convex-provider";
import { caseCodeFromSearch } from "../../lib/case-link";
import CaseView from "./case-view";

export default function StaticCasePage() {
  const [code, setCode] = useState<string | null>(null);
  useEffect(() => {
    setCode(caseCodeFromSearch(window.location.search));
  }, []);
  if (code === null) return <main className="case-shell"><Mascot head/><p>Opening your case…</p></main>;
  if (!code) return <main className="case-shell"><h1>This case link is missing its code.</h1></main>;
  return <CaseProvider><CaseView code={code} /></CaseProvider>;
}
