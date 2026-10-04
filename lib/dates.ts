const DAY_MS = 86_400_000;

export function dateValue(value: string): Date {
  const date = new Date(`${value}T00:00:00.000Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error("Invalid date");
  }
  return date;
}

export function addDays(value: string, count: number): string {
  return new Date(dateValue(value).getTime() + count * DAY_MS).toISOString().slice(0, 10);
}

export function addWorkingDays(value: string, count: number): string {
  let date = value;
  let left = Math.abs(count);
  const direction = count < 0 ? -1 : 1;
  while (left > 0) {
    date = addDays(date, direction);
    const weekday = dateValue(date).getUTCDay();
    if (weekday !== 0 && weekday !== 6) left -= 1;
  }
  return date;
}

export function daysBetween(from: string, to: string): number {
  return Math.round((dateValue(to).getTime() - dateValue(from).getTime()) / DAY_MS);
}

export function todayIST(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const get = (type: string) => parts.find((part) => part.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}

export function displayDate(value: string): string {
  const date = dateValue(value);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${days[date.getUTCDay()]}, ${date.getUTCDate()} ${months[date.getUTCMonth()]}`;
}

export function shortDate(value: string): string {
  return displayDate(value).replace(/^\w+, /, "");
}
