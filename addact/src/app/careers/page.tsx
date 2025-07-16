// src/app/careers/page.tsx

import HeroBanner from "@/components/organisms/HeroBanner";
import CareerCard from "@/components/organisms/CareerCard";
import CareerPositions from "@/components/organisms/CareerPositions"; // ✅ Import the new component
import { getCareersData } from "@/graphql/queries/getCareers";

export default async function CareersPage() {
    const careers = await getCareersData();

    const banner = careers.Banner?.Banner?.[0];
    const cardTitle = careers.Careercard?.Title ?? [];
    const cardItems = careers.Careercard?.GlobalCard ?? [];
    const positions = careers.positions ?? []; // ✅ Get positions from response

    return (
        <main className="bg-[#f4f4f4]  pb-[60px] sm:pb-[100px]">
            {banner && (
                <HeroBanner
                    title={banner.BannerTitle || ""}
                    description={banner.BannerDescription || ""}
                    backgroundImageUrl={banner.BannerImage?.url || ""}
                    showAnchorLinks={true}
                />
            )}

            <CareerCard title={cardTitle} cards={cardItems} />

            {positions.length > 0 && <CareerPositions positions={positions} />}
        </main>
    );
}
