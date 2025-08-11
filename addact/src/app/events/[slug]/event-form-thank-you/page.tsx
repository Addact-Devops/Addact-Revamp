"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getThankYouPageBySlug, ThankYouPageResponse } from "@/graphql/queries/getThankYouPageBySlug";
import Loader from "@/components/atom/loader";
import RichText from "@/components/atom/richText";

const EventThankYou = () => {
    const router = useRouter();

    const [thankYouData, setThankYouData] = useState<ThankYouPageResponse>();
    const [loading, setLoading] = useState(true);

    const pageName = "event-form-thank-you";

    useEffect(() => {
        const fetchData = async () => {
            const result = await getThankYouPageBySlug(pageName);
            setThankYouData(result);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) return <Loader />;
    if (!thankYouData || thankYouData.thankyouPages.length === 0) {
        return <p className="p-6 text-red-600 mt-32">Thank You Page not found.</p>;
    }

    const { AnimationVideo } = thankYouData.thankyouPages[0];
    const content = thankYouData.thankyouPages[0].Content;

    return (
        <div className="bg-white pt-[120px]">
            <div className="container grid grid-cols-1 md:grid-cols-2 items-center justify-between px-6 md:px-16 py-12 max-w-7xl mx-auto gap-12">
                {/* Left Text Section */}
                <div className="text-center md:text-left w-full">
                    <h1 className="!text-4xl md:!text-6xl !font-extrabold text-gray-900 leading-tight mb-6">
                        {content[0].h1}
                    </h1>
                    <div className="prose:!text-lg md:prose:!text-xl text-gray-700 mb-6">
                        {content[1].Richtext && <RichText html={content[1].Richtext} />}
                    </div>
                    <button
                        onClick={() => router.back()}
                        className="inline-block bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold text-sm px-6 py-3 rounded-full transition"
                    >
                        {content[2].label}
                    </button>
                </div>

                {/* Right Video Section */}
                <div className="w-full flex justify-end">
                    {AnimationVideo?.url ? (
                        <video
                            src={AnimationVideo.url}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-[260px] md:w-[500px] h-auto"
                            aria-label={AnimationVideo.alternativeText || "Thank You Animation"}
                        />
                    ) : (
                        <div className="w-[260px] md:w-[400px] h-[260px] bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">No animation available</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventThankYou;
