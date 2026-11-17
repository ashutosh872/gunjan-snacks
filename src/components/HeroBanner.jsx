import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Sparkles, 
  QrCode, 
  ShoppingBag, 
  Clock, 
  MapPin, 
  Percent, 
  Star, 
  ArrowRight,
  ShieldCheck,
  Check,
  Copy,
  Smartphone,
  Utensils
} from 'lucide-react';
import QRCode from 'qrcode';
import { isShopOpen } from '../data/branchesData';

export default function HeroBanner({ 
  onQuickSearch, 
  selectedBranch, 
  onOpenBranchModal,
  onStartTableOrder,
  selectedTable,
  setSelectedTable
}) {
  const openNow = isShopOpen();
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Compute the mobile scan URL that encodes Wi-Fi LAN IP so physical phones can connect
  const mobileScanUrl = typeof window !== 'undefined'
    ? (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? `http://192.168.1.83:5173/?mode=table_order&branch=${selectedBranch.id}`
        : `${window.location.origin}${window.location.pathname.replace(/\/$/, '')}/?mode=table_order&branch=${selectedBranch.id}`)
    : `http://192.168.1.83:5173/?mode=table_order&branch=${selectedBranch.id}`;

  useEffect(() => {
    QRCode.toDataURL(mobileScanUrl, {
      width: 320,
      margin: 1,
      color: {
        dark: '#09090b',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'H'
    }).then(url => {
      setQrDataUrl(url);
    }).catch(err => {
      console.error('Failed to generate banner QR', err);
    });
  }, [mobileScanUrl]);

  const handleCopyUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(mobileScanUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const searchIdeas = [
    { label: 'Tandoori Malai Chaap', query: 'malai', emoji: '🍢' },
    { label: 'Kurkure Momos', query: 'kurkure', emoji: '🥟' },
    { label: 'Amritsari Nutri Kulche', query: 'nutri', emoji: '🫓' },
    { label: 'Butter Gravy Chaap', query: 'gravy', emoji: '🥘' },
    { label: 'Veg Soya Biryani', query: 'biryani', emoji: '🍚' },
    { label: 'Rumali Roti', query: 'rumali', emoji: '🥖' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-b border-zinc-800 text-white pt-6 pb-12 px-4 sm:px-6">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Timing and Pure Veg Alert Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-zinc-900/90 border border-orange-500/30 p-3 rounded-2xl backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
              openNow ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            }`}>
              <span className={`w-2 h-2 rounded-full ${openNow ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
              {openNow ? 'OPEN NOW (Tandoor Fired Up!)' : 'PRE-ORDERS OPEN (Opens 5:00 PM)'}
            </div>
            <span className="text-xs text-zinc-300 hidden sm:flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              Evening Special: 5:00 PM – 11:30 PM Daily
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenBranchModal}
              className="text-xs text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>{selectedBranch.shortName}</span>
              <span className="text-[10px] text-orange-400 font-bold ml-1">Change Outlet</span>
            </button>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines, Foodie Copy, Offer & Order Action */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold tracking-wide">
              <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
              100% PURE VEG SOYA CHAAP & SIZZLERS • VISIT, SCAN & BOOK
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none text-white">
              Sizzling Clay Tandoor <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Desi Chaap & Momos
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl">
              Visit our outlet, <strong className="text-amber-400 font-semibold">scan the table QR on your mobile</strong>, 
              select your favorite <strong className="text-amber-400 font-semibold">Tandoori Malai Chaap</strong>, 
              crunchy <strong className="text-amber-400 font-semibold">Kurkure Momos</strong>, 
              or authentic <strong className="text-amber-400 font-semibold">Amritsari Nutri Kulche</strong>, 
              and get fresh sizzling food served right to your table!
            </p>

            {/* Special 5% Offer Banner Highlight */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950/80 via-orange-950/70 to-red-950/80 border-2 border-orange-500/50 p-4 shadow-xl shadow-orange-950/40">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-orange-500/20 rounded-full blur-xl"></div>
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0 shadow-lg text-white font-black text-lg">
                  <Percent className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-extrabold tracking-wider bg-orange-500/30 text-orange-300 px-2 py-0.5 rounded">
                      SUPER FOODIE OFFER
                    </span>
                    <span className="text-xs text-amber-200 font-semibold">★ Auto Applied</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Buy Any 3 Items (Each &gt; ₹100) &amp; Get <span className="text-yellow-400 underline decoration-orange-500 decoration-2">FLAT 5% OFF!</span>
                  </h3>
                  <p className="text-xs text-zinc-300">
                    Standard pricing approx ₹120. Pick any 3 chaps, momos, nutri or biryani to unlock instant 5% off!
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Order Action Button */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onStartTableOrder}
                className="bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm shadow-xl shadow-orange-950/80 flex items-center gap-2 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Utensils className="w-4 h-4" />
                <span>Select Food from Menu &amp; Book</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleCopyUrl}
                className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 font-bold px-4 py-3.5 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-orange-400" />}
                <span>{copiedLink ? 'Mobile Link Copied!' : 'Copy Mobile Scan Link'}</span>
              </button>
            </div>

            {/* Foodie Search Ideas */}
            <div className="pt-2">
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Trending Cravings (Click to filter):
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {searchIdeas.map((idea, idx) => (
                  <button
                    key={idx}
                    onClick={() => onQuickSearch(idea.query)}
                    className="bg-zinc-900/90 hover:bg-orange-950/60 border border-zinc-700/60 hover:border-orange-500/50 text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{idea.emoji}</span>
                    <span>{idea.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: In-Built Banner Scanner Standee */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              {/* Standee Container */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-orange-500/60 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 p-5 shadow-2xl shadow-orange-950/70">
                {/* Standee Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center shadow">
                      <QrCode className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-white">GUNJAN SNACKS SCANNER</h4>
                      <p className="text-[10px] text-zinc-400">Scan via mobile camera to order</p>
                    </div>
                  </div>
                  <span className="bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Live QR
                  </span>
                </div>

                {/* QR Code Presentation Box */}
                <div className="bg-white rounded-2xl p-4 shadow-xl flex flex-col items-center justify-center text-center relative group">
                  {qrDataUrl ? (
                    <img 
                      src={qrDataUrl} 
                      alt="Scan to order via mobile at Gunjan Snacks" 
                      className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg shadow-inner"
                    />
                  ) : (
                    <div className="w-48 h-48 flex items-center justify-center text-zinc-400">
                      Generating QR...
                    </div>
                  )}

                  {/* QR Slogan */}
                  <div className="mt-3 text-zinc-950">
                    <div className="text-xs font-black tracking-wide flex items-center justify-center gap-1">
                      <span>VISIT</span>
                      <span>•</span>
                      <span>SCAN</span>
                      <span>•</span>
                      <span>BOOK</span>
                      <span>•</span>
                      <span className="text-orange-600">GET ON TABLE</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 font-medium mt-0.5">
                      Point phone camera to start instant order
                    </div>
                  </div>
                </div>

                {/* Mobile Scan Direct Trigger Button */}
                <div className="mt-4 space-y-2">
                  <button
                    onClick={onStartTableOrder}
                    className="w-full bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition transform active:scale-95 cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Open Mobile Menu (Simulate Scan)</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-zinc-400 px-1 pt-1">
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      100% Shudh Shakahari
                    </span>
                    <span className="text-amber-400 font-bold">
                      Hotline: +91 98765 00000
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}