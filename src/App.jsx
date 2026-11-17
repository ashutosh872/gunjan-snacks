import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import TimingNotice from './components/TimingNotice';
import SearchAndFilters from './components/SearchAndFilters';
import FoodCard from './components/FoodCard';
import FoodieMoodQuiz from './components/FoodieMoodQuiz';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderTrackerModal from './components/OrderTrackerModal';
import BranchInfoModal from './components/BranchInfoModal';
import Footer from './components/Footer';
import OriginalBlueprintView from './components/OriginalBlueprintView';

import { menuItems } from './data/menuData';
import { branches } from './data/branchesData';
import { calculateCartTotals } from './utils/discountCalculator';
import { ensureDummyOrdersExist } from './utils/dummyOrderSeed';
import { ShoppingBag, ArrowRight, Percent, Sparkles, Flame, CheckCircle2, UtensilsCrossed, Smartphone } from 'lucide-react';

export default function App() {
  // Selected Branch (2 Locations)
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  // Social Table / Dine-in State
  const [selectedTable, setSelectedTable] = useState('Table 1');
  const [isTableOrderMode, setIsTableOrderMode] = useState(false);

  // Dual Experience View Mode: 'original' (gunjansnacks.in blueprint) vs 'modern' (social table app)
  const [activeView, setActiveView] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'modern') return 'modern';
      if (params.get('view') === 'original') return 'original';
      const saved = localStorage.getItem('gunjan_snacks_view');
      return saved || 'original';
    } catch {
      return 'original';
    }
  });

  const handleToggleView = (view) => {
    setActiveView(view);
    try {
      localStorage.setItem('gunjan_snacks_view', view);
      const url = new URL(window.location);
      url.searchParams.set('view', view);
      window.history.replaceState({}, '', url);
    } catch (e) {}
    showToast(
      view === 'original'
        ? '🏛️ Switched to Original Blueprint View (gunjansnacks.in)'
        : '⚡ Switched to Smart Table Dine-in App View'
    );
  };

  // Cart State (Persisted in localStorage for convenience)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('gunjan_snacks_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gunjan_snacks_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  // Check URL parameters for mobile scanner visits
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === 'table_order' || params.get('scan') === 'table') {
        setIsTableOrderMode(true);
        if (params.get('table')) {
          setSelectedTable(params.get('table'));
        }
        showToast('🪑 Table Dine-in Mode Active! Select your dishes below.');
        setTimeout(() => {
          const el = document.getElementById('menu-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    } catch (e) {}
  }, []);

  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [spiceFilter, setSpiceFilter] = useState('all');
  const [onlyDiscountEligible, setOnlyDiscountEligible] = useState(false);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMoodQuizOpen, setIsMoodQuizOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);

  // Initialize dummy orders on startup
  useEffect(() => {
    ensureDummyOrdersExist();
  }, []);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Cart Handlers
  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to bag! 🍢`);
  };

  const handleUpdateQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity: newQty } : i));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAddCombo = (items) => {
    items.forEach(item => {
      handleAddToCart(item);
    });
    setIsCartOpen(true);
    showToast(`Platter combo added to bag! 🎉`);
  };

  // Quick Search from Hero
  const handleQuickSearch = (query) => {
    setSearchQuery(query);
    const element = document.getElementById('menu-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Start Table Order flow
  const handleStartTableOrder = () => {
    setIsTableOrderMode(true);
    showToast(`🪑 Table Dine-in Mode Active! Pick your dishes below.`);
    const element = document.getElementById('menu-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered Menu Items
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Discount eligibility filter (> ₹100)
      if (onlyDiscountEligible && item.price <= 100) {
        return false;
      }

      // Spice filter
      if (spiceFilter !== 'all') {
        const itemSpice = item.spiceLevel.toLowerCase();
        if (spiceFilter === 'mild' && !itemSpice.includes('mild') && !itemSpice.includes('plain')) return false;
        if (spiceFilter === 'medium' && !itemSpice.includes('medium') && !itemSpice.includes('spiced')) return false;
        if (spiceFilter === 'spicy' && !itemSpice.includes('spicy') && !itemSpice.includes('hot') && !itemSpice.includes('teekh')) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCategory = item.subCategory.toLowerCase().includes(q);
        const matchesTags = item.tags?.some(t => t.toLowerCase().includes(q));
        return matchesName || matchesDesc || matchesCategory || matchesTags;
      }

      return true;
    });
  }, [activeCategory, onlyDiscountEligible, spiceFilter, searchQuery]);

  const {
    subtotal,
    qualifyingItemsCount,
    isDiscountUnlocked,
    itemsNeeded,
    finalTotal
  } = calculateCartTotals(cartItems);

  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-orange-600 text-white font-extrabold px-4 py-2.5 rounded-full shadow-2xl text-xs sm:text-sm flex items-center gap-2 animate-bounce border border-orange-400">
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* VIEW CONDITIONAL: 'original' vs 'modern' */}
      {activeView === 'original' ? (
        <OriginalBlueprintView
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onToggleView={handleToggleView}
          activeView={activeView}
          onSwitchToTableOrder={() => {
            handleToggleView('modern');
            handleStartTableOrder();
          }}
        />
      ) : (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col font-sans selection:bg-orange-500 selection:text-white pb-20 sm:pb-0">
          {/* Navbar */}
          <Navbar
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
            cartItems={cartItems}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenOrdersModal={() => setIsOrdersModalOpen(true)}
            onOpenBranchModal={() => setIsBranchModalOpen(true)}
            onToggleView={handleToggleView}
            activeView={activeView}
          />

          {/* Hero Banner with Foodie Copy & In-Built Live Mobile QR Scanner Stand */}
          <HeroBanner
            onQuickSearch={handleQuickSearch}
            selectedBranch={selectedBranch}
            onOpenBranchModal={() => setIsBranchModalOpen(true)}
            onStartTableOrder={handleStartTableOrder}
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
          />

          {/* Timing Notice: Evening 5:00 PM to 11:30 PM & Takeaway Pickup */}
          <TimingNotice
            selectedBranch={selectedBranch}
            onOpenBranchModal={() => setIsBranchModalOpen(true)}
          />

          {/* Social Table Order Dine-in Bar */}
          <div id="table-ordering-bar" className="max-w-7xl mx-auto px-4 sm:px-6 pt-2 pb-1 w-full">
            <div className="bg-gradient-to-r from-orange-950/70 via-zinc-900 to-amber-950/70 border border-orange-500/50 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center font-black text-2xl text-white shrink-0 shadow-lg shadow-orange-950/60">
                  🪑
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase font-black tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      SOCIAL TABLE DINE-IN
                    </span>
                    <span className="text-xs text-zinc-400">Visit • Scan • Book • Get Served on Table</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                    Ordering for: <span className="text-amber-400 underline decoration-orange-500 decoration-2">{selectedTable}</span>
                    <span className="text-xs text-zinc-400 font-normal ml-2">({selectedBranch.shortName})</span>
                  </h3>
                  <p className="text-xs text-zinc-300">
                    Choose food from menu below • Add 3 items &gt;₹100 for <strong className="text-yellow-400">5% OFF</strong> • Fresh hot food served directly to your table!
                  </p>
                </div>
              </div>

              {/* Table Switcher Pills */}
              <div className="flex flex-wrap items-center gap-1.5 justify-center sm:justify-end w-full md:w-auto">
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider mr-1">Switch:</span>
                {['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Takeaway Counter'].map(tbl => (
                  <button
                    key={tbl}
                    onClick={() => {
                      setSelectedTable(tbl);
                      setIsTableOrderMode(true);
                      showToast(`Switched to ${tbl}!`);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      selectedTable === tbl
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-950 border border-orange-400 transform scale-105'
                        : 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/60'
                    }`}
                  >
                    {tbl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Bar & Category Navigation */}
          <SearchAndFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            spiceFilter={spiceFilter}
            setSpiceFilter={setSpiceFilter}
            onlyDiscountEligible={onlyDiscountEligible}
            setOnlyDiscountEligible={setOnlyDiscountEligible}
            onOpenMoodQuiz={() => setIsMoodQuizOpen(true)}
          />

          {/* Menu Grid */}
          <main id="menu-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
            {filteredItems.length === 0 ? (
              <div className="text-center py-16 space-y-3 bg-zinc-900/40 rounded-3xl border border-zinc-800">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800 text-zinc-500 flex items-center justify-center mx-auto">
                  <Flame className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-white">No mouthwatering items found</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Try searching for "malai", "momos", "nutri kulche", "biryani", or reset your filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                    setSpiceFilter('all');
                    setOnlyDiscountEligible(false);
                  }}
                  className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredItems.map(item => {
                  const inCart = cartItems.find(i => i.id === item.id);
                  return (
                    <FoodCard
                      key={item.id}
                      item={item}
                      quantityInCart={inCart ? inCart.quantity : 0}
                      onAdd={handleAddToCart}
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  );
                })}
              </div>
            )}
          </main>

          {/* Mobile Floating Cart Summary Bar */}
          {totalItemCount > 0 && (
            <div className="sm:hidden fixed bottom-3 left-3 right-3 z-40 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-3 shadow-2xl shadow-orange-950 flex items-center justify-between text-white border border-orange-400/40">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-black/30 flex items-center justify-center font-black text-sm">
                  {totalItemCount}
                </div>
                <div>
                  <div className="text-xs font-black text-white">₹{finalTotal} Total • {selectedTable}</div>
                  <div className="text-[10px] text-amber-200">
                    {isDiscountUnlocked ? '★ 5% Discount Applied!' : `${itemsNeeded} more for 5% OFF`}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-white text-orange-600 font-extrabold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow"
              >
                <span>View Bag</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Footer */}
          <Footer
            onOpenQrModal={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              showToast('📸 Scan the Live QR on the Hero Banner!');
            }}
            onOpenBranchModal={() => setIsBranchModalOpen(true)}
          />
        </div>
      )}

      {/* Persistent Floating Experience Switcher (Always accessible) */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-[#2B1B12] text-[#FFF8EC] p-1.5 rounded-full shadow-2xl border-2 border-amber-600/60 flex items-center gap-1 backdrop-blur-md">
          <button
            onClick={() => handleToggleView('original')}
            className={`px-3 py-1.5 rounded-full font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeView === 'original'
                ? 'bg-[#2F6B3F] text-white shadow-md'
                : 'text-zinc-300 hover:text-white'
            }`}
            title="Switch to original gunjansnacks.in blueprint"
          >
            <span>🏛️</span>
            <span className="hidden sm:inline">Original Blueprint</span>
          </button>
          <button
            onClick={() => handleToggleView('modern')}
            className={`px-3 py-1.5 rounded-full font-bold text-xs transition-all flex items-center gap-1.5 ${
              activeView === 'modern'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-zinc-300 hover:text-white'
            }`}
            title="Switch to modern social table dine-in app"
          >
            <span>⚡</span>
            <span className="hidden sm:inline">Smart Table App</span>
          </button>
        </div>
      </div>

      {/* Shared Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        selectedBranch={selectedBranch}
        onOpenBranchModal={() => setIsBranchModalOpen(true)}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
        onOrderSuccess={(order) => {
          setCartItems([]);
          showToast(`Order Booked! Token: ${order.token} 🎉`);
        }}
      />

      <FoodieMoodQuiz
        isOpen={isMoodQuizOpen}
        onClose={() => setIsMoodQuizOpen(false)}
        onAddCombo={handleAddCombo}
      />

      <OrderTrackerModal
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
        onExploreMenu={() => {
          const element = document.getElementById('menu-section');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <BranchInfoModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
        selectedBranch={selectedBranch}
        onSelectBranch={(branch) => {
          setSelectedBranch(branch);
          showToast(`Pickup outlet switched to ${branch.shortName}!`);
        }}
      />
    </>
  );
}
