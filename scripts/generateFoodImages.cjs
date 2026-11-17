const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const foodSvgTemplates = {
  'tandoori-malai-chaap.svg': {
    title: 'Tandoori Malai Chaap',
    subtitle: 'Creamy Cashew Cream & Sizzling Butter',
    category: 'TANDOORI CHAAP',
    primaryColor: '#fbbf24',
    secondaryColor: '#fef08a',
    bgGradient: ['#451a03', '#1c1917'],
    accent: '#f59e0b',
    iconEmoji: '🍢',
    details: 'Rich Malai Marination • Clay Tandoor Roasted',
    dishArt: `
      <!-- Sizzler Platter -->
      <ellipse cx="200" cy="190" rx="140" ry="40" fill="#18181b" stroke="#78350f" stroke-width="3" />
      <ellipse cx="200" cy="186" rx="125" ry="32" fill="#292524" />
      <!-- Creamy Chaap Pieces -->
      <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))">
        <rect x="100" y="155" width="55" height="32" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="1.5" />
        <line x1="110" y1="160" x2="145" y2="182" stroke="#b45309" stroke-width="2" stroke-linecap="round" />
        <rect x="145" y="145" width="58" height="34" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="1.5" />
        <line x1="155" y1="150" x2="190" y2="175" stroke="#b45309" stroke-width="2" stroke-linecap="round" />
        <rect x="195" y="152" width="55" height="32" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="1.5" />
        <rect x="240" y="158" width="50" height="30" rx="10" fill="#fffbeb" stroke="#d97706" stroke-width="1.5" />
      </g>
      <!-- Melting Butter & Herbs -->
      <circle cx="170" cy="148" r="8" fill="#fde047" opacity="0.9" />
      <circle cx="215" cy="154" r="6" fill="#fde047" opacity="0.9" />
      <!-- Coriander flakes -->
      <circle cx="130" cy="165" r="2" fill="#15803d" />
      <circle cx="180" cy="158" r="2.5" fill="#15803d" />
      <circle cx="225" cy="162" r="2" fill="#15803d" />
      <circle cx="260" cy="168" r="2" fill="#15803d" />
      <!-- Onion Rings -->
      <ellipse cx="120" cy="182" rx="14" ry="7" fill="none" stroke="#f43f5e" stroke-width="2" />
      <ellipse cx="265" cy="184" rx="16" ry="8" fill="none" stroke="#f43f5e" stroke-width="2" />
    `
  },

  'afghani-chaap.svg': {
    title: 'Afghani Sizzler Chaap',
    subtitle: 'Garlic Butter & Roasted Fenugreek',
    category: 'TANDOORI CHAAP',
    primaryColor: '#fde047',
    secondaryColor: '#ca8a04',
    bgGradient: ['#3f2c1d', '#18181b'],
    accent: '#eab308',
    iconEmoji: '🍢',
    details: 'Royal White Gravy Glaze • Mild Spiced',
    dishArt: `
      <ellipse cx="200" cy="190" rx="140" ry="40" fill="#18181b" stroke="#854d0e" stroke-width="3" />
      <ellipse cx="200" cy="186" rx="125" ry="32" fill="#262626" />
      <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))">
        <rect x="110" y="150" width="55" height="34" rx="10" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.5" />
        <rect x="160" y="142" width="60" height="36" rx="10" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5" />
        <rect x="215" y="148" width="58" height="34" rx="10" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.5" />
      </g>
      <circle cx="190" cy="155" r="9" fill="#facc15" />
      <ellipse cx="135" cy="180" rx="15" ry="7" fill="none" stroke="#a855f7" stroke-width="2" />
    `
  },

  'achari-chaap.svg': {
    title: 'Teekhi Achari Chaap',
    subtitle: 'Mustard Seeds, Tangy Pickle & Charcoal Sizzle',
    category: 'TANDOORI CHAAP',
    primaryColor: '#ea580c',
    secondaryColor: '#f97316',
    bgGradient: ['#581c87', '#1c1917'],
    accent: '#f97316',
    iconEmoji: '🌶️',
    details: 'Tangy Achar Masala • Kalonji & Red Chili',
    dishArt: `
      <ellipse cx="200" cy="190" rx="140" ry="40" fill="#18181b" stroke="#9a3412" stroke-width="3" />
      <ellipse cx="200" cy="186" rx="125" ry="32" fill="#27272a" />
      <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))">
        <rect x="105" y="152" width="56" height="32" rx="10" fill="#ea580c" stroke="#991b1b" stroke-width="2" />
        <line x1="115" y1="158" x2="148" y2="178" stroke="#450a0a" stroke-width="3" />
        <rect x="155" y="145" width="60" height="35" rx="10" fill="#f97316" stroke="#991b1b" stroke-width="2" />
        <rect x="210" y="150" width="58" height="33" rx="10" fill="#ea580c" stroke="#991b1b" stroke-width="2" />
      </g>
      <circle cx="130" cy="162" r="2.5" fill="#18181b" />
      <circle cx="180" cy="155" r="2.5" fill="#18181b" />
      <circle cx="235" cy="160" r="2.5" fill="#18181b" />
      <!-- Lemon wedge -->
      <path d="M 270 170 A 15 15 0 0 1 295 180 Z" fill="#eab308" stroke="#ca8a04" stroke-width="1.5" />
    `
  },

  'delhi-masala-chaap.svg': {
    title: 'Delhi Masala Tandoori Chaap',
    subtitle: 'Classic Degi Mirch Charcoal Grilled Soya',
    category: 'TANDOORI CHAAP',
    primaryColor: '#dc2626',
    secondaryColor: '#ef4444',
    bgGradient: ['#7f1d1d', '#18181b'],
    accent: '#ef4444',
    iconEmoji: '🍢',
    details: 'Old Delhi Street Hit • Smoky Clay Tandoor',
    dishArt: `
      <ellipse cx="200" cy="190" rx="140" ry="40" fill="#18181b" stroke="#b91c1c" stroke-width="3" />
      <ellipse cx="200" cy="186" rx="125" ry="32" fill="#262626" />
      <!-- Tandoor Skewer line -->
      <line x1="60" y1="165" x2="340" y2="165" stroke="#9ca3af" stroke-width="3" stroke-linecap="round" />
      <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))">
        <rect x="95" y="148" width="55" height="34" rx="8" fill="#dc2626" stroke="#7f1d1d" stroke-width="2" />
        <rect x="155" y="146" width="58" height="36" rx="8" fill="#ef4444" stroke="#7f1d1d" stroke-width="2" />
        <rect x="220" y="148" width="55" height="34" rx="8" fill="#dc2626" stroke="#7f1d1d" stroke-width="2" />
      </g>
      <!-- Char marks -->
      <line x1="110" y1="152" x2="135" y2="175" stroke="#18181b" stroke-width="2.5" />
      <line x1="175" y1="150" x2="200" y2="178" stroke="#18181b" stroke-width="2.5" />
      <line x1="235" y1="152" x2="260" y2="175" stroke="#18181b" stroke-width="2.5" />
      <!-- Mint Chutney bowl -->
      <ellipse cx="285" cy="185" rx="18" ry="10" fill="#16a34a" stroke="#15803d" stroke-width="2" />
    `
  },

  'lemon-butter-chaap.svg': {
    title: 'Zesty Lemon Butter Chaap',
    subtitle: 'Golden Crisped Chaap in Sizzling Amul Butter',
    category: 'TANDOORI CHAAP',
    primaryColor: '#eab308',
    secondaryColor: '#facc15',
    bgGradient: ['#713f12', '#18181b'],
    accent: '#facc15',
    iconEmoji: '🍋',
    details: 'Buttery Sizzle • Lemon Zest Glaze',
    dishArt: `
      <ellipse cx="200" cy="190" rx="140" ry="40" fill="#18181b" stroke="#ca8a04" stroke-width="3" />
      <ellipse cx="200" cy="186" rx="125" ry="32" fill="#292524" />
      <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))">
        <rect x="110" y="152" width="55" height="32" rx="10" fill="#facc15" stroke="#ca8a04" stroke-width="2" />
        <rect x="165" y="145" width="60" height="36" rx="10" fill="#fde047" stroke="#ca8a04" stroke-width="2" />
        <rect x="225" y="150" width="55" height="33" rx="10" fill="#facc15" stroke="#ca8a04" stroke-width="2" />
      </g>
      <!-- Melting butter pools -->
      <circle cx="195" cy="155" r="10" fill="#fef08a" />
      <circle cx="140" cy="162" r="8" fill="#fef08a" />
      <!-- Lemon slices -->
      <circle cx="280" cy="175" r="14" fill="#fde047" stroke="#ca8a04" stroke-width="2" />
      <circle cx="280" cy="175" r="10" fill="#fef08a" />
    `
  },

  'butter-gravy-chaap.svg': {
    title: 'Shahi Butter Gravy Chaap',
    subtitle: 'Creamy Cashew-Tomato Makhani Gravy',
    category: 'GRAVY CHAAP',
    primaryColor: '#ea580c',
    secondaryColor: '#fb923c',
    bgGradient: ['#7c2d12', '#18181b'],
    accent: '#f97316',
    iconEmoji: '🥘',
    details: 'Slow Cooked Makhani Gravy • Fresh Cream Swirl',
    dishArt: `
      <!-- Handi Bowl -->
      <ellipse cx="200" cy="200" rx="130" ry="35" fill="#0c0a09" />
      <path d="M 90 170 Q 70 210 200 215 Q 330 210 310 170 Z" fill="#b45309" stroke="#78350f" stroke-width="3" />
      <!-- Rich Makhani Gravy Surface -->
      <ellipse cx="200" cy="170" rx="110" ry="35" fill="#ea580c" />
      <!-- Cream Swirl -->
      <path d="M 140 170 Q 180 150 200 170 Q 230 190 260 170" fill="none" stroke="#fffbeb" stroke-width="5" stroke-linecap="round" />
      <!-- Chaap chunks peeking out -->
      <rect x="135" y="160" width="35" height="20" rx="6" fill="#c2410c" stroke="#9a3412" stroke-width="1.5" />
      <rect x="195" y="158" width="40" height="22" rx="6" fill="#c2410c" stroke="#9a3412" stroke-width="1.5" />
      <!-- Coriander & Ginger Juliennes -->
      <line x1="170" y1="165" x2="190" y2="162" stroke="#fef08a" stroke-width="2" stroke-linecap="round" />
      <line x1="210" y1="165" x2="230" y2="162" stroke="#fef08a" stroke-width="2" stroke-linecap="round" />
      <circle cx="160" cy="172" r="3" fill="#15803d" />
      <circle cx="225" cy="174" r="3" fill="#15803d" />
    `
  },

  'tawa-masala-chaap.svg': {
    title: 'Street Tawa Chaap Masala',
    subtitle: 'Cast-Iron Tawa Roasted with Bell Peppers & Onions',
    category: 'GRAVY CHAAP',
    primaryColor: '#f97316',
    secondaryColor: '#fdba74',
    bgGradient: ['#431407', '#18181b'],
    accent: '#f97316',
    iconEmoji: '🍳',
    details: 'Iron Tawa Sizzle • Crunchy Capsicum',
    dishArt: `
      <!-- Tawa Surface -->
      <ellipse cx="200" cy="190" rx="140" ry="40" fill="#18181b" stroke="#52525b" stroke-width="4" />
      <ellipse cx="200" cy="186" rx="125" ry="32" fill="#27272a" />
      <!-- Masala Base -->
      <ellipse cx="200" cy="180" rx="100" ry="24" fill="#c2410c" />
      <!-- Chaap chunks -->
      <rect x="120" y="165" width="45" height="22" rx="6" fill="#ea580c" />
      <rect x="175" y="160" width="50" height="24" rx="6" fill="#ea580c" />
      <rect x="230" y="166" width="45" height="22" rx="6" fill="#ea580c" />
      <!-- Green Capsicum slices -->
      <rect x="150" y="170" width="16" height="6" rx="2" fill="#16a34a" />
      <rect x="210" y="168" width="16" height="6" rx="2" fill="#16a34a" />
      <rect x="180" y="178" width="18" height="6" rx="2" fill="#16a34a" />
      <!-- Red onions -->
      <ellipse cx="140" cy="178" rx="10" ry="5" fill="none" stroke="#e11d48" stroke-width="2" />
      <ellipse cx="245" cy="176" rx="10" ry="5" fill="none" stroke="#e11d48" stroke-width="2" />
    `
  },

  'kadhai-chaap.svg': {
    title: 'Kadhai Soya Chaap Gravy',
    subtitle: 'Crushed Whole Coriander & Kashmiri Chili Masala',
    category: 'GRAVY CHAAP',
    primaryColor: '#c2410c',
    secondaryColor: '#f97316',
    bgGradient: ['#3b0764', '#18181b'],
    accent: '#ea580c',
    iconEmoji: '🍲',
    details: 'Wok Cooked • Chunky Capsicums',
    dishArt: `
      <!-- Deep Kadhai with Handles -->
      <ellipse cx="60" cy="170" rx="12" ry="20" fill="none" stroke="#71717a" stroke-width="4" />
      <ellipse cx="340" cy="170" rx="12" ry="20" fill="none" stroke="#71717a" stroke-width="4" />
      <path d="M 80 170 Q 70 215 200 220 Q 330 215 320 170 Z" fill="#27272a" stroke="#52525b" stroke-width="3" />
      <!-- Rich Gravy -->
      <ellipse cx="200" cy="170" rx="115" ry="36" fill="#991b1b" />
      <!-- Soya Chaap pieces -->
      <rect x="125" y="160" width="40" height="22" rx="6" fill="#b91c1c" />
      <rect x="180" y="156" width="44" height="24" rx="6" fill="#dc2626" />
      <rect x="235" y="162" width="40" height="22" rx="6" fill="#b91c1c" />
      <!-- Coriander seeds & peppers -->
      <rect x="165" y="168" width="14" height="8" rx="2" fill="#15803d" />
      <circle cx="150" cy="165" r="2.5" fill="#fef08a" />
      <circle cx="210" cy="165" r="2.5" fill="#fef08a" />
    `
  },

  'rara-keema-chaap.svg': {
    title: 'Special Rara Keema Gravy Chaap',
    subtitle: 'Minced Soya Granules Keema Gravy & Chaap Chunks',
    category: 'GRAVY CHAAP',
    primaryColor: '#b45309',
    secondaryColor: '#f59e0b',
    bgGradient: ['#451a03', '#18181b'],
    accent: '#d97706',
    iconEmoji: '🥘',
    details: 'Gunjan Snacks Special • Dual Soya Texture',
    dishArt: `
      <ellipse cx="200" cy="190" rx="130" ry="38" fill="#1c1917" stroke="#78350f" stroke-width="3" />
      <ellipse cx="200" cy="180" rx="110" ry="30" fill="#78350f" />
      <!-- Granular Keema texture dots -->
      <circle cx="130" cy="175" r="2" fill="#d97706" />
      <circle cx="150" cy="182" r="2" fill="#d97706" />
      <circle cx="180" cy="176" r="2" fill="#d97706" />
      <circle cx="210" cy="184" r="2" fill="#d97706" />
      <circle cx="240" cy="178" r="2" fill="#d97706" />
      <circle cx="260" cy="182" r="2" fill="#d97706" />
      <!-- Large Chaap Pieces -->
      <rect x="140" y="160" width="50" height="24" rx="8" fill="#ea580c" stroke="#9a3412" stroke-width="1.5" />
      <rect x="200" y="162" width="52" height="24" rx="8" fill="#ea580c" stroke="#9a3412" stroke-width="1.5" />
      <line x1="175" y1="165" x2="215" y2="162" stroke="#fef08a" stroke-width="2" />
    `
  },

  'tandoori-momos.svg': {
    title: 'Tandoori Chaap Momos (8 Pcs)',
    subtitle: 'Charcoal Grilled Soya Dumplings with Spicy Tikka Glaze',
    category: 'MOMOS JUNCTION',
    primaryColor: '#ef4444',
    secondaryColor: '#f87171',
    bgGradient: ['#7f1d1d', '#18181b'],
    accent: '#f87171',
    iconEmoji: '🥟',
    details: 'Charcoal Grilled • Served with Spicy Dip & Mayo',
    dishArt: `
      <ellipse cx="200" cy="195" rx="140" ry="40" fill="#18181b" stroke="#991b1b" stroke-width="3" />
      <!-- Momos shapes with pleats -->
      <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))">
        <!-- Momo 1 -->
        <path d="M 85 170 C 85 150 115 150 115 170 C 115 185 85 185 85 170 Z" fill="#ef4444" stroke="#7f1d1d" stroke-width="2" />
        <line x1="95" y1="155" x2="95" y2="175" stroke="#18181b" stroke-width="2" />
        <!-- Momo 2 -->
        <path d="M 125 162 C 125 142 155 142 155 162 C 155 178 125 178 125 162 Z" fill="#dc2626" stroke="#7f1d1d" stroke-width="2" />
        <line x1="135" y1="148" x2="135" y2="168" stroke="#18181b" stroke-width="2" />
        <!-- Momo 3 -->
        <path d="M 170 158 C 170 138 200 138 200 158 C 200 174 170 174 170 158 Z" fill="#ef4444" stroke="#7f1d1d" stroke-width="2" />
        <line x1="180" y1="144" x2="180" y2="164" stroke="#18181b" stroke-width="2" />
        <!-- Momo 4 -->
        <path d="M 215 162 C 215 142 245 142 245 162 C 245 178 215 178 215 162 Z" fill="#dc2626" stroke="#7f1d1d" stroke-width="2" />
        <line x1="225" y1="148" x2="225" y2="168" stroke="#18181b" stroke-width="2" />
      </g>
      <!-- Red Dip Bowl & Green Chutney -->
      <circle cx="280" cy="180" r="16" fill="#dc2626" stroke="#fff" stroke-width="2" />
      <circle cx="280" cy="180" r="10" fill="#991b1b" />
      <circle cx="120" cy="192" r="12" fill="#16a34a" stroke="#fff" stroke-width="1.5" />
    `
  },

  'kurkure-momos.svg': {
    title: 'Kurkure Crunchy Soya Momos',
    subtitle: 'Ultra-Crispy Cornflake Crust with Spicy Garlic Mayo',
    category: 'MOMOS JUNCTION',
    primaryColor: '#f59e0b',
    secondaryColor: '#fbbf24',
    bgGradient: ['#78350f', '#18181b'],
    accent: '#fbbf24',
    iconEmoji: '🥟',
    details: 'Addictive Loud Crunch • 8 Big Pieces',
    dishArt: `
      <ellipse cx="200" cy="195" rx="140" ry="40" fill="#18181b" stroke="#b45309" stroke-width="3" />
      <!-- Crunchy textured Momos with crumb flakes -->
      <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))">
        <!-- Momo 1 -->
        <circle cx="110" cy="165" r="22" fill="#d97706" stroke="#92400e" stroke-width="2" />
        <circle cx="105" cy="160" r="4" fill="#fde68a" />
        <circle cx="115" cy="170" r="3" fill="#fde68a" />
        <!-- Momo 2 -->
        <circle cx="155" cy="155" r="24" fill="#f59e0b" stroke="#92400e" stroke-width="2" />
        <circle cx="150" cy="150" r="5" fill="#fde68a" />
        <circle cx="162" cy="160" r="4" fill="#fde68a" />
        <!-- Momo 3 -->
        <circle cx="205" cy="152" r="24" fill="#d97706" stroke="#92400e" stroke-width="2" />
        <circle cx="200" cy="148" r="5" fill="#fde68a" />
        <circle cx="212" cy="158" r="4" fill="#fde68a" />
        <!-- Momo 4 -->
        <circle cx="250" cy="162" r="22" fill="#f59e0b" stroke="#92400e" stroke-width="2" />
        <circle cx="245" cy="158" r="4" fill="#fde68a" />
      </g>
      <!-- Mayo Dip Bowl with paprika sprinkle -->
      <circle cx="180" cy="195" r="16" fill="#fffbeb" stroke="#f59e0b" stroke-width="2" />
      <circle cx="180" cy="195" r="2" fill="#dc2626" />
    `
  },

  'malai-momos.svg': {
    title: 'Malai Afghani Gravy Momos',
    subtitle: 'Cream, Melted Butter, Oregano & Chaat Masala Tossed',
    category: 'MOMOS JUNCTION',
    primaryColor: '#fef08a',
    secondaryColor: '#fef9c3',
    bgGradient: ['#3f2c1d', '#18181b'],
    accent: '#fde047',
    iconEmoji: '🥟',
    details: 'Rich Dairy Cream Swirl • Zero Chilli',
    dishArt: `
      <ellipse cx="200" cy="195" rx="140" ry="40" fill="#18181b" stroke="#ca8a04" stroke-width="3" />
      <ellipse cx="200" cy="188" rx="120" ry="32" fill="#fef9c3" opacity="0.4" />
      <!-- Momos coated in white cream -->
      <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))">
        <circle cx="115" cy="165" r="20" fill="#fffbeb" stroke="#ca8a04" stroke-width="1.5" />
        <circle cx="160" cy="155" r="22" fill="#ffffff" stroke="#ca8a04" stroke-width="1.5" />
        <circle cx="210" cy="152" r="22" fill="#fffbeb" stroke="#ca8a04" stroke-width="1.5" />
        <circle cx="255" cy="162" r="20" fill="#ffffff" stroke="#ca8a04" stroke-width="1.5" />
      </g>
      <!-- Melted butter swirl & oregano flakes -->
      <path d="M 120 170 Q 180 150 250 170" fill="none" stroke="#facc15" stroke-width="4" stroke-linecap="round" />
      <circle cx="150" cy="160" r="1.5" fill="#15803d" />
      <circle cx="200" cy="158" r="1.5" fill="#15803d" />
      <circle cx="230" cy="165" r="1.5" fill="#15803d" />
    `
  },

  'gravy-momos.svg': {
    title: 'Spicy Makhani Gravy Momos',
    subtitle: 'Fried Momos Drowned in Sizzling Makhani Gravy',
    category: 'MOMOS JUNCTION',
    primaryColor: '#ea580c',
    secondaryColor: '#f97316',
    bgGradient: ['#7c2d12', '#18181b'],
    accent: '#ea580c',
    iconEmoji: '🥟',
    details: 'Tawa Tossed • Spicy & Saucy',
    dishArt: `
      <ellipse cx="200" cy="195" rx="140" ry="40" fill="#18181b" stroke="#9a3412" stroke-width="3" />
      <ellipse cx="200" cy="188" rx="120" ry="32" fill="#ea580c" />
      <!-- Momos inside red makhani gravy -->
      <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))">
        <circle cx="120" cy="168" r="20" fill="#c2410c" stroke="#991b1b" stroke-width="1.5" />
        <circle cx="165" cy="158" r="22" fill="#dc2626" stroke="#991b1b" stroke-width="1.5" />
        <circle cx="215" cy="156" r="22" fill="#c2410c" stroke="#991b1b" stroke-width="1.5" />
        <circle cx="260" cy="166" r="20" fill="#dc2626" stroke="#991b1b" stroke-width="1.5" />
      </g>
      <!-- Cream swirl -->
      <path d="M 140 185 Q 190 170 240 185" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" />
    `
  },

  'steamed-momos.svg': {
    title: 'Classic Steamed Soya Momos',
    subtitle: 'Delicate Thin-Skin Steamed Dumplings with Fiery Chutney',
    category: 'MOMOS JUNCTION',
    primaryColor: '#93c5fd',
    secondaryColor: '#e0f2fe',
    bgGradient: ['#1e293b', '#18181b'],
    accent: '#38bdf8',
    iconEmoji: '🥟',
    details: 'Steamed Piping Hot • Spicy Garlic Chili Dip',
    dishArt: `
      <!-- Bamboo Steamer Rim -->
      <ellipse cx="200" cy="195" rx="140" ry="40" fill="#18181b" stroke="#b45309" stroke-width="4" />
      <ellipse cx="200" cy="188" rx="125" ry="32" fill="#fef3c7" opacity="0.3" />
      <!-- Translucent white pleated momos -->
      <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))">
        <path d="M 90 170 C 90 148 120 148 120 170 C 120 186 90 186 90 170 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
        <path d="M 130 160 C 130 138 160 138 160 160 C 160 176 130 176 130 160 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
        <path d="M 175 155 C 175 133 205 133 205 155 C 205 171 175 171 175 155 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
        <path d="M 220 160 C 220 138 250 138 250 160 C 250 176 220 176 220 160 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
      </g>
      <!-- Steam vapors -->
      <path d="M 145 130 Q 140 110 150 95" fill="none" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round" opacity="0.6" />
      <path d="M 190 125 Q 195 105 185 90" fill="none" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round" opacity="0.6" />
      <!-- Fiery Red Chili Dip -->
      <circle cx="280" cy="180" r="16" fill="#dc2626" stroke="#fff" stroke-width="2" />
    `
  },

  'amritsari-nutri-kulche.svg': {
    title: 'Amritsari Special Nutri Kulche',
    subtitle: 'Dark Spiced Soya Chunks Gravy + 2 Butter Kulchas',
    category: 'NUTRI KULCHE',
    primaryColor: '#f59e0b',
    secondaryColor: '#fde047',
    bgGradient: ['#451a03', '#18181b'],
    accent: '#f59e0b',
    iconEmoji: '🫓',
    details: 'Amritsar Street Legend • 2 Butter Kulchas Included',
    dishArt: `
      <!-- Plate -->
      <ellipse cx="200" cy="195" rx="145" ry="42" fill="#18181b" stroke="#78350f" stroke-width="3" />
      <!-- Dark Spiced Nutri Soya Bowl -->
      <ellipse cx="130" cy="185" rx="45" ry="22" fill="#451a03" stroke="#78350f" stroke-width="2" />
      <!-- Soya Chunks floating in dark tea gravy -->
      <rect x="105" y="174" width="16" height="12" rx="4" fill="#78350f" />
      <rect x="125" y="178" width="18" height="14" rx="4" fill="#78350f" />
      <rect x="145" y="172" width="16" height="12" rx="4" fill="#78350f" />
      <!-- 2 Soft Golden Butter Kulchas -->
      <!-- Kulcha 1 -->
      <ellipse cx="230" cy="175" rx="45" ry="24" fill="#fde68a" stroke="#d97706" stroke-width="2" />
      <!-- Coriander & Kalonji on Kulcha -->
      <circle cx="215" cy="170" r="2" fill="#15803d" />
      <circle cx="235" cy="172" r="1.5" fill="#18181b" />
      <circle cx="245" cy="178" r="2" fill="#15803d" />
      <!-- Butter pat melting on Kulcha -->
      <rect x="225" y="168" width="14" height="8" rx="2" fill="#fef08a" />
      <!-- Pickled Red Onion Salad -->
      <ellipse cx="180" cy="205" rx="20" ry="10" fill="none" stroke="#e11d48" stroke-width="2" />
    `
  },

  'tawa-nutri-keema.svg': {
    title: 'Tawa Bhuna Nutri Keema Kulche',
    subtitle: 'Minced Soya Granules Bhuna on Iron Tawa with Green Chili',
    category: 'NUTRI KULCHE',
    primaryColor: '#d97706',
    secondaryColor: '#fef08a',
    bgGradient: ['#3f2c1d', '#18181b'],
    accent: '#d97706',
    iconEmoji: '🫓',
    details: 'Spicy Bhuna Keema • 2 Toasted Kulchas',
    dishArt: `
      <ellipse cx="200" cy="195" rx="145" ry="42" fill="#18181b" stroke="#78350f" stroke-width="3" />
      <!-- Bhuna Keema Heap -->
      <ellipse cx="130" cy="185" rx="48" ry="24" fill="#78350f" stroke="#b45309" stroke-width="2" />
      <circle cx="115" cy="180" r="2" fill="#f59e0b" />
      <circle cx="140" cy="185" r="2" fill="#f59e0b" />
      <line x1="120" y1="180" x2="135" y2="182" stroke="#16a34a" stroke-width="2" />
      <!-- Kulcha 2 -->
      <ellipse cx="235" cy="175" rx="46" ry="24" fill="#fef08a" stroke="#d97706" stroke-width="2" />
      <circle cx="225" cy="172" r="2" fill="#18181b" />
      <circle cx="245" cy="174" r="2" fill="#16a34a" />
      <circle cx="230" cy="170" r="6" fill="#fde047" />
    `
  },

  'dum-biryani.svg': {
    title: 'Hyderabadi Veg Soya Dum Biryani',
    subtitle: 'Aged Basmati Rice with Smoky Soya Tikka, Raita & Salan',
    category: 'VEG BIRYANI',
    primaryColor: '#eab308',
    secondaryColor: '#fef08a',
    bgGradient: ['#713f12', '#18181b'],
    accent: '#facc15',
    iconEmoji: '🍚',
    details: 'Handi Dum Basmati Rice • Mint Raita Included',
    dishArt: `
      <!-- Clay Handi Pot -->
      <ellipse cx="200" cy="205" rx="130" ry="32" fill="#18181b" />
      <path d="M 80 170 Q 60 215 200 220 Q 340 215 320 170 Z" fill="#9a3412" stroke="#78350f" stroke-width="3" />
      <!-- Saffron & Turmeric Basmati Rice Mound -->
      <path d="M 90 170 Q 200 130 310 170 Z" fill="#fef08a" />
      <path d="M 110 168 Q 200 136 290 168 Z" fill="#fde047" />
      <!-- Soya Tikka Pieces in Biryani -->
      <rect x="135" y="152" width="28" height="16" rx="4" fill="#ea580c" stroke="#9a3412" stroke-width="1.5" />
      <rect x="195" y="146" width="30" height="18" rx="4" fill="#ea580c" stroke="#9a3412" stroke-width="1.5" />
      <rect x="245" y="155" width="28" height="16" rx="4" fill="#ea580c" stroke="#9a3412" stroke-width="1.5" />
      <!-- Fried Brown Onions (Birista) & Fresh Mint -->
      <line x1="160" y1="150" x2="185" y2="152" stroke="#78350f" stroke-width="2.5" stroke-linecap="round" />
      <line x1="220" y1="152" x2="245" y2="150" stroke="#78350f" stroke-width="2.5" stroke-linecap="round" />
      <circle cx="180" cy="144" r="3" fill="#16a34a" />
      <circle cx="215" cy="142" r="3" fill="#16a34a" />
      <!-- Cool Mint Raita Bowl on side -->
      <circle cx="310" cy="188" r="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" />
      <circle cx="310" cy="188" r="4" fill="#86efac" />
    `
  },

  'rumali-roti.svg': {
    title: 'Fresh Tandoori Rumali Roti',
    subtitle: 'Handkerchief-Thin, Ultra-Soft Tandoor Tossed Flatbread',
    category: 'RUMALI ROTI',
    primaryColor: '#f8fafc',
    secondaryColor: '#e2e8f0',
    bgGradient: ['#334155', '#18181b'],
    accent: '#f1f5f9',
    iconEmoji: '🥖',
    details: 'Super Soft & Folded • Melts in Mouth',
    dishArt: `
      <!-- Round Serving Platter -->
      <ellipse cx="200" cy="195" rx="140" ry="40" fill="#18181b" stroke="#64748b" stroke-width="3" />
      <!-- Handkerchief Folded White Rumali Roti -->
      <g filter="drop-shadow(0 6px 8px rgba(0,0,0,0.4))">
        <!-- Fold layer 1 -->
        <polygon points="100,195 200,140 300,195 200,210" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
        <!-- Fold layer 2 -->
        <polygon points="120,190 200,148 280,190 200,202" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
        <!-- Fold layer 3 -->
        <polygon points="140,185 200,155 260,185 200,195" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1" />
      </g>
      <!-- Delicate golden brown tandoor dots -->
      <circle cx="160" cy="175" r="2.5" fill="#d97706" opacity="0.6" />
      <circle cx="195" cy="165" r="2" fill="#d97706" opacity="0.6" />
      <circle cx="230" cy="178" r="2.5" fill="#d97706" opacity="0.6" />
      <circle cx="180" cy="185" r="2" fill="#d97706" opacity="0.6" />
      <!-- Soft cloth texture label -->
      <rect x="140" y="215" width="120" height="20" rx="6" fill="#0f172a" stroke="#f8fafc" stroke-width="1" />
      <text x="200" y="229" font-family="system-ui, sans-serif" font-size="10" font-weight="bold" fill="#f8fafc" text-anchor="middle">SUPER SOFT &amp; THIN</text>
    `
  },

  'butter-naan.svg': {
    title: 'Crispy Butter Naan',
    subtitle: 'Clay Oven Baked with Amul Butter & Nigella Seeds',
    category: 'TANDOORI BREAD',
    primaryColor: '#fde047',
    secondaryColor: '#fef08a',
    bgGradient: ['#713f12', '#18181b'],
    accent: '#facc15',
    iconEmoji: '🥖',
    details: 'Fresh Tandoor Baked • Pure Butter Glaze',
    dishArt: `
      <!-- Bread Basket -->
      <ellipse cx="200" cy="195" rx="140" ry="40" fill="#18181b" stroke="#78350f" stroke-width="3" />
      <!-- Tear Drop shaped Naan -->
      <g filter="drop-shadow(0 6px 8px rgba(0,0,0,0.5))">
        <path d="M 120 190 C 100 160 170 135 220 145 C 270 155 290 190 260 205 C 210 215 140 210 120 190 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="2" />
      </g>
      <!-- Charred Tandoor Blisters -->
      <ellipse cx="160" cy="175" rx="14" ry="8" fill="#92400e" opacity="0.8" />
      <ellipse cx="210" cy="165" rx="12" ry="7" fill="#92400e" opacity="0.8" />
      <ellipse cx="240" cy="185" rx="16" ry="9" fill="#92400e" opacity="0.8" />
      <!-- Kalonji / Nigella seeds & Butter -->
      <circle cx="180" cy="170" r="1.5" fill="#18181b" />
      <circle cx="195" cy="178" r="1.5" fill="#18181b" />
      <circle cx="225" cy="174" r="1.5" fill="#18181b" />
      <circle cx="190" cy="180" r="9" fill="#fef9c3" opacity="0.9" />
    `
  },

  'masala-chaach.svg': {
    title: 'Dhaba Spiced Masala Chaach',
    subtitle: 'Frothy Churned Buttermilk with Roasted Cumin & Mint',
    category: 'COOLERS',
    primaryColor: '#38bdf8',
    secondaryColor: '#e0f2fe',
    bgGradient: ['#0c4a6e', '#18181b'],
    accent: '#38bdf8',
    iconEmoji: '🥛',
    details: 'Chilled Digestive Drink • Roasted Jeera & Mint',
    dishArt: `
      <!-- Glass Shape -->
      <path d="M 160 110 L 170 210 Q 200 220 230 210 L 240 110 Z" fill="#f0f9ff" stroke="#bae6fd" stroke-width="3" opacity="0.9" />
      <!-- Buttermilk level -->
      <path d="M 162 125 L 170 208 Q 200 216 230 208 L 238 125 Z" fill="#e0f2fe" />
      <!-- Froth top -->
      <ellipse cx="200" cy="125" rx="38" ry="12" fill="#ffffff" stroke="#bae6fd" stroke-width="1.5" />
      <!-- Roasted Jeera / Cumin dusting & Mint leaf -->
      <circle cx="185" cy="124" r="1.5" fill="#78350f" />
      <circle cx="200" cy="126" r="1.5" fill="#78350f" />
      <circle cx="215" cy="123" r="1.5" fill="#78350f" />
      <ellipse cx="200" cy="115" rx="10" ry="5" fill="#16a34a" />
      <!-- Condensation droplets -->
      <circle cx="180" cy="160" r="2" fill="#38bdf8" opacity="0.6" />
      <circle cx="220" cy="175" r="2" fill="#38bdf8" opacity="0.6" />
    `
  },

  'rabdi-kulfi.svg': {
    title: 'Shahi Matka Rabdi Malai Kulfi',
    subtitle: 'Authentic Earthen Matka Kulfi with Saffron & Pistachio',
    category: 'SWEET DESSERT',
    primaryColor: '#fde047',
    secondaryColor: '#fef08a',
    bgGradient: ['#581c87', '#18181b'],
    accent: '#facc15',
    iconEmoji: '🍨',
    details: 'Pure Reduced Milk • Saffron & Pistachio Nut Topping',
    dishArt: `
      <!-- Earthen Clay Matka Cup -->
      <ellipse cx="200" cy="210" rx="40" ry="12" fill="#18181b" />
      <path d="M 155 150 Q 140 190 170 210 Q 200 215 230 210 Q 260 190 245 150 Z" fill="#9a3412" stroke="#78350f" stroke-width="3" />
      <!-- Thick Rabdi Kulfi Mound -->
      <ellipse cx="200" cy="150" rx="46" ry="18" fill="#fef08a" stroke="#eab308" stroke-width="2" />
      <!-- Saffron Strands & Pistachio Nuts -->
      <line x1="180" y1="145" x2="195" y2="152" stroke="#ea580c" stroke-width="1.5" />
      <line x1="210" y1="146" x2="225" y2="150" stroke="#ea580c" stroke-width="1.5" />
      <circle cx="190" cy="152" r="2.5" fill="#16a34a" />
      <circle cx="205" cy="148" r="2.5" fill="#16a34a" />
      <circle cx="215" cy="154" r="2" fill="#16a34a" />
      <!-- Wooden Ice Cream Spoon -->
      <path d="M 230 115 L 210 160" stroke="#d97706" stroke-width="6" stroke-linecap="round" />
    `
  }
};

