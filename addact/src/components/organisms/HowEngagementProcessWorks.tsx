"use client";

import Link from "next/link";
import RichText from "@/components/atom/richText";
import {
  openContactDrawer,
  shouldOpenContactDrawer,
} from "@/lib/contactDrawer";

type Heading = {
  h1?: string;
  h2?: string;
  h3?: string;
  h4?: string;
  h5?: string;
  h6?: string;
};

type ProcessDataItem = {
  id?: string | number;
  Title?: string | null;
  Description?: string | null;
  Link?: unknown;
};

type ProcessInput = {
  Title?: Heading[];
  ProcessData?: ProcessDataItem[];
  link?: {
    href?: string | null;
    label?: string | null;
    target?: string | null;
    isExternal?: boolean;
  } | null;
};

interface HowEngagementProcessWorksProps {
  data?: ProcessInput;
}

const HowEngagementProcessWorks = ({
  data,
}: HowEngagementProcessWorksProps) => {
  const href = data?.link?.href || "";
  const ctaLabel = data?.link?.label || "";
  const target = data?.link?.isExternal ? "_blank" : "_self";
  const useContactDrawer =
    !data?.link?.isExternal && shouldOpenContactDrawer(href);

  const handleBannerCtaClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!useContactDrawer) {
      return;
    }

    event.preventDefault();
    openContactDrawer();
  };

  // Extract title from Title array
  const titleText =
    data?.Title?.[0] &&
    ("h1" in data.Title[0]
      ? data.Title[0].h1
      : "h2" in data.Title[0]
        ? data.Title[0].h2
        : "h3" in data.Title[0]
          ? data.Title[0].h3
          : "h4" in data.Title[0]
            ? data.Title[0].h5
            : "h5" in data.Title[0]
              ? data.Title[0].h5
              : "h6" in data.Title[0]
                ? data.Title[0].h6
                : "How our engagement process works");

  const title = titleText || "How our engagement process works";

  // Map ProcessData to cards format
  const resolvedCards =
    data?.ProcessData?.map((item, index) => ({
      id: item?.id || `${index + 1}`,
      step: String(index + 1).padStart(2, "0"),
      title: item?.Title || "",
      description: item?.Description || "",
    })) ?? [];

  // Don't render if no cards
  if (!resolvedCards.length) {
    return null;
  }

  return (
    <section className="bg-[#0F0F0F] py-[72px] md:py-[88px] xl:py-[110px]">
      <div className="container-main">
        <div className="flex justify-between flex-wrap items-center mb-10 md:mb-0">
          <h2 className="mb-10 max-w-[660px] !text-[34px] !font-semibold !leading-[1.22] text-white md:mb-14 md:!text-[48px] lg:!text-[56px]">
            {title}
          </h2>
          {ctaLabel &&
            (useContactDrawer ? (
              <button
                onClick={handleBannerCtaClick}
                className="px-4 py-2.5 sm:px-5 sm:py-3 md:py-4 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] inline-flex justify-center items-center gap-2 sm:gap-3 md:gap-4 xl:gap-5 overflow-hidden bg-white hover:bg-[#3C4CFF] transition-colors flex-shrink-0 group cursor-pointer"
              >
                <span className="text-[#0F0F0F] text-sm sm:text-base md:text-lg font-semibold font-montserrat leading-5 sm:leading-6 md:leading-7 whitespace-nowrap group-hover:text-white">
                  {ctaLabel}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 sm:w-5 sm:h-5 stroke-[#0F0F0F] group-hover:stroke-white transition-colors"
                >
                  <path
                    d="M4.16699 10H15.8337M15.8337 10L10.0003 4.16669M15.8337 10L10.0003 15.8334"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : (
              <Link
                href={href || "#"}
                target={target}
                rel={target === "_blank" ? "noopener noreferrer" : undefined}
                className="px-4 py-2.5 sm:px-5 sm:py-3 md:py-4 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] inline-flex justify-center items-center gap-2 sm:gap-3 md:gap-4 xl:gap-5 overflow-hidden bg-white hover:bg-[#3C4CFF] transition-colors flex-shrink-0 group"
              >
                <span className="text-[#0F0F0F] text-sm sm:text-base md:text-lg font-semibold font-montserrat leading-5 sm:leading-6 md:leading-7 whitespace-nowrap group-hover:text-white">
                  {ctaLabel}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 sm:w-5 sm:h-5 stroke-[#0F0F0F] group-hover:stroke-white transition-colors"
                >
                  <path
                    d="M4.16699 10H15.8337M15.8337 10L10.0003 4.16669M15.8337 10L10.0003 15.8334"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-4 lg:justify-items-stretch lg:gap-5">
          {resolvedCards.map((card) => (
            <article
              key={card.id}
              className={[
                "group relative w-full max-w-[375px] overflow-hidden rounded-[8px] border border-[#222429] px-5 pb-5 pt-4 transition-all duration-300",
                "bg-[#07080B] hover:border-[#4A57FF] hover:bg-[linear-gradient(135deg,_#4A57FF_0%,_#3C4CFF_100%)]",
              ].join(" ")}
            >
              <span className="pointer-events-none absolute right-4 top-2 !text-[54px] !font-semibold !leading-none text-[#23262D] transition-colors duration-300 group-hover:text-[#6E79FF]">
                {card.step}
              </span>

              <div className="relative z-[1] mt-16">
                <h3 className="mb-3 min-h-[55px] lg:min-h-[64px] !text-[25px] xl:!text-[30px]  !font-semibold !leading-[1.35] text-[#E8EAEE] transition-colors duration-300 group-hover:text-white">
                  {card.title}
                </h3>
                <div className="text-[#A7ACB4] transition-colors duration-300 group-hover:text-[#EEF1FF] [&_p]:text-[18px]! [&_p]:xl:!text-[22px] [&_p]:lg:!leading-[1.8]">
                  <RichText html={card.description} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowEngagementProcessWorks;
