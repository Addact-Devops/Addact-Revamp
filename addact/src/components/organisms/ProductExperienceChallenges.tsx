"use client";

import React, { useEffect, useRef, useState } from "react";
import type { Challenges } from "@/graphql/queries/getDevelopmentDesignSlug";
import RichText from "../atom/richText";

const layerPath =
  "M350.065 319.762C351.807 319.066 353.71 318.873 355.556 319.207L694.712 380.531C704.145 382.237 706.005 394.954 697.456 399.29L429.554 535.178C427.61 536.164 425.397 536.488 423.251 536.1L34.4898 465.806C24.6061 464.019 23.2309 450.408 32.5574 446.68L350.065 319.762Z";

const getChallengesTitle = (titleList?: Challenges["Title"]) => {
  if (!titleList?.length) {
    return "Product Experience Challenges\nCaused By Poor UX";
  }

  const first = titleList[0] as Record<string, unknown>;
  return (
    (first.h1 as string | undefined) ??
    (first.h2 as string | undefined) ??
    (first.h3 as string | undefined) ??
    (first.h4 as string | undefined) ??
    (first.h5 as string | undefined) ??
    (first.h6 as string | undefined) ??
    "Product Experience Challenges\nCaused By Poor UX"
  );
};

const ProductExperienceChallenges = ({
  data,
}: {
  data?: Challenges | null;
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const challenges = [
    {
      title: "Low Product Adoption",
      description:
        "Powerful features often go unused when users struggle to understand how they work. Clear onboarding and intuitive design help users discover value faster.",
    },
    {
      title: "High Learning Curve",
      description:
        "Complex interfaces overwhelm new users, leading to frustration and abandonment. Simplified workflows and contextual guidance reduce time to competency.",
    },
    {
      title: "Poor User Retention",
      description:
        "Users leave when they can't accomplish their goals efficiently. Streamlined experiences and responsive design keep users engaged long-term.",
    },
    {
      title: "Increased Support Costs",
      description:
        "Confusing UX generates excessive support tickets and drains resources. Intuitive design and self-service options reduce operational overhead.",
    },
  ];

  const dynamicChallenges =
    data?.ProcessData?.map((item) => ({
      title: item.Title,
      description: item.Description,
    })) ?? [];

  const challengeList =
    dynamicChallenges.length > 0 ? dynamicChallenges : challenges;
  const heading = getChallengesTitle(data?.Title);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const sectionTop = rect.top;
      const sectionHeight = Math.max(rect.height - windowHeight, 1);
      const progress = Math.max(0, Math.min(1, -sectionTop / sectionHeight));

      const newIndex = Math.min(
        challengeList.length - 1,
        Math.floor(progress * challengeList.length * 1.2),
      );
      setActiveIndex(newIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [challengeList.length]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[320vh] bg-black text-white md:min-h-[400vh]"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="mx-auto w-full container-main px-6 md:px-10">
          <h1 className="mb-10 text-left text-4xl font-semibold! leading-[1.15] tracking-[-0.02em] md:mb-16 md:text-6xl">
            {heading.split("\n")[0]}
            {heading.includes("\n") ? <br /> : null}
            {heading.split("\n")[1] ?? ""}
          </h1>
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative h-[240px] md:h-[320px]">
              <div className="relative mx-auto h-full w-full max-w-[560px]">
                {Array.from({ length: challengeList.length }, (_, i) => i).map(
                  (layerIndex) => {
                    const isPast = layerIndex < activeIndex;
                    const moveRight = layerIndex % 2 === 0;
                    // const fillOpacity =
                    //   1 - (layerIndex / challengeList.length) * 0.7;
                    const fillOpacity =
                      0.3 + (layerIndex / (challengeList.length - 1)) * 0.7;
                    const xOffset = layerIndex * 2;
                    const yOffset = layerIndex * 26;

                    return (
                      <svg
                        key={layerIndex}
                        viewBox="20 300 684 240"
                        className="absolute left-0 top-0 h-[190px] w-[100%] md:h-[220px]"
                        aria-hidden="true"
                        style={{
                          transform: isPast
                            ? `translate3d(${moveRight ? "240px" : "-240px"}, -36px, 0) rotate(${moveRight ? "-6deg" : "6deg"}) scale(0.92)`
                            : `translate3d(${xOffset}px, ${yOffset}px, 0)`,
                          opacity: isPast ? 0 : 1,
                          // zIndex: 50 - layerIndex,
                          zIndex: challengeList.length - layerIndex,
                          transition:
                            "transform 720ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 620ms ease",
                          // filter:
                          //   "drop-shadow(0 16px 26px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 14px rgba(255, 255, 255, 0.2))",
                          filter: `drop-shadow(0 18px 28px rgba(0,0,0,0.7)) drop-shadow(0 0 ${8 + layerIndex * 4}px rgba(80,100,255,${0.15 + layerIndex * 0.08}))`,
                        }}
                      >
                        {/* <path
                          d={layerPath}
                          fill="#3C4CFF"
                          fillOpacity={fillOpacity}
                          stroke="rgba(218, 230, 255, 0.55)"
                          strokeWidth="1.2"
                        /> */}
                        <>
                          <defs>
                            <linearGradient
                              id={`glass-${layerIndex}`}
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                stopColor="#0a0e2e"
                                stopOpacity={fillOpacity}
                              />
                              <stop
                                offset="50%"
                                stopColor="#2233cc"
                                stopOpacity={fillOpacity}
                              />
                              <stop
                                offset="100%"
                                stopColor="#4455ff"
                                stopOpacity={fillOpacity}
                              />
                            </linearGradient>
                            <linearGradient
                              id={`border-${layerIndex}`}
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                stopColor="rgba(255,255,255,0.6)"
                              />
                              <stop
                                offset="50%"
                                stopColor="rgba(255,255,255,0.15)"
                              />
                              <stop
                                offset="100%"
                                stopColor="rgba(100,140,255,0.5)"
                              />
                            </linearGradient>
                          </defs>
                          <path
                            d={layerPath}
                            fill={`url(#glass-${layerIndex})`}
                            stroke={`url(#border-${layerIndex})`}
                            strokeWidth="1.5"
                          />
                        </>
                      </svg>
                    );
                  },
                )}
              </div>
            </div>

            <div className="relative h-[250px] md:h-[320px]">
              {challengeList &&
                challengeList?.length > 0 &&
                challengeList.map((challenge, index) => {
                  const isActive = index === activeIndex;
                  const isFuture = index > activeIndex;

                  return (
                    <div
                      key={index}
                      className="absolute inset-0 flex items-center transition-all duration-700"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive
                          ? "translateX(0)"
                          : isFuture
                            ? "translateX(72px)"
                            : "translateX(-72px)",
                        pointerEvents: isActive ? "auto" : "none",
                        transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                    >
                      <div className="w-full max-w-[560px]">
                        <h3 className="mb-4 text-center text-[32px] font-semibold! leading-[1.2] tracking-[-0.02em] md:text-left md:text-[40px]">
                          {index + 1}. {challenge.title}
                        </h3>
                        <div className="max-w-[590px] text-center text-base leading-8 text-[#C5C7D0] md:text-left md:text-[24px] md:leading-[1.55]">
                          <RichText html={challenge.description} />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductExperienceChallenges;
