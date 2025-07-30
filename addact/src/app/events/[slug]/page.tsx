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

const EventDetails = () => {
    const { slug } = useParams();
    const pathname = usePathname();

    const [eventDetailData, setEventDetailData] = useState<EventDetailResponse>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof slug === "string") {
            const fetchData = async () => {
                const result = await getEventDetailBySlug(slug);
                setEventDetailData(result);
                setLoading(false);
            };
            fetchData();
        }
    }, [slug]);

    if (loading) {
        return <Loader />;
    }

    if (!eventDetailData) return <p className='p-6 text-red-600'>Event Details not found.</p>;

    const eventData = eventDetailData?.addactsEvents[0];
    const status = getEventStatus(eventData.EventBanner[0].PublishDate, "Event");
    const formTitle = eventDetailData.addactsEvents[0].contact_us_card.Form[0].Title;
    const formDescription = eventDetailData.addactsEvents[0].contact_us_card.Form[0].Description;
    const formFields = eventDetailData.addactsEvents[0].contact_us_card;

    return (
        <div className='flex flex-col pt-[120px]'>
            <section className='container relative w-full text-white overflow-hidden'>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-6 mx-auto py-24'>
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

                        <button className='flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-800 transition-colors'>
                            Let’s talk
                            <ArrowRight size={18} />
                        </button>
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
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto mt-24 text-black'>
                        <div className='lg:mr-36'>
                            <div className='sticky top-[140px] w-full'>
                                <DownloadForm
                                    title={formTitle}
                                    description={formDescription}
                                    submitUrl='/api/submit-form'
                                    sheetName='Sheet1'
                                    redirectUrl={`${pathname}/event-form-thank-you`}
                                    NameLabel={formFields?.NameLable}
                                    EmailLabel={formFields?.EmailLabel}
                                    PhoneLabel={formFields?.PhoneLabel}
                                    ButtonLabel={formFields?.ButtonLabel}
                                    RecipientEmails={formFields?.RecipientEmails}
                                />
                            </div>
                        </div>

                        <div>
                            <BlogContentRenderer blocks={eventData?.EventContent} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EventDetails;
