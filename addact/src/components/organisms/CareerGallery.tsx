"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { getCareerGalleryData } from "@/graphql/queries/getCareerGallery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Lightbox imports
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

type GalleryImage = {
    url: string;
    alternativeText: string | null;
};

type GalleryImageItem = {
    Image: GalleryImage;
    Year: number | null;
};

type GalleryCategory = {
    Name: string;
    Images: GalleryImageItem[];
};

const currentYear = new Date().getFullYear();

const CareerGallery = () => {
    const [categories, setCategories] = useState<GalleryCategory[]>([]);
    const [activeCategory, setActiveCategory] = useState("Addact");
    const [selectedYear, setSelectedYear] = useState("All");
    const [title, setTitle] = useState("Life at Addact");
    const [subtitle, setSubtitle] = useState("Gallery");
    const [isYearOpen, setIsYearOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [filteredImages, setFilteredImages] = useState<GalleryImageItem[][]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [hoveredImage, setHoveredImage] = useState<number | null>(null);

    // Lightbox state
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const sliderRef = useRef<Slider>(null);
    const yearDropdownRef = useRef<HTMLDivElement>(null);
    const categoryDropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdowns on outside click
    const handleOutsideClick = useCallback((e: MouseEvent) => {
        if (yearDropdownRef.current && !yearDropdownRef.current.contains(e.target as Node)) {
            setIsYearOpen(false);
        }
        if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target as Node)) {
            setIsCategoryOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [handleOutsideClick]);

    const settings = {
        dots: false,
        infinite: false,
        speed: 600,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (index: number) => setCurrentSlide(index),
    };

    const chunkArray = (array: GalleryImageItem[], size: number) => {
        const chunked: GalleryImageItem[][] = [];
        for (let i = 0; i < array.length; i += size) {
            chunked.push(array.slice(i, i + size));
        }
        return chunked;
    };

    useEffect(() => {
        const fetchData = async () => {
            const { careers, galleryCategories } = await getCareerGalleryData();
            setCategories(galleryCategories || []);
            setTitle(careers?.Gallery?.[0]?.Title || "Life at Addact");
            setSubtitle(careers?.Gallery?.[0]?.SubTitle || "Gallery");
        };
        fetchData();
    }, []);

    useEffect(() => {
        let allImages: GalleryImageItem[] = [];

        if (activeCategory === "Addact") {
            categories.forEach((cat) => {
                allImages.push(...cat.Images);
            });
        } else {
            const selected = categories.find((cat) => cat.Name === activeCategory);
            if (selected) allImages = selected.Images;
        }

        if (selectedYear !== "All") {
            allImages = allImages.filter((img) => String(img.Year || currentYear) === selectedYear);
        }

        const chunked = chunkArray(allImages, 9);
        setFilteredImages(chunked);
    }, [categories, activeCategory, selectedYear]);

    const allYears = Array.from(
        new Set(categories.flatMap((cat) => cat.Images.map((img) => img.Year || currentYear)))
    ).sort((a, b) => b - a);

    const flattenedImages = filteredImages.flat();
    const slides = flattenedImages.map((img) => ({ src: img.Image.url }));

    const handleImageClick = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const allCategoryLabels = ["Addact", ...categories.map((c) => c.Name)];

    return (
        <section className="py-[60px] md:py-[100px] bg-white relative overflow-hidden" id="life-at-addact">
            {/* Subtle top divider */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#3C4CFF]/20 to-transparent" />

            {/* Background ambient blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#3C4CFF]/4 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#3C4CFF]/3 blur-[100px] pointer-events-none" />

            <div className="container relative z-10">

                {/* ────── Section Header ────── */}
                <div className="text-center mb-[50px] md:mb-[80px]">
                    <p className="text-[#3C4CFF] text-[20px] font-[600] leading-[26px] mb-3">
                        {subtitle}
                    </p>
                    <h2 className="text-[#000] font-[900] text-[33px] xl:text-[70px] 2xl:text-[100px] uppercase leading-none tracking-tight">
                        {title}
                    </h2>
                    {/* Decorative line */}
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#3C4CFF]/40" />
                        <div className="w-2 h-2 rounded-full bg-[#3C4CFF]" />
                        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#3C4CFF]/40" />
                    </div>
                </div>

                {/* ────── Main Layout: Sidebar + Gallery ────── */}
                <div className="flex flex-col md:flex-row gap-8 xl:gap-12">

                    {/* Desktop Sidebar */}
                    <aside className="hidden md:flex flex-col xl:min-w-[240px] 2xl:min-w-[300px]">
                        <div className="bg-[#f8f9ff] rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-[100px]">
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#888] mb-5">
                                Browse by
                            </p>
                            <ul className="space-y-1">
                                {allCategoryLabels.map((name, idx) => (
                                    <li
                                        key={idx}
                                        onClick={() => setActiveCategory(name)}
                                        className={`flex items-center gap-3 cursor-pointer px-4 py-3 rounded-xl text-[15px] xl:text-[16px] font-medium transition-all duration-200 ${
                                            activeCategory === name
                                                ? "bg-[#3C4CFF] text-white shadow-md shadow-[#3C4CFF]/25"
                                                : "text-[#444] hover:bg-white hover:text-[#3C4CFF] hover:shadow-sm"
                                        }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                            activeCategory === name ? "bg-white" : "bg-[#3C4CFF]/30"
                                        }`} />
                                        {name}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-5 border-t border-gray-200">
                                <p className="text-[12px] text-[#888]">
                                    <span className="text-[#3C4CFF] font-bold text-[16px]">{flattenedImages.length}</span>
                                    {" "}photos total
                                </p>
                            </div>
                        </div>
                    </aside>

                    {/* Gallery Area */}
                    <div className="flex-1 min-w-0">

                        {/* ── Top Controls Bar ── */}
                        <div className="flex items-center justify-between mb-6 gap-4">

                            {/* Mobile: Category + Year — Custom Dropdowns */}
                            <div className="md:hidden flex items-center gap-2 flex-1">

                                {/* Mobile Category Dropdown */}
                                <div ref={categoryDropdownRef} className="relative flex-1">
                                    <button
                                        onClick={() => { setIsCategoryOpen((p) => !p); setIsYearOpen(false); }}
                                        className="flex items-center justify-between w-full border border-[#3C4CFF]/30 rounded-xl px-4 py-2.5 text-[13px] text-[#3C4CFF] font-semibold bg-white transition-colors hover:bg-[#f0f2ff]"
                                    >
                                        <span className="truncate">{activeCategory}</span>
                                        <svg
                                            className={`w-3.5 h-3.5 ml-2 shrink-0 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`}
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {isCategoryOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
                                            <div className="max-h-[200px] overflow-y-auto py-1">
                                                {allCategoryLabels.map((name, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => { setActiveCategory(name); setIsCategoryOpen(false); }}
                                                        className={`w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors ${
                                                            activeCategory === name
                                                                ? "bg-[#3C4CFF] text-white"
                                                                : "text-[#333] hover:bg-[#f0f2ff] hover:text-[#3C4CFF]"
                                                        }`}
                                                    >
                                                        {name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Mobile Year Dropdown */}
                                <div ref={yearDropdownRef} className="relative flex-1">
                                    <button
                                        onClick={() => { setIsYearOpen((p) => !p); setIsCategoryOpen(false); }}
                                        className="flex items-center justify-between w-full border border-[#3C4CFF]/30 rounded-xl px-4 py-2.5 text-[13px] text-[#3C4CFF] font-semibold bg-white transition-colors hover:bg-[#f0f2ff]"
                                    >
                                        <span>{selectedYear === "All" ? "All Years" : selectedYear}</span>
                                        <svg
                                            className={`w-3.5 h-3.5 ml-2 shrink-0 transition-transform duration-200 ${isYearOpen ? "rotate-180" : ""}`}
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {isYearOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
                                            <div className="max-h-[200px] overflow-y-auto py-1">
                                                {["All", ...allYears.map(String)].map((yr, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => { setSelectedYear(yr); setIsYearOpen(false); }}
                                                        className={`w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors ${
                                                            selectedYear === yr
                                                                ? "bg-[#3C4CFF] text-white"
                                                                : "text-[#333] hover:bg-[#f0f2ff] hover:text-[#3C4CFF]"
                                                        }`}
                                                    >
                                                        {yr === "All" ? "All Years" : yr}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Desktop: Year filter — Custom Dropdown */}
                            <div className="hidden md:flex items-center gap-3">
                                <span className="text-[13px] text-[#888] font-medium">Filter by year:</span>
                                <div ref={yearDropdownRef} className="relative">
                                    <button
                                        onClick={() => setIsYearOpen((p) => !p)}
                                        className={`flex items-center gap-3 border rounded-xl px-4 py-2 text-[14px] font-semibold transition-all duration-200 ${
                                            isYearOpen
                                                ? "bg-[#3C4CFF] text-white border-[#3C4CFF]"
                                                : "border-[#3C4CFF]/30 text-[#3C4CFF] bg-white hover:border-[#3C4CFF] hover:bg-[#f0f2ff]"
                                        }`}
                                    >
                                        <span>{selectedYear === "All" ? "All Years" : selectedYear}</span>
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-200 ${isYearOpen ? "rotate-180" : ""}`}
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {isYearOpen && (
                                        <div className="absolute top-full left-0 mt-2 min-w-[140px] bg-white border border-gray-100 rounded-xl shadow-2xl shadow-black/10 z-50 overflow-hidden">
                                            <div className="py-1.5">
                                                {["All", ...allYears.map(String)].map((yr, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => { setSelectedYear(yr); setIsYearOpen(false); }}
                                                        className={`w-full text-left px-4 py-2.5 text-[14px] transition-colors flex items-center gap-2.5 ${
                                                            selectedYear === yr
                                                                ? "bg-[#3C4CFF]/8 text-[#3C4CFF] font-bold"
                                                                : "text-[#333] font-medium hover:bg-[#f8f9ff] hover:text-[#3C4CFF]"
                                                        }`}
                                                    >
                                                        {selectedYear === yr && (
                                                            <svg width="8" height="8" viewBox="0 0 8 8" fill="#3C4CFF">
                                                                <circle cx="4" cy="4" r="4" />
                                                            </svg>
                                                        )}
                                                        <span className={selectedYear === yr ? "" : "ml-[16px]"}>
                                                            {yr === "All" ? "All Years" : yr}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Slide Nav Arrows */}
                            <div className="flex items-center gap-2 ml-auto">
                                {filteredImages.length > 1 && (
                                    <span className="text-[12px] text-[#888] font-medium mr-1 hidden md:block">
                                        {currentSlide + 1} / {filteredImages.length}
                                    </span>
                                )}
                                <button
                                    onClick={() => sliderRef.current?.slickPrev()}
                                    disabled={currentSlide === 0}
                                    className={`w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                                        currentSlide === 0
                                            ? "border-gray-200 text-gray-300 cursor-not-allowed"
                                            : "border-[#3C4CFF]/40 text-[#3C4CFF] hover:bg-[#3C4CFF] hover:text-white hover:border-[#3C4CFF]"
                                    }`}
                                    aria-label="Previous slide"
                                >
                                    <svg width="10" height="16" viewBox="0 0 10 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="8 2 2 10 8 18" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => sliderRef.current?.slickNext()}
                                    disabled={currentSlide === filteredImages.length - 1 || filteredImages.length === 0}
                                    className={`w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-200 ${
                                        currentSlide === filteredImages.length - 1 || filteredImages.length === 0
                                            ? "border-gray-200 text-gray-300 cursor-not-allowed"
                                            : "border-[#3C4CFF]/40 text-[#3C4CFF] hover:bg-[#3C4CFF] hover:text-white hover:border-[#3C4CFF]"
                                    }`}
                                    aria-label="Next slide"
                                >
                                    <svg width="10" height="16" viewBox="0 0 10 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="2 2 8 10 2 18" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* ── Image Grid Slider ── */}
                        {filteredImages.length > 0 ? (
                            <Slider key={filteredImages.length} ref={sliderRef} {...settings} className="career-slider">
                                {filteredImages.map((group, groupIdx) => (
                                    <div key={groupIdx}>
                                        <div className="grid grid-cols-6 md:grid-cols-12 gap-[8px] md:gap-[10px] md:auto-rows-[200px]">
                                            {group.map((imgObj, i) => {
                                                const rowIndex = Math.floor(i / 3);
                                                const positionInRow = i % 3;

                                                let colSpanClass = "";
                                                if (rowIndex % 3 === 0) {
                                                    colSpanClass = positionInRow === 1
                                                        ? "md:col-span-6 col-span-3"
                                                        : "md:col-span-3 col-span-3";
                                                } else if (rowIndex % 3 === 1) {
                                                    colSpanClass = positionInRow === 0
                                                        ? "md:col-span-6 col-span-3"
                                                        : "md:col-span-3 col-span-3";
                                                } else {
                                                    colSpanClass = positionInRow === 1
                                                        ? "md:col-span-6 col-span-3"
                                                        : "md:col-span-3 col-span-3";
                                                }

                                                let flatIndex = 0;
                                                for (let j = 0; j < groupIdx; j++) {
                                                    flatIndex += filteredImages[j].length;
                                                }
                                                flatIndex += i;

                                                return (
                                                    <div
                                                        key={i}
                                                        className={`relative overflow-hidden rounded-xl md:rounded-2xl ${colSpanClass} h-[130px] md:h-auto cursor-pointer group/img`}
                                                        onClick={() => handleImageClick(flatIndex)}
                                                        onMouseEnter={() => setHoveredImage(flatIndex)}
                                                        onMouseLeave={() => setHoveredImage(null)}
                                                    >
                                                        <Image
                                                            src={imgObj.Image.url}
                                                            alt={imgObj.Image.alternativeText || ""}
                                                            width={800}
                                                            height={600}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                                                        />

                                                        {/* Overlay on hover */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-[#3C4CFF]/60 via-[#3C4CFF]/10 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-400" />

                                                        {/* Zoom icon */}
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                                                            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#3C4CFF]">
                                                                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                                                                    <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                                    <path d="M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                                </svg>
                                                            </div>
                                                        </div>

                                                        {/* Year badge */}
                                                        {imgObj.Year && (
                                                            <div className="absolute top-2 left-2 bg-white/90 text-[#3C4CFF] text-[10px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                                                                {imgObj.Year}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[300px] bg-[#f8f9ff] rounded-2xl border border-gray-100">
                                <div className="w-14 h-14 rounded-2xl bg-[#f0f2ff] flex items-center justify-center mb-4">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#3C4CFF]">
                                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2" />
                                        <path d="m21 15-5-5L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <p className="text-[#888] text-[15px]">No photos found for this selection.</p>
                            </div>
                        )}

                        {/* Dot pagination */}
                        {filteredImages.length > 1 && (
                            <div className="flex justify-center gap-2 mt-6">
                                {filteredImages.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => { sliderRef.current?.slickGoTo(idx); setCurrentSlide(idx); }}
                                        className={`rounded-full transition-all duration-300 ${
                                            currentSlide === idx
                                                ? "w-6 h-2 bg-[#3C4CFF]"
                                                : "w-2 h-2 bg-[#3C4CFF]/25 hover:bg-[#3C4CFF]/50"
                                        }`}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <Lightbox
                open={lightboxOpen}
                close={() => setLightboxOpen(false)}
                slides={slides}
                index={lightboxIndex}
                plugins={[Zoom]}
            />
        </section>
    );
};

export default CareerGallery;
