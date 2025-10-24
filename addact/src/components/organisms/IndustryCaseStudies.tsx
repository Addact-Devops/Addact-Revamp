"use client";

import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";
import { RightArrowUpIcon } from "../atom/icons";
import { getAllCaseStudyData, IAllCaseStudy } from "@/graphql/queries/getAllCaseStudy";

type Props = {
    title?: string | null; // Section title from industry query
    limit?: number;
};

const formatDate = (iso?: string | null) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });
};

const IndustryCaseStudies: React.FC<Props> = ({ title, limit = 8 }) => {
    const [data, setData] = useState<IAllCaseStudy | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await getAllCaseStudyData();
                setData(res);
            } catch (e) {
                console.error("Failed to load case studies:", e);
            }
        })();
    }, []);

    const items = useMemo(() => {
        const raw = data?.addactCaseStudies ?? [];
        const sorted = [...raw].sort((a, b) => {
            const da = a?.HeroBanner?.[0]?.PublishDate || "";
            const db = b?.HeroBanner?.[0]?.PublishDate || "";
            return (new Date(db).getTime() || 0) - (new Date(da).getTime() || 0);
        });
        return sorted.slice(0, limit);
    }, [data, limit]);

    const settings = useMemo(
        () => ({
            dots: true,
            arrows: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            // give space for dots
            appendDots: (dots: React.ReactNode) => <ul style={{ marginTop: "24px" }}> {dots} </ul>,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        centerMode: true,
                        centerPadding: "12%",
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                        centerMode: false,
                        centerPadding: "0px",
                        slidesToScroll: 1,
                    },
                },
            ],
        }),
        []
    );

    if (!items.length) return null;

    return (
        <section className="my-[60px] xl:my-[100px] 2xl:my-[200px] pb-8 item-slider-wrapper">
            <div className="max-w-[1920px] m-auto">
                <div className="container">
                    <h2 className="border-after !text-[28px] md:!text-[40px] 2xl:!text-[60px] !pb-4 xl:!pb-10 xl:max-w-[40%] 2xl:max-w-[50%] mb-6 sm:mb-8 md:mb-14 2xl:mb-24">
                        {title ?? "Project Highlights"}
                    </h2>
                </div>

                <Slider {...(settings as any)}>
                    {items.map((cs) => {
                        const hero = cs?.HeroBanner?.[0];
                        const img = hero?.BannerImage;
                        const dateText = formatDate(hero?.PublishDate);
                        const theTitle = hero?.BannerTitle || cs?.ReferenceTitle || "";
                        const slug = cs?.Slug || "";
                        const href = `/portfolio${slug?.startsWith("/") ? slug : `/${slug}`}`;

                        return (
                            // make the slide itself full height
                            <div key={cs.documentId} className="px-[12px] h-full">
                                {/* make the card full height and stretch inner columns */}
                                <article className="group border border-[#ffffff33] overflow-hidden relative h-full flex">
                                    <div className="flex p-[10px] md:p-[30px] gap-[30px] items-stretch w-full">
                                        {/* Left image - fixed size to stabilize heights */}
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
                                            <div className="w-[290px] min-w-[290px] h-[200px] 2xl:w-[320px] 2xl:min-w-[320px] 2xl:h-[244px] bg-[#222] self-center" />
                                        )}

                                        {/* Right column - flex to fill, title block given min-height to equalize */}
                                        <div>
                                            <div className="text-[12px] md:text-[14px] leading-[24px] px-[20px] py-[8px] rounded-md bg-[#3F3F40] text-white border-1 border-[#3C4CFF] mb-[20px] w-fit">
                                                Case study
                                            </div>

                                            {/* min-h ensures cards stay equal even if titles vary */}
                                            <h3
                                                className="text-white !text-[18px] md:!text-[22px] 2xl:!text-[30px] !leading-[48px] mb-[16px] font-[500] line-clamp-2"
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

                                    {/* Corner CTA */}
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
                </Slider>

                {/* slick dots colors on dark bg */}
                <style jsx global>{`
                    .slick-dots li button:before {
                        color: #ffffff !important;
                        opacity: 0.35 !important;
                    }
                    .slick-dots li.slick-active button:before {
                        opacity: 1 !important;
                    }
                `}</style>
            </div>
        </section>
    );
};

export default IndustryCaseStudies;
