import { useState, useMemo, useCallback, useRef, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal, fadeUp } from '../hooks/useReveal'
import './Services.css'
import { priceList } from '../constants/priceList'
import ServiceCard from './ServiceCard'
import { servicesData } from '../data/servicesData'

/* ─────────────────────────────────────────────────────────────
   MODULE-LEVEL CONSTANTS
   Computed once at load time — never recalculated on re-render
───────────────────────────────────────────────────────────── */
const priceCategories = priceList
const ITEMS_PER_PAGE = 10

// Flattened "All" list — computed once, not inside the component
const allItems = priceCategories.flatMap(cat =>
  cat.items.map(item => ({
    ...item,
    _cat: cat.label,
    _hasSteam: cat.hasSteamIron,
  }))
)

// Tab definitions — static, never changes
const TABS = [
  { id: 'all', label: '✦ All', hasSteamIron: false },
  ...priceCategories.map(c => ({ id: c.id, label: c.label, hasSteamIron: c.hasSteamIron })),
]

// Category map for O(1) lookup instead of .find() on every render
const categoryMap = Object.fromEntries(priceCategories.map(c => [c.id, c]))

/* ─────────────────────────────────────────────────────────────
   PRICE ROW — memoized so it only re-renders when its own
   props change, not when parent state changes (search/page)
───────────────────────────────────────────────────────────── */
const PriceRow = memo(function PriceRow({ item, showCatChip }) {
  return (
    // CSS handles the fade-in via .pricelist__row-animated class
    // Avoids framer-motion overhead on 90+ simultaneous items
    <div className="pricelist__row glass-card pricelist__row-animated">
      <div className="pricelist__row-left">
        {showCatChip && (
          <span className="pricelist__cat-chip">{item._cat}</span>
        )}
        <span className="pricelist__name">{item.name}</span>
      </div>

      <div className="pricelist__row-right">
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
    </div>
  )
})

