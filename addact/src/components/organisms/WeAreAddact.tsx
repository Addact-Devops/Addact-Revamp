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
        <section ref={sectionRef} className="py-[70px] sm:py-[90px]" id="who-we-are">
            <div className="container">
                <div className="flex flex-col md:flex-row items-center gap-[50px] md:gap-[70px] lg:gap-[100px]">

                    {/* Image — desktop */}
                    <div className="w-full md:w-[45%] hidden md:block shrink-0">
                        <img
                            src={image.url}
                            alt={image.alternativeText || "We Are Addact"}
                            className="rounded-2xl w-full h-auto object-cover shadow-lg"
                        />
                    </div>

                    {/* Text */}
                    <div className="w-full md:w-[55%]">
                        {/* Pill label */}
                        <div className="inline-flex items-center gap-[8px] text-[#3C4CFF] text-[12px] font-semibold uppercase tracking-[2px] mb-[12px]">
                            {subtitle}
                        </div>

                        <h2 className="text-zinc-900 font-bold text-[28px] md:text-[38px] 2xl:text-[50px] leading-[1.15] mb-[22px]">
                            {title}
                        </h2>

                        {/* Image — mobile */}
                        <div className="block md:hidden mb-[22px]">
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

                        {/* Stats grid */}
                        {numberContent.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-zinc-200/50 rounded-2xl overflow-hidden border border-black/10 shadow-sm">
                                {numberContent.map((item, index) => (
                                    <div key={index} className="bg-white px-[20px] py-[22px] text-center sm:text-left hover:bg-zinc-50 transition-colors duration-300">
                                        <div className="text-[#3C4CFF] font-black text-[32px] md:text-[40px] leading-none mb-[6px] tabular-nums">
                                            {counts[index]}+
                                        </div>
                                        <p className="text-zinc-500 text-[13px] leading-snug font-semibold uppercase tracking-wider">
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
