"use client";

import {
  getOurInsights,
  getHomeOurInsightsTitle,
  type HomeResponse,
} from "@/graphql/queries/getOurInsights";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import RichText from "../atom/richText";

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
  readTime: string;
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
}

export default function OurInsights() {
  const [data, setData] = useState<OurInsightsData | null>(null);
  const [homeData, setHomeData] = useState<HomeResponse | null>(null);
  useEffect(() => {
    (async () => {
      const result = await getOurInsights();
      setData(result);
      const homeResult = await getHomeOurInsightsTitle();
      setHomeData(homeResult);
    })();
  }, []);

  if (!data) return null;

  const sortedBlogs = [...data.addactBlogs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const sortedCaseStudies = [...data.addactCaseStudies].sort(
    (a, b) =>
      new Date(b.HeroBanner?.[0]?.PublishDate || "").getTime() -
      new Date(a.HeroBanner?.[0]?.PublishDate || "").getTime(),
  );

  const blog1 = sortedBlogs[0];
  const blog2 = sortedBlogs[1];
  const caseStudy = sortedCaseStudies[0];

  const items: InsightCardData[] = [
    mapBlogToCard(blog1),
    mapBlogToCard(blog2),
    mapCaseStudyToCard(caseStudy),
  ];

  const titleData = homeData?.home?.ourInshightsTitle?.CommonTitle?.[0];
  return (
    <section className="py-10 md:py-20 xl:py-[80px] bg-white">
      <div className="container-main mx-auto px-4">
        <h2 className="text-[#0F0F0F] font-montserrat font-semibold! text-[28px] md:text-[40px] 2xl:text-[60px] leading-[40px] md:leading-[60px] 2xl:leading-[85px] pb-4 xl:pb-10">
          {titleData?.Title || "Our Insights"}
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 mt-4 md:mt-6 xl:mt-8">
          <div className="text-[#0F0F0F] font-montserrat [&_p]:text-sm [&_p]:sm:text-base [&_p]:md:text-lg [&_p]:xl:text-xl! [&_p]:2xl:text-2xl! max-w-full md:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl leading-7! xl:leading-9! 2xl:leading-10!">
            <RichText html={titleData?.Description || ""} />
          </div>
          <Link
            href={titleData?.Link?.href || ""}
            target={titleData?.Link?.target === "blank" ? "_blank" : "_self"}
            aria-label={titleData?.Link?.label || "See more Blogs"}
            className="px-4 py-2.5 sm:px-5 sm:py-3 md:py-4 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-1 -outline-offset-1 outline-[#3C4CFF] inline-flex justify-center items-center gap-2 sm:gap-3 md:gap-4 xl:gap-5 overflow-hidden hover:bg-[#3C4CFF] transition-colors flex-shrink-0 group"
          >
            <span className="text-[#3C4CFF] text-sm sm:text-base md:text-lg font-semibold font-montserrat leading-5 sm:leading-6 md:leading-7 whitespace-nowrap group-hover:text-white">
              {titleData?.Link?.label || ""}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 sm:w-5 sm:h-5 text-[#3C4CFF] group-hover:text-white transition-colors"
            >
              <path
                d="M4.16699 10H15.8337M15.8337 10L10.0003 4.16669M15.8337 10L10.0003 15.8334"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="flex flex-wrap gap-5 mt-10 sm:mt-14 lg:mt-24">
          {items.map((item, index) => (
            <InsightCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
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
    readTime: "5 min read",
    image: banner?.BannerImage,
    description: banner?.BannerDescription ?? "",
    link: "/blogs" + blog.Slug || "/blogs" + banner?.ReadNow?.href,
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
    readTime: "3 min read",
    image: banner?.BannerImage,
    description: banner?.BannerDescription ?? "",
    link: "/portfolio" + cs.Slug,
  };
}

function InsightCard({ item }: InsightCardProps) {
  return (
    <Link
      href={item.link}
      target="_self"
      className="flex-1 min-w-[250px] max-w-full md:max-w-[calc(33.333%-14px)]"
    >
      <div className="border border-[#c5c5c5] rounded-[10px] flex flex-col h-full overflow-hidden">
        <div className="w-full aspect-[520/321] overflow-hidden">
          {item.image?.url && (
            <Image
              src={item.image.url}
              alt={item.image.alternativeText || item.image.name}
              width={520}
              height={321}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="px-5 py-[30px]">
          <div className="inline-flex justify-center items-center h-10 px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-1 -outline-offset-1 outline-indigo-600 mb-5">
            <span className="text-stone-950 text-sm font-medium font-montserrat leading-6">
              {item.type}
            </span>
          </div>

          <p className="text-stone-950 text-lg sm:text-xl lg:text-2xl! xl:text-3xl! font-medium! font-montserrat leading-7 sm:leading-8 md:leading-9 lg:leading-[48px] mb-3 md:mb-4 line-clamp-2">
            {item.title}
          </p>

          {item.date !== "Unknown Date" && (
            <div className="flex items-center gap-2">
              <p className="text-stone-950 text-base font-medium font-montserrat mb-0!">
                {item.date}
              </p>
              <span className="text-stone-950 text-base font-medium font-montserrat">•</span>
              <p className="text-stone-950 text-base font-medium font-montserrat">
                {item.readTime}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
