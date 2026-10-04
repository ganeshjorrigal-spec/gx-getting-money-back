import { randomBytes, createHash } from "node:crypto";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";

const url = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!url) throw new Error("Missing local Convex URL");
const client = new ConvexHttpClient(url);
const fixtures = [
  ["OVERDUE", "9 Sep 2026. BookMyShow: Booking BKMY909 for Monsoon Live was cancelled. Refund of Rs 3,500 to the original payment method within 7-10 working days. Still nothing in my account.", "2026-09-23"],
  ["ACTION_NEEDED", "BookMyShow: The match on 12 Apr 2026 at Ahmedabad stadium has moved to Chennai. Request a refund by filling the form by 20 Apr 2026. Physical tickets must reach the box office for scanning first."],
  ["FAILED_PAYMENT", "Paid Rs 2,400 on District by UPI on 3 Oct 2026 for a comedy show. The app said payment failed. Money debited, no ticket."],
  ["OUT_OF_SCOPE", "IndiGo cancelled my flight on 2 Oct 2026. Refund of Rs 6,200 still pending."],
] as const;
let failures = 0;
for (const [expected, message, expectedDue] of fixtures.filter(([route]) => !process.env.SMOKE_ONLY || route === process.env.SMOKE_ONLY)) {
  const token = randomBytes(32).toString("base64url");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const started = Date.now();
  const { code } = await client.mutation(api.cases.create, { text: message, storageIds: [], chips: [], tokenHash, deviceId: randomBytes(24).toString("base64url"), source: "synthetic_qa" });
  let outcome = "TIMEOUT";
  let due = "";
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const data = await client.query(api.cases.get, { code, token });
    if (data?.stage === "ERROR") { outcome = "ERROR"; break; }
    if (data?.route && data.stage !== "TRIAGING") { outcome = data.route; due = data.dueDate ?? ""; break; }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  const passed = outcome === expected && (!expectedDue || due === expectedDue);
  if (!passed) failures += 1;
  process.stdout.write(`${expected}: ${outcome}, due ${due || "—"}, ${Date.now() - started} ms ${passed ? "PASS" : "FAIL"}\n`);
}
if (failures) process.exitCode = 1;
