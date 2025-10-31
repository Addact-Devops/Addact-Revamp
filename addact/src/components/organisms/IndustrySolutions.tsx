"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RichText from "../atom/richText";

type SolutionCard = {
    Title?: string | null;
    Description?: string | null; // HTML
};

type IndustrySolutionsData = {
    Title?: string | null;
    SolutionsCards?: SolutionCard[] | null;
};

type Props = {
    data?: IndustrySolutionsData | null;
};

const IndustrySolutions: React.FC<Props> = ({ data }) => {
    const cards = Array.isArray(data?.SolutionsCards) ? data!.SolutionsCards! : [];

    // mobile slider state
    const [currentSlide, setCurrentSlide] = useState(0);

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
        <section className="my-[80px] lg:my-[100px] 2xl:my-[200px] solutionscards-wrapper">
            <div className="container">
                <div className="flex flex-col">
                    {/* Title (same size treatment as reference) */}
                    <h2 className="border-after !text-[28px] lg:!text-[38px] 2xl:!text-[64px] !pb-4 xl:!pb-10 xl:max-w-[60%] 2xl:max-w-[50%] mb-[55px] lg:mb-14 2xl:mb-24">
                        {data?.Title ?? "Our Solutions"}
                    </h2>

                    {/* Desktop grid – 3 columns, same card UI */}
                    <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cards.map((card, idx) => (
                            <div
                                key={idx}
                                className="group relative md:bg-[#1C1C1C] border-l-[3px] md:border-l-[5px] border-[#3C4CFF] sm:py-8 sm:px-8 px-[30px] py-[40px]"
                            >
                                <h3 className="text-white !text-[20px] md:!text-[27px] 2xl:!text-[30px] mb-[30px]">
                                    {card?.Title ?? ""}
                                </h3>
                                <RichText html={card?.Description ?? ""} />
                            </div>
                        ))}
                    </div>

                    {/* Mobile slider – 2 stacked per slide (same pattern) */}
                    <div className="md:hidden">
                        <Slider {...sliderSettings}>
                            {chunkArray<SolutionCard>(cards, 2).map((group, i) => (
                                <div key={i} className="space-y-[16px]">
                                    {group.map((card, j) => (
                                        <div
                                            key={`${i}-${j}`}
                                            className="relative group bg-[#1C1C1C] pb-15 border-l-[3px] border-[#3C4CFF] p-[16px]"
                                        >
                                            <h3 className="text-white !text-[20px] md:!text-[30px] mb-3">
                                                {card?.Title ?? ""}
                                            </h3>
                                            <RichText html={card?.Description ?? ""} />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </Slider>

                        {/* Tiny progress indicator like reference */}
                        <div className="relative mt-[40px] h-[1px] bg-gray-600">
                            <div
                                className="absolute top-0 left-0 h-[2px] bg-[#3C4CFF] transition-all duration-300"
                                style={getIndicatorStyle(Math.ceil(cards.length / 2) || 1)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IndustrySolutions;
