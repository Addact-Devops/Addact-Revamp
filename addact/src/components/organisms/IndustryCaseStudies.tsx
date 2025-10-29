"use client";

import React, { useMemo, useRef, useState, useCallback, useEffect } from "react";
// @ts-expect-error — CSS has no TS types
import "slick-carousel/slick/slick.css";
// @ts-expect-error — CSS has no TS types
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import { RightArrowUpIcon } from "../atom/icons";

type ImageType = {
    url?: string | null;
    alternativeText?: string | null;
    width?: number | null;
    height?: number | null;
};

type CaseItem = {
    Slug?: string | null;
    HeroBanner?: Array<{
        BannerTitle?: string | null;
        PublishDate?: string | null;
        BannerImage?: ImageType | null;
    }>;
};

type Props = {
    title?: string | null;
    items?: CaseItem[];
    limit?: number;
};

const formatDate = (iso?: string | null) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" });
};

const IndustryCaseStudies: React.FC<Props> = ({ title, items = [], limit = 8 }) => {
    if (!items || items.length === 0) return null;

    const sortedLimited = useMemo(() => {
        const sorted = [...items].sort((a, b) => {
            const da = a?.HeroBanner?.[0]?.PublishDate || "";
            const db = b?.HeroBanner?.[0]?.PublishDate || "";
            return (new Date(db).getTime() || 0) - (new Date(da).getTime() || 0);
        });
        return sorted.slice(0, limit);
    }, [items, limit]);

    const sliderRef = useRef<Slider | null>(null);

    // Swipe guard (block second-last -> last only)
    const [currentIndex, setCurrentIndex] = useState(0);
    const seeMoreIndex = sortedLimited.length;
    const secondLast = seeMoreIndex - 1;

    const startXRef = useRef<number | null>(null);
    const draggingRef = useRef(false);

    const onTouchStartCapture = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
        startXRef.current = e.touches[0].clientX;
        draggingRef.current = true;
    }, []);

    const onTouchMoveCapture = useCallback(
        (e: React.TouchEvent<HTMLDivElement>) => {
            if (!draggingRef.current || startXRef.current == null) return;
            const dx = e.touches[0].clientX - startXRef.current; // +ve = right, -ve = left
            if (currentIndex === secondLast && dx < -10) {
                e.preventDefault();
                e.stopPropagation();
                sliderRef.current?.slickGoTo(secondLast, true);
            }
        },
        [currentIndex, secondLast]
    );

    const onTouchEndCapture = useCallback(() => {
        draggingRef.current = false;
        startXRef.current = null;
    }, []);

    const onMouseDownCapture = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        startXRef.current = e.clientX;
        draggingRef.current = true;
    }, []);

    const onMouseMoveCapture = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!draggingRef.current || startXRef.current == null) return;
            const dx = e.clientX - startXRef.current;
            if (currentIndex === secondLast && dx < -5) {
                e.preventDefault();
                e.stopPropagation();
                sliderRef.current?.slickGoTo(secondLast, true);
            }
        },
        [currentIndex, secondLast]
    );

    const onMouseUpCapture = useCallback(() => {
        draggingRef.current = false;
        startXRef.current = null;
    }, []);

    // === Alignment with .container (uses your SCSS exactly) ===
    // We align the slider content to: container.left + computed padding-left
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [padLeft, setPadLeft] = useState<number>(0);

    useEffect(() => {
        const compute = () => {
            const el = containerRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const cs = window.getComputedStyle(el);
            const pl = parseFloat(cs.paddingLeft || "0"); // honors 16/30/25/50/20 per your SCSS
            // content start (title start) from viewport left:
            const contentStart = Math.max(0, Math.round(rect.left + pl));
            setPadLeft(contentStart);
        };

        compute();
        window.addEventListener("resize", compute);
        const t = setTimeout(compute, 100); // handle late font/layout shifts
        return () => {
            window.removeEventListener("resize", compute);
            clearTimeout(t);
        };
    }, []);

    const settings = useMemo(
        () => ({
            dots: true,
            arrows: false,
            infinite: false,
            speed: 500,
            cssEase: "ease",
            edgeFriction: 0,
            slidesToShow: 1.5,
            centerMode: true,
            centerPadding: "0",
            slidesToScroll: 1,
            beforeChange: (current: number, next: number) => {
                if (next >= seeMoreIndex) sliderRef.current?.slickGoTo(current, true);
            },
            afterChange: (current: number) => {
                setCurrentIndex(current);
                if (current >= seeMoreIndex) {
                    sliderRef.current?.slickGoTo(secondLast, true);
                    setCurrentIndex(secondLast);
                }
            },
            appendDots: (dots: React.ReactNode) => <ul style={{ marginTop: "24px" }}>{dots}</ul>,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: { slidesToShow: 1, centerMode: true, centerPadding: "0", slidesToScroll: 1 },
                },
                {
                    breakpoint: 640,
                    settings: { slidesToShow: 1, centerMode: false, centerPadding: "0", slidesToScroll: 1 },
                },
            ],
        }),
        [seeMoreIndex, secondLast]
    );

    return (
        <section className="my-[60px] xl:my-[100px] 2xl:my-[200px] item-slider-wrapper">
            <div className="overflow-hidden pb-[55px]">
                <div className="max-w-[1920px] m-auto">
                    <div className="container" ref={containerRef}>
                        <h2 className="border-after !text-[36px] xl:!text-[38px] 2xl:!text-[64px] !pb-4 xl:!pb-10 xl:max-w-[60%] 2xl:max-w-[50%] mb-6 sm:mb-8 md:mb-14 2xl:mb-24">
                            {title ?? "Project Highlights"}
                        </h2>
                    </div>

                    {/* Full-bleed wrapper; inner padding equals container content start */}
                    <div
                        className="relative left-1/2 right-1/2 w-screen -translate-x-1/2"
                        onTouchStartCapture={onTouchStartCapture}
                        onTouchMoveCapture={onTouchMoveCapture}
                        onTouchEndCapture={onTouchEndCapture}
                        onMouseDownCapture={onMouseDownCapture}
                        onMouseMoveCapture={onMouseMoveCapture}
                        onMouseUpCapture={onMouseUpCapture}
                        onMouseLeave={onMouseUpCapture}
                    >
                        <div style={{ paddingLeft: padLeft }}>
                            <Slider ref={sliderRef} {...(settings as any)}>
                                {sortedLimited.map((cs, idx) => {
                                    const hero = cs?.HeroBanner?.[0];
                                    const img = hero?.BannerImage;
                                    const dateText = formatDate(hero?.PublishDate);
                                    const theTitle = hero?.BannerTitle || "";
                                    const slug = cs?.Slug || "";
                                    const href = `/portfolio${slug?.startsWith("/") ? slug : `/${slug}`}`;

                                    return (
                                        <div key={`${slug || idx}`} className="px-[12px] h-full">
                                            <article className="group border border-[#ffffff33] overflow-hidden relative h-full flex min-h-[260px] md:min-h-[300px] 2xl:min-h-[340px]">
                                                <div className="flex p-[10px] md:p-[30px] gap-[30px] items-stretch w-full">
                                                    {img?.url ? (
                                                        <div className="relative w-[270px] min-w-[270px] h-[200px] 2xl:w-[320px] 2xl:min-w-[320px] 2xl:h-[244px] self-center">
                                                            <Image
                                                                src={img.url}
                                                                alt={img.alternativeText ?? theTitle}
                                                                fill
                                                                className="object-cover object-center"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="w-[270px] min-w-[270px] h-[200px] 2xl:w-[320px] 2xl:min-w-[320px] 2xl:h-[244px] bg-[#222] self-center" />
                                                    )}

                                                    <div>
                                                        <div className="text-[12px] md:text-[14px] leading-[24px] px-[20px] py-[8px] rounded-md bg-[#3F3F40] text-white border-1 border-[#3C4CFF] mb-[20px] w-fit">
                                                            Case study
                                                        </div>

                                                        <h3
                                                            className="text-white !text-[18px] md:!text-[22px] 2xl:!text-[30px] !leading-[38px] 2xl:!leading-[48px] mb-[16px] font-[500] line-clamp-2"
                                                            style={{
                                                                display: "-webkit-box",
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: "vertical",
                                                                overflow: "hidden",
                                                                textOverflow: "ellipsis",
                                                            }}
                                                        >
                                                            {theTitle}
                                                        </h3>

                                                        {dateText && (
                                                            <div className="text-white text-[13px] md:text-[16px] leading-[18px]">
                                                                {dateText}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <Link
                                                    href={href}
                                                    className="absolute bottom-0 right-0 w-14 h-14 bg-[#3C4CFF] text-white flex items-center justify-center"
                                                >
                                                    <RightArrowUpIcon />
                                                </Link>
                                            </article>
                                        </div>
                                    );
                                })}

                                {/* See More tile — still rendered, but never reachable as current */}
                                <div className="px-[12px] h-full">
                                    <div className="h-full">
                                        <Link
                                            href="/portfolio"
                                            className="h-full w-full max-w-[382px] hover:bg-[#3C4CFF] transition-colors text-white text-[22px] md:text-[28px] 2xl:text-[30px] font-[500] flex items-center justify-center mdmin-h-[260px] md:min-h-[300px] 2xl:min-h-[340px]"
                                            style={{ border: "1px solid rgb(255 255 255 / 20%)" }}
                                        >
                                            See More
                                        </Link>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>

                    <style jsx global>{`
                        .slick-dots li button:before {
                            color: #ffffff !important;
                            opacity: 0.35 !important;
                        }
                        .slick-dots li.slick-active button:before {
                            opacity: 1 !important;
                        }
                        /* Hide the dot for the last slide (See More) */
                        .item-slider-wrapper .slick-dots li:last-child {
                            display: none !important;
                        }
                    `}</style>
                </div>
            </div>
        </section>
    );
};

export default IndustryCaseStudies;
