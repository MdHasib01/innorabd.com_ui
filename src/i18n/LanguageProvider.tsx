"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { dictionaries, LOCALE_COOKIE, type Dictionary, type Locale } from "./dictionaries";
import { localizeDigits } from "@/lib/format";

type LanguageContextValue = {
  lang: Locale;
  t: Dictionary;
  setLang: (lang: Locale) => void;
  /** Render a number (or string containing digits) in the active locale's numerals. */
  n: (value: number | string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ initialLang, children }: { initialLang: Locale; children: React.ReactNode }) {
  const [lang, setLangState] = useState<Locale>(initialLang);
  const router = useRouter();

  const setLang = useCallback(
    (next: Locale) => {
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
      document.documentElement.lang = next;
      setLangState(next);
      // Re-render server components (metadata, <html lang>) for the new locale
      router.refresh();
    },
    [router],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, t: dictionaries[lang], setLang, n: (v) => localizeDigits(v, lang) }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
