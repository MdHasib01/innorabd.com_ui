import React, { useState } from 'react';
import { CartItem, PackagingOption } from '../types';
import { PACKAGING_OPTIONS } from '../data/products';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ShieldCheck, 
  Gift, 
  Sparkles, 
  ArrowRight,
  Tag,
  Check
} from 'lucide-react';
import { formatCurrency } from '../utils/calculator';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  selectedPackaging: PackagingOption;
  onSelectPackaging: (pkg: PackagingOption) => void;
  appliedPromo: { code: string; discountPercent: number; fixedDiscount: number } | null;
  onApplyPromo: (code: string) => boolean;
  onRemovePromo: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  selectedPackaging,
  onSelectPackaging,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
  onProceedToCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 50;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent > 0) {
      discountAmount = (subtotal * appliedPromo.discountPercent) / 100;
    } else if (appliedPromo.fixedDiscount > 0) {
      discountAmount = Math.min(subtotal, appliedPromo.fixedDiscount);
    }
  }

  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 7.5;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + selectedPackaging.price + shippingCost + (subtotal > 0 ? estimatedTax : 0);

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const success = onApplyPromo(promoInput.trim().toUpperCase());
    if (success) {
      setPromoSuccess(true);
      setPromoInput('');
      setTimeout(() => setPromoSuccess(false), 2000);
    } else {
      setPromoError('Invalid code. Try "GOLDEN20" or "LACEVIP"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-md bg-[#faf8f7] h-full flex flex-col shadow-2xl border-l border-[#d4af37]/30">
        {/* Header */}
        <div className="p-4 bg-[#850b20] text-white flex items-center justify-between border-b border-[#d4af37]/40">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-serif-luxury font-bold text-lg tracking-wide">
              Your Lingerie Bag ({items.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#f6ede4] p-3 border-b border-[#e8dfd7] text-xs">
          {amountToFreeShipping > 0 ? (
            <div className="space-y-1.5">
              <div className="flex justify-between text-stone-700 font-medium">
                <span>Add <strong>{formatCurrency(amountToFreeShipping)}</strong> for Complimentary Shipping</span>
                <span className="text-[#850b20] font-bold">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#850b20] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-800 font-bold justify-center">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>Complimentary Discreet Shipping Unlocked!</span>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#f4ebe3] text-[#850b20] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif-luxury text-base font-bold text-stone-800">
                  Your bag is currently empty
                </h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our luxury French lace collections and personalized fit finder.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#850b20] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
              >
                Shop Collection
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-white rounded-2xl border border-stone-200 shadow-xs flex gap-3 relative group"
                >
                  <img
                    src={item.selectedColor.image || item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-20 object-cover rounded-xl border border-stone-200 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif-luxury text-xs font-bold text-stone-900 line-clamp-1 pr-6">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-[#850b20] p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-stone-500">
                        <span className="font-semibold text-[#850b20]">
                          Size: {item.selectedBand}{item.selectedCup}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-stone-300 inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name.split('&')[0]}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-stone-500 hover:text-black cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-800 font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-stone-500 hover:text-black cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-serif-luxury text-xs font-bold text-[#850b20]">
                          {formatCurrency(item.product.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Packaging Options Selector */}
              <div className="pt-2">
                <div className="text-xs font-bold text-stone-900 mb-2 flex items-center justify-between">
                  <span>Discreet Packaging & Keepsake Boxes</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#850b20]" />
                </div>
                <div className="space-y-2">
                  {PACKAGING_OPTIONS.map((pkg) => {
                    const isSelected = selectedPackaging.id === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => onSelectPackaging(pkg)}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#fbf4ee] border-[#850b20] ring-1 ring-[#850b20]'
                            : 'bg-white border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold text-stone-900">
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="packaging"
                              checked={isSelected}
                              onChange={() => onSelectPackaging(pkg)}
                              className="accent-[#850b20]"
                            />
                            <span>{pkg.name}</span>
                          </div>
                          <span className="text-[#850b20] font-bold">
                            {pkg.price === 0 ? 'FREE' : formatCurrency(pkg.price)}
                          </span>
                        </div>
                        <p className="text-[10px] text-stone-500 pl-5 mt-0.5">{pkg.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Promo Code Engine */}
              <div className="pt-2">
                {appliedPromo ? (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between text-xs text-emerald-900 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Code <strong>{appliedPromo.code}</strong> Applied (-{formatCurrency(discountAmount)})</span>
                    </div>
                    <button
                      onClick={onRemovePromo}
                      className="text-stone-500 hover:text-red-700 text-xs font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromoCode} className="space-y-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Promo Code (Try GOLDEN20)"
                        className="flex-1 bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#850b20] uppercase font-mono"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#850b20] hover:bg-[#680516] text-white text-xs font-bold rounded-xl shadow-xs"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && <div className="text-[10px] text-red-600 pl-1">{promoError}</div>}
                    {promoSuccess && <div className="text-[10px] text-emerald-700 pl-1">Promo applied successfully!</div>}
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-[#e8ded5] space-y-3">
            <div className="space-y-1 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">{formatCurrency(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Privilege Discount ({appliedPromo?.code})</span>
                  <span>-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              {selectedPackaging.price > 0 && (
                <div className="flex justify-between">
                  <span>Gift Packaging</span>
                  <span>{formatCurrency(selectedPackaging.price)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Discreet Shipping</span>
                <span className={shippingCost === 0 ? 'text-emerald-700 font-bold' : ''}>
                  {shippingCost === 0 ? 'FREE' : formatCurrency(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between font-bold text-stone-900 text-sm pt-2 border-t border-stone-100">
                <span>Total Amount</span>
                <span className="font-serif-luxury text-base text-[#850b20]">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-[#850b20] to-[#aa1531] hover:from-[#6b0618] hover:to-[#8c0e25] text-white font-bold text-xs rounded-xl shadow-lg border border-[#d4af37]/60 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Discreet Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37]" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#850b20]" />
              <span>256-Bit SSL Encrypted • 100% Confidential Billing</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
