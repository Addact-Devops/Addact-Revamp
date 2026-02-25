"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";
import { getPressReleaseDetailBySlug, PressReleaseDetailResponse } from "@/graphql/queries/getPressReleaseDetail";
import { getRecentPressRelease, RecentPressRelease } from "@/graphql/queries/getRecentPressRelease";
import "../../../styles/components/caseStudy-detail.scss";
import Loader from "@/components/atom/loader";

export default function PressReleaseDetails({ slug }: { slug: string }) {
    const [pressReleaseData, setPressReleaseData] = useState<PressReleaseDetailResponse>();
    const [recentPressReleaseData, setRecentPressReleaseData] = useState<RecentPressRelease>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

        if (slug) {
            fetchData();
        }
    }, [slug]);

    if (loading) {
        return <Loader />;
    }

    if (!pressReleaseData) {
        return <p className='p-6 text-red-600 mt-32'>Press Release Details not found.</p>;
    }

    const eventData = pressReleaseData.addactPressReleases[0];

    return (
        <div className='flex flex-col pt-[80px] md:pt-[100px]'>
            {/* ── Premium Press Release Banner ── */}
            <section className='relative w-full bg-white overflow-hidden border-b border-zinc-100'>
                {/* Background ambient light */}
                <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-[#3C4CFF]/5 blur-[120px] -z-1' />
                <div className='absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3C4CFF]/5 blur-[100px] -z-1' />

                <div className='container relative z-10'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20 py-16 md:py-24'>
                        
                        {/* Left: Content */}
                        <div className='order-2 lg:order-1'>
                            <div className='inline-flex items-center gap-2 bg-[#3C4CFF]/5 border border-[#3C4CFF]/15 rounded-full px-4 py-1.5 text-[#3C4CFF] text-[11px] font-bold uppercase tracking-wider mb-6'>
                                <span className='w-1.5 h-1.5 rounded-full bg-[#3C4CFF] animate-pulse' />
                                Press Release
                            </div>

                            <h1 className='text-zinc-900 !font-bold !text-3xl md:!text-5xl leading-[1.15] mb-6'>
                                {eventData.HeroBanner[0].BannerTitle}
                            </h1>
                            
                            {eventData.HeroBanner[0].BannerDescription && (
                                <p className='text-zinc-600 text-lg md:text-xl leading-relaxed mb-8 max-w-xl'>
                                    {eventData.HeroBanner[0].BannerDescription}
                                </p>
                            )}
                        </div>

                        {/* Right: Image */}
                        <div className='order-1 lg:order-2 relative'>
                            {/* Decorative frame behind image */}
                            <div className='absolute -bottom-6 -right-6 w-full h-full rounded-3xl border-2 border-[#3C4CFF]/10 -z-1 hidden md:block' />
                            
                            <div className='relative aspect-16/10 rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] ring-1 ring-zinc-200'>
                                <Image
                                    src={eventData.HeroBanner[0].BannerImage.url}
                                    alt={eventData.HeroBanner[0].BannerImage.name}
                                    width={eventData.HeroBanner[0].BannerImage.width}
                                    height={eventData.HeroBanner[0].BannerImage.height}
                                    className='w-full h-full object-cover transform transition-transform duration-1000 hover:scale-105'
                                    priority
                                />
                                {/* Soft gradient overlay for depth */}
                                <div className='absolute inset-0 bg-linear-to-tr from-black/5 via-transparent to-transparent pointer-events-none' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className='bg-[#f4f4f4] pb-20'>
                <div className='container'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto mt-[60px] xl:mt-24 text-black'>
                        {/* Sidebar */}
                        <div className='lg:mr-25'>
                            <div className='sticky top-[140px] w-full'>
                                <div className='bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm mb-6'>
                                    <h2 className='text-[22px]! md:text-[26px]! font-bold text-zinc-900 mb-6'>
                                        Recent Press Releases
                                    </h2>
                                    <div className='space-y-6'>
                                        {recentPressReleaseData?.addactPressReleases.map((item, index) => (
                                            <div key={index} className='group/recent flex gap-4'>
                                                <div className='relative shrink-0 w-20 h-16 rounded-lg overflow-hidden ring-1 ring-zinc-100'>
                                                    <Image
                                                        src={item.HeroBanner[0].BannerImage.url}
                                                        alt={
                                                            item.HeroBanner[0].BannerImage.alternativeText ||
                                                            "Banner image"
                                                        }
                                                        fill
                                                        className='object-cover transition-transform duration-500 group-hover/recent:scale-110'
                                                    />
                                                </div>
                                                <h5 className='text-[14px]! font-semibold leading-snug m-0!'>
                                                    <a href={`/press-releases/${item.Slug}`} className='text-zinc-700 group-hover/recent:text-[#3C4CFF] transition-colors line-clamp-2 no-underline!'>
                                                        {item.HeroBanner[0].BannerTitle}
                                                    </a>
                                                </h5>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Social Icons Section */}
                                <div className='bg-zinc-50 border border-zinc-100 rounded-2xl p-8 text-center'>
                                    <p className='text-zinc-900 text-lg! font-bold mb-6'>
                                        Share with friends
                                    </p>
                                    <div className='flex gap-4 justify-center'>
                                        {eventData.social_icons.map((icon, index) => (
                                            <a
                                                key={index}
                                                href={icon.SocialIcon[0].Links.href}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='group/social relative w-12 h-12 rounded-full bg-transparent border border-zinc-200 flex items-center justify-center overflow-hidden hover:border-[#3C4CFF]/30 hover:bg-[#3C4CFF]/5 transition-all duration-300 transform hover:-translate-y-1'
                                            >
                                                {/* Default Icon (Black) */}
                                                <Image
                                                    src={icon.SocialIcon[0].Icons.url}
                                                    alt={icon.SocialIcon[0].Title}
                                                    width={22}
                                                    height={22}
                                                    className='transition-all duration-300 brightness-0 opacity-60 group-hover/social:opacity-0 group-hover/social:scale-50'
                                                />
                                                {/* Hover Icon (Blue) */}
                                                <Image
                                                    src={icon.SocialIcon[0].HoverIcon.url}
                                                    alt={icon.SocialIcon[0].Title}
                                                    width={22}
                                                    height={22}
                                                    className='absolute inset-0 m-auto transition-all duration-300 opacity-0 scale-50 group-hover/social:opacity-100 group-hover/social:scale-100'
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className='caseStudy-wrapper'>
                            <BlogContentRenderer blocks={eventData?.PressContent} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
