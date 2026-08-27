import React from 'react';
import { FilterState } from '../types';
import { X, RotateCcw } from 'lucide-react';
import { FiltersSidebar } from './FiltersSidebar';

interface MobileFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  availableLaceTypes: string[];
  totalResultsCount: number;
}

export const MobileFiltersModal: React.FC<MobileFiltersModalProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onResetFilters,
  availableLaceTypes,
  totalResultsCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div className="w-full max-w-md bg-[#faf8f7] h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#850b20] text-white flex items-center justify-between border-b border-[#d4af37]/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
            <h3 className="font-serif-luxury font-bold text-base tracking-wide">Filters & Fit Specs</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filters Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <FiltersSidebar
            filters={filters}
            onFilterChange={onFilterChange}
            onResetFilters={onResetFilters}
            availableLaceTypes={availableLaceTypes}
          />
        </div>

        {/* Bottom CTA */}
        <div className="p-4 bg-white border-t border-[#e8ded5] flex items-center gap-3">
          <button
            onClick={onResetFilters}
            className="p-3 border border-stone-300 rounded-xl text-stone-700 hover:bg-stone-50"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3.5 bg-[#850b20] hover:bg-[#6a0717] text-white font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
          >
            <span>View {totalResultsCount} Curated Styles</span>
          </button>
        </div>
      </div>
    </div>
  );
};
