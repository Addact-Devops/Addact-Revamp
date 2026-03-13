"use client";

import Link from "next/link";
import { OurProcess } from "@/graphql/queries/getDevelopmentDesign";
import RichText from "@/components/atom/richText";

interface HowEngagementProcessWorksProps {
  data?: OurProcess;
}

const HowEngagementProcessWorks = ({
  data,
}: HowEngagementProcessWorksProps) => {
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
        <div className="flex justify-between items-center">
          <h2 className="mb-10 max-w-[660px] !text-[34px] !font-semibold !leading-[1.22] text-white md:mb-14 md:!text-[48px] lg:!text-[56px]">
            {title}
          </h2>
          <Link
            href={"#"}
            target={"_self"}
            className="px-4 py-2.5 sm:px-5 sm:py-3 md:py-4 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] inline-flex justify-center items-center gap-2 sm:gap-3 md:gap-4 xl:gap-5 overflow-hidden bg-white hover:bg-[#3C4CFF] transition-colors flex-shrink-0 group"
          >
            <span className="text-[#0F0F0F] text-sm sm:text-base md:text-lg font-semibold font-montserrat leading-5 sm:leading-6 md:leading-7 whitespace-nowrap group-hover:text-white">
              {"Contact Us"}
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
                <h3 className="mb-3 min-h-[64px] !text-[30px] !font-semibold !leading-[1.35] text-[#E8EAEE] transition-colors duration-300 group-hover:text-white">
                  {card.title}
                </h3>
                <div className="text-[#A7ACB4] transition-colors duration-300 group-hover:text-[#EEF1FF] [&_p]:!text-[22px] [&_p]:!leading-[1.8]">
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
