"use client";

import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

// import OurProcess from "@/components/organisms/OurProcess";

// import ServiceCtaBanner2 from "@/components/molecules/ServiceCtaBanner2";
import {
  getHireExpertsSlug,
  HireExpert,
} from "@/graphql/queries/getHireExpertSlug";

import HeroAISection from "@/components/organisms/HeroAISection";
import SolveProblemsWithAI from "@/components/organisms/SolveProblemsWithAI";
import BenefitsSection from "@/components/organisms/BenfitsSections";
import ServicesSection from "@/components/organisms/ServicesSection";
import AIDevelopmentProcess from "@/components/organisms/AIProcess";

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
        //getAIServiceSlug(slug);

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
      <HeroAISection />
      <SolveProblemsWithAI />
      <BenefitsSection />
      <ServicesSection />
      <AIDevelopmentProcess />
    </main>
  );
};

export default SiteDetailClient;
