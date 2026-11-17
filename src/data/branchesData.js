export const SHOP_HOTLINE_PHONE = '9876500000';

export const branches = [
  {
    id: 'branch-1',
    name: 'Gunjan Snacks - Central Plaza (Main Outlet)',
    shortName: 'Outlet 1: Central Plaza',
    area: 'Central Market Food Plaza',
    address: 'Shop No. 14, Central Market Food Plaza, Main Market, New Delhi 110001',
    landmark: 'Opposite Central Fountain & Clock Tower',
    phone: '+91 98765 00000',
    outletPhone: '+91 98765 11111',
    timings: '5:00 PM to 11:30 PM (Daily)',
    openingHour: 17, // 5 PM
    closingHour: 23,
    closingMinute: 30,
    prepTime: '15-20 mins',
    mapQuery: 'Connaught+Place+New+Delhi',
    isPrimary: true,
  },
  {
    id: 'branch-2',
    name: 'Gunjan Snacks - Galleria Food Street (Branch 2)',
    shortName: 'Outlet 2: Galleria Food Street',
    area: 'Urban Food Street Plaza',
    address: 'Booth No. 8, Galleria Food Street, Urban Chowk, New Delhi 110001',
    landmark: 'Near Parking Gate B & Food Court Entrance',
    phone: '+91 98765 00000',
    outletPhone: '+91 98765 22222',
    timings: '5:00 PM to 11:30 PM (Daily)',
    openingHour: 17, // 5 PM
    closingHour: 23,
    closingMinute: 30,
    prepTime: '15-20 mins',
    mapQuery: 'India+Gate+New+Delhi',
    isPrimary: false,
  }
];

export const isShopOpen = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hours * 60 + minutes;
  
  // 5:00 PM = 17 * 60 = 1020 mins
  // 11:30 PM = 23 * 60 + 30 = 1410 mins
  return totalMinutes >= 1020 && totalMinutes <= 1410;
};
