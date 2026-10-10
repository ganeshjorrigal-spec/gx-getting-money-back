import Link from "next/link";
import { productName } from "./copy";
import { PolicyFooter } from "./policy-footer";

export function PolicyPage({ title, children }: { title: string; children: React.ReactNode }) {
  return <main className="case-shell"><header className="site-header"><Link className="wordmark" href="/">{productName}<span className="wordmark-dot">.</span></Link><Link className="text-link" href="/">Home</Link></header><div className="case-wrap privacy-content"><h1>{title}</h1>{children}<PolicyFooter /></div></main>;
}
