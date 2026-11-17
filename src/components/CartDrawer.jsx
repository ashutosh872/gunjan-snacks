import React from 'react';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  Sparkles, 
  Percent, 
  MapPin, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { calculateCartTotals } from '../utils/discountCalculator';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart, 
  selectedBranch, 
  onOpenBranchModal,
  onProceedToCheckout 
}) {
  if (!isOpen) return null;

  const {
    subtotal,
    qualifyingItemsCount,
    isDiscountUnlocked,
    itemsNeeded,
    discountRate,
    discountAmount,
    packagingFee,
    finalTotal
  } = calculateCartTotals(cartItems);

  const progressPercentage = Math.min(100, Math.round((qualifyingItemsCount / 3) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/90">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-black text-lg text-white">Your Foodie Bag</h3>
                <p className="text-xs text-zinc-400">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
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

          {/* Pickup Branch Notification */}
          <div className="bg-zinc-900/80 border-b border-zinc-800 px-4 py-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <div>
                <span className="text-zinc-400">Pickup Counter: </span>
                <span className="font-bold text-amber-400">{selectedBranch.shortName}</span>
              </div>
            </div>
            <button
              onClick={onOpenBranchModal}
              className="text-orange-400 font-bold hover:underline cursor-pointer"
            >
              Change
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* Special Offer Progress Tracker Box */}
            <div className={`p-3.5 rounded-2xl border transition-all ${
              isDiscountUnlocked 
                ? 'bg-gradient-to-r from-emerald-950/80 to-zinc-900 border-emerald-500/60 shadow-lg shadow-emerald-950/30' 
                : 'bg-zinc-900/90 border-amber-500/40'
            }`}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isDiscountUnlocked ? 'bg-emerald-500 text-black' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {isDiscountUnlocked ? <CheckCircle2 className="w-4 h-4 stroke-[3]" /> : <Percent className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-white">
                      {isDiscountUnlocked ? '🎉 5% SPECIAL DISCOUNT UNLOCKED!' : '🔥 Buy 3 items > ₹100 & get 5% OFF!'}
                    </h4>
                    <p className="text-[11px] text-zinc-300">
                      {isDiscountUnlocked 
                        ? `You unlocked flat 5% off! Saved ₹${discountAmount}` 
                        : itemsNeeded === 1 
                          ? 'Add just 1 more item (> ₹100) to get 5% OFF!'
                          : `Add ${itemsNeeded} more items (> ₹100) to get 5% OFF!`
                      }
                    </p>
                  </div>
                </div>
                <span className="text-xs font-black text-amber-400 shrink-0">
                  {qualifyingItemsCount}/3
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mt-2">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    isDiscountUnlocked 
                      ? 'bg-gradient-to-r from-emerald-400 to-green-500' 
                      : 'bg-gradient-to-r from-amber-500 to-orange-500'
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Cart Items List */}
            {cartItems.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-black text-lg text-white">Your bag is empty!</h4>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Add some sizzling Tandoori Malai Chaap, Kurkure Momos, Nutri Kulche or Biryani to get started.
                </p>
                <button
                  onClick={onClose}
                  className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-3 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          {/* Pure veg mark */}
                          <div className="w-3.5 h-3.5 rounded-sm bg-white border border-emerald-600 flex items-center justify-center shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                          </div>
                          <h5 className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                            {item.name}
                          </h5>
                        </div>
                        <div className="text-xs text-amber-400 font-extrabold mt-0.5">
                          ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                        </div>
                        {item.price > 100 && (
                          <div className="text-[10px] text-emerald-400 font-medium">
                            ★ Counted for 5% offer
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded-xl p-0.5 shrink-0">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-700 rounded-lg transition cursor-pointer"
                      >
                        {item.quantity === 1 ? <Trash2 className="w-3 h-3 text-red-400" /> : <Minus className="w-3 h-3" />}
                      </button>
                      <span className="w-6 text-center text-xs font-black text-amber-400">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-700 rounded-lg transition cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Clear Bag */}
                <div className="text-right">
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-zinc-500 hover:text-red-400 transition cursor-pointer"
                  >
                    Clear entire bag
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer & Bill Breakdown */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-zinc-800 bg-zinc-900/95 space-y-3">
              {/* Bill Details */}
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Item Subtotal</span>
                  <span className="text-white font-semibold">₹{subtotal}</span>
                </div>

                {isDiscountUnlocked && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Special 5% Foodie Discount
                    </span>
                    <span>- ₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Takeaway Food Packaging</span>
                  <span className="text-emerald-400 font-semibold">FREE (₹0)</span>
                </div>

                <div className="flex justify-between">
                  <span>Store Pickup (Self-Collection)</span>
                  <span className="text-emerald-400 font-semibold">FREE (₹0)</span>
                </div>

                <div className="border-t border-zinc-800 pt-2 flex justify-between text-sm sm:text-base font-black text-white">
                  <span>Total Payable:</span>
                  <span className="text-amber-400 text-lg">₹{finalTotal}</span>
                </div>
              </div>

              {/* Pickup Note */}
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-2.5 text-[11px] text-orange-300 flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0 text-orange-400" />
                <span>
                  <strong>Pick Up at Shop:</strong> Ready in ~15 mins from our {selectedBranch.shortName} counter!
                </span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full bg-gradient-to-r from-orange-600 via-orange-500 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-extrabold py-3.5 rounded-xl text-sm shadow-xl shadow-orange-950/80 flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-98"
              >
                <span>Proceed to Order Booking</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
