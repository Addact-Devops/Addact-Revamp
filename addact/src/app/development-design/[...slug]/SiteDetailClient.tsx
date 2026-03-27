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
import {
  CmsDetail,
  getDevelopmentDesignDetailsCmsSlug,
} from "@/graphql/queries/getDevelopmentDesignCmsSlug";
import {
  SitecoreDetail,
  getDevelopmentDesignDetailsSitecoreSlug,
} from "@/graphql/queries/getDevelopmentDesignSitecoreSlug";
import HowEngagementProcessWorks from "@/components/organisms/HowEngagementProcessWorks";
import CtaBanner from "@/components/molecules/CtaBanner";
import IndustryMarqueeCards from "@/components/organisms/IndustryMarqueeCards";
import OurTechStack from "@/components/organisms/OurTechStack";
import UIUXPageFlow from "@/components/organisms/UIUXPageFlow";

// const IndustriesWeServe = dynamic(
//   () => import("@/components/organisms/IndustriesWeServe"),
//   { ssr: false },
// );

export type PageData = DevelopmentDesignDetail | CmsDetail | SitecoreDetail;

const SiteDetailClient = ({ data }: { data: PageData }) => {
  const [pageData, setPageData] = useState<PageData | null>(data);
  const [loading, setLoading] = useState(false); // set false, we already have data

  const params = useParams();
  const slugArray = Array.isArray(params?.slug)
    ? params.slug
    : typeof params?.slug === "string"
      ? [params.slug]
      : [];

  useEffect(() => {
    if (!pageData && slugArray.length > 0) {
      setLoading(true);
      let fetchPromise: Promise<PageData | null>;

      if (slugArray.length === 1) {
        fetchPromise = getDevelopmentDesignSlug(slugArray[0]);
      } else if (slugArray.length === 2) {
        fetchPromise = getDevelopmentDesignDetailsCmsSlug(slugArray.join("/"));
      } else if (slugArray.length === 3) {
        fetchPromise = getDevelopmentDesignDetailsSitecoreSlug(slugArray.join("/"));
      } else {
        setLoading(false);
        return;
      }

      fetchPromise
        .then((res) => {
          setPageData(res);
        })
        .catch((err) => {
          console.error("Error fetching service detail:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [slugArray, pageData]);

  if (loading) {
    return <div className="text-white p-8">Loading...</div>;
  }

  if (!pageData) {
    return <div className="text-white p-8">Page Not Found</div>;
  }

  const bannerData = pageData.Banner?.Banner?.[0];
  const isUxPage = "isUxpage" in pageData && Boolean(pageData.isUxpage);

  return (
    <main className="bg-dark">
      {isUxPage ? (
        <UIUXPageFlow data={pageData} />
      ) : (
        <>
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
          {pageData?.whyaddact && <WhyWorkWithUs data={pageData.whyaddact} />}
          <OurTechStack data={pageData?.techStack} />
          <HowEngagementProcessWorks data={pageData?.ourprocess} />
          <IndustryMarqueeCards data={pageData?.industry} />
          <ClientTestimonials />
          {pageData?.faq && <FAQ data={pageData?.faq} />}
          <OurInsights />
          {pageData?.cta && <CtaBanner data={pageData?.cta} />}
        </>
      )}
    </main>
  );
};

export default SiteDetailClient;
