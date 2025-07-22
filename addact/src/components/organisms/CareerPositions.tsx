"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

// Inline types
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

// Utility to remove HTML tags safely
const stripTags = (html: string) => {
    return DOMPurify.sanitize(html, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
};

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
        <section className="container mx-auto my-[60px] sm:my-[100px]">
            {/* Subtitle and Title from props */}
            <div className="mb-[100px] text-center">
                {positionsTitle?.map((item, index) => (
                    <div key={index}>
                        {item.Title && (
                            <p className="text-[#3C4CFF] mb-[10px] md:mb-[15px] leading-[26px] font-[500]">
                                {stripTags(item.Title)}
                            </p>
                        )}
                        {item.Description && (
                            <h2 className="text-[#000] !font-[400] 2xl:mb-[40px] md:mb-[30px] !text-[35px] md:!text-[45px]">
                                {stripTags(item.Description)}
                            </h2>
                        )}
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex mb-[60px] gap-[50px] border-b-[2px] border-b-[#3C4CFF]">
                {allTabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative pb-[15px] transition-all text-[20px]
                            ${
                                activeTab === tab
                                    ? "text-black font-[500] after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[5px] after:w-full after:bg-[#3c4cff] after:rounded-t-[10px]"
                                    : "text-black font-[500]"
                            }
                        `}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Job Cards */}
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
                {getFilteredCards().map((card, idx) => (
                    <Link
                        key={idx}
                        href={card.LogoLink?.href || "#"}
                        target={card.LogoLink?.isExternal ? "_blank" : "_self"}
                        className="bg-white px-[30px] py-[32px] rounded-xl relative text-left group transition-all border border-transparent hover:border-[#3c4cff]"
                    >
                        {/* Top-right background icon */}
                        {card.Icon?.url && (
                            <Image
                                src={card.Icon.url}
                                alt={card.Icon.alternativeText || "icon"}
                                width={60}
                                height={60}
                                className="absolute right-0 top-0 opacity-20 group-hover:opacity-100 transition-opacity duration-300 h-[94px] w-[94px]"
                            />
                        )}

                        {/* Job Title */}
                        <h3 className="text-xl font-semibold mb-[45px] text-black min-h-[94px]">{card.LogoTitle}</h3>

                        {/* Job Info Rows */}
                        <div className="space-y-4 text-sm text-gray-700">
                            {card.TitleIcon?.map((item, index) => (
                                <div key={index} className="flex items-center gap-[10px] text-[22px]">
                                    {item.Icon?.url && (
                                        <Image
                                            src={item.Icon.url}
                                            alt={item.Icon.alternativeText || `icon-${index}`}
                                            width={25}
                                            height={25}
                                        />
                                    )}
                                    <span>{item.Title?.trim() || "—"}</span>
                                </div>
                            ))}
                        </div>

                        {/* Bottom-right arrow icon */}
                        {card.AerrowIcon?.url && (
                            <Image
                                src={card.AerrowIcon.url}
                                alt="arrow"
                                width={25}
                                height={25}
                                className="absolute bottom-4 right-4"
                            />
                        )}
                    </Link>
                ))}
            </div>

            {/* Bottom line */}
            <div className="text-center mt-[70px] text-sm font-[500] text-[#717171]">
                Get to know us better !{" "}
                <Link href="/about" className="text-[#3C4CFF] font-semibold">
                    CLICK HERE
                </Link>
            </div>
        </section>
    );
}
