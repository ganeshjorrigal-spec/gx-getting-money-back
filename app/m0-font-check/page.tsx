import {pricing} from '../../lib/pricing';
export default function M0FontCheck() {
  return (
    <main>
      <p style={{ fontFamily: "var(--font-display)" }}>Fraunces: ₹{pricing.annualRupees}</p>
      <p style={{ fontFamily: "var(--font-interface)" }}>Public Sans: ₹{pricing.annualRupees}</p>
    </main>
  );
}
