"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { PaymentProvider } from "@/lib/api";
import { PAYMENT_NUMBER } from "@/lib/campaign";
import { toAsciiDigits } from "@/lib/format";
import { cn } from "@/lib/utils";
import { PHONE_PATTERN } from "./Checkout";
import { modalClose, modalContent, modalOverlay } from "./dialog-styles";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  submitting: boolean;
  onSubmit: (details: { provider: PaymentProvider; senderNumber: string; trxId: string }) => void;
};

const inputClass =
  "mb-4 h-auto rounded-lg border-[#ddd] bg-white p-3.5 text-[15px] md:text-[15px] focus-visible:border-gold focus-visible:ring-gold/30";

export function PaymentDialog({ open, onOpenChange, amount, submitting, onSubmit }: Props) {
  const { t, n } = useLanguage();
  const [provider, setProvider] = useState<PaymentProvider>("bKash");
  const [senderNumber, setSenderNumber] = useState("");
  const [trxId, setTrxId] = useState("");

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(PAYMENT_NUMBER);
      toast.success(t.pay.copied(PAYMENT_NUMBER));
    } catch {
      toast.info(PAYMENT_NUMBER);
    }
  };

  const tabClass = (p: PaymentProvider) =>
    cn(
      "cursor-pointer rounded-md border-2 border-[#ddd] bg-[#fafafa] p-2.5 text-center text-sm font-bold",
      provider === p && p === "bKash" && "border-bkash bg-[#fff0f5] text-bkash",
      provider === p && p === "Nagad" && "border-nagad bg-[#fff6ee] text-nagad",
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(modalContent, "max-h-[calc(100dvh-30px)] overflow-y-auto")}
        overlayClassName={cn(modalOverlay, "bg-black/85 backdrop-blur-[6px]")}
      >
        <DialogClose className={modalClose} aria-label={t.popup.close}>
          ✕
        </DialogClose>

        <div className="border-b-2 border-gold bg-burgundy p-[18px] text-center text-white">
          <DialogTitle className="text-xl leading-snug font-bold text-gold-light">{t.pay.heading}</DialogTitle>
          <DialogDescription className="text-[13px] text-[#ddd]">
            {t.pay.amountLabel} <strong className="text-[17px] text-gold-light">৳{n(amount)}</strong> {t.pay.freeDelivery}
          </DialogDescription>
        </div>

        <div className="p-[22px]">
          <div className="mb-[18px] grid grid-cols-2 gap-3">
            <button type="button" className={tabClass("bKash")} onClick={() => setProvider("bKash")}>
              {t.pay.bkashTab}
            </button>
            <button type="button" className={tabClass("Nagad")} onClick={() => setProvider("Nagad")}>
              {t.pay.nagadTab}
            </button>
          </div>

          <div className="mb-[18px] flex items-center justify-between rounded-lg border-[1.5px] border-dashed border-gold bg-cream p-3">
            <div>
              <small className="font-semibold text-[#666]">{provider === "bKash" ? t.pay.bkashNumber : t.pay.nagadNumber}</small>
              <div className="text-[17px] font-extrabold text-burgundy">{PAYMENT_NUMBER}</div>
            </div>
            <button
              type="button"
              onClick={copyNumber}
              className="cursor-pointer rounded-[20px] bg-burgundy px-4 py-[7px] text-[13px] font-semibold text-white"
            >
              {t.pay.copy}
            </button>
          </div>

          <div className="mb-[18px] border-l-4 border-gold bg-[#fff9f0] px-3.5 py-3 text-[13px] text-[#444]">
            <strong>{t.pay.instructionsTitle}</strong>
            <ol className="ml-[18px] list-decimal">
              <li>
                {t.pay.step1a}
                <strong>&quot;Send Money&quot;</strong>
                {t.pay.step1b}
              </li>
              <li>
                {t.pay.step2a}
                <strong>Transaction ID (TrxID)</strong>
                {t.pay.step2b}
              </li>
              <li>{t.pay.step3}</li>
            </ol>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit({ provider, senderNumber, trxId: trxId.trim().toUpperCase() });
            }}
          >
            <Input
              type="tel"
              inputMode="numeric"
              className={inputClass}
              placeholder={t.pay.senderPh}
              required
              pattern={PHONE_PATTERN}
              title={t.errors.invalid}
              value={senderNumber}
              onChange={(e) => setSenderNumber(toAsciiDigits(e.target.value))}
            />
            <Input
              className={cn(inputClass, "uppercase placeholder:normal-case")}
              placeholder={t.pay.trxPh}
              required
              maxLength={40}
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
            />
            <Button type="submit" variant="gold" size="block" disabled={submitting}>
              {submitting ? t.checkout.submitting : t.pay.submit}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
