"use client";

import { ArrowRight } from "lucide-react";
import Orb from "../Orb";

export default function HeroAISection() {
  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Orb Background */}
      <div className="absolute inset-0 z-0">
        <Orb hoverIntensity={1.1} backgroundColor={"#0F0F0F"} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto text-center px-6 pointer-events-none">
        <h1
          className="text-white font-bold! uppercase leading-[1.1]
          text-[34px] md:text-[54px] lg:text-[60px]! xl:text-[100px]!"
        >
          BUILD THE FUTURE
          <br />
          WITH AI
        </h1>

        <p
          className="text-white/70 mt-6 max-w-[788px] mx-auto
          text-[15px] md:text-[18px] xl:text-[24px]!"
        >
          With our rich and long-standing experience in development and design
          services, we have been successfully delivering experiences that are
          mature, meaningful.
        </p>

        {/* Button needs pointer events */}
        <button
          className="pointer-events-auto mt-8 inline-flex items-center gap-3
          bg-[#4F6EF7] hover:bg-[#3f5ce0]
          text-white px-6 py-3 rounded-lg
          text-[16px] font-medium
          transition-all duration-300"
        >
          Start a Project
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
