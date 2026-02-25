"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import TechReveal from "@/components/atom/TechReveal";

const NeuralParticles = dynamic(() => import("@/components/atom/NeuralParticles"), { ssr: false });

export default function NotFound() {
    return (
        <main className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden px-6">
            {/* Soft background light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/3 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center">
                
                {/* Visual 404 Header with Brand Effect */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative mb-6 md:mb-8 flex items-center justify-center"
                >
                    {/* Brand Effect: Subtle localized glow behind text */}
                    <div className="absolute inset-0 bg-brand-blue/10 blur-[60px] rounded-full scale-75 animate-pulse" />
                    
                    <h1 className="relative text-[120px] md:text-[180px] font-black text-black leading-none tracking-tighter select-none">
                        <TechReveal text="404" duration={1} />
                    </h1>
                </motion.div>

                {/* Content Block */}
                <div className="space-y-4 md:space-y-6 mb-12">
                    <h1 className="text-[40px] md:text-[56px] font-black text-black leading-tight tracking-tight">
                        <TechReveal text="Page not found" duration={1} />
                    </h1>
                    
                    <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed max-w-md mx-auto">
                        We couldn’t find the page you’re looking for.
                    </p>
                </div>

                {/* Simple Premium Action */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <Link href="/">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-12 py-5 bg-black text-white rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-3 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] transition-all duration-300 hover:bg-brand-blue hover:shadow-[0_20px_40px_-10px_rgba(60,76,255,0.5)] cursor-pointer"
                        >
                            <Home size={18} />
                            Return Home
                            <ChevronRight size={16} className="opacity-40" />
                        </motion.div>
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
