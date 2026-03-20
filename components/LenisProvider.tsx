'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // ABORT LENIS ENTIRELY ON MOBILE TO GUARANTEE NATIVE 60FPS SCROLLING 
    if (window.innerWidth <= 1024) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1, // ~0.08 - 0.12
      smoothWheel: true,
    })

    // 🔥 GSAP <-> Lenis SYNC
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && typeof value === 'number') {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    })

    lenis.on('scroll', ScrollTrigger.update)
    ScrollTrigger.defaults({ scroller: document.body })

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId);
      ScrollTrigger.killAll()
    }
  }, [])

  return <>{children}</>
}
