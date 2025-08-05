"use client";

import { useRouter } from "next/navigation";
import Head from "next/head";
import RichText from "@/components/atom/richText";
import Loader from "@/components/atom/loader";

type Props = {
    thankYouData: {
        Content: any[];
        AnimationVideo?: {
            alternativeText?: string;
            name?: string;
            url?: string;
        };
        SEO?: {
            metaTitle?: string;
            metaDescription?: string;
            ogTitle?: string;
            ogDescription?: string;
            ogImage?: { url?: string };
            metaRobots?: string;
            twitterCardTitle?: string;
            canonicalURL?: string;
            structuredData?: any;
            languageTag?: string;
        } | null;
    };
};

export default function ConnectNowThankYouClient({ thankYouData }: Props) {
    const router = useRouter();

    const content = thankYouData.Content || [];
    const video = thankYouData.AnimationVideo;

    const SEO = thankYouData.SEO;

    const metaTitle = SEO?.metaTitle || "";
    const metaDescription = SEO?.metaDescription || "";
    const ogTitle = SEO?.ogTitle || "";
    const ogDescription = SEO?.ogDescription || "";
    const ogImage = SEO?.ogImage?.url || "";
    const metaRobots = SEO?.metaRobots || "";
    const twitterCardTitle = SEO?.twitterCardTitle || "";
    const canonicalURL = SEO?.canonicalURL || "";
    const structuredData = SEO?.structuredData || null;
    const languageTag = SEO?.languageTag || "en";

    return (
        <>
            <Head>
                {metaTitle && <title>{metaTitle}</title>}
                {metaDescription && <meta name="description" content={metaDescription} />}
                {metaRobots && <meta name="robots" content={metaRobots} />}
                {canonicalURL && <link rel="canonical" href={canonicalURL} />}
                {ogTitle && <meta property="og:title" content={ogTitle} />}
                {ogDescription && <meta property="og:description" content={ogDescription} />}
                {ogImage && <meta property="og:image" content={ogImage} />}
                {twitterCardTitle && <meta name="twitter:title" content={twitterCardTitle} />}
                {languageTag && <meta httpEquiv="Content-Language" content={languageTag} />}
                {structuredData && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                    />
                )}
            </Head>

            <div className="bg-white pt-[120px]">
                <div className="container grid grid-cols-1 md:grid-cols-2 items-center justify-between px-6 md:px-16 py-12 max-w-7xl mx-auto gap-12">
                    {/* Left Text Section */}
                    <div className="text-center md:text-left w-full">
                        <h1 className="!text-4xl md:!text-6xl !font-extrabold text-gray-900 leading-tight mb-6">
                            {content[0]?.h1}
                        </h1>
                        <div className="!text-lg md:!text-xl text-gray-700 mb-6">
                            {content[1]?.Richtext && <RichText html={content[1].Richtext} />}
                        </div>
                        <button
                            onClick={() => router.back()}
                            className="inline-block bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold text-sm px-6 py-3 rounded-full transition"
                        >
                            {content[2]?.label}
                        </button>
                    </div>

                    {/* Right Video Section */}
                    <div className="w-full flex justify-end">
                        {video?.url ? (
                            <video
                                src={video.url}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-[260px] md:w-[500px] h-auto"
                                aria-label={video.alternativeText || "Thank You Animation"}
                            />
                        ) : (
                            <div className="w-[260px] md:w-[400px] h-[260px] bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">No animation available</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
