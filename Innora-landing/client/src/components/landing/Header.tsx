"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { HOTLINE, HOTLINE_DISPLAY } from "@/lib/campaign";

const pillClass =
  "rounded-[20px] border border-gold bg-gold/12 px-4 py-[7px] text-[13px] font-semibold text-gold transition-colors hover:bg-gold/20";

export function Header() {
  const { t, lang, setLang } = useLanguage();

  return (
    <>
      <div className="border-b border-gold/40 bg-[linear-gradient(90deg,#180308,#420d1c,#180308)] px-[15px] py-2.5 text-center text-sm font-semibold text-gold-light">
        {t.ticker}
      </div>

      <header className="sticky top-0 z-[999] flex items-center justify-between gap-3 border-b border-gold/30 bg-[rgba(35,6,14,0.96)] px-4 py-4 backdrop-blur-[10px] sm:px-[25px]">
        <div className="font-brand text-xl font-bold tracking-[2px] text-gold sm:text-2xl">INNORA BD™</div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className={`${pillClass} cursor-pointer`}
            aria-label={lang === "bn" ? "Switch to English" : "বাংলায় দেখুন"}
          >
            🌐 {t.switchLang}
          </button>
          <a href={`tel:${HOTLINE}`} className={pillClass}>
            📞<span className="hidden sm:inline"> {HOTLINE_DISPLAY}</span>
          </a>
        </div>
      </header>
    </>
  );
}
