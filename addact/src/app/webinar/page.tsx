import EventCard from "@/components/molecules/EventCard";
import HeroBanner from "@/components/organisms/HeroBanner";
import { getWebinarListData } from "@/graphql/queries/getWebinarList";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/utils/generatePageMetadata";

export async function generateMetadata() {
  return generatePageMetadata("webinar");
}

export default async function SitecorePage() {
  const data = await getWebinarListData();
  if (!data) return notFound();

  const banner = data.webinar.HeroBanner.Banner[0];

  return (
    <main className="bg-white min-h-screen pb-20">
      {/* ✅ WebSite Schema */}

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebSite",
            name: "Addact Technologies",
            url: "https://www.addact.net/webinar",
            potentialAction: {
              "@type": "SearchAction",
              target: "{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* ✅ WebSite Schema */}

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
        {data.addactWebinars.map((event, index: number) => {
          const banner = event.HeroBanner[0];
          const formattedDate = banner.PublishDate
            ? new Date(banner.PublishDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : undefined;

          return (
            <EventCard
              key={index}
              pageType="Webinar"
              title={banner.BannerTitle}
              date={formattedDate}
              description={banner.BannerDescription}
              imageUrl={banner.BannerImage.url}
              slug={event.Slug}
              linkText="Watch Webinar"
            />
          );
        })}
      </div>
    </main>
  );
}
