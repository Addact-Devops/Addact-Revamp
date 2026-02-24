import { notFound } from "next/navigation";
import HeroBanner from "@/components/organisms/HeroBanner";
import { getPressReleaseData } from "@/graphql/queries/getPressRelease";
import EventCard from "@/components/molecules/EventCard";
import { generatePageMetadata } from "@/utils/generatePageMetadata";

export async function generateMetadata() {
  return generatePageMetadata("pressRelease");
}

export default async function PressRelease() {
  const data = await getPressReleaseData();
  if (!data) return notFound();

  const banner = data.pressRelease.HeroBanner.Banner[0];

  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      {/* ✅ WebSite Schema */}

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebSite",
            name: "Addact Technologies",
            url: "https://www.addact.net/press-releases",
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

      <HeroBanner
        title={banner.BannerTitle || ""}
        description={banner.BannerDescription || ""}
        backgroundImageUrl={banner.BannerImage?.url || ""}
      />
      <div className="py-24">
        {data.addactPressReleases.map((event, index: number) => {
          const banner = event.HeroBanner[0];
          return (
            <EventCard
              key={index}
              pageType="Press Release"
              title={banner.BannerTitle}
              description={event.PressReleaseSummary}
              imageUrl={banner.BannerImage.url}
              slug={event.Slug}
              linkText="Read More"
            />
          );
        })}
      </div>
    </main>
  );
}
