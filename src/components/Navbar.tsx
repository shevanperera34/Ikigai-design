import React from 'react'
import { NavLink } from 'react-router-dom'

export function Navbar() {
  const base = "px-3 py-1 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition"
  const active = "bg-white/10 text-white"

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-20">
      <div className="flex items-center gap-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/20 px-6 py-3 shadow-insetTop">
        <div className="flex items-center gap-2 text-white/90">
          <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90">
            <path fill="currentColor" d="M12 2a1 1 0 0 1 1 1c0 3.314-2.686 6-6 6a1 1 0 1 1 0-2c2.21 0 4-1.79 4-4a1 1 0 0 1 1-1Zm8 9a1 1 0 0 1-1-1c0-2.21-1.79-4-4-4a1 1 0 1 1 0-2c3.314 0 6 2.686 6 6a1 1 0 0 1-1 1Zm-8 11a1 1 0 0 1-1-1c0-3.314 2.686-6 6-6a1 1 0 1 1 0 2c-2.21 0-4 1.79-4 4a1 1 0 0 1-1 1ZM2 13a1 1 0 0 1 1-1c2.21 0 4 1.79 4 4a1 1 0 1 1-2 0c0-1.105-.895-2-2-2a1 1 0 0 1-1-1Z"/>
          </svg>
          <span className="font-medium">Ikigai Project</span>
        </div>

        <nav className="ml-2 flex items-center gap-2 text-sm">
          <NavLink to="/" end className={({isActive}) => `${base} ${isActive ? active : ""}`}>Home</NavLink>
          <NavLink to="/team" className={({isActive}) => `${base} ${isActive ? active : ""}`}>Our Team</NavLink>
        </nav>
      </div>
    </div>
  )
}

