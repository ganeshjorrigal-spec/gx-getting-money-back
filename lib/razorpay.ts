export function checkoutKeyMatches(serverKeyId: string | undefined, publicKeyId: string): boolean { return !!serverKeyId && serverKeyId === publicKeyId; }
export function checkoutEligible(item: { refundType?: string; demo?: unknown; handHelped?: boolean }): boolean {
  return !item.demo && !item.handHelped;
}
export async function validPaymentSignature(secret: string, storedOrderId: string, orderId: string, paymentId: string, signature: string): Promise<boolean> {
  if (!storedOrderId || storedOrderId !== orderId || !/^order_[A-Za-z0-9]+$/.test(orderId) || !/^pay_[A-Za-z0-9]+$/.test(paymentId) || !/^[a-fA-F0-9]{64}$/.test(signature)) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const bytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${storedOrderId}|${paymentId}`)));
  let difference = 0;
  for (let i = 0; i < bytes.length; i++) difference |= bytes[i] ^ parseInt(signature.slice(i * 2, i * 2 + 2), 16);
  return difference === 0;
}
