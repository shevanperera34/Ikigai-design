import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop"; 

import Work from "./sections/Work";
import Services from "./sections/Services";
import Contact from "./sections/Contact";
import About from "./sections/About";
import IkigaiQuoteFlow from "./sections/Services-GetQuote";
import Home from "./sections/Home";
import Terms from "./sections/Terms";
import Privacy from "./sections/Privacy";
import DataUse from "./sections/DataUse";
import Security from "./sections/Security";
import Footer from "./components/Footer";
import PayQuote from "./sections/PayQuotes"
import PaySuccess from "./sections/PaySuccess";
import MetaPixelPageView from "./components/MetaPixelPageView";


export default function App() {
  return (
    <div className="min-h-screen bg-base text-white antialiased flex flex-col">
      <ScrollToTop />
      <MetaPixelPageView/>
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/get-quote" element={<IkigaiQuoteFlow />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/data-use" element={<DataUse />} />
          <Route path="/security" element={<Security />} />
          <Route path="/pay" element={<PayQuote />} />
          <Route path="/pay/success" element={<PaySuccess />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

