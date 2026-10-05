import { addDays } from "./dates";

export function buildMailto(to: string, subject: string, body: string, cc?: string): { url: string; copyFirst: boolean } {
  const address = encodeURIComponent(to.trim());
  const title = encodeURIComponent(subject);
  const ccParam = cc ? `&cc=${encodeURIComponent(cc)}` : "";
  const full = `mailto:${address}?subject=${title}${ccParam}&body=${encodeURIComponent(body.replace(/\r?\n/g, "\r\n"))}`;
  if (full.length <= 1900) return { url: full, copyFirst: false };
  return {
    url: `mailto:${address}?subject=${title}${ccParam}&body=${encodeURIComponent("Your message is copied. Long-press here and tap Paste.")}`,
    copyFirst: true,
  };
}

export function buildGoogleCalendar(date: string, title: string, description: string): string {
  const day = date.replace(/-/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE", text: title, dates: `${day}T100000/${day}T101500`, details: description, ctz: "Asia/Kolkata",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeIcs(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function fold(line: string): string {
  const encoder = new TextEncoder();
  let result = "";
  let width = 0;
  for (const char of line) {
    const size = encoder.encode(char).length;
    if (width + size > 75) { result += "\r\n "; width = 1; }
    result += char;
    width += size;
  }
  return result;
}

export function buildIcs(input: { code: string; date: string; title: string; description: string; domain: string; checkinId: string; now?: Date }): string {
  const day = input.date.replace(/-/g, "");
  const stamp = (input.now ?? new Date()).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Tickback//Refund check-in//EN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
    `UID:${input.code}-${input.checkinId}@${input.domain}`, `DTSTAMP:${stamp}`,
    `DTSTART;TZID=Asia/Kolkata:${day}T100000`, `DTEND;TZID=Asia/Kolkata:${day}T101500`,
    `SUMMARY:${escapeIcs(input.title)}`, `DESCRIPTION:${escapeIcs(input.description)}`,
    "BEGIN:VALARM", "ACTION:DISPLAY", "TRIGGER:-PT0M", `DESCRIPTION:${escapeIcs(input.title)}`, "END:VALARM",
    "END:VEVENT", "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}

export function checkinDate(dueDate: string): string { return addDays(dueDate, 1); }

export function buildUpiLink(vpa: string, payeeName: string, caseCode: string): string {
  const params = new URLSearchParams({ pa: vpa, pn: payeeName, am: "49.00", tn: caseCode, cu: "INR" });
  return `upi://pay?${params.toString()}`;
}
