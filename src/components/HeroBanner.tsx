import React from 'react';
import { Sparkles, Ruler, ShieldCheck, HeartHandshake, Award, Flame, ArrowRight } from 'lucide-react';
import { CategoryType } from '../types';

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
    <div className="relative overflow-hidden bg-radial from-[#4a0410] via-[#2d020a] to-[#140105] text-[#faede1] border-b border-[#d4af37]/30 shadow-2xl">
      {/* Background Decorative Gold Filigree & Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#850b20]/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#d4af37]/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & Editorial Showcase */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
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
            <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Pure Sensuality.<br />
              <span className="gold-gradient-text font-serif italic">
                Architectural Support.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#e5d5c5] max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Discover innorabd&apos;s mastercrafted innerwear: intricate French Chantilly lace, 24K dipped gold hardware, and cloud-soft memory foam tailored to elevate your natural silhouette.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="hero-explore-lace-btn"
                onClick={() => onSelectCategory('Luxury Lace')}
                className="px-6 py-3.5 bg-gradient-to-r from-[#850b20] to-[#b11330] hover:from-[#6b0618] hover:to-[#920c24] text-white font-medium text-sm rounded-full shadow-lg shadow-[#850b20]/40 border border-[#d4af37]/60 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <span>Shop Luxury Lace</span>
                <ArrowRight className="w-4 h-4 text-[#d4af37]" />
              </button>

              <button
                id="hero-size-calc-btn"
                onClick={onOpenSizeCalculator}
                className="px-6 py-3.5 bg-[#fbf5e6]/10 hover:bg-[#fbf5e6]/20 text-[#fbf5e6] font-medium text-sm rounded-full border border-[#d4af37]/50 backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer"
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
              <div className="flex items-center gap-1.5">
                <span className="text-[#d4af37] font-bold text-sm">4.9 ★</span>
                <span>15,000+ Verified Fits</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#d4af37] font-bold text-sm">100%</span>
                <span>Zero-Label Discreet Shipping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#d4af37] font-bold text-sm">30-Day</span>
                <span>Sister-Size Free Exchange</span>
              </div>
            </div>
          </div>

          {/* Right Visual Bento Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Gold border frame card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/40 shadow-2xl bg-gradient-to-b from-[#210207] to-[#0d0103] p-3 group">
                <div className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=80"
                    alt="Aurelia Chantilly Balconette Bra in Crimson Red & Gold"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120104] via-transparent to-transparent opacity-80"></div>

                  {/* Floating Price Pill */}
                  <div className="absolute top-3 right-3 bg-[#850b20]/90 border border-[#d4af37] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-xs flex items-center gap-1">
                    <span className="text-[#d4af37] font-bold">$58</span>
                    <span className="text-[10px] line-through text-[#e8cbb0]">$85</span>
                    <span className="text-[10px] bg-[#d4af37] text-stone-900 font-bold px-1 rounded-xs ml-1">-32%</span>
                  </div>

                  {/* Floating Luxury Detail Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#1e0207]/90 border border-[#d4af37]/40 rounded-xl p-3.5 backdrop-blur-md text-left">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#fbf5e6] font-serif-luxury">
                        Aurelia Chantilly Balconette
                      </span>
                      <span className="text-[10px] text-[#d4af37] font-mono font-semibold">24K Gold Hardware</span>
                    </div>
                    <p className="text-[11px] text-[#e6d0c0] line-clamp-1">
                      French Scalloped Lace with silk cradle and custom sister-size elasticity.
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex gap-1">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#850b20] border border-[#d4af37]"></span>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#171717] border border-[#d4af37]"></span>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#deb887] border border-[#d4af37]"></span>
                      </div>
                      <button
                        onClick={() => onSelectCategory('Luxury Lace')}
                        className="text-[11px] text-[#fbf5e6] hover:text-[#d4af37] font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        Quick Explore →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Little Floating Decorative Pill */}
              <div className="hidden sm:flex absolute -bottom-4 -left-6 bg-[#850b20] border border-[#d4af37] text-[#faede1] px-4 py-2 rounded-xl shadow-xl items-center gap-2">
                <Flame className="w-4 h-4 text-[#d4af37]" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#d4af37]">Trending Now</div>
                  <div className="text-xs font-semibold">Red & Gold Bridal Sets</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Trust Pillars Strip */}
      <div className="bg-[#1a0106] border-t border-[#d4af37]/20 py-4 px-4">
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
