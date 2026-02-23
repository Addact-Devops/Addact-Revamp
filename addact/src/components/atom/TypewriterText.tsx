"use client";

import { motion } from "framer-motion";

interface TypewriterTextProps {
    text: string;
    className?: string;
    delay?: number;
    charDelay?: number;
    as?: "h1" | "h2" | "h3" | "span" | "p";
    showCursor?: boolean;
}

export default function TypewriterText({
    text,
    className,
    delay = 0.2,
    charDelay = 0.035,
    as: Tag = "span",
    showCursor = true,
}: TypewriterTextProps) {
    const words = text.split(" ");

    const container = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: charDelay,
                delayChildren: delay,
            },
        },
    };

    const charVariant = {
        hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        },
    };

    // Flatten to chars with space tracking
    const chars: { char: string; key: number }[] = [];
    words.forEach((word, wi) => {
        word.split("").forEach((c, ci) => {
            chars.push({ char: c, key: wi * 100 + ci });
        });
        if (wi < words.length - 1) {
            chars.push({ char: "\u00A0", key: wi * 100 + 99 });
        }
    });

    return (
        <motion.span
            role="heading"
            aria-label={text}
            className={`inline-block ${className ?? ""}`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {chars.map(({ char, key }) => (
                <motion.span
                    key={key}
                    variants={charVariant}
                    className="inline-block"
                    style={{ willChange: "opacity, transform" }}
                >
                    {char}
                </motion.span>
            ))}
            {showCursor && (
                <motion.span
                    className="inline-block ml-[2px] w-[3px] h-[0.85em] bg-[#3C4CFF] rounded-full align-middle"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: "linear", delay: delay + chars.length * charDelay + 0.2 }}
                />
            )}
        </motion.span>
    );
}
