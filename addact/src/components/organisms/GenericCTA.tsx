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

    const sectionMinHeight = "450px"; // same value reused

    return (
        <section
            className="relative w-full bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: image?.url ? `url(${image.url})` : "none",
                minHeight: sectionMinHeight,
            }}
        >
            {/* Content wrapper with same minHeight */}
            <div className="relative container flex py-[30px]" style={{ minHeight: sectionMinHeight }}>
                <div className="flex flex-col w-full justify-end lg:justify-center text-white max-w-xl text-left">
                    {headingText && <h2 className="mb-[15px]">{headingText}</h2>}

                    {descriptionText && <p className="mb-[15px]">{descriptionText}</p>}

                    {link && (
                        <a
                            href={link.href}
                            target={link.target || "_self"}
                            rel={link.isExternal ? "noopener noreferrer" : undefined}
                            style={{ width: "fit-content" }}
                            className="text-[15px] bg-[#3C4CFF] hover:bg-[#000000] text-white text-base font-[600] rounded-lg transition h-[41px] inline-flex items-center justify-center px-[16px] mt-[20px]"
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
