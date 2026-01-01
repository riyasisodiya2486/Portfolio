"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
// Added the Import
import ScrollVelocity from './ui/ScrollVelocity';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    title: "Creative Frontend",
    description: "Architecting immersive interfaces with motion at the core.",
    tech: ["WebGL", "Three.js", "GSAP"],
    speed: 0.1,
    symbol: "M12 2L2 12l10 10 10-10L12 2zm0 18.5L3.5 12 12 3.5 20.5 12 12 20.5z",
    className: "w-[45vw] h-[55vh] top-[18%] left-[5%]",
    pattern: "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]",
  },
  {
    title: "Full-Stack Systems",
    description: "Scalable architecture meeting seamless user experience.",
    tech: ["Next.js", "PostgreSQL", "Redis"],
    speed: 0.25,
    symbol: "M4 4h16v16H4V4zm2 2v12h12V6H6z M9 9h6v6H9V9z",
    className: "w-[35vw] h-[45vh] top-[38%] left-[55%]",
    pattern: "bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:40px_40px]",
  },
  {
    title: "GSAP & Motion",
    description: "Crafting the rhythm and flow of digital interactions.",
    tech: ["Timeline", "ScrollTrigger", "Draggable"],
    speed: 0.15,
    symbol: "M13 2.5l-2.5 7h7L11 21.5l2.5-7h-7L13 2.5z",
    className: "w-[40vw] h-[50vh] top-[60%] left-[15%]",
    pattern: "bg-[dotted-spacing-4_dots-gray-300]",
  },
  {
    title: "Backend & APIs",
    description: "High-performance engines powering the visual layer.",
    tech: ["Node.js", "GraphQL", "Python"],
    speed: 0.3,
    symbol: "M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z",
    className: "w-[38vw] h-[48vh] top-[83%] left-[50%]",
    pattern: "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-200/20 via-transparent to-transparent",
  },
];

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Velocity constant for the ScrollVelocity component
  const velocity = 5;

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const cards = gsap.utils.toArray<HTMLElement>(".skill-card");

    cards.forEach((card, i) => {
      const speed = skillsData[i].speed;

      gsap.to(card, {
        y: -500 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity() / 1500;
          gsap.to(card, {
            skewY: v,
            scale: 1 - Math.abs(v) * 0.05,
            duration: 0.5,
            ease: "power3.out",
          });
        },
      });
    });

    return () => lenis.destroy();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[310vh] bg-gradient-to-b from-white via-transparent to-black "
    >
      {/* ScrollVelocity added at the top of the section */}
      <div className="pt-10 pb-20 text-black/85">
        <ScrollVelocity
          texts={['Design × Engineering', '○ Scroll to Explore']}
          velocity={velocity} 
          className="custom-scroll-text font-black"
        />
      </div>

      {/* Sticky Header */}
      <div className="sticky top-0 h-screen flex flex-col justify-center pointer-events-none z-0">
        <h2 className="text-[12vw] font-black uppercase leading-[0.8] tracking-tighter opacity-10 px-5 select-none">
          Expertise
          <br />
          Capabilities
        </h2>
      </div>

      {/* Cards */}
      <div className="absolute top-0 left-0 w-full h-full py-[20vh]">
        {skillsData.map((skill, i) => (
          <div
            key={i}
            className={`skill-card group absolute ${skill.className}
            backdrop-blur-2xl bg-white/40 border border-white/50
            rounded-[2rem] p-10 flex flex-col justify-between
            shadow-[0_30px_80px_rgba(0,0,0,0.08)]
            transition-all duration-700
            hover:bg-white/60 hover:border-white
            z-[${i + 1}]`}
          >
            {/* Animated Skill Symbol */}
            <div
              className="absolute -top-6 -left-6 w-20 h-20 rounded-full
              bg-white/70 backdrop-blur-xl border border-black/10
              flex items-center justify-center
              animate-[spin_18s_linear_infinite]
              group-hover:scale-110 transition-transform duration-700"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-10 h-10 text-black/70"
                fill="currentColor"
              >
                <path d={skill.symbol} />
              </svg>
            </div>

            {/* Generative Background */}
            <div
              className={`absolute inset-0 rounded-[2rem] opacity-30 
              group-hover:opacity-50 transition-opacity ${skill.pattern}`}
            />

            {/* Content */}
            <div className="relative z-10">
              <span className="font-mono text-sm mb-4 block text-black/40">
                0{i + 1} //
              </span>
              <h3 className="text-4xl md:text-5xl font-light tracking-tight text-black mb-6">
                {skill.title}
              </h3>
              <p className="text-lg text-black/60 max-w-xs leading-relaxed">
                {skill.description}
              </p>
            </div>

            {/* Tech Pills */}
            <div className="relative z-10 flex flex-wrap gap-2">
              {skill.tech.map((t) => (
                <span
                  key={t}
                  className="px-4 py-1 rounded-full
                  border border-black/10
                  bg-white/30 backdrop-blur-md
                  text-xs font-medium uppercase tracking-widest
                  text-black/50"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Corner Arrow */}
            <div
              className="absolute bottom-8 right-8 w-14 h-14 rounded-full
              border border-black/10 flex items-center justify-center
              group-hover:bg-black group-hover:text-white
              transition-all duration-500"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 15 15"
                fill="none"
                className="group-hover:rotate-45 transition-transform duration-500"
              >
                <path
                  d="M1 14L14 1M14 1H5M14 1V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}