'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

import RippleGrid from './ui/RippleGrid'
import LogoMarquee from './ui/LogoMarquee'
import LiquidEther from './ui/LiquidEther'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const headline = useRef<HTMLHeadingElement>(null)
  const visual = useRef<HTMLDivElement>(null)
  const wordmarkWrap = useRef<HTMLDivElement>(null)
  const wordmark = useRef<HTMLHeadingElement>(null)

useEffect(() => {
  /* ================= LENIS ================= */
  const lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    smoothTouch: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  const raf = (time: number) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  /* ================= SCROLLTRIGGER ↔ LENIS ================= */
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length && value !== undefined) {
        lenis.scrollTo(value, { immediate: true })
      }
      return window.scrollY
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    },
    pinType: document.body.style.transform ? 'transform' : 'fixed',
  })

  ScrollTrigger.refresh()

  /* ================= INTRO ================= */
  gsap.timeline({ delay: 0.4 })
    .from(headline.current, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
    })
    .from(
      visual.current,
      {
        scale: 0.96,
        opacity: 0,
        duration: 1.4,
        ease: 'power4.out',
      },
      '-=0.8'
    )

  /* ================= WORDMARK ================= */
  const letters = wordmark.current?.querySelectorAll('[data-letter]')

  gsap.set(letters, {
    yPercent: 120,
    opacity: 0,
  })

  gsap.to(letters, {
    yPercent: 0,
    opacity: 1,
    duration: 1.1,
    ease: 'power4.out',
    stagger: 0.045,
    scrollTrigger: {
      trigger: wordmarkWrap.current,
      start: 'top 75%',
      once: true,
    },
  })

  gsap.fromTo(
    wordmark.current,
    { letterSpacing: '0.08em' },
    {
      letterSpacing: '0em',
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: wordmarkWrap.current,
        start: 'top 75%',
        once: true,
      },
    }
  )

  gsap.to(wordmark.current, {
    yPercent: -14,
    ease: 'none',
    scrollTrigger: {
      trigger: wordmarkWrap.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })

  letters?.forEach((letter, i) => {
    gsap.to(letter, {
      yPercent: -12 - i * 1.5,
      rotateZ: i % 2 === 0 ? -1.2 : 1.2,
      ease: 'none',
      scrollTrigger: {
        trigger: wordmarkWrap.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  })

  return () => {
    lenis.destroy()
    ScrollTrigger.killAll()
  }
}, [])


  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#5B4FFF', '#FF6A3D', '#0A0A0A']}
          mouseForce={18}
          cursorSize={60}
          resolution={0.45}
          autoIntensity={2}
          autoDemo
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-[2] mx-auto  px-14 pt-52">
        <div className="grid grid-cols-12 gap-12 items-center">
          {/* LEFT */}
          <div className="col-span-7">
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-white/60">
              Creative Full-Stack Developer
            </p>

            <h1
              ref={headline}
              className="max-w-[16ch] text-[clamp(2.4rem,4.5vw,4.2rem)] leading-[1.08] font-semibold"
            >
              <span className="block">Building digital</span>
              <span className="block">experiences where</span>
              <span className="block">design, code, and motion</span>
              <span className="block">come together</span>
              <span className="block">seamlessly.</span>
            </h1>
          </div>

          {/* RIGHT */}
                    <div className="col-span-5">
            <div
              ref={visual}
              className="relative h-[460px] rounded-2xl border border-white/20 bg-black/30 backdrop-blur-sm overflow-hidden"
            >
              <RippleGrid
                enableRainbow={false}
                gridColor="#ffffff"
                rippleIntensity={0.06}
                gridSize={12}
                gridThickness={14}
                mouseInteraction
                mouseInteractionRadius={1.2}
                opacity={0.75}
              />

              <div className="absolute bottom-10 right-10 max-w-[220px] text-right">
                <p className="text-xs uppercase tracking-widest text-white/60">
                  Digital craft
                </p>
                <p className="mt-2 text-sm text-white/80">
                  Thoughtful interfaces engineered for performance and clarity.
                </p>
              </div>
                            {/* VERTICAL TEXT */}
              <div className="absolute left-6 top-1/2 z-[2] -translate-y-1/2 text-white/80 text-6xl font-bold vertical-text">
                SYSTEMS
              </div>
              <div className="absolute left-20 top-1/2 z-[2] -translate-y-1/2 text-white/80 text-6xl font-bold vertical-text">
                MOTION
              </div>

            </div>
          </div>
        </div>

        {/* ================= MARQUEE + WORDMARK ================= */}
        <div ref={wordmarkWrap} className="mt-32">
          {/* Marquee — static, untouched */}
          <div className='opacity-10   border-b-2 border-white h-3 ' />
          

          {/* Wordmark */}
          <div className="mt-1 flex justify-center overflow-hidden">
            <h2
              ref={wordmark}
              className="flex text-center text-[clamp(6rem,22vw,20rem)] leading-none font-bold will-change-transform"
            >
              {'CRAFTED'.split('').map((char, i) => (
                <span
                  key={i}
                  data-letter
                  className="inline-block will-change-transform"
                >
                  {char}
                </span>
              ))}
               <span className="absolute top-10 right-20 text-[0.22em] font-medium opacity-80">
                ™
              </span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}
