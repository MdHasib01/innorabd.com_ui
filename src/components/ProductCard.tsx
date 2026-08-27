import React, { useState } from 'react';
import { Product, ProductColor } from '../types';
import { Heart, Sparkles, Eye, ShoppingBag, Check, Star } from 'lucide-react';
import { formatCurrency } from '../utils/calculator';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, band: number, cup: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedBand, setSelectedBand] = useState<number>(product.bandSizes[0]);
  const [selectedCup, setSelectedCup] = useState<string>(product.cupSizes[0]);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor, selectedBand, selectedCup);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setShowQuickAdd(false);
    }, 1200);
  };

  const displayImage = hoveredImage || selectedColor.image || product.images[0];

  return (
    <div
      className="group relative bg-[#ffffff] rounded-2xl overflow-hidden border border-[#eae0d7] hover:border-[#d4af37]/80 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
      onClick={() => onQuickView(product)}
    >
      {/* Image Container */}
      <div
        className="relative aspect-4/5 w-full overflow-hidden bg-[#f4ebe3]"
        onMouseEnter={() => {
          if (product.images.length > 1) {
            setHoveredImage(product.images[1]);
          }
        }}
        onMouseLeave={() => setHoveredImage(null)}
      >
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="inline-flex items-center gap-1 bg-[#850b20] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs border border-[#d4af37]/50 tracking-wide uppercase">
              <Sparkles className="w-2.5 h-2.5 text-[#d4af37]" />
              Best Seller
            </span>
          )}
          {product.isBridal && (
            <span className="inline-flex items-center bg-[#d4af37] text-stone-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs tracking-wide uppercase">
              Red & Gold Bridal
            </span>
          )}
          {product.isLuxuryLace && !product.isBestSeller && !product.isBridal && (
            <span className="bg-[#1c1917]/85 text-[#fbf5e6] text-[10px] font-medium px-2 py-0.5 rounded-full tracking-wide">
              {product.laceType}
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {product.discountPercent > 0 && (
          <div className="absolute top-3 right-3 bg-[#850b20] text-[#fbf5e6] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs border border-[#d4af37]/40">
            -{product.discountPercent}%
          </div>
        )}

        {/* Floating Quick Action Buttons */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-2 z-10">
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-2.5 rounded-full backdrop-blur-md shadow-md transition-all cursor-pointer ${
              isWishlisted
                ? 'bg-[#850b20] text-[#d4af37]'
                : 'bg-white/90 text-stone-700 hover:text-[#850b20] hover:bg-white'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2.5 rounded-full bg-white/90 text-stone-700 hover:text-[#850b20] hover:bg-white backdrop-blur-md shadow-md transition-all cursor-pointer"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add Overlay Drawer (Slide-up on trigger or hover) */}
        {showQuickAdd ? (
          <div
            className="absolute inset-x-0 bottom-0 bg-[#faf8f7]/95 backdrop-blur-md p-3 border-t border-[#e2d5ca] z-20 space-y-2 animate-in slide-in-from-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-[11px] font-semibold text-stone-800">
              <span>Select Band & Cup</span>
              <button
                onClick={() => setShowQuickAdd(false)}
                className="text-stone-400 hover:text-stone-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Band Size options */}
            <div className="flex flex-wrap gap-1">
              {product.bandSizes.map((band) => (
                <button
                  key={band}
                  onClick={() => setSelectedBand(band)}
                  className={`px-2 py-1 text-[10px] rounded font-medium transition-all ${
                    selectedBand === band
                      ? 'bg-[#850b20] text-white font-bold'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-[#850b20]'
                  }`}
                >
                  {band}
                </button>
              ))}
            </div>

            {/* Cup Size options */}
            <div className="flex flex-wrap gap-1">
              {product.cupSizes.map((cup) => (
                <button
                  key={cup}
                  onClick={() => setSelectedCup(cup)}
                  className={`px-2 py-1 text-[10px] rounded font-medium transition-all ${
                    selectedCup === cup
                      ? 'bg-[#850b20] text-white font-bold'
                      : 'bg-white text-stone-700 border border-stone-200 hover:border-[#850b20]'
                  }`}
                >
                  {cup}
                </button>
              ))}
            </div>

            <button
              onClick={handleQuickAdd}
              disabled={justAdded}
              className={`w-full py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs ${
                justAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#850b20] hover:bg-[#680516] text-white'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added {selectedBand}{selectedCup} to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Confirm & Add to Bag</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="absolute inset-x-3 bottom-3 hidden group-hover:block transition-all z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowQuickAdd(true);
              }}
              className="w-full py-2.5 bg-[#850b20]/95 hover:bg-[#850b20] text-white rounded-xl text-xs font-semibold shadow-lg border border-[#d4af37]/60 flex items-center justify-center gap-2 transition-all cursor-pointer backdrop-blur-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Quick Add to Bag</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        {/* Colors and Rating */}
        <div className="flex items-center justify-between">
          {/* Color Swatches */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((c) => {
              const isSelected = selectedColor.name === c.name;
              return (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c);
                  }}
                  className={`w-4 h-4 rounded-full transition-transform border ${
                    isSelected ? 'ring-2 ring-[#850b20] scale-110' : 'border-stone-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              );
            })}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-[11px] text-stone-600">
            <Star className="w-3 h-3 text-[#d4af37] fill-[#d4af37]" />
            <span className="font-semibold text-stone-900">{product.rating}</span>
            <span className="text-stone-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Product Title and Lace Type */}
        <div>
          <div className="text-[11px] text-[#850b20] font-semibold tracking-wide uppercase">
            {product.laceType}
          </div>
          <h3 className="font-serif-luxury text-sm font-bold text-stone-900 line-clamp-1 group-hover:text-[#850b20] transition-colors mt-0.5">
            {product.name}
          </h3>
          <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Fit Guarantee */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif-luxury text-base font-bold text-[#850b20]">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-stone-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <span className="text-[10px] text-stone-500 bg-[#faf4ef] px-2 py-0.5 rounded text-right font-medium">
            {product.coverage}
          </span>
        </div>
      </div>
    </div>
  );
};
