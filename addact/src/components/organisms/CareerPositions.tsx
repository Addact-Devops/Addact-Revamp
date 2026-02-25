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

    const filtered = getFilteredCards();

    return (
        <section className="container my-[80px] lg:my-[100px] 2xl:my-[200px]" id="open-positions">
            {/* Title Section — original font sizes */}
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

            {/* Tabs — Premium Sliding Pill Design */}
            <div className='flex flex-wrap items-center gap-3 md:gap-4 mb-16'>
                {allTabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative px-6 md:px-8 py-3 md:py-4 text-[13px] md:text-[15px] font-bold rounded-full transition-all duration-500 overflow-hidden group/tab ${
                            activeTab === tab
                                ? "text-white shadow-[0_10px_25px_-5px_rgba(60,76,255,0.3)]"
                                : "text-zinc-500 hover:text-[#3C4CFF] bg-zinc-50 border border-zinc-100 hover:border-[#3C4CFF]/30"
                        }`}
                    >
                        {activeTab === tab && (
                            <div className='absolute inset-0 bg-[#3C4CFF] transition-all duration-500' />
                        )}
                        <span className='relative z-10 uppercase tracking-wider'>{tab}</span>
                    </button>
                ))}
            </div>

            {/* Job Cards Grid — Premium Redesign */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10'>
                {filtered.map((card, idx) => (
                    <article
                        key={idx}
                        className='group relative bg-white rounded-[32px] overflow-hidden border border-zinc-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_-20px_rgba(60,76,255,0.12)] transition-all duration-500 hover:-translate-y-2 flex flex-col'
                    >
                        {/* Interactive Accent Top */}
                        <div className='h-1.5 w-full bg-[#3C4CFF]/10 overflow-hidden'>
                            <div className='h-full w-0 bg-[#3C4CFF] group-hover:w-full transition-all duration-700 ease-out' />
                        </div>

                        {/* Card Body */}
                        <div className='p-8 md:p-10 flex flex-col flex-1 relative'>
                            {/* Decoration Glow */}
                            <div className='absolute -bottom-10 -right-10 w-32 h-32 bg-[#3C4CFF]/5 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500' />

                            {/* Icon + Status Badge row */}
                            <div className='flex items-center justify-between mb-8'>
                                <div className='w-14 h-14 rounded-2xl bg-[#F0F2FF] flex items-center justify-center group-hover:bg-[#3C4CFF] transition-all duration-300 group-hover:shadow-[0_10px_20px_-5px_rgba(60,76,255,0.3)]'>
                                    {card.Icon?.url ? (
                                        <Image
                                            src={card.Icon.url}
                                            alt={card.Icon.alternativeText || "icon"}
                                            width={24}
                                            height={24}
                                            className='w-6 h-6 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert'
                                        />
                                    ) : (
                                        <svg width='20' height='20' viewBox='0 0 24 24' fill='none' className='text-[#3C4CFF] group-hover:text-white transition-colors duration-300'>
                                            <rect x='2' y='7' width='20' height='14' rx='2' stroke='currentColor' strokeWidth='2'/>
                                            <path d='M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
                                        </svg>
                                    )}
                                </div>
                                <span className='text-[10px] font-black uppercase tracking-[0.15em] text-[#3C4CFF] bg-[#3C4CFF]/5 border border-[#3C4CFF]/15 px-4 py-1.5 rounded-full'>
                                    Hiring Now
                                </span>
                            </div>

                            {/* Job Title */}
                            <h3 className='font-bold text-zinc-900 text-2xl md:text-3xl leading-[1.2] mb-6 group-hover:text-[#3C4CFF] transition-colors duration-300'>
                                {card.LogoTitle}
                            </h3>

                            {/* Separator */}
                            <div className='w-12 h-[1px] bg-zinc-100 mb-8 group-hover:w-20 group-hover:bg-[#3C4CFF]/30 transition-all duration-500' />

                            {/* Info Rows */}
                            <div className='space-y-4 text-[15px] font-semibold text-zinc-500 flex-1 mb-10'>
                                {card.TitleIcon?.map((item, index) => (
                                    <div key={index} className='flex items-center gap-3 group/info'>
                                        <div className='w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center border border-zinc-100 group-hover/info:border-[#3C4CFF]/20 group-hover/info:bg-[#F0F2FF] transition-all duration-300'>
                                            {item.Icon?.url && (
                                                <Image
                                                    src={item.Icon.url}
                                                    alt={item.Icon.alternativeText || `icon-${index}`}
                                                    width={16}
                                                    height={16}
                                                    className='w-4 h-4 object-contain opacity-60 group-hover/info:opacity-100 transition-opacity'
                                                />
                                            )}
                                        </div>
                                        <span className='group-hover:text-zinc-800 transition-colors'>{item.Title}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Premium Action Button */}
                            <Link
                                href={card.LogoLink?.href || "#"}
                                target={card.LogoLink?.isExternal ? "_blank" : "_self"}
                                className='relative flex items-center justify-center gap-3 w-full bg-[#3C4CFF] text-white font-bold rounded-2xl py-4.5 px-6 shadow-[0_15px_30px_-10px_rgba(60,76,255,0.4)] hover:shadow-[0_20px_40px_-12px_rgba(60,76,255,0.5)] transition-all duration-300 hover:-translate-y-1 transform active:scale-[0.98]'
                            >
                                <span className='uppercase tracking-wider text-[13px]'>View Position</span>
                                <svg
                                    width='18' height='18' viewBox='0 0 24 24' fill='none'
                                    className='transform group-hover:translate-x-1.5 transition-transform duration-300'
                                >
                                    <path d='M5 12h14M12 5l7 7-7 7' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'/>
                                </svg>
                            </Link>
                        </div>
                    </article>
                ))}
            </div>

            {/* Empty State */}
            {filtered.length === 0 && (
                <div className="text-center py-20">
                    <div className="w-16 h-16 rounded-2xl bg-[#f0f2ff] flex items-center justify-center mx-auto mb-4">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#3C4CFF]">
                            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </div>
                    <p className="text-gray-500 text-[16px]">No positions available in this category.</p>
                </div>
            )}
        </section>
    );
}
