import { useState } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Process from './components/Process'
import Trust from './components/Trust'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'
import LegalPage from './components/LegalPage'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react';
function App() {
  const [page, setPage] = useState('home')

  if (page === 'legal') {
    return (
      <>
        <Navbar onLegalClick={() => setPage('legal')} />
        <LegalPage onBack={() => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
        <Footer onLegalClick={() => setPage('legal')} />
        <FloatingCTA />
        <Analytics />
        <SpeedInsights />
      </>
    )
  }

  return (
    <div className="app">
      <Navbar onLegalClick={() => setPage('legal')} />
      <main>
        <Hero />
        <div className="divider" />
        <Services />
        <div className="divider" />
        <Process />
        <div className="divider" />
        <Trust />
        <div className="divider" />
        <Contact />
      </main>
      <Footer onLegalClick={() => setPage('legal')} />
      <FloatingCTA />
      <Analytics />
      <SpeedInsights />
    </div>
  )
}

export default App