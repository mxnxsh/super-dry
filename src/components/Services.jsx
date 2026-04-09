import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal, fadeUp } from '../hooks/useReveal'
import './Services.css'
import { priceList } from '../constants/priceList'
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
const priceCategories = priceList;

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
