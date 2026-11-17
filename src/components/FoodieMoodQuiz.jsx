import React, { useState } from 'react';
import { X, Sparkles, Flame, Check, Plus, ArrowRight, Heart } from 'lucide-react';
import { menuItems } from '../data/menuData';

export default function FoodieMoodQuiz({ isOpen, onClose, onAddCombo }) {
  const [selectedMood, setSelectedMood] = useState('creamy');

  if (!isOpen) return null;

  const moods = [
    {
      id: 'creamy',
      title: 'Creamy, Mild & Butter Dripping',
      tagline: 'Cashew cream, mild spices & Amul butter galore',
      emoji: '🧈',
      itemIds: ['chap-malai', 'momos-malai-afghani', 'bread-rumali-pack-3']
    },
    {
      id: 'teekha',
      title: 'Fiery Delhi Teekha & Tangy',
      tagline: 'Charcoal grilled spicy kick that hits right',
      emoji: '🌶️',
      itemIds: ['chap-tandoori-masala', 'chap-achari', 'bread-rumali-single']
    },
    {
      id: 'crunchy',
      title: 'Extreme Crunchy Street Crunch',
      tagline: 'Addictive loud crunch for evening chai / cold drinks',
      emoji: '🥟',
      itemIds: ['momos-kurkure', 'momos-tandoori', 'drink-masala-chaach']
    },
    {
      id: 'punjabi-meal',
      title: 'Amritsari Heavy Feast (Pet Bhar Ke)',
      tagline: 'Authentic nutri kulcha, biryani and buttery gravy',
      emoji: '🫓',
      itemIds: ['nutri-amritsari', 'biryani-soya-dum', 'bread-rumali-pack-3']
    }
  ];

  const currentMoodData = moods.find(m => m.id === selectedMood);
  const recommendedItems = menuItems.filter(item => currentMoodData?.itemIds.includes(item.id));
  const comboPrice = recommendedItems.reduce((sum, item) => sum + item.price, 0);

  const handleAddAll = () => {
    onAddCombo(recommendedItems);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-900 border border-orange-500/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">
          <Sparkles className="w-4 h-4" />
          <span>GUNJAN SNACKS FOODIE MATCHER</span>
        </div>
        <h3 className="text-2xl font-black text-white">What are you craving tonight?</h3>
        <p className="text-xs text-zinc-400 mb-5">
          Pick your mood and we will curate the ultimate Gunjan Snacks feast for you!
        </p>

        {/* Mood Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
          {moods.map((mood) => {
            const isSelected = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`p-3.5 rounded-2xl text-left border transition cursor-pointer flex items-start gap-3 ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-950/80 to-amber-950/80 border-orange-500 shadow-md shadow-orange-950/50'
                    : 'bg-zinc-800/60 border-zinc-700/60 hover:bg-zinc-800 text-zinc-300'
                }`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <div>
                  <div className={`font-black text-xs sm:text-sm ${isSelected ? 'text-amber-400' : 'text-white'}`}>
                    {mood.title}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">{mood.tagline}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Curated Recommendations for this mood */}
        <div className="bg-zinc-950/80 border border-zinc-800 rounded-2xl p-4 mb-6">
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>RECOMMENDED PLATTER:</span>
            <span className="text-emerald-400 font-bold">100% Pure Veg</span>
          </div>

          <div className="space-y-2.5">
            {recommendedItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-zinc-900 p-2.5 rounded-xl border border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-white">{item.name}</h5>
                    <p className="text-[11px] text-zinc-400">{item.spiceLevel} • {item.subCategory}</p>
                  </div>
                </div>
                <div className="font-black text-amber-400 text-sm">
                  ₹{item.price}
                </div>
              </div>
            ))}
          </div>

          {/* Combo Total and 5% discount notice if applicable */}
          <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
            <span className="text-zinc-400">Total Platter Cost:</span>
            <div className="text-right">
              <span className="font-black text-base text-white">₹{comboPrice}</span>
              {recommendedItems.filter(i => i.price > 100).length >= 3 && (
                <div className="text-[10px] text-emerald-400 font-bold">
                  ★ Unlocks 5% OFF in Bag!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleAddAll}
          className="w-full bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-extrabold py-3.5 rounded-xl text-sm shadow-xl shadow-orange-950/80 flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-98"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Entire {currentMoodData?.emoji} Combo to Bag</span>
        </button>
      </div>
    </div>
  );
}
