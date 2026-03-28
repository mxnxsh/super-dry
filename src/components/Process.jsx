import { motion } from 'framer-motion'
import { useReveal, fadeUp } from '../hooks/useReveal'
import './Process.css'

const steps = [
  {
    num: '01',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="8" y="10" width="32" height="32" rx="6" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 6v8M32 6v8M8 22h32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="32" r="3" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
    title: 'Schedule Pickup',
    desc: 'Book online or via WhatsApp. We arrive at your doorstep.',
  },
  {
    num: '02',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2"/>
        <path d="M24 14v10l6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 24h4M34 24h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
    title: 'We Clean Professionally',
    desc: 'Expert care with premium detergents and equipment.',
  },
  {
    num: '03',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M10 24l10 10 18-20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
      </svg>
    ),
    title: 'Quality Check',
    desc: 'Every garment inspected before packaging.',
  },
  {
    num: '04',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="6" y="22" width="36" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M14 22V16a10 10 0 0120 0v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="30" r="3" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
    title: 'Delivered to You',
    desc: 'Fresh & folded within 48–72 hrs, right to your address.',
  },
]

export default function Process() {
  const { ref, inView } = useReveal(0.1)

  return (
    <section id="process" className="section process" ref={ref}>
      <div className="container">
        <motion.div
          className="process__header"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <p className="section-label">How It Works</p>
          <h2 className="section-title">
            Clean in <span className="gradient-text">4 Simple Steps</span>
          </h2>
        </motion.div>

        <div className="process__steps">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="process__step"
              variants={fadeUp}
              custom={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <motion.div
                  className="process__connector"
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: 0.4 + i * 0.2, duration: 0.6, ease: 'easeOut' }}
                />
              )}

              <motion.div
                className="process__card glass-card"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="process__num">{step.num}</span>
                <div className="process__icon">{step.icon}</div>
                <h3 className="process__title">{step.title}</h3>
                <p className="process__desc">{step.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
