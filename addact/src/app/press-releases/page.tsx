import { notFound } from "next/navigation";
import HeroBanner from "@/components/organisms/HeroBanner";
import { getPressReleaseData } from "@/graphql/queries/getPressRelease";

export default async function PressRelease() {
    const data = await getPressReleaseData();
    if (!data) return notFound();

    const banner = data.pressRelease.HeroBanner.Banner[0];

    return (
        <div>
            <HeroBanner
                title={banner.BannerTitle || ""}
                description={banner.BannerDescription || ""}
                backgroundImageUrl={banner.BannerImage?.url || ""}
            />
            {/* <div className='pt-24'>
                {data.addactsEvents.map((event, index: number) => {
                    const banner = event.EventBanner[0];
                    return (
                        <EventCard
                            key={index}
                            pageType='Event'
                            title={banner.BannerTitle}
                            date={new Date(banner.PublishDate).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                            location={banner.eventLocation}
                            description={event.EventSummary}
                            imageUrl={banner.BannerImage.url}
                            slug={event.Slug}
                        />
                    );
                })}
            </div> */}
        </div>
    );
}
