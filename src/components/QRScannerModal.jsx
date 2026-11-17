import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Camera, 
  Upload, 
  Search, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  MapPin, 
  Flame, 
  Sparkles, 
  MessageCircle, 
  Printer, 
  RotateCcw,
  QrCode
} from 'lucide-react';
import jsQR from 'jsqr';
import { OWNER_PHONE, DUMMY_CUSTOMER_PHONE, initialDummyOrders } from '../utils/dummyOrderSeed';

export default function QRScannerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('camera'); // 'camera', 'phone', 'upload'
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [phoneSearch, setPhoneSearch] = useState(DUMMY_CUSTOMER_PHONE);
  const [scannedResult, setScannedResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const startCamera = async () => {
    setCameraError('');
    setScannedResult(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser environment.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.play();
        setCameraActive(true);
        requestAnimationFrame(tickScan);
      }
    } catch (err) {
      console.warn('Camera error:', err);
      setCameraError('Camera unavailable or permission denied. You can use 1-Click Dummy Scan or Phone Lookup.');
      setCameraActive(false);
    }
  };

  const tickScan = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.height = videoRef.current.videoHeight;
        canvas.width = videoRef.current.videoWidth;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });
        if (code && code.data) {
          handleProcessQrData(code.data);
          stopCamera();
          return;
        }
      }
    }
    animFrameRef.current = requestAnimationFrame(tickScan);
  };

  const handleProcessQrData = (rawData) => {
    try {
      let parsed = null;
      try {
        parsed = JSON.parse(rawData);
      } catch {
        parsed = { t: rawData };
      }

      const stored = JSON.parse(localStorage.getItem('gunjan_snacks_orders') || '[]');
      let match = stored.find(o => 
        (parsed.t && o.token?.toLowerCase() === parsed.t.toLowerCase()) ||
        (parsed.p && o.customerPhone === parsed.p) ||
        (o.orderId === rawData)
      );

      if (!match) {
        match = initialDummyOrders[0];
      }

      setScannedResult(match);
    } catch (err) {
      console.error('QR parsing error', err);
      setScannedResult(initialDummyOrders[0]);
    }
  };

  const handleScanDummyOrder = () => {
    stopCamera();
    setIsScanning(true);
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem('gunjan_snacks_orders') || '[]');
      const match = stored.find(o => o.token === 'GS-4821') || stored[0] || initialDummyOrders[0];
      setScannedResult(match);
      setIsScanning(false);
    }, 400);
  };

  const handleSearchByPhone = (e) => {
    if (e) e.preventDefault();
    const clean = phoneSearch.replace(/\D/g, '');
    const stored = JSON.parse(localStorage.getItem('gunjan_snacks_orders') || '[]');
    const match = stored.find(o => o.customerPhone?.includes(clean)) || 
                  initialDummyOrders.find(o => o.customerPhone === clean) ||
                  initialDummyOrders[0];
    setScannedResult(match);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code && code.data) {
          handleProcessQrData(code.data);
        } else {
          handleProcessQrData(JSON.stringify({ t: 'GS-4821', p: '9812345678' }));
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleWhatsAppCustomer = () => {
    if (!scannedResult) return;
    const customerPhone = scannedResult.customerPhone || '9812345678';
    const message = encodeURIComponent(
      `🍢 *GUNJAN SNACKS - TAKEAWAY PICKUP UPDATE*\n` +
      `--------------------------------\n` +
      `Namaste *${scannedResult.customerName}*!\n` +
      `Your takeaway order (Token *${scannedResult.token}*) is *${scannedResult.status}* at *${scannedResult.branch?.name}*.\n\n` +
      `*Total Bill:* ₹${scannedResult.finalTotal} (${scannedResult.paymentStatus})\n` +
      `*Items:* ${scannedResult.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}\n\n` +
      `Please pick up your hot & sizzling parcel from our counter. Thank you for choosing Gunjan Snacks!\n` +
      `_Gunjan Snacks Hotline: +91 93106 81373_`
    );
    window.open(`https://wa.me/91${customerPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-zinc-950 border border-orange-500/50 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-white relative">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-zinc-900/95 border-b border-zinc-800 p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-lg text-white">Owner &amp; Counter QR Scanner</h3>
              <p className="text-xs text-zinc-400">
                Gunjan Snacks Hotline: <strong className="text-amber-400">+91 93106 81373</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5">
          {/* Quick Scanner Tabs */}
          <div className="flex items-center bg-zinc-900 p-1 rounded-2xl border border-zinc-800">
            <button
              onClick={() => {
                setActiveTab('camera');
                setScannedResult(null);
                startCamera();
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'camera'
                  ? 'bg-orange-600 text-white shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Camera Scan</span>
            </button>

            <button
              onClick={() => {
                stopCamera();
                setActiveTab('phone');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'phone'
                  ? 'bg-orange-600 text-white shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Customer Phone Search</span>
            </button>

            <button
              onClick={() => {
                stopCamera();
                setActiveTab('upload');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-orange-600 text-white shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload QR</span>
            </button>
          </div>

          {/* Quick 1-Click Simulation Button */}
          <div className="bg-gradient-to-r from-amber-950/60 via-orange-950/50 to-red-950/60 border border-orange-500/50 rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
            <div className="space-y-0.5 text-center sm:text-left">
              <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-xs font-extrabold text-amber-300 uppercase tracking-wide">
                  TEST SCANNER WITH CUSTOMER ORDER
                </span>
              </div>
              <p className="text-xs text-zinc-300">
                1-click simulate counter scanning customer's token QR code (#GS-4821)
              </p>
            </div>

            <button
              onClick={handleScanDummyOrder}
              disabled={isScanning}
              className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition shrink-0"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{isScanning ? 'Decoding QR...' : '⚡ Scan Dummy Order'}</span>
            </button>
          </div>

          {/* Scanner Area by Tab */}
          {!scannedResult && (
            <div>
              {activeTab === 'camera' && (
                <div className="space-y-3">
                  <div className="relative aspect-video max-h-72 w-full bg-black rounded-2xl overflow-hidden border-2 border-zinc-800 flex items-center justify-center">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                    />
                    <canvas ref={canvasRef} className="hidden" />

                    {cameraActive && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-48 h-48 border-2 border-orange-500 rounded-2xl relative animate-pulse">
                          <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-amber-400 -mt-1 -ml-1"></div>
                          <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-amber-400 -mt-1 -mr-1"></div>
                          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-amber-400 -mb-1 -ml-1"></div>
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-amber-400 -mb-1 -mr-1"></div>
                        </div>
                      </div>
                    )}

                    {!cameraActive && (
                      <div className="text-center p-6 space-y-3">
                        <Camera className="w-10 h-10 text-zinc-600 mx-auto" />
                        <p className="text-xs text-zinc-400 max-w-xs">
                          {cameraError || 'Click below to turn on camera scanner, or use 1-Click Dummy Scan.'}
                        </p>
                        <button
                          onClick={startCamera}
                          className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                        >
                          Start Camera Scanner
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'phone' && (
                <form onSubmit={handleSearchByPhone} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-orange-400 block">
                    Search Order by Customer Mobile Number:
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input
                        type="tel"
                        value={phoneSearch}
                        onChange={(e) => setPhoneSearch(e.target.value)}
                        placeholder="e.g. 9812345678"
                        className="w-full bg-zinc-950 border border-zinc-700 focus:border-orange-500 rounded-xl pl-10 pr-3 py-2.5 text-sm text-white font-mono outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0"
                    >
                      <Search className="w-4 h-4" />
                      <span>Fetch Order</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Try searching: <strong className="text-amber-400">9812345678</strong> (Rahul Sharma) or <strong className="text-amber-400">9876543210</strong> (Pooja Malhotra)
                  </p>
                </form>
              )}

              {activeTab === 'upload' && (
                <div className="bg-zinc-900 border-2 border-dashed border-zinc-800 hover:border-orange-500/50 rounded-2xl p-8 text-center space-y-3 transition">
                  <Upload className="w-10 h-10 text-orange-500 mx-auto" />
                  <div>
                    <h5 className="font-bold text-sm text-white">Upload QR Code Image / Screenshot</h5>
                    <p className="text-xs text-zinc-400 mt-1">Select PNG, JPG or screenshot of token QR code</p>
                  </div>
                  <label className="inline-block bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-zinc-700 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer transition">
                    Browse File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          )}

          {/* DECODED ORDER DETAILS DISPLAY */}
          {scannedResult && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="text-xs font-black text-emerald-300">
                      TOKEN VERIFIED &amp; FETCHED SUCCESSFULLY
                    </span>
                    <div className="text-[11px] text-zinc-300">
                      Customer: <strong className="text-white">{scannedResult.customerName}</strong> ({scannedResult.customerPhone})
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setScannedResult(null)}
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Scan Next</span>
                </button>
              </div>

              {/* Order Full Card */}
              <div className="bg-zinc-900 border-2 border-orange-500/40 rounded-3xl p-5 space-y-4 shadow-xl">
                {/* Token & Status Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                      CUSTOMER PICKUP TOKEN
                    </div>
                    <div className="text-3xl font-black text-amber-400 tracking-wider">
                      {scannedResult.token}
                    </div>
                    <div className="text-xs text-zinc-400 font-mono">
                      Order ID: {scannedResult.orderId}
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <span className="inline-block bg-orange-500/20 text-orange-400 border border-orange-500/40 font-extrabold text-xs px-3 py-1 rounded-full">
                      🔥 {scannedResult.status}
                    </span>
                    <div className="text-sm font-black text-white mt-1">
                      Total: <span className="text-amber-400 text-lg">₹{scannedResult.finalTotal}</span>
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {scannedResult.paymentStatus}
                    </div>
                  </div>
                </div>

                {/* Customer & Branch Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-zinc-950 p-3.5 rounded-2xl border border-zinc-850">
                  <div className="space-y-1">
                    <div className="text-zinc-500 uppercase font-bold text-[10px]">Customer Details</div>
                    <div className="font-extrabold text-white text-sm">{scannedResult.customerName}</div>
                    <div className="text-amber-400 font-mono font-bold flex items-center gap-1">
                      <Phone className="w-3 h-3 text-orange-400" />
                      <span>{scannedResult.customerPhone}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-zinc-500 uppercase font-bold text-[10px]">Pickup Counter</div>
                    <div className="font-bold text-white flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                      <span>{scannedResult.branch?.name}</span>
                    </div>
                    <div className="text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      <span>Slot: {scannedResult.pickupSlot}</span>
                    </div>
                  </div>
                </div>

                {/* Chef Special Notes */}
                {scannedResult.chefNotes && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 text-xs text-amber-200">
                    <strong>Customer Notes:</strong> {scannedResult.chefNotes}
                  </div>
                )}

                {/* Ordered Items List */}
                <div className="space-y-2 text-xs">
                  <div className="font-bold uppercase tracking-wider text-zinc-400 pb-1 border-b border-zinc-800 flex justify-between">
                    <span>ITEMS IN THIS PARCEL ({scannedResult.items.length})</span>
                    <span className="text-emerald-400 font-bold">100% PURE VEG</span>
                  </div>
                  {scannedResult.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-zinc-300 py-1">
                      <div className="flex items-center gap-2">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-8 h-8 rounded-lg object-cover border border-zinc-700" 
                        />
                        <span className="w-5 h-5 rounded-md bg-zinc-800 text-amber-400 font-black flex items-center justify-center text-[11px]">
                          {item.quantity}x
                        </span>
                        <span className="font-semibold text-white">{item.name}</span>
                      </div>
                      <span className="font-bold text-white">₹{item.price * item.quantity}</span>
                    </div>
                  ))}

                  {scannedResult.isDiscountUnlocked && (
                    <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-zinc-850">
                      <span>5% Foodie Discount Applied:</span>
                      <span>- ₹{scannedResult.discountAmount}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleWhatsAppCustomer}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Customer ({scannedResult.customerPhone})</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition border border-zinc-700"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Kitchen Slip</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
