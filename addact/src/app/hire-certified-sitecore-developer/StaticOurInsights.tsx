"use client";

import Image from "next/image";
import Link from "next/link";
import { RightArrowUpIcon } from "../../components/atom/icons";

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

export default function StaticOurInsights() {
    const items: InsightCardData[] = [
        {
            type: "Case study",
            title: "Modernizing a Legacy Site with Sitecore XM Cloud",
            date: "15 July 2025",
            image: {
                url: "https://d3l7d9gtq0bnch.cloudfront.net/modernizing_a_legacy_site_with_sitecore_xm_cloud_ADDACT_74617260d0.webp",
                width: 800,
                height: 500,
                name: "Modernizing a Legacy Site with Sitecore XM Cloud",
            },
            description:
                "Migration of a Legacy Website to a Secure, Headless Architecture on Sitecore XM Cloud. We Overcame Challenges of Building a Decoupled Backend, Enabling Dynamic Content Management",
            link: "/portfolio/Modernizing-a-Legacy-Site-with-Sitecore-XM-Cloud",
        },
        {
            type: "Case study",
            title: "Sitecore OrderCloud Implementation Case Study",
            date: "11 July 2025",
            image: {
                url: "https://d3l7d9gtq0bnch.cloudfront.net/work_details_banner_ordercloud_95be621c4d.webp",
                width: 800,
                height: 500,
                name: "Sitecore OrderCloud Implementation Case Study",
            },
            description:
                "Our client is the Government body of Singapore acting as a mediator between the hospitals and the suppliers of healthcare and medical products to provide subsidized products to the hospitals and to the patients.",
            link: "/portfolio/sitecore-ordercloud-implementation",
        },
        {
            type: "Case study",
            title: "Sitecore Upgradation Case Study",
            date: "11 July 2025",
            image: {
                url: "https://d3l7d9gtq0bnch.cloudfront.net/work_details_banner_upgrade_572ff58bd5.webp",
                width: 800,
                height: 500,
                name: "Sitecore Upgradation Case Study",
            },
            description:
                "Our client is an organization with an independent publishing and media business with brands for creating high quality books, magazines, websites and content across platforms along with a wine tasting business for reviews and ratings.",
            link: "/portfolio/sitecore-upgradation",
        },
    ];

    return (
        <section className="my-[60px] xl:mt-[100px] 2xl:mt-[200px] mb-[100px]">
            <div className="container mx-auto px-4">
                <h2 className="border-after !text-[28px] md:!text-[40px] 2xl:!text-[60px] !pb-4 xl:!pb-10">
                    Our Insights
                </h2>

                <div className="grid gap-6 mt-10 sm:mt-14 lg:mt-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-[45%_55%] 2xl:grid-cols-[40.67%_59.33%]">
                    <InsightCard item={items[0]} big />
                    <div className="flex flex-col gap-4">
                        <div className="hidden lg:block">
                            <InsightCard item={items[1]} />
                        </div>
                        <InsightCard item={items[2]} />
                    </div>
                </div>
            </div>
        </section>
    );
}

function InsightCard({ item, big = false }: InsightCardProps) {
    return (
        <div
            className={`border border-gray-700 p-[10px] md:p-7 relative ${
                big ? "flex flex-col h-full" : "flex flex-col lg:flex-row gap-7 flex-1"
            }`}
        >
            {/* Image */}
            <div
                className={`bg-gray-300 rounded overflow-hidden ${
                    big ? "w-full mb-7" : "w-full xl:max-w-[250px] 2xl:max-w-[320px]"
                }`}
            >
                {item.image?.url && (
                    <Image
                        src={item.image.url}
                        alt={item.image.alternativeText || item.image.name}
                        width={item.image.width}
                        height={item.image.height}
                        className="w-full h-full object-cover rounded"
                    />
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 justify-center">
                <span className="px-5 py-2 bg-[#3C4CFF] md:bg-[#3f4040] border border-[#3C4CFF] text-white rounded-lg w-fit text-[12px] md:text-[14px] font-medium mb-[12px] md:mb-[20px]">
                    {item.type}
                </span>
                <h4 className="!text-[18px] !leading-[30px] md:!text-[22px] 2xl:!text-3xl font-medium mb-4 md:leading-tight line-clamp-3">
                    {item.title}
                </h4>
                {item.date !== "Unknown Date" && (
                    <p className="!text-[12px] md:text-[16px] text-white mb-4">{item.date}</p>
                )}
            </div>

            {/* Arrow link */}
            <div className="mt-auto self-end">
                <Link href={item.link} target="_self">
                    <div className="group w-[40px] h-[40px] md:w-14 md:h-14 bg-[#3C4CFF] text-white flex items-center justify-center absolute bottom-0 right-0 transition-all duration-300 hover:w-16 hover:h-16 p-[6px] md:p-[0]">
                        <RightArrowUpIcon className="transition-transform duration-300 group-hover:scale-110" />
                    </div>
                </Link>
            </div>
        </div>
    );
}
