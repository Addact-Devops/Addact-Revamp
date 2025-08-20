"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

// Types
type ImageType = {
    url: string;
    width?: number;
    height?: number;
    alternativeText?: string;
};

type TitleBlock = {
    Title?: string;
    Description?: string;
};

type CardInfoType = {
    AerrowIcon?: ImageType;
    HoverIcon?: ImageType;
    Icon?: ImageType;
    LogoLink?: {
        id: string;
        href: string;
        label: string;
        target: string;
        isExternal: boolean;
    };
    LogoTitle?: string;
    TitleIcon?: {
        Title?: string;
        Icon: ImageType;
    }[];
};

type PositionType = {
    id: string;
    EventTitle: string;
    CardInfo: CardInfoType[];
};

type Props = {
    positions: PositionType[];
    positionsTitle?: TitleBlock[];
};

const stripTags = (html: string) => DOMPurify.sanitize(html, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });

export default function CareerPositions({ positions, positionsTitle }: Props) {
    const [activeTab, setActiveTab] = useState("All Positions");

    const allTabs = ["All Positions", ...positions.map((p) => p.EventTitle).filter((t) => t !== "All positions")];
    const allJobs = positions.flatMap((p) => p.CardInfo);

    const getFilteredCards = () => {
        if (activeTab === "All Positions") return allJobs;
        const selected = positions.find((p) => p.EventTitle === activeTab);
        return selected?.CardInfo || [];
    };

    return (
        <section className="container my-[60px] md:my-[60px]" id="open-positions">
            {/* Title Section */}
            <div className="mb-[26px] md:mb-[60px]">
                {positionsTitle?.map((item, index) => (
                    <div key={index} className="text-left">
                        {item.Title && (
                            <p className="text-[#3C4CFF] text-[20px] font-medium mb-2">{stripTags(item.Title)}</p>
                        )}
                        {item.Description && (
                            <>
                                <h2 className="!text-[28px] md:!text-[40px] 2xl:!text-[60px] font-semibold text-black leading-tight">
                                    {stripTags(item.Description)}
                                </h2>
                                <div className="w-[67px] md:w-[160px] h-[3px] md:h-[5px] bg-[#3C4CFF] mt-[26px] md:mt-[40px]" />
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-[6px] md:gap-[12px] mb-[26px] md:mb-[60px]">
                {allTabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-[12px] md:px-[28px] py-[8px] md:py-[16px] text-[12px] md:text-[18px] font-[600] rounded-[8px] transition-all no-underline
                            ${
                                activeTab === tab
                                    ? "text-[#ffffff] border border-[#3C4CFF] underline-offset-[6px] bg-[#3C4CFF]"
                                    : "text-[#3C4CFF] border border-[#3C4CFF] hover:border-[#3C4CFF]"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Job Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {getFilteredCards().map((card, idx) => (
                    <div
                        key={idx}
                        className="relative bg-white border border-[#3C4CFF] shadow-sm group transition hover:shadow-md"
                    >
                        {/* Background Icon */}
                        {card.Icon?.url && (
                            <Image
                                src={card.Icon.url}
                                alt={card.Icon.alternativeText || "icon"}
                                width={60}
                                height={60}
                                className="absolute top-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity w-[36px] h-[36px]"
                            />
                        )}

                        <div className="flex flex-col justify-between h-full">
                            <div className="p-[20px] md:p-[30px]">
                                {/* Job Title */}
                                <h5 className="!font-[600] mb-[16px] md:mb-[20px] text-[#0F0F0F] !text-[18px] !md:text-[30px]">
                                    {card.LogoTitle}
                                </h5>

                                {/* Info Rows */}
                                <div className="space-y-[16px] text-[14px] md:text-[18px] font-[500] mb-[5px] text-[#0F0F0F]">
                                    {card.TitleIcon?.map((item, index) => (
                                        <div key={index} className="flex items-center gap-[8px] md:gap-[20px]">
                                            {item.Icon?.url && (
                                                <Image
                                                    src={item.Icon.url}
                                                    alt={item.Icon.alternativeText || `icon-${index}`}
                                                    width={20}
                                                    height={20}
                                                    className="!w-[16px] md:w-[20px] !h-[16px] md:h-[20px]"
                                                />
                                            )}
                                            <span>{item.Title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Apply Now Button */}
                            <Link
                                href={card.LogoLink?.href || "#"}
                                target={card.LogoLink?.isExternal ? "_blank" : "_self"}
                                className="block text-center text-white text-[14px] md:text-[18px] font-[600] bg-[#3C4CFF] md:px-4 py-[8px] md:py-[16px] w-full"
                            >
                                Apply Now
                            </Link>
                        </div>

                        {/* Bottom-right Arrow Icon */}
                        {card.AerrowIcon?.url && (
                            <Image
                                src={card.AerrowIcon.url}
                                alt="arrow"
                                width={20}
                                height={20}
                                className="absolute bottom-4 right-4"
                            />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
