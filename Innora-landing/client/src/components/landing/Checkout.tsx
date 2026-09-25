"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { PaymentMethod } from "@/lib/api";
import { COD_DELIVERY_FEE, MAX_QTY, ticketsFor, UNIT_PRICE } from "@/lib/campaign";
import { toAsciiDigits } from "@/lib/format";
import { TitleBlock } from "./TitleBlock";

export type CustomerInfo = { name: string; phone: string; address: string };

export const PHONE_PATTERN = "01[3-9][0-9]{8}";

const inputClass =
  "mb-4 h-auto rounded-lg border-[#ddd] bg-white p-3.5 text-[15px] md:text-[15px] focus-visible:border-gold focus-visible:ring-gold/30";

type Props = {
  variantTitle: string;
  qty: number;
  onQtyChange: (qty: number) => void;
  payment: PaymentMethod;
  onPaymentChange: (p: PaymentMethod) => void;
  customer: CustomerInfo;
  onCustomerChange: (c: CustomerInfo) => void;
  submitting: boolean;
  onSubmit: () => void;
};

export function Checkout({
  variantTitle,
  qty,
  onQtyChange,
  payment,
  onPaymentChange,
  customer,
  onCustomerChange,
  submitting,
  onSubmit,
}: Props) {
  const { t, n } = useLanguage();
  const isAdvance = payment === "advance";
  const subtotal = qty * UNIT_PRICE;
  const total = subtotal + (isAdvance ? 0 : COD_DELIVERY_FEE);

  const setField = (field: keyof CustomerInfo) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onCustomerChange({ ...customer, [field]: field === "phone" ? toAsciiDigits(e.target.value) : e.target.value });

  return (
    <div id="order-section" className="scroll-mt-24 rounded-2xl border-2 border-gold bg-white px-[18px] py-[25px] shadow-[0_15px_50px_rgba(35,6,14,0.08)] md:p-10">
      <TitleBlock title={t.checkout.heading} subtitle={t.checkout.subheading} className="mb-[25px]" />

      <div className="mb-[25px] rounded-lg border-[1.5px] border-gold bg-[#fff9e8] px-5 py-3.5 text-center text-base text-[#553a04]">
        {t.checkout.selectedItems} <b>{variantTitle}</b> × <b>{n(qty)}</b>
        {t.checkout.pieces} | {t.checkout.totalTickets}{" "}
        <strong className="text-lg text-alert">
          {n(ticketsFor(qty))}
          {t.checkout.pieces}
        </strong>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="mb-5 flex flex-wrap items-center gap-[15px]">
          <span className="text-[15px] font-bold">{t.checkout.qtyLabel}</span>
          <div className="flex items-center gap-[15px]">
            <Button
              type="button"
              variant="outline"
              className="size-[38px] rounded-md border-[#ccc] bg-white text-lg font-bold"
              onClick={() => onQtyChange(Math.max(1, qty - 1))}
              aria-label="-1"
            >
              -
            </Button>
            <span className="min-w-[25px] text-center text-lg font-extrabold">{n(qty)}</span>
            <Button
              type="button"
              variant="outline"
              className="size-[38px] rounded-md border-[#ccc] bg-white text-lg font-bold"
              onClick={() => onQtyChange(Math.min(MAX_QTY, qty + 1))}
              aria-label="+1"
            >
              +
            </Button>
          </div>
        </div>

        <Input
          className={inputClass}
          placeholder={t.checkout.namePh}
          autoComplete="name"
          required
          maxLength={120}
          value={customer.name}
          onChange={setField("name")}
        />
        <Input
          type="tel"
          className={inputClass}
          placeholder={t.checkout.phonePh}
          autoComplete="tel"
          inputMode="numeric"
          required
          pattern={PHONE_PATTERN}
          title={t.errors.invalid}
          value={customer.phone}
          onChange={setField("phone")}
        />
        <Input
          className={inputClass}
          placeholder={t.checkout.addressPh}
          autoComplete="street-address"
          required
          maxLength={500}
          value={customer.address}
          onChange={setField("address")}
        />

        <div className="mb-[25px] rounded-lg border border-[#e5dacb] bg-cream p-4">
          <div className="mb-2.5 font-bold text-burgundy">{t.checkout.paymentTitle}</div>
          <RadioGroup value={payment} onValueChange={(v) => onPaymentChange(v as PaymentMethod)} className="gap-2.5">
            <label className="flex cursor-pointer items-center gap-2.5">
              <RadioGroupItem value="cod" className="border-[#888]" />
              <span>
                <strong>{t.checkout.cod}</strong>
                {t.checkout.codFee(n(COD_DELIVERY_FEE))}
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-2.5">
              <RadioGroupItem value="advance" className="border-[#888]" />
              <span className="text-[#2e7d32]">
                <strong>{t.checkout.advance}</strong> — <b>{t.checkout.advanceFee}</b>
              </span>
            </label>
          </RadioGroup>
        </div>

        <div className="mb-[22px] flex justify-between text-[22px] font-extrabold text-burgundy">
          <span>{t.checkout.grandTotal}</span>
          <span>৳{n(total)}</span>
        </div>

        <Button type="submit" variant={isAdvance ? "success" : "gold"} size="block" disabled={submitting}>
          {submitting
            ? t.checkout.submitting
            : isAdvance
              ? t.checkout.submitAdvance(n(subtotal))
              : t.checkout.submitCod(n(total))}
        </Button>
      </form>
    </div>
  );
}
