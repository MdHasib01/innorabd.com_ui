import React, { useRef, useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Check, 
  ShieldCheck, 
  Heart, 
  Eye,
  Ruler
} from 'lucide-react';
import { CategoryType, Product, ProductColor } from '../types';

// Category Main Images
import imgLuxuryPrinted from '../../assets/categories/luxury-printed-nightwear.png';
import imgLuxury5Part from '../../assets/categories/luxury-5-part-nightwear.png';
import imgPremiumSolid from '../../assets/categories/premium-solid-color-pj-set.png';
import imgPrintedPjSet from '../../assets/categories/premium-3-part-half-sleeve-printed-pj-set.png';
import imgLuxury2Part from '../../assets/categories/premium-2-part-cross-belt-nightwear.png';
import imgLuxury7Part from '../../assets/categories/luxury-7-part-nightwear.png';
import imgLuxury5PartPrint from '../../assets/categories/luxury-5-part-print-nightwear.png';
import flowerPropsBg from '../../assets/flower-props-bg.png';

export interface CategoryShowcaseItem {
  id: string;
  name: string;
  badge: string;
  pieces: string;
  tagline: string;
  image: string;
  price: number;
  originalPrice: number;
  description: string;
  includes: string[];
  fabric: string;
  filterTag: string;
  gallery: string[];
}

