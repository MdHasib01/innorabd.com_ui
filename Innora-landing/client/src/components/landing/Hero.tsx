"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, Banknote, Gift, MapPin, Ticket, Truck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { COD_DELIVERY_FEE, UNIT_PRICE } from "@/lib/campaign";
import { TicketImage } from "./TicketImage";
import s from "./landing.module.css";

export function Hero() {
  const { lang, n } = useLanguage();
  const bn = lang === "bn";
  const benefits = [
    { icon: Ticket, label: bn ? "প্রতি সেটে ক্যাম্পেইন টিকিট" : "A campaign ticket with every set" },
    { icon: Gift, label: bn ? "২টি সেটে ৩টি টিকিট" : "2 sets. 3 campaign tickets." },
    { icon: Truck, label: bn ? "সম্পূর্ণ পেমেন্টে ফ্রি ডেলিভারি" : "Full payment: free delivery" },
    { icon: Banknote, label: bn ? `ক্যাশ অন ডেলিভারি: ৳${n(COD_DELIVERY_FEE)} ডেলিভারি` : `COD: ৳${COD_DELIVERY_FEE} delivery` },
  ];
  return <>
    <section id="dream-tour" className={`${s.hero} ${s.tourHero}`}>
      <div className={s.heroInner}>
        <div className={s.heroCopy}>
          <p className={s.eyebrow}><span/>{bn ? "ইনোরা ড্রিম হানিমুন ক্যাম্পেইন" : "INNORA DREAM HONEYMOON CAMPAIGN"}</p>
          <h1>{bn ? <>কক্সবাজারে দুজনের<br/><em>স্বপ্নের ছুটি জিতুন।</em></> : <>Win a dream escape.<br/><em>Cox’s Bazar, for two.</em></>}</h1>
          <p className={s.heroDescription}>{bn ? "নীল সমুদ্র, সোনালি সূর্যাস্ত আর প্রিয় মানুষটি। কক্সবাজারে সম্পূর্ণ ফ্রি হানিমুন ট্যুর জেতার সুযোগ নিন ইনোরার সাথে।" : "The sea, a golden sunset, and your favourite person. Enter for a chance to win a completely free honeymoon tour to Cox’s Bazar with INNORA."}</p>
          <div className={s.heroEntry}><Ticket size={25} strokeWidth={1.4}/><div><strong>{bn ? `৳${n(UNIT_PRICE)}-এর নাইটওয়্যার সেট কিনুন` : `Buy a nightwear set for ৳${n(UNIT_PRICE)}`}</strong><span>{bn ? "সাথে পান আপনার হানিমুন ক্যাম্পেইন টিকিট" : "Your honeymoon campaign ticket comes with it"}</span></div></div>
          <div className={s.heroButtons}><a href="#order-section" className={s.primaryButton}>{bn ? "অর্ডার করুন ও টিকিট পান" : "Order & get your ticket"}<ArrowRight size={17}/></a><a href="#campaign" className={s.textLink}>{bn ? "টিকিট ও অফার দেখুন" : "See the ticket & offer"}<ArrowUpRight size={16}/></a></div>
          <div className={s.heroDelivery}><Truck size={16}/><span>{bn ? "সম্পূর্ণ পেমেন্টে ফ্রি ডেলিভারি" : "Full payment: free delivery"}</span><i/><span>{bn ? `COD ডেলিভারি ৳${n(COD_DELIVERY_FEE)}` : `COD delivery ৳${COD_DELIVERY_FEE}`}</span></div>
          <p className={s.heroFinePrint}>{bn ? "বিজয়ী লটারি ড্র-এর মাধ্যমে নির্ধারিত হবে। টিকিট জয় নিশ্চিত করে না।" : "Winner selected by lottery draw. A ticket does not guarantee a win."}</p>
        </div>
        <div className={s.tourVisual}>
          <div className={s.tourPhoto}><Image src="/images/coxs-bazar-campaign.webp" alt={bn ? "কক্সবাজারের স্বপ্নের ছুটি — সমুদ্রতীরে সোনালি সূর্যাস্তের প্রতীকী দৃশ্য" : "A golden seaside sunset illustrating the Cox’s Bazar dream escape"} fill preload sizes="(max-width: 760px) 95vw, 580px"/><span className={s.tourLocation}><MapPin size={14}/>COX’S BAZAR · FOR TWO</span><span className={s.tourPhotoNote}>{bn ? "প্রতীকী ক্যাম্পেইন ছবি" : "Campaign illustration"}</span></div>
          <div className={s.tourBadge}><span>{bn ? "বিজয়ী কাপলের জন্য" : "FOR THE WINNING COUPLE"}</span><strong>{bn ? "ফ্রি ট্যুর" : "FREE TOUR"}</strong><span>{bn ? "ড্রিম হানিমুন" : "A DREAM HONEYMOON"}</span></div>
          <a href="#campaign" className={s.heroTicket} aria-label={bn ? "হানিমুন ক্যাম্পেইন টিকিট দেখুন" : "View the honeymoon campaign ticket"}><TicketImage alt={bn ? "কক্সবাজার ড্রিম হানিমুন ক্যাম্পেইন টিকিট" : "Cox’s Bazar dream honeymoon campaign ticket"}/></a>
        </div>
      </div>
    </section>
    <div className={s.benefits}>{benefits.map(({icon: Icon, label}) => <div key={label}><Icon size={20} strokeWidth={1.4}/><span>{label}</span></div>)}</div>
  </>;
}
