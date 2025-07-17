"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllCaseStudyData, IAllCaseStudy } from "@/graphql/queries/getAllCaseStudy";
import RichText from "@/components/atom/richText";

const CaseStudyListing = () => {
    const [caseStudyBanner, setCaseStudyBanner] = useState<IAllCaseStudy["caseStudy"]>();
    const [caseStudyListing, setCaseStudyListing] = useState<IAllCaseStudy["addactCaseStudies"]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCaseStudy = async () => {
            const data = await getAllCaseStudyData();
            setCaseStudyBanner(data.caseStudy);
            setCaseStudyListing(data.addactCaseStudies);
            setLoading(false);
        };
        fetchCaseStudy();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="w-12 h-12 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!caseStudyListing) return <p className="p-6 text-red-600">Case-Study List not found.</p>;

    return (
        <div className="pt-[120px]">
            {/* Banner Section */}
            {caseStudyBanner && (
                <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center text-white">
                    <Image
                        src={caseStudyBanner.CaseStudyBanner?.Banner[0]?.BannerImage?.url}
                        alt={caseStudyBanner.CaseStudyBanner?.Banner[0]?.BannerImage?.alternativeText}
                        layout="fill"
                        objectFit="cover"
                        priority
                        className="absolute inset-0 z-0"
                    />
                    <div className="relative container z-10 px-4">
                        <h1 className="!text-5xl md:text-5xl font-bold mb-4 max-w-2xl leading-16">
                            {caseStudyBanner?.CaseStudyBanner?.Banner[0]?.BannerTitle}
                        </h1>
                        <div className="mt-4 prose:text-base prose:leading-8 md:text-lg max-w-2xl">
                            <RichText html={caseStudyBanner.CaseStudyBanner?.Banner[0]?.BannerDescription} />
                        </div>
                    </div>
                </div>
            )}

            {/* Listing Section */}
            <div className="container mx-auto px-4 py-12 grid gap-8">
                {caseStudyListing.map((item) => (
                    <div
                        key={item.documentId}
                        className="flex flex-col items-center md:flex-row bg-[#232630] p-5 mb-5 md:mb-14 text-white rounded-[20px] overflow-hidden shadow-lg"
                    >
                        <div className="relative w-full md:w-[550px] h-[200px] md:h-[300px]">
                            <Image
                                src={item.HeroBanner[0].BannerImage.url}
                                alt={item.HeroBanner[0].BannerImage.alternativeText}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-[20px]"
                            />
                        </div>

                        <div className="flex flex-col justify-between pt-6 md:pt-0 md:pl-9 w-full md:w-2/3">
                            <div>
                                <h2 className="!text-2xl md:!text-4xl !font-bold mb-5 leading-9 md:leading-12">
                                    {item.HeroBanner[0].BannerTitle}
                                </h2>
                                <p className="text-lg text-gray-400 mb-2.5">
                                    {new Date(item.HeroBanner[0].PublishDate).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                                <p className="text-base text-gray-300">{item.caseStudySummary}</p>
                            </div>

                            <div className="mt-4">
                                <Link
                                    href={`/portfolio${item.Slug}`}
                                    className="inline-block bg-[#3C4CFF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#000000] transition"
                                >
                                    Know More
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CaseStudyListing;
