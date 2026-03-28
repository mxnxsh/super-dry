import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Process from './components/Process'
import Trust from './components/Trust'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'

function App() {
  return (
    <div className="app">
      <Navbar />
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
      <Footer />
      <FloatingCTA />
    </div>
  )
}

export default App
