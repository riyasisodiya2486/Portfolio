"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMobileReveal } from "../hooks/useMobileMotion";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);
  const emailRef = useRef(null);

  const socialLinks = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/riya-sisodiya-85129b2a4/'
    },
    {
      label: 'GitHub',
      href: 'https://github.com/riyasisodiya2486'
    },
    {
      label: 'Twitter',
      href: 'https://x.com/riyasisodiya26'
    },
  ]

  useMobileReveal(containerRef);

  useEffect(() => {
    let mm = gsap.matchMedia();

    // 1. Marquee Animation (Runs everywhere)
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });

    mm.add("(min-width: 1025px)", () => {
      // 2. Reveal Animation for the main heading
      gsap.from(".contact-reveal", {
        y: 200,
        skewY: 10,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      });

      // 3. Magnetic Effect for Social Links
      const links = document.querySelectorAll(".magnetic-link");
      links.forEach((link) => {
        link.addEventListener("mousemove", (e: any) => {
          const rect = link.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(link, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power2.out" });
        });
        link.addEventListener("mouseleave", () => {
          gsap.to(link, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden pt-20"
    >
      {/* 1. Infinite Marquee Background */}
      <div className="absolute top-10 w-full overflow-hidden whitespace-nowrap opacity-10 pointer-events-none">
        <div ref={marqueeRef} className="flex text-[15vw] font-black uppercase tracking-tighter italic">
          <span>Let's Create Together — Let's Create Together —&nbsp;</span>
          <span>Let's Create Together — Let's Create Together —&nbsp;</span>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="relative z-10 px-6 md:px-20 max-lg:px-8 max-sm:px-4 mt-40 max-lg:mt-24">
        <div className="overflow-hidden">
          <h2 className="contact-reveal text-[10vw] md:text-[8vw] max-lg:text-[12vw] font-bold leading-[0.9] tracking-tighter uppercase break-words mobile-reveal-heading mobile-motion-element">
            Have an idea? <br />
            <span className="text-neutral-500">Let's talk.</span>
          </h2>
        </div>

        <div className="mt-20 group inline-block max-w-full">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=riyasisodiya2005@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            ref={emailRef}
            className="text-3xl md:text-6xl max-lg:text-4xl max-sm:text-[6vw] font-light tracking-tight hover:text-neutral-400 transition-colors duration-500 flex items-center max-sm:items-start gap-6 max-sm:gap-2 break-all mobile-reveal-text mobile-motion-element active:scale-95 transition-transform"
          >
            riyasisodiya2005@gmail.com
            <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700">
              <svg width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:rotate-45 transition-transform duration-500">
                <path d="M1 14L14 1M14 1H5M14 1V10" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
          </a>
          <div className="h-[1px] w-full bg-white/20 mt-4 origin-left group-hover:scale-x-110 group-hover:bg-white transition-all duration-700" />
        </div>
      </div>

      {/* 3. Footer Grid */}
      <div className="relative z-10 px-6 md:px-20 max-lg:px-8 max-sm:px-4 pb-10 mt-20 flex flex-col md:flex-row max-lg:flex-col justify-between items-end max-lg:items-start border-t border-white/10 pt-10">
        <div className="flex flex-col gap-4 mb-10 md:mb-0 mobile-reveal-text mobile-motion-element">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500">Socials</span>
          <div className="flex gap-8">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="magnetic-link text-sm uppercase tracking-widest hover:text-neutral-400 transition-colors active:text-neutral-500"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end max-lg:items-start gap-2 text-right max-lg:text-left mobile-reveal-text mobile-motion-element">
          <p className="text-[10px] text-neutral-600 mt-4 tracking-widest uppercase">
            © 2026 Developed by Riya Sisodiya
          </p>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}