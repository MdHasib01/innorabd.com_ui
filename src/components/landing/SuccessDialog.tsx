"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { OrderResult, PaymentMethod } from "@/lib/api";
import { modalClose, modalContent, modalOverlay } from "./dialog-styles";

type Props = { result: (OrderResult & { paymentMethod: PaymentMethod }) | null; onClose: () => void };

export function SuccessDialog({ result, onClose }: Props) {
  const { t, n } = useLanguage();

  return (
    <Dialog open={result !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton={false} className={modalContent} overlayClassName={modalOverlay}>
        <DialogClose className={modalClose} aria-label={t.popup.close}>
          ✕
        </DialogClose>
        {result && (
          <>
            <div className="border-b-2 border-gold bg-burgundy p-[18px] text-center">
              <div className="text-3xl">🎉</div>
              <DialogTitle className="text-xl leading-snug font-bold text-gold-light">{t.success.heading}</DialogTitle>
            </div>
            <div className="p-[22px] text-center">
              <DialogDescription className="mb-4 text-[15px] text-[#555]">
                {result.paymentMethod === "advance" ? t.success.advance : t.success.cod}
              </DialogDescription>

              <div className="mb-4 space-y-1 rounded-lg border-[1.5px] border-dashed border-gold bg-cream p-3 text-sm">
                <div>
                  {t.success.orderNumber} <strong className="font-mono text-burgundy">{result.orderNumber}</strong>
                </div>
                <div>
                  {t.success.total} <strong className="text-burgundy">৳{n(result.total)}</strong>
                </div>
                <div className="pt-1">{t.success.tickets}</div>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {result.tickets.map((serial) => (
                    <span key={serial} className="rounded bg-burgundy px-2 py-0.5 font-mono text-xs text-gold-light">
                      {serial}
                    </span>
                  ))}
                </div>
              </div>

              <Button variant="gold" size="block" onClick={onClose}>
                {t.success.ok}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
