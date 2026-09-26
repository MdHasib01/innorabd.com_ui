"use client";

import { ArrowRight, Gift, Ticket } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { TicketImage } from "./TicketImage";
import s from "./landing.module.css";

export function TicketShowcase() {
  const { lang, n } = useLanguage();
  const bn = lang === "bn";
  const steps = bn ? ["পছন্দের নাইটওয়্যার সেট অর্ডার করুন", "পার্সেলের সাথে আপনার ইউনিক টিকিট নিন", "লাইভ ড্র-তে হানিমুন ট্যুর জেতার সুযোগ পান"] : ["Order your favourite nightwear set", "Find your unique ticket inside the parcel", "Enter the live draw for a honeymoon for two"];
  return <section id="campaign" className={`${s.section} ${s.campaign}`}>
    <div className={s.campaignGrid}>
      <div className={s.ticketDisplay}>
        <p className={s.eyebrow}><Ticket size={15}/>{bn ? "আপনার স্বপ্নের যাত্রার টিকিট" : "YOUR TICKET TO A DREAM ESCAPE"}</p>
        <TicketImage alt={bn ? "ইনোরা কক্সবাজার ড্রিম হানিমুন ক্যাম্পেইন টিকিট, ৫৯৯ টাকার সেটের সাথে" : "INNORA Cox’s Bazar dream honeymoon ticket included with a ৳599 set"} className={s.featuredTicket}/>
        <div className={s.ticketOffers}><div><strong>{bn ? "১টি সেট" : "1 set"}</strong><span>{bn ? "১টি ক্যাম্পেইন টিকিট" : "1 campaign ticket"}</span></div><div><span className={s.bonusLabel}>{bn ? "বাড়তি টিকিট" : "BONUS TICKET"}</span><strong>{bn ? "২টি সেট" : "2 sets"}</strong><span>{bn ? "৩টি ক্যাম্পেইন টিকিট" : "3 campaign tickets"}</span></div></div>
        <p className={s.ticketSampleNote}>{bn ? "আপনার পার্সেলের প্রতিটি টিকিটে থাকবে আলাদা সিরিয়াল নম্বর।" : "Every ticket in your parcel has its own unique serial number."}</p>
      </div>
      <div className={s.campaignCopy}>
        <p className={s.eyebrow}>{bn ? "একটি অর্ডার। নতুন এক সম্ভাবনা।" : "ONE ORDER. SOMETHING TO DREAM ABOUT."}</p>
        <h2>{bn ? <>টিকিটটি আপনার।<br/><em>পরের ছুটি হতে পারে দুজনের।</em></> : <>Your ticket is included.<br/><em>The next escape could be yours.</em></>}</h2>
        <p>{bn ? "মাত্র ৫৯৯ টাকায় প্রিমিয়াম নাইটওয়্যার কিনে পান কক্সবাজার ড্রিম হানিমুন ক্যাম্পেইনে অংশ নেওয়ার টিকিট। বিজয়ী কাপল পাবেন সম্পূর্ণ ফ্রি ট্যুর।" : "Buy premium nightwear for just ৳599 and receive a ticket to the Cox’s Bazar dream honeymoon campaign. The winning couple receives a completely free tour."}</p>
        <ol className={s.campaignSteps}>{steps.map((step, i) => <li key={step}><span>{n(`0${i+1}`)}</span>{step}</li>)}</ol>
        <div className={s.comboOffer}><Gift size={25}/><div><strong>{bn ? "দুজনের স্বপ্নে, একটু বাড়তি সুযোগ" : "A little extra chance for your dream for two"}</strong><p>{bn ? "২টি সেট অর্ডারে ৩টি টিকিট — কোনো আলাদা টিকিট চার্জ নেই।" : "2 sets come with 3 tickets — no separate ticket charge."}</p></div></div>
        <a href="#order-section" className={s.primaryButton}>{bn ? "অর্ডার করে টিকিট সংগ্রহ করুন" : "Place your order & get your ticket"}<ArrowRight size={17}/></a>
        <p className={s.campaignDisclaimer}>{bn ? "ট্যুর লটারি ড্র-এর পুরস্কার; প্রতিটি টিকিটে জয় নিশ্চিত নয়। ড্র ও ফলাফলের আপডেটের জন্য আমাদের সাথে যোগাযোগ করুন।" : "The tour is a lottery prize; tickets do not guarantee a win. Contact us for draw details and result updates."}</p>
      </div>
    </div>
  </section>;
}
