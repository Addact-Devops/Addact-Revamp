"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { svgPaths } from "../atom/icons";
import type { DesignFlow } from "@/graphql/queries/getDevelopmentDesignSlug";

// Magnifying glass icon component
function SearchIcon({ color = "#0F0F0F" }: { color?: string }) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[34px] h-[34px]">
      <svg
        className="absolute block w-full h-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 34 34"
      >
        <g>
          <path
            d={svgPaths.p7456a00}
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
        </g>
      </svg>
    </div>
  );
}

// Process data
const processSteps = [
  {
    id: "foundation",
    title: "Foundation building",
    subSteps: [
      "Stakeholder Interviews",
      "Research",
      "User Flow",
      "Information Architecture",
      "Wireframes",
    ],
  },
  {
    id: "visual",
    title: "Visual Design",
    subSteps: [
      "Branding",
      "UI Design",
      "Design System",
      "Component Library",
      "High-Fidelity Screens",
    ],
  },
  {
    id: "interaction",
    title: "Interaction",
    subSteps: [
      "User Journeys",
      "Micro-Interactions",
      "Motion & Animations",
      "Interactive Prototypes",
      "Usability Testing",
    ],
  },
  {
    id: "launch",
    title: "Launch",
    subSteps: [
      "Design Documentation",
      "Developer Handoff",
      "Design Specifications",
      "Implementation Support",
      "Design QA",
    ],
  },
];

