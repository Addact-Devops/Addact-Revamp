"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";
import { getPressReleaseDetailBySlug, PressReleaseDetailResponse } from "@/graphql/queries/getPressReleaseDetail";
import { getRecentPressRelease, RecentPressRelease } from "@/graphql/queries/getRecentPressRelease";
import "../../../styles/components/caseStudy-detail.scss";
import Loader from "@/components/atom/loader";

const PressReleaseDetails = () => {
    const { slug } = useParams();
    const [pressReleaseData, setPressReleaseData] = useState<PressReleaseDetailResponse>();
    const [recentPressReleaseData, setRecentPressReleaseData] = useState<RecentPressRelease>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof slug === "string") {
            const fetchData = async () => {
                const result = await getPressReleaseDetailBySlug(slug);
                setPressReleaseData(result);
                const res = await getRecentPressRelease({
                    pagination: { limit: 3 },
                    sort: ["publishedAt:desc"],
                });
                setRecentPressReleaseData(res);
                setLoading(false);
            };
            fetchData();
        }
    }, [slug]);

    if (loading) {
        return <Loader />;
    }

    if (!pressReleaseData) return <p className='p-6 text-red-600 mt-32'>Press Release Details not found.</p>;

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

            <section className='bg-[#f4f4f4] pb-20'>
                <div className='container'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto mt-24 text-black'>
                        <div className='lg:mr-36'>
                            <div className='sticky top-[140px] w-full'>
                                <div className='border border-blue-600 rounded-lg py-4 px-6'>
                                    <h2 className='!text-2xl !font-extrabold !mb-4'>Recent Press Releases</h2>
                                    <div className='space-y-6'>
                                        {recentPressReleaseData?.addactPressReleases.map((item, index) => (
                                            <div key={index} className='flex gap-4'>
                                                <div className='relative flex-shrink-0'>
                                                    <Image
                                                        src={item.HeroBanner[0].BannerImage.url}
                                                        alt={
                                                            item.HeroBanner[0].BannerImage.alternativeText ||
                                                            "Banner image"
                                                        }
                                                        width={120}
                                                        height={80}
                                                        className='object-cover rounded-md'
                                                    />
                                                </div>
                                                <h5 className='!text-[15px] !font-medium leading-snug !m-0'>
                                                    <a href={item.slug} className='!no-underline'>
                                                        {item.HeroBanner[0].BannerTitle}
                                                    </a>
                                                </h5>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Social Icons Section */}
                                <div className='bg-[#202020] text-white mt-6 rounded-lg p-10'>
                                    <p className='!text-2xl !font-extrabold mb-6 text-center'>
                                        Share it with your friends
                                    </p>
                                    <div className='flex gap-6 text-white text-xl justify-center'>
                                        {pressReleaseData?.addactPressReleases[0].social_icons.map((icon, index) => (
                                            <a
                                                key={index}
                                                href={icon.SocialIcon[0].Links.href}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='hover:opacity-80 transition font-bold'
                                            >
                                                <Image
                                                    src={icon.SocialIcon[0].Icons.url}
                                                    alt={
                                                        icon.SocialIcon[0].Icons.alternativeText ||
                                                        icon.SocialIcon[0].Title
                                                    }
                                                    width={30}
                                                    height={32}
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='caseStudy-wrapper'>
                            <BlogContentRenderer blocks={eventData?.PressContent} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PressReleaseDetails;
