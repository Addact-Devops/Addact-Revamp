"use client";

import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

import HeroBanner from "@/components/organisms/HeroBanner";
// import OurProcess from "@/components/organisms/OurProcess";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import OurInsights from "@/components/organisms/OurInsights";
import FAQ from "@/components/organisms/FAQ";
import OurServicesWithTabs from "@/components/organisms/OurServicesWithTabs";
// import ServiceCtaBanner2 from "@/components/molecules/ServiceCtaBanner2";
import {
  getHireExpertsSlug,
  HireExpert,
} from "@/graphql/queries/getHireExpertSlug";
import HowEngagementProcessWorks from "@/components/organisms/HowEngagementProcessWorks";
import CtaBanner from "@/components/molecules/CtaBanner";
import IndustryMarqueeCards from "@/components/organisms/IndustryMarqueeCards";
import WhyWorkWithUs from "@/components/organisms/WhyWorkWithUs";

// const IndustriesWeServe = dynamic(
//   () => import("@/components/organisms/IndustriesWeServe"),
//   { ssr: false },
// );

const SiteDetailClient = ({ data }: { data: HireExpert }) => {
  const [pageData, setPageData] = useState<HireExpert | null>(data);
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
      getHireExpertsSlug(slug)
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
      {pageData?.our_service && (
        <OurServicesWithTabs data={pageData.our_service} />
      )}
      <IndustryMarqueeCards />
      {pageData?.whyaddact && <WhyWorkWithUs data={pageData?.whyaddact} />}

      <HowEngagementProcessWorks />

      <ClientTestimonials />
      <OurInsights />
      <FAQ data={pageData.faq} />
      {data?.cta && <CtaBanner data={data?.cta} />}
    </main>
  );
};

export default SiteDetailClient;
