import { Bricolage_Grotesque, IBM_Plex_Mono, Manrope, Source_Serif_4 } from "next/font/google";

const bricolage = Bricolage_Grotesque({ subsets: ["latin", "latin-ext"], variable: "--font-bricolage", preload: false });
const manrope = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-manrope", preload: false });
const sourceSerif = Source_Serif_4({ subsets: ["latin", "latin-ext"], variable: "--font-source-serif", preload: false });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin", "latin-ext"], weight: "500", variable: "--font-ibm-mono", preload: false });

export default function TasteLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${bricolage.variable} ${manrope.variable} ${sourceSerif.variable} ${ibmPlexMono.variable}`}>{children}</div>;
}
