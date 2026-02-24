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

const CtaBanner = ({ data }: IProps) => {
  const pathname = usePathname();
  const isIndustriesPage = pathname?.startsWith("/industries/");

  const desktopUrl = data?.CTAImage?.[0]?.Image?.url ?? "";
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
    "--cta-bg-desktop": `url(${desktopUrl})`,
  };

  return (
    <section className="relative overflow-hidden">
      <div
        className="cta-bg text-white w-full h-full shadow-md bg-no-repeat bg-cover bg-center"
        // pass both URLs as CSS variables; CSS below chooses per breakpoint
        style={bgVars}
      >
          <div className="container">
            <div className="pt-[40px] pb-[150px] md:py-[90px] banner-content-space text-white">
              <motion.h2
                className="!text-[28px] md:!text-[40px] 2xl:!text-[60px] md:w-[550px] lg:!w-[800px] 2xl:leading-[85px] text-white"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                {data.Title[0].h2}
              </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="relative inline-block mt-[24px] md:mt-12"
            >
              {/* Ripple ring 1 */}
              <motion.div
                className="absolute inset-0 rounded pointer-events-none"
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "radial-gradient(circle, rgba(60,76,255,0.4) 0%, transparent 70%)" }}
              />
              {/* Ripple ring 2 — offset */}
              <motion.div
                className="absolute inset-0 rounded pointer-events-none"
                animate={{ scale: [1, 2.2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)" }}
              />
              <Link href={href} target={target}>
                <button className="relative bg-[#3C4CFF] text-white text-[16px] lg:text-lg px-4 py-2 lg:px-5 lg:py-4 rounded hover:bg-blue-700 flex items-center gap-5 font-semibold cursor-pointer border-none">
                  {label}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <RightArrowIcon />
                  </motion.span>
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Neural particle overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1, opacity: 0.4 }}>
        <NeuralParticles count={35} color="60, 76, 255" lineColor="60, 76, 255" connectDistance={120} />
      </div>

      {/* Scoped styles: choose the BG per breakpoint using the variables above */}
      <style jsx>{`
        /* Mobile first: use --cta-bg-mobile */
        .cta-bg {
          background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), var(--cta-bg-mobile) !important;
        }
        @media (min-width: 768px) {
          .cta-bg {
            background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 100%), var(--cta-bg-desktop) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CtaBanner;
