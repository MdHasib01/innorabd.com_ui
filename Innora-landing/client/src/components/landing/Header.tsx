"use client";

import Image from "next/image";
import { ArrowUpRight, Globe2, Phone, ShoppingBag, Sparkles } from "lucide-react";
import logo from "@/assets/innora-logo.png";
import { useLanguage } from "@/i18n/LanguageProvider";
import { HOTLINE } from "@/lib/campaign";
import s from "./landing.module.css";

export function Header() {
  const { lang, setLang } = useLanguage();
  const bn = lang === "bn";
  return <>
    <div className={s.announcement}><Sparkles size={13} /><span>{bn ? "একটু বিলাসিতা, একটি স্বপ্নের সুযোগ — প্রতি অর্ডারেই হানিমুন ক্যাম্পেইন টিকিট" : "A little luxury. A chance to escape. A honeymoon campaign ticket with every order."}</span><a href="#campaign">{bn ? "বিস্তারিত" : "Discover more"}<ArrowUpRight size={13}/></a></div>
    <header className={s.header}>
      <div className={s.headerInner}>
        <a href="#" className={s.brand} aria-label="INNORA BD home"><Image src={logo} alt="" width={48} height={48}/><span>INNORA<small>BD · INTIMATE ELEGANCE</small></span></a>
        <nav className={s.nav} aria-label={bn ? "প্রধান নেভিগেশন" : "Main navigation"}>
          <a href="#dream-tour">{bn ? "ড্রিম হানিমুন" : "The dream tour"}</a><a href="#campaign">{bn ? "ক্যাম্পেইন টিকিট" : "Your campaign ticket"}</a><a href="#collection">{bn ? "কালেকশন" : "The collection"}</a>
        </nav>
        <div className={s.headerActions}>
          <button type="button" className={s.language} onClick={() => setLang(bn ? "en" : "bn")} aria-label={bn ? "Switch to English" : "বাংলায় দেখুন"}><Globe2 size={15}/>{bn ? "EN" : "বাংলা"}</button>
          <a href={`tel:${HOTLINE}`} className={s.phone} aria-label={bn ? "কল করুন" : "Call us"}><Phone size={17}/></a>
          <a href="#order-section" className={s.headerShop}><ShoppingBag size={16}/><span>{bn ? "অর্ডার করুন" : "Shop now"}</span></a>
        </div>
      </div>
    </header>
  </>;
}
