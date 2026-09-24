import React, { useState } from 'react';
import { Product, ProductColor, ProductReview } from '../types';
import { SAMPLE_REVIEWS } from '../data/products';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star, 
  X, 
  Check, 
  Ruler, 
  ShoppingBag,
  Plus,
  Minus,
  Layers,
  Sparkle
} from 'lucide-react';
import { formatCurrency } from '../utils/calculator';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: ProductColor, band: number, cup: string, quantity?: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  allProducts: Product[];
  onOpenSizeCalculator: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  allProducts,
  onOpenSizeCalculator,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedBand, setSelectedBand] = useState<number>(product.bandSizes[0]);
  const [selectedCup, setSelectedCup] = useState<string>(product.cupSizes[0]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'craftsmanship' | 'reviews' | 'care'>('craftsmanship');
  const [addMatchingSet, setAddMatchingSet] = useState<boolean>(false);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  // Find matching panty/set item if configured
  const matchingProduct = product.matchingItemId
    ? allProducts.find((p) => p.id === product.matchingItemId)
    : null;

  const reviews: ProductReview[] = SAMPLE_REVIEWS[product.id] || [
    {
      id: 'rev-def-1',
      author: 'Charlotte B. (California)',
      rating: 5,
      date: '4 days ago',
      title: 'Remarkable luxury feel and exquisite red lace!',
      comment: 'The gold accents give this such a regal touch. Wore it all evening under a silk gown with zero discomfort.',
      sizePurchased: `${selectedBand}${selectedCup}`,
      fitFeedback: 'True to Size',
      verified: true,
    },
  ];

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, selectedBand, selectedCup, quantity);
    if (addMatchingSet && matchingProduct) {
      onAddToCart(
        matchingProduct,
        matchingProduct.colors[0],
        matchingProduct.bandSizes[0],
        matchingProduct.cupSizes[0],
        1
      );
    }
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 1000);
  };

  // Sister size calculation preview
  const tightSister = selectedBand > 30 ? `${selectedBand - 2}${String.fromCharCode(selectedCup.charCodeAt(0) + 1)}` : null;
  const looseSister = selectedBand < 42 && selectedCup !== 'A' ? `${selectedBand + 2}${String.fromCharCode(selectedCup.charCodeAt(0) - 1)}` : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-[#faf8f7] rounded-3xl shadow-2xl border-2 border-[#d4af37]/40 overflow-hidden my-4 sm:my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-black shadow-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 p-4 sm:p-6 bg-[#f4ebe2] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e7ded7]">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden shadow-lg border border-[#d4af37]/30 bg-white">
                <img
                  src={product.images[activeImageIndex] || selectedColor.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />

                {/* Floating Tags */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span className="bg-[#850b20] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border border-[#d4af37]/50">
                    {product.laceType}
                  </span>
                  {product.isBridal && (
                    <span className="bg-[#d4af37] text-stone-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm uppercase">
                      Bridal Red & Gold
                    </span>
                  )}
                </div>

                {product.discountPercent > 0 && (
                  <div className="absolute top-3 right-3 bg-[#850b20] text-white text-xs font-bold px-2.5 py-1 rounded-lg border border-[#d4af37]">
                    Save {product.discountPercent}%
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                        activeImageIndex === idx
                          ? 'border-[#850b20] shadow-md scale-105'
                          : 'border-stone-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Discreet Packaging Assurance Box */}
            <div className="mt-4 p-3.5 bg-white/90 rounded-2xl border border-[#d4af37]/40 text-xs space-y-1.5 shadow-xs">
              <div className="flex items-center gap-2 font-bold text-[#850b20]">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>100% Guaranteed Discreet Packaging</span>
              </div>
              <p className="text-[11px] text-stone-600">
                Delivered in a plain, zero-branded exterior box with tamper-proof security tape.
              </p>
            </div>
          </div>

          {/* Right Column: Product Customization & Order Config */}
          <div className="md:col-span-6 p-6 sm:p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Title & Price Header */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#850b20]">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" />
                    <span className="font-bold text-stone-900">{product.rating}</span>
                    <span className="text-stone-400">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                  {product.name}
                </h1>
                <p className="text-xs text-stone-500 mt-0.5">{product.subtitle}</p>

                {/* Price Display */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-serif-luxury text-2xl font-bold text-[#850b20]">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-stone-400 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    In Stock • Ready to Dispatch
                  </span>
                </div>
              </div>

              {/* Color Swatches */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-stone-900">
                    Color: <span className="text-[#850b20]">{selectedColor.name}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => {
                    const isSelected = selectedColor.name === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#fbf4ee] border-[#850b20] ring-2 ring-[#850b20]/30 font-bold text-[#850b20]'
                            : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-xs"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name.split('&')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Band & Cup Size Selector with Sister Size Guidance */}
              <div className="space-y-3 pt-2 border-t border-stone-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900">
                    Select Size: <span className="text-[#850b20] font-mono">{selectedBand}{selectedCup}</span>
                  </span>
                  <button
                    onClick={onOpenSizeCalculator}
                    className="text-[#850b20] hover:text-[#5e0716] font-semibold flex items-center gap-1 underline underline-offset-2 cursor-pointer"
                  >
                    <Ruler className="w-3 h-3 text-[#d4af37]" />
                    Bra Size Calculator
                  </button>
                </div>

                {/* Band sizes */}
                <div>
                  <div className="text-[11px] text-stone-500 mb-1">Band (Underbust)</div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.bandSizes.map((band) => (
                      <button
                        key={band}
                        onClick={() => setSelectedBand(band)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          selectedBand === band
                            ? 'bg-[#850b20] text-white font-bold shadow-xs border border-[#d4af37]'
                            : 'bg-white text-stone-700 border border-stone-200 hover:border-[#850b20]'
                        }`}
                      >
                        {band}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cup sizes */}
                <div>
                  <div className="text-[11px] text-stone-500 mb-1">Cup Letter</div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.cupSizes.map((cup) => (
                      <button
                        key={cup}
                        onClick={() => setSelectedCup(cup)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          selectedCup === cup
                            ? 'bg-[#850b20] text-white font-bold shadow-xs border border-[#d4af37]'
                            : 'bg-white text-stone-700 border border-stone-200 hover:border-[#850b20]'
                        }`}
                      >
                        {cup}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sister size mini note */}
                {(tightSister || looseSister) && (
                  <div className="text-[11px] bg-[#fbf5e6] p-2 rounded-xl border border-[#d4af37]/40 text-stone-700 flex items-center gap-2">
                    <Sparkle className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>
                      Sister Sizes with identical cup volume: {tightSister && <strong className="text-[#850b20] mr-1">{tightSister} (firmer)</strong>} {looseSister && <strong className="text-[#850b20]">{looseSister} (relaxed)</strong>}
                    </span>
                  </div>
                )}
              </div>

              {/* Bundle & Save Matching Panty Checkbox */}
              {matchingProduct && (
                <div className="p-3.5 bg-gradient-to-r from-[#fdf6ed] to-[#faeee2] rounded-2xl border border-[#d4af37] space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-stone-900">
                      <input
                        type="checkbox"
                        checked={addMatchingSet}
                        onChange={(e) => setAddMatchingSet(e.target.checked)}
                        className="w-4 h-4 accent-[#850b20] rounded"
                      />
                      <span>Complete the Luxury Set & Save 20%</span>
                    </label>
                    <span className="text-[10px] bg-[#850b20] text-white font-bold px-2 py-0.5 rounded-full">
                      Bundle Deal
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pl-6">
                    <img
                      src={matchingProduct.images[0]}
                      alt={matchingProduct.name}
                      className="w-10 h-12 object-cover rounded-lg border border-stone-300"
                    />
                    <div className="text-[11px] text-stone-700">
                      <div className="font-semibold">{matchingProduct.name}</div>
                      <div className="text-[#850b20] font-bold">
                        +{formatCurrency(matchingProduct.price * 0.8)}{' '}
                        <span className="line-through text-stone-400 font-normal">
                          {formatCurrency(matchingProduct.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Bag */}
              <div className="pt-2 flex items-center gap-3">
                <div className="flex items-center border border-stone-300 rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-stone-500 hover:text-black cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-stone-900 font-mono">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-stone-500 hover:text-black cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Wishlist Toggle */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isWishlisted
                      ? 'bg-[#850b20] text-[#d4af37] border-[#850b20]'
                      : 'bg-white text-stone-700 border-stone-300 hover:border-[#850b20]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={addedAnimation}
                  className={`flex-1 py-3.5 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    addedAnimation
                      ? 'bg-emerald-700 text-white'
                      : 'bg-gradient-to-r from-[#850b20] to-[#aa1531] hover:from-[#6b0618] hover:to-[#8c0e25] text-white border border-[#d4af37]/60'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#d4af37]" />
                      <span>Add to Bag • {formatCurrency(product.price * quantity + (addMatchingSet && matchingProduct ? matchingProduct.price * 0.8 : 0))}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Craftsmanship & Reviews Accordion/Tabs */}
            <div className="pt-4 border-t border-stone-200">
              <div className="flex border-b border-stone-200">
                <button
                  onClick={() => setActiveTab('craftsmanship')}
                  className={`pb-2 px-3 text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'craftsmanship'
                      ? 'text-[#850b20] border-b-2 border-[#850b20]'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Fabric & Craft
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 px-3 text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'reviews'
                      ? 'text-[#850b20] border-b-2 border-[#850b20]'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Reviews ({product.reviewsCount})
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2 px-3 text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'care'
                      ? 'text-[#850b20] border-b-2 border-[#850b20]'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Care Guide
                </button>
              </div>

              <div className="pt-3 text-xs text-stone-700">
                {activeTab === 'craftsmanship' && (
                  <div className="space-y-2">
                    <p className="text-[11px] leading-relaxed text-stone-600">{product.description}</p>
                    <div className="space-y-1">
                      {product.craftsmanshipNotes.map((note, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px]">
                          <span className="text-[#850b20] font-bold">•</span>
                          <span>{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-3">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-stone-900">{rev.author}</span>
                          <span className="text-stone-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#d4af37]">
                          {'★'.repeat(rev.rating)}
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold ml-2">
                            Verified Fit ({rev.sizePurchased})
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-stone-800">{rev.title}</div>
                        <p className="text-[11px] text-stone-600">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'care' && (
                  <div className="space-y-1.5 text-[11px] text-stone-600">
                    {product.careInstructions.map((inst, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="text-[#d4af37] font-bold">✔</span>
                        <span>{inst}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
