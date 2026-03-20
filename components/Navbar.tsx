'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const navItems = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
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

    // Hamburger toggling logic
    const handleMobileToggle = () => {
      const mobileMenu = document.getElementById('mobile-menu')
      if (mobileMenu) {
        if (mobileMenu.classList.contains('scale-[0.01]')) {
          mobileMenu.classList.remove('scale-[0.01]', 'opacity-0')
          mobileMenu.classList.add('scale-100', 'opacity-100')
          document.body.style.overflow = 'hidden'
        } else {
          mobileMenu.classList.remove('scale-100', 'opacity-100')
          mobileMenu.classList.add('scale-[0.01]', 'opacity-0')
          document.body.style.overflow = ''
        }
      }
    }
    const hamburgerBtn = document.getElementById('hamburger-btn')
    if (hamburgerBtn) {
      hamburgerBtn.addEventListener('click', handleMobileToggle)
    }
    const mobileLinks = document.querySelectorAll('.mobile-nav-link')
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        handleMobileToggle()
        const href = link.getAttribute('href')
        if (!href) return
        gsap.to(window, {
          scrollTo: href,
          duration: 1.2,
          ease: 'expo.inOut',
        })
      })
    })

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
        const href = link.getAttribute('href')
        if (!href) return
        gsap.to(window, {
          scrollTo: href,
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
      if (hamburgerBtn) hamburgerBtn.removeEventListener('click', handleMobileToggle)
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
        <div ref={navRef} className="flex gap-6 max-lg:hidden">
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
          className="rounded-full border px-5 py-2 tracking-widest max-lg:hidden"
        >
          GET IN TOUCH
        </button>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          id="hamburger-btn"
          className="hidden max-lg:flex items-center justify-center w-12 h-12 rounded-full border tracking-widest relative z-[99999]"
          style={{ borderColor: 'var(--nav-text)', color: 'var(--nav-text)' }}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      <div
        id="mobile-menu"
        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[99998] transform scale-[0.01] opacity-0 transition-all duration-500 ease-in-out flex flex-col items-center justify-center gap-12"
      >
        {navItems.map(item => (
          <a
            key={item.label}
            href={item.href}
            className="mobile-nav-link text-3xl font-bold tracking-widest text-white hover:text-gray-300 transition-colors"
          >
            {item.label}
          </a>
        ))}
        <button
          onClick={() => {
            document.getElementById('hamburger-btn')?.click();
            gsap.to(window, {
              scrollTo: '#contact',
              duration: 1.2,
              ease: 'expo.inOut',
            })
          }}
          className="mt-8 rounded-full border border-white text-white px-8 py-4 tracking-widest uppercase"
        >
          Get in touch
        </button>
      </div>
    </nav>
  )
}
