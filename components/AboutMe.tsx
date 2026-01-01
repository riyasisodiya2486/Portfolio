"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { EvervaultCardDemo } from "./EvervaultCardDemo";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineBgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ------------------- Lenis Smooth Scroll -------------------
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => t,
      smooth: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ------------------- GSAP Animations -------------------
    const ctx = gsap.context(() => {
      // Background Typography scroll animation
      gsap.fromTo(
        headlineBgRef.current,
        { y: 100 },
        {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Card scroll animation
      gsap.from(cardRef.current, {
        y: 60,
        scale: 0.95,
        opacity: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          scrub: true,
        },
      });

      // Text reveal stagger animation
      gsap.from(
        sectionRef.current!.querySelectorAll("h2, p, button"),
        {
          y: 50,
          opacity: 0,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 40%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[150vh] bg-black text-white overflow-hidden"
    >
      {/* Ambient light */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-white/100" />

      {/* Background Identity Typography */}
      <div
        ref={headlineBgRef}
        className="absolute top-[30vh] left-0 w-full px-10 md:px-24 pointer-events-none"
      >
        <h1 className="text-[clamp(5rem,14vw,14rem)] leading-[0.95] font-semibold tracking-tight opacity-[0.05]">
          DESIGN
          <br />
          × ENGINEER
        </h1>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-10 md:px-24 pt-[55vh] grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Text */}
        <div className="lg:col-span-5 space-y-8">
          <p className="uppercase tracking-[0.4em] text-xs text-white/60">
            About
          </p>

          <h2 className="text-[clamp(2.6rem,4.8vw,4.2rem)] leading-[1.05] font-light">
            Where design thinking
            <br />
            meets engineering
            <br />
            precision.
          </h2>

          <p className="text-lg text-white/70 leading-relaxed max-w-[420px]">
            I build immersive digital experiences focused on interaction,
            performance, and clarity — shaping interfaces that feel intentional,
            fluid, and alive.
          </p>

          <button className="relative mt-6 group overflow-hidden border border-white/40 rounded-full px-9 py-4 uppercase tracking-[0.3em] text-xs">
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              Let’s work
            </span>
            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>

        {/* Visual Card */}
        <div className="lg:col-span-7 relative flex justify-end">
          <div
            ref={cardRef}
            className="relative w-[420px] h-[520px] rounded-[26px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_60px_120px_rgba(0,0,0,0.65)]"
          >
            <EvervaultCardDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
