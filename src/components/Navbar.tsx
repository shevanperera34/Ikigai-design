import { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

export function Navbar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [showBrand, setShowBrand] = useState(true)

  // ✅ mobile detect + home-mobile visibility gate
  const [isMobile, setIsMobile] = useState(false)
  const [showNavMobileHome, setShowNavMobileHome] = useState(true)

  const location = useLocation()
  const isHome = location.pathname === '/'
  const isCareSafePath = location.pathname === '/services/caresafe'
  const isAlignmentPath =
    location.pathname.startsWith('/services/alignment') ||
    location.pathname.startsWith('/services/custom-alignment')
  const isActPath = location.pathname.startsWith('/services/act')
  const isServiceDetailWithBack = isCareSafePath || isAlignmentPath || isActPath
  const isServiceDetailWithBackMobile = isServiceDetailWithBack && isMobile

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }
    navigate('/services')
  }

  // close the mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // ✅ safer mobile detection (no matchMedia listener edge cases)
  useEffect(() => {
    const calc = () => setIsMobile(window.innerWidth <= 767)
    calc()
    window.addEventListener('resize', calc, { passive: true })
    return () => window.removeEventListener('resize', calc)
  }, [])

  // ✅ HOME + MOBILE: navbar hidden on hero, appears at services, hides again if you scroll back to hero
