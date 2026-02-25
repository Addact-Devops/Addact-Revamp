"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Hammer, Clock, Home, ArrowRight, Construction } from "lucide-react";
import dynamic from "next/dynamic";
import TechReveal from "@/components/atom/TechReveal";

const NeuralParticles = dynamic(() => import("@/components/atom/NeuralParticles"), { ssr: false });

export default function Maintenance() {
    return (
        <main className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden px-6">
            {/* Maintenance Background Stage */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.05]">
                    <NeuralParticles count={40} color="60, 76, 255" lineColor="60, 76, 255" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center">
                
                {/* Construction Hub Indicator */}
                <motion.div
                    animate={{ 
                        rotate: [0, 5, -5, 0],
                        boxShadow: ["0 0 0px rgba(60,76,255,0)", "0 0 40px rgba(60,76,255,0.15)", "0 0 0px rgba(60,76,255,0)"]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-12 w-28 h-28 rounded-[40px] bg-zinc-950 flex items-center justify-center text-white shadow-2xl relative"
                >
                    <Construction size={48} />
                    <motion.div 
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-brand-blue rounded-full flex items-center justify-center"
                    >
                        <span className="w-2 h-2 rounded-full bg-white" />
                    </motion.div>
                </motion.div>

                {/* Content Block */}
                <div className="space-y-6 mb-16">
                    <h1 className="text-[44px] md:text-[68px] font-black text-black leading-none tracking-tight">
                        <TechReveal text="Core Maintenance" duration={1.2} />
                    </h1>
                    
                    <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed max-w-md mx-auto">
                        We are currently optimizing our digital architecture to serve you better. We'll be back online shortly.
                    </p>
                </div>

                {/* Estimate & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-16">
                    <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-3xl text-left">
                        <div className="flex items-center gap-3 text-brand-blue mb-3">
                            <Clock size={20} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Estimated Uplink</span>
                        </div>
                        <p className="text-black font-black text-xl tracking-tight">T-Minus 45 Minutes</p>
                    </div>
                    <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-3xl text-left">
                        <div className="flex items-center gap-3 text-brand-blue mb-3">
                            <Hammer size={20} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Current Task</span>
                        </div>
                        <p className="text-black font-black text-xl tracking-tight">System Refinement</p>
                    </div>
                </div>

                {/* Executive Action */}
                <Link href="/">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-12 py-5 bg-black text-white rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-3 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] transition-all hover:bg-brand-blue"
                    >
                        <Home size={18} />
                        Visit Home Base
                        <ArrowRight size={16} className="opacity-40" />
                    </motion.div>
                </Link>

                {/* System Pulsar */}
                <div className="mt-24 flex items-center gap-6 opacity-20 whitespace-nowrap overflow-hidden">
                    <div className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">System Integrity: 98%</div>
                    <div className="w-12 h-px bg-black" />
                    <div className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Sync Active</div>
                    <div className="w-12 h-px bg-black" />
                    <div className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">ADDACT V2.4</div>
                </div>
            </div>
        </main>
    );
}
