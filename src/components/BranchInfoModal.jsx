import React from 'react';
import { X, MapPin, Clock, Phone, Navigation, CheckCircle2, Flame } from 'lucide-react';
import { branches } from '../data/branchesData';

export default function BranchInfoModal({ isOpen, onClose, selectedBranch, onSelectBranch }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-zinc-950 border border-orange-500/50 rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-white relative">
        <div className="sticky top-0 z-10 bg-zinc-900/95 border-b border-zinc-800 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-white">Our 2 Shop Outlets</h3>
              <p className="text-[11px] text-zinc-400">Select where you will pick up your takeaway order</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          <div className="text-xs text-zinc-400 leading-relaxed">
            Gunjan Snacks operates two prime takeaway counters in the city. Both shops feature clay tandoors, pure veg kitchens, and evening service from <strong>5:00 PM to 11:30 PM</strong>.
          </div>

          <div className="space-y-4">
            {branches.map((b) => {
              const isSelected = selectedBranch.id === b.id;
              return (
                <div
                  key={b.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-orange-950/60 to-zinc-900 border-orange-500 shadow-lg shadow-orange-950/40'
                      : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-850'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-sm sm:text-base text-white">{b.name}</h4>
                        {isSelected && (
                          <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Active Pickup Shop
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-orange-400 font-semibold mt-0.5">{b.area}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">
                        Open 5 PM – 11:30 PM
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 mb-2 leading-relaxed">
                    {b.address}
                  </p>

                  <div className="space-y-1 text-xs text-zinc-400 mb-3">
                    <div>Landmark: <span className="text-zinc-200">{b.landmark}</span></div>
                    <div>Call Counter: <a href={`tel:${b.phone}`} className="text-amber-400 font-bold hover:underline">{b.phone}</a></div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
                    <button
                      onClick={() => {
                        onSelectBranch(b);
                        onClose();
                      }}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-orange-600 hover:bg-orange-500 text-white'
                      }`}
                    >
                      {isSelected ? <CheckCircle2 className="w-4 h-4" /> : <Flame className="w-4 h-4" />}
                      <span>{isSelected ? 'Currently Selected' : 'Set as Pickup Shop'}</span>
                    </button>

                    <a
                      href={`https://maps.google.com/?q=${b.mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-2 px-3 rounded-xl text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <Navigation className="w-3.5 h-3.5 text-orange-400" />
                      <span>Directions</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
