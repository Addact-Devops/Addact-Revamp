"use client";

import React from "react";

type BrandValueProps = {
    title: string;
    subtitle: string;
    content: {
        type: string;
        children: { text: string }[];
    }[];
    image: {
        url: string;
        alternativeText: string | null;
        width: number | null;
        height: number | null;
    };
};

const BrandValue: React.FC<BrandValueProps> = ({ title, subtitle, content, image }) => {
    const paragraph = content?.[0]?.children?.[0]?.text || "";

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="bg-black rounded-xl p-10 lg:flex items-center justify-between">
                    {/* Left Text Content */}
                    <div className="text-white lg:w-1/2 space-y-4 mb-10 lg:mb-0">
                        <p className="text-[#EE7174] font-medium">{subtitle}</p>
                        <h2 className="text-4xl font-bold">{title}</h2>
                        <p className="text-lg leading-relaxed">{paragraph}</p>
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2 flex justify-center">
                        <img
                            src={image.url}
                            alt={image.alternativeText || "Brand Value Image"}
                            width={image.width || undefined}
                            height={image.height || undefined}
                            className="max-w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandValue;
