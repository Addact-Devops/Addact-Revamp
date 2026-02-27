"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TechRevealProps {
    text: string;
    className?: string;
    duration?: number;
    delay?: number;
    stagger?: number;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
}

/**
 * TechReveal Refined: Mask Reveal + Tracking + Spring
 * Provides a crisp, "Linear-style" animation where text slides up through a mask.
 */
export default function TechReveal({
    text = "",
    className = "",
    duration = 0.5,
    delay = 0,
    stagger = 0.04,
    as: Tag = "span",
}: TechRevealProps) {
    const ref = useRef(null);
    // Use 0px margin to ensure immediate trigger as soon as it enters viewport
    const isInView = useInView(ref, { once: true, margin: "0px" });

    const words = text ? text.split(" ") : [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: stagger,
                delayChildren: delay,
            },
        },
    };

    const wordVariants = {
        hidden: { 
            y: "100%", 
            opacity: 0,
            letterSpacing: "0.05em", // Subtle tracking start
        },
        visible: {
            y: 0,
            opacity: 1,
            letterSpacing: "0em",
            transition: {
                type: "spring" as const,
                damping: 30, // More damping for smoother settle
                stiffness: 120,
                duration: duration,
            },
        },
    };

    return (
        <Tag className={`inline-block ${className}`} ref={ref}>
            <motion.span
                className={`inline-flex ${className.includes('whitespace-nowrap') ? 'flex-nowrap' : 'flex-wrap'} leading-[1.2] py-[0.1em]`} 
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {words.map((word, i) => (
                    <span
                        key={`${word}-${i}`}
                        className="inline-block relative overflow-hidden mr-[0.25em] py-[0.1em] -my-[0.1em] align-top"
                    >
                        <motion.span
                            variants={wordVariants}
                            className="inline-block whitespace-nowrap"
                            style={{ 
                                willChange: "transform, opacity, letter-spacing",
                                display: "inline-block"
                            }}
                        >
                            {word ? word : "\u00A0"}
                        </motion.span>
                    </span>
                ))}
            </motion.span>
        </Tag>
    );
}
