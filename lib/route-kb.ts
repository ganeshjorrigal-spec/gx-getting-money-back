export type VerifiedContact = { value: string; source: string };
export type RouteEntry = {
  key: string;
  displayName: string;
  chatFirst: boolean;
  chatPath?: VerifiedContact;
  supportEmail?: VerifiedContact;
  grievanceEmail?: VerifiedContact;
};

export const routeKb: Record<string, RouteEntry> = {
  bookmyshow: {
    key: "bookmyshow",
    displayName: "BookMyShow",
    chatFirst: true,
    chatPath: { value: "BookMyShow app or website → Help & Support → Live Chat", source: "https://support.bookmyshow.com/support/solutions/articles/4000159869-do-you-have-unresolved-queries-" },
  },
  district: {
    key: "district",
    displayName: "District",
    chatFirst: false,
    chatPath: { value: "District app → Help → in-app chat", source: "https://www.district.in/contact" },
    supportEmail: { value: "support@district.in", source: "https://www.district.in/contact" },
  },
};

export function routeFor(platform: string | null | undefined): RouteEntry | null {
  const key = (platform ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
  if (key.includes("bookmyshow")) return routeKb.bookmyshow;
  if (key.includes("district")) return routeKb.district;
  return routeKb[key] ?? null;
}
