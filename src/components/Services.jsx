import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal, fadeUp } from '../hooks/useReveal'
import './Services.css'

/* ── Service highlight cards (4 main categories from price list) ── */
const services = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="8" y="14" width="32" height="26" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M16 14V10a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 28l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Laundry by Kilo',
    desc: 'Wash & Fold from ₹150/kg · Wash & Iron from ₹180/kg. Perfect for everyday clothes.',
    tag: 'Most Popular',
    targetTab: 'laundry',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M12 20h24M24 8v12M15 34l-4 6h26l-4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 28l6-8 6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Dry Cleaning',
    desc: 'Professional solvent-based care for delicate & designer garments. Starting ₹99.',
    tag: 'Premium',
    targetTab: 'drycleaning',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M10 36c0-12 4-24 14-24s14 12 14 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 36h32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 18c0-3 4-6 4-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 20c2-2 5-2 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Steam Iron',
    desc: 'Precision steam ironing that removes every crease. Starting just ₹35/piece.',
    tag: null,
    targetTab: 'steam-iron',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <ellipse cx="24" cy="30" rx="14" ry="10" stroke="currentColor" strokeWidth="2" />
        <path d="M14 30c0-6 4-16 10-16s10 10 10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 40h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="22" r="2" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    title: 'Shoes & Accessories',
    desc: 'Flipflops, sports, suede & leather shoes. Laptop bags too. From ₹250.',
    tag: null,
    targetTab: 'accessories',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M6 20h36" stroke="currentColor" strokeWidth="2" opacity="0.4" />
        <path d="M18 10v10M30 10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M14 30h6M26 30h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    title: 'Home Furnishings',
    desc: 'Curtains, bedsheets, blankets, sofa covers, carpets & more. All sizes covered.',
    tag: null,
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="6" y="16" width="20" height="24" rx="3" stroke="currentColor" strokeWidth="2" />
        <rect x="22" y="10" width="20" height="30" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M12 22h8M12 28h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M28 16h8M28 22h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
    title: 'Free Pickup & Delivery',
    desc: 'We collect & deliver. 48–72 hr turnaround. Serving Vile Parle to Borivali.',
    disclaimer: '*Free pickup & delivery on orders above ₹500',
    tag: 'Free',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="6" y="16" width="20" height="24" rx="3" stroke="currentColor" strokeWidth="2" />
        <rect x="22" y="10" width="20" height="30" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M12 22h8M12 28h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M28 16h8M28 22h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
    title: 'Express Delivery',
    desc: '24-hr fast delivery for urgent orders.',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="6" y="16" width="20" height="24" rx="3" stroke="currentColor" strokeWidth="2" />
        <rect x="22" y="10" width="20" height="30" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M12 22h8M12 28h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M28 16h8M28 22h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
    title: 'Commercial',
    desc: 'Specialized laundry services for hotels, gyms, and businesses.Bulk orders. ',
  },
]

