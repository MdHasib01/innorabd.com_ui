"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t-2 border-gold bg-burgundy px-5 py-[35px] text-center text-sm text-[#bbb]">
      <div className="mb-1.5 font-brand text-[22px] font-bold text-gold">INNORA BD™</div>
      <p>{t.footer.address}</p>
      <p className="mt-2 text-xs text-[#888]">{t.footer.rights}</p>
    </footer>
  );
}
