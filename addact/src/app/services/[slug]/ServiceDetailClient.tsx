"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import HeroBanner from "@/components/organisms/HeroBanner";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import OurInsights from "@/components/organisms/OurInsights";
import FAQ from "@/components/organisms/FAQ";

import { getServicesDetailSlug, ServicesDetail } from "@/graphql/queries/getServicesDetailSlug";
import HowEngagementProcessWorks from "@/components/organisms/HowEngagementProcessWorks";
import CtaBanner from "@/components/molecules/CtaBanner";
import IndustryMarqueeCards from "@/components/organisms/IndustryMarqueeCards";
import WhyWorkWithUs from "@/components/organisms/WhyWorkWithUs";
import DetailPageServices from "@/components/organisms/DetailPageServices";

const ServiceDetailClient = ({ data }: { data: ServicesDetail }) => {
  const [pageData, setPageData] = useState<ServicesDetail | null>(data);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const slug =
    typeof params?.slug === "string"
      ? params.slug
      : Array.isArray(params?.slug)
        ? params.slug[0]
        : "";

  useEffect(() => {
    if (!pageData && slug) {
      setLoading(true);
      getServicesDetailSlug(slug)
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
    return <div className="text-white p-8">Loading...</div>;
  }

  if (!pageData) {
    return <div className="text-white p-8">Page Not Found</div>;
  }

  const bannerData = pageData.Banner?.Banner?.[0];

  return (
    <main className="bg-dark">
      <HeroBanner
        title={bannerData?.BannerTitle ?? ""}
        description={bannerData?.BannerDescription?.replace(/^<p>|<\/p>$/g, "") ?? ""}
        button={{
          label: bannerData?.BannerLink?.label ?? "",
          url: bannerData?.BannerLink?.href ?? "",
        }}
        isVideo={Boolean(bannerData?.isVideo)}
        videoUrl={bannerData?.videoLink ?? ""}
        isTextAlignCenter={bannerData?.isTextAlignCenter ?? false}
        backgroundImageUrl={bannerData?.BannerImage?.url ?? ""}
      />
      <DetailPageServices data={pageData?.ourService} />
      {pageData?.our_process && <HowEngagementProcessWorks data={pageData?.our_process} />}
      {}
      <IndustryMarqueeCards data={pageData?.industry} />
      {pageData?.whyaddact && <WhyWorkWithUs data={pageData?.whyaddact} />}
      <ClientTestimonials />
      <OurInsights />
      <FAQ data={pageData.faq} />
      {data?.cta && <CtaBanner data={data?.cta} />}
    </main>
  );
};

export default ServiceDetailClient;
