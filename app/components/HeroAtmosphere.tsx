"use client";

/**
 * HeroAtmosphere — scoped texture/motion overlays for the Hero section only.
 *
 * Four stacked layers, in z-order (back → front):
 *   1. Vignette breath — gentle 6s pulse on a radial mask. Adds life without
 *      drawing attention to itself.
 *   2. Ember particles — 12 small warm dots drifting up from the bottom edge,
 *      8–14s rise, randomised x-jitter. Halved on mobile via the count
 *      constant below; canvas-free (pure CSS keyframes per particle) so it
 *      composes cleanly with framer-motion.
 *   3. Heat-haze shimmer — a soft horizontal sweep behind the "FLAME" word,
 *      visible on `md+` only (GPU cost). Targeted by id from Hero.tsx; if the
 *      target isn't present the layer simply doesn't render anything visible.
 *   4. Film grain — fixed SVG noise, ~5% opacity, `mix-blend-mode: overlay`.
 *      Smallest layer that does the most heavy lifting — turns the photo
 *      from "stock-feeling" to "shot on film".
 *
 * All four respect `prefers-reduced-motion` via the global rule in globals.css
 * (animation-duration: 0.001ms applies sitewide). The particles use a small
 * extra guard so they fade to invisible rather than freezing mid-rise.
 *
 * Designed to sit inside Hero.tsx between the background image stack and the
 * content grid (z-index ~5 — above the photo + gradients, below the headline).
 */

import { useMemo } from "react";

// 12 desktop / 6 mobile. Mobile reduction is via CSS media query in the
// `--ember-show-mobile` rule below — particles past index 5 hide on <md.
const EMBER_COUNT = 12;

type Ember = {
  delay: number;     // seconds before first rise
  duration: number;  // seconds for full rise
  left: number;      // % from left
  drift: number;     // px horizontal jitter
  size: number;      // px diameter
  hue: number;       // 0–30 (red → amber)
};

function generateEmbers(): Ember[] {
  // Deterministic across renders — seeded by index so SSR matches client and
  // we avoid hydration mismatch warnings.
  return Array.from({ length: EMBER_COUNT }, (_, i) => {
    const seed = (i + 1) * 9301;
    const rand = (k: number) => {
      const v = Math.sin(seed * k) * 10000;
      return v - Math.floor(v);
    };
    return {
      delay: rand(1) * 12,
      duration: 8 + rand(2) * 6,
      left: rand(3) * 100,
      drift: (rand(4) - 0.5) * 60,
      size: 2 + rand(5) * 3,
      hue: rand(6) * 30,
    };
  });
}

export default function HeroAtmosphere() {
  const embers = useMemo(generateEmbers, []);

  return (
    <>
      {/* Vignette breath — radial darkening at the edges that gently pulses.
          Sits behind everything else in this layer set. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none wf-vignette-breath"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* Ember particles — each is its own positioned div with a unique
          animation-delay so they rise at staggered times. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {embers.map((e, i) => (
          <span
            key={i}
            className={`wf-ember absolute block rounded-full ${i >= 6 ? "hidden md:block" : ""}`}
            style={{
              left: `${e.left}%`,
              bottom: "-20px",
              width: `${e.size}px`,
              height: `${e.size}px`,
              background: `hsla(${e.hue}, 90%, 60%, 0.85)`,
              boxShadow: `0 0 ${e.size * 3}px hsla(${e.hue}, 90%, 55%, 0.7)`,
              animationDelay: `${e.delay}s`,
              animationDuration: `${e.duration}s`,
              ["--wf-ember-drift" as string]: `${e.drift}px`,
            }}
          />
        ))}
      </div>

      {/* Heat-haze shimmer over "FLAME". Positioned to roughly match the word
          area on the left side of the hero — fixed px offsets keep it cheap
          (no JS measurement, no layout thrash). Desktop-only. */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute pointer-events-none wf-heat-haze"
        style={{
          left: "max(1.5rem, calc((100vw - 1400px) / 2 + 2.5rem))",
          top: "calc(50% - 1rem)",
          width: "min(520px, 42vw)",
          height: "120px",
        }}
      />

      {/* Film grain — fixed SVG noise over everything in the hero. The pattern
          is inline so it doesn't need a network round-trip. ~5% opacity in the
          overlay blend hits hard enough to soften the photo without darkening
          it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.85'/></svg>")`,
          backgroundSize: "160px 160px",
        }}
      />

      {/* Layer-local keyframes — kept inline so this file is self-contained
          and can be lifted out of the Hero without touching globals.css. */}
      <style jsx>{`
        @keyframes wf-vignette-breath {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.78; }
        }
        :global(.wf-vignette-breath) {
          animation: wf-vignette-breath 6s ease-in-out infinite;
          will-change: opacity;
        }

        @keyframes wf-ember-rise {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0;
          }
          12% {
            opacity: 0.9;
          }
          75% {
            opacity: 0.6;
          }
          100% {
            transform: translate3d(var(--wf-ember-drift, 0), -100vh, 0) scale(0.4);
            opacity: 0;
          }
        }
        :global(.wf-ember) {
          animation-name: wf-ember-rise;
          animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }

        @keyframes wf-heat-haze {
          0%, 100% {
            transform: translateX(-40%);
            opacity: 0;
          }
          50% {
            transform: translateX(40%);
            opacity: 0.55;
          }
        }
        :global(.wf-heat-haze) {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(217, 45, 32, 0.18) 35%,
            rgba(251, 191, 36, 0.22) 50%,
            rgba(217, 45, 32, 0.18) 65%,
            transparent 100%
          );
          filter: blur(20px);
          mix-blend-mode: screen;
          animation: wf-heat-haze 5s ease-in-out infinite;
          will-change: transform, opacity;
        }
      `}</style>
    </>
  );
}
