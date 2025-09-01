import CostEstimatorForm from "@/components/organisms/CostEstimatorForm";
import HeroBannerV2 from "@/components/organisms/HeroBannerV2";
import { getProjectCostEstimatorData } from "@/graphql/queries/getProjectCostEstimator";
import { generatePageMetadata } from "@/utils/generatePageMetadata";

export async function generateMetadata() {
    return generatePageMetadata("projectCostEstimator");
}

export default async function ProjectCostEstimatorPage() {
    const data = await getProjectCostEstimatorData();

    const banner = data.projectCostEstimator.banner.Banner?.[0];
    const content = data.projectCostEstimator.Content;

    return (
        <main className="bg-[#f4f4f4]">
            <HeroBannerV2
                title={banner?.BannerTitle || ""}
                description={banner?.BannerDescription || ""}
                backgroundImageUrl={banner?.BannerImage?.url || ""}
                logoUrl={banner?.BannerLogo?.url || ""}
                logoAlt={banner?.BannerLogo?.alternativeText || ""}
            />

            {/* Example: render content below */}
            <section className="my-[50px] xl:my-[80px] 2xl:my-[140px] pb-[20px]">
                <div className="container text-center">
                    <div className="xl:max-w-[80%] m-auto">
                        <h2 className="text-[28px] md:text-[40px] 2xl:text-[60px] text-[#0F0F0F] !font-[900] mb-[20px]">
                            {content?.Title}
                        </h2>
                        <div className="subtext" dangerouslySetInnerHTML={{ __html: content?.Description }} />
                    </div>
                </div>
            </section>

            <CostEstimatorForm />
        </main>
    );
}
