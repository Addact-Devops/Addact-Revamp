"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";
import { getPressReleaseDetailBySlug, PressReleaseDetailResponse } from "@/graphql/queries/getPressReleaseDetail";
import "../../../styles/components/caseStudy-detail.scss";

const PressReleaseDetails = () => {
    const { slug } = useParams();
    const [pressReleaseData, setPressReleaseData] = useState<PressReleaseDetailResponse>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof slug === "string") {
            const fetchData = async () => {
                const result = await getPressReleaseDetailBySlug(slug);
                setPressReleaseData(result);
                setLoading(false);
            };
            fetchData();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-[50vh]'>
                <div className='w-12 h-12 border-4 border-t-transparent border-red-500 rounded-full animate-spin'></div>
            </div>
        );
    }

    if (!pressReleaseData) return <p className='p-6 text-red-600'>Press Release Details not found.</p>;

    const eventData = pressReleaseData.addactPressReleases[0];

    return (
        <div className='flex flex-col pt-[120px]'>
            <section className='container relative w-full text-white overflow-hidden'>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-6 mx-auto py-24'>
                    <div>
                        <h1 className='!text-3xl md:!text-5xl !font-bold mt-2'>
                            {eventData.HeroBanner[0].BannerTitle}
                        </h1>
                    </div>
                    <div className='relative aspect-[16/9] md:aspect-auto w-full md:h-auto'>
                        <Image
                            src={eventData.HeroBanner[0].BannerImage.url}
                            alt={eventData.HeroBanner[0].BannerImage.name}
                            width={eventData.HeroBanner[0].BannerImage.width}
                            height={eventData.HeroBanner[0].BannerImage.height}
                            className='object-cover rounded-lg'
                        />
                    </div>
                </div>
            </section>

            <section className='bg-[#f4f4f4] caseStudy-wrapper pb-20'>
                <div className='container'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto mt-24 text-black'>
                        <div className='lg:ml-36'>
                            <div className='sticky top-[140px] w-full'>TEST</div>
                        </div>

                        <div>
                            <BlogContentRenderer blocks={eventData?.PressContent} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PressReleaseDetails;
