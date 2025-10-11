import React from 'react'
import { NavLink } from 'react-router-dom'

export function Navbar() {
  const base = "px-3 py-1 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition"
  const active = "bg-white/10 text-white"

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-20">
      <div className="flex items-center gap-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/20 px-6 py-3 shadow-insetTop">
<div className="flex items-center gap-2 text-white/90">
  <svg
    viewBox="0 0 1024 1024"
    width="20"
    height="20"
    aria-hidden="true"
    className="opacity-90"
  >
    <path
      fill="currentColor"
      d="M912.5,511.5c0-220.91-179.09-400-400-400S112.5,290.59,112.5,511.5c0,205.64,155.19,375.04,354.84,397.47,0,0,64.72-95,69.66-131.97,5.46-40.88-39.67-119.92-36-161,1.27-14.27,25.52-35.89,28-50,2.47-14.02-17-43-16.5-54.5.03-.71,30.76,42.79,30.5,59.5-.19,12.44-18.55,33.57-19,46-1.54,42.66,40.53,122.45,44,165,2.6,31.85-12.49,127.21-12.49,127.21,200.69-21.45,356.99-191.32,356.99-397.71Z"
    />
  </svg>
  <span className="font-medium">Ikigai Project</span>
</div>
        <nav className="ml-2 flex items-center gap-2 text-sm">
          <NavLink to="/" end className={({isActive}) => `${base} ${isActive ? active : ""}`}>Home</NavLink>
	  <NavLink to="/About" className={({isActive}) => `${base} ${isActive ? active : ""}`}>About</NavLink>
	   <NavLink to="/Services" className={({isActive}) => `${base} ${isActive ? active : ""}`}>Services</NavLink>
          <NavLink to="/team" className={({isActive}) => `${base} ${isActive ? active : ""}`}>Our Team</NavLink>
	   <NavLink to="/Contact" className={({isActive}) => `${base} ${isActive ? active : ""}`}>Contact</NavLink>
        </nav>
      </div>
    </div>
  )
}