export const CATEGORY_ITEMS: CategoryShowcaseItem[] = [
  {
    id: 'cat-printed-slip',
    name: 'Luxury Printed Nightwear',
    badge: 'Sensual Drape',
    pieces: '2-Piece Set',
    tagline: 'Lace Trim Satin Slip Chemise',
    image: imgLuxuryPrinted,
    price: 68,
    originalPrice: 95,
    description:
      'Indulge in liquid silk-touch satin trimmed with delicate floral eyelash lace along the sweetheart bust and scalloped hem. Features adjustable gold-dipped sliders for a bespoke fit.',
    includes: ['Mulberry Silk-Touch Slip Chemise', 'Matching Lace G-String Thong'],
    fabric: '22-Momme Grade 6A Silk Touch Charmeuse & French Eyelash Lace',
    filterTag: 'Luxury Printed Nightwear',
    gallery: [
      imgLuxuryPrinted,
      '/categories/luxury-printed-nightwear/luxury-printed-nightwear (1).webp',
      '/categories/luxury-printed-nightwear/luxury-printed-nightwear (2).webp',
      '/categories/luxury-printed-nightwear/luxury-printed-nightwear (3).webp',
      '/categories/luxury-printed-nightwear/demo (1).webp',
    ],
  },
  {
    id: 'cat-5-part-teal',
    name: 'Luxury 5 Part Nightwear',
    badge: 'Best Seller',
    pieces: '5-Piece Wardrobe',
    tagline: 'Robe, Camisole, Shorts, Trousers & Eye Mask',
    image: imgLuxury5Part,
    price: 115,
    originalPrice: 165,
    description:
      'The ultimate all-season loungewear capsule. Featuring an artisanal Japanese floral kimono robe paired with an emerald slip camisole, relaxed lounge shorts, tailored trousers, and silk sleep mask.',
    includes: [
      'Floral Kimono Wrap Robe with Sash',
      'Cami Camisole Top with Lace Trim',
      'High-Rise Relaxed Lounge Shorts',
      'Straight-Leg Full-Length Trousers',
      'Padded Reversible Silk Sleep Mask',
    ],
    fabric: 'Liquid Silk Satin with OEKO-TEX Standard 100 Non-Toxic Botanical Pigments',
    filterTag: 'Luxury 5 Part Nightwear',
    gallery: [
      imgLuxury5Part,
      '/categories/luxury-5-part-nightwear/luxury-5-part-nightwear (1).webp',
      '/categories/luxury-5-part-nightwear/luxury-5-part-nightwear (2).webp',
      '/categories/luxury-5-part-nightwear/luxury-5-part-nightwear (3).webp',
      '/categories/luxury-5-part-nightwear/demo (1).webp',
    ],
  },
  {
    id: 'cat-solid-pj',
    name: 'Premium Solid Color PJ Set',
    badge: 'Timeless Cut',
    pieces: '2-Piece Classic',
    tagline: 'Tailored Button-Down Silk Pajama Suit',
    image: imgPremiumSolid,
    price: 89,
    originalPrice: 125,
    description:
      'A masterclass in timeless elegance. Rich royal scarlet red satin tailored with crisp ivory contrast piping, notched lapel collar, Mother-of-Pearl buttons, and an elasticated comfort waistband.',
    includes: [
      'Notch-Collar Button-Down Long Sleeve Top',
      'Wide-Leg Pajama Trousers with Drawstring',
    ],
    fabric: 'Heavyweight Matte Satin Silk with Micro-Stretching Lycra Core',
    filterTag: 'Premium Solid Color PJ Set',
    gallery: [
      imgPremiumSolid,
      '/categories/premium-solid-color-pj-set/premium-solid-color-pj-set (1).webp',
      '/categories/premium-solid-color-pj-set/premium-solid-color-pj-set (2).webp',
      '/categories/premium-solid-color-pj-set/premium-solid-color-pj-set (3).webp',
      '/categories/premium-solid-color-pj-set/demo (1).webp',
    ],
  },
  {
    id: 'cat-printed-pj',
    name: 'Printed PJ Set',
    badge: 'Summer Luxe',
    pieces: '3-Piece Set',
    tagline: 'Midnight Blossom Short Sleeve & Shorts',
    image: imgPrintedPjSet,
    price: 78,
    originalPrice: 110,
    description:
      'Immerse in airy bedtime serenity. Deep midnight navy satin adorned with delicate cherry blossom clusters. Breathable half-sleeve button front paired with flutter-edge sleep shorts.',
    includes: [
      'Camp-Collar Half-Sleeve Sleep Shirt',
      'High-Rise Flutter Pajama Shorts',
      'Matching Silk Hair Scrunchie',
    ],
    fabric: 'Featherlight 19-Momme Mulberry Silk Blend with Cooling Weave',
    filterTag: 'Printed PJ Set',
    gallery: [
      imgPrintedPjSet,
      '/categories/premium-3-part-half-sleeve-printed-pj-set/premium-3-part-half-sleeve-printed-pj-set (1).webp',
      '/categories/premium-3-part-half-sleeve-printed-pj-set/premium-3-part-half-sleeve-printed-pj-set (2).webp',
      '/categories/premium-3-part-half-sleeve-printed-pj-set/premium-3-part-half-sleeve-printed-pj-set (3).webp',
      '/categories/premium-3-part-half-sleeve-printed-pj-set/demo (1).webp',
    ],
  },
  {
    id: 'cat-2-part-cross',
    name: 'Luxury 2 Part Nightwear',
    badge: 'Romance Edit',
    pieces: '2-Piece Set',
    tagline: 'Cross-Belt Robe & Chemise Set',
    image: imgLuxury2Part,
    price: 85,
    originalPrice: 120,
    description:
      'Sensual minimalism at its finest. Includes a bias-cut scarlet slip that hugs body contours naturally, paired with an open-front draped wrap robe featuring golden cross-belt hardware.',
    includes: [
      'Scallop Neckline Bias-Cut Satin Slip',
      'Fluid Floor-Length Wrap Robe with Belt',
    ],
    fabric: 'Ultra-Lustrous Silk Satin with French Scallop Floral Edging',
    filterTag: 'Luxury 2 Part Nightwear',
    gallery: [
      imgLuxury2Part,
      '/categories/premium-2-part-cross-belt-nightwear/premium-2-part-cross-belt-nightwear (2).webp',
      '/categories/premium-2-part-cross-belt-nightwear/premium-2-part-cross-belt-nightwear (3).webp',
      '/categories/premium-2-part-cross-belt-nightwear/1779905859-d1.webp',
      '/categories/premium-2-part-cross-belt-nightwear/demo (1).webp',
    ],
  },
  {
    id: 'cat-7-part-royal',
    name: 'Luxury 7 Part Nightwear',
    badge: 'Grand Trousseau',
    pieces: '7-Piece Royal Curation',
    tagline: 'The Signature Complete Royal Bridal Trousseau',
    image: imgLuxury7Part,
    price: 138,
    originalPrice: 198,
    description:
      'The crown jewel of nightwear. Seven harmonized pieces in signature royal crimson: long-sleeve robe, long pajama suit, camisole, lace shorts, slip dress, sleep eye mask, and satin storage case.',
    includes: [
      'Kimono Duster Robe with Sash',
      'Long-Sleeve Button-Up Pajama Shirt',
      'Full-Length Pajama Trousers',
      'Camisole Top with French Lace Trim',
      'Elasticated Lace Lounge Shorts',
      'Lightly Padded Underwired Slip Chemise',
      'Cushioned Silk Sleep Eye Mask',
    ],
    fabric: 'Heavy 22-Momme Mulberry Silk & Guipure Lace Accents with Anti-Fray Stitching',
    filterTag: 'Luxury 7 Part Nightwear',
    gallery: [
      imgLuxury7Part,
      '/categories/luxury-7-part-nightwear/luxury-7-part-nightwear (1).webp',
      '/categories/luxury-7-part-nightwear/luxury-7-part-nightwear (2).webp',
      '/categories/luxury-7-part-nightwear/luxury-7-part-nightwear (3).webp',
      '/categories/luxury-7-part-nightwear/luxury-7-part-nightwear (4).webp',
    ],
  },
  {
    id: 'cat-5-part-print',
    name: 'Luxury 5 Part Print Nightwear',
    badge: 'Botanical Bloom',
    pieces: '5-Piece Print Capsule',
    tagline: 'Ivory Pearl & Crimson Rose 5-Piece Wardrobe',
    image: imgLuxury5PartPrint,
    price: 118,
    originalPrice: 168,
    description:
      'Ethereal romance meets decadent comfort. Delicate crimson roses hand-painted across an ivory pearl satin canvas. Includes wrap robe, spaghetti cami, sleep shorts, lounge trousers, and pouch.',
    includes: [
      'Rose Botanical Print Draped Kimono Robe',
      'Sweetheart Neckline Floral Camisole',
      'Ruffle-Hem Silk Sleep Shorts',
      'High-Rise Comfort Lounge Pants',
      'Matching Drawstring Silk Storage Bag',
    ],
    fabric: 'OEKO-TEX Certified Eco-Silk Charmeuse with Dermatologist-Approved Dyes',
    filterTag: 'Luxury 5 Part Print Nightwear',
    gallery: [
      imgLuxury5PartPrint,
      '/categories/luxury-5-part-print-nightwear/luxury-5-part-print-nightwear (1).jpeg',
      '/categories/luxury-5-part-print-nightwear/luxury-5-part-print-nightwear (2).jpeg',
      '/categories/luxury-5-part-print-nightwear/luxury-5-part-print-nightwear (3).jpeg',
      '/categories/luxury-5-part-print-nightwear/luxury-5-part-print-nightwear (4).jpeg',
    ],
  },
];

