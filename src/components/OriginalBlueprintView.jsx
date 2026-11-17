import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Phone, 
  MapPin, 
  Clock, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  X, 
  ExternalLink, 
  Check, 
  Star, 
  Flame, 
  Sparkles, 
  UtensilsCrossed, 
  Percent,
  MessageCircle,
  ChevronRight,
  SlidersHorizontal,
  Calendar,
  Layers,
  HelpCircle,
  FileText
} from 'lucide-react';
import { menuItems } from '../data/menuData';
import { branches, SHOP_HOTLINE_PHONE } from '../data/branchesData';
import { calculateCartTotals } from '../utils/discountCalculator';
import { getFoodFallbackImage } from '../utils/imageFallback';

export default function OriginalBlueprintView({
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onToggleView,
  activeView,
  onSwitchToTableOrder
}) {
  // Navigation & Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuCardModalOpen, setIsMenuCardModalOpen] = useState(false);
  
  // Selected Branch for Contact & Order
  const [selectedOutlet, setSelectedOutlet] = useState('vijay-enclave');
  
  // Cart Form State
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [pickupDate, setPickupDate] = useState('Today');
  const [pickupTime, setPickupTime] = useState('7:30 PM');
  const [chefNotes, setChefNotes] = useState('');

  // Menu Category Filter
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [menuSearch, setMenuSearch] = useState('');
  const [spiceFilter, setSpiceFilter] = useState('all');

  // Active Map Preview Tab
  const [mapOutlet, setMapOutlet] = useState('vijay-enclave');

  // Filtered Menu
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'chaps' && item.category !== 'chaps') return false;
        if (selectedCategory === 'momos' && item.category !== 'momos') return false;
        if (selectedCategory === 'nutri' && item.category !== 'nutri') return false;
        if (selectedCategory === 'rolls' && !item.name.toLowerCase().includes('roll') && item.category !== 'breads') return false;
        if (selectedCategory === 'biryani' && item.category !== 'biryani') return false;
        if (selectedCategory === 'breads' && item.category !== 'breads') return false;
        if (selectedCategory === 'coolers' && item.category !== 'beverages' && !item.name.toLowerCase().includes('kulfi')) return false;
      }
      // Search
      if (menuSearch.trim()) {
        const q = menuSearch.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q);
        const matchCat = item.subCategory?.toLowerCase().includes(q);
        if (!matchName && !matchDesc && !matchCat) return false;
      }
      // Spice
      if (spiceFilter !== 'all') {
        if (spiceFilter === 'mild' && !item.spiceLevel?.toLowerCase().includes('mild') && !item.spiceLevel?.toLowerCase().includes('creamy')) return false;
        if (spiceFilter === 'spicy' && !item.spiceLevel?.toLowerCase().includes('spic')) return false;
      }
      return true;
    });
  }, [selectedCategory, menuSearch, spiceFilter]);

  // Cart Calculations
  const cartTotals = useMemo(() => calculateCartTotals(cartItems), [cartItems]);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Best Sellers (Subset for showcase)
  const bestSellers = useMemo(() => {
    return [
      {
        id: 'chap-afghani',
        name: 'Afghani Chaap',
        desc: 'Succulent soya chaap marinated in creamy afghani sauce, grilled to smoky perfection.',
        image: menuItems.find(i => i.id === 'chap-afghani')?.image || '/images/afghani-chaap.jpg',
        priceHalf: 110,
        priceFull: 200,
        tags: ['BEST SELLER', 'CREAMY'],
        originalItem: menuItems.find(i => i.id === 'chap-afghani')
      },
      {
        id: 'chap-malai',
        name: 'Tandoori Malai Chaap',
        desc: 'Soft, rich malai-marinated soya chaap with a delicate creaminess — melt-in-mouth good.',
        image: menuItems.find(i => i.id === 'chap-malai')?.image || '/images/tandoori-malai-chaap.jpg',
        priceHalf: 110,
        priceFull: 200,
        tags: ['CREAMY', 'VEG'],
        originalItem: menuItems.find(i => i.id === 'chap-malai')
      },
      {
        id: 'chap-tandoori-masala',
        name: 'Delhi Masala Chaap',
        desc: 'Bold spice-rubbed chaap grilled over high heat — deeply smoky and dangerously tasty.',
        image: menuItems.find(i => i.id === 'chap-tandoori-masala')?.image || '/images/delhi-masala-chaap.jpg',
        priceHalf: 110,
        priceFull: 200,
        tags: ['SPICY', 'TANDOORI'],
        originalItem: menuItems.find(i => i.id === 'chap-tandoori-masala')
      },
      {
        id: 'momos-tandoori',
        name: 'Tandoori Soya Momos',
        desc: 'Plump pure veg dumplings charred in clay tandoor with spicy tikka marination.',
        image: menuItems.find(i => i.id === 'momos-tandoori')?.image || '/images/tandoori-momos.jpg',
        priceHalf: 120,
        priceFull: 220,
        tags: ['BEST SELLER', 'SPICY'],
        originalItem: menuItems.find(i => i.id === 'momos-tandoori')
      },
      {
        id: 'momos-kurkure',
        name: 'Kurkure Crunchy Momos',
        desc: 'Double crunchy outer crust with juicy seasoned soya filling. Served with garlic dip.',
        image: menuItems.find(i => i.id === 'momos-kurkure')?.image || '/images/kurkure-soya-momos.jpg',
        priceHalf: 120,
        priceFull: 220,
        tags: ['CRUNCHY', 'FAVOURITE'],
        originalItem: menuItems.find(i => i.id === 'momos-kurkure')
      },
      {
        id: 'nutri-amritsari',
        name: 'Amritsari Nutri Kulche',
        desc: 'Rich buttery slow-cooked nutri chunks served with double butter toasted kulchas.',
        image: menuItems.find(i => i.id === 'nutri-amritsari')?.image || '/images/amritsari-nutri-kulche.jpg',
        priceHalf: 120,
        priceFull: 220,
        tags: ['SIGNATURE', 'PUNJABI'],
        originalItem: menuItems.find(i => i.id === 'nutri-amritsari')
      }
    ];
  }, []);

  // WhatsApp Checkout Handler
  const handleSendWhatsAppOrder = (e) => {
    e?.preventDefault();
    if (cartItems.length === 0) {
      alert('Your cart is empty! Please add some delicious snacks first.');
      return;
    }
    if (!custName.trim() || !custPhone.trim()) {
      alert('Please provide your name and 10-digit mobile number so we can prepare your order.');
      return;
    }

    const outletObj = selectedOutlet === 'vijay-enclave' ? branches[0] : branches[1];
    const targetPhone = SHOP_HOTLINE_PHONE; // Dispatches to primary owner 9310681373

    let text = `*GUNJAN SNACKS - NEW ORDER INQUIRY*\n`;
    text += `------------------------------------\n`;
    text += `*Customer:* ${custName.trim()}\n`;
    text += `*Phone:* ${custPhone.trim()}\n`;
    text += `*Outlet:* ${outletObj.name}\n`;
    text += `*Pickup Time:* ${pickupDate} at ${pickupTime}\n`;
    text += `------------------------------------\n`;
    text += `*ITEMS ORDERED:*\n`;
    cartItems.forEach((item, index) => {
      text += `${index + 1}. ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    text += `------------------------------------\n`;
    text += `*Subtotal:* ₹${cartTotals.subtotal}\n`;
    if (cartTotals.discountAmount > 0) {
      text += `*5% Special Discount:* -₹${cartTotals.discountAmount}\n`;
    }
    text += `*Total Amount:* ₹${cartTotals.totalAmount}\n`;
    if (chefNotes.trim()) {
      text += `*Special Note:* ${chefNotes.trim()}\n`;
    }
    text += `------------------------------------\n`;
    text += `Sent from Gunjan Snacks Website (gunjansnacks.in blueprint). Please confirm my pickup order!`;

    const waUrl = `https://wa.me/91${targetPhone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FFF8EC] text-[#2B1B12] font-['Nunito',sans-serif] selection:bg-[#2F6B3F] selection:text-white">
      
      {/* 1. TOP DUAL-MODE TOGGLE & NOTICE BANNER */}
      <div className="bg-[#402315] text-[#FFF8EC] text-xs py-2 px-4 shadow-md sticky top-0 z-50">
        <div className="max-w-[1120px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold tracking-wide">
              Viewing: <strong>Original Website Blueprint</strong> (<span className="text-amber-300">gunjansnacks.in</span>)
            </span>
            <span className="hidden md:inline text-zinc-400">|</span>
            <span className="hidden md:inline text-zinc-300">
              Evening Specials: 5:00 PM – 11:30 PM • Hotline: +91 93106 81373
            </span>
          </div>

          {/* Prominent Switcher Pill */}
          <div className="flex items-center bg-[#2B1B12] p-1 rounded-full border border-amber-900/50 shadow-inner">
            <button
              onClick={() => onToggleView('original')}
              className={`px-3 py-1 rounded-full font-bold text-xs transition-all flex items-center gap-1.5 ${
                activeView === 'original'
                  ? 'bg-[#2F6B3F] text-white shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>🏛️</span>
              <span>Original Blueprint</span>
            </button>
            <button
              onClick={() => onToggleView('modern')}
              className={`px-3 py-1 rounded-full font-bold text-xs transition-all flex items-center gap-1.5 ${
                activeView === 'modern'
                  ? 'bg-orange-600 text-white shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>⚡</span>
              <span>Smart Table-Dine App</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. STICKY HEADER & NAVBAR (Matching gunjansnacks.in) */}
      <header className="sticky top-[38px] z-40 bg-[#FFF8EC]/95 backdrop-blur-md border-b border-[#E7D7C3] transition-all">
        <div className="max-w-[1120px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Brand Logo with Chef Hat */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9F2F25] to-[#C96F3A] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <div className="font-['Sora',sans-serif] font-black text-xl tracking-tight text-[#402315] leading-none">
                Gunjan Snacks
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#9F2F25]"></span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9F2F25]">
                  100% PURE VEG
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 font-['Sora',sans-serif] text-sm font-semibold text-[#402315]">
            <a href="#home" className="hover:text-[#2F6B3F] transition-colors">Home</a>
            <a href="#bestsellers" className="hover:text-[#2F6B3F] transition-colors">Best Sellers</a>
            <a href="#menu" className="hover:text-[#2F6B3F] transition-colors">Menu</a>
            <a href="#gallery" className="hover:text-[#2F6B3F] transition-colors">Gallery</a>
            <a href="#contact" className="hover:text-[#2F6B3F] transition-colors">Contact</a>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Red Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#9F2F25] hover:bg-[#85251C] text-white px-3.5 py-2 rounded-full font-['Sora',sans-serif] text-xs font-bold flex items-center gap-1.5 shadow-sm hover:shadow transition-all group"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
              <span className="bg-white text-[#9F2F25] w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black group-hover:scale-110 transition-transform">
                {cartCount}
              </span>
            </button>

            {/* Green WhatsApp Order Now Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#2F6B3F] hover:bg-[#244B2F] text-white px-4 py-2 rounded-full font-['Sora',sans-serif] text-xs font-bold flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span className="hidden sm:inline">Order Now</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION (Exact Blueprint from gunjansnacks.in) */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#FFF8EC] via-[#F8EFE1] to-[#FFF8EC] pt-8 pb-16 px-4 border-b border-[#E7D7C3]">
        <div className="max-w-[1120px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (Copy & CTAs) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#402315] text-[#FFF8EC] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>PREPARED FRESH DAILY IN DELHI</span>
            </div>

            {/* Main Title */}
            <h1 className="font-['Sora',sans-serif] text-3xl sm:text-4xl md:text-5xl font-black text-[#402315] leading-[1.15] tracking-tight">
              Fresh veg snacks <br className="hidden sm:inline" />
              and meals <span className="text-[#C96F3A]">made with real taste.</span>
            </h1>

            {/* Subheading */}
            <p className="font-['Sora',sans-serif] text-[#C96F3A] font-bold text-base sm:text-lg">
              Evening cravings • Family meals • Homemade-style comfort
            </p>

            {/* Paragraph Description */}
            <p className="text-[#715F50] text-sm sm:text-base leading-relaxed max-w-xl">
              Warm 100% veg chaap, paneer tikka, momos, kulche and thali prepared hygienically for local families near Uttam Nagar and Mahavir Enclave.
            </p>

            {/* Tagline */}
            <p className="text-xs sm:text-sm font-semibold text-[#402315] italic border-l-2 border-[#C96F3A] pl-3 py-0.5">
              — Fresh daily, clean preparation, traditional Delhi flavour.
            </p>

            {/* Fresh Today Highlights Pill */}
            <div className="bg-white/80 border border-[#E7D7C3] rounded-xl p-2.5 inline-block text-xs font-bold text-[#402315] shadow-sm">
              <span className="text-[#9F2F25]">Fresh Today:</span> Afghani Chaap • Tandoori Momos • Paneer Tikka
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-[#2F6B3F] hover:bg-[#244B2F] text-white px-6 py-3 rounded-full font-['Sora',sans-serif] font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order on WhatsApp</span>
              </button>

              <a
                href="#menu"
                className="bg-transparent border border-[#402315] text-[#402315] hover:bg-[#402315] hover:text-white px-6 py-3 rounded-full font-['Sora',sans-serif] font-bold text-sm transition-all"
              >
                Explore Menu
              </a>

              {/* Enhanced Quick Switch to Table Order */}
              <button
                onClick={onSwitchToTableOrder}
                className="bg-amber-100/80 hover:bg-amber-200/90 text-[#402315] border border-amber-300 px-4 py-2.5 rounded-full font-['Sora',sans-serif] font-bold text-xs flex items-center gap-1.5 transition-all"
                title="Switch to Table Dine-In Mode"
              >
                <span>🪑 Dine-in Table Mode</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom Trust Badges */}
            <div className="pt-3 flex flex-wrap gap-2 text-xs font-bold text-[#715F50]">
              <span className="bg-white/90 border border-[#E7D7C3] px-3 py-1 rounded-full">✓ Fresh food</span>
              <span className="bg-white/90 border border-[#E7D7C3] px-3 py-1 rounded-full">✓ Homemade taste</span>
              <span className="bg-white/90 border border-[#E7D7C3] px-3 py-1 rounded-full">✓ Hygienic kitchen</span>
              <span className="bg-white/90 border border-[#E7D7C3] px-3 py-1 rounded-full">✓ Family-friendly</span>
            </div>

          </div>

          {/* Right Column (Layered Food Card Stack) */}
          <div className="lg:col-span-5 relative flex justify-center py-4">
            
            {/* Primary Top Card */}
            <div className="relative w-full max-w-[340px] bg-white rounded-3xl p-3.5 shadow-xl border border-[#E7D7C3] transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-[#F8EFE1]">
                <img
                  src={menuItems[0]?.image || '/images/tandoori-malai-chaap.jpg'}
                  alt="Tandoori Malai Chaap"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 right-2.5 bg-[#9F2F25] text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                  100% PURE VEG
                </span>
              </div>

              {/* Card Pills & Content */}
              <div className="pt-3 space-y-2">
                <div className="flex flex-wrap gap-1">
                  <span className="bg-[#FFF8EC] border border-[#E7D7C3] text-[10px] font-bold text-[#402315] px-2 py-0.5 rounded-full">
                    Prepared fresh daily
                  </span>
                  <span className="bg-[#FFF8EC] border border-[#E7D7C3] text-[10px] font-bold text-[#402315] px-2 py-0.5 rounded-full">
                    Clean veg kitchen
                  </span>
                  <span className="bg-[#FFF8EC] border border-[#E7D7C3] text-[10px] font-bold text-[#402315] px-2 py-0.5 rounded-full">
                    Comfort food for families
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <h3 className="font-['Sora',sans-serif] font-bold text-base text-[#402315]">
                      Tandoori Malai Chaap
                    </h3>
                    <p className="text-xs text-[#9F2F25] font-bold">Family favourite • ₹120</p>
                  </div>
                  <button
                    onClick={() => onAddToCart(menuItems[0])}
                    className="bg-[#2F6B3F] hover:bg-[#244B2F] text-white p-2 rounded-full shadow transition-all"
                    title="Add to Cart"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Overlapping Staggered Secondary Card */}
            <div className="hidden sm:block absolute -bottom-6 -left-4 w-60 bg-white rounded-2xl p-2.5 shadow-2xl border border-[#E7D7C3] transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="h-28 w-full rounded-xl overflow-hidden bg-[#F8EFE1]">
                <img
                  src={menuItems[10]?.image || '/images/tandoori-momos.jpg'}
                  alt="Tandoori Momos"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <h4 className="font-['Sora',sans-serif] font-bold text-xs text-[#402315]">
                    Tandoori Momos (8 Pcs)
                  </h4>
                  <p className="text-[10px] text-[#C96F3A] font-bold">Fresh today • ₹120</p>
                </div>
                <button
                  onClick={() => onAddToCart(menuItems[10])}
                  className="bg-[#9F2F25] text-white p-1 rounded-full shadow"
                  title="Add to Cart"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. BEST SELLERS / SPECIALS SECTION (Exact Blueprint) */}
      <section id="bestsellers" className="py-16 px-4 max-w-[1120px] mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#9F2F25]">
            SPECIALS / BESTSELLERS
          </span>
          <h2 className="font-['Sora',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#402315]">
            Fresh homemade snacks in Delhi, loved by regulars
          </h2>
          <p className="text-sm text-[#715F50]">
            Clean, warm, filling favourites for evening cravings, family snacks and quick meals.
          </p>
        </div>

        {/* Best Sellers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSellers.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-[#E7D7C3] flex flex-col justify-between transition-all group"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden bg-[#F8EFE1]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Veg mark */}
                  <div className="absolute top-2.5 left-2.5 bg-white px-2 py-0.5 rounded flex items-center gap-1 shadow">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span className="text-[10px] font-bold text-zinc-800">VEG</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="bg-[#FFF8EC] border border-[#E7D7C3] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded text-[#402315]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-['Sora',sans-serif] font-bold text-lg text-[#402315]">
                    {item.name}
                  </h3>

                  <p className="text-xs text-[#715F50] leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="p-4 pt-2 border-t border-[#F8EFE1] flex items-center justify-between">
                <div>
                  <span className="font-['Sora',sans-serif] font-black text-lg text-[#402315]">
                    ₹{item.priceHalf}
                  </span>
                  <span className="text-xs text-[#715F50] ml-1">/ Portion</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (item.originalItem) {
                        onAddToCart(item.originalItem);
                      }
                    }}
                    className="bg-[#402315] hover:bg-[#2B1B12] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>

                  <button
                    onClick={() => {
                      if (item.originalItem) {
                        onAddToCart(item.originalItem);
                        setIsCartOpen(true);
                      }
                    }}
                    className="bg-[#2F6B3F] hover:bg-[#244B2F] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BEHIND THE KITCHEN & PILLARS */}
      <section className="bg-[#F8EFE1] py-14 px-4 border-y border-[#E7D7C3]">
        <div className="max-w-[1120px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="font-['Sora',sans-serif] text-xl sm:text-2xl font-bold text-[#402315] leading-relaxed">
              "From creamy chaap to paneer tikka, momos, kulche and thali, every order is treated like food going to someone we know."
            </h2>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 text-center border border-[#E7D7C3] shadow-sm">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#9F2F25] block mb-1">Veg</span>
              <h4 className="font-['Sora',sans-serif] font-bold text-sm text-[#402315]">100% Pure Veg</h4>
              <p className="text-xs text-[#715F50] mt-0.5">Vegetarian kitchen</p>
            </div>

            <div className="bg-white rounded-2xl p-4 text-center border border-[#E7D7C3] shadow-sm">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#C96F3A] block mb-1">Hot</span>
              <h4 className="font-['Sora',sans-serif] font-bold text-sm text-[#402315]">Made Fresh Daily</h4>
              <p className="text-xs text-[#715F50] mt-0.5">Prepared in small batches</p>
            </div>

            <div className="bg-white rounded-2xl p-4 text-center border border-[#E7D7C3] shadow-sm">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#2F6B3F] block mb-1">₹</span>
              <h4 className="font-['Sora',sans-serif] font-bold text-sm text-[#402315]">Family Friendly</h4>
              <p className="text-xs text-[#715F50] mt-0.5">Comfort food for everyone</p>
            </div>

            <div className="bg-white rounded-2xl p-4 text-center border border-[#E7D7C3] shadow-sm">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#E9B85B] block mb-1">40+</span>
              <h4 className="font-['Sora',sans-serif] font-bold text-sm text-[#402315]">Local Favourite</h4>
              <p className="text-xs text-[#715F50] mt-0.5">Snacks near Uttam Nagar</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FULL MENU WITH CATEGORY TABS + ENHANCED LIVE SEARCH & FILTERS */}
      <section id="menu" className="py-16 px-4 max-w-[1120px] mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-[#9F2F25]">
            SNACKS • MEALS • SWEETS • SPECIALS
          </span>
          <h2 className="font-['Sora',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#402315]">
            Menu for fresh homemade food near Uttam Nagar
          </h2>
          <p className="text-sm text-[#715F50]">
            Browse quick snacks, filling meals and seasonal sweets. Tap any item to ask availability and price on WhatsApp or add to cart.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsMenuCardModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-white border border-[#402315] hover:bg-[#402315] hover:text-white text-[#402315] px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>📷 View Printed Menu Card Photo</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'chaps', label: '🍢 Soya Chaap' },
            { id: 'momos', label: '🥟 Momos Junction' },
            { id: 'nutri', label: '🫓 Nutri Kulche' },
            { id: 'biryani', label: '🍚 Biryani' },
            { id: 'breads', label: '🥖 Breads & Roti' },
            { id: 'coolers', label: '🥤 Chaach & Kulfi' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-['Sora',sans-serif] text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#2F6B3F] text-white shadow-md'
                  : 'bg-white text-[#402315] hover:bg-[#F8EFE1] border border-[#E7D7C3]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Search & Filter Bar (Improvement Feature) */}
        <div className="bg-white rounded-2xl p-3 border border-[#E7D7C3] shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search dishes (e.g. malai chaap, momos)..."
              value={menuSearch}
              onChange={(e) => setMenuSearch(e.target.value)}
              className="w-full bg-[#FFF8EC] border border-[#E7D7C3] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#2B1B12] focus:outline-none focus:border-[#2F6B3F]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs font-bold text-[#715F50]">Spice:</span>
            {['all', 'mild', 'spicy'].map((spice) => (
              <button
                key={spice}
                onClick={() => setSpiceFilter(spice)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                  spiceFilter === spice
                    ? 'bg-[#C96F3A] text-white'
                    : 'bg-[#FFF8EC] text-[#715F50] hover:text-[#402315]'
                }`}
              >
                {spice}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-3 border border-[#E7D7C3] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full rounded-xl overflow-hidden bg-[#F8EFE1] mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-white px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span className="text-[10px] font-bold text-zinc-800">100% PURE VEG</span>
                  </div>
                  {item.isBestseller && (
                    <span className="absolute top-2 right-2 bg-[#9F2F25] text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded shadow">
                      ★ Bestseller
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="font-['Sora',sans-serif] font-bold text-base text-[#402315]">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#715F50] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-2 border-t border-[#F8EFE1] flex items-center justify-between">
                <div>
                  <span className="font-['Sora',sans-serif] font-extrabold text-base text-[#402315]">
                    ₹{item.price}
                  </span>
                  <span className="text-[11px] text-[#715F50] ml-1">/ plate</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onAddToCart(item)}
                    className="bg-[#2F6B3F] hover:bg-[#244B2F] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                  <button
                    onClick={() => {
                      onAddToCart(item);
                      setIsCartOpen(true);
                    }}
                    className="bg-[#402315] hover:bg-[#2B1B12] text-white p-1.5 rounded-lg transition-all"
                    title="Order on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PHOTO GALLERY (Exact Blueprint from gunjansnacks.in) */}
      <section id="gallery" className="py-14 px-4 bg-[#F8EFE1] border-y border-[#E7D7C3]">
        <div className="max-w-[1120px] mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <h2 className="font-['Sora',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#402315]">
              Food photos that can grow with the brand
            </h2>
            <p className="text-sm text-[#715F50]">
              Current menu visuals are kept consistent so future real photoshoot images can drop in cleanly.
            </p>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: 'Soya Chaap Platter', img: '/images/afghani-chaap.jpg' },
              { title: 'Paneer Malai Tikka', img: '/images/tandoori-malai-chaap.jpg' },
              { title: 'Tandoori Momos Platter', img: '/images/tandoori-momos.jpg' },
              { title: 'Rumali Roti & Curry', img: '/images/rumali-roti.jpg' },
              { title: 'Amritsari Nutri Kulche', img: '/images/amritsari-nutri-kulche.jpg' },
              { title: 'Dum Biryani Clay Handi', img: '/images/veg-soya-biryani.jpg' }
            ].map((photo, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden shadow-md group h-52 sm:h-64 bg-white border border-[#E7D7C3]"
              >
                <img
                  src={photo.img}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="font-['Sora',sans-serif] font-bold text-sm sm:text-base">
                    {photo.title}
                  </h4>
                  <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                    Pure Veg Street Taste
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FIND US ON GOOGLE & CUSTOMER REVIEWS */}
      <section className="py-14 px-4 max-w-[1120px] mx-auto text-center space-y-6">
        <div>
          <h2 className="font-['Sora',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#402315]">
            Find us on Google
          </h2>
          <p className="text-sm text-[#715F50] mt-1 max-w-xl mx-auto">
            Check the main outlet or C 6 60 Futa Road branch, get directions, or leave a review.
          </p>
        </div>

        {/* Review Action Buttons (Matching gunjansnacks.in) */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://maps.google.com/?q=Gunjan+Snacks+Vijay+Enclave+New+Delhi"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-[#E7D7C3] hover:border-[#2F6B3F] text-[#402315] px-5 py-2.5 rounded-full font-['Sora',sans-serif] text-xs font-bold shadow-sm transition-all flex items-center gap-2"
          >
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-black">G</span>
            <span>Leave a Review</span>
          </a>

          <a
            href="https://maps.google.com/?q=36A+Block+B+Vijay+Enclave+Mahavir+Enclave+New+Delhi"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-[#E7D7C3] hover:border-[#2F6B3F] text-[#402315] px-5 py-2.5 rounded-full font-['Sora',sans-serif] text-xs font-bold shadow-sm transition-all flex items-center gap-2"
          >
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">G</span>
            <span>Main Directions</span>
          </a>

          <a
            href="https://maps.google.com/?q=C+6+60+Futa+Road+Mahavir+Enclave+Part+2+New+Delhi"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-[#E7D7C3] hover:border-[#2F6B3F] text-[#402315] px-5 py-2.5 rounded-full font-['Sora',sans-serif] text-xs font-bold shadow-sm transition-all flex items-center gap-2"
          >
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">G</span>
            <span>Branch Directions</span>
          </a>
        </div>

        {/* 3 Real Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
          <div className="bg-white p-4 rounded-2xl border border-[#E7D7C3] shadow-sm">
            <div className="flex text-amber-500 mb-2">★★★★★</div>
            <p className="text-xs text-[#715F50] italic leading-relaxed">
              "Best Malai Chaap near Mahavir Enclave. Truly melt in mouth with ample butter and cream. Highly recommended!"
            </p>
            <span className="block font-bold text-xs text-[#402315] mt-2">— Gaurav Sharma (Local Guide)</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E7D7C3] shadow-sm">
            <div className="flex text-amber-500 mb-2">★★★★★</div>
            <p className="text-xs text-[#715F50] italic leading-relaxed">
              "The kurkure momos and nutri kulche remind me of Amritsar. Very hygienic packaging and pure veg guarantee."
            </p>
            <span className="block font-bold text-xs text-[#402315] mt-2">— Priya Verma (Family Regular)</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#E7D7C3] shadow-sm">
            <div className="flex text-amber-500 mb-2">★★★★★</div>
            <p className="text-xs text-[#715F50] italic leading-relaxed">
              "WhatsApp order was ready right on time at 8 PM. Piping hot chaap with mint chutney and pickled onions."
            </p>
            <span className="block font-bold text-xs text-[#402315] mt-2">— Rohit Khanna</span>
          </div>
        </div>
      </section>

      {/* 9. CONTACT & OUTLETS SECTION (Exact Blueprint from gunjansnacks.in) */}
      <section id="contact" className="py-16 px-4 bg-[#F8EFE1] border-t border-[#E7D7C3]">
        <div className="max-w-[1120px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-['Sora',sans-serif] text-3xl font-extrabold text-[#402315]">
              Gunjan Snacks
            </h2>

            {/* Phone Outlets */}
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#2F6B3F]/10 text-[#2F6B3F] flex items-center justify-center font-bold text-xs shrink-0">
                Ph
              </span>
              <div className="text-sm">
                <span className="font-bold text-[#402315] block">Phone / WhatsApp Outlets</span>
                <p className="text-[#715F50] mt-0.5">Vijay Enclave: <a href="tel:+919069453542" className="text-[#2F6B3F] font-bold hover:underline">+91 9069453542</a></p>
                <p className="text-[#715F50]">Futa Road (Part 2): <a href="tel:+918813002513" className="text-[#2F6B3F] font-bold hover:underline">+91 8813002513</a> / <a href="tel:+919999039366" className="text-[#2F6B3F] font-bold hover:underline">+91 9999039366</a></p>
                <p className="text-[#9F2F25] font-bold mt-1">Owner Hotline: <a href="tel:+919310681373" className="hover:underline">+91 93106 81373</a></p>
              </div>
            </div>

            {/* Outlets Locations */}
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#C96F3A]/10 text-[#C96F3A] flex items-center justify-center font-bold text-xs shrink-0">
                Adr
              </span>
              <div className="text-sm">
                <span className="font-bold text-[#402315] block">Outlets Locations</span>
                <p className="text-[#715F50] mt-0.5">
                  <strong>Vijay Enclave Outlet:</strong> 36A, Block B, Vijay Enclave, Mahavir Enclave, New Delhi, Delhi 110045
                </p>
                <p className="text-[#715F50] mt-1.5">
                  <strong>Futa Road Outlet:</strong> C 6 60, Futa Road, Part-III, Mahavir Enclave Part 2, Uttam Nagar, New Delhi 110059
                </p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0">
                Hr
              </span>
              <div className="text-sm">
                <span className="font-bold text-[#402315] block">Opening Hours</span>
                <p className="text-[#2F6B3F] font-bold mt-0.5">Open all days: 5:00 PM to 11:30 PM</p>
                <p className="text-xs text-[#715F50]">Evening snacks, meals and takeaway orders</p>
              </div>
            </div>

            {/* Direct Calling & Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href="tel:+919069453542"
                className="bg-[#244B2F] hover:bg-[#1E3F28] text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Vijay Enclave</span>
              </a>

              <a
                href="tel:+918813002513"
                className="bg-[#244B2F] hover:bg-[#1E3F28] text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Futa Road</span>
              </a>

              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-[#2F6B3F] hover:bg-[#244B2F] text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp Order</span>
              </button>
            </div>
          </div>

          {/* Right Interactive Map Preview Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-5 border border-[#E7D7C3] shadow-xl space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-['Sora',sans-serif] font-bold text-base text-[#402315]">
                  {mapOutlet === 'vijay-enclave' ? 'Main Outlet: Vijay Enclave' : 'Branch: C 6 60 Futa Road'}
                </h4>
                <p className="text-xs text-[#715F50]">
                  {mapOutlet === 'vijay-enclave'
                    ? '36A, Block B, Vijay Enclave, Mahavir Enclave'
                    : 'C 6 60, Futa Road Part 2, Uttam Nagar'}
                </p>
              </div>

              {/* Map Outlet Switch Tabs */}
              <div className="flex bg-[#F8EFE1] p-1 rounded-xl">
                <button
                  onClick={() => setMapOutlet('vijay-enclave')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    mapOutlet === 'vijay-enclave'
                      ? 'bg-[#2F6B3F] text-white'
                      : 'text-[#715F50]'
                  }`}
                >
                  Main
                </button>
                <button
                  onClick={() => setMapOutlet('futa-road')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    mapOutlet === 'futa-road'
                      ? 'bg-[#2F6B3F] text-white'
                      : 'text-[#715F50]'
                  }`}
                >
                  Branch
                </button>
              </div>
            </div>

            {/* Map Visual Display */}
            <div className="h-60 rounded-2xl overflow-hidden border border-[#E7D7C3] relative bg-[#FFF8EC]">
              <iframe
                title="Google Maps Outlet Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://maps.google.com/maps?q=${
                  mapOutlet === 'vijay-enclave'
                    ? '36A+Block+B+Vijay+Enclave+Mahavir+Enclave+New+Delhi'
                    : 'C+6+60+Futa+Road+Mahavir+Enclave+Part+2+New+Delhi'
                }&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              ></iframe>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-[#715F50] font-semibold">
                Tap to open turn-by-turn directions:
              </span>
              <a
                href={
                  mapOutlet === 'vijay-enclave'
                    ? 'https://maps.google.com/?q=36A+Block+B+Vijay+Enclave+Mahavir+Enclave+New+Delhi'
                    : 'https://maps.google.com/?q=C+6+60+Futa+Road+Mahavir+Enclave+Part+2+New+Delhi'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2F6B3F] hover:bg-[#244B2F] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow transition-all flex items-center gap-1.5"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 10. DEEP FOREST GREEN FOOTER (Exact Blueprint from gunjansnacks.in) */}
      <footer className="bg-[#1B3822] text-[#FFF8EC] pt-14 pb-8 px-4 border-t border-[#122818]">
        <div className="max-w-[1120px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          
          {/* Brand Bio */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#C96F3A] flex items-center justify-center text-white font-black text-sm">
                GS
              </div>
              <h3 className="font-['Sora',sans-serif] font-bold text-xl text-white">
                Gunjan Snacks
              </h3>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed max-w-sm">
              A warm local 100% veg snacks and meals brand near Uttam Nagar, Mahavir Enclave and C 6 60 Futa Road, Mahavir Enclave Part 2. Fresh daily, hygienically prepared, packed hot, and easy to order on WhatsApp.
            </p>

            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-bold">
              <span className="bg-[#244B2F] border border-white/10 px-2.5 py-0.5 rounded-full text-emerald-200">
                Fresh homemade-style snacks
              </span>
              <span className="bg-[#244B2F] border border-white/10 px-2.5 py-0.5 rounded-full text-amber-200">
                Hygienic veg kitchen
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <h4 className="font-['Sora',sans-serif] font-bold text-sm text-white mb-2">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-zinc-300 font-semibold">
              <li><a href="#home" className="hover:text-amber-300 transition-colors">Home</a></li>
              <li><a href="#bestsellers" className="hover:text-amber-300 transition-colors">Best Sellers</a></li>
              <li><a href="#menu" className="hover:text-amber-300 transition-colors">Full Menu</a></li>
              <li><a href="#gallery" className="hover:text-amber-300 transition-colors">Gallery</a></li>
              <li><a href="#contact" className="hover:text-amber-300 transition-colors">Contact & Outlets</a></li>
            </ul>
          </div>

          {/* View Switcher & Outlets in Footer */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="font-['Sora',sans-serif] font-bold text-sm text-white">
              Dual Experience Switcher
            </h4>
            <p className="text-zinc-300 text-xs">
              Compare our original website blueprint with the modern table dine-in app:
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => onToggleView('modern')}
                className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-xl font-['Sora',sans-serif] font-bold text-xs flex items-center justify-between shadow transition-all"
              >
                <span>⚡ Switch to Smart Table-Dine App</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="max-w-[1120px] mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-2">
          <span>© 2026 Gunjan Snacks. All rights reserved. 100% Pure Veg.</span>
          <span>Hotline: +91 93106 81373 • Delhi Street Swaad</span>
        </div>
      </footer>

      {/* 11. SLIDE-OVER WHATSAPP ORDER CART DRAWER (Exact Blueprint from gunjansnacks.in) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          ></div>

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#FFFDF9] border-l border-[#E7D7C3] shadow-2xl flex flex-col justify-between">
              
              {/* Header */}
              <div className="p-4 border-b border-[#E7D7C3] flex items-center justify-between bg-[#FFF8EC]">
                <div>
                  <h3 className="font-['Sora',sans-serif] font-bold text-lg text-[#402315]">
                    Your Order Cart
                  </h3>
                  <p className="text-xs text-[#715F50]">
                    Add items, share details, then send on WhatsApp.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-white border border-[#E7D7C3] flex items-center justify-center text-zinc-500 hover:text-black shadow-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List & Details Form (Scrollable) */}
              <div className="p-4 overflow-y-auto space-y-4 flex-1">
                
                {/* Empty State */}
                {cartItems.length === 0 ? (
                  <div className="py-12 text-center space-y-3 bg-[#FFF8EC] rounded-2xl border border-dashed border-[#E7D7C3] p-6">
                    <ShoppingBag className="w-12 h-12 text-zinc-300 mx-auto" />
                    <p className="text-sm font-semibold text-[#715F50]">
                      Your cart is empty. Add items from Best Sellers or Full Menu.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="bg-[#2F6B3F] text-white px-4 py-2 rounded-full text-xs font-bold"
                    >
                      Browse Delicious Menu
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-[#E7D7C3] rounded-xl p-3 flex items-center justify-between gap-3 shadow-sm"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover bg-zinc-100"
                          />
                          <div>
                            <h4 className="font-['Sora',sans-serif] font-bold text-xs text-[#402315] leading-tight">
                              {item.name}
                            </h4>
                            <p className="text-xs font-bold text-[#2F6B3F] mt-0.5">
                              ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Adjusters */}
                        <div className="flex items-center gap-1.5 bg-[#FFF8EC] border border-[#E7D7C3] rounded-lg p-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-white flex items-center justify-center text-xs font-bold shadow-sm"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded bg-white flex items-center justify-center text-xs font-bold shadow-sm"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pricing Calculation Box */}
                {cartItems.length > 0 && (
                  <div className="bg-[#FFF8EC] border border-[#E7D7C3] rounded-xl p-3.5 space-y-2">
                    <div className="flex justify-between text-xs text-[#715F50]">
                      <span>Items Subtotal:</span>
                      <span className="font-bold text-[#402315]">₹{cartTotals.subtotal}</span>
                    </div>

                    {cartTotals.discountAmount > 0 ? (
                      <div className="flex justify-between text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded">
                        <span>5% Combo Delight Discount:</span>
                        <span>- ₹{cartTotals.discountAmount}</span>
                      </div>
                    ) : (
                      <div className="text-[11px] text-[#C96F3A] bg-amber-50 px-2 py-1 rounded font-semibold">
                        💡 Add {3 - cartTotals.eligibleItemsCount > 0 ? 3 - cartTotals.eligibleItemsCount : 0} more item(s) &gt; ₹100 for 5% OFF!
                      </div>
                    )}

                    <div className="border-t border-[#E7D7C3] pt-2 flex justify-between items-baseline">
                      <span className="font-['Sora',sans-serif] font-bold text-sm text-[#402315]">Estimated Total:</span>
                      <span className="font-['Sora',sans-serif] font-black text-xl text-[#2F6B3F]">
                        ₹{cartTotals.totalAmount}
                      </span>
                    </div>
                  </div>
                )}

                {/* Customer Details Form (Matching gunjansnacks.in inputs) */}
                {cartItems.length > 0 && (
                  <form onSubmit={handleSendWhatsAppOrder} className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-[#402315] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        className="w-full bg-white border border-[#E7D7C3] rounded-xl px-3 py-2 text-xs text-[#2B1B12] focus:outline-none focus:border-[#2F6B3F]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#402315] mb-1">
                        10-Digit Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="e.g. 9876543210"
                        value={custPhone}
                        onChange={(e) => setCustPhone(e.target.value)}
                        className="w-full bg-white border border-[#E7D7C3] rounded-xl px-3 py-2 text-xs text-[#2B1B12] focus:outline-none focus:border-[#2F6B3F]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#402315] mb-1">
                        Select Outlet / Branch
                      </label>
                      <select
                        value={selectedOutlet}
                        onChange={(e) => setSelectedOutlet(e.target.value)}
                        className="w-full bg-white border border-[#E7D7C3] rounded-xl px-3 py-2 text-xs text-[#2B1B12] focus:outline-none focus:border-[#2F6B3F]"
                      >
                        <option value="vijay-enclave">📍 Vijay Enclave Outlet (+91 9069453542)</option>
                        <option value="futa-road">📍 C 6 60 Futa Road Branch (+91 9999039366)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-bold text-[#402315] mb-1">Pickup Day</label>
                        <select
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          className="w-full bg-white border border-[#E7D7C3] rounded-xl px-2 py-2 text-xs text-[#2B1B12] focus:outline-none focus:border-[#2F6B3F]"
                        >
                          <option value="Today">Today (5-11 PM)</option>
                          <option value="Tomorrow">Tomorrow (5-11 PM)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#402315] mb-1">Pickup Time</label>
                        <select
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="w-full bg-white border border-[#E7D7C3] rounded-xl px-2 py-2 text-xs text-[#2B1B12] focus:outline-none focus:border-[#2F6B3F]"
                        >
                          <option value="ASAP (15-20 Mins)">ASAP (15-20 Mins)</option>
                          <option value="6:00 PM">6:00 PM</option>
                          <option value="7:00 PM">7:00 PM</option>
                          <option value="8:00 PM">8:00 PM</option>
                          <option value="9:00 PM">9:00 PM</option>
                          <option value="10:00 PM">10:00 PM</option>
                          <option value="10:30 PM">10:30 PM</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#402315] mb-1">
                        Chef Instructions (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Extra green chutney, make it mild"
                        value={chefNotes}
                        onChange={(e) => setChefNotes(e.target.value)}
                        className="w-full bg-white border border-[#E7D7C3] rounded-xl px-3 py-2 text-xs text-[#2B1B12] focus:outline-none focus:border-[#2F6B3F]"
                      />
                    </div>
                  </form>
                )}

              </div>

              {/* Bottom Action Footer */}
              {cartItems.length > 0 && (
                <div className="p-4 border-t border-[#E7D7C3] bg-[#FFF8EC] space-y-2">
                  <button
                    onClick={handleSendWhatsAppOrder}
                    className="w-full bg-[#2F6B3F] hover:bg-[#244B2F] text-white py-3 rounded-xl font-['Sora',sans-serif] font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>Send Order on WhatsApp</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-[#715F50] px-1">
                    <span>Dispatches to Hotline: <strong>9310681373</strong></span>
                    <button
                      onClick={onClearCart}
                      className="text-red-700 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Empty Cart</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* 12. PRINTED MENU CARD PHOTO MODAL */}
      {isMenuCardModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#E7D7C3] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7D7C3] pb-3">
              <div>
                <h3 className="font-['Sora',sans-serif] font-bold text-lg text-[#402315]">
                  Gunjan Snacks Printed Menu
                </h3>
                <p className="text-xs text-[#715F50]">
                  Official kitchen price list for Vijay Enclave & Futa Road outlets
                </p>
              </div>
              <button
                onClick={() => setIsMenuCardModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FFF8EC] border border-[#E7D7C3] flex items-center justify-center text-zinc-500 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu Photo Showcase */}
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden border border-[#E7D7C3] bg-[#FFF8EC] p-3 text-center">
                <img
                  src={menuItems[0]?.image || '/images/tandoori-malai-chaap.jpg'}
                  alt="Menu Preview"
                  className="w-full h-56 object-cover rounded-xl"
                />
                <div className="mt-3 text-xs font-bold text-[#402315] flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>100% Shudh Shakahari • Evening Specials: 5:00 PM to 11:30 PM Daily</span>
                </div>
              </div>

              <div className="bg-[#FFF8EC] p-3 rounded-xl border border-[#E7D7C3] text-xs text-[#715F50] space-y-1">
                <p><strong>Hotline & WhatsApp:</strong> +91 93106 81373</p>
                <p><strong>Outlets:</strong> 36A Block B Vijay Enclave & C 6 60 Futa Road Part 2, New Delhi</p>
              </div>
            </div>

            <button
              onClick={() => setIsMenuCardModalOpen(false)}
              className="w-full bg-[#2F6B3F] hover:bg-[#244B2F] text-white py-2.5 rounded-xl font-['Sora',sans-serif] text-xs font-bold"
            >
              Close Menu Card
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
