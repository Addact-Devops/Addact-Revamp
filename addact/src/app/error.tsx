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
            {/* Immersive Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 z-0 opacity-[0.03] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center">
                
                {/* Visual Error Header with Brand Glow */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative mb-8 flex items-center justify-center"
                >
                    <div className="absolute inset-0 bg-red-500/10 blur-[60px] rounded-full scale-75 animate-pulse" />
                    
                    <div className="relative w-32 h-32 rounded-3xl bg-black flex items-center justify-center text-white shadow-2xl shadow-red-500/20">
                        {isUnauthorized ? <ShieldAlert size={60} /> : <Cpu size={60} />}
                    </div>
                </motion.div>

                {/* Content Block */}
                <div className="space-y-4 md:space-y-6 mb-12">
                    <h1 className="text-[40px] md:text-[56px] font-black text-black leading-tight tracking-tight uppercase">
                        <TechReveal text={isUnauthorized ? "401 Access Denied" : "500 System Halt"} duration={1} />
                    </h1>
                    
                    <p className="text-zinc-500 text-lg md:text-xl font-medium leading-relaxed max-w-md mx-auto">
                        {isUnauthorized 
                            ? "Your credentials lack the necessary clearance for this node. Access is restricted."
                            : "Our servers are experiencing an internal logic exception. Our engineers are investigating."}
                    </p>
                </div>

                {/* Action Hub */}
                <div className="flex justify-center">
                    <Link href="/">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-12 py-5 bg-black text-white rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-3 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] transition-all hover:bg-brand-blue"
                        >
                            <Home size={18} />
                            Back to Base
                        </motion.div>
                    </Link>
                </div>
            </div>
        </main>
    );
}
