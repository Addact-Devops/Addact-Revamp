"use client";

import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RichText from "../atom/richText";

type SolutionCard = {
    Title?: string | null;
    Description?: string | null; // HTML
};

type IndustrySolutionsWithAnimationData = {
    Title?: string | null;
    SolutionsCards?: SolutionCard[] | null;
};

type Props = {
    data?: IndustrySolutionsWithAnimationData | null;
};

const IndustrySolutionsWithAnimation: React.FC<Props> = ({ data }) => {
    const cards = Array.isArray(data?.SolutionsCards) ? data!.SolutionsCards! : [];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [animate, setAnimate] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        if (!("IntersectionObserver" in window)) {
            setAnimate(true);
            return;
        }

        const obs = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setAnimate(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
        );

        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const sliderSettings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (_: number, next: number) => setCurrentSlide(next),
    };

    const chunkArray = <T,>(arr: T[], size: number): T[][] => {
        const out: T[][] = [];
        for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
        return out;
    };

    const getIndicatorStyle = (totalSlides: number) => {
        const segmentWidth = 100 / (totalSlides || 1);
        return { width: `${segmentWidth}%`, left: `${currentSlide * segmentWidth}%` };
    };

    return (
        <section
            ref={sectionRef}
            className="my-[80px] lg:my-[100px] 2xl:my-[200px] solutionscards-wrapper overflow-hidden"
        >
            <div className="container">
                <div className="flex flex-col">
                    {/* Title */}
                    <h2 className="border-after !text-[28px] lg:!text-[38px] 2xl:!text-[64px] !pb-4 xl:!pb-10 xl:max-w-[60%] 2xl:max-w-[50%] mb-[55px] lg:mb-14 2xl:mb-24">
                        {data?.Title ?? "Our Solutions"}
                    </h2>

                    {/* Desktop grid with sequential opacity reveal */}
                    <div className="desktop-grid hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cards.map((card, idx) => (
                            <div
                                key={idx}
                                className={`group relative md:bg-[#1C1C1C] border-l-[3px] md:border-l-[5px] border-[#3C4CFF] sm:py-8 sm:px-8 px-[30px] py-[40px] ${
                                    animate ? "show" : ""
                                }`}
                                style={
                                    animate
                                        ? {
                                              transition: "opacity 500ms ease-out",
                                              transitionDelay: `${idx * 180}ms`, // ⚡ faster reveal
                                              willChange: "opacity",
                                          }
                                        : undefined
                                }
                            >
                                <h3 className="text-white !text-[20px] md:!text-[27px] 2xl:!text-[30px] mb-[30px]">
                                    {card?.Title ?? ""}
                                </h3>
                                <RichText html={card?.Description ?? ""} />
                            </div>
                        ))}
                    </div>

                    {/* Mobile slider unchanged */}
                    <div className="md:hidden">
                        <Slider {...sliderSettings}>
                            {chunkArray<SolutionCard>(cards, 2).map((group, i) => (
                                <div key={i} className="space-y-[16px]">
                                    {group.map((card, j) => (
                                        <div
                                            key={`${i}-${j}`}
                                            className="relative group bg-[#1C1C1C] pb-15 border-l-[3px] border-[#3C4CFF] p-[16px]"
                                        >
                                            <h3 className="text-white !text-[17px] md:!text-[30px] mb-3">
                                                {card?.Title ?? ""}
                                            </h3>
                                            <RichText html={card?.Description ?? ""} />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </Slider>

                        {/* Tiny progress indicator */}
                        <div className="relative mt-[40px] h-[4px] flex items-center justify-center">
                            {/* Center gray line */}
                            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#D9D9D9] -translate-y-1/2"></div>

                            {/* Blue indicator bar */}
                            <div
                                className="absolute top-0 left-0 h-[4px] bg-[#3C4CFF] transition-all duration-300"
                                style={getIndicatorStyle(Math.ceil(cards.length / 2) || 1)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scoped animation style */}
            <style jsx global>{`
                .solutionscards-wrapper .desktop-grid .group {
                    opacity: 0;
                }
                .solutionscards-wrapper .desktop-grid .group.show {
                    opacity: 1;
                }

                @media (prefers-reduced-motion: reduce) {
                    .solutionscards-wrapper .desktop-grid .group,
                    .solutionscards-wrapper .desktop-grid .group.show {
                        transition: none !important;
                        opacity: 1 !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default IndustrySolutionsWithAnimation;
