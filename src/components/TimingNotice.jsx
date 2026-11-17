import React, { useState, useEffect } from 'react';
import { Clock, MapPin, AlertCircle, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { isShopOpen } from '../data/branchesData';

export default function TimingNotice({ selectedBranch, onOpenBranchModal }) {
  const [openNow, setOpenNow] = useState(isShopOpen());
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const totalNowMins = currentHours * 60 + currentMinutes;

      const openMins = 17 * 60; // 5:00 PM (1020 mins)
      const closeMins = 23 * 60 + 30; // 11:30 PM (1410 mins)

      const isOpen = totalNowMins >= openMins && totalNowMins <= closeMins;
      setOpenNow(isOpen);

      if (isOpen) {
        const diff = closeMins - totalNowMins;
        const hrs = Math.floor(diff / 60);
        const mins = diff % 60;
        setTimeRemaining(`Closing in ${hrs}h ${mins}m`);
      } else {
        if (totalNowMins < openMins) {
          const diff = openMins - totalNowMins;
          const hrs = Math.floor(diff / 60);
          const mins = diff % 60;
          setTimeRemaining(`Tandoors fire up in ${hrs}h ${mins}m`);
        } else {
          setTimeRemaining('Re-opens tomorrow at 5:00 PM');
        }
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-zinc-900 border-y border-zinc-800 py-3 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white">Daily Operational Hours:</span>
              <span className="text-amber-400 font-bold">5:00 PM to 11:30 PM</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                openNow ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {openNow ? 'Open Now' : 'Pre-Orders Active'}
              </span>
            </div>
            <div className="text-zinc-400 text-xs">
              {timeRemaining} • Orders booked now will be freshly prepared in 15-20 mins for your pickup!
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="text-right">
            <div className="text-xs text-zinc-400">Pickup Counter:</div>
            <div className="text-xs font-bold text-orange-400">{selectedBranch.shortName}</div>
          </div>
          <button
            onClick={onOpenBranchModal}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer"
          >
            Switch Shop Location
          </button>
        </div>
      </div>
    </div>
  );
}
