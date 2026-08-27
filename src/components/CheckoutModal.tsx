import React, { useState } from 'react';
import { CartItem, PackagingOption, ShippingDetails, Order } from '../types';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  Truck, 
  Lock, 
  Gift, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight,
  Printer,
  Copy,
  Check
} from 'lucide-react';
import { formatCurrency } from '../utils/calculator';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  selectedPackaging: PackagingOption;
  appliedPromo: { code: string; discountPercent: number; fixedDiscount: number } | null;
  onOrderComplete: (order: Order) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  selectedPackaging,
  appliedPromo,
  onOrderComplete,
  onClearCart,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [shipping, setShipping] = useState<ShippingDetails>({
    fullName: 'Lady Eleanor Vance',
    email: 'eleanor.vance@luxurymail.com',
    phone: '+1 (555) 438-9201',
    address: '742 Evergreen Promenade, Suite 4B',
    apartment: 'Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    country: 'United States',
    specialInstructions: 'Please leave package at front vestibule. Zero brand labels.',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'klarna' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 8842');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('492');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent > 0) {
      discountAmount = (subtotal * appliedPromo.discountPercent) / 100;
    } else if (appliedPromo.fixedDiscount > 0) {
      discountAmount = Math.min(subtotal, appliedPromo.fixedDiscount);
    }
  }

  const shippingCost = subtotal >= 50 ? 0 : 7.5;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + selectedPackaging.price + shippingCost + tax;

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const orderNum = `INN-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingNum = `EXP-99${Math.floor(10000000 + Math.random() * 90000000)}`;

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: orderNum,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: [...items],
        shippingDetails: shipping,
        packagingOption: selectedPackaging,
        paymentMethod:
          paymentMethod === 'card'
            ? 'Credit Card (Ending in 8842)'
            : paymentMethod === 'applepay'
            ? 'Apple Pay / Digital Wallet'
            : paymentMethod === 'klarna'
            ? 'Klarna 4x Interest-Free'
            : 'Cash on Delivery (Discreet Envelope)',
        subtotal,
        discount: discountAmount,
        packagingPrice: selectedPackaging.price,
        shippingPrice: shippingCost,
        tax,
        total,
        status: 'Discreetly Packed',
        trackingNumber: trackingNum,
        estimatedDelivery: '2 - 3 Business Days via Priority Logistics',
      };

      setCompletedOrder(newOrder);
      onOrderComplete(newOrder);
      onClearCart();
      setIsProcessing(false);
      setStep(4);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#850b20', '#d4af37', '#ffffff', '#e6ca65'],
        });
      } catch (err) {
        console.error(err);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#faf8f7] rounded-3xl shadow-2xl border-2 border-[#d4af37]/40 overflow-hidden my-4 sm:my-8 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#850b20] text-white p-5 border-b border-[#d4af37]/40 relative shrink-0">
          {step < 4 && (
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-2 mb-1">
            <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#f3e5ab]">
              256-Bit Encrypted Confidential Checkout
            </span>
          </div>

          <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold">
            {step === 1 && 'Step 1: Contact & Discreet Destination'}
            {step === 2 && 'Step 2: Packaging & Delivery Secrecy'}
            {step === 3 && 'Step 3: Secure Payment Authorization'}
            {step === 4 && 'Privilege Order Confirmed'}
          </h2>

          {/* Step Breadcrumbs */}
          {step < 4 && (
            <div className="flex items-center gap-2 mt-3 text-xs">
              <span className={`font-semibold ${step >= 1 ? 'text-[#d4af37]' : 'text-white/40'}`}>
                1. Address
              </span>
              <span className="text-white/30">→</span>
              <span className={`font-semibold ${step >= 2 ? 'text-[#d4af37]' : 'text-white/40'}`}>
                2. Packaging
              </span>
              <span className="text-white/30">→</span>
              <span className={`font-semibold ${step >= 3 ? 'text-[#d4af37]' : 'text-white/40'}`}>
                3. Payment
              </span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Step 1: Shipping Address */}
          {step === 1 && (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-[#f7ede7] rounded-xl border border-[#850b20]/30 text-stone-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#850b20] shrink-0" />
                <span>
                  <strong>Discreet Guarantee:</strong> Shipping label will list sender as &quot;Logistics Distribution LLC&quot; with zero product category hints.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-900 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={shipping.fullName}
                    onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#850b20]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-900 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={shipping.email}
                    onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#850b20]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-900 mb-1">Phone (for courier delivery SMS)</label>
                  <input
                    type="tel"
                    value={shipping.phone}
                    onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#850b20]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-900 mb-1">Country</label>
                  <input
                    type="text"
                    value={shipping.country}
                    onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#850b20]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-900 mb-1">Street Address</label>
                <input
                  type="text"
                  value={shipping.address}
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                  placeholder="Street name and house/flat number"
                  className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#850b20]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-900 mb-1">City</label>
                  <input
                    type="text"
                    value={shipping.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#850b20]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-900 mb-1">State</label>
                  <input
                    type="text"
                    value={shipping.state}
                    onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#850b20]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-900 mb-1">Postal / ZIP</label>
                  <input
                    type="text"
                    value={shipping.zipCode}
                    onChange={(e) => setShipping({ ...shipping, zipCode: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#850b20]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-900 mb-1">Special Delivery Note</label>
                <input
                  type="text"
                  value={shipping.specialInstructions}
                  onChange={(e) => setShipping({ ...shipping, specialInstructions: e.target.value })}
                  placeholder="e.g. Leave with concierge or back porch discreetly"
                  className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#850b20]"
                />
              </div>
            </div>
          )}

          {/* Step 2: Packaging Review */}
          {step === 2 && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900">Chosen Packaging:</span>
                  <span className="text-[#850b20] font-bold">
                    {selectedPackaging.price === 0 ? 'FREE' : formatCurrency(selectedPackaging.price)}
                  </span>
                </div>
                <div className="p-3 bg-[#faf4ef] rounded-xl border border-[#d4af37]/40 space-y-1">
                  <div className="font-semibold text-stone-900 flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#850b20]" />
                    <span>{selectedPackaging.name}</span>
                  </div>
                  <p className="text-[11px] text-stone-600 pl-6">{selectedPackaging.description}</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900">Our 3-Tier Discreet Fulfillment Protocol:</h4>
                <div className="space-y-2 text-[11px] text-stone-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 mt-0.5" />
                    <span><strong>Zero Brand Inscriptions:</strong> The shipping box is 100% plain with tamper-evident security tape.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 mt-0.5" />
                    <span><strong>Neutral Bank Statement:</strong> Your credit card line item appears as &quot;INNO-GLOBAL TECH&quot;.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 mt-0.5" />
                    <span><strong>Free Sister Size Fit Guarantee:</strong> 30 days to exchange for your sister size with zero postage fees.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'card', name: 'Credit Card', icon: <CreditCard className="w-4 h-4" /> },
                  { id: 'applepay', name: 'Apple Pay / GPay', icon: <Sparkles className="w-4 h-4" /> },
                  { id: 'klarna', name: 'Klarna (4x Pay)', icon: <Lock className="w-4 h-4" /> },
                  { id: 'cod', name: 'Cash on Delivery', icon: <Truck className="w-4 h-4" /> },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-3 rounded-2xl border text-center font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === pm.id
                        ? 'bg-[#850b20] text-white border-[#d4af37] shadow-sm'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <span>{pm.icon}</span>
                    <span className="text-[11px]">{pm.name}</span>
                  </button>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-3">
                  <div>
                    <label className="block font-bold text-stone-900 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-mono focus:outline-none focus:border-[#850b20]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-stone-900 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-mono focus:outline-none focus:border-[#850b20]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-900 mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-mono focus:outline-none focus:border-[#850b20]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'klarna' && (
                <div className="p-4 bg-[#fbf4ee] rounded-2xl border border-[#d4af37] text-stone-800 space-y-1">
                  <div className="font-bold text-[#850b20]">Pay in 4 Interest-Free Installments</div>
                  <p className="text-[11px] text-stone-600">
                    4 payments of <strong>{formatCurrency(total / 4)}</strong> every two weeks. No hidden fees or impact on credit score.
                  </p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 bg-[#f4ebe2] rounded-2xl border border-stone-300 text-stone-800 space-y-1">
                  <div className="font-bold text-stone-900">Discreet Cash on Delivery</div>
                  <p className="text-[11px] text-stone-600">
                    Pay the courier in a sealed confidential envelope at time of handover.
                  </p>
                </div>
              )}

              {/* Order Summary Mini Box */}
              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                <div className="flex justify-between font-bold text-stone-900 text-xs">
                  <span>Total Amount Authorized</span>
                  <span className="text-[#850b20] font-serif-luxury text-base font-bold">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && completedOrder && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-[#fbf5e6] text-[#850b20] border-2 border-[#d4af37] rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <Sparkles className="w-8 h-8 text-[#d4af37]" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#850b20]">
                  Order Placed Successfully
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-stone-900">
                  Thank You, {completedOrder.shippingDetails.fullName.split(' ')[0]}!
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Your luxury lingerie pieces are being master-inspected and discreetly packed in our sterile atelier.
                </p>
              </div>

              {/* Order Metadata Box */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs text-left space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <div>
                    <div className="text-[10px] text-stone-400 font-semibold uppercase">Order Number</div>
                    <div className="font-serif-luxury font-bold text-stone-900 text-sm">
                      {completedOrder.orderNumber}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-stone-400 font-semibold uppercase">Tracking ID</div>
                    <div className="font-mono font-bold text-[#850b20] flex items-center gap-1">
                      <span>{completedOrder.trackingNumber}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(completedOrder.trackingNumber);
                          setCopiedTracking(true);
                          setTimeout(() => setCopiedTracking(false), 2000);
                        }}
                        className="text-stone-400 hover:text-stone-700"
                        title="Copy tracking"
                      >
                        {copiedTracking ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-stone-600 text-[11px]">
                  <div><strong>Discreet Shipping To:</strong> {completedOrder.shippingDetails.address}, {completedOrder.shippingDetails.city}</div>
                  <div><strong>Packaging:</strong> {completedOrder.packagingOption.name}</div>
                  <div><strong>Estimated Delivery:</strong> {completedOrder.estimatedDelivery}</div>
                  <div><strong>Total Paid:</strong> <span className="text-[#850b20] font-bold">{formatCurrency(completedOrder.total)}</span></div>
                </div>
              </div>

              {/* Confidentiality Certificate Badge */}
              <div className="p-3 bg-[#faf4ef] rounded-xl border border-[#d4af37]/40 flex items-center justify-center gap-2 text-xs text-[#850b20] font-medium">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                <span>Confidentiality Seal Applied: Zero brand labels on parcel exterior.</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-[#f2e7de] border-t border-[#e2d5ca] flex items-center justify-between shrink-0">
          {step < 4 ? (
            <>
              {step > 1 ? (
                <button
                  onClick={() => setStep((step - 1) as any)}
                  className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-stone-500 hover:text-stone-800"
                >
                  Return to Bag
                </button>
              )}

              {step < 3 ? (
                <button
                  onClick={() => setStep((step + 1) as any)}
                  className="px-6 py-2.5 bg-[#850b20] hover:bg-[#680516] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 border border-[#d4af37]/60 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="px-6 py-3 bg-gradient-to-r from-[#850b20] to-[#aa1531] hover:from-[#6b0618] text-white text-xs font-bold rounded-xl shadow-lg border border-[#d4af37] flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Securing Discreet Order...</span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Authorize Payment • {formatCurrency(total)}</span>
                    </>
                  )}
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex items-center justify-between gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-white text-stone-700 border border-stone-300 rounded-xl text-xs font-semibold hover:bg-stone-50 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#850b20] text-white text-xs font-bold rounded-xl shadow-md"
              >
                Continue Shopping INNORAᴮᴰ
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