export default function DesignProcess({ data }: { data?: DesignFlow | null }) {
  const resolvedProcessSteps = useMemo(() => {
    const dynamicSteps =
      data?.tabsAndFlow?.map((tab, index) => ({
        id:
          tab.tabTitle?.toLowerCase().replace(/\s+/g, "-") ||
          `step-${index + 1}`,
        title: tab.tabTitle || `Step ${index + 1}`,
        subSteps: tab.flow?.map((item) => item.title).filter(Boolean) || [],
      })) ?? [];

    return dynamicSteps.length > 0 ? dynamicSteps : processSteps;
  }, [data]);

  const [selectedStep, setSelectedStep] = useState(
    resolvedProcessSteps[0]?.id ?? "foundation",
  );

  useEffect(() => {
    if (!resolvedProcessSteps.some((step) => step.id === selectedStep)) {
      setSelectedStep(resolvedProcessSteps[0]?.id ?? "foundation");
    }
  }, [resolvedProcessSteps, selectedStep]);

  // Calculate positions for sub-steps in stair pattern
  const getSubStepPosition = (index: number) => {
    // Each step moves right and down diagonally
    const horizontalOffset = index * 160; // Horizontal spacing between steps
    const verticalOffset = index * 104; // Vertical spacing between steps

    return {
      left: `calc(50% - 545.5px + ${horizontalOffset}px)`,
      top: `${101 + verticalOffset}px`,
    };
  };

  return (
    <section className="bg-[#0f0f0f] py-24 relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-[160px]">
        {/* Title */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Montserrat'] font-semibold text-[60px] leading-[74px] text-white mb-4">
            {data?.title || "Where Design Meets Development"}
          </h2>
          <p className="font-['Montserrat'] text-[18px] leading-[28px] text-white/80 max-w-[700px]">
            {data?.description ||
              "We combine strategic design with structured handoff to ensure great experiences are built exactly as intended."}
          </p>
        </motion.div>

        {/* Main Content Container */}
        <div className="relative min-h-[900px]">
          <div className="flex gap-12">
            {/* Left Side - Main Steps */}
            <div className="w-[406px] flex-shrink-0 space-y-4 relative z-20">
              {resolvedProcessSteps &&
                resolvedProcessSteps?.length > 0 &&
                resolvedProcessSteps.map((step, index) => {
                  const isSelected = selectedStep === step.id;

                  return (
                    <motion.button
                      key={step.id}
                      onClick={() => setSelectedStep(step.id)}
                      className={`relative w-full h-[84px] rounded-[10px] overflow-hidden transition-all duration-300 ${
                        isSelected
                          ? "bg-[#3c4cff]"
                          : "bg-transparent border border-white/20"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Icon */}
                      <div className="absolute left-[15px] top-1/2 -translate-y-1/2 bg-white rounded-[10px] w-[54px] h-[54px]">
                        <SearchIcon
                          color={isSelected ? "#3C4CFF" : "#0F0F0F"}
                        />
                      </div>

                      {/* Text */}
                      <p className="absolute left-[89px] top-1/2 -translate-y-1/2 font-['Montserrat'] font-semibold text-[24px] leading-[44px] text-white whitespace-nowrap">
                        {step.title}
                      </p>
                    </motion.button>
                  );
                })}
            </div>

            {/* Right Side - Sub Steps Container */}
            <div className="flex-1 relative">
              {/* Border Box with Grid Background */}
              <div className="absolute left-0 top-0 w-full h-[675px] border-2 border-white/20 rounded-[10px] overflow-hidden">
                {/* Grid Background with Radial Gradients */}
                <div className="absolute inset-0 opacity-15">
                  <svg
                    className="absolute block w-full h-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 1174 735.281"
                  >
                    {/* Grid Lines */}
                    <defs>
                      <radialGradient
                        id="grid-gradient"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(587 367.64) rotate(90) scale(367.64 587)"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="#0F0F0F" />
                      </radialGradient>
                    </defs>
                    {/* Vertical lines */}
                    {Array.from({ length: 20 }).map((_, i) => (
                      <line
                        key={`v-${i}`}
                        x1={i * 60}
                        y1="0"
                        x2={i * 60}
                        y2="735"
                        stroke="white"
                        strokeWidth="1"
                        opacity="0.3"
                      />
                    ))}
                    {/* Horizontal lines */}
                    {Array.from({ length: 15 }).map((_, i) => (
                      <line
                        key={`h-${i}`}
                        x1="0"
                        y1={i * 50}
                        x2="1174"
                        y2={i * 50}
                        stroke="white"
                        strokeWidth="1"
                        opacity="0.3"
                      />
                    ))}
                  </svg>
                </div>

                {/* Horizontal Line Connector */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[38px] w-[1095px] h-[33px]">
                  <svg
                    className="absolute block w-full h-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 1095 33"
                  >
                    <g clipPath="url(#clip0_33_66)" opacity="0.5">
                      <path
                        d={svgPaths.p331d2d00}
                        stroke="white"
                        strokeLinecap="round"
                        strokeWidth="1.18763"
                      />
                      <path d={svgPaths.p801dbf0} fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_33_66">
                        <rect fill="white" height="33" width="1095" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

                {/* Sub Steps */}
                <AnimatePresence mode="wait">
                  {(() => {
                    const step = resolvedProcessSteps.find(
                      (s) => s.id === selectedStep,
                    );
                    if (!step) return null;

                    return step.subSteps.map((subStep, index) => {
                      const position = getSubStepPosition(index);

                      return (
                        <motion.div
                          key={`${step.id}-${index}`}
                          className="absolute backdrop-blur-[10px] bg-[#272727] border border-white/20 h-[84px] w-[425px] rounded-[10px] overflow-hidden"
                          style={{
                            left: position.left,
                            top: position.top,
                          }}
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: -20 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          {/* Icon */}
                          <div className="absolute left-[14px] top-1/2 -translate-y-1/2 bg-white rounded-[10px] w-[54px] h-[54px]">
                            <SearchIcon />
                          </div>

                          {/* Text */}
                          <p className="absolute left-[88px] top-1/2 -translate-y-1/2 font-['Montserrat'] font-semibold text-[24px] leading-[44px] text-white whitespace-nowrap">
                            {subStep}
                          </p>
                        </motion.div>
                      );
                    });
                  })()}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
