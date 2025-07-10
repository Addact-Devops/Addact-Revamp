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
    numberContent: NumberItem[];
};

const WeAreAddact: React.FC<Props> = ({ subtitle, title, content, image, numberContent }) => {
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
                if (current >= num) {
                    current = num;
                    clearInterval(interval);
                }
                setCounts((prev) => {
                    const updated = [...prev];
                    updated[index] = current;
                    return updated;
                });
            }, 20);
        });
    };

    return (
        <section ref={sectionRef} className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    {/* Left Side Image */}
                    <div className="w-full md:w-1/2">
                        <img
                            src={image.url}
                            alt={image.alternativeText || "We Are Addact"}
                            width={image.width}
                            height={image.height}
                            className="rounded-2xl w-full h-auto object-cover"
                        />
                    </div>

                    {/* Right Side Content */}
                    <div className="w-full md:w-1/2">
                        <p className="text-[#E15D64] text-sm font-semibold mb-2">{subtitle}</p>
                        <h2 className="text-4xl font-bold text-black mb-4">{title}</h2>

                        <div className="text-base text-black leading-relaxed space-y-4 mb-8">
                            {content?.map((block, index) => (
                                <p key={index}>
                                    {block.children?.map((child, childIndex) => (
                                        <span key={childIndex}>{child.text}</span>
                                    ))}
                                </p>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-8 mt-4">
                            {numberContent.map((item, index) => (
                                <div key={index}>
                                    <h3 className="text-4xl font-semibold text-[#E15D64] mb-1">{counts[index]}+</h3>
                                    <p className="text-sm text-black leading-snug whitespace-pre-line">
                                        {item.Content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WeAreAddact;
