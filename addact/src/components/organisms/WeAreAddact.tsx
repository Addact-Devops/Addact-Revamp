"use client";

import React, { useEffect, useRef, useState } from "react";

type ImageType = {
    url: string;
    alternativeText: string | null;
    height: number;
    width: number;
};

type ContentChild = {
    text: string;
};

type ContentBlock = {
    type: string;
    children: ContentChild[];
};

type NumberItem = {
    Number: string;
    Content: string;
};

type Props = {
    subtitle: string;
    title: string;
    content: ContentBlock[];
    image: ImageType;
    numberContent?: NumberItem[];
};

const WeAreAddact: React.FC<Props> = ({ subtitle, title, content, image, numberContent = [] }) => {
    const sectionRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [counts, setCounts] = useState<number[]>(numberContent.map(() => 0));

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    animateCount();
                    setHasAnimated(true);
                }
            },
            { threshold: 0.3 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const animateCount = () => {
        numberContent.forEach((item, index) => {
            const num = parseInt(item.Number);
            let current = 0;
            const step = Math.ceil(num / 50);
            const interval = setInterval(() => {
                current += step;
                if (current >= num) { current = num; clearInterval(interval); }
                setCounts((prev) => {
                    const updated = [...prev];
                    updated[index] = current;
                    return updated;
                });
            }, 20);
        });
    };

    return (
        <section ref={sectionRef} className="py-[70px] sm:py-[90px] bg-white relative overflow-hidden" id="who-we-are">
            {/* Ambient blobs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#3C4CFF]/4 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#3C4CFF]/3 blur-[100px] pointer-events-none" />

            <div className="container relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-[50px] md:gap-[70px] lg:gap-[100px]">

                    {/* Image — desktop */}
                    <div className="w-full md:w-[45%] hidden md:block shrink-0 relative">
                        {/* Decorative frame */}
                        <div className="absolute -bottom-5 -left-5 w-full h-full rounded-2xl border-2 border-[#3C4CFF]/15 pointer-events-none" />

                        <img
                            src={image.url}
                            alt={image.alternativeText || "We Are Addact"}
                            className="rounded-2xl w-full h-auto object-cover shadow-2xl shadow-black/10 relative z-10"
                        />
                    </div>

                    {/* Text */}
                    <div className="w-full md:w-[55%]">
                        {/* Subtitle label */}
                        <p className="text-[#3C4CFF] text-[12px] font-semibold uppercase tracking-[2px] mb-5">
                            {subtitle}
                        </p>

                        <h2 className="text-zinc-900 font-bold text-[28px] md:text-[38px] 2xl:text-[50px] leading-[1.15] mb-3">
                            {title}
                        </h2>

                        <div className="w-10 h-[3px] bg-[#3C4CFF] rounded-full mb-6" />

                        {/* Image — mobile */}
                        <div className="block md:hidden mb-6 relative">
                            <img
                                src={image.url}
                                alt={image.alternativeText || "We Are Addact"}
                                className="rounded-xl w-full h-auto object-cover max-h-[260px] shadow-md"
                            />
                        </div>

                        <div className="text-zinc-600 text-[16px] leading-[1.85] mb-8 space-y-3">
                            {content?.map((block, index) => (
                                <p key={index}>
                                    {block.children?.map((child, ci) => (
                                        <span key={ci}>{child.text}</span>
                                    ))}
                                </p>
                            ))}
                        </div>

                        {/* Stats grid — premium */}
                        {numberContent.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {numberContent.map((item, index) => (
                                    <div
                                        key={index}
                                        className="group/stat relative bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-5 hover:border-[#3C4CFF]/30 hover:shadow-lg hover:shadow-[#3C4CFF]/8 transition-all duration-300 overflow-hidden"
                                    >
                                        {/* Subtle blue corner */}
                                        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-[#3C4CFF]/5 to-transparent rounded-bl-2xl" />

                                        <div className="text-[#3C4CFF] font-black text-[32px] md:text-[38px] leading-none mb-1.5 tabular-nums group-hover/stat:scale-105 transition-transform duration-300 origin-left">
                                            {counts[index]}+
                                        </div>
                                        <p className="text-zinc-400 text-[11px] font-semibold uppercase tracking-wider leading-snug">
                                            {item.Content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WeAreAddact;