interface CategoryShowcaseProps {
  onSelectCategory?: (category: CategoryType) => void;
  onFilterByTag?: (tag: string) => void;
  onViewAllCollections?: () => void;
  onAddToCart?: (
    product: Product,
    color: ProductColor,
    band: number,
    cup: string,
    quantity?: number
  ) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  onSelectCategory,
  onFilterByTag,
  onViewAllCollections,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<CategoryShowcaseItem | null>(null);
  const [modalActiveImage, setModalActiveImage] = useState<string>('');

  // Check scroll positions
  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    // Calculate approximate active card for indicators
    const cardWidth = el.scrollWidth / CATEGORY_ITEMS.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveCardIndex(Math.min(Math.max(0, index), CATEGORY_ITEMS.length - 1));
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = direction === 'left' ? -320 : 320;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleCardClick = (item: CategoryShowcaseItem) => {
    setSelectedCategory(item);
    setModalActiveImage(item.image);
  };

  const handleExploreInCatalog = (item: CategoryShowcaseItem) => {
    setSelectedCategory(null);
    if (onFilterByTag) {
      onFilterByTag(item.filterTag);
    } else if (onSelectCategory) {
      onSelectCategory('Silk Sleepwear');
    }
    // Smooth scroll down to the product catalog
    const catalogElem = document.querySelector('main');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewAll = () => {
    if (onViewAllCollections) {
      onViewAllCollections();
    } else if (onSelectCategory) {
      onSelectCategory('Silk Sleepwear');
    }
    const catalogElem = document.querySelector('main');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="category-showcase-section"
      className="relative overflow-hidden w-full bg-[#faf4ef] text-[#2c1b18] border-b border-[#e8d7c8] py-8 sm:py-12 lg:py-14 select-none"
    >
      {/* -------------------- LUXURY BACKGROUND & SATIN DRAPERY -------------------- */}
      {/* Radiant ambient silk glow background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft champagne & rose silk radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#fffdfb_0%,#fbf4ec_50%,#f6e8dc_100%)] opacity-95"></div>

        {/* Subtle wavy satin light streaks */}
        <div className="absolute -top-32 left-1/4 w-[700px] h-[350px] bg-gradient-to-r from-white/40 via-white/80 to-transparent blur-3xl transform -rotate-12"></div>
        <div className="absolute -bottom-24 right-1/4 w-[600px] h-[250px] bg-gradient-to-l from-white/40 via-white/70 to-transparent blur-2xl transform rotate-6"></div>



        {/* -------------------- AUTHENTIC FLOWER PROPS (CORNER EDGES ONLY) -------------------- */}
        {/* Top-Left Corner Edge Flower Prop */}
        <div className="absolute -top-10 -left-10 sm:-top-8 sm:-left-8 md:-top-6 md:-left-6 w-52 sm:w-64 md:w-80 lg:w-96 pointer-events-none z-0 select-none">
          <img
            src={flowerPropsBg}
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain opacity-25 sm:opacity-30 transform -rotate-12 filter drop-shadow-sm"
          />
        </div>

        {/* Bottom-Right Corner Edge Flower Prop */}
        <div className="absolute -bottom-14 -right-14 sm:-bottom-12 sm:-right-12 md:-bottom-10 md:-right-10 w-56 sm:w-72 md:w-88 lg:w-[420px] pointer-events-none z-0 select-none">
          <img
            src={flowerPropsBg}
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain opacity-25 sm:opacity-30 transform rotate-180 filter drop-shadow-sm"
          />
        </div>
      </div>

      {/* -------------------- SECTION CONTAINER -------------------- */}
      <div className="max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-10 relative z-10">
        
        {/* -------------------- TOP EDITORIAL & HEADER BAR -------------------- */}
        <div className="relative flex flex-col items-center text-center mb-7 sm:mb-9 lg:mb-11">
          
          {/* Top Left Micro-Copy (Matches Banner) */}
          <div className="hidden lg:block absolute left-0 top-0 text-left pointer-events-none">
            <div className="text-[10.5px] uppercase tracking-[0.24em] leading-relaxed text-[#917666] font-medium font-sans">
              More<br />
              Than<br />
              Nightwear<br />
              <span className="text-[#6d5142] font-semibold">A Better You</span>
            </div>
          </div>

          {/* Top Right Micro-Copy (Matches Banner) */}
          <div className="hidden lg:block absolute right-0 top-0 text-right pointer-events-none">
            <div className="text-[10.5px] uppercase tracking-[0.24em] leading-relaxed text-[#917666] font-medium font-sans">
              Comfort<br />
              Beauty<br />
              Confidence<br />
              <span className="text-[#6d5142] font-semibold">Every Night</span>
            </div>
          </div>

          {/* Centered Diamond Star Sparkle Ornament */}
          <div className="flex items-center justify-center mb-1.5 sm:mb-2">
            <div className="relative flex items-center justify-center">
              {/* 4-point diamond star */}
              <svg className="w-4 h-4 text-[#c79d46] animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            </div>
          </div>

          {/* Main Headline: "Explore Our Collection" (Exact Reference Styling) */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-stone-900 leading-none">
            <span className="font-serif italic text-[#c29342] font-normal drop-shadow-xs">Explore </span>
            <span className="font-serif italic font-bold text-[#850b20] mx-0.5 sm:mx-1 drop-shadow-xs">Our </span>
            <span className="font-serif italic text-[#c29342] font-normal drop-shadow-xs">Collection</span>
          </h2>

          {/* Subtitle (Exact Reference Text) */}
          <p className="text-[10px] sm:text-xs lg:text-[13px] tracking-[0.26em] sm:tracking-[0.32em] text-[#856550] uppercase font-medium mt-2 sm:mt-2.5 max-w-xl mx-auto">
            Luxury Nightwear for a More Beautiful You
          </p>

          {/* Mobile swipe helper hint */}
          <div className="lg:hidden mt-2.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#a07e66]">
            <span>Swipe to explore 7 styles</span>
            <ArrowRight className="w-3 h-3 text-[#850b20]" />
          </div>
        </div>

        {/* -------------------- 7 ARCHED ALCOVE CARDS -------------------- */}
        {/* Desktop: Panoramic 7-column layout. Mobile/Tablet: Silky smooth snap-carousel */}
        <div className="relative group/carousel">
          
          {/* Navigation Arrows for Carousel (Mobile & Tablet) */}
          <button
            onClick={() => scroll('left')}
            aria-label="Previous Category"
            className={`xl:hidden absolute -left-2 sm:left-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 text-[#850b20] border border-[#d4af37]/60 shadow-lg shadow-black/10 flex items-center justify-center transition-all backdrop-blur-md cursor-pointer ${
              canScrollLeft ? 'opacity-100 scale-100 hover:bg-[#850b20] hover:text-white' : 'opacity-0 scale-90 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={() => scroll('right')}
            aria-label="Next Category"
            className={`xl:hidden absolute -right-2 sm:right-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 text-[#850b20] border border-[#d4af37]/60 shadow-lg shadow-black/10 flex items-center justify-center transition-all backdrop-blur-md cursor-pointer ${
              canScrollRight ? 'opacity-100 scale-100 hover:bg-[#850b20] hover:text-white' : 'opacity-0 scale-90 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Cards Track */}
          <div
            ref={scrollContainerRef}
            className="flex xl:grid xl:grid-cols-7 gap-3 sm:gap-4 lg:gap-4 xl:gap-3.5 overflow-x-auto snap-x snap-mandatory xl:overflow-visible no-scrollbar pb-3 pt-1 px-1"
          >
            {CATEGORY_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                className="group relative flex-none w-[185px] sm:w-[215px] md:w-[230px] xl:w-full snap-center cursor-pointer transition-all duration-300"
              >
                {/* Classic Roman Arched Card Shell */}
                <div 
                  className="relative flex flex-col justify-between items-center h-[240px] sm:h-[265px] md:h-[285px] xl:h-[270px] 2xl:h-[295px] 
                  rounded-t-[72px] sm:rounded-t-[84px] md:rounded-t-[92px] rounded-b-[20px] sm:rounded-b-[24px] 
                  bg-gradient-to-b from-[#fdf6f0] via-[#f7eae0] to-[#f2ded1] 
                  border border-[#decab8] 
                  shadow-[0_6px_16px_-4px_rgba(133,11,32,0.06),0_2px_6px_-2px_rgba(0,0,0,0.03)] 
                  group-hover:border-[#c59b27] 
                  group-hover:shadow-[0_14px_28px_-6px_rgba(133,11,32,0.14),0_0_15px_rgba(212,175,55,0.2)] 
                  group-hover:-translate-y-1 
                  transition-all duration-300 ease-out p-2.5 sm:p-3 overflow-hidden"
                >
                  {/* Subtle Inner Glow Border / Rim Light */}
                  <div className="absolute inset-[2px] rounded-t-[70px] sm:rounded-t-[82px] md:rounded-t-[90px] rounded-b-[18px] sm:rounded-b-[22px] border border-white/80 pointer-events-none"></div>

                  {/* Gentle Top Sunlight Arc in Alcove */}
                  <div className="absolute top-0 inset-x-0 h-20 sm:h-24 bg-radial from-white/90 via-white/30 to-transparent pointer-events-none"></div>

                  {/* Floating Product Cutout Photo */}
                  <div className="relative z-10 flex-1 w-full flex items-center justify-center my-auto pt-2 pb-1">
                    <div className="relative w-full h-full max-h-[125px] sm:max-h-[140px] md:max-h-[155px] xl:max-h-[145px] 2xl:max-h-[160px] flex items-center justify-center">
                      
                      {/* Soft ambient garment shadow on floor */}
                      <div className="absolute bottom-1 inset-x-6 h-3 bg-[#4a0a14]/12 rounded-full blur-sm transform scale-90 group-hover:scale-100 group-hover:opacity-80 transition-all duration-300"></div>

                      <img
                        src={item.image}
                        alt={item.name}
                        loading={idx < 4 ? 'eager' : 'lazy'}
                        className="w-full h-full object-contain filter drop-shadow-md select-none transform group-hover:scale-105 group-hover:-translate-y-0.5 transition-all duration-300 ease-out"
                      />
                    </div>
                  </div>

                  {/* Card Bottom Area: Category Title / On-Hover Luxury Button */}
                  <div className="relative z-10 w-full flex items-center justify-center pt-1 pb-0.5">
                    <div className="w-full px-0.5 flex items-center justify-center">
                      <div 
                        className="relative w-full py-1.5 px-2.5 rounded-full border border-transparent 
                          text-stone-900 font-serif font-semibold text-[11px] sm:text-[11.5px] xl:text-[11.5px] 2xl:text-[12.5px] leading-tight text-center 
                          flex items-center justify-center gap-1.5 
                          group-hover:bg-gradient-to-r group-hover:from-[#4d0612] group-hover:via-[#7d0b1f] group-hover:to-[#4d0612] 
                          group-hover:text-[#fbf5ee] group-hover:border-[#d4af37]/80 
                          group-hover:shadow-md group-hover:shadow-[#7d0b1f]/30 
                          group-hover:scale-[1.02] 
                          transition-all duration-300 min-h-[34px] sm:min-h-[36px] overflow-hidden"
                      >
                        {/* Shimmer sweep effect on card hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>

                        <span className="relative z-10 line-clamp-2 transition-colors duration-300">
                          {item.name}
                        </span>
                        <ArrowRight className="relative z-10 w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f3e5ab] shrink-0 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel Progress Dots */}
          <div className="xl:hidden flex items-center justify-center gap-1.5 mt-4">
            {CATEGORY_ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = scrollContainerRef.current;
                  if (!el) return;
                  const cardWidth = el.scrollWidth / CATEGORY_ITEMS.length;
                  el.scrollTo({ left: cardWidth * i, behavior: 'smooth' });
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeCardIndex === i ? 'w-6 bg-[#850b20]' : 'w-1.5 bg-[#d8c3b0]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* -------------------- BOTTOM ACTION & CORNER LABELS -------------------- */}
        <div className="relative mt-7 sm:mt-9 flex flex-col items-center justify-center">
          
          {/* Bottom Left Micro-Copy with Gold Rule (Matches Banner) */}
          <div className="hidden lg:flex items-center gap-3 absolute left-0 bottom-1">
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#8f7464] font-medium leading-relaxed font-sans text-left">
              Sweet Dreams<br />
              <span className="text-[#64493a] font-semibold">Brighter Tomorrows</span>
            </div>
            <div className="w-16 h-[1px] bg-gradient-to-r from-[#c79d46]/60 to-transparent"></div>
          </div>

          {/* Bottom Right Micro-Copy with Gold Rule (Matches Banner) */}
          <div className="hidden lg:flex items-center gap-3 absolute right-0 bottom-1">
            <div className="w-16 h-[1px] bg-gradient-to-l from-[#c79d46]/60 to-transparent"></div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#8f7464] font-medium leading-relaxed font-sans text-right">
              Designed For<br />
              <span className="text-[#64493a] font-semibold">Modern Women</span>
            </div>
          </div>

          {/* Center Pill Button: "VIEW ALL COLLECTIONS →" (Exact Reference Button) */}
          <button
            id="view-all-collections-btn"
            onClick={handleViewAll}
            className="group relative inline-flex items-center gap-2.5 px-8 sm:px-10 py-3 sm:py-3.5 
              rounded-full bg-gradient-to-r from-[#4d0612] via-[#7d0b1f] to-[#4d0612] 
              text-[#fbf5ee] text-xs sm:text-[12.5px] uppercase tracking-[0.22em] font-medium 
              border border-[#d4af37]/65 shadow-xl shadow-[#7d0b1f]/25 
              hover:shadow-2xl hover:shadow-[#7d0b1f]/40 hover:border-[#f3e5ab] 
              transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] 
              transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"></div>

            <span className="relative z-10 font-semibold">View All Collections</span>
            <ArrowRight className="relative z-10 w-4 h-4 text-[#f3e5ab] transform group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>

      {/* -------------------- INTERACTIVE CATEGORY QUICK-VIEW MODAL -------------------- */}
      {selectedCategory && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedCategory(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#faf6f2] rounded-3xl sm:rounded-4xl border border-[#d4af37]/60 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-[#850b20] hover:text-white text-stone-700 border border-stone-200 shadow-md flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
              {/* Left Column: Image Preview & Gallery */}
              <div className="md:col-span-6 bg-gradient-to-b from-[#fdf7f2] via-[#f7ebe0] to-[#eed8c8] p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#e5d4c4]">
                {/* Main Large Image */}
                <div className="relative w-full h-64 sm:h-80 flex items-center justify-center">
                  <img
                    src={modalActiveImage || selectedCategory.image}
                    alt={selectedCategory.name}
                    className="max-w-full max-h-full object-contain filter drop-shadow-xl"
                  />
                </div>

                {/* Additional Angle Thumbnails */}
                {selectedCategory.gallery && selectedCategory.gallery.length > 1 && (
                  <div className="flex items-center gap-2 mt-4 overflow-x-auto max-w-full py-1">
                    {selectedCategory.gallery.map((thumbUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setModalActiveImage(thumbUrl)}
                        className={`w-12 h-12 rounded-xl p-1 bg-white border-2 shrink-0 transition-all cursor-pointer ${
                          modalActiveImage === thumbUrl
                            ? 'border-[#850b20] shadow-sm scale-105'
                            : 'border-stone-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={thumbUrl}
                          alt={`${selectedCategory.name} angle ${idx + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Collection Details & Quick Actions */}
              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-5">
                <div>
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#850b20] text-white">
                      {selectedCategory.badge}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 text-[#850b20] border border-[#d4af37]/40">
                      {selectedCategory.pieces}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif-luxury text-2xl font-bold text-stone-900 leading-tight">
                    {selectedCategory.name}
                  </h3>

                  <p className="text-xs text-[#850b20] font-medium mt-1">
                    {selectedCategory.tagline}
                  </p>

                  {/* Price info */}
                  <div className="flex items-baseline gap-2.5 mt-3">
                    <span className="font-serif-luxury text-2xl font-bold text-[#850b20]">
                      ${selectedCategory.price}
                    </span>
                    <span className="text-xs text-stone-400 line-through">
                      ${selectedCategory.originalPrice}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Save ${(selectedCategory.originalPrice - selectedCategory.price).toFixed(0)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-600 leading-relaxed mt-3">
                    {selectedCategory.description}
                  </p>

                  {/* Pieces Included Checklist */}
                  <div className="mt-4 pt-4 border-t border-stone-200">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-800 mb-2">
                      Included in this Capsule:
                    </h4>
                    <ul className="space-y-1.5">
                      {selectedCategory.includes.map((piece, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-stone-700">
                          <Check className="w-3.5 h-3.5 text-[#850b20] shrink-0" />
                          <span>{piece}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Fabric Guarantee */}
                  <div className="mt-4 flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#e4d6ca] text-[11px] text-stone-600">
                    <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>{selectedCategory.fabric}</span>
                  </div>
                </div>

                {/* Modal CTA Buttons */}
                <div className="space-y-2 pt-3 border-t border-stone-200">
                  <button
                    onClick={() => handleExploreInCatalog(selectedCategory)}
                    className="w-full py-3 px-5 rounded-xl bg-[#850b20] hover:bg-[#6b0618] text-white font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>Explore Products in this Collection</span>
                    <ArrowRight className="w-4 h-4 text-[#d4af37]" />
                  </button>

                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="w-full py-2.5 text-xs text-stone-500 hover:text-stone-800 font-medium transition-colors cursor-pointer"
                  >
                    Continue Browsing Collections
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