/* ── Full price list data (directly from images) ── */
const priceCategories = [
  {
    id: 'drycleaning',
    label: 'Dry Cleaning',
    hasSteamIron: true,
    items: [
      { name: 'Anarkali ( Regular )', price: 350, steam: 80 },
      { name: 'Anarkali ( Light work )', price: 450, steam: 110 },
      { name: 'Anarkali ( Party wear )', price: 550, steam: 250 },
      { name: 'Bed Cover / Bedsheet ( Single )', price: 280, steam: 110 },
      { name: 'Bed Cover / Bedsheet ( Double )', price: 330, steam: 150 },
      { name: 'Blanket / Quilt ( Single )', price: 350, steam: null },
      { name: 'Blanket / Quilt ( Double )', price: 450, steam: null },
      { name: 'Bra / Inner', price: 99, steam: null },
      { name: 'Blouse', price: 99, steam: 40 },
      { name: 'Blouse ( Party wear )', price: 150, steam: 60 },
      { name: 'Blazer / Coat', price: 250, steam: 120 },
      { name: 'Blazer / Coat ( Party wear )', price: 350, steam: 160 },
      { name: 'Curtain Net ( per Sq. Ft. )', price: 10, steam: 4 },
      { name: 'Curtain Single lining ( per Sq. Ft. )', price: 12, steam: 4 },
      { name: 'Curtain Double lining ( per Sq. Ft. )', price: 15, steam: 6 },
      { name: 'Cushion / Pillow Cover ( Regular )', price: 70, steam: 35 },
      { name: 'Cushion / Pillow Cover ( Large )', price: 110, steam: 35 },
      { name: 'Carpet ( Per Square Ft. )', price: 40, steam: null },
      { name: 'Cargo Trouser', price: 160, steam: 40 },
      { name: 'Cargo Jeans', price: 160, steam: 40 },
      { name: 'Dhoti', price: 160, steam: 40 },
      { name: 'Dhoti ( Party wear )', price: 220, steam: 60 },
      { name: 'Dress ( Short )', price: 180, steam: 35 },
      { name: 'Dress ( Long )', price: 220, steam: 50 },
      { name: 'Dress ( Long Party wear )', price: 320, steam: 90 },
      { name: 'Dupatta / Stole', price: 110, steam: 35 },
      { name: 'Dupatta / Stole ( Party wear )', price: 150, steam: 55 },
      { name: 'Gowns ( Regular )', price: 350, steam: 150 },
      { name: 'Gowns ( Party wear )', price: 450, steam: 200 },
      { name: 'Hat / Cap', price: 120, steam: null },
      { name: 'Hoodie', price: 150, steam: 35 },
      { name: 'Jacket ( Formal )', price: 150, steam: 40 },
      { name: 'Jacket ( Winter )', price: 180, steam: null },
      { name: 'Jacket ( Leather )', price: 350, steam: null },
      { name: 'Jeans', price: 140, steam: 35 },
      { name: 'Jump Suit', price: 350, steam: 60 },
      { name: "Kid's wear ( Regular )", price: 99, steam: 25 },
      { name: "Kid's wear ( Party wear )", price: 210, steam: 35 },
      { name: 'Kurta ( Short )', price: 110, steam: 35 },
      { name: 'Kurta ( Long )', price: 150, steam: 40 },
      { name: 'Kurta ( Silk )', price: 180, steam: 50 },
      { name: 'Kurta ( Party wear )', price: 250, steam: 70 },
      { name: 'Leggings', price: 110, steam: 35 },
      { name: 'Lehenga ( Regular )', price: 450, steam: 150 },
      { name: 'Lehenga ( Light work )', price: 550, steam: 200 },
      { name: 'Lehenga ( Party wear )', price: 600, steam: 300 },
      { name: 'Over Coat', price: 350, steam: 150 },
      { name: 'Plazo', price: 120, steam: 40 },
      { name: 'Plazo ( Party wear )', price: 160, steam: 60 },
      { name: 'Petticoat ( Regular )', price: 110, steam: 35 },
      { name: 'Petticoat ( Silk )', price: 150, steam: 45 },
      { name: 'Pyajama', price: 110, steam: 35 },
      { name: 'Razai ( Single )', price: 350, steam: null },
      { name: 'Razai ( Double )', price: 450, steam: null },
      { name: 'Rug ( Small )', price: 350, steam: null },
      { name: 'Rug ( Medium )', price: 450, steam: null },
      { name: 'Salwar', price: 120, steam: 35 },
      { name: 'Saree ( Cotton )', price: 300, steam: 80 },
      { name: 'Saree ( Silk )', price: 350, steam: 150 },
      { name: 'Saree ( Party wear )', price: 400, steam: 200 },
      { name: 'Shawl', price: 180, steam: 60 },
      { name: 'Sherwani ( Regular )', price: 300, steam: 150 },
      { name: 'Sherwani ( Light work )', price: 450, steam: 200 },
      { name: 'Sherwani ( Designer )', price: 600, steam: 300 },
      { name: 'Shirt', price: 110, steam: 35 },
      { name: 'Shirt ( Party wear )', price: 150, steam: 50 },
      { name: 'Shirt ( Valvate )', price: 180, steam: 60 },
      { name: 'Shirt ( Leather )', price: 300, steam: null },
      { name: "Short's", price: 99, steam: 35 },
      { name: 'Skirt ( Short )', price: 99, steam: 35 },
      { name: 'Skirt ( Long )', price: 150, steam: 35 },
      { name: 'Sofa Cover ( Single Seater )', price: 180, steam: 80 },
      { name: 'Sofa Cover ( Double Seater )', price: 280, steam: 90 },
      { name: 'Sofa Cover ( Three Seater )', price: 360, steam: 150 },
      { name: 'Suit ( 2 pcs )', price: 320, steam: 150 },
      { name: 'Suit ( 3 pcs )', price: 480, steam: 200 },
      { name: 'Sweater', price: 180, steam: 60 },
      { name: 'Sweatshirt', price: 150, steam: 35 },
      { name: 'T-Shirt', price: 110, steam: 35 },
      { name: 'Table Mate ( Regular )', price: 150, steam: 35 },
      { name: 'Table Mate ( Large )', price: 300, steam: 50 },
      { name: 'Tie', price: 60, steam: 35 },
      { name: 'Top', price: 110, steam: 35 },
      { name: 'Top ( Long )', price: 150, steam: 40 },
      { name: 'Top ( Party wear )', price: 180, steam: 60 },
      { name: 'Towel ( Regular )', price: 80, steam: null },
      { name: 'Towel ( Large )', price: 150, steam: null },
      { name: 'Toy ( Small )', price: 200, steam: null },
      { name: 'Toy ( Large )', price: 350, steam: null },
      { name: 'Track Pant', price: 140, steam: 35 },
      { name: 'Trouser', price: 140, steam: 35 },
      { name: 'Trouser ( Valvate )', price: 200, steam: 90 },
      { name: 'Trouser ( Leather )', price: 350, steam: null },
      { name: 'Underwear / Panties', price: 60, steam: null },
      { name: 'Vest ( Inner )', price: 99, steam: 35 },
      { name: 'Waist Coat', price: 250, steam: 80 },
      { name: 'Waist Coat ( Party wear )', price: 400, steam: 130 },
    ],
  },
  {
    id: 'laundry',
    label: 'Laundry by Kilo',
    hasSteamIron: false,
    items: [
      { name: 'Wash & Fold', price: 150 },
      { name: 'Wash & Iron', price: 180 },
    ],
  },
  {
    id: 'steam-iron',
    label: 'Steam Iron',
    hasSteamIron: false,
    items: [
      { name: 'Steam Iron', price: 35 },
      { name: 'Anarkali ( Regular )', price: 80 },
      { name: 'Anarkali ( Light Work )', price: 110 },
      { name: 'Anarkali ( Party wear )', price: 250 },
      { name: 'Bed Cover / Bedsheet ( Single )', price: 110 },
      { name: 'Bed Cover / Bedsheet ( Double )', price: 150 },
      { name: 'Blouse', price: 40 },
      { name: 'Blouse ( Party wear )', price: 60 },
      { name: 'Blazer / Coat', price: 120 },
      { name: 'Blazer / Coat ( Party wear )', price: 160 },
      { name: 'Curtain Net ( per Sq. Ft. )', price: 4 },
      { name: 'Curtain Single lining ( per Sq. Ft. )', price: 4 },
      { name: 'Curtain Double lining ( per Sq. Ft. )', price: 6 },
      { name: 'Cushion / Pillow Cover ( Regular )', price: 35 },
      { name: 'Cushion / Pillow Cover ( Large )', price: 35 },
      { name: 'Cargo Trouser', price: 40 },
      { name: 'Cargo Jeans', price: 40 },
      { name: 'Dhoti', price: 40 },
      { name: 'Dhoti ( Party wear )', price: 60 },
      { name: 'Dress ( Short )', price: 35 },
      { name: 'Dress ( Long )', price: 50 },
      { name: 'Dress ( Long Party wear )', price: 90 },
      { name: 'Dupatta / Stole', price: 35 },
      { name: 'Dupatta / Stole ( Party wear )', price: 55 },
      { name: 'Gowns ( Regular )', price: 150 },
      { name: 'Gowns ( Party wear )', price: 200 },
      { name: 'Hoodie', price: 35 },
      { name: 'Jacket ( Formal )', price: 40 },
      { name: 'Jeans', price: 40 },
      { name: 'Jump Suit', price: 60 },
      { name: "Kid's wear ( Regular )", price: 25 },
      { name: "Kid's wear ( Party wear )", price: 35 },
      { name: 'Kurta ( Short )', price: 35 },
      { name: 'Kurta ( Long )', price: 40 },
      { name: 'Kurta ( Silk )', price: 50 },
      { name: 'Kurta ( Party wear )', price: 70 },
      { name: 'Leggings', price: 35 },
      { name: 'Lehenga ( Regular )', price: 150 },
      { name: 'Lehenga ( Light work )', price: 200 },
      { name: 'Lehenga ( Party wear )', price: 300 },
      { name: 'Over Coat', price: 150 },
      { name: 'Plazo', price: 40 },
      { name: 'Plazo ( Party wear )', price: 60 },
      { name: 'Petticoat ( Regular )', price: 35 },
      { name: 'Petticoat ( Silk )', price: 45 },
      { name: 'Pyajama', price: 35 },
      { name: 'Salwar', price: 35 },
      { name: 'Saree ( Cotton )', price: 80 },
      { name: 'Saree ( Silk )', price: 150 },
      { name: 'Saree ( Party wear )', price: 200 },
      { name: 'Shawl', price: 60 },
      { name: 'Sherwani ( Regular )', price: 150 },
      { name: 'Sherwani ( Light work )', price: 200 },
      { name: 'Sherwani ( Designer )', price: 300 },
      { name: 'Shirt', price: 35 },
      { name: 'Shirt ( Party wear )', price: 50 },
      { name: 'Shirt ( Valvate )', price: 60 },
      { name: "Short's", price: 35 },
      { name: 'Skirt ( Short )', price: 35 },
      { name: 'Skirt ( Long )', price: 35 },
      { name: 'Sofa Cover ( Single Seater )', price: 80 },
      { name: 'Sofa Cover ( Double Seater )', price: 90 },
      { name: 'Sofa Cover ( Three Seater )', price: 150 },
      { name: 'Suit ( 2 pcs )', price: 150 },
      { name: 'Suit ( 3 pcs )', price: 200 },
      { name: 'Sweater', price: 60 },
      { name: 'Sweatshirt', price: 35 },
      { name: 'T-Shirt', price: 35 },
      { name: 'Table Mate ( Regular )', price: 35 },
      { name: 'Table Mate ( Large )', price: 50 },
      { name: 'Tie', price: 35 },
      { name: 'Top', price: 35 },
      { name: 'Top ( Long )', price: 40 },
      { name: 'Top ( Party wear )', price: 60 },
      { name: 'Trouser', price: 35 },
      { name: 'Track pant', price: 35 },
      { name: 'Trouser(Valvate)', price: 90 },
      { name: 'Vest (Inner)', price: 35 },
      { name: 'Waist Coat', price: 80 },
      { name: 'Waist Coat ( Party wear )', price: 130 },
    ],
  },
  {
    id: 'accessories',
    label: 'Accessories',
    hasSteamIron: false,
    items: [
      { name: 'Laptop Bag Regular', price: 450 },
      { name: 'Laptop Bag Leather', price: 550 },
      { name: 'Flipflops', price: 250 },
      { name: 'Shoe ( Sports )', price: 450 },
      { name: 'Shoe ( Sued )', price: 550 },
      { name: 'Shoe ( Leather )', price: 550 },
    ],
  },
]

