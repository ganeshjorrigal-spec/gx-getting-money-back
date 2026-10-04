import { randomBytes, createHash } from "node:crypto";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";

const url = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!url) throw new Error("Missing local Convex URL");
const client = new ConvexHttpClient(url);
const token = randomBytes(32).toString("base64url");
const tokenHash = createHash("sha256").update(token).digest("hex");
const { code } = await client.mutation(api.cases.create, {
  text: "Synthetic deletion test: a ticket refund of Rs 350 from BookMyShow was promised on 3 Oct 2026 but has not arrived.",
  storageIds: [], chips: [], tokenHash,
  deviceId: randomBytes(24).toString("base64url"), source: "synthetic_qa",
});
let ready = false;
for (let attempt = 0; attempt < 30; attempt += 1) {
  const data = await client.query(api.cases.get, { code, token });
  if (data?.stage && data.stage !== "TRIAGING") { ready = true; break; }
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
if (!ready) throw new Error("Case did not finish triage before deletion");
await client.mutation(api.cases.remove, { code, token });
if (await client.query(api.cases.get, { code, token }) !== null) throw new Error("Deleted case is still readable");
process.stdout.write("Synthetic case deletion: PASS (case no longer readable)\n");
