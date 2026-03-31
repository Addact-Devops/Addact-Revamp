import type { PageData } from "@/app/development-design/[...slug]/SiteDetailClient";
import React from "react";
import dynamic from "next/dynamic";
import UIUXHeroBanner from "./UIUXHeroBanner";
import ClientTestimonials from "./ClientTestimonials";
import OurInsights from "./OurInsights";
import CtaBanner from "../molecules/CtaBanner";
import IndustryMarqueeCards from "./IndustryMarqueeCards";
import DetailPageServices from "./DetailPageServices";
import OurTechStack from "./OurTechStack";
import WhyWorkWithUs from "./WhyWorkWithUs";

// Heavy below-fold components — lazy-loaded to keep initial main-thread work low
const UIUXWhyImportant = dynamic(() => import("./UIUXWhyImportant"), { ssr: false });
const UIUXImpactSlider = dynamic(() => import("./UIUXImpactSlider"), { ssr: false });
const DesignProcess = dynamic(() => import("./DesignProcess"), { ssr: false });
const ProductExperienceChallenges = dynamic(() => import("./ProductExperienceChallenges"), {
  ssr: false,
});
const DesignOurWork = dynamic(() => import("./DesignOurWork"), { ssr: false });

const UIUXPageFlow = ({ data }: { data: PageData }) => {
  const bannerData = data?.Banner?.Banner?.[0] ?? null;
  const designFlow = "designFlow" in data ? data.designFlow : null;
  const challenges = "challenges" in data ? data.challenges : null;
  const impactUx = "impactUx" in data ? data.impactUx : null;
  const ourWork = "ourWork" in data ? data.ourWork : null;

  return (
    <>
      <UIUXHeroBanner data={bannerData} />
      <UIUXWhyImportant data={data.ourprocess} />
      <UIUXImpactSlider data={impactUx} />
      <DesignProcess data={designFlow} />
      <ProductExperienceChallenges data={challenges} />
      <DesignOurWork data={ourWork} />
      {data?.whyaddact && <WhyWorkWithUs data={data.whyaddact} />}
      <OurTechStack data={data?.techStack} />
      <DetailPageServices data={data?.ourService} />
      <IndustryMarqueeCards data={data?.industry} />
      <ClientTestimonials />
      <OurInsights />
      {data?.cta && <CtaBanner data={data?.cta} />}
    </>
  );
};

export default UIUXPageFlow;
