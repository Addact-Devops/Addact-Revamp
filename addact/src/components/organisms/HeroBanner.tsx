"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import TechReveal from "../atom/TechReveal";
import Magnetic from "../molecules/Magnetic";

const NeuralParticles = dynamic(() => import("../atom/NeuralParticles"), { ssr: false });

type HeroBannerProps = {
    title: string;
    description: string;
    backgroundImageUrl: string;
    button?: {
        label: string;
        url: string;
    };
    showAnchorLinks?: boolean;
};

const HeroBanner = ({ title, description, backgroundImageUrl, button, showAnchorLinks = false }: HeroBannerProps) => {
    const pathname = usePathname();
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            const yOffset = -130;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
      <section 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative text-white overflow-hidden bg-[#050505]"
      >
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
            {backgroundImageUrl && backgroundImageUrl.match(/\.(mp4|webm)$/i) ? (
            <video
                src={backgroundImageUrl}
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
            />
            ) : backgroundImageUrl ? (
            <Image
                src={backgroundImageUrl}
                alt={title || "Hero Image"}
                fill
                className="object-cover object-center z-0 opacity-40 shadow-2xl"
                priority
            />
            ) : null}

            {/* Neural Particles Motif (Interactive) */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
                <NeuralParticles count={50} color="100, 130, 255" lineColor="80, 110, 255" connectDistance={140} interactive={true} />
            </div>


            {/* Scanning beam effect */}
            <motion.div
                className="absolute left-0 right-0 h-[1.5px] z-20 pointer-events-none"
                style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(60,76,255,0.4) 30%, rgba(139,92,246,0.6) 50%, rgba(60,76,255,0.4) 70%, transparent 100%)",
                }}
                animate={{ y: ["0vh", "100vh"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatType: "loop" }}
            />

            {/* Cinematic Grain Texture */}
            <div className="absolute inset-0 z-1 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

            {/* Premium Overlays */}
            <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/20 to-[#050505] z-11"></div>
        </div>

        {/* Content Section */}
        <div className="relative container mt-[80px] lg:mt-[100px] min-h-[450px] lg:min-h-[550px] 2xl:min-h-[650px] flex flex-col justify-center z-30 py-12">
          <div className="text-left max-w-full">
            <h1 className="text-white mb-6 font-bold! text-[36px]! md:text-[55px]! 2xl:text-[72px]! leading-[1.1] xl:max-w-[75%] uppercase tracking-tight">
              <TechReveal text={title} duration={1.2} />
            </h1>

            <motion.div
              className="text-white/70 text-[16px] leading-[1.6] lg:text-[19px] lg:leading-[1.6] font-light mt-0 xl:max-w-[60%]"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.8 }}
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {button?.label && button?.url && (
              <motion.div 
                className="mt-10 md:mt-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                    {button.url.includes("#") ? (
                    <button
                        onClick={() => {
                        const targetId = button.url.replace("#", "");
                        const el = document.getElementById(targetId);
                        if (el) {
                            const yOffset = -130;
                            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                            window.scrollTo({ top: y, behavior: "smooth" });
                        }
                        }}
                        className="inline-flex items-center gap-3 bg-[#3C4CFF] hover:bg-[#4D5DFF] text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-[#3C4CFF]/20 text-base md:text-lg"
                    >
                        {button.label}
                    </button>
                    ) : (
                    <Link
                        href={button.url}
                        className="inline-flex items-center gap-3 bg-[#3C4CFF] hover:bg-[#4D5DFF] text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-[#3C4CFF]/20 text-base md:text-lg"
                    >
                        {button.label}
                    </Link>
                    )}
              </motion.div>
            )}
          </div>

          {/* Conditional Anchor Links */}
          {showAnchorLinks && (
            <div className="absolute bottom-8 left-0 hidden lg:flex flex-wrap gap-12 justify-start text-white text-base font-medium custom-links px-4">
              {pathname === "/careers" ? (
                <>
                  <a href="#perks" onClick={(e) => handleScroll(e, "perks")}>Perks</a>
                  <a href="#open-positions" onClick={(e) => handleScroll(e, "open-positions")}>Open positions</a>
                  <a href="#life-at-addact" onClick={(e) => handleScroll(e, "life-at-addact")}>Life at Addact</a>
                </>
              ) : pathname === "/about-us" ? (
                <>
                  <a href="#overview" onClick={(e) => handleScroll(e, "overview")}>Overview</a>
                  <a href="#vision-mission" onClick={(e) => handleScroll(e, "vision-mission")}>Vision & Mission</a>
                  <a href="#who-we-are" onClick={(e) => handleScroll(e, "who-we-are")}>Who are we</a>
                </>
              ) : pathname === "/contact-us" ? (
                <>
                  <a href="#weekday-component" onClick={(e) => handleScroll(e, "weekday-component")}>Availability</a>
                  <a href="#maps-component" onClick={(e) => handleScroll(e, "maps-component")}>Our offices</a>
                  <a href="#contact-page-form" onClick={(e) => handleScroll(e, "contact-page-form")}>Get in touch</a>
                </>
              ) : null}

              <style jsx>{`
                .custom-links a {
                  position: relative;
                  padding-bottom: 6px;
                  transition: color 0.3s ease;
                }
                .custom-links a:hover {
                    color: #3C4CFF;
                }
                .custom-links a::after {
                  content: "";
                  position: absolute;
                  bottom: -13px;
                  left: 0;
                  width: 100%;
                  height: 4px;
                  background: #3c4cff;
                  border-radius: 4px 4px 0 0;
                  z-index: 3;
                  opacity: 0;
                  transition: all 0.3s ease;
                  transform: scaleX(0);
                }
                .custom-links a:hover::after {
                  opacity: 1;
                  transform: scaleX(1);
                }
              `}</style>
            </div>
          )}
        </div>
      </section>
    );
};

export default HeroBanner;
