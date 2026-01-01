import React from "react";
import { EvervaultCard, Icon } from "./ui/evervault-card";

export function EvervaultCardDemo() {
  return (
    <div className="relative h-[500px] w-full max-w-[400px] mx-auto group">
      {/* CARD BACKGROUND: 
          Using bg-zinc-900/90 (90% opacity) ensures the card stays 
          visible even against the pure white bottom of your section.
      */}
      <div className="relative h-full w-full rounded-[30px] overflow-hidden
        bg-zinc-900/90 backdrop-blur-3xl
        border border-white/10
        shadow-[0_60px_100px_-20px_rgba(0,0,0,0.8)]"
      >
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] pointer-events-none" />

        {/* Icons changed to a muted silver */}
        <Icon className="absolute h-5 w-5 top-4 left-4 text-zinc-500 group-hover:text-white transition-colors duration-500" />
        <Icon className="absolute h-5 w-5 top-4 right-4 text-zinc-500 group-hover:text-white transition-colors duration-500" />
        <Icon className="absolute h-5 w-5 bottom-4 left-4 text-zinc-500 group-hover:text-white transition-colors duration-500" />
        <Icon className="absolute h-5 w-5 bottom-4 right-4 text-zinc-500 group-hover:text-white transition-colors duration-500" />

        <div className="absolute inset-0">
          <EvervaultCard 
            text="ME" 
            className="opacity-40 group-hover:opacity-100 transition-opacity duration-700"
          />
        </div>

        <div className="absolute bottom-8 left-8 right-8 z-10">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-medium">
              Introduction
            </p>

            <h3 className="text-2xl font-light text-white tracking-tight leading-[1.1]">
              Focused on <br />
              <span className="text-zinc-400 italic">minimalist design.</span>
            </h3>
            
            <div className="h-[1px] w-12 bg-white/20 mt-2" />
          </div>
        </div>

        {/* Subtle inner glow to give the card depth */}
        <div className="absolute inset-0 rounded-[30px] ring-1 ring-inset ring-white/10 pointer-events-none" />
      </div>
    </div>
  );
}