/* ─────────────────────────────────────────────────────────────
   CUSTOM HOOK — debounced search value (300ms)
   Prevents filtering the 100+ item list on every keystroke
───────────────────────────────────────────────────────────── */
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  const timerRef = useRef(null)

  const update = useCallback((val) => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setDebounced(val), delay)
  }, [delay])

  return [debounced, update]
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function Services() {
  const { ref, inView } = useReveal(0)
  const [activeTab, setActiveTab] = useState('all')
  const [rawSearch, setRawSearch] = useState('')
  const [page, setPage] = useState(1)

  // debouncedSearch is what actually drives filtering (300ms lag)
  const [debouncedSearch, updateDebounced] = useDebounce('', 300)

  // Active tab metadata — O(1) array find on tiny TABS array, cheap
  const activeTabMeta = useMemo(
    () => TABS.find(t => t.id === activeTab),
    [activeTab]
  )

  // Source items — O(1) map lookup instead of .find() on every render
  const sourceItems = useMemo(
    () => (activeTab === 'all' ? allItems : categoryMap[activeTab]?.items ?? []),
    [activeTab]
  )

  // Filtered items — only recalculates when source or debounced search changes
  const filteredItems = useMemo(() => {
    if (!debouncedSearch) return sourceItems
    const lower = debouncedSearch.toLowerCase()
    return sourceItems.filter(item => item.name.toLowerCase().includes(lower))
  }, [sourceItems, debouncedSearch])

  // Paginated slice — only recalculates when filtered list or page changes
  const displayedItems = useMemo(
    () => filteredItems.slice(0, page * ITEMS_PER_PAGE),
    [filteredItems, page]
  )

  const hasMore = displayedItems.length < filteredItems.length
  const remaining = filteredItems.length - displayedItems.length

  /* ── Stable handlers via useCallback ── */

  const handleTabChange = useCallback((id) => {
    setActiveTab(id)
    setRawSearch('')
    updateDebounced('')
    setPage(1)
  }, [updateDebounced])

  const handleSearch = useCallback((e) => {
    const val = e.target.value
    setRawSearch(val)       // instant UI update (controlled input)
    updateDebounced(val)    // debounced → triggers filtering after 300ms
    setPage(1)
  }, [updateDebounced])

  const handleClear = useCallback(() => {
    setRawSearch('')
    updateDebounced('')
    setPage(1)
  }, [updateDebounced])

  const handleShowMore = useCallback(() => {
    setPage(p => p + 1)
  }, [])

  const handleServiceClick = useCallback((targetTab) => {
    if (targetTab) handleTabChange(targetTab)
    // Slight delay to let React flush the tab state before scrolling
    setTimeout(() => {
      document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }, [handleTabChange])

  // Show category chip only in "All" tab — stable boolean per render
  const showCatChip = activeTab === 'all'

  // Precompute stable click handlers — one per card, never recreated
  // Avoids inline () => fn() creating a new function reference every render
  const cardClickHandlers = useMemo(
    () => servicesData.map(s => () => handleServiceClick(s.targetTab || 'all')),
    [handleServiceClick]
  )

  return (
    <section id="services" className="section services" ref={ref}>
      <div className="container">

        {/* ── Section header — single animation at container level ── */}
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
            From everyday laundry to specialist dry cleaning — we handle it all with
            professional-grade equipment.
          </p>
        </motion.div>

        {/*
          ONE motion.div wraps the entire grid.
          Cards themselves are plain divs — no per-card JS animation.
          CSS @keyframes + nth-child delays handle the stagger at GPU level.
        */}
        <motion.div
          className="services__grid"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {servicesData.map((s, i) => (
            <ServiceCard
              key={s.title}
              image={s.image}
              icon={s.icon}
              title={s.title}
              desc={s.desc}
              tag={s.tag}
              disclaimer={s.disclaimer}
              // Stable precomputed handler — no new function on each render
              onClick={cardClickHandlers[i]}
            />
          ))}
        </motion.div>

        {/* ── Price List ── */}
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
            <p className="section-sub">
              No hidden charges. All prices per piece unless stated otherwise.
            </p>
          </div>

          {/* Tabs */}
          <div className="pricelist__tabs">
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`pricelist__tab ${activeTab === tab.id ? 'active' : ''}`}
                // Inline arrow is fine here — TABS is tiny (5 items)
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search — controlled by rawSearch for instant feedback,
              filtered by debouncedSearch to avoid per-keystroke work */}
          <div className="pricelist__search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>

            <input
              type="text"
              placeholder={
                activeTab === 'all'
                  ? 'Search all services…'
                  : `Search in ${activeTabMeta?.label ?? ''}…`
              }
              value={rawSearch}
              onChange={handleSearch}
            />

            {rawSearch && (
              <button className="pricelist__clear" onClick={handleClear}>✕</button>
            )}
          </div>

          {/* Result count — uses filteredItems.length (debounced result) */}
          {debouncedSearch && (
            <p className="pricelist__count">
              {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} found
            </p>
          )}

          {/* Card rows — AnimatePresence only on the container (tab switch),
              individual rows use CSS animation to avoid 90× motion overhead */}
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
                <div className="pricelist__empty">
                  No items found for "{debouncedSearch}".
                </div>
              ) : (
                <>
                  {displayedItems.map(item => (
                    // PriceRow is memoized — skips re-render unless item changes
                    <PriceRow
                      key={`${activeTab}-${item.name}`}
                      item={item}
                      showCatChip={showCatChip}
                    />
                  ))}

                  {/* Show More */}
                  {hasMore && (
                    <div className="pricelist__showmore">
                      <button
                        className="pricelist__showmore-btn"
                        onClick={handleShowMore}
                      >
                        Show {Math.min(remaining, ITEMS_PER_PAGE)} more
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M12 5v14M5 12l7 7 7-7" />
                        </svg>
                      </button>
                      <span className="pricelist__showmore-hint">
                        {displayedItems.length} of {filteredItems.length} items
                      </span>
                    </div>
                  )}
                </>
              )}

              {/* Footnote */}
              <div className="pricelist__footnote">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Free pickup &amp; delivery on orders above ₹500
              </div>
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