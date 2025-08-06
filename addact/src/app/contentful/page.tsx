"use client";

import { useEffect, useState } from "react";
import { getServiceListBySlug } from "@/graphql/queries/getServieceList";
import HeroBanner from "@/components/organisms/HeroBanner";
import WhyAddact from "@/components/organisms/WhyAddact";
import OurPartners from "@/components/organisms/OurPartners";
import OurProcess from "@/components/organisms/OurProcess";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import OurInsights from "@/components/organisms/OurInsights";
import IndustriesWeServe from "@/components/organisms/IndustriesWeServe";
import FAQ from "@/components/organisms/FAQ";
import OurServicesWithTabs from "@/components/organisms/OurServicesWithTabs";
import { notFound } from "next/navigation";
import Head from "next/head";

export default function ContentfulPage() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            const service = "contentful";
            const res = await getServiceListBySlug(service);
            if (!res) return notFound();
            setData(res);
        }

        fetchData();
    }, []);

    if (!data) {
        return <div className="text-white p-10">Loading...</div>;
    }

    const bannerData = data.Banner?.Banner?.[0];
    const SEO = data.SEO || {};
    const structuredData = SEO.structuredData ? JSON.stringify(SEO.structuredData) : null;

    return (
        <>
            <Head>
                {SEO.metaTitle && <title>{SEO.metaTitle}</title>}
                {SEO.metaDescription && <meta name="description" content={SEO.metaDescription} />}
                {SEO.metaRobots && <meta name="robots" content={SEO.metaRobots} />}
                {SEO.canonicalURL && <link rel="canonical" href={SEO.canonicalURL} />}
                {SEO.ogTitle && <meta property="og:title" content={SEO.ogTitle} />}
                {SEO.ogDescription && <meta property="og:description" content={SEO.ogDescription} />}
                {SEO.ogImage?.url && <meta property="og:image" content={SEO.ogImage.url} />}
                {SEO.twitterCardTitle && <meta name="twitter:title" content={SEO.twitterCardTitle} />}
                {SEO.languageTag && <meta httpEquiv="Content-Language" content={SEO.languageTag} />}
                {structuredData && (
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
                )}
            </Head>

            <main className="bg-dark">
                <HeroBanner
                    title={bannerData?.BannerTitle ?? ""}
                    description={bannerData?.BannerDescription?.replace(/^<p>|<\/p>$/g, "") ?? ""}
                    button={{
                        label: bannerData?.BannerLink?.label ?? "",
                        url: bannerData?.BannerLink?.href ?? "",
                    }}
                    backgroundImageUrl={bannerData?.BannerImage?.url ?? ""}
                />
                <OurPartners />
                <OurServicesWithTabs data={data.our_service} />
                <IndustriesWeServe />
                <WhyAddact data={data.why_addact} />
                <OurProcess />
                <ClientTestimonials />
                <OurInsights />
                <FAQ data={data.faq} />
            </main>
        </>
    );
}
