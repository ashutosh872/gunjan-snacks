import React, { useState, useEffect } from 'react';
import { 
  X, 
  QrCode, 
  Printer, 
  Copy, 
  Check, 
  Smartphone, 
  Flame, 
  Clock, 
  MapPin, 
  Percent, 
  Wifi,
  ExternalLink 
} from 'lucide-react';
import { generateQrDataUrl } from '../utils/qrGenerator';

export default function QRStandeeModal({ isOpen, onClose, selectedBranch }) {
  if (!isOpen) return null;

  // The local Wi-Fi IP so physical phones can reach the dev server!
  const lanIpUrl = 'http://192.168.1.83:5173/';
  const localUrl = typeof window !== 'undefined' ? window.location.href : 'http://127.0.0.1:5173/';
  
  const [selectedUrlType, setSelectedUrlType] = useState('lan'); // 'lan' or 'local'
  const [customUrl, setCustomUrl] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const activeUrl = customUrl.trim() 
    ? customUrl.trim() 
    : (selectedUrlType === 'lan' ? lanIpUrl : localUrl);

  useEffect(() => {
    generateQrDataUrl(activeUrl, {
      width: 320,
      color: {
        dark: '#09090b',
        light: '#ffffff'
      }
    }).then(url => {
      if (url) setQrDataUrl(url);
    });
  }, [activeUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(activeUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrintStandee = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-zinc-950 border border-orange-500/50 rounded-3xl max-w-lg w-full max-h-[94vh] overflow-y-auto shadow-2xl text-white relative">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-zinc-900/95 border-b border-zinc-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
              <QrCode className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-white">Mobile Order QR Standee</h3>
              <p className="text-[11px] text-zinc-400">Scan via phone camera to open menu &amp; order</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Target Scan Destination Selector */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5" />
                <span>QR Destination URL (For Phone Scanning):</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded">
                Wi-Fi Ready
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => { setSelectedUrlType('lan'); setCustomUrl(''); }}
                className={`p-2 rounded-xl border text-left font-semibold transition cursor-pointer ${
                  selectedUrlType === 'lan' && !customUrl
                    ? 'bg-orange-600/20 border-orange-500 text-white'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="font-bold text-amber-300">📱 Mobile Wi-Fi URL</div>
                <div className="text-[10px] text-zinc-400 font-mono truncate">{lanIpUrl}</div>
              </button>

              <button
                type="button"
                onClick={() => { setSelectedUrlType('local'); setCustomUrl(''); }}
                className={`p-2 rounded-xl border text-left font-semibold transition cursor-pointer ${
                  selectedUrlType === 'local' && !customUrl
                    ? 'bg-orange-600/20 border-orange-500 text-white'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="font-bold text-zinc-200">💻 Localhost URL</div>
                <div className="text-[10px] text-zinc-400 font-mono truncate">{localUrl}</div>
              </button>
            </div>

            <p className="text-[11px] text-zinc-400 leading-snug">
              💡 <strong>Tip for scanning from a physical phone:</strong> Keep your mobile phone connected to the same Wi-Fi network and select the <strong>Mobile Wi-Fi URL</strong> above so the phone can reach your computer.
            </p>
          </div>

          {/* Standee Content (Printable design) */}
          <div className="bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 border-2 border-orange-500/60 rounded-3xl p-6 text-center space-y-4 shadow-xl relative overflow-hidden">
            {/* Top Standee Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-emerald-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                100% PURE VEG (शुद्ध शाकाहारी)
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center">
                GUNJAN <span className="text-orange-500 ml-1.5">SNACKS</span>
              </h2>
              <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                Amit Gunjan Da Dhaba • Pure Veg Chaap Hub
              </p>
            </div>

            {/* QR Code Container */}
            <div className="bg-white p-4 rounded-3xl inline-block shadow-2xl border-4 border-amber-400 mx-auto">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Gunjan Snacks Mobile Order QR"
                  className="w-52 h-52 sm:w-60 sm:h-60 object-contain mx-auto"
                />
              ) : (
                <div className="w-52 h-52 flex items-center justify-center text-zinc-600">
                  Loading QR Code...
                </div>
              )}
              <div className="text-center font-black text-xs text-zinc-900 mt-2 tracking-wide flex items-center justify-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-orange-600" />
                <span>SCAN WITH MOBILE CAMERA TO ORDER</span>
              </div>
              <div className="text-[10px] font-mono text-zinc-600 mt-0.5 truncate max-w-[240px] mx-auto">
                {activeUrl}
              </div>
            </div>

            {/* Offer Callout */}
            <div className="bg-orange-500/15 border border-orange-500/40 rounded-2xl p-3 text-center space-y-0.5">
              <div className="text-xs font-black text-amber-300 uppercase tracking-wide flex items-center justify-center gap-1">
                <Percent className="w-3.5 h-3.5 text-orange-400" />
                SPECIAL FOODIE DISCOUNT
              </div>
              <p className="text-xs font-bold text-white">
                Buy 3 or more items (&gt; ₹100) &amp; get FLAT 5% OFF!
              </p>
              <p className="text-[11px] text-zinc-400">
                All Chaap, Momos, Nutri Kulche &amp; Biryani are approx ₹120 each.
              </p>
            </div>

            {/* Timings & Branches */}
            <div className="space-y-1.5 text-xs text-zinc-300 pt-1 border-t border-zinc-800">
              <div className="flex items-center justify-center gap-1.5 font-bold text-white">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                <span>Timings: Evening 5:00 PM to 11:30 PM Daily</span>
              </div>
              <div className="text-[11px] text-zinc-400">
                2 Outlets: Central Market &amp; Galleria Food Street • Fast Self-Pickup
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleCopyLink}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition border border-zinc-700"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Web Link'}</span>
            </button>

            <button
              onClick={handlePrintStandee}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition shadow-lg"
            >
              <Printer className="w-4 h-4" />
              <span>Print Table Standee</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
