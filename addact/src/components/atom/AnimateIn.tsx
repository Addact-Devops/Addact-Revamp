"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type AnimationVariant = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "fade";

const variants: Record<AnimationVariant, Variants> = {
    fadeUp: {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    },
    fadeDown: {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0 },
    },
    fadeLeft: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.88 },
        visible: { opacity: 1, scale: 1 },
    },
    fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
};

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

interface AnimateInProps {
    children: ReactNode;
    variant?: AnimationVariant;
    delay?: number;
    duration?: number;
    className?: string;
    stagger?: boolean;          // wraps children in stagger container
    amount?: number;            // viewport threshold 0-1
}

export const AnimateIn = ({
    children,
    variant = "fadeUp",
    delay = 0,
    duration = 0.65,
    className,
    stagger = false,
    amount = 0.15,
}: AnimateInProps) => {
    const ease = [0.22, 1, 0.36, 1] as const;

    if (stagger) {
        return (
            <motion.div
                className={className}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount }}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            className={className}
            variants={variants[variant]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount }}
            transition={{ duration, delay, ease }}
        >
            {children}
        </motion.div>
    );
};

/** Stagger child — pair with <AnimateIn stagger> parent */
export const StaggerItem = ({
    children,
    className,
    variant = "fadeUp",
    duration = 0.55,
}: {
    children: ReactNode;
    className?: string;
    variant?: AnimationVariant;
    duration?: number;
}) => (
    <motion.div
        className={className}
        variants={variants[variant]}
        transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
    >
        {children}
    </motion.div>
);

export default AnimateIn;
