"use client";

import React from "react";

// Inline types
type HeadingBlock =
    | { id: string; h1?: string }
    | { id: string; h2?: string }
    | { id: string; h3?: string }
    | { id: string; h4?: string }
    | { id: string; h5?: string }
    | { id: string; h6?: string }
    | { id: string; Richtext?: string };

type GlobalCardItem = {
    id: string;
    Title?: string | null;
    Description?: string | null;
    Image?: {
        url: string;
        alternativeText?: string | null;
    } | null;
    Link?: {
        href: string;
    } | null;
};

type CareerCardProps = {
    title: HeadingBlock[];
    cards: GlobalCardItem[];
};

const CareerCard: React.FC<CareerCardProps> = ({ title, cards }) => {
    const allowedTags = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
    type TagName = (typeof allowedTags)[number];

    return (
        <section id="perks" className="my-[80px] lg:my-[100px] 2xl:my-[200px] relative overflow-hidden">
            {/* Soft background gradient blobs */}
            <div className="absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full bg-[#3C4CFF]/5 blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] rounded-full bg-[#3C4CFF]/4 blur-[100px] pointer-events-none" />

            <div className="container mx-auto relative z-10">
                {/* Section Titles — original font sizes restored */}
                <div className="text-center mb-12">
                    {title.map((block) => {
                        if ("Richtext" in block && block.Richtext) {
                            return (
                                <p
                                    key={block.id}
                                    className="text-[#3C4CFF] mb-[10px] md:mb-[15px] leading-[26px] font-[500]"
                                    dangerouslySetInnerHTML={{ __html: block.Richtext }}
                                />
                            );
                        }

                        const [tag, content] = Object.entries(block).find(([key]) => key !== "id") as [string, string];
                        const tagName: TagName | "div" = allowedTags.includes(tag as TagName) ? (tag as TagName) : "div";

                        return React.createElement(
                            tagName,
                            {
                                key: block.id,
                                className: "text-[#000] !font-[400] 2xl:mb-[40px] md:mb-[30px] !text-[35px] md:!text-[45px]",
                            },
                            content
                        );
                    })}
                </div>

                {/* Cards Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10'>
                    {cards
                        .filter((card) => card.Title)
                        .map((card, idx) => (
                            <div
                                key={card.id}
                                className='group relative bg-white rounded-[32px] p-10 border border-zinc-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(60,76,255,0.15)] hover:border-[#3C4CFF]/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden'
                            >
                                {/* Hover Gradient Accent */}
                                <div className='absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#3C4CFF] via-[#6C7FFF] to-[#3C4CFF] bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-700 opacity-0 group-hover:opacity-100' />
                                
                                {/* Background Glow on Hover */}
                                <div className='absolute -bottom-20 -right-20 w-40 h-40 bg-[#3C4CFF]/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                                {/* Number badge — Premium style */}
                                <div className='absolute top-8 right-10 text-4xl font-black text-zinc-100 group-hover:text-[#3C4CFF]/10 transition-colors duration-500 select-none'>
                                    {String(idx + 1).padStart(2, "0")}
                                </div>

                                {/* Icon Plate */}
                                {card.Image?.url && (
                                    <div className='w-16 h-16 rounded-2xl bg-[#F0F2FF] flex items-center justify-center mb-8 group-hover:bg-[#3C4CFF] group-hover:shadow-[0_15px_30px_-8px_rgba(60,76,255,0.4)] transition-all duration-300'>
                                        <img
                                            src={card.Image.url}
                                            alt={card.Image.alternativeText || ""}
                                            className='w-8 h-8 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert'
                                        />
                                    </div>
                                )}

                                {/* Title */}
                                <h3 className='text-2xl font-bold text-zinc-900 mb-4 group-hover:text-[#3C4CFF] transition-colors duration-300 tracking-tight'>
                                    {card.Title}
                                </h3>

                                {/* Progress Divider */}
                                <div className='relative w-full h-[1px] bg-zinc-100 mb-6 overflow-hidden'>
                                    <div className='absolute inset-0 w-0 h-full bg-[#3C4CFF] group-hover:w-full transition-all duration-700 ease-out' />
                                </div>

                                {/* Description */}
                                {card.Description && (
                                    <div
                                        className='text-zinc-500 leading-relaxed text-[17px] font-medium'
                                        dangerouslySetInnerHTML={{ __html: card.Description }}
                                    />
                                )}

                                {/* Premium CTA */}
                                {card.Link?.href && (
                                    <a
                                        href={card.Link.href}
                                        className='inline-flex items-center gap-2 text-[#3C4CFF] text-[15px] font-bold mt-8 group/link'
                                    >
                                        <span className='relative'>
                                            Explore Opportunity
                                            <span className='absolute bottom-0 left-0 w-full h-[1px] bg-[#3C4CFF] scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left' />
                                        </span>
                                        <svg 
                                            width='18' height='18' viewBox='0 0 24 24' fill='none' 
                                            className='transform group-hover/link:translate-x-1.5 transition-transform duration-300'
                                        >
                                            <path d='M5 12h14M12 5l7 7-7 7' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'/>
                                        </svg>
                                    </a>
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default CareerCard;
