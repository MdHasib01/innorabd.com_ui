"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Ticket } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { UNIT_PRICE } from "@/lib/campaign";
import s from "./landing.module.css";

export function OrderShortcut({ hidden }: { hidden: boolean }) {
  const { lang, n } = useLanguage();
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const bn = lang === "bn";

  useEffect(() => {
    const checkout = document.getElementById("order-section");
    if (!checkout) return;
    const observer = new IntersectionObserver(([entry]) => setCheckoutVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(checkout);
    return () => observer.disconnect();
  }, []);

  if (hidden || checkoutVisible) return null;
  return <aside className={s.orderShortcut} aria-label={bn ? "দ্রুত অর্ডার করুন" : "Quick order"}>
    <Ticket size={24}/><div><strong>{bn ? `৳${n(UNIT_PRICE)}-এ সেট + ক্যাম্পেইন টিকিট` : `৳${n(UNIT_PRICE)} set + campaign ticket`}</strong><span>{bn ? "সম্পূর্ণ পেমেন্টে ফ্রি ডেলিভারি" : "Free delivery with full payment"}</span></div>
    <a href="#order-section" className={s.primaryButton}>{bn ? "অর্ডার করুন" : "Order now"}<ArrowRight size={16}/></a>
  </aside>;
}
