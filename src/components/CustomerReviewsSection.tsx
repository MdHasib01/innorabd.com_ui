import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Heart } from 'lucide-react';

export const CustomerReviewsSection: React.FC = () => {
  const reviews = [
    {
      author: 'Genevieve M. (Paris / New York)',
      title: 'The Crimson Scarlet Balconette is sheer perfection',
      comment:
        'I am extremely particular about lace softness. This bra feels weightless yet offers theatrical, elegant lift. The 24K gold sliders stay firmly in place without slippage.',
      rating: 5,
      size: '34C',
      verified: true,
      timeAgo: '2 days ago',
      product: 'Aurelia Chantilly Balconette',
    },
    {
      author: 'Seraphina L. (London)',
      title: 'Discreet packaging lived up to the promise!',
      comment:
        'Zero logos or lingerie descriptions on the box exterior. When I opened it, the scented tissue paper and keepsake box were magnificent. Truly a luxury unboxing.',
      rating: 5,
      size: '36D',
      verified: true,
      timeAgo: '5 days ago',
      product: 'Sovereign Velvet Scallop Plunge',
    },
    {
      author: 'Isabella K. (Sydney)',
      title: 'The Size Calculator saved me from years of bad fits',
      comment:
        'I was wearing a 36B for years until the innorabd calculator suggested 34D with sister size 36C. The underwire no longer digs into my sides, and the lift is natural!',
      rating: 5,
      size: '34D',
      verified: true,
      timeAgo: '1 week ago',
      product: 'LuxeSecondSkin Smooth T-Shirt Bra',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#faf8f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#e7ded7]">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#850b20]">
              Verified Fit Community
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Loved by Over 15,000 Discerning Women
            </h2>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-6 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <div className="flex text-[#d4af37]">
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i} className="text-sm">★</span>
                ))}
              </div>
              <span className="font-bold text-stone-900">4.9 / 5.0</span>
            </div>
            <div className="h-4 w-px bg-stone-300"></div>
            <div>
              <strong className="text-stone-900">98%</strong> True to Size Match
            </div>
            <div className="h-4 w-px bg-stone-300"></div>
            <div>
              <strong className="text-[#850b20]">100%</strong> Discreet Shipping Guarantee
            </div>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-[#e8ded5] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#d4af37] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#d4af37] text-xs">
                    {'★'.repeat(rev.rating)}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.timeAgo}</span>
                </div>

                <h4 className="font-serif-luxury text-sm font-bold text-stone-900">
                  &ldquo;{rev.title}&rdquo;
                </h4>

                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[11px]">
                <div>
                  <div className="font-bold text-stone-900 flex items-center gap-1">
                    <span>{rev.author}</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  </div>
                  <div className="text-stone-400">{rev.product}</div>
                </div>

                <span className="bg-[#fcf5ed] text-[#850b20] font-bold px-2 py-0.5 rounded-full border border-[#d4af37]/40 text-[10px]">
                  Size {rev.size}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