const ITEMS_PER_PAGE = 10

/* Flatten ALL items across every category (for the "All" tab) */
const allItems = priceCategories.flatMap(cat =>
  cat.items.map(item => ({ ...item, _cat: cat.label, _hasSteam: cat.hasSteamIron }))
)

const TABS = [
  { id: 'all', label: '✦ All', hasSteamIron: false },
  ...priceCategories.map(c => ({ id: c.id, label: c.label, hasSteamIron: c.hasSteamIron })),
]

export default function Services() {
  const { ref, inView } = useReveal(0)
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const activeTabMeta = TABS.find(t => t.id === activeTab)

  /* Source items: all combined or single category */
  const sourceItems = activeTab === 'all'
    ? allItems
    : (priceCategories.find(c => c.id === activeTab)?.items ?? [])

  /* Filter by search */
  const filteredItems = sourceItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  /* Paginated slice */
  const displayedItems = filteredItems.slice(0, page * ITEMS_PER_PAGE)
  const hasMore = displayedItems.length < filteredItems.length
  const remaining = filteredItems.length - displayedItems.length

  const handleTabChange = (id) => {
    setActiveTab(id)
    setSearch('')
    setPage(1)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleServiceClick = (targetTab) => {
    if (targetTab) {
      handleTabChange(targetTab)
    }
    // slightly delay scroll to ensure React updates the DOM/tab switch first
    setTimeout(() => {
      document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <section id="services" className="section services" ref={ref}>
      <div className="container">

        {/* ── Section header ── */}
        <motion.div
          className="services__header"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <p className="section-label">What We Do</p>
          <h2 className="section-title">
            Every Garment, <span className="gradient-text">Perfectly Cared For</span>
          </h2>
          <p className="section-sub">
            From everyday laundry to specialist dry cleaning — we handle it all with professional-grade equipment.
          </p>
        </motion.div>

        {/* ── Service highlight cards ── */}
        <div className="services__grid">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className="services__card glass-card"
              variants={fadeUp}
              custom={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => handleServiceClick(s.targetTab || 'all')}
              style={{ cursor: 'pointer' }}
            >
              {s.tag && <span className="services__tag">{s.tag}</span>}
              <div className="services__icon">{s.icon}</div>
              <h3 className="services__title">{s.title}</h3>
              <p className="services__desc">{s.desc}</p>
              {s.disclaimer && <p className="services__disclaimer">{s.disclaimer}</p>}
              <div className="services__arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Price List (id="pricing" so navbar link works) ── */}
        <motion.div
          id="pricing"
          className="pricelist"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="pricelist__header">
            <p className="section-label">Transparent Pricing</p>
            <h2 className="section-title">
              Simple, <span className="gradient-text">Fair Prices</span>
            </h2>
            <p className="section-sub">No hidden charges. All prices per piece unless stated otherwise.</p>
          </div>

          {/* Tabs */}
          <div className="pricelist__tabs">
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`pricelist__tab${activeTab === tab.id ? ' active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="pricelist__search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder={activeTab === 'all' ? 'Search all services…' : `Search in ${activeTabMeta?.label ?? ''}…`}
              value={search}
              onChange={handleSearch}
            />
            {search && (
              <button className="pricelist__clear" onClick={() => { setSearch(''); setPage(1) }}>✕</button>
            )}
          </div>

          {/* Result count */}
          {search && (
            <p className="pricelist__count">
              {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} found
            </p>
          )}

          {/* Card rows */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="pricelist__list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {filteredItems.length === 0 ? (
                <div className="pricelist__empty">No items found for "{search}".</div>
              ) : (
                <>
                  {displayedItems.map((item, i) => (
                    <motion.div
                      key={`${activeTab}-${item.name}`}
                      className="pricelist__row glass-card"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.015, duration: 0.3 }}
                    >
                      <div className="pricelist__row-left">
                        {/* Category chip - only shown in All tab */}
                        {activeTab === 'all' && (
                          <span className="pricelist__cat-chip">{item._cat}</span>
                        )}
                        <span className="pricelist__name">{item.name}</span>
                      </div>
                      <div className="pricelist__row-right">
                        {/* Steam iron price badge (dry cleaning items only) */}
                        {item._hasSteam && item.steam != null && (
                          <div className="pricelist__steam-badge">
                            <span className="pricelist__steam-label">Steam</span>
                            <span className="pricelist__steam-val">₹{item.steam}</span>
                          </div>
                        )}
                        <div className="pricelist__price-block">
                          <span className="pricelist__price">₹{item.price}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Show More button */}
                  {hasMore && (
                    <motion.div
                      className="pricelist__showmore"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <button
                        className="pricelist__showmore-btn"
                        onClick={() => setPage(p => p + 1)}
                      >
                        Show {Math.min(remaining, ITEMS_PER_PAGE)} more
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M12 5v14M5 12l7 7 7-7" />
                        </svg>
                      </button>
                      <span className="pricelist__showmore-hint">
                        {displayedItems.length} of {filteredItems.length} items
                      </span>
                    </motion.div>
                  )}
                </>
              )}

              {/* Footnote */}
              <motion.div
                className="pricelist__footnote"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                Free pickup &amp; delivery on orders above ₹500
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <p className="pricelist__note">
            📍 Andheri to Borivali &nbsp;|&nbsp; 🚀 Delivery in 48–72 hrs &nbsp;|&nbsp; 📞 +91 89606 63004
          </p>
        </motion.div>

      </div>
    </section>
  )
}
