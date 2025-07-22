"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OurServiceData } from "@/graphql/queries/getServieceList";
import RichText from "../atom/richText";
import { RightArrowUpIcon } from "../atom/icons";

interface Props {
    data: OurServiceData;
}

const OurServicesWithTabs = ({ data }: Props) => {
    const pathname = usePathname();
    const currentPath = pathname.replace(/\/$/, "");

    const [activeTab, setActiveTab] = useState<"ForEnterprisesBrands" | "team_feature">("ForEnterprisesBrands");

    const enterprisesCards = data?.ForEnterprisesBrands?.GlobalCard ?? [];
    const teamFeatureCards = data?.team_feature?.Cards ?? [];

    return (
        <section className='pt-24 sm:pt-32 md:pt-40 lg:pt-60'>
            <div className='container'>
                <div className='flex flex-col'>
                    <h2 className='border-after !text-[28px] md:!text-5xl xl:!text-6xl !pb-4 xl:!pb-10'>
                        {data.ForEnterprisesBrands.Title[0].h2}
                    </h2>
                    <div className='w-full text-white mt-24'>
                        {/* Tab Buttons */}
                        <div className='max-w-[526px] p-[5px] mx-auto border border-[#1C1C1C] rounded-xl mb-16'>
                            <div className='flex justify-center gap-1'>
                                <button
                                    onClick={() => setActiveTab("ForEnterprisesBrands")}
                                    className={`px-6 py-3 rounded-xl cursor-pointer ${
                                        activeTab === "ForEnterprisesBrands" ? "bg-blue-600 text-white" : ""
                                    }`}
                                >
                                    For Enterprises & Brands
                                </button>
                                <button
                                    onClick={() => setActiveTab("team_feature")}
                                    className={`px-6 py-3 rounded-xl cursor-pointer ${
                                        activeTab === "team_feature" ? "bg-blue-600 text-white" : ""
                                    }`}
                                >
                                    For Agencies & Tech Teams
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        {activeTab === "ForEnterprisesBrands" && (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {enterprisesCards.map((card) => (
                                    <div
                                        key={card.id}
                                        className='group bg-[#1C1C1C] border-l-[5px] border-[#3C4CFF] p-10 sm:p-8 xs:p-6 relative'
                                    >
                                        <h3 className='font-montserrat font-normal text-[30px] leading-[48px] text-white mb-6'>
                                            {card.Title}
                                        </h3>
                                        <div className='font-montserrat font-normal text-[20px] leading-[34px]'>
                                            <RichText html={card.Description} />
                                        </div>

                                        {/* Hover content */}
                                        <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-0 right-0'>
                                            <Link
                                                href={`${currentPath}/${card?.sub_service_page?.Slug}`}
                                                target='_blank'
                                            >
                                                <div className='w-14 h-14 bg-blue-600 text-white flex items-center justify-center'>
                                                    <RightArrowUpIcon />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "team_feature" && (
                            <div>
                                {data?.team_feature?.Description && (
                                    <p className='text-center max-w-3xl mx-auto text-sm text-gray-300 mb-14'>
                                        {data.team_feature.Description}
                                    </p>
                                )}
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                    {teamFeatureCards.map((card) => (
                                        <div
                                            key={card.id}
                                            className='bg-[#1C1C1C] p-10 sm:p-8 xs:p-6 rounded-none border border-[#FFFFFF33] flex flex-col justify-between'
                                        >
                                            <div>
                                                <h3 className='font-montserrat font-normal text-[30px] leading-[48px] text-white mb-6'>
                                                    {card.Title}
                                                </h3>
                                                <div className='font-montserrat font-normal text-[18px] leading-[30px]'>
                                                    <RichText html={card.Description} />
                                                </div>
                                            </div>

                                            {card.Link?.href && (
                                                <a
                                                    href={card.Link.href}
                                                    target={card.Link.isExternal ? "_blank" : "_self"}
                                                    rel={card.Link.isExternal ? "noopener noreferrer" : ""}
                                                    className='mt-8 inline-flex items-center justify-center gap-[20px] w-[180px] h-[60px] border border-white rounded-[8px] px-[20px] py-[16px] font-semibold text-[18px] leading-[28px] text-white hover:bg-[#3C4CFF] hover:border-[#3C4CFF] transition'
                                                >
                                                    {card.Link.label}
                                                    <ArrowRight width={30} height={30} />
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurServicesWithTabs;
