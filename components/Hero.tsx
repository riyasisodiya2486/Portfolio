'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

import RippleGrid from './ui/RippleGrid'
import LiquidEther from './ui/LiquidEther'
import { useMobileReveal } from '../hooks/useMobileMotion'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const headline = useRef<HTMLHeadingElement>(null)
  const visual = useRef<HTMLDivElement>(null)
  const wordmarkWrap = useRef<HTMLDivElement>(null)
  const wordmark = useRef<HTMLHeadingElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  useMobileReveal(heroRef)

  useEffect(() => {
    /* ================= INTRO ================= */
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      /* ================= LENIS (DESKTOP ONLY) ================= */
      const lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
      })

      lenis.on('scroll', ScrollTrigger.update)

      let rafId: number;
      const raf = (time: number) => {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)

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
      const letters = wordmark.current ? gsap.utils.toArray<HTMLElement>(wordmark.current.querySelectorAll('[data-letter]')) : []

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
        cancelAnimationFrame(rafId)
        ScrollTrigger.killAll()
      }
    });

    return () => {
      mm.revert();
    }
  }, [])


  return (
    <section ref={heroRef} className="relative min-h-screen max-lg:min-h-screen text-white max-lg:overflow-visible overflow-hidden">
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
      <div className="relative z-[2] mx-auto  px-14 max-lg:px-8 max-sm:px-4 pt-52 max-lg:pt-32">
        <div className="grid grid-cols-12 max-lg:flex max-lg:flex-col gap-12 items-center">
          {/* LEFT */}
          <div className="col-span-7">
            <p className="mb-6 text-xs uppercase tracking-[0.3em] max-lg:tracking-[0.1em] text-white/60 mobile-reveal-text mobile-motion-element">
              Creative Full-Stack Developer
            </p>

            <h1
              ref={headline}
              className="max-w-[16ch] text-[clamp(2.4rem,4.5vw,4.2rem)] leading-[1.08] font-semibold"
            >
              <span className="block mobile-reveal-heading mobile-motion-element">Building digital</span>
              <span className="block mobile-reveal-heading mobile-motion-element">experiences where</span>
              <span className="block mobile-reveal-heading mobile-motion-element">design, code, and motion</span>
              <span className="block mobile-reveal-heading mobile-motion-element">come together</span>
              <span className="block mobile-reveal-heading mobile-motion-element">seamlessly.</span>
            </h1>
          </div>

          {/* RIGHT */}
          <div className="col-span-5 max-lg:w-full">
            <div
              ref={visual}
              className="relative h-[460px] max-lg:h-[350px] max-sm:h-[250px] rounded-2xl border border-white/20 bg-black/30 backdrop-blur-sm overflow-hidden w-full mobile-reveal-card mobile-motion-element"
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
              <div className="absolute left-6 top-1/2 z-[2] -translate-y-1/2 text-white/80 text-6xl font-bold vertical-text max-lg:hidden">
                SYSTEMS
              </div>
              <div className="absolute left-20 top-1/2 z-[2] -translate-y-1/2 text-white/80 text-6xl font-bold vertical-text max-lg:hidden">
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
              className="flex text-center text-[clamp(6rem,22vw,20rem)] max-lg:text-[clamp(3.5rem,15vw,6rem)] leading-none font-bold will-change-transform"
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
