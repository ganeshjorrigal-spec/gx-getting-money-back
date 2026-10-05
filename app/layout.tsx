import type { Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";
import "./globals.css";
import { metaCopy } from "./copy";

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
});

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  variable: "--font-newsreader",
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: metaCopy.title,
  description: metaCopy.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${geist.variable} ${newsreader.variable}`}>
      <head>{process.env.CONVEX_STATIC_EXPORT === "1" && <script dangerouslySetInnerHTML={{ __html: "(()=>{const m=location.pathname.match(/^\\/c\\/(TB-[A-Z0-9]{6})\\/?$/);if(m)location.replace('/c/index.html?code='+m[1]+location.hash)})()" }} />}</head>
      <body>{children}</body>
    </html>
  );
}
