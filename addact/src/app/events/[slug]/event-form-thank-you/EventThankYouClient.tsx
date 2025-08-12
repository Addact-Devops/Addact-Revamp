"use client";

import React from "react";
import { useRouter } from "next/navigation";
import RichText from "@/components/atom/richText";

type JsonPrimitive = string | number | boolean | null;
type JsonArray = JsonValue[];
interface JsonObject {
    [key: string]: JsonValue;
}
type JsonValue = JsonPrimitive | JsonObject | JsonArray;

interface SEO {
    metaTitle?: string | null;
    metaDescription?: string | null;
    ogTitle?: string | null;
    ogDescription?: string | null;
    ogImage?: { url?: string | null } | null;
    metaRobots?: string | null;
    twitterCardTitle?: string | null;
    canonicalURL?: string | null;
    structuredData?: JsonValue | null; // <-- no 'any', uses JsonValue type
    languageTag?: string | null;
}

interface ThankYouPage {
    ReferenceTitle: string;
    Slug: string;
    Content: {
        id: string;
        h1?: string;
        Richtext?: string;
        href?: string;
        label?: string;
        target?: string;
        isExternal?: boolean;
    }[];
    AnimationVideo?: {
        alternativeText: string | null;
        name: string;
        url: string;
    };
    SEO?: SEO | null;
}

interface EventThankYouClientProps {
    thankYouData: ThankYouPage;
}

const EventThankYouClient: React.FC<EventThankYouClientProps> = ({ thankYouData }) => {
    const router = useRouter();

    const { AnimationVideo } = thankYouData;
    const content = thankYouData.Content;

    return (
        <div className="bg-white pt-[120px]">
            <div className="container grid grid-cols-1 md:grid-cols-2 items-center justify-between px-6 md:px-16 py-12 max-w-7xl mx-auto gap-12">
                {/* Left Text Section */}
                <div className="text-center md:text-left w-full">
                    <h1 className="!text-4xl md:!text-6xl !font-extrabold text-gray-900 leading-tight mb-6">
                        {content?.[0]?.h1}
                    </h1>
                    <div className="prose:!text-lg md:prose:!text-xl text-gray-700 mb-6">
                        {content?.[1]?.Richtext && <RichText html={content[1].Richtext} />}
                    </div>
                    <button
                        onClick={() => router.back()}
                        className="inline-block bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold text-sm px-6 py-3 rounded-full transition"
                    >
                        {content?.[2]?.label}
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

export default EventThankYouClient;
