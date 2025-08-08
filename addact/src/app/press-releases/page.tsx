import { notFound } from "next/navigation";
import HeroBanner from "@/components/organisms/HeroBanner";
import { getPressReleaseData } from "@/graphql/queries/getPressRelease";
import EventCard from "@/components/molecules/EventCard";

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
            <div className='pt-24'>
                {data.addactPressReleases.map((event, index: number) => {
                    const banner = event.HeroBanner[0];
                    return (
                        <EventCard
                            key={index}
                            pageType='Event'
                            title={banner.BannerTitle}
                            description={event.PressReleaseSummary}
                            imageUrl={banner.BannerImage.url}
                            slug={event.Slug}
                            linkText={"Read More"}
                        />
                    );
                })}
            </div>
        </div>
    );
}
