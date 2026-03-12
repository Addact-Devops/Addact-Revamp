"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import type { OurCapabilitiy } from "@/graphql/queries/getHomePage";

interface OurCapabilitiesProps {
  data: OurCapabilitiy;
}

const ArrowIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.82112 5.72616L18.2737 5.72617L18.2737 17.1787"
      stroke="#3C4CFF"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.72632 18.274L17.8015 6.19882"
      stroke="#3C4CFF"
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const OurCapabilities = ({ data }: OurCapabilitiesProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [heights, setHeights] = useState<number[]>([]);
  const { heading, capabilities } = data;

  useEffect(() => {
    const measured = contentRefs.current.map((el) =>
      el ? el.scrollHeight : 0,
    );
    setHeights(measured);
  }, [activeIndex]);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  if (!capabilities || capabilities.length === 0) {
    return null;
  }

  return (
    <section className="bg-white -mt-0.5">
      <div className="container-main">
        {/* Mobile heading */}
        {heading && (
          <h2 className="md:hidden !text-[28px] !pb-4 !text-[#0F0F0F]">
            {heading}
          </h2>
        )}

        {/* Desktop / Tablet layout */}
        <div className="hidden md:flex gap-2 lg:gap-4 2xl:gap-6">
          {/* Left side — Heading + Tabs */}
          <div className="w-full md:w-[55%] lg:w-[50%] max-w-[1059px]">
            {heading && (
              <h2 className="!text-[28px] md:!text-[40px] 2xl:!text-[60px] !pb-4 xl:!pb-10 !text-[#0F0F0F]">
                {heading}
              </h2>
            )}
            {capabilities.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={item?.link?.id}
                  className="border-t border-[#e0e0e0] last:border-b"
                >
                  <div className="pl-5 2xl:pl-6">
                    <button
                      onClick={() => handleTabClick(index)}
                      className="w-full text-left py-5 2xl:py-7 cursor-pointer"
                    >
                      <h3
                        className={`!text-[20px] lg:!text-[24px] 2xl:!text-[36px] !font-medium transition-colors duration-300 text-[#0F0F0F]`}
                      >
                        {item?.title}
                      </h3>
                    </button>

                    {/* Expandable content */}
                    <div
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{
                        maxHeight: isActive
                          ? `${heights[index] || 600}px`
                          : "0px",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <div
                        ref={(el) => {
                          contentRefs.current[index] = el;
                        }}
                      >
                        <p className="text-[#0F0F0F]/70 !text-[18px] !lg:text-[20px] !2xl:text-[22px] leading-8 pb-4 2xl:pb-6">
                          {item.description}
                        </p>

                        {/* Services grid */}
                        {item?.sublinks && item?.sublinks?.length > 0 && (
                          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 2xl:gap-y-4 pb-6 2xl:pb-8">
                            {item?.sublinks?.map((sublink) => (
                              <div
                                key={sublink?.id}
                                className="flex items-center gap-2 text-[#0F0F0F]"
                              >
                                <span className="flex-shrink-0">
                                  <ArrowIcon />
                                </span>
                                <span className="!text-[18px] !lg:text-[20px] !2xl:text-[22px] font-medium">
                                  {sublink?.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right side — Image */}
          <div className="w-full md:w-[45%] lg:w-[50%] flex items-start">
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-tl-[240px]">
              {capabilities?.map((item, index) => (
                <div
                  key={item?.link?.id}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    activeIndex === index
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  {item.image?.url && (
                    <Image
                      src={item?.image?.url}
                      alt={item?.image?.alternativeText || item?.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 45vw, 50vw"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile layout — Accordion */}
        <div className="block md:hidden mt-8">
          {capabilities?.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={item?.link?.id}
                className="border-t border-[#e0e0e0] last:border-b"
              >
                <button
                  onClick={() => handleTabClick(index)}
                  className="w-full text-left py-4 flex justify-between items-center cursor-pointer"
                >
                  <h3 className="!text-[18px] !font-medium text-[#0F0F0F]">
                    {item.title}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-[#0F0F0F] transform transition-transform duration-300 ${
                      isActive ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Mobile expandable */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: isActive ? "800px" : "0px",
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  <div className="pb-4">
                    {/* Image */}
                    {item?.image?.url && (
                      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-tl-[120px] mb-4">
                        <Image
                          src={item?.image?.url}
                          alt={item?.image?.alternativeText || item?.title}
                          fill
                          className="object-cover"
                          sizes="100vw"
                        />
                      </div>
                    )}

                    <p className="text-[#0F0F0F]/70 text-[14px] leading-relaxed pb-3">
                      {item?.description}
                    </p>

                    {/* Services grid */}
                    {item?.sublinks && item?.sublinks.length > 0 && (
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3 pb-2">
                        {item?.sublinks.map((sublink) => (
                          <div
                            key={sublink?.id}
                            className="flex items-center gap-2 text-[#0F0F0F]"
                          >
                            <span className="flex-shrink-0">
                              <ArrowIcon />
                            </span>
                            <span className="text-[14px] font-medium">
                              {sublink?.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurCapabilities;
