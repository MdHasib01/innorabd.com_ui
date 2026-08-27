import React from 'react';
import { CategoryType } from '../types';
import { Sparkles, Heart, Feather, Eye, Flame, Moon, Layers } from 'lucide-react';

interface CategoryPillsProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  categoryCounts: Record<CategoryType, number>;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const categoryConfig: { name: CategoryType; icon: React.ReactNode; badge?: string }[] = [
    { name: 'All', icon: <Layers className="w-3.5 h-3.5" /> },
    { name: 'Luxury Lace', icon: <Sparkles className="w-3.5 h-3.5" />, badge: 'French' },
    { name: 'Push-Up & Balconette', icon: <Flame className="w-3.5 h-3.5" />, badge: 'Cleavage' },
    { name: 'Everyday & T-Shirt', icon: <Eye className="w-3.5 h-3.5" /> },
    { name: 'Wireless & Bralette', icon: <Feather className="w-3.5 h-3.5" />, badge: 'Soft' },
    { name: 'Bridal & Red-Gold', icon: <Heart className="w-3.5 h-3.5" />, badge: 'Gold Accents' },
    { name: 'Silk Sleepwear', icon: <Moon className="w-3.5 h-3.5" /> },
    { name: 'Matching Panties', icon: <Sparkles className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="w-full bg-[#f6eee7] py-3.5 px-4 border-b border-[#e9ded5]">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categoryConfig.map((cat) => {
          const isActive = activeCategory === cat.name;
          const count = categoryCounts[cat.name] || 0;
          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#850b20] text-white shadow-md shadow-[#850b20]/20 border border-[#d4af37]'
                  : 'bg-white/90 text-stone-700 hover:text-[#850b20] hover:bg-white border border-[#e4d6cb]'
              }`}
            >
              <span className={isActive ? 'text-[#d4af37]' : 'text-[#850b20]'}>{cat.icon}</span>
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-[#d4af37] text-stone-950 font-bold' : 'bg-stone-100 text-stone-600'
                }`}
              >
                {count}
              </span>
              {cat.badge && (
                <span
                  className={`text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-[#5e0716] text-[#f7e8a9]' : 'bg-[#f4dfdb] text-[#850b20]'
                  }`}
                >
                  {cat.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
