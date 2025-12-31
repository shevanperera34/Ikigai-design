"use client"

import * as React from "react"

type ShinyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export function ShinyButton({ children, className = "", ...props }: ShinyButtonProps) {
  return (
    <>
      <style>{`
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @property --gradient-angle-offset {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @property --gradient-percent {
          syntax: "<percentage>";
          initial-value: 5%;
          inherits: false;
        }
        @property --gradient-shine {
          syntax: "<color>";
          initial-value: white;
          inherits: false;
        }

        .shiny-cta {
          --shiny-cta-bg: #000000;
          --shiny-cta-bg-subtle: #1a1818;
          --shiny-cta-fg: #ffffff;

          /* Ikigai hue */
          --shiny-cta-highlight: #1b2d52;
          --shiny-cta-highlight-subtle: #6c00ff;

          --animation: gradient-angle linear infinite;
          --duration: 3s;
          --shadow-size: 2px;
          --transition: 800ms cubic-bezier(0.25, 1, 0.5, 1);

          isolation: isolate;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          outline-offset: 4px;

          padding: 0.95rem 1.55rem;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
          font-size: 1rem;
          line-height: 1.2;
          font-weight: 600;

          border: 1px solid transparent;
          border-radius: 9999px;
          color: var(--shiny-cta-fg);

          background:
            linear-gradient(var(--shiny-cta-bg), var(--shiny-cta-bg)) padding-box,
            conic-gradient(
              from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
              transparent,
              var(--shiny-cta-highlight) var(--gradient-percent),
              var(--gradient-shine) calc(var(--gradient-percent) * 2),
              var(--shiny-cta-highlight) calc(var(--gradient-percent) * 3),
              transparent calc(var(--gradient-percent) * 4)
            ) border-box;

          box-shadow:
            inset 0 0 0 1px var(--shiny-cta-bg-subtle),
            0 10px 30px rgba(0,0,0,0.35);

          transition: var(--transition);
          transition-property: --gradient-angle-offset, --gradient-percent, --gradient-shine, transform, box-shadow, filter;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .shiny-cta::before,
        .shiny-cta::after,

        .shiny-cta:active {
          transform: translateY(1px);
        }

        /* Pill-fill glow (matches button shape exactly) */
.shiny-cta::before {
  /* keep your dots pattern? -> we’re repurposing ::before for fill.
     If you want dots still, we can move dots to a new ::marker layer,
     but simplest is: turn ::before into the fill layer. */

  width: calc(100% - var(--shadow-size) * 2);
  height: calc(100% - var(--shadow-size) * 2);
  border-radius: inherit;
  opacity: 0;
  transition: opacity var(--transition), transform var(--transition);
  transform: scale(0.98);

  background:
    radial-gradient(120% 140% at 20% 0%,
      rgba(27, 45, 82, 3),
      rgba(108,0,255,0.18) 35%,
      transparent 70%),
    radial-gradient(120% 140% at 80% 100%,
      rgba(108,0,255,0.25),
      transparent 65%);
}

/* On hover/focus: fill the whole pill */
.shiny-cta:is(:hover, :focus-visible)::before {
  opacity: 1;
  transform: scale(1);
}


        /* Dots pattern */
        .shiny-cta::before {
          --size: calc(100% - var(--shadow-size) * 3);
          --position: 2px;
          --space: calc(var(--position) * 2);

          width: var(--size);
          height: var(--size);

          background: radial-gradient(
            circle at var(--position) var(--position),
            rgba(255,255,255,0.9) calc(var(--position) / 4),
            transparent 0
          ) padding-box;

          background-size: var(--space) var(--space);
          background-repeat: space;

          mask-image: conic-gradient(
            from calc(var(--gradient-angle) + 45deg),
            black,
            transparent 10% 90%,
            black
          );

          border-radius: inherit;
          opacity: 0.35;
          z-index: -1;
        }

        /* Inner shimmer */
        .shiny-cta::after {
          --animation: shimmer linear infinite;
          width: 100%;
          aspect-ratio: 1;

          background: linear-gradient(
            -50deg,
            transparent,
            var(--shiny-cta-highlight),
            transparent
          );

          mask-image: radial-gradient(circle at bottom, transparent 42%, black);
          opacity: 0.55;
        }

        .shiny-cta span {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          white-space: nowrap;
        }

        .shiny-cta span::before {
          --size: calc(100% + 1rem);
          width: var(--size);
          height: var(--size);
          box-shadow: inset 0 -1ex 2rem 4px var(--shiny-cta-highlight-subtle);
          opacity: 0;
          transition: opacity var(--transition);
          animation: calc(var(--duration) * 1.5) breathe linear infinite;
        }

        .shiny-cta,
        .shiny-cta::before,
        .shiny-cta::after {
          animation:
            var(--animation) var(--duration),
            var(--animation) calc(var(--duration) / 0.4) reverse paused;
          animation-composition: add;
        }
        
        

        
        .shiny-cta:is(:hover, :focus-visible) {
  --gradient-percent: 20%;
  --gradient-angle-offset: 95deg;
  --gradient-shine: var(--shiny-cta-highlight-subtle);

  filter: saturate(1.12);
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,0.16),
    0 18px 70px rgba(56, 10, 101, 36),
    0 18px 70px rgba(108,0,255,0.14);
}


        .shiny-cta:is(:hover, :focus-visible),
        .shiny-cta:is(:hover, :focus-visible)::before,
        .shiny-cta:is(:hover, :focus-visible)::after {
          animation-play-state: running;
        }

        .shiny-cta:disabled {
          cursor: not-allowed;
          opacity: 0.55;
          filter: none;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.10);
        }

        @keyframes gradient-angle {
          to { --gradient-angle: 360deg; }
        }
        @keyframes shimmer {
          to { rotate: 360deg; }
        }
        @keyframes breathe {
          from, to { scale: 1; }
          50% { scale: 1.2; }
        }
      `}</style>

      <button className={`shiny-cta ${className}`} {...props}>
        <span>{children}</span>
      </button>
    </>
  )
}
