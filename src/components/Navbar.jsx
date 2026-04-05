import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container navbar__inner">
        {/* Logo */}
        <a href="#" className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="navbar__logo-icon">
            {/* <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 2 C8 2 3 7 3 13 S8 24 14 24 S25 19 25 13 S20 2 14 2Z" stroke="#d4af37" strokeWidth="1.5" fill="none" />
              <path d="M9 13 L14 8 L19 13" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="14" y1="8" x2="14" y2="20" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
              <circle cx="14" cy="6" r="1.5" fill="#d4af37" />
            </svg> */}
            <img
              src='/assets/images/logo.png'
              alt="SuperDry Logo"
              className="navbar__logo-img"
            />
          </span>
          <span>Super<span className="navbar__logo-accent">Dry</span></span>
        </a>

        {/* Desktop nav */}
        <nav className="navbar__links">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="navbar__link"
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="tel:+919876543210"
          className="btn-primary navbar__cta"
          onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
        >
          Book Now
        </a>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="navbar__mobile-link"
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary"
              style={{ marginTop: '8px', justifyContent: 'center' }}
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
            >
              Book Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
