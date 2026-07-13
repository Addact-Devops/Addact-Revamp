import HeroBanner from "@/components/organisms/HeroBanner";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import OurInsights from "@/components/organisms/OurInsights";
import { notFound } from "next/navigation";
import FAQ from "@/components/organisms/FAQ";
import CtaBanner from "@/components/molecules/CtaBanner";
import IndustryMarqueeCards from "@/components/organisms/IndustryMarqueeCards";
import HowEngagementProcessWorks from "@/components/organisms/HowEngagementProcessWorks";
import WhyWorkWithUs from "@/components/organisms/WhyWorkWithUs";
import { generatePageMetadata } from "@/utils/generatePageMetadata";
import OurTechStack from "@/components/organisms/OurTechStack";
import DetailPageServices from "@/components/organisms/DetailPageServices";
import WhoWeAre from "@/components/organisms/WhoWeAre";
import { getDigitalMarketing } from "@/graphql/queries/getDigitalMarketing";
import Script from "next/script";
// import OurProcess from "@/components/organisms/OurProcess";
// import IndustriesWeServe from "@/components/organisms/IndustriesWeServe";
// import OurPartners from "@/components/organisms/OurPartners";
// import CtaBanner2 from "@/components/molecules/CtaBanner2";

export async function generateMetadata() {
  return generatePageMetadata("digitalMarketingService");
}
export default async function umbracoPage() {
  const data = await getDigitalMarketing();
  if (!data) return notFound();
  const bannerData = data.Banner?.Banner?.[0];
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

      <HeroBanner
        title={bannerData?.BannerTitle ?? ""}
        description={bannerData?.BannerDescription?.replace(/^<p>|<\/p>$/g, "") ?? ""}
        button={{
          label: bannerData?.BannerLink?.label ?? "",
          url: bannerData?.BannerLink?.href ?? "",
        }}
        isVideo={Boolean(bannerData?.isVideo)}
        isTextAlignCenter={bannerData?.isTextAlignCenter ?? false}
        videoUrl={bannerData?.videoLink ?? ""}
        backgroundImageUrl={bannerData?.BannerImage?.url ?? ""}
      />
      <WhoWeAre data={data?.whoarewe} />
      <DetailPageServices data={data?.ourService} />

      {data?.whyaddact && <WhyWorkWithUs data={data.whyaddact} />}
      {/* {data?.cta2 && <CtaBanner2 data={data?.cta2} />} */}
      {/* <OurProcess data={data?.our_process} /> */}
      <OurTechStack data={data?.techStack} />
      <HowEngagementProcessWorks data={data?.ourprocess} />
      <IndustryMarqueeCards data={data?.industry} />
      <ClientTestimonials />
      {data?.faq && <FAQ data={data?.faq} />}
      <OurInsights />
      {data?.cta && <CtaBanner data={data?.cta} />}
    </main>
  );
}
