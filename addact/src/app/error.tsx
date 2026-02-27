"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ShieldAlert, Cpu } from "lucide-react";
import TechReveal from "@/components/atom/TechReveal";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("System Error Captured:", error);
    }, [error]);

    const isUnauthorized = error.message?.toLowerCase().includes("unauthorized") || error.message?.includes("401");

    return (
        <main className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden px-6">
            {/* Immersive Background Atmosphere - Refined & Lightweight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute inset-0 z-0 opacity-[0.02] bg-[radial-gradient(#3C4CFF_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
                
                {/* Visual Error Header - Minimalist & Premium */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative mb-10 flex items-center justify-center"
                >
                    <div className="absolute inset-0 bg-brand-blue/10 blur-[50px] rounded-full scale-125 transition-all duration-1000" />
                    
                    <div className="relative w-24 h-24 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-brand-blue shadow-xl shadow-brand-blue/5 group">
                        {isUnauthorized ? <ShieldAlert size={44} className="group-hover:scale-110 transition-transform duration-500" /> : <Cpu size={44} className="group-hover:scale-110 transition-transform duration-500" />}
                    </div>
                </motion.div>

                <div className="space-y-4 md:space-y-6 mb-12 flex flex-col items-center w-full">
                    <h1 className="text-[32px] md:text-[44px] font-bold text-zinc-900 leading-[1.1] tracking-tight text-center whitespace-nowrap">
                        <TechReveal 
                            text={isUnauthorized ? "401 Access Denied" : "System Under Maintenance"} 
                            duration={1} 
                            className="whitespace-nowrap"
                        />
                    </h1>
                    
                    <p className="text-zinc-500 text-lg leading-relaxed max-w-[600px] text-center">
                        {isUnauthorized 
                            ? "Your current session lacks the required authorization. Please re-authenticate."
                            : "Our platform is currently undergoing scheduled maintenance to enhance performance. We'll be back online in just a moment."}
                    </p>
                </div>

                {/* Action Hub - Premium Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
                    <Link href="/" className="w-full sm:w-auto">
                        <motion.div
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-10 py-4 bg-brand-blue text-white rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-lg shadow-brand-blue/20 hover:shadow-xl hover:shadow-brand-blue/30 transition-all duration-300 min-w-[210px]"
                        >
                            <Home size={18} />
                            Return Home
                        </motion.div>
                    </Link>
                    
                    <motion.button
                        onClick={() => reset()}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-10 py-4 bg-white text-zinc-900 border border-zinc-200 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-zinc-50 hover:border-zinc-300 shadow-sm min-w-[210px] flex items-center justify-center"
                    >
                        Try Re-syncing
                    </motion.button>
                </div>
            </div>
        </main>
    );
}
