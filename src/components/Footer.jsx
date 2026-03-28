import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">Super<span>Dry</span> Laundry</span>
          <p className="footer__tagline">Premium cleaning, delivered with care.</p>
        </div>
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
              onClick={(e) => { e.preventDefault(); document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <p className="footer__copy">© {year} SuperDry Laundry. All rights reserved.</p>
      </div>
    </footer>
  )
}
