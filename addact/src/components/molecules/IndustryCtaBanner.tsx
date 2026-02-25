"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CTA } from "@/graphql/queries/getHomePage";
import { RightArrowIcon } from "../atom/icons";
import type { CSSProperties } from "react";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const NeuralParticles = dynamic(() => import("../atom/NeuralParticles"), { ssr: false });

interface IProps {
  data: CTA;
}

/** Allow CSS custom properties (e.g. --cta-bg-mobile) on style objects */
type CSSVars = CSSProperties & Record<`--${string}`, string>;

const IndustryCtaBanner = ({ data }: IProps) => {
  const pathname = usePathname();
  const isIndustriesPage = pathname?.startsWith("/industries/");

  const desktopUrl = data?.CTAImage?.[0]?.Image?.url ?? "";
  const tabletUrl =
    "https://d3l7d9gtq0bnch.cloudfront.net/Tablet_CTA_eaa3f98736.png";
  const staticMobileUrl =
    "https://d3l7d9gtq0bnch.cloudfront.net/cta_bg_mobile_dc22d2edd3.png";

  // On industries/* use static image for mobile, else use desktop image for both
  const mobileUrl = isIndustriesPage ? staticMobileUrl : desktopUrl;

  const cta = data.CTALink[0];
  const href = cta.href;
  const label = cta.label;
  const target = cta?.isExternal ? "_blank" : "_self";

  const bgVars: CSSVars = {
    "--cta-bg-mobile": `url(${mobileUrl})`,
    "--cta-bg-tablet": `url(${tabletUrl})`,
    "--cta-bg-desktop": `url(${desktopUrl})`,
  };

  return (
    <section className="relative overflow-hidden">
      <div
        className="cta-bg text-white w-full shadow-md bg-no-repeat bg-cover bg-center md:bg-bottom-right"
        // pass both URLs as CSS variables; CSS below chooses per breakpoint
        style={bgVars}
      >
        <div className="container">
          <div className="flex flex-col justify-center min-h-[350px] md:min-h-[400px] 2xl:min-h-[550px] py-16 md:py-20 lg:py-24">
            <motion.h2 
                className="text-[28px]! md:text-[40px]! 2xl:text-[60px]! w-full max-w-[850px] leading-tight! md:leading-[1.2]! 2xl:leading-[1.1]! mb-6 font-bold"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              {data.Title[0].h2}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative inline-block"
            >
                {/* Ripple ring 1 */}
                <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{ background: "radial-gradient(circle, rgba(60,76,255,0.4) 0%, transparent 70%)" }}
                />
                
                <Link href={href} target={target}>
                <button className="relative bg-[#3C4CFF] text-white text-[16px] lg:text-lg px-8 py-3 lg:px-10 lg:py-4 rounded-lg hover:bg-[#3440CB] flex items-center gap-5 font-bold cursor-pointer border-none transition-all duration-300 shadow-xl shadow-brand-blue/20">
                    {label}
                    <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <RightArrowIcon />
                    </motion.span>
                </button>
                </Link>
            </motion.div>
          </div>
        </div>

        {/* Scanning beam effect */}
        <motion.div
            className="absolute left-0 right-0 h-[1.5px] z-10 pointer-events-none opacity-40"
            style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(60,76,255,1) 50%, transparent 100%)",
            }}
            animate={{ y: ["0%", "100%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Neural particle overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1, opacity: 0.3 }}>
        <NeuralParticles count={35} color="60, 76, 255" lineColor="60, 76, 255" connectDistance={120} />
      </div>

      {/* Scoped styles: choose the BG per breakpoint using the variables above */}
      <style jsx>{`
        /* Mobile (default) */
        .cta-bg {
          background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), var(--cta-bg-mobile) !important;
        }

        /* Tablet: from 768px up to 1024px */
        @media (min-width: 768px) and (max-width: 1024px) {
          .cta-bg {
            background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), var(--cta-bg-tablet) !important;
          }
        }

        /* Desktop: 1025px and above */
        @media (min-width: 1025px) {
          .cta-bg {
            background-image: linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%), var(--cta-bg-desktop) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default IndustryCtaBanner;
