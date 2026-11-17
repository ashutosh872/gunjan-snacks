import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  Star, 
  Clock, 
  Flame, 
  Check, 
  Sparkles, 
  Sliders 
} from 'lucide-react';
import { getFoodFallbackImage } from '../utils/imageFallback';

export default function FoodCard({ item, quantityInCart, onAdd, onUpdateQuantity }) {
  const [imgError, setImgError] = useState(false);
  const [selectedSpice, setSelectedSpice] = useState('Medium Desi');
  const [showCustomize, setShowCustomize] = useState(false);

  const isEligibleForOffer = item.price > 100;

  const handleInitialAdd = () => {
    onAdd({
      ...item,
      customization: {
        spicePreference: selectedSpice,
      }
    });
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800/80 hover:border-orange-500/40 rounded-2xl overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-orange-950/30 transition-all duration-300 group">
      <div>
        {/* Card Image Container */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-950">
          <img
            src={imgError ? getFoodFallbackImage(item.name, item.category) : item.image}
            alt={item.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
            loading="lazy"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>

          {/* Top badges: Pure veg indicator & tags */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-1">
            <div className="flex items-center gap-1.5">
              {/* 100% Pure Veg Symbol */}
              <div className="w-5 h-5 rounded-sm bg-white border border-emerald-600 flex items-center justify-center shadow" title="100% Pure Veg (Shudh Shakahari)">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
              </div>

              {item.isBestseller && (
                <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded shadow">
                  ★ Bestseller
                </span>
              )}
            </div>

            {isEligibleForOffer && (
              <span className="bg-zinc-950/90 text-amber-300 border border-amber-500/50 font-bold text-[10px] px-2 py-0.5 rounded-full shadow flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                5% Offer Item
              </span>
            )}
          </div>

          {/* Bottom image overlay: Prep time & rating */}
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-zinc-300">
            <span className="flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded font-medium backdrop-blur-sm">
              <Clock className="w-3 h-3 text-orange-400" />
              {item.prepTime}
            </span>
            <span className="flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded font-bold text-amber-300 backdrop-blur-sm">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {item.rating} ({item.reviewsCount})
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-2">
          {/* Category & Spice tag */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-orange-400 font-semibold tracking-wide text-[11px] uppercase">
              {item.subCategory}
            </span>
            <span className="text-zinc-400 text-[11px] font-medium flex items-center gap-1">
              <Flame className="w-3 h-3 text-red-500" />
              {item.spiceLevel}
            </span>
          </div>

          {/* Item Name */}
          <h3 className="text-base sm:text-lg font-black text-white group-hover:text-orange-400 transition-colors">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Portion/Serving Size info */}
          <div className="text-[11px] text-zinc-500 font-medium">
            {item.serving}
          </div>

          {/* Feature tags */}
          <div className="flex flex-wrap gap-1 pt-1">
            {item.tags?.map((tag, idx) => (
              <span key={idx} className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Price & Add / Quantity Controls */}
      <div className="p-4 pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-3">
        <div>
          <div className="text-xl font-black text-amber-400">
            ₹{item.price}
          </div>
          <div className="text-[10px] text-zinc-500 font-medium">
            {item.price > 100 ? 'Counted for 5% OFF' : 'Standard Rate'}
          </div>
        </div>

        {quantityInCart === 0 ? (
          <button
            onClick={handleInitialAdd}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-orange-950/60 transition transform active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>ADD</span>
          </button>
        ) : (
          <div className="flex items-center bg-zinc-800 border border-orange-500/50 rounded-xl overflow-hidden p-0.5">
            <button
              onClick={() => onUpdateQuantity(item.id, quantityInCart - 1)}
              className="w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-700 rounded-lg transition cursor-pointer"
              title="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-black text-amber-400">
              {quantityInCart}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, quantityInCart + 1)}
              className="w-8 h-8 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-700 rounded-lg transition cursor-pointer"
              title="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
