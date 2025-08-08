import HeroBanner from "@/components/organisms/HeroBanner";
import VideoList from "@/components/organisms/VideoList";
import { getVideosPageData } from "@/graphql/queries/getVideos";

export default async function VideosPage() {
    const data = await getVideosPageData();

    const banner = data.videoListing.banner.Banner?.[0];
    const videos = data.videoListing.VideoList;

    return (
        <main className="bg-[#f4f4f4]">
            <HeroBanner
                title={banner?.BannerTitle || ""}
                description={banner?.BannerDescription || ""}
                backgroundImageUrl={banner?.BannerImage?.url || ""}
                showAnchorLinks={false} // No anchor links on videos page
            />

            <VideoList videoList={videos} />
        </main>
    );
}
