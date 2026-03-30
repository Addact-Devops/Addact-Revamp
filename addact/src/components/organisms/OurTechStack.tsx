"use client";

import { useState } from "react";
import Image from "next/image";
import { TechStack } from "@/graphql/queries/getHireExperts";

interface OurTechStackProps {
  data?: TechStack;
}

const createIconDataUrl = () =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
        <rect width="80" height="80" rx="20" fill="white"/>
        <circle cx="40" cy="32" r="14" fill="#161616" fill-opacity="0.08"/>
        <path d="M40 17c1 4-1 7-4 9 4 1 7-1 8-5 1-3 0-5-1-7-1 1-2 2-3 3Z" fill="#161616"/>
        <path d="M47 46c-2 3-4 5-7 5-3 0-4-2-8-2-4 0-5 2-8 2-3 0-5-3-7-6-4-7-4-16 0-19 2-2 4-3 7-3 3 0 5 2 8 2 2 0 4-2 7-2 2 0 5 1 7 4-6 4-5 13 1 16Z" fill="#161616"/>
      </svg>
    `)}`;

const OurTechStack = ({ data }: OurTechStackProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  if (!data) return null;

  const tabs = data?.tab ?? [];
  const activeTab = tabs[activeTabIndex];

  if (!activeTab || tabs.length === 0) {
    return null;
  }

  const title = data?.title ?? "Our Tech Stack";
  const description =
    data?.description ??
    "Our operations are backed by a robust and versatile tech stack, ensuring seamless functionality and innovation.";

  return (
    <section className="bg-[#F5F5F5] py-[48px] md:py-[72px] xl:py-[110px]">
      <div className="container-main">
        <div className="max-w-[720px]">
          <h2 className="!text-[32px] !font-semibold !leading-[1.2] text-[#111111] md:!text-[44px] xl:!text-[58px]">
            {title}
          </h2>
          <p className="mt-5 max-w-[620px] !text-[18px] !leading-[1.7] text-[#4B4B4B] md:mt-7 md:!text-[20px]">
            {description}
          </p>
        </div>

        <div className="mt-10 border-b border-[#D7D7D7] md:mt-14">
          <div className="flex gap-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:justify-center md:gap-8 xl:gap-10">
            {tabs.map((tab, index) => {
              const isActive = index === activeTabIndex;

              return (
                <button
                  key={index}
                  type="button"
                  className={[
                    "relative shrink-0 border-b-2 px-1 pb-4 !text-[20px] !font-medium transition-colors duration-200 md:!text-[22px]",
                    isActive
                      ? "border-[#3C4CFF] text-[#111111]"
                      : "border-transparent text-[#7E7E7E]",
                  ].join(" ")}
                  onClick={() => setActiveTabIndex(index)}
                >
                  {tab?.category?.categoryTitle}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-8 flex w-full flex-wrap justify-center gap-4 md:mt-10 md:gap-5">
          {activeTab?.tabContent?.map((item, index) => (
            <article
              key={index}
              className="flex h-[164px] w-[156px] flex-col items-center justify-center rounded-[10px] border border-[#D7D7D7] bg-white px-4 py-5 sm:w-[170px] lg:w-[182px] xl:w-[194px]"
            >
              <Image
                src={item?.logo?.url ?? createIconDataUrl()}
                alt={item?.title ?? "Tech logo"}
                width={68}
                height={68}
                unoptimized
                className="h-[68px] w-[68px] object-contain"
              />
              <p className="mt-4 text-center !text-[18px] !font-medium text-[#161616] md:!text-[20px]">
                {item?.title}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTechStack;
