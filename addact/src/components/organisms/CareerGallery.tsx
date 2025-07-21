"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { getCareerGalleryData } from "@/graphql/queries/getCareerGallery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    const [filteredImages, setFilteredImages] = useState<GalleryImageItem[][]>([]);

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

        const chunked = chunkArray(allImages, 9); // 3x3
        setFilteredImages(chunked);
    }, [categories, activeCategory, selectedYear]);

    const allYears = Array.from(
        new Set(categories.flatMap((cat) => cat.Images.map((img) => img.Year || currentYear)))
    ).sort((a, b) => b - a);

    return (
        <section className="max-w-screen-xl mx-auto px-4 py-10">
            <p className="text-[#3C4CFF] mb-[10px] md:mb-[15px] leading-[26px] font-[500] text-center">{subtitle}</p>
            <h2 className="text-[#000] !font-[400] 2xl:mb-[60px] md:mb-[40px] !text-[35px] md:!text-[45px] text-center">
                {title}
            </h2>

            <div className="flex gap-6">
                {/* LEFT CATEGORY */}
                <aside className="w-1/4">
                    <ul className="space-y-2">
                        <li
                            onClick={() => setActiveCategory("Addact")}
                            className={`cursor-pointer ${
                                activeCategory === "Addact" ? "text-blue-600 font-bold" : "text-black"
                            }`}
                        >
                            Addact
                        </li>
                        {categories.map((cat, idx) => (
                            <li
                                key={idx}
                                onClick={() => setActiveCategory(cat.Name)}
                                className={`cursor-pointer ${
                                    activeCategory === cat.Name ? "text-blue-600 font-bold" : "text-black"
                                }`}
                            >
                                {cat.Name}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* RIGHT CONTENT */}
                <div className="w-3/4 relative">
                    {/* Top Filter + Arrows */}
                    <div className="flex justify-between items-center mb-4">
                        {/* Left: Year Filter */}
                        <select
                            className="border border-blue-600 rounded px-4 py-1 text-sm text-blue-600 font-semibold bg-white"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            <option value="All">All</option>
                            {allYears.map((year, idx) => (
                                <option key={idx} value={String(year)}>
                                    {year}
                                </option>
                            ))}
                        </select>

                        {/* Right: Arrows */}
                        <div className="flex gap-3">
                            {/* Left Arrow */}
                            <button
                                onClick={() => sliderRef.current?.slickPrev()}
                                className="w-10 h-10 border-1 border-blue-600 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    height="20"
                                    viewBox="0 0 10 20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="8 2 2 10 8 18" />
                                </svg>
                            </button>

                            {/* Right Arrow */}
                            <button
                                onClick={() => sliderRef.current?.slickNext()}
                                className="w-10 h-10 border-1 border-blue-600 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    height="20"
                                    viewBox="0 0 10 20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="2 2 8 10 2 18" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Slider */}
                    {filteredImages.length > 0 ? (
                        <Slider ref={sliderRef} {...settings}>
                            {filteredImages.map((group, idx) => (
                                <div key={idx}>
                                    <div className="grid grid-cols-3 gap-4">
                                        {group.map((imgObj, i) => {
                                            const isCenter = i % 3 === 1;
                                            return (
                                                <div
                                                    key={i}
                                                    className={`rounded overflow-hidden shadow hover:shadow-md hover:border hover:border-blue-500 transition ${
                                                        isCenter ? "w-[85%] mx-auto" : ""
                                                    }`}
                                                >
                                                    <Image
                                                        src={imgObj.Image.url}
                                                        alt={imgObj.Image.alternativeText || ""}
                                                        width={400}
                                                        height={300}
                                                        className="w-full h-56 object-cover"
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <p className="text-gray-500">No images found.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CareerGallery;
