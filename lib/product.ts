export const productName = "Refund Genie";

// Refresh generated copy without rewriting saved evidence or address identifiers.
export function currentProductCopy<T extends string | null | undefined>(text: T): T {
  return (typeof text === "string" ? text.replace(/Tickback/g, productName) : text) as T;
}
