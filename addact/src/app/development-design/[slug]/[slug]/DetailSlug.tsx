"use client";

import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

import HeroBanner from "@/components/organisms/HeroBanner";
import WhyWorkWithUs from "@/components/organisms/WhyWorkWithUs";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import OurInsights from "@/components/organisms/OurInsights";
import FAQ from "@/components/organisms/FAQ";
import DetailPageServices from "@/components/organisms/DetailPageServices";
import {
  getDevelopmentDesignSlug,
  DevelopmentDesignDetail,
} from "@/graphql/queries/getDevelopmentDesignSlug";
import HowEngagementProcessWorks from "@/components/organisms/HowEngagementProcessWorks";
import CtaBanner from "@/components/molecules/CtaBanner";
import IndustryMarqueeCards from "@/components/organisms/IndustryMarqueeCards";
import OurTechStack from "@/components/organisms/OurTechStack";

// const IndustriesWeServe = dynamic(
//   () => import("@/components/organisms/IndustriesWeServe"),
//   { ssr: false },
// );

const DetailSlug = ({ data }: { data: DevelopmentDesignDetail }) => {
  const [pageData, setPageData] = useState<DevelopmentDesignDetail | null>(
    data,
  );
  const [loading, setLoading] = useState(false); // set false, we already have data

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
      getDevelopmentDesignSlug(slug)
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
        description={
          bannerData?.BannerDescription?.replace(/^<p>|<\/p>$/g, "") ?? ""
        }
        button={{
          label: bannerData?.BannerLink?.label ?? "",
          url: bannerData?.BannerLink?.href ?? "",
        }}
        backgroundImageUrl={bannerData?.BannerImage?.url ?? ""}
      />
      <DetailPageServices title="Our Services Carousel Test" isCaraousl />
      <DetailPageServices title="Our Services Grid Test" />
      {pageData?.whyaddact && <WhyWorkWithUs data={pageData.whyaddact} />}
      <OurTechStack data={pageData?.techStack} />
      <HowEngagementProcessWorks data={pageData?.ourprocess} />
      <IndustryMarqueeCards />
      <ClientTestimonials />
      {pageData?.faq && <FAQ data={pageData?.faq} />}
      <OurInsights />
      {data?.cta && <CtaBanner data={data?.cta} />}
    </main>
  );
};

export default DetailSlug;
