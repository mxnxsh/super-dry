import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReveal, fadeUp } from '../hooks/useReveal'
import './Contact.css'

export default function Contact() {
  const { ref, inView } = useReveal(0.1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [locality, setLocality] = useState('')

  const isValid = name.trim() !== '' && phone.trim() !== '' && locality.trim() !== ''

  const handleWhatsApp = () => {
    if (!isValid) return
    const message = `Hi, I want to book a laundry pickup!\nName: ${name}\nPhone: ${phone}\nLocality: ${locality}`
    window.open(`https://wa.me/918960663004?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="container">
        <motion.div
          className="contact__header"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">
            Ready for <span className="gradient-text">Fresh Clothes?</span>
          </h2>
          <p className="section-sub">Book your first pickup — it only takes 30 seconds.</p>
        </motion.div>

        <div className="contact__grid">
          {/* Contact info */}
          <motion.div
            className="contact__info"
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3C5.44.18 5.83.47 5.9.86a12.6 12.6 0 00.68 2.72.95.95 0 01-.22 1l-1.28 1.28a16 16 0 006.86 6.86l1.28-1.28a.95.95 0 011-.22c.9.35 1.83.58 2.72.68.4.07.69.46.69.91z" />
                  </svg>
                ),
                label: 'Call / WhatsApp',
                value: '+91 89606 63004',
                href: 'tel:+918960663004',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
                label: 'Email',
                value: 'superdrylaundry3@gmail.com',
                href: 'mailto:superdrylaundry3@gmail.com',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ),
                label: 'Instagram',
                value: '@superdrylaundry3',
                href: 'https://instagram.com/superdrylaundry3',
              },
            ].map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="contact__item glass-card"
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                whileHover={{ x: 6, borderColor: 'rgba(212,175,55,0.5)' }}
              >
                <span className="contact__item-icon">{item.icon}</span>
                <div>
                  <div className="contact__item-label">{item.label}</div>
                  <div className="contact__item-value">{item.value}</div>
                </div>
                <span className="contact__arrow">→</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Quick book form */}
          <motion.div
            className="contact__form glass-card"
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <h3 className="contact__form-title">Quick Booking</h3>
            <p className="contact__form-sub">We'll call you back to confirm your slot.</p>

            <div className="contact__fields">
              <div className="contact__field">
                <label>Your Name</label>
                <input type="text" placeholder="e.g. Aditya Sharma" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="contact__field">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="contact__field">
                <label>Locality</label>
                <input type="text" placeholder="e.g. Andheri West" value={locality} onChange={(e) => setLocality(e.target.value)} />
              </div>
            </div>

            <motion.button
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                opacity: isValid ? 1 : 0.45,
                cursor: isValid ? 'pointer' : 'not-allowed',
              }}
              whileHover={isValid ? { scale: 1.02 } : {}}
              whileTap={isValid ? { scale: 0.98 } : {}}
              disabled={!isValid}
              onClick={handleWhatsApp}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
              Request Pickup via WhatsApp
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
