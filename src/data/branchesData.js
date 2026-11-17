export const SHOP_HOTLINE_PHONE = '9310681373';

export const branches = [
  {
    id: 'branch-1',
    name: 'Gunjan Snacks - Vijay Enclave (Main Outlet)',
    shortName: 'Outlet 1: Vijay Enclave',
    area: 'Vijay Enclave, Mahavir Enclave',
    address: '36A, Block B, Vijay Enclave, Mahavir Enclave, New Delhi, Delhi 110045',
    landmark: 'Near City Metro Gate 2 & Clock Tower',
    phone: '+91 93106 81373',
    outletPhone: '+91 9069453542',
    timings: '5:00 PM to 11:30 PM (Daily)',
    openingHour: 17, // 5 PM
    closingHour: 23,
    closingMinute: 30,
    prepTime: '15-20 mins',
    mapQuery: '36A+Block+B+Vijay+Enclave+Mahavir+Enclave+New+Delhi',
    isPrimary: true,
  },
  {
    id: 'branch-2',
    name: 'Gunjan Snacks - Futa Road Outlet (Part 2)',
    shortName: 'Outlet 2: Futa Road (Part 2)',
    area: 'Mahavir Enclave Part 2, Uttam Nagar',
    address: 'C 6 60, Futa Road, Part-III, Mahavir Enclave Part 2, Uttam Nagar, New Delhi 110059',
    landmark: 'Opposite Government Boys School, Futa Road',
    phone: '+91 93106 81373',
    outletPhone: '+91 9999039366',
    timings: '5:00 PM to 11:30 PM (Daily)',
    openingHour: 17, // 5 PM
    closingHour: 23,
    closingMinute: 30,
    prepTime: '15-20 mins',
    mapQuery: 'C+6+60+Futa+Road+Mahavir+Enclave+Part+2+New+Delhi',
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
