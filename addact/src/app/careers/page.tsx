import HeroBanner from "@/components/organisms/HeroBanner";
import CareerCard from "@/components/organisms/CareerCard";
import CareerPositions from "@/components/organisms/CareerPositions";
import CareerGallery from "@/components/organisms/CareerGallery";
import { getCareersData } from "@/graphql/queries/getCareers";

import { generatePageMetadata } from "@/utils/generatePageMetadata";
import { fetchSinglePage } from "@/utils/fetchSinglePage";

export async function generateMetadata() {
    return generatePageMetadata("careers");
}

export default async function CareersPage() {
    const [careers, seoData] = await Promise.all([getCareersData(), fetchSinglePage("careers")]);

    const structuredData = seoData?.SEO?.structuredData || null;

    const banner = careers.Banner?.Banner?.[0];
    const cardTitle = careers.Careercard?.Title ?? [];
    const cardItems = careers.Careercard?.GlobalCard ?? [];
    const positions = careers.positions ?? [];
    const positionsTitle = careers.PositionsTitle ? [careers.PositionsTitle] : [];

    return (
        <>
            {structuredData && (
                <script
                    type="application/ld+json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData),
                    }}
                />
            )}

            <main className="bg-[#f4f4f4] pb-[60px] sm:pb-[100px]">
                {banner && (
                    <HeroBanner
                        title={banner.BannerTitle || ""}
                        description={banner.BannerDescription || ""}
                        backgroundImageUrl={banner.BannerImage?.url || ""}
                        showAnchorLinks={true}
                    />
                )}

                <CareerCard title={cardTitle} cards={cardItems} />

                {positions.length > 0 && <CareerPositions positions={positions} positionsTitle={positionsTitle} />}

                <CareerGallery />
            </main>
        </>
    );
}
