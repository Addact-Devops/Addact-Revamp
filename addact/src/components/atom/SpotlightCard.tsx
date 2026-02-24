"use client";

import React, { ReactNode, useRef, useState, MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  gridOpacity?: number;
  gridSize?: number;
}

/**
 * A premium AI-style card that reveals a grid and a radial spotlight focusing on the mouse.
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(60, 76, 255, 0.1)",
  gridOpacity = 0.2,
  gridSize = 25,
}: SpotlightCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group overflow-hidden border border-black/10 ${className}`}
    >
      {/* Interactive Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />

      {/* Grid Pattern Overlay (Revealed by Spotlight/Hover) — Refined for white theme */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
        style={{
          backgroundImage: `linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)`,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* Subtle border highlight that follows mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-inherit border-2 border-brand-blue opacity-0 transition duration-500 group-hover:opacity-10"
        style={{
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black,
              transparent
            )
          `,
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
