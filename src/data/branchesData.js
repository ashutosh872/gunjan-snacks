export const SHOP_HOTLINE_PHONE = '9310681373';

export const branches = [
  {
    id: 'branch-1',
    name: 'Gunjan Snacks - Central Market Branch',
    shortName: 'Shop 1: Central Market',
    area: 'Central Market, Sector 14',
    address: 'Shop No. 14, Opposite Central Fountain, Main Market, Sector 14',
    landmark: 'Near City Metro Gate 2 & Clock Tower',
    phone: '+91 93106 81373',
    altPhone: '+91 98101 23457',
    timings: '5:00 PM to 11:30 PM (Daily)',
    openingHour: 17, // 5 PM
    closingHour: 23,
    closingMinute: 30,
    prepTime: '15-20 mins',
    mapQuery: 'Gunjan+Snacks+Central+Market',
    isPrimary: true,
  },
  {
    id: 'branch-2',
    name: 'Gunjan Snacks - Galleria Food Street Branch',
    shortName: 'Shop 2: Galleria Food Street',
    area: 'Urban Galleria Food Street',
    address: 'Kiosk No. 28, Urban Chowk Food Street, Opposite City Club',
    landmark: 'Behind Grand Mall, Near Parking Gate B',
    phone: '+91 93106 81373',
    altPhone: '+91 98765 87655',
    timings: '5:00 PM to 11:30 PM (Daily)',
    openingHour: 17, // 5 PM
    closingHour: 23,
    closingMinute: 30,
    prepTime: '15-20 mins',
    mapQuery: 'Gunjan+Snacks+Galleria+Food+Street',
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
