'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

// Easing for a premium, soft feel
const premiumEase = "power2.out";

export function useMobileReveal(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    // Only execute this logic on mobile or tablet visibilities
    if (window.innerWidth > 1024) return;
    if (!containerRef.current) return;

    // Use Intersection Observer for highest performance threshold reveals
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            // Prevent duplicate triggers
            observer.unobserve(el);

            const isHeading = el.classList.contains('mobile-reveal-heading');
            const isCard = el.classList.contains('mobile-reveal-card');

            if (isHeading) {
              gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: premiumEase });
            } else if (isCard) {
              gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" });
            } else {
              gsap.to(el, { opacity: 1, y: 0, duration: 0.5, ease: premiumEase });
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    const elements = containerRef.current.querySelectorAll(
      '.mobile-reveal-heading, .mobile-reveal-card, .mobile-reveal-text'
    );

    elements.forEach((el) => {
      // Set initial states BEFORE observing to prevent FOUC and ensure GSAP tracks the transform
      const isCard = el.classList.contains('mobile-reveal-card');
      const isHeading = el.classList.contains('mobile-reveal-heading');
      
      const startY = isCard ? 40 : (isHeading ? 30 : 20);
      const startScale = isCard ? 0.96 : 1;
      
      gsap.set(el, { 
        opacity: 0, 
        y: startY, 
        scale: startScale 
      });
      
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [containerRef]);
}
