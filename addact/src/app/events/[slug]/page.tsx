"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import BlogContentRenderer from "@/components/organisms/BlogContentRenderer";
import { EventDetailResponse, getEventDetailBySlug } from "@/graphql/queries/getEventDetail";
import { getEventStatus } from "@/utils/getEventStatus";
import "../../../styles/components/caseStudy-detail.scss";

const EventDetails = () => {
    const { slug } = useParams();
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
        return (
            <div className='flex justify-center items-center min-h-[50vh]'>
                <div className='w-12 h-12 border-4 border-t-transparent border-red-500 rounded-full animate-spin'></div>
            </div>
        );
    }

    if (!eventDetailData) return <p className='p-6 text-red-600'>Event Details not found.</p>;

    const eventData = eventDetailData?.addactsEvents[0];
    const status = getEventStatus(eventData.EventBanner[0].PublishDate, "Event");

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
                        <div className='lg:ml-36'>
                            <div className='sticky top-[140px] w-full'>
                                {/* <form
                                    onSubmit={handleFormSubmit}
                                    className='space-y-4 bg-[#f9f9f9] p-6 rounded-2xl shadow-md lg:max-w-sm w-full'
                                >
                                    <h2 className='text-2xl font-semibold leading-tight mb-4'>
                                        Get your free copy now!
                                    </h2>
                                    <p className='text-gray-600 mb-6'>{formTitle?.Description}</p>

                                    <input
                                        type='text'
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder='Full Name*'
                                        className='w-full p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-red-400'
                                    />

                                    <input
                                        type='email'
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder='Business Email*'
                                        className='w-full p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-red-400'
                                    />

                                    <input
                                        type='tel'
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder='Phone Number*'
                                        pattern='[0-9]{10,15}'
                                        title='Please enter a valid phone number (10–15 digits only)'
                                        className='w-full p-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-red-400'
                                    />

                                    <ReCAPTCHA
                                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                                        onChange={(token: string | null) => setCaptchaToken(token)}
                                        className='mx-auto w-full'
                                    />

                                    <button
                                        type='submit'
                                        className='w-full bg-[#f16565] cursor-pointer text-white font-semibold py-2 rounded-lg hover:bg-[#e45555] transition'
                                    >
                                        {submitting ? (
                                            <span className='flex justify-center items-center gap-2'>
                                                <span className='w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin'></span>
                                                Processing...
                                            </span>
                                        ) : (
                                            "Download"
                                        )}
                                    </button>
                                </form> */}
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
