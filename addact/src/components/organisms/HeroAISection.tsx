"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Orb from "../Orb";
import RichText from "../atom/richText";
import { openContactDrawer, shouldOpenContactDrawer } from "@/lib/contactDrawer";

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
  const buttonUrl = banner?.BannerLink?.href ?? "/contact-us";

  const buttonTarget = banner?.BannerLink?.isExternal ? "_blank" : "_self";
  const useContactDrawer = !banner?.BannerLink?.isExternal && shouldOpenContactDrawer(buttonUrl);

  const handleBannerCtaClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!useContactDrawer) {
      return;
    }

    event.preventDefault();
    openContactDrawer();
  };
  return (
    <section className="relative min-h-screen bg-[#0F0F0F] flex items-center justify-center overflow-hidden">
      {/* Orb Background */}
      <div className="absolute inset-0 z-0">
        <Orb hoverIntensity={1.1} backgroundColor={"#0F0F0F"} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto text-center px-6 pointer-events-none">
        <h1
          className="text-white font-bold! uppercase leading-[1.1]
          text-[34px] md:text-[54px] lg:text-[60px]! xl:text-[100px]! max-w-[1234px] mx-auto"
        >
          {banner?.BannerTitle}
        </h1>

        <div
          className="text-white mt-6 max-w-[788px] mx-auto
          [&_p]:text-[15px] [&_p]:md:text-[18px] [&_p]:xl:text-[24px]!"
        >
          <RichText html={banner?.BannerDescription || ""} />
        </div>

        {/* Button needs pointer events */}
        {useContactDrawer ? (
          <button
            type="button"
            onClick={handleBannerCtaClick}
            className="pointer-events-auto mt-8 inline-flex items-center gap-3
          bg-[#4F6EF7] hover:bg-[#3f5ce0]
          text-white px-6 py-3 rounded-lg
          text-[16px] font-medium
          transition-all duration-300"
          >
            {banner?.BannerLink?.label}
            <ArrowRight size={18} />
          </button>
        ) : (
          <Link
            href={banner?.BannerLink?.href || "#"}
            target={buttonTarget}
            rel={banner?.BannerLink?.isExternal ? "noopener noreferrer" : undefined}
            className="pointer-events-auto mt-8 inline-flex items-center gap-3
          bg-[#4F6EF7] hover:bg-[#3f5ce0]
          text-white px-6 py-3 rounded-lg
          text-[16px] font-medium
          transition-all duration-300"
          >
            {banner?.BannerLink?.label}
            <ArrowRight size={18} />
          </Link>
        )}
      </div>
    </section>
  );
}
