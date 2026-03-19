"use client";

import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

import HeroBanner from "@/components/organisms/HeroBanner";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import OurInsights from "@/components/organisms/OurInsights";
import DetailPageServices from "@/components/organisms/DetailPageServices";
import { getQATestingSupportSlug, QATestingDetail } from "@/graphql/queries/getQATestingSupportSlug";
import HowEngagementProcessWorks from "@/components/organisms/HowEngagementProcessWorks";
import CtaBanner from "@/components/molecules/CtaBanner";
import IndustryMarqueeCards from "@/components/organisms/IndustryMarqueeCards";

// const IndustriesWeServe = dynamic(
//   () => import("@/components/organisms/IndustriesWeServe"),
//   { ssr: false },
// );

const SiteDetailClient = ({ data }: { data: QATestingDetail }) => {
    const [pageData, setPageData] = useState<QATestingDetail | null>(data);
    const [loading, setLoading] = useState(false); // set false, we already have data

    const params = useParams();
    const slug = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";

    useEffect(() => {
        if (!pageData && slug) {
            setLoading(true);
            getQATestingSupportSlug(slug)
                .then((res) => {
                    setPageData(res);
                })
                .catch((err) => {
                    console.error("Error fetching service detail:", err);
                })
                .finally(() => setLoading(false));
        }
    }, [slug, pageData]);

    if (loading) {
        return <div className='text-white p-8'>Loading...</div>;
    }

    if (!pageData) {
        return <div className='text-white p-8'>Page Not Found</div>;
    }

    const bannerData = pageData.Banner?.Banner?.[0];

    return (
        <main className='bg-dark'>
            <HeroBanner
                title={bannerData?.BannerTitle ?? ""}
                description={bannerData?.BannerDescription ?? ""}
                button={{
                    label: bannerData?.BannerLink?.label ?? "",
                    url: bannerData?.BannerLink?.href ?? "",
                }}
                isVideo={Boolean(bannerData?.isVideo)}
                videoUrl={bannerData?.videoLink ?? ""}
                backgroundImageUrl={bannerData?.BannerImage?.url ?? ""}
            />

            {/* {pageData?.ourService && pageData.ourService.length > 0 && (
        <>
          {pageData.ourService.map((service, index) => (
            <DetailPageServices
              key={service.id || index}
              title={service.serviceTitle}
              isCaraousl={service.isCarousel}
              data={service}
            />
          ))}
        </>
      )} */}

            <DetailPageServices data={data?.ourService} />

            <HowEngagementProcessWorks data={pageData?.ourprocess} />
            <IndustryMarqueeCards data={data?.industry} />
            <ClientTestimonials />
            <OurInsights />
            {pageData?.cta && <CtaBanner data={pageData?.cta} />}
        </main>
    );
};

export default SiteDetailClient;
