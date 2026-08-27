import React, { useState } from 'react';
import { Sparkles, Shield, Feather, Award, Heart, CheckCircle2 } from 'lucide-react';

export const LaceCraftsmanshipSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      title: 'French Chantilly & Guipure',
      subtitle: 'Heritage European Looms',
      badge: 'Artisanal Lace',
      description:
        'Each intricate floral motif is woven with ultra-fine gossamer threads. Unlike mass-produced synthetic lace that scratches sensitive skin, innorabd lace achieves buttery softness and fluid drape.',
      points: [
        'Scalloped eyelash neckline edges that lay flat against the décolletage',
        'Multi-directional elasticity accommodating dynamic cup movement',
        'Tested for 100+ wash cycles without fraying or thread snagging',
      ],
      image:
        'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: '24K Dipped Gold Hardware',
      subtitle: 'Tarnish-Resistant & Nickel-Free',
      badge: 'Gold Accent',
      description:
        'Every strap slider, hoop ring, and center logo charm is double-electroplated in real 24K gold alloy. 100% hypoallergenic and salt/sweat resistant to protect delicate feminine skin.',
      points: [
        'Zero pinching micro-sliders for continuous millimeter-level strap calibration',
        'Custom engraved innorabd seal on back closures and bridge pendants',
        'Nickel-free and dermatologist certified for zero irritation',
      ],
      image:
        'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'Silk-Velvet Encased Wires',
      subtitle: 'Zero-Pressure Ergonomics',
      badge: 'All-Day Comfort',
      description:
        'Our proprietary underwire casing wraps flexible German memory steel in three protective layers: plush microfiber, breathable sponge, and a direct-to-skin mulberry silk velvet cradle.',
      points: [
        'Eliminates the "rush home to take off your bra" phenomenon',
        'Distributes uplifting force equally across the sub-mammary fold',
        'Reinforced rounded tips prevent wire poke-through permanently',
      ],
      image:
        'https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'Grade 6A Mulberry Silk',
      subtitle: '22-Momme Dermatological Luxe',
      badge: 'Natural Luxury',
      description:
        'Sourced from certified organic silkworms, our pure silk sleepwear and linings contain 18 amino acids that nourish skin hydration and prevent friction wrinkles overnight.',
      points: [
        'OEKO-TEX Standard 100 non-toxic, eco-conscious botanical dyes',
        'Thermo-regulating weave keeps you cool in summer and cozy in winter',
        'Naturally antimicrobial and resistant to dust mites and bacteria',
      ],
      image:
        'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-[#faf8f7] via-[#f5ede5] to-[#faf8f7] border-y border-[#e7ded7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#850b20]/10 border border-[#d4af37]/50 text-[#850b20] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>The innorabd Standard of Craftsmanship</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-stone-900">
            High-Fashion Lace Meets <br className="hidden sm:inline" />
            <span className="text-[#850b20] italic font-serif">Anatomical Perfection.</span>
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
            Behind every innorabd design lies 18 precise points of measurement, heritage French lace weaving, and 24K dipped accents engineered to elevate how you look and feel from within.
          </p>
        </div>

        {/* Interactive Craftsmanship Showcase Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Pillar Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {pillars.map((pillar, idx) => {
              const isActive = activePillar === idx;
              return (
                <div
                  key={pillar.title}
                  onClick={() => setActivePillar(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white border-[#850b20] shadow-md ring-2 ring-[#850b20]/20'
                      : 'bg-white/60 border-stone-200 hover:bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900 font-serif-luxury">
                      {pillar.title}
                    </span>
                    <span
                      className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-[#850b20] text-white'
                          : 'bg-[#f4ebe3] text-[#850b20]'
                      }`}
                    >
                      {pillar.badge}
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">{pillar.subtitle}</div>
                </div>
              );
            })}
          </div>

          {/* Active Pillar Detail Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e5d8cd] shadow-xl space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 aspect-4/5 rounded-2xl overflow-hidden shadow-md border border-[#d4af37]/40 bg-stone-100">
                  <img
                    src={pillars[activePillar].image}
                    alt={pillars[activePillar].title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="sm:col-span-7 space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#850b20]">
                      Mastercraft Spotlight
                    </span>
                    <h3 className="font-serif-luxury text-xl font-bold text-stone-900 mt-0.5">
                      {pillars[activePillar].title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                      {pillars[activePillar].description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    {pillars[activePillar].points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#850b20] mt-0.5 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
