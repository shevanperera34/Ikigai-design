import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop"; // <- keep your existing one (rename path if needed)

import TeamMemberSection from "./sections/Team";
import Work from "./sections/Work";
import Services from "./sections/Services";
import Contact from "./sections/Contact";
import About from "./sections/About";
import IkigaiQuoteFlow from "./sections/Services-GetQuote";
import Home from "./sections/Home";

import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-base text-white antialiased flex flex-col">
      <ScrollToTop />
      <Navbar />

      <div className="flex-1">
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

      <Footer />
    </div>
  );
}

