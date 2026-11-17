import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Clock, 
  Search, 
  ChevronDown, 
  Flame, 
  ShieldCheck, 
  PhoneCall, 
  Receipt 
} from 'lucide-react';
import { branches, isShopOpen } from '../data/branchesData';

export default function Navbar({ 
  selectedBranch, 
  setSelectedBranch, 
  cartItems, 
  onOpenCart, 
  onOpenOrdersModal, 
  onOpenBranchModal 
}) {
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const currentlyOpen = isShopOpen();

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-amber-900/30 text-white shadow-xl">
      {/* Top micro-bar: Timings & Pure Veg badge */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-red-700 text-amber-50 text-xs px-3 py-1 font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 bg-black/25 px-2 py-0.5 rounded text-[11px] font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              100% PURE VEG (शुद्ध शाकाहारी)
            </span>
            <span className="hidden sm:inline text-amber-100">|</span>
            <span className="hidden sm:flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-200" />
              Evening Special: 5:00 PM to 11:30 PM Daily
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-1 font-bold text-yellow-200">
              🔥 Deal: Buy 3 items &gt; ₹100 get 5% OFF
            </span>
            <button 
              onClick={onOpenBranchModal}
              className="hover:underline flex items-center gap-1 text-[11px] bg-black/20 px-2 py-0.5 rounded cursor-pointer"
            >
              <MapPin className="w-3 h-3 text-amber-300" />
              2 Outlets in City
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 p-0.5 shadow-lg shadow-orange-950/50 flex items-center justify-center">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center flex-col">
                <Flame className="w-6 h-6 text-orange-500 animate-flame" />
              </div>
            </div>
            {/* Pure veg green mark */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-sm bg-white border border-emerald-600 flex items-center justify-center shadow">
              <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center">
                GUNJAN <span className="text-orange-500 ml-1">SNACKS</span>
              </h1>
              <span className="hidden lg:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Amit Gunjan Da Dhaba
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-400 font-medium">
              Pure Veg Chaap • Soya Momos • Nutri Kulche • Dum Biryani
            </p>
          </div>
        </div>

        {/* Branch Switcher (2 Locations) */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
            className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 px-3 py-1.5 rounded-lg text-xs transition cursor-pointer"
          >
            <div className="text-left">
              <div className="text-[10px] text-zinc-400 uppercase tracking-wider flex items-center gap-1 font-bold">
                <MapPin className="w-3 h-3 text-orange-500" />
                Pickup Location:
              </div>
              <div className="font-semibold text-amber-400 flex items-center gap-1">
                {selectedBranch.shortName}
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </div>
            </div>
          </button>

          {/* Branch Dropdown */}
          {branchDropdownOpen && (
            <div className="absolute left-0 mt-2 w-72 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl z-50 p-2 overflow-hidden">
              <div className="px-3 py-1.5 text-[11px] font-bold text-zinc-400 border-b border-zinc-800 flex justify-between items-center">
                <span>SELECT PICKUP OUTLET</span>
                <span className="text-emerald-400 font-normal">2 Active Shops</span>
              </div>
              {branches.map(b => (
                <button
                  key={b.id}
                  onClick={() => {
                    setSelectedBranch(b);
                    setBranchDropdownOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg my-1 transition flex flex-col cursor-pointer ${
                    selectedBranch.id === b.id 
                      ? 'bg-orange-500/15 border border-orange-500/40 text-white' 
                      : 'hover:bg-zinc-800 text-zinc-300'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center justify-between">
                    <span>{b.shortName}</span>
                    {selectedBranch.id === b.id && (
                      <span className="text-[10px] bg-orange-600 text-white px-1.5 py-0.5 rounded">Active</span>
                    )}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">{b.address}</div>
                  <div className="text-[10px] text-amber-500 mt-1 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> Timings: {b.timings}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons: Track Order & Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Past Orders Tracker Button */}
          <button
            onClick={onOpenOrdersModal}
            className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer"
            title="Track or view active tokens"
          >
            <Receipt className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">Track Token</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm shadow-lg shadow-orange-950/60 transition transform active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            {totalItems > 0 && (
              <span className="bg-white text-orange-600 font-extrabold text-xs px-2 py-0.5 rounded-full shadow animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Branch Bar */}
      <div className="md:hidden bg-zinc-900/90 border-t border-zinc-800 px-4 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-zinc-300">
          <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
          <span className="text-zinc-400">Pickup:</span>
          <span className="font-semibold text-amber-400 truncate max-w-[190px]">{selectedBranch.shortName}</span>
        </div>
        <button 
          onClick={onOpenBranchModal}
          className="text-[11px] text-orange-400 font-bold hover:underline"
        >
          Change
        </button>
      </div>
    </header>
  );
}
