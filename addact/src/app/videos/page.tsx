import HeroBanner from "@/components/organisms/HeroBanner";
import VideoList from "@/components/organisms/VideoList";
import { getVideosPageData } from "@/graphql/queries/getVideos";
import { generatePageMetadata } from "@/utils/generatePageMetadata";

export async function generateMetadata() {
  return generatePageMetadata("videoListing");
}

export default async function VideosPage() {
  const data = await getVideosPageData();

  const banner = data.videoListing.banner.Banner?.[0];
  const videos = data.videoListing.VideoList;

  return (
    <main className="bg-white min-h-screen">
      {/* ✅ WebSite Schema */}

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "WebSite",
            name: "Addact Technologies",
            url: "https://www.addact.net/videos",
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

      {/* ✅ VideoObject Schema */}

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "Sitecore Java script services (JSS) with React-Part 1",
            description:
              "This video is about how to install Sitecore 10 with SXA and Sitecore Java script services",
            thumbnailUrl: "https://i.ytimg.com/vi/5_31dDNActM/mqdefault.jpg",
            duration: "PT5M1S",
            contentUrl: "https://www.youtube.com/watch?v=5_31dDNActM",
            embedUrl: "https://www.youtube.com/embed/5_31dDNActM",
            uploadDate: "2021-03-09T02:21:46-08:00",
            potentialAction: {
              "@type": "SeekToAction",
              target: "https://youtu.be/5_31dDNActM?t={seek_to_second_number}",
              "startOffset-input": "required name=seek_to_second_number",
            },
          }),
        }}
      />

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
