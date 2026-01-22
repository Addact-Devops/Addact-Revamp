import { getHOmePageData } from "@/graphql/queries/getHomePage";
import { fetchSinglePage } from "@/utils/fetchSinglePage";

import OurPartners from "@/components/organisms/OurPartners";
import WhoWeAre from "@/components/organisms/WhoWeAre";
import OurServices from "@/components/organisms/OurServices";
import OurCmsExperts from "@/components/organisms/OurCmsExperts";
import WhyAddact from "@/components/organisms/WhyAddact";
import CtaBanner from "@/components/molecules/CtaBanner";
import OurProcess from "@/components/organisms/OurProcess";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import OurInsights from "@/components/organisms/OurInsights";
import ContactUs from "@/components/organisms/ContactUs";
import HomeHeroBanner from "@/components/organisms/HomeHeroBanner";
import GlobeAnimation from "@/components/organisms/GlobeAnimation";

import { generatePageMetadata } from "@/utils/generatePageMetadata";
import Script from "next/script";

export async function generateMetadata() {
  return generatePageMetadata("home");
}

export default async function HomePage() {
  const [homeResponse, seoData] = await Promise.all([
    getHOmePageData(),
    fetchSinglePage("home"), // ✅ fetch SEO.structuredData
  ]);

  const homeData = homeResponse?.home;
  const structuredData = seoData?.SEO?.structuredData;

  return (
    <>
      {/* ✅ Inject structured data */}
      {structuredData && (
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      {/* ✅ Organization Schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            url: "https://www.addact.net/",
            logo: "https://d3l7d9gtq0bnch.cloudfront.net/Logo_1_ffdf03e2d1.png",
            name: "Addact Technologies",
            "@type": "Organization",
            sameAs: [
              "https://www.facebook.com/addacttech/",
              "https://x.com/AddactTech",
              "https://www.instagram.com/addacttechnologies/",
              "https://www.youtube.com/@addact3283",
              "https://www.linkedin.com/company/addact-technologies/posts/?feedView=all&viewAsMember=true",
            ],
            "@context": "https://schema.org",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91 94272 37737",
              areaServed: "IN",
              contactType: "technical support",
              availableLanguage: "en",
            },
            alternateName: "Addact",
          }),
        }}
      />

      {/* ✅ FAQ Schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@type": "FAQPage",
            "@context": "https://schema.org",
            mainEntity: [
              {
                name: "What CMS platforms does Addact specialize in?",
                "@type": "Question",
                acceptedAnswer: {
                  text: "Addact provides end-to-end development, consulting, and support services across leading CMS platforms, including Sitecore, Umbraco, Kentico, Strapi, Contentful, and Contentstack.",
                  "@type": "Answer",
                },
              },
              {
                name: "How do I know which CMS is right for my business?",
                "@type": "Question",
                acceptedAnswer: {
                  text: "Every business has unique needs. Addact helps you evaluate platforms like Sitecore, Umbraco, Kentico, Strapi, Contentful, and Contentstack based on your budget, scalability, personalization needs, cloud readiness, and technical ecosystem.",
                  "@type": "Answer",
                },
              },
            ],
          }),
        }}
      />

      {/* ✅ Website Schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            url: "https://www.addact.net/",
            name: "Addact Technologies",
            "@type": "WebSite",
            "@context": "https://schema.org/",
            potentialAction: {
              "@type": "SearchAction",
              target: "{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/*  Markup schema */}
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            url: "https://www.addact.net/",
            name: "Addact Technologies",
            "@type": "WebSite",
            "@context": "https://schema.org/",
            potentialAction: {
              "@type": "SearchAction",
              target: "{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      <Script
        id="faqpage-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: {
              "@type": "Question",
              name: "What CMS platforms does Addact specialize in?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Addact provides end-to-end development, consulting, and support services across leading CMS platforms, including Sitecore, Umbraco, Kentico, Strapi, Contentful, and Contentstack.",
              },
            },
          }),
        }}
      />

      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
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
              contactType: "technical support",
              areaServed: ["US", "IN"],
              availableLanguage: "en",
            },
            sameAs: [
              "https://www.facebook.com/addacttech/",
              "https://x.com/AddactTech",
              "https://www.instagram.com/addacttechnologies/",
              "https://www.youtube.com/@addact3283",
              "https://www.linkedin.com/company/addact-technologies/",
            ],
          }),
        }}
      />

      {/*  End Markup schema */}
      <main className="bg-dark">
        <HomeHeroBanner data={homeData?.banner} />
        <OurPartners />
        <WhoWeAre />
        <OurServices data={homeData?.ourservices} />
        <OurCmsExperts />
        <WhyAddact data={homeData?.whyaddact} />
        <CtaBanner data={homeData?.cta} />
        {homeData?.ourprocess && <OurProcess data={homeData?.ourprocess} />}
        <ClientTestimonials />
        <OurInsights />
        <GlobeAnimation data={homeData?.GlobeAnimation} />
        <ContactUs data={homeData?.contactus} />
      </main>
    </>
  );
}
