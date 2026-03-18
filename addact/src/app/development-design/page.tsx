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
import { getDevelopmentDesign } from "@/graphql/queries/getDevelopmentDesign";

export async function generateMetadata() {
  return generatePageMetadata("development-design");
}
export default async function umbracoPage() {
  const data = await getDevelopmentDesign();
  if (!data) return notFound();
  const bannerData = data.Banner?.Banner?.[0];
  return (
    <main className="bg-dark">
      {/* ✅ SearchAction Schema */}

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebSite",
            name: "Addact Technologies",
            url: " https://www.addact.net/umbraco-cms-development",
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
        type="application/ld+json"
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
              areaServed: [
                "SA",
                "YE",
                "KW",
                "OM",
                "QA",
                "AE",
                "BH",
                "IL",
                "JO",
                "SY",
              ],
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

      {/* ✅ FAQPage Schema */}

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: " Can you migrate our website from another CMS to Umbraco?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Definitely. Whether you're moving from WordPress, Drupal, Sitecore, or any other CMS, we handle complete end-to-end migration to Umbraco. This includes content restructuring, SEO preservation, custom functionality replication, and platform optimization.",
                },
              },
              {
                "@type": "Question",
                name: " Is Umbraco suitable for enterprise-level and scalable websites?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: " Yes, Umbraco is suitable for scalable and enterprise-level websites due to its flexible architecture, extensibility, and efficient content management capabilities.",
                },
              },
            ],
          }),
        }}
      />

      <HeroBanner
        title={bannerData?.BannerTitle ?? ""}
        description={
          bannerData?.BannerDescription?.replace(/^<p>|<\/p>$/g, "") ?? ""
        }
        button={{
          label: bannerData?.BannerLink?.label ?? "",
          url: bannerData?.BannerLink?.href ?? "",
        }}
        backgroundImageUrl={bannerData?.BannerImage?.url ?? ""}
      />
      <DetailPageServices data={data?.ourService} />
      {data?.whyaddact && <WhyWorkWithUs data={data.whyaddact} />}
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
