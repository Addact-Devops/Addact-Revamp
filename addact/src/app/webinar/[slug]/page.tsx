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
                            <BlogContentRenderer blocks={webinarDetailData.addactWebinars[0].WebinarContent} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WebinarDetails;
