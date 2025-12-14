// src/sections/Work.tsx
import { motion, AnimatePresence, useInView } from 'framer-motion'
import type { Variants, Transition } from 'framer-motion'
import { Play, X, ChevronLeft, ChevronRight, Expand, Minimize, Share2, Search, XCircle } from 'lucide-react'
import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import blindthumb from '../assets/Blinds_thumbnail_2.png'
import Autodetail from '../assets/AutoDetailing_thumbnail.png'
import clubpromo from '../assets/ClubPromo_Thumbnail.png'
import Barber from '../assets/Barbershop_thumbnail.png'
import Livemu from '../assets/LiveMusic_thumbnail.png'
import Tailor from '../assets/Tailorshop_Thumbnail.png'
import mobil from '../assets/MobileWeb_Thumbnail.png'
import kind from '../assets/Kindrage_Thumbnail.png'
import flame from '../assets/flameReveal.gif'

type Project = {
  id: number
  title: string
  category: string
  thumbnailUrl: string
  videoUrl: string
  description: string
  client: string
  director: string
  year: string
  location: string
  camera: string
  lenses: string
  format: string
  aspectRatio: string
  status?: 'Live' | 'Concept' | 'In Development'
  statusYear?: string
  overview?: string
  objective?: string
  roles?: string[]
  tools?: string[]
  outcomes?: string[]
  ctaLabel?: string
}

type Category = { id: number; name: string }

interface AnimationVariants extends Variants {
  hidden: { opacity: number; y?: number; scale?: number; width?: number | string }
  visible: { opacity: number; y?: number; scale?: number; width?: number | string; transition: Transition }
}

/* ---------- data ---------- */
const categories: Category[] = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Digital Systems' },
  { id: 3, name: 'Creative Strategy' },
]

