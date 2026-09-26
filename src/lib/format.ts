import type { Locale } from "@/i18n/dictionaries";

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

export function localizeDigits(value: number | string, lang: Locale): string {
  const str = String(value);
  return lang === "bn" ? str.replace(/\d/g, (d) => BN_DIGITS[Number(d)]) : str;
}

/** Convert any Bangla digits typed by the user into ASCII digits. */
export function toAsciiDigits(value: string): string {
  return value.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));
}

export const pad2 = (n: number) => (n < 10 ? `0${n}` : String(n));
