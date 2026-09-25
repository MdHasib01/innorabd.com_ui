"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { FACEBOOK_URL } from "@/lib/campaign";
import { TicketImage } from "./TicketImage";

export function TicketShowcase() {
  const { t } = useLanguage();

  return (
    <>
      <div className="mb-[60px] rounded-2xl border-2 border-gold bg-[linear-gradient(135deg,#2a0812,#180308)] px-5 py-10 text-center text-white shadow-[0_15px_45px_rgba(35,6,14,0.2)] sm:px-[30px]">
        <span className="mb-3 inline-block rounded-[30px] bg-(image:--gold-gradient) px-5 py-1.5 text-[13px] font-extrabold tracking-[1.5px] text-burgundy uppercase">
          {t.ticket.pill}
        </span>
        <h2 className="mb-2.5 text-[30px] leading-snug font-bold text-gold-light">{t.ticket.heading}</h2>
        <p className="mx-auto max-w-[650px] text-base text-[#ddd]">{t.ticket.body}</p>

        <div className="relative mx-auto my-[25px] max-w-[680px] overflow-hidden rounded-xl border border-gold shadow-[0_12px_35px_rgba(0,0,0,0.6)]">
          <TicketImage alt={t.ticket.imgAlt} className="block h-auto w-full" />
        </div>

        <p className="text-[15px] text-gold-light">
          💡 <strong>{t.ticket.specialLabel}</strong> {t.ticket.specialText}
          <strong>{t.ticket.specialStrong}</strong>
        </p>
      </div>

      <div className="mb-[50px] rounded-xl border-2 border-dashed border-gold bg-white p-[30px] text-center">
        <h3 className="mb-1.5 text-[22px] leading-snug font-bold text-burgundy">{t.follow.heading}</h3>
        <p className="mx-auto max-w-[600px] text-sm text-[#666]">{t.follow.body}</p>
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block rounded-[30px] bg-[#1877f2] px-[30px] py-3 font-bold text-white"
        >
          {t.follow.cta}
        </a>
      </div>
    </>
  );
}
