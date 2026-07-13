import { notFound } from "next/navigation";
import HeroBanner from "@/components/organisms/HeroBanner";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import OurInsights from "@/components/organisms/OurInsights";
import CtaBanner from "@/components/molecules/CtaBanner";
import IndustryMarqueeCards from "@/components/organisms/IndustryMarqueeCards";
import HowEngagementProcessWorks from "@/components/organisms/HowEngagementProcessWorks";
import DetailPageServices from "@/components/organisms/DetailPageServices";
import { generatePageMetadata } from "@/utils/generatePageMetadata";
import { getQATestingSupport } from "@/graphql/queries/getQATestingSupport";
import Script from "next/script";

export async function generateMetadata() {
  return generatePageMetadata("qaTestingAndSupport");
}

export default async function QATestingSupport() {
  const data = await getQATestingSupport();
  if (!data) return notFound();

  const bannerData = data.Banner?.Banner?.[0];

  return (
    <main className="bg-[#0F0F0F]">
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
        videoUrl={bannerData?.videoLink ?? ""}
        isTextAlignCenter={bannerData?.isTextAlignCenter ?? false}
        backgroundImageUrl={bannerData?.BannerImage?.url ?? ""}
      />

      {/* {data?.ourService && data.ourService.length > 0 && (
        <>
          {data.ourService.map((service, index) => (
            <DetailPageServices
              key={service.id || index}
              title={service.serviceTitle}
              isCaraousl={service.isCarousel}
              data={service}
            />
          ))}
        </>
      )} */}
      <DetailPageServices data={data?.ourService} />

      <HowEngagementProcessWorks data={data?.ourprocess} />
      <IndustryMarqueeCards data={data?.industry} />
      <ClientTestimonials />
      <OurInsights />
      {data?.cta && <CtaBanner data={data?.cta} />}
    </main>
  );
}
