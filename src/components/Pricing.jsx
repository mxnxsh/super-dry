import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal, fadeUp } from '../hooks/useReveal'
import './Pricing.css'

const categories = [
  {
    id: 'laundry',
    label: '🧺 Laundry by Kilo',
    items: [
      { name: 'Wash & Fold', price: '₹150', unit: '/kg', popular: true },
      { name: 'Wash & Iron', price: '₹180', unit: '/kg', popular: false },
    ],
  },
  {
    id: 'iron',
    label: '👔 Ironing',
    items: [
      { name: 'Steam Iron', price: '₹35', unit: '/piece', popular: false },
    ],
  },
  {
    id: 'accessories',
    label: '👜 Accessories & Specialty',
    items: [
      { name: 'Laptop Bag (Regular)', price: '₹450', unit: '', popular: false },
      { name: 'Laptop Bag (Leather)', price: '₹550', unit: '', popular: false },
      { name: 'Flipflops', price: '₹250', unit: '', popular: false },
      { name: 'Shoes (Sports)', price: '₹450', unit: '', popular: true },
      { name: 'Shoes (Suede)', price: '₹550', unit: '', popular: false },
      { name: 'Shoes (Leather)', price: '₹550', unit: '', popular: false },
    ],
  },
]

export default function Pricing() {
  const [active, setActive] = useState('laundry')
  const { ref, inView } = useReveal()

  return (
    <section id="pricing" className="section pricing" ref={ref}>
      <div className="container">
        <motion.div
          className="pricing__header"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <p className="section-label">Transparent Pricing</p>
          <h2 className="section-title">
            Simple, <span className="gradient-text">Fair Prices</span>
          </h2>
          <p className="section-sub">No hidden charges. Just clean clothes.</p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="pricing__tabs"
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`pricing__tab ${active === cat.id ? 'active' : ''}`}
              onClick={() => setActive(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Price list */}
        <AnimatePresence mode="wait">
          {categories.map((cat) =>
            cat.id === active ? (
              <motion.div
                key={cat.id}
                className="pricing__list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                {cat.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    className={`pricing__row glass-card ${item.popular ? 'pricing__row--popular' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                  >
                    <div className="pricing__row-left">
                      {item.popular && <span className="pricing__popular-badge">★ Most Popular</span>}
                      <span className="pricing__name">{item.name}</span>
                    </div>
                    <div className="pricing__row-right">
                      <span className="pricing__price">{item.price}</span>
                      {item.unit && <span className="pricing__unit">{item.unit}</span>}
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  className="pricing__note"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Free pickup & delivery on orders above ₹500
                </motion.div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
