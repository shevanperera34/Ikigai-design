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

  // Case-study fields
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
    description:
      'A breathtaking visual narrative exploring the depths of human emotion through stunning cinematography and compelling storytelling.',
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
    overview:
      'An interactive 3D blinds configurator that lets shoppers visualize styles, colors, and mechanics in real time.',
    objective:
      'Create an immersive product experience that bridges physical customization with a smooth online flow.',
    roles: ['UI/UX Design', '3D Integration', 'Front-end Dev', 'Copywriting', 'Brand Direction'],
    tools: ['React', 'TypeScript', 'Three.js', 'Vite'],
    outcomes: ['65% higher demo engagement vs static gallery', 'Modular codebase for five blind models'],
    ctaLabel: 'View Case Study',
  },
  {
    id: 2,
    title: 'Tailorshop Themed build',
    category: 'Digital Systems',
    thumbnailUrl: Tailor,
    videoUrl: 'https://drive.google.com/file/d/1yMMFdQ3_oN6F5DCZN2MniruPasQ3t4Mp/view?usp=sharing',
    description: 'A dynamic commercial piece that captures the essence of modern lifestyle and brand identity.',
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
    overview:
      'A boutique theme with measurement wizard and lookbook to showcase bespoke tailoring online.',
    objective:
      'Reduce friction from booking to fitting while keeping a premium brand feel.',
    roles: ['UI/UX Design', 'Front-end Dev', 'Content Structuring'],
    tools: ['React', 'TypeScript', 'Headless CMS', 'Cloud Functions'],
    outcomes: ['30% increase in appointment requests (mock tests)', 'Reusable booking component extracted'],
    ctaLabel: 'View Case Study',
  },
  {
    id: 3,
    title: 'Mobile responsive build',
    category: 'Digital Systems',
    thumbnailUrl: mobil,
    videoUrl: 'https://drive.google.com/file/d/1sz0pV2tw4Tv65ClzH6dXwlKQd-AXIr__/view?usp=sharing',
    description: 'An intimate documentary exploring real stories and authentic human experiences.',
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
    overview:
      'A mobile-first template system that scales cleanly from 360 to desktop with component tokens.',
    objective:
      'Create a foundation for fast launches across verticals without breaking responsiveness.',
    roles: ['Design System', 'Front-end Dev', 'QA'],
    tools: ['React', 'TypeScript', 'Tailwind', 'Storybook'],
    outcomes: ['CLS-safe layout shifts on test pages', 'Single codebase applied to three demos'],
    ctaLabel: 'View Case Study',
  },
  {
    id: 4,
    title: 'Barbershop themed build',
    category: 'Digital Systems',
    thumbnailUrl: Barber,
    videoUrl: 'https://drive.google.com/file/d/1Z8HWZHxHLMmYcDsb_R3DgR_nZMjeQMjq/view?usp=sharing',
    description: 'A vibrant music video that blends visual artistry with rhythmic storytelling.',
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
    overview:
      'High-contrast theme with booking flow, service tiers, and stylist profiles.',
    objective:
      'Drive bookings and showcase before-after galleries with fast load times.',
    roles: ['UI/UX Design', 'Front-end Dev', 'Copywriting'],
    tools: ['React', 'TypeScript', 'Tailwind', 'Cloud Images'],
    outcomes: ['Prototype 90+ Lighthouse Performance', 'Booking completion flow reduced to two steps'],
    ctaLabel: 'View Case Study',
  },
  {
    id: 5,
    title: 'Auto Detailing themed build',
    category: 'Digital Systems',
    thumbnailUrl: Autodetail,
    videoUrl: 'https://drive.google.com/file/d/172JGsgvwiGP7gL2Q0Ka9ZJ8YPXQdEJHB/view?usp=sharing',
    description:
      'A cinematic trailer of Emma and James’s wedding in the Tuscan hills—pure romance, festivity, and family love.',
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
    overview:
      'Bold landing with package selector, trust badges, and before-after sliders for detailers.',
    objective:
      'Convert ad traffic with a clear pricing ladder and easy booking.',
    roles: ['Landing Page', 'Front-end Dev', 'CRO'],
    tools: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    outcomes: ['Reusable pricing grid component', 'Analytics events for A/B tests'],
    ctaLabel: 'View Case Study',
  },
  {
    id: 6,
    title: 'Live Music - Event Recap Video',
    category: 'Creative Strategy',
    thumbnailUrl: Livemu,
    videoUrl: 'https://drive.google.com/file/d/1qPdb_gv5zOT1T7JzaQ6rZ6Wa7mks4wen/view?usp=sharing',
    description:
      'A cinematic trailer of Emma and James’s wedding in the Tuscan hills—pure romance, festivity, and family love.',
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
    overview:
      'High-energy recap edit capturing crowd emotion and artist highlights for social drops.',
    objective:
      'Deliver a sticky, shareable piece that drives post-event momentum.',
    roles: ['Cinematography', 'Editing', 'Sound Design'],
    tools: ['Sony Mirrorless', 'Final Cut Pro', 'Adobe Audition'],
    outcomes: ['Cut-downs for reels and stories', 'Export presets for fast turnarounds'],
    ctaLabel: 'View Case Study',
  },
  {
    id: 7,
    title: 'Club promo video',
    category: 'Creative Strategy',
    thumbnailUrl: clubpromo,
    videoUrl: 'https://drive.google.com/file/d/1RtaLQ_gOHZUqGhCNe-SXljzNCWaPk26I/view?usp=sharing',
    description:
      'A cinematic trailer of Emma and James’s wedding in the Tuscan hills—pure romance, festivity, and family love.',
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
    overview:
      'Punchy sizzle with typography hits and scene transitions tuned for vertical platforms.',
    objective:
      'Drive RSVPs for weekly nights using a repeatable promo format.',
    roles: ['Editing', 'Motion Graphics', 'Copy'],
    tools: ['After Effects', 'Premiere Pro', 'Adobe Fonts'],
    outcomes: ['Template can be versioned in minutes', 'On-brand motion pack created'],
    ctaLabel: 'View Case Study',
  },
  {
    id: 8,
    title: 'Kindrage clothing brand',
    category: 'Creative Strategy',
    thumbnailUrl: kind,
    videoUrl: flame, // GIF preview
    description:
      'A cinematic trailer of Emma and James’s wedding in the Tuscan hills—pure romance, festivity, and family love.',
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
    overview:
      'Brand system and launch visuals for a mental-health-aligned streetwear label.',
    objective:
      'Build a visual language that blends grit with empathy and scales across drops.',
    roles: ['Brand Direction', 'Art Direction', 'Copywriting', 'Product Mockups'],
    tools: ['Photoshop', 'Illustrator', 'Blender'],
    outcomes: ['Consistent kit for socials and site', 'Designs prepped for print-on-demand'],
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

  // Track if we're on a small screen
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

  const getEmbedUrl = (url: string) => {
    if (!url) return ''
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const joiner = url.includes('?') ? '&' : '?'
      return `${url}${joiner}autoplay=1&rel=0`
    }
    if (url.includes('vimeo.com')) {
      const joiner = url.includes('?') ? '&' : '?'
      return `${url}${joiner}autoplay=1`
    }
    if (url.includes('drive.google.com')) {
      const m = url.match(/\/file\/d\/([^/]+)/) || url.match(/[?&]id=([^&]+)/)
      const id = m?.[1]
      if (id) return `https://drive.google.com/file/d/${id}/preview`
    }
    return url
  }

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
    <section className="py-12 sm:py-16 md:py-20 bg-black min-h-screen relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* header */}
        <motion.div
          ref={ref}
          variants={containerAnimation}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2 variants={itemAnimation} className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white">
            Our Work
          </motion.h2>
          <motion.div variants={itemAnimation} className="w-24 h-1 bg-white mx-auto mb-6" />
          <motion.p variants={itemAnimation} className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            Explore the range of work done by The Ikigai Project
            <span className="block text-sm text-gray-400 mt-2">Press “/” to search or use arrow keys to navigate</span>
          </motion.p>
        </motion.div>

        {/* search + filters */}
        <motion.div variants={containerAnimation} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="mb-12 sm:mb-16">
          <div className="mb-8 flex justify-start">
            <motion.div className="relative w-full max-w-md">
              <div className="relative flex items-center">
                <motion.button
                  onClick={toggleSearch}
                  className={`flex items-center gap-2 px-4 py-2 bg-black border border-gray-600 rounded text-gray-300 hover:bg-gray-800 transition-all duration-300 ${
                    isSearchActive ? 'w-full' : 'w-auto'
                  }`}
                  whileHover={buttonHoverAnimation}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search size={20} />
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
                        className="w-full px-4 py-2 pl-10 bg-black border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white"
                      />
                      <Search size={20} className="absolute left-3 text-gray-400" />
                      {searchTerm && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setSearchTerm('')
                            searchInputRef.current?.focus()
                          }}
                          className="absolute right-3 text-gray-400 hover:text-white"
                        >
                          <XCircle size={20} />
                        </motion.button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {categoryOptions.map((cat) => (
              <motion.button
                key={cat}
                className={`px-6 py-3 rounded uppercase tracking-widest text-sm font-semibold transition-all duration-300 ${
                  category === cat ? 'bg-white text-black' : 'border border-gray-600 text-gray-200 hover:border-white hover:text-white'
                } focus:outline-none focus:border-white`}
                onClick={() => setCategory(cat)}
                whileHover={buttonHoverAnimation}
                whileTap={{ scale: 0.95 }}
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
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                variants={itemAnimation}
                className="relative group cursor-pointer rounded overflow-hidden h-72 sm:h-80 bg-gray-900 border border-gray-800"
                onClick={() => openProject(project)}
                whileHover={cardHoverAnimation}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35 }}
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
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    <span className="text-gray-400 text-sm font-medium">Image unavailable</span>
                  </div>
                )}

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none
                             bg-gradient-to-t from-black/90 via-black/40 to-transparent
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300
                             flex flex-col justify-end p-6"
                >
                  <h3
                    className="pointer-events-none text-lg sm:text-xl font-bold text-white mb-1
                               translate-y-2 opacity-0 transition-all duration-300
                               group-hover:opacity-100 group-hover:translate-y-0"
                  >
                    {project.title}
                  </h3>
                  <p
                    className="pointer-events-none text-gray-300 text-sm uppercase tracking-wider mb-3
                               translate-y-3 opacity-0 transition-all duration-300 delay-75
                               group-hover:opacity-100 group-hover:translate-y-0"
                  >
                    {project.category}
                  </p>
                  <div
                    className="pointer-events-none flex items-center space-x-3
                               translate-y-3 opacity-0 transition-all duration-300 delay-150
                               group-hover:opacity-100 group-hover:translate-y-0"
                  >
                    <div className="w-12 h-12 rounded bg-white flex items-center justify-center">
                      <Play className="text-black ml-1" size={16} />
                    </div>
                    <span className="text-white text-sm font-medium">View Project</span>
                  </div>
                </div>

                <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 rounded text-xs text-gray-300 uppercase tracking-wider font-semibold">
                  {project.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* empty state */}
        {filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
            <button
              onClick={() => {
                setCategory('All')
                setSearchTerm('')
              }}
              className="mt-4 px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
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
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-6 ${isFullscreen ? 'p-0' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProject}
          >
            <motion.div
              ref={modalRef}
              className={`relative bg-black w-full overflow-y-auto rounded shadow border border-gray-800 ${
                isFullscreen ? 'max-w-none max-h-none h-full rounded-none' : 'max-w-6xl max-h-[90vh]'
              }`}
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center space-x-4">
                  <span className="text-white text-sm">
                    {currentProjectIndex + 1} / {filteredProjects.length}
                  </span>
                  <span className="text-gray-400 text-sm hidden sm:inline">Use ← → to navigate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={handleShare} className="w-10 h-10 rounded bg-gray-800/80 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors" title="Share (S)">
                    <Share2 size={16} />
                  </button>
                  <button onClick={toggleFullscreen} className="w-10 h-10 rounded bg-gray-800/80 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors" title="Fullscreen (F)">
                    {isFullscreen ? <Minimize size={16} /> : <Expand size={16} />}
                  </button>
                  <button onClick={closeProject} className="w-10 h-10 rounded bg-gray-800/80 flex items-center justify-center text-white hover:bg-gray-500 transition-colors" title="Close (Esc)">
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* navigation arrows (hidden on phones) */}
              {filteredProjects.length > 1 && !isSmallScreen && (
                <>
                  <button onClick={() => navigateProject('prev')} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded bg-black/60 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors" title="Previous (←)">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={() => navigateProject('next')} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded bg-black/60 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors" title="Next (→)">
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* media */}
              <div className={`relative z-0 bg-black ${isFullscreen ? 'h-full' : 'h-[78vh] sm:aspect-video'} flex items-center justify-center isolate`}>
                {isPlaying ? (
                  isImageLike(selectedProject.videoUrl) ? (
                    <img
                      src={selectedProject.videoUrl}
                      alt={selectedProject.title}
                      className="max-w-full max-h-full object-contain relative z-0"
                    />
                  ) : (
                    <iframe
                      src={getEmbedUrl(selectedProject.videoUrl)}
                      className="w-full h-full relative z-0"
                      title={selectedProject.title}
                      frameBorder={0}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )
                ) : (
                  <>
                    <img src={selectedProject.thumbnailUrl} alt={selectedProject.title} className="w-full h-full object-cover relative z-0" />
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <motion.button
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded bg-white flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handlePlayClick}
                        title="Play (Space)"
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
                  className="p-6 sm:p-8 md:p-10 will-change-transform"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div
                    className="
                      relative z-20 isolate transform-gpu
                      rounded-3xl ring-1 ring-white/10
                      bg-black/85 supports-[backdrop-filter:blur(0)]:backdrop-blur-sm
                      p-6 sm:p-8 text-white
                    "
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                          {selectedProject.title}
                        </h2>
                        <p className="mt-1 text-white/80 text-xs sm:text-sm uppercase tracking-widest">
                          {selectedProject.category}
                        </p>
                      </div>
                      {(selectedProject.status || selectedProject.statusYear) && (
                        <div className="text-right">
                          {selectedProject.status && (
                            <span className="inline-block rounded-full ring-1 ring-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
                              {selectedProject.status}
                            </span>
                          )}
                          {selectedProject.statusYear && (
                            <div className="mt-1 text-xs text-white/70">{selectedProject.statusYear}</div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Overview / Objective */}
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

                    {/* Roles & Tools */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedProject.roles?.length ? (
                        <div>
                          <h3 className="text-sm font-semibold mb-2">Our Role</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.roles.map((r, i) => (
                              <span key={i} className="rounded-full ring-1 ring-white/20 bg-white/10 px-3 py-1 text-xs text-white/90">
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
                              <span key={i} className="rounded-full ring-1 ring-white/20 bg-white/10 px-3 py-1 text-xs text-white/90">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>

                    {/* Outcome / Impact */}
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

                    {/* Footer */}
                    <div className="mt-8 flex items-center justify-between gap-4">
                      <div className="text-sm text-white/85">
                        <span className="text-white/75">Client:</span> {selectedProject.client || '—'}
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

