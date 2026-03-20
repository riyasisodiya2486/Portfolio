"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMobileReveal } from "../hooks/useMobileMotion";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Argo Ocean Chatbot",
    category: "System Interface",
    year: "2025",
    color: "#D1D5DB",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "UFDR Chatbot",
    category: "Brand Experience",
    year: "2025",
    color: "#9CA3AF",
    image: "https://images.unsplash.com/photo-1713950658643-b6882cc08e2b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Productivity Enhancer",
    category: "E-Commerce",
    year: "2025",
    color: "#6B7280",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Second Brain Vault",
    category: "Experimental WebGL",
    year: "2024",
    color: "#E5E7EB",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
  },
];

export default function Project() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useMobileReveal(sectionRef);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      const totalSlides = projects.length + 1;
      const scrollAmount = (totalSlides - 1) * 100;

      const pin = gsap.fromTo(
        sectionRef.current,
        { translateX: 0 },
        {
          translateX: `-${scrollAmount}vw`,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: `+=${scrollAmount * 10}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div className="bg-black max-lg:overflow-visible overflow-hidden">
      <div ref={triggerRef}>
        <div
          ref={sectionRef}
          className="flex flex-row max-lg:flex-col relative min-h-screen max-lg:min-h-screen w-[var(--desktop-width)] max-lg:w-full items-center max-lg:items-start px-[10vw] max-lg:px-8 max-sm:px-4 max-lg:gap-32 max-lg:pt-24 max-lg:pb-32"
          style={{ '--desktop-width': `${(projects.length + 1) * 100}vw` } as React.CSSProperties}
        >
          {/* Section Introduction */}
          <div className="w-[100vw] max-lg:w-full flex flex-col justify-center max-lg:justify-start shrink-0">
            <h2 className="text-[12vw] max-lg:text-[18vw] font-black uppercase text-white leading-none tracking-tighter italic mobile-reveal-heading mobile-motion-element">
              Selected <br /> <span className="text-outline">Works</span>
            </h2>
            <div className="mt-10 flex items-center gap-4 mobile-reveal-text mobile-motion-element">
              <div className="w-12 h-[1px] bg-white/30"></div>
              <p className="text-white/40 font-mono uppercase tracking-widest text-sm max-lg:hidden">Scroll to explore</p>
              <p className="hidden max-lg:block text-white/40 font-mono uppercase tracking-widest text-sm">Scroll down to explore</p>
            </div>
          </div>

          {/* Project Slides */}
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-slide w-[100vw] max-lg:w-full flex justify-center items-center shrink-0 px-20 max-lg:px-0 relative group"
            >
              <div className="relative w-full max-w-5xl overflow-hidden aspect-video max-lg:aspect-square rounded-3xl bg-neutral-900 shadow-2xl mobile-reveal-card mobile-motion-element active:scale-[0.98] transition-transform duration-500 ease-out">
                {/* Image Component */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-expo transform-gpu"
                />

                {/* Info Overlay */}
                <div className="absolute inset-0 p-12 flex flex-col justify-between pointer-events-none">
                  <div className="flex justify-between items-start">
                    <span className="text-white/40 font-mono text-lg">{project.year}</span>
                    <span className="text-white/40 font-mono text-sm uppercase tracking-widest border border-white/20 px-4 py-1 rounded-full backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-7xl md:text-9xl max-lg:text-5xl max-sm:text-4xl font-bold text-white tracking-tighter uppercase leading-none">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Aesthetic Detail Line */}
                <div className="absolute bottom-0 left-0 h-1 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
              </div>

              {/* Massive Background Index Number */}
              <span className="absolute -bottom-10 max-lg:-bottom-4 -right-5 max-lg:-right-2 text-[25vw] max-lg:text-[35vw] font-black text-white/[0.03] select-none pointer-events-none z-0">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .text-outline {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
        .ease-expo {
            transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
        }
      `}</style>
    </div>
  );
}