function generateFullSvg(item) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="cardBg" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="${item.bgGradient[0]}" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="${item.bgGradient[1]}"/>
    </radialGradient>
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${item.primaryColor}"/>
      <stop offset="100%" stop-color="${item.secondaryColor}"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="400" height="300" fill="url(#cardBg)"/>

  <!-- Subtle grid aura -->
  <circle cx="200" cy="170" r="105" fill="${item.accent}" opacity="0.12" />

  <!-- The Custom Dish Artwork -->
  ${item.dishArt}

  <!-- Header Category & Pure Veg Badge -->
  <rect x="16" y="14" width="84" height="22" rx="4" fill="#16a34a"/>
  <text x="58" y="29" font-family="system-ui, sans-serif" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">100% PURE VEG</text>

  <rect x="110" y="14" width="120" height="22" rx="4" fill="#000000" fill-opacity="0.5" stroke="${item.accent}" stroke-width="1"/>
  <text x="170" y="29" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="${item.primaryColor}" text-anchor="middle" letter-spacing="1">${item.category}</text>

  <!-- Emoji floating badge -->
  <circle cx="365" cy="25" r="16" fill="#18181b" stroke="${item.accent}" stroke-width="1.5" />
  <text x="365" y="31" font-size="16" text-anchor="middle">${item.iconEmoji}</text>

  <!-- Bottom Title Plate Overlay -->
  <rect x="0" y="240" width="400" height="60" fill="#09090b" fill-opacity="0.88"/>
  <line x1="0" y1="240" x2="400" y2="240" stroke="${item.accent}" stroke-width="1.5" opacity="0.7"/>

  <!-- Title Text -->
  <text x="20" y="263" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="900" fill="#ffffff">${item.title}</text>
  <text x="20" y="284" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="${item.primaryColor}">${item.subtitle}</text>
</svg>`;
}

for (const [filename, template] of Object.entries(foodSvgTemplates)) {
  const filePath = path.join(targetDir, filename);
  fs.writeFileSync(filePath, generateFullSvg(template), 'utf8');
  console.log(`Generated: ${filename}`);
}

console.log('All local SVG food images generated successfully.');
