import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Ruler, 
  Sparkles, 
  Menu, 
  X, 
  ShieldCheck, 
  Truck,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';
import { CategoryType, CartItem, Product } from '../types';
import innoraLogo from '../../assets/innora-logo.png';

interface NavbarProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  cartItems: CartItem[];
  wishlist: Product[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSizeCalculator: () => void;
  onOpenFitStylist: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenMobileFilters: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  cartItems,
  wishlist,
  onOpenCart,
  onOpenWishlist,
  onOpenSizeCalculator,
  onOpenFitStylist,
  searchQuery,
  onSearchChange,
  onOpenMobileFilters,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories: CategoryType[] = [
    'All',
    'Luxury Lace',
    'Push-Up & Balconette',
    'Everyday & T-Shirt',
    'Wireless & Bralette',
    'Bridal & Red-Gold',
    'Silk Sleepwear',
    'Matching Panties',
  ];

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#faf8f7]/95 backdrop-blur-md border-b border-[#e7ded7]">
      {/* Top Announcement Ribbon */}
      <div className="bg-[#850b20] text-[#fbf5e6] text-xs py-2 px-4 border-b border-[#d4af37]/30">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-4 text-[11px] tracking-wide text-[#f3e5ab]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              100% Discreet Packaging
            </span>
            <span className="text-[#d4af37]/40">•</span>
            <span className="flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5 text-[#d4af37]" />
              Free 30-Day Sister-Size Fit Exchanges
            </span>
          </div>

          <div className="w-full sm:w-auto text-center font-medium tracking-wide">
            <span className="text-[#f3e5ab] font-serif-luxury mr-1.5 font-semibold">Special Privilege:</span>
            Complimentary Shipping & Gold Gift Wrap on Orders Over $50
          </div>

          <div className="hidden md:flex items-center gap-3 text-[11px] text-[#f3e5ab]">
            <button
              onClick={onOpenSizeCalculator}
              className="hover:text-white transition-colors underline decoration-[#d4af37] underline-offset-2 flex items-center gap-1 cursor-pointer"
            >
              <Ruler className="w-3 h-3 text-[#d4af37]" />
              Find My Exact Bra Size
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#850b20] hover:text-[#680516] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button
              id="mobile-search-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#850b20] ml-1"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo: Logo Image + INNORAᴮᴰ text */}
          <div 
            id="brand-logo-btn"
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group py-1 select-none" 
            onClick={() => onSelectCategory('All')}
          >
            {/* Signature Monogram Emblem */}
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-sm border border-[#d4af37]/60 group-hover:border-[#d4af37] transition-all transform group-hover:scale-105 duration-300 bg-[#30000c] flex items-center justify-center">
                <img
                  src={innoraLogo}
                  alt="INNORA Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Subtle Luxury Gold Ring Glow */}
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#d4af37] border-2 border-[#faf8f7] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#850b20] animate-pulse"></span>
              </span>
            </div>

            {/* Typography: INNORA with snug golden BD badge */}
            <div className="flex flex-col justify-center">
              <div className="relative inline-flex items-center">
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-[#850b20] group-hover:text-[#680516] transition-colors leading-none">
                  INNORA
                </span>
                <span className="relative -top-2.5 sm:-top-3 ml-1 px-1.5 py-0.2 bg-gradient-to-r from-[#d4af37] via-[#f9e9ad] to-[#cba02c] text-[#6b0618] text-[9px] sm:text-[10px] font-extrabold tracking-wider rounded-md border border-[#dfb73e] shadow-2xs select-none uppercase">
                  BD
                </span>
              </div>
              <span className="text-[8.5px] sm:text-[9.5px] tracking-[0.24em] uppercase text-[#9e782f] font-semibold mt-0.5">
                Haute Lingerie & Fit
              </span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#850b20]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="desktop-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search luxury lace, plunge push-up, silk sleepwear..."
                className="w-full bg-[#f4ece4] pl-9 pr-4 py-2 text-xs rounded-full border border-[#e5d5c5] focus:outline-none focus:border-[#850b20] focus:ring-1 focus:ring-[#850b20] transition-all text-[#1c1917] placeholder:text-[#8c7b75]"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Action Icons & Tools */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Interactive Size Guide button */}
            <button
              id="nav-size-guide-btn"
              onClick={onOpenSizeCalculator}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#850b20] bg-[#fbf2eb] hover:bg-[#fae7dc] border border-[#d4af37]/50 rounded-full transition-all shadow-xs cursor-pointer"
            >
              <Ruler className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Size Calculator</span>
            </button>

            {/* Smart Stylist Quiz */}
            <button
              id="nav-fit-stylist-btn"
              onClick={onOpenFitStylist}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#850b20] bg-gradient-to-r from-[#faece3] to-[#fdede0] hover:border-[#d4af37] border border-[#e6cda3] rounded-full transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Fit Stylist</span>
            </button>

            {/* Mobile filter toggle */}
            <button
              id="nav-mobile-filters-btn"
              onClick={onOpenMobileFilters}
              className="p-2 text-[#850b20] hover:text-[#680516] lg:hidden"
              title="Filters"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              id="nav-wishlist-btn"
              onClick={onOpenWishlist}
              className="relative p-2 text-[#850b20] hover:text-[#680516] transition-colors cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4af37] text-[#1c1917] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Icon */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 p-2 px-3.5 bg-[#850b20] hover:bg-[#6e0719] text-[#fbf5e6] rounded-full shadow-sm transition-all cursor-pointer group"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold hidden sm:inline">Bag</span>
              <span className="bg-[#d4af37] text-[#1c1917] font-bold text-[10px] px-1.5 py-0.2 rounded-full min-w-4 text-center">
                {totalCartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Expandable Bar */}
        {searchOpen && (
          <div className="lg:hidden pb-3 pt-1">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#850b20]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="mobile-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search lace bras, bridal sets, silk slips..."
                className="w-full bg-[#f4ece4] pl-9 pr-4 py-2 text-xs rounded-full border border-[#e5d5c5] focus:outline-none focus:border-[#850b20] text-[#1c1917]"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Desktop Category Navigation Menu */}
        <nav className="hidden lg:flex items-center justify-center gap-1 py-2 border-t border-[#f0e6dc]">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase transition-all rounded-md cursor-pointer ${
                  isActive
                    ? 'text-[#850b20] font-bold bg-[#f6ebe0] border-b-2 border-[#850b20]'
                    : 'text-stone-700 hover:text-[#850b20] hover:bg-[#fbf7f4]'
                }`}
              >
                {cat}
                {cat === 'Bridal & Red-Gold' && (
                  <span className="ml-1.5 text-[9px] bg-[#d4af37] text-stone-900 font-bold px-1.5 py-0.5 rounded-xs tracking-normal">
                    Exclusive
                  </span>
                )}
                {cat === 'Luxury Lace' && (
                  <span className="ml-1.5 text-[9px] bg-[#850b20] text-white font-semibold px-1.5 py-0.5 rounded-xs tracking-normal">
                    French
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf8f7] border-b border-[#e7ded7] px-4 py-4 shadow-xl">
          {/* Mobile Drawer Header with Logo & Brand */}
          <div 
            className="flex items-center gap-3 pb-3 mb-3 border-b border-[#e7ded7] cursor-pointer"
            onClick={() => {
              onSelectCategory('All');
              setMobileMenuOpen(false);
            }}
          >
            <div className="w-9 h-9 rounded-lg overflow-hidden border border-[#d4af37]/60 shadow-xs bg-[#30000c] flex-shrink-0">
              <img src={innoraLogo} alt="INNORA Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <div className="relative inline-flex items-center">
                <span className="font-serif-luxury text-xl font-bold text-[#850b20] leading-none">INNORA</span>
                <span className="relative -top-2 ml-1 px-1.5 py-0.2 bg-gradient-to-r from-[#d4af37] via-[#f9e9ad] to-[#cba02c] text-[#6b0618] text-[8.5px] font-extrabold tracking-wider rounded-md border border-[#dfb73e] shadow-2xs select-none uppercase">
                  BD
                </span>
              </div>
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#9e782f] font-semibold mt-0.5">Haute Lingerie & Fit</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-[#850b20] uppercase tracking-wider px-3 mb-2">
              Lingerie Categories
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between ${
                  activeCategory === cat
                    ? 'bg-[#850b20] text-white font-semibold'
                    : 'text-stone-800 hover:bg-[#f2e7de]'
                }`}
              >
                <span>{cat}</span>
                {cat === 'Bridal & Red-Gold' && (
                  <span className="text-[10px] bg-[#d4af37] text-black font-bold px-1.5 py-0.5 rounded">
                    Red & Gold
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[#e8ded5] grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenSizeCalculator();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#f6ede3] text-[#850b20] border border-[#d4af37]/60 rounded-lg text-xs font-semibold"
            >
              <Ruler className="w-4 h-4 text-[#d4af37]" />
              Size Guide & Sister Sizes
            </button>
            <button
              onClick={() => {
                onOpenFitStylist();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#850b20] text-white rounded-lg text-xs font-semibold"
            >
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              AI Fit Stylist
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
