import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Hero } from './sections/Hero'
import TeamMemberSection from './sections/Team'
import Work from './sections/Work'  
import Services from './sections/Services'
import Contact from './sections/Contact'
import About from './sections/About'
import IkigaiQuoteFlow from "./sections/Services-GetQuote";
import Home from './sections/Home'

export default function App() {
  return (
    <div className="min-h-screen bg-base text-white antialiased">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<TeamMemberSection />} />
        <Route path="/work" element={<Work />} />  
	<Route path="/services" element={<Services />} />
	<Route path="/services/get-quote" element={<IkigaiQuoteFlow />} />
	<Route path="/contact" element={<Contact />} />
	<Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

