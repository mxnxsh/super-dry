import { motion } from 'framer-motion'
import { useReveal, fadeUp } from '../hooks/useReveal'
import './Trust.css'

const badges = [
  { icon: '🛡️', label: 'Quality Guarantee' },
  { icon: '🧪', label: 'Hygiene Certified' },
  { icon: '♻️', label: 'Eco-Friendly' },
  { icon: '📦', label: 'Safe Packaging' },
]

const testimonials = [
  {
    name: 'Meera Sharma',
    location: 'Andheri West',
    text: 'Absolutely love the service! Clothes come back perfectly clean and neatly folded. Been using for 6 months now.',
    rating: 5,
  },
  {
    name: 'Rahul Joshi',
    location: 'Borivali',
    text: 'The leather cleaning was exceptional. My shoes look brand new. Fast pickup and super punctual delivery!',
    rating: 5,
  },
  {
    name: 'Priya Nair',
    location: 'Kandivali',
    text: 'Professional, prompt and affordable. The dry cleaning quality is on par with premium services at a fair price.',
    rating: 5,
  },
]

export default function Trust() {
  const { ref, inView } = useReveal(0.1)

  return (
    <section id="trust" className="section trust" ref={ref}>
      <div className="container">
        {/* Coverage banner */}
        <motion.div
          className="trust__coverage glass-card"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className="trust__coverage-inner">
            <div className="trust__coverage-icon">📍</div>
            <div>
              <h3 className="trust__coverage-title">Service Area</h3>
              <p className="trust__coverage-text">Vile Parle → Andheri → Jogeshwari → Goregaon → Malad → Kandivali → Borivali → Mira Road</p>
            </div>
          </div>
          <div className="trust__coverage-right">
            <div className="trust__coverage-stat">
              <span className="trust__coverage-value">48–72</span>
              <span className="trust__coverage-unit">hr delivery</span>
            </div>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="trust__badges"
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {badges.map((b, i) => (
            <motion.div
              key={b.label}
              className="trust__badge glass-card"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -4, scale: 1.04 }}
            >
              <span className="trust__badge-icon">{b.icon}</span>
              <span className="trust__badge-label">{b.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="trust__header"
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <p className="section-label">Customer Love</p>
          <h2 className="section-title">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </motion.div>

        <div className="trust__testimonials">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="trust__card glass-card"
              variants={fadeUp}
              custom={i + 3}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -6 }}
            >
              <div className="trust__stars">
                {'★'.repeat(t.rating)}
              </div>
              <p className="trust__quote">"{t.text}"</p>
              <div className="trust__author">
                <div className="trust__avatar">{t.name[0]}</div>
                <div>
                  <div className="trust__name">{t.name}</div>
                  <div className="trust__loc">📍 {t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
