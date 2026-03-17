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

  return (
    <main>
      <HeroAISection data={data?.Banner?.Banner} />
      <SolveProblemsWithAI data={data?.aiSolveProblem} />
      <BenefitsSection data={data?.aiBenefit} />
      <ServicesSection data={data?.ourService} />
      <AIProcess data={data?.ourprocess} />
      <IndustryMarqueeCards data={data?.industry} />
      <OurTechStack data={data?.techStack} />
      <OurInsights />
      {data?.faq && <FAQ data={data?.faq} />}
      {data?.cta && <CtaBanner data={data?.cta} />}
    </main>
  );
};

export default SiteDetailClient;
