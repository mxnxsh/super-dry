import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './LegalPage.css'

const TERMS_SECTIONS = [
  {
    title: 'Care & Processing',
    body: 'We exercise utmost care in processing articles entrusted to us and use such processes which, in our opinion, are the best suited to the nature and condition of each individual article.',
  },
  {
    title: 'Limitation of Liability',
    body: 'Nevertheless, we cannot assume responsibility for inherent weaknesses or defects in materials that are not readily apparent prior to processing. Responsibility is also disclaimed for trimmings, buckles, beads, belts or valuables.',
  },
  {
    title: 'Zari, Silk & Chiffon',
    body: 'We do not take any guarantee on Zari work, beads, and color loss in silk or chiffon fabric as they tend to lose color during the process.',
  },
  {
    title: 'Laundering — Color & Fabric',
    body: 'In laundering, we cannot guarantee against color loss, shrinking, or damage to weak or tender fabrics. Differences in count must be reported and the bill presented within 48 hrs. Unless a list accompanied the bundle, our count must be accepted. The company\'s liability with respect to any lost article does not exceed 5 times the charges of processing it.',
  },
  {
    title: 'Delivery',
    body: 'We do not assume responsibility for delivery of goods on the date stipulated on the bills due to causes beyond our control, such as acts of God including weather conditions, and/or breakdown, strikes, or labor shortage etc.',
  },
  {
    title: 'Jurisdiction',
    body: 'For legal purposes, all conditions shall be taken to have been entered into at Mumbai. Therefore, only Mumbai Courts will have jurisdiction to hear relevant disputes.',
  },
  {
    title: 'Binding Terms',
    body: 'These Terms and Conditions are binding. No Agent or employee of SuperDry Laundry and Dry Cleaning has authority to alter or vary them in any way.',
  },
]

const REFUND_SECTIONS = [
  {
    title: 'Our Quality Commitment',
    body: 'We exercise utmost care in processing articles entrusted to us and use such processes which, in our opinion, are the best suited to the nature and condition of each individual article.',
  },
  {
    title: 'Limitation of Responsibility',
    body: 'Nevertheless, we cannot assume responsibility for inherent weaknesses or defects in materials that are not readily apparent prior to processing. Responsibility is also disclaimed for trimmings, buckles, beads, belts, or valuables.',
  },
  {
    title: 'When Refund May Be Considered',
    body: 'A refund or re-cleaning may be considered only when: (a) a defect is clearly attributable to our processing, (b) the garment/article was in a satisfactory condition prior to handover, and (c) the concern is raised within 48 hours of delivery along with the original bill.',
  },
  {
    title: 'Non-Refundable Cases',
    body: 'We do not offer a refund in cases where damage is caused by inherent fabric weakness, color bleed, shrinkage of sensitive materials (silk, chiffon, etc.), or loss of Zari work and decorative beads. These are known industry risks that cannot be controlled during professional cleaning.',
  },
  {
    title: 'Process for Claims',
    body: 'To raise a return or refund claim, please contact us within 48 hours of receiving your order — via WhatsApp or phone — with your bill number and a description of the concern. Our team will assess and respond promptly.',
  },
]

const PRIVACY_SECTIONS = [
  {
    title: 'Information We Collect',
    body: 'When you use our services or contact us, we may collect your name, phone number, address, and service preferences. This information is used solely to fulfill your laundry and dry-cleaning orders.',
  },
  {
    title: 'How We Use Your Information',
    body: 'Your personal details are used to process orders, communicate delivery schedules, send booking confirmations via WhatsApp/SMS, and improve our service quality. We do not use your data for unsolicited marketing.',
  },
  {
    title: 'Data Sharing',
    body: 'We do not sell, rent, or share your personal information with third parties. Your data is strictly used for order fulfillment and internal service purposes.',
  },
  {
    title: 'Data Security',
    body: 'We take reasonable precautions to protect your information from unauthorized access, misuse, or disclosure. All customer records are handled with confidentiality by our staff.',
  },
  {
    title: 'WhatsApp & Communication',
    body: 'By initiating a booking or inquiry via WhatsApp, you consent to receiving service-related messages (e.g., order status, pickup reminders) from SuperDry Laundry. You may opt out at any time by informing us.',
  },
  {
    title: 'Changes to This Policy',
    body: 'We reserve the right to update this Privacy Policy at any time. The latest version will always be available on our website. Continued use of our services constitutes acceptance of any changes.',
  },
  {
    title: 'Contact',
    body: 'For any questions about how we handle your data, please contact us directly via WhatsApp or phone. We are happy to address any concerns.',
  },
]

const TABS = [
  { id: 'terms', label: '📋 Terms & Conditions' },
  { id: 'refund', label: '↩️ Return & Refund' },
  { id: 'privacy', label: '🔒 Privacy Policy' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function LegalPage({ onBack }) {
  const [activeTab, setActiveTab] = useState('terms')

  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const sections =
    activeTab === 'terms'
      ? TERMS_SECTIONS
      : activeTab === 'refund'
      ? REFUND_SECTIONS
      : PRIVACY_SECTIONS

  return (
    <div className="legal-page">
      <div className="container">
        {/* Back button */}
        <button className="legal-page__back" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="legal-page__badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4z" />
            </svg>
            SuperDry Laundry & Dry Cleaning
          </div>
          <h1 className="legal-page__title">Policies &amp; Terms</h1>
          <p className="legal-page__meta">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Last updated: April 2025
            &nbsp;·&nbsp;
            <span>Effective for all customers</span>
          </p>
        </motion.div>

        {/* Tab switcher */}
        <div className="legal-page__tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`legal-page__tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content card */}
        <motion.div
          key={activeTab}
          className="legal-page__card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {sections.map((sec, i) => (
            <motion.div
              key={sec.title}
              className="legal-page__section"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <div className="legal-page__section-title">{sec.title}</div>
              <p className="legal-page__section-body">{sec.body}</p>
              {i < sections.length - 1 && <div className="legal-page__divider" />}
            </motion.div>
          ))}

          {/* Jurisdiction note (only on Terms tab) */}
          {activeTab === 'terms' && (
            <div className="legal-page__note">
              <span className="legal-page__note-icon">⚖️</span>
              <span>
                All disputes shall be governed by and construed in accordance with Indian law. Only courts in{' '}
                <strong>Mumbai</strong> shall have exclusive jurisdiction.
              </span>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="legal-page__note">
              <span className="legal-page__note-icon">📞</span>
              <span>
                Concerns must be raised <strong>within 48 hours</strong> of delivery with your original bill.
                Contact us via WhatsApp or call to initiate a claim.
              </span>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="legal-page__note">
              <span className="legal-page__note-icon">🔐</span>
              <span>
                Your data is never sold. For privacy concerns, reach out directly via WhatsApp or call.
                We take data protection seriously.
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
