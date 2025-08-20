"use client";

import { useEffect, useState, useRef } from "react";
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
    const [isOpen, setIsOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [filteredImages, setFilteredImages] = useState<GalleryImageItem[][]>([]);

    // Lightbox state
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const sliderRef = useRef<Slider>(null);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
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

    // Flattened images array for lightbox slides
    const flattenedImages = filteredImages.flat();

    // Lightbox slides format
    const slides = flattenedImages.map((img) => ({ src: img.Image.url }));

    // Handler to open lightbox on image click
    const handleImageClick = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <section className='container mt-[60px] md:mt-[100px]' id='life-at-addxp'>
            <div className='text-[20px] text-[#3C4CFF] mb-[10px] md:mb-[23px] leading-[26px] font-[600] text-center'>
                {subtitle}
            </div>

            <div className='text-[#000] font-[900] 2xl:mb-[60px] md:mb-[40px] text-[33px] xl:text-[70px] 2xl:text-[100px] text-center uppercase'>
                {title}
            </div>

            <div className='flex flex-col md:flex-row gap-6'>
                <aside className='md:w-1/4 w-full hidden md:block md:border-r md:border-[#3C4CFF]'>
                    <ul className='space-y-[15px] 2xl:space-y-[40px] text-[17px] xl:text-[18px] 2xl:text-[20px] font-[500]'>
                        <li
                            onClick={() => setActiveCategory("Addact")}
                            className={`cursor-pointer ${
                                activeCategory === "Addact" ? "text-[#3C4CFF] font-bold" : "text-black"
                            }`}
                        >
                            Addact
                        </li>
                        {categories.map((cat, idx) => (
                            <li
                                key={idx}
                                onClick={() => setActiveCategory(cat.Name)}
                                className={`cursor-pointer ${
                                    activeCategory === cat.Name ? "text-[#3C4CFF] font-bold" : "text-black"
                                }`}
                            >
                                {cat.Name}
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className='md:w-3/4 w-full relative'>
                    {/* Top Filter Row */}
                    <div className='flex flex-col gap-4 md:flex-row md:justify-between items-center mb-[40px] mt-[40px] md:mt-0'>
                        {/* Mobile Combined Filters + Arrows */}
                        <div className='md:hidden flex items-center justify-between w-full gap-2'>
                            <div className='flex gap-[8px]'>
                                {/* Category Dropdown */}
                                <div className='relative w-1/2'>
                                    <select
                                        className='appearance-none border border-white rounded-[50px] px-4 py-2 pr-10 text-[12px] text-white font-semibold bg-[#3C4CFF] w-full'
                                        value={activeCategory}
                                        onChange={(e) => setActiveCategory(e.target.value)}
                                        onClick={() => setIsCategoryOpen((prev) => !prev)}
                                        onBlur={() => setTimeout(() => setIsCategoryOpen(false), 150)}
                                    >
                                        <option value='Addact' className='bg-[white] text-[#3C4CFF]'>
                                            Addact
                                        </option>
                                        {categories.map((cat, idx) => (
                                            <option key={idx} value={cat.Name} className='text-[#3C4CFF] bg-white'>
                                                {cat.Name}
                                            </option>
                                        ))}
                                    </select>
                                    <div
                                        className={`pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-white transition-transform duration-200 ${
                                            isCategoryOpen ? "rotate-180" : ""
                                        }`}
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='16'
                                            height='16'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
                                        </svg>
                                    </div>
                                </div>

                                {/* Year Dropdown */}
                                <div className='relative w-1/2'>
                                    <select
                                        className='appearance-none border border-[#3C4CFF] rounded-[50px] px-4 py-2 pr-10 text-[12px] md:text-[20px] text-white font-semibold bg-[#3C4CFF] w-full'
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        onClick={() => setIsOpen((prev) => !prev)}
                                        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
                                    >
                                        <option style={{ backgroundColor: "white", color: "#3C4CFF" }} value='All'>
                                            All
                                        </option>
                                        {allYears.map((year, idx) => (
                                            <option
                                                key={idx}
                                                value={String(year)}
                                                style={{ backgroundColor: "white", color: "#3C4CFF" }}
                                            >
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                    <div
                                        className={`pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-white transition-transform duration-200 ${
                                            isOpen ? "rotate-180" : ""
                                        }`}
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='16'
                                            height='16'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Arrows */}
                            <div className='flex gap-[8px] xl:gap-[12px]'>
                                <button
                                    onClick={() => sliderRef.current?.slickPrev()}
                                    className='w-[30px] xl:w-[48px] h-[30px] xl:h-[48px] border border-[#3C4CFF] rounded-full flex items-center justify-center text-[#3C4CFF] p-[11px] xl:p-0'
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='10'
                                        height='20'
                                        viewBox='0 0 10 20'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <polyline points='8 2 2 10 8 18' />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => sliderRef.current?.slickNext()}
                                    className='w-[30px] xl:w-[48px] h-[30px] xl:h-[48px] border border-[#3C4CFF] rounded-full flex items-center justify-center text-[#3C4CFF] p-[11px] xl:p-0'
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='10'
                                        height='20'
                                        viewBox='0 0 10 20'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <polyline points='2 2 8 10 2 18' />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Desktop Year Filter + Arrows */}
                        <div className='hidden md:flex justify-between items-center w-full'>
                            <div className='relative w-fit'>
                                <select
                                    className='appearance-none border border-[#3C4CFF] rounded-[50px] px-[10px] md:px-[20px] py-[7px] xl:py-[10px] text-[17px] xl:text-[20px] text-white font-[500] xl:font-[600] bg-[#3C4CFF] !pr-12'
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    onClick={() => setIsOpen((prev) => !prev)}
                                    onBlur={() => setTimeout(() => setIsOpen(false), 150)}
                                >
                                    <option style={{ backgroundColor: "white", color: "#3C4CFF" }} value='All'>
                                        All
                                    </option>
                                    {allYears.map((year, idx) => (
                                        <option
                                            key={idx}
                                            value={String(year)}
                                            style={{ backgroundColor: "white", color: "#3C4CFF" }}
                                        >
                                            {year}
                                        </option>
                                    ))}
                                </select>
                                <div
                                    className={`pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-white transition-transform duration-200 ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
                                    </svg>
                                </div>
                            </div>

                            <div className='flex gap-3'>
                                <button
                                    onClick={() => sliderRef.current?.slickPrev()}
                                    className='w-10 h-10 border border-[#3C4CFF] rounded-full flex items-center justify-center text-[#3C4CFF] hover:bg-[#3C4CFF] hover:text-white transition'
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='10'
                                        height='20'
                                        viewBox='0 0 10 20'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <polyline points='8 2 2 10 8 18' />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => sliderRef.current?.slickNext()}
                                    className='w-10 h-10 border border-[#3C4CFF] rounded-full flex items-center justify-center text-[#3C4CFF] hover:bg-[#3C4CFF] hover:text-white transition'
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='10'
                                        height='20'
                                        viewBox='0 0 10 20'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <polyline points='2 2 8 10 2 18' />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Slider */}
                    {filteredImages.length > 0 ? (
                        <Slider key={filteredImages.length} ref={sliderRef} {...settings} className='career-slider'>
                            {filteredImages.map((group, groupIdx) => (
                                <div key={groupIdx}>
                                    <div className='grid grid-cols-6 md:grid-cols-12 gap-[8px] md:gap-[12px] md:auto-rows-[200px]'>
                                        {group.map((imgObj, i) => {
                                            const rowIndex = Math.floor(i / 3);
                                            const positionInRow = i % 3;

                                            let colSpanClass = "";

                                            // Desktop stagger pattern
                                            if (rowIndex % 3 === 0) {
                                                colSpanClass =
                                                    positionInRow === 1
                                                        ? "md:col-span-6 col-span-3"
                                                        : "md:col-span-3 col-span-3";
                                            } else if (rowIndex % 3 === 1) {
                                                colSpanClass =
                                                    positionInRow === 0
                                                        ? "md:col-span-6 col-span-3"
                                                        : "md:col-span-3 col-span-3";
                                            } else {
                                                colSpanClass =
                                                    positionInRow === 1
                                                        ? "md:col-span-6 col-span-3"
                                                        : "md:col-span-3 col-span-3";
                                            }

                                            // Calculate flat index for lightbox
                                            // flat index = sum of all previous group lengths + i
                                            let flatIndex = 0;
                                            for (let j = 0; j < groupIdx; j++) {
                                                flatIndex += filteredImages[j].length;
                                            }
                                            flatIndex += i;

                                            return (
                                                <div
                                                    key={i}
                                                    className={`rounded-[8px] md:rounded-[20px] overflow-hidden shadow hover:shadow-md transition ${colSpanClass} h-[130px] md:h-auto cursor-pointer`}
                                                    onClick={() => handleImageClick(flatIndex)}
                                                >
                                                    <Image
                                                        src={imgObj.Image.url}
                                                        alt={imgObj.Image.alternativeText || ""}
                                                        width={800}
                                                        height={600}
                                                        className='w-full h-full object-cover'
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <p className='text-gray-500'>No images found.</p>
                    )}
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
