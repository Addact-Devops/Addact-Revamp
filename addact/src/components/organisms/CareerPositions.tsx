"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type IconType = {
    url: string;
    width?: number;
    height?: number;
    alternativeText?: string;
};

type LogoLinkType = {
    id: string;
    href: string;
    label: string;
    target: string;
    isExternal: boolean;
};

type CardInfoType = {
    AerrowIcon?: IconType;
    HoverIcon?: IconType;
    Icon?: IconType;
    LogoLink?: LogoLinkType;
    LogoTitle?: string;
    TitleIcon?: { Icon: IconType }[];
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
        <section className="bg-[#fff]">
            <div className="container">
                {/* Subtitle and Title */}
                <div className="mb-10">
                    <p className="text-[#d45c5c] text-sm font-semibold mb-1">Exciting Career Paths</p>
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Build your future with us!</h2>
                </div>

                {/* Tabs - aligned left */}
                <div className="flex gap-6 border-b border-[#d45c5c] mb-10">
                    {allTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 border-b-2 transition-all ${
                                activeTab === tab
                                    ? "border-[#d45c5c] text-black font-semibold"
                                    : "border-transparent text-gray-600"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Job Cards */}
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {getFilteredCards().map((card, idx) => (
                        <Link
                            key={idx}
                            href={card.LogoLink?.href || "#"}
                            target={card.LogoLink?.isExternal ? "_blank" : "_self"}
                            className="bg-white p-6 rounded-xl relative text-left group transition-all border border-transparent hover:border-[#d45c5c]"
                        >
                            {/* Top-right background icon */}
                            {card.Icon && (
                                <Image
                                    src={card.Icon.url}
                                    alt={card.Icon.alternativeText || "icon"}
                                    width={60}
                                    height={60}
                                    className="absolute right-4 top-4 opacity-20 group-hover:opacity-100 transition-opacity duration-300"
                                />
                            )}

                            {/* Job Title */}
                            <h3 className="text-xl font-semibold mb-6 text-black">{card.LogoTitle}</h3>

                            {/* Job Info Rows */}
                            <div className="space-y-4 text-sm text-gray-700">
                                {card.TitleIcon?.[0]?.Icon && (
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={card.TitleIcon[0].Icon.url}
                                            alt="experience"
                                            width={20}
                                            height={20}
                                        />
                                        <span>2 - 5 Years</span>
                                    </div>
                                )}

                                {card.TitleIcon?.[1]?.Icon && (
                                    <div className="flex items-center gap-2">
                                        <Image src={card.TitleIcon[1].Icon.url} alt="location" width={20} height={20} />
                                        <span>Ahmedabad, Gujarat</span>
                                    </div>
                                )}

                                {card.TitleIcon?.[2]?.Icon && (
                                    <div className="flex items-center gap-2">
                                        <Image src={card.TitleIcon[2].Icon.url} alt="job type" width={20} height={20} />
                                        <span>Full Time</span>
                                    </div>
                                )}
                            </div>

                            {/* Bottom-right arrow icon */}
                            {card.AerrowIcon?.url && (
                                <Image
                                    src={card.AerrowIcon.url}
                                    alt="arrow"
                                    width={18}
                                    height={18}
                                    className="absolute bottom-4 right-4"
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Bottom line */}
                <div className="text-center mt-12 text-sm text-gray-700">
                    Get to know us better !{" "}
                    <Link href="/about" className="text-[#d45c5c] font-semibold">
                        CLICK HERE
                    </Link>
                </div>
            </div>
        </section>
    );
}
