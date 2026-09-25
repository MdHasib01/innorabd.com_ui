"use client";

import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import type { VariantKey } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/LanguageProvider";
import { discountPct, REGULAR_PRICE, UNIT_PRICE, VARIANTS } from "@/lib/campaign";
import { cn } from "@/lib/utils";
import { TitleBlock } from "./TitleBlock";

export function ProductShowcase({ variant, onVariantChange }: { variant: VariantKey; onVariantChange: (v: VariantKey) => void }) {
  const { t, n } = useLanguage();
  const active = VARIANTS.find((v) => v.key === variant) ?? VARIANTS[0];

  return (
    <>
      <TitleBlock title={t.product.heading} subtitle={t.product.subheading} />

      <div className="mb-[60px] rounded-2xl border border-[#e5dac9] bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.05)] sm:p-[35px]">
        <div className="grid items-center gap-[35px] md:grid-cols-[1.1fr_1fr]">
          <div className="overflow-hidden rounded-xl border border-[#eae3d5] bg-[#fdfbf7] p-2.5 text-center">
            <Image
              key={active.img}
              src={active.img}
              alt={t.product.variants[active.key].title}
              width={800}
              height={1000}
              priority
              sizes="(max-width: 768px) 100vw, 520px"
              className="h-auto max-h-[480px] w-full rounded-lg object-contain transition-opacity duration-300"
            />
          </div>

          <div>
            <span className="text-[13px] font-bold tracking-[1px] text-burgundy uppercase">{t.product.kicker}</span>
            <h3 className="my-1.5 text-[26px] leading-snug font-bold text-burgundy">{t.product.variants[variant].title}</h3>

            <div className="my-[15px] flex items-center gap-3">
              <span className="text-[32px] font-extrabold text-burgundy">৳{n(UNIT_PRICE)}</span>
              <span className="text-lg text-[#888] line-through">৳{n(REGULAR_PRICE)}</span>
              <span className="rounded-md bg-[#e8f5e9] px-2.5 py-1 text-[13px] font-bold text-[#2e7d32]">
                {t.product.discount(n(discountPct))}
              </span>
            </div>

            <p className="mb-[18px] text-[15px] text-[#555]">{t.product.description}</p>

            <div className="my-5">
              <span className="mb-2.5 block text-[15px] font-bold">{t.product.paletteTitle}</span>
              <div className="flex gap-3">
                {VARIANTS.map((v) => (
                  <button
                    key={v.key}
                    type="button"
                    onClick={() => onVariantChange(v.key)}
                    aria-pressed={v.key === variant}
                    className={cn(
                      "w-[75px] cursor-pointer rounded-lg border-2 border-[#ddd] bg-white p-1 text-center transition-all duration-200",
                      v.key === variant && "-translate-y-0.5 border-burgundy shadow-[0_0_10px_rgba(35,6,14,0.25)]",
                    )}
                  >
                    <Image
                      src={v.img}
                      alt={t.product.variants[v.key].label}
                      width={150}
                      height={130}
                      className="block h-[65px] w-full rounded object-cover"
                    />
                    <span className="mt-1 block text-[11px] font-semibold text-[#444]">{t.product.variants[v.key].label}</span>
                  </button>
                ))}
              </div>
            </div>

            <a href="#order-section" className={cn(buttonVariants({ variant: "gold", size: "block" }))}>
              {t.product.cta}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
