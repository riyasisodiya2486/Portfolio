'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Loader() {
  const root = useRef<HTMLDivElement>(null)
  const topTrack = useRef<HTMLDivElement>(null)
  const bottomTrack = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ===== GSAP MARQUEE MOTION ===== */
      gsap.to(topTrack.current, {
        xPercent: -50,
        duration: 18,
        ease: 'none',
        repeat: -1
      })

      gsap.to(bottomTrack.current, {
        xPercent: 50,
        duration: 22,
        ease: 'none',
        repeat: -1
      })

      /* ===== LOADER TIMELINE ===== */
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      gsap.set('.bg-text', { scale: 1.15, opacity: 0 })
      gsap.set('.title span', { yPercent: 130, rotateX: -40, scale: 0.9 })
      gsap.set('.line', { scaleX: 0 })
      gsap.set('.sub', { opacity: 0, y: 20, filter: 'blur(4px)' })
      gsap.set('.marquee-track', { filter: 'blur(6px)', opacity: 0 })

      tl
        .to('.bg-text', { opacity: 0.12, scale: 1, duration: 2.2, ease: 'power2.out' })
        .to('.marquee-track', { 
          filter: 'blur(0px)', 
          opacity: 0.3,
          duration: 1.8,
          ease: 'power3.out'
        }, '-=1.8')
        .to('.title span',
            {
              yPercent: 0,
              rotateX: 0,
              scale: 1,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 1.6,
              stagger: {
                each: 0.12,
                from: 'start'
              },
              ease: 'expo.out'
            },
            '-=1.4'
          )

        .to('.line', { 
          scaleX: 1, 
          duration: 1.2,
          ease: 'power3.inOut'
        }, '-=0.8')
        .to('.sub', { 
          opacity: 0.6, 
          y: 0, 
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out'
        }, '-=0.9')
        .to(root.current, {
          yPercent: -100,
          duration: 1.6,
          ease: 'power4.inOut',
          delay: 0.3
        })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={root}
      className="fixed inset-0 z-99999 bg-[#0b0b0b] text-white overflow-hidden"
    >
      {/* Noise */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=0 0 200 200 xmlns=http://www.w3.org/2000/svg%3E%3Cfilter id=n%3E%3CfeTurbulence type=fractalNoise baseFrequency=.8 numOctaves=4 stitchTiles=stitch/%3E%3C/filter%3E%3Crect width=200 height=200 filter=url(%23n) opacity=.15/%3E%3C/svg%3E')]"/>

      {/* Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1
          className="bg-text text-[22vw] font-extrabold tracking-[-0.08em] text-transparent"
          style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}
        >
          CREATIVE
        </h1>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center" style={{ perspective: '1000px' }}>
        <div className="overflow-hidden" style={{ clipPath: 'inset(0 0 0 0)' }}>
          <h2 className="title text-[clamp(3rem,7vw,7rem)] font-semibold leading-none">
            <span className="inline-block" style={{ transformOrigin: 'center bottom' }}>FULLSTACK</span>
          </h2>
        </div>

        <div className="overflow-hidden mt-2" style={{ clipPath: 'inset(0 0 0 0)' }}>
          <h2 className="title text-[clamp(3rem,7vw,7rem)] font-semibold leading-none">
            <span className="inline-block" style={{ transformOrigin: 'center bottom' }}>DEVELOPER</span>
          </h2>
        </div>

        <div className="line mt-7 mb-6 h-px w-32 origin-left bg-white" />

        <p className="sub text-[0.7rem] tracking-[0.35em]">
          UI / UX · FRONTEND · BACKEND · SYSTEMS
        </p>
      </div>

      {/* ===== TOP MARQUEE (1/4th) ===== */}
      <div className="pointer-events-none absolute top-5 left-0 w-full overflow-hidden opacity-30">
        <div
          ref={topTrack}
          className="marquee-track flex w-max"
        >
          {[...Array(2)].map((_, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-[0.75rem] tracking-[0.45em] text-white pr-12"
            >
              BUILD · DESIGN · CODE · SHIP · BUILD · DESIGN · CODE · SHIP ·
            </span>
          ))}
        </div>
      </div>

      {/* ===== BOTTOM MARQUEE ===== */}
      <div className="pointer-events-none absolute bottom-5 left-0 w-full overflow-hidden opacity-30">
        <div
          ref={bottomTrack}
          className="marquee-track flex w-max"
        >
          {[...Array(2)].map((_, i) => (
            <span
              key={i}
              className="whitespace-nowrap text-[0.75rem] tracking-[0.45em] text-white pr-12"
            >
              EXPERIENCE · PERFORMANCE · MOTION · EXPERIENCE · PERFORMANCE ·
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

