import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { validEmail } from "./case-email";

export function requireResponsesSetupSecret(supplied: unknown): void {
  const expected = process.env.RESPONSES_SETUP_SECRET;
  if (!expected || expected.length < 32 || typeof supplied !== "string" ||
      !timingSafeEqual(createHash("sha256").update(supplied).digest(), createHash("sha256").update(expected).digest())) {
    throw new Error("Responses owner setup is unavailable or not authorised");
  }
}

// Bind the one-time OAuth state to an owner-authorised setup, without storing
// the secret or adding it to the Google URL. Rotation invalidates pending states.
export function responsesSetupProof(state: string): string {
  requireResponsesSetupSecret(process.env.RESPONSES_SETUP_SECRET);
  return createHmac("sha256", process.env.RESPONSES_SETUP_SECRET!).update(state).digest("hex");
}

export function requireResponsesSetupProof(state: string, proof: string | null | undefined): void {
  const expected = responsesSetupProof(state);
  if (!proof || !/^[a-f0-9]{64}$/.test(proof) || !timingSafeEqual(Buffer.from(proof, "hex"), Buffer.from(expected, "hex"))) {
    throw new Error("Responses owner setup was not authorised or has expired");
  }
}

export function requireResponsesOwner(email: unknown): void {
  const owner = process.env.TICKBACK_INBOX_ADDRESS?.trim().toLowerCase();
  if (!validEmail(owner) || !validEmail(email) || email.trim().toLowerCase() !== owner) {
    throw new Error("Choose the configured owner account for the Responses sheet");
  }
}
