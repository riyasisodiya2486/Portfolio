'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const navItems = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about'},
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
]

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!navRef.current) return

    const root = document.documentElement
    const links = navRef.current.querySelectorAll<HTMLAnchorElement>('.nav-link')

    /* ---------------- SCROLL → TEXT COLOR ---------------- */
    const updateNavColor = () => {
      const sections = document.querySelectorAll<HTMLElement>('section')
      let color = '#ffffff'

      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 90 && rect.bottom >= 90) {
          const bg = getComputedStyle(section).backgroundColor

          if (bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') return

          const rgb = bg.match(/\d+/g)?.map(Number) || [0, 0, 0]
          const luminance =
            (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255

          color = luminance > 0.55 ? '#000000' : '#ffffff'
        }
      })

      root.style.setProperty('--nav-text', color)
    }

    window.addEventListener('scroll', updateNavColor)
    updateNavColor()

    /* ---------------- NAV LINKS ---------------- */
    links.forEach(link => {
      const bg = link.querySelector('.nav-bg') as HTMLSpanElement
      const text = link.querySelector('.nav-text') as HTMLSpanElement

      gsap.set(text, { color: 'var(--nav-text)' })

      link.addEventListener('mouseenter', () => {
        gsap.to(bg, {
          scaleY: 1,
          duration: 0.3,
          ease: 'power3.out',
        })
        gsap.to(text, {
          color: '#000000',
          duration: 0.2,
        })
        gsap.to(link, { y: -2, duration: 0.2 })
      })

      link.addEventListener('mouseleave', () => {
        gsap.to(bg, {
          scaleY: 0,
          duration: 0.35,
          ease: 'expo.inOut',
        })
        gsap.to(text, {
          color: 'var(--nav-text)',
          duration: 0.2,
        })
        gsap.to(link, { y: 0, duration: 0.2 })
      })

      link.addEventListener('click', e => {
        e.preventDefault()
        gsap.to(window, {
          scrollTo: link.getAttribute('href'),
          duration: 1.2,
          ease: 'expo.inOut',
        })
      })
    })

    /* ---------------- BUTTON ---------------- */
    if (buttonRef.current) {
      const btn = buttonRef.current

      gsap.set(btn, {
        color: 'var(--nav-text)',
        borderColor: 'var(--nav-text)',
      })

      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
          backgroundColor: '#ffffff',
          color: '#000000',
          duration: 0.25,
          ease: 'power3.out',
        })
      })

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          backgroundColor: 'transparent',
          color: 'var(--nav-text)',
          borderColor: 'var(--nav-text)',
          duration: 0.25,
          ease: 'power3.out',
        })
      })

      btn.addEventListener('click', () => {
        gsap.to(window, {
          scrollTo: '#contact',
          duration: 1.2,
          ease: 'expo.inOut',
        })
      })
    }

    return () => {
      window.removeEventListener('scroll', updateNavColor)
    }
  }, [])

  return (
    <nav className="fixed top-0 z-[9999] w-full h-20 px-5">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
        {/* LOGO */}
        <div
          className="text-lg font-bold tracking-wide"
          style={{ color: 'var(--nav-text)' }}
        >
          RIYA SISODIYA
        </div>

        {/* LINKS */}
        <div ref={navRef} className="flex gap-6">
          {navItems.map(item => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link relative overflow-hidden rounded-full px-5 py-2 tracking-widest"
            >
              <span className="nav-text relative z-10">
                {item.label}
              </span>
              <span className="nav-bg absolute inset-0 origin-bottom scale-y-0 rounded-full bg-white" />
            </a>
          ))}
        </div>

        {/* BUTTON */}
        <button
          ref={buttonRef}
          className="rounded-full border px-5 py-2 tracking-widest"
        >
          GET IN TOUCH
        </button>
      </div>
    </nav>
  )
}
