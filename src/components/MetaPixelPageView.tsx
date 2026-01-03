// src/components/MetaPixelPageView.tsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export default function MetaPixelPageView() {
  const location = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false; // initial PageView already fired in index.html
      return;
    }
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [location.pathname, location.search]);

  return null;
}
