import CaseProvider from "../../convex-provider";
import type { Metadata } from "next";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return <CaseProvider>{children}</CaseProvider>;
}
