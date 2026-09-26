"use client";

import Image from "next/image";
import { ArrowRight, Check, Feather, Gift, Heart } from "lucide-react";
import type { VariantKey } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/LanguageProvider";
import { discountPct, REGULAR_PRICE, UNIT_PRICE, VARIANTS } from "@/lib/campaign";
import s from "./landing.module.css";

export function ProductShowcase({ variant, onVariantChange }: { variant: VariantKey; onVariantChange: (v: VariantKey) => void }) {
  const { t, lang, n } = useLanguage();
  const bn = lang === "bn";
  const active = VARIANTS.find(v => v.key === variant) ?? VARIANTS[0];
  return <section id="collection" className={`${s.section} ${s.collection}`}>
    <div className={s.sectionHeading}><div><p className={s.eyebrow}>{bn ? "দ্য ইনোরা কালেকশন" : "THE INNORA COLLECTION"}</p><h2>{bn ? "আগে বেছে নিন আপনার পছন্দের সেট।" : "First, find your favourite set."}</h2></div><p>{bn ? "তিনটি সুন্দর রঙ। প্রতি সেটে ক্যাম্পেইন টিকিট।" : "Three beautiful colours. A campaign ticket with every set."}</p></div>
    <div className={s.productGrid}>
      <div className={s.gallery}>
        <div className={s.productPhoto}><span className={s.photoBadge}>INNORA BD · {bn ? "লেস সাটিন কালেকশন" : "THE LACE SATIN EDIT"}</span><Image key={active.key} src={active.img} alt={t.product.variants[variant].title} width={1122} height={1402} sizes="(max-width: 760px) 90vw, 560px" className={s.lifestylePhoto}/></div>
        <div className={s.productThumbnails}>{VARIANTS.map(v => <button type="button" key={v.key} onClick={() => onVariantChange(v.key)} aria-pressed={variant === v.key} aria-label={t.product.variants[v.key].label} className={variant === v.key ? s.activeProductThumbnail : ""}><Image src={v.img} alt="" width={80} height={100}/><span>{t.product.variants[v.key].label}</span></button>)}</div>
      </div>
      <div className={s.productInfo}>
        <p className={s.eyebrow}>{bn ? "সাটিনের কোমলতা, লেসের সৌন্দর্য" : "SOFT SATIN. BEAUTIFUL LACE."}</p>
        <h3 aria-live="polite">{t.product.variants[variant].title}</h3>
        <p className={s.productSubtitle}>{bn ? "কোমল ফেব্রিক · নচ-কলার · সুন্দর লেস ডিটেইল" : "Soft satin · Notch collar · Delicate lace details"}</p>
        <div className={s.productPrice}><strong>৳{n(UNIT_PRICE)}</strong><del>৳{n(REGULAR_PRICE)}</del><span>{t.product.discount(n(discountPct))}</span></div>
        <p className={s.productDescription}>{bn ? "আরামদায়ক টু-পিস সেট, লেসের কাফ আর কোমল সাটিনে। নিজের জন্য বেছে নিন চেরি রেড, বার্গান্ডি অথবা ল্যাভেন্ডার।" : "An easy two-piece set with delicate lace cuffs and a soft satin finish. Choose your moment in cherry red, burgundy, or lavender."}</p>
        <div className={s.productFeatures}><span><Feather size={16}/>{bn ? "কোমল সাটিন" : "Soft satin"}</span><span><Heart size={16}/>{bn ? "সুন্দর লেস ডিটেইল" : "Lace details"}</span></div>
        <div className={s.colourPicker}><p>{bn ? "আপনার রঙ" : "Your colour"}<strong>{t.product.variants[variant].label}</strong></p><div>{VARIANTS.map(v => <button type="button" key={v.key} onClick={() => onVariantChange(v.key)} aria-pressed={variant === v.key} aria-label={t.product.variants[v.key].label} className={variant === v.key ? s.selectedColour : ""}><span style={{backgroundColor:v.color}}>{variant === v.key && <Check size={15} color="white"/>}</span>{t.product.variants[v.key].label}</button>)}</div></div>
        <a href="#order-section" className={s.primaryButton}>{bn ? "এই সেটটি অর্ডার করুন" : "Order this set"}<ArrowRight size={18}/></a>
        <div className={s.productGift}><Gift size={22}/><p><strong>{bn ? "সাথে আপনার হানিমুন ক্যাম্পেইন টিকিট" : "Your honeymoon campaign ticket is included"}</strong><span>{bn ? "১টি সেটে ১টি টিকিট · ২টি সেটে ৩টি টিকিট" : "1 set, 1 ticket · 2 sets, 3 tickets"}</span></p></div>
      </div>
    </div>
  </section>;
}
