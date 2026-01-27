import { getServiceListBySlug } from "@/graphql/queries/getServieceList";
import HeroBanner from "@/components/organisms/HeroBanner";
import WhyAddact from "@/components/organisms/WhyAddact";
import OurPartners from "@/components/organisms/OurPartners";
import OurProcess from "@/components/organisms/OurProcess";
import ClientTestimonials from "@/components/organisms/ClientTestimonials";
import OurInsights from "@/components/organisms/OurInsights";
import { notFound } from "next/navigation";
import IndustriesWeServe from "@/components/organisms/IndustriesWeServe";
import FAQ from "@/components/organisms/FAQ";
import OurServicesWithTabs from "@/components/organisms/OurServicesWithTabs";
import { generatePageMetadata } from "@/utils/generatePageMetadata";

export async function generateMetadata() {
  return generatePageMetadata("serviceLists", "/kentico-cms-development");
}
import CtaBanner2 from "@/components/molecules/CtaBanner2";
import CtaBanner from "@/components/molecules/CtaBanner";
import ContactUs from "@/components/organisms/ContactUs";

export default async function kenticoPage() {
  const service = "kentico-cms-development";
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
            url: " https://www.addact.net/kentico-cms-development ",
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
                name: " Is Kentico CMS suitable for enterprise websites?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: " Yes, Kentico CMS is designed for enterprise-level websites, offering scalability, security, and advanced content management features.",
                },
              },
              {
                "@type": "Question",
                name: " What services do you offer for Kentico CMS?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We provide Kentico CMS services including website development, customization, upgrades, and migration from other content management systems.",
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
