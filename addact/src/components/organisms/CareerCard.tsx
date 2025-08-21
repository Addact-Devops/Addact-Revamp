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
        <section id="perks" className="my-[60px] xl:my-[100px] 2xl:my-[200px]">
            <div className="container mx-auto">
                {/* Section Titles */}
                {title.map((block) => {
                    if ("Richtext" in block && block.Richtext) {
                        return (
                            <p
                                key={block.id}
                                className="text-[#3C4CFF] mb-[10px] md:mb-[15px] leading-[26px] text-center font-[500]"
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
                            className:
                                "text-[#000] !font-[400] 2xl:mb-[40px] md:mb-[30px] text-center !text-[35px] md:!text-[45px] ",
                        },
                        content
                    );
                })}

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-12 sm:gap-y-10">
                    {cards
                        .filter((card) => card.Title)
                        .map((card) => (
                            <div
                                key={card.id}
                                className="flex flex-col pt-[50px] 2xl:pt-[80px] px-[10px] md:px-[0] text-center md:text-left"
                            >
                                {/* Title + Icon */}
                                <div className="relative mb-[15px] ">
                                    {card.Image?.url && (
                                        <img
                                            src={card.Image.url}
                                            alt={card.Image.alternativeText || ""}
                                            className="inline mr-[10px] w-[20px] md:w-[25px]"
                                        />
                                    )}

                                    <div className="sm:text-[18px] xl:text-[22px] 2xl:text-[22px] font-semibold text-black inline lowercase md:uppercase">
                                        {card.Title}
                                    </div>
                                </div>

                                {/* Description */}
                                {card.Description && (
                                    <div
                                        className="text-base text-[#000] leading-relaxed text-15"
                                        dangerouslySetInnerHTML={{ __html: card.Description }}
                                    />
                                )}

                                {/* Optional Link */}
                                {card.Link?.href && (
                                    <a href={card.Link.href} className="text-[#3C4CFF] underline mt-2 block">
                                        Learn more
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
