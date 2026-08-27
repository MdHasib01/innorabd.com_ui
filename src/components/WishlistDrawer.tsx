import React from 'react';
import { Product, ProductColor } from '../types';
import { X, Trash2, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/calculator';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, band: number, cup: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-md bg-[#faf8f7] h-full flex flex-col shadow-2xl border-l border-[#d4af37]/30">
        {/* Header */}
        <div className="p-4 bg-[#850b20] text-white flex items-center justify-between border-b border-[#d4af37]/40">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" />
            <h3 className="font-serif-luxury font-bold text-lg tracking-wide">
              Saved Pieces ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlist.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#f4ebe3] text-[#850b20] flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 opacity-60" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif-luxury text-base font-bold text-stone-800">
                  Your Wishlist is Empty
                </h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Click the heart icon on any bra, lace set, or silk robe to save your favorites.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#850b20] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-white rounded-2xl border border-stone-200 shadow-xs flex gap-3 cursor-pointer hover:border-[#850b20] transition-all"
                onClick={() => {
                  onSelectProduct(item);
                  onClose();
                }}
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-16 h-20 object-cover rounded-xl border border-stone-200 shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="text-[10px] uppercase font-bold text-[#850b20]">
                        {item.laceType}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFromWishlist(item);
                        }}
                        className="text-stone-400 hover:text-[#850b20] p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className="font-serif-luxury text-xs font-bold text-stone-900 line-clamp-1">
                      {item.name}
                    </h4>
                    <div className="font-serif-luxury text-xs font-bold text-[#850b20] mt-0.5">
                      {formatCurrency(item.price)}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(item, item.colors[0], item.bandSizes[0], item.cupSizes[0]);
                    }}
                    className="w-full py-1.5 bg-[#850b20] hover:bg-[#680516] text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <ShoppingBag className="w-3 h-3 text-[#d4af37]" />
                    <span>Quick Move to Bag</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
