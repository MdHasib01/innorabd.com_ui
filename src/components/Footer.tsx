import React, { useState } from 'react';
import { CategoryType } from '../types';
import { Sparkles, ShieldCheck, Heart, Ruler, Mail, Check, ArrowRight } from 'lucide-react';
import innoraLogo from '../../assets/innora-logo.png';

interface FooterProps {
  onSelectCategory: (cat: CategoryType) => void;
  onOpenSizeCalculator: () => void;
  onOpenFitStylist: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenSizeCalculator,
  onOpenFitStylist,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#140205] text-[#f7ece2] border-t-2 border-[#d4af37]/40">
      {/* VIP Atelier Newsletter Banner */}
      <div className="bg-gradient-to-r from-[#4d0411] via-[#2d020a] to-[#140205] py-12 px-4 border-b border-[#d4af37]/30">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#850b20] border border-[#d4af37]/60 text-[#fbf5e6] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>The INNORAᴮᴰ Private Circle</span>
          </div>

          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            Receive 15% Off Your Debut Order + Private Haute Invitations
          </h3>

          <p className="text-xs sm:text-sm text-[#e4d2c2] max-w-md mx-auto font-light">
            Enjoy priority access to limited French Chantilly lace drops, bespoke size consultations, and private seasonal sales.
          </p>

          {subscribed ? (
            <div className="p-4 bg-[#850b20]/90 border border-[#d4af37] rounded-2xl max-w-md mx-auto text-xs text-white flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-[#d4af37]" />
              <span>Welcome to the circle! Use promo code <strong>GOLDEN20</strong> at checkout.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your confidential email..."
                className="flex-1 bg-white/10 border border-[#d4af37]/40 rounded-xl px-4 py-3 text-xs text-white placeholder:text-stone-400 focus:outline-none focus:border-[#d4af37] backdrop-blur-xs"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#850b20] hover:bg-[#a81430] text-white text-xs font-bold rounded-xl border border-[#d4af37] shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Join Atelier</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              className="flex items-center gap-3 cursor-pointer group select-none"
              onClick={() => onSelectCategory('All')}
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#d4af37]/60 shadow-lg bg-[#30000c] flex-shrink-0 group-hover:scale-105 transition-transform">
                <img src={innoraLogo} alt="INNORA Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-start">
                  <span className="font-serif-luxury text-3xl font-bold tracking-tight text-white group-hover:text-[#f3e5ab] transition-colors leading-none">
                    INNORA
                  </span>
                  <sup className="text-[10px] font-bold text-[#d4af37] ml-0.5 tracking-wider uppercase font-sans -top-1.5 select-none">
                    BD
                  </sup>
                </div>
                <span className="text-[9.5px] tracking-[0.26em] uppercase text-[#d4af37] font-semibold mt-1">
                  Haute Lingerie Atelier
                </span>
              </div>
            </div>
            <p className="text-xs text-[#d8c2b0] leading-relaxed max-w-sm font-light">
              INNORAᴮᴰ redefines luxury women&apos;s innerwear with exquisite French Chantilly lace, 24K dipped gold accents, anatomical 18-point sister-sizing, and guaranteed 100% confidential delivery.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#d4af37]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                Discreet Packaging Guaranteed
              </span>
            </div>
          </div>

          {/* Haute Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Haute Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#cfbcad]">
              <li>
                <button
                  onClick={() => onSelectCategory('Luxury Lace')}
                  className="hover:text-white transition-colors"
                >
                  French Chantilly Lace
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Bridal & Red-Gold')}
                  className="hover:text-white transition-colors"
                >
                  Bridal Red & Gold Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Push-Up & Balconette')}
                  className="hover:text-white transition-colors"
                >
                  Sculpt Balconettes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Wireless & Bralette')}
                  className="hover:text-white transition-colors"
                >
                  Wireless Cloud Bralettes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Silk Sleepwear')}
                  className="hover:text-white transition-colors"
                >
                  Mulberry Silk Kimonos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Matching Panties')}
                  className="hover:text-white transition-colors"
                >
                  Matching Thongs & Briefs
                </button>
              </li>
            </ul>
          </div>

          {/* Fit Atelier Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Precision Fit Atelier
            </h4>
            <ul className="space-y-2 text-xs text-[#cfbcad]">
              <li>
                <button
                  onClick={onOpenSizeCalculator}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <Ruler className="w-3 h-3 text-[#d4af37]" />
                  <span>Bra Size Calculator</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFitStylist}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#d4af37]" />
                  <span>AI Fit Stylist Quiz</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSizeCalculator}
                  className="hover:text-white transition-colors"
                >
                  Sister-Size Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSizeCalculator}
                  className="hover:text-white transition-colors"
                >
                  Underwire Comfort Solutions
                </button>
              </li>
              <li>
                <span className="text-stone-400">30-Day Free Fit Guarantee</span>
              </li>
            </ul>
          </div>

          {/* Confidentiality & Service */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Confidentiality & Care
            </h4>
            <ul className="space-y-2 text-xs text-[#cfbcad]">
              <li className="flex items-center gap-1 text-emerald-400">
                <Check className="w-3 h-3" />
                <span>Zero-Brand Shipping Box</span>
              </li>
              <li className="flex items-center gap-1 text-emerald-400">
                <Check className="w-3 h-3" />
                <span>Neutral Bank Billing</span>
              </li>
              <li>
                <span className="text-stone-400">Lingerie Washing & Care</span>
              </li>
              <li>
                <span className="text-stone-400">Complimentary Returns</span>
              </li>
              <li>
                <span className="text-stone-400">24/7 Fit Concierge</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Payment Methods */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div>
            © {new Date().getFullYear()} INNORAᴮᴰ Haute Innerwear & Co. All rights reserved.
          </div>
          <div className="flex items-center gap-3 text-stone-300">
            <span>Visa</span>
            <span>•</span>
            <span>Mastercard</span>
            <span>•</span>
            <span>American Express</span>
            <span>•</span>
            <span>Apple Pay</span>
            <span>•</span>
            <span>Klarna</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
