import type { Metadata } from "next";
import { sampleCopy as c, productName } from "../copy";
import SampleInteractive from "./sample-interactive";

export const metadata: Metadata = { title: `Sample case | ${productName}` };

export default function SamplePage() {
  return <SampleInteractive copy={c} productName={productName} />;
}
