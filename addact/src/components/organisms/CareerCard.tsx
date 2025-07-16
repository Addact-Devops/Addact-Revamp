"use client";

import React from "react";

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
    Title: string | null;
    Description: string | null;
    Image: {
        url: string;
        alternativeText?: string | null;
    } | null;
    Link: {
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
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Titles */}
                {title.map((block) => {
                    if ("Richtext" in block && block.Richtext) {
                        return (
                            <div
                                key={block.id}
                                className="mb-2 text-center text-sm text-rose-400 font-medium"
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
                            className: "text-center text-4xl font-semibold text-black mb-10",
                        },
                        content
                    );
                })}

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
                    {cards
                        .filter((card) => card.Title)
                        .map((card) => (
                            <div key={card.id} className="flex flex-col">
                                {/* Title + Icon */}
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xl font-semibold text-black">{card.Title}</span>
                                    {card.Image?.url && (
                                        <img
                                            src={card.Image.url}
                                            alt={card.Image.alternativeText || ""}
                                            className="w-5 h-5"
                                        />
                                    )}
                                </div>

                                {/* Description */}
                                {card.Description && (
                                    <div
                                        className="text-base text-zinc-700 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: card.Description }}
                                    />
                                )}

                                {/* Optional Link */}
                                {card.Link?.href && (
                                    <a href={card.Link.href} className="text-blue-600 underline mt-2 block">
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
