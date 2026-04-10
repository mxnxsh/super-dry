export const servicesData = [
  {
    image: '/assets/images/laundry_by_kilo.jpg',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="8" y="6" width="32" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M8 16h32" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="28" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M24 32a4 4 0 000-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="14" cy="11" r="1.5" fill="currentColor" />
        <circle cx="19" cy="11" r="1.5" fill="currentColor" />
      </svg>
    ),
    title: 'Laundry by Kilo',
    desc: 'Wash & Fold from ₹150/kg · Wash & Iron from ₹180/kg. Perfect for everyday clothes.',
    tag: 'Most Popular',
    targetTab: 'laundry',
  },
  {
    image: '/assets/images/dry_cleaning.jpg',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M24 12v4M24 12a4 4 0 10-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 24l14-8 14 8v16H10V24z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M24 16v24M16 26l8 4 8-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M38 12l2-2M42 16l2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
    title: 'Dry Cleaning',
    desc: 'Professional solvent-based care for delicate & designer garments. Starting ₹99.',
    tag: 'Premium',
    targetTab: 'drycleaning',
  },
  {
    image: '/assets/images/steam_iron.jpg',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M8 32h32l-4-12H18L8 32z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M18 20v-6h12a4 4 0 014 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 40v2s2-2 4 0 2 2 4 0 2-2 4 0 2 2 4 0 2-2 4 0 2 2 4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
    title: 'Steam Iron',
    desc: 'Precision steam ironing that removes every crease. Starting just ₹35/piece.',
    tag: null,
    targetTab: 'steam-iron',
  },
  {
    image: '/assets/images/shoe_accessories.jpg',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M10 34s4-8 12-8 16 4 16 8v2a2 2 0 01-2 2H12a2 2 0 01-2-2v-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 26l4-2M22 28l4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M32 16h10v10h-10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M35 16v-4a2 2 0 014 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Shoes & Accessories',
    desc: 'Flipflops, sports, suede & leather shoes. Laptop bags too. From ₹250.',
    tag: null,
    targetTab: 'accessories',
  },
  {
    image: '/assets/images/home_furnishing.jpg',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M8 36V16a4 4 0 014-4h24a4 4 0 014 4v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 36h36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="14" y="20" width="8" height="6" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="26" y="20" width="8" height="6" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 30h32v6H8v-6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Home Furnishings',
    desc: 'Curtains, bedsheets, blankets, sofa covers, carpets & more. All sizes covered.',
    tag: null,
  },
  {
    image: '/assets/images/free_pickup_delivery.jpg',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M10 18h16v20H10z" stroke="currentColor" strokeWidth="2" />
        <path d="M26 24h8l5 6v8h-13V24z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="16" cy="38" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="33" cy="38" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M26 30h13" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      </svg>
    ),
    title: 'Free Pickup & Delivery',
    desc: 'We collect & deliver. 48–72 hr turnaround. Serving Vile Parle to Borivali.',
    disclaimer: '*Free pickup & delivery on orders above ₹500',
    tag: 'Free',
  },
  {
    image: '/assets/images/express_delivery.jpg',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="26" r="14" stroke="currentColor" strokeWidth="2" />
        <path d="M24 18v8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 12l-4-4M34 12l4-4M24 6v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
    title: 'Express Delivery',
    desc: '24-hr fast delivery for urgent orders.',
  },
  {
    image: '/assets/images/commercial.jpg',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="10" y="18" width="12" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="22" y="10" width="16" height="32" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M14 26h4M14 34h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <path d="M28 18h4M28 26h4M28 34h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      </svg>
    ),
    title: 'Commercial',
    desc: 'Specialized laundry services for hotels, gyms, and businesses.Bulk orders. ',
  },
]
