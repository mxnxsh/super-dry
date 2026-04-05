import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import './Hero.css'

function FloatingHanger() {
  return (
    <div className="hero__hanger-wrap">
      <motion.div
        className="hero__hanger"
        animate={{ y: [0, -18, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glow aura */}
          <defs>
            <radialGradient id="aura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <ellipse cx="100" cy="105" rx="85" ry="60" fill="url(#aura)" />

          {/* Hook */}
          <path d="M100 20 C100 20 112 20 112 32 C112 44 100 44 100 44" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#glow)" />
          <circle cx="100" cy="16" r="5" fill="var(--gold)" filter="url(#glow)" />

          {/* Hanger bar */}
          <path d="M100 44 L100 68 L42 110 Q30 120 30 130 L170 130 Q170 120 158 110 L100 68" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(43, 130, 201, 0.06)" filter="url(#glow)" />

          {/* Shine effect */}
          <path d="M60 95 L90 78" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Sparkles */}
          <motion.g animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
            <line x1="35" y1="60" x2="35" y2="70" stroke="var(--gold-light)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <line x1="30" y1="65" x2="40" y2="65" stroke="var(--gold-light)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          </motion.g>
          <motion.g animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}>
            <line x1="160" y1="75" x2="160" y2="83" stroke="var(--gold-light)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <line x1="156" y1="79" x2="164" y2="79" stroke="var(--gold-light)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </motion.g>
          <motion.g animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}>
            <circle cx="145" cy="55" r="2" fill="var(--gold-light)" opacity="0.7" />
          </motion.g>

          {/* Fabric */}
          <path d="M35 130 Q40 155 55 162 L145 162 Q160 155 165 130 Z" fill="rgba(43, 130, 201, 0.08)" stroke="rgba(43, 130, 201, 0.25)" strokeWidth="1" />
          <line x1="80" y1="130" x2="80" y2="162" stroke="rgba(43, 130, 201, 0.15)" strokeWidth="1" />
          <line x1="120" y1="130" x2="120" y2="162" stroke="rgba(43, 130, 201, 0.15)" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Orbital rings */}
      <motion.div
        className="hero__ring hero__ring--1"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="hero__ring hero__ring--2"
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      {/* Floating badges */}
      <motion.div
        className="hero__badge hero__badge--top"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <span>✦</span> 48–72hr Delivery
      </motion.div>
      <motion.div
        className="hero__badge hero__badge--bottom"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <span>✦</span> Premium Clean
      </motion.div>
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 120]), { stiffness: 60, damping: 20 })
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section id="home" className="hero" ref={ref}>
      {/* Radial bg glow */}
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />
      <div className="hero__grid-overlay" />

      <motion.div className="container hero__inner" style={{ y, opacity }}>
        {/* Left content */}
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="hero__tag">
            <span className="glow-dot" />
            <span>Serving Vile Parle → Borivali</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="hero__title">
            Premium Laundry<br />
            <span className="gradient-text">&amp; Dry Cleaning,</span><br />
            Delivered to Your<br />Doorstep
          </motion.h1>

          <motion.p variants={itemVariants} className="hero__sub">
            Fast, reliable, and professional cleaning services — fresh clothes back in <strong>48–72 hours</strong>.
          </motion.p>

          <motion.div variants={itemVariants} className="hero__ctas">
            <a
              href="#contact"
              className="btn-primary"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              Book Now
            </a>
            <a
              href="#pricing"
              className="btn-outline"
              onClick={(e) => { e.preventDefault(); document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              View Pricing
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="hero__stats">
            {[
              { value: '500+', label: 'Happy Clients' },
              { value: '48hr', label: 'Avg. Turnaround' },
              { value: '7+', label: 'Services' },
            ].map((s) => (
              <div key={s.label} className="hero__stat">
                <span className="hero__stat-value">{s.value}</span>
                <span className="hero__stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right 3D element */}
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.8, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <FloatingHanger />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="hero__scroll-dot"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  )
}
