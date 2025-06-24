import React from "react";
import { RightArrowUpIcon } from "../atom/icons";

const OurInsights = () => {
  return (
    <div className="my-28 lg:my-48 xl:my-60">
      <div className="container mx-auto px-4">
        <h2 className="border-after !text-[28px] md:!text-5xl xl:!text-6xl !pb-4 xl:!pb-10">
          Our Insights
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6  mt-10 sm:mt-14 lg:mt-24">
          <div className="border border-gray-700 p-7 flex flex-col h-full relative">
            <div className="bg-gray-300 w-full aspect-[500/171] lg:aspect-[16/9] mb-7 rounded" />
            <span className="px-5 py-2 bg-[#FFFFFF33] border border-blue-500 text-white rounded-lg w-fit text-sm mb-5 font-medium">
              Blog
            </span>
            <h3 className="md:text-base lg:text-xl xl:text-3xl font-medium mb-4 leading-tight">
              Step-by-Step Guide for WordPress to Sitecore Migration
            </h3>
            <p className="text-base text-white mb-4">June 18, 2025</p>
            <div className="mt-auto self-end">
              <div className="w-14 h-14 bg-blue-600 text-white flex items-center justify-center absolute bottom-0 right-0">
                <RightArrowUpIcon />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 h-full">
            <div className="border border-gray-700 p-7 gap-7 flex-1 relative flex-col lg:flex-row hidden lg:flex">
              <div className="bg-gray-300 w-full max-w-[180px] sm:max-w-[200px] lg:max-w-[240px] xl:max-w-[280px] 2xl:max-w-[320px] aspect-[320/244] rounded" />
              <div className="flex flex-col flex-1">
                <span className="px-5 py-2 bg-[#FFFFFF33] border border-blue-500 text-white rounded-lg w-fit text-sm mb-2 font-medium">
                  Blog
                </span>
                <h3 className="md:text-base lg:text-xl xl:text-3xl font-medium mb-4 leading-tight">
                  Step-by-Step Guide for WordPress to Sitecore Migration
                </h3>
                <p className="text-base text-white mb-4">June 18, 2025</p>
                <div className="mt-auto self-end">
                  <div className="w-14 h-14 bg-blue-600 text-white flex items-center justify-center absolute bottom-0 right-0">
                    <RightArrowUpIcon />
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-700 p-7 flex flex-col lg:flex-row gap-7 flex-1 relative">
              <div className="bg-gray-300 w-full max-w-full lg:max-w-[240px] xl:max-w-[280px] 2xl:max-w-[320px] aspect-[500/171] lg:aspect-[320/244] rounded " />
              <div className="flex flex-col flex-1">
                <span className="px-5 py-2 bg-[#FFFFFF33] border border-blue-500 text-white rounded-lg w-fit text-sm mb-2 font-medium">
                  Case study
                </span>
                <h3 className="md:text-base lg:text-xl xl:text-3xl font-medium mb-4 leading-tight">
                  Step-by-Step Guide for WordPress to Sitecore Migration
                </h3>
                <p className="text-base text-white mb-4">June 18, 2025</p>
                <div className="mt-auto self-end">
                  <div className="w-14 h-14 bg-blue-600 text-white flex items-center justify-center absolute bottom-0 right-0">
                    <RightArrowUpIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurInsights;
