export const CASE_STORAGE_KEY = "tickback.cases";
export type SavedCase = { code: string; token: string; title?: string; amountPaise?: number; route?: string; updatedAt: number };

export function makeToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function tokenHash(token: string): Promise<string> {
  const bytes = new TextEncoder().encode(token);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function getDeviceId(): string {
  try {
    const existing = localStorage.getItem("tickback.deviceId");
    if (existing) return existing;
    const value = makeToken();
    localStorage.setItem("tickback.deviceId", value);
    return value;
  } catch { return makeToken(); }
}

export function saveCase(item: SavedCase): void {
  try {
    const previous = JSON.parse(localStorage.getItem(CASE_STORAGE_KEY) || "[]") as SavedCase[];
    const items = Array.isArray(previous) ? previous.filter((saved) => saved.code !== item.code) : [];
    items.unshift(item);
    localStorage.setItem(CASE_STORAGE_KEY, JSON.stringify(items.slice(0, 20)));
  } catch { /* A private link remains usable when device storage is blocked. */ }
}

export function forgetCase(code: string): void {
  try {
    const previous = JSON.parse(localStorage.getItem(CASE_STORAGE_KEY) || "[]") as SavedCase[];
    if (Array.isArray(previous)) localStorage.setItem(CASE_STORAGE_KEY, JSON.stringify(previous.filter((item) => item.code !== code)));
  } catch { /* The private link still controls server deletion. */ }
}
