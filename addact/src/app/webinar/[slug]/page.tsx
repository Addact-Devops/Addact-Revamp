"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";
import "../../../styles/components/caseStudy-detail.scss";
import { getWebinarDetailBySlug, WebinarDetailResponse } from "@/graphql/queries/getWebinarDetail";

const WebinarDetails = () => {
    const { slug } = useParams();
    const [webinarDetailData, setWebinarDetailData] = useState<WebinarDetailResponse>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof slug === "string") {
            const fetchData = async () => {
                const result = await getWebinarDetailBySlug(slug);
                setWebinarDetailData(result);
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

    if (!webinarDetailData) return <p className='p-6 text-red-600'>Event Details not found.</p>;

    const webinarData = webinarDetailData.addactWebinars[0].HeroBanner[0];

    return (
        <div className='flex flex-col pt-[120px]'>
            <section className='container relative w-full text-white overflow-hidden'>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-6 mx-auto py-24'>
                    <div>
                        <p className='text-sm text-red-400'>{webinarData.PublishDate}</p>
                        <h1 className='!text-3xl md:!text-5xl !font-bold mt-2'>{webinarData.BannerTitle}</h1>
                    </div>
                    <div className='relative aspect-[16/9] md:aspect-auto w-full md:h-auto'>
                        <Image
                            src={webinarData.BannerImage.url}
                            alt={webinarData.BannerImage.name}
                            width={webinarData.BannerImage.width}
                            height={webinarData.BannerImage.height}
                            className='object-cover rounded-lg'
                        />
                    </div>
                </div>
            </section>

            <section className='bg-[#f4f4f4] pb-20'>
                <div className='container'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto mt-24 text-black'>
                        <div className='lg:mr-36'>
                            <div className='sticky top-[140px] w-full'>
                                <div className='space-y-10'>
                                    {/* Speaker Section */}
                                    <div>
                                        <h2 className='text-3xl font-extrabold mb-6'>Speaker</h2>
                                        {webinarDetailData.addactWebinars[0].Speakers.map((speaker, index) => (
                                            <div key={index} className='flex items-center gap-4 mb-4'>
                                                <Image
                                                    src={speaker.Author.AuthorImage.url}
                                                    alt={speaker.Author.AuthorImage.name}
                                                    width={80}
                                                    height={80}
                                                    className='rounded-lg bg-[#e3e5ff] p-1 object-cover'
                                                />
                                                <div>
                                                    <p className='text-lg font-semibold text-black leading-tight'>
                                                        {speaker.Author.AuthorName.split("-")[0].trim()}
                                                    </p>
                                                    <p className='text-sm text-[#5a57ff] mt-1'>
                                                        {speaker.Author.designation.DesignationTitle}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Host Section */}
                                    <div>
                                        <h2 className='text-3xl font-extrabold mb-6'>Host</h2>
                                        <div className='flex items-center gap-4'>
                                            <Image
                                                src={webinarDetailData.addactWebinars[0].Host.Author.AuthorImage.url}
                                                alt={webinarDetailData.addactWebinars[0].Host.Author.AuthorImage.name}
                                                width={80}
                                                height={80}
                                                className='rounded-lg bg-[#e3e5ff] p-1 object-cover'
                                            />
                                            <div>
                                                <p className='text-lg font-semibold text-black leading-tight'>
                                                    {webinarDetailData.addactWebinars[0].Host.Author.AuthorName.split(
                                                        "-"
                                                    )[0].trim()}
                                                </p>
                                                <p className='text-sm text-[#5a57ff] mt-1'>
                                                    {
                                                        webinarDetailData.addactWebinars[0].Host.Author.designation
                                                            .DesignationTitle
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='caseStudy-wrapper'>
                            <BlogContentRenderer blocks={webinarDetailData.addactWebinars[0].WebinarContent} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WebinarDetails;
