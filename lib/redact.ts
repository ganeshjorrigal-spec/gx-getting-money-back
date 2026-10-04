function passesLuhn(digits: string): boolean {
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let digit = Number(digits[i]);
    if (double) { digit *= 2; if (digit > 9) digit -= 9; }
    sum += digit;
    double = !double;
  }
  return sum % 10 === 0;
}

export function redact(text: string): string {
  const withoutCards = text.replace(/(?<!\d)(?:\d[ -]?){12,18}\d(?!\d)/g, (candidate) => {
    const digits = candidate.replace(/\D/g, "");
    return digits.length >= 13 && digits.length <= 19 && passesLuhn(digits) ? "[card number removed]" : candidate;
  });
  return withoutCards.replace(/\b\d{4,8}\b/g, (candidate, offset: number, whole: string) => {
    const around = whole.slice(Math.max(0, offset - 30), offset + candidate.length + 30);
    return /\b(?:otp|one[ -]?time password|verification code|pin)\b/i.test(around) ? "[code removed]" : candidate;
  });
}
