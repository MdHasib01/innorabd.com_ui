import React from 'react';
import { Sparkles, Ruler, ShieldCheck, HeartHandshake, Award, ArrowRight } from 'lucide-react';
import { CategoryType } from '../types';
import heroBgImage from '../../assets/website-hero.jpeg';

interface HeroBannerProps {
  onSelectCategory: (cat: CategoryType) => void;
  onOpenSizeCalculator: () => void;
  onOpenFitStylist: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCategory,
  onOpenSizeCalculator,
  onOpenFitStylist,
}) => {
  return (
    <div className="relative overflow-hidden bg-radial from-[#4a0410] via-[#2d020a] to-[#140105] text-[#faede1] border-b border-[#d4af37]/30 shadow-2xl min-h-[560px] lg:min-h-[620px] flex flex-col justify-between">
      {/* Background Image from assets */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBgImage}
          alt="INNORAbD Haute Sovereign Collection Luxury Box Set"
          className="w-full h-full object-cover object-[78%_center] sm:object-[78%_center] lg:object-[right_center] select-none"
        />

        {/* Directional Gradient Overlays for High-Contrast Pristine Readability */}
        {/* Desktop left-to-right gradient to frame the typography nicely on silk backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#140105]/95 via-[#180208]/75 to-transparent hidden lg:block"></div>

        {/* Mobile & Tablet vertical gradient backdrop allowing the centered product box to remain visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#140105]/85 via-[#180208]/55 to-[#140105]/90 lg:hidden"></div>

        {/* Subtle Top & Bottom Vignette for seamless transitions */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#140105]/70 to-transparent pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#140105]/90 to-transparent pointer-events-none"></div>

        {/* Previous Gold & Ruby Glow Gradient Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#850b20]/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#d4af37]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-12 w-72 h-72 bg-[#d4af37]/15 rounded-full blur-2xl pointer-events-none"></div>

        {/* Gold Filigree Dot Pattern Glow */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      {/* Hero Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & Editorial Showcase */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-6 text-center lg:text-left">
            {/* Top Micro-Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#850b20]/80 border border-[#d4af37]/60 shadow-inner backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase text-[#fdf6e7]">
                The Haute Red & Gold Sovereign Collection
              </span>
              <span className="bg-[#d4af37] text-stone-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                NEW
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.15] drop-shadow-md">
              Pure Sensuality.<br />
              <span className="gold-gradient-text font-serif italic">
                Architectural Support.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#e5d5c5] max-w-xl mx-auto lg:mx-0 font-light leading-relaxed drop-shadow-sm">
              Discover innorabd&apos;s mastercrafted innerwear: intricate French Chantilly lace, 24K dipped gold hardware, and cloud-soft memory foam tailored to elevate your natural silhouette.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="hero-explore-lace-btn"
                onClick={() => onSelectCategory('Luxury Lace')}
                className="px-6 py-3.5 bg-gradient-to-r from-[#850b20] to-[#b11330] hover:from-[#6b0618] hover:to-[#920c24] text-white font-medium text-sm rounded-full shadow-lg shadow-[#850b20]/40 border border-[#d4af37]/70 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <span>Shop Luxury Lace</span>
                <ArrowRight className="w-4 h-4 text-[#d4af37]" />
              </button>

              <button
                id="hero-size-calc-btn"
                onClick={onOpenSizeCalculator}
                className="px-6 py-3.5 bg-[#fbf5e6]/10 hover:bg-[#fbf5e6]/20 text-[#fbf5e6] font-medium text-sm rounded-full border border-[#d4af37]/50 backdrop-blur-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <Ruler className="w-4 h-4 text-[#d4af37]" />
                <span>Personalized Size Finder</span>
              </button>

              <button
                id="hero-fit-quiz-btn"
                onClick={onOpenFitStylist}
                className="px-4 py-3.5 text-xs text-[#d4af37] hover:text-white underline underline-offset-4 decoration-[#d4af37]/60 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>60-Sec Fit Stylist Quiz</span>
              </button>
            </div>

            {/* Quick Proof Metrics */}
            <div className="pt-4 border-t border-[#850b20]/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#e6d9cd]">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/20 backdrop-blur-xs border border-white/5">
                <span className="text-[#d4af37] font-bold text-sm">4.9 ★</span>
                <span>15,000+ Verified Fits</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/20 backdrop-blur-xs border border-white/5">
                <span className="text-[#d4af37] font-bold text-sm">100%</span>
                <span>Zero-Label Discreet Shipping</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/20 backdrop-blur-xs border border-white/5">
                <span className="text-[#d4af37] font-bold text-sm">30-Day</span>
                <span>Sister-Size Free Exchange</span>
              </div>
            </div>
          </div>

          {/* Right Area: Fully open and unobstructed to showcase the background product image */}
          <div className="lg:col-span-5 xl:col-span-6 min-h-[180px] sm:min-h-[260px] lg:min-h-[360px] pointer-events-none" aria-hidden="true"></div>
        </div>
      </div>

      {/* 4 Trust Pillars Strip */}
      <div className="relative z-10 bg-[#140105]/95 border-t border-[#d4af37]/20 py-4 px-4 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2.5 text-xs text-[#f1dfd3]">
            <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span className="text-[11px] sm:text-xs">100% Discreet Unmarked Delivery</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-xs text-[#f1dfd3]">
            <Award className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span className="text-[11px] sm:text-xs">French Chantilly & OEKO-TEX Silk</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-xs text-[#f1dfd3]">
            <Ruler className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span className="text-[11px] sm:text-xs">Interactive Fit Sister Sizing</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-xs text-[#f1dfd3]">
            <HeartHandshake className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span className="text-[11px] sm:text-xs">30-Day Free Sister-Size Exchanges</span>
          </div>
        </div>
      </div>
    </div>
  );
};
