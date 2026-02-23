"use client";

import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick";
import { getClientTestimonialsData } from "@/graphql/queries/getClientTestimonialsData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import SpotlightCard from "../atom/SpotlightCard";
import TechReveal from "../atom/TechReveal";

const NeuralParticles = dynamic(() => import("../atom/NeuralParticles"), { ssr: false });

export type Testimonial = {
    quote: { children: { text: string }[] }[];
    author_name: string;
    author_position: string;
    rating: string;
};

type Data = {
    Title: string;
    Item: Testimonial[];
};

export default function ClientTestimonials() {
    const sliderRef = useRef<Slider | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [data, setData] = useState<Data | null>(null);

    const getRatingNumber = (rating: string): number => {
        const match = rating.match(/star(\d)/);
        return match ? parseInt(match[1]) : 0;
    };

    useEffect(() => {
        async function fetchData() {
            const response = await getClientTestimonialsData();
            setData(response);
        }
        fetchData();
    }, []);

    const totalSlides = data?.Item.length ?? 1;

    if (!data) {
        return null;
    }

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
                breakpoint: 1023,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: false,
                    beforeChange: (_: number, next: number) => setCurrentSlide(next),
                },
            },
        ],
    };

    return (
        <motion.section
            className="bg-[#0F0F0F] text-white my-[80px] lg:my-[100px] 2xl:my-[200px] textimonials-slider relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Neural network background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <NeuralParticles count={30} color="100, 130, 255" lineColor="80, 100, 255" connectDistance={130} />
            </div>

            {/* Scanning beam — AI theme signature */}
            <motion.div
                className="absolute left-0 right-0 h-[1.5px] z-10 pointer-events-none opacity-40"
                style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(60,76,255,1) 50%, transparent 100%)",
                }}
                animate={{ y: ["0%", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />

            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 items-start">
                    {/* Title & Arrows */}
                    <div className="col-span-1 mb-6 lg:mb-0">
                        <div className="flex items-center gap-3">
                            <motion.span
                                className="inline-block w-[10px] h-[10px] rounded-full bg-[#3C4CFF] shrink-0"
                                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.h2
                                className="w-full lg:w-fit border-after m-0"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                            >
                                <TechReveal text={data?.Title || ""} duration={1.2} />
                            </motion.h2>
                        </div>

                        {/* Arrow Buttons */}
                        <div className="hidden lg:flex gap-[10px] mt-[82px] xl:mt-[60px]">
                            {/* Previous */}
                            <button
                                aria-label="Previous"
                                onClick={() => sliderRef.current?.slickPrev()}
                                className="2xl:w-[70px] 2xl:h-[70px] w-[45px] h-[45px] bg-[#2E2E2E] rounded-[10px] flex items-center justify-center p-[10px] cursor-pointer transition-all duration-400 hover:bg-[#201f1f]"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="70"
                                    height="70"
                                    viewBox="0 0 70 70"
                                    fill="none"
                                    className="block"
                                >
                                    <path
                                        d="M60 35H10M10 35L20 25M10 35L20 45"
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
                                className="2xl:w-[70px] 2xl:h-[70px] w-[45px] h-[45px] bg-[#2E2E2E] rounded-[10px] flex items-center justify-center p-[10px] cursor-pointer transition-all duration-400 hover:bg-[#201f1f]"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="70"
                                    height="70"
                                    viewBox="0 0 70 70"
                                    fill="none"
                                    className="block"
                                >
                                    <path
                                        d="M10 35H60M60 35L50 25M60 35L50 45"
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
                            {data?.Item.map((testimonial, index) => {
                                const isFirstVisible = currentSlide === index;
                                return (
                                    <div
                                        key={index}
                                        className={`xl:px-[12px] px-[6px] ${
                                            isFirstVisible ? "max-[1023px]:mr-[16px] lg:ml-0" : ""
                                        } h-full py-4`}
                                    >
                                        <SpotlightCard className="h-full">
                                            <div className="xl:px-[20px] xl:py-[30px] 2xl:px-[40px] 2xl:py-[30px] p-[24px] h-full min-h-[240px] flex flex-col justify-between">
                                                <div>
                                                    <div className="flex mb-[30px]">
                                                        {Array.from({
                                                            length: getRatingNumber(testimonial.rating),
                                                        }).map((_, i) => (
                                                            <FaStar
                                                                key={i}
                                                                className="text-[#FFA800] 2xl:text-[35px] xl:text-[30px] text-[24px] 2xl:mr-[15px] mr-[10px]"
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="2xl:!text-[30px] !text-[18px] font-[400] text-white xl:mb-[30px] mb-[24px]">
                                                        {testimonial.quote?.[0]?.children?.[0]?.text || ""}
                                                    </p>
                                                </div>
                                                <div className="mt-auto">
                                                    <p className="2xl:!text-[18px] md:!text-[15px] !text-[12px] mb-[5px] font-[400] text-[#3C4CFF]">
                                                        {testimonial.author_position}
                                                    </p>
                                                    <p className="2xl:!text-[22px] md:!text-[18px] !text-[14px] font-[600]">
                                                        {testimonial.author_name}
                                                    </p>
                                                </div>
                                            </div>
                                        </SpotlightCard>
                                    </div>
                                );
                            })}
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
            </div>
        </motion.section>
    );
}
