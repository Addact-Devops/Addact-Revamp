"use client";

import { useEffect, useRef, useState } from "react";
import { FaStar, FaQuoteLeft, FaCheckCircle } from "react-icons/fa";
import Slider from "react-slick";
import { getClientTestimonialsData } from "@/graphql/queries/getClientTestimonialsData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import TechReveal from "../atom/TechReveal";
import SpotlightCard from "../atom/SpotlightCard";

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

    const totalSlides = data?.Item.length ?? 0;
    if (!data) return null;

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false, // Changed to false for horizontal "scroll" feel
        pauseOnHover: false,
        pauseOnFocus: false,
        cssEase: "cubic-bezier(0.23, 1, 0.32, 1)",
        beforeChange: (_: number, next: number) => setCurrentSlide(next),
    };

    return (
        <section className="bg-white py-[120px] lg:py-[200px] relative overflow-hidden testimonial-editorial">
            {/* Artistic Fluid Background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-50/50 pointer-events-none z-0" />
            <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="container relative z-10 px-4 md:px-12">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-16 lg:gap-24">
                    
                    {/* Left: Branding & Controls Cluster */}
                    <div className="w-full lg:w-[35%] flex flex-col gap-12">
                        <div className="relative">
                            <h2 className="text-[32px] md:text-[54px] 2xl:text-[72px] font-black text-black leading-[1.1] tracking-tighter mb-4 md:mb-6">
                                <TechReveal text={data.Title || "Impactful Partnerships"} duration={1} />
                            </h2>

                            <p className="text-zinc-500 text-sm md:text-lg max-w-sm font-medium leading-relaxed mb-8 md:mb-10">
                                Discover how we empower global brands through technical mastery and AI-driven solutions.
                            </p>

                            {/* High-End Navigation Block - Nested for alignment */}
                            <div className="hidden lg:flex flex-col gap-10">
                                <div className="flex items-center gap-6">
                                    <button
                                        onClick={() => sliderRef.current?.slickPrev()}
                                        className="w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-500 hover:scale-105"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => sliderRef.current?.slickNext()}
                                        className="w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-500 hover:scale-105"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19"/>
                                        </svg>
                                    </button>
                                </div>

                                {/* Digital Scrubber */}
                                <div className="flex flex-col gap-3 max-w-[200px]">
                                    <div className="flex justify-between items-end font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                                        <span>Progress</span>
                                        <span>{(currentSlide + 1).toString().padStart(2, '0')} / {totalSlides.toString().padStart(2, '0')}</span>
                                    </div>
                                    <div className="h-px w-full bg-zinc-100 relative">
                                        <motion.div 
                                            className="absolute top-0 left-0 h-full bg-brand-blue"
                                            animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                                            transition={{ duration: 0.8, ease: "circOut" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Immersive Bento Slider */}
                    <div className="w-full lg:w-[55%]">
                        <div className="relative">
                            <Slider ref={sliderRef} {...settings}>
                                {data.Item.map((item, idx) => (
                                    <div key={idx} className="outline-none py-6 px-2 lg:px-4">
                                        <SpotlightCard 
                                            className="rounded-[24px] md:rounded-[32px] p-6 md:p-10 lg:p-12 bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.05)] min-h-[350px] lg:min-h-[450px] flex flex-col justify-between"
                                            gridOpacity={0.03}
                                            spotlightColor="rgba(60, 76, 255, 0.05)"
                                        >
                                            <div className="flex flex-col h-full">
                                                {/* Card Header: Rating + Badge */}
                                                <div className="flex justify-between items-start mb-8 md:mb-10">
                                                    <div className="flex gap-1 px-2.5 py-1 md:px-3 md:py-1.5 bg-zinc-50 rounded-full border border-zinc-100">
                                                        {Array.from({ length: getRatingNumber(item.rating) }).map((_, i) => (
                                                            <FaStar key={i} className="text-[#FFA800] text-[10px] md:text-xs" />
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-emerald-100">
                                                        <FaCheckCircle className="text-[9px] md:text-[10px]" />
                                                        Verified
                                                    </div>
                                                </div>

                                                {/* Central Large Quote */}
                                                <AnimatePresence mode="wait">
                                                    <motion.div 
                                                        key={currentSlide}
                                                        initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                                                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                                        exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                                                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                                        className="grow"
                                                    >
                                                        <FaQuoteLeft className="text-brand-blue/10 text-[24px] md:text-[40px] mb-4 md:mb-6" />
                                                        <p className="text-[16px] md:text-[24px] 2xl:text-[28px] text-black font-semibold leading-snug md:leading-tight tracking-tight mb-6">
                                                            {item.quote?.[0]?.children?.[0]?.text}
                                                        </p>
                                                    </motion.div>
                                                </AnimatePresence>

                                                {/* Professional Signature */}
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-8 pt-8 border-t border-zinc-100">
                                                    <div className="relative group w-fit shrink-0">
                                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-zinc-950 flex items-center justify-center text-white font-black text-xl shadow-lg transition-transform duration-500 group-hover:scale-110">
                                                            {item.author_name.charAt(0)}
                                                        </div>
                                                        <motion.div 
                                                            className="absolute inset-0 rounded-full border-2 border-brand-blue/30 scale-125" 
                                                            animate={{ scale: [1.2, 1.4, 1.2], opacity: [0.5, 0, 0.5] }}
                                                            transition={{ duration: 3, repeat: Infinity }}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-1 overflow-hidden">
                                                        <h4 className="text-[14px] md:text-[18px] font-black text-black leading-tight tracking-tight uppercase wrap-break-word">
                                                            {item.author_name}
                                                        </h4>
                                                        <div className="flex items-center gap-2">
                                                            <div className="hidden sm:block w-2 md:w-3 h-px bg-brand-blue" />
                                                            <p className="text-brand-blue font-bold text-[8px] md:text-[10px] uppercase tracking-[0.2em] leading-relaxed">
                                                                {item.author_position}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SpotlightCard>
                                    </div>
                                ))}
                            </Slider>

                            {/* Mobile Controls */}
                            <div className="flex lg:hidden justify-center gap-4 mt-10">
                                <button
                                    onClick={() => sliderRef.current?.slickPrev()}
                                    className="w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center text-black"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
                                    </svg>
                                </button>
                                <button
                                    onClick={() => sliderRef.current?.slickNext()}
                                    className="w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center text-black"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
