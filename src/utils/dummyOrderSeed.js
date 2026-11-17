const BASE = import.meta.env.BASE_URL || '/';

export const OWNER_PHONE = '9876500000';
export const DUMMY_CUSTOMER_PHONE = '9812345678';

export const initialDummyOrders = [
  {
    orderId: 'ORD-9812345678-01',
    token: 'GS-4821',
    createdAt: new Date().toISOString(),
    customerName: 'Rahul Sharma',
    customerPhone: '9812345678',
    pickupSlot: 'ASAP (Ready in 15-20 Mins)',
    chefNotes: 'Make Malai Chaap extra creamy, extra green mint chutney and sliced onions please!',
    branch: {
      id: 'branch-1',
      name: 'Gunjan Snacks - Central Plaza (Main Outlet)',
      shortName: 'Outlet 1: Central Plaza',
      area: 'Central Market Food Plaza',
      address: 'Shop No. 14, Central Market Food Plaza, Main Market, New Delhi 110001',
      landmark: 'Opposite Central Fountain & Clock Tower',
      phone: '+91 98765 00000',
      ownerPhone: '9876500000'
    },
    items: [
      {
        id: 'chap-malai',
        name: 'Tandoori Malai Chaap',
        category: 'chaps',
        subCategory: 'Tandoori Chaap',
        price: 120,
        quantity: 1,
        image: `${BASE}images/tandoori-malai-chaap.jpg`
      },
      {
        id: 'momos-kurkure',
        name: 'Kurkure Crunchy Soya Momos (8 Pcs)',
        category: 'momos',
        subCategory: 'Kurkure Momos',
        price: 120,
        quantity: 1,
        image: `${BASE}images/kurkure-soya-momos.jpg`
      },
      {
        id: 'nutri-amritsari',
        name: 'Amritsari Special Nutri Kulche',
        category: 'nutri',
        subCategory: 'Nutri Kulche',
        price: 120,
        quantity: 1,
        image: `${BASE}images/amritsari-nutri-kulche.jpg`
      },
      {
        id: 'bread-rumali-pack-3',
        name: 'Rumali Roti Basket (Pack of 3)',
        category: 'breads',
        subCategory: 'Rumali Roti',
        price: 40,
        quantity: 1,
        image: `${BASE}images/rumali-roti.jpg`
      }
    ],
    subtotal: 400,
    isDiscountUnlocked: true,
    discountAmount: 20, // 5% of 400
    finalTotal: 380,
    paymentMethod: 'upi',
    paymentStatus: 'Online UPI (Verified - Ref: UPI/9812/OKHDFC)',
    upiRefId: 'UPI-9812-4821',
    status: 'Packed & Ready for Pickup',
    estimatedPickup: 'Ready for Counter Collection'
  },
  {
    orderId: 'ORD-9876543210-02',
    token: 'GS-7721',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    customerName: 'Pooja Malhotra',
    customerPhone: '9876543210',
    pickupSlot: '7:30 PM - 7:45 PM',
    chefNotes: 'Keep gravies mild for family.',
    branch: {
      id: 'branch-2',
      name: 'Gunjan Snacks - Galleria Food Street (Branch 2)',
      shortName: 'Outlet 2: Galleria Food Street',
      area: 'Urban Food Street Plaza',
      address: 'Booth No. 8, Galleria Food Street, Urban Chowk, New Delhi 110001',
      landmark: 'Near Parking Gate B & Food Court Entrance',
      phone: '+91 98765 00000',
      ownerPhone: '9876500000'
    },
    items: [
      {
        id: 'gravy-butter-masala',
        name: 'Shahi Butter Gravy Chaap',
        category: 'gravy',
        subCategory: 'Gravy Chaap',
        price: 120,
        quantity: 1,
        image: `${BASE}images/butter-gravy-chaap.jpg`
      },
      {
        id: 'biryani-soya-dum',
        name: 'Hyderabadi Veg Soya Dum Biryani',
        category: 'biryani',
        subCategory: 'Dum Biryani',
        price: 120,
        quantity: 1,
        image: `${BASE}images/veg-soya-biryani.jpg`
      },
      {
        id: 'momos-tandoori',
        name: 'Tandoori Chaap Momos (8 Pcs)',
        category: 'momos',
        subCategory: 'Tandoori Momos',
        price: 120,
        quantity: 1,
        image: `${BASE}images/tandoori-momos.jpg`
      }
    ],
    subtotal: 360,
    isDiscountUnlocked: true,
    discountAmount: 18,
    finalTotal: 342,
    paymentMethod: 'cod',
    paymentStatus: 'Cash on Pickup (COD)',
    upiRefId: 'N/A',
    status: 'In Tandoor (Preparing)',
    estimatedPickup: 'In 15 Mins'
  }
];

export const ensureDummyOrdersExist = () => {
  try {
    const existing = JSON.parse(localStorage.getItem('gunjan_snacks_orders') || '[]');
    if (existing.length === 0) {
      localStorage.setItem('gunjan_snacks_orders', JSON.stringify(initialDummyOrders));
      return initialDummyOrders;
    }
    return existing;
  } catch (e) {
    return initialDummyOrders;
  }
};
