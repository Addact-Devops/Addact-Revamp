"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Orb from "../Orb";
import RichText from "../atom/richText";

interface HeroAISectionProps {
  data?: {
    BannerTitle?: string | null;
    BannerDescription?: string | null;
    BannerLink?: {
      href?: string | null;
      label?: string | null;
      target?: string | null;
      isExternal?: boolean | null;
    } | null;
  }[];
}

export default function HeroAISection({ data }: HeroAISectionProps) {
  const banner = data?.[0];

  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Orb Background */}
      <div className="absolute inset-0 z-0">
        <Orb hoverIntensity={1.1} backgroundColor={"#0F0F0F"} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto text-center px-6 pointer-events-none">
        <h1
          className="text-white font-bold! uppercase leading-[1.1]
          text-[34px] md:text-[54px] lg:text-[60px]! xl:text-[100px]!"
        >
          {banner?.BannerTitle}
        </h1>

        <div
          className="text-white/70 mt-6 max-w-[788px] mx-auto
          text-[15px] md:text-[18px] xl:text-[24px]!"
        >
          <RichText html={banner?.BannerDescription || ""} />
        </div>

        {/* Button needs pointer events */}
        <Link
          href={banner?.BannerLink?.href || "#"}
          target={
            banner?.BannerLink?.isExternal
              ? "_blank"
              : (banner?.BannerLink?.target ?? "_self")
          }
          rel={
            banner?.BannerLink?.isExternal ? "noopener noreferrer" : undefined
          }
          className="pointer-events-auto mt-8 inline-flex items-center gap-3
          bg-[#4F6EF7] hover:bg-[#3f5ce0]
          text-white px-6 py-3 rounded-lg
          text-[16px] font-medium
          transition-all duration-300"
        >
          {banner?.BannerLink?.label}
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
