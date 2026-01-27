import EventCard from "@/components/molecules/EventCard";
import HeroBanner from "@/components/organisms/HeroBanner";
import { getEventListPageData } from "@/graphql/queries/getEventList";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/utils/generatePageMetadata";

export async function generateMetadata() {
  return generatePageMetadata("event");
}

export default async function EventsPage() {
  const data = await getEventListPageData();
  if (!data) return notFound();

  const banner = data.event.EventBanner.Banner[0];

  return (
    <div>
      {/* ✅ WebSite Schema */}

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebSite",
            name: "Addact Technologies",
            url: "https://www.addact.net/events",
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
      <div className="pt-24">
        {data.addactsEvents.map((event, index: number) => {
          const banner = event.EventBanner[0];
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
              pageType="Event"
              title={banner.BannerTitle}
              date={formattedDate}
              location={banner.eventLocation}
              description={event.EventSummary}
              imageUrl={banner.BannerImage.url}
              slug={event.Slug}
            />
          );
        })}
      </div>
    </div>
  );
}
