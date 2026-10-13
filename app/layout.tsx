import type { Metadata } from "next";
import { Fraunces, Public_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { metaCopy } from "./copy";
import { DomainNotice } from "./domain-notice";

const fraunces = Fraunces({ subsets: ["latin"], display: "swap", variable: "--font-fraunces", weight: ["500", "700"] });
const publicSans = Public_Sans({ subsets: ["latin"], display: "swap", variable: "--font-public-sans", weight: ["400", "600"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jetbrains-mono", weight: "400", preload: false });

export const metadata: Metadata = {
  title: metaCopy.title,
  description: metaCopy.description,
  metadataBase: new URL("https://refundgenie.app"),
  alternates: { canonical: "https://refundgenie.app" },
  openGraph: { title: metaCopy.title, description: metaCopy.description, url: "https://refundgenie.app" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${publicSans.variable} ${jetbrainsMono.variable}`}>
      <head>{process.env.CONVEX_STATIC_EXPORT === "1" && <script dangerouslySetInnerHTML={{ __html: "(()=>{const m=location.pathname.match(/^\\/c\\/((?:TB|RG)-[A-Z0-9]{6})\\/?$/);if(m)location.replace('/c/index.html?code='+m[1]+location.hash)})()" }} />}</head>
      <body><DomainNotice />{children}</body>
    </html>
  );
}
