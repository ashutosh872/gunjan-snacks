import React from 'react';
import { 
  Flame, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  QrCode, 
  Heart, 
  MessageCircle,
  ExternalLink 
} from 'lucide-react';
import { branches } from '../data/branchesData';

export default function Footer({ onOpenQrModal, onOpenBranchModal }) {
  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-800/80 pt-12 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Pure Veg Guarantee */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-black text-white">
                  GUNJAN <span className="text-orange-500">SNACKS</span>
                </h4>
                <p className="text-[11px] text-zinc-400">Amit Gunjan Da Dhaba</p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Your destination for the most authentic charcoal-grilled soya chaap, crispy kurkure momos, rich butter gravies, soft rumali roti, and Amritsari nutri kulche.
            </p>

            <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-xl text-emerald-400 text-xs font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>100% PURE VEG (शुद्ध शाकाहारी)</span>
            </div>
          </div>

          {/* Col 2: Timings & Offer Engine */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Operational Timings</span>
            </h5>
            <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl space-y-1 text-xs">
              <div className="font-extrabold text-amber-300">Evening Hours:</div>
              <div className="text-sm font-black text-white">5:00 PM – 11:30 PM</div>
              <p className="text-[11px] text-zinc-400">Open 7 Days a Week for Self-Pickup Takeaways</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl space-y-1 text-xs">
              <div className="font-extrabold text-orange-400">Super Foodie Offer:</div>
              <p className="text-[11px] text-zinc-300 leading-snug">
                Buy any 3 items priced over ₹100 and receive <strong className="text-amber-400 font-bold">FLAT 5% OFF</strong> automatically in your bag!
              </p>
            </div>
          </div>

          {/* Col 3: 2 Shop Locations */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>Our 2 Outlets (Pick Up Here)</span>
            </h5>
            <div className="space-y-2.5 text-xs text-zinc-300">
              {branches.map(b => (
                <div key={b.id} className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-850">
                  <div className="font-bold text-white text-xs">{b.shortName}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">{b.address}</div>
                  <div className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{b.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: In-Built QR Scanner & Quick Booking */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
              <QrCode className="w-4 h-4" />
              <span>In-Built Mobile QR</span>
            </h5>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Scan our shop counter standee QR to open the menu directly on your smartphone, add items, and pay online or choose cash on pickup!
            </p>

            <button
              onClick={onOpenQrModal}
              className="w-full bg-zinc-900 hover:bg-zinc-800 border border-orange-500/40 text-amber-300 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition"
            >
              <QrCode className="w-4 h-4 text-orange-400" />
              <span>Open Printable QR Standee</span>
            </button>

            <a
              href="https://wa.me/919310681373"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-700/30 hover:bg-emerald-700/40 border border-emerald-500/40 text-emerald-300 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-2 transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Shop Hotline</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Gunjan Snacks (Amit Gunjan Da Dhaba). All Rights Reserved. Pure Veg Chaap Hub.
          </div>

          <div className="flex items-center gap-1 text-zinc-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 inline mx-0.5" />
            <span>for Delhi-NCR Foodies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
