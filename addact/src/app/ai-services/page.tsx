import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/utils/generatePageMetadata";
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
import { getAIService } from "@/graphql/queries/getAIService";
import Script from "next/script";

export async function generateMetadata() {
  return generatePageMetadata("aiService");
}
export default async function umbracoPage() {
  const data = await getAIService();
  if (!data) return notFound();
  //   const bannerData = data.Banner?.Banner?.[0];
  return (
    <main className="bg-dark">
      {data.SEO?.structuredData?.map((item, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item),
          }}
        />
      ))}

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
}
