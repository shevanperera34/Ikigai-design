import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

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
import PayQuote from "./sections/PayQuotes";
import PaySuccess from "./sections/PaySuccess";
import Alignment from "./sections/alignment";
import CareSafe from "./sections/caresafe";
import ActService from "./sections/act";
import ActFit from "./sections/act-fit";
import ActIntake from "./sections/act-intake";
import ActReportDemo from "./sections/act-report-demo";
import ActThankYou from "./sections/act-thank-you";

/**
 *  Meta Pixel SPA PageView tracker
 * Fires PageView on route change (not on initial load to avoid double fire)
 */
function MetaPixelRouteTracker() {
  const location = useLocation();
  const didInit = useRef(false);

  useEffect(() => {
    // Skip first render to avoid double PageView (index.html already tracks it)
    if (!didInit.current) {
      didInit.current = true;
      return;
    }

    if (typeof window !== "undefined" && typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "PageView");
    }
  }, [location.pathname, location.search]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-base text-white antialiased flex flex-col">
      <ScrollToTop />

      {/*  Track PageView on route changes */}
      <MetaPixelRouteTracker />

      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/get-quote" element={<IkigaiQuoteFlow />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/services/alignment" element={<Alignment />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/data-use" element={<DataUse />} />
          <Route path="/security" element={<Security />} />
          <Route path="/pay" element={<PayQuote />} />
          <Route path="/pay/success" element={<PaySuccess />} />
          <Route path="/services/caresafe" element={<CareSafe />} />
          <Route path="/services/act" element={<ActService />} />
          <Route path="/services/act/fit" element={<ActFit />} />
          <Route path="/services/act/intake" element={<ActIntake />} />
          <Route path="/services/act/report-demo" element={<ActReportDemo />} />
          <Route path="/services/act/thank-you" element={<ActThankYou />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
