function keyBytes(): Uint8Array<ArrayBuffer> {
  const encoded = process.env.TOKEN_ENC_KEY;
  if (!encoded) throw new Error("Token encryption key is missing");
  const bytes = Buffer.from(encoded, "base64");
  if (bytes.length !== 32) throw new Error("Token encryption key must be 32 bytes");
  const copy = new Uint8Array(32);
  copy.set(bytes);
  return copy;
}

export async function encryptToken(token: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", keyBytes(), "AES-GCM", false, ["encrypt"]);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(token));
  return `${Buffer.from(iv).toString("base64url")}.${Buffer.from(encrypted).toString("base64url")}`;
}

export async function decryptToken(value: string): Promise<string> {
  const [iv64, ciphertext64] = value.split(".");
  if (!iv64 || !ciphertext64) throw new Error("Invalid encrypted token");
  const ivBytes = Buffer.from(iv64, "base64url");
  const cipherBytes = Buffer.from(ciphertext64, "base64url");
  const iv = new Uint8Array(ivBytes.length); iv.set(ivBytes);
  const ciphertext = new Uint8Array(cipherBytes.length); ciphertext.set(cipherBytes);
  const key = await crypto.subtle.importKey("raw", keyBytes(), "AES-GCM", false, ["decrypt"]);
  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
  return new TextDecoder().decode(decrypted);
}