useEffect(() => {
  // default: show everywhere else
  if (!isHome || !isMobile) {
    setShowNavMobileHome(true)
    return
  }

  setOpen(false)

  const hero = document.getElementById('home-hero')
  const services = document.getElementById('services')

  const setFromScrollFallback = () => {
    // hero zone ≈ top half-screen, services zone ≈ past ~70% of first screen
    const y = window.scrollY || 0
    const show = y > window.innerHeight * 0.7
    setShowNavMobileHome(show)
    if (!show) setOpen(false)
  }

  // Fallback if missing nodes or IO unsupported
  if (!hero || !services || !('IntersectionObserver' in window)) {
    setFromScrollFallback()
    window.addEventListener('scroll', setFromScrollFallback, { passive: true })
    return () => window.removeEventListener('scroll', setFromScrollFallback)
  }

  // Start hidden if hero is visible on load
  setShowNavMobileHome(false)

  // Observer 1: show navbar when Services enters
  const ioServices = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setShowNavMobileHome(true)
        setOpen(false)
      }
    },
    { threshold: 0.02, rootMargin: '-80px 0px 0px 0px' }
  )

  // Observer 2: hide navbar when Hero re-enters (scrolling back up)
  const ioHero = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setShowNavMobileHome(false)
        setOpen(false)
      }
    },
    { threshold: 0.05, rootMargin: '-40px 0px 0px 0px' }
  )

  ioServices.observe(services)
  ioHero.observe(hero)

  return () => {
    ioServices.disconnect()
    ioHero.disconnect()
  }
}, [isHome, isMobile])


  // homepage-only: brand hidden at top, appears after hero scroll (kept for desktop behavior)
  useEffect(() => {
    if (!isHome) {
      setShowBrand(true)
      return
    }

    setShowBrand(false)

    const hero = document.getElementById('home-hero')
    if (!hero || !('IntersectionObserver' in window)) {
      const onScroll = () => setShowBrand(window.scrollY > 120)
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    const io = new IntersectionObserver(
      ([entry]) => setShowBrand(!entry.isIntersecting),
      { threshold: 0.05, rootMargin: '-120px 0px 0px 0px' }
    )

    io.observe(hero)
    return () => io.disconnect()
  }, [isHome])

  const base =
    'px-3 py-1 rounded-full whitespace-nowrap text-white/90 hover:text-white hover:bg-white/10 transition ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30'
  const active = 'bg-white/15 text-white'

  const containerAlign = useMemo(() => {
    if (isServiceDetailWithBackMobile) return 'justify-between'
    if (isHome && !showBrand) return 'justify-center'
    return 'justify-between'
  }, [isServiceDetailWithBackMobile, isHome, showBrand])

  const brandWrapClass = useMemo(() => {
    if (isServiceDetailWithBackMobile) {
      return (
        'absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/95 ' +
        'min-w-0 max-w-[68%]'
      )
    }
    if (!isHome) return 'flex items-center gap-2 text-white'
    return (
      'flex items-center gap-2 text-white transition-all duration-500 ease-out ' +
      (showBrand
        ? 'opacity-90 translate-x-0 max-w-[220px]'
        : 'opacity-0 translate-x-6 max-w-0 overflow-hidden pointer-events-none')
    )
  }, [isServiceDetailWithBackMobile, isHome, showBrand])

  const desktopNavClass = useMemo(() => {
    const gapClass = isServiceDetailWithBack ? 'gap-1.5 lg:gap-2' : 'gap-2'
    return 'hidden md:flex items-center text-sm ' + gapClass + ' ' + (isHome && !showBrand ? '' : 'ml-1')
  }, [isHome, showBrand, isServiceDetailWithBack])

  // ✅ instead of returning null (safer), just hide the navbar container
  const hideOnHomeMobileHero = isHome && isMobile && !showNavMobileHome

  return (
    <div
      className={[
        'fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-1.5rem)] sm:w-auto',
        'transition-all duration-300',
        hideOnHomeMobileHero ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0',
      ].join(' ')}
    >
      <div
        className={[
          'relative flex items-center rounded-2xl border border-white/10',
          'bg-black/40 backdrop-blur-xl shadow-lg shadow-black/20',
          'px-4 sm:px-5 py-3',
          (isHome ? 'w-[720px]' : 'w-[720px]') + ' max-w-full',
          'gap-3 sm:gap-4',
          containerAlign,
        ].join(' ')}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl -z-10"
          style={{
            background:
              'radial-gradient(90% 70% at -10% -10%, rgba(0,51,255,0.10), transparent 60%), radial-gradient(90% 70% at 110% -10%, rgba(108,0,255,0.10), transparent 60%)',
          }}
        />

        {isServiceDetailWithBack && (
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full
                       border border-white/20 text-white/90 hover:bg-white/10 transition
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            aria-label="Go back"
            onClick={handleBack}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        <NavLink
          to="/"
          aria-label="Go to homepage"
          className={brandWrapClass + ' min-w-0 transition-opacity hover:opacity-100'}
        >
          <svg viewBox="0 0 1024 1024" width="20" height="20" aria-hidden="true" className="opacity-90 shrink-0">
            <path
              fill="currentColor"
              d="M912.5,511.5c0-220.91-179.09-400-400-400S112.5,290.59,112.5,511.5c0,205.64,155.19,375.04,354.84,397.47,0,0,64.72-95,69.66-131.97,5.46-40.88-39.67-119.92-36-161,1.27-14.27,25.52-35.89,28-50,2.47-14.02-17-43-16.5-54.5.03-.71,30.76,42.79,30.5,59.5-.19,12.44-18.55,33.57-19,46-1.54,42.66,40.53,122.45,44,165,2.6,31.85-12.49,127.21-12.49,127.21,200.69-21.45,356.99-191.32,356.99-397.71Z"
            />
          </svg>

          <span className="font-[Space_Grotesk] uppercase tracking-widest text-sm whitespace-nowrap overflow-hidden text-ellipsis">
            The Ikigai Project
          </span>
        </NavLink>

        <nav className={desktopNavClass}>
          <NavLink to="/" end className={({ isActive }) => `${base} ${isActive ? active : ''}`}>Home</NavLink>
          <NavLink to="/About" className={({ isActive }) => `${base} ${isActive ? active : ''}`}>About</NavLink>
          <NavLink to="/Services" className={({ isActive }) => `${base} ${isActive ? active : ''}`}>Services</NavLink>
          <NavLink to="/work" className={({ isActive }) => `${base} ${isActive ? active : ''}`}>Our Work</NavLink>
          <NavLink to="/Contact" className={({ isActive }) => `${base} ${isActive ? active : ''}`}>Contact</NavLink>
        </nav>

        <button
          type="button"
          className={`md:hidden ${isServiceDetailWithBackMobile ? '' : 'ml-auto'} inline-flex h-9 w-9 items-center justify-center rounded-full
                     border border-white/20 text-white/90 hover:bg-white/10 transition
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30`}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="ikigai-mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Open menu</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {open ? (
              <path strokeWidth="2" strokeLinecap="round" d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path strokeWidth="2" strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      <div
        id="ikigai-mobile-nav"
        className={`md:hidden mt-2 origin-top transition-all ${
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg shadow-black/20 px-3 py-3 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <NavLink to="/" end className={({ isActive }) => `${base} ${isActive ? active : ''}`}>Home</NavLink>
            <NavLink to="/About" className={({ isActive }) => `${base} ${isActive ? active : ''}`}>About</NavLink>
            <NavLink to="/Services" className={({ isActive }) => `${base} ${isActive ? active : ''}`}>Services</NavLink>
            <NavLink to="/work" className={({ isActive }) => `${base} ${isActive ? active : ''}`}>Our Work</NavLink>
            <NavLink to="/Contact" className={({ isActive }) => `${base} ${isActive ? active : ''}`}>Contact</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}
