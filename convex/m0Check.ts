import { query } from "./_generated/server";

export const cryptoDigestAvailable = query({
  args: {},
  handler: async () => {
    const bytes = new TextEncoder().encode("tickback-m0");
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return digest.byteLength === 32;
  },
});
