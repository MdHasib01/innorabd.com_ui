"use client";

import Image from "next/image";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import logo from "@/assets/innora-logo.png";
import { useLanguage } from "@/i18n/LanguageProvider";
import { HOTLINE, HOTLINE_DISPLAY } from "@/lib/campaign";
import s from "./landing.module.css";

export function Footer() {
  const { t, lang } = useLanguage();
  const bn = lang === "bn";
  return <footer className={s.footer}><div className={s.footerInner}>
    <div><a className={s.brand} href="#"><Image src={logo} alt="" width={48} height={48}/><span>INNORA<small>BD · INTIMATE ELEGANCE</small></span></a><p>{bn ? "নিজেকে ভালোবাসার ছোট্ট এক আয়োজন।" : "A little luxury. A little love. All for you."}</p></div>
    <div><span className={s.footerLabel}>{bn ? "ঘুরে দেখুন" : "EXPLORE"}</span><a href="#collection">{bn ? "কালেকশন" : "The collection"}<ArrowUpRight size={13}/></a><a href="#campaign">{bn ? "হানিমুন ক্যাম্পেইন" : "Honeymoon campaign"}<ArrowUpRight size={13}/></a></div>
    <div><span className={s.footerLabel}>{bn ? "আমরা আছি আপনার পাশে" : "WE’RE HERE FOR YOU"}</span><a href={`tel:${HOTLINE}`}><Phone size={14}/>{HOTLINE_DISPLAY}</a><p><MapPin size={14}/>{bn ? "খুলনা সদর, খুলনা, বাংলাদেশ" : "Khulna Sadar, Khulna, Bangladesh"}</p></div>
    </div><div className={s.footerBottom}><span>{t.footer.rights}</span><span>{bn ? "বিকাশ · নগদ · ক্যাশ অন ডেলিভারি" : "bKash · Nagad · Cash on delivery"}</span></div></footer>;
}
