"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, CalendarDays } from "lucide-react";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";
import { WebinarDetailResponse } from "@/graphql/queries/getWebinarDetail";
import { getEventStatus } from "@/utils/getEventStatus";
import "../../../styles/components/caseStudy-detail.scss";
import Link from "next/link";

export default function WebinarDetailClient({ initialData }: { initialData: WebinarDetailResponse }) {
    const [webinarDetailData] = useState(initialData);

    if (!webinarDetailData) return <p className="p-6 text-red-600 mt-32">Event Details not found.</p>;

    const webinarData = webinarDetailData.addactWebinars[0].HeroBanner[0];
    const status = getEventStatus(webinarDetailData.addactWebinars[0].HeroBanner[0].PublishDate, "Webinar");

    return (
        <div className="flex flex-col pt-[60px] md:pt-[120px]">
            <section className="container relative w-full text-white overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 mx-auto py-[40px] md:py-24">
                    <div>
                        <span className="inline-block px-3 py-1 text-sm text-white bg-white/10 border border-white/20 rounded mb-3">
                            {status}
                        </span>
                        <h1 className="!text-3xl md:!text-5xl !font-bold mt-2">{webinarData.BannerTitle}</h1>
                        <p className="text-lg text-white/80 mb-6 mt-6">
                            {webinarDetailData.addactWebinars[0].HeroBanner[0].BannerDescription}!
                        </p>
                        <div className="flex items-center gap-2 mb-6">
                            <CalendarDays size={20} />
                            <p className="text-base font-medium">
                                {new Date(
                                    webinarDetailData.addactWebinars[0].HeroBanner[0].PublishDate
                                ).toLocaleDateString("en-US", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                        <Link
                            href={webinarDetailData.addactWebinars[0].HeroBanner[0].ReadNow.href}
                            className="flex items-center gap-2 w-44 bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-800 transition-colors"
                        >
                            Watch Now
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                    <div className="relative aspect-[16/9] md:aspect-auto w-full md:h-auto">
                        <Image
                            src={webinarData.BannerImage.url}
                            alt={webinarData.BannerImage.name}
                            width={webinarData.BannerImage.width}
                            height={webinarData.BannerImage.height}
                            className="object-cover rounded-lg"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-[#f4f4f4] pb-20">
                <div className="container">
                    <div className="mx-auto mt-[60px] xl:mt-24 text-black">
                        {/* <div className="lg:mr-36">
                            <div className="sticky top-[140px] w-full">
                                <div className="space-y-10">
                                    <div>
                                        <h2 className="!text-[28px] md:!text-[40px] 2xl:!text-[60px] !font-extrabold mb-6">
                                            Speaker
                                        </h2>
                                        {webinarDetailData?.addactWebinars[0]?.Speakers.map((speaker, index) => (
                                            <div key={index} className="flex items-center gap-4 mb-4">
                                                <Image
                                                    src={speaker?.Author?.AuthorImage?.url}
                                                    alt={speaker?.Author?.AuthorImage?.name}
                                                    width={80}
                                                    height={80}
                                                    className="rounded-lg p-1 object-cover"
                                                />
                                                <div>
                                                    <p className="!text-2xl !font-extrabold text-black leading-tight">
                                                        {speaker?.Author?.AuthorName.split("-")[0].trim()}
                                                    </p>
                                                    <p className="!text-sm text-blue-600 mt-1">
                                                        {speaker?.Author?.designation?.DesignationTitle}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <h2 className="!text-[28px] md:!text-[40px] 2xl:!text-[60px] !font-extrabold mb-6">
                                            Host
                                        </h2>
                                        {webinarDetailData?.addactWebinars[0]?.Host.map((host, index) => (
                                            <div key={index} className="flex items-center gap-4">
                                                <Image
                                                    src={host?.Author?.AuthorImage.url}
                                                    alt={host?.Author?.AuthorImage.name}
                                                    width={80}
                                                    height={80}
                                                    className="rounded-lg p-1 object-cover"
                                                />
                                                <div>
                                                    <p className="!text-2xl !font-extrabold text-black leading-tight">
                                                        {host?.Author?.AuthorName.split("-")[0].trim()}
                                                    </p>
                                                    <p className="!text-sm text-blue-600 mt-1">
                                                        {host?.Author?.designation?.DesignationTitle}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        <div className="caseStudy-wrapper">
                            <BlogContentRenderer blocks={webinarDetailData.addactWebinars[0].WebinarContent} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
