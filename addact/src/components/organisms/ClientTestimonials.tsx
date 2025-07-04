"use client";

import { useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export type Testimonial = {
    quote: { children: { text: string }[] }[];
    author_name: string;
    author_position: string;
    rating: string;
};

type Props = {
    data: {
        Title: string;
        Item: Testimonial[];
    } | null;
};

export default function ClientTestimonials({ data }: Props) {
    // if (!data) return null;

    const sliderRef = useRef<Slider | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = data?.Item.length ?? 1;

    const getRatingNumber = (rating: string): number => {
        const match = rating.match(/star(\d)/);
        return match ? parseInt(match[1]) : 0;
    };

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 600,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: (_: number, next: number) => setCurrentSlide(next),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1.1,
                    slidesToScroll: 1,
                    arrows: false,
                    beforeChange: (_: number, next: number) => setCurrentSlide(next),
                },
            },
        ],
    };

    return (
        <section className="bg-[#0F0F0F] text-white py-16 px-4 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 items-start mb-10">
                {/* Title & Arrows */}
                <div className="col-span-1 mb-6 lg:mb-0">
                    <h2 className="text-[36px] lg:text-[48px] font-semibold leading-tight">
                        Client <br /> Testimonials
                    </h2>
                    <div className="w-[60px] h-[3px] bg-[#2F3AF9] mt-3 mb-6" />

                    {/* Custom Arrow Buttons (only on desktop) */}
                    <div className="hidden lg:flex gap-4 mt-4">
                        {/* Prev */}
                        <button
                            aria-label="Previous"
                            onClick={() => sliderRef.current?.slickPrev()}
                            className="bg-[#2E2E2E] rounded-[6px] flex items-center justify-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                            >
                                <path
                                    d="M38 24H10M10 24L20 14M10 24L20 34"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>

                        {/* Next */}
                        <button
                            aria-label="Next"
                            onClick={() => sliderRef.current?.slickNext()}
                            className="bg-[#2E2E2E] rounded-[6px] flex items-center justify-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                            >
                                <path
                                    d="M10 24H38M38 24L28 14M38 24L28 34"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Slider */}
                <div className="col-span-2">
                    <Slider ref={sliderRef} {...settings}>
                        {data?.Item.map((testimonial, index) => (
                            <div key={index} className="px-4">
                                <div className="bg-[#1A1A1A] rounded-md p-6 h-full min-h-[240px] flex flex-col justify-between">
                                    <div>
                                        <div className="flex mb-4">
                                            {Array.from({ length: getRatingNumber(testimonial.rating) }).map((_, i) => (
                                                <FaStar key={i} className="text-yellow-400 text-xl mr-1" />
                                            ))}
                                        </div>
                                        <p className="text-[18px] font-normal leading-relaxed text-white mb-6">
                                            {testimonial.quote?.[0]?.children?.[0]?.text || ""}
                                        </p>
                                    </div>
                                    <div className="text-sm text-gray-400 mt-auto">
                                        <p className="font-medium">{testimonial.author_position}</p>
                                        <p>{testimonial.author_name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>

                    {/* Mobile Progress Bar */}
                    <div className="block lg:hidden mt-6 relative h-[2px] bg-[#303030]">
                        <div
                            className="absolute h-[2px] bg-[#2F3AF9] transition-all duration-300"
                            style={{
                                width: `${100 / totalSlides}%`,
                                left: `${(100 / totalSlides) * currentSlide}%`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
