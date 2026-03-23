"use client";

import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

// import OurProcess from "@/components/organisms/OurProcess";

// import ServiceCtaBanner2 from "@/components/molecules/ServiceCtaBanner2";
import {
  AIService,
  getAIServiceSlug,
} from "@/graphql/queries/getAIServiceSlug";

import HeroAISection from "@/components/organisms/HeroAISection";
import SolveProblemsWithAI from "@/components/organisms/SolveProblemsWithAI";
import BenefitsSection from "@/components/organisms/BenfitsSections";
import ServicesSection from "@/components/organisms/ServicesSection";
import AIProcess from "@/components/organisms/AIProcess";
import OurTechStack from "@/components/organisms/OurTechStack";
import IndustryMarqueeCards from "@/components/organisms/IndustryMarqueeCards";
import OurInsights from "@/components/organisms/OurInsights";
import FAQ from "@/components/organisms/FAQ";
import CtaBanner from "@/components/molecules/CtaBanner";
// const IndustriesWeServe = dynamic(
//   () => import("@/components/organisms/IndustriesWeServe"),
//   { ssr: false },
// );

const SiteDetailClient = ({ data }: { data: AIService }) => {
  const [pageData, setPageData] = useState<AIService | null>(data);
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
      getAIServiceSlug(slug)
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

  const ourServiceArray = pageData.ourService
    ? Array.isArray(pageData.ourService)
      ? pageData.ourService
      : [pageData.ourService]
    : null;

  return (
    <main>
      <HeroAISection data={pageData?.Banner?.Banner} />
      <SolveProblemsWithAI data={pageData?.aiSolveProblem} />
      <BenefitsSection data={pageData?.aiBenefit} />
      {ourServiceArray && <ServicesSection data={ourServiceArray} />}
      <AIProcess data={pageData?.ourprocess} />
      <IndustryMarqueeCards data={pageData?.industry} />
      <OurTechStack data={pageData?.techStack} />
      <OurInsights />
      {pageData?.faq && <FAQ data={pageData?.faq} />}
      {pageData?.cta && <CtaBanner data={pageData?.cta} />}
    </main>
  );
};

export default SiteDetailClient;
