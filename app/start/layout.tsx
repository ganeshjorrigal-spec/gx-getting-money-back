import CaseProvider from "../convex-provider";

export default function StartLayout({ children }: { children: React.ReactNode }) {
  return <CaseProvider>{children}</CaseProvider>;
}
