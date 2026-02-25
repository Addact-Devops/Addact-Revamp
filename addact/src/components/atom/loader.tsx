"use client";

import { motion } from "framer-motion";

const Loader = ({ fullPage = true }: { fullPage?: boolean }) => {
    return (
        <div
            className={
                fullPage
                    ? "fixed inset-0 flex flex-col items-center justify-center z-[9999] bg-[#0A0A0F]"
                    : "flex flex-col items-center justify-center py-8 w-full"
            }
        >
            {/* ── Background ambient light ── */}
            {fullPage && (
                <>
                    <motion.div
                        animate={{ opacity: [0.06, 0.14, 0.06], scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-[600px] h-[600px] rounded-full bg-[#3C4CFF] blur-[160px] pointer-events-none"
                    />
                    <motion.div
                        animate={{ opacity: [0.03, 0.08, 0.03], scale: [1.1, 1, 1.1] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute w-[300px] h-[300px] rounded-full bg-[#9BA5FF] blur-[100px] pointer-events-none translate-x-32 -translate-y-20"
                    />
                </>
            )}

            {/* ── Main Logo Animation ── */}
            <div className="relative flex items-center justify-center">

                {/* Outer spinning ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[120px] h-[120px] rounded-full border border-[#3C4CFF]/20"
                    style={{
                        background:
                            "conic-gradient(from 0deg, transparent 70%, rgba(60,76,255,0.6) 100%)",
                        borderRadius: "50%",
                    }}
                />

                {/* Inner spinning ring — reverse */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[88px] h-[88px] rounded-full"
                    style={{
                        background:
                            "conic-gradient(from 180deg, transparent 60%, rgba(60,76,255,0.4) 100%)",
                        borderRadius: "50%",
                    }}
                />

                {/* Centre glow pad */}
                <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.05, 0.9] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute w-14 h-14 rounded-full bg-[#3C4CFF]/10 blur-[16px]"
                />

                {/* Addact 'A' Logo */}
                <svg
                    width={fullPage ? "42" : "32"}
                    height={fullPage ? "40" : "30"}
                    viewBox="0 0 28.2175 26.6615"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10"
                >
                    {/* Filled body — fades in */}
                    <motion.path
                        d="M28.2175 26.6615H23.0379L14.0695 6.1848L5.10109 26.6615H0L11.9033 0.280029H16.2755L28.2175 26.6615Z"
                        fill="rgba(60,76,255,0.15)"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Stroke path draw */}
                    <motion.path
                        d="M28.2175 26.6615H23.0379L14.0695 6.1848L5.10109 26.6615H0L11.9033 0.280029H16.2755L28.2175 26.6615Z"
                        stroke="#3C4CFF"
                        strokeWidth="0.8"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: [0, 1, 1, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.45, 0.75, 1],
                        }}
                    />
                    {/* Bright stroke tip — small highlight */}
                    <motion.path
                        d="M28.2175 26.6615H23.0379L14.0695 6.1848L5.10109 26.6615H0L11.9033 0.280029H16.2755L28.2175 26.6615Z"
                        stroke="white"
                        strokeWidth="0.3"
                        fill="none"
                        strokeOpacity={0.25}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: [0, 1, 1, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            times: [0, 0.45, 0.75, 1],
                            delay: 0.1,
                        }}
                    />
                </svg>

                {/* 3 orbital dots */}
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 2.5 + i * 0.8,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.4,
                        }}
                        style={{
                            width: 100 + i * 16,
                            height: 100 + i * 16,
                            top: "50%",
                            left: "50%",
                            marginTop: -(50 + i * 8),
                            marginLeft: -(50 + i * 8),
                            borderRadius: "50%",
                        }}
                    >
                        <div
                            className="rounded-full bg-[#3C4CFF] shadow-[0_0_8px_2px_rgba(60,76,255,0.6)]"
                            style={{
                                width: 4 - i * 0.8,
                                height: 4 - i * 0.8,
                                position: "absolute",
                                top: 0,
                                left: "50%",
                                transform: "translateX(-50%)",
                                opacity: 1 - i * 0.25,
                            }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* ── Brand name + progress bar ── */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-10 flex flex-col items-center gap-3"
            >
                <span className="text-white/50 text-[10px] uppercase tracking-[0.45em] font-medium">
                    {fullPage ? "Addact Technology" : "Loading…"}
                </span>

                {/* Animated progress bar */}
                <div className="w-24 h-[2px] rounded-full bg-white/8 overflow-hidden">
                    <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#3C4CFF] to-[#7B88FF]"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                        style={{ width: "60%" }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default Loader;
