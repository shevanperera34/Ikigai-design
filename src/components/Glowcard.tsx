// src/components/Glowcard.tsx
import React, { useEffect, useMemo, useRef } from 'react'
import type { ReactNode } from 'react'

interface GlowCardProps {
  children: ReactNode
  className?: string

  /** legacy preset names (still supported) */
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange'

  /** NEW: exact glow color (recommended) */
  glowHex?: string

  size?: 'sm' | 'md' | 'lg'
  width?: string | number
  height?: string | number
  customSize?: boolean // When true, ignores size prop and uses width/height or className
}

const presetHexMap: Record<NonNullable<GlowCardProps['glowColor']>, string> = {
  blue: '#1b2d52',
  purple: '#380a65',
  green: '#1b2d52',
  red: '#1b2d52',
  orange: '#1b2d52',
}

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96',
} as const

function hexToRgb(hex: string) {
  const raw = hex.replace('#', '').trim()
  const full = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw
  if (full.length !== 6) return null
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  if ([r, g, b].some((n) => Number.isNaN(n))) return null
  return { r, g, b }
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'blue',
  glowHex,
  size = 'md',
  width,
  height,
  customSize = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e
      if (!cardRef.current) return

      cardRef.current.style.setProperty('--x', x.toFixed(2))
      cardRef.current.style.setProperty('--y', y.toFixed(2))
    }

    document.addEventListener('pointermove', syncPointer, { passive: true })
    return () => document.removeEventListener('pointermove', syncPointer)
  }, [])

  const rgb = useMemo(() => {
    const chosen = glowHex?.trim() || presetHexMap[glowColor]
    return hexToRgb(chosen) ?? { r: 27, g: 45, b: 82 } // fallback = #1b2d52
  }, [glowHex, glowColor])

  const getSizeClasses = () => {
    if (customSize) return ''
    return sizeMap[size]
  }

  const getInlineStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties & Record<string, any> = {
      // RGB for the glow (exact)
      '--gr': String(rgb.r),
      '--gg': String(rgb.g),
      '--gb': String(rgb.b),

      // ===== Sharp tuning (feel free to tweak) =====
      '--radius': '16',
      '--border': '0.1', // crisp visible border
      '--size': '400', // spotlight size (bigger = broader, smaller = tighter)
      '--bg-spot-opacity': '0.05',
      '--border-spot-opacity': '10',
      '--border-light-opacity': '1',

      '--backdrop': 'rgba(255,255,255,0.06)',
      '--backup-border': 'rgba(255,255,255,0.12)',

      '--border-size': 'calc(var(--border) * 1px)',
      '--spotlight-size': 'calc(var(--size) * 1px)',

      // inner wash uses your exact RGB
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        rgba(var(--gr), var(--gg), var(--gb), var(--bg-spot-opacity)),
        transparent 70%
      )`,
      backgroundColor: 'var(--backdrop)',
      backgroundAttachment: 'fixed',

      border: '1px solid var(--backup-border)',
      position: 'relative',
      touchAction: 'none',
      overflow: 'hidden',
    }

    if (width !== undefined) baseStyles.width = typeof width === 'number' ? `${width}px` : width
    if (height !== undefined) baseStyles.height = typeof height === 'number' ? `${height}px` : height

    return baseStyles
  }

  const beforeAfterStyles = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }

    /* Colored rim highlight (sharp + strong, exact RGB) */
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.62) calc(var(--spotlight-size) * 0.62) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        rgba(var(--gr), var(--gg), var(--gb), var(--border-spot-opacity)),
        transparent 72%
      );
      filter: brightness(2.25);
      opacity: 0.95;
    }

    /* White spec pop */
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.40) calc(var(--spotlight-size) * 0.40) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        rgba(255,255,255,var(--border-light-opacity)),
        transparent 75%
      );
      opacity: 0.85;
      mix-blend-mode: screen;
    }

    /* Outer bloom layer (reduced blur for sharp look) */
    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: 1;
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 14);
      filter: blur(calc(var(--border-size) * 5));
      background: none;
      pointer-events: none;
      border: none;
    }

    [data-glow] > [data-glow]::before {
      inset: -8px;
      border-width: 8px;
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={[
          getSizeClasses(),
          !customSize ? 'aspect-[3/4]' : '',
          'rounded-2xl relative shadow-[0_18px_80px_rgba(0,0,0,0.55)] backdrop-blur-[8px]',
          className,
        ].join(' ')}
      >
        {/* keep nested glow layer (same behavior as your original) */}
        <div ref={innerRef} data-glow />
        {children}
      </div>
    </>
  )
}

export { GlowCard }
