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

function App() {
  const [page, setPage] = useState('home')

  if (page === 'legal') {
    return (
      <>
        <Navbar onLegalClick={() => setPage('legal')} />
        <LegalPage onBack={() => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
        <Footer onLegalClick={() => setPage('legal')} />
        <FloatingCTA />
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
    </div>
  )
}

export default App
