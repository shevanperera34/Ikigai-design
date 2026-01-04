// src/lib/metaPixel.ts
declare global {
  interface Window {
    fbq?: (...args: any[]) => void
    _fbq?: (...args: any[]) => void
  }
}

export const metaPixel = {
  pageView() {
    if (typeof window === "undefined") return
    if (typeof window.fbq !== "function") return
    window.fbq("track", "PageView")
  },

  track(eventName: string, params?: Record<string, any>) {
    if (typeof window === "undefined") return
    if (typeof window.fbq !== "function") return
    window.fbq("track", eventName, params || {})
  },
}
