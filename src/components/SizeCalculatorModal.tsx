import React, { useState } from 'react';
import { calculateBraSize } from '../utils/calculator';
import { SizeRecommendation } from '../types';
import { BRA_FIT_TROUBLESHOOTING } from '../data/products';
import { 
  Ruler, 
  Sparkles, 
  X, 
  HelpCircle, 
  CheckCircle2, 
  RotateCcw, 
  ArrowRight,
  ShieldCheck,
  Info
} from 'lucide-react';

interface SizeCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySizeFilter: (bandSize: number, cupSize: string) => void;
}

export const SizeCalculatorModal: React.FC<SizeCalculatorModalProps> = ({
  isOpen,
  onClose,
  onApplySizeFilter,
}) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [underbust, setUnderbust] = useState<number>(31);
  const [bust, setBust] = useState<number>(35);
  const [calculatedResult, setCalculatedResult] = useState<SizeRecommendation | null>(() => 
    calculateBraSize(31, 35)
  );
  const [activeTab, setActiveTab] = useState<'calculator' | 'troubleshooting' | 'sister-sizes'>('calculator');

  if (!isOpen) return null;

  const handleCalculate = () => {
    const underInches = unit === 'cm' ? underbust / 2.54 : underbust;
    const bustInches = unit === 'cm' ? bust / 2.54 : bust;
    const result = calculateBraSize(underInches, bustInches);
    setCalculatedResult(result);
  };

  const handleApply = () => {
    if (calculatedResult) {
      onApplySizeFilter(calculatedResult.bandSize, calculatedResult.cupSize);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#faf8f7] rounded-3xl shadow-2xl border-2 border-[#d4af37]/40 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#850b20] via-[#9e132d] to-[#6a0516] text-[#fbf5e6] p-6 border-b border-[#d4af37]/40 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-full bg-[#d4af37] text-stone-950">
              <Ruler className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-bold tracking-widest text-[#f3e5ab]">
              innorabd Precision Fit Atelier
            </span>
          </div>

          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
            Personalized Bra Size & Sister-Size Finder
          </h2>
          <p className="text-xs text-[#eedecf] mt-1">
            80% of women wear the incorrect bra size. Find your true anatomical fit in 30 seconds.
          </p>

          {/* Tab Switcher */}
          <div className="flex gap-2 mt-4 pt-3 border-t border-white/15">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'calculator'
                  ? 'bg-[#d4af37] text-stone-950 shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Interactive Calculator
            </button>
            <button
              onClick={() => setActiveTab('sister-sizes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'sister-sizes'
                  ? 'bg-[#d4af37] text-stone-950 shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Sister Size Secrets
            </button>
            <button
              onClick={() => setActiveTab('troubleshooting')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'troubleshooting'
                  ? 'bg-[#d4af37] text-stone-950 shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Fit Troubleshooting FAQ
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {activeTab === 'calculator' && (
            <div className="space-y-6">
              {/* Unit Toggle */}
              <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-stone-200">
                <span className="text-xs font-semibold text-stone-700">Measurement Units:</span>
                <div className="flex bg-stone-100 p-1 rounded-xl">
                  <button
                    onClick={() => {
                      if (unit === 'cm') {
                        setUnit('inches');
                        setUnderbust(Math.round(underbust / 2.54));
                        setBust(Math.round(bust / 2.54));
                      }
                    }}
                    className={`px-3 py-1 text-xs rounded-lg font-bold transition-all ${
                      unit === 'inches' ? 'bg-[#850b20] text-white shadow-xs' : 'text-stone-600'
                    }`}
                  >
                    Inches (in)
                  </button>
                  <button
                    onClick={() => {
                      if (unit === 'inches') {
                        setUnit('cm');
                        setUnderbust(Math.round(underbust * 2.54));
                        setBust(Math.round(bust * 2.54));
                      }
                    }}
                    className={`px-3 py-1 text-xs rounded-lg font-bold transition-all ${
                      unit === 'cm' ? 'bg-[#850b20] text-white shadow-xs' : 'text-stone-600'
                    }`}
                  >
                    Centimeters (cm)
                  </button>
                </div>
              </div>

              {/* Step 1: Underbust (Band) */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-[#850b20] uppercase tracking-wider">
                      Step 1: Ribcage (Underbust)
                    </div>
                    <div className="text-xs text-stone-600">
                      Measure directly under your bust where the bra band sits. Snug & level.
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-serif-luxury text-xl font-bold text-[#850b20]">
                      {underbust} {unit === 'inches' ? 'in' : 'cm'}
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min={unit === 'inches' ? 26 : 65}
                  max={unit === 'inches' ? 44 : 115}
                  step={unit === 'inches' ? 0.5 : 1}
                  value={underbust}
                  onChange={(e) => {
                    setUnderbust(Number(e.target.value));
                    const underIn = unit === 'cm' ? Number(e.target.value) / 2.54 : Number(e.target.value);
                    const bustIn = unit === 'cm' ? bust / 2.54 : bust;
                    setCalculatedResult(calculateBraSize(underIn, bustIn));
                  }}
                  className="w-full accent-[#850b20] cursor-pointer"
                />
              </div>

              {/* Step 2: Full Bust */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-[#850b20] uppercase tracking-wider">
                      Step 2: Full Bust Circumference
                    </div>
                    <div className="text-xs text-stone-600">
                      Measure around the fullest part of your breasts while breathing naturally.
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-serif-luxury text-xl font-bold text-[#850b20]">
                      {bust} {unit === 'inches' ? 'in' : 'cm'}
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min={unit === 'inches' ? 28 : 70}
                  max={unit === 'inches' ? 52 : 135}
                  step={unit === 'inches' ? 0.5 : 1}
                  value={bust}
                  onChange={(e) => {
                    setBust(Number(e.target.value));
                    const underIn = unit === 'cm' ? underbust / 2.54 : underbust;
                    const bustIn = unit === 'cm' ? Number(e.target.value) / 2.54 : Number(e.target.value);
                    setCalculatedResult(calculateBraSize(underIn, bustIn));
                  }}
                  className="w-full accent-[#850b20] cursor-pointer"
                />
              </div>

              {/* Calculated Results Showcase Card */}
              {calculatedResult && (
                <div className="bg-gradient-to-br from-[#fbf4ee] to-[#f4e6d8] p-5 rounded-2xl border-2 border-[#d4af37] shadow-md space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#d4af37]/30 pb-3">
                    <div>
                      <span className="text-[11px] uppercase tracking-widest font-bold text-[#850b20]">
                        Your Mastercraft Recommendation
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif-luxury text-4xl font-extrabold text-[#850b20]">
                          {calculatedResult.bandSize}{calculatedResult.cupSize}
                        </span>
                        <span className="text-xs font-semibold text-stone-600">
                          (Band: {calculatedResult.bandSize} | Cup: {calculatedResult.cupSize})
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleApply}
                      className="px-5 py-2.5 bg-[#850b20] hover:bg-[#680516] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 border border-[#d4af37]/60 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Filter Store by {calculatedResult.bandSize}{calculatedResult.cupSize}</span>
                    </button>
                  </div>

                  {/* Sister Sizes Matrix */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/80 p-3 rounded-xl border border-stone-200">
                      <div className="text-[10px] font-bold uppercase text-stone-500">
                        Firm Sister Size (Snug Band)
                      </div>
                      <div className="text-base font-bold text-stone-900 font-serif-luxury mt-0.5">
                        {calculatedResult.sisterSizeTight}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Best for backless or low-support evening dresses.
                      </div>
                    </div>

                    <div className="bg-white/80 p-3 rounded-xl border border-stone-200">
                      <div className="text-[10px] font-bold uppercase text-stone-500">
                        Relaxed Sister Size (Loose Band)
                      </div>
                      <div className="text-base font-bold text-stone-900 font-serif-luxury mt-0.5">
                        {calculatedResult.sisterSizeLoose}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Best for lounge, sleepwear, or post-surgery comfort.
                      </div>
                    </div>
                  </div>

                  {/* Fit Tips */}
                  <div className="space-y-1.5 text-xs text-stone-700 bg-white/60 p-3.5 rounded-xl border border-[#d4af37]/30">
                    <div className="font-bold text-[#850b20] flex items-center gap-1.5 text-[11px] uppercase">
                      <Info className="w-3.5 h-3.5 text-[#d4af37]" />
                      Fitter&apos;s Tailoring Notes
                    </div>
                    {calculatedResult.fitTips.map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-stone-600">
                        <CheckCircle2 className="w-3 h-3 text-[#850b20] mt-0.5 shrink-0" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'sister-sizes' && (
            <div className="space-y-4 text-xs text-stone-700">
              <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2">
                <h4 className="font-serif-luxury text-base font-bold text-[#850b20]">
                  What is a &quot;Sister Size&quot;?
                </h4>
                <p className="leading-relaxed">
                  Sister sizes share the <strong>exact same cup volume</strong> while differing in the band width. For example, a <strong>32D, 34C, and 36B</strong> hold identical volumes of breast tissue inside their cups.
                </p>
                <div className="p-3 bg-[#faf4ef] rounded-xl border border-[#d4af37]/40 font-mono text-[11px] text-[#850b20]">
                  Rule of Thumb: One Band Size UP = One Cup Letter DOWN (e.g. 34C → 36B)
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2">
                <h4 className="font-semibold text-stone-900">When to use Sister Sizing at innorabd:</h4>
                <ul className="space-y-2 list-disc pl-4 text-stone-600">
                  <li><strong>Your size is out of stock:</strong> Order your sister size with confidence; cup coverage remains identical!</li>
                  <li><strong>During new bra break-in:</strong> Premium French lace and elastane soften by 5-10% over the first 4 washes.</li>
                  <li><strong>Underwire sensitivity:</strong> Sizing up to a loose sister size distributes wire pressure over a wider ribcage diameter.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'troubleshooting' && (
            <div className="space-y-3">
              {BRA_FIT_TROUBLESHOOTING.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-stone-200 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-[#850b20] text-xs">
                    <HelpCircle className="w-4 h-4 text-[#d4af37]" />
                    <span>{item.issue}</span>
                  </div>
                  <div className="text-[11px] text-stone-500">
                    <strong>Cause:</strong> {item.cause}
                  </div>
                  <div className="text-[11px] text-stone-700 bg-[#f9f3ee] p-2.5 rounded-lg border border-[#e8dcd2]">
                    <strong>innorabd Solution:</strong> {item.solution}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f2e7de] border-t border-[#e2d5ca] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-stone-600">
            <ShieldCheck className="w-4 h-4 text-[#850b20]" />
            <span>30-Day Free Exchange if fit is not 100% perfect.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white rounded-xl font-semibold hover:bg-black"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
