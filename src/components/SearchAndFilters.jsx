import React from 'react';
import { 
  Search, 
  X, 
  Flame, 
  Soup, 
  Cookie, 
  Sparkles, 
  Wheat, 
  CircleDot, 
  Coffee, 
  UtensilsCrossed,
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { categories } from '../data/menuData';

const iconMap = {
  UtensilsCrossed: UtensilsCrossed,
  Flame: Flame,
  Soup: Soup,
  Cookie: Cookie,
  Sparkles: Sparkles,
  Wheat: Wheat,
  CircleDot: CircleDot,
  Coffee: Coffee,
};

export default function SearchAndFilters({ 
  searchQuery, 
  setSearchQuery, 
  activeCategory, 
  setActiveCategory,
  spiceFilter,
  setSpiceFilter,
  onlyDiscountEligible,
  setOnlyDiscountEligible,
  onOpenMoodQuiz
}) {
  return (
    <div id="menu-section" className="bg-zinc-950 pt-8 pb-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Title and Search Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-500">
              <Flame className="w-4 h-4 animate-bounce" />
              <span>FRESH FROM THE TANDOOR &amp; TAWA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Gunjan Snacks Menu
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Select items, place takeaway order, and pick up fresh from your selected shop!
            </p>
          </div>

          {/* Interactive Search Bar & Mood Quiz */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chaap, momos, nutri, biryani..."
                className="w-full bg-zinc-900 border border-zinc-700/80 focus:border-orange-500 rounded-xl pl-10 pr-9 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              onClick={onOpenMoodQuiz}
              className="bg-gradient-to-r from-amber-600/30 to-orange-600/30 hover:from-amber-600/40 hover:to-orange-600/40 border border-orange-500/50 text-amber-300 font-bold px-3 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition shrink-0 cursor-pointer"
              title="Help me choose what to eat!"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Mood Matcher</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || UtensilsCrossed;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-950/60 scale-105'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-orange-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filter Bar: 5% Discount items quick toggle & Spice level */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-zinc-900">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-zinc-400 font-medium flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
              Quick Filters:
            </span>

            {/* Toggle: Only items > ₹100 for 5% offer */}
            <button
              onClick={() => setOnlyDiscountEligible(!onlyDiscountEligible)}
              className={`text-xs px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                onlyDiscountEligible
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/60'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className={`w-3 h-3 rounded flex items-center justify-center text-[9px] ${onlyDiscountEligible ? 'bg-amber-500 text-black' : 'border border-zinc-500'}`}>
                {onlyDiscountEligible && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
              <span>Offer Eligible (&gt; ₹100 for 5% OFF)</span>
            </button>

            {/* Spice filter pills */}
            <div className="flex items-center gap-1 ml-1">
              {['all', 'mild', 'medium', 'spicy'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSpiceFilter(level)}
                  className={`text-[11px] capitalize px-2 py-0.5 rounded-md transition cursor-pointer ${
                    spiceFilter === level
                      ? 'bg-zinc-800 text-white font-bold border border-zinc-600'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {level === 'all' ? 'All Spices' : level}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-zinc-400 font-medium">
            Standard pricing approx <strong className="text-amber-400">₹120</strong> per item
          </div>
        </div>
      </div>
    </div>
  );
}
