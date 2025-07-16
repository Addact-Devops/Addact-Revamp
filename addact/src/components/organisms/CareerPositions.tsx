"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Inline types
type ImageType = {
    url: string;
    width?: number;
    height?: number;
    alternativeText?: string;
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
    TitleIcon?: { Icon: ImageType }[];
};

type PositionType = {
    EventTitle: string;
    CardInfo: CardInfoType[];
};

type Props = {
    positions: PositionType[];
};

export default function CareerPositions({ positions }: Props) {
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
            {/* Subtitle and Title */}
            <div className="mb-[100px]">
                <p className="text-[#e97777] mb-[10px] md:mb-[15px] leading-[26px] text-center font-[500]">
                    Exciting Career Paths
                </p>
                <h2 className="text-[#000] !font-[400] 2xl:mb-[40px] md:mb-[30px] text-center !text-[35px] md:!text-[45px]">
                    Build your future with us!
                </h2>
            </div>

            {/* Tabs - aligned left */}
            <div className="flex mb-[60px] gap-[50px] border-b-[2px] border-b-[#e97777]">
                {allTabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative pb-[15px] transition-all text-[20px]
                            ${
                                activeTab === tab
                                    ? "text-black font-[500] after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[5px] after:w-full after:bg-[#d45c5c] after:rounded-t-[10px]"
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
                        className="bg-white px-[30px] py-[32px] rounded-xl relative text-left group transition-all border border-transparent hover:border-[#d45c5c]"
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
                            {card.TitleIcon?.[0]?.Icon && (
                                <div className="flex items-center gap-[10px] text-[22px]">
                                    <Image src={card.TitleIcon[0].Icon.url} alt="experience" width={25} height={25} />
                                    <span>2 - 5 Years</span>
                                </div>
                            )}
                            {card.TitleIcon?.[1]?.Icon && (
                                <div className="flex items-center gap-[10px] text-[22px]">
                                    <Image src={card.TitleIcon[1].Icon.url} alt="location" width={25} height={25} />
                                    <span>Ahmedabad, Gujarat</span>
                                </div>
                            )}
                            {card.TitleIcon?.[2]?.Icon && (
                                <div className="flex items-center gap-[10px] text-[22px]">
                                    <Image src={card.TitleIcon[2].Icon.url} alt="job type" width={25} height={25} />
                                    <span>Full Time</span>
                                </div>
                            )}
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
                <Link href="/about" className="text-[#e97777] font-semibold">
                    CLICK HERE
                </Link>
            </div>
        </section>
    );
}
