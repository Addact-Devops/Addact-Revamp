"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import i1 from "../../../public/hero-banner-bg.png";

// Static data — will be replaced with GraphQL data later
const bannerData = {
  staticTitle: "BUILDING TODAY'S",
  rotatingTexts: [
    "DIGITAL PRODUCTS",
    "AI SOFTWARES",
    "WORLD CLASS CMS",
    "SMART SOLUTIONS",
  ],
  description:
    "Unlock new potential and upgrade existing business capabilities with AI services that streamline operations,",
  buttonLabel: "Start a Project",
  buttonLink: "/contact-us",
  backgroundImage: i1,
};

const HomeBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animState, setAnimState] = useState<"visible" | "exit" | "enter">(
    "visible",
  );

  const rotateText = useCallback(() => {
    setAnimState("exit");
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerData.rotatingTexts.length);
      setAnimState("enter");
      setTimeout(() => {
        setAnimState("visible");
      }, 50);
    }, 400);
  }, []);

  useEffect(() => {
    const interval = setInterval(rotateText, 2000);
    return () => clearInterval(interval);
  }, [rotateText]);

  return (
    <section className="relative w-full min-h-[500px] md:min-h-[600px] lg:h-screen flex items-center overflow-hidden mt-[60px] lg:mt-[100px]">
      {/* Background Image */}
      <Image
        src={bannerData.backgroundImage}
        alt="Hero Banner"
        fill
        className="object-cover object-center z-0"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* Content */}
      <div className="relative z-10 w-full container-main">
        <div className="max-w-[900px] 2xl:max-w-[1100px]">
          {/* Title */}
          <h1 className="uppercase text-white font-bold mb-6 md:mb-8 2xl:mb-10">
            {/* Static line */}
            <span className="block font-bold text-[#FFFFFFB2] text-[34px] md:text-[55px] lg:text-[70px] xl:text-[85px] 2xl:text-[100px] leading-[1.1]">
              {bannerData.staticTitle}
            </span>

            {/* Rotating line with underline */}
            <span className="block relative overflow-hidden h-[45px] md:h-[70px] lg:h-[90px] xl:h-[105px] 2xl:h-[125px] mt-1 md:mt-2">
              <span
                className={`block text-[34px] md:text-[55px] lg:text-[70px] xl:text-[85px] 2xl:text-[100px] leading-[1.1] roller-text ${
                  animState === "exit"
                    ? "roller-exit"
                    : animState === "enter"
                      ? "roller-enter"
                      : "roller-visible"
                }`}
              >
                <span className="relative font-bold text-white inline-block pb-2 md:pb-3">
                  {bannerData.rotatingTexts[currentIndex]}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] md:h-[3px] bg-white" />
                </span>
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-white/90 !text-[18px] md:!text-[20px] lg:!text-[24px] leading-[1.7] max-w-[500px] 2xl:max-w-[550px] mb-8 md:mb-10 2xl:mb-12">
            {bannerData.description}
          </p>

          {/* CTA Button */}
          <Link
            href={bannerData.buttonLink}
            className="inline-flex items-center gap-3 bg-[#3C4CFF] hover:bg-[#2d3be6] text-white text-[18px] md:text-[20px] font-semibold px-6 py-3 md:px-8 md:py-4 rounded-lg transition-all duration-300"
          >
            {bannerData.buttonLabel}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        .roller-text {
          transition:
            transform 400ms ease-in-out,
            opacity 400ms ease-in-out;
        }
        .roller-visible {
          transform: translateY(0);
          opacity: 1;
        }
        .roller-exit {
          transform: translateY(-100%);
          opacity: 0;
        }
        .roller-enter {
          transform: translateY(100%);
          opacity: 0;
          transition: none;
        }
      `}</style>
    </section>
  );
};

export default HomeBanner;
