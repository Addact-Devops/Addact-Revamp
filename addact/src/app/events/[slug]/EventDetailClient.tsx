// app/events/[slug]/EventDetailClient.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";
import { EventDetailResponse, getEventDetailBySlug } from "@/graphql/queries/getEventDetail";
import { getEventStatus } from "@/utils/getEventStatus";
import DownloadForm from "@/components/templates/downloadForm";
import "../../../styles/components/caseStudy-detail.scss";
import Loader from "@/components/atom/loader";
import Link from "next/link";

type EventDetailClientProps = {
    data?: EventDetailResponse | null; // optional server-passed data
};

const EventDetails = ({ data: serverData }: EventDetailClientProps) => {
    const { slug } = useParams();
    const pathname = usePathname();

    // initialize state with server data if provided, otherwise undefined
    const [eventDetailData, setEventDetailData] = useState<EventDetailResponse | undefined>(() => {
        return serverData ?? undefined;
    });
    // loading is false if server provided data, otherwise true until client fetch finishes
    const [loading, setLoading] = useState<boolean>(() => (serverData ? false : true));

    useEffect(() => {
        // if server provided data, skip client fetch (keeps original UI intact)
        if (serverData) return;

        if (typeof slug === "string") {
            const fetchData = async () => {
                const result = await getEventDetailBySlug(slug);
                setEventDetailData(result);
                setLoading(false);
            };
            fetchData();
        }
    }, [slug, serverData]);

    if (loading) {
        return <Loader />;
    }

    if (!eventDetailData) return <p className='p-6 text-red-600 mt-32'>Event Details not found.</p>;

    const eventData = eventDetailData?.addactsEvents[0];
    const status = getEventStatus(eventData.EventBanner[0].PublishDate, "Event");
    const formTitle = eventDetailData.addactsEvents[0].contact_us_card.Form[0].Title;
    const formDescription = eventDetailData.addactsEvents[0].contact_us_card.Form[0].Description;
    const formFields = eventDetailData.addactsEvents[0].contact_us_card;

    return (
        <div className='flex flex-col pt-[80px] md:pt-[100px]'>
            {/* ── Premium Event Banner ── */}
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
                                {status}
                            </div>

                            <h1 className='text-zinc-900 !font-bold !text-3xl md:!text-5xl leading-[1.15] mb-6'>
                                {eventData.EventBanner[0].BannerTitle}
                            </h1>
                            
                            <p className='text-zinc-600 text-lg md:text-xl leading-relaxed mb-8 max-w-xl'>
                                {eventData.EventBanner[0].BannerDescription}
                            </p>

                            <div className='flex flex-wrap items-center gap-x-8 gap-y-4 mb-10'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 rounded-full bg-[#3C4CFF]/10 flex items-center justify-center text-[#3C4CFF]'>
                                        <CalendarDays size={18} />
                                    </div>
                                    <div>
                                        <p className='text-[12px] text-zinc-400 font-medium uppercase tracking-wide leading-none mb-1'>Date</p>
                                        <p className='text-zinc-900 font-semibold'>
                                            {new Date(eventData.EventBanner[0].PublishDate).toLocaleDateString("en-US", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 rounded-full bg-[#3C4CFF]/10 flex items-center justify-center text-[#3C4CFF]'>
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className='text-[12px] text-zinc-400 font-medium uppercase tracking-wide leading-none mb-1'>Location</p>
                                        <p className='text-zinc-900 font-semibold'>{eventData.EventBanner[0].eventLocation}</p>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href={`/contact-us`}
                                className='group/btn relative inline-flex items-center gap-3 bg-[#3C4CFF] text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:bg-[#3440CB] hover:shadow-[0_20px_40px_-10px_rgba(60,76,255,0.3)] hover:-translate-y-1'
                            >
                                Let’s talk
                                <ArrowRight size={20} className='transition-transform duration-300 group-hover/btn:translate-x-1' />
                            </Link>
                        </div>

                        {/* Right: Image */}
                        <div className='order-1 lg:order-2 relative'>
                            {/* Decorative frame behind image */}
                            <div className='absolute -bottom-6 -right-6 w-full h-full rounded-3xl border-2 border-[#3C4CFF]/10 -z-1 hidden md:block' />
                            
                            <div className='relative aspect-16/10 rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] ring-1 ring-zinc-200'>
                                <Image
                                    src={eventData.EventBanner[0].BannerImage.url}
                                    alt={eventData.EventBanner[0].BannerImage.name}
                                    width={eventData.EventBanner[0].BannerImage.width}
                                    height={eventData.EventBanner[0].BannerImage.height}
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
            <section className='bg-[#f4f4f4] caseStudy-wrapper pb-20'>
                <div className='container'>
                    {/* Desktop = 30/70, Mobile = stacked */}
                    <div className='grid grid-cols-1 lg:grid-cols-10 gap-10 mx-auto mt-[40px] lg:mt-24 text-black'>
                        {/* Left column (form → order 2 on mobile, order 1 on desktop) */}
                        <div className='order-2 lg:order-1 lg:col-span-3'>
                            <div className='sticky top-[140px] w-full'>
                                <DownloadForm
                                    title={formTitle}
                                    description={formDescription}
                                    submitUrl='/api/submit-form'
                                    sheetName='Home_Page'
                                    redirectUrl={`${pathname}/event-form-thank-you`}
                                    NameLabel={formFields?.NameLable}
                                    EmailLabel={formFields?.EmailLabel}
                                    PhoneLabel={formFields?.PhoneLabel}
                                    ButtonLabel={formFields?.ButtonLabel}
                                    RecipientEmails={formFields?.RecipientEmails}
                                    pageTitle={`Event-Details ${slug}`}
                                />
                            </div>
                        </div>

                        {/* Right column (content → order 1 on mobile, order 2 on desktop) */}
                        <div className='order-1 lg:order-2 lg:col-span-7'>
                            <BlogContentRenderer blocks={eventData?.EventContent} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EventDetails;
