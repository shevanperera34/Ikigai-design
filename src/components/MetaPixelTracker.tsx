// src/components/MetaPixelTracker.tsx
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { metaPixel } from "../lib/metaPixel"

export default function MetaPixelTracker() {
  const location = useLocation()

  useEffect(() => {
    // Fires on every route change in SPA
    metaPixel.pageView()
  }, [location.pathname, location.search])

  return null
}
