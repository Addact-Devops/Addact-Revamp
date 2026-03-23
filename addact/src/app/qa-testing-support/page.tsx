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

export async function generateMetadata() {
    return generatePageMetadata("qaTestingAndSupport");
}

export default async function QATestingSupport() {
    const data = await getQATestingSupport();
    if (!data) return notFound();

    const bannerData = data.Banner?.Banner?.[0];

    return (
        <main className='bg-dark'>
            {/* ✅ WebSite Schema */}

            <script
                type='application/ld+json'
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "WebSite",
                        name: "Addact Technologies",
                        url: "https://www.addact.net/qa-testing-support",
                        potentialAction: {
                            "@type": "SearchAction",
                            target: "{search_term_string}",
                            "query-input": "required name=search_term_string",
                        },
                    }),
                }}
            />

            {/* ✅ Organization Schema */}

            <script
                type='application/ld+json'
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        name: "Addact Technologies",
                        alternateName: "Addact",
                        url: "https://www.addact.net/",
                        logo: "https://d3l7d9gtq0bnch.cloudfront.net/Logo_1_ffdf03e2d1.png",
                        contactPoint: {
                            "@type": "ContactPoint",
                            telephone: "94272 37737",
                            contactType: "emergency",
                            contactOption: "TollFree",
                            areaServed: ["SA", "YE", "KW", "OM", "QA", "AE", "BH", "IL", "JO", "SY"],
                            availableLanguage: "en",
                        },
                        sameAs: [
                            "https://www.facebook.com/addacttech/",
                            "https://x.com/AddactTech",
                            "https://www.instagram.com/addacttechnologies/",
                            "https://www.youtube.com/@addact3283",
                            "https://www.linkedin.com/company/addact-technologies/posts/?feedView=all",
                            "https://www.addact.net/",
                        ],
                    }),
                }}
            />

            <HeroBanner
                title={bannerData?.BannerTitle ?? ""}
                description={bannerData?.BannerDescription?.replace(/^<p>|<\/p>$/g, "") ?? ""}
                button={{
                    label: bannerData?.BannerLink?.label ?? "",
                    url: bannerData?.BannerLink?.href ?? "",
                }}
                isVideo={Boolean(bannerData?.isVideo)}
                videoUrl={bannerData?.videoLink ?? ""}
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
