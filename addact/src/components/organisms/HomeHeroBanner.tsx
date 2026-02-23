"use client";

import Link from "next/link";
import { BANNER } from "@/graphql/queries/getHomePage";
import RichText from "../atom/richText";
import VerticalLines from "../molecules/VerticalLines";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import TechReveal from "../atom/TechReveal";

// Dynamic import to avoid SSR issues with canvas
const NeuralParticles = dynamic(() => import("../atom/NeuralParticles"), { ssr: false });

interface IProps {
    data: BANNER;
}

const ease = [0.22, 1, 0.36, 1] as const;

const HomeHeroBanner = ({ data }: IProps) => {
    const src = data?.Banner[0]?.BannerImage?.url ?? "#";
    const title = data?.Banner?.[0]?.BannerTitle ?? "";

    return (
        <section className="relative w-full py-[60px] lg:py-0 lg:h-screen flex items-center justify-center overflow-hidden mt-[56px] lg:mt-[100px]">
            {/* Background video */}
            <video className="absolute top-0 left-0 w-full h-full object-cover z-0" autoPlay muted loop playsInline>
                <source src={src} type="video/mp4" />
            </video>

            {/* Neural particle network overlay — the AI company signature */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <NeuralParticles count={60} color="100, 130, 255" lineColor="80, 110, 255" connectDistance={140} />
            </div>

            {/* Vertical grid lines */}
            <div className="absolute inset-0 z-11 pointer-events-none">
                <div className="relative w-full h-full">
                    <VerticalLines />
                </div>
            </div>

            {/* Scanning beam line — AI data-analysis feel */}
            <motion.div
                className="absolute left-0 right-0 h-[1.5px] z-20 pointer-events-none"
                style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(60,76,255,0.7) 30%, rgba(139,92,246,0.9) 50%, rgba(60,76,255,0.7) 70%, transparent 100%)",
                }}
                animate={{ y: ["10vh", "90vh"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatType: "loop" }}
            />

            <div className="relative z-20 md:max-w-[80%] 2xl:max-w-[1234px] w-full">
                <div className="text-white px-10 xl:px-0">
                    {/* Hero title — typewriter char-by-char reveal + blur */}
                    <h1 className="uppercase banner-title">
                        <TechReveal text={title} duration={1.2} />
                    </h1>

                    <div className="flex flex-col sm:flex-row sm:items-center lg:gap-9">
                        {/* Subtitle fades up after typewriter */}
                        <motion.div
                            className="text-base sm:!text-base lg:!text-2xl font-medium max-w-[910px] hero-subtext"
                            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.9, ease, delay: 0.8 + title.length * 0.032 }}
                        >
                            <RichText html={data?.Banner?.[0]?.BannerDescription} />
                        </motion.div>

                        {/* CTA button — scales in with pulsing ring */}
                        <motion.div
                            className="relative shrink-0"
                            initial={{ opacity: 0, scale: 0.75 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease, delay: 1.1 + title.length * 0.032 }}
                        >
                            {/* Pulsing AI ring around CTA button */}
                            <motion.div
                                className="absolute inset-0 rounded-full pointer-events-none"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                style={{ background: "radial-gradient(circle, rgba(60,76,255,0.4) 0%, transparent 70%)" }}
                            />
                            <Link
                                href={data?.Banner?.[0]?.BannerLink.href}
                                target={data?.Banner?.[0]?.BannerLink?.isExternal ? "_blank" : "_self"}
                                className="inline-block group relative shrink-0"
                            >
                                <div className="relative w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] rounded-full bg-[#3C4CFF] overflow-visible float-right">
                                    <motion.div
                                        className="absolute w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] left-[-20px] lg:left-[-30px] top-1/2 -translate-y-1/2 text-white"
                                        whileHover={{ x: 8 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                                    >
                                        <div className="hidden lg:block">
                                            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M72.1525 29.6502L102.502 60.0002L72.1525 90.3502" stroke="white" strokeWidth="4.3875" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M17.498 59.9999L101.648 59.9999" stroke="white" strokeWidth="4.3875" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="block lg:hidden">
                                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M48.1016 19.7668L68.3349 40.0002L48.1016 60.2335" stroke="white" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M11.666 40H67.766" stroke="white" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </motion.div>
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeHeroBanner;
