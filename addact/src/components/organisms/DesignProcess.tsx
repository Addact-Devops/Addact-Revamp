"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { svgPaths } from "../atom/icons";
import type { DesignFlow } from "@/graphql/queries/getDevelopmentDesignSlug";

// Magnifying glass icon component
function SearchIcon({ color = "#0F0F0F" }: { color?: string }) {
    return (
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[34px] h-[34px]'>
            <svg className='absolute block w-full h-full' fill='none' preserveAspectRatio='none' viewBox='0 0 34 34'>
                <g>
                    <path
                        d={svgPaths.p7456a00}
                        stroke={color}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2.5'
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
        subSteps: ["Stakeholder Interviews", "Research", "User Flow", "Information Architecture", "Wireframes"],
    },
    {
        id: "visual",
        title: "Visual Design",
        subSteps: ["Branding", "UI Design", "Design System", "Component Library", "High-Fidelity Screens"],
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
                id: tab.tabTitle?.toLowerCase().replace(/\s+/g, "-") || `step-${index + 1}`,
                title: tab.tabTitle || `Step ${index + 1}`,
                subSteps: tab.flow?.map((item) => item.title).filter(Boolean) || [],
            })) ?? [];

        return dynamicSteps.length > 0 ? dynamicSteps : processSteps;
    }, [data]);

    const [selectedStep, setSelectedStep] = useState(resolvedProcessSteps[0]?.id ?? "foundation");

    useEffect(() => {
        if (!resolvedProcessSteps.some((step) => step.id === selectedStep)) {
            setSelectedStep(resolvedProcessSteps[0]?.id ?? "foundation");
        }
    }, [resolvedProcessSteps, selectedStep]);

    const selectedProcessStep =
        resolvedProcessSteps.find((step) => step.id === selectedStep) ?? resolvedProcessSteps[0];

    // Desktop stair positions (xl+ only)
    const getDesktopSubStepPosition = (index: number) => {
        const horizontalOffset = index * 15.5;
        const verticalOffset = index * 96;

        return {
            left: `${2 + horizontalOffset}%`,
            top: `${86 + verticalOffset}px`,
        };
    };

    // Compact stair positions (<xl)
    const getCompactSubStepPosition = (index: number) => {
        const horizontalOffset = index * 11;
        const verticalOffset = index * 72;

        return {
            left: `${2 + horizontalOffset}%`,
            top: `${72 + verticalOffset}px`,
        };
    };

    return (
        <section className='relative overflow-hidden bg-[#0f0f0f] py-12 md:py-16 xl:py-20 2xl:py-24'>
            <div className='mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-10 xl:px-16 2xl:px-[120px]'>
                {/* Title */}
                <motion.div
                    className='mb-8 md:mb-12 xl:mb-16'
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="mb-4 font-['Montserrat'] text-[42px] font-semibold leading-[1.15] text-white sm:text-[48px] md:text-[56px] xl:text-[64px] 2xl:text-[72px]">
                        {data?.title || "Where Design Meets Development"}
                    </h2>
                    <p className="max-w-[700px] font-['Montserrat'] text-[22px] leading-[1.5] text-white/80 md:text-[24px] xl:text-[28px]">
                        {data?.description ||
                            "We combine strategic design with structured handoff to ensure great experiences are built exactly as intended."}
                    </p>
                </motion.div>

                {/* Main Content Container */}
                <div className='relative'>
                    <div className='flex flex-col gap-6 md:gap-10 lg:gap-12 xl:flex-row xl:gap-10 2xl:gap-12'>
                        {/* Left Side - Main Steps (Desktop) */}
                        <div className='relative z-20 hidden w-full space-y-3 md:space-y-4 xl:block xl:w-[360px] xl:shrink-0 2xl:w-[406px]'>
                            {resolvedProcessSteps &&
                                resolvedProcessSteps?.length > 0 &&
                                resolvedProcessSteps.map((step, index) => {
                                    const isSelected = selectedStep === step.id;

                                    return (
                                        <motion.button
                                            key={step.id}
                                            onClick={() => setSelectedStep(step.id)}
                                            className={`relative h-[68px] w-full overflow-hidden rounded-[10px] transition-all duration-300 md:h-[76px] 2xl:h-[84px] ${
                                                isSelected ? "bg-[#3c4cff]" : "bg-transparent border border-white/20"
                                            }`}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {/* Icon */}
                                            <div className='absolute left-3 top-1/2 h-[44px] w-[44px] -translate-y-1/2 rounded-[10px] bg-white md:left-[14px] md:h-[50px] md:w-[50px] 2xl:left-[15px] 2xl:h-[54px] 2xl:w-[54px]'>
                                                <SearchIcon color={isSelected ? "#3C4CFF" : "#0F0F0F"} />
                                            </div>

                                            {/* Text */}
                                            <p className="absolute left-[72px] top-1/2 -translate-y-1/2 whitespace-nowrap font-['Montserrat'] text-[18px] font-semibold leading-[1.2] text-white md:left-[82px] md:text-[22px] 2xl:left-[89px] 2xl:text-[24px]">
                                                {step.title}
                                            </p>
                                        </motion.button>
                                    );
                                })}
                        </div>

                        {/* Top Tabs - Horizontal (<xl) */}
                        <div className='relative z-20 xl:hidden'>
                            <div className='-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'>
                                {resolvedProcessSteps.map((step, index) => {
                                    const isSelected = selectedStep === step.id;

                                    return (
                                        <motion.button
                                            key={step.id}
                                            onClick={() => setSelectedStep(step.id)}
                                            className={`relative h-[62px] min-w-[252px] overflow-hidden rounded-[10px] px-3 transition-all duration-300 sm:min-w-[280px] md:h-[68px] md:min-w-[300px] ${
                                                isSelected ? "bg-[#3c4cff]" : "border border-white/20 bg-transparent"
                                            }`}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.28, delay: index * 0.06 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className='absolute left-3 top-1/2 h-[40px] w-[40px] -translate-y-1/2 rounded-[10px] bg-white md:h-[44px] md:w-[44px]'>
                                                <SearchIcon color={isSelected ? "#3C4CFF" : "#0F0F0F"} />
                                            </div>
                                            <p className="absolute left-[64px] top-1/2 -translate-y-1/2 whitespace-nowrap font-['Montserrat'] text-[17px] font-semibold leading-[1.2] text-white md:left-[72px] md:text-[20px]">
                                                {step.title}
                                            </p>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Side - Sub Steps Container (Desktop) */}
                        <div className='relative hidden min-h-[620px] flex-1 xl:block 2xl:min-h-[700px]'>
                            {/* Border Box with Grid Background */}
                            <div className='absolute inset-0 overflow-hidden rounded-[10px] border-2 border-white/20'>
                                {/* Grid Background with Radial Gradients */}
                                <div className='absolute inset-0 opacity-15'>
                                    <svg
                                        className='absolute block w-full h-full'
                                        fill='none'
                                        preserveAspectRatio='none'
                                        viewBox='0 0 1174 735.281'
                                    >
                                        {/* Grid Lines */}
                                        <defs>
                                            <radialGradient
                                                id='grid-gradient'
                                                cx='0'
                                                cy='0'
                                                r='1'
                                                gradientUnits='userSpaceOnUse'
                                                gradientTransform='translate(587 367.64) rotate(90) scale(367.64 587)'
                                            >
                                                <stop stopColor='white' />
                                                <stop offset='1' stopColor='#0F0F0F' />
                                            </radialGradient>
                                        </defs>
                                        {/* Vertical lines */}
                                        {Array.from({ length: 20 }).map((_, i) => (
                                            <line
                                                key={`v-${i}`}
                                                x1={i * 60}
                                                y1='0'
                                                x2={i * 60}
                                                y2='735'
                                                stroke='white'
                                                strokeWidth='1'
                                                opacity='0.3'
                                            />
                                        ))}
                                        {/* Horizontal lines */}
                                        {Array.from({ length: 15 }).map((_, i) => (
                                            <line
                                                key={`h-${i}`}
                                                x1='0'
                                                y1={i * 50}
                                                x2='1174'
                                                y2={i * 50}
                                                stroke='white'
                                                strokeWidth='1'
                                                opacity='0.3'
                                            />
                                        ))}
                                    </svg>
                                </div>

                                {/* Horizontal Line Connector */}
                                <div className='absolute left-[4%] right-[4%] top-[30px] h-[33px]'>
                                    <svg
                                        className='absolute block w-full h-full'
                                        fill='none'
                                        preserveAspectRatio='none'
                                        viewBox='0 0 1000 33'
                                    >
                                        <g clipPath='url(#clip0_33_66)' opacity='0.5'>
                                            <path
                                                d={svgPaths.p331d2d00}
                                                stroke='white'
                                                strokeLinecap='round'
                                                strokeWidth='1.18763'
                                            />
                                            <path d={svgPaths.p801dbf0} fill='white' />
                                        </g>
                                        <defs>
                                            <clipPath id='clip0_33_66'>
                                                <rect fill='white' height='33' width='1000' />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>

                                {/* Sub Steps */}
                                <AnimatePresence mode='wait'>
                                    {(() => {
                                        const step = resolvedProcessSteps.find((s) => s.id === selectedStep);
                                        if (!step) return null;

                                        return step.subSteps.map((subStep, index) => {
                                            const position = getDesktopSubStepPosition(index);

                                            return (
                                                <motion.div
                                                    key={`${step.id}-${index}`}
                                                    className='absolute h-[72px] min-w-[240px] max-w-[425px] w-[min(36vw,425px)] overflow-hidden rounded-[10px] border border-white/20 bg-[#272727] backdrop-blur-[10px] 2xl:h-[84px]'
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
                                                    <div className='absolute left-3 top-1/2 h-[44px] w-[44px] -translate-y-1/2 rounded-[10px] bg-white 2xl:left-[14px] 2xl:h-[54px] 2xl:w-[54px]'>
                                                        <SearchIcon />
                                                    </div>

                                                    {/* Text */}
                                                    <p className="absolute left-[68px] top-1/2 -translate-y-1/2 whitespace-nowrap font-['Montserrat'] text-[18px] font-semibold leading-[1.2] text-white 2xl:left-[88px] 2xl:text-[24px]">
                                                        {subStep}
                                                    </p>
                                                </motion.div>
                                            );
                                        });
                                    })()}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Right Side - Sub Steps Container (<xl, same board style) */}
                        <div className='relative mt-0 min-h-[470px] w-full xl:hidden md:mt-8 md:min-h-[560px] lg:mt-10 lg:min-h-[620px]'>
                            <div className='absolute inset-0 overflow-hidden rounded-[10px] border border-white/20'>
                                <div className='absolute inset-0 opacity-15'>
                                    <svg
                                        className='absolute block h-full w-full'
                                        fill='none'
                                        preserveAspectRatio='none'
                                        viewBox='0 0 1174 735.281'
                                    >
                                        {Array.from({ length: 20 }).map((_, i) => (
                                            <line
                                                key={`compact-v-${i}`}
                                                x1={i * 60}
                                                y1='0'
                                                x2={i * 60}
                                                y2='735'
                                                stroke='white'
                                                strokeWidth='1'
                                                opacity='0.3'
                                            />
                                        ))}
                                        {Array.from({ length: 15 }).map((_, i) => (
                                            <line
                                                key={`compact-h-${i}`}
                                                x1='0'
                                                y1={i * 50}
                                                x2='1174'
                                                y2={i * 50}
                                                stroke='white'
                                                strokeWidth='1'
                                                opacity='0.3'
                                            />
                                        ))}
                                    </svg>
                                </div>

                                <div className='absolute left-[4%] right-[4%] top-[22px] h-[28px] md:top-[26px] md:h-[30px]'>
                                    <svg
                                        className='absolute block h-full w-full'
                                        fill='none'
                                        preserveAspectRatio='none'
                                        viewBox='0 0 1000 33'
                                    >
                                        <g clipPath='url(#clip0_33_66_compact)' opacity='0.5'>
                                            <path
                                                d={svgPaths.p331d2d00}
                                                stroke='white'
                                                strokeLinecap='round'
                                                strokeWidth='1.18763'
                                            />
                                            <path d={svgPaths.p801dbf0} fill='white' />
                                        </g>
                                        <defs>
                                            <clipPath id='clip0_33_66_compact'>
                                                <rect fill='white' height='33' width='1000' />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>

                                <AnimatePresence mode='wait'>
                                    {selectedProcessStep?.subSteps.map((subStep, index) => {
                                        const position = getCompactSubStepPosition(index);

                                        return (
                                            <motion.div
                                                key={`${selectedProcessStep.id}-${index}`}
                                                className='absolute h-[62px] min-w-[200px] w-[min(46vw,420px)] overflow-hidden rounded-[10px] border border-white/20 bg-[#272727] backdrop-blur-[10px] md:h-[68px]'
                                                style={{
                                                    left: position.left,
                                                    top: position.top,
                                                }}
                                                initial={{ opacity: 0, scale: 0.86, y: 14 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.86, y: -12 }}
                                                transition={{
                                                    duration: 0.34,
                                                    delay: index * 0.08,
                                                    type: "spring",
                                                    stiffness: 180,
                                                }}
                                            >
                                                <div className='absolute left-2.5 top-1/2 h-[38px] w-[38px] -translate-y-1/2 rounded-[10px] bg-white md:left-3 md:h-[40px] md:w-[40px]'>
                                                    <SearchIcon />
                                                </div>
                                                <p className="absolute left-[58px] top-1/2 -translate-y-1/2 whitespace-nowrap font-['Montserrat'] text-[16px] font-semibold leading-[1.2] text-white md:left-[64px] md:text-[18px]">
                                                    {subStep}
                                                </p>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
