import type { Locale, VariantKey } from "@/i18n/dictionaries";

export type PaymentMethod = "cod" | "advance";
export type PaymentProvider = "bKash" | "Nagad";

export type OrderPayload = {
  name: string;
  phone: string;
  address: string;
  variant: VariantKey;
  quantity: number;
  paymentMethod: PaymentMethod;
  advancePayment?: { provider: PaymentProvider; senderNumber: string; trxId: string };
  lang: Locale;
};

export type OrderResult = {
  orderNumber: string;
  total: number;
  tickets: string[];
  status: string;
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function createOrder(payload: OrderPayload): Promise<OrderResult> {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, data.error ?? res.statusText);
  return data as OrderResult;
}
