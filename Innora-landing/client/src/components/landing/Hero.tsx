"use client";

import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageProvider";
import { HERO_SLIDES } from "@/lib/campaign";
import { pad2 } from "@/lib/format";
import { cn } from "@/lib/utils";

function timeLeftToday() {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).getTime();
  const diff = Math.max(0, end - now.getTime());
  return {
    h: Math.floor((diff / 3_600_000) % 24),
    m: Math.floor((diff / 60_000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

export function Hero() {
  const { t, n } = useLanguage();
  const [slide, setSlide] = useState(0);
  const [time, setTime] = useState({ h: 23, m: 59, s: 59 });

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const tick = () => setTime(timeLeftToday());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { val: time.h, label: t.hero.hours },
    { val: time.m, label: t.hero.minutes },
    { val: time.s, label: t.hero.seconds },
  ];

  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-5 py-[60px] text-center text-white">
      <div className="absolute inset-0 z-[1]">
        {HERO_SLIDES.map((src, i) => (
          <div key={src} className="drone-slide" data-active={i === slide} style={{ backgroundImage: `url('${src}')` }} />
        ))}
      </div>

      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle,rgba(35,6,14,0.72)_0%,rgba(20,3,8,0.95)_85%)]" />

      <div className="relative z-[3] max-w-[860px]">
        <span className="mb-5 inline-block rounded-[30px] bg-(image:--gold-gradient) px-5 py-1.5 text-[13px] font-extrabold tracking-[1.5px] text-burgundy uppercase">
          {t.hero.pill}
        </span>

        <h1 className="mb-4 text-[28px] leading-[1.3] font-extrabold md:text-[42px]">
          {t.hero.titleBefore}
          <span className="text-gold-gradient">{t.hero.titleHighlight}</span>
          {t.hero.titleAfter}
        </h1>

        <p className="mb-7 text-lg text-[#f1ece3]">
          {t.hero.lead.a}
          <strong>INNORA BD™</strong>
          {t.hero.lead.b}
          <strong>{t.hero.lead.ticket}</strong>
          {t.hero.lead.c}
        </p>

        <div className="mb-[30px] inline-flex gap-3.5 rounded-xl border border-gold bg-[rgba(18,2,7,0.78)] px-[25px] py-3.5 backdrop-blur-[10px]">
          {cells.map((cell, i) => (
            <div key={cell.label} className="flex gap-3.5">
              {i > 0 && <div className="text-2xl text-gold">:</div>}
              <div className="text-center">
                <div className="text-[28px] leading-none font-bold text-gold-light tabular-nums" suppressHydrationWarning>
                  {n(pad2(cell.val))}
                </div>
                <div className="mt-1 text-[11px] text-[#aaa] uppercase">{cell.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <a href="#order-section" className={cn(buttonVariants({ variant: "gold", size: "cta" }))}>
            {t.hero.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
