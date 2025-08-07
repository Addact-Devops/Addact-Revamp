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
            <HeroBanner
                title={banner.BannerTitle || ""}
                description={banner.BannerDescription || ""}
                backgroundImageUrl={banner.BannerImage?.url || ""}
            />
            <div className='pt-24'>
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
                            pageType='Event'
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
