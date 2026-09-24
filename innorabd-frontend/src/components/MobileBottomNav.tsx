import React from 'react';
import { ShoppingBag, Heart, Ruler, Sparkles, Home } from 'lucide-react';
import { CategoryType } from '../types';

interface MobileBottomNavProps {
  onSelectHome: () => void;
  onOpenSizeCalculator: () => void;
  onOpenFitStylist: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  cartCount: number;
  wishlistCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onSelectHome,
  onOpenSizeCalculator,
  onOpenFitStylist,
  onOpenWishlist,
  onOpenCart,
  cartCount,
  wishlistCount,
}) => {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#faf8f7]/95 backdrop-blur-md border-t border-[#e8ded5] py-2 px-3 shadow-lg">
      <div className="flex items-center justify-around">
        {/* Home / Shop */}
        <button
          onClick={onSelectHome}
          className="flex flex-col items-center gap-0.5 text-stone-700 hover:text-[#850b20] transition-colors p-1"
        >
          <Home className="w-5 h-5 text-[#850b20]" />
          <span className="text-[10px] font-medium">Shop</span>
        </button>

        {/* Size Guide Calculator */}
        <button
          onClick={onOpenSizeCalculator}
          className="flex flex-col items-center gap-0.5 text-stone-700 hover:text-[#850b20] transition-colors p-1"
        >
          <Ruler className="w-5 h-5 text-[#d4af37]" />
          <span className="text-[10px] font-medium">Size Guide</span>
        </button>

        {/* Fit Stylist */}
        <button
          onClick={onOpenFitStylist}
          className="flex flex-col items-center gap-0.5 text-stone-700 hover:text-[#850b20] transition-colors p-1"
        >
          <Sparkles className="w-5 h-5 text-[#850b20]" />
          <span className="text-[10px] font-medium">Fit Quiz</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={onOpenWishlist}
          className="flex flex-col items-center gap-0.5 text-stone-700 hover:text-[#850b20] transition-colors p-1 relative"
        >
          <Heart className="w-5 h-5 text-[#850b20]" />
          {wishlistCount > 0 && (
            <span className="absolute 0 right-1 bg-[#d4af37] text-black font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
          <span className="text-[10px] font-medium">Saved</span>
        </button>

        {/* Bag */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center gap-0.5 text-stone-700 hover:text-[#850b20] transition-colors p-1 relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#850b20]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#850b20] text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-[#d4af37]">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-[#850b20]">Bag</span>
        </button>
      </div>
    </nav>
  );
};
