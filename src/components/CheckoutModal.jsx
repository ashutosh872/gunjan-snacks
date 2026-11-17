import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Phone, 
  User, 
  CreditCard, 
  Banknote, 
  QrCode, 
  Copy, 
  Check, 
  CheckCircle2, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Printer, 
  Share2, 
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { branches } from '../data/branchesData';
import { calculateCartTotals } from '../utils/discountCalculator';
import { generateQrDataUrl, createUpiPayUrl } from '../utils/qrGenerator';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  selectedBranch, 
  setSelectedBranch, 
  selectedTable = 'Table 1',
  setSelectedTable,
  onOrderSuccess 
}) {
  if (!isOpen) return null;

  const {
    subtotal,
    qualifyingItemsCount,
    isDiscountUnlocked,
    discountAmount,
    finalTotal
  } = calculateCartTotals(cartItems);

  // Form states
  const [orderMode, setOrderMode] = useState(selectedTable?.includes('Counter') ? 'takeaway' : 'dine-in');
  const [activeTable, setActiveTable] = useState(selectedTable?.includes('Counter') ? 'Table 1' : (selectedTable || 'Table 1'));
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupSlot, setPickupSlot] = useState('ASAP (Ready in 15-20 Mins)');
  const [chefNotes, setChefNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' or 'cod'
  const [upiRefId, setUpiRefId] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Confirmation state
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [orderQrUrl, setOrderQrUrl] = useState('');
  const [upiPaymentQrUrl, setUpiPaymentQrUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const merchantUpi = 'gunjansnacks@okhdfcbank';

  // Generate UPI payment QR when total or order modal opens
  useEffect(() => {
    if (finalTotal > 0) {
      const upiUrl = createUpiPayUrl({
        amount: finalTotal,
        orderId: `GS${Math.floor(1000 + Math.random() * 9000)}`,
        merchantUpi,
        merchantName: 'Gunjan Snacks'
      });
      generateQrDataUrl(upiUrl).then(url => {
        if (url) setUpiPaymentQrUrl(url);
      });
    }
  }, [finalTotal]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(merchantUpi);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const timeSlots = [
    'ASAP (Ready in 15-20 Mins)',
    '5:30 PM - 5:45 PM',
    '6:00 PM - 6:15 PM',
    '6:30 PM - 6:45 PM',
    '7:00 PM - 7:15 PM',
    '7:30 PM - 7:45 PM',
    '8:00 PM - 8:15 PM',
    '8:30 PM - 8:45 PM',
    '9:00 PM - 9:15 PM',
    '9:30 PM - 9:45 PM',
    '10:00 PM - 10:15 PM',
    '10:30 PM - 10:45 PM',
    '11:00 PM - 11:15 PM',
  ];

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name for order booking.');
      return;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number for order verification.');
      return;
    }

    setIsSubmitting(true);

    const tokenNumber = `GS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      orderId: `ORD-${Date.now()}`,
      token: tokenNumber,
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      customerPhone: cleanPhone,
      orderMode, // 'dine-in' or 'takeaway'
      tableNumber: orderMode === 'dine-in' ? activeTable : 'Takeaway Counter',
      pickupSlot,
      chefNotes: chefNotes.trim(),
      branch: selectedBranch,
      items: cartItems,
      subtotal,
      discountAmount,
      isDiscountUnlocked,
      finalTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'upi' ? 'Online UPI (Verified)' : (orderMode === 'dine-in' ? 'Cash/UPI at Table (COD)' : 'Pay on Pickup (COD)'),
      upiRefId: paymentMethod === 'upi' ? (upiRefId || 'UPI-APP-DIRECT') : 'N/A',
      status: 'In Tandoor (Preparing)',
      estimatedPickup: orderMode === 'dine-in' ? `Hot to ${activeTable} (12-15 Mins)` : (pickupSlot.startsWith('ASAP') ? 'In 15-20 Mins' : pickupSlot)
    };

    if (setSelectedTable && orderMode === 'dine-in') {
      setSelectedTable(activeTable);
    }

    // Generate Verification QR for counter/table staff
    const qrPayload = JSON.stringify({
      t: tokenNumber,
      b: selectedBranch.id,
      tot: finalTotal,
      n: customerName,
      p: cleanPhone,
      m: orderMode,
      tbl: orderMode === 'dine-in' ? activeTable : 'Counter'
    });

    const qrData = await generateQrDataUrl(qrPayload, {
      color: { dark: '#18181b', light: '#ffffff' }
    });
    setOrderQrUrl(qrData);

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('gunjan_snacks_orders') || '[]');
      localStorage.setItem('gunjan_snacks_orders', JSON.stringify([newOrder, ...existing]));
    } catch (err) {
      console.error('LocalStorage write error', err);
    }

    setConfirmedOrder(newOrder);
    setIsSubmitting(false);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    onOrderSuccess(newOrder);
  };

  const handleWhatsAppShare = () => {
    if (!confirmedOrder) return;
    const itemsText = confirmedOrder.items
      .map(i => `• ${i.name} (Qty: ${i.quantity}) - ₹${i.price * i.quantity}`)
      .join('\n');

    const text = encodeURIComponent(
      `🍢 *GUNJAN SNACKS - ${confirmedOrder.orderMode === 'dine-in' ? `TABLE DINE-IN ORDER (${confirmedOrder.tableNumber})` : 'TAKEAWAY COUNTER ORDER'}*\n` +
      `--------------------------------\n` +
      `*Token No:* ${confirmedOrder.token}\n` +
      `*Order Mode:* ${confirmedOrder.orderMode === 'dine-in' ? `🪑 Table Dine-in (${confirmedOrder.tableNumber})` : '🛍️ Counter Takeaway'}\n` +
      `*Customer:* ${confirmedOrder.customerName} (${confirmedOrder.customerPhone})\n` +
      `*Outlet:* ${confirmedOrder.branch.name}\n` +
      `*Payment:* ${confirmedOrder.paymentStatus}\n` +
      `--------------------------------\n` +
      `*Items Ordered:*\n${itemsText}\n` +
      `--------------------------------\n` +
      (confirmedOrder.isDiscountUnlocked ? `*5% Foodie Discount:* -₹${confirmedOrder.discountAmount}\n` : '') +
      `*Total Amount:* ₹${confirmedOrder.finalTotal}\n\n` +
      `*Chef Notes:* ${confirmedOrder.chefNotes || 'Hot & Fresh please!'}\n` +
      (confirmedOrder.orderMode === 'dine-in' 
        ? `_👉 Please prepare fresh from clay tandoor and serve hot directly to ${confirmedOrder.tableNumber}!_` 
        : `_👉 I will collect my parcel from the pickup counter shortly._`)
    );

    window.open(`https://wa.me/91${SHOP_HOTLINE_PHONE}?text=${text}`, '_blank');
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-zinc-950 border border-orange-500/50 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-white relative">
        {/* Top Header */}
        <div className="sticky top-0 z-20 bg-zinc-900/95 border-b border-zinc-800 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-lg sm:text-xl text-white">
                {confirmedOrder ? 'Order Confirmed!' : 'Book Pickup Order'}
              </h3>
              <p className="text-xs text-zinc-400">
                {confirmedOrder 
                  ? `Pickup Token: ${confirmedOrder.token}` 
                  : 'Fast self-collection from your chosen outlet'}
              </p>
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
        <div className="p-4 sm:p-6 space-y-6">
          {!confirmedOrder ? (
            /* --- STEP 1: ORDER BOOKING FORM --- */
            <form onSubmit={handlePlaceOrder} className="space-y-5">
              {errorMessage && (
                <div className="bg-red-500/15 border border-red-500/40 rounded-xl p-3 text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. Branch Selector (2 Locations) */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Select Pickup Outlet (2 Locations in City):</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {branches.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBranch(b)}
                      className={`p-3 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                        selectedBranch.id === b.id
                          ? 'bg-orange-500/15 border-orange-500 text-white shadow-md'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-850'
                      }`}
                    >
                      <div>
                        <div className="font-extrabold text-xs sm:text-sm text-white flex items-center justify-between">
                          <span>{b.shortName}</span>
                          {selectedBranch.id === b.id && (
                            <CheckCircle2 className="w-4 h-4 text-orange-400" />
                          )}
                        </div>
                        <div className="text-[11px] text-zinc-400 mt-1 leading-snug">
                          {b.address}
                        </div>
                      </div>
                      <div className="text-[10px] text-amber-400 font-semibold mt-2 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" /> 5:00 PM - 11:30 PM Daily
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Service Mode: Table Dine-in vs Takeaway Pickup */}
              <div className="space-y-2.5 pt-1">
                <label className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center justify-between">
                  <span>Order Type / Dining Mode:</span>
                  <span className="text-[11px] text-zinc-400 font-normal">Social Dine-in &amp; Takeaway</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setOrderMode('dine-in')}
                    className={`p-3 rounded-2xl border text-left cursor-pointer transition ${
                      orderMode === 'dine-in'
                        ? 'bg-orange-500/20 border-orange-500 text-white shadow-md'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-850'
                    }`}
                  >
                    <div className="font-extrabold text-xs sm:text-sm text-white flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span>🪑</span>
                        <span>Table Dine-in</span>
                      </span>
                      {orderMode === 'dine-in' && <CheckCircle2 className="w-4 h-4 text-orange-400" />}
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      Sit at any table &amp; get food served hot
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderMode('takeaway')}
                    className={`p-3 rounded-2xl border text-left cursor-pointer transition ${
                      orderMode === 'takeaway'
                        ? 'bg-orange-500/20 border-orange-500 text-white shadow-md'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-850'
                    }`}
                  >
                    <div className="font-extrabold text-xs sm:text-sm text-white flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span>🛍️</span>
                        <span>Counter Takeaway</span>
                      </span>
                      {orderMode === 'takeaway' && <CheckCircle2 className="w-4 h-4 text-orange-400" />}
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1">
                      Pick up packed parcel from shop counter
                    </p>
                  </button>
                </div>

                {/* Table Picker if Dine-in */}
                {orderMode === 'dine-in' && (
                  <div className="bg-zinc-900/90 border border-orange-500/30 rounded-2xl p-3 space-y-2 animate-fade-in">
                    <div className="text-xs font-bold text-amber-300 flex items-center justify-between">
                      <span>Select Your Table Number:</span>
                      <span className="text-[10px] text-emerald-400 font-normal">Active at {selectedBranch.shortName}</span>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                      {['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6', 'Table 7', 'Table 8'].map((tbl) => (
                        <button
                          key={tbl}
                          type="button"
                          onClick={() => setActiveTable(tbl)}
                          className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition cursor-pointer ${
                            activeTable === tbl
                              ? 'bg-orange-600 text-white border border-orange-400 shadow-lg'
                              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700/60'
                          }`}
                        >
                          {tbl}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-zinc-400">
                      Our steward will bring your piping hot dishes straight to <strong className="text-amber-400">{activeTable}</strong>!
                    </p>
                  </div>
                )}
              </div>

              {/* 3. Customer Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-zinc-900 border border-zinc-700/80 focus:border-orange-500 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1.5">
                    10-Digit Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full bg-zinc-900 border border-zinc-700/80 focus:border-orange-500 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Pickup Time Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  Estimated Pickup Time:
                </label>
                <select
                  value={pickupSlot}
                  onChange={(e) => setPickupSlot(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700/80 focus:border-orange-500 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white outline-none cursor-pointer"
                >
                  {timeSlots.map((slot, idx) => (
                    <option key={idx} value={slot} className="bg-zinc-900">
                      {slot}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Evening timings: 5:00 PM to 11:30 PM. Your parcel will be kept hot at the counter.
                </p>
              </div>

              {/* Chef Notes */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1.5">
                  Chef Instructions / Notes (Optional)
                </label>
                <input
                  type="text"
                  value={chefNotes}
                  onChange={(e) => setChefNotes(e.target.value)}
                  placeholder="e.g. Extra onions & mint chutney, extra butter, make chaap crisp"
                  className="w-full bg-zinc-900 border border-zinc-700/80 focus:border-orange-500 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white outline-none"
                />
              </div>

              {/* 3. Payment Method Choice (Online UPI QR vs COD) */}
              <div className="space-y-3 pt-2 border-t border-zinc-800">
                <label className="text-xs font-bold uppercase tracking-wider text-orange-400 block">
                  Select Payment Option:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option 1: Pay Online via UPI / QR */}
                  <div
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                      paymentMethod === 'upi'
                        ? 'bg-orange-950/40 border-orange-500 shadow-lg'
                        : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-850 text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-orange-400" />
                        <span className="font-extrabold text-xs sm:text-sm text-white">
                          Pay Online via UPI
                        </span>
                      </div>
                      {paymentMethod === 'upi' && <CheckCircle2 className="w-4 h-4 text-orange-400" />}
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Scan dynamic QR with PhonePe, GPay, Paytm or BHIM UPI
                    </p>
                  </div>

                  {/* Option 2: Cash on Pickup (COD) */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                      paymentMethod === 'cod'
                        ? 'bg-orange-950/40 border-orange-500 shadow-lg'
                        : 'bg-zinc-900 border-zinc-800 hover:bg-zinc-850 text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-emerald-400" />
                        <span className="font-extrabold text-xs sm:text-sm text-white">
                          Cash on Pickup (COD)
                        </span>
                      </div>
                      {paymentMethod === 'cod' && <CheckCircle2 className="w-4 h-4 text-orange-400" />}
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Pay cash or UPI at the counter when collecting your parcel
                    </p>
                  </div>
                </div>

                {/* In-built Dynamic UPI QR Code View when 'upi' is selected */}
                {paymentMethod === 'upi' && (
                  <div className="bg-zinc-900/90 border border-orange-500/40 rounded-2xl p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {upiPaymentQrUrl && (
                        <div className="bg-white p-2.5 rounded-2xl shadow-lg shrink-0">
                          <img
                            src={upiPaymentQrUrl}
                            alt="Scan to Pay via UPI"
                            className="w-36 h-36 object-contain"
                          />
                          <div className="text-center text-[10px] text-zinc-800 font-bold mt-1">
                            Scan with Any UPI App
                          </div>
                        </div>
                      )}

                      <div className="space-y-2 flex-1 text-center sm:text-left">
                        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                          <Sparkles className="w-3 h-3" />
                          Dynamic QR for ₹{finalTotal}
                        </div>
                        <h5 className="font-bold text-sm text-white">
                          Scan &amp; Pay to Gunjan Snacks
                        </h5>
                        <p className="text-xs text-zinc-400">
                          Scan the QR above using PhonePe, Google Pay, Paytm, or copy our official UPI ID:
                        </p>

                        <div className="flex items-center gap-2 justify-center sm:justify-start">
                          <code className="bg-black/60 px-2.5 py-1 rounded-lg text-xs font-mono text-orange-300 border border-zinc-700">
                            {merchantUpi}
                          </code>
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="text-xs text-zinc-300 hover:text-white bg-zinc-800 px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                          >
                            {copiedUpi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        {/* Optional Reference ID */}
                        <div className="pt-1">
                          <input
                            type="text"
                            value={upiRefId}
                            onChange={(e) => setUpiRefId(e.target.value)}
                            placeholder="Enter 12-digit UPI UTR / Ref (Optional)"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary & Final Total */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-2 text-xs">
                <div className="font-bold uppercase tracking-wider text-zinc-400 pb-1 border-b border-zinc-800 flex justify-between">
                  <span>ORDER SUMMARY ({cartItems.length} ITEMS)</span>
                  <span className="text-amber-400">PICKUP ORDER</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Item Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>
                {isDiscountUnlocked && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>5% Foodie Discount Applied:</span>
                    <span>- ₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-300">
                  <span>Pickup Packaging:</span>
                  <span className="text-emerald-400 font-semibold">FREE (₹0)</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-zinc-800">
                  <span>Total Amount to Pay:</span>
                  <span className="text-amber-400 text-lg">₹{finalTotal}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black py-4 rounded-2xl text-base shadow-xl shadow-orange-950/80 flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Generating Pickup Token...</span>
                ) : (
                  <>
                    <span>Confirm &amp; Book Takeaway (₹{finalTotal})</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* --- STEP 2: CONFIRMED ORDER RECEIPT & LIVE TOKEN --- */
            <div className="space-y-6 animate-fade-in print-container">
              {/* Token Display Banner */}
              <div className="text-center space-y-2 bg-gradient-to-b from-orange-950/50 to-zinc-900 border-2 border-orange-500 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                  {confirmedOrder.orderMode === 'dine-in' 
                    ? `TABLE ORDER CONFIRMED • SERVING TO ${confirmedOrder.tableNumber}` 
                    : 'BOOKING SUCCESSFUL • READY FOR PICKUP'}
                </div>

                <div className="pt-2">
                  <div className="text-xs text-zinc-400 uppercase tracking-widest font-bold">
                    {confirmedOrder.orderMode === 'dine-in' ? `YOUR TABLE TOKEN (${confirmedOrder.tableNumber})` : 'SHOW THIS TOKEN AT COUNTER'}
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-amber-400 tracking-wider my-1">
                    {confirmedOrder.token}
                  </div>
                  <div className="text-xs text-zinc-300 font-medium">
                    Order ID: <span className="font-mono text-white">{confirmedOrder.orderId}</span>
                    {confirmedOrder.orderMode === 'dine-in' && (
                      <span className="ml-2 bg-orange-600/30 text-orange-300 border border-orange-500/40 px-2 py-0.5 rounded font-bold">
                        {confirmedOrder.tableNumber}
                      </span>
                    )}
                  </div>
                </div>

                {/* In-Built Order QR Code for shopkeeper scan */}
                {orderQrUrl && (
                  <div className="pt-3 flex flex-col items-center">
                    <div className="bg-white p-2.5 rounded-2xl shadow-xl inline-block">
                      <img
                        src={orderQrUrl}
                        alt="Order Verification QR"
                        className="w-32 h-32 object-contain"
                      />
                    </div>
                    <span className="text-[11px] text-zinc-400 mt-1.5">
                      {confirmedOrder.orderMode === 'dine-in' 
                        ? `Steward will verify and serve directly to ${confirmedOrder.tableNumber}`
                        : 'Counter staff will scan this QR to deliver your parcel'}
                    </span>
                  </div>
                )}
              </div>

              {/* Live Order Timeline */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                  <span>LIVE STATUS TRACKER</span>
                  <span className="text-orange-400 font-semibold">{confirmedOrder.estimatedPickup}</span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center pt-1">
                  <div className="space-y-1">
                    <div className="w-7 h-7 mx-auto rounded-full bg-emerald-500 text-black flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                    <div className="text-[10px] font-bold text-white">Booked</div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-7 h-7 mx-auto rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold animate-pulse">
                      🔥
                    </div>
                    <div className="text-[10px] font-bold text-orange-400">In Tandoor</div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-7 h-7 mx-auto rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <div className="text-[10px] text-zinc-400">Packed</div>
                  </div>
                  <div className="space-y-1">
                    <div className="w-7 h-7 mx-auto rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <div className="text-[10px] text-zinc-400">Ready</div>
                  </div>
                </div>
              </div>

              {/* Pickup Outlet Address */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 uppercase font-bold tracking-wider">
                      PICKUP OUTLET ADDRESS:
                    </div>
                    <div className="font-black text-sm text-white">
                      {confirmedOrder.branch.name}
                    </div>
                    <div className="text-xs text-zinc-300 mt-0.5">
                      {confirmedOrder.branch.address}
                    </div>
                    <div className="text-xs text-amber-400 font-semibold mt-1">
                      Landmark: {confirmedOrder.branch.landmark}
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      Shop Hotline: <strong className="text-white">{confirmedOrder.branch.phone}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Itemized Order List */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-2 text-xs">
                <div className="font-bold uppercase tracking-wider text-zinc-400 pb-1 border-b border-zinc-800">
                  BOOKED ITEMS ({confirmedOrder.items.length})
                </div>
                {confirmedOrder.items.map((i, idx) => (
                  <div key={idx} className="flex justify-between text-zinc-300">
                    <span>
                      {i.quantity} × {i.name}
                    </span>
                    <span className="font-bold text-white">
                      ₹{i.price * i.quantity}
                    </span>
                  </div>
                ))}
                {confirmedOrder.isDiscountUnlocked && (
                  <div className="flex justify-between text-emerald-400 font-bold pt-1">
                    <span>5% Special Offer:</span>
                    <span>- ₹{confirmedOrder.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-zinc-800">
                  <span>Total Amount Paid / Payable:</span>
                  <span className="text-amber-400">₹{confirmedOrder.finalTotal}</span>
                </div>
                <div className="text-[11px] text-zinc-400 pt-1">
                  Payment Mode: <strong className="text-orange-400">{confirmedOrder.paymentStatus}</strong>
                </div>
              </div>

              {/* Share & Print Actions */}
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-3.5 space-y-2 text-center">
                <div className="text-xs font-black text-emerald-300 flex items-center justify-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>DIRECT WHATSAPP TO OWNER (+91 93106 81373)</span>
                </div>
                <p className="text-[11px] text-zinc-300">
                  Tap below to send this order directly to the shop owner on WhatsApp so our kitchen fires up your parcel right away!
                </p>
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer transition shadow-xl shadow-emerald-950/60 transform active:scale-98"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                  <span>Send Order to Owner (WhatsApp: +91 98765 00000)</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handlePrintSlip}
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition border border-zinc-700"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Pickup Slip</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-orange-400 hover:underline font-bold cursor-pointer"
                >
                  Return to Menu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
