import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedBlindsBackground from "./AnimatedBlindsBackground";
import RichText from "../atom/richText";
import { openContactDrawer, shouldOpenContactDrawer } from "@/lib/contactDrawer";

type UIUXBannerData = {
  BannerTitle?: string;
  BannerDescription?: string;
  BannerLink?: {
    label?: string;
    href?: string;
    isExternal?: boolean;
  } | null;
  chipsText?: {
    Title: string;
  }[];
};

const HERO_BLIND_GRADIENT = ["#3c4cff", "#3c4cff"];

const UIUXHeroBanner = ({ data }: { data: UIUXBannerData | null }) => {
  const title = data?.BannerTitle ?? "";
  const description = data?.BannerDescription?.replace(/^<p>|<\/p>$/g, "") ?? "";
  const buttonLabel = data?.BannerLink?.label ?? "Start a Project";
  const buttonUrl = data?.BannerLink?.href ?? "/contact-us";
  const chips = data?.chipsText ?? [];

  const buttonTarget = data?.BannerLink?.isExternal ? "_blank" : "_self";
  const useContactDrawer = !data?.BannerLink?.isExternal && shouldOpenContactDrawer(buttonUrl);

  const handleBannerCtaClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!useContactDrawer) {
      return;
    }

    event.preventDefault();
    openContactDrawer();
  };
  const currentTitle = title || "";

  const parts = currentTitle
    .split(".")
    .map((part) => part.trim())
    .filter(Boolean);

  const firstLine = parts[0] ? parts[0] + "." : "";
  const secondLine = parts[1] ? parts[1] + "." : "";
  return (
    <section className="relative isolate min-h-[720px] overflow-hidden border-b border-white/30 bg-[#050505] text-white lg:min-h-[920px]">
      <AnimatedBlindsBackground
        className="absolute inset-0 z-30"
        gradientColors={HERO_BLIND_GRADIENT}
        angle={25}
        blindCount={16}
        blindMinWidth={75}
        mouseDampening={0.2}
        spotlightRadius={0.4}
        noise={0.05}
      />

      <div className="relative z-20 mx-auto flex min-h-[720px] w-full  flex-col items-center justify-center px-4 pb-18 pt-26 text-center sm:px-8 lg:min-h-[920px] lg:px-10 lg:pb-20 lg:pt-30">
        <div className="pointer-events-none flex flex-col items-center">
          <h1 className="pointer-events-none max-w-[1506px] whitespace-pre-line font-montserrat font-bold uppercase leading-[1.08] tracking-tight text-white ">
            {firstLine && (
              <span className="block font-bold text-[44px]  sm:text-[58px] md:text-[72px] xl:text-[100px]!">
                {firstLine}
              </span>
            )}

            {secondLine && (
              <span className="block font-bold text-[44px]  sm:text-[58px] md:text-[72px] xl:text-[100px]!">
                <span className="relative inline-block">{secondLine}</span>
              </span>
            )}
          </h1>

          <div className="pointer-events-none mt-8 max-w-[790px] font-montserrat text-[19px] text-center font-normal leading-[1.7] text-white/92 [&_p]:lg:text-[24px]! [&_p]:text-center!">
            <RichText html={description} />
          </div>
        </div>

        <div className="mt-10 pointer-events-auto">
          {useContactDrawer ? (
            <button
              type="button"
              onClick={handleBannerCtaClick}
              className="inline-flex items-center justify-center gap-5 rounded-[8px] bg-white px-7 py-4 font-montserrat text-[18px] font-semibold leading-none text-[#0f0f0f] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition hover:-translate-y-0.5 hover:bg-[#f2f4f7]"
            >
              <span>{buttonLabel}</span>
              <ArrowRight className="h-[22px] w-[22px]" />
            </button>
          ) : (
            <Link
              href={buttonUrl}
              target={buttonTarget}
              className="inline-flex items-center justify-center gap-5 rounded-[8px] bg-white px-7 py-4 font-montserrat text-[18px] font-semibold leading-none text-[#0f0f0f] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition hover:-translate-y-0.5 hover:bg-[#f2f4f7]"
            >
              <span>{buttonLabel}</span>
              <ArrowRight className="h-[22px] w-[22px]" />
            </Link>
          )}
        </div>

        {chips.length > 0 && (
          <div className="mt-16 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pointer-events-auto">
            {chips.map((chip, index) => (
              <div
                key={`${chip.Title}-${index}`}
                className="rounded-[10px] border border-white px-5 py-3 font-montserrat text-[20px] font-medium leading-none text-white"
              >
                {chip.Title}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UIUXHeroBanner;
