"use client";

import React from "react";

type CTAImageType = {
    url: string;
    alternativeText: string | null;
    width: number | null;
    height: number | null;
};

type CTALinkType = {
    label: string;
    href: string;
    target: string | null;
    isExternal: boolean;
};

type CtaTitle = { h1?: string } | { h2?: string } | { h3?: string };

type CTAProps = {
    title?: CtaTitle[];
    description?: {
        type: string;
        children: { text: string }[];
    }[];
    image?: CTAImageType | null;
    link?: CTALinkType | null;
};

const getHeadingValue = (heading: CtaTitle): string => {
    if ("h1" in heading) return heading.h1 || "";
    if ("h2" in heading) return heading.h2 || "";
    if ("h3" in heading) return heading.h3 || "";
    return "";
};

const GenericCTA: React.FC<CTAProps> = ({ title, description, image, link }) => {
    const headingText = title && title.length > 0 ? getHeadingValue(title[0]) : "";
    const descriptionText = description?.[0]?.children?.[0]?.text || "";

    return (
        <section
            className="relative w-full bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: image?.url ? `url(${image.url})` : "none",
                minHeight: "450px",
            }}
        >
            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex items-center h-full">
                <div className="max-w-xl text-left text-white">
                    {headingText && (
                        <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">{headingText}</h2>
                    )}

                    {descriptionText && <p className="text-lg lg:text-xl mb-6">{descriptionText}</p>}

                    {link && (
                        <a
                            href={link.href}
                            target={link.target || "_self"}
                            rel={link.isExternal ? "noopener noreferrer" : undefined}
                            className="inline-block bg-[#E05357] hover:bg-[#c24449] text-white px-6 py-3 text-base font-semibold rounded-lg transition"
                        >
                            {link.label}
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};

export default GenericCTA;
