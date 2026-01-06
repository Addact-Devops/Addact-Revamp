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
        <div className='flex flex-col pt-[60px] md:pt-[120px]'>
            <section className='container relative w-full text-white overflow-hidden'>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-6 mx-auto py-[40px] md:py-24'>
                    <div>
                        <span className='inline-block px-3 py-1 text-sm text-white bg-white/10 border border-white/20 rounded mb-3'>
                            {status}
                        </span>

                        <h1 className='!text-3xl md:!text-5xl !font-bold mb-3'>
                            {eventData.EventBanner[0].BannerTitle}
                        </h1>
                        <p className='text-lg text-white/80 mb-6'>{eventData.EventBanner[0].BannerDescription}</p>

                        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6'>
                            <div className='flex items-center gap-2'>
                                <CalendarDays size={20} />
                                <p className='text-base font-medium'>
                                    {new Date(eventData.EventBanner[0].PublishDate).toLocaleDateString("en-US", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <MapPin size={20} />
                                <p className='text-base font-medium'>{eventData.EventBanner[0].eventLocation}</p>
                            </div>
                        </div>

                        <Link
                            href={`/contact-us`}
                            className='flex items-center gap-2 w-44 bg-[#3C4CFF] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#3440CB] transition-colors'
                        >
                            Let’s talk
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className='relative aspect-[16/9] md:aspect-auto w-full md:h-auto'>
                        <Image
                            src={eventData.EventBanner[0].BannerImage.url}
                            alt={eventData.EventBanner[0].BannerImage.name}
                            width={eventData.EventBanner[0].BannerImage.width}
                            height={eventData.EventBanner[0].BannerImage.height}
                            className='object-cover rounded-lg'
                        />
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