const projects: Project[] = [
  {
    id: 1,
    title: 'Blinds 3D Website',
    category: 'Digital Systems',
    thumbnailUrl: blindthumb,
    videoUrl: 'https://drive.google.com/file/d/1t5OggLfiOiLSb5eiTWtp5qId_S8QJ27M/view?usp=sharing',
    description: 'A breathtaking visual narrative…',
    client: 'Independent Film',
    director: 'Alex Rodriguez',
    year: '2024',
    location: 'Los Angeles, CA',
    camera: 'RED Komodo 6K',
    lenses: 'Zeiss Supreme Primes',
    format: '6K RAW',
    aspectRatio: '2.39:1',
    status: 'In Development',
    statusYear: '2024',
    overview: 'An interactive 3D blinds configurator…',
    objective: 'Create an immersive product experience…',
    roles: ['UI/UX Design', '3D Integration', 'Front-end Dev', 'Copywriting', 'Brand Direction'],
    tools: ['React', 'TypeScript', 'Three.js', 'Vite'],
    outcomes: ['65% higher demo engagement…', 'Modular codebase…'],
    ctaLabel: 'View Case Study',
  },
  {
    id: 2,
    title: 'Tailorshop Themed build',
    category: 'Digital Systems',
    thumbnailUrl: Tailor,
    videoUrl: 'https://drive.google.com/file/d/1yMMFdQ3_oN6F5DCZN2MniruPasQ3t4Mp/view?usp=sharing',
    description: 'A dynamic commercial piece…',
    client: 'TechCorp Inc.',
    director: 'Sarah Chen',
    year: '2024',
    location: 'New York, NY',
    camera: 'Sony FX9',
    lenses: 'Sony G Master',
    format: '4K XAVC',
    aspectRatio: '16:9',
    status: 'Concept',
    statusYear: '2024',
    overview: 'A boutique theme…',
    objective: 'Reduce friction from booking…',
    roles: ['UI/UX Design', 'Front-end Dev', 'Content Structuring'],
    tools: ['React', 'TypeScript', 'Headless CMS', 'Cloud Functions'],
    outcomes: ['30% increase in appointment requests…', 'Reusable booking component…'],
    ctaLabel: 'View Case Study',
  },
  {
    id: 3,
    title: 'Mobile responsive build',
    category: 'Digital Systems',
    thumbnailUrl: mobil,
    videoUrl: 'https://drive.google.com/file/d/1sz0pV2tw4Tv65ClzH6dXwlKQd-AXIr__/view?usp=sharing',
    description: 'An intimate documentary…',
    client: 'National Geographic',
    director: 'Michael Torres',
    year: '2023',
    location: 'Various',
    camera: 'Canon EOS C300 Mark III',
    lenses: 'Canon CN-E Primes',
    format: '4K Cinema RAW',
    aspectRatio: '16:9',
    status: 'Live',
    statusYear: '2024',
    overview: 'A mobile-first template system…',
    objective: 'Create a foundation for fast launches…',
    roles: ['Design System', 'Front-end Dev', 'QA'],
    tools: ['React', 'TypeScript', 'Tailwind', 'Storybook'],
    outcomes: ['CLS-safe layout shifts…', 'Single codebase applied…'],
    ctaLabel: 'View Case Study',
  },
  {
    id: 4,
    title: 'Barbershop themed build',
    category: 'Digital Systems',
    thumbnailUrl: Barber,
    videoUrl: 'https://drive.google.com/file/d/1Z8HWZHxHLMmYcDsb_R3DgR_nZMjeQMjq/view?usp=sharing',
    description: 'A vibrant music video…',
    client: 'Universal Music',
    director: 'Emma Johnson',
    year: '2024',
    location: 'Nashville, TN',
    camera: 'ARRI Alexa Mini LF',
    lenses: 'ARRI Signature Primes',
    format: '4.5K ProRes',
    aspectRatio: '2.35:1',
    status: 'Concept',
    statusYear: '2024',
    overview: 'High-contrast theme…',
    objective: 'Drive bookings and showcase…',
    roles: ['UI/UX Design', 'Front-end Dev', 'Copywriting'],
    tools: ['React', 'TypeScript', 'Tailwind', 'Cloud Images'],
    outcomes: ['Prototype 90+ Lighthouse…', 'Booking completion flow…'],
    ctaLabel: 'View Case Study',
  },
  {
    id: 5,
    title: 'Auto Detailing themed build',
    category: 'Digital Systems',
    thumbnailUrl: Autodetail,
    videoUrl: 'https://drive.google.com/file/d/172JGsgvwiGP7gL2Q0Ka9ZJ8YPXQdEJHB/view?usp=sharing',
    description: 'A cinematic trailer…',
    client: 'Emma & James',
    director: 'Willow Tree Films',
    year: '2022',
    location: 'Tuscany, Italy',
    camera: 'Sony FX3 + DJI Ronin',
    lenses: 'Sigma 35mm, Sony 85mm',
    format: '4K',
    aspectRatio: '2.35:1',
    status: 'Concept',
    statusYear: '2024',
    overview: 'Bold landing with package selector…',
    objective: 'Convert ad traffic…',
    roles: ['Landing Page', 'Front-end Dev', 'CRO'],
    tools: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    outcomes: ['Reusable pricing grid…', 'Analytics events…'],
    ctaLabel: 'View Case Study',
  },
  {
    id: 6,
    title: 'Live Music - Event Recap Video',
    category: 'Creative Strategy',
    thumbnailUrl: Livemu,
    videoUrl: 'https://drive.google.com/file/d/1qPdb_gv5zOT1T7JzaQ6rZ6Wa7mks4wen/view?usp=sharing',
    description: 'A cinematic trailer…',
    client: 'Emma & James',
    director: 'Willow Tree Films',
    year: '2022',
    location: 'Tuscany, Italy',
    camera: 'Sony FX3 + DJI Ronin',
    lenses: 'Sigma 35mm, Sony 85mm',
    format: '4K',
    aspectRatio: '2.35:1',
    status: 'Live',
    statusYear: '2023',
    overview: 'High-energy recap edit…',
    objective: 'Deliver a sticky, shareable piece…',
    roles: ['Cinematography', 'Editing', 'Sound Design'],
    tools: ['Sony Mirrorless', 'Final Cut Pro', 'Adobe Audition'],
    outcomes: ['Cut-downs for reels…', 'Export presets…'],
    ctaLabel: 'View Case Study',
  },
  {
    id: 7,
    title: 'Club promo video',
    category: 'Creative Strategy',
    thumbnailUrl: clubpromo,
    videoUrl: 'https://drive.google.com/file/d/1RtaLQ_gOHZUqGhCNe-SXljzNCWaPk26I/view?usp=sharing',
    description: 'A cinematic trailer…',
    client: 'Emma & James',
    director: 'Willow Tree Films',
    year: '2022',
    location: 'Tuscany, Italy',
    camera: 'Sony FX3 + DJI Ronin',
    lenses: 'Sigma 35mm, Sony 85mm',
    format: '4K',
    aspectRatio: '2.35:1',
    status: 'Live',
    statusYear: '2023',
    overview: 'Punchy sizzle with typography hits…',
    objective: 'Drive RSVPs…',
    roles: ['Editing', 'Motion Graphics', 'Copy'],
    tools: ['After Effects', 'Premiere Pro', 'Adobe Fonts'],
    outcomes: ['Template can be versioned…', 'On-brand motion pack…'],
    ctaLabel: 'View Case Study',
  },
  {
    id: 8,
    title: 'Kindrage clothing brand',
    category: 'Creative Strategy',
    thumbnailUrl: kind,
    videoUrl: flame, // GIF preview
    description: 'A cinematic trailer…',
    client: 'Emma & James',
    director: 'Willow Tree Films',
    year: '2022',
    location: 'Tuscany, Italy',
    camera: 'Sony FX3 + DJI Ronin',
    lenses: 'Sigma 35mm, Sony 85mm',
    format: '4K',
    aspectRatio: '2.35:1',
    status: 'In Development',
    statusYear: '2024',
    overview: 'Brand system and launch visuals…',
    objective: 'Build a visual language…',
    roles: ['Brand Direction', 'Art Direction', 'Copywriting', 'Product Mockups'],
    tools: ['Photoshop', 'Illustrator', 'Blender'],
    outcomes: ['Consistent kit…', 'Designs prepped…'],
    ctaLabel: 'View Case Study',
  },
]

