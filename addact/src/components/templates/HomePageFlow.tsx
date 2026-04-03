"use client";

import { useCallback, useEffect, useState } from "react";
import type { HomeItems } from "@/graphql/queries/getHomePage";

import HomeBanner from "@/components/organisms/HomeBanner";
import WhoWeAre from "@/components/organisms/WhoWeAre";
import OurCapabilities from "@/components/organisms/OurCapabilities";
import BuildingAIEcosystem from "@/components/organisms/BuildingAIEcosystem";
// import OurServices from "@/components/organisms/OurServices";
// import OurCmsExperts from "@/components/organisms/OurCmsExperts";
// import WhyAddact from "@/components/organisms/WhyAddact";
import CtaBanner from "@/components/molecules/CtaBanner";
import OurProcess from "@/components/organisms/OurProcess";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import OurInsights from "@/components/organisms/OurInsights";
// import GlobeAnimation from "@/components/organisms/GlobeAnimation";
// import ContactUs from "@/components/organisms/ContactUs";
// import OurPartners from "../organisms/OurPartners";
import IndustryMarqueeCards from "../organisms/IndustryMarqueeCards";
import WhyWorkWithUs from "../organisms/WhyWorkWithUs";
import IntroSplash from "../organisms/IntroSplash";

interface HomePageFlowProps {
  homeData: HomeItems;
}

const HomePageFlow = ({ homeData }: HomePageFlowProps) => {
  const [isIntroVisible, setIsIntroVisible] = useState(true);

  useEffect(() => {
    // Disable browser scroll restoration so refresh always starts at top.
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIsIntroVisible(false);
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isIntroVisible && (
        <IntroSplash
          onComplete={handleIntroComplete}
          animationTitle={homeData?.animationBanner?.animationTitle}
          firstAnimationImage={homeData?.animationBanner?.firstAnimationImage}
          secondAnimationImage={homeData?.animationBanner?.secondAnimationImage}
        />
      )}

      <main className="bg-dark">
        <HomeBanner data={homeData?.animationBanner} />
        {/* <OurPartners /> */}
        <WhoWeAre data={homeData?.whoarewe} />
        <OurCapabilities data={homeData?.ourCapabilitiy} />
        <BuildingAIEcosystem data={homeData?.aiEcoSystem} />
        <IndustryMarqueeCards data={homeData?.industry} />
        <WhyWorkWithUs data={homeData?.whyaddact} />
        {/* <OurServices data={homeData?.ourservices} /> */}
        {/* <OurCmsExperts /> */}
        {/* <WhyAddact data={homeData?.whyaddact} /> */}
        {homeData?.ourprocess && <OurProcess data={homeData?.ourprocess} />}
        <ClientTestimonials />
        <OurInsights />
        <CtaBanner data={homeData?.cta} />
        {/* <GlobeAnimation data={homeData?.GlobeAnimation} />
         */}
      </main>
    </>
  );
};

export default HomePageFlow;
