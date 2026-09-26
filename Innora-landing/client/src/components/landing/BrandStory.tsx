"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import brandImage from "@/assets/website-hero.jpeg";
import { useLanguage } from "@/i18n/LanguageProvider";
import s from "./landing.module.css";

export function BrandStory() {
  const { lang } = useLanguage();
  const bn = lang === "bn";
  return <section id="story" className={s.story}>
    <Image src={brandImage} alt={bn ? "বার্গান্ডি সাটিনের ওপর ইনোরা গিফট বক্স" : "INNORA gift box on rich burgundy satin"} fill sizes="100vw"/>
    <div className={s.storyContent}><p className={s.eyebrow}>{bn ? "ইনোরার ভাবনা" : "THE INNORA PHILOSOPHY"}</p><h2>{bn ? <>সৌন্দর্য শুরু হোক<br/><em>নিজের ভালো লাগায়।</em></> : <>Beautiful begins<br/>with <em>feeling good.</em></>}</h2><p>{bn ? "আপনার সবচেয়ে আপন মুহূর্তগুলোও যত্নের দাবিদার। তাই ইনোরায় আমরা বিশ্বাস করি, বিলাসিতা থাকুক প্রতিদিনের ছোট ছোট ভালো লাগায়।" : "We believe your most personal moments deserve a little care. A softer evening. A slower morning. Something beautiful, just because it makes you feel like you."}</p><a href="#collection" className={s.textLink}>{bn ? "আপনার পছন্দ খুঁজে নিন" : "Find your everyday luxury"}<ArrowUpRight size={16}/></a></div>
  </section>;
}