/* ---------- animations ---------- */
const useScrollAnimation = () => {
  const containerAnimation: AnimationVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  }
  const itemAnimation: AnimationVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }
  return { containerAnimation, itemAnimation }
}

/* ---------- helpers ---------- */
const isImageLike = (url: string) => /\.(gif|png|jpe?g|webp|svg)(\?.*)?$/i.test(url ?? '')

// Use the exact Drive "preview" embed that works (no uc-download, no SDK)
const getEmbedUrl = (url: string) => {
  if (!url) return ''
  if (url.includes('drive.google.com')) {
    const m = url.match(/\/file\/d\/([^/]+)/) || url.match(/[?&]id=([^&]+)/)
    const id = m?.[1]
    return id ? `https://drive.google.com/file/d/${id}/preview` : url
  }
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const joiner = url.includes('?') ? '&' : '?'
    return `${url}${joiner}autoplay=1&mute=1&playsinline=1`
  }
  if (url.includes('vimeo.com')) {
    const joiner = url.includes('?') ? '&' : '?'
    return `${url}${joiner}autoplay=1&muted=1`
  }
  return url
}

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [category, setCategory] = useState('All')
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({})
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { containerAnimation, itemAnimation } = useScrollAnimation()

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const update = () => setIsSmallScreen(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    // @ts-ignore Safari
    mq.addListener?.(update)
    return () => {
      mq.removeEventListener?.('change', update)
      // @ts-ignore
      mq.removeListener?.(update)
    }
  }, [])

  const categoryOptions = categories.map((c) => c.name)

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category
      const q = searchTerm.toLowerCase()
      const matchesSearch = p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      return matchesCategory && matchesSearch
    })
  }, [category, searchTerm])

  const openProject = useCallback(
    (p: Project) => {
      const idx = filteredProjects.findIndex((x) => x.id === p.id)
      setCurrentProjectIndex(idx)
      setSelectedProject(p)
      setIsPlaying(true)
      document.body.style.overflow = 'hidden'
    },
    [filteredProjects]
  )

  const closeProject = useCallback(() => {
    setSelectedProject(null)
    setIsPlaying(false)
    setIsFullscreen(false)
    document.body.style.overflow = 'auto'
  }, [])

  const navigateProject = useCallback(
    (dir: 'next' | 'prev') => {
      const newIndex =
        dir === 'next'
          ? (currentProjectIndex + 1) % filteredProjects.length
          : (currentProjectIndex - 1 + filteredProjects.length) % filteredProjects.length
      setCurrentProjectIndex(newIndex)
      setSelectedProject(filteredProjects[newIndex])
      setIsPlaying(true)
    },
    [currentProjectIndex, filteredProjects]
  )

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlaying(true)
  }

  const toggleFullscreen = useCallback(() => setIsFullscreen((v) => !v), [])
  const handleShare = useCallback(async () => {
    if (navigator.share && selectedProject) {
      try {
        await navigator.share({ title: selectedProject.title, text: selectedProject.description, url: window.location.href })
      } catch {
        await navigator.clipboard.writeText(window.location.href)
      }
    }
  }, [selectedProject])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!selectedProject) {
        if (e.key === '/' && !isSearchActive) {
          e.preventDefault()
          setIsSearchActive(true)
          setTimeout(() => searchInputRef.current?.focus(), 100)
        }
        return
      }
      const allowArrows = !isSmallScreen
      switch (e.key) {
        case 'Escape':
          closeProject()
          break
        case 'ArrowLeft':
          if (!allowArrows) break
          e.preventDefault()
          navigateProject('prev')
          break
        case 'ArrowRight':
          if (!allowArrows) break
          e.preventDefault()
          navigateProject('next')
          break
        case ' ':
          e.preventDefault()
          if (!isPlaying) setIsPlaying(true)
          break
        case 'f':
        case 'F':
          e.preventDefault()
          toggleFullscreen()
          break
        case 's':
        case 'S':
          e.preventDefault()
          handleShare()
          break
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selectedProject, isPlaying, navigateProject, closeProject, handleShare, toggleFullscreen, isSearchActive, isSmallScreen])

  const handleImageError = (id: number) => setImageError((prev) => ({ ...prev, [id]: true }))
  const toggleSearch = () => {
    setIsSearchActive((v) => !v)
    if (!isSearchActive) setTimeout(() => searchInputRef.current?.focus(), 100)
    else setSearchTerm('')
  }

  const searchVariants: AnimationVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { width: '100%', opacity: 1, transition: { stiffness: 300, damping: 25 } },
  }
  const buttonHoverAnimation = { scale: 1.05, transition: { stiffness: 400, damping: 10 } }
  const cardHoverAnimation = { scale: 1.03, y: -8, transition: { stiffness: 300, damping: 20 } }

  return (
    <section className="relative min-h-screen bg-black text-white font-[Inter] overflow-x-hidden overflow-y-visible">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-700/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-120px,rgba(255,255,255,0.07),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_120%,rgba(0,0,0,0.55),transparent_60%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 md:py-20 relative z-10">
        {/* header */}
        <motion.div
          ref={ref}
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            variants={itemAnimation}
            className="font-[Space_Grotesk] uppercase tracking-widest text-4xl sm:text-5xl md:text-6xl mb-3 mt-7"
          >
            Our Work
          </motion.h2>
          <motion.p variants={itemAnimation} className="text-white/80 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            Explore the range of work done by The Ikigai Project
            <span className="block text-xs md:text-sm text-white/60 mt-2">Press “/” to search or use arrow keys to navigate</span>
          </motion.p>
        </motion.div>

        {/* search + filters */}
        <motion.div variants={containerAnimation} initial="hidden" animate="visible" className="mb-12 sm:mb-16">
          <div className="mb-8 flex justify-center">
            <motion.div className="relative w-full max-w-xl">
              <div className="relative flex items-center">
                <motion.button
                  onClick={toggleSearch}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-white/85 border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 ${isSearchActive ? 'w-full' : 'w-auto'}`}
                  whileHover={buttonHoverAnimation}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle search"
                >
                  <Search size={18} />
                  {!isSearchActive && <span>Search Projects</span>}
                </motion.button>
                <AnimatePresence>
                  {isSearchActive && (
                    <motion.div variants={searchVariants} initial="hidden" animate="visible" exit="hidden" className="absolute inset-0 flex items-center">
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onBlur={() => !searchTerm && setIsSearchActive(false)}
                        placeholder="Search projects..."
                        className="w-full pl-10 pr-10 py-2 rounded-full text-white placeholder-white/60 bg-white/5 border border-white/20 focus:outline-none focus:border-white/40"
                        aria-label="Search projects"
                      />
                      <Search size={18} className="absolute left-3 text-white/60" />
                      {searchTerm && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setSearchTerm('')
                            searchInputRef.current?.focus()
                          }}
                          className="absolute right-3 text-white/60 hover:text-white"
                          aria-label="Clear search"
                        >
                          <XCircle size={18} />
                        </motion.button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5">
            {categoryOptions.map((cat) => (
              <motion.button
                key={cat}
                className={`px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === cat ? 'bg-white text-black' : 'border border-white/20 text-white/85 hover:border-white/40 hover:text-white'
                } focus:outline-none`}
                onClick={() => setCategory(cat)}
                whileHover={buttonHoverAnimation}
                whileTap={{ scale: 0.95 }}
                aria-pressed={category === cat}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* grid */}
        <motion.div
          layout
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
<motion.div
  layout
  key={project.id}
  variants={itemAnimation}
  className="relative group cursor-pointer rounded-2xl overflow-hidden h-72 sm:h-80 border border-white/15 bg-white/5 backdrop-blur-sm shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
  onClick={() => openProject(project)}
  whileHover={cardHoverAnimation}
  initial={{ opacity: 0, scale: 0.85 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.85 }}
  transition={{ duration: 0.35 }}
  aria-label={`Open ${project.title}`}
>

		    {!imageError[project.id] ? (
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => handleImageError(project.id)}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-black/40 flex items-center justify-center">
                    <span className="text-white/60 text-sm font-medium">Image unavailable</span>
                  </div>
                )}

                {/* Overlay visible by default on mobile */}
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="pointer-events-none text-lg sm:text-xl font-semibold text-white mb-1 opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="pointer-events-none text-white/80 text-xs uppercase tracking-[0.2em] mb-3 opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-3 sm:delay-75 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300">
                    {project.category}
                  </p>
                  <div className="pointer-events-none flex items-center gap-3 opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-3 sm:delay-150 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300">
                    <div className="w-12 h-12 rounded bg-white flex items-center justify-center shadow">
                      <Play className="text-black ml-1" size={16} />
                    </div>
                    <span className="text-white text-sm font-medium">View Project</span>
                  </div>
                </div>

                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-[11px] uppercase tracking-widest font-semibold text-white/80 border border-white/20 bg-white/10">
                  {project.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* empty state */}
        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
            <p className="text-white/70 text-lg">No projects found matching your criteria.</p>
            <button
              onClick={() => {
                setCategory('All')
                setSearchTerm('')
              }}
              className="mt-4 px-5 py-2 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 ${isFullscreen ? 'p-0' : ''} overflow-x-hidden`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProject}
            aria-label="Project viewer"
          >
            <motion.div
              ref={modalRef}
              className={`relative w-full ${isFullscreen ? 'max-w-none max-h-none h-full' : 'max-w-6xl max-h-[92vh]'} overflow-y-auto overflow-x-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-[0_20px_100px_rgba(0,0,0,0.6)]`}
              initial={{ scale: 0.96, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 30 }}
              transition={{ damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* header */}
              <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between h-12 sm:h-14 px-3 sm:px-4 bg-gradient-to-b from-black/60 to-transparent overflow-x-hidden">
                <div className="flex items-center gap-3 text-white/85">
                  <span className="text-xs sm:text-sm">
                    {currentProjectIndex + 1} / {filteredProjects.length}
                  </span>
                  <span className="hidden sm:inline text-xs text-white/60">Use ← → to navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleShare} className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white hover:text-black transition-colors" title="Share (S)" aria-label="Share">
                    <Share2 size={16} />
                  </button>
                  <button onClick={toggleFullscreen} className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white hover:text-black transition-colors" title="Fullscreen (F)" aria-label="Toggle fullscreen">
                    {isFullscreen ? <Minimize size={16} /> : <Expand size={16} />}
                  </button>
                  <button onClick={closeProject} className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/70 transition-colors" title="Close (Esc)" aria-label="Close">
                    <X size={16} />
                  </button>
                </div>
              </div>

		
      		{/* navigation arrows (hidden on phones) */}
{filteredProjects.length > 1 && !isSmallScreen && (
  <>
    <button
      onClick={() => navigateProject('prev')}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-xl border border-white/20 bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
      title="Previous (←)"
      aria-label="Previous"
    >
      {/* ChevronLeft, nudged right */}
      <svg viewBox="0 0 24 24" width={40} height={20}>
        <path
          d="M15 18L9 12L15 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(2,0)"   // move the arrow 2px right
        />
      </svg>
    </button>

    <button
      onClick={() => navigateProject('next')}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-xl border border-white/20 bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
      title="Next (→)"
      aria-label="Next"
    >
      {/* ChevronRight, nudged right */}
      <svg viewBox="0 0 24 24" width={40} height={20}>
        <path
          d="M9 18L15 12L9 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(2,0)"   // move the arrow 2px right
        />
      </svg>
    </button>
  </>
)}
	      


              {/* media with the dope-fit container */}
              <div
                className={`relative z-0 bg-black ${
                  isFullscreen ? 'h-[100vh]' : 'h-[calc(100vh-56px)] sm:h-[calc(100vh-64px)]'
                } w-full grid place-items-center isolate rounded-t-2xl overflow-hidden`}
              >
                {isPlaying ? (
                  isImageLike(selectedProject.videoUrl) ? (
                    <img
                      src={selectedProject.videoUrl}
                      alt={selectedProject.title}
                      className="block max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="relative w-full h-full max-w-full max-h-full grid place-items-center">
                      {/* aspect box that stays inside modal; looks great on all screens */}
                      <div className="relative aspect-video w-full h-auto max-w-[1280px] max-h-full mx-auto">
                        <iframe
                          src={getEmbedUrl(selectedProject.videoUrl)}
                          title={selectedProject.title}
                          frameBorder={0}
                          allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                          className="absolute inset-0 block w-full h-full"
                        />
                      </div>
                    </div>
                  )
                ) : (
                  <>
                    <img
                      src={selectedProject.thumbnailUrl}
                      alt={selectedProject.title}
                      className="block w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <motion.button
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center shadow"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handlePlayClick}
                        title="Play (Space)"
                        aria-label="Play"
                      >
                        <Play className="text-black ml-1" size={24} />
                      </motion.button>
                    </div>
                  </>
                )}
              </div>

              {/* CASE STUDY PANEL */}
              {!isFullscreen && selectedProject && (
                <motion.div
                  className="p-6 sm:p-8 md:p-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div
                    className="relative isolate rounded-2xl border border-white/15 bg-white/8 backdrop-blur-md shadow-[0_20px_80px_rgba(0,0,0,0.35)] p-6 sm:p-8 text-white overflow-hidden"
                    style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)' }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">{selectedProject.title}</h2>
                        <p className="mt-1 text-white/75 text-xs sm:text-sm uppercase tracking-[0.2em]">
                          {selectedProject.category}
                        </p>
                      </div>
                      {(selectedProject.status || selectedProject.statusYear) && (
                        <div className="text-right">
                          {selectedProject.status && (
                            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
                              {selectedProject.status}
                            </span>
                          )}
                          {selectedProject.statusYear && (
                            <div className="mt-1 text-xs text-white/70">{selectedProject.statusYear}</div>
                          )}
                        </div>
                      )}
                    </div>

                    {(selectedProject.overview || selectedProject.objective) && (
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedProject.overview && (
                          <div>
                            <h3 className="text-sm font-semibold mb-2">Overview</h3>
                            <p className="leading-relaxed text-sm text-white/90">
                              {selectedProject.overview}
                            </p>
                          </div>
                        )}
                        {selectedProject.objective && (
                          <div>
                            <h3 className="text-sm font-semibold mb-2">Objective</h3>
                            <p className="leading-relaxed text-sm text-white/90">
                              {selectedProject.objective}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedProject.roles?.length ? (
                        <div>
                          <h3 className="text-sm font-semibold mb-2">Our Role</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.roles.map((r, i) => (
                              <span key={i} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90">
                                {r}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                      {selectedProject.tools?.length ? (
                        <div>
                          <h3 className="text-sm font-semibold mb-2">Tools Used</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.tools.map((t, i) => (
                              <span key={i} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    {selectedProject.outcomes?.length ? (
                      <div className="mt-6">
                        <h3 className="text-sm font-semibold mb-2">Outcome / Impact</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-white/90">
                          {selectedProject.outcomes.map((o, i) => (
                            <li key={i}>{o}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="mt-8 flex items-center justify-between gap-4">
                      <div className="text-sm text-white/85">
                        <span className="text-white/70">Client:</span> {selectedProject.client || '—'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

