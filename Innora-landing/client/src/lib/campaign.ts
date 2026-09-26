import type { VariantKey } from "@/i18n/dictionaries";

// Display values — the API recalculates the bill server-side.
export const UNIT_PRICE = 599;
export const REGULAR_PRICE = 1250;
export const COD_DELIVERY_FEE = 100;
export const MAX_QTY = 20;
export const PAYMENT_NUMBER = "01989399740";
export const HOTLINE = "+8801989399740";
export const HOTLINE_DISPLAY = "+880 1989-399 740";
export const FACEBOOK_URL = "https://facebook.com";

export const HERO_SLIDES = [
  "/85636338b2c27eedb11f0413101825db.jpg",
  "/c98fea6dc35ae151e288c47cf20b07d8.jpg",
  "/5531d13a4f5a40efb03ace747e9556b8.jpg",
];

export const TICKET_IMG = "/images/honeymoon-ticket-v2.webp";
export const TICKET_IMG_FALLBACK = "/images/honeymoon-ticket-v2.png";

export const VARIANTS: { key: VariantKey; img: string; color: string }[] = [
  { key: "burgundy", img: "/images/products/innora-burgundy.webp", color: "#741d37" },
  { key: "red", img: "/images/products/innora-red.webp", color: "#c62631" },
  { key: "lavender", img: "/images/products/innora-lavender.webp", color: "#a67cad" },
];

export const ticketsFor = (qty: number) => (qty === 1 ? 1 : qty === 2 ? 3 : Math.floor(qty * 1.5));

export const discountPct = Math.round((1 - UNIT_PRICE / REGULAR_PRICE) * 100);

/** Tickets left today — same heuristic as the original page. */
export function ticketsLeftToday(date = new Date()) {
  return Math.max(14, 75 - Math.floor((date.getHours() / 24) * 60));
}
