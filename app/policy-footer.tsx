import Link from "next/link";

export function PolicyFooter() {
  return <nav aria-label="Policies and support" className="policy-links"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/refund-policy">Refund and cancellation policy</Link><Link href="/contact">Contact</Link></nav>;
}
