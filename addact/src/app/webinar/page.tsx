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
        <div>
            <HeroBanner
                title={banner.BannerTitle || ""}
                description={banner.BannerDescription || ""}
                backgroundImageUrl={banner.BannerImage?.url || ""}
            />
            <div className="pt-24">
                {data.addactWebinars.map((event, index: number) => {
                    const banner = event.HeroBanner[0];
                    return (
                        <EventCard
                            key={index}
                            pageType="Webinar"
                            title={banner.BannerTitle}
                            date={new Date(banner.PublishDate).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                            description={banner.BannerDescription}
                            imageUrl={banner.BannerImage.url}
                            slug={event.Slug}
                        />
                    );
                })}
            </div>
        </div>
    );
}
