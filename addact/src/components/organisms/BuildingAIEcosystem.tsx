"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type FocusEvent, type MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import type { AIEcoSystem } from "@/graphql/queries/getHomePage";
import {
  openContactDrawer,
  shouldOpenContactDrawer,
} from "@/lib/contactDrawer";

interface BuildingAIEcosystemProps {
  data: AIEcoSystem;
}

const BuildingAIEcosystem = ({ data }: BuildingAIEcosystemProps) => {
  const aiData = data?.AIEcoSystem;
  const consultationHref = "/contact-us";
  const sectionRef = useRef<HTMLElement | null>(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [activeTooltip, setActiveTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);
  const useContactDrawer = shouldOpenContactDrawer(consultationHref);

  const getLogoTooltip = (logo: {
    tooltip?: string | null;
    Image?: { alternativeText?: string | null };
  }) => {
    const tooltip =
      logo?.tooltip?.trim() || logo?.Image?.alternativeText?.trim();
    return tooltip || null;
  };

  const showTooltip = (text: string, element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    setActiveTooltip({
      text,
      x: rect.left + rect.width / 2,
      y: rect.top - 12,
    });
  };

  const handleTooltipMouseEnter = (
    event: MouseEvent<HTMLDivElement>,
    text: string,
  ) => {
    showTooltip(text, event.currentTarget);
  };

  const handleTooltipMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    setActiveTooltip((current) =>
      current
        ? {
            ...current,
            x: event.clientX,
            y: event.clientY - 18,
          }
        : current,
    );
  };

  const handleTooltipFocus = (
    event: FocusEvent<HTMLDivElement>,
    text: string,
  ) => {
    showTooltip(text, event.currentTarget);
  };

  const hideTooltip = () => {
    setActiveTooltip(null);
  };

  const handleConsultationClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!useContactDrawer) {
      return;
    }

    event.preventDefault();
    openContactDrawer();
  };

  if (!aiData) {
    return null;
  }
  return (
    <section
      ref={sectionRef}
      className="overflow-x-hidden bg-[#0F0F0F] py-12 md:py-16 lg:py-20 2xl:py-[80px]"
    >
      <div className="container-main">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 2xl:gap-6 items-center">
          {/* Left side — Image (hidden on mobile, shown on lg+) */}
          {(aiData?.firstImage?.url || aiData?.secondImage?.url) && (
            <div className="hidden w-full lg:ml-[calc(50%-50vw)] lg:block lg:min-w-0 lg:flex-1">
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[10px] bg-[#0F0F0F]">
                {/* First Image - Base Layer */}
                {aiData?.firstImage?.url && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ translateY: "-100%" }}
                    whileInView={{ translateY: "0%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Image
                      src={aiData.firstImage.url}
                      alt={
                        aiData.firstImage.alternativeText ||
                        "AI Ecosystem First"
                      }
                      fill
                      className="object-contain"
                      sizes="(min-width: 1024px) 45vw, 50vw"
                    />
                  </motion.div>
                )}

                {/* Second Image - Overlay Layer with delay */}
                {aiData?.secondImage?.url && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ translateY: "100%" }}
                    animate={{ translateY: isSectionInView ? "0%" : "100%" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  >
                    <Image
                      src={aiData.secondImage.url}
                      alt={
                        aiData.secondImage.alternativeText ||
                        "AI Ecosystem Second"
                      }
                      fill
                      className="object-contain"
                      sizes="(min-width: 1024px) 45vw, 50vw"
                    />
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* Right side — Content */}
          <div className="w-full lg:min-w-0 lg:flex-1">
            {/* Heading */}
            {aiData.title && (
              <h2 className="text-[25px]! md:text-[44px] lg:text-[52px]! 2xl:text-[60px]! !font-semibold text-white leading-[1.2] md:leading-[1.3] 2xl:leading-[85px] mb-6 md:mb-8 lg:mb-10 2xl:mb-[50px]">
                {aiData.title.split(" ").slice(0, 2).join(" ")}
                <br className="block" />
                {aiData.title.split(" ").slice(2).join(" ")}
              </h2>
            )}

            {/* Mobile image between heading and description */}
            {(aiData?.firstImage?.url || aiData?.secondImage?.url) && (
              <div className="relative left-1/2 mb-8 block w-screen -translate-x-1/2 overflow-hidden lg:hidden">
                <div className="relative w-full aspect-[3/4] md:aspect-[4/5] bg-[#0F0F0F]">
                  {/* First Image - Base Layer */}
                  {aiData?.firstImage?.url && (
                    <motion.div
                      className="absolute inset-0"
                      initial={{ translateY: "-100%" }}
                      whileInView={{ translateY: "0%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <Image
                        src={aiData.firstImage.url}
                        alt={
                          aiData.firstImage.alternativeText ||
                          "AI Ecosystem First"
                        }
                        fill
                        className="object-cover object-center"
                        sizes="100vw"
                      />
                    </motion.div>
                  )}

                  {/* Second Image - Overlay Layer with delay */}
                  {aiData?.secondImage?.url && (
                    <motion.div
                      className="absolute inset-0"
                      initial={{ translateY: "100%" }}
                      animate={{ translateY: isSectionInView ? "0%" : "100%" }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.2,
                      }}
                    >
                      <Image
                        src={aiData.secondImage.url}
                        alt={
                          aiData.secondImage.alternativeText ||
                          "AI Ecosystem Second"
                        }
                        fill
                        className="object-cover object-center"
                        sizes="100vw"
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            {aiData.description && (
              <p className="text-white/70 text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[24px] leading-[1.6] md:leading-[1.7] 2xl:leading-[44px] mb-10 md:mb-12 lg:mb-14 2xl:mb-[70px] max-w-[788px]">
                {aiData.description}
              </p>
            )}

            {/* On Hand Expertise — Marquee */}
            {(aiData.firstLayerlogos?.length ||
              aiData.secondLayerlogos?.length) && (
              <div className="relative mb-10 md:mb-12 lg:mb-14 2xl:mb-[60px]">
                {/* Label — positioned as legend between border lines */}
                {aiData.tagLine && (
                  <span className="inline-block text-[#0F0F0F] border border-white/20 bg-white text-[12px] md:text-[14px] font-medium px-4 md:px-5 py-2 md:py-[10px] rounded-[8px] relative z-10 translate-y-1/2 ml-4 md:ml-6">
                    {aiData.tagLine}
                  </span>
                )}

                {/* Marquee container-main-main — glass effect */}
                <div className="marquee-hover-pause border border-white/20 rounded-[10px] overflow-hidden py-8 md:py-10 lg:py-12 2xl:py-[70px] group bg-white/[0.03] backdrop-blur-sm">
                  {/* Row 1 — Left to Right */}
                  {aiData.firstLayerlogos &&
                    aiData.firstLayerlogos.length > 0 && (
                      <div className="flex overflow-hidden mb-6 md:mb-8 lg:mb-10 2xl:mb-[69px] marquee-mask">
                        <div className="flex gap-[100px] items-center animate-marquee-ltr group-hover:[animation-play-state:paused] hover:[animation-play-state:paused]">
                          {[
                            ...aiData.firstLayerlogos,
                            ...aiData.firstLayerlogos,
                            ...aiData.firstLayerlogos,
                            ...aiData.firstLayerlogos,
                          ].map((logo, index) => {
                            if (!logo?.Image?.url) {
                              return null;
                            }

                            const tooltipText = getLogoTooltip(logo);

                            return (
                              <div
                                key={`row1-${index}`}
                                className="group/logo relative flex-shrink-0 w-[60px] h-[60px] md:w-[70px] md:h-[70px] lg:w-[75px] lg:h-[75px] 2xl:w-[80px] 2xl:h-[80px] flex items-center justify-center outline-none"
                                tabIndex={tooltipText ? 0 : -1}
                                aria-label={
                                  tooltipText ||
                                  logo.Image.alternativeText ||
                                  "AI Logo"
                                }
                                onMouseEnter={
                                  tooltipText
                                    ? (event) =>
                                        handleTooltipMouseEnter(
                                          event,
                                          tooltipText,
                                        )
                                    : undefined
                                }
                                onMouseMove={
                                  tooltipText
                                    ? handleTooltipMouseMove
                                    : undefined
                                }
                                onMouseLeave={
                                  tooltipText ? hideTooltip : undefined
                                }
                                onFocus={
                                  tooltipText
                                    ? (event) =>
                                        handleTooltipFocus(event, tooltipText)
                                    : undefined
                                }
                                onBlur={tooltipText ? hideTooltip : undefined}
                              >
                                <Image
                                  src={logo.Image.url}
                                  alt={logo.Image.alternativeText || "AI Logo"}
                                  width={80}
                                  height={80}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  {/* Row 2 — Right to Left */}
                  {aiData.secondLayerlogos &&
                    aiData.secondLayerlogos.length > 0 && (
                      <div className="flex overflow-hidden marquee-mask">
                        <div className="flex gap-[100px] items-center animate-marquee-rtl group-hover:[animation-play-state:paused] hover:[animation-play-state:paused]">
                          {[
                            ...aiData.secondLayerlogos,
                            ...aiData.secondLayerlogos,
                            ...aiData.secondLayerlogos,
                            ...aiData.secondLayerlogos,
                          ].map((logo, index) => {
                            if (!logo?.Image?.url) {
                              return null;
                            }

                            const tooltipText = getLogoTooltip(logo);

                            return (
                              <div
                                key={`row2-${index}`}
                                className="group/logo relative flex-shrink-0 w-[60px] h-[60px] md:w-[70px] md:h-[70px] lg:w-[75px] lg:h-[75px] 2xl:w-[80px] 2xl:h-[80px] flex items-center justify-center outline-none"
                                tabIndex={tooltipText ? 0 : -1}
                                aria-label={
                                  tooltipText ||
                                  logo.Image.alternativeText ||
                                  "AI Logo"
                                }
                                onMouseEnter={
                                  tooltipText
                                    ? (event) =>
                                        handleTooltipMouseEnter(
                                          event,
                                          tooltipText,
                                        )
                                    : undefined
                                }
                                onMouseMove={
                                  tooltipText
                                    ? handleTooltipMouseMove
                                    : undefined
                                }
                                onMouseLeave={
                                  tooltipText ? hideTooltip : undefined
                                }
                                onFocus={
                                  tooltipText
                                    ? (event) =>
                                        handleTooltipFocus(event, tooltipText)
                                    : undefined
                                }
                                onBlur={tooltipText ? hideTooltip : undefined}
                              >
                                <Image
                                  src={logo.Image.url}
                                  alt={logo.Image.alternativeText || "AI Logo"}
                                  width={80}
                                  height={80}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            )}

            {/* CTA Button */}
            <Link
              href={consultationHref}
              onClick={handleConsultationClick}
              className="inline-flex items-center gap-3 md:gap-4 lg:gap-5 bg-white text-[#0F0F0F] border border-white text-[14px] md:text-[16px] lg:text-[18px] font-semibold px-5 py-3 md:px-6 md:py-3.5 lg:px-8 lg:py-4 rounded-[8px] md:rounded-[10px] transition-all duration-300 hover:bg-[#3C4CFF] hover:border-[#3C4CFF] hover:text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
            >
              Book Your Free AI Consultation
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 md:w-6 md:h-6 lg:w-[30px] lg:h-[30px]"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {activeTooltip && (
        <div
          className="pointer-events-none fixed z-[9999] w-max max-w-[220px] -translate-x-1/2 -translate-y-full rounded-[6px] border border-white/20 bg-white px-2.5 py-1.5 text-center text-[11px] md:text-[12px] font-medium leading-tight text-[#0F0F0F] shadow-[0_8px_24px_rgba(15,15,15,0.2)]"
          style={{ left: activeTooltip.x, top: activeTooltip.y }}
        >
          {activeTooltip.text}
        </div>
      )}

      {/* Marquee animations */}
      <style jsx global>{`
        @keyframes marquee-ltr {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        @keyframes marquee-rtl {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee-ltr {
          animation: marquee-ltr 55s linear infinite;
        }

        .animate-marquee-rtl {
          animation: marquee-rtl 65s linear infinite;
        }

        .marquee-hover-pause:hover .animate-marquee-ltr,
        .marquee-hover-pause:hover .animate-marquee-rtl,
        .marquee-hover-pause:focus-within .animate-marquee-ltr,
        .marquee-hover-pause:focus-within .animate-marquee-rtl {
          animation-play-state: paused;
        }

        .marquee-mask {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        @media (max-width: 768px) {
          .animate-marquee-ltr {
            animation-duration: 45s;
          }
          .animate-marquee-rtl {
            animation-duration: 55s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-ltr,
          .animate-marquee-rtl {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BuildingAIEcosystem;
