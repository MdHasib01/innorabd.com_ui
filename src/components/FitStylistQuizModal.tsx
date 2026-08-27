import React, { useState } from 'react';
import { Product, ProductColor } from '../types';
import { Sparkles, X, Check, ArrowRight, Heart, RotateCcw, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '../utils/calculator';

interface FitStylistQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, band: number, cup: string) => void;
}

export const FitStylistQuizModal: React.FC<FitStylistQuizModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [step, setStep] = useState<number>(1);
  const [occasion, setOccasion] = useState<string>('Bridal & Luxury Evenings');
  const [shape, setShape] = useState<string>('Teardrop / Natural');
  const [support, setSupport] = useState<string>('Underwire Sculpt & Lift');
  const [colorTone, setColorTone] = useState<string>('Crimson Scarlet & Gold');
  const [isFinished, setIsFinished] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setStep(1);
    setIsFinished(false);
  };

  // Filter recommendations based on quiz choices
  const recommendedProducts = products.filter((p) => {
    if (occasion === 'Bridal & Luxury Evenings' && (p.isBridal || p.isLuxuryLace)) return true;
    if (occasion === 'Everyday Invisible & Smooth' && p.category === 'Everyday & T-Shirt') return true;
    if (occasion === 'Supreme Wireless Cloud' && p.category === 'Wireless & Bralette') return true;
    if (occasion === 'Silk Loungewear & Slips' && p.category === 'Silk Sleepwear') return true;
    return p.isLuxuryLace || p.isBestSeller;
  }).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#faf8f7] rounded-3xl shadow-2xl border-2 border-[#d4af37]/40 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#850b20] via-[#9c122c] to-[#630414] text-white p-6 border-b border-[#d4af37]/40 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
            <span className="text-xs uppercase font-bold tracking-widest text-[#f3e5ab]">
              AI Fit & Style Concierge
            </span>
          </div>

          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold">
            {isFinished ? 'Your Curated Haute Capsule' : 'Find Your Signature Lingerie Profile'}
          </h2>
          <p className="text-xs text-[#ebd8c8] mt-1">
            {isFinished
              ? 'Hand-picked innerwear pieces engineered for your unique shape and lifestyle.'
              : `Step ${step} of 4: Tailoring your silhouette in 60 seconds.`}
          </p>

          {!isFinished && (
            <div className="w-full bg-white/20 h-1.5 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-[#d4af37] h-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Body Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {!isFinished ? (
            <div className="space-y-6">
              {/* Question 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                    What is the primary mood or occasion you are shopping for?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        title: 'Bridal & Luxury Evenings',
                        desc: 'Intricate French lace, 24K gold accents, theatrical romance.',
                        badge: 'Haute Couture',
                      },
                      {
                        title: 'Everyday Invisible & Smooth',
                        desc: 'Seamless zero-edge finish beneath fitted t-shirts and silks.',
                        badge: 'Zero Show-Through',
                      },
                      {
                        title: 'Supreme Wireless Cloud',
                        desc: 'Unconstrained featherlight bralettes with natural lift.',
                        badge: 'All-Day Ease',
                      },
                      {
                        title: 'Sculpted Cleavage & Plunge',
                        desc: 'Dual-action push-up lift for low-cut dresses & sweetheart tops.',
                        badge: 'Maximum Lift',
                      },
                    ].map((opt) => (
                      <button
                        key={opt.title}
                        onClick={() => setOccasion(opt.title)}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                          occasion === opt.title
                            ? 'bg-[#fbf3ec] border-[#850b20] ring-2 ring-[#850b20]/30 shadow-xs'
                            : 'bg-white border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-stone-900">{opt.title}</span>
                          <span className="text-[9px] bg-[#d4af37]/20 text-[#850b20] font-bold px-1.5 py-0.5 rounded">
                            {opt.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                    How would you describe your natural breast anatomy?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        title: 'Teardrop / Natural',
                        desc: 'Fuller at the base with a gentle slope toward the collarbone.',
                        rec: 'Ideal for Balconette & Demi cuts',
                      },
                      {
                        title: 'Full & Round',
                        desc: 'Equally distributed volume on top and bottom.',
                        rec: 'Ideal for Plunge & French Chantilly',
                      },
                      {
                        title: 'East-West / Side-Set',
                        desc: 'Tissue gravitates outward toward underarms.',
                        rec: 'Ideal for Side-Sling Push-Up',
                      },
                      {
                        title: 'Petite / Slender Silhouette',
                        desc: 'Subtle projection with a narrow ribcage frame.',
                        rec: 'Ideal for Corded Lace Bralettes',
                      },
                    ].map((opt) => (
                      <button
                        key={opt.title}
                        onClick={() => setShape(opt.title)}
                        className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                          shape === opt.title
                            ? 'bg-[#fbf3ec] border-[#850b20] ring-2 ring-[#850b20]/30 shadow-xs'
                            : 'bg-white border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <span className="text-xs font-bold text-stone-900 block mb-1">{opt.title}</span>
                        <p className="text-[11px] text-stone-500 mb-2">{opt.desc}</p>
                        <span className="text-[10px] text-[#850b20] font-semibold bg-[#faf1ea] px-2 py-0.5 rounded">
                          {opt.rec}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 3 */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                    What support feel do you cherish most?
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      {
                        title: 'Underwire Sculpt & Lift',
                        desc: 'Encased in 3-layer velvet silk cradle for zero ribcage pressure.',
                      },
                      {
                        title: 'Zero-Wire Freedom',
                        desc: 'Organic cotton sling support without any rigid hardware.',
                      },
                      {
                        title: 'Memory Foam Contoured Cup',
                        desc: '3D thermo-molding foam that molds to your unique body temperature.',
                      },
                    ].map((opt) => (
                      <button
                        key={opt.title}
                        onClick={() => setSupport(opt.title)}
                        className={`w-full p-3.5 rounded-2xl text-left border flex items-center justify-between transition-all cursor-pointer ${
                          support === opt.title
                            ? 'bg-[#fbf3ec] border-[#850b20] font-semibold'
                            : 'bg-white border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold text-stone-900">{opt.title}</div>
                          <div className="text-[11px] text-stone-500">{opt.desc}</div>
                        </div>
                        {support === opt.title && (
                          <div className="w-5 h-5 rounded-full bg-[#850b20] text-white flex items-center justify-center text-xs">
                            ✓
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 4 */}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                    Select your signature luxury color palette:
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: 'Crimson Scarlet & Gold', hex: '#850b20', tag: 'Brand Signature' },
                      { name: 'Royal Ruby Burgundy', hex: '#6a0d25', tag: 'Velvet Lace' },
                      { name: 'Midnight Onyx Noir', hex: '#141414', tag: 'Classic Seduction' },
                      { name: 'Warm Rosewood Nude', hex: '#b38b6d', tag: 'Second Skin' },
                    ].map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setColorTone(c.name)}
                        className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
                          colorTone === c.name
                            ? 'bg-[#fbf3ec] border-[#850b20] ring-2 ring-[#850b20]/30 shadow-xs'
                            : 'bg-white border-stone-200'
                        }`}
                      >
                        <span
                          className="w-7 h-7 rounded-full border border-stone-300 shrink-0 shadow-xs"
                          style={{ backgroundColor: c.hex }}
                        />
                        <div className="text-left">
                          <div className="text-xs font-bold text-stone-900">{c.name}</div>
                          <span className="text-[10px] text-[#850b20] font-medium">{c.tag}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#fbf4ee] to-[#faeade] p-4 rounded-2xl border border-[#d4af37] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#850b20]">
                    Stylist Diagnosis
                  </span>
                  <h4 className="font-serif-luxury text-base font-bold text-stone-900">
                    The {occasion.split('&')[0]} Signature Archetype
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Profile: {shape} • {support} • {colorTone}
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-[11px] text-[#850b20] hover:underline font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retake Quiz
                </button>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Top 3 Capsule Recommendations:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {recommendedProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white rounded-2xl p-3 border border-stone-200 hover:border-[#850b20] transition-all space-y-2 cursor-pointer flex flex-col justify-between"
                      onClick={() => {
                        onSelectProduct(prod);
                        onClose();
                      }}
                    >
                      <div className="aspect-4/5 w-full rounded-xl overflow-hidden bg-stone-100 relative">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-[#850b20] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          98% Fit Match
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#850b20] font-semibold uppercase">
                          {prod.laceType}
                        </div>
                        <h5 className="font-serif-luxury text-xs font-bold text-stone-900 line-clamp-1">
                          {prod.name}
                        </h5>
                        <div className="font-bold text-xs text-[#850b20] mt-1">
                          {formatCurrency(prod.price)}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(prod, prod.colors[0], prod.bandSizes[0], prod.cupSizes[0]);
                          onClose();
                        }}
                        className="w-full py-1.5 bg-[#850b20] hover:bg-[#680516] text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1 shadow-xs"
                      >
                        <ShoppingBag className="w-3 h-3 text-[#d4af37]" />
                        <span>Add Match to Bag</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#f2e7de] border-t border-[#e2d5ca] flex items-center justify-between">
          {!isFinished ? (
            <>
              <button
                onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
                className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900"
              >
                {step === 1 ? 'Cancel' : '← Previous Step'}
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-[#850b20] hover:bg-[#680516] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 border border-[#d4af37]/60 cursor-pointer"
              >
                <span>{step === 4 ? 'Generate Capsule' : 'Continue'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
              </button>
            </>
          ) : (
            <div className="w-full flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#850b20] hover:bg-[#680516] text-white text-xs font-bold rounded-xl shadow-md"
              >
                Explore Full innorabd Collection
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
