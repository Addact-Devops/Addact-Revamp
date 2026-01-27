import { notFound } from "next/navigation";
import { getServiceListBySlug } from "@/graphql/queries/getServieceList";
import HeroBanner from "@/components/organisms/HeroBanner";
import WhyAddact from "@/components/organisms/WhyAddact";
import OurPartners from "@/components/organisms/OurPartners";
import OurProcess from "@/components/organisms/OurProcess";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import OurInsights from "@/components/organisms/OurInsights";
import FAQ from "@/components/organisms/FAQ";
import CtaBanner2 from "@/components/molecules/CtaBanner2";
import OurServicesWithTabs from "@/components/organisms/OurServicesWithTabs";
import IndustriesWeServe from "@/components/organisms/IndustriesWeServe";
import CtaBanner from "@/components/molecules/CtaBanner";
import ContactUs from "@/components/organisms/ContactUs";
import { generatePageMetadata } from "@/utils/generatePageMetadata";

export async function generateMetadata() {
  return generatePageMetadata("serviceLists", "/contentful-cms-development");
}

export default async function ContentfulPage() {
  const service = "contentful-cms-development";
  const data = await getServiceListBySlug(service);
  if (!data) return notFound();

  const bannerData = data.Banner?.Banner?.[0];

  return (
    <main className="bg-dark">
      {/* ✅ WebSite Schema */}

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebSite",
            name: "Addact Technologies",
            url: "https://www.addact.net/contentful-cms-development",
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
              areaServed: ["US", "IN"],
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
                name: "Is Contentful suitable for scalable and multi-channel content delivery?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Contentful is designed for scalable, API-driven content delivery across websites, mobile apps, and other digital platforms.",
                },
              },
              {
                "@type": "Question",
                name: "How can I improve Contentful performance?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can improve Contentful performance by optimizing content models, reducing unnecessary API calls, using caching and a CDN, and implementing efficient content delivery strategies.",
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
      <OurPartners />
      <OurServicesWithTabs data={data?.our_service} />
      <IndustriesWeServe />
      <WhyAddact data={data?.why_addact} />
      {data?.cta2 && <CtaBanner2 data={data?.cta2} />}
      <OurProcess data={data?.our_process} />
      <ClientTestimonials />
      <OurInsights />
      <FAQ data={data?.faq} />
      {data?.cta && <CtaBanner data={data?.cta} />}
      <ContactUs data={data?.contact_us} />
    </main>
  );
}
