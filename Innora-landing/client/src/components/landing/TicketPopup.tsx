"use client";

import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { modalClose, modalContent, modalOverlay } from "./dialog-styles";
import { TicketImage } from "./TicketImage";

type Props = { open: boolean; onOpenChange: (open: boolean) => void; ticketsLeft: number };

export function TicketPopup({ open, onOpenChange, ticketsLeft }: Props) {
  const { t, n } = useLanguage();

  const goToOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpenChange(false);
    // Wait for the dialog to release scroll lock before scrolling
    setTimeout(() => document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className={modalContent} overlayClassName={modalOverlay}>
        <DialogClose className={modalClose} aria-label={t.popup.close}>
          ✕
        </DialogClose>
        <div className="bg-burgundy p-2">
          <TicketImage alt={t.ticket.imgAlt} className="block h-auto w-full rounded-md border border-gold" />
        </div>
        <div className="px-5 py-[22px] text-center">
          <div className="mb-3 inline-block rounded-[20px] border border-[#ffcdd2] bg-[#ffebee] px-4 py-1.5 text-sm font-bold text-alert">
            {t.popup.stockBefore}
            <span>{n(ticketsLeft)}</span>
            {t.popup.stockAfter}
          </div>
          <DialogTitle className="mb-1.5 text-[19px] leading-snug font-bold text-burgundy">{t.popup.heading}</DialogTitle>
          <DialogDescription className="mb-4 text-sm text-[#555]">{t.popup.body}</DialogDescription>
          <a
            href="#order-section"
            onClick={goToOrder}
            className={cn(buttonVariants({ variant: "gold" }), "block h-auto rounded-md p-3 text-base")}
          >
            {t.popup.cta}
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
