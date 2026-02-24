"use client";

import React from "react";
import { motion } from "framer-motion";

type BadgeVariant = "primary" | "glass" | "status" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const Badge = ({ children, variant = "primary", className = "" }: BadgeProps) => {
  const variantStyles = {
    primary: "bg-[#3C4CFF] text-white shadow-lg shadow-[#3C4CFF]/20",
    glass: "bg-white/10 backdrop-blur-md border border-white/10 text-white/90 group-hover:bg-[#3C4CFF]/20 group-hover:border-[#3C4CFF]/30 transition-all duration-300",
    status: "bg-[#3C4CFF] text-white font-bold tracking-widest uppercase",
    outline: "border border-[#3C4CFF]/30 text-[#3C4CFF] hover:bg-[#3C4CFF] hover:text-white transition-all duration-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wide ${variantStyles[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Badge;
