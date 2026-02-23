"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AIGlowBorderProps {
    children: ReactNode;
    className?: string;
    borderRadius?: string;
    glowColor?: string;
    animationDuration?: number;
}

/**
 * Wraps children in rotating gradient glow border (AI card effect).
 * The border rotates a conic gradient — looks like scanning beam.
 */
export default function AIGlowBorder({
    children,
    className,
    borderRadius = "0px",
    glowColor = "60, 76, 255",
    animationDuration = 3,
}: AIGlowBorderProps) {
    return (
        <div className={`relative group ${className ?? ""}`} style={{ borderRadius }}>
            {/* Rotating sharp scan beam border */}
            <motion.div
                className="absolute inset-[-1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ borderRadius, zIndex: 0, overflow: "hidden" }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: animationDuration, ease: "linear" }}
            >
                <div
                    style={{
                        borderRadius,
                        width: "100%",
                        height: "100%",
                        // Shorter, sharper color stops for a "laser" scan look
                        background: `conic-gradient(from 0deg, transparent 0%, rgba(${glowColor}, 1) 2%, transparent 4%)`,
                    }}
                />
            </motion.div>

            {/* Subtle inner border for definition, no fuzzy shadow */}
            <div
                className="absolute inset-0 border border-white/10 pointer-events-none group-hover:border-white/20 transition-colors"
                style={{ borderRadius }}
            />

            {/* Inner background mask */}
            <div className="relative z-10 h-full" style={{ borderRadius }}>
                {children}
            </div>
        </div>
    );
}

/** Lightweight version — just adds a static glow pulse, no rotation */
export function AIGlowPulse({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={`relative ${className ?? ""}`}>
            <motion.div
                className="absolute -inset-[1px] rounded-inherit pointer-events-none"
                style={{
                    background: "linear-gradient(135deg, rgba(60,76,255,0.15) 0%, rgba(139,92,246,0.1) 50%, rgba(6,182,212,0.1) 100%)",
                    borderRadius: "inherit",
                }}
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
}
