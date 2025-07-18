"use client";

import { getOurInsights } from "@/graphql/queries/getOurInsights";
import Image from "next/image";
import Link from "next/link";
import { RightArrowUpIcon } from "../atom/icons";
import { useEffect, useState } from "react";

export interface BlogBanner {
    PublishDate?: string;
    BannerTitle?: string;
    BannerDescription?: string;
    BannerImage?: {
        url: string;
        width: number;
        height: number;
        name: string;
        alternativeText?: string | null;
    };
    ReadNow?: {
        href: string;
        label: string;
        target: string;
        isExternal: boolean;
    };
}

export interface Blog {
    Slug: string;
    createdAt: string;
    HeadingSection?: { PageTitle?: string }[];
    BlogBanner?: BlogBanner[];
}

export interface CaseStudy {
    Slug?: string;
    HeroBanner?: BlogBanner[];
}

interface OurInsightsData {
    addactBlogs: Blog[];
    addactCaseStudies: CaseStudy[];
}

interface InsightCardData {
    type: "Blog" | "Case study";
    title: string;
    date: string;
    image?: {
        url: string;
        width: number;
        height: number;
        name: string;
        alternativeText?: string | null;
    };
    description: string;
    link: string;
}

interface InsightCardProps {
    item: InsightCardData;
    big?: boolean;
}

export default function OurInsights() {
    const [data, setData] = useState<OurInsightsData | null>(null);

    useEffect(() => {
        (async () => {
            const result = await getOurInsights();
            setData(result);
        })();
    }, []);

    if (!data) return null;

    const sortedBlogs = [...data.addactBlogs].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const sortedCaseStudies = [...data.addactCaseStudies].sort(
        (a, b) =>
            new Date(b.HeroBanner?.[0]?.PublishDate || "").getTime() -
            new Date(a.HeroBanner?.[0]?.PublishDate || "").getTime()
    );

    const blog1 = sortedBlogs[0];
    const blog2 = sortedBlogs[1];
    const caseStudy = sortedCaseStudies[0];

    const items: InsightCardData[] = [mapBlogToCard(blog1), mapBlogToCard(blog2), mapCaseStudyToCard(caseStudy)];

    return (
        <div className='my-28 lg:my-48 xl:my-60'>
            <div className='container mx-auto px-4'>
                <h2 className='border-after !text-[28px] md:!text-5xl xl:!text-6xl !pb-4 xl:!pb-10'>Our Insights</h2>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10 sm:mt-14 lg:mt-24'>
                    <InsightCard item={items[0]} big />
                    <div className='flex flex-col gap-4'>
                        <InsightCard item={items[1]} />
                        <InsightCard item={items[2]} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function mapBlogToCard(blog: Blog): InsightCardData {
    const banner = blog.BlogBanner?.[0];
    return {
        type: "Blog",
        title: blog.HeadingSection?.[0]?.PageTitle ?? "Untitled",
        date: banner?.PublishDate
            ? new Date(banner.PublishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
              })
            : "Unknown Date",
        image: banner?.BannerImage,
        description: banner?.BannerDescription ?? "",
        link: "/blog" + blog.Slug || "/blog" + banner?.ReadNow?.href,
    };
}

function mapCaseStudyToCard(cs: CaseStudy): InsightCardData {
    const banner = cs.HeroBanner?.[0];
    return {
        type: "Case study",
        title: banner?.BannerTitle ?? "Untitled",
        date: banner?.PublishDate
            ? new Date(banner.PublishDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
              })
            : "Unknown Date",
        image: banner?.BannerImage,
        description: banner?.BannerDescription ?? "",
        link: "/portfolio" + banner?.ReadNow?.href || "portfolio" + cs.Slug,
    };
}

function InsightCard({ item, big = false }: InsightCardProps) {
    return (
        <div
            className={`border border-gray-700 p-7 relative ${
                big ? "flex flex-col h-full" : "flex flex-col lg:flex-row gap-7 flex-1"
            }`}
        >
            <div
                className={`bg-gray-300 rounded overflow-hidden ${
                    big
                        ? "w-full mb-7 max-h-[350px]"
                        : "w-full max-w-full lg:max-w-[280px] aspect-[320/244] max-h-[244px]"
                }`}
            >
                {item.image?.url && (
                    <Image
                        src={item.image?.url}
                        alt={item.image.alternativeText || item.image.name}
                        width={item.image.width}
                        height={item.image.height}
                        className='w-full h-full object-cover rounded'
                    />
                )}
            </div>

            <div className='flex flex-col flex-1 justify-center'>
                <span className='px-5 py-2 bg-[#FFFFFF33] border border-blue-500 text-white rounded-lg w-fit text-sm mb-2 font-medium'>
                    {item.type}
                </span>
                <h4 className='md:!text-3xl font-medium mb-4 leading-tight line-clamp-2'>{item.title}</h4>
                <p className='text-base text-white mb-4'>{item.date}</p>
            </div>

            <div className='mt-auto self-end'>
                <Link href={item?.link} target='_blank'>
                    <div className='group w-14 h-14 bg-blue-600 text-white flex items-center justify-center absolute bottom-0 right-0 transition-all duration-300 hover:w-16 hover:h-16'>
                        <RightArrowUpIcon className='transition-transform duration-300 group-hover:scale-110' />
                    </div>
                </Link>
            </div>
        </div>
    );
}
