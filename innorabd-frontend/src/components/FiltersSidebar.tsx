import React from 'react';
import { FilterState } from '../types';
import { RotateCcw, Sparkles } from 'lucide-react';

interface FiltersSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  availableLaceTypes: string[];
}

export const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  availableLaceTypes,
}) => {
  const bandSizes = [30, 32, 34, 36, 38, 40, 42];
  const cupSizes = ['A', 'B', 'C', 'D', 'DD/E', 'F'];
  const paddingTypes = ['Non-Padded', 'Lightly Padded', 'Push-Up Level 1', 'Push-Up Level 2', 'Memory Foam'];

  const hasActiveFilters =
    filters.bandSize !== null ||
    filters.cupSize !== null ||
    filters.laceType !== '' ||
    filters.wired !== null ||
    filters.padding !== null ||
    filters.minPrice > 0 ||
    filters.maxPrice < 200;

  return (
    <div className="bg-[#faf8f7] p-5 rounded-2xl border border-[#e6dad1] shadow-xs space-y-6 text-xs text-stone-800">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#e9dfd7]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#850b20]"></span>
          <h3 className="font-serif-luxury text-base font-bold text-[#850b20]">Refine Catalog</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-[11px] text-[#850b20] hover:text-[#5e0716] font-semibold underline underline-offset-2 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset All
          </button>
        )}
      </div>

      {/* Cup Size Selector */}
      <div className="space-y-2">
        <label className="font-bold text-stone-900 flex items-center justify-between text-xs">
          <span>Cup Size</span>
          {filters.cupSize && (
            <span className="text-[#850b20] font-semibold text-[11px]">Selected: {filters.cupSize}</span>
          )}
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {cupSizes.map((cup) => {
            const isSelected = filters.cupSize === cup;
            return (
              <button
                key={cup}
                onClick={() => onFilterChange({ cupSize: isSelected ? null : cup })}
                className={`py-1.5 px-2 rounded-lg font-medium text-center border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#850b20] text-white border-[#d4af37] shadow-xs font-bold'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-[#850b20]'
                }`}
              >
                Cup {cup}
              </button>
            );
          })}
        </div>
      </div>

      {/* Band Size Selector */}
      <div className="space-y-2">
        <label className="font-bold text-stone-900 flex items-center justify-between text-xs">
          <span>Band Size (Underbust)</span>
          {filters.bandSize && (
            <span className="text-[#850b20] font-semibold text-[11px]">Selected: {filters.bandSize}</span>
          )}
        </label>
        <div className="flex flex-wrap gap-1.5">
          {bandSizes.map((band) => {
            const isSelected = filters.bandSize === band;
            return (
              <button
                key={band}
                onClick={() => onFilterChange({ bandSize: isSelected ? null : band })}
                className={`py-1.5 px-3 rounded-lg font-medium border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#850b20] text-white border-[#d4af37] shadow-xs font-bold'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-[#850b20]'
                }`}
              >
                {band}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lace & Fabric Filter */}
      <div className="space-y-2">
        <label className="font-bold text-stone-900 flex items-center gap-1.5 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Lace & Fabric Type</span>
        </label>
        <select
          value={filters.laceType}
          onChange={(e) => onFilterChange({ laceType: e.target.value })}
          className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#850b20] text-stone-800"
        >
          <option value="">All Lace & Fabric Types</option>
          {availableLaceTypes.map((lace) => (
            <option key={lace} value={lace}>
              {lace}
            </option>
          ))}
        </select>
      </div>

      {/* Wired / Wireless Support */}
      <div className="space-y-2">
        <label className="font-bold text-stone-900 text-xs">Support Construction</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onFilterChange({ wired: filters.wired === true ? null : true })}
            className={`py-2 px-3 rounded-lg text-center border font-medium transition-all cursor-pointer ${
              filters.wired === true
                ? 'bg-[#850b20] text-white border-[#d4af37]'
                : 'bg-white text-stone-700 border-stone-200 hover:border-[#850b20]'
            }`}
          >
            Underwire Lift
          </button>
          <button
            onClick={() => onFilterChange({ wired: filters.wired === false ? null : false })}
            className={`py-2 px-3 rounded-lg text-center border font-medium transition-all cursor-pointer ${
              filters.wired === false
                ? 'bg-[#850b20] text-white border-[#d4af37]'
                : 'bg-white text-stone-700 border-stone-200 hover:border-[#850b20]'
            }`}
          >
            Wireless Comfort
          </button>
        </div>
      </div>

      {/* Padding Level */}
      <div className="space-y-2">
        <label className="font-bold text-stone-900 text-xs">Padding Profile</label>
        <div className="space-y-1.5">
          {paddingTypes.map((pad) => {
            const isSelected = filters.padding === pad;
            return (
              <button
                key={pad}
                onClick={() => onFilterChange({ padding: isSelected ? null : pad })}
                className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center justify-between border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#f7ede7] text-[#850b20] border-[#850b20] font-semibold'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-[#faf4ef]'
                }`}
              >
                <span>{pad}</span>
                {isSelected && <span className="text-[#850b20] font-bold">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Slider */}
      <div className="space-y-2 pt-2 border-t border-[#e9dfd7]">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-stone-900">Max Budget</span>
          <span className="text-[#850b20] font-bold font-mono">${filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min="20"
          max="150"
          step="5"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-[#850b20] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-stone-400 font-mono">
          <span>$20</span>
          <span>$150+</span>
        </div>
      </div>
    </div>
  );
};
