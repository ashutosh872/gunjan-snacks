import React, { useState, useEffect } from 'react';
import { X, Receipt, Clock, MapPin, QrCode, MessageCircle, AlertCircle, Sparkles } from 'lucide-react';
import { generateQrDataUrl } from '../utils/qrGenerator';

export default function OrderTrackerModal({ isOpen, onClose, onExploreMenu }) {
  if (!isOpen) return null;

  const [orders, setOrders] = useState([]);
  const [selectedOrderQr, setSelectedOrderQr] = useState(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('gunjan_snacks_orders') || '[]');
      setOrders(stored);
    } catch (e) {
      setOrders([]);
    }
  }, [isOpen]);

  const showQr = async (order) => {
    const qrPayload = JSON.stringify({
      t: order.token,
      b: order.branch?.id,
      tot: order.finalTotal,
      n: order.customerName,
      p: order.customerPhone
    });
    const url = await generateQrDataUrl(qrPayload);
    setSelectedOrderQr({ token: order.token, url });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-zinc-950 border border-orange-500/50 rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-white relative">
        <div className="sticky top-0 z-10 bg-zinc-900/95 border-b border-zinc-800 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
              <Receipt className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-white">My Pickup Tokens</h3>
              <p className="text-[11px] text-zinc-400">View your active tokens and show at the counter</p>
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
          {orders.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                <Receipt className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white text-base">No active orders found</h4>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Once you book a takeaway order, your pickup token and verification QR will appear right here.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreMenu();
                }}
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                        PICKUP TOKEN
                      </div>
                      <div className="text-2xl font-black text-amber-400">
                        {order.token}
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono">
                        {order.orderId}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded-full">
                        {order.status || 'In Tandoor'}
                      </span>
                      <div className="text-xs font-black text-white mt-1.5">
                        ₹{order.finalTotal}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-zinc-300 space-y-1 bg-zinc-950 p-2.5 rounded-xl border border-zinc-850">
                    <div className="flex items-center gap-1.5 text-orange-400 font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{order.branch?.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-400 text-[11px]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Pickup Slot: {order.pickupSlot}</span>
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      Payment: <span className="text-zinc-200">{order.paymentStatus}</span>
                    </div>
                  </div>

                  <div className="text-xs text-zinc-400">
                    <strong className="text-zinc-200">Items: </strong>
                    {order.items?.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </div>

                  <div className="pt-1 flex items-center justify-between border-t border-zinc-800">
                    <button
                      onClick={() => showQr(order)}
                      className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>Show Counter QR Code</span>
                    </button>
                    <span className="text-[10px] text-zinc-500">
                      Booked {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* QR Popup when clicked */}
          {selectedOrderQr && (
            <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4">
              <div className="bg-zinc-900 border border-orange-500/50 p-6 rounded-3xl text-center space-y-3 max-w-xs w-full">
                <div className="text-xs font-bold text-zinc-400 uppercase">
                  COUNTER VERIFICATION QR
                </div>
                <div className="text-2xl font-black text-amber-400">
                  {selectedOrderQr.token}
                </div>
                <div className="bg-white p-3 rounded-2xl inline-block shadow-lg mx-auto">
                  <img
                    src={selectedOrderQr.url}
                    alt="Token QR"
                    className="w-44 h-44 object-contain"
                  />
                </div>
                <p className="text-xs text-zinc-400">
                  Show this to Gunjan Snacks counter staff to verify &amp; collect your parcel
                </p>
                <button
                  onClick={() => setSelectedOrderQr(null)}
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 rounded-xl text-xs transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
