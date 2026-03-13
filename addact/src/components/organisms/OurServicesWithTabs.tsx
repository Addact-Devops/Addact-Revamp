"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { ArrowRight } from "lucide-react";
import { OurServiceData } from "@/graphql/queries/getServieceList";
import RichText from "../atom/richText";
// import { RightArrowUpIcon } from "../atom/icons";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { RightArrowUpIcon } from "../atom/icons";
// import { MdPadding } from "react-icons/md";

interface Props {
  data?: OurServiceData;
}

// ✅ Card type for array items
interface Card {
  id: string;
  Title: string;
  Description: string;
  Image?: {
    alternativeText: string | null;
    height: number;
    name: string;
    url: string;
    width: number;
  };
  Link?: {
    id: string;
    href: string;
    label: string;
    target: string;
    isExternal: boolean;
  };
  sub_service_page?: {
    Slug: string;
  };
}

const OurServicesWithTabs = ({ data }: Props) => {
  const pathname = usePathname();
  const currentPath = pathname.replace(/\/$/, "");

  const [activeTab, setActiveTab] = useState<
    "ForEnterprisesBrands" | "team_feature"
  >("ForEnterprisesBrands");

  const [currentSlide, setCurrentSlide] = useState(0);

  if (!data) return null;

  const enterprisesCards = data?.ForEnterprisesBrands?.GlobalCard ?? [];
  const teamFeatureCards = data?.team_feature?.Cards ?? [];

  // ---- Slider settings ----
  const enterprisesSliderSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_: number, newIndex: number) => setCurrentSlide(newIndex),
  };

  const teamSliderSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_: number, newIndex: number) => setCurrentSlide(newIndex),
  };

  // ✅ Generic chunkArray function
  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  // indicator width & position
  const getIndicatorStyle = (totalSlides: number) => {
    const segmentWidth = 100 / totalSlides;
    return {
      width: `${segmentWidth}%`,
      left: `${currentSlide * segmentWidth}%`,
    };
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 2xl:py-[160px] bg-white">
      <div className="container-main">
        <div className="flex flex-col">
          <h2 className="!text-[28px] md:!text-[40px] 2xl:!text-[60px] !pb-4 xl:!pb-10 xl:max-w-[40%] 2xl:max-w-[50%] text-[#0F0F0F] font-semibold!">
            {data.ForEnterprisesBrands.Title[0].h2}
          </h2>

          <div className="w-full text-white mt-8 lg:mt-15">
            {/* Tab Buttons */}
            <div className="max-w-none w-fit p-[5px] mx-auto border border-[#E5E5E5] rounded-xl mb-[25px] md:mb-16">
              <div className="flex justify-center gap-1">
                <button
                  onClick={() => {
                    setActiveTab("ForEnterprisesBrands");
                    setCurrentSlide(0);
                  }}
                  className={`px-[15px] py-[12px] md:px-6 md:py-3 rounded-xl cursor-pointer font-semibold  text-[15px] md:text-[18px] ${
                    activeTab === "ForEnterprisesBrands"
                      ? "bg-[#3c4cff] text-white  text-[15px] md:text-[18px]"
                      : "text-[#3C4CFF]"
                  }`}
                >
                  {data.FirstTabDisplayName}
                </button>
                <button
                  onClick={() => {
                    setActiveTab("team_feature");
                    setCurrentSlide(0);
                  }}
                  className={`px-[15px] py-[12px] md:px-6 md:py-3 rounded-xl cursor-pointer font-semibold text-[15px] md:text-[18px] ${
                    activeTab === "team_feature"
                      ? "bg-[#3C4CFF] text-white text-[15px] md:text-[18px]"
                      : "text-[#3C4CFF]"
                  }`}
                >
                  {data.SecondTabDisplayName}
                </button>
              </div>
            </div>

            {/* Enterprises Tab */}
            {activeTab === "ForEnterprisesBrands" && (
              <>
                {/* Desktop */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3! gap-6">
                  {enterprisesCards.map((card) => (
                    <div
                      key={card.id}
                      className="group relative  border-l-[3px] md:border-l-[5px] border-[#3C4CFF] sm:p-8 p-[20px] w-full max-w-[518px]"
                    >
                      <h3 className="text-[#0F0F0F] font-medium !text-[20px] md:!text-[30px] mb-6">
                        {card.Title}
                      </h3>
                      <div className="text-[#0F0F0F] text-[20px] font-montserrat">
                        <RichText html={card.Description} />
                      </div>
                      {card?.sub_service_page?.Slug && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-0 right-0">
                          <Link
                            href={`${currentPath}${card?.sub_service_page?.Slug}`}
                            target={card.Link?.isExternal ? "_blank" : "_self"}
                          >
                            <div className="w-14 h-14 bg-[#3C4CFF] text-[#0F0F0F] flex items-center justify-center">
                              <RightArrowUpIcon />
                            </div>
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile Slider → 2 stacked per slide */}
                <div className="md:hidden">
                  <Slider {...enterprisesSliderSettings}>
                    {chunkArray<Card>(enterprisesCards, 2).map((group, idx) => (
                      <div key={idx} className="space-y-[16px]">
                        {group.map((card) => (
                          <div
                            key={card.id}
                            className="relative group pb-10 border-l-[3px] border-[#3C4CFF] p-[16px]"
                          >
                            <h3 className="text-[#0F0F0F] !text-[20px] md:!text-[30px] mb-5 font-montserrat">
                              {card.Title}
                            </h3>
                            <div className="text-[#0F0F0F] text-lg font-montserrat">
                              <RichText html={card.Description} />
                            </div>
                            {card?.sub_service_page?.Slug && (
                              <div className="absolute bottom-0 right-0">
                                <Link
                                  href={`${currentPath}${card?.sub_service_page?.Slug}`}
                                  target={
                                    card.Link?.isExternal ? "_blank" : "_self"
                                  }
                                >
                                  <div className="w-14 h-14 bg-[#3C4CFF] text-white flex items-center justify-center">
                                    <RightArrowUpIcon />
                                  </div>
                                </Link>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </Slider>

                  {/* Indicator line */}
                  <div className="relative mt-[40px] h-[1px] bg-gray-600">
                    <div
                      className="absolute top-0 left-0 h-[2px] bg-[#3C4CFF] transition-all duration-300"
                      style={getIndicatorStyle(
                        Math.ceil(enterprisesCards.length / 2),
                      )}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Agencies Tab */}
            {activeTab === "team_feature" && (
              <>
                {data?.team_feature?.Description && (
                  <p className="text-center text-sm text-[#0F0F0F] mb-14 hidden md:block">
                    {data.team_feature.Description}
                  </p>
                )}

                {/* Desktop */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2! gap-6">
                  {teamFeatureCards.map((card) => (
                    <div
                      key={card.id}
                      className="p-10 xl:p-[40px] border border-[#E5E5E5] rounded-[10px]"
                    >
                      <h3 className="text-[#0F0F0F] !text-[20px] md:!text-[30px] mb-6">
                        {card.Title}
                      </h3>
                      <div className="text-[#0F0F0F] text-lg font-montserrat">
                        <RichText html={card.Description} />
                      </div>
                      {card.Link?.href && (
                        <a
                          href={card.Link.href}
                          target={card.Link.isExternal ? "_blank" : "_self"}
                          rel={
                            card.Link.isExternal ? "noopener noreferrer" : ""
                          }
                          className="mt-8 inline-flex items-center justify-center gap-[20px] w-[180px] h-[60px] border border-white rounded-[8px] px-[20px] py-[16px] font-semibold text-[18px] leading-[28px] text-white bg-[#3440CB] hover:border-[#3C4CFF] transition"
                        >
                          {card.Link.label}
                          <ArrowRight width={30} height={30} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile Slider → 1 per slide */}
                <div className="md:hidden no-space">
                  <Slider {...teamSliderSettings}>
                    {teamFeatureCards.map((card) => (
                      <div key={card.id}>
                        <div className=" p-[16px] border border-[#E5E5E5] rounded-[10px]">
                          <h3 className="text-[#0F0F0F] !text-[20px] md:!text-[30px] mb-3 font-montserrat">
                            {card.Title}
                          </h3>
                          <div className="text-[#0F0F0F] text-lg font-montserrat">
                            <RichText html={card.Description} />
                          </div>
                          {card.Link?.href && (
                            <a
                              href={card.Link.href}
                              target={card.Link.isExternal ? "_blank" : "_self"}
                              rel={
                                card.Link.isExternal
                                  ? "noopener noreferrer"
                                  : ""
                              }
                              className="mt-8 inline-flex items-center justify-center gap-[20px] w-[180px] h-[60px] border border-white rounded-[8px] px-[20px] py-[16px] font-semibold text-[18px] leading-[28px] text-white bg-[#3440CB] hover:border-[#3C4CFF] transition"
                            >
                              {card.Link.label}
                              <ArrowRight width={30} height={30} />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </Slider>

                  {/* Indicator line */}
                  <div className="relative mt-[40px] h-[1px] bg-gray-600">
                    <div
                      className="absolute top-0 left-0 h-[2px] bg-[#3C4CFF] transition-all duration-300"
                      style={getIndicatorStyle(teamFeatureCards.length)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServicesWithTabs;
