// Professional Indian culinary photo fallbacks by category
const BASE = import.meta.env.BASE_URL || '/';

export const getFoodFallbackImage = (name, category) => {
  switch (category) {
    case 'momos':
      return `${BASE}images/tandoori-momos.jpg`;
    case 'gravy':
      return `${BASE}images/butter-gravy-chaap.jpg`;
    case 'nutri':
      return `${BASE}images/amritsari-nutri-kulche.jpg`;
    case 'biryani':
      return `${BASE}images/veg-soya-biryani.jpg`;
    case 'breads':
      return `${BASE}images/rumali-roti.jpg`;
    case 'beverages':
      return `${BASE}images/masala-chaach.jpg`;
    case 'chaps':
    default:
      return `${BASE}images/tandoori-malai-chaap.jpg`;
  }
};
