'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function FluidCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    /* -------------------------
      Fast mouse following
    -------------------------- */
    const posX = gsap.quickTo(cursor, 'x', {
      duration: 0.18,
      ease: 'power3.out',
    })
    const posY = gsap.quickTo(cursor, 'y', {
      duration: 0.18,
      ease: 'power3.out',
    })

    const move = (e: MouseEvent) => {
      posX(e.clientX)
      posY(e.clientY)
    }

    window.addEventListener('mousemove', move)

    /* -------------------------
      Faster irregular morph
    -------------------------- */
    const morph = () => {
      gsap.to(cursor, {
        borderRadius: `${gsap.utils.random(25, 75)}% ${gsap.utils.random(
          25,
          75
        )}% ${gsap.utils.random(25, 75)}% ${gsap.utils.random(
          25,
          75
        )}% / ${gsap.utils.random(25, 75)}% ${gsap.utils.random(
          25,
          75
        )}% ${gsap.utils.random(25, 75)}% ${gsap.utils.random(25, 75)}%`,
        rotation: gsap.utils.random(-40, 40),
        duration: gsap.utils.random(1.4, 2.4),
        ease: 'sine.inOut',
        onComplete: morph,
      })
    }

    morph()

    /* -------------------------
      Fast hover response
    -------------------------- */
    const scaleTo = gsap.quickTo(cursor, 'scale', {
      duration: 0.35,
      ease: 'power3.out',
    })

    const enter = () => scaleTo(2.7)
    const leave = () => scaleTo(1)

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="
        fixed top-0 left-0 z-[9999]
        pointer-events-none
        w-14 h-14
        bg-white
        mix-blend-difference
        rounded-full
      "
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  )
}
