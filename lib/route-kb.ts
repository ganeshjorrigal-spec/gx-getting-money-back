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
    supportEmail: { value: "escalations@bookmyshow.com", source: "https://support.bookmyshow.com/support/solutions/articles/4000159869-do-you-have-unresolved-queries-" },
    grievanceEmail: { value: "allears@bookmyshow.com", source: "https://in.bookmyshow.com/static/terms-and-conditions/" },
  },
  district: {
    key: "district",
    displayName: "District",
    chatFirst: false,
    chatPath: { value: "District app → Profile → Support → Chat with us", source: "https://www.district.in/contact" },
    supportEmail: { value: "support@district.in", source: "https://www.district.in/contact" },
    grievanceEmail: { value: "grievance@district.in", source: "https://www.district.in/policies/terms-of-service" },
  },
  paytminsider: {
    key: "paytminsider",
    displayName: "Paytm Insider / District",
    chatFirst: false,
    chatPath: { value: "District app → Profile → Support → Chat with us", source: "https://www.district.in/contact" },
    supportEmail: { value: "support@district.in", source: "https://www.district.in/contact" },
    grievanceEmail: { value: "grievance@district.in", source: "https://www.district.in/policies/terms-of-service" },
  },
  skillbox: {
    key: "skillbox",
    displayName: "SkillBox",
    chatFirst: true,
    chatPath: { value: "SkillBox app → Support", source: "https://www.skillboxes.com/contact-us" },
  },
  ticketgenie: {
    key: "ticketgenie",
    displayName: "TicketGenie",
    chatFirst: false,
    chatPath: { value: "TicketGenie WhatsApp", source: "https://www.ticketgenie.in/contactus" },
    supportEmail: { value: "info@ticketgenie.in", source: "https://www.ticketgenie.in/contactus" },
  },
};

export function routeFor(platform: string | null | undefined): RouteEntry | null {
  const key = (platform ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
  if (key.includes("bookmyshow")) return routeKb.bookmyshow;
  if (key.includes("paytm") && key.includes("insider")) return routeKb.paytminsider;
  if (key.includes("district")) return routeKb.district;
  if (key.includes("skillbox")) return routeKb.skillbox;
  if (key.includes("ticketgenie")) return routeKb.ticketgenie;
  return routeKb[key] ?? null;
}

export function verifiedEmailFor(platform: string | null | undefined, step: string): VerifiedContact | null {
  const route = routeFor(platform);
  if (!route) return null;
  return step === "L1" ? route.grievanceEmail ?? null : route.supportEmail ?? null;
}
