import './Footer.css'

export default function Footer({ onLegalClick }) {
  const year = new Date().getFullYear()

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container footer__inner">

        {/* Brand */}
        <div className="footer__brand">
          <span className="footer__logo">Super<span>Dry</span> Laundry</span>
          <p className="footer__tagline">Premium cleaning, delivered with care.</p>
        </div>

        {/* Nav links */}
        <div className="footer__links">
          {[
            { label: 'Services', href: '#services' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Process', href: '#process' },
            { label: 'Contact', href: '#contact' },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="footer__link"
              onClick={(e) => { e.preventDefault(); scrollTo(l.href) }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="footer__hr" />

        {/* Legal links */}
        <div className="footer__legal-links">
          <button className="footer__legal-link" onClick={onLegalClick}>
            Terms &amp; Conditions
          </button>
          <span className="footer__legal-dot">·</span>
          <button className="footer__legal-link" onClick={onLegalClick}>
            Refund Policy
          </button>
          <span className="footer__legal-dot">·</span>
          <button className="footer__legal-link" onClick={onLegalClick}>
            Privacy Policy
          </button>
        </div>

        {/* Copyright */}
        <p className="footer__copy">
          © {year} SuperDry Laundry &amp; Dry Cleaning. All rights reserved.
          <br />
          <span>Mumbai, India</span>
        </p>
      </div>
    </footer>
  )
}
